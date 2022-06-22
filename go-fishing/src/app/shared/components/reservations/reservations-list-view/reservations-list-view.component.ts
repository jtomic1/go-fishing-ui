import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ClientService } from 'src/app/shared/services/client-service/client.service';
import { UserService } from 'src/app/shared/services/users-services/user.service';
import { ReservationDTO } from 'src/models/reservation';
import { ReservationAddNewWithClientComponent } from '../reservation-add-new-with-clent/reservation-add-new-with-client.component';
import { ReservationEndReportComponent } from '../reservation-end-report/reservation-end-report.component';

@Component({
  selector: 'app-reservations-list-view',
  templateUrl: './reservations-list-view.component.html',
  styleUrls: ['./reservations-list-view.component.css']
})
export class ReservationListView implements OnInit {

  @Input() reservations: ReservationDTO[];
  
  @Input() ownerType:string;

  @Output() changed = new EventEmitter<number>()

  clientNames:any[] = [];

  constructor(
    private dialog: MatDialog,
    private userService: UserService) { }

  ngOnInit(): void {
  }


  addReservationDTO(id:number) {
    this.changed.emit(id);
  }
}
