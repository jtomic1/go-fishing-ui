import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdventureEditComponent } from './adventure-edit.component';

describe('AdventureEditComponent', () => {
  let component: AdventureEditComponent;
  let fixture: ComponentFixture<AdventureEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdventureEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdventureEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
