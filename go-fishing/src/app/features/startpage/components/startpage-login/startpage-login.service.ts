import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, throwError } from 'rxjs';
import { ConfigService } from 'src/app/shared/services/config.service';

@Injectable({
  providedIn: 'root',
})
export class StartpageLoginService {
  private accessToken = null;
  private currentUser = null;

  constructor(
    private http: HttpClient,
    private config: ConfigService,
    private router: Router
  ) {}

  get userName() {
    return localStorage.getItem('user-name');
  }

  set userName(val: string | null) {
    localStorage.removeItem('user-name');
    localStorage.setItem('user-name', val!);
  }

  get accessTokenStorage() {
    return localStorage.getItem('jwt');
  }

  sendLoginRequest(value: any) {
    let loginUrl = this.config.loginUrl;

    return this.http
      .post(loginUrl, value, {
        headers: { 'Content-Type': 'application/json' },
      })
      .pipe(
        map((res: any) => {
          this.accessToken = res.accessToken;
          this.currentUser = res.user;
          localStorage.setItem('jwt', res.accessToken);
          localStorage.setItem('user-name', res.user.name);
          localStorage.setItem('user-id', res.user.id);
          localStorage.setItem('user-role', res.user.roleString);
        }),
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    return throwError(() => new Error(error.error));
  }

  logout() {
    this.currentUser = null;
    this.accessToken = null;
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  tokenIsPresent() {
    return (
      this.accessTokenStorage != undefined && this.accessTokenStorage != null
    );
  }

  public getToken(): string | null {
    return this.accessTokenStorage;
  }

  public getRole(): string | null {
    return localStorage.getItem('user-role');
  }

  public setRole(val: string | null): void {
    localStorage.removeItem('user-role');
    localStorage.setItem('user-role', val!);
  }

  public getId(): string | null {
    return localStorage.getItem('user-id');
  }

  public setId(val: string | null): void {
    localStorage.removeItem('user-id');
    localStorage.setItem('user-id', val!);
  }
}
