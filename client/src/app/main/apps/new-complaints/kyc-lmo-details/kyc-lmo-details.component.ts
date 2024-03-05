import { Component, OnInit } from '@angular/core';
import { TransfereService } from "app/providers/transfer/transfer.service";
import { CrudService } from 'app/main/apps/crud.service';
import { ActivatedRoute } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialog, MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material';
import { Router } from '@angular/router';
import { DxChartModule } from 'devextreme-angular';
import { DsSidebarService } from '@glits/components/sidebar/sidebar.service';
import * as _ from 'lodash';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import * as moment from 'moment';

@Component({
  selector: 'app-kyc-lmo-details',
  templateUrl: './kyc-lmo-details.component.html',
  styleUrls: ['./kyc-lmo-details.component.scss']
})
export class KycLmoDetailsComponent implements OnInit {

  shwLdr = false;
  totalcompData: any;
  rowData: any;

  permissions;
  
  columnDefs;
  public kyclmodata: any;
  
  fileName:any;
  fileNamekycdone:any;
  fileNamekycnotdone:any;
  filekyctodaydone:any;
  filekycyestdone:any

 totallmocount;
 kycdonecount;
 kycnotdonecount;
 kycdonetodaycount;
 kycdoneyestcount;

 totallmocnt:any;
 kyccomplete:any;
 kycnotcomplete:any;
 totaltoday:any;
 totalyest:any;

  totallmocountdata: boolean = false;
  kyccompleteddata:boolean = false;
  kycnotcompletedata:boolean = false;
  totaltodaydata:boolean = false;
  totalyestdata:boolean = false;



  getHeaderDtls = function () {
    return { title: "LMO KYC Dashboard", icon: "people_outline" };
  };


  constructor(public TransfereService: TransfereService, public crdsrv: CrudService,
    private _dsSidebarService: DsSidebarService, public dialog: MatDialog, public route: ActivatedRoute, private _snackBar: MatSnackBar, private router: Router, private _formBuilder: FormBuilder) {
    this.permissions = { 'slct_in': 1, 'insrt_in': 1, 'updt_in': 1, 'dlte_in': 1, 'exprt_in': 1 };
  }

  ngOnInit() {
     this.total_lmo_cnt();
     this.total_kycdone_cnt();
     this.total_kycnotdone_cnt();
     this.total_kyc_donetoday_cnt();
     this.total_kyc_doneyest_cnt();
    this.fileNamekycdone = "kyc_completed_lmo_details_"+ moment(new Date()).format("YYYY-MM-DD");
    this.fileNamekycnotdone = "kyc_pending_lmo_details_"+ moment(new Date()).format("YYYY-MM-DD");
    this.filekyctodaydone = "kyc_done_lmo_details_"+ moment(new Date()).format("YYYY-MM-DD");
    this.filekycyestdone = "kyc_done_lmo_details_"+ moment(new Date()).format("YYYY-MM-DD");
  }


  total_lmo_cnt(){
    this.shwLdr = true;
    let rte = 'subscriberApp/totallmocount';
   // let resdata
    //console.log(rte);
    this.crdsrv.get(rte).subscribe((res) => {
     // resdata = res['data']
     // console.log(resdata)
      this.totallmocount = res['data'][0]['count'];
      if( this.totallmocount == null ||  this.totallmocount == undefined ){
        this.totallmocount =0;
      }
     // console.log(this.totallmocount);
      this.shwLdr = false;
    });
  }

  total_kycdone_cnt(){
    this.shwLdr = true;
    let rte = 'subscriberApp/totalkycdonecount';
   // let resdata
   // console.log(rte);
    this.crdsrv.get(rte).subscribe((res) => {
     // resdata = res['data']
     // console.log(resdata)
      this.kycdonecount= res['data'][0]['count'];
      if( this.kycdonecount == null ||  this.kycdonecount == undefined ){
        this.kycdonecount =0;
      }
     // console.log(this.kycdonecount);
      this.shwLdr = false;
    });
  }
    
  total_kycnotdone_cnt(){
    this.shwLdr = true;
    let rte = 'subscriberApp/totalkyctobedonecount';
   // let resdata
    //console.log(rte);
    this.crdsrv.get(rte).subscribe((res) => {
     // resdata = res['data']
     // console.log(resdata)
      this.kycnotdonecount= res['data'][0]['count'];
      if( this.kycnotdonecount == null ||  this.kycnotdonecount == undefined ){
        this.kycnotdonecount =0;
      }
     // console.log(this.kycnotdonecount);
      this.shwLdr = false;
    });
  }

