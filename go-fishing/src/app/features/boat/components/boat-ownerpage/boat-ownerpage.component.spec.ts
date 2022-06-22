import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoatOwnerpageComponent } from './boat-ownerpage.component';

describe('BoatOwnerpageComponent', () => {
  let component: BoatOwnerpageComponent;
  let fixture: ComponentFixture<BoatOwnerpageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BoatOwnerpageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BoatOwnerpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
