import { Component, OnInit } from '@angular/core';
import { TransfereService } from 'app/providers/transfer/transfer.service';
import { CrudService } from 'app/main/apps/crud.service';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-message-details-view',
  templateUrl: './message-details-view.component.html',
  styleUrls: ['./message-details-view.component.scss']
})
export class MessageDetailsViewComponent implements OnInit {
  msgDtls: any;
  getRowHeight;
  getHeaderDtls = function () { return { "title": 'Message List', "icon": "people_outline" } }
  permissions;
  rowData: any;
  showTble: boolean = true
  showBckBtn: boolean
  columnDefs: ({ headerName: string; field: string; cellStyle: { 'text-align': string; }; cellClass: string; width: number; filter: boolean; search: boolean; } | { headerName: string; field: string; cellStyle: { 'text-align': string; }; cellClass: string; width: number; filter: boolean; search?: undefined; })[];
  details = [];
  selected: any;
  constructor(public TransfereService: TransfereService, private crdsrv: CrudService, private datePipe: DatePipe ) {
    let rowHeight = 40;
    this.getRowHeight = function (params) {
      return rowHeight;
    };
    this.permissions = { "slct_in": 1, "insrt_in": 0, "updt_in": 1, "dlte_in": 1, "exprt_in": 1 };
  }

  ngOnInit() {
    this.msgDtls = this.TransfereService.getLoclData('msgDtls')
    console.log(this.msgDtls)
    this.getMsgbyid()
  }
  getMsgbyid() {
    this.crdsrv.get('caf/gtmsgbyid/' + this.msgDtls.msge_id).subscribe(res => {
      console.log(res['data'])
      this.rowData = res['data']
      this.columnDefs = [
        { headerName: 'Sno', field: 'sno', cellStyle: { 'text-align': "center" }, cellClass: "pm-grid-number-cell", width: 100, filter: false, search: false },
        { headerName: 'CAF Number', field: 'caf_id', cellStyle: { 'text-align': "center" }, cellClass: "pm-grid-number-cell", width: 100, filter: false, search: false },
        { headerName: 'First Name', field: 'frst_nm', cellStyle: { 'text-align': "left" }, cellClass: "pm-grid-number-cell", width: 250, filter: true },
        { headerName: 'Sibscriber Code', field: 'mdlwe_sbscr_id', cellStyle: { 'text-align': "center" }, cellClass: "pm-grid-number-cell", width: 250, filter: false, search: false },

        { headerName: 'District Name', field: 'dstrt_nm', cellStyle: { 'text-align': "left" }, cellClass: "pm-grid-number-cell", width: 150, filter: true },
        { headerName: 'Mandal Name', field: 'mndl_nm', cellStyle: { 'text-align': "left" }, cellClass: "pm-grid-number-cell", width: 150, filter: true },


      ];
    })
  }

  ngOnDestroy() {
    this.TransfereService.ClearLocalData('msgDtls')

  }
  cnclemsg() {
    console.log("hai")
    var data =this.selected
    var msg_cls
    
   console.log(this.msgDtls)
   let expiry = this.datePipe.transform(this.msgDtls.expry_dt, 'yyyy-MM-dd');
   console.log(expiry)
   var arr = expiry.split('-');
   console.log(arr)
   var modified = ""
   for (var i = 0; i < arr.length; i++) {
    modified = modified + arr[i];
  }
  console.log(modified)
    // ["msge_id"] = this.msgDtls.msge_id
    // this.details["mdlwe_sbscr_id"] = data.data.mdlwe_sbscr_id
    if(this.msgDtls.msge_clse_in ==1){
       msg_cls ="true"
    }else{
      msg_cls ="false"
    }
    
    var map = {
      "position":  this.msgDtls.pstn_tx, 
      "fontType": this.msgDtls.fnt_nm,
      "fontSize":this.msgDtls.fnt_sze_ct,

      "fontColor": this.msgDtls.clr_nm,

      "duration": this.msgDtls.msge_drtn_ct,

      "bgColor": this.msgDtls.bg_clr_cd,

      "fingerPrintType": "Static",

      "channel": "324",
      "message": this.msgDtls.msge_tx, 

      "userCanCloseMessage": msg_cls
    }
    console.log(map)
    var mdlwe_sbscr_cds = []
    for(let i=0;i<data.length;i++){
      mdlwe_sbscr_cds.push(
        data[i].mdlwe_sbscr_id
      )
    }
    this.details.push ({
      msge_id: this.msgDtls.msge_id,
      subscribercds:mdlwe_sbscr_cds,
      expiryDate:modified,
      data_map: map
    })
    console.log(this.details)
    const rte = "caf/cnclmsg";
    
      this.crdsrv.create(this.details, rte).subscribe(res => {
        
        // this.rowData = res["data"]
        // // this.searchLoader = false;
        // if (res["data"]) {
        //   this.showTble = true
  
        // }
  
      })
  }
  onCellClick(data) {
    console.log(data)
   
    
    
  }
  getPgeIndx(data) {
    this.selected=data.value
    console.log(data)
  }


}
