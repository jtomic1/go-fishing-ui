import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdventureInstructorCalendarComponent } from './adventure-instructor-calendar.component';

describe('AdventureInstructorCalendarComponent', () => {
  let component: AdventureInstructorCalendarComponent;
  let fixture: ComponentFixture<AdventureInstructorCalendarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdventureInstructorCalendarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdventureInstructorCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
