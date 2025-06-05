import { Routes } from '@angular/router';
import { ResumeComponent } from './layouts/resume/resume.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'resume',
    pathMatch: 'full',
  }, {
    path: '',
    component: ResumeComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('../app/layouts/resume/resume.module').then(r => r.ResumeModule),
      }
    ]
  }
 
];


