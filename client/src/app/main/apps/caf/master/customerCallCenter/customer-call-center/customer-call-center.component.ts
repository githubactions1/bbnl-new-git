import { Component, OnInit } from '@angular/core';
import { DsSidebarService } from '@glits/components/sidebar/sidebar.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


import DataSource from 'devextreme/data/data_source';
import { DatePipe } from '@angular/common';
import { DeleteDialogComponent } from 'app/main/shared/components/delete-dialog/delete-dialog.component';
import {
  MatTableDataSource, MatPaginator, MatSort, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition, MatDialogRef, MatSnackBar, MatDialog,
  MAT_DIALOG_DATA
} from '@angular/material';
import { CrudService } from 'app/main/apps/crud.service';
import { Router } from '@angular/router';
import { Dataservice } from 'app/main/shared/components/dataService';
import { DxTreeListComponent, DxDataGridComponent } from 'devextreme-angular';
import { TransfereService } from 'app/providers/transfer/transfer.service';
import { CustomerProfileComponent } from '../../customer/customer-profile/customer-profile.component';

@Component({
  selector: 'app-customer-call-center',
  templateUrl: './customer-call-center.component.html',
  styleUrls: ['./customer-call-center.component.scss']
})
export class CustomerCallCenterComponent implements OnInit {
  cafFRm: FormGroup;
  showTble = false;
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  usrdtls: any;
  searchLoader: boolean = false;
  rowData = [];
  permissions;
  getRowHeight;
  columnDefs = [];
  boxcolumnDefs = [];
  shwLdr: boolean;
  tableview:boolean = false;
  packagecolumnDefs = [];
  voipcolumnDefs = [];
  hsicolumnDefs = [];
  previousSearchData = [];
  monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  invoicecolumnDefs = [];


  getHeaderDtls = function () { return { "title": 'Customers  List', "icon": "people_outline" } }
  clickDetails: any;
  cafDtlsData: any;
  pkgeData: any;
  voipData: any;
  hsiData: any;
  invoiceData: any;
  boxrowData: any;
  items = [];
  rcntSrchItms=[];
  searchData: any;
  frontJsonData:any;
  allsrc_itms = []
  cstmrData: any;

  constructor(public _dsSidebarService: DsSidebarService, private _formBuilder: FormBuilder, private crdsrv: CrudService, private datePipe: DatePipe, public dataService: Dataservice,
    private snackBar: MatSnackBar, public dialog: MatDialog, private route: Router, public TransfereService: TransfereService,public dialogRef: MatDialogRef<CustomerProfileComponent>) {
    let rowHeight = 40;
    this.getRowHeight = function (params) {
      return rowHeight;
    };
    // const permTxt = 'Customer Creation';
    // const prmeRte = `user/permissions/${permTxt}`;
    // this.crdsrv.get(prmeRte).subscribe((res) => {
    //    console.log(res['data'][0]);
    //   this.permissions = res['data'][0];
    // });
    this.permissions = { "slct_in": 1, "insrt_in": 0, "updt_in": 1, "dlte_in": 1, "exprt_in": 1 };
  }

  ngOnInit() {
    this.usrdtls = JSON.parse(localStorage.getItem('usrDtls'));
    console.log(this.usrdtls)
    this.cafFRm = this._formBuilder.group({
      mobileno: ['', Validators],
      CAf: ['', Validators],
      adhar: ['', Validators],
      iptv: ['', Validators],
      onu: ['', Validators],
    });
    this.getRcntSrchItmsLclStrge();
  }


