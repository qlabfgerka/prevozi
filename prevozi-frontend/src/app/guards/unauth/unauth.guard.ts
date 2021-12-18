import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from 'src/app/services/user/auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class UnAuthGuard implements CanActivate {
  constructor(
    private readonly authService: AuthService,
    private readonly router: Router
  ) {}
  canActivate(): Observable<boolean | UrlTree> {
    return this.authService
      .getJWTToken()
      .pipe(
        map((token: string) => (token ? this.router.createUrlTree(['']) : true))
      );
  }
}
