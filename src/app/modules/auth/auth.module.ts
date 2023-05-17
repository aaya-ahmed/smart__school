import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { RegisterComponent } from './pages/register/register.component';
import { ChangepasswordComponent } from './pages/changepassword/changepassword.component';
import { LoginComponent } from './pages/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ForgetPasswordComponent } from './pages/forgetPassword/forgetPassword.component';
import { MessagerespnceComponent } from './pages/messagerespnce/messagerespnce.component';
import { HttpClientModule } from '@angular/common/http';
import { AuthserviceService } from '../../services/authservice.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { LayoutauthComponent } from './pages/layoutauth/layoutauth.component';

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    ChangepasswordComponent,
    ForgetPasswordComponent,
    MessagerespnceComponent,
    LayoutauthComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    SharedModule
  ],
  bootstrap:[    LayoutauthComponent  ]
})
export class AuthModule { }
