import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdventureInstructorpageComponent } from './adventure-instructorpage.component';

describe('AdventureInstructorpageComponent', () => {
  let component: AdventureInstructorpageComponent;
  let fixture: ComponentFixture<AdventureInstructorpageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdventureInstructorpageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdventureInstructorpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
