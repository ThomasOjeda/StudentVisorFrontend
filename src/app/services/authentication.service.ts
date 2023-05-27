import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginSuccessResponse } from '../interfaces/login-success-response';
import { environment } from 'src/environments/environment';
import { UserCredentials } from '../interfaces/user-credentials';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService{

  constructor(private http: HttpClient) {

  }

  login(userCredentials: UserCredentials) : Observable<LoginSuccessResponse> {
    return this.http.post<LoginSuccessResponse>(`${environment.apiUrl}/api/v1/auth/login`,userCredentials)
  }

  setToken(token:string) {
    localStorage.setItem('authToken',token)
  }

  getToken() {
    return localStorage.getItem('authToken')
  }

  isLoggendIn() {
    if (localStorage.getItem('authToken')) return true;
    return false;
  }
  
}
