import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'teacher-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['../../../../styles/navsidestyle.css']
})
export class NavbarComponent {
  @Input()toggleflag:boolean=false;
  currentpage:string='profile'
  @Output()toggleview:EventEmitter<boolean>=new EventEmitter<boolean>(false);

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
  gotoschadule(pagename:string){
    let classid=localStorage.getItem('uid')?.replace(/"/g,'')||'';
    this.route.navigate(['teacher',pagename,classid]);
  }
  gottohome(){
    this.route.navigate(['']);
  }
  toggle(){
    this.toggleview.emit(true)
  }
}
