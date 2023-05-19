import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './layout/navbar/navbar.component';
import { FooterComponent } from './layout/footer/footer.component';
import { ConfirmComponent } from './components/confirm/confirm.component';



@NgModule({
  declarations: [NavbarComponent,FooterComponent, ConfirmComponent],
  imports: [
    CommonModule
  ],
  exports:[NavbarComponent,FooterComponent]

})
export class SharedModule { }
