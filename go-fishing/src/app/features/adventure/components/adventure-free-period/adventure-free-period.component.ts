import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FreePeriodService } from 'src/app/shared/services/free-period-service/free-period.service';
import { MessageService, MessageType } from 'src/app/shared/services/message-service/message.service';
import { FreePeriodDTO, FreePeriodSendDTO } from 'src/models/freePeriod';
import { AdventureService } from '../../adventure.service';
import { Adventure } from '../../classes/adventure';

@Component({
  selector: 'app-adventure-free-period',
  templateUrl: './adventure-free-period.component.html',
  styleUrls: ['./adventure-free-period.component.css']
})
export class AdventureFreePeriodComponent implements OnInit {

  start: string;
  end: string;

  today: Date;

  adventureId: number;
  adventure = new Adventure({
    id: 0,
	  name: '',
	  promoDescription: '',
	  price: 0,
	  capacity: 0,

	  equipment: '',
	  rulesOfConduct: '',
	  rulesOfCancelation: '',
	  moreInfo: '',

	  street: '',
	  city: '',
	  country: '',
	  latitude: '',
	  longitude: '',

	  instructorId: 0,
	  instructorBiography: '',
	  instructorName: '',
	  instructorSurname: '',
    deleted: false,
    rating: 0
  });

  freePeriods: FreePeriodDTO[];

  constructor(private route: ActivatedRoute,
              private adventureService: AdventureService,
              private freePeriodService: FreePeriodService,
              private messageService: MessageService) { }

  ngOnInit(): void {
    this.adventureId = Number(this.route.snapshot.paramMap.get('id'));

    if(!isNaN(this.adventureId)){
      this.adventureService.getAdventureById(this.adventureId).subscribe(adventure =>{
        this.adventure = adventure;
      });

      this.freePeriodService.getFreePeriodsForOffer(this.adventureId).subscribe(data =>{
        console.log(data);
        this.freePeriods = data;
  
      });
    }

    this.today = new Date();
    var dd = this.today.getDate().toString();
    var mm = (this.today.getMonth() + 1).toString();
    var yyyy = this.today.getFullYear().toString();
    if(Number(dd) < 10){
      dd = '0' + dd;
    } 
    if(Number(mm) < 10){
      mm = '0' + mm;
    } 
    var t = yyyy + '-' + mm + '-' + dd + 'T00:00';
    var start = document.getElementById('start') as HTMLInputElement;
    start.setAttribute('min', t);
    var end = document.getElementById('end') as HTMLInputElement;
    end.setAttribute('min', t);
  }

  AddNewPeriod() {
    var start = document.getElementById("start") as HTMLInputElement;
    var startDateTime = start.value;
    var end = document.getElementById('end') as HTMLInputElement;
    var endDateTime = end.value;
    console.log(startDateTime);
    console.log(endDateTime);
    let freePeriod = new FreePeriodSendDTO();
    freePeriod.startDate = startDateTime;
    freePeriod.endDate = endDateTime;
    freePeriod.offerId = this.adventureId;
    if (startDateTime !== '' && endDateTime !== '') {
      this.freePeriodService.addFreePeriodAdventure(freePeriod).subscribe(response =>{
        console.log(response);
        this.messageService.showMessage('Novi slobodan termin je uspešno dodat!', MessageType.SUCCESS);
      },
      error=>{
        this.messageService.showMessage(error.error,MessageType.ERROR);
      });
    } else {
      this.messageService.showMessage('Unesite ispravne datume!', MessageType.WARNING);
    }
  }

}
