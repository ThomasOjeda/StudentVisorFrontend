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

  getOffers(year: number, unit: string) {
    return this.httpServ.post(
      `${environment.apiUrl}/api/v1/datacat/unitoffers`,
      {
        year: year,
        unit: unit,
      }
    );
  }

  getGenders() {
    return this.httpServ.get(`${environment.apiUrl}/api/v1/datacat/genders`);
  }

  getFileTypes(year: number) {
    return this.httpServ.post(
      `${environment.apiUrl}/api/v1/datacat/filetypes`,
      {
        year: year,
      }
    );
  }
}
