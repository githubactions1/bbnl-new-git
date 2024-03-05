import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CAFRoutingModule } from './caf-routing.module';
import { CafEventStatusComponent } from './caf-event-status/caf-event-status.component';
import { CafStatusComponent } from './master/CafStatus/caf-status.component';
import { CafTypeComponent } from './master/CafType/caf-type.component';

import {
  MatInputModule, MatFormFieldModule, MatToolbarModule, MatPaginatorModule, MatListModule, MatDialogModule,
  MatProgressSpinnerModule, MatSelectModule, MatOptionModule, MatDatepickerModule, MatCardModule, MatGridListModule, MatBottomSheetModule, MatDividerModule,
  MatRadioModule, MatButtonToggleModule, MatIconModule, MatCheckboxModule
} from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  DxDataGridModule,
  DxBulletModule,
  DxTemplateModule, DxButtonModule, DxNumberBoxModule,
  DxCheckBoxModule, DxSelectBoxModule, DxTabPanelModule, DxChartModule
} from 'devextreme-angular';
import { MaterialModuleList } from '../material.module';
import { DsSidebarModule } from '@glits/components';
import { SharedModule } from '../../shared/shared.module';
import { DsSharedModule } from '@glits/shared.module';
import { CafFormComponent } from './master/caf-form/caf-form.component';
import { UploadFileService } from 'app/providers/s3/UploadFileService';
import { CustomerComponent } from './master/customer/customer.component';
import { EnterprieseCustomersComponent } from './master/enterpriese-customers/enterpriese-customers.component';
import { EntcafFormComponent } from './master/entcaf-form/entcaf-form.component';
import { TransfereService } from 'app/providers/transfer/transfer.service';
import { EntNodeAdditionFormComponent } from './master/ent-node-addition-form/ent-node-addition-form.component';
import { EntrpecstmrtypComponent } from './master/Entrpecstmrtyp/EntrpeCstmrTyp.component';
import { EntrpecstmrsubtypComponent } from './master/Entrpecstmrsubtyp/EntrpeCstmrSubTyp.component';
import { BulkCafUploadComponent } from './master/bulk-caf-upload/bulk-caf-upload.component';
import { ExportService } from 'app/main/services/export.service';
// import { CustomerProfileComponent } from './master/customer/customer-profile/customer-profile.component';
import { EnterpriseCustomerProfileComponent } from './master/enterpriese-customers/enterprise-customer-profile/enterprise-customer-profile.component';
import { CafTerminationsComponent } from './operations/caf-terminations/caf-terminations.component';

import { LmoBlckUploadComponent } from './master/lmo-blck-upload/lmo-blck-upload.component';
import { CafbulkformComponent } from './master/cafbulkform/cafbulkform.component';
import { CustomerCallCenterComponent } from './master/customerCallCenter/customer-call-center/customer-call-center.component';
import { IndividualCafComponent } from './master/individual-caf/individual-caf.component';
import { EntCafadditionFormComponent } from './master/enterpriese-customers/ent-cafaddition-form/ent-cafaddition-form.component';
import { EnterpriseCustEditComponent } from './master/enterpriese-customers/enterprise-cust-edit/enterprise-cust-edit.component';
import { CustomerEditComponent } from './master/customer/customer-edit/customer-edit.component';
import { EnterpriceCafComponent } from './master/enterprice-caf/enterprice-caf.component';
import { EnterpriceCafListComponent } from './master/enterprice-caf-list/enterprice-caf-list.component';
import { EnterpriceCafFormComponent } from './master/enterprice-caf-form/enterprice-caf-form.component';
import { ServicePackComponent } from './master/customer/service-pack/service-pack.component';
import { EnterpriseDashboardComponent } from './master/enterpriese-customers/dashboard/enterprise-dashboard/enterprise-dashboard.component';
import { CafUpdationComponent } from './operations/caf-updation/caf-updation.component';
import { BulkUploadWorkOrderComponent } from './master/bulk-upload-work-order/bulk-upload-work-order.component';
import { OltDashboardComponent } from './master/olt-dashboard/olt-dashboard.component';
import { CafBulkTerminationsComponent } from './operations/caf-bulk-terminations/caf-bulk-terminations.component';
import { BulkResumeComponent } from './operations/bulk-resume/bulk-resume.component';
import { BbnlCafFormComponent } from './master/bbnl-caf-form/bbnl-caf-form.component';
import { CafUpdationNewComponent } from './operations/caf-updation-new/caf-updation-new.component';
import { BbnlIndCafFormComponent } from './master/bbnl-ind-caf-form/bbnl-ind-caf-form.component';
import { BbnlEntDashboardComponent } from './master/enterpriese-customers/dashboard/bbnl-ent-dashboard/bbnl-ent-dashboard.component';
import { GoiEntCafFormComponent } from './master/goi-ent-caf-form/goi-ent-caf-form.component';

@NgModule({
  declarations: [CafEventStatusComponent, CafStatusComponent, CafTypeComponent,
    CafFormComponent, CustomerComponent, EnterprieseCustomersComponent, EntcafFormComponent
    , EntNodeAdditionFormComponent, EntrpecstmrtypComponent, EntrpecstmrsubtypComponent, BulkCafUploadComponent,EnterpriseCustomerProfileComponent, CafbulkformComponent,
     CustomerCallCenterComponent, CafTerminationsComponent, LmoBlckUploadComponent, CafbulkformComponent, CustomerCallCenterComponent,IndividualCafComponent,EntCafadditionFormComponent, EnterpriseCustEditComponent, 
	 CustomerEditComponent, EnterpriceCafComponent, EnterpriceCafListComponent, EnterpriceCafFormComponent, ServicePackComponent, EnterpriseDashboardComponent, CafUpdationComponent, BulkUploadWorkOrderComponent, OltDashboardComponent, CafBulkTerminationsComponent, BulkResumeComponent,
	 BbnlCafFormComponent,CafUpdationNewComponent, BbnlIndCafFormComponent, BbnlEntDashboardComponent, GoiEntCafFormComponent],
  imports: [
    CommonModule,
    CAFRoutingModule,
    MaterialModuleList,
    DsSidebarModule,

    DsSharedModule,
    SharedModule,
    MatInputModule, MatFormFieldModule, MatToolbarModule, MatPaginatorModule, MatListModule, MatDialogModule,
    MatProgressSpinnerModule, MatSelectModule, MatOptionModule, MatDatepickerModule, MatCardModule, MatGridListModule, MatBottomSheetModule, MatDividerModule,
    MatRadioModule, MatButtonToggleModule, MatIconModule, MatCheckboxModule,
    FormsModule,
    ReactiveFormsModule,
    DxDataGridModule,
    DxTemplateModule,
    DxBulletModule,
    DxButtonModule, DxNumberBoxModule,
    DxCheckBoxModule, DxSelectBoxModule, DxTabPanelModule, DxChartModule
  ],
  exports: [
    // CustomerProfileComponent
  ],
  providers: [
    UploadFileService, TransfereService, ExportService
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CAFModule { }
