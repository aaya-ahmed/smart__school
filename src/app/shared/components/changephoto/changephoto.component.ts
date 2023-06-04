import { Component} from '@angular/core';
import { imagebase64 } from 'src/app/imageclass/image';
import { HostmanagerService } from 'src/app/services/hostmanager.service';

@Component({
  selector: 'app-changephoto',
  templateUrl: './changephoto.component.html',
  styleUrls: ['./changephoto.component.css','../../../styles/form.style.css']
})
export class ChangephotoComponent  {
  imageobj:imagebase64;
  image:any="";
  constructor(private hostman:HostmanagerService){
    this.imageobj=new imagebase64();
  }
  changephoto($event:any){
    if($event.target.files.length>0){
      var reader = new FileReader();
      reader.readAsDataURL($event.target.files[0]);
      reader.onload = (_event) => {
          this.imageobj.getBase64($event.target.files[0]).then(
            (data:any) => {
              this.image=data;

            });
      }
    }
  }
  save(){
    this.hostman.load({open:false,data:'',returndata:this.image.split(",").pop(),type:''})
  }
  close(){
    this.hostman.load({open:false,data:'',returndata:'',type:''})
  }
}
