import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { FilesRequestResponse } from '../interfaces/file-data';

@Injectable({
  providedIn: 'root'
})
export class FilesService {

  constructor(private http: HttpClient) { }


  getFiles() {
    return this.http.get<FilesRequestResponse>(`${environment.apiUrl}/api/v1/studentfiles`)
  }

  uploadFile(form: FormData) {
    return this.http.post(`${environment.apiUrl}/api/v1/uploads`,form)
  }
}
