import { Component, OnInit, Inject, Input, ViewChildren, QueryList } from '@angular/core';
import { TransfereService } from 'app/providers/transfer/transfer.service';
import { CrudService } from 'app/main/apps/crud.service';
import { MAT_DIALOG_DATA, MatDialog, MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material';
import { DialogData } from 'app/main/apps/general/change-log/master/change-log/change-log-modal/change-log-modal.component';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { DxChartModule } from 'devextreme-angular';
import { DsSidebarService } from '@glits/components/sidebar/sidebar.service';
import * as _ from 'lodash';

@Component({
  selector: 'ds-customer-profile',
  templateUrl: './customer-profile.component.html',
  styleUrls: ['./customer-profile.component.scss']
})
export class CustomerProfileComponent implements OnInit {
  @Input() cstmrData: any;
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  cafDtls: any;
  srvpcs: any;
  loader = false;
  // caf_id =2000265
  data = [];
  boxcolumnDefs = [];
  packagecolumnDefs = [];
  pkgeData = [];
  voipData = [];
  voipcolumnDefs = [];
  hsicolumnDefs = [];
  hsiData = [];
  hsieachday = [];
  shwLdr: boolean;
  cafDtlsData: any;
  clsbtn = false;
  shwtab = true;
  monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  invoiceChrgsData: any;
  dialogRef: any;
  permissions;
  rowData = [];
  columnDefs = [];
  call_log = [];
  invoiceData = [];
  invoiceaddonData = [];
  invoiceaddonChrgsData : any;
  addoninvoicecolumnDefs = [];
  invoicecolumnDefs = [];
  hsiEachdaycolumnDefs = [];
  selectedIndex = 0;
  selectedPckgeIndex = 0;
  // columnDef = [];
  invice_dtls = [];
  activeLbl: boolean;
  cafAdhrMtchData: any;
  cafAdhrMtchDataColumnDefs;
  cafCstmrMtchData: any;
  cafCstmrMtchDataColumnDefs;
  cafMblnuMtchDataColumnDefs;
  cafMblnuMtchData;
  shwNoDataDiv = false;
  ontDtls;
  sameCafDtls: boolean;
  cafId: any;
  cafSts: any;
  inEvntTab = false;
  shwVoipMsg: string;
  hsiEchDayLineGraph: any[];
  cafHsiUsgeOprtns = [];
  types;
  noOntDtls: boolean;
  shwRltdCfsNoDataDiv: boolean;
  noInvceDataDiv: boolean;
  srvcPkPermissn: any;
  srch_cntrl = {
    srch_txt: '',
    srch_ldng: false,
    lmt_pstn: 1,
    pcge_mde: '1',
    agntId: ''
  };
  shwPckgeAddBtn: boolean;
  addOnStandardPckgsLst = [];
  channels: any;
  ChanlArry: any;
  view: boolean;
  slctdAllPckgs: any;
  shwSveBtn = false;
  removeAddonPckgs: any;
  rmvAddonscolumnDefs;
  slctdAllPckgsFrDlt: any;
  shwRmBtn: boolean;
  comment: any;
  hsiPckgsData: any;
  @ViewChildren ('checkBox' ) checkBox: QueryList<any>;
  checked = [];
  fnlChckdData = [];
  usrDtls: any;
  addonPckgsPrm: any;
  crntDataSpd: any;
  crntDataSpd_apldDt: any;
  prvsDataSpd: any;
  hsiBstrPckDt: any;
  shwTrlHsiCrd: boolean;
  noInvceaddonDataDiv: boolean;
  cafHsiMnthPckgsData: any;
  getHeaderDtls = function (): any { return { 'title': 'Customer Information', 'icon': 'people_outline' }; };
  crntMnthNm: string;
  crntYr: number;
  grphMnthYr: string;
  ticketcolumnDefs: ({ headerName: string; field: string; alignment: string; cellClass: string; width: number; filter: boolean; search?: undefined; } | { headerName: string; field: string; alignment: string; cellClass: string; width: number; filter: boolean; search: boolean; })[];
  TicketData: any;
  shwTicketMsg: string;
  
  
  
  // rowdatapackage: any;
  constructor(public TransfereService: TransfereService, public crdsrv: CrudService, private dsSidebarService: DsSidebarService,
    @Inject(MAT_DIALOG_DATA) public cafdata: DialogData, public dialog: MatDialog, public route: ActivatedRoute, private _snackBar: MatSnackBar, private router: Router) {
    this.permissions = { 'slct_in': 1, 'insrt_in': 0, 'updt_in': 1, 'dlte_in': 1, 'exprt_in': 1 };
    // console.log(cafdata['imgData'])
    // const permTxt = 'Service Pack';
    // const prmeRte = `user/permissions/${permTxt}`;
    // this.crdsrv.get(prmeRte).subscribe((res) => {
    //   // console.log(res['data'][0]);
    //   this.srvcPkPermissn = res['data'][0];
    //   // console.log(this.srvcPkPermissn);
    // });

    const permTxt1 = 'Addon packages';
    const prmeRte1 = `user/permissions/${permTxt1}`;
    this.crdsrv.get(prmeRte1).subscribe((res) => {
      this.addonPckgsPrm = res['data'][0];
      // console.log(this.addonPckgsPrm);
      if (this.addonPckgsPrm == undefined){ this.addonPckgsPrm = {}; }
      // console.log(this.addonPckgsPrm.insrt_in);
    });
  }
  // ngAfterViewInit (){

  // }
  ngOnInit(): any {
    this.selectedIndex = 0;
    this.usrDtls = JSON.parse(localStorage.getItem('usrDtls'));
    this.types = ['line', 'stackedline', 'fullstackedline'];
    if (this.cafdata['imgData'] != undefined) {
      this.cafDtls = this.cafdata['imgData'].data;
      // console.log(this.cafDtls.caf_id)
      this.getUsrPermissions();
      // this.close();
      this.clsbtn = true;
    } else if (this.cstmrData) {
      this.showCstmrData();
    } else {
      this.cafDtls = this.TransfereService.getLoclData('data');
      // console.log(this.cafDtls.caf_id)
      //  // console.log(this.cafDtls.caf_id)
      this.getUsrPermissions();
    }
    if (this.selectedIndex == 0) {
      this.getIptvPckgesData();
    }

  }

  ngOnChanges(): any {
    this.showCstmrData();
  }

  showCstmrData(): any {
    this.route.params.subscribe((params) => {
      this.cafDtls = this.cstmrData;
      this.selectedIndex = 0;
      // console.log(this.cafDtls);
      this.getUsrPermissions();
    });
  }

  // console.log(this.rowData)
  // this.columnDefs = [
  //   { headerName: 'Name', field: 'cstmr_nm', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 200, filter: false, search: false },
  //   { headerName: 'Mobile Number', field: 'mbl_nu', alignment: 'left', cellClass: 'pm-grid-number-cell', width: 150, filter: true },
  //   { headerName: 'aadhar Id', field: 'adhr_nu', alignment: 'left', cellClass: 'pm-grid-number-cell', width: 150, filter: true },
  //   { headerName: 'Activation Date', field: 'actvn_dt', alignment: 'left', cellClass: 'pm-grid-number-cell', width: 150, filter: true },
  //   { headerName: 'Email', field: 'instl_eml1_tx', alignment: 'left', cellClass: 'pm-grid-number-cell', width: 200, filter: true },
  //   { headerName: 'Location', field: 'instl_addr2_tx', alignment: 'left', cellClass: 'pm-grid-number-cell', width: 150, filter: true }
  // ];


  // tslint:disable-next-line:member-ordering
  user: any = {
    permissions: { 'slct_in': 0, 'insrt_in': 0, 'updt_in': 0, 'dlte_in': 0, 'exprt_in': 0 },
    'perm_url': 'user/permissions/Customer Creation'
  };

  // tslint:disable-next-line:member-ordering
  mainMessage = null;

  getUsrPermissions(): any {
    this.mainMessage = null;
    this.user.permissions = { 'slct_in': 1, 'insrt_in': 0, 'updt_in': 0, 'dlte_in': 0, 'exprt_in': 0 };
    // this.crdsrv.get(this.user.perm_url).subscribe((res) => {
    //   // console.log(res['data']);
    //   this.user.permissions = res['data'][0];
    //   if (this.user.permissions.slct_in === 0) {
    //     this.mainMessage = 'You do not have permissions to do this operation. Please contact Administrator to get permissions.';
    //   } else
    
    if (this.router.url == '/admin/callcenter/customers') {
      this.shwPckgeAddBtn = false;
    } else {
      this.shwPckgeAddBtn = false;
    }

    this.getdata();
    // });
  }

  getONTDetails(): any {
    let rte2 = 'ont/details/' + this.cafDtls.caf_id;
    // console.log(rte);
    this.crdsrv.get(rte2).subscribe((res) => {
      this.ontDtls = res['data'];
      //  // console.log(this.ontDtls);
      if (this.ontDtls.length == 0) {
        this.noOntDtls = true;
      } else {
        this.noOntDtls = false;
      }
      this.gettabs();
    });
  }

  getdata() {
    this.shwLdr = true;
    let rte = 'caf/customer/profile/' + this.cafDtls.caf_id;
    // console.log(rte);
    this.crdsrv.get(rte).subscribe((res) => {
      this.cafDtlsData = res['data'];
      this.shwLdr = false;

      // console.log(this.cafDtlsData);
      // console.log(this.data.package)
      // this.rowdatapackage = this.data.package;
      this.rowData = this.cafDtlsData;
      this.getONTDetails();

      // console.log(this.rowData);
    });


    this.boxcolumnDefs = [
      // { headerName: 'Name', field: 'cstmr_nm', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 200, filter: false, search: false },
      // { headerName: 'Mobile Number', field: 'mbl_nu', alignment: 'left', cellClass: 'pm-grid-number-cell', width: 150, filter: true },
      { headerName: 'ONU Serial Number', field: 'onu_srl_nu', alignment: 'left', cellClass: 'pm-grid-number-cell', width: 150, filter: false },
      { headerName: 'ONU MAC Address', field: 'onu_mac_addr_tx', alignment: 'left', cellClass: 'pm-grid-number-cell', width: 150, filter: false },
      { headerName: 'ONU Model Name', field: 'onu_mdl_nm', alignment: 'left', cellClass: 'pm-grid-number-cell', width: 200, filter: false },
      { headerName: 'IPTV Serial Number', field: 'iptv_srl_nu', alignment: 'left', cellClass: 'pm-grid-number-cell', width: 150, filter: false },
      { headerName: 'IPTV MAC Address', field: 'iptv_mac_addr_tx', alignment: 'left', cellClass: 'pm-grid-number-cell', width: 150, filter: false },
      { headerName: 'IPTV Model Name', field: 'iptv_mdl_nm', alignment: 'left', cellClass: 'pm-grid-number-cell', width: 200, filter: false },
      // { headerName: 'Location', field: 'instl_addr2_tx', alignment: 'left', cellClass: 'pm-grid-number-cell', width: 150, filter: true }
    ];
  }
  gettabs() {
    if (this.cafDtlsData[0].pckge_id == 80) {
      this.shwtab = false;
      this.getRelatedCafs();
    } else {
      this.shwtab = true;
      this.getRelatedCafs();
    }
  }
  tabChangeFn(event) {
    // console.log(event);
    // if (this.cafDtlsData[0].pckge_id == 80){
    //   if (event.index == 0){
    //     this.getdata();
    //   }else if (event.index === 1) {
    //     this.getpackage();
    //   }else if (event.index === 2){
    //     this.gethsi();
    //   }else if (event.index === 3){
    //     this.getRelatedCafs();
    //   }else if (event.index === 4){
    //     this.getInvoice();
    //   }
    // } else{
    if (event.index == 0) {
      this.getdata();
    } else if (event.index === 1) {
      this.getpackage();
    } else if (event.index === 2) {
      this.getvoip();
    } else if (event.index === 3) {
      this.gethsi();
    } else if (event.index === 4) {
      this.getRelatedCafs();
    } else if (event.index === 5) {
      this.getEvents();
    } else if (event.index === 6) {
      this.getInvoice();
    } else if (event.index === 7) {
      this.getaddonInvoice();
    }  else if (event.index === 8) {
      this.gettickets();
    } 

    // }

  }

  getEvents(): any {
    this.inEvntTab = true;
    this.cafId = this.cafDtlsData[0].caf_id;
    this.cafSts = this.cafDtlsData[0].enty_sts_id;
  }
  getRelatedCafs(): any {
    // console.log(this.cafDtlsData);

    this.shwLdr = true;
    const adhrRte = 'caf/relatedcafs';
    const adhr_nu = this.cafDtlsData[0].full_adhr_nu;
    // console.log(adhr_nu);
    if (adhr_nu != '' && adhr_nu != 'undefined' && adhr_nu != null && adhr_nu != undefined ) {
      this.crdsrv.create({ adhr_nu: adhr_nu }, adhrRte).subscribe((res) => {
        this.cafAdhrMtchData = res['data'];
        this.shwLdr = false;
        // console.log(this.cafAdhrMtchData);
        let adhrCt = 0;
        this.cafAdhrMtchData.filter(s => {
          s['sno'] = ++adhrCt;
        });
        for (let i = 0; i < this.cafAdhrMtchData.length; i++) {
          if (this.cafAdhrMtchData[i].caf_id == this.cafDtlsData[0].caf_id) {
            this.cafAdhrMtchData.splice(i, 1);
          }
        }
        this.cafAdhrMtchDataColumnDefs = [
          { headerName: 'Sno', field: 'sno', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 100, filter: false },
          { headerName: 'CAF Number', field: 'caf_nu', alignment: 'left', cellClass: 'pm-grid-number-cell', width: 150, filter: false, search: false },
          { headerName: 'Status', field: 'sts_nm', alignment: 'left', cellClass: 'pm-grid-number-cell', width: 200, filter: false },
          { headerName: 'Activation Date', field: 'actvn_dt', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 150, filter: false },
          { headerName: 'Suspended Date', field: 'spnd_ts', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 200, filter: false },
          { headerName: 'Resume Date', field: 'rsme_ts', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 200, filter: false }
        ];
      });
    } else {
      this.cafAdhrMtchData = [];
    }
    const cstmrRte = 'caf/relatedcafs';
    const cstmr_id = this.cafDtlsData[0].cstmr_id;
    // console.log(cstmr_id);
    this.crdsrv.create({ cstmr_id: cstmr_id }, cstmrRte).subscribe((res) => {
      this.cafCstmrMtchData = res['data'];
      this.shwLdr = false;
      // console.log(this.cafCstmrMtchData);
      let cstmrCt = 0;
      this.cafCstmrMtchData.filter(s => {
        s['sno'] = ++cstmrCt;
      });
      for (let i = 0; i < this.cafCstmrMtchData.length; i++) {
        if (this.cafCstmrMtchData[i].caf_id == this.cafDtlsData[0].caf_id) {
          this.cafCstmrMtchData.splice(i, 1);
        }
      }
      this.cafCstmrMtchDataColumnDefs = [
        { headerName: 'Sno', field: 'sno', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 100, filter: false },
        { headerName: 'CAF Number', field: 'caf_nu', alignment: 'left', cellClass: 'pm-grid-number-cell', width: 150, filter: false, search: false },
        { headerName: 'Status', field: 'sts_nm', alignment: 'left', cellClass: 'pm-grid-number-cell', width: 200, filter: false },
        { headerName: 'Activation Date', field: 'actvn_dt', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 150, filter: false },
        { headerName: 'Suspended Date', field: 'spnd_ts', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 200, filter: false },
        { headerName: 'Resume Date', field: 'rsme_ts', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 200, filter: false }
      ];
    });

    const mblnuRte = 'caf/relatedcafs';
    const mbl_nu = this.cafDtlsData[0].mbl_nu;
    // console.log(mbl_nu);
    this.crdsrv.create({ mble_nu: mbl_nu }, mblnuRte).subscribe((res) => {
      this.cafMblnuMtchData = res['data'];
      this.shwLdr = false;
      let mblnuCt = 0;
      this.cafMblnuMtchData.filter(s => {
        s['sno'] = ++mblnuCt;
      });
      for (let i = 0; i < this.cafMblnuMtchData.length; i++) {
        if (this.cafMblnuMtchData[i].caf_id == this.cafDtlsData[0].caf_id) {
          this.cafMblnuMtchData.splice(i, 1);
        }
      }



      this.cafMblnuMtchDataColumnDefs = [
        { headerName: 'Sno', field: 'sno', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 100, filter: false },
        { headerName: 'CAF Number', field: 'caf_nu', alignment: 'left', cellClass: 'pm-grid-number-cell', width: 150, filter: false, search: false },
        { headerName: 'Status', field: 'sts_nm', alignment: 'left', cellClass: 'pm-grid-number-cell', width: 200, filter: false },
        { headerName: 'Activation Date', field: 'actvn_dt', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 150, filter: false },
        { headerName: 'Suspended Date', field: 'spnd_ts', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 200, filter: false },
        { headerName: 'Resume Date', field: 'rsme_ts', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 200, filter: false }
      ];
    });

    // console.log(this.cafMblnuMtchData);
    // console.log(this.cafAdhrMtchData);

    for (let i = 0; i < this.cafAdhrMtchData.length; i++) {
      for (let j = 0; j < this.cafCstmrMtchData.length; j++) {
        for (let k = 0; k < this.cafMblnuMtchData.length; k++) {
          if (this.cafAdhrMtchData[i].caf_id == this.cafCstmrMtchData[j].caf_id &&
            this.cafAdhrMtchData[i].caf_id == this.cafMblnuMtchData[k].caf_id) {
            this.sameCafDtls = true;
          } else {
            this.sameCafDtls = false;
          }
        }
      }
    }
    if (this.cafAdhrMtchData.length == 0 && this.cafCstmrMtchData.length == 0 && this.cafMblnuMtchData.length == 0) {
      this.shwRltdCfsNoDataDiv = true;
    } else {
      this.shwRltdCfsNoDataDiv = false;
    }
  }


  getpackage() {
    this.shwLdr = true;
    const rte = 'caf/customer/package/' + this.cafDtls.caf_id;
    // console.log(rte)
    this.crdsrv.get(rte).subscribe((res) => {
      this.pkgeData = res['data'];
      this.shwLdr = false;
      // console.log(this.pkgeData);
      // console.log(this.data.package)
      // this.rowdatapackage = this.data.package;
      for (let i = 0; i < this.pkgeData.length; i++) {
        if (this.pkgeData[i].plan_exp == '31-12-9999') {
          this.activeLbl = true;
        } else {
          this.activeLbl = false;
        }
      }

      // console.log(this.activeLbl);
      this.packagecolumnDefs = [
        { headerName: 'Sno', field: 'sno', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 100, filter: false },
        { headerName: 'Package Name', field: 'pckge_nm', alignment: 'left', cellClass: 'pm-grid-number-cell', width: 150, filter: false, search: false },
        { headerName: 'Service Package', field: 'srvcpk_nm', alignment: 'left', cellClass: 'pm-grid-number-cell', width: 150, filter: false },
        { headerName: 'package Active', field: 'cycle_strt_dt', alignment: 'left', cellClass: 'pm-grid-number-cell', width: 150, filter: false },
        { headerName: 'package disconnection', field: 'cycle_end_dt', alignment: 'left', cellClass: 'pm-grid-number-cell', width: 150, filter: false },
        { headerName: 'Core Service Name', field: 'cre_srvce_nm', alignment: 'left', cellClass: 'pm-grid-number-cell', width: 200, filter: false },
        { headerName: 'Package Charges', field: 'chrge_at', alignment: 'right', cellClass: 'pm-grid-number-cell', width: 200, filter: false },
        { headerName: 'Package GST Charges', field: 'gst_at', alignment: 'right', cellClass: 'pm-grid-number-cell', width: 200, filter: false },
        {
          headerName: 'Package Activation', field: 'plan_act', alignment: 'center', hide: ((this.activeLbl) == true) ? true : false,
          cellClass: 'pm-grid-number-cell', width: 200, filter: false
        },
        {
          headerName: 'Package Expiry', field: 'plan_exp', alignment: 'center', hide: ((this.activeLbl) == true) ? true : false,
          cellClass: 'pm-grid-number-cell', width: 200, filter: false
        },

      ];
    });

  }

  getvoip() {
    this.shwLdr = true;
    const rte = 'caf/customer/voip/' + this.cafDtls.caf_id;
    // console.log(rte)
    this.crdsrv.get(rte).subscribe((res) => {
      for (let i = 0; i < res['data'].length; i++) {
        res['data'][i]['month'] = this.monthNames[res['data'][i].call_mm - 1];
      }
      this.voipData = res['data'];
      this.shwLdr = false;
      // console.log(this.voipData);
      if (this.voipData.length == 0) {
        if (this.cafDtlsData[0].phne_nu != null) {
          this.shwVoipMsg = 'No VOIP Charges Available';
        } else {
          this.shwVoipMsg = 'No VOIP Numbers are assigned';
        }
        this.shwNoDataDiv = true;
      } else {
        this.shwNoDataDiv = false;
      }
      // console.log(this.data.package)
      // this.rowdatapackage = this.data.package;
    })
    this.voipcolumnDefs = [
      { headerName: 'Sno', field: 's_no', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 100, filter: false },
      { headerName: 'Phone no', field: 'phne_nu', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 100, filter: false },
      { headerName: 'Year', field: 'call_yr', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 150, filter: false, search: false },
      { headerName: 'Month', field: 'month', alignment: 'left', cellClass: 'pm-grid-number-cell', width: 150, filter: false },
      // { headerName: 'Core Service Name', field: 'cre_srvce_nm', alignment: 'left', cellClass: 'pm-grid-number-cell', width: 200, filter: true },
      { headerName: 'STD Charges', field: 'std_chrge_at', alignment: 'right', cellClass: 'pm-grid-number-cell', width: 200, filter: false },
      { headerName: 'ISD Charges', field: 'isd_chrge_at', alignment: 'right', cellClass: 'pm-grid-number-cell', width: 200, filter: false },
      { headerName: 'Local Charges', field: 'lcl_chrge_at', alignment: 'right', cellClass: 'pm-grid-number-cell', width: 200, filter: false },
      { headerName: 'Total Charges', field: 'total', alignment: 'right', cellClass: 'pm-grid-number-cell', width: 200, filter: false },
      // { headerName: 'Call Charges', field: 'cals_chrge_at', cellStyle: { 'text-align': 'right' }, cellClass: 'pm-grid-number-cell', width: 200, filter: true },
      // { headerName: 'Called To State Name', field: 'cld_ste_nm', alignment: 'left', cellClass: 'pm-grid-number-cell', width: 200, filter: true },
      // { headerName: 'Local/International Call', field: 'intr_cal_sts', alignment: 'left', cellClass: 'pm-grid-number-cell', width: 200, filter: true },

    ];
  }

//   gettickets() {
//     this.shwLdr = true;
//    let data = {
//     indicator: 'CAF',
//     id: this.cafDtls.caf_id
//     }
//   let rte = 'ticket/get_TicketDetails'
//   this.crdsrv.create(data, rte).subscribe((res) => {
//     this.TicketData = res['data'];
//     console.log(this.TicketData);
//     this.shwLdr = false;
//     if(this.TicketData.length == 0){
//       this.shwTicketMsg = 'No Support Tickets Assigned to this CAF.';
//       this.shwNoDataDiv = true; 
//     } else{
//       this.shwNoDataDiv = false; 
//     }
//     // for (var p = 0; p < this.tickets.length; p++) {
//     //   this.tickets[p]['indicator'] = this.approveTickets[0].indicator;
//     //   this.tickets[p]['id'] = this.approveTickets[0].id;
//     //   this.tickets[p]['loginuserteamid'] = this.approveTickets[0].loginuserteamid;
//     // }
//     console.log(this.TicketData);
//   })
//     this.ticketcolumnDefs = [
//       { headerName: 'Sno', field: 's_no', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 100, filter: false },
//       { headerName: 'Ticket ID', field: 'tckt_id', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 100, filter: false },
//       { headerName: 'Created On', field: 'tckt_dt', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 150, filter: false, search: false },
//       { headerName: 'Status', field: 'tckt_sts_nm', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 150, filter: false },
//       { headerName: 'Priority', field: 'prty_nm', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 100, filter: true },
//       { headerName: 'Cateogry', field: 'tckt_ctgry_nm', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 150, filter: false },
//       { headerName: 'Sub Cateogry', field: 'tckt_sb_ctgry_nm', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 150, filter: false },
//       { headerName: 'Issue Type', field: 'caf_isu_typ_nm', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 150, filter: false },
//       { headerName: 'Issue Identifier', field: 'caf_isu_idnfr_nm', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 150, filter: false },
//       { headerName: 'Created BY', field: 'createuser', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 150, filter: true },
//       { headerName: 'Created Team', field: 'createTeam', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 150, filter: true },
//       { headerName: 'Assign Team', field: 'assignTeam', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 150, filter: true },

//     ];
//   }

  gettickets() {
    this.shwLdr = true;
   let data = {
    indicator: 'CAF',
    cafid: this.cafDtls.caf_id
    }
  let rte = 'subscriberApp/sprtTicktCafDtls'
  this.crdsrv.create(data, rte).subscribe((res) => {
    this.TicketData = res['data'];
    let counter = 0;
    this.TicketData.filter((k) => {
      k['s_no'] = ++counter;
    });
    console.log(this.TicketData);
    this.shwLdr = false;
    if(this.TicketData.length == 0){
      this.shwTicketMsg = 'No complaint Tickets';//Assigned to this CAF
      this.shwNoDataDiv = true; 
    } else{
      this.shwNoDataDiv = false; 
    }
    
    console.log(this.TicketData);
  })
    this.ticketcolumnDefs = [
        { headerName: 'Sno', field: 's_no', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 80,  filter: true },
        { headerName: 'Caf ID', field: 'caf_id', alignment:'center', cellClass: 'pm-grid-number-cell', width: 100,  filter: true },
        { headerName: 'Ticket No', field: 'comp_ticketno', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 100,  filter: true},
        { headerName: 'Issue Type', field: 'comp_ticket_type', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 150,filter: true },
        { headerName: 'Complaint Category', field: 'Category', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 150 ,filter: true},
        { headerName: 'Issue Owner', field: 'cmplnt_owner', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 100 ,filter: true},
        { headerName: 'Status', field: 'cmp_sts', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 100 ,filter: true},
        { headerName: 'Assigned To', field: 'cmplnt_emp', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 150 ,filter: true}, 
        { headerName: 'Created by', field: 'mrcht_usr_nm', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 100 ,filter: true}, 
        { headerName: 'Created On', field: 'dateCreated', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 150 ,filter: true}, 
        { headerName: 'Created Date', field: 'createdDate', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 150 ,filter: true},
        { headerName: 'Complaint Remarks', field: 'complaint', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 150,filter: true },
        // { headerName: 'Edit', field: 'Edit', alignment: 'center', cellClass: 'pm-grid-number-cell' }

    ];
  }

  gethsi(): any {
    this.shwLdr = true;
    const d = new Date();
    const n = d.getMonth() + 1;
    const crntMnthNm = this.monthNames[d.getMonth()];
    const crntYr = d.getFullYear();
    this.grphMnthYr = crntMnthNm + ' ' + crntYr;
    //const rte = 'caf/customer/hsi/' + this.cafDtls.caf_id;
    const rte = 'caf_operations/customer/hsi/' + this.cafDtls.caf_id;

    this.crdsrv.get(rte).subscribe((res) => {
      if (this.cafDtlsData[0].hsi_crnt_prfle_tx){
        this.shwTrlHsiCrd = true;
        this.crntDataSpd =  this.cafDtlsData[0].hsi_crnt_prfle_tx;
        this.crntDataSpd_apldDt =  this.cafDtlsData[0].hsi_thrtd_ts;
        this.prvsDataSpd =  this.cafDtlsData[0].hsi_orgnl_prfle_tx;
      } else {
        this.shwTrlHsiCrd = false;
      }
     
      for (let i = 0; i < res['data'].length; i++) {
        res['data'][i]['month'] = this.monthNames[res['data'][i].mnt_ct - 1];
      }
      this.hsiData = res['data'];
      this.shwLdr = false;
      this.hsieachday = [];

      for (let j = 0; j < this.hsiData.length; j++){
        //if (this.hsiData[j].mnt_ct == n){
          this.hsieachday.push(this.hsiData[j].eachday);
        //}
      }

      // this.hsieachday = res['data'][n].eachday;
      // console.log(this.hsieachday);

      //let day_keys = Object.keys(this.hsieachday[0][0]);
      this.hsiEchDayLineGraph = [];
      // console.log(day_keys)
      for (let index = 1; index <= 31; index++) {
        let type = 'day_' + index;
        let d = {
          'oprn_dy': type,
          'upload': this.hsieachday[0][0][`day_${index}_TU`],
          'download': this.hsieachday[0][0][`day_${index}_TD`],
        };
        this.hsiEchDayLineGraph.push(d);
      }
      // console.log(this.hsiEchDayLineGraph);
      this.cafHsiUsgeOprtns = [
        { value: 'upload', name: 'Total Upload in GB', color: 'coral' },
        { value: 'download', name: 'Total Download in GB', color: 'cadetblue' }];
    });

    this.hsicolumnDefs = [
      { headerName: 'Sno', field: 's_no', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 100, filter: false },
      // { headerName: 'Date', field: 'dt', alignment: 'left', cellClass: 'pm-grid-number-cell', width: 100, filter: true },
      { headerName: 'Year', field: 'yr_ct', alignment: 'left', cellClass: 'pm-grid-number-cell', width: 100, filter: false },
      { headerName: 'Month', field: 'month', alignment: 'left', cellClass: 'pm-grid-number-cell', width: 100, filter: false },
      { headerName: 'Total Download(GB)', field: 'TD', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 250, filter: false, search: false },
      { headerName: 'Total Upload(GB)', field: 'TU', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 250, filter: false },
      { headerName: 'Total Size(GB)', field: 'total', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 250, filter: false },

    ];
    this.hsiEachdaycolumnDefs = [
      // { headerName: 'Sno', field: 's_no', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 100, filter: false },
      // { headerName: 'Date', field: 'dt', alignment: 'left', cellClass: 'pm-grid-number-cell', width: 100, filter: true },
      { headerName: 'Day 1 Uplaod(GB)', field: 'day_1_TU', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 150, filter: false },
      { headerName: 'Day 1 Downlaod(GB)', field: 'day_1_TD', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 150, filter: false },
      { headerName: 'Day 2 Uplaod(GB)', field: 'day_2_TU', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 150, filter: false, search: false },
      { headerName: 'Day 2 Downlaod(GB)', field: 'day_2_TD', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 150, filter: false },
      { headerName: 'Day 3 Uplaod(GB)', field: 'day_3_TU', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 150, filter: false },
      { headerName: 'Day 3 Downlaod(GB)', field: 'day_3_TD', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 150, filter: false },
      { headerName: 'Day 4 Uplaod(GB)', field: 'day_4_TU', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 150, filter: false, search: false },
      { headerName: 'Day 4 Downlaod(GB)', field: 'day_4_TD', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 150, filter: false },
      { headerName: 'Day 5 Uplaod(GB)', field: 'day_5_TU', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 150, filter: false },
      { headerName: 'Day 5 Downlaod(GB)', field: 'day_5_TD', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 150, filter: false },
      { headerName: 'Day 6 Uplaod(GB)', field: 'day_6_TU', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 150, filter: false, search: false },
      { headerName: 'Day 6 Downlaod(GB)', field: 'day_6_TD', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 150, filter: false },
      { headerName: 'Day 7 Uplaod(GB)', field: 'day_7_TU', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 150, filter: false },
      { headerName: 'Day 7 Downlaod(GB)', field: 'day_7_TD', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 150, filter: false },
      { headerName: 'Day 8 Uplaod(GB)', field: 'day_8_TU', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 150, filter: false, search: false },
      { headerName: 'Day 8 Downlaod(GB)', field: 'day_8_TD', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 150, filter: false },
      { headerName: 'Day 9 Uplaod(GB)', field: 'day_9_TU', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 150, filter: false },
      { headerName: 'Day 9 Downlaod(GB)', field: 'day_9_TD', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 150, filter: false },
      { headerName: 'Day 10 Uplaod(GB)', field: 'day_10_TU', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 150, filter: false, search: false },
      { headerName: 'Day 10 Downlaod(GB)', field: 'day_10_TD', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 150, filter: false },
      { headerName: 'Day 11 Uplaod(GB)', field: 'day_11_TU', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 150, filter: false },
      { headerName: 'Day 11 Downlaod(GB)', field: 'day_11_TD', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 150, filter: false },
      { headerName: 'Day 12 Uplaod(GB)', field: 'day_12_TU', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 150, filter: false, search: false },
      { headerName: 'Day 12 Downlaod(GB)', field: 'day_12_TD', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 150, filter: false },
      { headerName: 'Day 13 Uplaod(GB)', field: 'day_13_TU', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 150, filter: false },
      { headerName: 'Day 13 Downlaod(GB)', field: 'day_13_TD', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 150, filter: false },
      { headerName: 'Day 14 Uplaod(GB)', field: 'day_14_TU', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 150, filter: false, search: false },
      { headerName: 'Day 14 Downlaod(GB)', field: 'day_14_TD', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 150, filter: false },
      { headerName: 'Day 15 Uplaod(GB)', field: 'day_15_TU', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 150, filter: false },
      { headerName: 'Day 15 Downlaod(GB)', field: 'day_15_TD', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 150, filter: false },
      { headerName: 'Day 16 Uplaod(GB)', field: 'day_16_TU', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 150, filter: false, search: false },
      { headerName: 'Day 16 Downlaod(GB)', field: 'day_16_TD', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 150, filter: false },
      { headerName: 'Day 17 Uplaod(GB)', field: 'day_17_TU', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 150, filter: false, search: false },
      { headerName: 'Day 17 Downlaod(GB)', field: 'day_17_TD', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 150, filter: false },
      { headerName: 'Day 18 Uplaod(GB)', field: 'day_18_TU', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 150, filter: false, search: false },
      { headerName: 'Day 18 Downlaod(GB)', field: 'day_18_TD', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 150, filter: false },
      { headerName: 'Day 19 Uplaod(GB)', field: 'day_19_TU', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 150, filter: false },
      { headerName: 'Day 19 Downlaod(GB)', field: 'day_19_TD', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 150, filter: false },
      { headerName: 'Day 20 Uplaod(GB)', field: 'day_20_TU', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 150, filter: false, search: false },
      { headerName: 'Day 20 Downlaod(GB)', field: 'day_20_TD', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 150, filter: false },
      { headerName: 'Day 21 Uplaod(GB)', field: 'day_21_TU', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 150, filter: false },
      { headerName: 'Day 21 Downlaod(GB)', field: 'day_21_TD', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 150, filter: false },
      { headerName: 'Day 22 Uplaod(GB)', field: 'day_22_TU', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 150, filter: false, search: false },
      { headerName: 'Day 22 Downlaod(GB)', field: 'day_22_TD', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 150, filter: false },
      { headerName: 'Day 23 Uplaod(GB)', field: 'day_23_TU', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 150, filter: false },
      { headerName: 'Day 23 Downlaod(GB)', field: 'day_23_TD', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 150, filter: false },
      { headerName: 'Day 24 Uplaod(GB)', field: 'day_24_TU', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 150, filter: false, search: false },
      { headerName: 'Day 24 Downlaod(GB)', field: 'day_24_TD', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 150, filter: false },
      { headerName: 'Day 25 Uplaod(GB)', field: 'day_25_TU', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 150, filter: false, search: false },
      { headerName: 'Day 25 Downlaod(GB)', field: 'day_25_TD', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 150, filter: false },
      { headerName: 'Day 26 Uplaod(GB)', field: 'day_26_TU', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 150, filter: false, search: false },
      { headerName: 'Day 26 Downlaod(GB)', field: 'day_26_TD', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 150, filter: false },
      { headerName: 'Day 27 Uplaod(GB)', field: 'day_27_TU', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 150, filter: false },
      { headerName: 'Day 27 Downlaod(GB)', field: 'day_27_TD', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 150, filter: false },
      { headerName: 'Day 28 Uplaod(GB)', field: 'day_28_TU', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 150, filter: false, search: false },
      { headerName: 'Day 28 Downlaod(GB)', field: 'day_28_TD', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 150, filter: false },
      { headerName: 'Day 29 Uplaod(GB)', field: 'day_29_TU', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 150, filter: false },
      { headerName: 'Day 29 Downlaod(GB)', field: 'day_29_TD', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 150, filter: false },
      { headerName: 'Day 30 Uplaod(GB)', field: 'day_30_TU', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 150, filter: false, search: false },
      { headerName: 'Day 30 Downlaod(GB)', field: 'day_30_TD', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 150, filter: false },
      { headerName: 'Day 31 Uplaod(GB)', field: 'day_31_TU', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 150, filter: false },
      { headerName: 'Day 31 Downlaod(GB)', field: 'day_31_TD', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 150, filter: false },
    ];
  }

  getInvoice() {
    this.shwLdr = true;
    const rte = 'caf/customer/invoice/' + this.cafDtls.caf_id;
    // console.log(rte)
    this.crdsrv.get(rte).subscribe((res) => {
      // console.log(res['data']);
      // for (let i = 0; i < res['data'].length; i++) {
      //   res['data'][i]['month'] = this.monthNames[res['data'][i].invce_mm - 1];
      // }
      this.invoiceData = res['data'];
      this.shwLdr = false;
      // console.log(this.invoiceData);
      if (this.invoiceData.length == 0) {
        this.noInvceDataDiv = true;
      } else {
        this.noInvceDataDiv = false;
      }
      // console.log(this.data.package)
      // this.rowdatapackage = this.data.package;
    });
    this.invoicecolumnDefs = [
      { headerName: 'Sno', field: 's_no', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 100, sortable: true, filter: false },
      { headerName: 'Invoice Id', field: 'caf_invce_id', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 100, sortable: true, filter: true },
      { headerName: 'Year', field: 'invce_yr', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 100, sortable: true, filter: true },
      { headerName: 'Month', field: 'invce_mm', alignment: 'left', cellClass: 'pm-grid-number-cell', width: 100, sortable: true, filter: true },
      { headerName: 'Invoice From Date', field: 'invce_frm_dt', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 200, sortable: true, filter: false },
      { headerName: 'Invoice To Date', field: 'invce_to_dt', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 200, sortable: true, filter: false },
      { headerName: 'Package', field: 'pckge_nm', alignment: 'left', cellClass: 'pm-grid-number-cell', width: 100, sortable: true, filter: true },
      { headerName: 'Active Days', field: 'ActiveDays', alignment: 'left', cellClass: 'pm-grid-number-cell', width: 100, sortable: true, filter: true },
      { headerName: 'Suspend Days', field: 'SuspendDays', alignment: 'left', cellClass: 'pm-grid-number-cell', width: 100, sortable: true, filter: true },
      { headerName: 'Caf Type', field: 'caf_type_nm', alignment: 'left', cellClass: 'pm-grid-number-cell', width: 100, sortable: true, filter: true },
      { headerName: 'HSI Usage', field: 'TOTAL_IN_GB', alignment: 'left', cellClass: 'pm-grid-number-cell', width: 100, sortable: true, filter: true },
      { headerName: 'Invoice Charges', field: 'format(invce_at,2)', alignment: 'right', cellClass: 'pm-grid-number-cell', width: 100, sortable: true, filter: false },
      { headerName: 'TAX', field: 'tax_at', alignment: 'right', cellClass: 'pm-grid-number-cell', width: 100, sortable: true, filter: false },
      { headerName: 'Amount', field: 'tl_at', alignment: 'right', cellClass: 'pm-grid-number-cell', width: 100, sortable: true, filter: false, search: false },
      { headerName: 'Payment Status', field: 'Payment Status', alignment: 'left', cellClass: 'pm-grid-number-cell', width: 120, sortable: true, filter: true },
      { headerName: 'Payment TimeStamp', field: 'pd_ts', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 150, sortable: true, filter: false },

    ];
  }
  getaddonInvoice() {
    this.shwLdr = true;
    const rte = 'caf/customer/invoices/addons/' + this.cafDtls.caf_id;
    // console.log(rte)
    this.crdsrv.get(rte).subscribe((res) => {
      // console.log(res['data']);
      // for (let i = 0; i < res['data'].length; i++) {
      //   res['data'][i]['month'] = this.monthNames[res['data'][i].invce_mm - 1];
      // }
      this.invoiceaddonData = res['data'];
      this.shwLdr = false;
      // console.log(this.invoiceData);
      if (this.invoiceaddonData.length == 0) {
        this.noInvceaddonDataDiv = true;
      } else {
        this.noInvceaddonDataDiv = false;
      }
      // console.log(this.data.package)
      // this.rowdatapackage = this.data.package;
    });
    this.addoninvoicecolumnDefs = [
      { headerName: 'Sno', field: 's_no', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 350, sortable: true, filter: true },
      { headerName: 'Year', field: 'invce_yr', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 350, sortable: true, filter: true },
      { headerName: 'Month', field: 'invce_mm', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 350, sortable: true, filter: true },
      { headerName: 'Package Type', field: 'pckage_type_nm', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 150, sortable: true, filter: true },
    ];
  }
  onCelInvClick(data): any {
    // console.log(data);
    this.shwLdr = true;
    const invrte = 'caf/customer/invoices/charges/' + data.data.caf_invce_id;
    // console.log(invrte);
    this.crdsrv.get(invrte).subscribe((res) => {
      // console.log(res['data']);
      this.invoiceChrgsData = res['data'];
      this.shwLdr = false;
      // console.log(this.invoiceData);

    });
  }
  onCeladdonInvClick(data): any {
    // console.log(data);
    this.shwLdr = true;
    const invrte = 'caf/customer/invoices/addons/charges/' + data.data.caf_invce_id;
    // console.log(invrte);
    this.crdsrv.get(invrte).subscribe((res) => {
      // console.log(res['data']);
      this.invoiceaddonChrgsData = res['data'];
      this.shwLdr = false;
      // console.log(this.invoiceData);

    });
  }
  close() {
    this.dialog.closeAll();
  }
  restartBox(data) {
    this.shwLdr = true;
    const restartRte = 'caf/restart/' + data.caf_id;

    this.crdsrv.get(restartRte).subscribe((res) => {
      // console.log(res);
      this.shwLdr = false;
      if (res['status'] == 200) {
        this._snackBar.open('Box Restarted Successfully', '', {
          duration: 2000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition
        });
      }

    });
  }

  customizeTooltip = (arg) => {
    return {
      text: this.getText(arg, arg.valueText)
    };
  }

  getText(item, value): any {
    return item.argument + '<br>' + item.seriesName + ' - ' + '<div style="font - size: 15px">' + '<b>' + value + '</b>' + '</div>';
  }

  onToolbarPreparing(e): any {
    e.toolbarOptions.items.unshift({
      location: 'after',
      widget: 'dxButton',
      options: {
        icon: 'user',
        text: 'Purchase/Remove Addon Packages',
        onClick: this.openSideBar.bind(this, 'addFormPanel'),
        bindingOptions: {
          'disabled': 'isEmailButtonDisabled'
        }
      }
    });
  }

  openSideBar(key): any {
    this.dsSidebarService.getSidebar('addFormPanel').toggleOpen();
    // this.router.navigate(['/admin/caf/customer/service-pack'], { queryParams: { 'paramsdata': true }, skipLocationChange: true });
  }
  closeSideBar(): any {
    this.dsSidebarService.getSidebar('addFormPanel').toggleOpen();
  }

  tabChangePckgeFn(event): any {
    if (event.index == 0) {
      this.getIptvPckgesData();
    } else if (event.index === 1) {
      this.getHsiPckgesData();
    } else if (event.index === 2) {
      this.getRmvePckgesData();
    }
  }

  getHsiPckgesData(): any { 
    this.crdsrv.create(this.srch_cntrl, 'addons/packages/addons/hsi').subscribe((res) => {
      // console.log(res['data']);
      this.hsiPckgsData = res['data'];
    });
    this.crdsrv.get('package/hsi/monthly/details/caf/' + this.cafDtlsData[0].caf_id).subscribe((res) => {
      // console.log(res['data']);
      this.cafHsiMnthPckgsData = res['data'];
    });
  }

  updateSelection(index, data): any{
    // console.log(index, data);

    for (let i = 0; i < this.hsiPckgsData.length; i++) {
      if (this.hsiPckgsData[i].s_no != data.s_no) {
        this.hsiPckgsData[i].checked = false;
      }
  }
  }
  saveAddonHsiPckgs(): any{
    this.fnlChckdData = [];
    // console.log(this.hsiPckgsData);

    for (let h = 0; h < this.hsiPckgsData.length; h++){
      if (this.hsiPckgsData[h].checked && this.hsiPckgsData[h].checked == true){
        this.fnlChckdData.push(this.hsiPckgsData[h]);
      }
    }
    if (this.fnlChckdData.length == 0){
      this._snackBar.open('Please select alteast one package', '', {
        duration: 2500,
        panelClass: ['red-snackbar'],
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      });
    }
    // console.log(this.fnlChckdData[0]);
    // console.log(this.cafDtlsData[0]);
    // console.log(this.usrDtls);

    let extrnl_api_srvc_pack_lst = [];

    this.fnlChckdData.filter((k) => {
      extrnl_api_srvc_pack_lst.push({
        'servicepack': k.srvcpk_nm,
        'expirydate': k.extrnl_api_expry_dt
      });
    });

    const extrnl_api_post_json = {
      'subscribercode': this.cafDtlsData[0].mdlwe_sbscr_id,
      'servicepacks': extrnl_api_srvc_pack_lst
    };

    // console.log(this.fnlChckdData);
    let fnl_nw_hsi_pckge;

    let fnl_ttl_data_usge = (this.cafHsiMnthPckgsData[0].ttl_upld_ct/1024/1024/1024) + (this.cafHsiMnthPckgsData[0].ttl_dwnld_ct/1024/1024/1024);
    console.log(fnl_ttl_data_usge);
    if (fnl_ttl_data_usge < this.cafHsiMnthPckgsData[0].mnth_usge_lmt_ct){
      fnl_nw_hsi_pckge = Number(this.cafHsiMnthPckgsData[0].mnth_usge_lmt_ct - fnl_ttl_data_usge) + Number(this.fnlChckdData[0].vle_tx);
    }else if (fnl_ttl_data_usge > this.cafHsiMnthPckgsData[0].mnth_usge_lmt_ct){
      fnl_nw_hsi_pckge = Number(fnl_ttl_data_usge) + Number(this.fnlChckdData[0].vle_tx);
    }
    const fnlHsiPckgeData = {
      agntId: this.usrDtls.mrcht_usr_id,
      caf_id: this.cafDtlsData[0].caf_id,
      pckg_lst: this.fnlChckdData,
      caf_type_id: this.cafDtlsData[0].caf_type_id,
      aaa_cd: this.cafDtlsData[0].aaa_cd,
      crnt_pln_id: this.cafDtlsData[0].pckge_id,
      extrnl_api_post_json: extrnl_api_post_json,
      crnt_cstmr_pckg: this.pkgeData[0].srvcpk_nm.split(',')[1],
      add_on_hsi_pckg: this.fnlChckdData[0].vle_tx,
      prsnt_hsi_pckge: this.cafHsiMnthPckgsData[0].mnth_usge_lmt_ct,
      aaa_prfl_nm: this.cafDtlsData[0].hsi_orgnl_prfle_tx,
      nw_hsi_pckge: fnl_nw_hsi_pckge.toFixed(0)
    };
    // ttl_upld_ct/1024/1024/1024+ttl_dwnld_ct/1024/1024/1024
//     console.log(this.hsiPckgsData);
//     console.log(this.cafHsiMnthPckgsData[0]);
//     console.log(fnlHsiPckgeData);
// return;
    this.crdsrv.create(fnlHsiPckgeData, 'caf_operations/hsiAddOn').subscribe((res) => {
      if (res['status'] == 200) {
        this._snackBar.open('Successfully HSI Addons added', '', {
          duration: 2000,
          panelClass: ['blue-snackbar'],
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
      }
      else{
        this._snackBar.open('Something Went Wrong ', '', {
          duration: 2000,
          panelClass: ['red-snackbar'],
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
      }
    });
  }

  getIptvPckgesData(): any {
    this.crdsrv.create(this.srch_cntrl, 'addons/packages/addons/channels').subscribe((res) => {
      // console.log(res);
      // console.log(res['data']);
      if (res['status'] == 200) {
        this.loader = false;
        res['data'].filter((k) => {
          k['expanded'] = false;
          k['isChecked'] = false;
          this.addOnStandardPckgsLst.push(k);
        });
        this.addOnStandardPckgsLst = _.uniqBy(this.addOnStandardPckgsLst, 'pckge_id');
        
        let index = 0;
        for (let k = 0; k < this.addOnStandardPckgsLst.length; k++) {
          index = index + 1;
          this.addOnStandardPckgsLst[k].indx = index;
          // tslint:disable-next-line:max-line-length
          this.addOnStandardPckgsLst[k].tot_amt = "" + (this.addOnStandardPckgsLst[k].chrge_at == null ? 0 : this.addOnStandardPckgsLst[k].chrge_at) + " + " + (this.addOnStandardPckgsLst[k].gst_at == null ? 0 : this.addOnStandardPckgsLst[k].gst_at) + "(GST) = " + this.addOnStandardPckgsLst[k].ttl_cst;
        }
        // console.log(this.addOnStandardPckgsLst);
        this.columnDefs = [
          { headerName: 'Sno', field: 'indx', cellClass: 'pm-grid-number-cell', width: 50, alignment: 'center', sortable: true, filter: false },
          { headerName: 'Package Name', field: 'pckge_nm', cellClass: 'pm-grid-number-cell', alignment: 'left', width: 250, sortable: true, filter: true },
          { headerName: 'Amount', field: 'tot_amt', cellClass: 'pm-grid-number-cell', width: 200, alignment: 'right', sortable: true, filter: true },
          // { headerName: 'GST', field: 'gst_at', cellClass: 'pm-grid-number-cell', width: 50, sortable: true, filter: true },
          // { headerName: 'Total', field: 'ttl_cst', cellClass: 'pm-grid-number-cell', width: 50, sortable: true, filter: true },
          { headerName: 'Total Channels', field: 'chnls_cnt', cellClass: 'pm-grid-number-cell', width: 100, alignment: 'center', sortable: true, filter: true }
        ];
      }
      else {
        this.addOnStandardPckgsLst = [];
      }
    }, (err) => {
      this.addOnStandardPckgsLst = [];
    });
  }

  getChanneslList = (chl) => {
    this.ChanlArry = [];
    chl.component.collapseAll(-1);
    // console.log(chl.key.srvcpk_id);
    this.crdsrv.get(`addons/getChannels/${chl.key.srvcpk_id}`).subscribe((res) => {
      // console.log(res['status']);
      if (res['status'] == 200) {
        if (res['data'].length > 0) {
          // console.log(res['data']);
          this.ChanlArry = res['data'];
          chl['chnls_lst'] = res['data'];
          chl.chnls_cnt = chl['chnls_lst'].length;
          let sindx = 0;
          let ct = 0;
          for (let k = 0; k < chl.chnls_cnt.length; k++) {
            sindx = sindx + 1;
            chl['chnls_lst'][k].indx = sindx;
            // console.log(chl);
            this.channels.chnle_id = chl.chnls_lst[k].chnle_id;
            this.channels.chnle_nm = chl.chnls_lst[k].chnle_nm;
            this.channels.srvcpk_id = chl.chnls_lst[k].srvcpk_id;
            this.channels.indx = chl.chnls_lst[k].indx;
          }
          // console.log(this.channels);
          // this.ChanlArry.push(this.channels);
          // console.log(this.ChanlArry);
          this.ChanlArry.filter(c => {
            c['s_no'] = ++ct;
          });
          this.view = true;
        }
      }
    });
  }

  addOnPckgsSlctd(data): any {
    // console.log(data);
    this.slctdAllPckgs = data.selectedRowsData;
    if (this.slctdAllPckgs.length == 0) {
      this.shwSveBtn = false;
    } else {
      this.shwSveBtn = true;
    }
  }
  saveAddonPckgs(): any {
    let extrnl_api_srvc_pack_lst = [];
    // console.log(this.slctdAllPckgs);
    this.slctdAllPckgs.filter((k) => {
      extrnl_api_srvc_pack_lst.push({
        'servicepack': k.pckge_nm,
        'expirydate': k.extrnl_api_expry_dt
      });
    });
    // console.log(this.cafDtlsData);
    // console.log(this.cstmrData);
    const extrnl_api_post_json = {
      'subscribercode': this.cafDtlsData[0].mdlwe_sbscr_id,
      'servicepacks': extrnl_api_srvc_pack_lst
    };
    const fnlPckgeData = {
      agntId: this.usrDtls.mrcht_usr_id,
      caf_id: this.cafDtlsData[0].caf_id,
      pckg_lst: this.slctdAllPckgs,
      extrnl_api_post_json: extrnl_api_post_json
    };
    // console.log(fnlPckgeData);
    // return;
    this.crdsrv.create(fnlPckgeData, 'addons/addCafPckgs').subscribe((res) => {
      if (res['status'] == 200) {
        this._snackBar.open('Successfully Addons added', '', {
          duration: 2000,
          panelClass: ['blue-snackbar'],
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
      }
      else{
        this._snackBar.open('Something Went Wrong ', '', {
          duration: 2000,
          panelClass: ['red-snackbar'],
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
      }
    })
  }

  getRmvePckgesData(): any {
    this.crdsrv.get(`addons/getAddonsFromCAF/${this.cafDtlsData[0].caf_id}`).subscribe((res) => {
      if (res['status'] == 200) {
        if (res['data'].length > 0) {
          res['data'].filter((k) => {
            k['expanded'] = false;
            k['isChecked'] = false;
          });
          this.removeAddonPckgs = res['data'];
          // console.log(this.removeAddonPckgs);
          let index = 0;
          for (let k = 0; k < this.removeAddonPckgs.length; k++) {
            index = index + 1;
            this.removeAddonPckgs[k].indx = index;
          }
          this.rmvAddonscolumnDefs = [
            { headerName: 'Sno', field: 'indx', algnmnt: 'center', cellClass: 'pm-grid-number-cell', width: 50, sortable: true, filter: false },
            { headerName: 'Package Name', field: 'pckge_nm', cellClass: 'pm-grid-number-cell', width: 200, sortable: true, filter: true },
            { headerName: 'Charge', field: 'chrge_at', cellClass: 'pm-grid-number-cell', width: 200, sortable: true, filter: true },
            { headerName: 'GST', field: 'gst_at', cellClass: 'pm-grid-number-cell', width: 200, sortable: true, filter: true },
            { headerName: 'Total', field: 'ttl_cst', cellClass: 'pm-grid-number-cell', width: 200, sortable: true, filter: true },
            { headerName: 'Total Channels', field: 'chnls_cnt', cellClass: 'pm-grid-number-cell', width: 200, sortable: true, filter: true }
          ];
        }
      }
    });
  }

  addOnPckgsSlctdFrDlt(data): any {
    // console.log(data);
    this.slctdAllPckgsFrDlt = data.selectedRowsData;
    if (this.slctdAllPckgsFrDlt.length == 0) {
      this.shwRmBtn = false;
    } else {
      this.shwRmBtn = true;
    }
  }

  removeAddonPckgsFn(): any {
    // console.log(this.slctdAllPckgsFrDlt);
    // console.log(this.comment);

    if (this.comment == undefined || this.comment == null || this.comment == ''){
      this._snackBar.open('Plase write the comment for removing the packages', '', {
        duration: 2000,
        panelClass: ['red-snackbar'],
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition
      });
    } else {
      if (this.slctdAllPckgsFrDlt.length > 0) {
        let extrnl_api_srvc_pack_lst = [];
        this.slctdAllPckgsFrDlt.filter((k) => {
          extrnl_api_srvc_pack_lst.push({
            'servicepack': k.pckge_nm,
            'reason': this.comment
          });
        });
  
        let extrnl_api_post_json = {
          'subscribercode': this.cafDtlsData[0].mdlwe_sbscr_id,
          'servicepacks': extrnl_api_srvc_pack_lst
        };
  
        const fnlRmPckgeData = {
          agntId: this.usrDtls.mrcht_usr_id,
          caf_id: this.cafDtlsData[0].caf_id,
          pckg_lst: this.slctdAllPckgsFrDlt,
          extrnl_api_post_json: extrnl_api_post_json
        };
        // console.log(fnlRmPckgeData);
        this.crdsrv.create(fnlRmPckgeData, 'addons/removeAddons').subscribe((res) => {
          if (res['status'] == 200) {
            this._snackBar.open('Successfully Addons removed', '', {
              duration: 2000,
              panelClass: ['blue-snackbar'],
              horizontalPosition: this.horizontalPosition,
              verticalPosition: this.verticalPosition,
            });
          }
          else {
            this._snackBar.open("Something Went Wrong ", '', {
              duration: 2000,
              panelClass: ['red-snackbar'],
              horizontalPosition: this.horizontalPosition,
              verticalPosition: this.verticalPosition,
            });
          }

        })
      }
    }
  }
}
