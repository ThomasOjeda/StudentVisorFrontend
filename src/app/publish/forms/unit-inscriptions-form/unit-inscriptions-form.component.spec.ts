import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnitInscriptionsFormComponent } from './unit-inscriptions-form.component';

describe('UnitInscriptionsFormComponent', () => {
  let component: UnitInscriptionsFormComponent;
  let fixture: ComponentFixture<UnitInscriptionsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnitInscriptionsFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UnitInscriptionsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
