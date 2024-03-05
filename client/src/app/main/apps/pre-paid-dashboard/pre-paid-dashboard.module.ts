import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrePaidDashboardRoutingModule } from './pre-paid-dashboard-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule, MatFormFieldModule, MatToolbarModule, MatPaginatorModule, MatListModule, MatDialogModule, MatProgressSpinnerModule, MatSelectModule, MatOptionModule, MatDatepickerModule, MatCardModule, MatGridListModule, MatBottomSheetModule, MatDividerModule, MatRadioModule, MatButtonToggleModule, MatIconModule, MatCheckboxModule, MatTabsModule, MatExpansionModule, MatAutocompleteModule } from '@angular/material';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { DsSidebarModule } from '@glits/components';
import { DsSharedModule } from '@glits/shared.module';
import { SharedModule } from 'app/main/shared/shared.module';
import { DxPieChartModule, DxDataGridModule, DxBulletModule, DxChartModule, DxTemplateModule, DxButtonModule, DxLinearGaugeModule } from 'devextreme-angular';
import { CrmModule } from '../crm/crm.module';
import { UploadFileService } from 'app/providers/s3/UploadFileService';
import { TransfereService } from 'app/providers/transfer/transfer.service';
import { PrepaidDashboardComponent } from './prepaid-dashboard/prepaid-dashboard.component';
import { AccountingLedgerComponent } from './accounting-ledger/accounting-ledger.component';
import { LmoWalletListComponent } from './lmo-wallet-list/lmo-wallet-list.component';
import { SharingReportComponent } from './sharing-report/sharing-report.component';
import { SuspendPendingListViewComponent } from './suspend-pending-list-view/suspend-pending-list-view.component';
import { ResumePendingListViewComponent } from './resume-pending-list-view/resume-pending-list-view.component';
import { PaymetWalletComponent } from './paymet-wallet/paymet-wallet.component';
import { LmoCreditWalletListComponent } from './lmo-credit-wallet-list/lmo-credit-wallet-list.component';
import { BasePackListComponent } from './base-pack-list/base-pack-list.component';

@NgModule({
  declarations: [PrepaidDashboardComponent, BasePackListComponent, LmoCreditWalletListComponent, AccountingLedgerComponent, LmoWalletListComponent, SharingReportComponent,SuspendPendingListViewComponent,ResumePendingListViewComponent,PaymetWalletComponent],
  imports: [
    CommonModule,
    PrePaidDashboardRoutingModule,CrmModule,MatInputModule, MatFormFieldModule, MatToolbarModule, MatPaginatorModule, MatListModule, MatDialogModule,
    MatProgressSpinnerModule, MatSelectModule,  DxPieChartModule,MatOptionModule, MatDatepickerModule, MatCardModule, MatGridListModule, MatBottomSheetModule, MatDividerModule,
    MatRadioModule, MatButtonToggleModule, MatIconModule, MatCheckboxModule, MatTabsModule,FormsModule, ReactiveFormsModule ,DsSharedModule,
    DsSidebarModule, SharedModule, MatExpansionModule, MatAutocompleteModule, 
    DxDataGridModule, DxBulletModule,DxChartModule, DxTemplateModule, DxButtonModule,
    DxLinearGaugeModule,  MatMomentDateModule
  ],
  providers : [ UploadFileService,TransfereService ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PrePaidDashboardModule { }
