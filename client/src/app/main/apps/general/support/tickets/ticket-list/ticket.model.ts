
export class Ticket {
    tckt_id: string;
    sts_txt: string;
    tckt_ttl: string;
    dscptn_txt: string;
    asgnd_to: string;
    rsd_by: string
    prorty_id: number
    ctgry_id: number;
    due_dt: string;
    pnd_in: number;
    fav_in: number;
    i_ts: string;
    /**
     * Constructor
     *
     * @param ticket
     */
    constructor(ticket) {
        {
            this.tckt_id = ticket.tckt_id;
            this.sts_txt = ticket.sts_txt || '';
            this.tckt_ttl = ticket.tckt_ttl || '';
            this.dscptn_txt = ticket.dscptn_txt || '';
            this.asgnd_to = ticket.asgnd_to || '';
            this.rsd_by = ticket.rsd_by || '';
            this.prorty_id = ticket.prorty_id;
            this.ctgry_id = ticket.ctgry_id;
            this.due_dt = ticket.due_dt || '';
            this.pnd_in = ticket.pnd_in || 0;
            this.fav_in = ticket.fav_in || 0;
            this.i_ts = ticket.i_ts || '';
        }
    }
}