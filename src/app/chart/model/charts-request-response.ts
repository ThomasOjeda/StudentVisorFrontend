import { ChartData } from 'src/app/model/chart-data';

export interface ChartsRequestResponse {
  success: boolean;
  result: ChartData[];
  nHits: number;
}
