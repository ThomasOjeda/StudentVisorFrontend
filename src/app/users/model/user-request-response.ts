import { UserData } from 'src/app/model/user-data';

export interface UserRequestResponse {
  success: boolean;
  result: UserData;
}
