import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { request } from 'src/app/data/request';
import { AuthserviceService } from 'src/app/services/authservice.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css','../style.css']
})
export class RegisterComponent {
  submitted:boolean=false;
  loadflag:boolean=false;
  formresponce:boolean=false;
  message:string='';
  typemess:string='';
  stdimage:any="";
  patimage:any="";
  birthimage:any="";

  registerform:FormGroup=new FormGroup({
    studentFirstName: new FormControl('',[Validators.required,Validators.minLength(3),Validators.maxLength(10)]),
    studentEmail: new FormControl('',[Validators.required,Validators.email]),
    studentGender: new FormControl(0,[Validators.required]),
    studentPhone: new FormControl('',[Validators.required,Validators.pattern("^(010|011|012|015)[0-9]{8}$")]),
    studentBirthDate: new FormControl('',[Validators.required]),
    address: new FormControl('',[Validators.required,Validators.minLength(5),Validators.maxLength(25)]),
    parentFullName: new FormControl('',[Validators.required,Validators.minLength(3),Validators.maxLength(15)]),
    parentEmail: new FormControl('',[Validators.required,Validators.email]),
    parentPhone: new FormControl('',[Validators.required,Validators.pattern("^(010|011|012|015)[0-9]{8}$")]),
    StudentPhoto: new FormControl('',[Validators.required]),
    IdentityParentPhoto: new FormControl('',[Validators.required]),
    StudentBirthCertPhoto:new FormControl('',[Validators.required]),
    password: new FormControl('',[Validators.required,Validators.minLength(8),Validators.pattern("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$")])
  });
  constructor(private authservice:AuthserviceService){}
  get stdFnameControl(){
    return this.registerform.controls['studentFirstName']
  }
  get stdEmailControl(){
    return this.registerform.controls['studentEmail']
  }
  get stdGenderControl(){
    return this.registerform.controls['studentGender']
  }
  get stdPhoneControl(){
    return this.registerform.controls['studentPhone']
  }
  get stdBDControl(){
    return this.registerform.controls['studentBirthDate']
  }
  get addressControl(){
    return this.registerform.controls['address']
  }
  get patFNameControl(){
    return this.registerform.controls['parentFullName']
  }
  get patEmailControl(){
    return this.registerform.controls['parentEmail']
  }
  get patphoneControl(){
    return this.registerform.controls['parentPhone']
  }
  get stdPhotoControl(){
    return this.registerform.controls['StudentPhoto']
  }
  get patPhotoControl(){
    return this.registerform.controls['IdentityParentPhoto']
  }
  get stdtBirthPhotoControl(){
    return this.registerform.controls['StudentBirthCertPhoto']
  }
  get passwordControl(){
    return this.registerform.controls['password']
  }
  changephoto(image:any,person:number){
    var reader = new FileReader();
		reader.readAsDataURL(image.target.files[0]);
		reader.onload = (_event) => {
      if(person==0){
        this.getBase64(image.target.files[0]).then(
          data => {
            this.stdimage=data;
            this.stdimage=this.stdimage.split(",").pop();
          });
      }
      else if(person==1){
        this.getBase64(image.target.files[0]).then(
          data => {
            this.patimage=data;
            this.patimage=this.patimage.split(",").pop();
             });
      }
      else{
        this.getBase64(image.target.files[0]).then(
          data => {
            this.birthimage=data;
            this.birthimage=this.birthimage.split(",").pop();
             });
      }

		}
  }
  getBase64(file:any) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () =>{ resolve(reader.result)};
      reader.onerror = error => reject(error);
    });
  }
  validateDOB(dob:any){
    let today=new Date();
    let birth=new Date(dob.target.value)
    if(birth.getFullYear()>1999&&today.getFullYear()-birth.getFullYear()>=6){
      this.stdBDControl.setErrors(null);
    }
    else{
      this.stdBDControl.setErrors({'notvalid':true})
    }
  }
  register(){
    this.submitted=true;
    if(this.registerform.valid){
        this.loadflag=true;
        let user:request={
          ...this.registerform.value
        }
        user.id=0;
        user.StudentPhoto=this.stdimage;
        user.IdentityParentPhoto=this.patimage;
        user.StudentBirthCertPhoto=this.birthimage;
        user.studentGender=+user.studentGender;
        console.log(user);
        this.authservice.createrequest(user).subscribe(
          {
            next:val=>{
              console.log(val);
              this.formresponce=true;
              this.typemess='success';
              this.message='Registration was successful. We will contact with you in 24 hour';
            },
            error:err=>{
              console.log(err)
              this.formresponce=true;
              this.typemess='failed';
              this.message='Registration was faild!';
            }
          });
    }
  }
}
