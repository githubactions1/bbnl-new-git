import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { JobsComponent } from './jobs/jobs.component';

const routes: Routes = [
   { path: '', component: DashboardComponent },
   { path: '*', component: DashboardComponent },
   { path: 'batchjobs', component: JobsComponent }
   ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BatchRoutingModule { }
