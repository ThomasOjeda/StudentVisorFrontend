import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { TagsRequestResponse } from '../model/tags-request-response';

@Injectable({
  providedIn: 'root',
})
export class TagsService {
  constructor(private http: HttpClient) {}

  getTags() {
    return this.http.get<TagsRequestResponse>(
      `${environment.apiUrl}/api/v1/tags`
    );
  }
}
