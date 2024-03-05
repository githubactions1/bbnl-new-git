import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PackageAgreementComponent } from './package-agreement/package-agreement.component';
import { DsSidebarModule } from '@glits/components';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TenantsRoutingModule } from './tenants-routing.module';
import { MsoComponent } from './master/mso/mso.component';
import { LmoComponent } from './master/lmo/lmo.component';
import { EnrolmentComponent } from './master/enrolment/enrolment.component';
import { PortAssignmentComponent } from './port-assignment/port-assignment.component';
import { TenantProfileComponent } from './dashboard/tenant-profile/tenant-profile.component';
import { MaterialModuleList } from '../material.module';
import { DsSharedModule } from '@glits/shared.module';
import { SharedModule } from 'app/main/shared/shared.module';
import {  MatInputModule, MatFormFieldModule, MatToolbarModule, MatPaginatorModule, MatListModule, MatDialogModule, MatProgressSpinnerModule, MatSelectModule, 
          MatOptionModule, MatDatepickerModule, MatCardModule, MatGridListModule, MatBottomSheetModule, MatDividerModule, MatRadioModule, MatButtonToggleModule, 
          MatIconModule, MatCheckboxModule } from '@angular/material';
import {  DxDataGridModule,  DxBulletModule, DxTemplateModule, DxButtonModule, DxNumberBoxModule, 
          DxCheckBoxModule, DxSelectBoxModule, DxTabPanelModule, DxChartModule } from 'devextreme-angular';
import { TenantsComponent } from './tenants.component';
import { TenantMsoProfileComponent } from './dashboard/tenant-mso-profile/tenant-mso-profile.component';
// import { TenantLmoProfileComponent } from './dashboard/tenant-lmo-profile/tenant-lmo-profile.component';
import { PackageAgreementApprovalsComponent } from './package-agreement-approvals/package-agreement-approvals.component';
// import { DashboardComponent } from '../selfcare/agents-sc/dashboard/dashboard.component';
import { CAFModule } from 'app/main/apps/caf/caf.module';
import { AppsModule } from 'app/main/apps/apps.module';

@NgModule({
  declarations: [PackageAgreementComponent, MsoComponent, LmoComponent, EnrolmentComponent, PortAssignmentComponent, TenantProfileComponent, TenantsComponent, TenantMsoProfileComponent,
    // TenantLmoProfileComponent,
    PackageAgreementApprovalsComponent],

  imports: [
    CommonModule,
    TenantsRoutingModule,
    DsSidebarModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModuleList,
    DsSharedModule,
    SharedModule,
    CAFModule,
    MatInputModule, MatFormFieldModule, MatToolbarModule, MatPaginatorModule, MatListModule, MatDialogModule, MatProgressSpinnerModule, MatSelectModule, 
    MatOptionModule, MatDatepickerModule, MatCardModule, MatGridListModule, MatBottomSheetModule, MatDividerModule, MatRadioModule, MatButtonToggleModule,
     MatIconModule, MatCheckboxModule, DxButtonModule, DxNumberBoxModule, DxCheckBoxModule, DxSelectBoxModule, DxTabPanelModule,
    DxDataGridModule,
    DxTemplateModule,
    DxBulletModule,
    DxChartModule,
    AppsModule
    // TenantLmoProfileComponent

  ]
})

export class TenantsModule { }
