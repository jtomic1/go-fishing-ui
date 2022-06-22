import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  private clientsUrl : string;

  constructor(private http : HttpClient) {
    this.clientsUrl = "http://localhost:8080/api/clients"
  }

  addPenalToClient(id:number):Observable<string>{
    return this.http.post(this.clientsUrl+"/addPenalToClient/"+id,"{}",{headers : new HttpHeaders({ 'Content-Type': 'application/json',"Access-Control-Allow-Origin": "*" }),responseType:'text'});
  }

  addSubscription(offerId:number):Observable<string>{
    return this.http.post(this.clientsUrl+"/addSubscription/"+offerId,"{}",{headers : new HttpHeaders({ 'Content-Type': 'application/json',"Access-Control-Allow-Origin": "*" }),responseType:'text'});
  }

  removeSubscription(offerId:number):Observable<string>{
    return this.http.post(this.clientsUrl+"/removeSubscription/"+offerId,"{}",{headers : new HttpHeaders({ 'Content-Type': 'application/json',"Access-Control-Allow-Origin": "*" }),responseType:'text'});
  }
  isSuscribedToOffer(offerId:number):Observable<boolean>{
    return this.http.get<boolean>(this.clientsUrl+"/isSubscribedToOffer/"+offerId);
  }
}
