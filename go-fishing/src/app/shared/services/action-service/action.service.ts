import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { ActionDTO, ActionReciveDTO, ActionSendDTO } from 'src/models/reservation';

@Injectable({
  providedIn: 'root'
})
export class ActionService {

  private actionsUrl:string;

  constructor(private http: HttpClient) {
    this.actionsUrl = "http://localhost:8080/api/reservations";
  }

  public addNewAction(Action:ActionSendDTO):Observable<string>{
    
    return this.http.post(this.actionsUrl+"/addNewAction",JSON.stringify(Action),{headers : new HttpHeaders({ 'Content-Type': 'application/json' }),responseType:'text'});
  }

  public getActionsForOffer(offerId:number):Observable<ActionDTO[]>{
    let data = this.http.get<ActionReciveDTO[]>(this.actionsUrl+"/getActions/"+offerId);
    let res: ActionDTO[] = [];
    
    data.subscribe(dat => {
      dat.forEach(d => {  
        console.log(d);
        let action = new ActionDTO();
        action.startDate = new NgbDate(d.startDate[0],d.startDate[1],d.startDate[2]);  
        action.endDate = new NgbDate(d.endDate[0],d.endDate[1],d.endDate[2]);
        action.offerId = d.offerId;
        action.totalPrice = d.totalPrice;
        action.id = d.id;
        res.push(action);
      });
    });

    return of(res);
  }

  public deleteAction(id:number){
    //console.log("ovfd");
    return this.http.delete(this.actionsUrl+"/delete/"+id);
  }
}
