import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MerchantsScRoutingModule } from './merchants-sc-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    MerchantsScRoutingModule
  ]
})
export class MerchantsScModule { }
