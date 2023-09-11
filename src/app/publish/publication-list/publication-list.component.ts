import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ChartsRequestResponse } from 'src/app/chart/model/charts-request-response';
import { ChartsService } from 'src/app/chart/services/charts.service';
import { ChartData } from 'src/app/model/chart-data';
import { ConfirmationCardComponent } from 'src/app/shared/confirmation-card/confirmation-card.component';

@Component({
  selector: 'app-publication-list',
  templateUrl: './publication-list.component.html',
  styleUrls: ['./publication-list.component.css'],
})
export class PublicationListComponent implements OnInit {
  dataSource!: MatTableDataSource<ChartData>;

  columnsToDisplay = ['name', 'type', 'actions'];

  isLoadingResults = true;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private router: Router,
    private chartsServ: ChartsService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.dataSource = new MatTableDataSource();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    this.refresh();
  }

  refresh() {
    this.isLoadingResults = true;
    this.chartsServ.getCharts().subscribe({
      next: (response: ChartsRequestResponse) => {
        this.dataSource.data = response.result;
      },
      error: () => {},
      complete: () => {
        this.isLoadingResults = false;
      },
    });
  }

  applyFilter(event: KeyboardEvent) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openDetails(chart: ChartData) {
    this.router.navigate(['home', 'publish', chart._id]);
  }

  openDeleteDialog(chart: ChartData) {
    let dialogRef = this.dialog.open(ConfirmationCardComponent);
    dialogRef.componentInstance.title = `¿Borrar el grafico ${chart.name}?`;

    dialogRef.componentInstance.op1 = 'Borrar';
    dialogRef.componentInstance.op2 = 'Cancelar';
    dialogRef.componentInstance.result.subscribe((result) => {
      if (result == 'Borrar') {
        this.chartsServ.deleteChart(chart._id).subscribe({
          next: () => {},
          error: () => {},
          complete: () => {
            dialogRef.close();
            this.refresh();
          },
        });
      } else {
        dialogRef.close();
      }
    });
  }
}
