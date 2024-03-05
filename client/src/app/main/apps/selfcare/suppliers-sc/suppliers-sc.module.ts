import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SuppliersScRoutingModule } from './suppliers-sc-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    SuppliersScRoutingModule
  ]
})
export class SuppliersScModule { }
