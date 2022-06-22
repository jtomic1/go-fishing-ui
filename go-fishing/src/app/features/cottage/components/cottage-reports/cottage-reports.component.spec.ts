import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CottageReportsComponent } from './cottage-reports.component';

describe('CottageReportsComponent', () => {
  let component: CottageReportsComponent;
  let fixture: ComponentFixture<CottageReportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CottageReportsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CottageReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
