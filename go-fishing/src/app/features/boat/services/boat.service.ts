import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Boat } from 'src/models/boat';

@Injectable({
  providedIn: 'root'
})
export class BoatService {

  private boatsUrl: string;

  constructor(private http: HttpClient) {
    this.boatsUrl  = "http://localhost:8080/api/boats";
  }
  
  public findBoatById(boatId:number):Observable<Boat>{
    return this.http.get<Boat>(this.boatsUrl+"/getBoat/"+boatId);
  }

  public findBoatsByOwner(ownerId:number):Observable<Boat[]>{
    return this.http.get<Boat[]>(this.boatsUrl+"/owner/"+ownerId);
  }

  public deleteBoat(BoatId:number){
    return this.http.delete<Boolean>(this.boatsUrl+"/deleteBoat/"+BoatId);
  }

  public addNewBoat(Boat:Boat):Observable<string>{
    console.log(JSON.stringify(Boat));
    return this.http.post(this.boatsUrl+"/newBoat",JSON.stringify(Boat),{headers : new HttpHeaders({ 'Content-Type': 'application/json' }),responseType:'text'});
  }

  public editBoat(Boat:Boat){
    console.log(Boat);
    return this.http.put(this.boatsUrl+"/updateBoat", Boat,{headers: new HttpHeaders({'dataType':'json'})});
  }
}
