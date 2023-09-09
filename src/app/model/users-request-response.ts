export interface UsersResquestResponse {
  success: boolean;
  result: UserData[];
  nHits: number;
}

export interface UserRequestResponse {
  success: boolean;
  result: UserData;
}

export interface UserData {
  _id: string;
  username: string;
  email: string;
  role: string;
  tags: string[];
  createdAt?: Date;
  updatedAt?: Date;
  __v?: number;
}
