import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartComponent } from './chart-component/chart.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialDesignModule } from '../material-design/material-design.module';
import { StudentMovementsChartComponent } from './custom-charts/student-movements-chart/student-movements-chart.component';
import { StudentInscriptionsChartComponent } from './custom-charts/student-inscriptions-chart/student-inscriptions-chart.component';
import { SharedModule } from '../shared/shared.module';
import { StudentMigrationsChartComponent } from './custom-charts/student-migrations-chart/student-migrations-chart.component';
import { UnitInscriptionsChartComponent } from './custom-charts/unit-inscriptions-chart/unit-inscriptions-chart.component';

@NgModule({
  declarations: [
    ChartComponent,
    StudentMovementsChartComponent,
    StudentInscriptionsChartComponent,
    StudentMigrationsChartComponent,
    UnitInscriptionsChartComponent,
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
