import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomersScRoutingModule } from './customers-sc-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CustomersInvoiceComponent } from './customers-invoice/customers-invoice.component';
import { CustomersInvoiceViewComponent } from './customers-invoice-view/customers-invoice-view.component';

import { DsSharedModule } from '@glits/shared.module';
import { SharedModule } from 'app/main/shared/shared.module';
import { DxTabsModule, DxTabPanelModule,DxDataGridModule,
  DxBulletModule,
  DxTemplateModule, DxButtonModule, DxNumberBoxModule,
  DxCheckBoxModule, DxSelectBoxModule } from 'devextreme-angular';
import {  MatInputModule, MatFormFieldModule, MatToolbarModule, MatPaginatorModule, MatListModule, MatDialogModule, MatProgressSpinnerModule, MatSelectModule, 
  MatOptionModule, MatDatepickerModule, MatCardModule, MatGridListModule, MatBottomSheetModule, MatDividerModule, MatRadioModule, MatButtonToggleModule, 
  MatIconModule, MatCheckboxModule,MatTabsModule } from '@angular/material';
  import { ChartsModule } from 'ng2-charts';
import { CallHstryComponent } from './call-hstry/call-hstry.component';
import { DsSidebarModule } from '@glits/components';




@NgModule({
  declarations: [DashboardComponent ,CustomersInvoiceComponent, CustomersInvoiceViewComponent, CallHstryComponent ],
  imports: [
    CommonModule,
    CustomersScRoutingModule,
    DsSharedModule,
    SharedModule,
    DsSidebarModule,
    DxTabPanelModule, MatSelectModule,DxTabsModule, DxTabPanelModule,
    MatInputModule, MatFormFieldModule, MatToolbarModule, MatPaginatorModule, MatListModule, MatDialogModule, MatProgressSpinnerModule, 
    MatOptionModule, MatDatepickerModule, MatCardModule, MatGridListModule, MatBottomSheetModule, MatDividerModule, MatRadioModule, MatButtonToggleModule,
    MatIconModule, MatCheckboxModule,MatTabsModule,ChartsModule,DxDataGridModule,
    DxBulletModule,
    DxTemplateModule, DxButtonModule, DxNumberBoxModule,
    DxCheckBoxModule, DxSelectBoxModule
  ]
})
export class CustomersScModule { }
