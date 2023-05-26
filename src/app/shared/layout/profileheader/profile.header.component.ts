import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AuthserviceService } from 'src/app/services/authservice.service';

@Component({
  selector: 'profile-header',
  templateUrl: './profile.header.component.html',
  styleUrls: ['./profile.header.component.css']
})
export class ProfileHeaderComponent implements OnInit {
  toggle=false
  @Output()toggleevent:EventEmitter<boolean>=new EventEmitter(false);
  constructor(private authservice:AuthserviceService){}
  ngOnInit(): void {

  }
  togglebtnfun(){
    this.toggle=!this.toggle
      this.toggleevent.emit( this.toggle);
  }
  logout(){
    this.authservice.logout('home');
  }
}
