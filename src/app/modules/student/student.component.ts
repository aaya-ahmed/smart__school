import { Component } from '@angular/core';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent {
  toggle:boolean=true;

  toggleview($event:any){
    this.toggle=$event;
  }
}
