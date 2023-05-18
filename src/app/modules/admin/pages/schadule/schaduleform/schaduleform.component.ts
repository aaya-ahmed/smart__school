import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { classroom } from 'src/app/data/classroom';
import { subject } from 'src/app/data/subject';
import { teacher } from 'src/app/data/teacher';
import { ClassroomService } from 'src/app/services/classroom.service';
import { HostmanagerService } from 'src/app/services/hostmanager.service';
import { SchaduleSessionService } from 'src/app/services/schadule.session.service';
import { SubjectService } from 'src/app/services/subject.service';
import { TeacherService } from 'src/app/services/teacher.service';

@Component({
  selector: 'app-schaduleform',
  templateUrl: './schaduleform.component.html',
  styleUrls: ['./schaduleform.component.css']
})
export class SchaduleformComponent implements OnInit {
  classrooms:classroom[]=[];
  teachers:teacher[]=[];
  schaduleitem:any;
  subject:string='';
  data:any;
  schadule:FormGroup=new FormGroup({
    day:new FormControl('',[Validators.required]) ,
    classId:new FormControl('',[Validators.required]) ,
    sessionNo:new FormControl('',[Validators.required,Validators.pattern("[1-9]{1,}")]) ,
    teacherID:new FormControl('',[Validators.required]) 
  })
  constructor(private schaduleservice:SchaduleSessionService,private classroomservice:ClassroomService,private teacherservice:TeacherService,private hostman:HostmanagerService){}
  ngOnInit(): void {
    let subscriber=this.classroomservice.getall().subscribe({
      next:res=>{
        this.classrooms=res
        subscriber.unsubscribe()
      }
    });
    let subscriber2=this.teacherservice.getall().subscribe({
      next:res=>{
        this.teachers=res
        subscriber2.unsubscribe()
      }
    });
    let subscriber3=this.hostman.data.subscribe({
      next:res=>{
        if(res.data!=''){
          this.daycontrol.setValue(res.data.session.scheduleDay );
          this.classcontrol.setValue(res.data.classid+'');
          this.sessionNocontrol.setValue(res.data.session.sessionNo);
          this.teachercontrol.setValue(res.data.session.teacherID);
          this.subject=res.data.session.subjectName; 
          this.data=res.data;
        }
        
      }
    })
  }
  get daycontrol(){
    return this.schadule.controls['day']
  }
  get classcontrol(){
    return this.schadule.controls['classId']
  }
  get sessionNocontrol(){
    return this.schadule.controls['sessionNo']
  }
  get teachercontrol(){
    return this.schadule.controls['teacherID']
  }
  setsubject(){
    this.subject=this.teachers.find(p=>p.id==this.teachercontrol.value)?.subjectName||''
  }
  close(){
    this.hostman.load({open:false,data:'',returndata:'',type:''});
  }
  addschadule(){
    if(this.schadule.valid){
      let teacher=this.teachers[this.teachers.findIndex(p=>p.id==this.schadule.value.teacherID)];
      if(this.data.session.id){
        let session={
          id: this.data.session.id,
          sessionNo: this.sessionNocontrol.value,
          scheduleID: this.data.session.scheduleID,
          teacherID: teacher.id,
          subjectName: teacher.subjectName,
          teacherName: teacher.fullName,
          scheduleDay: this.schadule.value.day
      }
      let schadule={
        id:  this.data.session.scheduleID,
        day: this.schadule.value.day,
        classId:+this.schadule.value.classId,
        classRoomName: this.classrooms[this.classrooms.findIndex(p=>p.id==this.schadule.value.classId)].name
      }
        this.schaduleservice.updateschadule(schadule).subscribe({
          next:res=>{
            this.schaduleservice.updatesession(session).subscribe({

            })
          }
        })
      }
      else{
        let schadule={
          Day:this.schadule.value.day,
          classId:+this.schadule.value.classId,
          ClassRoom:this.classrooms[this.classrooms.findIndex(p=>p.id==this.schadule.value.classId)].name,
          Teacherid:this.schadule.value.teacherID,
          Teacher:teacher.fullName,
          Subject:teacher.subjectName,
          SessionNum:this.schadule.value.sessionNo,
          gradeyear:this.classrooms[this.classrooms.findIndex(p=>p.id==this.schadule.value.classId)].gradeYearName
        }
        this.schaduleitem=schadule;
      }
    }
  }
}
