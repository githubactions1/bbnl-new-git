import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material';

import { DsSharedModule } from '@glits/shared.module';

import { Error404Component } from 'app/main/shared/pages/errors/404/error-404.component';

const routes = [
    {
        path     : 'errors/error-404',
        component: Error404Component
    }
];

@NgModule({
    declarations: [
        Error404Component
    ],
    imports     : [
        RouterModule.forChild(routes),

        MatIconModule,

        DsSharedModule
    ]
})
export class Error404Module
{
}
