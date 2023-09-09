import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileListComponent } from './file-list/file-list.component';
import { FilesComponent } from './files-component/files.component';
import { NewFileComponent } from './new-file/new-file.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialDesignModule } from '../material-design/material-design.module';
import { FilesRoutingModule } from './files-routing.module';
import { SharedModule } from '../shared/shared.module';
import { FileDetailsComponent } from './file-details/file-details.component';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [
    FileListComponent,
    FilesComponent,
    NewFileComponent,
    FileDetailsComponent,
  ],
  imports: [
    CommonModule,
    FilesRoutingModule,
    ReactiveFormsModule,
    MaterialDesignModule,
    SharedModule,
    MatDialogModule,
  ],
})
export class FilesModule {}
