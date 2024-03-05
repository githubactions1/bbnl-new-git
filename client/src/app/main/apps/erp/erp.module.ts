import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ErpRoutingModule } from './erp-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ErptmplttypComponent } from './Erptmplttyp/erpTmpltTyp.component';
import { ErptmpltComponent } from './Erptmplt/erpTmplt.component';
import { MaterialModuleList } from '../material.module';
import { DsSidebarModule } from '@glits/components';
import { DsSharedModule } from '@glits/shared.module';
import { SharedModule } from 'app/main/shared/shared.module';
import { MatInputModule, MatFormFieldModule, MatToolbarModule, MatPaginatorModule, MatListModule, MatDialogModule, MatProgressSpinnerModule, MatSelectModule, MatOptionModule, MatDatepickerModule, MatCardModule, MatGridListModule, MatBottomSheetModule, MatDividerModule, MatRadioModule, MatButtonToggleModule, MatIconModule, MatCheckboxModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DxDataGridModule, DxTemplateModule, DxBulletModule } from 'devextreme-angular';
import { ErpartnerlistComponent } from './Erpartnerlist/erPartnerList.component';
import { AratypeComponent } from './Aratype/araType.component';
import { ErptmpltprtnrsComponent } from './Erptmpltprtnrs/erpTmpltprtnrs.component';

@NgModule({
  declarations: [DashboardComponent,ErptmplttypComponent,ErptmpltComponent,ErpartnerlistComponent,AratypeComponent,ErptmpltprtnrsComponent],
  imports: [
    CommonModule,
    ErpRoutingModule,
    MaterialModuleList,
    DsSidebarModule,
    
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
  ]
})
export class ErpModule { 

}
