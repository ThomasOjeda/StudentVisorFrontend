import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TagsComponent } from './tags-component/tags.component';
import { TagDetailsComponent } from './tag-details/tag-details.component';

const routes: Routes = [
  { path: '', component: TagsComponent },
  { path: ':id', component: TagDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TagsRoutingModule {}
