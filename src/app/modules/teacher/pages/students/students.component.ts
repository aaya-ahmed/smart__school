import { Component } from '@angular/core';
import { classroom } from 'src/app/data/classroom';
import { student } from 'src/app/data/student';
import { ClassroomService } from 'src/app/services/classroom.service';
import { HostmanagerService } from 'src/app/services/hostmanager.service';
import { StudentserviceService } from 'src/app/services/studentservice.service';
import { TeacherService } from 'src/app/services/teacher.service';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['../../../../styles/modulesStyle.css','./students.component.css']
})
export class StudentsComponent {
  teacher:any;
  classsies:classroom[]=[]
  allstudents:student[]=[]
  constructor(private teacherservice:TeacherService,private hostman:HostmanagerService,private classservice:ClassroomService,private studentservice:StudentserviceService) { }
  ngOnInit() {
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
        this.classsies=res;
      }
    })
  }
  getstudents(event:any){
    this.studentservice.getstudentbyclassid(event.target.value).subscribe({
      next:res=>{
        this.allstudents=res;
        console.log(res)
      }
    })
  }
  takeattandance(){
    this.hostman.load({data:this.classsies,open:true,returndata:'',type:'studentattandance'})
  }
}
