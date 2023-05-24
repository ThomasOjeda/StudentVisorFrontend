import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService implements OnInit{

  constructor(private http: HttpClient) { 
    this.login().subscribe(value => console.log(value));


  }

  login() : Observable<any> {
    return this.http.post<any>('http://localhost:5000/api/v1/auth/login',{email:"admin",password:"admin"})
  }

  ngOnInit() {

  }
}
