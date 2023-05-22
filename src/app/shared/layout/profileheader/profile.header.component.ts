import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AuthserviceService } from 'src/app/services/authservice.service';

@Component({
  selector: 'profile-header',
  templateUrl: './profile.header.component.html',
  styleUrls: ['./profile.header.component.css']
})
export class ProfileHeaderComponent implements OnInit {
  @Output()toggleevent:EventEmitter<boolean>=new EventEmitter(false);
  constructor(private authservice:AuthserviceService){}
  ngOnInit(): void {

  }
  togglebtnfun(){
      this.toggleevent.emit();
  }
  logout(){
    this.authservice.logout('home');
  }
}
