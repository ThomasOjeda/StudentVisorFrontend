import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentMigrationsFormComponent } from './student-migrations-form.component';

describe('StudentMigrationsFormComponent', () => {
  let component: StudentMigrationsFormComponent;
  let fixture: ComponentFixture<StudentMigrationsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentMigrationsFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentMigrationsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
