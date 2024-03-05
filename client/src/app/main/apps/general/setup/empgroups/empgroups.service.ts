import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { CrudService } from '../../../crud.service';
import { Employee, EmployeeGroup } from './employee';
import * as _ from 'lodash';
import { DsUtils } from '@glits/utils';
@Injectable({
  providedIn: 'root'
})
export class EmployeeGroupsService implements Resolve<any>
{
   
    onEmpsChanged: BehaviorSubject<any>;
    onEmployeeDeleted:BehaviorSubject<any>;
    onGroupsUpdated:BehaviorSubject<any>;
    onSelectedEmpsChanged: BehaviorSubject<any>;
    onUserDataChanged: BehaviorSubject<any>;
    onSearchTextChanged: Subject<any>;
    onGroupChanged: Subject<any>;
    onGroupAdded:Subject<any>;
    emps: Employee[];
    grpEmps:Employee[];
    grps:EmployeeGroup[];
    user: any;
    selectedEmps: string[] = [];

    searchText: string;
    filterBy: string;
    grp_id:number;
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
        this.onEmployeeDeleted = new BehaviorSubject([]);
        this.onGroupsUpdated = new BehaviorSubject([]);
        this.onSelectedEmpsChanged = new BehaviorSubject([]);
        this.onUserDataChanged = new BehaviorSubject([]);
        this.onSearchTextChanged = new Subject();
        this.onGroupChanged = new Subject();
        this.onGroupAdded = new Subject();

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
                    this.onGroupAdded.subscribe((id) =>{
                        this.grp_id = id;
                        this.getEmps();
                        this.onGroupChanged.next(id);
                    })
                    this.onGroupChanged.subscribe(id => {

                        this.emps = this.grpEmps;
                        this.grp_id = id;
                        this.deselectEmployees()
                        this.emps = _.filter(this.emps, function(emp){
                            return _.includes([id], emp.grp_id);
                        });
                        console.log(this.emps)
                        this.onEmpsChanged.next(this.emps);
                    });

                    resolve();

                },
                reject
            );
        });
    }
        /**
     * Select Employees
     *
     * @param filterParameter
     * @param filterValue
     */
    selectEmployyes(filterParameter?, filterValue?): void
    {
        this.selectedEmps = [];

        // If there is no filter, select all contacts
        if ( filterParameter === undefined || filterValue === undefined )
        {
            this.selectedEmps = [];
            this.emps.map(contact => {
                this.selectedEmps.push(contact.id);
            });
        }

        // Trigger the next event
        this.onSelectedEmpsChanged.next(this.selectedEmps);
    }
   /**
     * Deselect Employees
     */
    deselectEmployees(): void
    {
        this.selectedEmps = [];

        // Trigger the next event
        this.onSelectedEmpsChanged.next(this.selectedEmps);
    }
  startsWith(wordToCompare) {
        return function(element) {
            return element.name.toUpperCase().includes(wordToCompare.toUpperCase)
        }
    }
    /**
     * Get Employees
     *
     * @returns {Promise<any>}
     */
    getEmps(): Promise<any> {

        return new Promise((resolve, reject) => {
            let rte = "merchant/employesbyGrps/" + this.usrDtls.mrcht_id
          
            this.crdsrv.get(rte).subscribe((response: any) => {

                this.emps = response['data'];
                if (this.searchText && this.searchText !== '') {
                    console.log(this.searchText)
                    let filteredGrps  = this.grps.filter(this.startsWith(this.searchText))

                   this.onGroupsUpdated.next({grp:filteredGrps,grp_id:0})
                }
           
                this.emps = this.emps.map(emp => {
                    return new Employee(emp);
                });
                this.grpEmps = this.emps;
                this.onEmpsChanged.next(this.emps);
                this.grps = _.uniqBy(this.emps, 'grp_id');
                this.grps = this.grps.map(grp => {
                    return new EmployeeGroup(grp);
                });
                this.grps = _.sortBy(this.grps, o => o.id)
                console.log(this.grps)
                if(!this.grp_id || this.grp_id == 0){
                console.log("No Group ID")
                this.onGroupsUpdated.next({grp:this.grps,grp_id:0})
                }else{
                    this.onGroupChanged.next(this.grp_id)
                    this.onGroupsUpdated.next({grp:this.grps,grp_id:this.grp_id})
                }
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
    /**
     * Delete selected contacts
     */
    deleteSelectedEmployees(): void
    {
       console.log(this.selectedEmps,this.grp_id)
       let rte = "merchant/employesGrps/"
       let data = {
           "emps":this.selectedEmps,
           "grp_id":this.grp_id
       }
       this.crdsrv.update(data,rte).subscribe((res) => {
        this.getEmps()
       
       }, (error) => {
         
       });
    }


}
