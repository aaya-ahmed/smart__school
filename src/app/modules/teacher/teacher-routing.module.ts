import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TeacherComponent } from './teacher.component';
import { StudentsComponent } from './pages/students/students.component';
import { GradsComponent } from './pages/grads/grads.component';
import { MaterialsComponent } from './pages/materials/materials.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { SchaduleComponent } from 'src/app/shared/components/schadule/schadule.component';

const routes: Routes = [
  {
    path:'',
    component:TeacherComponent,
    children:[
      {
        path:'',
        component:ProfileComponent
      },
      {
        path:'profile',
        component:ProfileComponent
      },
      {
        path:'student',
        component:StudentsComponent
      },
      {
        path:'schadule',
        component:SchaduleComponent
      },
      {
        path:'grad',
        component:GradsComponent
      },
      {
        path:'material',
        component:MaterialsComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeacherRoutingModule { }
