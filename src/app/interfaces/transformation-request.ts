export interface TransformationRequest {
    transformationHeader: {
        name:string,
        type:string
    }
    transformationBody: {
        [key: string]: any;
    }
}
