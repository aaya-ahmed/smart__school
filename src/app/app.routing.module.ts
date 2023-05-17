import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
const routes: Routes = [
  {
    path:'',
    redirectTo:'home',
    pathMatch:'full'
  },
  {
    path:'home',
    loadChildren: () =>
            import('./modules/home/home.module').then(m => m.HomeModule)
  },
  {
    path:'auth',
    loadChildren: () =>
            import('./modules/auth/auth.module').then(m => m.AuthModule)
  },
  { path:'admin',
    loadChildren: () =>
            import('./modules/admin/admin.module').then(m => m.AdminModule) 
  },
  { path:'teacher',
    loadChildren: () =>
            import('./modules/teacher/teacher.module').then(m => m.TeacherModule) 
  },
  { path:'student',
    loadChildren: () =>
            import('./modules/student/student.module').then(m => m.StudentModule) 
  },
  { path:'parent',
    loadChildren: () =>
            import('./modules/parent/parent.module').then(m => m.ParentModule)
  }   
  // {
  //   path: '',
  //   redirectTo: '/auth/login',
  //   pathMatch: 'full'
  // },
  // {
  //   path: '',
  //   component: ContentLayoutComponent,
  //   canActivate: [NoAuthGuard], // Should be replaced with actual auth guard
  //   children: [
  //     {
  //       path: 'dashboard',
  //       loadChildren: () =>
  //         import('@modules/home/home.module').then(m => m.HomeModule)
  //     },
  //     {
  //       path: 'about',
  //       loadChildren: () =>
  //         import('@modules/about/about.module').then(m => m.AboutModule)
  //     },
  //     {
  //       path: 'contact',
  //       loadChildren: () =>
  //         import('@modules/contact/contact.module').then(m => m.ContactModule)
  //     }
  //   ]
  // },
  // {
  //   path: 'auth',
  //   component: AuthLayoutComponent,
  //   loadChildren: () =>
  //     import('@modules/auth/auth.module').then(m => m.AuthModule)
  // },
  // // Fallback when no prior routes is matched
  // { path: '**', redirectTo: '/auth/login', pathMatch: 'full' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule {}
