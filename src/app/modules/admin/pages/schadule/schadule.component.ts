import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { classroom } from 'src/app/data/classroom';
import { sessions } from 'src/app/data/sessions';
import { ClassroomService } from 'src/app/services/classroom.service';
import { HostmanagerService } from 'src/app/services/hostmanager.service';
import { SchaduleSessionService } from 'src/app/services/schadule.session.service';

@Component({
  selector: 'app-schadule',
  templateUrl: './schadule.component.html',
  styleUrls: ['./schadule.component.css']
})
export class SchaduleComponent {
  formdata:FormGroup=new FormGroup({
    date:new FormControl('',[Validators.required]),
    classid:new FormControl('',[Validators.required])
  });
  classrooms:classroom[]=[]
  sessions:sessions[]=[]
  get datecontrol(){
    return this.formdata.controls['date'];
  }
  get classcontrol(){
    return this.formdata.controls['classid'];
  }
  constructor(private schaduleservice:SchaduleSessionService,private classroomservice:ClassroomService,private hostman:HostmanagerService){}
  ngOnInit(): void {
    this.classroomservice.getall().subscribe({
      next:res=>{
        this.classrooms=res;
      }
    });

  }
  add(){
    this.hostman.load({data:'',open:true,returndata:'',type:'schadule'})
    let subscriber=this.hostman.data.subscribe({
      next:res=>{
        
      }
    })
  }
  getschadule(){
    let classid:number=this.classrooms.find(p=>p.name==this.classcontrol.value)?.id||0
    this.schaduleservice.getsessions(classid,this.datecontrol.value).subscribe({
      next:res=>{
        this.sessions=res;
      }
    })
  }
  edit(item:sessions){
    let index:number=this.classrooms.findIndex(p=>p.name==this.classcontrol.value)
    this.hostman.load({data:{session:item,classid:this.classrooms[index].id},open:true,returndata:'',type:'schadule'})
    let subscriber=this.hostman.data.subscribe({
      next:res=>{
        
      }
    })
  }
  delete(id:number){
    this.schaduleservice.deleteschadule(id).subscribe({
      next:res=>{
        this.sessions.splice(this.sessions.findIndex(p=>p.scheduleID==id),1)
      }
    })
  }
}
