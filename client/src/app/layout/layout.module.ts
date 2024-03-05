import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VerticalLayout1Module } from 'app/layout/vertical/layout-1/layout-1.module';
import { VerticalLayout2Module } from 'app/layout/vertical/layout-2/layout-2.module';
import { HorizontalLayout1Module } from 'app/layout/horizontal/layout-1/layout-1.module';
import { MatIconModule, MatToolbarModule, MatButtonModule, MatDialogModule, MatMenuModule, MatTooltipModule, MatTabsModule, MatListModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DsSharedModule } from '@glits/shared.module';
@NgModule({
    imports: [
       // QRCodeModule,
        VerticalLayout1Module,
        VerticalLayout2Module,
        MatIconModule,
        MatButtonModule,
        MatToolbarModule,
        MatDialogModule,
        HorizontalLayout1Module,
        MatMenuModule,
        MatToolbarModule,
        MatTooltipModule,
        MatTabsModule,
        CommonModule,
        // BrowserAnimationsModule,
        FlexLayoutModule,
        MatListModule,
        DsSharedModule
    ],
    exports: [
        VerticalLayout1Module,
        VerticalLayout2Module,

        HorizontalLayout1Module
    ],
    declarations: [],
    entryComponents: []
})
export class LayoutModule
{
}
