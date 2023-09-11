import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ChartRequestResponse } from 'src/app/chart/model/chart-request-response';
import { ChartsService } from 'src/app/chart/services/charts.service';
import { ChartData } from 'src/app/model/chart-data';

@Component({
  selector: 'app-publication-details',
  templateUrl: './publication-details.component.html',
  styleUrls: ['./publication-details.component.css'],
})
export class PublicationDetailsComponent implements OnInit {
  chart!: ChartData;

  constructor(
    private actRoute: ActivatedRoute,
    private chartService: ChartsService
  ) {}

  ngOnInit(): void {
    this.actRoute.params.subscribe({
      next: (params: Params) => {
        this.requestChartData(params);
      },
      error: () => {},
      complete: () => {},
    });
  }

  requestChartData(params: Params) {
    this.chartService.getChart(params['id']).subscribe({
      next: (user: ChartRequestResponse) => {
        this.handleChartData(user);
      },
      error: () => {},
      complete: () => {},
    });
  }

  handleChartData(chart: ChartRequestResponse) {
    this.chart = chart.result;
  }
}
