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

@Component({
  selector: 'app-app-alacarte',
  templateUrl: './app-alacarte.component.html',
  styleUrls: ['./app-alacarte.component.scss']
})
export class AppAlacarteComponent implements OnInit {
  shwLdr = false;
  totalcompData: any;
  rowData: any;
  closecompData: any;
  opencompData: any;
  todaycount: any;
  resolvecompData: any;
  fivedaycount: any;
  tdyamntala = 0;
  tilltdyala = 0;
  prvsmnthala = 0;
  crntmnthFdfs =0;
  prvsmnthFdfs=0;
  yesterdyFdfs=0;
  tdyamntFdfs=0;
  totalfailedcompData;
  thismnthtotalcompData;
  prvosmnthcompData;
  ytdfailedtotalcompData;
  crntmnthala = 0;
  permissions;
  todaycountBolen: boolean = false;
  threedaycount: any;
  columnDefs;
  public alacarteData: any;
  deactivatecount: any;
  todaycountdata: boolean = false;
  fivedaycountdata: boolean = false;
  threedaycountdata: boolean = false;
  deactivatecountdata: boolean = false;
  getHeaderDtls = function () {
    return { title: "Ala Carte Subscription Details", icon: "people_outline" };
  };
  constructor(public TransfereService: TransfereService, public crdsrv: CrudService,
    private _dsSidebarService: DsSidebarService, public dialog: MatDialog, public route: ActivatedRoute, private _snackBar: MatSnackBar, private router: Router, private _formBuilder: FormBuilder) {
    this.permissions = { 'slct_in': 1, 'insrt_in': 1, 'updt_in': 1, 'dlte_in': 1, 'exprt_in': 1 };
  }

