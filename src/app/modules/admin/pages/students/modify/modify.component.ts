import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, Subscriber, Subscription } from 'rxjs';
import { classroom } from 'src/app/data/classroom';
import { ClassroomService } from 'src/app/services/classroom.service';
import { HostmanagerService } from 'src/app/services/hostmanager.service';
import { StudentserviceService } from 'src/app/services/studentservice.service';
import { SubjectService } from 'src/app/services/subject.service';

@Component({
  selector: 'app-modify',
  templateUrl: './modify.component.html',
  styleUrls: ['./modify.component.css','../../form.style.css']
})
export class ModifyComponent implements OnInit ,OnDestroy {
  class:classroom[]=[];
  data:any;
  subscriber:Subscription=Subscription.EMPTY;
  student:FormGroup=new FormGroup({
    AbsenceDays :new FormControl(0,[Validators.required,Validators.pattern("^[0-9]{1,}$")]),
    Address :new FormControl('',[Validators.required,Validators.minLength(5)]),
    ClassRoomID :new FormControl(0),
    Fees :new FormControl(false),
    Gender :new FormControl(0),
    MaxDayOff :new FormControl(0,[Validators.required,Validators.pattern("^[1-9][0-9]{1,}$")]),
    StudentBirthDate :new FormControl(''),
    StudentFirstName :new FormControl('',[Validators.required,Validators.pattern("^[a-z A-Z]{15,31}$")]),
    StudentPhone :new FormControl('',[Validators.required,Validators.pattern("^01[0125][0-9]{8}$")])
  });
  mess:string=''
  type:string=''
  constructor(private classservice:ClassroomService,private studentservice:StudentserviceService,private hostman:HostmanagerService){}

  get fnamecontrol(){
    return this.student.controls['StudentFirstName'];
  }
  get AbsenceDayscontrol(){
    return this.student.controls['AbsenceDays'];
  }
  get Addresscontrol(){
    return this.student.controls['Address'];
  }
  get MaxDayOffcontrol(){
    return this.student.controls['MaxDayOff'];
  }
  get StudentPhonecontrol(){
    return this.student.controls['StudentPhone'];
  }
  ngOnInit(): void {
    let subscriber=this.classservice.getall().subscribe({
      next:res=>{
        this.class=res;
        subscriber.unsubscribe();
        this.setdata();
      }
    });
  }
  setdata(){
    this.subscriber=this.hostman.data.subscribe({
      next:res=>{
        if(res.data!=''){
          this.data=res.data;
          let classindex=this.class.findIndex(p=>p.id== +this.data.ClassRoomID);
          this.student.patchValue({
            AbsenceDays :this.data.AbsenceDays,
            Address :this.data.Address,
            ClassRoomID :classindex,
            Fees :this.data.Fees,
            Gender :this.data.Gender,
            MaxDayOff :this.data.MaxDayOff,
            StudentBirthDate :this.data.StudentBirthDate.substring(0,10),
            StudentFirstName :this.data.StudentFirstName,
            StudentPhone :this.data.StudentPhone
          });
          this.subscriber.unsubscribe();
        }
      }
    });
  }
  modify(){
    if(this.student.valid){
      let index=this.student.controls['ClassRoomID'].value;
      this.data={
        ...this.data,
        ...this.student.value,
        ClassRoomID: this.class[index].id,
        ClassRoomName:  this.class[index].name
      }
      this.subscriber=this.studentservice.update(this.data).subscribe({
        next:res=>{
          this.mess="succcess"
          this.type="success"
          this.reset();
        },
        error:err=>{
          this.mess="failed"
          this.type="falied"
          this.reset();
        }
      });
    }
  }
  close(){
    this.hostman.load({open:false,data:'',returndata:'',type:''});
  }
  reset(){
    setTimeout(() => {
      this.mess=""
      this.type=""
    }, 1000);
  }
  ngOnDestroy(): void {
    if(this.subscriber)
    this.subscriber.unsubscribe()
  }
}
