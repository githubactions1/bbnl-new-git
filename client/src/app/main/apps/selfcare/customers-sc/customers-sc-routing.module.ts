import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { CustomersInvoiceComponent } from './customers-invoice/customers-invoice.component';
import { CustomersInvoiceViewComponent } from './customers-invoice-view/customers-invoice-view.component';
import { CallHstryComponent } from './call-hstry/call-hstry.component'


const routes: Routes = [
   { path: '', component: DashboardComponent },
   { path: 'invoice', component: CustomersInvoiceComponent },
   { path: 'invoice/download', component: CustomersInvoiceViewComponent },
   { path: 'call-history', component: CallHstryComponent },
   ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomersScRoutingModule { }
