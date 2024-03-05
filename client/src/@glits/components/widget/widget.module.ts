import { NgModule } from '@angular/core';

import { DsWidgetComponent } from './widget.component';
import { DsWidgetToggleDirective } from './widget-toggle.directive';

@NgModule({
    declarations: [
        DsWidgetComponent,
        DsWidgetToggleDirective
    ],
    exports     : [
        DsWidgetComponent,
        DsWidgetToggleDirective
    ],
})
export class DsWidgetModule
{
}
