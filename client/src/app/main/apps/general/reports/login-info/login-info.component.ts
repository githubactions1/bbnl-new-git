import { Component, OnInit } from '@angular/core';
import { CrudService } from 'app/main/apps/crud.service';
import { DatePipe } from '@angular/common';
import * as _ from 'lodash';
import { Angular5Csv } from 'angular5-csv/dist/Angular5-csv';

@Component({
  selector: 'app-login-info',
  templateUrl: './login-info.component.html',
  styleUrls: ['./login-info.component.scss']
})
export class LoginInfoComponent implements OnInit {
  lgn_info = [];
  gridApi;
  gridApiDstctLgn;
  gridMndlApi;
  gridColumnApi;
  modules;
  columnMdlDefs = [];
  columnDefs;
  defaultColDef;
  rowData = [];
  rowDataMndl = [];
  rowDataDstctLgnCnt = [];
  getRowHeight;
  lgn_inpts = {
    hyrchy_id: 2,
    prsn_nm: '',
    mndl_prsn_nm : '',
    lgn_type: "1",
    dstct_nm: '',
    mndl_nm: '',
    dstct_id: '',
    frm_dt: '',
    to_dt: '',
  }
  mdlLgnTblCtrl = false;
  rowSelection = '';
  lgnCntCtrl = false;
  dstctLgnCntscolumnDefs = [];
  rowDataMndlLgnCnt = [];
  mndllgnCntCtrl = false;
  dtFltrCntl = false;

  overlayLoadingTemplate = '<span class="ag-overlay-loading-center">Please wait while your rows are loading</span>';
  constructor(private apiSrvc: CrudService, private datePipe: DatePipe) {

    this.columnDefs = [
      {
        headerName: "S.No",
        field: "s_no",
        width: 80,
        cellStyle: { textAlign: 'center' },
      },
      {
        headerName: "Distict Name",
        cellRenderer: (params) => {
          return `<a style = "
        text-decoration: underline;
        cursor:pointer;
        color: #2f6992;
        font-weight: bold; ">${params.data.dstrt_nm}</a>`
        },
        field: "dstrt_nm",
        width: 200,
        cellStyle: { textAlign: 'center' },
      },
      {
        headerName: "Person Name",
        field: "fst_nm",
        width: 200,
        cellStyle: { textAlign: 'center' },
      },
      {
        headerName: "User Name",
        field: "mrcht_usr_nm",
        width: 200,
        cellStyle: { textAlign: 'center' },
      },
      {
        headerName: "Login Control",
        field: "app_typ",
        width: 140,
        cellStyle: { textAlign: 'center' },
      },
      {
        headerName: "Mobile No",
        field: "mbl_nu",
        width: 200,
        cellStyle: { textAlign: 'center' },
      },
      {
        headerName: "Login Status",
        field: "lgn_sts",
        width: 200,
        cellStyle: { textAlign: 'center' },
        filterParams: this.radiofltrData(),
        filter: 'agNumberColumnFilter',
      },
      {
        headerName: "Last Login Time",
        field: "lst_lgn_ts",
        width: 200,
        cellStyle: { textAlign: 'center' },
      },
      {
        headerName: "Total Login Count",
        cellRenderer: (params) => {
          return `<button style = "background: #87c7ec;
        width: 40px;
        font-weight: bold;
        border: 1px solid #bfbfbf;">${params.data.lgn_cnt}</button>`
        },
        field: "lgn_cnt",
        width: 200,
        cellStyle: { textAlign: 'center' },
      }

    ];


    this.columnMdlDefs = [
      {
        headerName: "S.No",
        field: "s_no",
        width: 80,
        cellStyle: { textAlign: 'center' },
      },
      {
        headerName: "Mandal Name",
        field: "mndl_nm",
        filter : true,
        width: 200,
        cellStyle: { textAlign: 'center' },
      },
      {
        headerName: "Person Name",
        field: "fst_nm",
        width: 200,
        cellStyle: { textAlign: 'center' },
      },
      {
        headerName: "User Name",
        field: "mrcht_usr_nm",
        width: 200,
        cellStyle: { textAlign: 'center' },
      },
      {
        headerName: "URBAN/RURAL",
        field: "urbn_sts",
        width: 200,
        cellStyle: { textAlign: 'center' },
        filterParams: this.urbnFltrData(),
        filter: 'agNumberColumnFilter',
      },
      {
        headerName: "Login Control",
        field: "app_typ",
        width: 140,
        cellStyle: { textAlign: 'center' },
      },
      {
        headerName: "Mobile No",
        field: "mbl_nu",
        width: 200,
        cellStyle: { textAlign: 'center' },
      },
      {
        headerName: "Login Status",
        field: "lgn_sts",
        width: 200,
        cellStyle: { textAlign: 'center' },
        filterParams: this.radiofltrData()
      },
      {
        headerName: "Last Login Time",
        field: "lst_lgn_ts",
        width: 200,
        cellStyle: { textAlign: 'center' },
      },
      {
        headerName: "Total Login Count",
        field: "lgn_cnt",
        cellRenderer: (params) => {
          return `<button style = "background: #87c7ec;
        width: 40px;
        font-weight: bold;
        border: 1px solid #bfbfbf;">${params.data.lgn_cnt}</button>`
        },
        width: 200,
        cellStyle: { textAlign: 'center' },
      }


    ];

    this.defaultColDef = {
      sortable: true,
      filter: true
    };

    this.dstctLgnCntscolumnDefs = [
      {
        headerName: "S.No",
        field: "s_no",
        width: 80,
        cellStyle: { textAlign: 'center' },
      },

      {
        headerName: "Person Name",
        field: "fst_nm",
        width: 200,
        cellStyle: { textAlign: 'center' },
      },
      {
        headerName: "User Name",
        field: "mrcht_usr_nm",
        width: 200,
        cellStyle: { textAlign: 'center' },
      },
      {
        headerName: "Login Control",
        field: "app_typ",
        width: 140,
        cellStyle: { textAlign: 'center' },
      },

      {
        headerName: "Login Status",
        field: "lgn_sts",
        width: 200,
        cellStyle: { textAlign: 'center' },
        filterParams: this.radiofltrData(),
        filter: 'agNumberColumnFilter',
      },
      {
        headerName: "LoggedIn Time",
        field: "lgn_ts",
        width: 200,
        cellStyle: { textAlign: 'center' },
      },


    ];


    let rowHeight = 40;
    this.getRowHeight = function (params) {
      return rowHeight;
    };
  }

