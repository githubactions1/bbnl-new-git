import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModuleList } from 'app/main/apps/material.module';
import { DsSidebarModule } from '@glits/components';
import { SharedModule } from 'app/main/shared/shared.module'

import { ExportService } from 'app/main/services/export.service';

import { AppstoreRoutingModule } from './appstore-routing.module';
import { AppstoreComponent } from './appstore.component';
import { AppstoreListComponent } from './master/appstore/appstore-list/appstore-list.component';
import { AppstoreEditComponent } from './master/appstore/appstore-edit/appstore-edit.component';
import { AppsEditComponent } from './master/apps/apps-edit/apps-edit.component';
import { AppsListComponent } from './master/apps/apps-list/apps-list.component';
import { AppsDtlComponent } from './master/apps/apps-dtl/apps-dtl.component';
import { DxDataGridModule,
  DxBulletModule,
  DxTemplateModule } from 'devextreme-angular';


@NgModule({
  declarations: [AppstoreComponent, AppstoreListComponent, AppstoreEditComponent, AppsEditComponent, AppsListComponent, AppsDtlComponent],
  imports: [
    CommonModule,
    MaterialModuleList,
    DsSidebarModule,
    SharedModule,
    AppstoreRoutingModule,
    DxDataGridModule,
    DxTemplateModule,
    DxBulletModule

  ],
  providers: [ExportService]
})
export class AppstoreModule { }
