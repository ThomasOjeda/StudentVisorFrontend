import { ChartData } from 'src/app/model/chart-data';

export interface ChartRequestResponse {
  success: boolean;
  result: ChartData;
  nHits: number;
}
