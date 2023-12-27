import { Component, OnInit } from '@angular/core';
import { TransformationForm } from '../transformation-form';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-student-scholarship-movements-form',
  templateUrl: './student-scholarship-movements-form.component.html',
  styleUrls: ['./student-scholarship-movements-form.component.css'],
})
export class StudentScholarshipMovementsFormComponent
  implements TransformationForm, OnInit
{
  constructor() {}
  transformationBody!: FormGroup<any>;

  ngOnInit(): void {}
}
