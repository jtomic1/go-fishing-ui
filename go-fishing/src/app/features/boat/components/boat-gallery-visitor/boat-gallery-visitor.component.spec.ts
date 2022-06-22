import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoatGalleryVisitorComponent } from './boat-gallery-visitor.component';

describe('BoatGalleryVisitorComponent', () => {
  let component: BoatGalleryVisitorComponent;
  let fixture: ComponentFixture<BoatGalleryVisitorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BoatGalleryVisitorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BoatGalleryVisitorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
