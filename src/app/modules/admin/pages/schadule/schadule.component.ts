import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { classroom } from 'src/app/data/classroom';
import { sessions } from 'src/app/data/sessions';
import { ClassroomService } from 'src/app/services/classroom.service';
import { HostmanagerService } from 'src/app/services/hostmanager.service';
import { SchaduleSessionService } from 'src/app/services/schadule.session.service';

@Component({
  selector: 'app-schadule',
  templateUrl: './schadule.component.html',
  styleUrls: ['./schadule.component.css','../styles.css']
})
export class SchaduleComponent implements OnInit , OnDestroy{
  formdata:FormGroup=new FormGroup({
    date:new FormControl('',[Validators.required]),
    classid:new FormControl('',[Validators.required])
  });
  classrooms:classroom[]=[]
  sessions:sessions[]=[]
  subscriber:any;
  get datecontrol(){
    return this.formdata.controls['date'];
  }
  get classcontrol(){
    return this.formdata.controls['classid'];
  }
  constructor(private schaduleservice:SchaduleSessionService,private classroomservice:ClassroomService,private hostman:HostmanagerService){}

  ngOnInit(): void {
    this.subscriber=this.classroomservice.getall().subscribe({
      next:res=>{
        this.classrooms=res;
      }
    });

  }
  add(){
    this.hostman.load({data:'',open:true,returndata:'',type:'schadule'})
    let subscriber=this.hostman.data.subscribe({
      next:res=>{
        if(res.returndata!='')
        this.getschadule();
      }
    })
  }
  getschadule(){
    let classid:number=this.classrooms[+this.classcontrol.value-1].id
    this.schaduleservice.getsessions(classid,this.datecontrol.value).subscribe({
      next:res=>{
        this.sessions=res;
      }
    })
  }
  edit(item:sessions){
    this.hostman.load({data:{session:item,classid:this.classrooms[+this.classcontrol.value-1].id},open:true,returndata:'',type:'schadule'})
    let subscriber=this.hostman.data.subscribe({
      next:res=>{
        
      }
    })
  }
  delete(id:number){
    this.hostman.load({data:'',open:true,returndata:'',type:'confirm'});
    this.subscriber=this.hostman.data.subscribe({
      next:res=>{
        this.subscriber.unsubscribe()
        if(res.returndata==true){
          this.schaduleservice.deleteschadule(id).subscribe({
            next:res=>{
              this.sessions.splice(this.sessions.findIndex(p=>p.scheduleID==id),1)
            }
          })
        }
      }
    }) 
  }
  ngOnDestroy(): void {
    if(this.subscriber)
    this.subscriber.unsubscribe()
  }
}
