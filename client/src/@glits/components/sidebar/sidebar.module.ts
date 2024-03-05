import { NgModule } from '@angular/core';

import { DsSidebarComponent } from './sidebar.component';

@NgModule({
    declarations: [
        DsSidebarComponent
    ],
    exports     : [
        DsSidebarComponent
    ]
})
export class DsSidebarModule
{
}
