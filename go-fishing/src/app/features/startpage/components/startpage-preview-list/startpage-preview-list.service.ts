import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from 'src/app/shared/services/config.service';

@Injectable({
  providedIn: 'root',
})
export class StartpagePreviewListService {
  constructor(private http: HttpClient, private config: ConfigService) {}


  getBoatPreviewList(): any {
    return this.http.get(this.config.previewBoatListUrl);

  }

  getBoatPreviewListParam(param: string): any {
    return this.http.get(this.config.previewBoatListParamUrl + param);
  }

  getCottagePreviewList(): any {
    return this.http.get(this.config.previewCottageListUrl);
  }

  getCottagePreviewListParam(param: string): any {
    return this.http.get(this.config.previewCottageListParamUrl + param);
  }

  getAdventurePreviewList(): any {
    return this.http.get(this.config.previewAdventureListUrl);
  }

  getAdventurePreviewListParam(param: string): any {
    return this.http.get(this.config.previewAdventureListParamUrl + param);
  }
}
