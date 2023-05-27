import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { classroom } from 'src/app/data/classroom';
import { examresult } from 'src/app/data/exam';
import { student } from 'src/app/data/student';
import { teacher } from 'src/app/data/teacher';
import { ClassroomService } from 'src/app/services/classroom.service';
import { ExamserviceService } from 'src/app/services/examservice.service';
import { TeacherService } from 'src/app/services/teacher.service';

@Component({
  selector: 'app-examresult',
  templateUrl: './examresult.component.html',
  styleUrls: ['./examresult.component.css','../../../../styles/modulesStyle.css']
})
export class ExamresultComponent implements OnInit {
  examresult:examresult[]=[];
  classies:classroom[]=[];
  message:string='';
  type:string='';
  loader:boolean=false;
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
  constructor(private examservice:ExamserviceService,private teacherservice:TeacherService,private classservice:ClassroomService){}
  ngOnInit(): void {
    let id=localStorage.getItem('uid')?.replace(/"/g,'')||'';
    this.teacherservice.getbyidentity(id).subscribe({
      next:res=>{
        this.teacher=res;
        this.getclassies(this.teacher.subjectId);
      }
    });
  }
  getclassies(id:number){
    this.classservice.getallbysubject(id).subscribe({
      next:res=>{
        this.classies=res;
      }
    })
  }
  getexamresult(classid:any){
    this.examservice.getexamresultlist(classid.target.value,this.teacher.subjectId).subscribe({
      next:res=>{
        if(res.length>0)
        this.examresult=res;
        else
        this.examresult=[];
      }
    });
  }
  updategrade(index:number,term:number,result:any){
    let examresult=this.examresult[index];
    if(term==1){
      examresult.firstTermGrade=+result.target.value;
    }
    if(term==2){
      examresult.secondTermGrade=+result.target.value;
    }
    examresult.total=+examresult.firstTermGrade + +examresult.secondTermGrade;
    this.examresult[index]=examresult;
  }
  saveresult(){
    this.loader=true;
    this.examservice.updateexamresult(this.examresult).subscribe({
      next:res=>{
        this.message='success';
        this.type='success';
        this.loader=false;
        this.reset();
      },
      error:err=>{
        this.message='failed';
        this.type='failed';
        this.loader=false;
        this.reset();
      }
    })
  }
  reset(){
    let timer=setTimeout(() => {
      this.message='';
      this.type='';
      clearTimeout(timer)
    }, 1000);
  }
}
