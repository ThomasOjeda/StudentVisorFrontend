import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FilesService } from '../services/files.service';

@Component({
  selector: 'app-new-file',
  templateUrl: './new-file.component.html',
  styleUrls: ['./new-file.component.css'],
})
export class NewFileComponent implements OnInit {
  newFileForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.maxLength(256)]),
    description: new FormControl('', [Validators.maxLength(512)]),
    year: new FormControl('', [Validators.required]),
    fileType: new FormControl('', [Validators.required]),
  });

  selectedFile: Blob | null = null;
  fileTouched: boolean = false;

  types = [
    { label: 'Inscripciones de alumnos', value: 'student-inscriptions' },
  ];

  uploading = false;

  constructor(private filesServ: FilesService) {}

  ngOnInit(): void {}

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0] ?? null;
    this.fileTouched = true;
  }

  onSubmit() {
    this.uploading = true;
    let form = new FormData();
    form.append('name', this.newFileForm.value.name ?? '');
    if (this.newFileForm.value.description)
      form.append('description', this.newFileForm.value.description);
    form.append('type', this.newFileForm.value.fileType ?? '');
    form.append('year', this.newFileForm.value.year ?? '');
    form.append('uploaded_file', this.selectedFile as Blob);
    this.filesServ.uploadFile(form).subscribe({
      next: () => {},
      error: (err: HttpErrorResponse) => {
        this.uploading = false;

        if (err.status == 409)
          window.alert(
            'Existe un conflicto con un archivo ya presente (¿ya esta registrado el año?)'
          );
        else {
          window.alert('Hubo un error al subir el archivo');
        }
      },
      complete: () => {
        this.uploading = false;
      },
    });
  }

  aFileWasSelected() {
    return this.selectedFile != null;
  }
}
