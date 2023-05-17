import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { GradyearService } from 'src/app/services/gradyear.service';
import { HostmanagerService } from 'src/app/services/hostmanager.service';

@Component({
  selector: 'app-gradeyearform',
  templateUrl: './gradeyearform.component.html',
  styleUrls: ['./gradeyearform.component.css']
})
export class GradeyearformComponent implements OnInit{
  id:number=-1;
  gradeyear:FormGroup=new FormGroup({
    name:new FormControl('',[Validators.required,Validators.minLength(3),Validators.maxLength(15)]),
    fees:new FormControl(0,[Validators.required,Validators.pattern("^[0-9]{2,}$")])
  });
  errormess:string=''
  constructor(private gradeyearservice:GradyearService,private hostman:HostmanagerService){}
  ngOnInit(): void {
    let subscriber=this.hostman.data.subscribe({
      next:res=>{
        if(res.data.id){
          this.id=res.data.id;
          this.namecontrol.setValue(res.data.name);
          this.feescontrol.setValue(res.data.fees);
        }
        subscriber.unsubscribe()
      }
    })
  }
  get namecontrol(){
    return this.gradeyear.controls['name']
  }
  get feescontrol(){
    return this.gradeyear.controls['fees']
  }
  addgradeyear(){
    if(this.gradeyear.valid){
      if(this.id!=-1){
        // this.gradeyearservice.(this.gradeyear.value).subscribe({
        //   next:data=>{
        //     this.hostman.load({data:'',open:false,returndata:data,type:''})
        //   },
        //   error:err=>{
        //     this.errormess=err.message;
        //     console.log(err)
        //   }
        // })
      }
      else{
        this.gradeyearservice.post(this.gradeyear.value).subscribe({
          next:data=>{
            this.hostman.load({data:'',open:false,returndata:data,type:''})
          },
          error:err=>{
            this.errormess=err.message;
            console.log(err)
          }
        })
      }
      }
  }
  close(){
    this.hostman.load({open:false,data:'',returndata:'',type:''});
  }
}
