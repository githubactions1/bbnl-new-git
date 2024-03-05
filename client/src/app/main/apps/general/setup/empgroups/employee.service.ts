import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import * as _ from 'lodash';
import { DsUtils } from '@glits/utils';

import { Employee, EmployeeGroup } from './employee';
import { CrudService } from '../../../crud.service';

@Injectable()
export class EmployeeService implements Resolve<any>
{
   
    onEmpsChanged: BehaviorSubject<any>;
    onSelectedEmpsChanged: BehaviorSubject<any>;
    onUserDataChanged: BehaviorSubject<any>;
    onSearchTextChanged: Subject<any>;
    onFilterChanged: Subject<any>;

    emps: Employee[];
    user: any;
    selectedEmps: string[] = [];

    searchText: string;
    filterBy: string;
    usrDtls: any;

    /**
     * Constructor
     *
     * @param {CrudService} crdsrv
     */
    constructor(
        public crdsrv: CrudService
    ) {
        console.log("Constructor")
        // Set the defaults
        this.onEmpsChanged = new BehaviorSubject([]);
        this.onSelectedEmpsChanged = new BehaviorSubject([]);
        this.onUserDataChanged = new BehaviorSubject([]);
        this.onSearchTextChanged = new Subject();
        this.onFilterChanged = new Subject();

        this.crdsrv.getUsrLgnDtls().subscribe((res)=>{
            if(res)
            {
              this.usrDtls = JSON.parse(res);
            }
           
          }, (err)=>{
      
          });
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Resolver
     *
     * @param {ActivatedRouteSnapshot} route
     * @param {RouterStateSnapshot} state
     * @returns {Observable<any> | Promise<any> | any}
     */
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {

        return new Promise((resolve, reject) => {

            Promise.all([
                this.getEmps()
            ]).then(
                ([files]) => {

                    this.onSearchTextChanged.subscribe(searchText => {
                        this.searchText = searchText;
                        this.getEmps();
                    });

                    this.onFilterChanged.subscribe(filter => {
                        this.filterBy = filter;
                        this.getEmps();
                    });

                    resolve();

                },
                reject
            );
        });
    }

    /**
     * Get Employees
     *
     * @returns {Promise<any>}
     */
    getEmps(): Promise<any> {

        return new Promise((resolve, reject) => {
            let rte = "merchant/employes/" + this.usrDtls.mrcht_id
            console.log(rte)
            this.crdsrv.get(rte).subscribe((response: any) => {

                this.emps = response['data'];
                console.log(this.emps)
                console.log(response)

                if (this.searchText && this.searchText !== '') {
                    this.emps = DsUtils.filterArrayByString(this.emps, this.searchText);
                   
                }

                this.emps = this.emps.map(emp => {
                    return new Employee(emp);
                });

                this.onEmpsChanged.next(this.emps);
                console.log(this.emps)
                resolve(this.emps);
            }, reject
            );

        }
        );

    }



    /**
     * Toggle selected contact by id
     *
     * @param id
     */
    toggleSelectedEmp(id): void {
        // First, check if we already have that contact as selected...
        if (this.selectedEmps.length > 0) {
            const index = this.selectedEmps.indexOf(id);

            if (index !== -1) {
                this.selectedEmps.splice(index, 1);

                // Trigger the next event
                this.onSelectedEmpsChanged.next(this.selectedEmps);

                // Return
                return;
            }
        } 
            // If we don't have it, push as selected
            this.selectedEmps.push(id);
            console.log(this.selectedEmps);
        


        // Trigger the next event
        this.onSelectedEmpsChanged.next(this.selectedEmps);
    }

    /**
     * Toggle select all
     */
    toggleSelectAll(): void {
        if (this.selectedEmps.length > 0) {
            this.deselectEmps();
        }
        else {
            this.selectEmps();
        }
    }

    /**
     * Select contacts
     *
     * @param filterParameter
     * @param filterValue
     */
    selectEmps(filterParameter?, filterValue?): void {
        this.selectedEmps = [];

        // If there is no filter, select all contacts
        if (filterParameter === undefined || filterValue === undefined) {
            this.selectedEmps = [];
            this.emps.map(emp => {
                this.selectedEmps.push(emp.id);
            });
        }

        // Trigger the next event
        this.onSelectedEmpsChanged.next(this.selectedEmps);
    }





    /**
     * Deselect contacts
     */
    deselectEmps(): void {
        this.selectedEmps = [];

        // Trigger the next event
        this.onSelectedEmpsChanged.next(this.selectedEmps);
    }


}
