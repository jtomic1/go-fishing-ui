import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  private _server_address = 'http://localhost:8080';

  private _signup_url = this._server_address + '/reg/signup';
  private _login_url = this._server_address + '/login';
  private _user_controller_url = this._server_address + '/api/users';
  private _entity_controller_url = this._server_address + '/api/entity';
  private _reservation_controller_url =
    this._server_address + '/api/reservations';
  private _client_controller_url = this._server_address + '/api/clients';
  private _loyalty_controller_url = this._server_address + '/api/loyalty';

  private _boat_controller_url = this._server_address + '/api/boats';
  private _cottage_controller_url = this._server_address + '/api/cottages';
  private _adventure_controller_url = this._server_address + '/adventure';

  get loginUrl(): string {
    return this._login_url;
  }

  get registrationUrl(): string {
    return this._signup_url;
  }

  get userDataUrl(): string {
    return this._user_controller_url + '/getUserData';
  }

  get dummyUrl(): string {
    return this._user_controller_url + '/dummy';
  }

  get loyaltyPointsUrl(): string {
    return this._user_controller_url + '/loyaltyPoints';
  }

  get updateProfileUrl(): string {
    return this._user_controller_url + '/updateProfile';
  }

  get changePasswordUrl(): string {
    return this._user_controller_url + '/changePassword';
  }

  get deletionRequestUrl(): string {
    return this._user_controller_url + '/deletionRequest';
  }

  /*
   *
   *   ENTITIY CONTROLLER
   *
   */

  /*
   *  COTTAGES
   */

  get cottagesPageUrl(): string {
    return this._entity_controller_url + '/cottages/all';
  }

  get cottagesPageSearchUrl(): string {
    return this._entity_controller_url + '/cottages/search';
  }

  get cottagesCountUrl(): string {
    return this._entity_controller_url + '/cottages/count';
  }

  get cottagesPageSearchCountUrl(): string {
    return this._entity_controller_url + '/cottages/searchcount';
  }

  /*
   *  BOATS
   */

  get boatsPageUrl(): string {
    return this._entity_controller_url + '/boats/all';
  }

  get boatsCountUrl(): string {
    return this._entity_controller_url + '/boats/count';
  }

  get boatsPageSearchUrl(): string {
    return this._entity_controller_url + '/boats/search';
  }

  get boatsPageSearchCountUrl(): string {
    return this._entity_controller_url + '/boats/searchcount';
  }

  /*
   *  ADVENTURES
   */

  get adventuresPageUrl(): string {
    return this._entity_controller_url + '/adventures/all';
  }

  get adventuresCountUrl(): string {
    return this._entity_controller_url + '/adventures/count';
  }

  get adventuresPageSearchUrl(): string {
    return this._entity_controller_url + '/adventures/search';
  }

  get adventuresPageSearchCountUrl(): string {
    return this._entity_controller_url + '/adventures/searchcount';
  }

  /*
   *
   *   RESERVATION CONTROLLER
   *
   */

  get freePeriodsByIdUrl(): string {
    return this._reservation_controller_url + '/getFreePeriods/';
  }

  get newReservationUrl(): string {
    return this._reservation_controller_url + '/newReservation';
  }

  get activeReservationsUrl(): string {
    return this._reservation_controller_url + '/activeReservations';
  }

  get pastReservationsUrl(): string {
    return this._reservation_controller_url + '/pastReservations';
  }

  get cancelReservationUrl(): string {
    return this._reservation_controller_url + '/cancelReservation/';
  }

  get addReviewUrl(): string {
    return this._reservation_controller_url + '/addReview';
  }

  get addComplaintUrl(): string {
    return this._reservation_controller_url + '/addComplaint';
  }

  get confirmActionUrl(): string {
    return this._reservation_controller_url + '/buyAction/';
  }

  /*
   *
   *   CLIENT CONTROLLER
   *
   */

  get subscriptionsUrl(): string {
    return this._client_controller_url + '/subscriptions';
  }
  get unsubscribeUrl(): string {
    return this._client_controller_url + '/unsubscribe';
  }
  get resubscribeUrl(): string {
    return this._client_controller_url + '/resubscribe';
  }
  get penaltyCountUrl(): string {
    return this._client_controller_url + '/penalties';
  }

  /*
   *
   *   LOYALTY CONTROLLER
   *
   */

  get allLoyaltiesUrl(): string {
    return this._loyalty_controller_url + '/getLoyalties';
  }

  get userLoyaltyUrl(): string {
    return this._loyalty_controller_url + '/getLoyalty';
  }

  get editLoyaltyUrl(): string {
    return this._loyalty_controller_url + '/editLoyalty';
  }

  get addLoyaltyUrl(): string {
    return this._loyalty_controller_url + '/addLoyalty';
  }

  /*
   *
   *   PREVIEW CONTROLLERS
   *
   */

  get previewBoatListUrl(): string {
    return this._boat_controller_url + '/getBoatsPreview';
  }

  get previewBoatListParamUrl(): string {
    return this._boat_controller_url + '/getBoatsPreviewParam/';
  }

  get previewCottageListUrl(): string {
    return this._cottage_controller_url + '/getCottagesPreview';
  }

  get previewCottageListParamUrl(): string {
    return this._cottage_controller_url + '/getCottagesPreviewParam/';
  }

  get previewAdventureListUrl(): string {
    return this._adventure_controller_url + '/getAdventuresPreview';
  }

  get previewAdventureListParamUrl(): string {
    return this._adventure_controller_url + '/getAdventuresPreviewParam/';
  }

  get roleUrl(): string {
    return this._user_controller_url + '/getUserRole';
  }
}