  ngOnInit() {
    this.TodaycafCount();
    this.Deactivein3days();
    this.Deactivein5days();
    this.Deactivated();
    this.today_amount();
    this.Till_now_amount();
    this.previous_month_amount();
    this.this_month_amount();
    this.today_failed_count_chnl();
    this.this_month_count_chnl();
    this.prvs_dat_month_count_chnl();
    this.ytd_failed_count_chnl();
	this.this_month_fdfs_count();
    this.prvs_month_fdfs_count();
    this.this_day_fdfs_count();
    this.prvs_day_fdfs_count();
  }
    this_month_fdfs(){
    let rte = 'subscriberApp/FirstdayFirstShow/4/1';
    // console.log(rte);
    this.crdsrv.get(rte).subscribe((res) => {
      this.todaycount = res['data'];
      this.todaycountdata = true;
      this.fivedaycountdata = false;
      this.threedaycountdata = false;
      this.deactivatecountdata = false;
      console.log(this.todaycount);
      this.shwLdr = false;

      let counter = 0;
      this.todaycount.filter((k) => {
        k['s_no'] = ++counter;
      });
    });

    this.columnDefs = [
      { headerName: 'Sno', field: 's_no', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 75, dataType: 'number', filter: false },
      { headerName: 'Caf ID', field: 'caf_id', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 125, dataType: 'number', filter: true },
      { headerName: 'Subscriber ID', field: 'mdlwe_sbscr_id', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 150, dataType: 'number', filter: true },
      { headerName: 'Package Name', field: 'pckge_nm', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 175, dataType: 'string', filter: true },
      { headerName: 'Package ID', field: 'pckge_id', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 125, filter: true },
      { headerName: 'LMO Code', field: 'agnt_cd', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 150, filter: true },
      { headerName: 'Amount', field: 'chrge_at', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 100, dataType: 'string', filter: true },
      { headerName: 'GST', field: 'gst_at', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 100, dataType: 'string', filter: true },
      { headerName: 'Start Date', field: 'cyclestrtdt', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 150, dataType: 'number', filter: true },
      { headerName: 'End Date', field: 'cyclenddt', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 150, dataType: 'number', filter: true },
      { headerName: 'Mobile NO', field: 'mbl_nu', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 150, filter: true },
    ];
  }
  prvs_month_fdfs(){
    let rte = 'subscriberApp/FirstdayFirstShow/3/1';
    // console.log(rte);
    this.crdsrv.get(rte).subscribe((res) => {
      this.todaycount = res['data'];
      this.todaycountdata = true;
      this.fivedaycountdata = false;
      this.threedaycountdata = false;
      this.deactivatecountdata = false;
      console.log(this.todaycount);
      this.shwLdr = false;

      let counter = 0;
      this.todaycount.filter((k) => {
        k['s_no'] = ++counter;
      });
    });

    this.columnDefs = [
      { headerName: 'Sno', field: 's_no', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 75, dataType: 'number', filter: false },
      { headerName: 'Caf ID', field: 'caf_id', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 125, dataType: 'number', filter: true },
      { headerName: 'Subscriber ID', field: 'mdlwe_sbscr_id', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 150, dataType: 'number', filter: true },
      { headerName: 'Package Name', field: 'pckge_nm', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 175, dataType: 'string', filter: true },
      { headerName: 'Package ID', field: 'pckge_id', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 125, filter: true },
      { headerName: 'LMO Code', field: 'agnt_cd', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 150, filter: true },
      { headerName: 'Amount', field: 'chrge_at', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 100, dataType: 'string', filter: true },
      { headerName: 'GST', field: 'gst_at', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 100, dataType: 'string', filter: true },
      { headerName: 'Start Date', field: 'cyclestrtdt', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 150, dataType: 'number', filter: true },
      { headerName: 'End Date', field: 'cyclenddt', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 150, dataType: 'number', filter: true },
      { headerName: 'Mobile NO', field: 'mbl_nu', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 150, filter: true },
    ];
  }
  this_day_fdfs(){
    let rte = 'subscriberApp/FirstdayFirstShow/1/1';
    // console.log(rte);
    this.crdsrv.get(rte).subscribe((res) => {
      this.todaycount = res['data'];
      this.todaycountdata = true;
      this.fivedaycountdata = false;
      this.threedaycountdata = false;
      this.deactivatecountdata = false;
      console.log(this.todaycount);
      this.shwLdr = false;

      let counter = 0;
      this.todaycount.filter((k) => {
        k['s_no'] = ++counter;
      });
    });

    this.columnDefs = [
      { headerName: 'Sno', field: 's_no', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 75, dataType: 'number', filter: false },
      { headerName: 'Caf ID', field: 'caf_id', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 125, dataType: 'number', filter: true },
      { headerName: 'Subscriber ID', field: 'mdlwe_sbscr_id', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 150, dataType: 'number', filter: true },
      { headerName: 'Package Name', field: 'pckge_nm', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 175, dataType: 'string', filter: true },
      { headerName: 'Package ID', field: 'pckge_id', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 125, filter: true },
      { headerName: 'LMO Code', field: 'agnt_cd', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 150, filter: true },
      { headerName: 'Amount', field: 'chrge_at', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 100, dataType: 'string', filter: true },
      { headerName: 'GST', field: 'gst_at', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 100, dataType: 'string', filter: true },
      { headerName: 'Start Date', field: 'cyclestrtdt', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 150, dataType: 'number', filter: true },
      { headerName: 'End Date', field: 'cyclenddt', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 150, dataType: 'number', filter: true },
      { headerName: 'Mobile NO', field: 'mbl_nu', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 150, filter: true },
    ];
  }

