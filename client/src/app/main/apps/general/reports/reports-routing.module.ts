import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReportsComponent } from './reports.component';
import { CustomReportBldrComponent } from './builders/custom-report-bldr/custom-report-bldr.component';
import { MonthlyReportBldrComponent } from './builders/monthly-report-bldr/monthly-report-bldr.component';
import { CustomReportComponent } from './viewers/custom-report/custom-report.component';
import { MonthlyReportComponent } from './viewers/monthly-report/monthly-report.component';
import { LoginInfoComponent } from './login-info/login-info.component';

const routes: Routes = [
  { path: '', component: ReportsComponent,  pathMatch : 'full' }, 
  { path: 'custom/:rptid', component: CustomReportComponent , pathMatch : 'full'}, 
  // { path: 'custom-monthly/:rptid', component: MonthlyReportComponent , pathMatch : 'full'},
  { path: 'builder/custom', component: CustomReportBldrComponent , pathMatch : 'full'}, 
  { path: 'builder/monthly', component: MonthlyReportBldrComponent, pathMatch : 'full' },
  { path: 'login_info', component: LoginInfoComponent },
  { path: '**', redirectTo : '' }
]

@NgModule({
  declarations: [
  ],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportsRoutingModule { }
