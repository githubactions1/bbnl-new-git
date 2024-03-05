import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DsSharedModule } from '@glits/shared.module';

import { Error500Component } from 'app/main/shared/pages/errors/500/error-500.component';

const routes = [
    {
        path     : 'errors/error-500',
        component: Error500Component
    }
];

@NgModule({
    declarations: [
        Error500Component
    ],
    imports     : [
        RouterModule.forChild(routes),

        DsSharedModule
    ]
})
export class Error500Module
{
}
