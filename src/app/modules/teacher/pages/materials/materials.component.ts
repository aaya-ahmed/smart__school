import { Component, EventEmitter, Output } from '@angular/core';
import { MaterialService } from 'src/app/services/material.service';
import { SubjectService } from 'src/app/services/subject.service';
import { TeacherService } from 'src/app/services/teacher.service';
export class ProfileExtraData {
  public data: any
  public file: any
}
@Component({
  selector: 'app-materials',
  templateUrl: './materials.component.html',
  styleUrls: ['./materials.component.css']
})
export class MaterialsComponent {
  fullData= new ProfileExtraData();
  teacher:any;
  type:string='video';
  meesage:string='';
  typemessage:string='';
  constructor(private teacherservice:TeacherService,private materialservice:MaterialService) { }
  ngOnInit() {
    let id=localStorage.getItem('uid')?.replace(/"/g,'')||'';
    this.teacherservice.getbyidentity(id).subscribe({
      next:res=>{
        this.teacher=res;
      }
    })
  }
  getvideos(){
    this.type='video';

  }
  getdocument(){
    this.type='document';

  }
  uploadFile(event:any){
    let files=event.target.files;
    if(files.length>0&&(files[0].type=='video/mp4'||files[0].type=='application/pdf')) {
    this.fullData.file = <File>files[0];
     this.fullData.data={Type:"Video",SubjectId:this.teacher.subjectId}
     this.meesage=""
    }
    else{
      this.meesage="file must be mp4 or pdf"
      this.reset()
    }
  }
  save(){
    
    let formData= new FormData();    
    formData.append('file',this.fullData.file, this.fullData.file.name);
    formData.append('SubjectId',this.teacher.subjectId);
    if(this.fullData.file.type.includes('video')){
      formData.append('Type',"Videos");
    }
    if(this.fullData.file.type.includes('application/pdf')){
      formData.append('Type',"Documents");
    }
    this.materialservice.postfile(formData)
      .subscribe({
        next:res=> {
          this.typemessage="success";
          this.reset();
        },
      error:err=>{
        this.typemessage="falied";
        this.reset();
      }
    });
    }
    reset(){
      let timer=setTimeout(() => {
        this.fullData.data='';
        this.fullData.file='';
        this.typemessage="";
        this.meesage=''
      }, 1000);
    }

}
