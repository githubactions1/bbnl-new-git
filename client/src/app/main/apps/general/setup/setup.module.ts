import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

// import { SetupSettingsSheet, GroupSettingsSheet } from './setup.component';


import {  MatInputModule, MatFormFieldModule , MatToolbarModule, MatPaginatorModule, MatListModule, MatDialogModule,
  MatProgressSpinnerModule, MatSelectModule, MatOptionModule, MatDatepickerModule, MatCardModule, MatGridListModule, MatBottomSheetModule, MatDividerModule,
  MatRadioModule, MatButtonToggleModule, MatIconModule, MatCheckboxModule  } from '@angular/material';

          
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { MaterialModuleList } from 'app/main/apps/material.module';
import { DsSidebarModule } from '@glits/components';

import { EmployeeGroupsService } from './empgroups/empgroups.service';
import { EmployeeService } from './empgroups/employee.service';

import { EmptypeComponent } from '../setup/emptype/emptype.component';
import { DsSharedModule } from '@glits/shared.module';
import { AddGroupFormDialogComponent } from '../../../apps/general/setup/empgroups/add-group-form-dialog/add-group-form-dialog.component';
import { DocModelComponent } from '../../../apps/general/setup/documentation/doc-model/doc-model.component';



import { SetupComponent } from './setup.component';
import { UserAccountComponent } from './user-account/user-account.component';
import {  EmployeesComponent } from './employees/employees.component';
// import { DepartmentsComponent} from './departments/departments.component';
// import { DesignationsComponent } from './designations/designations.component';
import { ContactsSelectedBarComponent } from './empgroups/selected-bar/selected-bar.component';
import { ContactsMainSidebarComponent } from './empgroups/sidebars/main/main.component';
// import { LocationsComponentDialog, LocationsComponent } from './locations/locations.component';
import { MembershipComponent } from './membership/membership.component';
// import { OptionsComponent } from './options/options.component';
// import { OrganizationComponent, OrganizationcomponentDialog } from './organization/organization.component';
import {  OutletsComponent } from './outlets/outlets.component';
import { SettingsComponent } from './settings/settings.component';
// import { AccountComponent } from './account/account.component';
import { DocumentationComponent } from './documentation/documentation.component';
import { EmpgroupsComponent } from './empgroups/empgroups.component';

import { MyprofileComponent } from './myprofile/myprofile.component';
// import { DistrictsComponent } from './districts/districts.component';
// import { StatesComponent } from './states/states.component';
// import { VillagesComponent } from './villages/villages.component';
// import { MandalsComponent } from './mandals/mandals.component';
// import { CitiesComponent } from './cities/cities.component';
import { UserAuditComponent } from './user-audit/user-audit.component';
// import { ChangeLogComponent} from './change-log/change-log.component';
// import { AddChangeLogComponent } from './change-log/add-change-log/add-change-log.component'
// import { ChangeLogModalComponent } from './change-log/change-log-modal/change-log-modal.component';
import { ReportProfileComponent } from './report-profile/report-profile.component';
import { OutletCategoryComponent } from './outlets/outlet-category/outlet-category.component';
import { MenuProfileComponent } from './menu-profile/menu-profile.component';
import { SetupProfileComponent } from './setup-profile/setup-profile.component';
import { RolesPermessionsComponent, RolescomponentDialog } from './roles-permessions/roles-permessions.component';
import { SharedModule } from '../../../shared/shared.module';
import { NotificationsComponent } from './notifications/notifications.component';
import { MyOrganisationComponent } from './my-organisation/my-organisation.component';
// import { FilterPipe } from '../filters/filter.pipe';
// import { SqlexecutionComponent } from '../sqlexecution_deleted/sqlexecution.component';
// import { GrpFilterPipe } from '../filters/filterGrp.pipe ';
import { DxDataGridModule,  DxBulletModule, DxTemplateModule, DxButtonModule } from 'devextreme-angular';

