import { Component, OnInit } from '@angular/core';
import { CrudService } from 'app/main/apps/crud.service';
import { Router } from '@angular/router';
import { TransfereService } from 'app/providers/transfer/transfer.service';
@Component({
  selector: 'app-lmo-blck-upload',
  templateUrl: './lmo-blck-upload.component.html',
  styleUrls: ['./lmo-blck-upload.component.scss']
})
export class LmoBlckUploadComponent implements OnInit {
  getRowHeight: (params: any) => number;
  getHeaderDtls = function () { return { "title": 'Bulk Upload', "icon": "people_outline" } }
  permissions: { slct_in: number; insrt_in: number; updt_in: number; dlte_in: number; exprt_in: number;"addbtn":number };
  columnDefs = [];
  columnDefss = [];
  rowData = []; 

  showBckBtn = false;
  showTble=true
  blck_lst: any;
  constructor(private crdsrv: CrudService, private router: Router,public TransfereService: TransfereService) { 
    let rowHeight = 40;
    this.getRowHeight = function (params) {
      return rowHeight;
    }
    this.permissions = { "slct_in": 1, "insrt_in": 0, "updt_in": 1, "dlte_in": 1, "exprt_in": 1,"addbtn":1 };
  }

  ngOnInit() {

    this.columnDefs = [
      { headerName: 'Sno', field: 'sno', cellStyle: { 'text-align': "center" }, cellClass: "pm-grid-number-cell", width: 100, filter: false, search: false },
      // { headerName: 'CAFNO', field: 'caf_id', cellStyle: { 'text-align': "center" }, cellClass: "pm-grid-number-cell", width: 100, filter: false, search: false },
      { headerName: 'Customer/organization  Name', field: 'frst_nm', cellStyle: { 'text-align': "left" }, cellClass: "pm-grid-number-cell", width: 250, filter: true },
      { headerName: 'District', field: 'dstrct_nm', cellStyle: { 'text-align': "center" }, cellClass: "pm-grid-number-cell", width: 100, filter: false, search: false },

      { headerName: 'Mandal', field: 'mndl_nm', cellStyle: { 'text-align': "left" }, cellClass: "pm-grid-number-cell", width: 150, filter: true },
      { headerName: 'Village', field: 'vlge_nm', cellStyle: { 'text-align': "left" }, cellClass: "pm-grid-number-cell", width: 150, filter: true },
      { headerName: 'Olt Location name', field: 'olt_lc_nm', cellStyle: { 'text-align': "left" }, cellClass: "pm-grid-number-cell", width: 150, filter: true },
      { headerName: 'ApsflUniqId', field: 'apsf_unq_id', cellStyle: { 'text-align': "left" }, cellClass: "pm-grid-number-cell", width: 150, filter: true },
      { headerName: 'Status', field: 'sts', cellStyle: { 'text-align': "center" }, cellClass: "pm-grid-number-cell", width: 150, filter: true },
      // { headerName: 'Provison CAF', field: 'prvision', cellStyle: { 'text-align': "left" }, cellClass: "pm-grid-number-cell", width: 150, filter: true },
    ];
    this.getblckDtls()
  }
  getblckDtls(){
    const rte = `caf/gtblckdtls`;
    this.crdsrv.get(rte).subscribe((res) => {
      this.blck_lst = res['data'];
      let ct = 0;
      this.blck_lst.filter(k => {
        k['sno'] = ++ct;
        if(k.prv_sts==1){
          k['sts']='Pending'
        }else{
          k['sts']='Activated'
          this.permissions.addbtn=0
        }
      });
      console.log(this.blck_lst);
    });

  }

  getPgeIndx($event){
    
  }

  onCellClick(data){
    console.log(data.data)
    this.TransfereService.setData(data.data)
    this.router.navigate(['admin/caf/caf-blck-frm'])

  }
}
