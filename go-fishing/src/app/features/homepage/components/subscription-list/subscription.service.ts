import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from 'src/app/shared/services/config.service';

@Injectable({
  providedIn: 'root',
})
export class SubscriptionService {
  constructor(private http: HttpClient, private config: ConfigService) {}

  public getAllSubscriptions() {
    return this.http.get(this.config.subscriptionsUrl);
  }

  public unsubscribeOffer(id: number) {
    return this.http.put(this.config.unsubscribeUrl, { id });
  }

  public resubscribeOffer(id: number) {
    return this.http.put(this.config.resubscribeUrl, { id });
  }
}
