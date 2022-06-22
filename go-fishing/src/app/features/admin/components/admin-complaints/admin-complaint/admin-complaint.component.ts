import { Component, Input, OnInit } from '@angular/core';
import { ComplaintService } from 'src/app/shared/services/complaint-service/complaint.service';
import { MessageService, MessageType } from 'src/app/shared/services/message-service/message.service';
import { ReservationService } from 'src/app/shared/services/reservation-service/reservation.service';
import { ComplaintDTO } from 'src/models/complaint';
import { ReservationDTO } from 'src/models/reservation';

@Component({
  selector: 'app-admin-complaint',
  templateUrl: './admin-complaint.component.html',
  styleUrls: ['./admin-complaint.component.css']
})
export class AdminComplaintComponent implements OnInit {

  @Input() complaint: ComplaintDTO;

  reservation: ReservationDTO = new ReservationDTO();

  refused: boolean = false;
  complaint_text: string = '';
  penalty_point_text: string = '';

  constructor(private reservationService: ReservationService,
              private complaintService: ComplaintService,
              private messageService: MessageService) { }

  ngOnInit(): void {
  
    this.reservationService.getReservationById(this.complaint.reservationId).subscribe(async r => {
      this.reservation = r;
      console.log(this.reservation);
      await this.delay(1000);
      if (this.complaint.fromOwner) {
        this.complaint_text = 'Oglašivač se žali na klijenta ' + this.reservation.clientName + ' ' + this.reservation.clientLastName;
      }
      else {
        this.complaint_text = 'Klijent ' + this.reservation.clientName + ' ' + this.reservation.clientLastName + ' se žali na pružaoca usluge!';
      }
  
      if (this.complaint.punishOffender && this.complaint.fromOwner) {
        this.penalty_point_text = 'Oglašivač zahteva da se klijent kazni!';
      }
      else if (this.complaint.punishOffender && this.complaint.forOffer) {
        this.penalty_point_text = 'Klijent zahteva da se oglašivač kazni!';
      }
    });
  }

  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }

  refuseComplaint() {
    this.complaintService.refuseComplaint(this.complaint.id).subscribe(res => {
      this.messageService.showMessage("Žalba je odbijena!", MessageType.SUCCESS);
      this.refused = true;
    });
  }

  sendResponse() {
    var responseInput = document.getElementById('response') as HTMLInputElement;
    this.complaintService.sendResponse(this.complaint.id, responseInput.value).subscribe(res => {
      this.messageService.showMessage("Odgovor na žalbu je poslat!", MessageType.SUCCESS);
      responseInput.value = "";
      this.refused = true;
    });

  }


}
