import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TransformationForm } from '../transformation-form';
import { FilesService } from 'src/app/files/services/files.service';
import { FileType } from 'src/app/files/model/file-type';

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

  availableYears: number[] = [];

  constructor(private filesServ: FilesService) {}

  ngOnInit(): void {
    this.transformationBody.addControl('year', this.yearInputControl);

    this.filesServ
      .filesQuery(undefined, FileType.STUDENT_INSCRIPTIONS)
      .subscribe((data) => {
        this.availableYears = data.result.map((file) => file.year).sort();
      });
  }
}