  total_kyc_donetoday_cnt(){
    this.shwLdr = true;
    let rte = 'subscriberApp/todaykycdonecount';
   // let resdata
    //console.log(rte);
    this.crdsrv.get(rte).subscribe((res) => {
     // resdata = res['data']
     // console.log(resdata)
      this.kycdonetodaycount= res['data'][0]['count'];
      if( this.kycdonetodaycount == null ||  this.kycdonetodaycount == undefined ){
        this.kycdonetodaycount =0;
      }
    //  console.log(this.kycdonetodaycount);
      this.shwLdr = false;
    });
  }

  total_kyc_doneyest_cnt(){
    this.shwLdr = true;
    let rte = 'subscriberApp/yesterdaykycdonecount';
   // let resdata
   // console.log(rte);
    this.crdsrv.get(rte).subscribe((res) => {
     // resdata = res['data']
     // console.log(resdata)
      this.kycdoneyestcount= res['data'][0]['count'];
      if( this.kycdoneyestcount == null ||  this.kycdoneyestcount == undefined ){
        this.kycdoneyestcount =0;
      }
     // console.log(this.kycdoneyestcount);
      this.shwLdr = false;
    });
  }


  kyc_completed() {
    this.shwLdr = true;
    let rte = 'subscriberApp/listkycdonedata';
    // console.log(rte);
    this.crdsrv.get(rte).subscribe((res) => {
      this.kyccomplete = res['data'];
      this.kyccompleteddata = true;
      this.kycnotcompletedata = false;
      this.totallmocountdata = false;
      this.totaltodaydata=false;
      this.totalyestdata=false;
     //console.log('kycdone',this.kyccomplete);
      this.shwLdr = false;
      let counter = 0;
      this.kyccomplete.filter((k) => {
        k['s_no'] = ++counter;
      });
    });
    this.columnDefs = [
      { headerName: 'Sno', field: 's_no', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 80, dataType: 'number', filter: false },
      { headerName: 'LMO CODE', field: 'agnt_cd', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 200, filter: true },
      { headerName: 'LMO Name', field: 'agnt_nm', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 200, filter: true },
      { headerName: 'District', field: 'dstrt_nm', alignment: 'center', cellClass: 'pm-grid-number-cell', width:200, filter:true},
      { headerName: 'Mandal', field: 'mndl_nm', alignment: 'center', cellClass: 'pm-grid-number-cell', width:250, filter:true},
      { headerName: 'Village', field: 'village', alignment: 'center', cellClass: 'pm-grid-number-cell', width:250, filter:true},
      { headerName: 'Pin Code', field: 'pincode', alignment: 'center', cellClass: 'pm-grid-number-cell', width:250, filter:true},
      { headerName: 'Moblie No', field: 'mbl_nu', alignment: 'center', cellClass: 'pm-grid-number-cell', width:250, filter:true},
      { headerName: 'Office No', field: 'ofce_mbl_nu', alignment: 'center', cellClass: 'pm-grid-number-cell', width:250, filter:true},
      { headerName: 'Date Done', field: 'created', alignment: 'center', cellClass: 'pm-grid-number-cell', width:250, filter:true},
    ];

  }

  kyc_notcompleted() {
    this.shwLdr = true;
    let rte = 'subscriberApp/listkycdonetobedata';
    // console.log(rte);
    this.crdsrv.get(rte).subscribe((res) => {
      this.kycnotcomplete = res['data'];
      this.kycnotcompletedata = true;
      this.kyccompleteddata = false;
      this.totallmocountdata = false;
      this.totaltodaydata=false;
      this.totalyestdata=false;
     // console.log('kycNOTdone',this.kycnotcomplete);
      this.shwLdr = false;
      let counter = 0;
      this.kycnotcomplete.filter((k) => {
        k['s_no'] = ++counter;
      }); 
    });
    this.columnDefs = [
      { headerName: 'Sno', field: 's_no', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 100, dataType: 'number', filter: false },
      { headerName: 'LMO CODE', field: 'agnt_cd', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 200, filter: true },
      { headerName: 'LMO Name', field: 'agnt_nm', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 300, filter: true },
      { headerName: 'Moblie No', field: 'ofce_mbl_nu', alignment: 'center', cellClass: 'pm-grid-number-cell', width:250, filter:true},
      { headerName: 'District', field: 'ofce_ara_nm', alignment: 'center', cellClass: 'pm-grid-number-cell', width:250, filter:true},
      { headerName: 'Mandal', field: 'ofce_lclty_nm', alignment: 'center', cellClass: 'pm-grid-number-cell', width:250, filter:true},
      { headerName: 'Village', field: 'ofce_cty_nm', alignment: 'center', cellClass: 'pm-grid-number-cell', width:250, filter:true},
      { headerName: 'Pin Code', field: 'ofce_pn_cd', alignment: 'center', cellClass: 'pm-grid-number-cell', width:250, filter:true}
    ];

  }

