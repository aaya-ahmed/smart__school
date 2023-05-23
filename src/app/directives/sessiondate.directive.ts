import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[Sessiondate]'
})
export class SessiondateDirective implements OnInit{
  @Input() session:any[]=[];
  @Input() currentsession:any;
  @Input() currentDate:string='';
  constructor(private elementRef: ElementRef) { }
  ngOnInit(): void {
    let currentDate=new Date(this.currentDate).getTime();
    let index=this.session.findIndex((p:any)=>{ return new Date(p.scheduleDay).getTime()==currentDate&&p.sessionNo==this.currentsession});
    if(index!=-1){
     this.elementRef.nativeElement.innerHTML = `<p>Class ${this.session[index].className}</p>`;
     this.elementRef.nativeElement.style.backgroundColor='antiquewhite'
    }
    else{
      this.elementRef.nativeElement.innerHTML = '';
    }
  }

}
