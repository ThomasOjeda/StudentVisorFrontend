import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

import jwt_decode from 'jwt-decode';
import { UserCredentials } from '../model/user-credentials';
import { LoginSuccessResponse } from '../model/login-success-response';
import { UserData } from 'src/app/model/user-data';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(
    private http: HttpClient,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  login(userCredentials: UserCredentials) {
    this.http
      .post<LoginSuccessResponse>(
        `${environment.apiUrl}/api/v1/auth/login`,
        userCredentials
      )
      .subscribe({
        next: (loginResponse: LoginSuccessResponse) => {
          this.setToken(loginResponse.token);
        },
        error: (error: HttpErrorResponse) => {
          console.log(error);

          this.snackBar.open('Email o contraseña invalidos', 'cerrar', {
            duration: 3000,
          });
        },
        complete: () => {
          this.handleLoginCompletion();
        },
      });
  }

  setToken(token: string) {
    localStorage.setItem('authToken', token);
  }

  getToken() {
    return localStorage.getItem('authToken');
  }

  isLoggendIn() {
    if (localStorage.getItem('authToken')) return true;
    return false;
  }

  registerUser(data: UserData) {
    return this.http.post(`${environment.apiUrl}/api/v1/auth/register`, data);
  }

  logout() {
    localStorage.removeItem('authToken');
  }

  handleLoginCompletion() {
    this.router.navigate(['home']);
  }

  getRole() {
    if (this.getToken()) {
      let decoded = jwt_decode(this.getToken() as string) as any;
      return decoded.role as string;
    }
    return 'none';
  }

  isAdmin() {
    return this.getRole() === 'admin';
  }
}
