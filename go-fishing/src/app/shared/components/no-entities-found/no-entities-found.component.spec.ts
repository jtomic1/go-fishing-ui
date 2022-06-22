import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoEntitiesFoundComponent } from './no-entities-found.component';

describe('NoEntitiesFoundComponent', () => {
  let component: NoEntitiesFoundComponent;
  let fixture: ComponentFixture<NoEntitiesFoundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NoEntitiesFoundComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NoEntitiesFoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
