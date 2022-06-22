import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MessageService, MessageType } from 'src/app/shared/services/message-service/message.service';
import { ActionSendDTO } from 'src/models/reservation';
import { AdventureService } from '../../adventure.service';
import { Adventure } from '../../classes/adventure';

@Component({
  selector: 'app-adventure-action',
  templateUrl: './adventure-action.component.html',
  styleUrls: ['./adventure-action.component.css']
})
export class AdventureActionComponent implements OnInit {

  start: string;
  end: string;

  today: Date;

  newPrice: number;
  form: FormGroup = this.createForm();

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

  constructor(private route: ActivatedRoute,
              private adventureService: AdventureService,
              private messageService: MessageService) { }

  ngOnInit(): void {
    this.adventureId = Number(this.route.snapshot.paramMap.get('id'));

    if(!isNaN(this.adventureId)){
      this.adventureService.getAdventureById(this.adventureId).subscribe(adventure =>{
        this.adventure = adventure;
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

  createForm(): FormGroup {
    return new FormGroup({
      discount: new FormControl('')
    });
  }

  CountNewPrice() {
    this.newPrice = this.adventure.price - (this.adventure.price * this.form.get('discount')?.value / 100);
  }

  AddAction() {
    var start = document.getElementById("start") as HTMLInputElement;
    var startDateTime = start.value;
    var end = document.getElementById('end') as HTMLInputElement;
    var endDateTime = end.value;
    this.newPrice = this.adventure.price - (this.adventure.price * this.form.get('discount')?.value / 100);
    let action = new ActionSendDTO();
    action.startDate = startDateTime;
    action.endDate = endDateTime;
    action.offerId = this.adventureId;
    action.totalPrice = this.newPrice;
    if (this.form.valid && startDateTime !== '' && endDateTime !== '') {
      this.adventureService.addAction(action).subscribe(res => {
        this.messageService.showMessage('Nova akcija je dodata', MessageType.SUCCESS);  
      },
      error=>{
        this.messageService.showMessage(error.error,MessageType.ERROR);
      });
    } else {
      this.messageService.showMessage('Unesite ispravne podatke!', MessageType.WARNING);
    }
  }
}
