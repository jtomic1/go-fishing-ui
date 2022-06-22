import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StartpagePreviewListComponent } from './startpage-preview-list.component';

describe('StartpagePreviewListComponent', () => {
  let component: StartpagePreviewListComponent;
  let fixture: ComponentFixture<StartpagePreviewListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StartpagePreviewListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StartpagePreviewListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
