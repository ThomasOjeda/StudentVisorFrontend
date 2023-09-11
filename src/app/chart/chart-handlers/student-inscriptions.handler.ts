import { ElementRef, Renderer2 } from '@angular/core';
import { ChartData } from 'src/app/model/chart-data';

export const studentInscriptionsHandler = (
  renderer: Renderer2,
  chartContainer: ElementRef,
  chartStructure: ChartData
) => {
  const p = renderer.createElement('p');
  const text = renderer.createText(
    `${JSON.stringify(chartStructure.structure)}`
  );
  renderer.appendChild(p, text);
  renderer.appendChild(chartContainer.nativeElement, p);
};
