import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'teacher-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  @Input()toggleflag:boolean=false;
  currentpage:string='profile'
  @Output()toggleevent:EventEmitter<boolean>=new EventEmitter(false);

  constructor(private route:Router){
    let index=route.url.lastIndexOf('/');
    this.currentpage=route.url.substring(index+1)
  }
  gottopage(pagename:string){
    this.route.navigate(['teacher',pagename]);
    this.currentpage=pagename;
    if(window.innerWidth<1000)
    this.toggleflag=!this.toggleflag;
  }
  gottohome(){
    this.route.navigate(['']);
  }
  togglebtnfun(){
    this.toggleflag=!this.toggleflag
    this.toggleevent.emit( this.toggleflag);
  }
}
