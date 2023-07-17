import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ChartsRequestResponse } from '../interfaces/charts-request-response';
import { TransformationRequest } from '../interfaces/transformation-request';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root',
})
export class ChartsService {
  constructor(
    private http: HttpClient,
    private authServ: AuthenticationService
  ) {}

  getCharts() {
    if (this.authServ.isAdmin())
      return this.http.get<ChartsRequestResponse>(
        `${environment.apiUrl}/api/v1/charts/admin`
      );
    else
      return this.http.get<ChartsRequestResponse>(
        `${environment.apiUrl}/api/v1/charts/reader`
      );
  }

  requestTransformation(transformation: TransformationRequest) {
    return this.http.post(
      `${environment.apiUrl}/api/v1/transformations`,
      transformation
    );
  }

  requestPrevisualization(transformation: TransformationRequest) {
    return this.http.post(
      `${environment.apiUrl}/api/v1/transformations/pre`,
      transformation
    );
  }
}
