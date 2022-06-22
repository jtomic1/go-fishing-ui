import { TestBed } from '@angular/core/testing';

import { AdventureReservationService } from './adventure-reservation.service';

describe('AdventureReservationService', () => {
  let service: AdventureReservationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdventureReservationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
