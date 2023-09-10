import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-student-movements',
  templateUrl: './student-movements.component.html',
  styleUrls: ['./student-movements.component.css'],
})
export class StudentMovementsComponent implements OnInit {
  yearAInputControl = new FormControl(null, [Validators.required]);
  yearBInputControl = new FormControl(null, [Validators.required]);

  @Input() transformationBody!: FormGroup;

  constructor() {}

  ngOnInit(): void {
    this.transformationBody.addControl('yearA', this.yearAInputControl);
    this.transformationBody.addControl('yearB', this.yearBInputControl);
  }
}
