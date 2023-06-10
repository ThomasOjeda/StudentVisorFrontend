import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ChartType } from '../chart-type.model';
import { TransformationRequest } from 'src/app/interfaces/transformation-request';
import { ChartsService } from 'src/app/services/charts.service';
import { HttpErrorResponse } from '@angular/common/http';
import { TagsService } from 'src/app/services/tags.service';
import {
  Tag,
  TagsRequestResponse,
} from 'src/app/interfaces/tags-request-response';

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

  types = [
    { label: 'Movimientos de estudiantes', value: ChartType.STUDENT_MOVEMENTS },
    { label: 'Inscripciones', value: ChartType.STUDENT_INSCRIPTIONS },
  ];

  loading: boolean = false;

  allTags!: Tag[];

  @ViewChild('tagInput') tagInput!: ElementRef<HTMLInputElement>;

  constructor(
    private chartService: ChartsService,
    private tagsServ: TagsService
  ) {
    tagsServ.getTags().subscribe({
      next: (response: TagsRequestResponse) => {
        this.allTags = response.result;
        //Reposition the public tag in case it is not in the first position
        let i = this.allTags.findIndex((tag: Tag) => tag._id == 'PUBLIC');
        let publicTag = this.allTags[i];
        this.allTags.splice(i, 1);
        this.allTags.unshift(publicTag);
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
      .requestTransformation(
        this.transformationForm.value as TransformationRequest
      )
      .subscribe({
        next: () => {},
        error: (err: HttpErrorResponse) => {
          console.log(err);
          this.loading = false;
        },
        complete: () => {
          console.log('transformation request completed');
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
