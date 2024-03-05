import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { AgentDashboardComponent } from './dashboard/agent-dashboard/agent-dashboard.component';
// import { HomeComponent } from './home/home.component';
import { ManagerialComponent } from './dashboard/managerial/managerial.component';
import { MarketingOperationalComponent } from './dashboard/marketing-operational/marketing-operational.component';
import { MarketingFinancialComponent } from './dashboard/marketing-financial/marketing-financial.component';
import { InternetLeasedComponent } from './dashboard/internet-leased/internet-leased.component';
import { BbnlDashboardComponent } from './dashboard/bbnl-dashboard/bbnl-dashboard.component';
// import { EnterpriseCustomerProfileComponent } from '../caf/master/enterpriese-customers/enterprise-customer-profile/enterprise-customer-profile.component';

const routes: Routes = [
   { path: '', component: DashboardComponent },
   { path: 'agentdshbrd', component: AgentDashboardComponent},
   { path: 'dashboard', component: ManagerialComponent},
  //  { path: 'ent-dashboard/AP-RAITHU-BAROSA-200000899', component: EnterpriseCustomerProfileComponent},
   { path: 'marketing/dashboard', component: MarketingOperationalComponent},
   { path: 'marketing/bbnldashboard', component: BbnlDashboardComponent},
   { path: 'marketing/finance', component: MarketingFinancialComponent},
   { path: 'illdshbrd', component: InternetLeasedComponent},
   { path: '*', component: DashboardComponent }
   ];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
