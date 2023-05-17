import { Component } from '@angular/core';
import { classroom } from 'src/app/data/classroom';
import { ClassroomService } from 'src/app/services/classroom.service';
import { HostmanagerService } from 'src/app/services/hostmanager.service';

@Component({
  selector: 'app-classroom',
  templateUrl: './classroom.component.html',
  styleUrls: ['./classroom.component.css']
})
export class ClassroomComponent {
  classrooms:classroom[]=[];
  constructor(private classroomservice:ClassroomService,private hostman:HostmanagerService){}
  ngOnInit(): void {
    this.classroomservice.getall().subscribe({
      next:res=>{
        if(res.length>0)
          this.classrooms=res;
      }
    })
  }
  add(){
    this.hostman.load({data:'',open:true,returndata:'',type:'classroom'})
    let subscriber=this.hostman.data.subscribe({
      next:res=>{
        if(res.returndata!=''){
          this.classrooms.push(res.returndata)
          subscriber.unsubscribe()
        }
      }
    })
  }
  update(item:classroom){
    this.hostman.load({data:item,open:true,returndata:'',type:'classroom'})
    let subscriber=this.hostman.data.subscribe({
      next:res=>{
        if(res.returndata!=''){
/////
          subscriber.unsubscribe()
        }
      }
    })
  }
  delete(id:number){
          this.classroomservice.delete(id).subscribe({
            next:res=>{
              let index=this.classrooms.findIndex(p=>p.id==id);
              this.classrooms.splice(index,1)
            },
            error:err=>{
              console.log(err)
            }
          })
        }
}
