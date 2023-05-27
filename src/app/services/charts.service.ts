import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ChartsRequestResponse } from '../interfaces/charts-request-response';

@Injectable({
  providedIn: 'root'
})
export class ChartsService {

  constructor(private http: HttpClient) { }

  getCharts() {
    console.log('loop')
    return this.http.get<ChartsRequestResponse>(`${environment.apiUrl}/api/v1/charts/admin`)
    
  }
}
