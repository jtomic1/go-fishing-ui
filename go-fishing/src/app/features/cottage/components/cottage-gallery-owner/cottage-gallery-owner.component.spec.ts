import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CottageGalleryOwnerComponent } from './cottage-gallery-owner.component';

describe('CottageGalleryOwnerComponent', () => {
  let component: CottageGalleryOwnerComponent;
  let fixture: ComponentFixture<CottageGalleryOwnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CottageGalleryOwnerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CottageGalleryOwnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
