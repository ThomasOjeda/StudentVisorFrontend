import { UserData } from 'src/app/model/user-data';

export interface UsersResquestResponse {
  success: boolean;
  result: UserData[];
  nHits: number;
}
