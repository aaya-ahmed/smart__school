import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-scadules',
  templateUrl: './scadules.component.html',
  styleUrls: ['./scadules.component.css']
})
export class ScadulesComponent implements OnChanges {
  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes)
  }
  @Input()schadule:any;
}
