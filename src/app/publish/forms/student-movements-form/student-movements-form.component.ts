import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TransformationForm } from '../transformation-form';
import { FilesService } from 'src/app/files/services/files.service';
import { FileType } from 'src/app/files/model/file-type';

@Component({
  selector: 'app-student-movements-form',
  templateUrl: './student-movements-form.component.html',
  styleUrls: ['./student-movements-form.component.css'],
})
export class StudentMovementsFormComponent
  implements OnInit, TransformationForm
{
  yearAInputControl = new FormControl(null, [Validators.required]);
  yearBInputControl = new FormControl({ value: null, disabled: true }, [
    Validators.required,
  ]);

  @Input() transformationBody!: FormGroup;

  availableStartYears: number[] = [];
  availableEndYears: number[] = [];
  constructor(private filesServ: FilesService) {}

  ngOnInit(): void {
    this.transformationBody.addControl('yearA', this.yearAInputControl);
    this.transformationBody.addControl('yearB', this.yearBInputControl);

    this.filesServ
      .filesQuery(undefined, FileType.STUDENT_INSCRIPTIONS)
      .subscribe((data) => {
        this.availableStartYears = data.result.map((file) => file.year).sort();
      });
  }

  yearAValueChanged($event: number) {
    this.yearBInputControl.enable();
    this.yearBInputControl.reset();
    this.yearBInputControl.updateValueAndValidity();
    this.availableEndYears = this.availableStartYears.slice(
      this.availableStartYears.lastIndexOf($event) + 1
    );
  }
}