const lroutes: Routes = [
  // { path: 'designations', component: DesignationsComponent },
  // { path: 'departments', component: DepartmentsComponent },
  // { path: 'locations', component: LocationsComponent },
  { path: 'employees', component: EmployeesComponent },
  { path: 'users', component: UserAccountComponent },
  // { path: 'organization', component: OrganizationComponent },
  { path: 'profile', component: MyprofileComponent },
  // { path: 'states', component: StatesComponent},
  // { path: 'cities', component: CitiesComponent},
  // { path: 'mandals', component: MandalsComponent},
  // { path: 'villages', component: VillagesComponent},
  // { path: 'districts', component: DistrictsComponent},
  { path: 'my_audit', component: UserAuditComponent},
  // { path : 'change_log', component: ChangeLogComponent},
  // { path : 'add_change_log', component: AddChangeLogComponent},
  { path: 'outlets', component: OutletsComponent},
  { path: 'outlet_categories', component: OutletCategoryComponent},
  { path: 'report_profile', component: ReportProfileComponent},
  { path: 'menu_profile', component: MenuProfileComponent},
  { path: 'setup_profile', component: SetupProfileComponent},
  { path: 'permissions', component: RolesPermessionsComponent},
  { path: 'notifications', component: NotificationsComponent},
  { path: 'myorganisation', component: MyOrganisationComponent},
  { path: '', component: SetupComponent }
];
@NgModule({
  declarations: [
    EmptypeComponent,
    AddGroupFormDialogComponent,
    // ProductsComponent,
    // productsComponentDialog,
    DocModelComponent ,
    SetupComponent,
    UserAccountComponent,
    // EmployeesComponentDialog,
    // DepartmentsComponent,
    // // DepartmentsComponentDialog,
    // DesignationsComponent,
    ContactsSelectedBarComponent,
    ContactsMainSidebarComponent,
    // LocationsComponentDialog,
    MembershipComponent,
    // OptionsComponent,
    // OrganizationComponent,
    // OrganizationcomponentDialog,
   
    SettingsComponent,
    EmployeesComponent,
    // DesignationsComponentDialog,
    // LocationsComponent,
    OutletsComponent,
   OutletCategoryComponent,
    // AccountComponent,
    DocumentationComponent,
    EmpgroupsComponent,
    MyprofileComponent,
    // DistrictsComponent,
    // StatesComponent,
    // VillagesComponent,
    // MandalsComponent,
    // CitiesComponent,
    UserAuditComponent,
    // ChangeLogComponent,
    // AddChangeLogComponent,
    // ChangeLogModalComponent,
    ReportProfileComponent,
    MenuProfileComponent,
    SetupProfileComponent,
    RolesPermessionsComponent,
    NotificationsComponent,
    MyOrganisationComponent,
    // FilterPipe,
    RolescomponentDialog,
    // SqlexecutionComponent,
    // GrpFilterPipe
  ],
  imports: [
    RouterModule.forChild(lroutes),
    CommonModule,
    MaterialModuleList,
    DsSidebarModule,
    DsSharedModule,
    SharedModule,
    MatInputModule, MatFormFieldModule , MatToolbarModule, MatPaginatorModule, MatListModule, MatDialogModule, 
    MatProgressSpinnerModule, MatSelectModule, MatOptionModule, MatDatepickerModule, MatCardModule, MatGridListModule, MatBottomSheetModule, MatDividerModule,
    MatRadioModule, MatButtonToggleModule, MatIconModule, MatCheckboxModule ,
    FormsModule, 
    ReactiveFormsModule,DxDataGridModule,
    DxTemplateModule,
    DxBulletModule, DxButtonModule
  ],
 
  providers: [EmployeeService],
  entryComponents: [
    // DesignationsComponentDialog,
    // LocationsComponentDialog,
    // EmployeesComponentDialog,
    //OrganizationcomponentDialog
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SetupModule { }
