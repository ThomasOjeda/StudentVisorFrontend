import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartComponent } from './chart-component/chart.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialDesignModule } from '../material-design/material-design.module';

@NgModule({
  declarations: [ChartComponent],
  imports: [CommonModule, ReactiveFormsModule, MaterialDesignModule],
  exports: [ChartComponent],
})
export class ChartModule {}
