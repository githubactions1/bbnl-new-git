import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AgntpymntmodeComponent } from './master/Agntpymntmode/AgntPymntMode.component';
import { LmoPaymentsComponent } from './lmo-payments/lmo-payments.component';
import { BankStatementUploadComponent } from './bank-statement-upload/bank-statement-upload.component';
import { BankStatementDetailsComponent } from './bank-statement-details/bank-statement-details.component';
import { InvoiceGeneratorComponent } from './invoice-generator/invoice-generator.component';
import { ZTCFileCreationComponent } from './ztc-file-creation/ztc-file-creation.component';
import { CustomerWaveoffsComponent } from './customer-waveoffs/customer-waveoffs.component';
import { CustomerWaveoffApprovalsComponent } from './approvals/customer-waveoff-approvals/customer-waveoff-approvals.component';
import { PaymentApprovalsComponent } from './approvals/payment-approvals/payment-approvals.component';
import { PaymentCreditsComponent } from './payment-credits/payment-credits.component';
import { PaymentCreditApprovalComponent } from './approvals/payment-credit-approval/payment-credit-approval.component';
import { RevenueSharingComponent } from './revenue-sharing/revenue-sharing/revenue-sharing.component';
import { MonthlyInvoiceComponent } from './monthly-invoice/monthly-invoice.component';
import { PaymentsDashboardComponent } from './dashboard/payments-dashboard/payments-dashboard.component';
const routes: Routes = [
  { path     : 'lmo-payments',      component: LmoPaymentsComponent },
  { path     : 'agntpymntmode',     component: AgntpymntmodeComponent},
  { path     : 'bank-statement-upload',  component: BankStatementUploadComponent},
  { path     : 'bank-statement-details',  component: BankStatementDetailsComponent},
  { path     : 'invoice',  component: InvoiceGeneratorComponent},
  { path     : 'customer-waivers',  component: CustomerWaveoffsComponent},
  { path     : 'customer-waiver-approvals',  component: CustomerWaveoffApprovalsComponent},
  { path     : 'payment-approvals',  component: PaymentApprovalsComponent},
  { path     : 'payment-credits',  component: PaymentCreditsComponent},
  { path     : 'payment-credits-approvals',  component: PaymentCreditApprovalComponent},
  { path     : 'zerotouchfiles',  component: ZTCFileCreationComponent},
  { path     : 'revenue-sharing',  component: RevenueSharingComponent},
  { path     : 'payment-dashboard',  component: PaymentsDashboardComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BillingRoutingModule { }
