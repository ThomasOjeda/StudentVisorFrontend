import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-student-inscriptions',
  templateUrl: './student-inscriptions.component.html',
  styleUrls: ['./student-inscriptions.component.css'],
})
export class StudentInscriptionsComponent implements OnInit {
  yearInputControl = new FormControl(null, [Validators.required]);

  @Input() transformationBody!: FormGroup;

  constructor() {}

  ngOnInit(): void {
    this.transformationBody.addControl('year', this.yearInputControl);
  }
}
