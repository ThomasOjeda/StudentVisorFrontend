import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentMigrationsChartComponent } from './student-migrations-chart.component';

describe('StudentMigrationsChartComponent', () => {
  let component: StudentMigrationsChartComponent;
  let fixture: ComponentFixture<StudentMigrationsChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentMigrationsChartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentMigrationsChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
