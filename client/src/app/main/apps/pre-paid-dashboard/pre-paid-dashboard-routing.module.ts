import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from '../crm/dashboard/dashboard.component';
import { AccountingLedgerComponent } from './accounting-ledger/accounting-ledger.component';
import { LmoWalletListComponent } from './lmo-wallet-list/lmo-wallet-list.component';
import { PaymetWalletComponent } from './paymet-wallet/paymet-wallet.component';
import { PrepaidDashboardComponent } from './prepaid-dashboard/prepaid-dashboard.component';
import { ResumePendingListViewComponent } from './resume-pending-list-view/resume-pending-list-view.component';
import { SharingReportComponent } from './sharing-report/sharing-report.component';
import { SuspendPendingListViewComponent } from './suspend-pending-list-view/suspend-pending-list-view.component';
import { LmoCreditWalletListComponent } from './lmo-credit-wallet-list/lmo-credit-wallet-list.component';
import { BasePackListComponent } from './base-pack-list/base-pack-list.component';

const routes: Routes = [
    { path : '', component: DashboardComponent },
    { path : 'pre_paid_dashboard', component: PrepaidDashboardComponent },
    { path : 'accountledger', component: AccountingLedgerComponent },
    { path : 'lmowalletlist', component: LmoWalletListComponent },
	{ path : 'lmoCreditwalletlist', component: LmoCreditWalletListComponent },
    { path : 'sharingreport', component: SharingReportComponent },
    { path : 'suspend_pending_list' ,component: SuspendPendingListViewComponent},
    { path : 'resume_pending_list' ,component: ResumePendingListViewComponent},
    { path : 'wallet_payment', component: PaymetWalletComponent },
	{ path : 'basepacklistview', component: BasePackListComponent },
    { path : '*', component: DashboardComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrePaidDashboardRoutingModule { }
