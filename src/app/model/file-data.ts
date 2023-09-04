export interface FilesRequestResponse {
  success: boolean;
  result: FileData[];
  nHits: number;
}

export interface FileRequestResponse {
  success: boolean;
  result: FileData;
}

export interface FileData {
  _id: string;
  name: string;
  description?: string;
  type: string;
  year: number;
  filename: string;
  createdAt?: Date;
  updatedAt?: Date;
  __v?: number;
}
