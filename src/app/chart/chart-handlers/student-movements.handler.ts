import { ElementRef, Renderer2 } from '@angular/core';
import { Chart, ChartItem } from 'chart.js/auto';
import { Result } from 'src/app/interfaces/charts-request-response';

export const studentMovementsHandler = (renderer: Renderer2, chartTemplate: ElementRef, chartStructure:Result)=> {

    const canvas = renderer.createElement('canvas');
    renderer.appendChild(chartTemplate.nativeElement.parentNode, canvas);
    renderer.removeChild(chartTemplate.nativeElement.parentNode, chartTemplate.nativeElement);

    new Chart(canvas as ChartItem, {
        type: 'pie',
        data: {
          labels: ['Reinscriptos', 'Movimientos', 'Sin Datos'],
          datasets: [
            {
              label: 'My First Dataset',
              data: [chartStructure.structure.Reenrolled, chartStructure.structure.Movements, chartStructure.structure.NoData],
              backgroundColor: [
                'rgb(255, 99, 132)',
                'rgb(54, 162, 235)',
                'rgb(255, 205, 86)',
              ],
              hoverOffset: 4,
            },
          ],
        },
        options: {
          onClick(event, elements, chart) {
            console.log(elements);
          },
        },
      });
}