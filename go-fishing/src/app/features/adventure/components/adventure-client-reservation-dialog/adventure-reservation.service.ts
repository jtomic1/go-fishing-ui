import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { ConfigService } from 'src/app/shared/services/config.service';

@Injectable({
  providedIn: 'root',
})
export class AdventureReservationService {
  constructor(private configService: ConfigService, private http: HttpClient) {}

  public getFreePeriodsById(id: number) {
    return this.http.get(this.configService.freePeriodsByIdUrl + id);
  }

  public createReservation(
    startDate: Date,
    endDate: Date,
    totalPrice: number,
    offerId: number
  ) {
    let startDateString = this.convertDateToString(startDate);
    let endDateString = this.convertDateToString(endDate);
    return this.http
      .post(
        this.configService.newReservationUrl,
        {
          startDateString,
          endDateString,
          totalPrice,
          offerId,
          offerType: 'adventure',
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
      .pipe(
        map((res) => {
          console.log(res);
          return res;
        })
      );
  }

  public confirmAction(id: number) {
    return this.http.get(this.configService.confirmActionUrl + id);
  }

  convertDateToString(date: any): string {
    if (date.value !== '') {
      date = date as Date;
      return (
        date.getDate() + '-' + (date.getMonth() + 1) + '-' + date.getFullYear()
      );
    } else return '';
  }
}
