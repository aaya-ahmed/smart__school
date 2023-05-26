import { Component, OnInit } from '@angular/core';
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
  constructor(private teacherservice:TeacherService,private hostman:HostmanagerService){
  }
  ngOnInit(): void {
    let id=localStorage.getItem("uid")?.replace(/"/g,'')||''
    this.teacherservice.getbyidentity(id).subscribe({
      next:res=>{
        this.teacher=res;
        this.teacher.photoUrl=environment.imgeurl+this.teacher.photoUrl+"?t="+new Date().getTime();
      }
    })
  }
  changephoto(){
    this.hostman.load({open:true,data:this.teacher,returndata:'',type:'changephoto'});
    this.hostman.data.subscribe({
      next:res=>{
        if(res.returndata!=''){
          this.teacher.photo=res.returndata;
          this.teacherservice.update(this.teacher).subscribe({
            next:res=>{
              this.teacher.photoUrl=environment.imgeurl+res.photoUrl+"?t="+new Date().getTime()
            }
          })
        }
      }
    })
  }
  openupdatewindow(){
    this.hostman.load({open:true,data:this.teacher,returndata:'',type:'updateprofile'});
  }
}
