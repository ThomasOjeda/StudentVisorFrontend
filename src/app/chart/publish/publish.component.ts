import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ChartType } from '../chart-type.model';
import { TransformationRequest } from 'src/app/interfaces/transformation-request';
import { ChartsService } from 'src/app/services/charts.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-publish',
  templateUrl: './publish.component.html',
  styleUrls: ['./publish.component.css']
})
export class PublishComponent implements OnInit {

  publishHeader = new FormGroup<any>({
    name: new FormControl('', [Validators.required]),
    type: new FormControl('', [Validators.required]),
  });
  publishStructure = new FormGroup<any>({})


  types = [{label:"Movimientos de estudiantes",value:ChartType.STUDENT_MOVEMENTS},{label:"Inscripciones",value:ChartType.STUDENT_INSCRIPTIONS}]

  loading:boolean = false;

  constructor(private chartService:ChartsService) { }

  ngOnInit(): void {
  }

  onSubmit(){

    this.loading = true;

    const transformationRequest: TransformationRequest = {
      transformationHeader:this.publishHeader.value,
      transformationBody:this.publishStructure.value
    }

    console.log(transformationRequest);
    
    this.chartService.requestTransformation(transformationRequest).subscribe({
      next: ()=>{},
      error: (err:HttpErrorResponse) => {
        console.log(err);
        this.loading = false;
      },
      complete: () => {
        console.log("transformation request completed")
        this.loading=false;
      }
    })

  }

  typeChanged($event:string) {
    if ($event==='STMV')
    this.publishStructure = new FormGroup({
      yearA: new FormControl(null, [Validators.required]),
      yearB: new FormControl(null, [Validators.required]),
    });
    if ($event==='INSC')
    this.publishStructure = new FormGroup({
      year: new FormControl(null, [Validators.required]),
    });
  }

}
