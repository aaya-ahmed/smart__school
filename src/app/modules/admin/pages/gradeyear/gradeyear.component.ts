import { Component, OnInit } from '@angular/core';
import { gradyear } from 'src/app/data/gradyear';
import { GradyearService } from 'src/app/services/gradyear.service';
import { HostmanagerService } from 'src/app/services/hostmanager.service';

@Component({
  selector: 'app-gradeyear',
  templateUrl: './gradeyear.component.html',
  styleUrls: ['./gradeyear.component.css']
})
export class GradeyearComponent implements OnInit{
  gradyears:gradyear[]=[];
  constructor(private gradyear:GradyearService,private hostman:HostmanagerService){}
  ngOnInit(): void {
    this.gradyear.getall().subscribe({
      next:res=>{
        if(res.length>0)
          this.gradyears=res;
      }
    })
  }
  add(){
    this.hostman.load({data:'',open:true,returndata:'',type:'gradeyear'})
    let subscriber=this.hostman.data.subscribe({
      next:res=>{
        if(res.returndata!=''){
          this.gradyears.push(res.returndata)
          subscriber.unsubscribe()
        }
      }
    })
  }
  update(item:gradyear){
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
  delete(id:number){
          this.gradyear.delete(id).subscribe({
            next:res=>{
              let index=this.gradyears.findIndex(p=>p.id==id);
              this.gradyears.splice(index,1)
            },
            error:err=>{
              console.log(err)
            }
          })
        }
}
