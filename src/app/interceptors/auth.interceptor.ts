import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private authServ: AuthenticationService,
    private router: Router
  ) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const newRequest = request.clone({
      setHeaders: { Authorization: `Bearer ${this.authServ.getToken()}` },
    });
    return next
      .handle(newRequest)
      .pipe(tap({
      error: (error:HttpErrorResponse) => { 
        if (error.status==401){
          console.log('Error unauthorized, redirecting to login and deleting the auth token')
          this.authServ.logout()
          this.router.navigate([''])
        }

      } }));
  }
}
