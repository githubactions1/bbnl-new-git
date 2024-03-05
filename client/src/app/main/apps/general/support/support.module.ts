import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule, MatDividerModule, MatFormFieldModule, MatIconModule, MatMenuModule, MatSelectModule, MatTabsModule, MatCardModule, MatGridListModule, 
  MatRadioModule, MatSidenavModule, MatButtonToggleModule, MatInputModule, MatOptionModule, MatCheckboxModule, MatProgressSpinnerModule, MatDatepickerModule, 
  MatNativeDateModule, MatAutocompleteModule, MatDialogModule, MatPaginatorModule, MatToolbarModule, MatListModule, MatSnackBarModule, MatSlideToggleModule,
   MatTooltipModule, MatDialog } from '@angular/material';

import { DsSharedModule } from '@glits/shared.module';
import { DsWidgetModule, DsProgressBarModule, DsSidebarModule } from '@glits/components';
import { SharedModule } from '../../../shared/shared.module'
import { MaterialModuleList } from '../../material.module';
import { SupportRoutingModule } from './support-routing.module';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  DxDataGridModule,
  DxBulletModule,
  DxTemplateModule
} from 'devextreme-angular';
// import { QRCodeModule } from 'angularx-qrcode';
import { NgxQRCodeModule } from 'ngx-qrcode2';


import { CategoryComponent } from './master/category/category.component';
import { SubCategoryComponent } from './master/sub-category/sub-category.component';
import { PriorityComponent } from './master/priority/priority.component';
import { EnvironmentComponent } from './master/environment/environment.component';
import { TicketTypeComponent } from './master/ticket-type/ticket-type.component';
import { TeamsComponent } from './master/teams/teams.component';
import { SeverityComponent } from './master/severity/severity.component';
import { MyTicketsComponent } from './personal/my-tickets/my-tickets.component';
import { TicketBoardComponent } from './tickets/ticket-board/ticket-board.component';
import { TicketListComponent } from './tickets/ticket-list/ticket-list.component';
import { TicketEditComponent } from './tickets/ticket-edit/ticket-edit.component';
import { TicketStatusComponent } from './master/ticket-status/ticket-status.component';
import { WorkFlowsComponent } from './master/work-flows/work-flows.component';
import { SlaRprtComponent } from './reports/sla-rprt/sla-rprt.component';
import { TicketSummaryRprtComponent } from './reports/ticket-summary-rprt/ticket-summary-rprt.component';
import { TicketSourceComponent } from './master/ticket-source/ticket-source.component';
import { TicketAppsComponent } from './master/ticket-apps/ticket-apps.component';
import { SupportLayoutModule } from './layout/layout.module';
import { CallCenterModule } from './callcenter/callcenter.module';
import { DxHtmlEditorModule } from 'devextreme-angular';
import { TicketRequestFormComponent } from './personal/ticket-request-form/ticket-request-form.component';
import { CallcenterFormComponent } from './personal/callcenter-form/callcenter-form.component';
import { NocFormComponent } from './personal/noc-form/noc-form.component';
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';
import 'froala-editor/js/plugins/font_size.min.js';
import 'froala-editor/js/plugins/font_family.min.js';
import 'froala-editor/js/plugins/colors.min.js';
import 'froala-editor/js/plugins/table.min.js';
import 'froala-editor/js/plugins/paragraph_format.min.js';
import 'froala-editor/js/plugins/paragraph_style.min.js';
import 'froala-editor/js/plugins/lists.min.js';
import 'froala-editor/js/plugins/image.min.js';
import { TicketNocEditComponent } from './tickets/ticket-noc-edit/ticket-noc-edit.component';
import { BasicServiceFormComponent } from './personal/basic-service-form/basic-service-form.component';
import { TicketBcsrequestEditComponent } from './tickets/ticket-bcsrequest-edit/ticket-bcsrequest-edit.component';
import { PrivilegeFormComponent } from './personal/privilege-form/privilege-form.component';
import { TicketPrivilegerequestEditComponent } from './tickets/ticket-privilegerequest-edit/ticket-privilegerequest-edit.component';
import { OccFormComponent } from './personal/occ-form/occ-form.component';
import { TicketOccrequestEditComponent } from './tickets/ticket-occrequest-edit/ticket-occrequest-edit.component';
// import { TenantLmoProfileComponent } from '../../tenants/dashboard/tenant-lmo-profile/tenant-lmo-profile.component';



@NgModule({
  declarations: [ CategoryComponent, SubCategoryComponent, PriorityComponent, EnvironmentComponent, TicketTypeComponent, TeamsComponent, SeverityComponent,
                  MyTicketsComponent, TicketBoardComponent, TicketListComponent, TicketEditComponent, TicketStatusComponent, WorkFlowsComponent, SlaRprtComponent, 
                  TicketSummaryRprtComponent, TicketSourceComponent, TicketAppsComponent, TicketRequestFormComponent, 
                  CallcenterFormComponent,NocFormComponent, TicketNocEditComponent, BasicServiceFormComponent, TicketBcsrequestEditComponent, 
                  PrivilegeFormComponent, TicketPrivilegerequestEditComponent, OccFormComponent, TicketOccrequestEditComponent, 
                  // TenantLmoProfileComponent
                ],
  imports: [
    DxHtmlEditorModule,
    CommonModule,
    SupportRoutingModule,
    CallCenterModule,
    // DsSidebarModule,
    // DsThemeOptionsModule,
    SharedModule,
    MaterialModuleList,
    MatButtonModule,
    MatDividerModule,
    MatFormFieldModule,
    MatIconModule,
     // Ds modules
     DsProgressBarModule,
     DsSharedModule,
     DsSidebarModule,
     //DsThemeOptionsModule,
    MatMenuModule,
    MatSelectModule,
    // QRCodeModule,
    NgxQRCodeModule,
    MatTabsModule,
    // DsNavigationModule,
    DsWidgetModule,
    MatCardModule, MatGridListModule, MatRadioModule, MatSidenavModule, MatButtonToggleModule,
    MatInputModule, MatOptionModule, MatCheckboxModule, MatProgressSpinnerModule,
    MatDatepickerModule, MatNativeDateModule, MatAutocompleteModule, MatDialogModule, MatPaginatorModule, MatToolbarModule, MatListModule, MatSnackBarModule
    ,SupportLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    DxDataGridModule,
    DxTemplateModule,
    DxBulletModule,
    FroalaEditorModule.forRoot(), FroalaViewModule.forRoot(),
    
  ],
  exports: [
    // TenantLmoProfileComponent
  ],
 
})
export class SupportModule { }
