import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfigService } from 'src/app/shared/services/config.service';
import { Cottage } from 'src/models/cottage';

@Injectable()
export class CottageService {
  private cottagesUrl: string;

  constructor(private http: HttpClient, private config: ConfigService) {
    this.cottagesUrl = 'http://localhost:8080/api/cottages';
  }

  public findAll(): Observable<Cottage[]> {
    return this.http.get<Cottage[]>(this.cottagesUrl + '/all');
  }

  public findCottageById(cottageId: number): Observable<Cottage> {
    return this.http.get<Cottage>(
      this.cottagesUrl + '/getCottage/' + cottageId
    );
  }

  public findCottagesByOwner(ownerId: number): Observable<Cottage[]> {
    return this.http.get<Cottage[]>(this.cottagesUrl + '/owner/' + ownerId);
  }

  public deleteCottage(cottageId: number) {
    return this.http.delete<Boolean>(
      this.cottagesUrl + '/deleteCottage/' + cottageId
    );
  }

  public addNewCottage(cottage: Cottage): Observable<string> {
    return this.http.post(
      this.cottagesUrl + '/newCottage',
      JSON.stringify(cottage),
      {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
        responseType: 'text',
      }
    );
  }

  public editCottage(cottage: Cottage) {
    return this.http.put(this.cottagesUrl + '/updateCottage', cottage, {
      headers: new HttpHeaders({ dataType: 'json' }),
    });
  }

  public getCottagesCount() {
    return this.http.get(this.config.cottagesCountUrl);
  }

  public getCottagesPage(pageNum: number, perPageNum: number, sort: string) {
    return this.http.get(this.config.cottagesPageUrl, {
      params: { page: pageNum, perPage: perPageNum, sort: sort },
    });
  }

  public getCottagesPageSearch(
    pageNum: number,
    perPageNum: number,
    sort: string,
    searchParams: any
  ) {
    return this.http.get(this.config.cottagesPageSearchUrl, {
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

  public getCottagesPageSearchCount(searchParams: any) {
    return this.http.get(this.config.cottagesPageSearchCountUrl, {
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
}
