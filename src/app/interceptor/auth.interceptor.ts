import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private route:Router) {}
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let token=localStorage.getItem('schooltoken');
    let clonerequest=request;
    if(!token||token!=''){
       clonerequest=request.clone({headers:request.headers.set('Authorization', 'Bearer ' + token)})
    }
    else{
      this.route.navigate(['auth'])
    }
    return next.handle(request);
  }
}
