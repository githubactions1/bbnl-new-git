import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTabsModule, MatDividerModule,
  MatInputModule, MatFormFieldModule, MatGridListModule, MatSelectModule, MatOptionModule, MatCheckboxModule, MatProgressSpinnerModule,
  MatDatepickerModule, MatNativeDateModule, MatAutocompleteModule, MatDialogModule, MatPaginatorModule, MatToolbarModule, MatListModule, MatSidenavModule,
  MatButtonToggleModule, MatRadioModule, MatIconModule, MatButtonModule } from '@angular/material';
  import {  DxDataGridModule,  DxBulletModule, DxTemplateModule, DxButtonModule, DxNumberBoxModule, 
    DxCheckBoxModule, DxSelectBoxModule, DxTabPanelModule } from 'devextreme-angular';

import { DsSharedModule } from '@glits/shared.module';
import { LoginComponent } from 'app/main/auth/login/login.component';
import { RegisterComponent } from 'app/main/auth/register/register.component';
import { ResetPasswordComponent } from 'app/main/auth/reset-password/reset-password.component';
import { ForgotPasswordComponent } from 'app/main/auth/forgot-password/forgot-password.component';
import {MatCardModule} from '@angular/material/card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MsoEnrollmentComponent} from 'app/main/auth/tenant-enrollment/mso-enrollment/mso-enrollment.component';
import { LmoEnrollmentComponent} from 'app/main/auth/tenant-enrollment/lmo-enrollment/lmo-enrollment.component';
import { AuthRoutingModule } from './auth-routing.module';
import { SharedModule } from 'app/main/shared/shared.module';
import { MaterialModuleList } from 'app/main/apps/material.module';
import { TenantEnrollmentOtpDialogComponent } from '../auth/tenant-enrollment/tenant-enrollment-otp-dialog/tenant-enrollment-otp-dialog.component';
// import { UserProfileComponent } from './user-profile/user-profile.component';

@NgModule({
  declarations: [LoginComponent,
                 RegisterComponent,
                 ResetPasswordComponent,
                 ForgotPasswordComponent, MsoEnrollmentComponent, LmoEnrollmentComponent, TenantEnrollmentOtpDialogComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
   MatTabsModule, MatDividerModule,
  MatInputModule, MatFormFieldModule, MatGridListModule, MatSelectModule, MatOptionModule, MatCheckboxModule, MatProgressSpinnerModule,
  MatDatepickerModule, MatNativeDateModule, MatAutocompleteModule, MatDialogModule, MatPaginatorModule, MatToolbarModule, MatListModule, MatSidenavModule,
  MatButtonToggleModule, MatRadioModule, MatIconModule, MatButtonModule,
    DsSharedModule,
    SharedModule,
    MatToolbarModule,
    MatCardModule,
    FormsModule,
    DxDataGridModule,  DxBulletModule, DxTemplateModule, DxButtonModule, DxNumberBoxModule, 
    DxCheckBoxModule, DxSelectBoxModule, DxTabPanelModule,
    ReactiveFormsModule,
    MaterialModuleList,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  entryComponents: [TenantEnrollmentOtpDialogComponent]

})
export class AuthModule { }
