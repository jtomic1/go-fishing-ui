import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'src/app/shared/services/message-service/message.service';
import { ReservationService } from 'src/app/shared/services/reservation-service/reservation.service';
import { ReservationDTO } from 'src/models/reservation';
import { AdventureService } from '../../adventure.service';
import { Adventure } from '../../classes/adventure';

@Component({
  selector: 'app-adventure-reservations',
  templateUrl: './adventure-reservations.component.html',
  styleUrls: ['./adventure-reservations.component.css']
})
export class AdventureReservationsComponent implements OnInit {

  instructorId: number;
  adventures: Adventure[];
  reservations: ReservationDTO[];
  ownerType: string = 'I';

  constructor(private route: ActivatedRoute,
              private adventureService: AdventureService,
              private reservationService: ReservationService,
              private messageService: MessageService) { }

  ngOnInit(): void {
    this.instructorId = Number(this.route.snapshot.paramMap.get('id'));

    if(!isNaN(this.instructorId)){
      this.adventureService.getAdventuresOfInstructor(this.instructorId).subscribe(adventures => {
        this.adventures = adventures; 
      });
      this.reservationService.getReservationsForOwner(this.instructorId, "I").subscribe(data => {
        this.reservations = data;
      });
      console.log(this.reservations);
    }
  }

  onChange(offerId:any){
    /*
    if(offerId == "all"){
      this.reservationService.getReservationsForOwner(this.ownerId,this.ownerType).subscribe(
        data => {
          this.reservations = data;
          console.log(data);
          console.log(this.reservations);
        }
      );
    }
    else{
      this.reservationService.getReservationsForOffer(offerId).subscribe(data=>{
        this.reservations = data;
        console.log(this.reservations);
      });
    }
    */
  }

}
