import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VideosComponent } from './videos/videos.component';
import { DocumentsComponent } from './documents/documents.component';



@NgModule({
  declarations: [
    VideosComponent,
    DocumentsComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[
    VideosComponent,
    DocumentsComponent
  ]
})
export class MaterialModule { }
