import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { DataForChart } from 'src/models/dataForChart';
import {
  ReservationDTO,
  ReservationReciveDTO,
  ReservationSendDTO,
} from 'src/models/reservation';
import { ConfigService } from '../config.service';

@Injectable({
  providedIn: 'root',
})
export class ReservationService {
  private reservationsUrl: string;

  constructor(private http: HttpClient, private config: ConfigService) {
    this.reservationsUrl = 'http://localhost:8080/api/reservations';
  }

  public addNewReservationWithClient(
    reservation: ReservationSendDTO,offerType:string
    ): Observable<string> {
    
    let startDateString = reservation.startDate;
    let endDateString = reservation.endDate;
    let offerId = reservation.offerId;
    let totalPrice = 0;
    return this.http.post(
      this.reservationsUrl + '/newReservation/'+reservation.clientId,
      {
        startDateString,
        endDateString,
        totalPrice,
        offerId,
        offerType
      },
      {
        headers: new HttpHeaders({ 'Content-Type': 'application/json',"Access-Control-Allow-Origin": "*"  }),
        responseType: 'text',
      }
    );
  }

  public getReservationsForOffer(
    offerId: number
  ): Observable<ReservationDTO[]> {
    let data = this.http.get<ReservationReciveDTO[]>(
      this.reservationsUrl + '/getReservationsForOffer/' + offerId
    );
    let res: ReservationDTO[] = [];

    data.subscribe((dat) => {
      dat.forEach((d) => {
        console.log(d);
        let reservation = new ReservationDTO();
        reservation.startDate = new NgbDate(
          d.startDate[0],
          d.startDate[1],
          d.startDate[2]
        );
        reservation.endDate = new NgbDate(
          d.endDate[0],
          d.endDate[1],
          d.endDate[2]
        );
        reservation.offerId = d.offerId;
        reservation.totalPrice = d.totalPrice;
        reservation.id = d.id;
        reservation.clientId = d.clientId;
        reservation.reservationStatus = d.reservationStatus;
        res.push(reservation);
      });
    });
    console.log(res);

    return of(res);
  }

  public getReservationsForOwner(
    ownerId: number,
    ownerType: string
  ): Observable<ReservationDTO[]> {
    let data: Observable<ReservationReciveDTO[]> = new Observable();
    if (ownerType == 'C') {
      data = this.http.get<ReservationReciveDTO[]>(
        this.reservationsUrl + '/getReservationsForCottageOwner/' + ownerId
      );
    } else if (ownerType == 'B') {
      data = this.http.get<ReservationReciveDTO[]>(
        this.reservationsUrl + '/getReservationsForBoatOwner/' + ownerId
      );
    } else if (ownerType == 'I') {
      data = this.http.get<ReservationReciveDTO[]>(
        this.reservationsUrl + '/getReservationsForInstructor/' + ownerId
      );
    } else {
      return new Observable();
    }

    let res: ReservationDTO[] = [];

    data.subscribe((dat) => {
      dat.forEach((d) => {
        let reservation = new ReservationDTO();
        reservation.startDate = new NgbDate(
          d.startDate[0],
          d.startDate[1],
          d.startDate[2]
        );
        reservation.endDate = new NgbDate(
          d.endDate[0],
          d.endDate[1],
          d.endDate[2]
        );
        reservation.offerId = d.offerId;
        reservation.totalPrice = d.totalPrice;
        reservation.id = d.id;
        reservation.clientId = d.clientId;
        reservation.reservationStatus = d.reservationStatus;
        reservation.clientName = d.clientName;
        reservation.clientLastName = d.clientLastName;
        res.push(reservation);
      });
    });

    return of(res);
  }

  public deleteReservation(id: number) {
    return this.http.delete(this.reservationsUrl + '/delete/' + id);
  }

  public getProfitChartDataForReservations(
    ownerId: number,
    ownerType: string
  ): Observable<DataForChart[]> {
    if (ownerType == 'C')
      return this.http.get<DataForChart[]>(
        this.reservationsUrl + '/getProfitChartDataForCottageOwner/' + ownerId
      );
    if (ownerType == 'B')
      return this.http.get<DataForChart[]>(
        this.reservationsUrl + '/getProfitChartDataForBoatOwner/' + ownerId
      );
    if (ownerType == 'I')
      return this.http.get<DataForChart[]>(
        this.reservationsUrl + '/getProfitChartDataForInstructor/' + ownerId
      );

    return new Observable();
  }

