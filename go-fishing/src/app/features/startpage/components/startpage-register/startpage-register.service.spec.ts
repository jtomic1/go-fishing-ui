import { TestBed } from '@angular/core/testing';

import { StartpageRegisterService } from './startpage-register.service';

describe('StartpageRegisterService', () => {
  let service: StartpageRegisterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StartpageRegisterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
