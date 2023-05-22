import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TeacherRoutingModule } from './teacher-routing.module';
import { ProfileComponent } from './pages/profile/profile.component';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from './Layout/navbar/navbar.component';
import { TeacherComponent } from './teacher.component';
import { StudentsComponent } from './pages/students/students.component';
import { GradsComponent } from './pages/grads/grads.component';
import { MaterialsComponent } from './pages/materials/materials.component';
import { SchaduleComponent } from './pages/schadule/schadule.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { SidehostComponent } from './sidehost/sidehost.component';


@NgModule({
  declarations: [
    ProfileComponent,
    NavbarComponent,
    TeacherComponent,
    StudentsComponent,
    GradsComponent,
    MaterialsComponent,
    SchaduleComponent,
    SidehostComponent
  ],
  imports: [
    CommonModule,
    TeacherRoutingModule,
    FormsModule,
    SharedModule
  ]
})
export class TeacherModule { }
