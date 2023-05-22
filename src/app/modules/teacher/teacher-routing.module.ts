import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TeacherComponent } from './teacher.component';
import { StudentsComponent } from './pages/students/students.component';
import { SchaduleComponent } from './pages/schadule/schadule.component';
import { GradsComponent } from './pages/grads/grads.component';
import { MaterialsComponent } from './pages/materials/materials.component';

const routes: Routes = [
  {
    path:'',
    component:TeacherComponent,
    children:[
      {
        path:'',
        component:StudentsComponent
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
