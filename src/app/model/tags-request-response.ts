export interface TagsRequestResponse {
  success: boolean;
  result: TagData[];
  nHits: number;
}

export interface TagRequestResponse {
  success: boolean;
  result: TagData;
  nHits: number;
}

export interface TagData {
  _id: string;
  description: string;
  createdAt?: Date;
  updatedAt?: Date;
  __v?: number;
}
