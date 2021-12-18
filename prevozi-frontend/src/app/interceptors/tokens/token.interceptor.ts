/* eslint-disable @typescript-eslint/naming-convention */
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, filter, take, switchMap } from 'rxjs/operators';
import { StorageService } from 'src/app/services/storage/storage.service';
import { NavController } from '@ionic/angular';
import { AuthService } from 'src/app/services/user/auth/auth.service';
import { ToastService } from 'src/app/services/toast/toast.service';
import { TokenDTO } from 'src/app/models/token/token.model';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  private errorMessage = 'You have been logged out.';
  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(
    null
  );
  private dontDisplayToast = [
    'Username or password is incorrect.',
    'Email or username already in use.',
  ];

  constructor(
    private readonly authService: AuthService,
    private readonly toastService: ToastService,
    private readonly storageService: StorageService,
    private readonly navController: NavController
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return this.authService.getJWTToken().pipe(
      switchMap((token: string) => {
        if (token) {
          request = this.addToken(request, token);
        }

        return next.handle(request).pipe(
          catchError((error) => {
            if (error instanceof HttpErrorResponse && error.status === 401) {
              return this.handle401Error(request, next);
            } else if (
              error instanceof HttpErrorResponse &&
              error.status === 403 &&
              error.error.message === this.errorMessage
            ) {
              this.handle403Errors();
              return throwError(error);
            } else if (error.status !== 0) {
              this.handleOtherErrors(error.error.message);
              return throwError(error);
            }
          })
        );
      })
    );
  }

  private addToken(request: HttpRequest<any>, token: string): HttpRequest<any> {
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  private handle401Error(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);

      return this.authService.refreshToken().pipe(
        switchMap((token: TokenDTO) => {
          this.isRefreshing = false;
          this.refreshTokenSubject.next(token.accessToken);
          return next.handle(this.addToken(request, token.accessToken));
        })
      );
    } else {
      return this.refreshTokenSubject.pipe(
        filter((token) => token != null),
        take(1),
        switchMap((accessToken) =>
          next.handle(this.addToken(request, accessToken))
        )
      );
    }
  }

  private async handle403Errors(): Promise<void> {
    await this.toastService.presentToast(this.errorMessage);

    await this.storageService.remove('JWT_TOKEN');
    await this.storageService.remove('REFRESH_TOKEN');

    this.navController.navigateRoot(['login']);
  }

  private async handleOtherErrors(error: string): Promise<void> {
    if (!this.dontDisplayToast.includes(error)) {
      await this.toastService.presentToast(error);
    }
  }
}
