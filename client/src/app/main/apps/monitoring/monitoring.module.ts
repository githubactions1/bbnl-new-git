import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboradComponent } from './dashborad/dashborad.component';
import { MonitoringRoutingModule } from './monitoring-routing.module';
import { SharedModule } from 'app/main/shared/shared.module';
import { DsSharedModule } from '@glits/shared.module';
import { DxPieChartModule,DxDataGridModule,DxChartModule } from 'devextreme-angular';
import { DownOltsComponent } from './down-olts/down-olts.component';
import { MatSelectModule, MatIconModule, MatDatepickerModule, MatFormFieldModule, MatInputModule,MatButtonModule } from '@angular/material';
import { IptvLiveComponent } from './iptv-live/iptv-live.component';
import { HsiDashboardComponent } from './hsi-dashboard/hsi-dashboard.component';
import { VoipDashboardComponent } from './voip-dashboard/voip-dashboard.component';
import { DsSidebarModule } from '@glits/components';
import { HttpClientModule } from '@angular/common/http';
import { DegratedOltsComponent } from './degrated-olts/degrated-olts.component';
import { ComplaintsOverviewDashboardComponent } from './complaints-overview-dashboard/complaints-overview-dashboard.component';



@NgModule({
  declarations: [DashboradComponent, DownOltsComponent, IptvLiveComponent, HsiDashboardComponent, VoipDashboardComponent, DegratedOltsComponent, ComplaintsOverviewDashboardComponent],
  imports: [
    HttpClientModule,
    CommonModule,
    MonitoringRoutingModule,
    SharedModule,
    DsSharedModule,
    DxPieChartModule,
    DxDataGridModule,
    DxChartModule,
    MatSelectModule,
    MatIconModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    DsSidebarModule,
    MatButtonModule
  ]
})
export class MonitoringModule { }
