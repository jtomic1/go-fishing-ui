import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdventureProfilpageComponent } from './adventure-profilpage.component';

describe('AdventureProfilpageComponent', () => {
  let component: AdventureProfilpageComponent;
  let fixture: ComponentFixture<AdventureProfilpageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdventureProfilpageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdventureProfilpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
