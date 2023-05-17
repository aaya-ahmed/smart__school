import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { subject } from 'src/app/data/subject';
import { teacher } from 'src/app/data/teacher';
import { HostmanagerService } from 'src/app/services/hostmanager.service';
import { SubjectService } from 'src/app/services/subject.service';
import { TeacherService } from 'src/app/services/teacher.service';

@Component({
  selector: 'app-teacherform',
  templateUrl: './teacherform.component.html',
  styleUrls: ['./teacherform.component.css']
})
export class TeacherformComponent {
  id:number=-1;
  subjects:subject[]=[];
  teacher:FormGroup=new FormGroup({
    fullName: new FormControl('',[Validators.required,Validators.minLength(3),Validators.maxLength(15)]),
    email: new FormControl('',[Validators.required,Validators.email]),
    password: new FormControl('',[Validators.required,Validators.pattern("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$")]),
    gender: new FormControl('',[Validators.required]),
    salary: new FormControl('',[Validators.required,Validators.pattern("^[0-9]{2,}$")]),
    phone: new FormControl('',[Validators.required,Validators.pattern("^(010|011|012|015)[0-9]{8}$")]),
    address: new FormControl('',[Validators.required,Validators.minLength(5),Validators.maxLength(15)]),
    photo: new FormControl('',[Validators.required]),
    hireDate: new FormControl('',[Validators.required]),
    subjectId: new FormControl('',[Validators.required]),
  });
  teacherimage:any='';
  errormess:string=''
  constructor(private subjectservice:SubjectService,private teacherservice:TeacherService,private hostman:HostmanagerService){}
  ngOnInit(): void {
    let subscriber1=this.subjectservice.getall().subscribe({
      next:res=>{
        this.subjects=res;
        subscriber1.unsubscribe()
      }
    })
    let subscriber2=this.hostman.data.subscribe({
      next:res=>{
        if(res.data.id){
          this.id=res.data.id;
          this.namecontrol.setValue(res.data.name);
          subscriber2.unsubscribe()

        }
      }
    })
  }
  get namecontrol(){
    return this.teacher.controls['fullName']
  }
  get emailcontrol(){
    return this.teacher.controls['email']
  }
  get passwordcontrol(){
    return this.teacher.controls['password']
  }
  get gendercontrol(){
    return this.teacher.controls['gender']
  }
  get salarycontrol(){
    return this.teacher.controls['salary']
  }
  get photocontrol(){
    return this.teacher.controls['photo']
  }
  get phonecontrol(){
    return this.teacher.controls['phone']
  }
  get addresscontrol(){
    return this.teacher.controls['address']
  }
  get hireDatecontrol(){
    return this.teacher.controls['hireDate']
  }
  get subjectIdcontrol(){
    return this.teacher.controls['subjectId']
  }
  changephoto(image:any){
    var reader = new FileReader();
		reader.readAsDataURL(image.target.files[0]);
		reader.onload = (_event) => {
        this.getBase64(image.target.files[0]).then(
          data => {
            this.teacherimage=data;
            this.teacherimage=this.teacherimage.split(",").pop();
          });
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
  validatehiredate(dob:any){
    let today=new Date();
    let hiredate=new Date(dob.target.value)
    if(hiredate<=today){
      this.hireDatecontrol.setErrors(null);
    }
    else{
      this.hireDatecontrol.setErrors({'notvalid':true})
    }
  }
  addteacher(){
    if(this.teacher.valid){
      if(this.id!=-1){

      }
      else{
        let teacher:teacher={
          id:new Date().getTime().toString(),
          ...this.teacher.value
        }
        teacher.gender=+teacher.gender;
        teacher.salary=+teacher.salary;
        teacher.photo=this.teacherimage;
        teacher.subjectId=+teacher.subjectId;
        let subindex=this.subjects.findIndex(p=>p.id==+teacher.subjectId);
        teacher.subjectName=this.subjects[subindex].name;
        this.teacherservice.post(teacher).subscribe({
          next:data=>{
            teacher.id=data.id;
            this.hostman.load({data:'',open:false,returndata:teacher,type:''})
          },
          error:err=>{
            this.errormess=err.message;
          }
        })
      }
      }
  }
  close(){
    this.hostman.load({open:false,data:'',returndata:'',type:''});
  }
}
