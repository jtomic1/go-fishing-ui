import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/shared/classes/user';
import { Boat } from 'src/models/boat';
import { ComplaintDTO } from 'src/models/complaint';
import { Cottage } from 'src/models/cottage';
import { Admin } from './classes/Admin';
import { DeletionRequest } from './classes/DeletionRequest';
import { EarningsPercentage } from './classes/EarningPercentage';
import { RegistrationRequest } from './classes/RegistrationRequest';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private adminUrl: string;

  constructor(private http: HttpClient) {
    this.adminUrl = "http://localhost:8080/admin"
  }

  public getAdminById(adminId: number) : Observable<Admin> {
    return this.http.get<Admin>(this.adminUrl + '/getAdmin/' + adminId);
  }

  public setAdminPassword(adminId: number, password: string) {
    return this.http.post(this.adminUrl + "/setPassword/" + adminId, password);
  }

  public updateAdminData(admin: User) {
    return this.http.put<User>(this.adminUrl + "/update", admin);
  }

  public addAdmin(value: any) {
    return this.http.post(this.adminUrl + "/add", value, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }


  public getDeletionRequests(): Observable<DeletionRequest[]> {
    return this.http.get<DeletionRequest[]>(this.adminUrl + "/deletionRequests");    
  }

  public deleteUser(userId: number) {
    return this.http.post(this.adminUrl + "/deleteUser/" + userId, null);
  }

  public refuseDeletion(userId: number, reason: string) {
    return this.http.post(this.adminUrl + "/refuseDeletion/" + userId, reason);
  } 

  public getRegistrationRequests(): Observable<RegistrationRequest[]> {
    return this.http.get<RegistrationRequest[]>(this.adminUrl + "/registrationRequests");
  }

  public refuseRegistration(userId: number, reason: string) {
    return this.http.post(this.adminUrl + "/refuseRegistration/" + userId, reason);
  }

  public registerUser(userId: number) {
    return this.http.post(this.adminUrl + "/registerUser/" + userId, null);
  }

  public getBoats() : Observable<Boat[]> {
    return this.http.get<Boat[]>(this.adminUrl + "/allBoats");
  }

  public getCottages() : Observable<Cottage[]> {
    return this.http.get<Cottage[]>(this.adminUrl + "/allCottages");
  }

  public getInstructors() : Observable<User[]> {
    return this.http.get<User[]>(this.adminUrl + "/allInstructors");
  }

  public getBoatOwners() : Observable<User[]> {
    return this.http.get<User[]>(this.adminUrl + "/allBoatOwners");
  }

  public getClients() : Observable<User[]> {
    return this.http.get<User[]>(this.adminUrl + "/allClients");
  }

  public getCottageOwners() : Observable<User[]> {
    return this.http.get<User[]>(this.adminUrl + "/allCottageOwners");
  }

  public deleteUserEntity(id: number) {
    return this.http.delete(this.adminUrl + "/deleteUser/" + id);
  }

  public deleteBoat(id: number) {
    return this.http.delete(this.adminUrl + "/deleteBoat/" + id);
  }

  public deleteCottage(id: number) {
    return this.http.delete(this.adminUrl + "/deleteCottage/" + id);
  }

  public getEarningPercentage() :Observable<EarningsPercentage> {
    return this.http.get<EarningsPercentage>(this.adminUrl + "/getEarningPercentage");
  }

  public setNewEarningPercentage(percentage: number) :Observable<EarningsPercentage> {
    return this.http.post<EarningsPercentage>(this.adminUrl + "/setEarningPercentage", percentage);
  }
  
}
