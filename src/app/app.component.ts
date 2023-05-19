import { Component, HostListener, OnInit} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  ngOnInit(): void {
    window.onunload = () => {
      let exp=localStorage.getItem('schoolexp')||'';
      const now = Math.floor(Date.now() / 1000)
      if(now>+exp){
        localStorage.removeItem('schooltoken');
        localStorage.removeItem('schoolexp');
      }

   }
  }

}
