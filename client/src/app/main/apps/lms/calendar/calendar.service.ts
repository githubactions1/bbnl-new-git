import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { subDays, startOfDay, addDays, endOfMonth, addHours } from 'date-fns';
import { CrudService } from '../../crud.service';

@Injectable()
export class CalendarService implements Resolve<any>
{
   // events: any;
    schedules:any;
    onEventsUpdated: Subject<any>;
    evntLst: any;
    data: any;

    /**
     * Constructor
     *
     * @param {HttpClient} _httpClient
     */
    constructor(
        private _httpClient: HttpClient,private crdsrv: CrudService
    )
    {
        // Set the defaults
        this.onEventsUpdated = new Subject();
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
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any
    {
        return new Promise((resolve, reject) => {
            Promise.all([
                this.getSchedules()
            ]).then(
                ([schedules]: [any]) => {
                    resolve();
                },
                reject
            );
        });
    }

    // /**
    //  * Get events
    //  *
    //  * @returns {Promise<any>}
    //  */
    // getEvents(): Promise<any>
    // {
    //     return new Promise((resolve, reject) => {

    //         this._httpClient.get('api/calendar/events')
    //             .subscribe((response: any) => {
    //                 this.events = response.data;
    //                 this.onEventsUpdated.next(this.events);
    //                 resolve(this.events);
    //             }, reject);
    //     });
    // }
       /**
     * Get Schedules
     *
     * @returns {Promise<any>}
     */
    getSchedules(): Promise<any>
    {
        console.log("Called")
        return new Promise((resolve, reject) => {
            const rte1 = 'web/common/schdls';
            this.crdsrv.getDistLst(rte1).subscribe(res => {
                console.log(res);
                console.log(res['data']);
                if (res['status'] == 200) {
                    if (res['data'].length > 0) {
                        this.data = res['data'];
                        console.log(this.data)
                        this.schedules = this.data;
                        console.log(this.schedules)
                        this.onEventsUpdated.next(this.schedules);
                        resolve(this.data);
                    }
                }
            })
        //    let data = [
        //     {
        //         start    : subDays(startOfDay(new Date()), 1),
        //         end      : addDays(new Date(), 1),
        //         start_time:'',
        //         end_time:'',
        //         batch_nm    : 'Functional Training',
        //         allDay   : true,
        //         color    : {
        //             primary  : '#F44336',
        //             secondary: '#FFCDD2'
        //         },
        //         resizable: {
        //             beforeStart: true,
        //             afterEnd   : true
        //         },
        //         draggable: true,
        //         meta     : {
        //             location: 'ZP MEETING HALL,Anantapur',
        //             desc   : 'Functional training for all agriculture functionaries in Ananthapur District'

        //         }
        //     },
        //     {
        //         start    : subDays(startOfDay(new Date()), 1),
        //         end      : addDays(new Date(), 1),
        //         start_time:'',
        //         end_time:'',
        //         batch_nm    : 'Functional Training',
        //         allDay   : true,
        //         color    : {
        //             primary  : '#F44336',
        //             secondary: '#FFCDD2'
        //         },
        //         resizable: {
        //             beforeStart: true,
        //             afterEnd   : true
        //         },
        //         draggable: true,
        //         meta     : {
        //             location: 'ZP MEETING HALL,Anantapur',
        //             desc   : 'Functional training for all agriculture functionaries in Ananthapur District'

        //         }
        //     },
        //     {
        //         start    : subDays(endOfMonth(new Date()), 3),
        //         end      : addDays(endOfMonth(new Date()), 3),
        //         start_time:'',
        //         end_time:'',
        //         batch_nm    : 'Functional Training',
        //         allDay   : true,
        //         color    : {
        //             primary  : '#F44336',
        //             secondary: '#FFCDD2'
        //         },
        //         resizable: {
        //             beforeStart: true,
        //             afterEnd   : true
        //         },
        //         draggable: true,
        //         meta     : {
        //             location: 'ZP MEETING HALL,Anantapur',
        //             desc   : 'Functional training for all agriculture functionaries in Ananthapur District'

        //         }
        //     },
        //     {
        //         start    : addHours(startOfDay(new Date()), 2),
        //         end      : new Date(),
        //         start_time:'',
        //         end_time:'',
        //         batch_nm    : 'Introductory Training',
        //         allDay   : true,
        //         color    : {
        //             primary  : '#F44336',
        //             secondary: '#FFCDD2'
        //         },
        //         resizable: {
        //             beforeStart: true,
        //             afterEnd   : true
        //         },
        //         draggable: true,
        //         meta     : {
        //             location: 'ZP MEETING HALL,Anantapur',
        //             desc   : 'Functional training for all agriculture functionaries in Ananthapur District'

        //         }
        //     }
        // ]
        
        
        });
    }

    /**
     * Update events
     *
     * @param events
     * @returns {Promise<any>}
     */
    updateEvents(schedules): Promise<any>
    {
        return new Promise((resolve, reject) => {
            this._httpClient.post('api/calendar/events', {
                id  : 'events',
                data: [schedules]
            })
                .subscribe((response: any) => {
                    this.getSchedules();
                }, reject);
        });
    }

}
