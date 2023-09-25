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

  unitAInputControl = new FormControl({ value: undefined, disabled: true });
  unitBInputControl = new FormControl({ value: undefined, disabled: true });
  genderInputControl = new FormControl();

  @Input() transformationBody!: FormGroup;

  availableStartYears: number[] = [];
  availableEndYears: number[] = [];
  availableAUnits: any[] = [];
  availableBUnits: any[] = [];

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

    this.dataCatServ.getGenders().subscribe((data: any) => {
      this.availableGenders = data.result;
      this.availableGenders.unshift({ _id: undefined, label: 'Sin filtro' });
    });
  }

  yearAValueChanged(yearA: number) {
    this.reconfigureUnitAInput(yearA);
    this.reconfigureYearBInput(yearA);
  }

  yearBValueChanged($event: number) {
    this.reconfigureUnitBInput($event);
  }

  reconfigureYearBInput(yearA: number) {
    this.availableEndYears = this.availableStartYears.slice(
      this.availableStartYears.lastIndexOf(yearA) + 1
    );
    this.yearBInputControl.enable();
    this.yearBInputControl.reset();
    this.yearBInputControl.updateValueAndValidity();

    this.unitBInputControl.setValue(undefined);
    this.unitBInputControl.disable();
  }

  reconfigureUnitAInput(year: number) {
    this.unitAInputControl.setValue(undefined);
    this.unitAInputControl.disable();
    this.dataCatServ.getUnits(year).subscribe((data: any) => {
      this.availableAUnits = data.result.sort();
      this.availableAUnits.unshift(undefined);
      this.unitAInputControl.enable();
    });
  }

  reconfigureUnitBInput(year: number) {
    this.unitBInputControl.setValue(undefined);
    this.unitBInputControl.disable();
    this.dataCatServ.getUnits(year).subscribe((data: any) => {
      this.availableBUnits = data.result.sort();
      this.availableBUnits.unshift(undefined);
      this.unitBInputControl.enable();
    });
  }
}
