import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditableTextFieldComponent } from './editable-text-field.component';

describe('EditableTextFieldComponent', () => {
  let component: EditableTextFieldComponent;
  let fixture: ComponentFixture<EditableTextFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditableTextFieldComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditableTextFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
