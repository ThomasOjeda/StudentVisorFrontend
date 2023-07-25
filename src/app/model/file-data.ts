export interface FilesRequestResponse {
  success: boolean;
  result: FileData[];
  nHits: number;
}

export interface FileData {
  _id: string;
  year: number;
  filename: string;
  createdAt?: Date;
  updatedAt?: Date;
  __v?: number;
}
