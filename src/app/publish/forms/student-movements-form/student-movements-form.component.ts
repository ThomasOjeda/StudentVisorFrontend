import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TransformationForm } from '../transformation-form';
import { FilesService } from 'src/app/files/services/files.service';
import { FileType } from 'src/app/files/model/file-type';
import { DataCategoriesService } from '../../services/data-categories.service';

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

  unitAInputControl = new FormControl();
  unitBInputControl = new FormControl();
  genderInputControl = new FormControl();

  @Input() transformationBody!: FormGroup;

  availableStartYears: number[] = [];
  availableEndYears: number[] = [];
  availableUnits: any[] = [];
  availableGenders: any[] = [];
  constructor(
    private filesServ: FilesService,
    private dataCatServ: DataCategoriesService
  ) {}

  ngOnInit(): void {
    this.transformationBody.addControl('yearA', this.yearAInputControl);
    this.transformationBody.addControl('yearB', this.yearBInputControl);
    this.transformationBody.addControl('unitA', this.unitAInputControl);
    this.transformationBody.addControl('unitB', this.unitBInputControl);
    this.transformationBody.addControl('sex', this.genderInputControl);

    this.unitAInputControl.setValue(undefined);
    this.unitBInputControl.setValue(undefined);
    this.genderInputControl.setValue(undefined);
    this.filesServ
      .filesQuery(undefined, FileType.STUDENT_INSCRIPTIONS)
      .subscribe((data) => {
        this.availableStartYears = data.result.map((file) => file.year).sort();
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

  yearAValueChanged($event: number) {
    this.yearBInputControl.enable();
    this.yearBInputControl.reset();
    this.yearBInputControl.updateValueAndValidity();
    this.availableEndYears = this.availableStartYears.slice(
      this.availableStartYears.lastIndexOf($event) + 1
    );
  }
}
