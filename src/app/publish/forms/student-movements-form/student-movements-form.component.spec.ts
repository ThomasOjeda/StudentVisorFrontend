import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentMovementsFormComponent } from './student-movements-form.component';

describe('StudentMovementsFormComponent', () => {
  let component: StudentMovementsFormComponent;
  let fixture: ComponentFixture<StudentMovementsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StudentMovementsFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(StudentMovementsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
