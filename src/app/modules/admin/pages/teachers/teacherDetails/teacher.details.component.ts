import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { teacher } from 'src/app/data/teacher';
import { HostmanagerService } from 'src/app/services/hostmanager.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-details',
  templateUrl: './teacher.details.component.html',
  styleUrls: ['../../form.style.css','./teacher.details.component.css']
})
export class TeacherDetailsComponent implements OnInit,OnDestroy {
  teacher:teacher={
    Id: '',
    FullName: '',
    Email: '',
    Password: '',
    Gender: 0,
    Salary: 0,
    Phone: '',
    Address: '',
    PhotoUrl: '',
    Photo: '',
    HireDate: '',
    MaxDayOff: 0,
    AbsenceDays: 0,
    SubjectId: 0,
    SubjectName: '',
    IdentityUserId: ''
  }
  teacherSubscriber:Subscription=new Subscription();
  hostSubscribtion:Subscription=new Subscription();
  subscribe:any;
  image:string='';
  constructor(
    private hostman:HostmanagerService,
  ) {}

  ngOnInit(): void {
    this.hostSubscribtion=this.hostman.data.subscribe({
      next:res=>{
        if(res.data!=''){
          this.teacher=res.data;
          this.image=environment.imgeurl+this.teacher.PhotoUrl;
          this.hostSubscribtion.unsubscribe();
        }
      },
      error:err=>{
        this.hostSubscribtion.unsubscribe();
      }
    })
  }
  close(){
    this.hostman.load({open:false,data:'',returndata:'',type:''});
  }
  ngOnDestroy(): void {
    if(this.subscribe){
      this.subscribe.unsubscribe();
    }
  }
}
