import { Component } from '@angular/core';

@Component({
  selector: 'app-teacher',
  templateUrl: './teacher.component.html',
  styleUrls: ['../../styles/framemodule.css']
})
export class TeacherComponent {
  toggle:boolean=false;

  toggleview(event:any){
    this.toggle=event;

  }
}
