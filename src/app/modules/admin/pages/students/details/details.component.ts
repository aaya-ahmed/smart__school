import { Component, OnDestroy, OnInit } from '@angular/core';
import { student } from 'src/app/data/student';
import { HostmanagerService } from 'src/app/services/hostmanager.service';
import { StudentserviceService } from 'src/app/services/studentservice.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['../../form.style.css','./details.component.css']
})
export class DetailsComponent implements OnInit , OnDestroy {
  student:student={
    Id: '',
    StudentFirstName: '',
    Gender: 0,
    StudentPhone: '',
    StudentBirthDate: '',
    StudentPhotoUrl: '',
    StudentPhoto: '',
    MaxDayOff: 0,
    AbsenceDays: 0,
    Fees: false,
    ParentID: '',
    ClassRoomID: 0,
    ClassRoomName: ''
  }
  _subscriber:any;
  constructor(
    private hostman:HostmanagerService,
    private studentservice:StudentserviceService
  ) {}

  ngOnInit(): void {
    let subscriber=this.hostman.data.subscribe({
      next:res=>{
        if(res.data!=''){
          this._subscriber=this.studentservice.get(res.data).subscribe({
            next:res=>{
              this.student=res;
              this.student.StudentPhotoUrl=environment.imgeurl+this.student.StudentPhotoUrl;
              subscriber.unsubscribe();
            }
          })
        }
      }
    })
  }
  close(){
    this.hostman.load({open:false,data:'',returndata:'',type:''});
  }
  ngOnDestroy(): void {
    this._subscriber.unsubscribe()
  }
}
