import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModuleList } from './../../apps/material.module';
import { MarketingRoutingModule } from './marketing-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
// import { FuseSharedModule } from '@fuse/shared.module';
import { DsSharedModule } from '@glits/shared.module';
import { DsSidebarModule } from '@glits/components';
import { ReactiveFormsModule } from '@angular/forms';
import { DxDataGridModule,  DxBulletModule, DxTemplateModule, DxButtonModule, DxNumberBoxModule, DxCheckBoxModule, DxSelectBoxModule, DxTabPanelModule } from 'devextreme-angular';
import { SharedModule } from 'app/main/shared/shared.module';
import { IndividualFingerPrintComponent } from './individual-finger-print/individual-finger-print.component';
import { TransfereService } from 'app/providers/transfer/transfer.service';
import { GroupFingerprintComponent } from './group-fingerprint/group-fingerprint.component';
import { MessageDetailsComponent } from './message-details/message-details.component';
import { MessageDetailsViewComponent } from './message-details-view/message-details-view.component';
import { ExportService } from 'app/main/services/export.service';
import { PostNotificationComponent } from './post-notification/post-notification.component';



@NgModule({
  declarations: [DashboardComponent,IndividualFingerPrintComponent, GroupFingerprintComponent, MessageDetailsComponent, MessageDetailsViewComponent, PostNotificationComponent
  ],
  imports: [
    CommonModule,
    MarketingRoutingModule,
    MaterialModuleList,
    DsSharedModule,
    DsSidebarModule,
    DxDataGridModule,
    DxBulletModule,
    SharedModule,
    DxTemplateModule,
    DxButtonModule,
    ReactiveFormsModule, DxNumberBoxModule, DxCheckBoxModule, DxSelectBoxModule, DxTabPanelModule
  ],
  providers:[
    TransfereService,ExportService
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class MarketingModule { }
