import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartComponent } from './chart-component/chart.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialDesignModule } from '../material-design/material-design.module';
import { StudentMovementsChartComponent } from './custom-charts/student-movements-chart/student-movements-chart.component';
import { StudentInscriptionsChartComponent } from './custom-charts/student-inscriptions-chart/student-inscriptions-chart.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    ChartComponent,
    StudentMovementsChartComponent,
    StudentInscriptionsChartComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialDesignModule,
    SharedModule,
  ],
  exports: [ChartComponent],
})
export class ChartModule {}
