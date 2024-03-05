import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { DsConfirmDialogComponent } from '@glits/components/confirm-dialog/confirm-dialog.component';

import { ContactsService } from 'app/main/apps/contacts/contacts.service';
import { EmployeeGroupsService } from '../empgroups.service';

@Component({
    selector   : 'selected-bar',
    templateUrl: './selected-bar.component.html',
    styleUrls  : ['./selected-bar.component.scss']
})
export class ContactsSelectedBarComponent implements OnInit, OnDestroy
{
    confirmDialogRef: MatDialogRef<DsConfirmDialogComponent>;
    hasSelectedContacts: boolean;
    isIndeterminate: boolean;
    selectedEmps: string[];

    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {EmployeeGroupsService} _employeeGrpService
     * @param {MatDialog} _matDialog
     */
    constructor(
        private _employeeGrpService: EmployeeGroupsService,
        public _matDialog: MatDialog
    )
    {
        // Set the private defaults
        this._unsubscribeAll = new Subject();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
        this._employeeGrpService.onSelectedEmpsChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(selectedEmps => {
                this.selectedEmps = selectedEmps;
                setTimeout(() => {
                    this.hasSelectedContacts = selectedEmps.length > 0;
                    this.isIndeterminate = (selectedEmps.length !== this._employeeGrpService.emps.length && selectedEmps.length > 0);
                }, 0);
            });
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void
    {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Select all
     */
    selectAll(): void
    {
        this._employeeGrpService.selectEmployyes();
    }

    /**
     * Deselect all
     */
    deselectAll(): void
    {
        this._employeeGrpService.deselectEmployees();
    }

    /**
     * Delete selected contacts
     */
    deleteSelectedEmployees(): void
    {
        this.confirmDialogRef = this._matDialog.open(DsConfirmDialogComponent, {
            disableClose: false
        });

        this.confirmDialogRef.componentInstance.confirmMessage = 'Are you sure you want to delete all selected contacts?';

        this.confirmDialogRef.afterClosed()
            .subscribe(result => {
                if ( result )
                {
                    this._employeeGrpService.deleteSelectedEmployees();
                }
                this.confirmDialogRef = null;
            });
    }
}
