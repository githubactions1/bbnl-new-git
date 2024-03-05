import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AgentsScRoutingModule } from './agents-sc-routing.module';
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
import { DsSidebarModule } from '@glits/components';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModuleList } from '../../material.module';
import { DsSharedModule } from '@glits/shared.module';
import { SharedModule } from 'app/main/shared/shared.module';
import { MatInputModule, MatFormFieldModule, MatToolbarModule, MatPaginatorModule, MatListModule, MatDialogModule, MatProgressSpinnerModule, 
        MatSelectModule, MatOptionModule, MatDatepickerModule, MatCardModule, MatGridListModule, MatBottomSheetModule, MatDividerModule, MatRadioModule, 
        MatButtonToggleModule, MatIconModule, MatCheckboxModule } from '@angular/material';
import { DxButtonModule, DxNumberBoxModule, DxCheckBoxModule, DxSelectBoxModule, DxTabPanelModule, DxDataGridModule, DxTemplateModule, DxBulletModule, DxChartModule } from 'devextreme-angular';
import { CafTerminationComponent } from './operations/caf-termination/caf-termination.component';
import { CafAddtoTerminationComponent } from './operations/caf-termination/caf-addto-termination/caf-addto-termination.component';
import { CafTerminationApprovalsComponent } from './operations/approvals/caf-termination-approvals/caf-termination-approvals.component';

import {CAFModule} from '../../caf/caf.module';
import { CafDoubleBoxChangeComponent } from './operations/caf-double-box-change/caf-double-box-change.component';
import { PonWiseCafComponent } from './olt/pon-wise-caf/pon-wise-caf.component';
import { MonthlyInvoiceComponent } from './billing/monthly-invoice/monthly-invoice.component';
import { MarketManagerTerminationApprovalComponent } from './operations/approvals/market-manager-termination-approval/market-manager-termination-approval.component';
import { MsodashboardComponent } from './msodashboard/msodashboard.component';
import { BbnlCustomerComponent } from './master/bbnl-customer/bbnl-customer.component';
import { EntCafSuspensionComponent } from './operations/ent-caf-suspension/ent-caf-suspension.component';
import { GoiCustomerComponent } from './master/goi-customer/goi-customer.component';

@NgModule({
  declarations: [DashboardComponent,EntCafSuspensionComponent, CustomerComponent, EntCustomerComponent, PaymentsComponent, CollectionComponent, SubstationRequestComponent, 
    PortSplitingComponent, CafSuspensionComponent, CafBoxChangeComponent,
     CafPonChangeComponent,PackageAggrementComponent, RevenueSharingComponent, MyProfileComponent, CafTerminationComponent, 
     CafAddtoTerminationComponent, CafTerminationApprovalsComponent, CafDoubleBoxChangeComponent, PonWiseCafComponent, MonthlyInvoiceComponent, MarketManagerTerminationApprovalComponent, MsodashboardComponent,
	 BbnlCustomerComponent, GoiCustomerComponent],
  imports: [
    CommonModule,
    AgentsScRoutingModule,
    DsSidebarModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModuleList,
    DsSharedModule,
    SharedModule,
    MatInputModule, MatFormFieldModule, MatToolbarModule, MatPaginatorModule, MatListModule, MatDialogModule, MatProgressSpinnerModule, MatSelectModule, 
    MatOptionModule, MatDatepickerModule, MatCardModule, MatGridListModule, MatBottomSheetModule, MatDividerModule, MatRadioModule, MatButtonToggleModule,
     MatIconModule, MatCheckboxModule, DxButtonModule, DxNumberBoxModule, DxCheckBoxModule, DxSelectBoxModule, DxTabPanelModule,
    DxDataGridModule,
    DxTemplateModule,
    DxBulletModule,
    DxChartModule,
    CAFModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AgentsScModule {  constructor(){}}
