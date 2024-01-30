import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ChartData } from 'src/app/model/chart-data';
import { CustomChart } from '../custom-chart';
import {
  ArcElement,
  Chart,
  Colors,
  DoughnutController,
  Legend,
  PieController,
  Tooltip,
} from 'chart.js';

Chart.register(
  PieController,
  DoughnutController,
  ArcElement,
  Colors,
  Tooltip,
  Legend
);
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
          labels: ['Rematriculados', 'Cambios', 'No Rematriculados'],
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
    if (type == 'doughnut') {
      this.chartVisualization = new Chart(this.canvas.nativeElement, {
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
}
