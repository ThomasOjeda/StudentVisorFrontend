import { TagData } from 'src/app/model/tag-data';

export interface TagsRequestResponse {
  success: boolean;
  result: TagData[];
  nHits: number;
}
