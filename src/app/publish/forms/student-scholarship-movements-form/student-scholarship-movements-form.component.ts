import { Component, Input, OnInit } from '@angular/core';
import { TransformationForm } from '../transformation-form';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FilesService } from 'src/app/files/services/files.service';
import { FileType } from 'src/app/files/model/file-type';
import { DataCategoriesService } from '../../services/data-categories.service';

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
    { value: undefined, disabled: true },
    [Validators.required]
  );
  unitAInputControl = new FormControl<string | null | undefined>({
    value: undefined,
    disabled: true,
  });
  unitBInputControl = new FormControl<string | null | undefined>({
    value: undefined,
    disabled: true,
  });
  genderInputControl = new FormControl<number | null | undefined>({
    value: undefined,
    disabled: false,
  });
  offerAInputControl = new FormControl<string | null | undefined>({
    value: undefined,
    disabled: true,
  });
  offerBInputControl = new FormControl<string | null | undefined>({
    value: undefined,
    disabled: true,
  });

  @Input() transformationBody!: FormGroup;

  availableStartYears: number[] = [];
  availableEndYears: number[] = [];
  availableAUnits: any[] = [];
  availableBUnits: any[] = [];
  availableStartOffers: any[] = [];
  availableEndOffers: any[] = [];

  availableGenders: any[] = [];

  schTypes: any[] = [];

  constructor(
    private filesServ: FilesService,
    private dataCatServ: DataCategoriesService
  ) {}

  ngOnInit(): void {
    this.yearAInputControl.valueChanges.subscribe((data) => {
      this.yearAValueChanged(data);
    });

    this.unitAInputControl.valueChanges.subscribe((data) => {
      this.unitAChanged(data);
    });

    this.yearBInputControl.valueChanges.subscribe((data) => {
      this.yearBValueChanged(data);
    });

    this.unitBInputControl.valueChanges.subscribe((data) => {
      this.unitBChanged(data);
    });

    this.transformationBody.addControl('yearA', this.yearAInputControl);
    this.transformationBody.addControl('yearB', this.yearBInputControl);
    this.transformationBody.addControl(
      'schType',
      this.scholarshipTypeInputControl
    );
    this.transformationBody.addControl('unitA', this.unitAInputControl);
    this.transformationBody.addControl('unitB', this.unitBInputControl);
    this.transformationBody.addControl('sex', this.genderInputControl);
    this.transformationBody.addControl('offerA', this.offerAInputControl);
    this.transformationBody.addControl('offerB', this.offerBInputControl);

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

  yearAValueChanged(yearA: number | null | undefined) {
    this.reconfigureUnitAInput(yearA);
    this.reconfigureYearBInput(yearA);
  }

  yearBValueChanged($event: number | null | undefined) {
    this.reconfigureUnitBInput($event);
    this.reconfigureScholarshipTypeInput($event);
  }

  unitAChanged(unit: string | null | undefined) {
    this.reconfigureOfferAInput(unit);
  }

  unitBChanged(unit: string | null | undefined) {
    this.reconfigureOfferBInput(unit);
  }

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

  reconfigureUnitAInput(year: number | null | undefined) {
    this.unitAInputControl.setValue(undefined);
    this.unitAInputControl.disable({ emitEvent: false });

    if (year) {
      this.dataCatServ.getUnits(year).subscribe((data: any) => {
        this.availableAUnits = data.result.sort();
        this.availableAUnits.unshift(undefined);
        this.unitAInputControl.enable({ emitEvent: false });
      });
    }
  }

  reconfigureUnitBInput(year: number | null | undefined) {
    this.unitBInputControl.setValue(undefined);
    this.unitBInputControl.disable({ emitEvent: false });

    if (year)
      this.dataCatServ.getUnits(year).subscribe((data: any) => {
        this.availableBUnits = data.result.sort();
        this.availableBUnits.unshift(undefined);
        this.unitBInputControl.enable({ emitEvent: false });
      });
  }

  reconfigureOfferAInput(unit: string | null | undefined) {
    this.offerAInputControl.setValue(undefined);
    this.offerAInputControl.disable({ emitEvent: false });

    if (this.yearAInputControl.value && unit)
      this.dataCatServ
        .getOffers(this.yearAInputControl.value, unit)
        .subscribe((data: any) => {
          this.availableStartOffers = data.result.sort();
          this.availableStartOffers.unshift(undefined);
          this.offerAInputControl.enable({ emitEvent: false });
        });
  }

  reconfigureOfferBInput(unit: string | null | undefined) {
    this.offerBInputControl.setValue(undefined);
    this.offerBInputControl.disable({ emitEvent: false });

    if (this.yearBInputControl.value && unit)
      this.dataCatServ
        .getOffers(this.yearBInputControl.value, unit)
        .subscribe((data: any) => {
          this.availableEndOffers = data.result.sort();
          this.availableEndOffers.unshift(undefined);
          this.offerBInputControl.enable({ emitEvent: false });
        });
  }

  reconfigureScholarshipTypeInput(year: number | null | undefined) {
    this.scholarshipTypeInputControl.setValue(undefined);
    this.scholarshipTypeInputControl.disable({ emitEvent: false });
    this.schTypes = [];
    if (year) {
      this.dataCatServ.getFileTypes(year).subscribe((data: any) => {
        data.result.forEach((element: string) => {
          if (element == FileType.STUDENT_SCHOLARSHIPS_PROGRESAR) {
            this.schTypes.push({ label: 'progresar', value: element });
          }
          if (element == FileType.STUDENT_SCHOLARSHIPS_BELGRANO) {
            this.schTypes.push({ label: 'belgrano', value: element });
          }
        });
        this.scholarshipTypeInputControl.enable({ emitEvent: false });
      });
    }
  }
}
