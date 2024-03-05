import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatIconModule, MatRippleModule, MatGridListModule } from '@angular/material';

import { TranslateModule } from '@ngx-translate/core';

import { DsNavigationComponent } from './navigation.component';
import { DsNavVerticalItemComponent } from './vertical/item/item.component';
import { DsNavVerticalCollapsableComponent } from './vertical/collapsable/collapsable.component';
import { DsNavVerticalGroupComponent } from './vertical/group/group.component';
import { DsNavHorizontalItemComponent } from './horizontal/item/item.component';
import { DsNavHorizontalCollapsableComponent } from './horizontal/collapsable/collapsable.component';
import { DragDropModule } from '@angular/cdk/drag-drop';




@NgModule({
    imports     : [
        CommonModule,
        RouterModule,

        MatIconModule,
        MatRippleModule,
        MatGridListModule,
        DragDropModule,

        TranslateModule.forChild()
    ],
    exports     : [
        DsNavigationComponent
    ],
    declarations: [
        DsNavigationComponent,
        DsNavVerticalGroupComponent,
        DsNavVerticalItemComponent,
        DsNavVerticalCollapsableComponent,
        DsNavHorizontalItemComponent,
        DsNavHorizontalCollapsableComponent,
    ],
})
export class DsNavigationModule
{
}
