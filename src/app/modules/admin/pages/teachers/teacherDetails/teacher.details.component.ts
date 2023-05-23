import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { teacher } from 'src/app/data/teacher';
import { HostmanagerService } from 'src/app/services/hostmanager.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-details',
  templateUrl: './teacher.details.component.html',
  styleUrls: ['../../../../../styles/form.style.css','./teacher.details.component.css']
})
export class TeacherDetailsComponent implements OnInit,OnDestroy {
  teacher:teacher={
    id: '',
    fullName: '',
    email: '',
    password: '',
    gender: 0,
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
          this.image=environment.imgeurl+this.teacher.photoUrl;
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
