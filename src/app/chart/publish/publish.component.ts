import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ChartType } from '../chart-type.model';

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

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit(){
    console.log(this.publishHeader.value)
    console.log(this.publishStructure.value)

    console.log(this.publishHeader.invalid)
    console.log(this.publishStructure.invalid)
  }

  typeChanged($event:string) {
    if ($event==='STMV')
    this.publishStructure = new FormGroup({
      startYear: new FormControl(null, [Validators.required]),
      endYear: new FormControl(null, [Validators.required]),
    });
    if ($event==='INSC')
    this.publishStructure = new FormGroup({
      year: new FormControl(null, [Validators.required]),
    });
  }

}
