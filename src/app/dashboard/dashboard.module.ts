import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard-component/dashboard.component';
import { ChartModule } from '../chart/chart.module';

@NgModule({
  declarations: [DashboardComponent],
  imports: [CommonModule, ChartModule],
})
export class DashboardModule {}
