import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { UserRequestResponse } from '../model/user-request-response';
import { UsersResquestResponse } from '../model/users-request-response';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private http: HttpClient) {}

  getUsers() {
    return this.http.get<UsersResquestResponse>(
      `${environment.apiUrl}/api/v1/users/other`
    );
  }

  getUser(userId: string) {
    return this.http.get<UserRequestResponse>(
      `${environment.apiUrl}/api/v1/users/${userId}`
    );
  }

  deleteUser(userId: string) {
    return this.http.delete(`${environment.apiUrl}/api/v1/users/${userId}`);
  }

  getMyUser() {
    return this.http.get<UserRequestResponse>(
      `${environment.apiUrl}/api/v1/users/mine`
    );
  }

  updateUser(userId: string, newData: object) {
    return this.http.patch<UserRequestResponse>(
      `${environment.apiUrl}/api/v1/users/${userId}`,
      newData
    );
  }
}
