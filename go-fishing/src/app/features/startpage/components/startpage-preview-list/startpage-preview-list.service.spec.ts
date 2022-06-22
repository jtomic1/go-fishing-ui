import { TestBed } from '@angular/core/testing';

import { StartpagePreviewListService } from './startpage-preview-list.service';

describe('StartpagePreviewListService', () => {
  let service: StartpagePreviewListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StartpagePreviewListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
