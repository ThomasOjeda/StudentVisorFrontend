import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, Form } from '@angular/forms';
import { UserCredentials } from '../model/user-credentials';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  constructor(private authServ: AuthenticationService) {}

  ngOnInit(): void {
    if (this.authServ.isLoggendIn()) this.authServ.handleLoginCompletion();
  }
  onSubmit() {
    this.authServ.login(this.loginForm.value as UserCredentials);
  }
}
