import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatInputModule, MatFormFieldModule, MatToolbarModule, MatPaginatorModule, MatListModule, MatDialogModule,
  MatProgressSpinnerModule, MatSelectModule, MatOptionModule, MatDatepickerModule, MatCardModule, MatGridListModule, MatBottomSheetModule, MatDividerModule,
  MatRadioModule, MatButtonToggleModule, MatIconModule, MatCheckboxModule
} from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  DxDataGridModule,
  DxBulletModule,
  DxTemplateModule
} from 'devextreme-angular';
import { MaterialModuleList } from 'app/main/apps/material.module';
import { DsSidebarModule } from '@glits/components';
import { SharedModule } from '../../shared/shared.module';
import { DsSharedModule } from '@glits/shared.module';
import { PackageRoutingModule } from './package-routing.module';

import { LanguagesComponent } from './master/Languages/languages.component';
import { BroadcastersComponent } from './master/Broadcasters/broadcasters.component';
import { PackageservicetypeComponent } from './master/Packageservicetype/packageServicetype.component';
// import { GenrelistComponent } from './master/Genrelist/genrelist.component';
import { ServingassertlistComponent } from './master/Servingassertlist/Servingassertlist.component';
import { ServingcabletypelistComponent } from './master/Servingcabletypelist/Servingcabletypelist.component';
import { PackageplanComponent } from './master/Packageplan/packagePlan.component';
import { CresrvceComponent } from './master/Cresrvce/cresrvce.component';
import { PckgevoipfeaturesComponent } from './master/Pckgevoipfeatures/pckgevoipFeatures.component';
import { PckgeiptvchannelsComponent } from './master/Pckgeiptvchannels/pckgeIptvChannels.component';
import { GenrelistComponent } from './master/Genrelist/genrelist.component';
import { PackageservicelstComponent } from './master/Packageservicelst/packageServiceLst.component';
// import { GenrelistComponent } from '../general/package/Genrelist/genrelist.component';

@NgModule({
  declarations: [LanguagesComponent,
    BroadcastersComponent,
    CresrvceComponent,
    PackageservicetypeComponent,
    GenrelistComponent,
    PackageservicelstComponent,
    ServingassertlistComponent,ServingcabletypelistComponent,
    PackageplanComponent,
    PckgevoipfeaturesComponent,
    PckgeiptvchannelsComponent],
  imports: [
    CommonModule,
    MaterialModuleList,
    DsSidebarModule,
    PackageRoutingModule,
    DsSharedModule,
    SharedModule,
    MatInputModule, MatFormFieldModule, MatToolbarModule, MatPaginatorModule, MatListModule, MatDialogModule,
    MatProgressSpinnerModule, MatSelectModule, MatOptionModule, MatDatepickerModule, MatCardModule, MatGridListModule, MatBottomSheetModule, MatDividerModule,
    MatRadioModule, MatButtonToggleModule, MatIconModule, MatCheckboxModule,
    FormsModule,
    ReactiveFormsModule,
    DxDataGridModule,
    DxTemplateModule,
    DxBulletModule
  ],
})
export class PackageModule { }
