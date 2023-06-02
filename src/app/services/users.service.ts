import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserRequestResponse, UsersResquestResponse } from '../interfaces/users-request-response';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }


  getUsers() {
    return this.http.get<UsersResquestResponse>(`${environment.apiUrl}/api/v1/users/other`)
  }

  getUser(userId:string) {
    return this.http.get<UserRequestResponse>(`${environment.apiUrl}/api/v1/users/${userId}`)

  }

}
