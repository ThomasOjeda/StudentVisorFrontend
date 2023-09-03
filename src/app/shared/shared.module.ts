import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShadeLoadingSpinnerComponent } from './shade-loading-spinner/shade-loading-spinner.component';
import { MaterialDesignModule } from '../material-design/material-design.module';

@NgModule({
  declarations: [ShadeLoadingSpinnerComponent],
  imports: [CommonModule, MaterialDesignModule],
  exports: [ShadeLoadingSpinnerComponent],
})
export class SharedModule {}
