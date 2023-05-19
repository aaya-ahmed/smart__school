import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { subject } from 'src/app/data/subject';
import { teacher } from 'src/app/data/teacher';
import { HostmanagerService } from 'src/app/services/hostmanager.service';
import { SubjectService } from 'src/app/services/subject.service';
import { TeacherService } from 'src/app/services/teacher.service';

@Component({
  selector: 'app-teacherform',
  templateUrl: './teacherform.component.html',
  styleUrls: ['./teacherform.component.css','../../form.style.css']
})
export class TeacherformComponent {
  data:any=undefined;
  operationtype:number=0; //0=>add , 1=>update
  subjects:subject[]=[];
  teacher:FormGroup=new FormGroup({});
  teacherimage:any='';
  errormess:string=''
  constructor(private subjectservice:SubjectService,private fb:FormBuilder,private teacherservice:TeacherService,private hostman:HostmanagerService){
  }
  ngOnInit(): void {
    this.hostman.data.subscribe({
      next:res=>{
        if(res.data!=''){
          this.data=res.data;
          this.teacher=this.fb.group({
            FullName : new FormControl('',[Validators.minLength(3),Validators.maxLength(15)]),
            Gender : new FormControl(0,[Validators.required]),
            Salary : new FormControl(0,[Validators.pattern("^[1-9][0-9]{1,}$")]),
            Phone : new FormControl('',[Validators.pattern("^(010|011|012|015)[0-9]{8}$")]),
            Address : new FormControl('',[Validators.minLength(5),Validators.maxLength(15)]),
            HireDate : new FormControl(''),
            MaxDayOff:new FormControl(0,[Validators.pattern("^[0-9]{1,3}$")]),
            AbsenceDays :new FormControl(0,[Validators.pattern("^[0-9]{1,3}$")])
          });
          this.teacher.patchValue({
            FullName:res.data.FullName ,
            Email: res.data.Email,
            Gender: res.data.Gender,
            Salary:res.data.Salary,
            Phone: res.data.Phone,
            Address: res.data.Address,
            HireDate: res.data.HireDate.substring(0,10),
            MaxDayOff:res.data.MaxDayOff,
            AbsenceDays :res.data.AbsenceDays
          });
          this.operationtype=1;
        }
        else{
          this.subjectservice.getall().subscribe({
            next:res=>{
              this.subjects=res;
            }
          });
          this.teacher=this.fb.group({
            FullName: new FormControl('',[Validators.required,Validators.minLength(3),Validators.maxLength(15)]),
            Email: new FormControl('',[Validators.required,Validators.email]),
            Password: new FormControl('',[Validators.required,Validators.pattern("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$")]),
            Gender: new FormControl('',[Validators.required]),
            Salary: new FormControl(0,[Validators.required,Validators.pattern("^[0-9]{2,}$")]),
            Phone: new FormControl('',[Validators.required,Validators.pattern("^(010|011|012|015)[0-9]{8}$")]),
            Address: new FormControl('',[Validators.required,Validators.minLength(5),Validators.maxLength(15)]),
            Photo: new FormControl('',[Validators.required]),
            MaxDayOff :new FormControl(1,[Validators.required,Validators.pattern("^[1-9][0-9]{1,}$")]),
            HireDate: new FormControl('',[Validators.required]),
            SubjectId: new FormControl(0,[Validators.required]),
          });
        }
      }
    })
  }
  get namecontrol(){
    return this.teacher.controls['FullName']
  }
  get emailcontrol(){
    return this.teacher.controls['Email']
  }
  get passwordcontrol(){
    return this.teacher.controls['Password']
  }
  get gendercontrol(){
    return this.teacher.controls['Gender']
  }
  get salarycontrol(){
    return this.teacher.controls['Salary']
  }
  get photocontrol(){
    return this.teacher.controls['Photo']
  }
  get phonecontrol(){
    return this.teacher.controls['Phone']
  }
  get addresscontrol(){
    return this.teacher.controls['Address']
  }
  get MaxDayOffcontrol(){
    return this.teacher.controls['MaxDayOff']
  }
  get subjectIdcontrol(){
    return this.teacher.controls['SubjectId']
  }
  get hireDatecontrol(){
    return this.teacher.controls['HireDate']
  }
  get AbsenceDayscontrol(){
    return this.teacher.controls['AbsenceDays']
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
  save(){
    if(this.teacher.valid){
      if(this.data!=undefined){
        this.data={
          ...this.data,
          ...this.teacher.value,
          Gender:+this.gendercontrol.value
        }
        this.teacherservice.update(this.data).subscribe({
          next:res=>{
            this.hostman.load({open:false,data:'',returndata:this.data,type:''});
          }
        })
      }
      else{
        let teacher:teacher={
          ...this.teacher.value,
          Id:new Date().getTime().toString(),
          Gender:+this.gendercontrol.value,
          Photo:this.teacherimage,
          Salary:+this.salarycontrol.value,
          MaxDayOff:+this.MaxDayOffcontrol.value,
          SubjectId:this.subjects[+this.subjectIdcontrol.value].id,
          SubjectName:this.subjects[+this.subjectIdcontrol.value].name
        }
        this.teacherservice.post(teacher).subscribe({
          next:data=>{
            teacher.Id=data.Id;
            teacher.AbsenceDays=0;
            this.hostman.load({data:'',open:false,returndata:teacher,type:''})
          },
          error:err=>{
            console.log(err)
            teacher.Id=err.error.text;
            teacher.AbsenceDays=0;
            this.hostman.load({data:'',open:false,returndata:teacher,type:''})
          }
        })
      }
      }
  }
  close(){
    this.hostman.load({open:false,data:'',returndata:'',type:''});
  }
}
