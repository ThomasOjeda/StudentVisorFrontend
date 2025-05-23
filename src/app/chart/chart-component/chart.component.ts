import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnChanges,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { ChartData } from '../../model/chart-data';

import { ChartType } from '../model/chart-type';
import { ElementAnchorDirective } from 'src/app/shared/element-anchor/element-anchor.directive';
import { StudentMovementsChartComponent } from '../custom-charts/student-movements-chart/student-movements-chart.component';
import { StudentInscriptionsChartComponent } from '../custom-charts/student-inscriptions-chart/student-inscriptions-chart.component';
import { StudentMigrationsChartComponent } from '../custom-charts/student-migrations-chart/student-migrations-chart.component';
import { UnitInscriptionsChartComponent } from '../custom-charts/unit-inscriptions-chart/unit-inscriptions-chart.component';
import { StudentScholarshipMovementsChartComponent } from '../custom-charts/student-scholarship-movements-chart/student-scholarship-movements-chart.component';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css'],
})
export class ChartComponent implements OnChanges, AfterViewInit {
  @Input() chart!: ChartData;
  @Input() isPrevisualization = false;

  @ViewChild('chartViewContainer', { static: true, read: ViewContainerRef })
  canvasContainer!: ViewContainerRef;

  tags!: string[];

  chartComponents = {
    [ChartType.STUDENT_INSCRIPTIONS]: StudentInscriptionsChartComponent,
    [ChartType.STUDENT_MOVEMENTS]: StudentMovementsChartComponent,
    [ChartType.STUDENT_MIGRATIONS]: StudentMigrationsChartComponent,
    [ChartType.UNIT_INSCRIPTIONS]: UnitInscriptionsChartComponent,
    [ChartType.STUDENT_SCH_MOVEMENTS]:
      StudentScholarshipMovementsChartComponent,
  };

  constructor() {}

  ngOnChanges() {
    this.refreshContent();
  }
  refreshContent() {
    this.canvasContainer.clear();

    const componentRef = this.canvasContainer.createComponent(
      this.chartComponents[this.chart.type as ChartType]
    );
    componentRef.setInput('chart', this.chart);

    this.tags = this.chart.tags;
  }

  ngAfterViewInit(): void {
    this.refreshContent();
  }

  showPreviewDetails = false;
}
