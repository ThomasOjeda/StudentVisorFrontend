export interface ChartData {
  _id: string;
  name: string;
  description?: string;
  tags: string[];
  structure: any;
  type: string;
  createdAt?: Date;
  updatedAt?: Date;
  __v?: number;
}
