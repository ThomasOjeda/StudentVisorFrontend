import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { FilesRequestResponse } from '../files/model/files-request-response';
import { FileRequestResponse } from '../files/model/file-request-response';

@Injectable({
  providedIn: 'root',
})
export class FilesService {
  constructor(private http: HttpClient) {}

  getFiles() {
    return this.http.get<FilesRequestResponse>(
      `${environment.apiUrl}/api/v1/studentfiles`
    );
  }

  getFile(fileId: string) {
    return this.http.get<FileRequestResponse>(
      `${environment.apiUrl}/api/v1/studentfiles/${fileId}`
    );
  }

  uploadFile(form: FormData) {
    return this.http.post(`${environment.apiUrl}/api/v1/uploads`, form);
  }

  deleteFile(fileId: string) {
    return this.http.delete(`${environment.apiUrl}/api/v1/uploads/${fileId}`);
  }
}
