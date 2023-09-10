import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentInscriptionsFormComponent } from './student-inscriptions-form.component';

describe('StudentInscriptionsFormComponent', () => {
  let component: StudentInscriptionsFormComponent;
  let fixture: ComponentFixture<StudentInscriptionsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StudentInscriptionsFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(StudentInscriptionsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
