import {
  AfterViewInit,
  Component,
  Input,
  OnChanges,
  ViewChild,
} from '@angular/core';
import { ChartData } from '../../model/chart-data';

import { ChartType } from '../model/chart-type';
import { ElementAnchorDirective } from 'src/app/shared/element-anchor/element-anchor.directive';
import { StudentMovementsChartComponent } from '../custom-charts/student-movements-chart/student-movements-chart.component';
import { StudentInscriptionsChartComponent } from '../custom-charts/student-inscriptions-chart/student-inscriptions-chart.component';
import { StudentMigrationsChartComponent } from '../custom-charts/student-migrations-chart/student-migrations-chart.component';
import { UnitInscriptionsChartComponent } from '../custom-charts/unit-inscriptions-chart/unit-inscriptions-chart.component';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css'],
})
export class ChartComponent implements OnChanges, AfterViewInit {
  @Input() chart!: ChartData;

  @ViewChild(ElementAnchorDirective, { static: true })
  canvasAnchor!: ElementAnchorDirective;

  tags!: string[];

  chartComponents = {
    [ChartType.STUDENT_INSCRIPTIONS]: StudentInscriptionsChartComponent,
    [ChartType.STUDENT_MOVEMENTS]: StudentMovementsChartComponent,
    [ChartType.STUDENT_MIGRATIONS]: StudentMigrationsChartComponent,
    [ChartType.UNIT_INSCRIPTIONS]: UnitInscriptionsChartComponent,
  };

  constructor() {}

  ngOnChanges() {
    this.refreshContent();
  }
  refreshContent() {
    const viewContainerRef = this.canvasAnchor.viewContainerRef;
    viewContainerRef.clear();

    const componentRef = viewContainerRef.createComponent(
      this.chartComponents[this.chart.type as ChartType]
    );
    componentRef.setInput('chart', this.chart);

    this.tags = this.chart.tags;
  }

  ngAfterViewInit(): void {
    this.refreshContent();
  }
}
