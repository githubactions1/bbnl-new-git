import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndividualCustomerComponent } from './individual-customer/individual-customer.component';
import { CallcenterRoutingModule } from './callcenter-routing.module';
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
  DxCheckBoxModule, DxSelectBoxModule, DxTabPanelModule
} from 'devextreme-angular';
import { MaterialModuleList } from '../material.module';
import { DsSidebarModule } from '@glits/components';
import { SharedModule } from '../../shared/shared.module';
import { DsSharedModule } from '@glits/shared.module';
import { UploadFileService } from 'app/providers/s3/UploadFileService';
import { TransfereService } from 'app/providers/transfer/transfer.service';
import { ExportService } from 'app/main/services/export.service';
// import { CustomerProfileComponent } from '../caf/master/customer/customer-profile/customer-profile.component';

@NgModule({
  declarations: [IndividualCustomerComponent],
  imports: [
    CommonModule,
    CallcenterRoutingModule,
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
    DxCheckBoxModule, DxSelectBoxModule, DxTabPanelModule
  ],
  exports: [
    // CustomerProfileComponent
  ],
  providers: [
    UploadFileService, TransfereService, ExportService
  ],
  // schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CallcenterModule { }
