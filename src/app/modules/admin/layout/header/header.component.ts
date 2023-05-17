import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  togglebtn:boolean=true;
  @Output()toggleevent:EventEmitter<boolean>=new EventEmitter(false);
  ngOnInit(): void {
    if(window.innerWidth>800)
      this.togglebtn=false;
    else
      this.togglebtn=true;
    this.toggleevent.emit(this.togglebtn);
  }
  togglebtnfun($event:any){
    console.log($event)
    this.togglebtn=$event.target.checked==true?true:false;
    console.log(this.togglebtn)
    this.toggleevent.emit(this.togglebtn);
  }
  logout(){}
}
