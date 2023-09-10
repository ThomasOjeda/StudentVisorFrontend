import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TransformationForm } from '../transformation-form';

@Component({
  selector: 'app-student-inscriptions-form',
  templateUrl: './student-inscriptions-form.component.html',
  styleUrls: ['./student-inscriptions-form.component.css'],
})
export class StudentInscriptionsFormComponent
  implements OnInit, TransformationForm
{
  yearInputControl = new FormControl(null, [Validators.required]);

  @Input() transformationBody!: FormGroup;

  constructor() {}

  ngOnInit(): void {
    this.transformationBody.addControl('year', this.yearInputControl);
  }
}
