import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from '../crm/dashboard/dashboard.component';
import { EditComplaintsComponent } from './edit-complaints/edit-complaints.component';
import { ViewComplaintsComponent } from './view-complaints/view-complaints.component';
import { AddComplaintsComponent } from './add-complaints/add-complaints.component';
import { CloseComplaintsComponent } from './close-complaints/close-complaints.component';
import { OpenComplaintsComponent } from './open-complaints/open-complaints.component';
import { ResolveComplaintsComponent } from './resolve-complaints/resolve-complaints.component';
import { ComplaintsDashboardComponent } from './complaints-dashboard/complaints-dashboard.component';
import { GeneralEnquiryComponent } from './general-enquiry/general-enquiry.component';
import { AddEmployeeIdComponent } from './add-employee-id/add-employee-id.component';
import { ComplaintsSlaComponent } from './complaints-sla/complaints-sla.component';
import { ComplaintsReportsComponent } from './complaints-reports/complaints-reports.component';
import { ComplaintsSubcrbappComponent } from './complaints-subcrbapp/complaints-subcrbapp.component';
import { TodayComplaintsComponent } from './today-complaints/today-complaints.component';
import { PreviousdayComplaintsComponent } from './previousday-complaints/previousday-complaints.component';
import { KycLmoDetailsComponent } from './kyc-lmo-details/kyc-lmo-details.component';
import { SubcrbKycReportComponent } from './subcrb-kyc-report/subcrb-kyc-report.component';
import { EnterpriseComponent } from './enterprise/enterprise.component';
import { GrievanceReportComponent } from './grievance-report/grievance-report.component';

const routes: Routes = [
  { path : '', component: DashboardComponent },
  { path : 'complaint_dashboard', component: ComplaintsDashboardComponent},
  { path : 'edit_complaint', component: EditComplaintsComponent},
  { path : 'view_complaint', component: ViewComplaintsComponent},
  { path : 'add_complaint', component: AddComplaintsComponent},
  { path : 'open_complaint', component: OpenComplaintsComponent},
  { path : 'close_complaint', component: CloseComplaintsComponent},
  { path : 'resolve_complaint', component: ResolveComplaintsComponent},
  { path : 'general_enquiry', component: GeneralEnquiryComponent},
  { path : 'add_employee', component: AddEmployeeIdComponent},
  { path : 'subscribe_app_tckts', component: ComplaintsSubcrbappComponent},
  { path : 'add_sla', component: ComplaintsSlaComponent},
  { path : 'reports', component: ComplaintsReportsComponent},
  { path : 'today_complaints', component: TodayComplaintsComponent},
  { path : 'previousday_complaints', component: PreviousdayComplaintsComponent},
  { path : 'kyclmodetails', component: KycLmoDetailsComponent},
  { path : 'subkycrpt', component: SubcrbKycReportComponent},
  { path : 'entprse_dashboard' , component:EnterpriseComponent},
  { path : 'grvnce_rprt' , component:GrievanceReportComponent},
  { path : '*', component: DashboardComponent },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NewComplaintsRoutingModule { }
