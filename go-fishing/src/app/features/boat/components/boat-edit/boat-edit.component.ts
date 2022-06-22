import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Boat } from 'src/models/boat';
import { BoatService } from '../../services/boat.service';
import { FormsModule } from '@angular/forms';
import { MessageService, MessageType } from 'src/app/shared/services/message-service/message.service';

@Component({
  selector: 'app-boat-edit',
  templateUrl: './boat-edit.component.html',
  styleUrls: ['./boat-edit.component.css']
})
export class BoatEditComponent implements OnInit {
  
  boatId:number;
  currentBoat:Boat;

  newBoat: Boat = new Boat();
  name :string;
  price:number;
  capacity:number;
  promoDescription : string;
  extraFavorsString:string;

  constructor(private boatService:BoatService,
    private route: ActivatedRoute,
    private router:Router,
    private messageService:MessageService) { }

  ngOnInit(): void {
    this.boatId = Number(this.route.snapshot.paramMap.get('id'));
    this.boatService.findBoatById(this.boatId).subscribe(data=>{
      this.currentBoat = data;
      console.log(this.currentBoat);
      this.name = this.currentBoat.name;
      this.price = this.currentBoat.price;
      this.capacity = this.currentBoat.capacity;
      this.promoDescription = this.currentBoat.description;
    })
  }

  editBoat() {
    this.newBoat.name = this.name;
    this.newBoat.price = this.price;
    this.newBoat.capacity = this.capacity;
    this.newBoat.description = this.promoDescription;
    this.newBoat.id = this.boatId;

    
    this.boatService.editBoat(this.newBoat).subscribe(response => {
      this.messageService.showMessage("Uspešno ste izmenili brod.",MessageType.SUCCESS);
      this.router.navigateByUrl("/boatProfile/"+this.boatId);
    },err =>{
      this.messageService.showMessage("Niste u mogucnosti da izmenite brod",MessageType.ERROR);
      
    });

  }
}
