import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TransformationForm } from '../transformation-form';
import { FilesService } from 'src/app/files/services/files.service';
import { FileType } from 'src/app/files/model/file-type';
import { DataCategoriesService } from '../../services/data-categories.service';

@Component({
  selector: 'app-student-inscriptions-form',
  templateUrl: './student-inscriptions-form.component.html',
  styleUrls: ['./student-inscriptions-form.component.css'],
})
export class StudentInscriptionsFormComponent
  implements OnInit, TransformationForm
{
  yearInputControl = new FormControl(null, [Validators.required]);
  unitInputControl = new FormControl();
  genderInputControl = new FormControl();

  @Input() transformationBody!: FormGroup;

  availableYears: number[] = [];
  availableUnits: any[] = [];
  availableGenders: any[] = [];

  constructor(
    private filesServ: FilesService,
    private dataCatServ: DataCategoriesService
  ) {}

  ngOnInit(): void {
    this.transformationBody.addControl('year', this.yearInputControl);
    this.transformationBody.addControl('unit', this.unitInputControl);
    this.transformationBody.addControl('sex', this.genderInputControl);

    this.unitInputControl.setValue(undefined);
    this.genderInputControl.setValue(undefined);

    this.filesServ
      .filesQuery(undefined, FileType.STUDENT_INSCRIPTIONS)
      .subscribe((data) => {
        this.availableYears = data.result.map((file) => file.year).sort();
      });

    this.dataCatServ.getUnits().subscribe((data: any) => {
      this.availableUnits = data.result;
      this.availableUnits.unshift({ _id: undefined, label: 'Sin filtro' });
    });
    this.dataCatServ.getGenders().subscribe((data: any) => {
      this.availableGenders = data.result;
      this.availableGenders.unshift({ _id: undefined, label: 'Sin filtro' });
    });
  }
}
