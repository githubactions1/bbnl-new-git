import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DsSharedModule } from '@glits/shared.module';

import { MaintenanceComponent } from 'app/main/shared/pages/maintenance/maintenance.component';

const routes = [
    {
        path     : 'maintenance',
        component: MaintenanceComponent
    }
];

@NgModule({
    declarations: [
        MaintenanceComponent
    ],
    imports     : [
        RouterModule.forChild(routes),

        DsSharedModule
    ]
})
export class MaintenanceModule
{
}
