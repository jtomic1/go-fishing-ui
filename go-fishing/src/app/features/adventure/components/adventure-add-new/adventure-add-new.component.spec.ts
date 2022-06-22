import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdventureAddNewComponent } from './adventure-add-new.component';

describe('AdventureAddNewComponent', () => {
  let component: AdventureAddNewComponent;
  let fixture: ComponentFixture<AdventureAddNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdventureAddNewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdventureAddNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
