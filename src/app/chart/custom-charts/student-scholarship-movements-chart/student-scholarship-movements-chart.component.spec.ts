import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentScholarshipMovementsChartComponent } from './student-scholarship-movements-chart.component';

describe('StudentScholarshipMovementsChartComponent', () => {
  let component: StudentScholarshipMovementsChartComponent;
  let fixture: ComponentFixture<StudentScholarshipMovementsChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentScholarshipMovementsChartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentScholarshipMovementsChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
