import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FreePeriodService } from 'src/app/shared/services/free-period-service/free-period.service';
import { MessageService, MessageType } from 'src/app/shared/services/message-service/message.service';
import { ReservationService } from 'src/app/shared/services/reservation-service/reservation.service';
import { UserService } from 'src/app/shared/services/users-services/user.service';
import { FreePeriodDTO } from 'src/models/freePeriod';
import { ActionDTO, ReservationDTO } from 'src/models/reservation';
import { AdventureService } from '../../adventure.service';

@Component({
  selector: 'app-adventure-instructor-calendar',
  templateUrl: './adventure-instructor-calendar.component.html',
  styleUrls: ['./adventure-instructor-calendar.component.css']
})
export class AdventureInstructorCalendarComponent implements OnInit {

  constructor(private route: ActivatedRoute,
              private freePeriodService: FreePeriodService,
              private adventureService: AdventureService,
              private messageService: MessageService,
              private reservationService: ReservationService) { }

  //freePeriods.length > 0 || actions.length > 0
  renderCalendar: number = 0;
  instructorId: number;
  freePeriods: FreePeriodDTO[];
  actions: ActionDTO[];
  reservations: ReservationDTO[] = [];
  adventureIds: number[] = [];

  ngOnInit(): void {
    this.instructorId = Number(this.route.snapshot.paramMap.get('id'));
    if(!isNaN(this.instructorId)){
      this.adventureService.getAdventureIds(this.instructorId).subscribe( async ids => {
        this.adventureIds = ids as number[];
        this.getFreePeriods();
        this.getActions();
        this.getReservations();
        await this.delay(1000);
        this.renderCalendar = 3;
      });
    }
  }

  getFreePeriods() {
    this.freePeriodService.getFreePeriodsForOffers(this.adventureIds.join()).subscribe(data => {
      this.freePeriods = data;
    });
  }

  getActions() {
    this.adventureService.getActionsForOffers(this.adventureIds.join()).subscribe(data => {
      this.actions = data;
    });
  }

  getReservations(){
    this.reservationService.getReservationsForOwner(this.instructorId, 'I').subscribe(data=>{
      this.reservations = data;
    });
  }


  deletePeriod(id:number){

    console.log(id);
    this.freePeriodService.deleteFreePeriod(id).subscribe(data =>{
      this.freePeriods.forEach((element, index) => {if(element.id === id) this.freePeriods.splice(index, 1)});
      console.log(this.freePeriods);
      this.messageService.showMessage('Slobodan termin uspešno obrisan!', MessageType.SUCCESS);
    });
  }

  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
}

}
