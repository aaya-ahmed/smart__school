import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { ProfileComponent } from './pages/profile/profile.component';
import { GradeyearComponent } from './pages/gradeyear/gradeyear.component';
import { GradeyearformComponent } from './pages/gradeyear/gradeyearform/gradeyearform.component';
import { NavbarComponent } from './layout/navbar/navbar.component';
import { AdminComponent } from './admin.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RequestsComponent } from './pages/requests/requests.component';
import { RequestdetailsComponent } from './pages/requests/requestdetails/requestdetails.component';
import { SidehostComponent } from './sidehost/sidehost.component';
import { DynamicloaderDirective } from 'src/app/directives/dynamicloader.directive';
import { SubjectsComponent } from './pages/subjects/subjects.component';
import { SubjectformComponent } from './pages/subjects/subjectform/subjectform.component';
import { TeachersComponent } from './pages/teachers/teachers.component';
import { StudentsComponent } from './pages/students/students.component';
import { ComplainsComponent } from './pages/complains/complains.component';
import { TeacherformComponent } from './pages/teachers/teacherform/teacherform.component';
import { ClassroomComponent } from './pages/classroom/classroom.component';
import { ClassroomformComponent } from './pages/classroom/classroomform/classroomform.component';
import { SchaduleComponent } from './pages/schadule/schadule.component';
import { SchaduleformComponent } from './pages/schadule/schaduleform/schaduleform.component';
import { ScadulesComponent } from './pages/schadule/scadules/scadules.component';
import { AttandanceComponent } from './pages/teachers/attandance/attandance.component';
import { ModifyComponent } from './pages/students/modify/modify.component';
import { TeacherDetailsComponent } from './pages/teachers/teacherDetails/teacher.details.component';
import { DetailsComponent } from './pages/students/details/details.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    ProfileComponent,
    GradeyearComponent,
    GradeyearformComponent,
    AdminComponent,
    NavbarComponent,
    RequestsComponent,
    RequestdetailsComponent,
    SidehostComponent,
    SubjectsComponent,
    SubjectformComponent,
    TeachersComponent,
    StudentsComponent,
    ComplainsComponent,
    TeacherformComponent,
    ClassroomComponent,
    ClassroomformComponent,
    SchaduleComponent,
    SchaduleformComponent,
    ScadulesComponent,
    AttandanceComponent,
    DetailsComponent,
    TeacherDetailsComponent,
    ModifyComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule
  ],
  bootstrap:[AdminComponent]
})
export class AdminModule { }
