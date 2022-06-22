import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ComplaintService } from 'src/app/shared/services/complaint-service/complaint.service';
import { ComplaintDTO } from 'src/models/complaint';
import { ClientService } from 'src/app/shared/services/client-service/client.service';
import { User } from '../../../classes/user';
import { UserService} from 'src/app/shared/services/users-services/user.service'
import { Offer } from 'src/models/offer';
import { OfferService } from 'src/app/shared/services/offer-service/offer.service';
import { NgbCalendar, NgbDate, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { ReservationSendDTO, ReservationStatus } from 'src/models/reservation';
import { ReservationService } from 'src/app/shared/services/reservation-service/reservation.service';
import { MessageService, MessageType } from 'src/app/shared/services/message-service/message.service';

@Component({
  selector: 'reservation-add-new-with-client',
  templateUrl: './reservation-add-new-with-client.component.html',
  styleUrls: ['./reservation-add-new-with-client.component.css']
})
export class ReservationAddNewWithClientComponent implements OnInit {


  ownerType:string;

  offerId:number;
  offer: Offer;

  clientId:number;
  client : User;
  
  
  hoveredDate: NgbDate | null = null;

  fromDate: NgbDate | null;
  toDate: NgbDate | null;

  today: NgbDate ;

  constructor(
    public dialogRef: MatDialogRef<ReservationAddNewWithClientComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any[],
    private calendar: NgbCalendar,
    public formatter: NgbDateParserFormatter,
    private userService:UserService,
    private offerService:OfferService,
    private reservationService:ReservationService,
    private messageService:MessageService) { }

  ngOnInit(): void {
        this.offerId = this.data[0];
        this.clientId = this.data[1];
        this.ownerType = this.data[2];

        this.userService.findById(this.clientId).subscribe(
          data => {
            this.client = data;
          }
        );
        
        if(this.ownerType == "C"){
          this.offerService.getCottageById(this.offerId).subscribe(
            data=>{
              this.offer = data;
            }
          )
        }
        if(this.ownerType == "B"){
          this.offerService.getBoatById(this.offerId).subscribe(
            data=>{
              this.offer = data;
            }
          )
        }

  }

  addNewReservation(){
      let newReservation = new ReservationSendDTO();

      newReservation.clientId = this.clientId;
      newReservation.offerId = this.offerId;
      newReservation.reservationStatus = ReservationStatus.ACTIVE;
      if(this.fromDate == undefined || this.toDate == undefined){
        this.messageService.showMessage("Odaberite datume!",MessageType.ERROR);
        return;
      }
      newReservation.startDate = this.formatKum(this.fromDate);
      newReservation.endDate = this.formatKum(this.toDate);
      let offerType = "";
      if(this.ownerType == 'C')
        offerType ="cottage";
      else if(this.ownerType == 'B')
        offerType = "boat";
      else
        offerType = "adventure"

      this.reservationService.addNewReservationWithClient(newReservation,offerType).subscribe(data =>{
        this.dialogRef.close({newReservation});
        this.messageService.showMessage(
          "Uspešno dodata rezervacija.",MessageType.SUCCESS
        );
      },(error:any )=>{
        this.messageService.showMessage(error.error,MessageType.ERROR);
      });
       
  } 

  cancelReport(){
    this.dialogRef.close();
  }

  onDateSelection(date: NgbDate) {
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
    } else if (this.fromDate && !this.toDate && date && date.after(this.fromDate)) {
      this.toDate = date;
    } else {
      this.toDate = null;
      this.fromDate = date;
    }
  }

  isHovered(date: NgbDate) {
    return this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate) &&
        date.before(this.hoveredDate);
  }

  isInside(date: NgbDate) { return this.toDate && date.after(this.fromDate) && date.before(this.toDate); }

  isRange(date: NgbDate) {
    return date.equals(this.fromDate) || (this.toDate && date.equals(this.toDate)) || this.isInside(date) ||
        this.isHovered(date);
  }

  validateInput(currentValue: NgbDate | null, input: string): NgbDate | null {
    const parsed = this.formatter.parse(input);
    return parsed && this.calendar.isValid(NgbDate.from(parsed)) ? NgbDate.from(parsed) : currentValue;
  }

  format(date: NgbDate | null): string {
    let stringDate: string = ""; 
    if(date != null) {
      stringDate += date.year+"-";
      stringDate += date.month ? date.month<10 ? "0"+date.month +"-": date.month + "-" : "01-";
      stringDate += date.day ? date.day < 10 ? "0"+date.day : date.day : "01";
      stringDate += "T00:00:00"
    }
    return stringDate;
  }
  formatKum(date: NgbDate | null): string {
    let stringDate: string = ""; 
    if(date != null) {
      stringDate += date.day + "-";
      stringDate += date.month +"-" ;
      stringDate += date.year;
    }
    return stringDate;
  }
}
