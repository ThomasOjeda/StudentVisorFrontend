import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileListComponent } from './file-list/file-list.component';
import { FilesComponent } from './files-component/files.component';
import { NewFileComponent } from './new-file/new-file.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialDesignModule } from '../material-design/material-design.module';
import { FilesRoutingModule } from './files-routing.module';

@NgModule({
  declarations: [FileListComponent, FilesComponent, NewFileComponent],
  imports: [
    CommonModule,
    FilesRoutingModule,
    ReactiveFormsModule,
    MaterialDesignModule,
  ],
})
export class FilesModule {}
