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
  unitInputControl = new FormControl({ value: undefined, disabled: true });
  offerInputControl = new FormControl({ value: undefined, disabled: true });

  genderInputControl = new FormControl();

  @Input() transformationBody!: FormGroup;

  availableYears: number[] = [];
  availableUnits: any[] = [];
  availableOffers: any[] = [];
  availableGenders: any[] = [];

  constructor(
    private filesServ: FilesService,
    private dataCatServ: DataCategoriesService
  ) {}

  ngOnInit(): void {
    this.transformationBody.addControl('year', this.yearInputControl);
    this.transformationBody.addControl('unit', this.unitInputControl);
    this.transformationBody.addControl('offer', this.offerInputControl);
    this.transformationBody.addControl('sex', this.genderInputControl);

    this.genderInputControl.setValue(undefined);

    this.filesServ
      .filesQuery(undefined, FileType.STUDENT_INSCRIPTIONS)
      .subscribe((data) => {
        this.availableYears = data.result.map((file) => file.year).sort();
      });

    this.dataCatServ.getGenders().subscribe((data: any) => {
      this.availableGenders = data.result;
      this.availableGenders.unshift({ _id: undefined, label: 'Sin filtro' });
    });
  }

  reconfigureUnitInput(year: number) {
    this.unitInputControl.disable();
    this.unitInputControl.setValue(undefined);
    this.offerInputControl.disable();
    this.offerInputControl.setValue(undefined);
    this.dataCatServ.getUnits(year).subscribe((data: any) => {
      this.unitInputControl.setValue(undefined);
      this.availableUnits = data.result.sort();
      this.availableUnits.unshift(undefined);
      this.unitInputControl.enable();
    });
  }

  reconfigureOfferInput(unit: string) {
    this.offerInputControl.disable();
    this.offerInputControl.setValue(undefined);
    if (this.yearInputControl.value && unit)
      this.dataCatServ
        .getOffers(this.yearInputControl.value, unit)
        .subscribe((data: any) => {
          this.offerInputControl.setValue(undefined);
          this.availableOffers = data.result.sort();
          this.availableOffers.unshift(undefined);
          this.offerInputControl.enable();
        });
  }
}
