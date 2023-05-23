import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { gradyear } from 'src/app/data/gradyear';
import { GradyearService } from 'src/app/services/gradyear.service';
import { HostmanagerService } from 'src/app/services/hostmanager.service';

@Component({
  selector: 'app-gradeyearform',
  templateUrl: './gradeyearform.component.html',
  styleUrls: ['../../../../../styles/form.style.css']
})
export class GradeyearformComponent implements OnInit , OnDestroy{
  newgrades:gradyear[]=[]
  loadflag:boolean=false;
  mess:string=''
  subscriber:any;
  gradeyear:FormGroup=new FormGroup({
    name:new FormControl('',[Validators.required,Validators.minLength(3),Validators.maxLength(15)]),
    fees:new FormControl(0,[Validators.required,Validators.pattern("^[0-9]{2,}$")])
  });
  constructor(private gradeyearservice:GradyearService,private hostman:HostmanagerService){}
  ngOnInit(): void {
  }
  get namecontrol(){
    return this.gradeyear.controls['name']
  }
  get feescontrol(){
    return this.gradeyear.controls['fees']
  }
  addgradeyear(){
    if(this.gradeyear.valid){
       this.subscriber= this.gradeyearservice.post(this.gradeyear.value).subscribe({
          next:(data:any)=>{
            let grade={
              ...this.gradeyear.value,
              id:data.id
            }
            this.newgrades.push(grade);
            this.mess='Success';
          },
          error:err=>{
            this.mess='Failed';
          }
        });
        setTimeout(() => {
          this.mess='';
        }, 1000);
      }
  }
  close(){
    this.hostman.load({open:false,data:'',returndata:this.newgrades,type:''});
  }
  ngOnDestroy(): void {
    if(this.subscriber)
    this.subscriber.unsubscribe();
  }
}
