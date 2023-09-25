import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DataCategoriesService {
  constructor(private httpServ: HttpClient) {}

  getUnits(year: number) {
    return this.httpServ.post(`${environment.apiUrl}/api/v1/datacat/units`, {
      year: year,
    });
  }

  getGenders() {
    return this.httpServ.get(`${environment.apiUrl}/api/v1/datacat/genders`);
  }
}
