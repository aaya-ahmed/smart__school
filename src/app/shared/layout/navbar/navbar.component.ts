import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthserviceService } from 'src/app/services/authservice.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  logoutflag:boolean=true;
  constructor(private Route:Router,private auth:AuthserviceService){}
  ngOnInit(): void {
    this.auth.logoutflag.subscribe(res=>{this.logoutflag=res;});
    if(this.auth.userexist()){
      this.logoutflag=false;
    }
  }
  public openlogin(){
    this.Route.navigate(['auth/login'])
  }
  public openregister(){
    this.Route.navigate(['auth/register'])
  }
  public logout(){
    this.auth.logout();
  }
}
