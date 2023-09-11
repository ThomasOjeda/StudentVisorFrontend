import { TagData } from 'src/app/model/tag-data';

export interface TagRequestResponse {
  success: boolean;
  result: TagData;
  nHits: number;
}
