import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChangeLogRoutingModule } from './change-log-routing.module';
import { ChangeLogComponent } from './master/change-log/change-log.component';
import { ChangeLogEdtComponent } from './master/change-log/change-log-edt/change-log-edt.component';
import { ChangeLogListComponent } from './master/change-log/change-log-list/change-log-list.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Routes, RouterModule } from '@angular/router';
import { AddChangeLogComponent } from './master/change-log/add-change-log/add-change-log.component';
import { ChangeLogModalComponent } from './master/change-log/change-log-modal/change-log-modal.component';
// import { TopHeaderComponent } from 'app/main/shared/components/top-header/top-header.component';
import { SharedModule } from '../../../shared/shared.module';
import { DsSharedModule } from '@glits/shared.module';
import { MatDialogModule, MatInputModule, MatFormFieldModule, MatToolbarModule, MatPaginatorModule, MatListModule,  MatProgressSpinnerModule, MatSelectModule, MatOptionModule, MatDatepickerModule, MatCardModule, MatGridListModule, MatBottomSheetModule, MatRadioModule, MatButtonToggleModule, MatIconModule, MatCheckboxModule, MatDividerModule } from '@angular/material';
import { MaterialModuleList } from '../../material.module';
import { DsSidebarModule } from '@glits/components';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DxDataGridModule, DxTemplateModule, DxBulletModule, DxButtonModule } from 'devextreme-angular';

const routes: Routes = [
{ path : 'change_log', component: ChangeLogComponent},
{ path : 'add_change_log', component: AddChangeLogComponent},
];
@NgModule({
  declarations: [ChangeLogComponent, ChangeLogEdtComponent,ChangeLogModalComponent, ChangeLogListComponent,AddChangeLogComponent, DashboardComponent],
  imports: [
    SharedModule,
    DsSharedModule,
    MatDialogModule,
    [RouterModule.forChild(routes)],
    CommonModule,
    ChangeLogRoutingModule,
    MaterialModuleList,
    DsSidebarModule,
    MatInputModule, MatFormFieldModule , MatToolbarModule, MatPaginatorModule, MatListModule, MatDialogModule, 
    MatProgressSpinnerModule, MatSelectModule, MatOptionModule, MatDatepickerModule, MatCardModule, MatGridListModule, MatBottomSheetModule, MatDividerModule,
    MatRadioModule, MatButtonToggleModule, MatIconModule, MatCheckboxModule ,
    FormsModule, 
    ReactiveFormsModule,
    DxDataGridModule,
    DxTemplateModule,
    DxBulletModule, DxButtonModule
  ]
})
export class ChangeLogModule { }
