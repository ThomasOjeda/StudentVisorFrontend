export interface UsersResquestResponse {
    success: boolean;
    result:  Result[];
    nHits:   number;
}

export interface Result {
    _id:       string;
    username:  string;
    email:     string;
    role:      string;
    tags:      string[];
    createdAt: Date;
    updatedAt: Date;
}
