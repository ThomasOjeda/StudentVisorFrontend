import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ChartType } from '../chart/chart-type.model';
import { TransformationRequest } from 'src/app/model/transformation-request';
import { ChartsService } from 'src/app/services/charts.service';
import { HttpErrorResponse } from '@angular/common/http';
import { TagsService } from 'src/app/services/tags.service';
import {
  TagData,
  TagsRequestResponse,
} from 'src/app/model/tags-request-response';
import { ChartData } from 'src/app/model/charts-request-response';

@Component({
  selector: 'app-publish',
  templateUrl: './publish.component.html',
  styleUrls: ['./publish.component.css'],
})
export class PublishComponent implements OnInit {
  transformationForm = new FormGroup({
    transformationHeader: new FormGroup({
      name: new FormControl('', [Validators.required]),
      type: new FormControl('', [Validators.required]),
      tags: new FormControl([]),
    }),
    transformationBody: new FormGroup<any>({}),
  });

  testStructure!: ChartData;

  types = [
    { label: 'Movimientos de estudiantes', value: ChartType.STUDENT_MOVEMENTS },
    { label: 'Inscripciones', value: ChartType.STUDENT_INSCRIPTIONS },
  ];

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

  onSubmit() {
    this.loading = true;
    this.chartService
      .requestPrevisualization(
        this.transformationForm.value as TransformationRequest
      )
      .subscribe({
        next: (response: any) => {
          ///MEJORAR tipo
          console.log(response.structure);
          this.testStructure = {
            _id: 'AA',
            name: 'A',
            tags: [],
            structure: response.structure,
            type: 'INSC',
            createdAt: new Date(),
            updatedAt: new Date(),
            __v: 0,
          };
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
