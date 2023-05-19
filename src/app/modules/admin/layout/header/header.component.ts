import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AuthserviceService } from 'src/app/services/authservice.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
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
