import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HostmanagerService } from 'src/app/services/hostmanager.service';
import { RequestService } from 'src/app/services/request.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-requestdetails',
  templateUrl: './requestdetails.component.html',
  styleUrls: ['./requestdetails.component.css']
})
export class RequestdetailsComponent {
  requestDetails: any;
  errorMessage: string = '';
  requeststatus:number=-1;
  constructor(
    private hostman:HostmanagerService,
    private _RequestService: RequestService,
  ) {}
  ngOnInit(): void {
    let subscribe=this.hostman.data.subscribe(
      {
        next:res=>{
          this._RequestService.getRequestDetails(res.data.id).subscribe({
            next: (response) => {
              this.requestDetails = response
              console.log(response)
              this.requestDetails.studentPhotoUrl=environment.imgeurl+this.requestDetails.studentPhotoUrl;
              this.requestDetails.identityParentPhotoUrl=environment.imgeurl+this.requestDetails.identityParentPhotoUrl;
              subscribe.unsubscribe()
            }
          });
        }
      }
    )
  }
  addRequest() {
    this._RequestService.acceptRequest(this.requestDetails.id).subscribe({
      next: (response) => {
        this.requeststatus=1;
        this.close()
      },
      error:err=>{
        this.errorMessage="request not accepted"
      }
    });
  }
  deleteRequest() {
    this._RequestService.refuseRequest(this.requestDetails.id).subscribe({
      next: (response) => {
        if (response === null) {
          this.requeststatus=1;
          this.close();
        } else {
          this.errorMessage="request not refused"
        }
      },
    });
  }
  close(){
    this.hostman.load({open:false,data:'',returndata:{requeststatus:this.requeststatus},type:''});
  }
}
