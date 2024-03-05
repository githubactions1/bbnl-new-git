import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MerchantsRoutingModule } from './merchants-routing.module';
import { MerchantsComponent } from './master/merchants/merchants.component';
import { MerchantCategoryComponent } from './master/merchant-category/merchant-category.component';
import { MerchantTypeComponent } from './master/merchant-type/merchant-type.component';
import { MerchantGroupsComponent } from './master/merchant-groups/merchant-groups.component';
import { DashboardComponent } from './dashboard/dashboard.component';

@NgModule({
  declarations: [MerchantsComponent, MerchantCategoryComponent, MerchantTypeComponent, MerchantGroupsComponent, DashboardComponent],
  imports: [
    CommonModule,
    MerchantsRoutingModule
  ]
})
export class MerchantsModule { }
