export interface TagsRequestResponse {
    success:boolean,
    result:Tag[],
    nHits:number
}

export interface Tag{
    _id:string,
    description:string,
    createdAt:Date,
    updatedAt:Date,
    __v:number
}