import { Offer } from './offer';

export class Cottage implements Offer {
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
    roomCount: number;
    bedCount:number;

}
