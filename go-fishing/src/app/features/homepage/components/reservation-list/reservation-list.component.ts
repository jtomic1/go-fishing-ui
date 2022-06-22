import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import {
  MessageService,
  MessageType,
} from 'src/app/shared/services/message-service/message.service';
import { ReservationService } from 'src/app/shared/services/reservation-service/reservation.service';
import { CancelReservationDialogComponent } from './cancel-reservation-dialog/cancel-reservation-dialog.component';
import { ReviewReservationDialogComponent } from './review-reservation-dialog/review-reservation-dialog.component';

@Component({
  selector: 'app-reservation-list',
  templateUrl: './reservation-list.component.html',
  styleUrls: ['./reservation-list.component.css'],
})
export class ReservationListComponent implements OnInit {
  reservationList: any[] = [];

  // 'active' or 'past'
  mode: string = '';
  sort: FormControl = new FormControl('');
  constructor(
    private reservationService: ReservationService,
    private dialog: MatDialog,
    private router: Router,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.setMode();
    if (this.mode === 'active') {
      this.reservationService.getActiveReservations().subscribe((res: any) => {
        this.reservationList = res;
      });
    } else if (this.mode === 'past') {
      this.reservationService.getPastReservations().subscribe((res: any) => {
        this.reservationList = res;
      });
    }

    this.subscribeToSort();
  }

  subscribeToSort() {
    this.sort.valueChanges.subscribe((res) => {
      switch (res) {
        case 'earliest':
          this.reservationList = this.reservationList.sort((a, b) => {
            return this.compareDateArray(a.startDate, b.startDate);
          });
          break;
        case 'latest':
          this.reservationList = this.reservationList.sort((a, b) => {
            return this.compareDateArray(b.startDate, a.startDate);
          });
          break;
        case 'longest':
          this.reservationList = this.reservationList.sort((a, b) => {
            return (
              this.compareDateArrayLength(a.startDate, a.endDate) -
              this.compareDateArrayLength(b.startDate, b.endDate)
            );
          });
          break;
        case 'shortest':
          this.reservationList = this.reservationList.sort((a, b) => {
            return (
              this.compareDateArrayLength(b.startDate, b.endDate) -
              this.compareDateArrayLength(a.startDate, a.endDate)
            );
          });
          break;
        case 'least-expensive':
          this.reservationList = this.reservationList.sort((a, b) => {
            return a.totalPrice - b.totalPrice;
          });
          break;
        case 'most-expensive':
          this.reservationList = this.reservationList.sort((a, b) => {
            return b.totalPrice - a.totalPrice;
          });
          break;
      }
    });
  }

  setMode(): void {
    switch (this.router.url) {
      case '/home/activeReservations':
        this.mode = 'active';
        break;
      case '/home/pastReservations':
        this.mode = 'past';
        break;
      default:
        break;
    }
  }

  get totalItems() {
    return this.reservationList.length;
  }

  public openCancelDialog(item: any) {
    let toDelete = item;
    const dialogRef = this.dialog.open(CancelReservationDialogComponent);

    dialogRef.afterClosed().subscribe((res: any) => {
      if (res !== undefined) {
        if (res.delete) {
          this.cancelReservation(toDelete.id);
          this.messageService.showMessage(
            'Reservation cancelled successfully!',
            MessageType.SUCCESS
          );
        }
      }
    });
  }

  public openReviewDialog(item: any) {
    let data = 'review';
    const dialogRef = this.dialog.open(ReviewReservationDialogComponent, {
      data: data,
    });

    dialogRef.afterClosed().subscribe((res: any) => {
      if (res !== undefined) {
        res.id = item.id;
        this.addReview(res);
      }
    });
  }

  public cancelReservation(reservation: any) {
    this.reservationService.cancelReservation(reservation).subscribe(
      (res: any) => {
        this.reservationList.splice(
          this.reservationList.findIndex((item) => item.id === reservation),
          1
        );
      },
      (err: any) => {
        console.log(err);
      }
    );
  }

  public openComplaintDialog(item: any) {
    let data = 'complaint';

    const dialogRef = this.dialog.open(ReviewReservationDialogComponent, {
      data: data,
    });

    dialogRef.afterClosed().subscribe((res: any) => {
      if (res !== undefined) {
        res.id = item.id;
        this.addComplaint(res);
      }
    });
  }

  public addReview(data: any) {
    this.reservationService.addReview(data).subscribe((res: any) => {
      let index = this.reservationList.findIndex((item) => item.id === data.id);
      this.reservationList[index].canCancel = false;
      this.messageService.showMessage(
        'Review sent successfully!',
        MessageType.SUCCESS
      );
    });
  }

  public addComplaint(data: any) {
    this.reservationService.addComplaint(data).subscribe((res: any) => {
      let index = this.reservationList.findIndex((item) => item.id === data.id);
      this.reservationList[index].canComplain = false;
      this.messageService.showMessage(
        'Complaint sent successfully!',
        MessageType.SUCCESS
      );
    });
  }

  getDateString(dateArray: any): String {
    return dateArray[2] + '.' + dateArray[1] + '.' + dateArray[0] + '.';
  }

  compareDateArray(startDateArray: any, endDateArray: any): number {
    if (startDateArray[0] > endDateArray[0]) return 1;
    else if (startDateArray[0] < endDateArray[0]) return -1;
    else if (startDateArray[1] > endDateArray[1]) return 1;
    else if (startDateArray[1] < endDateArray[1]) return -1;
    else if (startDateArray[2] > endDateArray[2]) return 1;
    else if (startDateArray[2] < endDateArray[2]) return -1;
    else return 0;
  }

  compareDateArrayLength(startDateArray: any, endDateArray: any): number {
    let startDate = new Date(
      startDateArray[0],
      startDateArray[1] - 1,
      startDateArray[2]
    );
    let endDate = new Date(
      endDateArray[0],
      endDateArray[1] - 1,
      endDateArray[2]
    );

    console.log(startDate);
    console.log(endDate);

    return startDate.getTime() - endDate.getTime();
  }
}
