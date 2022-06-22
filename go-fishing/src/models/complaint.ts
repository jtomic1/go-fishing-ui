import { ApprovalStatus } from "./approvalStatus";

export class ComplaintDTO{
    id:number;
    text:string;
    approvalStatus:ApprovalStatus;
    reservationId:number;
    offenderId:number;
    forOffer:boolean ;
    fromOwner:boolean ;
    punishOffender : boolean;
}