
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ResumeLegaComponent } from './resume-lega.component';
import { GironeDetailComponent } from './girone-detail/girone-detail.component';
import { ClubDetailComponent } from './club-detail/club-detail.component';

const routes: Routes = [
  { path: '', component: ResumeLegaComponent },
  { path: 'girone-detail/:letter', component: GironeDetailComponent },
  { path: 'club-detail/:id', component: ClubDetailComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ResumeLegaRoutingModule {}
