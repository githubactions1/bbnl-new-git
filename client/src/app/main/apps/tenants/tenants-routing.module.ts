import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PackageAgreementComponent } from './package-agreement/package-agreement.component';
import { MsoComponent } from './master/mso/mso.component';
import { LmoComponent } from './master/lmo/lmo.component';
import { EnrolmentComponent } from './master/enrolment/enrolment.component';
import { PortAssignmentComponent } from './port-assignment/port-assignment.component';
import { TenantProfileComponent } from './dashboard/tenant-profile/tenant-profile.component';
import { TenantsComponent } from './tenants.component';
import { TenantLmoProfileComponent } from './dashboard/tenant-lmo-profile/tenant-lmo-profile.component';
import { TenantMsoProfileComponent } from './dashboard/tenant-mso-profile/tenant-mso-profile.component';
import { PackageAgreementApprovalsComponent } from './package-agreement-approvals/package-agreement-approvals.component';
// import { DashboardComponent } from '../selfcare/agents-sc/dashboard/dashboard.component';

const routes: Routes = [
      { path: 'mso', component: MsoComponent },
      { path: 'lmo', component: LmoComponent },
      { path: 'enrolments', component: EnrolmentComponent },
      { path: 'packageagreement', component: PackageAgreementComponent },
      { path: 'port-allocation', component: PortAssignmentComponent },
      { path: 'mso/profile', component: TenantMsoProfileComponent },
      { path: 'lmo/profile', component: TenantLmoProfileComponent },
      { path: 'mso/profile/:id', component: TenantMsoProfileComponent },
      { path: 'lmo/profile/:id', component: TenantLmoProfileComponent },
      { path: '', component: TenantsComponent },
      { path: 'package-agreement-approvals', component: PackageAgreementApprovalsComponent},
      // { path: 'lmo/dashborad', component: DashboardComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TenantsRoutingModule { }
