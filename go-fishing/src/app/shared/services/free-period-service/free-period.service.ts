import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { FreePeriodDTO,FreePeriodSendDTO,FreePeriodReciveDTO } from '../../../../models/freePeriod';

@Injectable({
  providedIn: 'root'
})
export class FreePeriodService {

  private freePeriodsUrl:string;

  constructor(private http: HttpClient) {
    this.freePeriodsUrl = "http://localhost:8080/api/freePeriods";
  }

  public addNewFreePeriod(freePeriod:FreePeriodSendDTO):Observable<string>{
    
    return this.http.post(this.freePeriodsUrl+"/addFreePeriod",JSON.stringify(freePeriod),{headers : new HttpHeaders({ 'Content-Type': 'application/json' }),responseType:'text'});
  }

  public addFreePeriodAdventure(freePeriod: FreePeriodSendDTO) {
    return this.http.post(this.freePeriodsUrl + "/addPeriodAdventure", JSON.stringify(freePeriod), {headers: new HttpHeaders({ 'Content-Type': 'application/json' }), responseType:'text'});
  }

  public getFreePeriodsForOffer(offerId:number):Observable<FreePeriodDTO[]>{
    let data = this.http.get<FreePeriodReciveDTO[]>(this.freePeriodsUrl+"/getFreePeriods/"+offerId);
    let res: FreePeriodDTO[] = [];
    
    data.subscribe(dat => {
      dat.forEach(d => {  
        console.log(d);
        let fp = new FreePeriodDTO();
        fp.startDate = new NgbDate(d.startDate[0],d.startDate[1],d.startDate[2]);  
        fp.endDate = new NgbDate(d.endDate[0],d.endDate[1],d.endDate[2]);
        fp.offerId = d.offerId;
        fp.id = d.id;
        res.push(fp);
      });
    });

    return of(res);
  }

  public getFreePeriodsForOffers(ids: string):Observable<FreePeriodDTO[]>{
    let data = this.http.get<FreePeriodReciveDTO[]>(this.freePeriodsUrl+"/getFreePeriodsFromIds/" + ids);
    let res: FreePeriodDTO[] = [];
    
    data.subscribe(dat => {
      dat.forEach(d => {  
        console.log(d);
        let fp = new FreePeriodDTO();
        fp.startDate = new NgbDate(d.startDate[0],d.startDate[1],d.startDate[2]);  
        fp.endDate = new NgbDate(d.endDate[0],d.endDate[1],d.endDate[2]);
        fp.offerId = d.offerId;
        fp.id = d.id;
        res.push(fp);
      });
    });

    return of(res);
  }

  public deleteFreePeriod(id:number){
    console.log("ovfd");
    return this.http.delete(this.freePeriodsUrl+"/delete/"+id);
  }
}
