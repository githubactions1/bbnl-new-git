import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MatIconModule, MatSelectModule, MatCardModule, MatButtonToggleModule, MatTabsModule } from '@angular/material';
import { SharedModule } from 'app/main/shared/shared.module';
import { DsSharedModule } from '@glits/shared.module';
import { DsSidebarModule } from '@glits/components';
import { AgentDashboardComponent } from './dashboard/agent-dashboard/agent-dashboard.component';
import { DxDataGridModule,  DxBulletModule, DxTemplateModule, DxButtonModule, DxChartModule, DxNumberBoxModule,
  DxCheckBoxModule, DxSelectBoxModule, DxTabPanelModule, DxTooltipModule } from 'devextreme-angular';
// import { HomeComponent } from './home/home.component';
import { ManagerialComponent } from './dashboard/managerial/managerial.component';
import { MarketingOperationalComponent } from './dashboard/marketing-operational/marketing-operational.component';
import { MarketingFinancialComponent } from './dashboard/marketing-financial/marketing-financial.component';
import { InternetLeasedComponent } from './dashboard/internet-leased/internet-leased.component';
import { BbnlDashboardComponent } from './dashboard/bbnl-dashboard/bbnl-dashboard.component';
// import { EnterpriseCustomerProfileComponent } from '../caf/master/enterpriese-customers/enterprise-customer-profile/enterprise-customer-profile.component';

@NgModule({
  declarations: [DashboardComponent, AgentDashboardComponent, ManagerialComponent, MarketingOperationalComponent, MarketingFinancialComponent, InternetLeasedComponent, BbnlDashboardComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MatIconModule,
    MatSelectModule,
    SharedModule,
    DsSharedModule,
    DsSidebarModule,
    MatCardModule,
    DxDataGridModule,
    DxTemplateModule,
    DxBulletModule, 
    DxButtonModule,
    DxChartModule,
    DxTooltipModule,
    MatButtonToggleModule,
    MatTabsModule 
  ]
})
export class HomeModule { }
