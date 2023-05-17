import { Component } from '@angular/core';
import { HostmanagerService } from 'src/app/services/hostmanager.service';

@Component({
  selector: 'app-schadule',
  templateUrl: './schadule.component.html',
  styleUrls: ['./schadule.component.css']
})
export class SchaduleComponent {
  constructor(private hostman:HostmanagerService){}
  ngOnInit(): void {
  }
  add(){
    this.hostman.load({data:'',open:true,returndata:'',type:'schadule'})
    let subscriber=this.hostman.data.subscribe({
      next:res=>{
        
      }
    })
  }
}