  prvs_day_fdfs(){
    let rte = 'subscriberApp/FirstdayFirstShow/2/1';
    // console.log(rte);
    this.crdsrv.get(rte).subscribe((res) => {
      this.todaycount = res['data'];
      this.todaycountdata = true;
      this.fivedaycountdata = false;
      this.threedaycountdata = false;
      this.deactivatecountdata = false;
      console.log(this.todaycount);
      this.shwLdr = false;

      let counter = 0;
      this.todaycount.filter((k) => {
        k['s_no'] = ++counter;
      });
    });

    this.columnDefs = [
      { headerName: 'Sno', field: 's_no', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 75, dataType: 'number', filter: false },
      { headerName: 'Caf ID', field: 'caf_id', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 125, dataType: 'number', filter: true },
      { headerName: 'Subscriber ID', field: 'mdlwe_sbscr_id', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 150, dataType: 'number', filter: true },
      { headerName: 'Package Name', field: 'pckge_nm', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 175, dataType: 'string', filter: true },
      { headerName: 'Package ID', field: 'pckge_id', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 125, filter: true },
      { headerName: 'LMO Code', field: 'agnt_cd', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 150, filter: true },
      { headerName: 'Amount', field: 'chrge_at', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 100, dataType: 'string', filter: true },
      { headerName: 'GST', field: 'gst_at', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 100, dataType: 'string', filter: true },
      { headerName: 'Start Date', field: 'cyclestrtdt', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 150, dataType: 'number', filter: true },
      { headerName: 'End Date', field: 'cyclenddt', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 150, dataType: 'number', filter: true },
      { headerName: 'Mobile NO', field: 'mbl_nu', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 150, filter: true },
    ];
  }
  this_month_fdfs_count(){
    this.shwLdr = true;
    let rte = 'subscriberApp/FirstdayFirstShow/4/0';
    // console.log(rte);
    this.crdsrv.get(rte).subscribe((res) => {
      console.log("res",res['data'][0]['crntcountdat']);
      this.crntmnthFdfs = res['data'][0]['crntcountdat'];
      if( this.crntmnthFdfs == null ||  this.crntmnthFdfs == undefined ){
        this.crntmnthFdfs =0;
      }
      console.log(this.crntmnthFdfs);
      this.shwLdr = false;
    });
  }
  prvs_month_fdfs_count(){
    this.shwLdr = true;
    let rte = 'subscriberApp/FirstdayFirstShow/3/0';
    // console.log(rte);
    this.crdsrv.get(rte).subscribe((res) => {
      console.log("res",res['data'][0]['prvscountdat']);
      this.prvsmnthFdfs = res['data'][0]['prvscountdat'];
      if( this.prvsmnthFdfs == null ||  this.prvsmnthFdfs == undefined ){
        this.prvsmnthFdfs =0;
      }
      console.log(this.prvsmnthFdfs);
      this.shwLdr = false;
    });
  }
  this_day_fdfs_count(){
    this.shwLdr = true;
    let rte = 'subscriberApp/FirstdayFirstShow/1/0';
    // console.log(rte);
    this.crdsrv.get(rte).subscribe((res) => {
      console.log("res",res['data'][0]['prsnt_count']);
      this.tdyamntFdfs = res['data'][0]['prsnt_count'];
      if( this.tdyamntFdfs == null ||  this.tdyamntFdfs == undefined ){
        this.tdyamntFdfs =0;
      }
      console.log(this.tdyamntFdfs);
      this.shwLdr = false;
    });
  }
  prvs_day_fdfs_count(){
    this.shwLdr = true;
    let rte = 'subscriberApp/FirstdayFirstShow/2/0';
    // console.log(rte);
    this.crdsrv.get(rte).subscribe((res) => {
      console.log("res",res['data'][0]['failed_count']);
      
      this.yesterdyFdfs = res['data'][0]['failed_count'];
      if( this.yesterdyFdfs == null ||  this.yesterdyFdfs == undefined ){
        this.yesterdyFdfs =0;
      }
      console.log(this.yesterdyFdfs);
      this.shwLdr = false;
    });
  }
  today_failed_count_chnl(){
    this.shwLdr = true;
    let rte = 'subscriberApp/allDataCafPckgsfrmApp/1/0';
    // console.log(rte);
    this.crdsrv.get(rte).subscribe((res) => {
      this.totalfailedcompData = res['data'][0]['failed_count'];
      if( this.totalfailedcompData == null ||  this.totalfailedcompData == undefined ){
        this.totalfailedcompData =0;
      }
      console.log(this.totalfailedcompData);
      this.shwLdr = false;
    });
  }
  ytd_failed_count_chnl(){
    this.shwLdr = true;
    let rte = 'subscriberApp/allDataCafPckgsfrmApp/2/0';
    // console.log(rte);
    this.crdsrv.get(rte).subscribe((res) => {
      this.ytdfailedtotalcompData = res['data'][0]['failed_count'];
      if( this.ytdfailedtotalcompData == null ||  this.ytdfailedtotalcompData == undefined ){
        this.ytdfailedtotalcompData =0;
      }
      console.log(this.ytdfailedtotalcompData);
      this.shwLdr = false;
    });
  }
  prvs_dat_month_count_chnl(){
    this.shwLdr = true;
    let rte = 'subscriberApp/allDataCafPckgsfrmApp/3/0';
    // console.log(rte);
    this.crdsrv.get(rte).subscribe((res) => {
      this.prvosmnthcompData = res['data'][0]['prvscountdat'];
      if( this.prvosmnthcompData == null ||  this.prvosmnthcompData == undefined ){
        this.prvosmnthcompData =0;
      }
      console.log(this.prvosmnthcompData);
      this.shwLdr = false;
    });
  }
  this_month_count_chnl(){
    this.shwLdr = true;
    let rte = 'subscriberApp/allDataCafPckgsfrmApp/4/0';
    // console.log(rte);
    this.crdsrv.get(rte).subscribe((res) => {
      this.thismnthtotalcompData = res['data'][0]['crntcountdat'];
      if( this.thismnthtotalcompData == null ||  this.thismnthtotalcompData == undefined ){
        this.thismnthtotalcompData =0;
      }
      console.log(this.thismnthtotalcompData);
      this.shwLdr = false;
    });
  }
  today_failed_count(){
    let rte = 'subscriberApp/allDataCafPckgsfrmApp/1/1';
    // console.log(rte);
    this.crdsrv.get(rte).subscribe((res) => {
      this.todaycount = res['data'];
      this.todaycountdata = true;
      this.fivedaycountdata = false;
      this.threedaycountdata = false;
      this.deactivatecountdata = false;
      console.log(this.todaycount);
      this.shwLdr = false;

      let counter = 0;
      this.todaycount.filter((k) => {
        k['s_no'] = ++counter;
      });
    });

    this.columnDefs = [
      { headerName: 'Sno', field: 's_no', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 75, dataType: 'number', filter: false },
      { headerName: 'Caf ID', field: 'caf_id', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 125, dataType: 'number', filter: true },
      { headerName: 'Subscriber ID', field: 'mdlw_sbscr_id', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 150, dataType: 'number', filter: true },
      { headerName: 'Package ID', field: 'package_ids', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 125, filter: true },
      { headerName: 'Package Names', field: 'packs', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 200, filter: true },
      { headerName: 'Service Type', field: 'service_type', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 125, filter: true },
      { headerName: 'Status Code', field: 'status_code', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 150, dataType: 'number', filter: true },
      { headerName: 'Error Msg', field: 'err_msg', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 150, filter: true },
    ];
  }
  ytd_failed_count(){
    let rte = 'subscriberApp/allDataCafPckgsfrmApp/2/1';
    // console.log(rte);
    this.crdsrv.get(rte).subscribe((res) => {
      this.todaycount = res['data'];
      this.todaycountdata = true;
      this.fivedaycountdata = false;
      this.threedaycountdata = false;
      this.deactivatecountdata = false;
      console.log(this.todaycount);
      this.shwLdr = false;

      let counter = 0;
      this.todaycount.filter((k) => {
        k['s_no'] = ++counter;
      });
    });

    this.columnDefs = [
      { headerName: 'Sno', field: 's_no', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 75, dataType: 'number', filter: false },
      { headerName: 'Caf ID', field: 'caf_id', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 125, dataType: 'number', filter: true },
      { headerName: 'Subscriber ID', field: 'mdlwe_sbscr_id', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 150, dataType: 'number', filter: true },
      { headerName: 'Package Name', field: 'pckge_nm', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 175, dataType: 'string', filter: true },
      { headerName: 'Package ID', field: 'pckge_id', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 125, filter: true },
      { headerName: 'LMO Code', field: 'agnt_cd', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 150, filter: true },
      { headerName: 'Amount', field: 'chrge_at', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 100, dataType: 'string', filter: true },
      { headerName: 'GST', field: 'gst_at', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 100, dataType: 'string', filter: true },
      { headerName: 'Start Date', field: 'cyclestrtdt', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 150, dataType: 'number', filter: true },
      { headerName: 'End Date', field: 'cyclenddt', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 150, dataType: 'number', filter: true },
      { headerName: 'Mobile NO', field: 'mbl_nu', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 150, filter: true },
    ];
  }
  prvs_dat_month_chnl(){
    let rte = 'subscriberApp/allDataCafPckgsfrmApp/3/1';
    // console.log(rte);
    this.crdsrv.get(rte).subscribe((res) => {
      this.todaycount = res['data'];
      this.todaycountdata = true;
      this.fivedaycountdata = false;
      this.threedaycountdata = false;
      this.deactivatecountdata = false;
      console.log(this.todaycount);
      this.shwLdr = false;

      let counter = 0;
      this.todaycount.filter((k) => {
        k['s_no'] = ++counter;
      });
    });

    this.columnDefs = [
      { headerName: 'Sno', field: 's_no', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 75, dataType: 'number', filter: false },
      { headerName: 'Caf ID', field: 'caf_id', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 125, dataType: 'number', filter: true },
      { headerName: 'Subscriber ID', field: 'mdlwe_sbscr_id', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 150, dataType: 'number', filter: true },
      { headerName: 'Package Name', field: 'pckge_nm', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 175, dataType: 'string', filter: true },
      { headerName: 'Package ID', field: 'pckge_id', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 125, filter: true },
      { headerName: 'LMO Code', field: 'agnt_cd', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 150, filter: true },
      { headerName: 'Amount', field: 'chrge_at', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 100, dataType: 'string', filter: true },
      { headerName: 'GST', field: 'gst_at', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 100, dataType: 'string', filter: true },
      { headerName: 'Start Date', field: 'cyclestrtdt', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 150, dataType: 'number', filter: true },
      { headerName: 'End Date', field: 'cyclenddt', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 150, dataType: 'number', filter: true },
      { headerName: 'Mobile NO', field: 'mbl_nu', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 150, filter: true },
    ];
  }
  this_month_chnl(){
    let rte = 'subscriberApp/allDataCafPckgsfrmApp/4/1';
    // console.log(rte);
    this.crdsrv.get(rte).subscribe((res) => {
      this.todaycount = res['data'];
      this.todaycountdata = true;
      this.fivedaycountdata = false;
      this.threedaycountdata = false;
      this.deactivatecountdata = false;
      console.log(this.todaycount);
      this.shwLdr = false;

      let counter = 0;
      this.todaycount.filter((k) => {
        k['s_no'] = ++counter;
      });
    });

    this.columnDefs = [
      { headerName: 'Sno', field: 's_no', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 75, dataType: 'number', filter: false },
      { headerName: 'Caf ID', field: 'caf_id', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 125, dataType: 'number', filter: true },
      { headerName: 'Subscriber ID', field: 'mdlwe_sbscr_id', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 150, dataType: 'number', filter: true },
      { headerName: 'Package Name', field: 'pckge_nm', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 175, dataType: 'string', filter: true },
      { headerName: 'Package ID', field: 'pckge_id', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 125, filter: true },
      { headerName: 'LMO Code', field: 'agnt_cd', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 150, filter: true },
      { headerName: 'Amount', field: 'chrge_at', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 100, dataType: 'string', filter: true },
      { headerName: 'GST', field: 'gst_at', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 100, dataType: 'string', filter: true },
      { headerName: 'Start Date', field: 'cyclestrtdt', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 150, dataType: 'number', filter: true },
      { headerName: 'End Date', field: 'cyclenddt', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 150, dataType: 'number', filter: true },
      { headerName: 'Mobile NO', field: 'mbl_nu', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 150, filter: true },
    ];
  }
  
