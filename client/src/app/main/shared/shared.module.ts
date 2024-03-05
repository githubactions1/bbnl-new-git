import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { SharedRoutingModule } from './shared-routing.module';
import { MaterialModuleList } from '../apps/material.module';
import { DsSidebarModule, DsProgressBarModule } from '@glits/components';
import { DsSharedModule } from '@glits/shared.module';
import {
  MatTabsModule, MatDividerModule, MatIconModule,
  MatInputModule, MatFormFieldModule, MatSelectModule, MatOptionModule,  MatCheckboxModule, MatProgressSpinnerModule,
  MatDatepickerModule, MatNativeDateModule, MatAutocompleteModule, MatDialogModule, MatPaginatorModule, MatToolbarModule, MatListModule, MatCardModule,
} from '@angular/material';

//import { FltrHeaderSrvc } from 'app/providers/filterheader/fltrheader.service';
import { TopHeaderSrvc } from 'app/providers/top-header/top-header-service';
import { DialogComponent } from './components/dialog/dialog.component';
import { VcardComponent } from './components/vcard/vcard.component';
import { DownloadButtonComponent } from './components/download-button/download-button.component';
// import { BottomSheetExample } from './components/to-bottom-sheet/bottom-sheet-example';
import { UserFinderComponent } from './components/user-finder/user-finder.component';
import { AccordionComponent } from './components/accordion/accordion.component';
import { MessageDialogComponent } from './components/message-dialog/message-dialog.component';
import { PdfDownloadComponent } from './components/pdf-download/pdf-download.component';


// components
import { DsFormBuilderComponent } from './components/ds-form-builder/ds-form-builder.component';
import { FieldBuilderComponent } from './components/ds-form-builder/field-builder/field-builder.component';
import { TextBoxComponent } from './components/ds-form-builder/atoms/textbox';
import { DropDownComponent } from './components/ds-form-builder/atoms/dropdown';
import { FileComponent } from './components/ds-form-builder/atoms/file';
import { CheckBoxComponent } from './components/ds-form-builder/atoms/checkbox';
import { RadioComponent } from './components/ds-form-builder/atoms/radio';
import { TopHeaderComponent } from './components/top-header/top-header.component';
import { NotificationBarComponent } from './components/notification-bar/notification-bar.component';
import { PgTopHeaderComponent } from './components/pg-top-header/pg-top-header.component';
import { FilterPipe } from '../apps/general/filters/filter.pipe';
import { GrpFilterPipe } from '../apps/general/filters/filterGrp.pipe ';
import { CustomReportComponent } from '../apps/general/reports/viewers/custom-report/custom-report.component';
import { DeleteDialogComponent } from '../shared/components/delete-dialog/delete-dialog.component';

import { DxDataGridModule,
  DxBulletModule,
  DxTemplateModule, DxChartModule } from 'devextreme-angular';
import { DatePickerComponent } from './components/ds-form-builder/atoms/datapicker';
import { EventsComponent } from './components/events/events.component';
import { NotesComponent } from './components/notes/notes.component';
import { HTTP_INTERCEPTORS, HttpClient} from '@angular/common/http';
import { ModuleWithProviders } from '@angular/compiler/src/core';
import { HttpConfigInterceptor } from 'app/providers/http/http.interceptor';
import { LoadingComponent } from './components/loading/loading.component';
import { CustomerProfileComponent } from '../apps/caf/master/customer/customer-profile/customer-profile.component';
import { TenantLmoProfileComponent } from '../apps/tenants/dashboard/tenant-lmo-profile/tenant-lmo-profile.component';


@NgModule({
  declarations: [ DsFormBuilderComponent,CustomerProfileComponent,TenantLmoProfileComponent,
    FieldBuilderComponent,
    TextBoxComponent,
    DropDownComponent,
    CheckBoxComponent,
    FileComponent,
    RadioComponent,
    DatePickerComponent,
    VcardComponent,  DialogComponent,
    DownloadButtonComponent,
    // BottomSheetExample,
    UserFinderComponent, MessageDialogComponent, AccordionComponent, PdfDownloadComponent, TopHeaderComponent, NotificationBarComponent, 
   UserFinderComponent, PgTopHeaderComponent, FilterPipe, GrpFilterPipe, CustomReportComponent, DeleteDialogComponent, EventsComponent, NotesComponent, LoadingComponent
   ],
  imports: [
    CommonModule,
    SharedRoutingModule,
    MaterialModuleList,
    DsSidebarModule,
    //DsThemeOptionsModule,
    DsProgressBarModule,
    DsSharedModule,
    MatDividerModule,
    MatIconModule,
    DxDataGridModule,
         DxBulletModule,
         DxTemplateModule, DxChartModule
  ],
  exports: [
    DsFormBuilderComponent,
    DownloadButtonComponent,
    PdfDownloadComponent,
    UserFinderComponent,
    AccordionComponent,
    TopHeaderComponent,
    NotificationBarComponent,
    PgTopHeaderComponent,
    FilterPipe,
    GrpFilterPipe,
    CustomReportComponent,
    DeleteDialogComponent,
    EventsComponent, 
    NotesComponent,
    LoadingComponent,
    CustomerProfileComponent,
    TenantLmoProfileComponent
  ],
  providers : [
   // FltrHeaderSrvc
   TopHeaderSrvc,
   { provide: HTTP_INTERCEPTORS, useClass: HttpConfigInterceptor, multi: true },
  ],
  entryComponents: [
    MessageDialogComponent,
    DeleteDialogComponent
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class SharedModule {
	static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [
        HttpClient
      ]
    };
  }
 }
