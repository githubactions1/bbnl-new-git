import { Component, OnInit, Input } from '@angular/core';
import { CrudService } from 'app/main/apps/crud.service';
@Component({
  selector: 'ds-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {
  @Input() enty_id:any;
  @Input() enty_ky:any;
  rowData:any;
  columnDefs:any;
  noEvntDtlsDiv: boolean;

  constructor(public crdsrv:CrudService) { }

  ngOnInit() {
    this.getEvents()
  }

  getEvents(){
    console.log(this.enty_id);
        const rte = 'common/events';
        this.crdsrv.create({"enty_id":this.enty_id,"enty_ky":this.enty_ky },rte).subscribe(res => {
              if (res['status'] == 200) {
                
                this.rowData=res['data'];
                console.log(this.rowData);
                if (this.rowData.length == 0){
                  this.noEvntDtlsDiv = true;
                } else{
                  this.noEvntDtlsDiv = false;
                }
                  this.columnDefs = [ 
                      { headerName: 'Sno', field: 'sno', alignment: 'center', cellClass: "pm-grid-number-cell", width: 100, sortable: true, filter: false },
                      { headerName: 'Event ID', field: 'evnt_id', hide: true, alignment: 'center', cellClass: "pm-grid-number-cell", width: 100 },
                      { headerName: 'Event Status', field: 'evnt_sts_nm', alignment: 'left', cellClass: "pm-grid-number-cell", width: 150, sortable: true, filter: true },
                      { headerName: 'Event Description', field: 'evnt_tx', alignment: 'left', cellClass: "pm-grid-number-cell", width: 300, sortable: true, filter: true },
                      { headerName: 'Event date', field: 'evnt_dt', alignment: 'center', cellClass: "pm-grid-number-cell", width: 150, sortable: true, filter: true },
                      { headerName: 'Event Timestamp', field: 'i_ts', alignment: 'center', cellClass: "pm-grid-number-cell", width: 180, sortable: true, filter: true }
                  ];
              }
        })
  } // -- end getEvents
}
