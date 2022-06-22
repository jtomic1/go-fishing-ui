import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../classes/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private usersUrl : string;

  constructor(private http : HttpClient) {
    this.usersUrl = "http://localhost:8080/api/users"
  }

  public findAll():Observable<User[]>{
    return this.http.get<User[]>(this.usersUrl+"/all");
  }

  public findById(id:number):Observable<User>{
    return this.http.get<User>(this.usersUrl+"/getUser/"+id);
  }

  public isThisLoggedUser(userId:number):Observable<boolean>{
    return this.http.get<boolean>(this.usersUrl+"/isThisLoggedUser/"+userId,{headers : new HttpHeaders({ 'Content-Type': 'application/json',"Access-Control-Allow-Origin": "*" })});
  }

  public isLoggedUserOfferOwner(offerId:number):Observable<boolean>{
    return this.http.get<boolean>(this.usersUrl+"/isLoggedUserOfferOwner/"+offerId,{headers : new HttpHeaders({ 'Content-Type': 'application/json',"Access-Control-Allow-Origin": "*" })});  
  }

  public isLoggedUserOnlyClient():Observable<boolean>{
    return this.http.get<boolean>(this.usersUrl+"/isLoggedUserOnlyClient",{headers : new HttpHeaders({ 'Content-Type': 'application/json',"Access-Control-Allow-Origin": "*" })});  
  }
}