  public getActiveReservations() {
    return this.http.get(this.config.activeReservationsUrl);
  }

  public getPastReservations() {
    return this.http.get(this.config.pastReservationsUrl);
  }

  public cancelReservation(id: number) {
    return this.http.delete(this.config.cancelReservationUrl + id.toString());
  }

  public addReview(data: any) {
    return this.http.post(this.config.addReviewUrl, data);
  }

  public addComplaint(data: any) {
    return this.http.post(this.config.addComplaintUrl, data);
  }
  public getVisitChartDataForReservations(ownerId:number,ownerType:string):Observable<DataForChart[]>{
    if(ownerType == "C")
      return this.http.get<DataForChart[]>(this.reservationsUrl + "/getVisitChartDataForCottageOwner/"+ownerId);
    if(ownerType == "B")
      return this.http.get<DataForChart[]>(this.reservationsUrl + "/getVisitChartDataForBoatOwner/"+ownerId);
    if(ownerType == "I")
      return this.http.get<DataForChart[]>(this.reservationsUrl + "/getVisitChartDataForInstructor/"+ownerId);
  
    return new Observable();
  }
  

  public getGradeChartDataForReservations(ownerId:number,ownerType:string):Observable<DataForChart[]>{
    if(ownerType == "C")
      return this.http.get<DataForChart[]>(this.reservationsUrl + "/getGradeChartDataForCottageOwner/"+ownerId);
    if(ownerType == "B")
      return this.http.get<DataForChart[]>(this.reservationsUrl + "/getGradeChartDataForBoatOwner/"+ownerId);
    if(ownerType == "I")
      return this.http.get<DataForChart[]>(this.reservationsUrl + "/getGradeChartDataForInstructor/"+ownerId);
  
    return new Observable();
  }

  public getReservationsByDateRange(dateRange: any): Observable<ReservationDTO[]> {
    let data: Observable<ReservationReciveDTO[]> = this.http.post<ReservationReciveDTO[]>(this.reservationsUrl+"/getReservationsByDateRange", dateRange);

    let res: ReservationDTO[] = [];

    data.subscribe(dat => {
      dat.forEach(d => {  
        let reservation = new ReservationDTO();
        reservation.startDate = new NgbDate(d.startDate[0],d.startDate[1],d.startDate[2]);  
        reservation.endDate = new NgbDate(d.endDate[0],d.endDate[1],d.endDate[2]);
        reservation.offerId = d.offerId;
        reservation.totalPrice = d.totalPrice;
        reservation.id = d.id;
        reservation.clientId = d.clientId;
        reservation.reservationStatus = d.reservationStatus;
        reservation.clientName = d.clientName;
        reservation.clientLastName = d.clientLastName;
        res.push(reservation);
      });
    });

    return of(res);
  }

  public getReservationById(id: number): Observable<ReservationDTO> {
    let res: Observable<ReservationReciveDTO> = this.http.get<ReservationReciveDTO>(this.reservationsUrl + "/getReservation/" + id);
    let reservation: ReservationDTO = new ReservationDTO();
    
    res.subscribe(d => {
      reservation.startDate = new NgbDate(d.startDate[0],d.startDate[1],d.startDate[2]);  
      reservation.endDate = new NgbDate(d.endDate[0],d.endDate[1],d.endDate[2]);
      reservation.offerId = d.offerId;
      reservation.totalPrice = d.totalPrice;
      reservation.id = d.id;
      reservation.clientId = d.clientId;
      reservation.reservationStatus = d.reservationStatus;
      reservation.clientName = d.clientName;
      reservation.clientLastName = d.clientLastName;
    });

    return of(reservation);
  }

  public getClientByReservationId(id: number): Observable<string> {
    return this.http.get<string>(this.reservationsUrl + "/getClientByReservationId/" + id);
  }
}
