import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpInterceptor
} from '@angular/common/http';
import { AuthserviceService } from '../services/authservice.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  notusedurl:string[]=["/api/Request/Create","/api/Auth/login"];
  constructor(private auth:AuthserviceService) {
  }
  intercept(request: HttpRequest<any>, next: HttpHandler): any {
    console.log(Math.floor(Date.now() / 1000))
    if(this.isvalidforinterceptor(request.url)){
      let token=localStorage.getItem('schooltoken');
      token=token?.substring(1,token.length-1)||''
      let exp=localStorage.getItem('schoolexp');  
      console.log(token)
      console.log("1 -  "+exp)

      if(exp&&(!token||token!='')){
        const now = Math.floor(Date.now() / 1000)
        console.log(+exp)
        if(now<+exp){
          let clonerequest=request;
          clonerequest=request.clone({headers:request.headers.set('Authorization', `Bearer ${token}`)})
          console.log(clonerequest)
          return next.handle(clonerequest);
        }
        else{
          this.auth.logout('auth');
          return null;
        }
      }
      else{
        this.auth.logout('auth');
        return null;
      }
    }else{
      return next.handle(request);
    }
  }
  private isvalidforinterceptor(url:string):boolean{
    let indexdestination=url.indexOf('/api');
    let destination=url.substring(indexdestination)
    for(let ele of this.notusedurl){
      if(ele===destination){
        return false;
      }
    };
    return true;
  }
}
