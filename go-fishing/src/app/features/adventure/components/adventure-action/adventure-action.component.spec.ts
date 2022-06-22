import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdventureActionComponent } from './adventure-action.component';

describe('AdventureActionComponent', () => {
  let component: AdventureActionComponent;
  let fixture: ComponentFixture<AdventureActionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdventureActionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdventureActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
