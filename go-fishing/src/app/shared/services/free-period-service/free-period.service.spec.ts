import { TestBed } from '@angular/core/testing';

import { FreePeriodService } from './free-period.service';

describe('FreePeriodService', () => {
  let service: FreePeriodService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FreePeriodService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
