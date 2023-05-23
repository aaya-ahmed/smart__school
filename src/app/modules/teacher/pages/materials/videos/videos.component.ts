import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { material } from 'src/app/data/material';
import { HostmanagerService } from 'src/app/services/hostmanager.service';
import { MaterialService } from 'src/app/services/material.service';

@Component({
  selector: 'app-videos',
  templateUrl: './videos.component.html',
  styleUrls: ['./videos.component.css','../../../../../svgstyle.css']
})
export class VideosComponent implements OnChanges {
  @Input()subjectId:number=-1;
  videos:material[]=[];
  constructor(private materialservice:MaterialService,private hostman:HostmanagerService) { }
  ngOnChanges(changes: SimpleChanges): void {
    if(this.subjectId!=null){
      this.showVideos()
    }
  }  
  showVideos(){
    this.materialservice.getfilebysubject(this.subjectId,"videos").subscribe({
      next:(res:any)=>{
        this.videos=res;
        console.log(this.videos)
    }
    })
  }
  openvideo(event:any){
    console.log(event)
    this.hostman.load({data: {type2:event.type2,path:event.path},open:true,returndata:'',type:'video'})
  }
}
