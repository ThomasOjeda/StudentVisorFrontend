import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FileData } from 'src/app/model/file-data';
import { FileRequestResponse } from '../model/file-request-response';
import { FilesService } from '../services/files.service';
import { HttpErrorResponse } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationCardComponent } from 'src/app/shared/confirmation-card/confirmation-card.component';
import { MAX_FILE_SIZE } from '../model/file-type';

@Component({
  selector: 'app-file-details',
  templateUrl: './file-details.component.html',
  styleUrls: ['./file-details.component.css'],
})
export class FileDetailsComponent implements OnInit {
  file!: FileData;
  editMode = false;
  selectedFile: any = null;

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
    if (event.target.files[0].size > MAX_FILE_SIZE) {
      //25 Mebibytes is the limit (currently managed files are usually not bigger than 3MB)
      this.selectedFile = null;
      alert('El archivo seleccionado supera los 25 MiB');
    } else {
      this.selectedFile = event.target.files[0] ?? null;
    }
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
          error: () => {
            window.alert('No se pudo eliminar el archivo');
            dialogRef.close();
          },
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

  downloadFile() {
    this.filesServ.downloadFile(this.file._id).subscribe({
      next: (fileData: any) => {
        const newBlob = new Blob([fileData], {
          type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        });
        const data = window.URL.createObjectURL(newBlob);
        const link = document.createElement('a');
        link.href = data;
        link.download = this.file.name + '.xlsx'; // Set a name for the file
        link.click();
        window.alert('Se descargo el archivo "' + this.file.name + '.xlsx"');
      },
      error: () => {
        window.alert(
          'Hubo un error al descargar "' + this.file.name + '.xlsx"'
        );
      },
      complete: () => {},
    });
  }
}
