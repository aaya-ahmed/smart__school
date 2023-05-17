import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { classroom } from 'src/app/data/classroom';
import { subject } from 'src/app/data/subject';
import { teacher } from 'src/app/data/teacher';
import { ClassroomService } from 'src/app/services/classroom.service';
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
  schadule:FormGroup=new FormGroup({
    day:new FormControl('',[Validators.required]) ,
    classId:new FormControl('',[Validators.required]) ,
    sessionNo:new FormControl('',[Validators.required,Validators.pattern("[1-9]{1,}")]) ,
    teacherID:new FormControl('',[Validators.required]) 
  })
  constructor(private classroomservice:ClassroomService,private teacherservice:TeacherService){}
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
  close(){}
  addschadule(){
    if(this.schadule.valid)
    this.schaduleitem=this.schadule.value;
  }
}
