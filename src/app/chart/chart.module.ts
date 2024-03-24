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
import { StudentScholarshipMovementsChartComponent } from './custom-charts/student-scholarship-movements-chart/student-scholarship-movements-chart.component';
import { MigrationDetailsDialogComponent } from './custom-charts/student-migrations-chart/migration-details-dialog/migration-details-dialog.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    ChartComponent,
    StudentMovementsChartComponent,
    StudentInscriptionsChartComponent,
    StudentMigrationsChartComponent,
    UnitInscriptionsChartComponent,
    StudentScholarshipMovementsChartComponent,
    MigrationDetailsDialogComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialDesignModule,
    SharedModule,
    RouterModule,
  ],
  exports: [ChartComponent],
})
export class ChartModule {}
