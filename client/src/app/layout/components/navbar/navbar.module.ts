import { NgModule } from '@angular/core';

import { DsSharedModule } from '@glits/shared.module';

import { NavbarComponent } from 'app/layout/components/navbar/navbar.component';
import { NavbarHorizontalStyle1Module } from 'app/layout/components/navbar/horizontal/style-1/style-1.module';
import { NavbarVerticalStyle1Module } from 'app/layout/components/navbar/vertical/style-1/style-1.module';
import { NavbarVerticalStyle2Module } from 'app/layout/components/navbar/vertical/style-2/style-2.module';
import { StyleComponentDialog } from './vertical/style-1/style-1.component';
import { MatListModule, MatSlideToggleModule, MatIconModule, MatToolbarModule } from '@angular/material';


@NgModule({
    declarations: [
        NavbarComponent,StyleComponentDialog
    ],
    imports     : [
        DsSharedModule,

        NavbarHorizontalStyle1Module,
        NavbarVerticalStyle1Module,
        NavbarVerticalStyle2Module,
        MatListModule,
        MatSlideToggleModule,
        MatIconModule,
        MatToolbarModule
    ],
    exports     : [
        NavbarComponent
    ],
    entryComponents:[StyleComponentDialog]
})
export class NavbarModule
{
}
