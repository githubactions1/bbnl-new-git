import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material';
import { Subject } from 'rxjs';
import { startOfDay, isSameDay, isSameMonth } from 'date-fns';
import { CalendarEvent, CalendarEventAction, CalendarEventTimesChangedEvent, CalendarMonthViewDay, CalendarMonthViewBeforeRenderEvent } from 'angular-calendar';
import { CrudService } from 'app/main/apps/crud.service';
import { DsConfirmDialogComponent } from '@glits/components/confirm-dialog/confirm-dialog.component';
import { dsAnimations } from '@glits/animations';
import { CalendarService } from './calendar.service';
//import { CalendarEventModel } from './event.model';
import { ScheduleFormComponent } from './schedule-form/schedule-form.component';
import { ScheduleEventModel } from './schedule.model';
import { Router } from '@angular/router';
import { TransfereService } from 'app/providers/transfer/transfer.service';



@Component({
    selector: 'calendar',
    templateUrl: './calendar.component.html',
    styleUrls: ['./calendar.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: dsAnimations
})
export class CalendarComponent implements OnInit {
    actions: CalendarEventAction[];
    currentSchedules: any;
    activeDayIsOpen: boolean;
    confirmDialogRef: MatDialogRef<DsConfirmDialogComponent>;
    dialogRef: any;
    schedules: CalendarEvent[];
    refresh: Subject<any> = new Subject();
    selectedDay: any;
    view: string;
    viewDate: Date;
    mnthSchedules: any[] = [];
    today: Date
    isDayClicked: any;
    evntLst: any;

    constructor(
        private _matDialog: MatDialog,
        private _calendarService: CalendarService, private route: Router,private crdsrv: CrudService, private transfereService: TransfereService
    ) {
        // Set the defaults

        this.view = 'month';
        this.viewDate = new Date();
        this.today = new Date()
        this.activeDayIsOpen = true;
        this.selectedDay = { date: startOfDay(new Date()) };

        this.actions = [
            {
                label: '<i class="material-icons s-16">edit</i>',
                onClick: ({ event }: { event: CalendarEvent }): void => {
                    this.editEvent('edit');
                }
            },
            {
                label: '<i class="material-icons s-16">delete</i>',
                onClick: ({ event }: { event: CalendarEvent }): void => {
                    this.deleteEvent(event);
                }
            }
        ];

        /**
         * Get events from service/server
         */
        this.setSchedules();

    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        /**
         * Watch re-render-refresh for updating db
         */
        this.refresh.subscribe(updateDB => {
            if (updateDB) {
                this._calendarService.updateEvents(this.schedules);
            }
        });

        this._calendarService.onEventsUpdated.subscribe(schedules => {
            this.setSchedules();
            this.refresh.next();
        });
        const rte = 'web/common/assgnLst';
        this.crdsrv.get(rte).subscribe(res => {
            if (res['status'] == 200) {
                if (res['data'].length > 0) {
                    this.evntLst = res['data'];
                    console.log(this.evntLst)
                }
            }
        })
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Set events
     */
    setSchedules(): void {
        console.log(this._calendarService.schedules)
        this.schedules = this._calendarService.schedules.map(item => {
            item.actions = this.actions;
            return new ScheduleEventModel(item);
        });
        console.log(this.schedules)
    }
    beforeMonthViewRender(renderEvent: CalendarMonthViewBeforeRenderEvent): void {
        //console.log(renderEvent)
        /**
    * Get the selected day
    */

        renderEvent.body.forEach(day => {
            if (this.today.getMonth() == day.date.getMonth()) {
                if (day.events.length > 0 && !this.isDayClicked) {
                    day.events.forEach((e) => {
                        this.mnthSchedules.push(e)
                    })
                }


            }
        });

        const _selectedDay = renderEvent.body.find((_day) => {
            return _day.date.getTime() === this.selectedDay.date.getTime();
        });

        if (_selectedDay) {
            /**
             * Set selected day style
             * @type {string}
             */
            _selectedDay.cssClass = 'cal-selected';
            //this.dayClicked(_selectedDay)
        }

    }

    // /**
    //  * Before View Renderer
    //  *
    //  * @param {any} header
    //  * @param {any} body
    //  */
    // beforeMonthViewRender({header, body}): void
    // {
    //     /**
    //      * Get the selected day
    //      */
    //     const _selectedDay = body.find((_day) => {
    //         return _day.date.getTime() === this.selectedDay.date.getTime();
    //     });

    //     if ( _selectedDay )
    //     {
    //         /**
    //          * Set selected day style
    //          * @type {string}
    //          */
    //         _selectedDay.cssClass = 'cal-selected';
    //     }

    // }

    /**
     * Day clicked
     *
     * @param {MonthViewDay} day
     */
    dayClicked(day: CalendarMonthViewDay): void {
        this.isDayClicked = true
        const date: Date = day.date;

        this.mnthSchedules = day.events;
        if (isSameMonth(date, this.viewDate)) {
            if ((isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) || this.mnthSchedules.length === 0) {
                this.activeDayIsOpen = false;
                this.viewDate = date;
            }
            else {
                this.activeDayIsOpen = true;
                this.viewDate = date;
            }
        }
        this.selectedDay = day;
        this.refresh.next();
    }

    /**
     * Event times changed
     * Event dropped or resized
     *
     * @param {CalendarEvent} event
     * @param {Date} newStart
     * @param {Date} newEnd
     */
    eventTimesChanged({ event, newStart, newEnd }: CalendarEventTimesChangedEvent): void {
        event.start = newStart;
        event.end = newEnd;
        // console.warn('Dropped or resized', event);
        this.refresh.next(true);
    }

    /**
     * Delete Event
     *
     * @param event
     */
    deleteEvent(event): void {
        this.confirmDialogRef = this._matDialog.open(DsConfirmDialogComponent, {
            disableClose: false
        });

        this.confirmDialogRef.componentInstance.confirmMessage = 'Are you sure you want to delete?';

        this.confirmDialogRef.afterClosed().subscribe(result => {
            if (result) {
                //const eventIndex = this.schedules.indexOf(event);
               // this.schedules.splice(eventIndex, 1);
                this.refresh.next(true);
            }
            this.confirmDialogRef = null;
        });

    }

    /**
     * Edit Event
     *
     * @param {string} action
     * @param {CalendarEvent} event
     */
    editEvent(action: string): void {
        //const eventIndex = this.schedules.indexOf(event);
console.log()
        this.dialogRef = this._matDialog.open(ScheduleFormComponent, {
            panelClass: 'scdl-form-dialog',
            data: {
                event: event,
                action: action
            }
        });

        this.dialogRef.afterClosed()
            .subscribe(response => {
                if (!response) {
                    return;
                }
                const actionType: string = response[0];
                const formData: FormGroup = response[1];
                switch (actionType) {
                    /**
                     * Save
                     */
                    case 'save':

                        //this.schedules[eventIndex] = Object.assign(this.schedules[eventIndex], formData.getRawValue());
                        this.refresh.next(true);

                        break;
                    /**
                     * Delete
                     */
                    case 'delete':

                        this.deleteEvent(event);

                        break;
                }
            });
    }

    /**
     * Add Event
     */
    scheduleAssignment(): void {
        this.route.navigate([`/admin/lms/calendar/form`])
        // this.dialogRef = this._matDialog.open(ScheduleFormComponent, {
        //     panelClass: 'scdl-form-dialog',
        //     data: {
        //         action: 'new',
        //         date: this.selectedDay.date
        //     }
        // });
        // this.dialogRef.afterClosed()
        //     .subscribe((response: FormGroup) => {
        //         if (!response) {
        //             return;
        //         }
        //         const newEvent = response.getRawValue();
        //         newEvent.actions = this.actions;
        //         this.schedules.push(newEvent);
        //         this.refresh.next(true);
        //     });
    }
    subfrm(data){
        console.log(data)
        this.transfereService.setData(data);

        this.route.navigate([`/admin/lms/calendar/subfrm`]) 
    }
}


