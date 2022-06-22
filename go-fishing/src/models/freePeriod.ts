import { NgbDate } from "@ng-bootstrap/ng-bootstrap";

export class FreePeriodDTO {
    id:number;
    startDate: NgbDate;
    endDate : NgbDate;
    offerId: number;
    
}

export class FreePeriodSendDTO{
    startDate: string;
    endDate : string;
    offerId: number;
    
}

export class FreePeriodReciveDTO{
    id:number;
    startDate: number[];
    endDate : number[];
    offerId: number;
    
}