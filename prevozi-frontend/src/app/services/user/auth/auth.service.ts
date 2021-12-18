import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { from, Observable, of } from 'rxjs';
import { catchError, map, mapTo, mergeMap, tap } from 'rxjs/operators';
import { TokenDTO } from 'src/app/models/token/token.model';
import { UserDTO } from 'src/app/models/user/user.model';
import { StorageService } from '../../storage/storage.service';

const JWT_TOKEN = 'JWT_TOKEN';
const REFRESH_TOKEN = 'REFRESH_TOKEN';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly hostname: string = 'http://localhost:3000';

  constructor(
    private readonly httpClient: HttpClient,
    private readonly storageService: StorageService
  ) {}

  public test(): Observable<string> {
    return this.httpClient.get<string>(`${this.hostname}/auth/test`);
  }

  public register(user: UserDTO): Observable<UserDTO> {
    return this.httpClient.post<UserDTO>(`${this.hostname}/auth/register`, {
      user,
    });
  }

  public login(user: UserDTO): Observable<TokenDTO> {
    return this.httpClient.post<TokenDTO>(`${this.hostname}/auth/login`, user);
  }

  public logout(): Observable<boolean> {
    return this.getRefreshToken()
      .pipe(
        mergeMap((refreshToken: string) =>
          this.httpClient.post<any>(`${this.hostname}/auth/refreshToken`, {
            refreshToken,
          })
        )
      )
      .pipe(
        tap(async () => await this.removeTokens()),
        mapTo(true),
        catchError(() => of(false))
      );
  }

  public refreshToken(): Observable<TokenDTO> {
    return this.getRefreshToken()
      .pipe(
        mergeMap((refreshToken: string) =>
          this.httpClient.post<any>(`${this.hostname}/auth/refreshToken`, {
            refreshToken,
          })
        )
      )
      .pipe(
        tap(async (tokens: TokenDTO) => {
          await this.saveTokens(tokens);
        })
      );
  }

  public getJWTToken(): Observable<string> {
    return from(this.storageService.get(JWT_TOKEN));
  }

  public getUsername(): Observable<string> {
    return this.getJWTToken().pipe(
      map(
        (token: string) =>
          JSON.parse(atob(token.split('.')[1])).username as string
      )
    );
  }

  public async saveTokens(tokens: TokenDTO): Promise<void> {
    await this.storageService.set(JWT_TOKEN, tokens.accessToken);
    await this.storageService.set(REFRESH_TOKEN, tokens.refreshToken);
  }

  private getRefreshToken(): Observable<string> {
    return from(this.storageService.get(REFRESH_TOKEN));
  }

  private async removeTokens(): Promise<void> {
    await this.storageService.remove(JWT_TOKEN);
    await this.storageService.remove(REFRESH_TOKEN);
  }
}
