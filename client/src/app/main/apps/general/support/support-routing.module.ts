import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// import { SupportRoutingModule } from './support-routing.module';
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
import { CallCenterModule } from './callcenter/callcenter.module';
import { TicketRequestFormComponent } from './personal/ticket-request-form/ticket-request-form.component';
import { CallcenterFormComponent } from './personal/callcenter-form/callcenter-form.component';
import { NocFormComponent } from './personal/noc-form/noc-form.component';
import { TicketNocEditComponent } from './tickets/ticket-noc-edit/ticket-noc-edit.component';
import { BasicServiceFormComponent } from './personal/basic-service-form/basic-service-form.component';
import { TicketBcsrequestEditComponent } from './tickets/ticket-bcsrequest-edit/ticket-bcsrequest-edit.component';
import { PrivilegeFormComponent } from './personal/privilege-form/privilege-form.component';
import { TicketPrivilegerequestEditComponent } from './tickets/ticket-privilegerequest-edit/ticket-privilegerequest-edit.component';
import { OccFormComponent } from './personal/occ-form/occ-form.component';
import { TicketOccrequestEditComponent } from './tickets/ticket-occrequest-edit/ticket-occrequest-edit.component';

const routes: Routes = [
    { path: '', redirectTo: 'board/created' },
    { path: 'board/:board_cat', component: TicketBoardComponent },  
    { path: 'master/environment', component: EnvironmentComponent },
    { path: 'master/category', component: CategoryComponent },
    { path: 'master/sub-category', component: SubCategoryComponent },
    { path: 'master/priority', component: PriorityComponent },
    { path: 'master/severity', component: SeverityComponent },
    { path: 'master/teams', component: TeamsComponent },
    { path: 'master/ticket-apps', component: TicketAppsComponent },
    { path: 'master/ticket-source', component: TicketSourceComponent },
    { path: 'master/ticket-status', component: TicketStatusComponent },
    { path: 'master/ticket-type', component: TicketTypeComponent },
    { path: 'master/work-flows', component: WorkFlowsComponent },
    { path: 'personal/my-tickets', component: MyTicketsComponent },
    { path: 'personal/my-tickets/:req_id', component: TicketEditComponent },
    { path: 'personal/my-tickets/noc/:req_id', component: TicketNocEditComponent },
    { path: 'personal/my-tickets/servicerequest/:req_id', component: TicketBcsrequestEditComponent },
    { path: 'personal/my-tickets/privilegerequest/:req_id', component: TicketPrivilegerequestEditComponent },
    { path: 'personal/my-tickets/occrequest/:req_id', component: TicketOccrequestEditComponent },
    { path: 'reports/sal-report', component: SlaRprtComponent },
    { path: 'reports/ticket-summary', component: TicketSummaryRprtComponent },
    { path: 'my-tickets/request-form', component: TicketRequestFormComponent },
    { path: 'my-tickets/callcenter-form', component: CallcenterFormComponent },
    { path: 'my-tickets/noc-form', component: NocFormComponent },
    { path: 'my-tickets/occrequest-form', component:OccFormComponent},
    { path: 'my-tickets/servicerequest-form', component: BasicServiceFormComponent },
    { path: 'my-tickets/privilegerequest-form', component: PrivilegeFormComponent },
    { path: 'personal/ticketlst', component:TicketListComponent}

  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SupportRoutingModule { }
