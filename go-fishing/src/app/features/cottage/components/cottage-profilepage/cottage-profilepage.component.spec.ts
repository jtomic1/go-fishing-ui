import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CottageProfilepageComponent } from './cottage-profilepage.component';

describe('CottageProfilepageComponent', () => {
  let component: CottageProfilepageComponent;
  let fixture: ComponentFixture<CottageProfilepageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CottageProfilepageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CottageProfilepageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
