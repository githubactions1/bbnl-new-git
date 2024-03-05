import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { merge, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { DsNavigationService } from '@glits/components/navigation/navigation.service';

import { CrudService } from 'app/main/apps/crud.service';

@Component({
    selector: 'ds-navigation',
    templateUrl: './navigation.component.html',
    styleUrls: ['./navigation.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DsNavigationComponent implements OnInit {
    @Input()
    layout = 'vertical';

    @Input()
    navigation: any;
    menuitms;
    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     *
     * @param {ChangeDetectorRef} _changeDetectorRef
     * @param {DsNavigationService} _dsNavigationService
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _dsNavigationService: DsNavigationService,
        public crdsrv: CrudService
    ) {
        // Set the private defaults
        this.menuitms = JSON.parse(localStorage.getItem('mnuDtls'));
        this._unsubscribeAll = new Subject();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        // Load the navigation either from the input or from the service
        this.navigation = this.navigation || this._dsNavigationService.getCurrentNavigation();
        console.log(this.navigation)
        if(this.navigation){
        if(this.navigation.length==0){

        }
        else{
        this.navigation[0].children.forEach(function (val) {
            // val.translate = 'NAV.APPLICATIONS';
            if (val.prnt_mnu_itm_id && val.prnt_mnu_itm_id != 0) {
                val.mnu_itm_nm = val.prnt_mnu_itm_nm;
                val.mnu_itm_icn_tx = val.prnt_mnu_icn_tx;
                val.id = val.prnt_mnu_itm_id;
                val.type = 'collapsable';
                val.translate = val.mnu_itm_nm;
                if (val.children) {
                    val.children.forEach(sub_val => {
                        sub_val.type = 'item';
                    })
                }
            } else if (val.prnt_mnu_itm_id == 0) {
                val.type = 'item';
                val.translate = val.mnu_itm_nm;
            } else {
                val.mnu_itm_nm = val.title;
                val.mnu_itm_icn_tx = val.icon;
                val.mnu_itm_url_tx = val.url;
                val.children = val.children;
                val.translate = val.mnu_itm_nm;
                console.log('val.translate ----------------------', val.translate)
                if (val.children) {
                    val.children.forEach(sub_val => {
                        sub_val.type = 'item';
                        sub_val.mnu_itm_nm = sub_val.title;
                        sub_val.mnu_itm_url_tx = sub_val.url;
                    })
                }
            }

        })
    }
}
 
        // Subscribe to the current navigation changes
        this._dsNavigationService.onNavigationChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(() => {

                // Load the navigation
                this.navigation = this._dsNavigationService.getCurrentNavigation();

                // Mark for check
                this._changeDetectorRef.markForCheck();
            });

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
      updatesqnce(data){
          let rte = `merchant/menu/sqnce`
          this.crdsrv.update(data,rte).subscribe((res) => {

          })
      }

}
