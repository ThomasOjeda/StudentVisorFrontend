import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PublicationsComponent } from './publications/publications.component';
import { PublicationDetailsComponent } from './publication-details/publication-details.component';

const routes: Routes = [
  { path: '', component: PublicationsComponent },
  { path: ':id', component: PublicationDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PublishRoutingModule {}
