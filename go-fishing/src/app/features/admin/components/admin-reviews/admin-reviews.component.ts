import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GradeService } from 'src/app/shared/services/grade-service/grade-service.service';
import { MessageService, MessageType } from 'src/app/shared/services/message-service/message.service';
import { Grade } from 'src/models/grade';

@Component({
  selector: 'app-admin-reviews',
  templateUrl: './admin-reviews.component.html',
  styleUrls: ['./admin-reviews.component.css']
})
export class AdminReviewsComponent implements OnInit {

  adminId: number;
  reviews: Grade[] = [];

  constructor(private route: ActivatedRoute,
              private messageService: MessageService,
              private reviewsService: GradeService) { }

  ngOnInit(): void {
    this.adminId = Number(this.route.snapshot.paramMap.get('id'));

    this.reviewsService.getReviews().subscribe(data => {
      this.reviews = data;
      console.log(this.reviews);
    });
  }

  refuse(id: number) {
    this.reviewsService.refuseReview(id).subscribe(res => {
      this.messageService.showMessage('Revizija je odbijena!', MessageType.SUCCESS);
      this.reviews.forEach((element, index) => {if(element.id === id) this.reviews.splice(index, 1)});
    });
  }

  accept(id: number) {
    this.reviewsService.acceptReview(id).subscribe(res => {
      this.messageService.showMessage('Revizija je prihvaćena!', MessageType.SUCCESS);
      this.reviews.forEach((element, index) => {if(element.id === id) this.reviews.splice(index, 1)});
    });
  }

}
