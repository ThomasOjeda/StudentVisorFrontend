import { Component, Input, OnInit } from '@angular/core';
import { ChartData } from 'src/app/model/chart-data';
import { CustomChart } from '../custom-chart';

@Component({
  selector: 'app-student-inscriptions-chart',
  templateUrl: './student-inscriptions-chart.component.html',
  styleUrls: ['./student-inscriptions-chart.component.css'],
})
export class StudentInscriptionsChartComponent implements CustomChart, OnInit {
  @Input() chart!: ChartData;

  constructor() {}

  ngOnInit(): void {}
}
