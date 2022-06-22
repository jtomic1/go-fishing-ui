import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Grade } from 'src/models/grade';

@Injectable({
  providedIn: 'root'
})
export class GradeService {
  
  gradeUrl: string;

  constructor(private http: HttpClient) {
    this.gradeUrl = "http://localhost:8080/api/grade";
  }

  public getReviews(): Observable<Grade[]> {
    return this.http.get<Grade[]>(this.gradeUrl + "/getReviews");
  }

  public acceptReview(id: number) {
    return this.http.post(this.gradeUrl + '/accept', id);
  }

  public refuseReview(id: number) {
    return this.http.post(this.gradeUrl + '/refuse', id);
  }

  public getReviewsForOffer(id: number): Observable<Grade[]> {
    return this.http.get<Grade[]>(this.gradeUrl + '/getReviewsByOfferId/' + id);
  }
}
