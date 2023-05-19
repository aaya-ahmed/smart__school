import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { classroom } from 'src/app/data/classroom';
import { ClassroomService } from 'src/app/services/classroom.service';
import { HostmanagerService } from 'src/app/services/hostmanager.service';
import { RequestService } from 'src/app/services/request.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-requestdetails',
  templateUrl: './requestdetails.component.html',
  styleUrls: ['../../form.style.css','./requestdetails.component.css']
})
export class RequestdetailsComponent {
  requestDetails: any;
  errorMessage: string = '';
  requeststatus:number=-1;
  srcimage:string[]=[]
  classies:classroom[]=[]
  selectedimage:string=''
  counter:number=0;
  classform:FormGroup=new FormGroup({
    class:new FormControl('',Validators.required)
  })
  constructor(
    private hostman:HostmanagerService,
    private classiesservice:ClassroomService,
    private _RequestService: RequestService,
  ) {}
  ngOnInit(): void {
    let subscriber1=this.classiesservice.getall().subscribe({
      next:res=>{
        this.classies=res
        subscriber1.unsubscribe()
      }
    })
    let subscribe=this.hostman.data.subscribe(
      {
        next:res=>{
          this._RequestService.getRequestDetails(res.data.id).subscribe({
            next: (response) => {
              this.requestDetails = response
              this.requestDetails.studentPhotoUrl=environment.imgeurl+this.requestDetails.studentPhotoUrl;
              this.requestDetails.identityParentPhotoUrl=environment.imgeurl+this.requestDetails.identityParentPhotoUrl;
              this.requestDetails.studentBirthCertPhotoUrl=environment.imgeurl+this.requestDetails.studentBirthCertPhotoUrl;
              this.srcimage=[this.requestDetails.studentPhotoUrl,
                this.requestDetails.identityParentPhotoUrl,
                this.requestDetails.studentBirthCertPhotoUrl
              ];
              console.log(this.srcimage)
              this.selectedimage=this.srcimage[0]
              subscribe.unsubscribe()
            }
          });
        }
      }
    )
  }
  addRequest() {
    if(this.classform.valid){
      let id=this.classies[+this.classform.controls['class'].value].id
      this._RequestService.acceptRequest(this.requestDetails.id,id).subscribe({
        next: (response) => {
          this.requeststatus=1;
          this.close()
        },
        error:err=>{
          this.errorMessage="request not accepted"
        }
      });
    }
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
  next(){
    this.counter++;
    if(this.counter==this.srcimage.length){
      this.counter=0;
    }
    this.selectedimage=this.srcimage[this.counter]
  }
  prev(){
    this.counter--;
    if(this.counter==-1){
      this.counter=this.srcimage.length-1;
    }
    this.selectedimage=this.srcimage[this.counter]
  }

}
