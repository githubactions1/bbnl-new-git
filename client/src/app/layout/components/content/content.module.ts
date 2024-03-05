import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DsSharedModule } from '@glits/shared.module';

import { ContentComponent } from 'app/layout/components/content/content.component';

@NgModule({
    declarations: [
        ContentComponent
    ],
    imports     : [
        RouterModule,
        DsSharedModule
    ],
    exports     : [
        ContentComponent
    ]
})
export class ContentModule
{
}
