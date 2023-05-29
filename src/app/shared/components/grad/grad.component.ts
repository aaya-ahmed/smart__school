import { Component, NgModuleRef, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { examresult } from 'src/app/data/exam';
import { gradyear } from 'src/app/data/gradyear';
import { student } from 'src/app/data/student';
import { ExamserviceService } from 'src/app/services/examservice.service';
import { GradyearService } from 'src/app/services/gradyear.service';
import { StudentserviceService } from 'src/app/services/studentservice.service';

@Component({
  selector: 'app-grad',
  templateUrl: './grad.component.html',
  styleUrls: ['./grad.component.css']
})
export class GradComponent implements OnInit {
  gradyear:gradyear[]=[];
  examresult:examresult[]=[];
  nodata:boolean=false;
  resultype:string='';
  year:number=new Date().getFullYear();
  modulename:string='';
  studentgradeyear:gradyear={
    id: 0,
    name: '',
    fees: 0
  }
  student:student={
    id: '',
    studentFirstName: '',
    gender: 0,
    studentPhone: '',
    studentBirthDate: '',
    studentPhotoUrl: '',
    studentPhoto: '',
    maxDayOff: 0,
    absenceDays: 0,
    fees: false,
    parentID: '',
    classRoomID: 0,
    classRoomName: ''
  }
  constructor(private moduleRef: NgModuleRef<any>,private studentservice:StudentserviceService,private gradservice:GradyearService,private examservice:ExamserviceService,private router:ActivatedRoute){
    this.modulename=this.moduleRef.instance.constructor.name;
    
  }
  ngOnInit(): void {
    this.router.params.subscribe({
      next:res=>{
        this.resultype=res['type'];
        if(this.modulename=='ParentModule'){
          this.studentservice.get(res['id']).subscribe({
            next:res=>{
              this.student=res;
              this.getinitialresult();
            }
          })
        }
        if(this.modulename=='StudentModule'){
          this.student=JSON.parse(localStorage.getItem('user')||'');
          this.getinitialresult();
        }
      }
    })
  }
  getinitialresult(){
    if(this.student.classRoomID){
      this.gradservice.getall().subscribe({
        next:res=>{
          this.gradyear=res;
        }
      });
      this.gradservice.getByClass(this.student.classRoomID).subscribe({
        next:res=>{
          this.studentgradeyear=res[0];
          if(this.resultype=='firstterm')
          this.getfirsttermresult(this.studentgradeyear.id);
          else
          this.getfullyearresult(this.studentgradeyear.id);
        }
      });
    }
  }
  getfirsttermresult(id:number){
    this.examservice.getstudentfirsttermresult(this.student.id,id).subscribe({
      next:res=>{
        if(res.length>0){
          this.examresult=res;
          this.year=res[0].year;
          this.examresult.forEach((item,i) => {
            if(item.firstTermGrade >= item.totalSubjectMark/2){
              this.examresult[i].passed=true;
            }
          });
          this.nodata=false;
        }
        else{
          this.nodata=true;
        }

      }
    })
  }
  getfullyearresult(id:number){
    this.examservice.getstudentresult(this.student.id,id).subscribe({
      next:res=>{
        this.examresult=res;
      }
    })
  }
  getresult(event:any){
    let id=event.target.value;
    this.getfullyearresult(id)
  }
}
