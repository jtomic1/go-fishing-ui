import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from 'src/app/shared/services/config.service';

@Injectable()
export class BoatEntityService {
  constructor(private http: HttpClient, private config: ConfigService) {}

  public getBoatsCount() {
    return this.http.get(this.config.boatsCountUrl);
  }

  public getBoatsPage(pageNum: number, perPageNum: number, sort: string) {
    return this.http.get(this.config.boatsPageUrl, {
      params: { page: pageNum, perPage: perPageNum, sort: sort },
    });
  }

  public getBoatsPageSearch(
    pageNum: number,
    perPageNum: number,
    sort: string,
    searchParams: any
  ) {
    return this.http.get(this.config.boatsPageSearchUrl, {
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

  public getBoatsPageSearchCount(searchParams: any) {
    return this.http.get(this.config.boatsPageSearchCountUrl, {
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
