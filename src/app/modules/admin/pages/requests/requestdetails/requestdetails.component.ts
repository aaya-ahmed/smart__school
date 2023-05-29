import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { classroom } from 'src/app/data/classroom';
import { ClassroomService } from 'src/app/services/classroom.service';
import { HostmanagerService } from 'src/app/services/hostmanager.service';
import { RequestService } from 'src/app/services/request.service';
import { StudentserviceService } from 'src/app/services/studentservice.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-requestdetails',
  templateUrl: './requestdetails.component.html',
  styleUrls: ['../../../../../styles/form.style.css','./requestdetails.component.css']
})
export class RequestdetailsComponent {
  @Input()data:any;
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
    private studentservice:StudentserviceService
  ) {}
  ngOnInit(): void {
    let subscriber1=this.classiesservice.getall().subscribe({
      next:res=>{
        this.classies=res
        subscriber1.unsubscribe()
      }
    })
    let subscribe=this._RequestService.getRequestDetails(this.data.id).subscribe({
      next: (response) => {
        this.requestDetails = response;
        this.srcimage=[
          environment.imgeurl+this.requestDetails.studentPhotoUrl,
          environment.imgeurl+this.requestDetails.identityParentPhotoUrl,
          environment.imgeurl+this.requestDetails.studentBirthCertPhotoUrl
        ];
        this.selectedimage=this.srcimage[0]
        subscribe.unsubscribe()
      }
    });
  }
  acceptRequest() {
    if(this.classform.valid){ 
      console.log(this.classform)     
      console.log(this.requestDetails.id)
      this._RequestService.acceptRequest(this.requestDetails.id).subscribe({
        next: (response) => {
          this.studentservice.get(response.studentid).subscribe({
            next:res=>{
              res.classRoomID=this.classies[this.classform.controls['class'].value].id;
              res.classRoomName=this.classies[this.classform.controls['class'].value].name;
              console.log(res)
              //err
              this.studentservice.update(res).subscribe({
                next:res=>{
                  this.requeststatus=1;
                  this.close()
                }
              })
            },
            error:err=>{
              console.log(err)
            }
          })
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
