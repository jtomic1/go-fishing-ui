import { Component, OnInit } from '@angular/core';
import {
  MessageService,
  MessageType,
} from 'src/app/shared/services/message-service/message.service';
import { SubscriptionService } from './subscription.service';

@Component({
  selector: 'app-subscription-list',
  templateUrl: './subscription-list.component.html',
  styleUrls: ['./subscription-list.component.css'],
})
export class SubscriptionListComponent implements OnInit {
  subscriptionList: any[] = [];
  constructor(
    private subscriptionService: SubscriptionService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.subscriptionService.getAllSubscriptions().subscribe((res: any) => {
      this.subscriptionList = res;
    });
  }

  get totalItems() {
    return this.subscriptionList.length;
  }

  public unsubscribeOffer(id: number) {
    this.subscriptionService.unsubscribeOffer(id).subscribe((res) => {
      let index = this.subscriptionList.findIndex((item) => item.id === id);
      this.subscriptionList[index].subscribed = false;
      this.messageService.showMessage(
        'Unsubscribed successfully!',
        MessageType.SUCCESS
      );
    });
  }

  public resubscribeOffer(id: number) {
    this.subscriptionService.resubscribeOffer(id).subscribe((res) => {
      let index = this.subscriptionList.findIndex((item) => item.id === id);
      this.subscriptionList[index].subscribed = true;
      this.messageService.showMessage(
        'Subscribed successfully!',
        MessageType.SUCCESS
      );
    });
  }
}
