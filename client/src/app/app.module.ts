import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DatePipe } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes, CanActivate  } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
// import { MatButtonModule, MatIconModule, MatCardModule, MatGridListModule, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { TranslateModule } from '@ngx-translate/core';
import 'hammerjs';
import { NgxQRCodeModule } from 'ngx-qrcode2';
import { NgxPaginationModule } from 'ngx-pagination';
import { AtomService } from './main/services/atom.service';

import { DsModule } from '@glits/ds.module';
import { DsSharedModule } from '@glits/shared.module';
import { DsProgressBarModule, DsSidebarModule } from '@glits/components';
//import { DsProgressBarModule, DsSidebarModule, DsThemeOptionsModule } from '@glits/components';
import { dsConfig } from 'app/ds-config';

import { AppComponent } from 'app/app.component';
import { LayoutModule } from 'app/layout/layout.module';
// import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import {
    MatTabsModule, MatDividerModule,
    MatInputModule, MatFormFieldModule, MatGridListModule, MatSelectModule, MatOptionModule, MatCheckboxModule, MatProgressSpinnerModule,
    MatDatepickerModule, MatNativeDateModule, MatAutocompleteModule, MatDialogModule, MatPaginatorModule, MatToolbarModule, MatListModule, MatSidenavModule,
    MatButtonToggleModule, MatRadioModule, MAT_DIALOG_DATA, MatDialogRef, MAT_DATE_LOCALE, MatSnackBar, MatIconModule, MatButtonModule
} from '@angular/material';
import { HttpConfigInterceptor } from './providers/http/http.interceptor';
import { UserService } from './providers/user/user.serivce';
import { SessionPopup } from './providers/http/sessionPopups';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { UserProfileComponent } from './main/auth/user-profile/user-profile.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { SharedModule } from './main/shared/shared.module';
// import { ReportsComponent} from './main/apps/general/reports/reports.component';
import { MessageDialogService } from './providers/message-dialog/message_dailog.service';
import { LightboxModule } from 'ngx-lightbox';
import { ExternalApiComponent } from './main/external-api/external-api.component';
import { TransfereService } from 'app/providers/transfer/transfer.service';
import { DxTemplateModule, DxDataGridModule, DxBulletModule, DxButtonModule, DxNumberBoxModule, DxCheckBoxModule, DxSelectBoxModule, DxTabPanelModule } from 'devextreme-angular';
import { ApiRequestDetailComponent } from './main/external-api/api-request-detail/api-request-detail.component';
// import { AuthGuardService} from './main/auth/auth-guard.service';
// import { SupportServiceComponent } from './main/apps/general/test/support-service.component';
// import { DesignationServiceComponent } from './main/apps/general/test/DesignationService/designation-service.component';
//import { SupportServiceComponent } from './main/apps/general/test/support-service.component';
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';
import { VideosComponent } from './main/apps/videos/videos.component';
import { QRCodeModule } from 'angularx-qrcode';


