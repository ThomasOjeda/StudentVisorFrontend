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
