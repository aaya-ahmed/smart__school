import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './layout/navbar/navbar.component';
import { FooterComponent } from './layout/footer/footer.component';
import { ConfirmComponent } from './components/confirm/confirm.component';
import { MessagerespnceComponent } from './components/messagerespnce/messagerespnce.component';
import { ProfileHeaderComponent } from './layout/profileheader/profile.header.component';
import { DynamicloaderDirective } from '../directives/dynamicloader.directive';
import { SessiondateDirective } from '../directives/sessiondate.directive';
import { ChangephotoComponent } from './components/changephoto/changephoto.component';
import { SchaduleComponent } from './components/schadule/schadule.component';



@NgModule({
  declarations: [NavbarComponent,
                 FooterComponent,
                 DynamicloaderDirective,
                 SessiondateDirective,
                 SchaduleComponent,
                 ChangephotoComponent,
                 ConfirmComponent,
                 MessagerespnceComponent,
                 ProfileHeaderComponent],
  imports: [
    CommonModule
  ],
  exports:[NavbarComponent,
           FooterComponent, 
           DynamicloaderDirective,
           SessiondateDirective,
           SchaduleComponent,
           ChangephotoComponent,
           MessagerespnceComponent,
           ProfileHeaderComponent]

})
export class SharedModule { }
