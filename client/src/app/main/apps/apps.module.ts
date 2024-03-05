import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DsSharedModule } from '@glits/shared.module';

import { MatCardModule, MatInputModule, MatFormFieldModule, MatGridListModule, MatToolbarModule, MatPaginatorModule, 
    MatSlideToggleModule, MatListModule, MatDialogModule, MatMenuModule, MatSnackBarModule,MatSnackBar, 
    MatProgressSpinnerModule, MatSelectModule, MatOptionModule, MatDatepickerModule, MatDividerModule } from '@angular/material';

import { MatIconModule } from '@angular/material/icon';
import { DatePipe } from '@angular/common';

import { DragDropModule } from '@angular/cdk/drag-drop';
import { SharedModule } from '../shared/shared.module';

import { from } from 'rxjs';
import { MaterialModuleList } from 'app/main/apps/material.module';
import { DsSidebarModule } from '@glits/components';

const routes = [
    { path        : 'profiles', loadChildren: './general/profiles/profiles.module#ProfilesModule' }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        MatCardModule, MatInputModule, MatFormFieldModule, MatGridListModule, MatToolbarModule, MatSlideToggleModule, MatIconModule, 
        MatListModule, DragDropModule, MatDialogModule, MatMenuModule, MatSnackBarModule,  MatPaginatorModule, 
        MatProgressSpinnerModule, MatSelectModule, MatOptionModule, MaterialModuleList, SharedModule, DsSidebarModule, MatDividerModule
    ],
    declarations: [

           ],


    providers:
        [
            // ExcelService,
            DatePipe, MatSnackBar//, EmployeeService, EmployeeGroupsService,
        ],

    exports: []
})
export class AppsModule {
}
