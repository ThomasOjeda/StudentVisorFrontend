import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard-component/dashboard.component';
import { ChartModule } from '../chart/chart.module';
import { MaterialDesignModule } from '../material-design/material-design.module';

@NgModule({
  declarations: [DashboardComponent],
  imports: [CommonModule, ChartModule, MaterialDesignModule],
})
export class DashboardModule {}
