import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewFreePeriodComponent } from './new-free-period.component';

describe('NewFreePeriodComponent', () => {
  let component: NewFreePeriodComponent;
  let fixture: ComponentFixture<NewFreePeriodComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewFreePeriodComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewFreePeriodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
