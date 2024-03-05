import { CalendarEventAction } from 'angular-calendar';
import { startOfDay, endOfDay } from 'date-fns';

export class ScheduleEventModel
{
    start: Date;
    end?: Date;
    start_time?:'';
    end_time?:'';
    batch_nm: string;
    trng_nm: string;
    color: {
        primary: string;
        secondary: string;
    };
    actions?: CalendarEventAction[];
    allDay?: boolean;
    cssClass?: string;
    resizable?: {
        beforeStart?: boolean;
        afterEnd?: boolean;
    };
    draggable?: boolean;
    meta?: {
        location: string,
        desc: string
    };

    /**
     * Constructor
     *
     * @param data
     */
    constructor(data?)
    {
        data = data || {};
        this.start = new Date(data.schdl_st_dt) || startOfDay(new Date());
        this.end = new Date(data.schdl_end_dt) || endOfDay(new Date());
        this.start_time = data.strt_tm;
        this.end_time = data.end_tm;
        this.batch_nm = data.schdl_batch_nm || '';
        this.actions = data.actions || [];
        this.allDay = data.allDay || false;
        this.trng_nm =data.trng_nm;
        this.meta = {
            location: data.trng_vnu_nm || '',
            desc   : data.trng_disc || ''
        };
    }
}
