import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VideosComponent } from './videos/videos.component';
import { DocumentsComponent } from './documents/documents.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from 'src/app/interceptor/auth.interceptor';



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
  ],
  providers:[{provide:HTTP_INTERCEPTORS,useClass:AuthInterceptor,multi:true}]

})
export class MaterialModule { }
