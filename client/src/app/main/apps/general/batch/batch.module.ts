import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BatchRoutingModule } from './batch-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DashboardDialogComponent } from './dashboard/dashboard.component';
import { JobsComponent } from './jobs/jobs.component';
import { JobsEdtComponent } from './jobs/jobs-edt/jobs-edt.component';

import { ApiCallComponent } from './tasks/api-call/api-call.component';
import { RunSqlComponent } from './tasks/run-sql/run-sql.component';
import { RunShellComponent } from './tasks/run-shell/run-shell.component';
import { SendEmailComponent } from './tasks/send-email/send-email.component';
import { GenerateFilesComponent } from './tasks/generate-files/generate-files.component';
import { LoadFileComponent } from './tasks/load-file/load-file.component';
import { ExportFileComponent } from './tasks/export-file/export-file.component';
import { SendSMSComponent } from './tasks/send-sms/send-sms.component';
import { ExecuteJobComponent } from './tasks/execute-job/execute-job.component';
import { StartJobComponent } from './tasks/start-job/start-job.component';
import { EndJobComponent } from './tasks/end-job/end-job.component';
import { FtpComponent } from './tasks/ftp/ftp.component';
import { JobsHistoryComponent } from './jobs/jobs-history/jobs-history.component';
import { WaitForFileComponent } from './tasks/wait-for-file/wait-for-file.component';
import { JsonToXmlComponent } from './tasks/json-to-xml/json-to-xml.component';
import { XmlToJsonComponent } from './tasks/xml-to-json/xml-to-json.component';
import { DsSidebarModule } from '@glits/components';
import { SharedModule } from 'app/main/shared/shared.module';
import {
  MatInputModule, MatFormFieldModule, MatToolbarModule, MatPaginatorModule, MatListModule, MatDialogModule,
  MatProgressSpinnerModule, MatSelectModule, MatOptionModule, MatDatepickerModule, MatCardModule, MatGridListModule, MatBottomSheetModule, MatDividerModule,
  MatRadioModule, MatButtonToggleModule, MatIconModule, MatCheckboxModule, MatButtonModule
} from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {DsSharedModule} from '@glits/shared.module';

import { DxDataGridModule, DxBulletModule, DxTemplateModule, DxButtonModule } from 'devextreme-angular';

@NgModule({
  declarations: [DashboardComponent,
    JobsComponent,
    JobsEdtComponent,
    ApiCallComponent,
    RunSqlComponent,
    RunShellComponent,
    SendEmailComponent,
    GenerateFilesComponent,
    LoadFileComponent,
    ExportFileComponent,
    SendSMSComponent,
    ExecuteJobComponent,
    StartJobComponent,
    EndJobComponent,
    FtpComponent,
    JobsHistoryComponent,
    WaitForFileComponent,
    JsonToXmlComponent,
    XmlToJsonComponent,
    DashboardDialogComponent
   
    ],
  imports: [
    CommonModule,
    BatchRoutingModule,
    DxDataGridModule,
    DxTemplateModule,
    DxBulletModule,
    DxButtonModule,
    DsSidebarModule,
    SharedModule,
    MatInputModule, MatFormFieldModule, MatToolbarModule, MatPaginatorModule, MatListModule, MatDialogModule,
    MatProgressSpinnerModule, MatSelectModule, MatOptionModule, MatDatepickerModule, MatCardModule, MatGridListModule, MatBottomSheetModule, MatDividerModule,
    MatRadioModule, MatButtonToggleModule, MatIconModule, MatCheckboxModule, FormsModule,
    ReactiveFormsModule, DsSharedModule, MatButtonModule
  ],
  exports: [DashboardComponent, JobsComponent, JobsEdtComponent, ApiCallComponent, RunSqlComponent, RunShellComponent, SendEmailComponent, 
            GenerateFilesComponent, LoadFileComponent, ExportFileComponent, SendSMSComponent, ExecuteJobComponent, StartJobComponent, EndJobComponent, 
            FtpComponent, JobsHistoryComponent, WaitForFileComponent, JsonToXmlComponent, XmlToJsonComponent, DashboardDialogComponent],
  entryComponents: [DashboardDialogComponent]
})
export class BatchModule { }
