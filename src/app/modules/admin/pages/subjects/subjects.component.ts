import { Component } from '@angular/core';
import { subject } from 'src/app/data/subject';
import { HostmanagerService } from 'src/app/services/hostmanager.service';
import { SubjectService } from 'src/app/services/subject.service';

@Component({
  selector: 'app-subjects',
  templateUrl: './subjects.component.html',
  styleUrls: ['./subjects.component.css']
})
export class SubjectsComponent {
  subjects:subject[]=[];
  constructor(private subject:SubjectService,private hostman:HostmanagerService){}
  ngOnInit(): void {
    this.subject.getall().subscribe({
      next:res=>{
        if(res.length>0)
          this.subjects=res;
          this.subjects.sort(function(a, b){
            return b.gradeYearId - a.gradeYearId; // sort in descending order
        })
        console.log(this.subjects)
      }
    })
  }
  add(){
    this.hostman.load({data:'',open:true,returndata:'',type:'subject'})
    let subscriber=this.hostman.data.subscribe({
      next:res=>{
        if(res.returndata!=''){
          this.subjects.push(res.returndata)
          subscriber.unsubscribe()
        }
      }
    })
  }
  update(item:subject){
    this.hostman.load({data:item,open:true,returndata:'',type:'subject'})
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
          this.subject.delete(id).subscribe({
            next:res=>{
              let index=this.subjects.findIndex(p=>p.id==id);
              this.subjects.splice(index,1)
            },
            error:err=>{
              console.log(err)
            }
          })
        }
}
