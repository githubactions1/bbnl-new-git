import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MatButtonModule, MatIconModule, MatProgressBarModule } from '@angular/material';

import { DsProgressBarComponent } from './progress-bar.component';

@NgModule({
    declarations: [
        DsProgressBarComponent
    ],
    imports     : [
        CommonModule,
        RouterModule,

        MatButtonModule,
        MatIconModule,
        MatProgressBarModule
    ],
    exports     : [
        DsProgressBarComponent
    ]
})
export class DsProgressBarModule
{
}
