import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ChartRequestResponse } from 'src/app/chart/model/chart-request-response';
import { ChartsService } from 'src/app/chart/services/charts.service';
import { ChartData } from 'src/app/model/chart-data';
import { ConfirmationCardComponent } from 'src/app/shared/confirmation-card/confirmation-card.component';

@Component({
  selector: 'app-publication-details',
  templateUrl: './publication-details.component.html',
  styleUrls: ['./publication-details.component.css'],
})
export class PublicationDetailsComponent implements OnInit {
  chart!: ChartData;

  constructor(
    private actRoute: ActivatedRoute,
    private chartService: ChartsService,
    private dialog: MatDialog,
    private router: Router
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

  openDeleteDialog() {
    let dialogRef = this.dialog.open(ConfirmationCardComponent);
    dialogRef.componentInstance.title = `¿Borrar el grafico ${this.chart.name}?`;

    dialogRef.componentInstance.op1 = 'Borrar';
    dialogRef.componentInstance.op2 = 'Cancelar';
    dialogRef.componentInstance.result.subscribe((result) => {
      if (result == 'Borrar') {
        this.chartService.deleteChart(this.chart._id).subscribe({
          next: () => {},
          error: () => {
            window.alert('No se pudo eliminar el grafico');
            dialogRef.close();
          },
          complete: () => {
            dialogRef.close();
            this.router.navigate(['home', 'publish']);
          },
        });
      } else {
        dialogRef.close();
      }
    });
  }

  tagsModified(newValue: string[]) {
    this.chart.tags = newValue;
    this.chartService.updateChart(this.chart._id, this.chart).subscribe((res) => {
      this.chart = res.result
    })
  }

  updateChartName(newValue: string) {
    this.chart.name = newValue;
    this.chartService.updateChart(this.chart._id, this.chart).subscribe((res) => {
      this.chart = res.result
    })
  }
}
