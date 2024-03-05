import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DsSidebarModule } from '@glits/components';
import { DsSharedModule } from '@glits/shared.module';

import { ContentModule } from 'app/layout/components/content/content.module';
import { FooterModule } from 'app/layout/components/footer/footer.module';
import { NavbarModule } from 'app/layout/components/navbar/navbar.module';
// import { QuickPanelModule } from 'app/layout/components/quick-panel/quick-panel.module';
import { ToolbarModule } from 'app/layout/components/toolbar/toolbar.module';

import { VerticalLayout1Component } from 'app/layout/vertical/layout-1/layout-1.component';
import { SharedModule } from '../../../main/shared/shared.module';

@NgModule({
    declarations: [
        VerticalLayout1Component
    ],
    imports     : [
        RouterModule,

        DsSharedModule,
        SharedModule,
        DsSidebarModule,

        ContentModule,
        FooterModule,
        NavbarModule,
        // QuickPanelModule,
        ToolbarModule
    ],
    exports     : [
        VerticalLayout1Component
    ]
})
export class VerticalLayout1Module
{
}
