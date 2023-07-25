import { ElementRef, Renderer2 } from '@angular/core';
import { ChartData } from 'src/app/model/charts-request-response';

export const studentInscriptionsHandler = (
  renderer: Renderer2,
  chartTemplate: ElementRef,
  chartStructure: ChartData
) => {
  const h1 = renderer.createElement('h1');
  const text = renderer.createText(
    `${JSON.stringify(chartStructure.structure)}`
  );
  renderer.appendChild(h1, text);
  renderer.appendChild(chartTemplate.nativeElement.parentNode, h1);
  renderer.removeChild(
    chartTemplate.nativeElement.parentNode,
    chartTemplate.nativeElement
  );
};
