import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { CustomersComponent } from './customers/customers.component';
import { EnterpriseCustomerComponent } from './EnterpriseCustomer/enterprise-customer.component';
// import { CustomerDshbrdComponent } from './dashboard/customer-dshbrd/customer-dshbrd.component';
import { CustomerProfileComponent } from './customers/customer-profile/customer-profile.component';
import { EnterpriseCustomerProfileComponent } from './EnterpriseCustomer/enterprise-customer-profile/enterprise-customer-profile.component';
import { CustomerFormComponent } from './customers/customer-form/customer-form.component';
import { ZTCFileCreationComponent } from '../billing/ztc-file-creation/ztc-file-creation.component';
import { ImsModificationComponent } from './customers/ims-modification/ims-modification.component'; 
//import { BbnlComponent } from './customers/bbnl/bbnl.component';
//import { BbnlAlertsComponent } from './customers/bbnl-alerts/bbnl-alerts.component';
//import { BbnlBandwidthComponent } from './customers/bbnl-bandwidth/bbnl-bandwidth.component';
//import { BbnlSlaComponent } from './customers/bbnl-sla/bbnl-sla.component';
import { AppAlacarteComponent } from './customers/app-alacarte/app-alacarte.component';
import { CafSpndDtlsComponent } from './customers/caf-spnd-dtls/caf-spnd-dtls.component';

const routes: Routes = [
   { path: '', component: DashboardComponent },
   { path: 'customers', component: CustomersComponent },
   { path: 'ent-customers', component: EnterpriseCustomerComponent },
   { path: 'customer/profile', component: CustomerProfileComponent },
   { path: 'customer/form', component: CustomerFormComponent },
   { path: 'enterprise/customer_page', component: EnterpriseCustomerProfileComponent },
   { path: 'billing/zerotouchfiles', component: ZTCFileCreationComponent },
   { path: 'ims/modification', component: ImsModificationComponent},
   //{ path: 'bbnl-inventroy', component:BbnlComponent},
   //{ path: 'bbnl-alerts', component:BbnlAlertsComponent},
   //{ path: 'bbnl-sla', component:BbnlSlaComponent},
   //{ path: 'bbnl-bandwidth', component:BbnlBandwidthComponent},
   { path: 'app-alacarte', component:AppAlacarteComponent},
   { path: 'caf-sus-rsme-dtls', component:CafSpndDtlsComponent},
   { path: '*', component: DashboardComponent }
   ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class CrmRoutingModule { constructor(){  console.log("In CrmRoutingModule") }  }
