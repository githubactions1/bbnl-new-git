import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MetricsRoutingModule } from './metrics-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MetricsStatusComponent } from './reports/metrics-status/metrics-status.component';
import { MetricsDetailsComponent } from './reports/metrics-details/metrics-details.component';

@NgModule({
  declarations: [DashboardComponent, MetricsStatusComponent, MetricsDetailsComponent],
  imports: [
    CommonModule,
    MetricsRoutingModule
  ]
})
export class MetricsModule { }
