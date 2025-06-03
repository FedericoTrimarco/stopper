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



/* import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'serie-d',
    loadComponent: () =>
      import('./layouts/resume/resume-lega/resume-lega.component').then(m => m.ResumeLegaComponent)
  },
  {
    path: 'girone/:letter',
    loadComponent: () =>
      import('./layouts/resume/resume-lega/girone-detail/girone-detail.component').then(m => m.GironeDetailComponent)
  },
  {
    path: 'squadra/:id',
    loadComponent: () =>
      import('./layouts/resume/resume-lega/club-detail/club-detail.component').then(m => m.ClubDetailComponent)
  },
  {
    path: '',
    redirectTo: 'serie-d',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'serie-d'
  }
]; */


