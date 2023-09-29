import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnitInscriptionsChartComponent } from './unit-inscriptions-chart.component';

describe('UnitInscriptionsChartComponent', () => {
  let component: UnitInscriptionsChartComponent;
  let fixture: ComponentFixture<UnitInscriptionsChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnitInscriptionsChartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UnitInscriptionsChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
