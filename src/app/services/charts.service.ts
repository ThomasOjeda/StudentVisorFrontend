import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ChartsRequestResponse } from '../interfaces/charts-request-response';
import { TransformationRequest } from '../interfaces/transformation-request';

@Injectable({
  providedIn: 'root'
})
export class ChartsService {

  constructor(private http: HttpClient) { }

  getCharts() {
    return this.http.get<ChartsRequestResponse>(`${environment.apiUrl}/api/v1/charts/admin`)
  }

  requestTransformation(transformation:TransformationRequest){
    return this.http.post(`${environment.apiUrl}/api/v1/transformations`,transformation)
  }

}
