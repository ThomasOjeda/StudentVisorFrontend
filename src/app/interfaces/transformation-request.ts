export interface TransformationRequest {
    transformationHeader: {
        name:string,
        type:string,
        tags:string[]
    }
    transformationBody: {
        [key: string]: any;
    }
}
