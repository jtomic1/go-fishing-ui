import { Component, OnInit } from '@angular/core';
import { Boat } from 'src/models/boat';
import { BoatService } from '../../services/boat.service';
import { ActivatedRoute } from '@angular/router';
import { ActionService } from 'src/app/shared/services/action-service/action.service';
import { ActionDTO } from 'src/models/reservation';
import { MatDialog } from '@angular/material/dialog';
import { BoatReservationService } from '../boat-client-reservation-dialog/boat-reservation-service.service';
import {
  MessageService,
  MessageType,
} from 'src/app/shared/services/message-service/message.service';
import { ClientService } from 'src/app/shared/services/client-service/client.service';
import { BoatClientReservationDialogComponent } from '../boat-client-reservation-dialog/boat-client-reservation-dialog.component';
import { UserService } from 'src/app/shared/services/users-services/user.service';
import { CottageActionConfirmDialogComponent } from 'src/app/features/cottage/components/cottage-action-confirm-dialog/cottage-action-confirm-dialog.component';
import { UserprofileService } from 'src/app/features/homepage/components/userprofile/userprofile.service';

@Component({
  selector: 'app-boat-profilepage',
  templateUrl: './boat-profilepage.component.html',
  styleUrls: ['./boat-profilepage.component.css'],
})
export class BoatProfilepageComponent implements OnInit {
  boatId: number;
  boat: Boat;

  actions: ActionDTO[];

  clientLoggedIn: boolean;

  isSuscribed: boolean;

  extraFavors: string[];

  ownerName: string;

  hasFreePeriods: boolean = true;

  canReserve: boolean = true;
  constructor(
    private route: ActivatedRoute,
    private boatService: BoatService,
    private actionService: ActionService,
    private dialog: MatDialog,
    private reservationService: BoatReservationService,
    private messageService: MessageService,
    private clientService: ClientService,
    private userService: UserService,
    private profileService: UserprofileService
  ) {}
  ngOnInit(): void {
    this.boatId = Number(this.route.snapshot.paramMap.get('id'));
    this.boatService.findBoatById(this.boatId).subscribe((data) => {
      this.boat = data;
      if (this.boat != null && this.boat.extraFavors != null)
        this.extraFavors = this.boat.extraFavors.split('|');
      this.userService.findById(this.boat.ownerId).subscribe((data) => {
        this.ownerName = data.name + ' ' + data.lastName;
      });
    });

    if (localStorage.getItem('user-role') === 'ROLE_USER') {
      this.profileService.getPenaltyCount().subscribe((res) => {
        if (res >= 3) this.canReserve = false;
      });
    }
    if (this.isAuthentified) {
      this.reservationService
        .getFreePeriodsById(this.boatId)
        .subscribe((res: any) => {
          this.hasFreePeriods = res.length > 0;
        });

      this.userService.isLoggedUserOnlyClient().subscribe((data) => {
        this.clientLoggedIn = data;
      });
    }

    this.actionService.getActionsForOffer(this.boatId).subscribe((data) => {
      this.actions = data;
    });
  }

  public openActionConfirmDialog(item: any) {
    let data = {
      id: item.id,
      name: this.boat.name,
      startDate: item.getStartDateString(),
      endDate: item.getEndDateString(),
      totalPrice: item.totalPrice,
      mode: 'Boat',
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
        this.reservationService.confirmAction(item.id).subscribe((res: any) => {
          this.messageService.showMessage(
            'Action reserved successfully!',
            MessageType.SUCCESS
          );
        });
      }
    });
  }

  public openReservationDialog() {
    this.reservationService
      .getFreePeriodsById(this.boatId)
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
          id: this.boat.id,
          name: this.boat.name,
          startDate: localStorage.getItem('startDate'),
          endDate: localStorage.getItem('endDate'),
          pricePerDay: this.boat.price,
          rangeFilter: rangeFilter,
          dateRangeArray: dateRangeArray,
        };
        const dialogRef = this.dialog.open(
          BoatClientReservationDialogComponent,
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
                this.boatId
              )
              .subscribe((res: any) => {
                this.messageService.showMessage(
                  res.status,
                  MessageType.SUCCESS
                );
              });
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

  getIsSuscribed() {
    this.clientService.isSuscribedToOffer(this.boatId).subscribe((data) => {
      console.log(data);
      this.isSuscribed = data;
    });
  }

  addSubscription() {
    this.clientService.addSubscription(this.boatId).subscribe((data) => {
      this.getIsSuscribed();
    });
  }
  removeSubscription() {
    this.clientService.removeSubscription(this.boatId).subscribe((data) => {
      this.getIsSuscribed();
    });
  }

  get isAuthentified() {
    return localStorage.getItem('jwt') !== null;
  }
}
