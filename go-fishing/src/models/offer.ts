export interface Offer {
  id:number;
  name: string;
  description: string;
  images?: Array<string>;
  rulesOfConduct: Array<string>;
  price: number;
  deleted: boolean;
  capacity: number;
  averageRating: number;
  extraFavors:string;

}