  getDetails() {
    if (this.cafFRm.value.mobileno || this.cafFRm.value.CAf || this.cafFRm.value.adhar || this.cafFRm.value.iptv || this.cafFRm.value.onu) {
      var data = {
        mobileno: this.cafFRm.value['mobileno'],
        CAf: this.cafFRm.value['CAf'],
        adhar: this.cafFRm.value['adhar'],
        iptv: this.cafFRm.value['iptv'],
        onu: this.cafFRm.value['onu'],
      }
      console.log(data);
      this.crdsrv.create(data, "caf/getdt").subscribe(res => {
        this.rowData = res["data"]
        console.log(this.rowData);
        this.searchLoader = false;
        if (res["data"]) {
          this.setRcntSrchLclStrge(data);
          this.showTble = true
        }
      })
      this.columnDefs = [
        { headerName: 'Sno', field: 'sno', algnmnt: "center", cellClass: "pm-grid-number-cell", width: 100, filter: false, search: false },
        { headerName: 'CAF No', field: 'caf_nu', algnmnt: "left", cellClass: "pm-grid-number-cell", width: 150, filter: true, filterOperations: ['contains', 'startswith', '='] },
        { headerName: 'Name', field: 'cstmr_nm', cellClass: "pm-grid-number-cell", width: 150, filter: true },
        { headerName: 'Mobile Number', field: 'cntct_mble1_nu', algnmnt: "center", cellClass: "pm-grid-number-cell", width: 150, filter: true, filterOperations: ['contains', 'startswith', '='], selectedFilterOperation: 'contains', allowFiltering: true },
        { headerName: 'Status', field: 'sts_nm', cellClass: "pm-grid-number-cell", width: 125, filter: true },
        { headerName: 'LMO', field: 'lmo_cd', cellClass: "pm-grid-number-cell", width: 125, filter: true },
        { headerName: 'Billing Frequency', field: 'frqncy_nm', cellClass: "pm-grid-number-cell", width: 110, filter: true },
        { headerName: 'Activation Date', field: 'actvn_dt', algnmnt: "center", cellClass: "pm-grid-number-cell", width: 125, filter: true },
        { headerName: 'Suspended Date', field: 'spnd_dt', algnmnt: "center", cellClass: "pm-grid-number-cell", width: 125, filter: true },
        { headerName: 'Resume Date', field: ' rsme_dt', algnmnt: "center", cellClass: "pm-grid-number-cell", width: 125, filter: true },
        { headerName: 'Termination Date', field: 'trmnd_dt', algnmnt: "center", cellClass: "pm-grid-number-cell", width: 125, filter: true }
      ];
    }
    else {
      this.snackBar.open('please Select Atleast One To Get Data', 'Undo', {
        duration: 3000,
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      });
    }

  }

  
  // rcntSrchItms = [];
  getRcntSrchItmsLclStrge = () => {
    var finaldata = [];
    let srch_val: any = localStorage.getItem('rcntSrch');
    console.log(srch_val);
     this.rcntSrchItms = srch_val = JSON.parse(srch_val);
    console.log(this.rcntSrchItms);
    if(this.rcntSrchItms != null){
      let rte='caf/customer/previousSearch'
      this.crdsrv.create(this.rcntSrchItms,rte).subscribe((res) => {
        console.log(res['data']);
        this.searchData = res['data'];
        if(res['status'] == 200){
          this.tableview=true;
          console.log(this.searchData);
          console.log(this.searchData.length);
          for(var m=0; m<this.searchData.length; m++){
            finaldata.push(this.searchData[m][0])
          }
          console.log(finaldata);
          this.frontJsonData=finaldata;
          console.log(this.frontJsonData);
           var index=0;
        for(var n=0; n<this.frontJsonData.length; n++){
         if(this.frontJsonData[n]){
          index = index + 1;
           this.frontJsonData[n].sno=index;
         }
        }
       console.log(this.frontJsonData);
         
          this.previousSearchData = [
            { headerName: 'Sno', field: 'sno', algnmnt: "center", cellClass: "pm-grid-number-cell", width: 100, filter: false, search: false },
            { headerName: 'CAF No', field: 'caf_nu', algnmnt: "left", cellClass: "pm-grid-number-cell", width: 150, filter: true, filterOperations: ['contains', 'startswith', '='] },
            { headerName: 'Name', field: 'cstmr_nm', cellClass: "pm-grid-number-cell", width: 150, filter: true },
            { headerName: 'Mobile Number', field: 'cntct_mble1_nu', algnmnt: "center", cellClass: "pm-grid-number-cell", width: 150, filter: true, filterOperations: ['contains', 'startswith', '='], selectedFilterOperation: 'contains', allowFiltering: true },
            { headerName: 'Status', field: 'sts_nm', cellClass: "pm-grid-number-cell", width: 125, filter: true },
            { headerName: 'LMO', field: 'lmo_cd', cellClass: "pm-grid-number-cell", width: 125, filter: true },
            { headerName: 'Billing Frequency', field: 'frqncy_nm', cellClass: "pm-grid-number-cell", width: 110, filter: true },
            { headerName: 'Activation Date', field: 'actvn_dt', algnmnt: "center", cellClass: "pm-grid-number-cell", width: 125, filter: true },
            { headerName: 'Suspended Date', field: 'spnd_dt', algnmnt: "center", cellClass: "pm-grid-number-cell", width: 125, filter: true },
            { headerName: 'Resume Date', field: ' rsme_dt', algnmnt: "center", cellClass: "pm-grid-number-cell", width: 125, filter: true },
            { headerName: 'Termination Date', field: 'trmnd_dt', algnmnt: "center", cellClass: "pm-grid-number-cell", width: 125, filter: true }
          ];
        }
    
      })
    }
    else if(this.rcntSrchItms == null){
      this.tableview=false;
    }
   
  }

