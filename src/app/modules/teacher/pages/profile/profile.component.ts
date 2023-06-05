import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { teacher } from 'src/app/data/teacher';
import { HostmanagerService } from 'src/app/services/hostmanager.service';
import { TeacherService } from 'src/app/services/teacher.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  teacher:teacher={
    id: '',
    fullName: '',
    email: '',
    password: '',
    gender: '',
    salary: 0,
    phone: '',
    address: '',
    photoUrl: '',
    photo: '',
    hireDate: '',
    maxDayOff: 0,
    absenceDays: 0,
    subjectId: 0,
    subjectName: '',
    identityUserId: ''
  }
  subscriber:Subscription=new Subscription();
  constructor(private teacherservice:TeacherService,private hostman:HostmanagerService){
  }
  ngOnInit(): void {
    this.getteacher();
  }
  getteacher(){
    let id=localStorage.getItem("uid")?.replace(/"/g,'')||''
    let subscriber=this.teacherservice.getbyidentity(id).subscribe({
      next:res=>{
        this.teacher=res;
        this.teacher.photoUrl=environment.imgeurl+this.teacher.photoUrl+"?t="+new Date().getTime();
        subscriber.unsubscribe()
      }
    })
  }
  changephoto(){
    this.hostman.load({open:true,data:this.teacher,returndata:'',type:'changephoto'});
    this.subscriber=this.hostman.data.subscribe({
      next:res=>{
        if(res.returndata!=''){
          this.teacher.photo=res.returndata;
          this.teacherservice.update(this.teacher).subscribe({
            next:res=>{
              this.teacher.photoUrl=environment.imgeurl+res.photoUrl+"?t="+new Date().getTime()
            }
          });
          this.subscriber.unsubscribe()
        }
      }
    })
  }
  openupdatewindow(){
    this.hostman.load({open:true,data:this.teacher,returndata:'',type:'updateprofile'});
    this.hostman.data.subscribe({
      next:res=>{
        if(res.open==false){
          this.getteacher();
        }
      }
    })
  }
  ngOnDestroy(): void {
    if(this.subscriber)
    this.subscriber.unsubscribe()
  }
}
