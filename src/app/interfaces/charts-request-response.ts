export interface ChartsRequestResponse {
    success: boolean;
    result:  Result[];
    nHits:   number;
}

export interface Result {
    _id:       string;
    name:      string;
    tags:      string[];
    structure: any;
    createdAt: Date;
    updatedAt: Date;
    __v:       number;
}

