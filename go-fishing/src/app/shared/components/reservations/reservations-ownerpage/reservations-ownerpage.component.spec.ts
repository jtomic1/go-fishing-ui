import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservationsOwnerpageComponent } from './reservations-ownerpage.component';

describe('ReservationsOwnerpageComponent', () => {
  let component: ReservationsOwnerpageComponent;
  let fixture: ComponentFixture<ReservationsOwnerpageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReservationsOwnerpageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReservationsOwnerpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
