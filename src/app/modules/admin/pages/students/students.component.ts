import { Component } from '@angular/core';
import { gradyear } from 'src/app/data/gradyear';
import { student } from 'src/app/data/student';
import { GradyearService } from 'src/app/services/gradyear.service';
import { HostmanagerService } from 'src/app/services/hostmanager.service';
import { StudentserviceService } from 'src/app/services/studentservice.service';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css','../styles.css']
})
export class StudentsComponent {
  allstudents: student[] = [];
  gradeyear:gradyear[]=[];
  _subscriber:any;
  constructor(private gradeyearservice:GradyearService,private studentsservice:StudentserviceService,private hostman:HostmanagerService) {}
  ngOnInit(): void {
    let subscriber=this.gradeyearservice.getall().subscribe({
      next:res=>{
        this.gradeyear=res;
        subscriber.unsubscribe()
      }
    })
}
getdata(index:any){
  let id;
  if(typeof index=='number'){
    id=index;
    console.log(id)

  }
  else{
    id=this.gradeyear[index.target.value].id;
  }
  console.log(id)
  this._subscriber=this.studentsservice.getallByGradeYear(id).subscribe({
    next: (response) => {
      this.allstudents = response;
      this._subscriber.unsubscribe();
    }
  });
}
showdetails(index:number){
  this.hostman.load({data:this.allstudents[index].Id,returndata:'',type:'studentdetails',open:true});
}
update(index:number){
  this.hostman.load({data:this.allstudents[index],returndata:'',type:'modifystudent',open:true})
  this.hostman.data.subscribe({
    next:res=>{
        this.getdata(1);
    }
  })
}
delete(index:number){
  this.hostman.load({data:'',open:true,returndata:'',type:'confirm'});
  this._subscriber=this.hostman.data.subscribe({
    next:res=>{
      this._subscriber.unsubscribe();
      if(res.returndata==true){
        let id=this.allstudents[index].Id;
        this._subscriber=this.studentsservice.delete(id).subscribe({
          next:res=>{
            let index=this.allstudents.findIndex(p=>p.Id==id);
            this.allstudents.splice(index,1)
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
