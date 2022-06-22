import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  MessageService,
  MessageType,
} from 'src/app/shared/services/message-service/message.service';
import { Boat } from 'src/models/boat';
import { BoatService } from '../../services/boat.service';

@Component({
  selector: 'app-boat-add-new',
  templateUrl: './boat-add-new.component.html',
  styleUrls: ['./boat-add-new.component.css'],
})
export class BoatAddNewComponent implements OnInit {
  @Input() ownerId: number;
  @Input() boats: Boat[];

  newBoat: Boat = new Boat();
  name: string;
  price: number;
  capacity: number;
  promoDescription: string;
  bedCount: number;

  boatType: string;
  length: number;
  numOfEngines: number;
  powerOfEngines: number;
  maxSpeed: number;
  reservationCancellationTerms?: string;

  extraFavorsString:String;


  constructor(
    private boatService: BoatService,
    private router: Router,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    if (localStorage.getItem('user-role') !== 'ROLE_BOAT_OWNER') {
      this.router.navigateByUrl('');
    }
    this.ownerId = history.state.ownerId;
  }

  addNewBoat() {
    this.newBoat.name = this.name;
    this.newBoat.price = this.price;
    this.newBoat.capacity = this.capacity;
    this.newBoat.description = this.promoDescription;
    this.newBoat.ownerId = this.ownerId;

    this.newBoat.boatType = this.boatType;
    this.newBoat.length = this.length;
    this.newBoat.numOfMotors = this.numOfEngines;
    this.newBoat.powerOfEngines = this.powerOfEngines;
    this.newBoat.reservationCancellationTerms = this.reservationCancellationTerms;
    this.newBoat.extraFavors = this.extraFavorsString.split(/\r?\n/).join("|");
    this.newBoat.maxSpeed = this.maxSpeed;

    
    this.boatService.addNewBoat(this.newBoat).subscribe(data =>{
      this.messageService.showMessage("Uspešno ste dodali novi brod.",MessageType.SUCCESS);
    });

    this.boatService.addNewBoat(this.newBoat).subscribe((data) => {
      this.messageService.showMessage(
        'Uspešno ste dodali novi brod.',
        MessageType.SUCCESS
      );
    });

    this.router.navigate(['/boatOwner/' + this.ownerId]);
  }
}
