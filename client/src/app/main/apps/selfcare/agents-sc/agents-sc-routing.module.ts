import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { CustomerComponent } from './master/customer/customer.component';
import { EntCustomerComponent } from './master/ent-customer/ent-customer.component';
import { PaymentsComponent } from './billing/payments/payments.component';
import { CollectionComponent } from './billing/collection/collection.component';
import { SubstationRequestComponent } from './olt/substation-request/substation-request.component';
import { PortSplitingComponent } from './olt/port-spliting/port-spliting.component';

import { CafSuspensionComponent } from './operations/caf-suspension/caf-suspension.component';
import { CafBoxChangeComponent } from './operations/caf-box-change/caf-box-change.component';
import { CafPonChangeComponent } from './operations/caf-pon-change/caf-pon-change.component';
import { PackageAggrementComponent } from './package-aggrement/package-aggrement.component';
import { RevenueSharingComponent } from './billing/revenue-sharing/revenue-sharing.component';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { CafTerminationComponent } from './operations/caf-termination/caf-termination.component';
import { CafAddtoTerminationComponent } from './operations/caf-termination/caf-addto-termination/caf-addto-termination.component';
import { CafTerminationApprovalsComponent } from './operations/approvals/caf-termination-approvals/caf-termination-approvals.component';
import { CafDoubleBoxChangeComponent } from './operations/caf-double-box-change/caf-double-box-change.component';
import { PonWiseCafComponent } from './olt/pon-wise-caf/pon-wise-caf.component';
import { MonthlyInvoiceComponent } from './billing/monthly-invoice/monthly-invoice.component';
import { MarketManagerTerminationApprovalComponent } from './operations/approvals/market-manager-termination-approval/market-manager-termination-approval.component';
import { MsodashboardComponent } from './msodashboard/msodashboard.component';
import { BbnlCustomerComponent } from './master/bbnl-customer/bbnl-customer.component';
import { EntCafSuspensionComponent } from './operations/ent-caf-suspension/ent-caf-suspension.component';
import { GoiCustomerComponent } from './master/goi-customer/goi-customer.component';
const routes: Routes = [
   { path: 'customers/indivudual', component: CustomerComponent },
   { path: 'customers/enterprise', component: EntCustomerComponent },
   { path: 'customers/bbnl-customer', component: BbnlCustomerComponent },
   { path: 'customers/goi-customer', component: GoiCustomerComponent },
   { path: 'operations/suspend', component: CafSuspensionComponent },
   { path: 'operations/box-change', component: CafBoxChangeComponent },
   { path: 'operations/box-double-change', component: CafDoubleBoxChangeComponent},
   { path: 'operations/pon-change', component: CafPonChangeComponent },
   { path: 'operations/ent-suspend', component: EntCafSuspensionComponent },
   { path: 'operations/termination', component: CafTerminationComponent },
   { path: 'operations/caf/termination', component: CafAddtoTerminationComponent },
   { path: 'operations/caf/termination/approval', component: CafTerminationApprovalsComponent },
   { path: 'profile', component: MyProfileComponent },
   { path: 'olt/port-spliting', component: PortSplitingComponent },
   { path: 'olt/serving-areas', component: SubstationRequestComponent },
   { path: 'package-agreement', component: PackageAggrementComponent },
   { path: 'billing/collection', component: CollectionComponent },
   { path: 'billing/payments-apsfl', component: PaymentsComponent },
   { path: 'billing/revenue-sharing', component: RevenueSharingComponent },
   { path: 'lmo/dashboard', component: DashboardComponent },
   { path: 'olt/pon-wise-caf', component: PonWiseCafComponent },
   { path: 'billing/monthly-invoice', component: MonthlyInvoiceComponent },
   { path: 'MsoDashbord', component: MsodashboardComponent },
   { path: 'operations/termination/approval', component: MarketManagerTerminationApprovalComponent } 
   ];

// Customer > Individual   sc/agent/customers/indivudual
// Customer > Enterpriese  sc/agent/customers/enterprise
// Billing > Payments to APSFL sc/agent/billing/payments-apsfl
// Billing > Collection  sc/agent/billing/collection
// Billing > Revenue Sharing sc/agent/billing/revenue-sharing
// Billing > Package Agreement sc/agent/package-Agreement
// OLT >  Serving Areas  sc/agent/olt/serving-areas
// OLT > Port Spliting sc/agent/olt/port-spliting
// Operations > Box Change sc/agent/operations/box-change
// Operations > PON Change sc/agent/operations/pon-change
// Operations > Suspentions sc/agent/operations/suspend
// Profile  sc/agent/profile



@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AgentsScRoutingModule { }
