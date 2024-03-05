import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
    selector   : 'ds-confirm-dialog',
    templateUrl: './confirm-dialog.component.html',
    styleUrls  : ['./confirm-dialog.component.scss']
})
export class DsConfirmDialogComponent
{
    public confirmMessage: string;

    /**
     * Constructor
     *
     * @param {MatDialogRef<DsConfirmDialogComponent>} dialogRef
     */
    constructor(
        public dialogRef: MatDialogRef<DsConfirmDialogComponent>
    )
    {
    }

}
