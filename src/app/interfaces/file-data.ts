export interface FileData {
    _id: string,
    year: number,
    filename: string,
    createdAt: Date,
    updatedAt: Date
}

export interface FilesRequestResponse {
    success: boolean,
    result :FileData[],
    nHits:number
}
