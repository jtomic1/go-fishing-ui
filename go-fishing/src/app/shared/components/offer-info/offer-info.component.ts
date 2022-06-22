import { Component, Input, OnInit } from '@angular/core';
import { OfferService } from '../../services/offer-service/offer.service';
import { Offer } from 'src/models/offer';
import { Router } from '@angular/router';

@Component({
  selector: 'app-offer-info',
  templateUrl: './offer-info.component.html',
  styleUrls: ['./offer-info.component.css']
})
export class OfferInfoComponent implements OnInit {

  @Input() offerId: number;
  offer: Offer;
  offerType: string;

  constructor(private offerService:OfferService,private router:Router) { }

  ngOnInit(): void {
    
    this.offerService.getCottageById(this.offerId).subscribe(data =>{
      this.offer = <Offer>data;
      
      if(this.offer == undefined){
        this.offerService.getBoatById(this.offerId).subscribe(data => {
          this.offer = <Offer>data;

          if(this.offer == undefined){
            this.offerService.getAdventureById(this.offerId).subscribe(
              data=> {
                console.log(data);
                this.offer = <Offer><unknown>data;
                this.offerType = this.getOfferType(data);
              }
            )
          }
          else{
            this.offerType = this.getOfferType(data);
          }

        });
      }
      else{
        this.offerType = this.getOfferType(data);
      }
    });
  }

  getOfferType(offer:Object):string{

    if(offer.hasOwnProperty("maxSpeed"))
      return "B";
    if(offer.hasOwnProperty("instructorBiography"))
      return "I";
    if(offer.hasOwnProperty("ownerId")) 
      return "C";
    
    return "N";
  }

  openProfile(){
    console.log(this.offerType)
    switch(this.offerType){
      case "C":
        this.router.navigate(["cottageProfile/"+this.offerId])
        break;
      case "B":
        this.router.navigate(["boatProfile/"+this.offerId])
        break;
      case "I":
        this.router.navigate(["adventureProfile/"+this.offerId])
        break;
    }
  }
}
