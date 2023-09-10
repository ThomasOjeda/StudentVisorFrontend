import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TransformationForm } from '../transformation-form';

@Component({
  selector: 'app-student-movements-form',
  templateUrl: './student-movements-form.component.html',
  styleUrls: ['./student-movements-form.component.css'],
})
export class StudentMovementsFormComponent
  implements OnInit, TransformationForm
{
  yearAInputControl = new FormControl(null, [Validators.required]);
  yearBInputControl = new FormControl(null, [Validators.required]);

  @Input() transformationBody!: FormGroup;

  constructor() {}

  ngOnInit(): void {
    this.transformationBody.addControl('yearA', this.yearAInputControl);
    this.transformationBody.addControl('yearB', this.yearBInputControl);
  }
}
