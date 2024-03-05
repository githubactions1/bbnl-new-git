import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CrmRoutingModule } from './crm-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CustomerDshbrdComponent } from './dashboard/customer-dshbrd/customer-dshbrd.component';
import { EndCustomerDshbrdComponent } from './dashboard/end-customer-dshbrd/end-customer-dshbrd.component';
import { CustomersComponent } from './customers/customers.component';
import {
  MatInputModule, MatFormFieldModule, MatToolbarModule, MatPaginatorModule, MatListModule, MatDialogModule,
  MatProgressSpinnerModule, MatSelectModule, MatOptionModule, MatDatepickerModule, MatCardModule, MatGridListModule, MatBottomSheetModule, MatDividerModule,
  MatRadioModule, MatButtonToggleModule, MatIconModule, MatCheckboxModule, MatTabsModule
} from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DsSharedModule } from '@glits/shared.module';
import { EnterpriseCustomerComponent } from './EnterpriseCustomer/enterprise-customer.component';
import { DsSidebarModule } from '@glits/components';
import { SharedModule } from 'app/main/shared/shared.module';
import { UploadFileService } from 'app/providers/s3/UploadFileService';
import { MatExpansionModule } from '@angular/material/expansion';

import { DxDataGridModule, DxBulletModule, DxTemplateModule, DxButtonModule } from 'devextreme-angular';

import { DxLinearGaugeModule } from 'devextreme-angular';
import { CustomerProfileComponent } from './customers/customer-profile/customer-profile.component';
import { EnterpriseCustomerProfileComponent } from './EnterpriseCustomer/enterprise-customer-profile/enterprise-customer-profile.component';
import { TransfereService } from 'app/providers/transfer/transfer.service';
import { CustomerFormComponent } from './customers/customer-form/customer-form.component';
import { ImsModificationComponent } from './customers/ims-modification/ims-modification.component';
import { BillingModule } from '../billing/billing.module';
import { AppAlacarteComponent } from './customers/app-alacarte/app-alacarte.component';
import { CafSpndDtlsComponent } from './customers/caf-spnd-dtls/caf-spnd-dtls.component';
//import { ZTCFileCreationComponent } from '../billing/ztc-file-creation/ztc-file-creation.component';

@NgModule({
  declarations: [
    DashboardComponent, 
    CustomerDshbrdComponent, 
    EndCustomerDshbrdComponent, 
    CustomersComponent, 
    EnterpriseCustomerComponent, 
    CustomerProfileComponent, 
    EnterpriseCustomerProfileComponent, 
    CustomerFormComponent, 
    ImsModificationComponent, AppAlacarteComponent, CafSpndDtlsComponent, 
    //ZTCFileCreationComponent,
  ],
  imports: [
    CommonModule,
    CrmRoutingModule,
    BillingModule,
    MatInputModule, MatFormFieldModule, MatToolbarModule, MatPaginatorModule, MatListModule, MatDialogModule,
    MatProgressSpinnerModule, MatSelectModule, MatOptionModule, MatDatepickerModule, MatCardModule, MatGridListModule, MatBottomSheetModule, MatDividerModule,
    MatRadioModule, MatButtonToggleModule, MatIconModule, MatCheckboxModule,
    FormsModule,
    ReactiveFormsModule,
    DsSharedModule,
    DsSidebarModule,
    SharedModule,
    DxDataGridModule,
    DxTemplateModule,
    DxBulletModule,
    DxButtonModule,
    SharedModule, MatTabsModule, MatExpansionModule, DxLinearGaugeModule,
    
  ], providers: [
    UploadFileService, TransfereService
  ],
})
export class CrmModule { }
