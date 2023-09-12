import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentInscriptionsChartComponent } from './student-inscriptions-chart.component';

describe('StudentInscriptionsChartComponent', () => {
  let component: StudentInscriptionsChartComponent;
  let fixture: ComponentFixture<StudentInscriptionsChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentInscriptionsChartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentInscriptionsChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
