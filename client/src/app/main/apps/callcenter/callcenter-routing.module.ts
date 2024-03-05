import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IndividualCustomerComponent } from './individual-customer/individual-customer.component';

const routes: Routes = [
  { path: 'customers', component: IndividualCustomerComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class CallcenterRoutingModule { }