const appRoutes: Routes = [
    { path: 'apps', loadChildren: './main/apps/apps.module#AppsModule' },
    // { path: 'admin', loadChildren: './main/auth/auth.module#AuthModule', canActivate: [AuthGuardService] },
    { path: 'admin', loadChildren: './main/auth/auth.module#AuthModule' },
    // { path: 'pages', loadChildren: './main/shared/pages/pages.module#PagesModule' },
    { path: 'admin/home', loadChildren: './main/apps/home/home.module#HomeModule' },
    { path: 'admin/crm', loadChildren: './main/apps/crm/crm.module#CrmModule' },
    { path: 'admin/prepaid', loadChildren: './main/apps/pre-paid-dashboard/pre-paid-dashboard.module#PrePaidDashboardModule' },
	{ path: 'admin/cmplnts', loadChildren: './main/apps/new-complaints/new-complaints.module#NewComplaintsModule' },
    { path: 'admin/erp', loadChildren: './main/apps/erp/erp.module#ErpModule' },
    { path: 'admin/inventory', loadChildren: './main/apps/inventory/inventory.module#InventoryModule' },
    { path: 'admin/monitoring', loadChildren: './main/apps/monitoring/monitoring.module#MonitoringModule' },
    { path: 'admin/marketing', loadChildren: './main/apps/marketing/marketing.module#MarketingModule' },
    { path: 'admin/sc/agent', loadChildren: './main/apps/selfcare/agents-sc/agents-sc.module#AgentsScModule' },
    { path: 'admin/sc/customer', loadChildren: './main/apps/selfcare/customers-sc/customers-sc.module#CustomersScModule' },
    { path: 'admin/sc/ent-customer', loadChildren: './main/apps/selfcare/ent-customers-sc/ent-customers-sc.module#EntCustomersScModule' },
    { path: 'admin/sc/supplier', loadChildren: './main/apps/selfcare/suppliers-sc/suppliers-sc.module#SuppliersScModule' },
    // { path: 'admin/selfcare/agent', loadChildren: './main/apps/selfcare/agents-sc/agents-sc.module#AgentsScModule' },

    { path: 'admin/support', loadChildren: './main/apps/general/support/support.module#SupportModule' },
    { path: 'admin/batch', loadChildren: './main/apps/general/batch/batch.module#BatchModule' },
    { path: 'admin/lms', loadChildren: './main/apps/lms/lms.module#LmsModule' },
    { path: 'admin/setup', loadChildren: './main/apps/general/setup/setup.module#SetupModule' },
    { path: 'admin/admin', loadChildren: './main/apps/general/admin/admin.module#AdminModule' },
    { path: 'admin/caf', loadChildren: './main/apps/caf/caf.module#CAFModule' },
    { path: 'admin/callcenter', loadChildren: './main/apps/callcenter/callcenter.module#CallcenterModule'},
    { path: 'admin/package', loadChildren: './main/apps/package/package.module#PackageModule' },
    { path: 'admin/reports', loadChildren: './main/apps/general/reports/reports.module#ReportsModule' },
    { path: 'admin/map', loadChildren: './main/apps/maps/maps.module#MapsModule' },
    { path: 'admin/userprofile', component: UserProfileComponent },
    { path: 'admin/changelog', loadChildren: './main/apps/general/change-log/change-log.module#ChangeLogModule' },
    { path: 'admin/notifications', loadChildren: './main/apps/general/notifications/notifications.module#NotificationsModule' },
    { path: 'admin/appstore'     , loadChildren: './main/apps/general/appstore/appstore.module#AppstoreModule' },
    { path: 'admin/tenant', loadChildren: './main/apps/tenants/tenants.module#TenantsModule' },
    { path: 'admin/billing', loadChildren: './main/apps/billing/billing.module#BillingModule' },
    // { path: 'enrollment', loadChildren: './main/auth/tenant-enrollment/tenant-enrollment.module#TenantEnrollmentModule' },

   {path:'admin/externalapi',component:ExternalApiComponent},
   {path:'admin/help',component:VideosComponent},
   {path:'admin/api-request-detail',component:ApiRequestDetailComponent},
   {path:'admin/curl', loadChildren: './main/apps/curl/curl.module#CurlModule' },
   {path:'admin/ILL/caf', loadChildren: './main/apps/ill-cafs/ill-cafs.module#IllCafsModule' },
   
   //{path:'admin/cafnew', loadChildren: './main/apps/cafnew/cafnew.module#CafnewModule' },

    // ticketing system routes
    // -----------------------------
    // { path: 'report', component: ReportsComponent },
  

    { path: '**', redirectTo: 'admin' }
];

@NgModule({
    declarations: [
        AppComponent,
        SessionPopup,
        UserProfileComponent,
        ExternalApiComponent,
        VideosComponent,
        ApiRequestDetailComponent
    ],
    imports: [

        BrowserAnimationsModule,
        HttpClientModule,
        HttpModule,
        FormsModule,
        NgxQRCodeModule,
        ReactiveFormsModule,
        RouterModule.forRoot(appRoutes, { useHash: false }),
        MatExpansionModule,
        MatButtonModule,
        NgxPaginationModule,
        AngularFontAwesomeModule,
        TranslateModule.forRoot(),
        // FroalaEditorModule.forRoot(), FroalaViewModule.forRoot(),
        // Material moment date module
        MatMomentDateModule,

        // Material
        // Ds modules
        DsModule.forRoot(dsConfig),
        DsProgressBarModule,
        DsSharedModule,
        BrowserModule,
        DsSidebarModule,
       // DsThemeOptionsModule,
        // App modules
        LayoutModule,
        MatSidenavModule,
        // SampleModule,
        MatToolbarModule, MatIconModule, MatGridListModule,
        MatTabsModule, MatDividerModule,
        MatInputModule, MatFormFieldModule, MatSelectModule, MatOptionModule,  MatRadioModule, MatCheckboxModule, MatProgressSpinnerModule,
        MatDatepickerModule, MatNativeDateModule, MatAutocompleteModule, MatDialogModule, MatPaginatorModule, MatToolbarModule, MatListModule,
        SharedModule, MatButtonToggleModule, LightboxModule,
        DxDataGridModule,
    DxTemplateModule,
    DxBulletModule,
    DxButtonModule, DxNumberBoxModule, 
    DxCheckBoxModule, DxSelectBoxModule, DxTabPanelModule,QRCodeModule
    ],
    entryComponents: [
        SessionPopup
        //, ChangeLogModalComponent
    ],
    bootstrap: [
        AppComponent
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: HttpConfigInterceptor, multi: true },
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DATE_LOCALE, useValue: 'en-GB' },
        UserService, DatePipe, MatSnackBar, MessageDialogService,AtomService,TransfereService
        // AuthGuardService
    ]
})
export class AppModule {
}
