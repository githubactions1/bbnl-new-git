import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { EmployeeGroupsService } from '../../empgroups.service';
import * as _ from 'lodash';
import { EmployeeGroup } from '../../employee';



@Component({
    selector   : 'contacts-main-sidebar',
    templateUrl: './main.component.html',
    styleUrls  : ['./main.component.scss']
})
export class ContactsMainSidebarComponent implements OnInit, OnDestroy
{
    user: any;
    grp_id: number;

    // Private
    private _unsubscribeAll: Subject<any>;
    grps: any;
    active_id: any;

    /**
     * Constructor
     *
     * @param {EmployeeService} _employeeGrpService
     */
    constructor(
        private _employeeGrpService: EmployeeGroupsService
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
      
            this._employeeGrpService.onGroupsUpdated
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(data => {
                console.log(data)
                if(data.grp_id == 0 || !data.grp_id || data.grp_id==''){
                    console.log(data.grp)
                    this.grps = data.grp;
                    if(this.grps.length > 0){
                        this.changeGroup(this.grps[0]);
                }
               

                }else{
                    console.log(data.grp_id )
                    this.grps = data.grp;
                    let grpItem =  (_.filter(this.grps, function(grp) {
                        return grp.id === data.grp_id ;
                    }));
                    this.changeGroup(grpItem[0])
                 }
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
     * Change the filter
     *
     * @param filter
     */
    changeGroup(grp): void
    {
        console.log(grp.id)
        this.active_id = grp.id;
        this.grp_id = grp.id;
        this._employeeGrpService.onGroupChanged.next(this.grp_id);
    }
}
