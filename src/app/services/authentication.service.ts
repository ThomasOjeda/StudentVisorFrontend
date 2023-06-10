import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginSuccessResponse } from '../interfaces/login-success-response';
import { environment } from 'src/environments/environment';
import { UserCredentials } from '../interfaces/user-credentials';
import { User } from '../interfaces/users-request-response';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {

  role:string = "none";

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
          this.role = loginResponse.role;
        },
        error: (error: HttpErrorResponse) => {
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

  registerUser(data: User) {
    return this.http.post(`${environment.apiUrl}/api/v1/auth/register`, data);
  }

  logout() {
    localStorage.removeItem('authToken');
    this.role = "none"
  }

  handleLoginCompletion() {
    this.router.navigate(['home']);
  }

  getRole() {
    return this.role
  }

  isAdmin() {
    return this.role == "admin"
  }
}
