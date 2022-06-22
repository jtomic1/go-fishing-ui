import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservationStartpageComponent } from './reservation-startpage.component';

describe('ReservationStartpageComponent', () => {
  let component: ReservationStartpageComponent;
  let fixture: ComponentFixture<ReservationStartpageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReservationStartpageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReservationStartpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
