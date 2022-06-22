import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CottageGalleryVisitorComponent } from './cottage-gallery-visitor.component';

describe('CottageGalleryVisitorComponent', () => {
  let component: CottageGalleryVisitorComponent;
  let fixture: ComponentFixture<CottageGalleryVisitorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CottageGalleryVisitorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CottageGalleryVisitorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
