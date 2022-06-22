export interface IInstructor {
    id?: number;
    name: string;
    surname: string;
    address: string;
    city: string;
    country: string;
    phone: string;
    password: string;
}

export class Instructor implements IInstructor {
    id?: number;
    name: string;
    surname: string;
    address: string;
    city: string;
    country: string;
    phone: string;
    password: string;

    constructor (obj: IInstructor) {
        this.id = obj.id;
        this.name = obj.name;
        this.surname = obj.surname;
        this.address = obj.address;
        this.city = obj.city;
        this.country = obj.country;
        this.phone = obj.phone;
        this.password = obj.password;
    }
}