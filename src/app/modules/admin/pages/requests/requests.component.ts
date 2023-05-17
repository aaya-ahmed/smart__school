import { Component } from '@angular/core';
import { componentconfig } from 'src/app/data/componentconfig';
import { HostmanagerService } from 'src/app/services/hostmanager.service';
import { RequestService } from 'src/app/services/request.service';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.css']
})
export class RequestsComponent {
  allRequests: any[] = [];
  constructor(private _RequestService: RequestService,private hostman:HostmanagerService) {}
  ngOnInit(): void {
    this.getdata();
}
getdata(){
  this._RequestService.getRequests().subscribe({
    next: (response) => (this.allRequests = response)
  });
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
