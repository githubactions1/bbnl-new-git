import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExportService } from 'app/main/services/export.service';
import { BillingRoutingModule } from './billing-routing.module';
import { InvoiceGeneratorComponent } from './invoice-generator/invoice-generator.component';
import { OperatorPaymentsComponent } from './operator-payments/operator-payments.component';
import { LmoPaymentsComponent } from './lmo-payments/lmo-payments.component';
import {  MatButtonModule, MatDividerModule, MatFormFieldModule, MatIconModule, MatMenuModule, MatSelectModule, MatTabsModule, MatCardModule, 
          MatGridListModule, MatRadioModule, MatSidenavModule, MatButtonToggleModule, MatInputModule, MatOptionModule, MatCheckboxModule, 
          MatProgressSpinnerModule, MatDatepickerModule, MatNativeDateModule, MatAutocompleteModule,
          MatDialogModule, MatPaginatorModule, MatToolbarModule, MatListModule, MatSnackBarModule, MatSlideToggleModule, MatTooltipModule } from '@angular/material';
import { DsSharedModule } from '@glits/shared.module';
import { SharedModule } from 'app/main/shared/shared.module';
import { MaterialModuleList } from '../material.module';
import { DxDataGridModule,  DxBulletModule, DxTemplateModule, DxButtonModule, DxChartModule, DxTooltipModule  } from 'devextreme-angular';
import { AgntpymntmodeComponent } from './master/Agntpymntmode/AgntPymntMode.component';
import { BankStatementUploadComponent } from './bank-statement-upload/bank-statement-upload.component';
import { BankStatementDetailsComponent } from './bank-statement-details/bank-statement-details.component';
import { CustomerWaveoffsComponent } from './customer-waveoffs/customer-waveoffs.component';
import { DsSidebarModule } from '@glits/components';
import { CustomerWaveoffApprovalsComponent } from './approvals/customer-waveoff-approvals/customer-waveoff-approvals.component';
import { PaymentApprovalsComponent } from './approvals/payment-approvals/payment-approvals.component';
import { PaymentCreditsComponent } from './payment-credits/payment-credits.component';
import { PaymentCreditApprovalComponent } from './approvals/payment-credit-approval/payment-credit-approval.component';
import { ZTCFileCreationComponent } from './ztc-file-creation/ztc-file-creation.component';
import { RevenueSharingComponent } from './revenue-sharing/revenue-sharing/revenue-sharing.component';
import { MonthlyInvoiceComponent } from './monthly-invoice/monthly-invoice.component';
import { PaymentsDashboardComponent } from './dashboard/payments-dashboard/payments-dashboard.component';

@NgModule({
  declarations: [InvoiceGeneratorComponent, OperatorPaymentsComponent, PaymentApprovalsComponent, LmoPaymentsComponent,AgntpymntmodeComponent, 
    BankStatementUploadComponent, BankStatementDetailsComponent, CustomerWaveoffsComponent, CustomerWaveoffApprovalsComponent, PaymentCreditsComponent, PaymentCreditApprovalComponent, ZTCFileCreationComponent, RevenueSharingComponent, MonthlyInvoiceComponent, PaymentsDashboardComponent],
  imports: [
    CommonModule,
    BillingRoutingModule,
    MatButtonModule, MatDividerModule, MatFormFieldModule, MatIconModule, MatMenuModule, MatSelectModule, MatTabsModule, MatCardModule, 
    MatGridListModule, MatRadioModule, MatSidenavModule, MatButtonToggleModule, MatInputModule, MatOptionModule, MatCheckboxModule, 
    MatProgressSpinnerModule, MatDatepickerModule, MatNativeDateModule, MatAutocompleteModule,
    MatDialogModule, MatPaginatorModule, MatToolbarModule, MatListModule, MatSnackBarModule, MatSlideToggleModule, 
    MatTooltipModule, DsSharedModule, SharedModule, MaterialModuleList, DxDataGridModule,  DxBulletModule, DxTemplateModule, 
    DxButtonModule, DxChartModule, DxTooltipModule , DsSidebarModule
  ],
  providers: [ExportService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BillingModule { }