  Till_now_amount(){
    this.shwLdr = true;
    let rte = 'subscriberApp/AmountfrAlacarteApp/2';
    // console.log(rte);
    this.crdsrv.get(rte).subscribe((res) => {
      this.tilltdyala = res['data'][0]['total_money'];
      if( this.tilltdyala == null ||  this.tilltdyala == undefined ){
        this.tilltdyala =0;
      }
      console.log(this.tilltdyala);
      this.shwLdr = false;
    });
  }
  today_amount(){
    this.shwLdr = true;
    let rte = 'subscriberApp/AmountfrAlacarteApp/1';
    // console.log(rte);
    this.crdsrv.get(rte).subscribe((res) => {
      this.tdyamntala = res['data'][0]['total_money'];
      if( this.tdyamntala == null ||  this.tdyamntala == undefined ){
        this.tdyamntala =0;
      }
      console.log(this.tdyamntala);
      this.shwLdr = false;
    });
  }
  previous_month_amount(){
    this.shwLdr = true;
    let rte = 'subscriberApp/AmountfrAlacarteApp/3';
    // console.log(rte);
    this.crdsrv.get(rte).subscribe((res) => {
      this.prvsmnthala = res['data'][0]['total_money'];
      if( this.prvsmnthala == null ||  this.prvsmnthala == undefined ){
        this.prvsmnthala =0;
      }
      console.log(this.prvsmnthala);
      this.shwLdr = false;
    });
  }
  this_month_amount(){
    this.shwLdr = true;
    let rte = 'subscriberApp/AmountfrAlacarteApp/4';
    // console.log(rte);
    this.crdsrv.get(rte).subscribe((res) => {
      this.crntmnthala = res['data'][0]['total_money'];
      if( this.crntmnthala == null ||  this.crntmnthala == undefined ){
        this.crntmnthala =0;
      }
      console.log(this.crntmnthala);
      this.shwLdr = false;
    });
  }
  TodaycafCount() {
    this.shwLdr = true;
    let rte = 'subscriberApp/countCafPckgsfrmApp/1';
    // console.log(rte);
    this.crdsrv.get(rte).subscribe((res) => {
      this.totalcompData = res['data'][0]['count'];
      console.log(this.totalcompData);
      this.shwLdr = false;
    });
  }
  Deactivein3days() {
    this.shwLdr = true;
    let rte = 'subscriberApp/countCafPckgsfrmApp/3';
    // console.log(rte);
    this.crdsrv.get(rte).subscribe((res) => {
      this.opencompData = res['data'][0]['count'];
      console.log(this.opencompData);
      this.shwLdr = false;
    });
  }

