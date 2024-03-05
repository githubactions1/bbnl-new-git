import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule, MatDividerModule, MatFormFieldModule, MatIconModule, MatMenuModule, MatSelectModule, MatTabsModule, MatCardModule, MatGridListModule, MatRadioModule, MatSidenavModule, MatButtonToggleModule, MatInputModule, MatOptionModule, MatCheckboxModule, MatProgressSpinnerModule, MatDatepickerModule, MatNativeDateModule, MatAutocompleteModule, MatDialogModule, MatPaginatorModule, MatToolbarModule, MatListModule, MatSnackBarModule, MatSlideToggleModule, MatTooltipModule, MatDialog, MatRippleModule } from '@angular/material';

import { DsSharedModule } from '@glits/shared.module';
import { DsWidgetModule, DsProgressBarModule, DsSidebarModule } from '@glits/components';
import { SharedModule } from '../../../../shared/shared.module'
import { MaterialModuleList } from '../../../material.module';
import { SidemenuComponent } from './sidemenu/sidemenu.component';


@NgModule({
  declarations: [
    SidemenuComponent
  ],
  imports: [
    CommonModule,
    // DsSidebarModule,
    // DsThemeOptionsModule,
    SharedModule,
    MaterialModuleList,
    MatButtonModule,
    MatDividerModule,
    MatFormFieldModule,
    MatIconModule,
    // Ds modules
    DsProgressBarModule,
    DsSharedModule,
    DsSidebarModule,
    //DsThemeOptionsModule,
    MatMenuModule,
    MatSelectModule,
    MatRippleModule,

    MatTabsModule,
    // DsNavigationModule,
    DsWidgetModule,
    MatCardModule, MatGridListModule, MatRadioModule, MatSidenavModule, MatButtonToggleModule,
    MatInputModule, MatOptionModule, MatCheckboxModule, MatProgressSpinnerModule,
    MatDatepickerModule, MatNativeDateModule, MatAutocompleteModule, MatDialogModule, MatPaginatorModule, MatToolbarModule, MatListModule, MatSnackBarModule

  ],
  exports: [
    SidemenuComponent
  ]
})
export class SupportLayoutModule { }
