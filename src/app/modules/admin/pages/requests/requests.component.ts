import { Component } from '@angular/core';
import { componentconfig } from 'src/app/data/componentconfig';
import { gradyear } from 'src/app/data/gradyear';
import { GradyearService } from 'src/app/services/gradyear.service';
import { HostmanagerService } from 'src/app/services/hostmanager.service';
import { RequestService } from 'src/app/services/request.service';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['../styles.css','./requests.component.css']
})
export class RequestsComponent {
  allRequests: any[] = [];
  gradeyear:gradyear[]=[];
  constructor(private gradeyearservice:GradyearService,private _RequestService: RequestService,private hostman:HostmanagerService) {}
  ngOnInit(): void {
    this.gradeyearservice.getall().subscribe({
      next:res=>{
        this.gradeyear=res;
      }
    })
    this.getdata();
}
getdata(){
  this._RequestService.getRequests().subscribe({
    next: (response) => {
      this.allRequests = response;
      console.log(this.allRequests);
    }
  });
}
getdatabygradeyear(grade:any){
  let id=this.gradeyear.find(p=>p.name==grade)?.id;
  // this._RequestService.getRequestsByGrade(id).subscribe({
  //   next: (response) => {
  //     this.allRequests = response;
  //   }
  // });
}
showdetails(id:number){
  let data:componentconfig={
      type:'requestdetails',
      data:{id},
      returndata:'',
      open:true
  }
  this.hostman.load(data);
  this.hostman.data.subscribe(res=>{
    if(res.returndata!=''){
      if(res.returndata.requeststatus!=-1)
        this.getdata();
    }
  })
}
}
