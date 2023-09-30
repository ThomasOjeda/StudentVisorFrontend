import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import Chart from 'chart.js/auto';
import { ChartData } from 'src/app/model/chart-data';

@Component({
  selector: 'app-unit-inscriptions-chart',
  templateUrl: './unit-inscriptions-chart.component.html',
  styleUrls: ['./unit-inscriptions-chart.component.css'],
})
export class UnitInscriptionsChartComponent implements OnInit, AfterViewInit {
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
              label: 'Cantidad de inscripciones',
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
              label: 'Cantidad de inscripciones',
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
