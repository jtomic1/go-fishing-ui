import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CottageOwnerpageComponent } from './cottage-ownerpage.component';

describe('CottageOwnerpageComponent', () => {
  let component: CottageOwnerpageComponent;
  let fixture: ComponentFixture<CottageOwnerpageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CottageOwnerpageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CottageOwnerpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
