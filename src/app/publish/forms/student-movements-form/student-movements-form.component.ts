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
  offerAInputControl = new FormControl({ value: undefined, disabled: true });
  offerBInputControl = new FormControl({ value: undefined, disabled: true });

  @Input() transformationBody!: FormGroup;

  availableStartYears: number[] = [];
  availableEndYears: number[] = [];
  availableAUnits: any[] = [];
  availableBUnits: any[] = [];
  availableStartOffers: any[] = [];
  availableEndOffers: any[] = [];

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
    this.transformationBody.addControl('offerA', this.offerAInputControl);
    this.transformationBody.addControl('offerB', this.offerBInputControl);

    this.unitAInputControl.setValue(undefined);
    this.unitBInputControl.setValue(undefined);
    this.genderInputControl.setValue(undefined);
    this.offerAInputControl.setValue(undefined);
    this.offerBInputControl.setValue(undefined);

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

  unitAChanged(unit: string) {
    this.reconfigureOfferAInput(unit);
  }

  unitBChanged(unit: string) {
    this.reconfigureOfferBInput(unit);
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

    this.offerBInputControl.setValue(undefined);
    this.offerBInputControl.disable();
  }

  reconfigureUnitAInput(year: number) {
    this.unitAInputControl.setValue(undefined);
    this.unitAInputControl.disable();

    this.offerAInputControl.setValue(undefined);
    this.offerAInputControl.disable();

    this.offerBInputControl.setValue(undefined);
    this.offerBInputControl.disable();

    this.dataCatServ.getUnits(year).subscribe((data: any) => {
      this.availableAUnits = data.result.sort();
      this.availableAUnits.unshift(undefined);
      this.unitAInputControl.enable();
    });
  }

  reconfigureUnitBInput(year: number) {
    this.unitBInputControl.setValue(undefined);
    this.unitBInputControl.disable();

    this.offerBInputControl.setValue(undefined);
    this.offerBInputControl.disable();

    this.dataCatServ.getUnits(year).subscribe((data: any) => {
      this.availableBUnits = data.result.sort();
      this.availableBUnits.unshift(undefined);
      this.unitBInputControl.enable();
    });
  }

  reconfigureOfferAInput(unit: string) {
    this.offerAInputControl.setValue(undefined);
    this.offerAInputControl.disable();

    if (this.yearAInputControl.value && unit)
      this.dataCatServ
        .getOffers(this.yearAInputControl.value, unit)
        .subscribe((data: any) => {
          this.availableStartOffers = data.result.sort();
          this.availableStartOffers.unshift(undefined);
          this.offerAInputControl.enable();
        });
  }

  reconfigureOfferBInput(unit: string) {
    this.offerBInputControl.setValue(undefined);
    this.offerBInputControl.disable();

    if (this.yearBInputControl.value && unit)
      this.dataCatServ
        .getOffers(this.yearBInputControl.value, unit)
        .subscribe((data: any) => {
          this.availableEndOffers = data.result.sort();
          this.availableEndOffers.unshift(undefined);
          this.offerBInputControl.enable();
        });
  }
}
