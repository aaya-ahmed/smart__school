import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { schadule, tempschadule } from 'src/app/data/schadule';
import { sessions } from 'src/app/data/sessions';
import { SchaduleSessionService } from 'src/app/services/schadule.session.service';

@Component({
  selector: 'app-scadules',
  templateUrl: './scadules.component.html',
  styleUrls: ['./scadules.component.css']
})
export class ScadulesComponent implements OnChanges {
  @Input()schadule:any;
  @Output()message:EventEmitter<string>=new EventEmitter();
  schadules:tempschadule[]=[];
  exist:boolean=false;
  constructor(private schaduleservice:SchaduleSessionService){}
  ngOnChanges(changes: SimpleChanges): void {
    if(changes['schadule'].firstChange==false){
      let currentschadule=changes['schadule'].currentValue;
      this.schadules.forEach(ele => {
        if(ele.day==currentschadule.Day&&currentschadule.Teacherid==ele.sessions.teacherID){
              this.exist=true;
              return;
            }
      });
      let schaduleindex=this.schadules.findIndex(p=>p.gradeyear==currentschadule.gradeyear&&p.day==currentschadule.Day&&p.classId==currentschadule.classId);
      
      if(schaduleindex==-1&&this.exist==false){
        let session1:sessions={
          id:0,
          scheduleDay:currentschadule.Day.toString(),
          sessionNo:currentschadule.SessionNum,
          subjectName:currentschadule.Subject,
          scheduleID:0,
          teacherID:currentschadule.Teacherid,
          teacherName:currentschadule.Teacher
        }
        let sechadule1:tempschadule={
          day: currentschadule.Day.toString(),
          classId: currentschadule.classId,
          classRoomName: currentschadule.ClassRoom,
          gradeyear:currentschadule.gradeyear,
          sessions:session1
        }
        this.schadules.push(sechadule1)
      }
      else{
        this.message.emit('this session not allowed')
      }
      this.exist=false;
    }
  }
  save(){
    this.schadules.forEach(ele=>{
      let schadule:schadule={
        day: ele.day.toString(),
        classId: ele.classId,
        classRoomName: ele.classRoomName,
        id: 0
      }
      this.schaduleservice.postschadule(schadule).subscribe({
        next:res=>{
          ele.sessions.scheduleID=res.id;
          this.schaduleservice.postsession(ele.sessions).subscribe({
            next:res=>{

            }
          })
        },
        error:err=>{}
      })
    });
  }
}