  setRcntSrchLclStrge = (rcnt_srch) => {

    let srch_items = {
      rcnt_srch: rcnt_srch,
      time: new Date().toLocaleString()
    }
    this.allsrc_itms = JSON.parse(localStorage.getItem('rcntSrch'))
    console.log(this.allsrc_itms)
    if(this.allsrc_itms!=null){
      this.allsrc_itms.push({'search':srch_items})
      localStorage.setItem('rcntSrch', JSON.stringify(this.allsrc_itms));
    }
    else{
      this.items.push({'search':srch_items})
      localStorage.setItem('rcntSrch', JSON.stringify(this.items));
    }

    // let srch_val: any = localStorage.getItem('rcntSrch');
    // console.log(srch_val);
    this.getRcntSrchItmsLclStrge();
    // let srch_val: any = localStorage.getItem('rcntSrch');
    // console.log(srch_val)
    // if (srch_val == null) {
    //   let items = [];
    //   items.push(srch_items)
    //   localStorage.setItem('rcntSrch', JSON.stringify(items));
    //   setTimeout(() => {
    //     this.getRcntSrchItmsLclStrge();
    //   }, 50);
    // }
    // else {
    //   srch_val = JSON.parse(srch_val);
    //   srch_val.push(srch_items)
    //   localStorage.setItem('rcntSrch', JSON.stringify(srch_val));
    //   setTimeout(() => {
    //     this.getRcntSrchItmsLclStrge();
    //   }, 50);
    // }
  }

