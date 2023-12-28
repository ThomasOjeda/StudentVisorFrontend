import { Component, Input, OnInit } from '@angular/core';
import { TransformationForm } from '../transformation-form';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FilesService } from 'src/app/files/services/files.service';
import { FileType } from 'src/app/files/model/file-type';

@Component({
  selector: 'app-student-scholarship-movements-form',
  templateUrl: './student-scholarship-movements-form.component.html',
  styleUrls: ['./student-scholarship-movements-form.component.css'],
})
export class StudentScholarshipMovementsFormComponent
  implements OnInit, TransformationForm
{
  yearAInputControl = new FormControl<number | null | undefined>(undefined, [
    Validators.required,
  ]);
  yearBInputControl = new FormControl<number | null | undefined>(
    { value: undefined, disabled: true },
    [Validators.required]
  );
  scholarshipTypeInputControl = new FormControl<string | null | undefined>(
    { value: undefined, disabled: false },
    [Validators.required]
  );

  @Input() transformationBody!: FormGroup;

  availableStartYears: number[] = [];
  availableEndYears: number[] = [];

  schTypes = [
    { label: 'progresar', value: 'student-scholarships-progresar' },
    { label: 'belgrano', value: 'student-scholarships-belgrano' },
  ];

  constructor(private filesServ: FilesService) {}

  ngOnInit(): void {
    this.yearAInputControl.valueChanges.subscribe((data) => {
      this.yearAValueChanged(data);
    });

    this.yearBInputControl.valueChanges.subscribe((data) => {
      this.yearBValueChanged(data);
    });

    this.transformationBody.addControl('yearA', this.yearAInputControl);
    this.transformationBody.addControl('yearB', this.yearBInputControl);
    this.transformationBody.addControl(
      'schType',
      this.scholarshipTypeInputControl
    );

    this.filesServ
      .filesQuery(undefined, FileType.STUDENT_INSCRIPTIONS)
      .subscribe((data) => {
        this.availableStartYears = data.result.map((file) => file.year).sort();
      });
  }

  yearAValueChanged(yearA: number | null | undefined) {
    this.reconfigureYearBInput(yearA);
  }

  yearBValueChanged($event: number | null | undefined) {}

  reconfigureYearBInput(yearA: number | null | undefined) {
    this.yearBInputControl.setValue(undefined);
    this.yearBInputControl.disable({ emitEvent: false });
    if (yearA) {
      this.availableEndYears = this.availableStartYears.slice(
        this.availableStartYears.lastIndexOf(yearA) + 1
      );

      this.yearBInputControl.enable({ emitEvent: false });
    }
  }
}
