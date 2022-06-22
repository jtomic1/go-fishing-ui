import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdventureInstructorEditComponent } from './adventure-instructor-edit.component';

describe('AdventureInstructorEditComponent', () => {
  let component: AdventureInstructorEditComponent;
  let fixture: ComponentFixture<AdventureInstructorEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdventureInstructorEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdventureInstructorEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
