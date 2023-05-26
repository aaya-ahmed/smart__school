import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpInterceptor
} from '@angular/common/http';
import { AuthserviceService } from '../services/authservice.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private auth:AuthserviceService) {
  }
  intercept(request: HttpRequest<any>, next: HttpHandler): any {
      let token=localStorage.getItem('schooltoken')||'';
      let clonerequest=request;
      clonerequest=request.clone({headers:request.headers.set('Authorization', `Bearer ${token}`)})
      return next.handle(clonerequest);

  }
 }