  Reset(Form) {
    this.showTble = false
    Form.reset()
    console.log(this.cafFRm)
  }
  openSideBar = function () {
    this._dsSidebarService.getSidebar('addFormPanel').toggleOpen();
  }
  closeSideBar = function () {
    this._dsSidebarService.getSidebar('addFormPanel').toggleOpen();
  }
  onviewClick(data) {
    console.log(data);
    this.cstmrData = data.data;
    console.log(this.cstmrData);
    this.openSideBar();
    // this.openSideBar();
    // this.getboxdata();
    // const dialogRef = this.dialog.open(CustomerProfileComponent, {
    //   width: '95%', height: '95%', data: { ind: 1, imgData: data }
    // });

    // dialogRef.afterClosed().subscribe(result => {
    //   if (result == 'Cancel') {
    //   }
    // });
  }
  firstChane(event) {
    console.log(event);
  }
  tabChangeFn(event) {
    console.log(event);
    if (event.index == 0) {
      this.getboxdata();
    } else if (event.index === 1) {
      this.getpackage();
    } else if (event.index === 2) {
      this.getvoip();
    } else if (event.index === 3) {
      this.gethsi();
    } else if (event.index === 4) {
      this.getInvoice();
    }
  }
  getboxdata() {
    console.log(this.clickDetails);
    this.shwLdr = true;
    const rte = 'caf/customer/profile/' + this.clickDetails.caf_id;
    console.log(rte);
    this.crdsrv.get(rte).subscribe((res) => {
      this.cafDtlsData = res['data'];
      this.shwLdr = false;
      console.log(this.cafDtlsData);
      this.boxrowData = this.cafDtlsData;
    });
    this.boxcolumnDefs = [
      { headerName: 'ONU Serial Number', field: 'onu_srl_nu', alignment: 'left', cellClass: "pm-grid-number-cell", width: 150, filter: true },
      { headerName: 'ONU Mac Address', field: 'onu_mac_addr_tx', alignment: 'left', cellClass: "pm-grid-number-cell", width: 150, filter: true },
      { headerName: 'ONU Model Name', field: 'onu_mdl_nm', alignment: 'left', cellClass: "pm-grid-number-cell", width: 200, filter: true },
      { headerName: 'IPTV Serial Number', field: 'iptv_srl_nu', alignment: 'left', cellClass: "pm-grid-number-cell", width: 150, filter: true },
      { headerName: 'IPTV Mac Address', field: 'iptv_mac_addr_tx', alignment: 'left', cellClass: "pm-grid-number-cell", width: 150, filter: true },
      { headerName: 'IPTV Model Name', field: 'iptv_mdl_nm', alignment: 'left', cellClass: "pm-grid-number-cell", width: 200, filter: true },
    ];
  }
  getpackage() {
    this.shwLdr = true;
    const rte = 'caf/customer/package/' + this.clickDetails.caf_id;
    console.log(rte)
    this.crdsrv.get(rte).subscribe((res) => {
      this.pkgeData = res['data'];
      this.shwLdr = false;
      console.log(this.pkgeData)
    })
    this.packagecolumnDefs = [
      { headerName: 'Sno', field: 'sno', alignment: 'center', cellClass: "pm-grid-number-cell", width: 100, filter: true },
      { headerName: 'Plan Name', field: 'pckge_nm', alignment: 'left', cellClass: "pm-grid-number-cell", width: 150, filter: false, search: false },
      { headerName: 'Service Plan', field: 'srvcpk_nm', alignment: 'left', cellClass: "pm-grid-number-cell", width: 150, filter: true },
      { headerName: 'Core Service Name', field: 'cre_srvce_nm', alignment: 'left', cellClass: "pm-grid-number-cell", width: 200, filter: true },
      { headerName: 'Plan Charges', field: 'chrge_at', alignment: 'right', cellClass: "pm-grid-number-cell", width: 200, filter: true },
      { headerName: 'Plan Gst Charges', field: 'gst_at', alignment: 'right', cellClass: "pm-grid-number-cell", width: 200, filter: true },
      { headerName: 'Plan Activation', field: 'plan_act', alignment: 'center', cellClass: "pm-grid-number-cell", width: 200, filter: true },
      { headerName: 'Plan Expiry', field: 'plan_exp', alignment: 'center', cellClass: "pm-grid-number-cell", width: 200, filter: true },

    ];
  }
  getvoip() {
    this.shwLdr = true;
    const rte = 'caf/customer/voip/' + this.clickDetails.caf_id;
    console.log(rte)
    this.crdsrv.get(rte).subscribe((res) => {
      for (var i = 0; i < res['data'].length; i++) {
        res['data'][i]['month'] = this.monthNames[res['data'][i].call_mm - 1];
      }
      this.voipData = res['data'];
      this.shwLdr = false;
      console.log(this.voipData)
    })
    this.voipcolumnDefs = [
      { headerName: 'Sno', field: 's_no', alignment: 'center', cellClass: "pm-grid-number-cell", width: 100, filter: true },
      { headerName: 'Phone no', field: 'phne_nu', alignment: 'center', cellClass: "pm-grid-number-cell", width: 100, filter: true },
      { headerName: 'Year', field: 'call_yr', alignment: 'center', cellClass: "pm-grid-number-cell", width: 150, filter: false, search: false },
      { headerName: 'Month', field: 'month', alignment: 'left', cellClass: "pm-grid-number-cell", width: 150, filter: true },
      { headerName: 'STD Charges', field: 'std_chrge_at', alignment: 'right', cellClass: "pm-grid-number-cell", width: 200, filter: true },
      { headerName: 'ISD Charges', field: 'isd_chrge_at', alignment: 'right', cellClass: "pm-grid-number-cell", width: 200, filter: true },
      { headerName: 'Local Charges', field: 'lcl_chrge_at', alignment: 'right', cellClass: "pm-grid-number-cell", width: 200, filter: true },
      { headerName: 'Total Charges', field: 'total', alignment: 'right', cellClass: "pm-grid-number-cell", width: 200, filter: true },
    ];
  }
  gethsi() {
    this.shwLdr = true;
    const rte = 'caf/customer/hsi/' + this.clickDetails.caf_id;
    console.log(rte)
    this.crdsrv.get(rte).subscribe((res) => {
      console.log(res['data'])
      for (var i = 0; i < res['data'].length; i++) {
        res['data'][i]['month'] = this.monthNames[res['data'][i].month - 1];
      }
      this.hsiData = res['data'];
      this.shwLdr = false;
      console.log(this.hsiData)
    })
    this.hsicolumnDefs = [
      { headerName: 'Sno', field: 'sno', alignment: 'center', cellClass: "pm-grid-number-cell", width: 100, filter: true },
      { headerName: 'Year', field: 'year', alignment: 'left', cellClass: "pm-grid-number-cell", width: 100, filter: true },
      { headerName: 'Month', field: 'month', alignment: 'left', cellClass: "pm-grid-number-cell", width: 100, filter: true },
      { headerName: 'Total Download(GB)', field: 'dwnldsize', alignment: 'center', cellClass: "pm-grid-number-cell", width: 250, filter: false, search: false },
      { headerName: 'Total Upload(GB)', field: 'upldsize', alignment: 'center', cellClass: "pm-grid-number-cell", width: 250, filter: true },
      { headerName: 'Total Size(GB)', field: 'totalsize', alignment: 'center', cellClass: "pm-grid-number-cell", width: 250, filter: true },

    ];
  }
  getInvoice() {
    this.shwLdr = true;
    const rte = 'caf/customer/invoice/' + this.clickDetails.caf_id;
    console.log(rte)
    this.crdsrv.get(rte).subscribe((res) => {
      console.log(res['data'])
      this.invoiceData = res['data'];
      this.shwLdr = false;
      console.log(this.invoiceData)
    })
    this.invoicecolumnDefs = [
      { headerName: 'Sno', field: 's_no', algnmnt: "center", cellClass: "pm-grid-number-cell", width: 100, sortable: true, filter: true },
      { headerName: 'Invoice Id', field: 'caf_invce_id', algnmnt: "center", cellClass: "pm-grid-number-cell", width: 100, sortable: true, filter: true },
      { headerName: 'Year', field: 'invce_yr', algnmnt: "center", cellClass: "pm-grid-number-cell", width: 100, sortable: true, filter: true },
      { headerName: 'Month', field: 'invce_mm', algnmnt: "left", cellClass: "pm-grid-number-cell", width: 100, sortable: true, filter: true },
      { headerName: 'Invoce From Date', field: 'invce_frm_dt', algnmnt: "center", cellClass: "pm-grid-number-cell", width: 200, sortable: true, filter: true },
      { headerName: 'Invoce To Date', field: 'invce_to_dt', algnmnt: "center", cellClass: "pm-grid-number-cell", width: 200, sortable: true, filter: true },
      { headerName: 'Package', field: 'pckge_nm', algnmnt: "left", cellClass: "pm-grid-number-cell", width: 100, sortable: true, filter: true },
	  { headerName: 'Active Days', field: 'ActiveDays', alignment: 'left', cellClass: 'pm-grid-number-cell', width: 100, sortable: true, filter: true },
      { headerName: 'Suspend Days', field: 'SuspendDays', alignment: 'left', cellClass: 'pm-grid-number-cell', width: 100, sortable: true, filter: true },
	  { headerName: 'Caf Type', field: 'caf_type_nm', alignment: 'left', cellClass: 'pm-grid-number-cell', width: 100, sortable: true, filter: true },
      { headerName: 'HSI Usage', field: 'TOTAL_IN_GB', alignment: 'left', cellClass: 'pm-grid-number-cell', width: 100, sortable: true, filter: true },
      { headerName: 'Invoice Charges', field: 'format(invce_at,2)', alignment: "right", cellClass: "pm-grid-number-cell", width: 100, sortable: true, filter: true },
      { headerName: 'TAX', field: 'tax_at', alignment: "right", cellClass: "pm-grid-number-cell", width: 100, sortable: true, filter: true },
      { headerName: 'Amount', field: 'tl_at', algnmnt: "right", cellClass: "pm-grid-number-cell", width: 100, sortable: true, filter: false, search: false },
      { headerName: 'Payment Status', field: 'Payment Status', algnmnt: "left", cellClass: "pm-grid-number-cell", width: 120, sortable: true, filter: true },
      { headerName: 'Payment TimeStamp', field: 'pd_ts', algnmnt: "center", cellClass: "pm-grid-number-cell", width: 150, sortable: true, filter: true },

    ];
  }

}
