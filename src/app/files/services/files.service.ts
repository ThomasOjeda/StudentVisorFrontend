import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { FileRequestResponse } from '../model/file-request-response';
import { FilesRequestResponse } from '../model/files-request-response';

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

  filesQuery(year?: number, type?: string) {
    let queryParams = new HttpParams(); //--> Immutable object

    if (year !== undefined) queryParams = queryParams.append('year', year);
    if (type !== undefined) queryParams = queryParams.append('type', type);

    return this.http.get<FilesRequestResponse>(
      `${environment.apiUrl}/api/v1/studentfiles`,
      { params: queryParams }
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

  patchFile(fileId: string, newData: object) {
    return this.http.patch<FileRequestResponse>(
      `${environment.apiUrl}/api/v1/studentfiles/${fileId}`,
      newData
    );
  }
}
