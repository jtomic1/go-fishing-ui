import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ClientService } from 'src/app/shared/services/client-service/client.service';
import { UserService } from 'src/app/shared/services/users-services/user.service';
import { ReservationDTO } from 'src/models/reservation';
import { ReservationAddNewWithClientComponent } from '../reservation-add-new-with-clent/reservation-add-new-with-client.component';
import { ReservationEndReportComponent } from '../reservation-end-report/reservation-end-report.component';

@Component({
  selector: 'app-reservation-card',
  templateUrl: './reservation-card.component.html',
  styleUrls: ['./reservation-card.component.css']
})
export class ReservationCardComponent implements OnInit {

  @Input() reservation:ReservationDTO;
  @Input() ownerType:string;
  @Output() newReservation= new EventEmitter<number>();
  clientName:String;

  constructor(
    private dialog: MatDialog,
    private userService:UserService
  ) { }

  ngOnInit(): void {
    this.userService.findById(this.reservation.clientId).subscribe(data=>{
      this.clientName= data.name+" "+data.lastName;
    })
  }


  createDeletionForm(): FormGroup {
    return new FormGroup({
      reservationReport: new FormControl({ value: '' }, Validators.required),
    });
  }

  deletionForm: FormGroup = this.createDeletionForm();

  sendReservationReport(reservationId:number,clientId:number){
      this.dialog.open(ReservationEndReportComponent,{
        data: [reservationId,clientId]
      })
  }

  addNewReservation(offerId:number,clientId:number){
    let dialogRef = this.dialog.open(ReservationAddNewWithClientComponent,{
      data:[offerId,clientId,this.ownerType]
    })
    dialogRef.afterClosed().subscribe(
      res =>{
        this.newReservation.emit(offerId);
      }
    )
  }

}
