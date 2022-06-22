import { TestBed } from '@angular/core/testing';

import { ExtraFavorsService } from './extra-favors.service';

describe('ExtraFavorsService', () => {
  let service: ExtraFavorsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExtraFavorsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
