import { Component } from '@angular/core';
import { teacher } from 'src/app/data/teacher';
import { HostmanagerService } from 'src/app/services/hostmanager.service';
import { TeacherService } from 'src/app/services/teacher.service';

@Component({
  selector: 'app-teachers',
  templateUrl: './teachers.component.html',
  styleUrls: ['./teachers.component.css']
})
export class TeachersComponent {
  teachers:teacher[]=[];
  constructor(private teacher:TeacherService,private hostman:HostmanagerService){}
  ngOnInit(): void {
    this.teacher.getall().subscribe({
      next:res=>{
        if(res.length>0)
          this.teachers=res;
      }
    })
  }
  add(){
    this.hostman.load({data:'',open:true,returndata:'',type:'teacher'})
    let subscriber=this.hostman.data.subscribe({
      next:res=>{
        if(res.returndata!=''){
          this.teachers.push(res.returndata)
          subscriber.unsubscribe()
        }
      }
    })
  }
  update(item:teacher){
    this.hostman.load({data:item,open:true,returndata:'',type:'gradeyear'})
    let subscriber=this.hostman.data.subscribe({
      next:res=>{
        if(res.returndata!=''){
/////
          subscriber.unsubscribe()
        }
      }
    })
  }
  delete(id:string){
          this.teacher.delete(id).subscribe({
            next:res=>{
              let index=this.teachers.findIndex(p=>p.id==id);
              this.teachers.splice(index,1)
            },
            error:err=>{
              console.log(err)
            }
          })
  }
}
