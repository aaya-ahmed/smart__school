import { Component } from '@angular/core';

@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styleUrls: ['../../styles/framemodule.css']
})
export class ParentComponent {
  toggle:boolean=true;

  toggleview($event:any){
    this.toggle=$event;
  }
}
