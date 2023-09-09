import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import {
  TagData,
  TagRequestResponse,
  TagsRequestResponse,
} from '../model/tags-request-response';

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

  getTag(tagId: string) {
    return this.http.get<TagRequestResponse>(
      `${environment.apiUrl}/api/v1/tags/${tagId}`
    );
  }

  addTag(tag: TagData) {
    return this.http.post(`${environment.apiUrl}/api/v1/tags`, tag);
  }

  deleteTag(tag: TagData) {
    return this.http.delete(`${environment.apiUrl}/api/v1/tags/${tag._id}`);
  }
}
