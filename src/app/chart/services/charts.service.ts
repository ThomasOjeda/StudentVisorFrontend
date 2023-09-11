import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthenticationService } from 'src/app/login/services/authentication.service';
import { TransformationRequest } from 'src/app/publish/model/transformation-request';
import { environment } from 'src/environments/environment';
import { ChartRequestResponse } from '../model/chart-request-response';
import { ChartsRequestResponse } from '../model/charts-request-response';
import { ChartData } from 'src/app/model/chart-data';

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

  getChart(chartId: string) {
    if (this.authServ.isAdmin())
      return this.http.get<ChartRequestResponse>(
        `${environment.apiUrl}/api/v1/charts/admin/${chartId}`
      );
    else
      return this.http.get<ChartRequestResponse>(
        `${environment.apiUrl}/api/v1/charts/reader/${chartId}`
      );
  }

  requestTransformation(transformation: TransformationRequest) {
    return this.http.post<ChartData>(
      `${environment.apiUrl}/api/v1/transformations`,
      transformation
    );
  }

  requestPrevisualization(transformation: TransformationRequest) {
    return this.http.post<ChartData>(
      `${environment.apiUrl}/api/v1/transformations/pre`,
      transformation
    );
  }
  deleteChart(chartId: string) {
    return this.http.delete(
      `${environment.apiUrl}/api/v1/charts/admin/${chartId}`
    );
  }
}
