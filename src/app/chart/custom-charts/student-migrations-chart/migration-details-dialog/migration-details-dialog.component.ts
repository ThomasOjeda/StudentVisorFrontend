import { Component, ElementRef, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-migration-details-dialog',
  templateUrl: './migration-details-dialog.component.html',
  styleUrls: ['./migration-details-dialog.component.css'],
})
export class MigrationDetailsDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<MigrationDetailsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public inputData: any
  ) {}

  @ViewChild('canvas') canvas!: ElementRef;

  chartVisualization!: any;

  type = '';

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.chartTypeChanged('pie');
  }

  private parseLabels(structure: any) {
    return Object.keys(structure);
  }

  private parseValues(structure: any) {
    return Object.values(structure);
  }

  chartTypeChanged(type: string) {
    if (this.type == type) return;
    this.type = type;
    if (this.chartVisualization) this.chartVisualization.destroy();
    if (type == 'pie') {
      this.chartVisualization = new Chart(this.canvas.nativeElement, {
        type: 'pie',
        data: {
          labels: this.parseLabels(this.inputData.values),
          datasets: [
            {
              data: this.parseValues(this.inputData.values),
              hoverOffset: 4,
            },
          ],
        },
        options: {
          maintainAspectRatio: false,
        },
      });
    }
    if (type == 'doughnut') {
      this.chartVisualization = new Chart(this.canvas.nativeElement, {
        type: 'doughnut',
        data: {
          labels: this.parseLabels(this.inputData.values),
          datasets: [
            {
              data: this.parseValues(this.inputData.values),
              hoverOffset: 4,
            },
          ],
        },
        options: {
          maintainAspectRatio: false,
        },
      });
    }
  }

  onCloseClick(): void {
    this.dialogRef.close();
  }
}
