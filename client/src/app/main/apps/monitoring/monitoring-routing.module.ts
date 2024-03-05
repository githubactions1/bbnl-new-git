import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboradComponent } from './dashborad/dashborad.component';
import { DownOltsComponent } from './down-olts/down-olts.component';
import { IptvLiveComponent } from './iptv-live/iptv-live.component';
import { HsiDashboardComponent } from './hsi-dashboard/hsi-dashboard.component';
import { VoipDashboardComponent } from './voip-dashboard/voip-dashboard.component';
import { DegratedOltsComponent } from './degrated-olts/degrated-olts.component';
import { ComplaintsOverviewDashboardComponent } from './complaints-overview-dashboard/complaints-overview-dashboard.component';

const routes: Routes = [
    { path: 'dashboard', component: DashboradComponent },
    { path: 'down_OLTS', component: DownOltsComponent },
    { path: 'degrated_OLTS', component: DegratedOltsComponent},
    {path:'iptv_live_ststus', component:IptvLiveComponent},
    {path:'hsi_usage', component:HsiDashboardComponent},
    {path:'voip_usage', component:VoipDashboardComponent},
	{ path: 'complaints_overview', component: ComplaintsOverviewDashboardComponent}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class MonitoringRoutingModule { }
  