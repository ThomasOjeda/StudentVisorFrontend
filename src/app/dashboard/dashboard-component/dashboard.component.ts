import { Component, OnInit } from '@angular/core';
import { ChartsRequestResponse } from 'src/app/chart/model/charts-request-response';
import { ChartsService } from 'src/app/chart/services/charts.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  charts!: ChartsRequestResponse;

  constructor(private chartsServ: ChartsService) {}

  ngOnInit(): void {
    this.chartsServ.getCharts().subscribe({
      next: (response: ChartsRequestResponse) => {
        this.charts = response;
      },
      error: () => {},
      complete: () => {},
    });
  }
}
