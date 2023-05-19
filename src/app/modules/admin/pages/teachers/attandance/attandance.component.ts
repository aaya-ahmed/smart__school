import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IteacherAttendance } from 'src/app/data/iteacher-attendance';
import { AttendeceService } from 'src/app/services/attendece.service';
import { HostmanagerService } from 'src/app/services/hostmanager.service';

@Component({
  selector: 'app-attandance',
  templateUrl: './attandance.component.html',
  styleUrls: ['./attandance.component.css','../../form.style.css','../../styles.css']
})
export class AttandanceComponent {
  attendenceList: IteacherAttendance[] = [];
  isBoolValue:boolean=false;
  constructor(private _teacherAttendanceService: AttendeceService,private hostman:HostmanagerService) {}
  ngOnInit(): void {
      this._teacherAttendanceService.generateTeacherAttendnce().subscribe({
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
      },
      error:(error) =>console.log(error)
    });
}
save(){
  console.log(this.attendenceList)
  this._teacherAttendanceService.saveTeacherAttendnce(this.attendenceList).subscribe({
    next: (response) => {
      this.hostman.load({open:false,data:'',returndata:'',type:''});
    },
    error: (error) => console.log(error),
  });
}
close(){
  this.hostman.load({open:false,data:'',returndata:'',type:''});
}
}
