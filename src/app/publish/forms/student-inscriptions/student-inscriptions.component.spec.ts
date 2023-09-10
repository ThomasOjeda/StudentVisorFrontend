import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentInscriptionsComponent } from './student-inscriptions.component';

describe('StudentInscriptionsComponent', () => {
  let component: StudentInscriptionsComponent;
  let fixture: ComponentFixture<StudentInscriptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentInscriptionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentInscriptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
