import { NgModule } from '@angular/core';

import { DsIfOnDomDirective } from '@glits/directives/ds-if-on-dom/ds-if-on-dom.directive';
import { DsInnerScrollDirective } from '@glits/directives/ds-inner-scroll/ds-inner-scroll.directive';
import { DsPerfectScrollbarDirective } from '@glits/directives/ds-perfect-scrollbar/ds-perfect-scrollbar.directive';
import { DsMatSidenavHelperDirective, DsMatSidenavTogglerDirective } from '@glits/directives/ds-mat-sidenav/ds-mat-sidenav.directive';

@NgModule({
    declarations: [
        DsIfOnDomDirective,
        DsInnerScrollDirective,
        DsMatSidenavHelperDirective,
        DsMatSidenavTogglerDirective,
        DsPerfectScrollbarDirective
    ],
    imports     : [],
    exports     : [
        DsIfOnDomDirective,
        DsInnerScrollDirective,
        DsMatSidenavHelperDirective,
        DsMatSidenavTogglerDirective,
        DsPerfectScrollbarDirective
    ]
})
export class DsDirectivesModule
{
}
