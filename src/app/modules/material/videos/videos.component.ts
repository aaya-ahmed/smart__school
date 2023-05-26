import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { material } from 'src/app/data/material';
import { HostmanagerService } from 'src/app/services/hostmanager.service';
import { MaterialService } from 'src/app/services/material.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-videos',
  templateUrl: './videos.component.html',
  styleUrls: ['./videos.component.css','../../../svgstyle.css']
})
export class VideosComponent implements OnChanges {
  @Input()subjectId:number=-1;
  @Input()reloadvideo:boolean=false;

  tempvideos:material[]=[];
  videos:material[]=[];
  path:string='';
  constructor(private materialservice:MaterialService,private hostman:HostmanagerService) { }
  ngOnChanges(changes: SimpleChanges): void {
    if(this.subjectId!=null||this.reloadvideo==true){
      this.showVideos()
    }
  }  
  showVideos(){
    this.materialservice.getfilebysubject(this.subjectId,"videos").subscribe({
      next:(res:any)=>{
        if(res.length>0){
          this.videos=res;
          this.tempvideos=res;
          this.path=environment.imgeurl+this.tempvideos[0].path+"?t="+new Date().getTime();
        }
        else{
          this.videos=[]
          this.tempvideos=[]
        }
      }
    })
  }
  getfilterlist($event:any){
    this.tempvideos=this.videos.filter(p=>p.Name.includes($event.target.value));
  }
  openvideo(event:any){
    this.path=environment.imgeurl+this.tempvideos[event].path+"?t="+new Date().getTime();
  }
}
