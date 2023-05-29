import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { ChartItem } from 'chart.js/auto';
import { Result } from '../interfaces/charts-request-response';
import { studentMovementsHandler } from './chart-handlers/student-movements.handler';
import { studentInscriptionsHandler } from './chart-handlers/student-inscriptions.handler';
import { ChartType } from './chart-handlers/chart-type.model';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css'],
})
export class ChartComponent implements OnInit, AfterViewInit {
  @Input() chartStructure!: Result;

  @ViewChild('chartTemplate', { read: ElementRef }) chartTemplate!: ElementRef;

  constructor(private renderer: Renderer2) {}
  ngAfterViewInit(): void {

    console.log(this.chartStructure)

    if (this.chartStructure.type == ChartType.STUDENT_INSCRIPTIONS)
    studentInscriptionsHandler(this.renderer, this.chartTemplate, this.chartStructure);
    if (this.chartStructure.type == ChartType.STUDENT_MOVEMENTS)
    studentMovementsHandler(this.renderer, this.chartTemplate, this.chartStructure);

  }

  ngOnInit(): void {}
}
