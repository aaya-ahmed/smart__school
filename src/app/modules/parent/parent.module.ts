import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ParentRoutingModule } from './parent-routing.module';
import { ComplainComponent } from './pages/complain/complain.component';
import { UpdateProfileComponent } from './pages/update-profile/update-profile.component';
import { SonComponent } from './pages/son/son.component';
import { ExamresultComponent } from './pages/examresult/examresult.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavbarComponent } from './Layout/navbar/navbar.component';
import { ParentComponent } from './parent.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { AuthModule } from '../auth/auth.module';


@NgModule({
  declarations: [
    ComplainComponent,
    UpdateProfileComponent,
    SonComponent,
    ExamresultComponent,
    NavbarComponent,
    ParentComponent,

  ],
  imports: [
    CommonModule,
    ParentRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    AuthModule

  ]
})
export class ParentModule { }
