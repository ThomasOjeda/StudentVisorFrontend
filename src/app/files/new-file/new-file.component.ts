import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FilesService } from 'src/app/services/files.service';

@Component({
  selector: 'app-new-file',
  templateUrl: './new-file.component.html',
  styleUrls: ['./new-file.component.css'],
})
export class NewFileComponent implements OnInit {
  newFileForm = new FormGroup({
    year: new FormControl<string | null>('', [Validators.required]),
    fileType: new FormControl<string | null>('', [Validators.required]),
  });

  selectedFile: Blob | null = null;
  fileTouched: boolean = false;

  types = [
    { label: 'Inscripciones de alumnos', value: 'student-inscriptions' },
  ];

  constructor(private filesServ: FilesService) {}

  ngOnInit(): void {}

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0] ?? null;
    this.fileTouched = true;
  }

  onSubmit() {
    let form = new FormData();
    form.append('type', this.newFileForm.value.fileType ?? '');
    form.append('year', this.newFileForm.value.year ?? '');
    form.append('uploaded_file', this.selectedFile as Blob);
    this.filesServ.uploadFile(form).subscribe({
      next: () => {},
      error: (err: HttpErrorResponse) => {
        console.log(err);
      },
      complete: () => {
        console.log('uploaded');
      },
    });
  }

  aFileWasSelected() {
    return this.selectedFile != null;
  }
}
