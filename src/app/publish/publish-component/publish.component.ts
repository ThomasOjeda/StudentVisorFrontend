import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TransformationRequest } from 'src/app/model/transformation-request';
import { ChartsService } from 'src/app/services/charts.service';
import { HttpErrorResponse } from '@angular/common/http';
import { TagsService } from 'src/app/services/tags.service';
import {
  TagData,
  TagsRequestResponse,
} from 'src/app/model/tags-request-response';
import { ChartData } from 'src/app/model/charts-request-response';
import { ChartType } from 'src/app/model/chart-type.model';

@Component({
  selector: 'app-publish',
  templateUrl: './publish.component.html',
  styleUrls: ['./publish.component.css'],
})
export class PublishComponent implements OnInit {
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
    transformationBody: new FormGroup<any>({}),
  });

  previsualizedChart!: ChartData | null;

  types = [
    { label: 'Movimientos de estudiantes', value: ChartType.STUDENT_MOVEMENTS },
    { label: 'Inscripciones', value: ChartType.STUDENT_INSCRIPTIONS },
  ];

  toggle: boolean = false;
  loading: boolean = false;

  allTags: TagData[] = [];

  @ViewChild('tagInput') tagInput!: ElementRef<HTMLInputElement>;

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
      error: (err: HttpErrorResponse) => {
        console.log(err);
      },
      complete: () => {},
    });
  }

  ngOnInit(): void {}

  previsualize() {
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
          console.log(err);
          this.loading = false;
        },
        complete: () => {
          console.log('previsualization request completed');
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
          console.log(err);
          this.loading = false;
        },
        complete: () => {
          console.log('publish request completed');
          this.loading = false;
        },
      });
  }

  typeChanged($event: string) {
    if ($event === 'STMV')
      this.transformationForm.setControl(
        'transformationBody',
        new FormGroup({
          yearA: new FormControl(null, [Validators.required]),
          yearB: new FormControl(null, [Validators.required]),
        })
      );
    if ($event === 'INSC')
      this.transformationForm.setControl(
        'transformationBody',
        new FormGroup({
          year: new FormControl(null, [Validators.required]),
        })
      );
  }
}
