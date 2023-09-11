export interface TransformationRequest {
  transformationHeader: {
    name: string;
    description?: string;
    type: string;
    tags: string[];
  };
  transformationBody: {
    [key: string]: any;
  };
}
