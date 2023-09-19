import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DataCategoriesService {
  constructor(private httpServ: HttpClient) {}

  getUnits() {
    return this.httpServ.get(`${environment.apiUrl}/api/v1/datacat/units`);
  }

  getGenders() {
    return this.httpServ.get(`${environment.apiUrl}/api/v1/datacat/genders`);
  }
}
