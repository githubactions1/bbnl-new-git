import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule, MatDividerModule, MatFormFieldModule, MatIconModule, MatMenuModule, MatSelectModule, MatTabsModule, MatCardModule, MatGridListModule, MatRadioModule, MatSidenavModule, MatButtonToggleModule, MatInputModule, MatOptionModule, MatCheckboxModule, MatProgressSpinnerModule, MatDatepickerModule, MatNativeDateModule, MatAutocompleteModule, MatDialogModule, MatPaginatorModule, MatToolbarModule, MatListModule, MatSnackBarModule, MatSlideToggleModule, MatTooltipModule, MatDialog, MatRippleModule } from '@angular/material';

import { DsSharedModule }from '@glits/shared.module';
import { DsWidgetModule, DsProgressBarModule, DsSidebarModule } from '@glits/components';
import { SharedModule } from '../../../../shared/shared.module'
import { MaterialModuleList } from '../../../material.module';
import { PagesComponent } from './pages/pages.component';
import { SectionComponent } from './pages/sections/sections.component';
import { RouterModule, Routes } from '@angular/router';
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';
import 'froala-editor/js/plugins/font_size.min.js';
import 'froala-editor/js/plugins/font_family.min.js';
import 'froala-editor/js/plugins/colors.min.js';
import 'froala-editor/js/plugins/table.min.js';
import 'froala-editor/js/plugins/paragraph_format.min.js';
import 'froala-editor/js/plugins/paragraph_style.min.js';
import 'froala-editor/js/plugins/lists.min.js';
import 'froala-editor/js/plugins/image.min.js';

const routes: Routes = [
  { path: 'kb', component: SectionComponent },
    { path: 'kb/:pge_nm', component: SectionComponent },
  ];

@NgModule({
  declarations: [
    PagesComponent,SectionComponent
  ],
  imports: [
    CommonModule,
        FroalaEditorModule.forRoot(), FroalaViewModule.forRoot(),
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
    MatDatepickerModule, MatNativeDateModule, MatAutocompleteModule, MatDialogModule, MatPaginatorModule, MatToolbarModule, MatListModule, MatSnackBarModule,
    RouterModule.forChild(routes)

  ],
  exports: [RouterModule],
  entryComponents: [
    PagesComponent,SectionComponent
  ],
})
export class CallCenterModule { }
