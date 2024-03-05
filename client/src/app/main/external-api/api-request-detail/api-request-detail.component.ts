import { Component, OnInit } from '@angular/core';
import { TransfereService } from 'app/providers/transfer/transfer.service';
import { CrudService } from 'app/main/apps/crud.service';
import { MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition, MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-api-request-detail',
  templateUrl: './api-request-detail.component.html',
  styleUrls: ['./api-request-detail.component.scss']
})
export class ApiRequestDetailComponent implements OnInit {
  apiDtls: any;
  getHeaderDtls = function () { return { "title": 'Api Request Calls', "icon": "people_outline" } }
  permissions: { "slct_in": number; "insrt_in": number; "updt_in": number; "dlte_in": number; "exprt_in": number; };

  gridData=[]
  grdLst;
  columnDefs;
  rtryColumns;
  retry = true;
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  constructor( public TransfereService: TransfereService,public crdsrv: CrudService, private snackBar: MatSnackBar) { 
    this.permissions = { "slct_in": 1, "insrt_in": 0, "updt_in": 1, "dlte_in": 1, "exprt_in": 1 };
  }

  ngOnInit() {
    this.apiDtls = this.TransfereService.getLoclData("api")
    console.log(this.apiDtls)

    let rte1 = `entity/extrnlapirqstdtl/`+this.apiDtls.api_rqst_id
    this.crdsrv.get(rte1).subscribe((res) => {
      //consolensole.log(res['data'])
      console.log(res['data']) ;
      this.gridData = res['data'];
      let counter = 0;
      this.grdLst = this.gridData;
      this.grdLst.filter((k) => {
        k['sno'] = ++counter;
         k['retry']= true
        if(k.mstr_cl_id == 3 ){
          k.retry =false
        }
      });
      this.columnDefs = [
        { headerName: 'Sno', field: 'sno', cellStyle: { 'text-align': "center" }, cellClass: "pm-grid-number-cell", width: 50, sortable: true, filter: false },
        { headerName: 'Request Name', field: 'rqst_dscn_tx', cellStyle: { 'text-align': "left" }, cellClass: "pm-grid-number-cell", width: 265, sortable: true, filter: true },
        { headerName: 'External Application Name', field: 'extrl_aplcn_nm', cellStyle: { 'text-align': "left" }, cellClass: "pm-grid-number-cell", width: 100, sortable: true, filter: true },
        { headerName: 'URL', field: 'url_tx', cellStyle: { 'text-align': "left" }, cellClass: "pm-grid-number-cell", width: 350, sortable: true, filter: true },
        { headerName: 'URL Body', field: 'url_dta_tx', cellStyle: { 'text-align': "left" }, cellClass: "pm-grid-number-cell", width: 350, sortable: true, filter: true },
        { headerName: 'Method', field: 'mthd_nm', cellStyle: { 'text-align': "left" }, cellClass: "pm-grid-number-cell", width: 100, sortable: true, filter: true },
        { headerName: 'Status', field: 'mstr_cl_res', cellStyle: { 'text-align': "left" }, cellClass: "pm-grid-number-cell", width: 100, sortable: true, filter: true },
        { headerName: 'Response', field: 'req_res', cellStyle: { 'text-align': "left" }, cellClass: "pm-grid-number-cell", width: 150, sortable: true, filter: true },
        { headerName: 'Comment', field: 'cl_cmnt_tx', cellStyle: { 'text-align': "left" }, cellClass: "pm-grid-number-cell", width: 100, sortable: true, filter: true },
        { headerName: 'Last Retry Date', field: 'mstr_ts_dt', cellStyle: { 'text-align': "left" }, cellClass: "pm-grid-number-cell", width: 100, sortable: true, filter: true },
        { headerName: 'Last Retry Time', field: 'mstr_ts_time', cellStyle: { 'text-align': "left" }, cellClass: "pm-grid-number-cell", width: 100, sortable: true, filter: true },
        { headerName: 'Retry Count', field: 'totretry', cellStyle: { 'text-align': "left" }, cellClass: "pm-grid-number-cell", width: 100, sortable: true, filter: true },
        
      ];
      this.rtryColumns = [
        { headerName: 'URL', field: 'url_tx', cellStyle: { 'text-align': "left" }, cellClass: "pm-grid-number-cell", width: 350, sortable: true, filter: true },
        { headerName: 'URL Body', field: 'url_dta_tx', cellStyle: { 'text-align': "left" }, cellClass: "pm-grid-number-cell", width: 350, sortable: true, filter: true },
        { headerName: 'Retry Response', field: 'rspne_tx', cellStyle: { 'text-align': "left" }, cellClass: "pm-grid-number-cell",width: 350, filter: true },
        { headerName: 'Retry Response Status', field: 'rtry_res', cellStyle: { 'text-align': "left" }, cellClass: "pm-grid-number-cell", filter: true },
        { headerName: 'Retry Date', field: 'rtry_ts_dt', cellStyle: { 'text-align': "right" }, cellClass: "pm-grid-number-cell", filter: true },
        { headerName: 'Retry Time', field: 'rtry_ts_time', cellStyle: { 'text-align': "right" }, cellClass: "pm-grid-number-cell", filter: false, search: false }
      ];


    })
      //consolensole.log(this.dprtlst)

}
onCellClick(data){
  console.log(data)
  var dta = {
    rest_cl_id: data.mstr_rest_cl_id,
    enty_ky: this.apiDtls.enty_ky
    
  }
  const rte = `entity/retry`
  console.log(rte)
  this.crdsrv.create(dta,rte).subscribe(res => {
    console.log(res);
    if (res['status'] == 200) {
      this.snackBar.open("Sucessfull", '', {
        duration: 2000,
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      });
    }
  })
}
}