import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CafEventStatusComponent } from './caf-event-status/caf-event-status.component';
import { CafStatusComponent } from './master/CafStatus/caf-status.component';
import { CafTypeComponent } from './master/CafType/caf-type.component';
import { CafFormComponent } from './master/caf-form/caf-form.component';
import { CustomerComponent } from './master/customer/customer.component';
import { EnterprieseCustomersComponent } from './master/enterpriese-customers/enterpriese-customers.component';
import { EntcafFormComponent } from './master/entcaf-form/entcaf-form.component';
import { EntNodeAdditionFormComponent } from './master/ent-node-addition-form/ent-node-addition-form.component';
import { EntrpecstmrtypComponent } from './master/Entrpecstmrtyp/EntrpeCstmrTyp.component';
import { EntrpecstmrsubtypComponent } from './master/Entrpecstmrsubtyp/EntrpeCstmrSubTyp.component';
import { BulkCafUploadComponent } from './master/bulk-caf-upload/bulk-caf-upload.component';
import { CustomerProfileComponent } from './master/customer/customer-profile/customer-profile.component';
// import { EnterpriseCustomerProfileComponent } from './master/enterpriese-customers/enterprise-customer-profile/enterprise-customer-profile.component';
import { CafTerminationsComponent } from './operations/caf-terminations/caf-terminations.component';
import { BulkUploadWorkOrderComponent } from './master/bulk-upload-work-order/bulk-upload-work-order.component';
import { LmoBlckUploadComponent } from './master/lmo-blck-upload/lmo-blck-upload.component';
import { CafbulkformComponent } from './master/cafbulkform/cafbulkform.component';
// import { CustomerCallCenterComponent } from './master/customerCallCenter/customer-call-center/customer-call-center.component';
import { EntCafadditionFormComponent } from './master/enterpriese-customers/ent-cafaddition-form/ent-cafaddition-form.component';
import { IndividualCafComponent } from './master/individual-caf/individual-caf.component';
import { EnterpriseCustEditComponent } from './master/enterpriese-customers/enterprise-cust-edit/enterprise-cust-edit.component';
import { CustomerEditComponent } from './master/customer/customer-edit/customer-edit.component';
import { EnterpriceCafComponent } from './master/enterprice-caf/enterprice-caf.component';
import { EnterpriceCafListComponent } from './master/enterprice-caf-list/enterprice-caf-list.component';
import { EnterpriceCafFormComponent } from './master/enterprice-caf-form/enterprice-caf-form.component';
import { ServicePackComponent } from './master/customer/service-pack/service-pack.component';
import { EnterpriseDashboardComponent } from './master/enterpriese-customers/dashboard/enterprise-dashboard/enterprise-dashboard.component';
import {CafUpdationComponent} from './operations/caf-updation/caf-updation.component'
import { OltDashboardComponent } from './master/olt-dashboard/olt-dashboard.component';
import { EnterpriseCustomerProfileComponent } from './master/enterpriese-customers/enterprise-customer-profile/enterprise-customer-profile.component';
import { CafBulkTerminationsComponent } from './operations/caf-bulk-terminations/caf-bulk-terminations.component';
import { BulkResumeComponent } from 'app/main/apps/caf/operations/bulk-resume/bulk-resume.component';
import { BbnlCafFormComponent } from './master/bbnl-caf-form/bbnl-caf-form.component';
import { CafUpdationNewComponent } from './operations/caf-updation-new/caf-updation-new.component';
import { BbnlIndCafFormComponent } from './master/bbnl-ind-caf-form/bbnl-ind-caf-form.component';
import { BbnlEntDashboardComponent } from './master/enterpriese-customers/dashboard/bbnl-ent-dashboard/bbnl-ent-dashboard.component';
import { GoiEntCafFormComponent } from './master/goi-ent-caf-form/goi-ent-caf-form.component';
const routes: Routes = [
{ path     : 'event-status', component: CafEventStatusComponent},
{ path     : 'goi-new-caf', component: GoiEntCafFormComponent},
{ path     : 'Status', component: CafStatusComponent},
{ path     : 'new-caf', component: CafFormComponent},
{ path     : 'bbnl-new-caf', component: BbnlCafFormComponent},
{ path 		: 'bbnl-ind-new-caf', component: BbnlIndCafFormComponent},
{ path     : 'customers', component: CustomerComponent},
{ path     : 'entcustomers', component: EnterprieseCustomersComponent},
{ path     : 'entfrm', component: EntcafFormComponent},
{ path     : 'entcstmrtyp', component: EntrpecstmrtypComponent},
{ path     : 'entcstmrsubtyp', component: EntrpecstmrsubtypComponent},
{ path     : 'new-node', component: EntNodeAdditionFormComponent},
{ path     : 'type', component: CafTypeComponent},
{ path     : 'customer/profile', component: CustomerProfileComponent},
{ path     : 'customer/service-pack', component: ServicePackComponent},
{ path     : 'lmo-blck-upld', component: LmoBlckUploadComponent},
{ path     : 'caf-blck-frm', component: CafbulkformComponent},
{ path     : 'olt', component: OltDashboardComponent},
{ path     : 'entcustomer/profile', component: EnterpriseCustomerProfileComponent},
{ path     : 'entcustomer/new-caf', component: EntCafadditionFormComponent},
{ path     : 'individual/new-caf', component: IndividualCafComponent},
{ path     : 'bulk-caf-upload', component: BulkCafUploadComponent},
{ path     : 'termination', component: CafTerminationsComponent},
{ path     : 'blktermination', component: CafBulkTerminationsComponent},
{ path     : 'entcustomer/caf-edit', component: EnterpriseCustEditComponent},
{ path     : 'blkresume', component: BulkResumeComponent},
{ path     : 'enterprice/organization', component: EnterpriceCafComponent},
{ path     : 'enterprice/list', component: EnterpriceCafListComponent},
{ path     : 'enterprice/caf/form', component: EnterpriceCafFormComponent},
{ path     : 'individual/caf-edit', component: CustomerEditComponent},
{ path		: 'entBbnlcustomer/dashboard', component: BbnlEntDashboardComponent},
{ path     : 'entcustomer/dashboard', component: EnterpriseDashboardComponent},
{ path     : 'Bulk-Upload/WorkOrder', component: BulkUploadWorkOrderComponent},
{ path     : 'updation', component: CafUpdationComponent},
{ path     : 'updation_new', component: CafUpdationNewComponent},
{ path     : 'ent-dashboard/AP-RAITHU-BAROSA-200000899', component: EnterpriseCustomerProfileComponent},
{ path     : 'ent-dashboard/Village-Ward-Secretariats-200043253', component: EnterpriseCustomerProfileComponent},
{ path     : 'ent-dashboard/ENT-SCHOOL-EDUCATION-100053', component: EnterpriseCustomerProfileComponent},
// { path     : 'callcenter/customers', component: CustomerCallCenterComponent}
];



@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CAFRoutingModule { }

