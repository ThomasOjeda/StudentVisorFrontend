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
import { StudentMovementsFormComponent } from './forms/student-movements-form/student-movements-form.component';
import { StudentInscriptionsFormComponent } from './forms/student-inscriptions-form/student-inscriptions-form.component';
import { StudentMigrationsFormComponent } from './forms/student-migrations-form/student-migrations-form.component';
import { UnitInscriptionsFormComponent } from './forms/unit-inscriptions-form/unit-inscriptions-form.component';

@NgModule({
  declarations: [
    PublishComponent,
    PublicationsComponent,
    PublicationListComponent,
    PublicationDetailsComponent,
    StudentMovementsFormComponent,
    StudentInscriptionsFormComponent,
    StudentMigrationsFormComponent,
    UnitInscriptionsFormComponent,
  ],
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
