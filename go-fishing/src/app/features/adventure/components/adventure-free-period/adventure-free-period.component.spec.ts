import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdventureFreePeriodComponent } from './adventure-free-period.component';

describe('AdventureFreePeriodComponent', () => {
  let component: AdventureFreePeriodComponent;
  let fixture: ComponentFixture<AdventureFreePeriodComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdventureFreePeriodComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdventureFreePeriodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
