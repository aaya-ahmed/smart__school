import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentComponent } from './student.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { GradComponent } from './pages/grad/grad.component';
import { MaterialComponent } from './pages/material/material.component';
import { SchaduleComponent } from 'src/app/shared/components/schadule/schadule.component';
import { ChangepasswordComponent } from '../auth/pages/changepassword/changepassword.component';

const routes: Routes = [
  {
    path:'',
    component:StudentComponent,
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
        path:'schadule',
        component:SchaduleComponent
      },
      {
        path:'grad',
        component:GradComponent
      },
      {
        path:'material',
        component:MaterialComponent
      }
      ,
      {
        path:'changepassword',
        component:ChangepasswordComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentRoutingModule { }
