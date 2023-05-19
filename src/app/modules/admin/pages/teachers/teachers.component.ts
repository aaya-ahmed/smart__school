import { Component } from '@angular/core';
import { teacher } from 'src/app/data/teacher';
import { HostmanagerService } from 'src/app/services/hostmanager.service';
import { TeacherService } from 'src/app/services/teacher.service';

@Component({
  selector: 'app-teachers',
  templateUrl: './teachers.component.html',
  styleUrls: ['./teachers.component.css','../styles.css']
})
export class TeachersComponent {
  teachers:any[]=[];
  subscriber:any;
  constructor(private teacher:TeacherService,private hostman:HostmanagerService){}
  ngOnInit(): void {
    this.teacher.getall().subscribe({
      next:res=>{
        if(res.length>0)
          this.teachers=res;
          console.log(this.teachers)
      }
    })
  }
  add(){
    this.hostman.load({data:'',open:true,returndata:'',type:'teacher'})
    let subscriber=this.hostman.data.subscribe({
      next:res=>{
        if(res.returndata!=''){
          this.teachers=this.teachers.concat(res.returndata)
          subscriber.unsubscribe()
        }
      }
    })
  }
  takeattandance(){
    this.hostman.load({data:'',open:true,returndata:'',type:'teacherattandance'})
  }
  update(item:teacher){
    this.hostman.load({data:item,open:true,returndata:'',type:'teacher'})
    this.subscriber=this.hostman.data.subscribe({
      next:res=>{
        if(res.returndata!=''){
          let index=this.teachers.findIndex(p=>res.returndata.Id==p.Id);
          this.teachers[index]=res.returndata;
          this.subscriber.unsubscribe()
        }
      }
    })
  }
  delete(id:string){
    this.hostman.load({data:'',open:true,returndata:'',type:'confirm'});
    this.subscriber=this.hostman.data.subscribe({
      next:res=>{
        this.subscriber.unsubscribe()
        if(res.returndata==true){
          this.teacher.delete(id).subscribe({
            next:res=>{
              let index=this.teachers.findIndex(p=>p.Id==id);
              this.teachers.splice(index,1)
            },
            error:err=>{
              console.log(err)
            }
          })
        }
      }
    }) 
          
  }
}
