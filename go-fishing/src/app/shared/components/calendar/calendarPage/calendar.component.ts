import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MessageService, MessageType } from 'src/app/shared/services/message-service/message.service';
import { ReservationService } from 'src/app/shared/services/reservation-service/reservation.service';
import { UserService } from 'src/app/shared/services/users-services/user.service';
import { ActionDTO, ReservationDTO } from 'src/models/reservation';
import { FreePeriodDTO } from '../../../../../models/freePeriod';
import { ActionService } from '../../../services/action-service/action.service';
import { FreePeriodService } from '../../../services/free-period-service/free-period.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {

  offerId : number;
  freePeriods: FreePeriodDTO[];
  actions: ActionDTO[];
  reservations: ReservationDTO[];

  editPeriods = false;
  editActions = false;

  ownerLoggedIn:boolean;
  
  constructor(private route:ActivatedRoute,
    private freePeriodService:FreePeriodService,
    private actionServce:ActionService,
    private userService:UserService,
    private reservationService:ReservationService,
    private messageService:MessageService) { }

  ngOnInit(): void {
    
    this.offerId = Number(this.route.snapshot.paramMap.get('id'));
    this.getFreePeriods();
    this.getActions();
    this.getReservations();

    this.userService.isLoggedUserOfferOwner(this.offerId).subscribe(
      data=>{
        this.ownerLoggedIn= data;
      }
    );

  }

  getFreePeriods(){
    this.freePeriodService.getFreePeriodsForOffer(this.offerId).subscribe(data =>{
      this.freePeriods = data;

    });
  }
  getActions(){
    this.actionServce.getActionsForOffer(this.offerId).subscribe(data =>{
      this.actions = data;
      
    });
  }
  
  getReservations(){
    this.reservationService.getReservationsForOffer(this.offerId).subscribe(data=>{
      this.reservations = data;
    });
  }

  deletePeriod(id:number){
    
    if(confirm("Da li ste sigurni da zelite da izbrišete period dostupnosti?")){
      
      this.freePeriodService.deleteFreePeriod(id).subscribe(data =>{
        this.getFreePeriods();
        this.messageService.showMessage("Uspešno ste obrisali period dostupnosti.",MessageType.SUCCESS);
      });
    }
  }

  
  deleteAction(id:number){
    if(confirm("Da li ste sigurni da zelite da izbrišete akciju?")){
      this.actionServce.deleteAction(id).subscribe(data =>{
        this.getActions();
        this.messageService.showMessage("Uspešno ste obrisali akciju.",MessageType.SUCCESS);
      });
    }
  }

  getParentMethod():any {
    return {
      callParentMethod: () => {
        this.getFreePeriods();
        this.getActions();
        this.getReservations();
      }
    }
  }

  editPeriodsClick(){
    this.editPeriods = !this.editPeriods;
    if(this.editPeriods){
      this.editActions = false;
    }
  }

  editActionsClick(){
    this.editActions = !this.editActions;
    if(this.editActions){
      this.editPeriods = false;
    }
  }

}
