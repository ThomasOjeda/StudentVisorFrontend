import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { FormGroup, FormControl, Validators, Form } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { LoginSuccessResponse } from '../interfaces/login-success-response';
import { UserCredentials } from '../interfaces/user-credentials';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  loginForm = new FormGroup({
    email: new FormControl<string|null>('',[Validators.required, Validators.email]),
    password: new FormControl<string|null>('',[Validators.required])
  });

  constructor(private authServ: AuthenticationService,private router: Router, private snackBar: MatSnackBar) {

   }

  ngOnInit(): void {
    if (this.authServ.isLoggendIn())
      this.handleLoginCompletion();
  }

  onSubmit() {
    this.authServ.login(this.loginForm.value as UserCredentials).subscribe({
      next:(loginResponse:LoginSuccessResponse) => {
        this.handleReceivedDataFromLogin(loginResponse);
      },
      error:(error:HttpErrorResponse) => {
        this.handleLoginError(error);
      },
      complete: () => {
        this.handleLoginCompletion();
      }
    });
  }

  handleReceivedDataFromLogin(loginResponse:LoginSuccessResponse) : void {
    this.authServ.setToken(loginResponse.token)
  }

  handleLoginError (error:HttpErrorResponse) {
    this.snackBar.open('Email o contraseña invalidos','cerrar',{duration: 3000})
  }

  handleLoginCompletion () {
    this.router.navigate(['home'])
  }
  

}
