import { NgModule } from '@angular/core';
import { MatButtonModule, MatDialogModule } from '@angular/material';

import { DsConfirmDialogComponent } from '@glits/components/confirm-dialog/confirm-dialog.component';

@NgModule({
    declarations: [
        DsConfirmDialogComponent
    ],
    imports: [
        MatDialogModule,
        MatButtonModule
    ],
    entryComponents: [
        DsConfirmDialogComponent
    ],
})
export class DsConfirmDialogModule
{
}
