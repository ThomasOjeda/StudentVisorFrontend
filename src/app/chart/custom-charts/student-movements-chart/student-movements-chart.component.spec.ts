import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentMovementsChartComponent } from './student-movements-chart.component';

describe('StudentMovementsChartComponent', () => {
  let component: StudentMovementsChartComponent;
  let fixture: ComponentFixture<StudentMovementsChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentMovementsChartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentMovementsChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
