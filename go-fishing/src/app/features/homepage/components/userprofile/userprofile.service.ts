import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { catchError, map, Observable, throwError } from 'rxjs';
import { StartpageLoginService } from 'src/app/features/startpage/components/startpage-login/startpage-login.service';
import { ConfigService } from 'src/app/shared/services/config.service';

@Injectable({
  providedIn: 'root',
})
export class UserprofileService {
  constructor(
    private configService: ConfigService,
    private http: HttpClient,
    private userService: StartpageLoginService
  ) {}

  public getUserData() {
    return this.http.get(this.configService.userDataUrl);
  }

  public getLoyaltyPoints() {
    return this.http.get(this.configService.loyaltyPointsUrl);
  }

  public getPenaltyCount() {
    return this.http.get(this.configService.penaltyCountUrl);
  }

  public validateNewUserData(data: any): string {
    if (data.name.length === 0) return 'Invalid name!';
    else if (data.lastName.length === 0) return 'Invalid surname!';
    else if (data.country.length === 0) return 'Invalid country!';
    else if (data.town.length === 0) return 'Invalid city/town!';
    else if (data.address.length === 0) return 'Invalid address!';
    else if (!new RegExp('^[+][0-9]{10,12}$').test(data.phoneNumber))
      return 'Invalid phone number!';
    return 'OK';
  }

  updateProfileInfo(data: FormGroup) {
    return this.http
      .post(this.configService.updateProfileUrl, data, {
        headers: { 'Content-Type': 'application/json' },
      })
      .pipe(
        map((res: any) => {
          this.userService.userName = res.name;
          return res;
        }),
        catchError(this.handleError)
      );
  }

  public validateNewPassword(data: any) {
    if (data.newPassword === '' || data.confirmNewPassword === '')
      return 'Both fields must be filled!';
    else if (data.newPassword.length < 8 || data.newPassword.length > 30)
      return 'Invalid password length!';
    else if (data.newPassword !== data.confirmNewPassword)
      return 'Passwords do not match!';
    else return 'OK';
  }

  public validateDeletionRequest(data: any) {
    if (data.deletionReason.length < 10)
      return 'Please enter at least 10 characters!';
    else return 'OK';
  }

  public changePassword(data: FormGroup) {
    return this.http
      .post(this.configService.changePasswordUrl, data, {
        headers: { 'Content-Type': 'application/json' },
      })
      .pipe(
        map((res: any) => {
          return res;
        }),
        catchError(this.handleError)
      );
  }

  public sendDeletionRequest(data: FormGroup) {
    return this.http
      .post(this.configService.deletionRequestUrl, data, {
        headers: { 'Content-Type': 'application/json' },
      })
      .pipe(
        map((res: any) => {
          return res;
        }),
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    return throwError(() => new Error(error.error));
  }
}
