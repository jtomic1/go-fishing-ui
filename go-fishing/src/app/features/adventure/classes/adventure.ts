
export interface IAdventure {
	id?: number;
	name: string;
	promoDescription: string;
	price: number;
	capacity: number;

	equipment: string;
	rulesOfConduct: string;
	rulesOfCancelation: string;
	moreInfo: string;

	street: string;
	city: string;
	country: string;
	latitude: string;
	longitude: string;

	rating: number;

	instructorId: number;
	instructorBiography: string;
	instructorName: string;
	instructorSurname: string;
	deleted: boolean;
}

export class Adventure{
    id?: number;
	name: string;
	promoDescription: string;
	price: number;
	capacity: number;

	equipment: string;
	rulesOfConduct: string;
	rulesOfCancelation: string;
	moreInfo: string;

	street: string;
	city: string;
	country: string;
	latitude: string;
	longitude: string;

	rating: number;

	instructorId: number;
	instructorBiography: string;
	instructorName: string;
	instructorSurname: string;
	deleted: boolean;

	constructor(object: IAdventure) {
		this.id = object.id;
		this.name = object.name;
		this.promoDescription = object.promoDescription;
		this.price = object.price;
		this.capacity = object.capacity;
		this.instructorId = object.instructorId;
		this.instructorBiography = object.instructorBiography;
		this.equipment = object.equipment;
		this.rulesOfCancelation = object.rulesOfCancelation;
		this.rulesOfConduct = object.rulesOfConduct;
		this.moreInfo = object.moreInfo;
		this.street = object.street;
		this.city = object.city;
		this.country = object.country;
		this.latitude = object.latitude;
		this.longitude = object.longitude;
		this.instructorName = object.instructorName;
		this.instructorSurname = object.instructorSurname;
		this.deleted = object.deleted;
		this.rating = object.rating;
	}
}