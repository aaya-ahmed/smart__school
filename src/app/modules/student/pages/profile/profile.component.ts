import { Component } from '@angular/core';
import { student } from 'src/app/data/student';
import { HostmanagerService } from 'src/app/services/hostmanager.service';
import { StudentserviceService } from 'src/app/services/studentservice.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
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
  constructor(private studentservice:StudentserviceService,private hostman:HostmanagerService){
  }
  ngOnInit(): void {
    let id=localStorage.getItem("uid")?.replace(/"/g,'')||''
    this.studentservice. getallbyid(id).subscribe({
      next:res=>{
        this.student=res;
        this.student.studentPhotoUrl=environment.imgeurl+this.student.studentPhotoUrl+"?t="+new Date().getTime();
        localStorage.setItem('user',JSON.stringify(this.student));
      }
    })
  }
  changephoto(){
    this.hostman.load({open:true,data:this.student,returndata:'',type:'changephoto'});
    this.hostman.data.subscribe({
      next:res=>{
        if(res.returndata!=''){
          this.student.studentPhoto=res.returndata;
          this.studentservice.update(this.student).subscribe({
            next:res=>{
              this.student.studentPhotoUrl=environment.imgeurl+res.studentPhotoUrl+"?t="+new Date().getTime()
            }
          })
        }
      }
    })
  }
}
