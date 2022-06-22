import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CottageAddNewComponent } from './cottage-add-new.component';

describe('CottageAddNewComponent', () => {
  let component: CottageAddNewComponent;
  let fixture: ComponentFixture<CottageAddNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CottageAddNewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CottageAddNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
