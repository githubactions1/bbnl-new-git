import { ChangeDetectorRef, Component, HostBinding, Input, OnDestroy, OnInit } from '@angular/core';
import { merge, Subject } from 'rxjs';
import { takeUntil, filter } from 'rxjs/operators';

import { DsNavigationItem } from '@glits/types';
import { DsNavigationService } from '@glits/components/navigation/navigation.service';
import { UserService } from 'app/providers/user/user.serivce';
import { Router, NavigationEnd } from '@angular/router';
import { MatDialogRef, MatDialog } from '@angular/material';

import * as _ from 'lodash'; 
import { DeleteDialogComponent } from 'app/main/shared/components/delete-dialog/delete-dialog.component';
import { CrudService } from 'app/main/apps/crud.service';



@Component({
    selector: 'ds-nav-vertical-item',
    templateUrl: './item.component.html',
    styleUrls: ['./item.component.scss']
})
export class DsNavVerticalItemComponent implements OnInit, OnDestroy {
    @HostBinding('class')
    classes = 'nav-item';
    confirmDialogRef: MatDialogRef<DeleteDialogComponent>; 
    @Input()
    item: DsNavigationItem;
    menuitms;
    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     */

    /**
     *
     * @param {ChangeDetectorRef} _changeDetectorRef
     * @param {DsNavigationService} _dsNavigationService
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _dsNavigationService: DsNavigationService,
        private _router: Router,
        private userSerivce: UserService,
        public dialog: MatDialog,
        public crdsrv:CrudService
    ) {
        // Set the private defaults
        this._unsubscribeAll = new Subject();
        this.menuitms = JSON.parse(localStorage.getItem('mnuDtls'));
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        // Listen for router events
        let flag = false;
        this._router.events
            .pipe(
                filter(event => event instanceof NavigationEnd),
                takeUntil(this._unsubscribeAll)
            )
            .subscribe((event: NavigationEnd) => {
                let url = event.urlAfterRedirects;
                // Check if the url can be found in
                // one of this item
                if (this.item['mnu_itm_url_tx'] === url || url.includes(this.item['mnu_itm_url_tx'])) {
                    flag = true;
                    this.userSerivce.setCurrenPerm(this.item);
                    return true;
                }
            });
            if(!flag){
                this.userSerivce.setCurrenPerm({});
            }

        // Subscribe to navigation item
        merge(
            this._dsNavigationService.onNavigationItemAdded,
            this._dsNavigationService.onNavigationItemUpdated,
            this._dsNavigationService.onNavigationItemRemoved
        ).pipe(takeUntil(this._unsubscribeAll))
            .subscribe(() => {

                // Mark for check
                this._changeDetectorRef.markForCheck();
            });
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    delete(data){
        this.confirmDialogRef = this.dialog.open(DeleteDialogComponent, {
            width: '40%',
            panelClass: 'my-class',
            data: { message:'Are you sure deleting this menu ?', id: data.mnu_itm_id, nm: data.mnu_itm_nm, enble_in:0, dsble_in:1, entityname: 'Menu', flag: false, rte: `merchant/menu/active/${data.mnu_itm_id}`}
          });
          this.confirmDialogRef.afterClosed().subscribe((response) => {
            if(response==undefined){}
            else if(response['status'] == 200){
                if(!data.prnt_mnu_itm_id){
                    this._dsNavigationService.removeNavigationItem(data.mnu_itm_id);
                    this.menuitms[0].children.splice(this.menuitms[0].children.indexOf(data.mnu_itm_id), 1);
                    localStorage.setItem('mnuDtls', JSON.stringify(this.menuitms));
                    setTimeout(() => {
                        this.crdsrv.setMnuDtl(this.menuitms);
                    }, 500);
                }
                else{
                    this.menuitms[0].children.forEach(element => {
                        if(element.prnt_mnu_itm_id == data.prnt_mnu_itm_id){
                            let stToDelete = data.mnu_itm_id;
                            _.remove(element.children, function(currentObject) {
                                return currentObject['mnu_itm_id'] === stToDelete;
                            });
                            this._dsNavigationService.removeNavigationItem(data.mnu_itm_id);
                            localStorage.setItem('mnuDtls', JSON.stringify(this.menuitms));
                            setTimeout(() => {
                                this.crdsrv.setMnuDtl(this.menuitms);
                            }, 500);
                        }
                    });
                }

            }
          })
    }
}
