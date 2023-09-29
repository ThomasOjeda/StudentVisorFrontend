import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { CustomChart } from '../custom-chart';
import { ChartData } from 'src/app/model/chart-data';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-student-migrations-chart',
  templateUrl: './student-migrations-chart.component.html',
  styleUrls: ['./student-migrations-chart.component.css'],
})
export class StudentMigrationsChartComponent
  implements OnInit, CustomChart, AfterViewInit
{
  @Input() chart!: ChartData;

  @ViewChild('canvas') canvas!: ElementRef;

  chartVisualization!: any;

  type = '';
  constructor() {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.chartTypeChanged('pie');
  }

  chartTypeChanged(type: string) {
    if (this.type == type) return;
    this.type = type;
    if (this.chartVisualization) this.chartVisualization.destroy();
    if (type == 'pie') {
      this.chartVisualization = new Chart(this.canvas.nativeElement, {
        type: 'pie',
        data: {
          labels: Object.keys(this.chart.structure),
          datasets: [
            {
              data: Object.values(this.chart.structure),
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
    if (type == 'doughnut') {
      this.chartVisualization = new Chart(this.canvas.nativeElement, {
        type: 'doughnut',
        data: {
          labels: Object.keys(this.chart.structure),
          datasets: [
            {
              data: Object.values(this.chart.structure),
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
}
