import { NgModule } from '@angular/core';

import { IllCafsRoutingModule } from './ill-cafs-routing.module';
import { IllCafsComponent } from './ill-cafs/ill-cafs.component';
import {
  DxDataGridModule,
  DxBulletModule,
  DxTemplateModule, DxButtonModule, DxNumberBoxModule,
  DxCheckBoxModule, DxSelectBoxModule, DxTabPanelModule, DxChartModule
} from 'devextreme-angular';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { DsSharedModule } from '@glits/shared.module';
import { IllEnterpriseFormComponent } from './ill-enterprise-form/ill-enterprise-form.component';

import {
  MatTabsModule, MatDividerModule,
  MatInputModule, MatFormFieldModule, MatGridListModule, MatSelectModule, MatOptionModule, MatCheckboxModule, MatProgressSpinnerModule,
  MatDatepickerModule, MatNativeDateModule, MatAutocompleteModule, MatDialogModule, MatPaginatorModule, MatToolbarModule, MatListModule, MatSidenavModule,
  MatButtonToggleModule, MatRadioModule, MAT_DIALOG_DATA, MatDialogRef, MAT_DATE_LOCALE, MatSnackBar, MatIconModule, MatButtonModule
} from '@angular/material';
import { MaterialModuleList } from '../material.module';
import { IllPackageApprovalsComponent } from './ill-package-approvals/ill-package-approvals.component';
import { DsSidebarModule } from '@glits/components';
import { IllCafsProfileComponent } from './ill-cafs-profile/ill-cafs-profile.component';
import { IllCafFormComponent } from './ill-caf-form/ill-caf-form.component';
import { TransfereService } from 'app/providers/transfer/transfer.service';
import { IllCafPackagesComponent } from './ill-caf-packages/ill-caf-packages.component';
import { IllLevel2PackageApprovalComponent } from './ill-package-approvals/ill-level2-package-approval/ill-level2-package-approval.component';


@NgModule({
  declarations: [IllCafsComponent, IllEnterpriseFormComponent, IllPackageApprovalsComponent, IllCafsProfileComponent, IllCafFormComponent,IllCafPackagesComponent, IllLevel2PackageApprovalComponent],
  imports: [
    CommonModule,
    DsSidebarModule,
    IllCafsRoutingModule,
    DxDataGridModule,
    DxBulletModule,
    DxTemplateModule,
    DxButtonModule,
    DxNumberBoxModule,
    DxCheckBoxModule,
    DxSelectBoxModule,
    DxTabPanelModule,
    DxChartModule,
    SharedModule,
    DsSharedModule,
    MatIconModule,
    MatDividerModule,
    MatTabsModule, 
    MatInputModule, 
    MatFormFieldModule,
    MatGridListModule,
    MatSelectModule,
    MatOptionModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatAutocompleteModule,
    MatDialogModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    MatToolbarModule,
    MatListModule,
    MatSidenavModule,
    MatButtonToggleModule,
    MatRadioModule,
    MatButtonModule,
    MaterialModuleList
  ],
  exports: [IllEnterpriseFormComponent],
  entryComponents: [],
  providers: [
  { provide: MatDialogRef, useValue: {} },
  MatSnackBar,TransfereService
  ]
})
export class IllCafsModule { }
