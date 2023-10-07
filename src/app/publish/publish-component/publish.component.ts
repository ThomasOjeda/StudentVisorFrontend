import {
  Component,
  ElementRef,
  Input,
  OnInit,
  Type,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { TagData } from 'src/app/model/tag-data';
import { ChartData } from 'src/app/model/chart-data';
import { ChartType } from 'src/app/chart/model/chart-type';
import { TransformationForm } from '../forms/transformation-form';
import { StudentMovementsFormComponent } from '../forms/student-movements-form/student-movements-form.component';
import { StudentInscriptionsFormComponent } from '../forms/student-inscriptions-form/student-inscriptions-form.component';
import { TagsRequestResponse } from 'src/app/tags/models/tags-request-response';
import { TransformationRequest } from '../model/transformation-request';
import { TagsService } from 'src/app/tags/services/tags.service';
import { ChartsService } from 'src/app/chart/services/charts.service';
import { ElementAnchorDirective } from 'src/app/shared/element-anchor/element-anchor.directive';
import { StudentMigrationsFormComponent } from '../forms/student-migrations-form/student-migrations-form.component';
import { UnitInscriptionsFormComponent } from '../forms/unit-inscriptions-form/unit-inscriptions-form.component';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-publish',
  templateUrl: './publish.component.html',
  styleUrls: ['./publish.component.css'],
})
export class PublishComponent implements OnInit {
  transformationBodyGroup = new FormGroup<any>({});

  transformationForm = new FormGroup({
    transformationHeader: new FormGroup({
      name: new FormControl('', [
        Validators.required,
        Validators.maxLength(256),
      ]),
      description: new FormControl('', [Validators.maxLength(512)]),
      type: new FormControl('', [Validators.required]),
      tags: new FormControl([]),
    }),
    transformationBody: this.transformationBodyGroup,
  });

  previsualizedChart!: ChartData | null;

  types = [
    { label: 'Movimientos de estudiantes', value: ChartType.STUDENT_MOVEMENTS },
    { label: 'Inscripciones', value: ChartType.STUDENT_INSCRIPTIONS },
    { label: 'Migraciones', value: ChartType.STUDENT_MIGRATIONS },
    { label: 'Inscripciones a unidades', value: ChartType.UNIT_INSCRIPTIONS },
  ];

  formChangeHandlers = {
    [ChartType.STUDENT_MOVEMENTS]: StudentMovementsFormComponent,
    [ChartType.STUDENT_INSCRIPTIONS]: StudentInscriptionsFormComponent,
    [ChartType.STUDENT_MIGRATIONS]: StudentMigrationsFormComponent,
    [ChartType.UNIT_INSCRIPTIONS]: UnitInscriptionsFormComponent,
  };

  toggle: boolean = false;
  loading: boolean = false;

  allTags: TagData[] = [];

  @ViewChild('tagInput') tagInput!: ElementRef<HTMLInputElement>;
  @ViewChild(ElementAnchorDirective, { static: true })
  formAnchor!: ElementAnchorDirective;

  @Input() newPublicationCommand!: Subject<string>;

  constructor(
    private chartService: ChartsService,
    private tagsServ: TagsService
  ) {
    tagsServ.getTags().subscribe({
      next: (response: TagsRequestResponse) => {
        if (response.result.length > 0) {
          this.allTags = response.result;
          //Reposition the public tag in case it is not in the first position
          let i = this.allTags.findIndex((tag: TagData) => tag._id == 'PUBLIC');
          //Check if public tag is present
          if (i != -1) {
            let publicTag = this.allTags[i];
            this.allTags.splice(i, 1);
            this.allTags.unshift(publicTag);
          }
        } else this.allTags = [];
      },
      error: (err: HttpErrorResponse) => {},
      complete: () => {},
    });
  }

  ngOnInit(): void {}

  previsualize() {
    console.log(this.transformationForm.value);
    this.loading = true;
    this.chartService
      .requestPrevisualization(
        this.transformationForm.value as TransformationRequest
      )
      .subscribe({
        next: (response: ChartData) => {
          this.previsualizedChart = response;
        },
        error: (err: HttpErrorResponse) => {
          this.loading = false;
        },
        complete: () => {
          this.loading = false;
        },
      });
  }

  publish() {
    this.loading = true;
    this.chartService
      .requestTransformation(
        this.transformationForm.value as TransformationRequest
      )
      .subscribe({
        next: (response: ChartData) => {
          this.previsualizedChart = response;
        },
        error: (err: HttpErrorResponse) => {
          this.loading = false;
        },
        complete: () => {
          this.loading = false;
          this.newPublicationCommand.next('new');
        },
      });
  }

  typeChanged($event: ChartType) {
    this.transformationBodyGroup = new FormGroup<any>({});
    this.transformationForm.setControl(
      'transformationBody',
      this.transformationBodyGroup
    );
    const viewContainerRef = this.formAnchor.viewContainerRef;
    viewContainerRef.clear();

    this.setFormComponent(viewContainerRef, this.formChangeHandlers[$event]);
  }

  setFormComponent(
    viewContainerRef: ViewContainerRef,
    newComponent: Type<TransformationForm>
  ) {
    const componentRef =
      viewContainerRef.createComponent<TransformationForm>(newComponent);
    componentRef.setInput('transformationBody', this.transformationBodyGroup);
  }
}