  total_done_today(){
    this.shwLdr = true;
    let rte = 'subscriberApp/listtodaykycdata';
    // console.log(rte);
    this.crdsrv.get(rte).subscribe((res) => {
      this.totaltoday = res['data'];
      this.totaltodaydata=true;
      this.kyccompleteddata= false;
      this.kycnotcompletedata = false;
      this.totallmocountdata = false;
      this.totalyestdata=false;
     // console.log('kycdonetoday',this.totaltoday);
      this.shwLdr = false;

      let counter = 0;
      this.totaltoday.filter((k) => {
        k['s_no'] = ++counter;
      });
    });

    this.columnDefs = [
      { headerName: 'Sno', field: 's_no', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 80, dataType: 'number', filter: false },
      { headerName: 'LMO CODE', field: 'agnt_cd', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 200, filter: true },
      { headerName: 'LMO Name', field: 'agnt_nm', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 200, filter: true },
      { headerName: 'District', field: 'dstrt_nm', alignment: 'center', cellClass: 'pm-grid-number-cell', width:200, filter:true},
      { headerName: 'Mandal', field: 'mndl_nm', alignment: 'center', cellClass: 'pm-grid-number-cell', width:250, filter:true},
      { headerName: 'Village', field: 'village', alignment: 'center', cellClass: 'pm-grid-number-cell', width:250, filter:true},
      { headerName: 'Pin Code', field: 'pincode', alignment: 'center', cellClass: 'pm-grid-number-cell', width:250, filter:true},
      { headerName: 'Moblie No', field: 'mbl_nu', alignment: 'center', cellClass: 'pm-grid-number-cell', width:250, filter:true},
      { headerName: 'Office No', field: 'ofce_mbl_nu', alignment: 'center', cellClass: 'pm-grid-number-cell', width:250, filter:true},
      { headerName: 'Date Done', field: 'created', alignment: 'center', cellClass: 'pm-grid-number-cell', width:250, filter:true},
    ];
  }

  total_done_yest(){
    this.shwLdr = true;
    let rte = 'subscriberApp/listyesterdaykycdata';
    // console.log(rte);
    this.crdsrv.get(rte).subscribe((res) => {
      this.totalyest = res['data'];
      this.totalyestdata=true
      this.totaltodaydata=false;
      this.kyccompleteddata= false;
      this.kycnotcompletedata = false;
      this.totallmocountdata = false;
      //console.log('kycdoneyest',this.totalyest);
      this.shwLdr = false;

      let counter = 0;
      this.totalyest.filter((k) => {
        k['s_no'] = ++counter;
      });
    });

    this.columnDefs = [
      { headerName: 'Sno', field: 's_no', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 80, dataType: 'number', filter: false },
      { headerName: 'LMO CODE', field: 'agnt_cd', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 200, filter: true },
      { headerName: 'LMO Name', field: 'agnt_nm', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 200, filter: true },
      { headerName: 'District', field: 'dstrt_nm', alignment: 'center', cellClass: 'pm-grid-number-cell', width:200, filter:true},
      { headerName: 'Mandal', field: 'mndl_nm', alignment: 'center', cellClass: 'pm-grid-number-cell', width:250, filter:true},
      { headerName: 'Village', field: 'village', alignment: 'center', cellClass: 'pm-grid-number-cell', width:250, filter:true},
      { headerName: 'Pin Code', field: 'pincode', alignment: 'center', cellClass: 'pm-grid-number-cell', width:250, filter:true},
      { headerName: 'Moblie No', field: 'mbl_nu', alignment: 'center', cellClass: 'pm-grid-number-cell', width:250, filter:true},
      { headerName: 'Office No', field: 'ofce_mbl_nu', alignment: 'center', cellClass: 'pm-grid-number-cell', width:250, filter:true},
      { headerName: 'Date Done', field: 'created', alignment: 'center', cellClass: 'pm-grid-number-cell', width:250, filter:true},
    ];
  }



  openSideBar(): any {
    this._dsSidebarService.getSidebar('addFormPanel1').toggleOpen();
  }
  closeSideBar(): any {
    this._dsSidebarService.getSidebar('addFormPanel1').toggleOpen();
  }


  onCellClick(event): any {
    console.log(event.value);
    if (event.value == 'Edit') {
      this.kyclmodata = event.data;
      console.log(event.data);
      this.openSideBar();
    }
  }

  onCellPrepared(colDef, e) {

    if (e.rowType === "data" && e.row.data && e.column.dataField == 'Edit') {
      e.cellElement.style.color = '#ff0000';
      e.cellElement.style.fontWeight = 500;
      e.cellElement.style.background = 'rgba(243, 191, 176, 0.2784313725490196)';
      e.cellElement.style.backgroundClip = 'content-box';
      e.cellElement.style.cursor = "pointer";
    }
  }

}
