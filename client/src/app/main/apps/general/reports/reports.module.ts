import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// tslint:disable-next-line:max-line-length
import {
  MatButtonModule, MatIconModule, MatCardModule, MatGridListModule, MatRadioModule, MatSidenavModule, MatSnackBar, MAT_DIALOG_DATA, MatDialogRef, MatButtonToggleModule, MAT_DATE_LOCALE
  , MatTabsModule, MatDividerModule,
  MatInputModule, MatFormFieldModule, MatSelectModule, MatOptionModule,  MatCheckboxModule, MatProgressSpinnerModule,
  MatDatepickerModule, MatNativeDateModule, MatAutocompleteModule, MatDialogModule, MatPaginatorModule, MatToolbarModule, MatListModule, MatSnackBarModule
} from '@angular/material';
import { ReportsRoutingModule } from './reports-routing.module';

import { CustomMonthlyReportComponent } from './custom-monthly-report/custom-monthly-report.component';
import { ReportsComponent } from './reports.component';

import { CustomReportBldrComponent } from './builders/custom-report-bldr/custom-report-bldr.component';
import { MonthlyReportBldrComponent } from './builders/monthly-report-bldr/monthly-report-bldr.component';
// import { CustomReportComponent } from './viewers/custom-report/custom-report.component';
import { MonthlyReportComponent } from './viewers/monthly-report/monthly-report.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginInfoComponent } from './login-info/login-info.component';
import { DsSharedModule } from '@glits/shared.module';
import {SharedModule} from '../../../shared/shared.module'

import { DxDataGridModule,
         DxBulletModule,
         DxTemplateModule } from 'devextreme-angular';

@NgModule({
  declarations: [MonthlyReportComponent, ReportsComponent, CustomReportBldrComponent, MonthlyReportBldrComponent,
      DashboardComponent, LoginInfoComponent, CustomMonthlyReportComponent
    //, TerritorialUnitsListComponent
  ],

  imports: [
    CommonModule,
    DsSharedModule,
    SharedModule,
    ReportsRoutingModule,
    MatButtonModule, MatIconModule, MatCardModule, MatGridListModule, MatRadioModule, MatSidenavModule, MatButtonToggleModule
    , MatTabsModule, MatDividerModule,
    MatInputModule, MatFormFieldModule, MatSelectModule, MatOptionModule,  MatCheckboxModule, MatProgressSpinnerModule,
    MatDatepickerModule, MatNativeDateModule, MatAutocompleteModule, MatDialogModule, MatPaginatorModule, MatToolbarModule, MatListModule, MatSnackBarModule,
    DsSharedModule,
    MatDatepickerModule,DxDataGridModule,
         DxBulletModule,
         DxTemplateModule
  ],
  exports: [ReportsComponent],
  providers: [
    { provide: MAT_DIALOG_DATA, useValue: {} },
    { provide: MatDialogRef, useValue: {} },
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' },
    MatSnackBar,
  ]
})
export class ReportsModule { }