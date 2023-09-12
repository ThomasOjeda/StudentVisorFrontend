import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ChartData } from 'src/app/model/chart-data';
import { Chart } from 'chart.js/auto';
import { CustomChart } from '../custom-chart';

@Component({
  selector: 'app-student-movements-chart',
  templateUrl: './student-movements-chart.component.html',
  styleUrls: ['./student-movements-chart.component.css'],
})
export class StudentMovementsChartComponent
  implements CustomChart, OnInit, AfterViewInit
{
  @Input() chart!: ChartData;

  @ViewChild('canvas') canvas!: ElementRef;

  constructor() {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    new Chart(this.canvas.nativeElement, {
      type: 'doughnut',
      data: {
        labels: ['Reinscriptos', 'Movimientos', 'Sin Datos'],
        datasets: [
          {
            data: [
              this.chart.structure.Reenrolled,
              this.chart.structure.Movements,
              this.chart.structure.NoData,
            ],
            backgroundColor: [
              'rgb(255, 99, 132)',
              'rgb(54, 162, 235)',
              'rgb(255, 205, 86)',
            ],
            hoverOffset: 4,
          },
        ],
      },
      options: {
        onClick(event, elements, chart) {},
        maintainAspectRatio: false,
      },
    });
  }
}
