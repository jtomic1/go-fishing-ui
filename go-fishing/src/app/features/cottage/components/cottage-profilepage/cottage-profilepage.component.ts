import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { iif } from 'rxjs';
import { UserprofileService } from 'src/app/features/homepage/components/userprofile/userprofile.service';
import { ActionService } from 'src/app/shared/services/action-service/action.service';

import { ClientService } from 'src/app/shared/services/client-service/client.service';
import { GradeService } from 'src/app/shared/services/grade-service/grade-service.service';

import {
  MessageService,
  MessageType,
} from 'src/app/shared/services/message-service/message.service';
import { UserService } from 'src/app/shared/services/users-services/user.service';

import { Cottage } from 'src/models/cottage';
import { Grade } from 'src/models/grade';
import { ActionDTO } from 'src/models/reservation';
import { CottageService } from '../../services/cottage.service';
import { CottageActionConfirmDialogComponent } from '../cottage-action-confirm-dialog/cottage-action-confirm-dialog.component';
import { CottageClientReservationDialogComponent } from '../cottage-client-reservation-dialog/cottage-client-reservation-dialog.component';
import { CottageReservationService } from '../cottage-client-reservation-dialog/cottage-reservation.service';

@Component({
  selector: 'app-cottage-profilepage',
  templateUrl: './cottage-profilepage.component.html',
  styleUrls: ['./cottage-profilepage.component.css'],
})
export class CottageProfilepageComponent implements OnInit {
  cottageId: number;
  cottage: Cottage;
  ownerName: string;

  actions: ActionDTO[];

  isSuscribed: boolean;

  hasFreePeriods: boolean = true;

  clientLoggedIn: boolean;

  extraFavors: string[];
  grades:Grade[];

  canReserve: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private cottageService: CottageService,
    private actionService: ActionService,
    private dialog: MatDialog,
    private reservationService: CottageReservationService,
    private messageService: MessageService,
    private clientService: ClientService,
    private userService: UserService,
    private profileService: UserprofileService,
    private gradeService:GradeService
  ) {}

  ngOnInit(): void {
    this.cottageId = Number(this.route.snapshot.paramMap.get('id'));
    if (!isNaN(this.cottageId)) {
      this.cottageService
        .findCottageById(this.cottageId)
        .subscribe((cottage) => {
          this.cottage = cottage;
          if (this.cottage != null && this.cottage.extraFavors != null)
            this.extraFavors = this.cottage.extraFavors.split('|');

          this.userService.findById(this.cottage.ownerId).subscribe((data) => {
            this.ownerName = data.name + ' ' + data.lastName;
          });
        });

      if (this.isAuthentified) {
        this.userService.isLoggedUserOnlyClient().subscribe((data) => {
          this.clientLoggedIn = data;
        });

        this.getIsSuscribed();

        this.reservationService
          .getFreePeriodsById(this.cottageId)
          .subscribe((res: any) => {
            this.hasFreePeriods = res.length > 0;
          });
      }
      if (localStorage.getItem('user-role') === 'ROLE_USER') {
        this.profileService.getPenaltyCount().subscribe((res) => {
          if (res >= 3) this.canReserve = false;
        });
      }
      this.actionService
        .getActionsForOffer(this.cottageId)
        .subscribe((actions) => {
          this.actions = actions;
        });

      this.getIsSuscribed();

      this.reservationService
        .getFreePeriodsById(this.cottageId)
        .subscribe((res: any) => {
          this.hasFreePeriods = res.length > 0;
        });

      this.gradeService.getReviewsForOffer(this.cottageId).subscribe(
        res =>{
          console.log(res);
          this.grades = res;
        }
      )
    }
  }

  getIsSuscribed() {
    this.clientService.isSuscribedToOffer(this.cottageId).subscribe((data) => {
      console.log(data);
      this.isSuscribed = data;
    });
  }

  addSubscription() {
    this.clientService.addSubscription(this.cottageId).subscribe((data) => {
      this.getIsSuscribed();
    });
  }
  removeSubscription() {
    this.clientService.removeSubscription(this.cottageId).subscribe((data) => {
      this.getIsSuscribed();
    });
  }

  public openActionConfirmDialog(item: any) {
    let data = {
      id: item.id,
      name: this.cottage.name,
      startDate: item.getStartDateString(),
      endDate: item.getEndDateString(),
      totalPrice: item.totalPrice,
      mode: 'Cottage',
    };
    const dialogRef = this.dialog.open(CottageActionConfirmDialogComponent, {
      data: data,
    });

    dialogRef.afterClosed().subscribe((res: any) => {
      if (res !== undefined) {
        this.actions.splice(
          this.actions.findIndex((i) => i.id === item.id),
          1
        );
        this.reservationService.confirmAction(item.id).subscribe(
          (res: any) => {
            this.messageService.showMessage(
              'Action reserved successfully!',
              MessageType.SUCCESS
            );
          },
          (err: any) => {
            this.messageService.showMessage(
              'Your reservation has been declined!',
              MessageType.ERROR
            );
          }
        );
      }
    });
  }

  public openReservationDialog() {
    this.reservationService
      .getFreePeriodsById(this.cottage.id)
      .subscribe((res: any) => {
        let dateRangeArray: any = [];
        for (let i of res) dateRangeArray.push(this.convertDateRangeString(i));
        let rangeFilter = function (date: Date) {
          for (let range of dateRangeArray) {
            date.setMilliseconds(0);
            range[0].setMilliseconds(0);
            if (date >= range[0] && date <= range[1]) return true;
          }
          return false;
        };

        let data = {
          id: this.cottage.id,
          name: this.cottage.name,
          startDate: localStorage.getItem('startDate'),
          endDate: localStorage.getItem('endDate'),
          pricePerDay: this.cottage.price,
          rangeFilter: rangeFilter,
          dateRangeArray: dateRangeArray,
        };
        const dialogRef = this.dialog.open(
          CottageClientReservationDialogComponent,
          {
            data: data,
          }
        );

        dialogRef.afterClosed().subscribe((res: any) => {
          if (res !== undefined) {
            localStorage.removeItem('startDate');
            localStorage.removeItem('endDate');
            this.reservationService
              .createReservation(
                res.startDate,
                res.endDate,
                res.totalPrice,
                this.cottage.id
              )
              .subscribe(
                (res: any) => {
                  this.messageService.showMessage(
                    res.status,
                    MessageType.SUCCESS
                  );
                },
                (err: any) => {
                  this.messageService.showMessage(
                    'Your reservation has been declined!',
                    MessageType.ERROR
                  );
                }
              );
          }
        });
      });
  }

  convertDateRangeString(str: string): any {
    let date1String = str.split(' ')[0];
    let date2String = str.split(' ')[1];

    let date1Tokens = date1String.split('-');
    let date2Tokens = date2String.split('-');

    let date1: Date = new Date();
    let date2: Date = new Date();

    date1.setDate(+date1Tokens[0]);
    date1.setMonth(+date1Tokens[1] - 1);
    date1.setFullYear(+date1Tokens[2]);
    date1.setHours(0);
    date1.setMinutes(0);
    date1.setSeconds(0);

    date2.setDate(+date2Tokens[0]);
    date2.setMonth(+date2Tokens[1] - 1);
    date2.setFullYear(+date2Tokens[2]);
    date2.setHours(0);
    date2.setMinutes(0);
    date2.setSeconds(0);

    return [date1, date2];
  }

  get reservationTooltipText() {
    if (!this.canReserve) return 'Your reservation privileges are disabled!';
    return 'No free periods are available!';
  }

  get isAuthentified() {
    return localStorage.getItem('jwt') !== null;
  }
}
