import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentScholarshipMovementsFormComponent } from './student-scholarship-movements-form.component';

describe('StudentScholarshipMovementsFormComponent', () => {
  let component: StudentScholarshipMovementsFormComponent;
  let fixture: ComponentFixture<StudentScholarshipMovementsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentScholarshipMovementsFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentScholarshipMovementsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
