import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule, MatDividerModule, MatFormFieldModule, MatIconModule, MatMenuModule, MatSelectModule, MatTabsModule, MatCardModule, MatGridListModule, MatRadioModule, MatSidenavModule, MatButtonToggleModule, MatInputModule, MatOptionModule, MatCheckboxModule, MatProgressSpinnerModule, MatDatepickerModule, MatNativeDateModule, MatAutocompleteModule, MatDialogModule, MatPaginatorModule, MatToolbarModule, MatListModule, MatSnackBarModule, MatSlideToggleModule, MatTooltipModule, MatDialog } from '@angular/material';
import { InventoryRoutingModule } from './inventory-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { StockUploadComponent } from './stock-upload/stock-upload.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { SharedModule } from 'app/main/shared/shared.module';
// import { FuseSharedModule } from '@fuse/shared.module';
import { DsSharedModule } from '@glits/shared.module';
import { SettopBoxComponent } from './master/settop-box/settop-box.component';
import { OltComponent } from './master/olt/olt.component';
import { StockMovementComponent } from './stock-movement/stock-movement.component';
import { DxTemplateModule, DxDataGridModule, DxCheckBoxModule, DxButtonModule, DxSelectBoxModule } from 'devextreme-angular';
import { ExportService } from 'app/main/services/export.service';
import { SettopBoxTransferComponent } from './master/settop-box/settop-box-transfer/settop-box-transfer.component';
import { SetupboxHistryDtlsComponent } from './master/settop-box/setupbox-histry-dtls/setupbox-histry-dtls.component';
import { DsSidebarModule } from '@glits/components';
import { BoxChangeUpdationComponent } from './box-change-updation/box-change-updation.component';
import { OltMonitoringComponent } from './master/olt-monitoring/olt-monitoring.component';

@NgModule({
  declarations: [DashboardComponent, StockUploadComponent, SettopBoxComponent, OltComponent, StockMovementComponent, SettopBoxTransferComponent, SetupboxHistryDtlsComponent, BoxChangeUpdationComponent, OltMonitoringComponent],
  imports: [
    DxTemplateModule,
    MatButtonModule,
    MatDividerModule,
    DsSidebarModule,
    MatFormFieldModule,
    MatIconModule,
    MatMenuModule,
    MatSelectModule,
    MatTabsModule,
    MatCardModule,
    MatGridListModule,
    MatRadioModule,
    MatSidenavModule,
    MatButtonToggleModule,
    MatInputModule,
    MatOptionModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatAutocompleteModule,
    MatDialogModule,
    MatPaginatorModule,
    MatToolbarModule,
    MatListModule,
    MatSnackBarModule,
    DsSharedModule,
    // FuseSharedModule,
    SharedModule,
    CommonModule,
    InventoryRoutingModule,
    DxDataGridModule,
    DxCheckBoxModule,
    DxButtonModule, 
    DxSelectBoxModule
   
  ],
  providers: [ExportService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class InventoryModule { }
