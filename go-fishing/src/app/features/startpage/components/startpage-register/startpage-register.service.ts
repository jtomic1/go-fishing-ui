import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, throwError } from 'rxjs';
import { ConfigService } from 'src/app/shared/services/config.service';

@Injectable({
  providedIn: 'root',
})
export class StartpageRegisterService {
  constructor(private http: HttpClient, private config: ConfigService) {}

  sendRegistrationRequest(value: any) {
    let registrationUrl = this.config.registrationUrl;

    return this.http
      .post(registrationUrl, value, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .pipe(
        map((res) => {
          return res;
        }),
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    return throwError(() => new Error(error.error));
  }
}
