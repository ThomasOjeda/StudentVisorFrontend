import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnInit,
  Renderer2,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { ChartData } from '../../model/chart-data';
import { studentMovementsHandler } from '../chart-handlers/student-movements.handler';
import { studentInscriptionsHandler } from '../chart-handlers/student-inscriptions.handler';
import { ChartType } from '../model/chart-type';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css'],
})
export class ChartComponent implements OnInit, AfterViewInit, OnChanges {
  @Input() chart!: ChartData;

  @ViewChild('chartContainer', { read: ElementRef })
  chartContainer!: ElementRef;

  tags!: string[];

  constructor(private renderer: Renderer2) {}
  ngAfterViewInit(): void {
    if (this.chart && this.chartContainer) this.refreshContent();
  }
  ngOnChanges(changes: SimpleChanges) {
    if (this.chart && this.chartContainer) this.refreshContent();
  }
  refreshContent() {
    const childElements = this.chartContainer.nativeElement.childNodes;
    for (let child of childElements) {
      this.renderer.removeChild(this.chartContainer.nativeElement, child);
    }
    if (this.chart.type == ChartType.STUDENT_INSCRIPTIONS)
      studentInscriptionsHandler(
        this.renderer,
        this.chartContainer,
        this.chart
      );
    if (this.chart.type == ChartType.STUDENT_MOVEMENTS)
      studentMovementsHandler(this.renderer, this.chartContainer, this.chart);

    this.tags = this.chart.tags;
  }

  ngOnInit(): void {}
}
