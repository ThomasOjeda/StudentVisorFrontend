import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ChartData } from 'src/app/model/chart-data';
import {
  BarController,
  BarElement,
  CategoryScale,
  Chart,
  Colors,
  LinearScale,
  Tooltip,
} from 'chart.js';

Chart.register(
  BarController,
  BarElement,
  CategoryScale,
  LinearScale,
  Colors,
  Tooltip
);

@Component({
  selector: 'app-student-scholarship-movements-chart',
  templateUrl: './student-scholarship-movements-chart.component.html',
  styleUrls: ['./student-scholarship-movements-chart.component.css'],
})
export class StudentScholarshipMovementsChartComponent
  implements OnInit, AfterViewInit
{
  @Input() chart!: ChartData;
  chartVisualization!: any;

  type = '';
  @ViewChild('canvas') canvas!: ElementRef;
  constructor() {}
  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.chartTypeChanged('horizontal');
  }

  chartTypeChanged(type: string) {
    if (this.type == type) return;
    this.type = type;
    if (this.chartVisualization) this.chartVisualization.destroy();
    if (type == 'horizontal') {
      this.chartVisualization = new Chart(this.canvas.nativeElement, {
        type: 'bar',
        data: {
          labels: Object.keys(this.chart.structure),
          datasets: [
            {
              label: 'Nº alumnos que se movieron a la oferta',
              data: Object.values(this.chart.structure),
            },
          ],
        },
        options: {
          indexAxis: 'x',

          onClick(event, elements, chart) {},
          maintainAspectRatio: false,
        },
      });
    }
    if (type == 'vertical') {
      this.chartVisualization = new Chart(this.canvas.nativeElement, {
        type: 'bar',
        data: {
          labels: Object.keys(this.chart.structure),
          datasets: [
            {
              label: 'Nº alumnos que se movieron a la oferta',
              data: Object.values(this.chart.structure),
            },
          ],
        },
        options: {
          indexAxis: 'y',

          onClick(event, elements, chart) {},
          maintainAspectRatio: false,
        },
      });
    }
  }
}
