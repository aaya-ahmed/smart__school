import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Subscription } from 'rxjs';
import { material } from 'src/app/data/material';
import { HostmanagerService } from 'src/app/services/hostmanager.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-viewvideo',
  templateUrl: './viewvideo.component.html',
  styleUrls: ['./viewvideo.component.css']
})
export class ViewvideoComponent implements OnInit{
  data:any;
  path:string='';
  subscriber:Subscription=new Subscription();
  constructor(private hostman:HostmanagerService){}
  ngOnInit(): void {
    this.subscriber=this.hostman.data.subscribe({
      next:res=>{
        if(res.open==true){
          this.data=res.data;
          this.path=environment.imgeurl+this.data.path;
          this.subscriber.unsubscribe();
        }
      }
    })
  }
  close(){
    this.hostman.load({data:'',open:false,returndata:'',type:''})
  }

}
