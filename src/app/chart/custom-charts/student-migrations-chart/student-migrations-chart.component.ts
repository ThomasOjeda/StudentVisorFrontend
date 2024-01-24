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
import { MatDialog } from '@angular/material/dialog';
import { MigrationDetailsDialogComponent } from './migration-details-dialog/migration-details-dialog.component';

import {
  ArcElement,
  Chart,
  Colors,
  DoughnutController,
  Legend,
  PieController,
  Tooltip,
} from 'chart.js';
import { ColorsService } from 'src/app/shared/services/colors.service';

Chart.register(
  PieController,
  DoughnutController,
  ArcElement,
  Colors,
  Tooltip,
  Legend
);
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

  constructor(private dialog: MatDialog, private colorService: ColorsService) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.chartTypeChanged('pie');
  }

  private parseLabels(structure: any) {
    return Object.keys(structure);
  }

  private parseValues(structure: any) {
    return Object.values(structure).map((valueObject: any) =>
      Object.values(valueObject)
        .map((value) => Number(value))
        .reduce((previous = 0, current) => previous + current)
    );
  }

  chartTypeChanged(type: string) {
    if (this.type == type) return;
    this.type = type;
    if (this.chartVisualization) this.chartVisualization.destroy();
    if (type == 'pie') {
      this.chartVisualization = new Chart(this.canvas.nativeElement, {
        type: 'pie',
        data: {
          labels: this.parseLabels(this.chart.structure),
          datasets: [
            {
              data: this.parseValues(this.chart.structure),
              hoverOffset: 4,
              backgroundColor: this.colorService.getColors(),
            },
          ],
        },
        options: {
          onClick: (event, elements, chart) => {
            this.openDialog(
              Object.keys(this.chart.structure)[elements[0].index],
              Object.values(this.chart.structure)[elements[0].index]
            );
          },
          maintainAspectRatio: false,
        },
      });
    }
    if (type == 'doughnut') {
      this.chartVisualization = new Chart(this.canvas.nativeElement, {
        type: 'doughnut',
        data: {
          labels: this.parseLabels(this.chart.structure),
          datasets: [
            {
              data: this.parseValues(this.chart.structure),
              hoverOffset: 4,
              backgroundColor: this.colorService.getColors(),
            },
          ],
        },
        options: {
          onClick: (event, elements, chart) => {
            this.openDialog(
              Object.keys(this.chart.structure)[elements[0].index],
              Object.values(this.chart.structure)[elements[0].index]
            );
          },
          maintainAspectRatio: false,
        },
      });
    }
  }

  openDialog(label: string, values: any): void {
    const dialogRef = this.dialog.open(MigrationDetailsDialogComponent, {
      data: { label, values },
    });

    dialogRef.afterClosed().subscribe((result) => {});
  }
}
