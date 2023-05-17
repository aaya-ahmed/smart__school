import { Component } from '@angular/core';

@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.css']
})
export class ChangepasswordComponent {
  loadflag:boolean=false;
  formresponce:boolean=false;
  message:string='';
  typemess:string='';
  typepassword:string="password";  
  changetypepassword(){
    if(this.typepassword==="password"){
        this.typepassword="text";
    }
    else{
      this.typepassword="password";
    }
  }
  changepassword(passwordform:any){
    if(passwordform.valid){
      this.loadflag=true;
        setTimeout(()=>{
        this.formresponce=true
        this.typemess='success';
        this.message='password is changed'
      },1000);
    }
  }
}