  ngOnInit() {

  }

  getLgnInfo() {
    let data = {
      hyrchy_id: this.lgn_inpts.hyrchy_id,
      frm_dt: this.datePipe.transform(this.lgn_inpts.frm_dt, "yyyy-MM-dd"),
      to_dt: this.datePipe.transform(this.lgn_inpts.to_dt, "yyyy-MM-dd"),
      lgn_type: this.lgn_inpts.lgn_type,
      dstct_id: this.lgn_inpts.dstct_id
    }
    this.apiSrvc.create(data, 'web/common/lgnInfo').subscribe((res) => {
      console.log(res['data']);

      res['data'].filter((k) => {

        _.forIn(k, (value, key) => {
          if (value == null) {
            k[key] = '--'
          }
        })
      })
      res['data'] = _.orderBy(res['data'], 'lgn_cnt', 'desc');
      let counter = 0;
      res['data'].filter((k) => {
        k['s_no'] = ++counter;
      })
      this.rowData = res['data'];
    })

  }


  rowClassRules;
  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.rowClassRules = {
      "rwslctCss": (params) => {
        return params.data.lgn_sts == "Not Logged In";
      }
    };
    this.rowSelection = "single";
    this.getLgnInfo();

  }

  onGridReadyDstctLgnCnt(params) {
    this.gridApiDstctLgn = params.api;
    this.gridColumnApi = params.columnApi;
    this.gridApiDstctLgn.sizeColumnsToFit();
  }

  onSelectionChanged() {
    var selectedRows = this.gridApi.getSelectedRows();
    var selectedRowsString = "";
    selectedRows.forEach(function (selectedRow, index) {
      if (index !== 0) {
        selectedRowsString += ", ";
      }
      selectedRowsString += selectedRow.dstrt_nm;
    });
    document.querySelector("#selectedRows").innerHTML = selectedRowsString;
  }

  lgnDtls = () => {
    this.getLgnInfo();
    this.getLgnMndlInfo();
  }

  mnldlWseLgnInfo = (event) => {
    if (event && event.colDef.field == "lgn_cnt") {
      console.log(event.data);
      this.lgn_inpts.dstct_nm = event.data.dstrt_nm;
      this.lgn_inpts.prsn_nm = event.data.mrcht_usr_nm;

      let counter = 0;
      event.data.lgn_dtls.filter((k) => {
        k['s_no'] = ++counter;
      })
      this.rowDataDstctLgnCnt = event.data.lgn_dtls;
      var box_m = document.getElementById('box-f');
      this.faedOut(box_m);
      setTimeout(() => {
        this.lgnCntCtrl = true;
      }, 500);
      if (this.mdlLgnTblCtrl) {
        this.lgn_inpts.dstct_id = event.data.dstrt_id;
        console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%%")
        this.getLgnMndlInfo();
      }
    }
    else {
      console.log(event.data)
      this.lgn_inpts.dstct_id = event.data.dstrt_id;
      this.lgn_inpts.dstct_nm = event.data.dstrt_nm;

      this.getLgnMndlInfo();
      this.mdlLgnTblCtrl = true;
      if (this.gridMndlApi) {
        this.gridMndlApi.showLoadingOverlay();
      }

    }
  }

  mndlLgnCtnsTbl = (event) => {
    if (event && event.colDef.field == "lgn_cnt") {
      let counter = 0;
      event.data.lgn_dtls.filter((k) => {
        k['s_no'] = ++counter;
      })
      this.lgn_inpts.mndl_nm = event.data.mndl_nm;
      this.lgn_inpts.mndl_prsn_nm = event.data.mrcht_usr_nm;
      this.rowDataMndlLgnCnt = event.data.lgn_dtls;
      var box_m = document.getElementById('box-m');
      this.faedOut(box_m);
      setTimeout(() => {
        this.mndllgnCntCtrl = true
      }, 500);
    }
  }
  getCss() {
    if (this.lgnCntCtrl == false) {
      return 'shwTblCss';
    }
    else if (this.lgnCntCtrl == true) {
      return 'hdeTblCss'
    }

  }

  getMndlCss() {
    if (this.mndllgnCntCtrl == false) {
      return 'shwTblCss';
    }
    else if (this.mndllgnCntCtrl == true) {
      return 'hdeTblCss'
    }

  }

  bckDstctTbl = () => {
    this.lgnCntCtrl = false;
    console.log("__________________________")
    var box_m = document.getElementById('box-f');
    this.faedIn(box_m);
  }

  bckMndlTbl =  () => {
    this.mndllgnCntCtrl = false;
    console.log("__________________________")
    var box_m = document.getElementById('box-m');
    this.faedIn(box_m);
  }



  faedIn(elem) {
    var elementattr = Number(getComputedStyle(elem).opacity);

    if (elementattr >= 1) {
      return;
    }
    elem.style.opacity = elementattr + 0.01;
    setTimeout(() => {
      this.faedIn(elem);
    }, 10);
  }
  faedOut(elem) {
    var elementattr = Number(getComputedStyle(elem).opacity);

    if (elementattr <= 0) {
      return;
    }
    elem.style.opacity = elementattr - 0.01;
    setTimeout(() => {
      this.faedOut(elem);
    }, 10);

  }

  getLgnMndlInfo() {

    let data = {
      hyrchy_id: this.lgn_inpts.hyrchy_id,
      frm_dt: this.datePipe.transform(this.lgn_inpts.frm_dt, "yyyy-MM-dd"),
      to_dt: this.datePipe.transform(this.lgn_inpts.to_dt, "yyyy-MM-dd"),
      lgn_type: this.lgn_inpts.lgn_type,
      dstct_id: this.lgn_inpts.dstct_id
    }
    this.apiSrvc.create(data, 'web/common/lgnInfoMndll').subscribe((res) => {
      console.log(res['data']);
      res['data'].filter((k) => {
        _.forIn(k, (value, key) => {
          if (value == null) {
            k[key] = '--'
          }
        })
      })
      res['data'] = _.orderBy(res['data'], 'lgn_cnt', 'desc')
      let counter = 0;
      res['data'].filter((k) => {
        k['s_no'] = ++counter;
      })


      this.rowDataMndl = res['data'];
    })

  }
  onGridReadyMdl(params) {
    this.gridMndlApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.gridMndlApi.showLoadingOverlay();
  }

  lgnTpeChng = () => {
    this.lgn_inpts.hyrchy_id = 2;
  }

  radiofltrData() {
    return {
      filterOptions: [
        "empty",
        {
          displayKey: "nt_lgd_in",
          displayName: "Not Logged In",
          test: function (filterValue, cellValue) {
            return cellValue === "Not Logged In";
          },
          hideFilterInput: true
        },
        {
          displayKey: "lgd",
          displayName: "Logged",
          test: function (filterValue, cellValue) {
            return cellValue === "Logged";
          },
          hideFilterInput: true
        },
        {
          displayKey: "all",
          displayName: "ALL",
          test: function (filterValue, cellValue) {
            return cellValue === "Logged" || cellValue === "Not Logged In";
          },
          hideFilterInput: true
        },
      ],
      suppressAndOrCondition: true
    }
  }


  
  urbnFltrData() {
    return {
      filterOptions: [
        "empty",
        {
          displayKey: "urbn",
          displayName: "URBAN",
          test: function (filterValue, cellValue) {
            return cellValue == "URBAN";
          },
          hideFilterInput: true
        },
        {
          displayKey: "rrl",
          displayName: "RURAL",
          test: function (filterValue, cellValue) {
            return cellValue == "RURAL";
          },
          hideFilterInput: true
        },
        {
          displayKey: "all",
          displayName: "ALL",
          test: function (filterValue, cellValue) {
            return cellValue == "URBAN" || cellValue == "RURAL";
          },
          hideFilterInput: true
        },
      ],
      suppressAndOrCondition: true
    }
  }
  getNvrLgnDtls = ()=>{
    this.apiSrvc.get('web/common/nvrLgnDtls').subscribe((res)=>{
      console.log(res['data']);
      if(res['data'] && res['data'].dstct_nvr_lgn)
      {
        let rw_data = []
        res['data'].dstct_nvr_lgn.filter((k)=>{
          rw_data.push({
            dstct_nm : k.dstct_nm,
            fst_nm : k.fst_nm,
            mrcht_usr_nm : k.mrcht_usr_nm,
            mbl_nu : k.mbl_nu,
            lgn_sts : 'Not LoggedIn'
          })
        })
        let hdrs = ["Distict Name", "Person Name", "User Name", "Mobile No", "Login Status"]
        let options = {
          fieldSeparator: ',',
          quoteStrings: '"',
          decimalseparator: '.',
          showLabels: true,
          useBom: true,
          headers: hdrs
        };
        new Angular5Csv(rw_data, 'DistctWiseNeverLoginDetails', options);
      }
      if(res['data'] && res['data'].mndl_nvr_lgn)
      {
        let rw_data = []
        res['data'].mndl_nvr_lgn.filter((k)=>{
          rw_data.push({
            mndl_nm : k.mndl_nm,
            fst_nm : k.fst_nm,
            mrcht_usr_nm : k.mrcht_usr_nm,
            mbl_nu : k.mbl_nu,
            lgn_sts : 'Not LoggedIn'
          })
        })
        let hdrs = ["Mandal Name", "Person Name", "User Name", "Mobile No", "Login Status"]
        let options = {
          fieldSeparator: ',',
          quoteStrings: '"',
          decimalseparator: '.',
          showLabels: true,
          useBom: true,
          headers: hdrs
        };
        new Angular5Csv(rw_data, 'MondalWiseNeverLoginDetails', options);
      }

      
    }, (err)=>{
      console.log(err)
    })
  }

  csvExprt = (tbl_type)=>{
    let frm_dt =  this.datePipe.transform(this.lgn_inpts.frm_dt, "yyyy-MM-dd");
    let to_dt =  this.datePipe.transform(this.lgn_inpts.to_dt, "yyyy-MM-dd");

    if(tbl_type == 'distct')
    {
     
      var params = {
        
        fileName : 'DistctWiseLoginInfo' + frm_dt != null ? frm_dt : '' + "To" +  to_dt != null ? to_dt : '',
      }
      this.gridApi.exportDataAsCsv(params);
    }
    else if(tbl_type == 'dstct_lgn')
    {
      var params = {
        fileName : this.lgn_inpts.dstct_nm + "LoginInfo" + this.lgn_inpts.prsn_nm + frm_dt != null ? frm_dt : '' + "To" +  to_dt != null ? to_dt : '',
      }
      this.gridApiDstctLgn.exportDataAsCsv(params);
    }
    else if(tbl_type == 'mndl')
    {
      var params = {
        fileName : this.lgn_inpts.dstct_nm + "LoginInfo" + frm_dt != null ? frm_dt : '' + "To" +  to_dt != null ? to_dt : '',
      }
      this.gridMndlApi.exportDataAsCsv(params);
    }
    else if(tbl_type == 'mndl_lgn')
    {
      var params = {
        fileName : this.lgn_inpts.mndl_nm + "LoginInfo" + this.lgn_inpts.mndl_prsn_nm + frm_dt != null ? frm_dt : '' + "To" +  to_dt != null ? to_dt : '',
      }
      this.gridApiDstctLgn.exportDataAsCsv(params);
    }
   
  }

}
