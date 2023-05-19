import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthserviceService } from '../../../../services/authservice.service';
import { register } from 'src/app/data/register';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css','../style.css']
})
export class LoginComponent implements OnInit {
  typepassword:string="password";
  loadflag:boolean=false;
  errflag:boolean=false;
  remember:boolean=false;
  loginform:FormGroup=new FormGroup({
    email:new FormControl('',[Validators.email,Validators.required]),
    password:new FormControl('',[Validators.required]),
    remember:new FormControl(false),
  });
  constructor(private authservice:AuthserviceService,private route:Router){}
  ngOnInit(): void {
    if(this.authservice.userexist()){
      this.authservice.gotoprofile();
    }
  }
  get emailcontrol(){
    return this.loginform.controls['email']
  }
  get passwordcontrol(){
    return this.loginform.controls['password']
  }
  changetypepassword(){
    if(this.typepassword==="password"){
        this.typepassword="text";
    }
    else{
      this.typepassword="password";
    }
  }
  login(){
    if(this.loginform.valid){
      this.loadflag=true;
      let user={email:this.loginform.value.email,password:this.loginform.value.password}
      this.authservice.login(user).subscribe({
        next:(res)=>{
          console.log(res)
          this.loadflag=false;
          this.authservice.setuser(res);
          if(this.loginform.value.remember==true){
            localStorage.setItem('remember','true');
          }
        },
        error:(err)=>{
          console.log(err)
          this.errflag=true;
          this.loadflag=false;
        }
      });
      
    }
  }
  gotoforgetpassword(){
    this.route.navigate(['forgetpassword'])
  }
}
