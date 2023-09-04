import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FilesComponent } from './files-component/files.component';
import { FileDetailsComponent } from './file-details/file-details.component';

const routes: Routes = [
  { path: '', component: FilesComponent },
  { path: ':id', component: FileDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FilesRoutingModule {}
