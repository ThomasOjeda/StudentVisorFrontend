export interface UsersResquestResponse {
  success: boolean;
  result: User[];
  nHits: number;
}

export interface UserRequestResponse {
  success: boolean;
  result: User;
}

export interface User {
  _id?: string;
  password?:string;
  username: string;
  email: string;
  role: string;
  tags: string[];
  createdAt?: Date;
  updatedAt?: Date;
}
