import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FileData } from 'src/app/model/file-data';
import { FileRequestResponse } from '../model/file-request-response';
import { FilesService } from '../services/files.service';
import { HttpErrorResponse } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationCardComponent } from 'src/app/shared/confirmation-card/confirmation-card.component';

@Component({
  selector: 'app-file-details',
  templateUrl: './file-details.component.html',
  styleUrls: ['./file-details.component.css'],
})
export class FileDetailsComponent implements OnInit {
  file!: FileData;
  editMode = false;
  selectedFile: Blob | null = null;

  constructor(
    private actRoute: ActivatedRoute,
    private filesServ: FilesService,
    private dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.actRoute.params.subscribe({
      next: (params: Params) => {
        this.requestFileData(params);
      },
      error: () => {},
      complete: () => {},
    });
  }

  requestFileData(params: Params) {
    this.filesServ.getFile(params['id']).subscribe({
      next: (file: FileRequestResponse) => {
        this.file = file.result;
      },
      error: () => {},
      complete: () => {},
    });
  }

  descriptionModified(newValue: string) {
    this.file.description = newValue;
    this.filesServ
      .patchFile(this.file._id, { description: newValue })
      .subscribe((res) => {
        this.file = res.result;
      });
  }

  nameModified(newValue: string) {
    this.file.name = newValue;
    this.filesServ
      .patchFile(this.file._id, { name: newValue })
      .subscribe((res) => {
        this.file = res.result;
      });
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0] ?? null;
  }

  updateFile() {
    if (this.selectedFile != null) {
      let form = new FormData();
      form.append('name', this.file.name); //Not actually used by the backend in this case but it is required.
      form.append('type', this.file.type);
      form.append('year', this.file.year as unknown as string);
      form.append('uploaded_file', this.selectedFile as Blob);
      this.filesServ.updateScholarshipsFile(form).subscribe({
        next: (res) => {
          this.file = res.result;
        },
        error: (err: HttpErrorResponse) => {
          window.alert('Hubo un error al actualizar el archivo');
        },
        complete: () => {
          window.alert('Archivo actualizado');
          this.selectedFile = null;
        },
      });
    }
  }

  openDeleteDialog() {
    let dialogRef = this.dialog.open(ConfirmationCardComponent);
    dialogRef.componentInstance.title = `¿Borrar el archivo ${this.file.name}?`;

    dialogRef.componentInstance.op1 = 'Borrar';
    dialogRef.componentInstance.op2 = 'Cancelar';
    dialogRef.componentInstance.result.subscribe((result) => {
      if (result == 'Borrar') {
        this.filesServ.deleteFile(this.file._id).subscribe({
          next: () => {},
          error: () => {},
          complete: () => {
            dialogRef.close();
            this.router.navigate(['home', 'files']);
          },
        });
      } else {
        dialogRef.close();
      }
    });
  }
}
