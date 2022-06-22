import { TestBed } from '@angular/core/testing';

import { StartpageLoginService } from './startpage-login.service';

describe('StartpageLoginService', () => {
  let service: StartpageLoginService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StartpageLoginService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
