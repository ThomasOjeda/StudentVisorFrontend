import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TagsComponent } from './tags-component/tags.component';
import { SharedModule } from '../shared/shared.module';
import { MaterialDesignModule } from '../material-design/material-design.module';
import { TagListComponent } from './tag-list/tag-list.component';
import { TagDetailsComponent } from './tag-details/tag-details.component';
import { NewTagComponent } from './new-tag/new-tag.component';
import { TagsRoutingModule } from './tags-routing.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    TagsComponent,
    TagListComponent,
    TagDetailsComponent,
    NewTagComponent,
  ],
  imports: [
    CommonModule,
    TagsRoutingModule,
    SharedModule,
    MaterialDesignModule,
    ReactiveFormsModule,
  ],
})
export class TagsModule {}
