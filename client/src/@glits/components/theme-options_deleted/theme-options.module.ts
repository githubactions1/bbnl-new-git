import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import {
    MatButtonModule, MatCheckboxModule, MatDividerModule, MatFormFieldModule, MatIconModule, MatOptionModule, MatRadioModule, MatSelectModule, MatSlideToggleModule
} from '@angular/material';

import { DsDirectivesModule } from '@glits/directives/directives';
//import { DsMaterialColorPickerModule } from '@glits/components/material-color-picker/material-color-picker.module';
import { DsSidebarModule } from '@glits/components/sidebar/sidebar.module';

import { DsThemeOptionsComponent } from '@glits/components/theme-options_deleted/theme-options.component';

@NgModule({
    declarations: [
        DsThemeOptionsComponent
    ],
    imports     : [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,

        FlexLayoutModule,

        MatButtonModule,
        MatCheckboxModule,
        MatDividerModule,
        MatFormFieldModule,
        MatIconModule,
        MatOptionModule,
        MatRadioModule,
        MatSelectModule,
        MatSlideToggleModule,

        DsDirectivesModule,
     //   DsMaterialColorPickerModule,
        DsSidebarModule
    ],
    exports     : [
        DsThemeOptionsComponent
    ]
})
export class DsThemeOptionsModule
{
}
