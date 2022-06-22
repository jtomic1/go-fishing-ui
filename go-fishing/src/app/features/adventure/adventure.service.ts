import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { User } from 'src/app/shared/classes/user';
import { ConfigService } from 'src/app/shared/services/config.service';
import {
  ActionDTO,
  ActionReciveDTO,
  ActionSendDTO,
} from 'src/models/reservation';
import { Adventure } from './classes/adventure';
import { Instructor } from './classes/instructor';

@Injectable({
  providedIn: 'root',
})
export class AdventureService {
  private adventureUrl: string;

  constructor(private http: HttpClient, private config: ConfigService) {
    this.adventureUrl = 'http://localhost:8080/adventure';
  }

  public addAdventure(adventure: Adventure) {
    return this.http.post<Adventure>(this.adventureUrl, adventure);
  }

  public deleteAdventure(id: any): Observable<Adventure> {
    console.log(id);
    return this.http.delete<Adventure>(this.adventureUrl + '/' + id);
  }

  public updateInstructorData(instructor: User) {
    return this.http.put<User>(this.adventureUrl + '/instructor', instructor);
  }

  public getAdventureById(adventureId: number): Observable<Adventure> {
    return this.http.get<Adventure>(this.adventureUrl + '/get/' + adventureId);
  }

  public getAdventuresOfInstructor(
    instructorId: number
  ): Observable<Adventure[]> {
    return this.http.get<Adventure[]>(
      this.adventureUrl + '/instructor/adventures/' + instructorId
    );
  }

  public editAdventure(adventure: Adventure) {
    return this.http.put<User>(this.adventureUrl + '/edit', adventure);
  }

  public changePassword(instructorId: number, data: any) {
    return this.http.post(
      this.adventureUrl + '/instructor/passwordChange/' + instructorId,
      data,
      {
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }

  public sendDeletionRequest(instructorId: number, data: FormGroup) {
    return this.http.post(
      this.adventureUrl + '/instructor/delete/' + instructorId,
      data,
      {
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }

  public getAdventureIds(instructorId: number) {
    return this.http.get(
      this.adventureUrl + '/instructor/adventuresId/' + instructorId
    );
  }

  public getAdventuresCount() {
    return this.http.get(this.config.adventuresCountUrl);
  }

  public getAdventuresPage(pageNum: number, perpageNum: number, sort: string) {
    return this.http.get(this.config.adventuresPageUrl, {
      params: { page: pageNum, perPage: perpageNum, sort: sort },
    });
  }

  public getAdventuresPageSearch(
    pageNum: number,
    perPageNum: number,
    sort: string,
    searchParams: any
  ) {
    return this.http.get(this.config.adventuresPageSearchUrl, {
      params: {
        page: pageNum,
        perPage: perPageNum,
        sort: sort,
        startDate:
          searchParams.startDate.getDate() +
          '-' +
          (searchParams.startDate.getMonth() + 1) +
          '-' +
          searchParams.startDate.getFullYear(),
        endDate:
          searchParams.endDate.getDate() +
          '-' +
          (searchParams.endDate.getMonth() + 1) +
          '-' +
          searchParams.endDate.getFullYear(),
        name: searchParams.name,
        minRating: searchParams.minRating,
        location: searchParams.location,
        capacity: searchParams.capacity,
        minPrice: searchParams.minPrice,
        maxPrice: searchParams.maxPrice,
      },
    });
  }

  public getAdventuresPageSearchCount(searchParams: any) {
    return this.http.get(this.config.adventuresPageSearchCountUrl, {
      params: {
        startDate:
          searchParams.startDate.getDate() +
          '-' +
          (searchParams.startDate.getMonth() + 1) +
          '-' +
          searchParams.startDate.getFullYear(),
        endDate:
          searchParams.endDate.getDate() +
          '-' +
          (searchParams.endDate.getMonth() + 1) +
          '-' +
          searchParams.endDate.getFullYear(),
        name: searchParams.name,
        minRating: searchParams.minRating,
        location: searchParams.location,
        capacity: searchParams.capacity,
        minPrice: searchParams.minPrice,
        maxPrice: searchParams.maxPrice,
      },
    });
  }

  public addAction(action: ActionSendDTO) {
    return this.http.post(this.adventureUrl + '/addAction', action, {
      headers: { 'Content-Type': 'application/json' },
    });
  }

  public getActionsForOffers(ids: string): Observable<ActionDTO[]> {
    let data = this.http.get<ActionReciveDTO[]>(
      this.adventureUrl + '/getActionsFromIds/' + ids
    );

    let res: ActionDTO[] = [];

    data.subscribe((dat) => {
      dat.forEach((d) => {
        console.log(d);
        let action = new ActionDTO();
        action.startDate = new NgbDate(
          d.startDate[0],
          d.startDate[1],
          d.startDate[2]
        );
        action.endDate = new NgbDate(d.endDate[0], d.endDate[1], d.endDate[2]);
        action.offerId = d.offerId;
        action.totalPrice = d.totalPrice;
        action.id = d.id;
        res.push(action);
      });
    });

    return of(res);
  }

  public getActionsForOffer(id: number): Observable<ActionDTO[]> {
    let data = this.http.get<ActionReciveDTO[]>(
      this.adventureUrl + '/getActionsFromId/' + id
    );

    let res: ActionDTO[] = [];

    data.subscribe((dat) => {
      dat.forEach((d) => {
        console.log(d);
        let action = new ActionDTO();
        action.startDate = new NgbDate(
          d.startDate[0],
          d.startDate[1],
          d.startDate[2]
        );
        action.endDate = new NgbDate(d.endDate[0], d.endDate[1], d.endDate[2]);
        action.offerId = d.offerId;
        action.totalPrice = d.totalPrice;
        action.id = d.id;
        res.push(action);
      });
    });

    return of(res);
  }
}
