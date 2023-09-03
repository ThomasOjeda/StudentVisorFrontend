import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PublishComponent } from './publish-component/publish.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialDesignModule } from '../material-design/material-design.module';
import { ChartModule } from '../chart/chart.module';
import { PublishRoutingModule } from './publish-routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [PublishComponent],
  imports: [
    CommonModule,
    PublishRoutingModule,
    ReactiveFormsModule,
    MaterialDesignModule,
    ChartModule,
    SharedModule,
  ],
})
export class PublishModule {}
