import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';

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
import { SharedModule } from '../../../shared/shared.module';
import { DsSharedModule } from '@glits/shared.module';

import { OrganisationsComponent } from './organisations/organisations.component';
import { MandalsComponent } from './mandals/mandals.component';

import { VillagesComponent } from './villages/villages.component';
import { CitiesComponent } from './cities/cities.component';
import { DesignationsComponent } from './designations/designations.component';
import { BranchesComponent } from './branches/branches.component';
import { BranchcategoryComponent } from './categories/branchCategory.component';
import { StatesComponent } from './states/states.component';
import { DistrictsComponent } from './districts/districts.component';
import { SubstntypComponent } from './Substntyp/subStnTyp.component';
import { SubstnComponent } from './Substn/subStn.component';


@NgModule({
  declarations: [
    StatesComponent, 
    DistrictsComponent,
    OrganisationsComponent,
    MandalsComponent,
    SubstnComponent,
    VillagesComponent,
    CitiesComponent,
    DesignationsComponent,
    BranchesComponent,
    BranchcategoryComponent ,SubstntypComponent ],
  imports: [
    CommonModule,
    MaterialModuleList,
    DsSidebarModule,
    AdminRoutingModule,
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

  providers: [],
  entryComponents: [
  ]
})
export class AdminModule { }
