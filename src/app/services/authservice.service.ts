import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { register } from 'src/app/data/register';
import { request } from 'src/app/data/request';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthserviceService {
  url=environment.URL;
  logoutflag:Subject<boolean>=new Subject();
  constructor(private http:HttpClient,private route:Router) { }
  public createrequest(request:request){
    return this.http.post(this.url+"Request/Create",request);
  }
  public login(user:any):Observable<register>{
    return this.http.post<register>(this.url+"Auth/login",user);
  }
  public setuser(user:register){
    localStorage.setItem('user',JSON.stringify(user.token));
    this.logoutflag.next(false);
    this.profile(user.roles[0].toLocaleLowerCase());
  }
  public userexist():boolean{
    let user=JSON.parse(localStorage.getItem('user')||'{}');
    if(user.roles?.length>0){
      return true;
    }
    return false;
  }
  public gotoprofile(){
    let user=JSON.parse(localStorage.getItem('user')||'{}');
    this.profile(user?.roles[0].toLocaleLowerCase());
  }
  private profile(role:string):void{
    switch(role.toLocaleLowerCase()){
      case 'admin':
        this.route.navigate(["admin"]);
        break;
      case "teacher":
        this.route.navigate(["teacher"]);
        break;
      case "student":
        this.route.navigate(["student"]);
        break;
      case "parent":
        this.route.navigate(["parent"]);
        break;
    }
  }
  logout(){
    localStorage.removeItem('user');
    localStorage.removeItem('remember');
    this.logoutflag.next(true);
    this.route.navigate(['home']);
  }
}
