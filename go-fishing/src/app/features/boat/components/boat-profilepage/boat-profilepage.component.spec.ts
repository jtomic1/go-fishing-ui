import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoatProfilepageComponent } from './boat-profilepage.component';

describe('BoatProfilepageComponent', () => {
  let component: BoatProfilepageComponent;
  let fixture: ComponentFixture<BoatProfilepageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BoatProfilepageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BoatProfilepageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
