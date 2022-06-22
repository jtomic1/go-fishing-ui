import { NgbDate } from '@ng-bootstrap/ng-bootstrap';

export enum ReservationStatus {
  ACTIVE,
  IN_PROCESS,
  ENDED,
  CANCELED,
  FOR_ACTION,
}

export class ReservationDTO {
  id: number;
  offerId: number;
  startDate: NgbDate;
  endDate: NgbDate;
  totalPrice: number;
  reservationStatus: ReservationStatus;
  clientId: number;
  clientName: string;
  clientLastName: string;
  //add more reservation atributes

  getStartDateString(): string {
    return (
      this.startDate.day +
      '.' +
      this.startDate.month +
      '.' +
      this.startDate.year
    );
  }
  getEndDateString(): string {
    return (
      this.endDate.day + '.' + this.endDate.month + '.' + this.endDate.year
    );
  }
}

export class ReservationSendDTO {
  offerId: number;
  startDate: string;
  endDate: string;
  totalPrice: number;
  reservationStatus: ReservationStatus;
  clientId: number;
  //add more reservation atributes
}
export class ReservationReciveDTO {
  id: number;
  offerId: number;
  startDate: number[];
  endDate: number[];
  totalPrice: number;
  reservationStatus: ReservationStatus;
  clientId: number;
  clientName: string;
  clientLastName: string;
  //add more reservation atributes
}

export class ActionDTO {
  id: number;
  offerId: number;
  startDate: NgbDate;
  endDate: NgbDate;
  totalPrice: number;

  getStartDateString(): string {
    return (
      this.startDate.day +
      '.' +
      this.startDate.month +
      '.' +
      this.startDate.year
    );
  }
  getEndDateString(): string {
    return (
      this.endDate.day + '.' + this.endDate.month + '.' + this.endDate.year
    );
  }
}
export class ActionSendDTO {
  offerId: number;
  startDate: string;
  endDate: string;
  totalPrice: number;
}
export class ActionReciveDTO {
  id: number;
  offerId: number;
  startDate: number[];
  endDate: number[];
  totalPrice: number;
}
