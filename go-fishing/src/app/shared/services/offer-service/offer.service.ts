import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AdventureService } from 'src/app/features/adventure/adventure.service';
import { Adventure } from 'src/app/features/adventure/classes/adventure';
import { BoatService } from 'src/app/features/boat/services/boat.service';
import { CottageService } from 'src/app/features/cottage/services/cottage.service';
import { Boat } from 'src/models/boat';
import { Cottage } from 'src/models/cottage';
import { Offer } from 'src/models/offer';

@Injectable({
  providedIn: 'root'
})
export class OfferService {

  constructor(private cottageService: CottageService,
    private boatService: BoatService,
    private adventureService:AdventureService) { }

  getCottageById(offerId:number):Observable<Cottage>{
    
    let offer = this.cottageService.findCottageById(offerId);
    
    return offer;
    
  }

  getBoatById(offerId:number):Observable<Boat>{

    let offer = this.boatService.findBoatById(offerId);
    return offer;
  }

  getAdventureById(offerId:number):Observable<Adventure>{
    let offer = this.adventureService.getAdventureById(offerId);
    return offer;
  }
}
