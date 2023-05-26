import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SonComponent } from './pages/son/son.component';
import { ExamresultComponent } from './pages/examresult/examresult.component';
import { ComplainComponent } from './pages/complain/complain.component';
import { UpdateProfileComponent } from './pages/update-profile/update-profile.component';
import { ParentComponent } from './parent.component';
import { SchaduleComponent } from 'src/app/shared/components/schadule/schadule.component';
import { ChangepasswordComponent } from '../auth/pages/changepassword/changepassword.component';

const routes: Routes = [
  {
    path:'',
    component:ParentComponent,
    children:[
      {
        path:'',
        component:SonComponent
      },
      {
        path:'myson',
        component:SonComponent
      },
      {
        path:'result',
        component:ExamresultComponent
      },
      {
        path:'schadule/:id',
        component:SchaduleComponent
      },
      {
        path:'complain',
        component:ComplainComponent
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
export class ParentRoutingModule { }
