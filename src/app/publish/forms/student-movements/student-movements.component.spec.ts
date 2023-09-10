import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentMovementsComponent } from './student-movements.component';

describe('StudentMovementsComponent', () => {
  let component: StudentMovementsComponent;
  let fixture: ComponentFixture<StudentMovementsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentMovementsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentMovementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
