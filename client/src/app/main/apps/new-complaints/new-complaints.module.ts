import { CrmModule } from '../crm/crm.module';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NewComplaintsRoutingModule } from './new-complaints-routing.module';

import {
  MatInputModule, MatFormFieldModule, MatToolbarModule, MatPaginatorModule, MatListModule, MatDialogModule,
  MatProgressSpinnerModule, MatSelectModule, MatOptionModule, MatDatepickerModule, MatCardModule, MatGridListModule, MatBottomSheetModule, MatDividerModule,
  MatRadioModule, MatButtonToggleModule, MatIconModule, MatCheckboxModule, MatTabsModule, MatAutocompleteModule
} from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DsSharedModule } from '@glits/shared.module';
import { DsSidebarModule } from '@glits/components';
import { SharedModule } from 'app/main/shared/shared.module';
import { UploadFileService } from 'app/providers/s3/UploadFileService';
import { MatExpansionModule } from '@angular/material/expansion';
import { EditComplaintsComponent } from './edit-complaints/edit-complaints.component';
import { ViewComplaintsComponent } from './view-complaints/view-complaints.component';
import { AddComplaintsComponent } from './add-complaints/add-complaints.component';
import { TransfereService } from 'app/providers/transfer/transfer.service';
import { DashboardComponent } from '../crm/dashboard/dashboard.component';
import { DxDataGridModule, DxBulletModule, DxTemplateModule, DxButtonModule } from 'devextreme-angular';
import { DxLinearGaugeModule } from 'devextreme-angular';
import { ComplaintstatusComplaintsComponent } from './complaintstatus-complaints/complaintstatus-complaints.component';
import { OpenComplaintsComponent } from './open-complaints/open-complaints.component';
import { CloseComplaintsComponent } from './close-complaints/close-complaints.component';
import { ResolveComplaintsComponent } from './resolve-complaints/resolve-complaints.component';
import { ComplaintsDashboardComponent } from './complaints-dashboard/complaints-dashboard.component';
import { GeneralEnquiryComponent } from './general-enquiry/general-enquiry.component';
import { DxPieChartModule,DxChartModule } from 'devextreme-angular';
import { AddEmployeeIdComponent } from './add-employee-id/add-employee-id.component';
import { ComplaintsSlaComponent } from './complaints-sla/complaints-sla.component';
import { EditComplaintSlaComponent } from './edit-complaint-sla/edit-complaint-sla.component';
import { EditDepartmentEmployeeComponent } from './edit-department-employee/edit-department-employee.component';
import { ComplaintsReportsComponent } from './complaints-reports/complaints-reports.component';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { ComplaintsSubcrbappComponent } from './complaints-subcrbapp/complaints-subcrbapp.component';
import { TodayComplaintsComponent } from './today-complaints/today-complaints.component';
import { PreviousdayComplaintsComponent } from './previousday-complaints/previousday-complaints.component';
import { EditGeneralEquiryTicketsComponent } from './edit-general-equiry-tickets/edit-general-equiry-tickets.component';
import { KycLmoDetailsComponent } from './kyc-lmo-details/kyc-lmo-details.component';
import { SubcrbKycReportComponent } from './subcrb-kyc-report/subcrb-kyc-report.component';
import { EnterpriseComponent } from './enterprise/enterprise.component';
import { GrievanceReportComponent } from './grievance-report/grievance-report.component';
// import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
// import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';

@NgModule({
  declarations: [AddComplaintsComponent, SubcrbKycReportComponent,ViewComplaintsComponent, EditComplaintsComponent, ComplaintstatusComplaintsComponent, OpenComplaintsComponent, CloseComplaintsComponent, ResolveComplaintsComponent, ComplaintsDashboardComponent, GeneralEnquiryComponent, AddEmployeeIdComponent, ComplaintsSlaComponent, EditComplaintSlaComponent, EditDepartmentEmployeeComponent, ComplaintsReportsComponent, ComplaintsSubcrbappComponent, TodayComplaintsComponent, PreviousdayComplaintsComponent, EditGeneralEquiryTicketsComponent, KycLmoDetailsComponent, GrievanceReportComponent, EnterpriseComponent],
  imports: [
    CommonModule,CrmModule,NewComplaintsRoutingModule,MatInputModule, MatFormFieldModule, MatToolbarModule, MatPaginatorModule, MatListModule, MatDialogModule,
    MatProgressSpinnerModule, MatSelectModule,  DxPieChartModule,MatOptionModule, MatDatepickerModule, MatCardModule, MatGridListModule, MatBottomSheetModule, MatDividerModule,
    MatRadioModule, MatButtonToggleModule, MatIconModule, MatCheckboxModule, MatTabsModule,FormsModule, ReactiveFormsModule ,DsSharedModule,
    DsSidebarModule, SharedModule, MatExpansionModule, MatAutocompleteModule, 
    DxDataGridModule, DxBulletModule,DxChartModule, DxTemplateModule, DxButtonModule,
    DxLinearGaugeModule,  MatMomentDateModule,
  ],
  providers : [ UploadFileService,TransfereService ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NewComplaintsModule { }
