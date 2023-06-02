import { Component } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['../../styles/framemodule.css']
})
export class AdminComponent {
  toggle:boolean=false;

  toggleview(){
    this.toggle=!this.toggle;

  }
}
