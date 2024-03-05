import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MapsRoutingModule } from './maps-routing.module';
import { MapsComponent } from './maps.component';
import { LayersComponent } from './blocks/layers/layers.component';
import { PoiComponent } from './blocks/poi/poi.component';
import { FiltersComponent } from './blocks/filters/filters.component';
import { RouterModule } from '@angular/router';



import { DatePipe } from '@angular/common';

import { DragDropModule } from '@angular/cdk/drag-drop';

import { DsSharedModule } from '@glits/shared.module';
import { MatInputModule, MatFormFieldModule, MatToolbarModule, MatPaginatorModule, MatListModule, MatDialogModule, MatProgressSpinnerModule, 
        MatSelectModule, MatOptionModule, MatDatepickerModule, MatCardModule, MatGridListModule, MatBottomSheetModule, MatDividerModule, MatRadioModule, MatSnackBarModule,MatSnackBar, 
        MatButtonToggleModule, MatIconModule, MatCheckboxModule, MatMenuModule, MatSlideToggleModule, MatSidenavModule } from '@angular/material';
import { DxButtonModule, DxNumberBoxModule, DxCheckBoxModule, DxSelectBoxModule, DxTabPanelModule, DxDataGridModule, DxTemplateModule, DxBulletModule } from 'devextreme-angular';

import { from } from 'rxjs';
import { MaterialModuleList } from 'app/main/apps/material.module';
import { DsSidebarModule } from '@glits/components';
import { SharedModule } from 'app/main/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [MapsComponent, LayersComponent, PoiComponent, FiltersComponent],
  imports: [
    CommonModule,
    MapsRoutingModule,
    MatCardModule, MatInputModule, MatFormFieldModule, MatGridListModule, MatToolbarModule, MatSlideToggleModule, MatIconModule, 
    MatListModule, DragDropModule, MatDialogModule, MatMenuModule, MatSnackBarModule,  MatPaginatorModule, 
    MatProgressSpinnerModule, MatSelectModule, MatOptionModule, MaterialModuleList,SharedModule,DsSharedModule,RouterModule, DsSidebarModule, MatSidenavModule,MatDividerModule,MatBottomSheetModule,MatDatepickerModule,
    FormsModule,
    ReactiveFormsModule,
    DxButtonModule, DxNumberBoxModule, DxCheckBoxModule, DxSelectBoxModule, DxTabPanelModule,
    DxDataGridModule,
    DxTemplateModule,
    DxBulletModule
  ],
  providers:
  [
     
      DatePipe, MatSnackBar
  ],
  exports: [MapsComponent],
})
export class MapsModule {}
