import { Offer } from './offer';

export class Boat implements Offer {
  extraFavors: string;
  id: number;
  name: string;
  description: string;
  images?: string[] | undefined;
  rulesOfConduct: string[];
  price: number;
  deleted: boolean;
  capacity: number;
  averageRating: number;
  ownerId:number;
  boatType: string;
  length: number;
  numOfMotors: number;
  powerOfEngines: number;
  maxSpeed: number;
  reservationCancellationTerms?: string;

  
}
