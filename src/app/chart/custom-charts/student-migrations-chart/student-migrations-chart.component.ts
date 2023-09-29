import { Component, Input, OnInit } from '@angular/core';
import { CustomChart } from '../custom-chart';
import { ChartData } from 'src/app/model/chart-data';

@Component({
  selector: 'app-student-migrations-chart',
  templateUrl: './student-migrations-chart.component.html',
  styleUrls: ['./student-migrations-chart.component.css'],
})
export class StudentMigrationsChartComponent implements OnInit, CustomChart {
  @Input() chart!: ChartData;

  constructor() {}

  ngOnInit(): void {}
}
