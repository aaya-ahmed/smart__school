import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IteacherAttendance } from 'src/app/data/iteacher-attendance';
import { AttendeceService } from 'src/app/services/attendece.service';
import { HostmanagerService } from 'src/app/services/hostmanager.service';

@Component({
  selector: 'app-attandance',
  templateUrl: './attandance.component.html',
  styleUrls: ['./attandance.component.css','../../../../../styles/form.style.css','../../../../../styles/modulesStyle.css']
})
export class AttandanceComponent {
  attendenceList: IteacherAttendance[] = [];
  isBoolValue:boolean=false;
  attandanceSubscriber:Subscription=new Subscription();
  constructor(private _teacherAttendanceService: AttendeceService,private hostman:HostmanagerService) {}
  ngOnInit(): void {
      this.attandanceSubscriber=this._teacherAttendanceService.generateTeacherAttendnce().subscribe({
      next: (response) => {
        this.attendenceList = response;
        for (let index = 0; index < this.attendenceList.length; index++) {
          if (this.attendenceList[index].state === true) {
            this.attendenceList[index].state = true;
            this.isBoolValue=true;
          }
          else
          {
            this.attendenceList[index].state = false;
              this.isBoolValue=true;
          }
        }
        this.attandanceSubscriber.unsubscribe()
      },
      error:(error) =>{
        this.attandanceSubscriber.unsubscribe()
      }
    });
}
save(){
  this.attandanceSubscriber=this._teacherAttendanceService.saveTeacherAttendnce(this.attendenceList).subscribe({
    next: (response) => {
      this.hostman.load({open:false,data:'',returndata:'',type:''});
      this.attandanceSubscriber.unsubscribe()
    },
    error: (error) => {
      this.hostman.load({open:false,data:'',returndata:'',type:''});
      this.attandanceSubscriber.unsubscribe()
    }
  });
}
close(){
  this.hostman.load({open:false,data:'',returndata:'',type:''});
}
}
