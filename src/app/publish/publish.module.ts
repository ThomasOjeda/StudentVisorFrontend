import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PublishComponent } from './publish-component/publish.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialDesignModule } from '../material-design/material-design.module';
import { ChartModule } from '../chart/chart.module';
import { PublishRoutingModule } from './publish-routing.module';
import { SharedModule } from '../shared/shared.module';
import { PublicationsComponent } from './publications/publications.component';
import { PublicationListComponent } from './publication-list/publication-list.component';
import { PublicationDetailsComponent } from './publication-details/publication-details.component';
import { StudentMovementsComponent } from './forms/student-movements/student-movements.component';
import { StudentInscriptionsComponent } from './forms/student-inscriptions/student-inscriptions.component';

@NgModule({
  declarations: [PublishComponent, PublicationsComponent, PublicationListComponent, PublicationDetailsComponent, StudentMovementsComponent, StudentInscriptionsComponent],
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
