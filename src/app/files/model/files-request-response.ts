import { FileData } from 'src/app/model/file-data';

export interface FilesRequestResponse {
  success: boolean;
  result: FileData[];
  nHits: number;
}