  Deactivein5days() {
    this.shwLdr = true;
    let rte = 'subscriberApp/countCafPckgsfrmApp/5';
    // console.log(rte);
    this.crdsrv.get(rte).subscribe((res) => {
      this.resolvecompData = res['data'][0]['count'];
      console.log(this.resolvecompData);
      this.shwLdr = false;
    });
  }

  Deactivated() {
    this.shwLdr = true;
    let rte = 'subscriberApp/countCafPckgsfrmApp/0';
    // console.log(rte);
    this.crdsrv.get(rte).subscribe((res) => {
      this.closecompData = res['data'][0]['count'];
      console.log(this.closecompData);
      this.shwLdr = false;
    });
  }

  today_count() {
    let rte = 'subscriberApp/DataCafPckgsfrmApp/1';
    // console.log(rte);
    this.crdsrv.get(rte).subscribe((res) => {
      this.todaycount = res['data'];
      this.todaycountdata = true;
      this.fivedaycountdata = false;
      this.threedaycountdata = false;
      this.deactivatecountdata = false;
      console.log(this.todaycount);
      this.shwLdr = false;

      let counter = 0;
      this.todaycount.filter((k) => {
        k['s_no'] = ++counter;
      });
    });

    this.columnDefs = [
      { headerName: 'Sno', field: 's_no', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 75, dataType: 'number', filter: false },
      { headerName: 'Caf ID', field: 'caf_id', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 125, dataType: 'number', filter: true },
      { headerName: 'Subscriber ID', field: 'mdlwe_sbscr_id', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 150, dataType: 'number', filter: true },
      { headerName: 'Package Name', field: 'pckge_nm', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 175, dataType: 'string', filter: true },
      { headerName: 'Package ID', field: 'pckge_id', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 125, filter: true },
      { headerName: 'LMO Code', field: 'agnt_cd', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 150, filter: true },
      { headerName: 'Amount', field: 'chrge_at', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 100, dataType: 'string', filter: true },
      { headerName: 'GST', field: 'gst_at', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 100, dataType: 'string', filter: true },
      { headerName: 'Start Date', field: 'cyclestrtdt', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 150, dataType: 'number', filter: true },
      { headerName: 'End Date', field: 'cyclenddt', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 150, dataType: 'number', filter: true },
      { headerName: 'Mobile NO', field: 'mbl_nu', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 150, filter: true },
    ];
  }
  fiveday_count() {
    let rte = 'subscriberApp/DataCafPckgsfrmApp/5';
    // console.log(rte);
    this.crdsrv.get(rte).subscribe((res) => {
      this.fivedaycount = res['data'];
      console.log(this.fivedaycount);
      this.todaycountdata = false;
      this.fivedaycountdata = true;
      this.threedaycountdata = false;
      this.deactivatecountdata = false;
      this.shwLdr = false;
      let counter = 0;
      this.fivedaycount.filter((k) => {
        k['s_no'] = ++counter;
      });
    });
    this.columnDefs = [
      { headerName: 'Sno', field: 's_no', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 75, dataType: 'number', filter: false },
      { headerName: 'Caf ID', field: 'caf_id', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 125, dataType: 'number', filter: true },
      { headerName: 'Subscriber ID', field: 'mdlwe_sbscr_id', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 150, dataType: 'number', filter: true },
      { headerName: 'Package Name', field: 'pckge_nm', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 175, dataType: 'string', filter: true },
      { headerName: 'Package ID', field: 'pckge_id', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 125, filter: true },
      { headerName: 'LMO Code', field: 'agnt_cd', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 150, filter: true },
      { headerName: 'Amount', field: 'chrge_at', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 100, dataType: 'string', filter: true },
      { headerName: 'GST', field: 'gst_at', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 100, dataType: 'string', filter: true },
      { headerName: 'Start Date', field: 'cyclestrtdt', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 150, dataType: 'number', filter: true },
      { headerName: 'End Date', field: 'cyclenddt', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 150, dataType: 'number', filter: true },
      { headerName: 'Mobile NO', field: 'mbl_nu', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 150, filter: true },
    ];

  }
  threeday_count() {
    let rte = 'subscriberApp/DataCafPckgsfrmApp/3';
    // console.log(rte);
    this.crdsrv.get(rte).subscribe((res) => {
      this.threedaycount = res['data'];
      console.log(this.threedaycount);
      this.todaycountdata = false;
      this.fivedaycountdata = false;
      this.threedaycountdata = true;
      this.deactivatecountdata = false;
      this.shwLdr = false;
      let counter = 0;
      this.threedaycount.filter((k) => {
        k['s_no'] = ++counter;
      });
    });
    this.columnDefs = [
      { headerName: 'Sno', field: 's_no', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 75, dataType: 'number', filter: false },
      { headerName: 'Caf ID', field: 'caf_id', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 125, dataType: 'number', filter: true },
      { headerName: 'Subscriber ID', field: 'mdlwe_sbscr_id', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 150, dataType: 'number', filter: true },
      { headerName: 'Package Name', field: 'pckge_nm', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 175, dataType: 'string', filter: true },
      { headerName: 'Package ID', field: 'pckge_id', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 125, filter: true },
      { headerName: 'LMO Code', field: 'agnt_cd', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 150, filter: true },
      { headerName: 'Amount', field: 'chrge_at', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 100, dataType: 'string', filter: true },
      { headerName: 'GST', field: 'gst_at', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 100, dataType: 'string', filter: true },
      { headerName: 'Start Date', field: 'cyclestrtdt', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 150, dataType: 'number', filter: true },
      { headerName: 'End Date', field: 'cyclenddt', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 150, dataType: 'number', filter: true },
      { headerName: 'Mobile NO', field: 'mbl_nu', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 150, filter: true },
    ];
  }
  deactivate_count() {
    let rte = 'subscriberApp/DataCafPckgsfrmApp/0';
    // console.log(rte);
    this.crdsrv.get(rte).subscribe((res) => {
      this.deactivatecount = res['data'];
      console.log(this.deactivatecount);
      this.todaycountdata = false;
      this.fivedaycountdata = false;
      this.threedaycountdata = false;
      this.deactivatecountdata = true;
      this.shwLdr = false;
      let counter = 0;
      this.deactivatecount.filter((k) => {
        k['s_no'] = ++counter;
      });
    });
    this.columnDefs = [
      { headerName: 'Sno', field: 's_no', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 75, dataType: 'number', filter: false },
      { headerName: 'Caf ID', field: 'caf_id', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 125, dataType: 'number', filter: true },
      { headerName: 'Subscriber ID', field: 'mdlwe_sbscr_id', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 150, dataType: 'number', filter: true },
      { headerName: 'Package Name', field: 'pckge_nm', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 175, dataType: 'string', filter: true },
      { headerName: 'Package ID', field: 'pckge_id', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 125, filter: true },
      { headerName: 'LMO Code', field: 'agnt_cd', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 150, filter: true },
      { headerName: 'Amount', field: 'chrge_at', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 100, dataType: 'string', filter: true },
      { headerName: 'GST', field: 'gst_at', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 100, dataType: 'string', filter: true },
      { headerName: 'Start Date', field: 'cyclestrtdt', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 150, dataType: 'number', filter: true },
      { headerName: 'End Date', field: 'cyclenddt', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 150, dataType: 'number', filter: true },
      { headerName: 'Mobile NO', field: 'mbl_nu', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 150, filter: true },
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
      this.alacarteData = event.data;
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
