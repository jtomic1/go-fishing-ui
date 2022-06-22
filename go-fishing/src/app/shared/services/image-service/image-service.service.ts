import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ImageServiceService {
  imagesPath = '../../../../../assets/images/';

  constructor() {}

  get loyaltyBadge() {
    return this.imagesPath + 'loyalty-badges/silver_badge.png';
  }
}
