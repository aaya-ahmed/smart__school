import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { sessions } from 'src/app/data/sessions';
import { teacher } from 'src/app/data/teacher';
import { SchaduleSessionService } from 'src/app/services/schadule.session.service';
import { TeacherService } from 'src/app/services/teacher.service';

@Component({
  selector: 'app-schadule',
  templateUrl: './schadule.component.html',
  styleUrls: ['./schadule.component.css']
})
export class SchaduleComponent implements OnInit,OnDestroy {
  sessions:any[]=[];
  currentDate:Date=new Date();
  sevsnDays:any[]=[];
  sessionNumbers:number[]=[];
  schaduleSubscribtion:Subscription=new Subscription();
  constructor(private sessionsservice:SchaduleSessionService){}
  ngOnInit(): void {
    this.getschadule();
  }
  getschadule(){
    this.sessions=[];
    let id=localStorage.getItem('uid')?.replace(/"/g,'')||'';
    this.setDay();
    this.schaduleSubscribtion=this.sessionsservice.getteachersession(id,this.sevsnDays[0],this.sevsnDays[this.sevsnDays.length-1]).subscribe({
      next:res=>{
        this.sessions=res;
        this.sessions.sort((a,b)=>{
          return new Date(a.scheduleDay).getTime() - new Date(b.scheduleDay).getTime()
        });
        this.setSessionNumber();
        this.schaduleSubscribtion.unsubscribe();
      }
    });
  }
  setDay(){
    this.sevsnDays=[];
    for(let i=1;i<=7;i++){
      let date=new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), this.currentDate.getDate()+i);
      this.sevsnDays.push(date.toISOString().substring(0,10));
    }
  }
  setSessionNumber(){
    this.sessionNumbers=[];
    let maxnum=Math.max(...this.sessions.map(x=>x.sessionNo));
    for(let i=1;i<=maxnum;i++)this.sessionNumbers.push(i);
  }
  getNext(){
    let date=new Date();
    this.currentDate=new Date(date.setTime(this.currentDate.getTime()+7*(24*60*60*1000)))
    this.getschadule();
  }
  getPrev(){
    let date=new Date();
    this.currentDate=new Date(date.setTime(this.currentDate.getTime()-7*(24*60*60*1000)));
    this.getschadule();
  }
  ngOnDestroy(): void {
   
  }
}
