import { Component, OnInit } from '@angular/core';
import { ChartsRequestResponse } from 'src/app/chart/model/charts-request-response';
import { ChartsService } from 'src/app/chart/services/charts.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {

  defaultResponse: ChartsRequestResponse = {
    success: false,
    result: [],
    nHits: 0,
  };
  charts: ChartsRequestResponse = this.defaultResponse;
  loading: boolean = true;
  error: boolean = false;
  errorMsg: string = 'Error cargando los gráficos';
  constructor(private chartsServ: ChartsService) {}

  ngOnInit(): void {
    this.chartsServ.getCharts().subscribe({
      next: (response: ChartsRequestResponse) => {
        this.charts = response;
        this.loading = false;
        this.error = false;
      },
      error: (err) => {
        this.charts = this.defaultResponse;
        this.loading = false;
        this.error = true;
        console.log(err);
      },
      complete: () => {},
    });
  }

  refresh() {
    //TODO: implement refresh
  }
}
