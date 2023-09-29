import { Component, Input, OnInit } from '@angular/core';
import { TransformationForm } from '../transformation-form';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FilesService } from 'src/app/files/services/files.service';
import { FileType } from 'src/app/files/model/file-type';

@Component({
  selector: 'app-unit-inscriptions-form',
  templateUrl: './unit-inscriptions-form.component.html',
  styleUrls: ['./unit-inscriptions-form.component.css'],
})
export class UnitInscriptionsFormComponent
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
