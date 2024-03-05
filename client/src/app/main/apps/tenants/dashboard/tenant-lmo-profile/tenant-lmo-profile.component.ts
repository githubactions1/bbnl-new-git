import { Component, OnInit,Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CrudService } from 'app/main/apps/crud.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { TransfereService } from 'app/providers/transfer/transfer.service';
import { CustomerProfileComponent } from 'app/main/apps/caf/master/customer/customer-profile/customer-profile.component';
import {
  MatTableDataSource, MatPaginator, MatSort, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition, MatDialogRef, MatSnackBar, MatDialog,
  MAT_DIALOG_DATA
} from '@angular/material';
import { DsSidebarService } from '@glits/components/sidebar/sidebar.service';
import * as _ from 'lodash';
// import { DeleteDialogComponent } from 'app/main/shared/components/delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-tenant-lmo-profile',
  templateUrl: './tenant-lmo-profile.component.html',
  styleUrls: ['./tenant-lmo-profile.component.scss']
})
export class TenantLmoProfileComponent implements OnInit {
  @Input() agentdata: any;
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  agnt_id;
  agntPrtAsgn: any;
  agntcafdta: any;
  pckgedta: any;
  agntDtls: any;
  Company;
  columnDefs = [];
  packagecolumnDefs = [];
  permissions: { 'slct_in': number, 'insrt_in': number, 'updt_in': number, 'dlte_in': number, 'exprt_in': number };
  usrDtls: any;
  agntPymntsForm: FormGroup;
  agntPymntLst: any;
  dataSource: any;
  agrmntDtls: any;
  shwLdr = false;
  masterDetailTxt;
  agnt_dtls: any;
  slctdyear: any;
  shwPckgeAddBtn : boolean= false;
  activeLbl;
  monThWiseData: any;
  months: any;
  pkgeData;
  gridColumnDefs = [];
  year;
  custmerWiseData: any;
  custmerWisedetailsData: any;
  pckgeDtls = false;
  partnersDtls: any;
  agntSumary: any;
  public cstmrData: any;
  customerDefs = [];
  // confirmDialogRef: MatDialogRef<DeleteDialogComponent>;
  // dataSourceSumary: any;
  // columnDefsSumary =[];
  monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  // tslint:disable-next-line:typedef
  // getHeaderDtls = function () { return { 'title': 'LMO Profile', 'icon': 'account_box' }; };

  srch_cntrl = {
    srch_txt: '',
    srch_ldng: false,
    lmt_pstn: 1,
    pcge_mde: '1',
    agntId: ''
  };
  addOnStandardPckgsLst = [];
  ChanlArry: any[];
  channels: any;
  view: boolean;
  hsiPckgsData: any;
  cafHsiMnthPckgsData: any;
  removeAddonPckgs: any;
  rmvAddonscolumnDefs = [];
  cafDtlsData: any[];
  cstmr_caf_cntrl = {
    caf_type_id: 0,
    caf_msg_txt: '',
    slctd_caf_id: 0,
    mdlwe_sbscr_id: '',
  };
  cafnumbr: any;
  pckgeCstmrData: any;
  cstmrDtlsTbl: boolean;
  slctdAllPckgs: any;
  shwSveBtn = false;
  fnlChckdData: any[];
  cstmrPkgeData: any;
  comment: any;
  slctdAllPckgsFrDlt: any;
  shwRmBtn: boolean;
  shwPckgeLdr: boolean;
  selectedPckgeIndex = 0;
  stepper: any;
  
  constructor(private route: ActivatedRoute, public crdsrv: CrudService, public router: Router, private fb: FormBuilder, public datePipe: DatePipe,
    public transfereService: TransfereService, public dialog: MatDialog, public dialogRef: MatDialogRef<CustomerProfileComponent>, public snackBar: MatSnackBar
    , private _dsSidebarService: DsSidebarService) {
    this.permissions = { 'slct_in': 1, 'insrt_in': 1, 'updt_in': 1, 'dlte_in': 1, 'exprt_in': 1 };
    // if()
    // console.log(this.transfereService.getLoclData('data'));
    if (this.transfereService.getLoclData('data') != null) {
      this.agnt_dtls = this.transfereService.getLoclData('data');
      // console.log(this.agnt_dtls.agnt_id);
      this.agnt_id = this.agnt_dtls.agnt_id;
    } else if(this.agentdata){
      console.log(this.agentdata)
      // this.route.paramMap.subscribe(params => {
      //   this.usrDtls = JSON.parse(localStorage.getItem('usrDtls'));
        this.showagentdata;
      // });
  } else {
      this.route.paramMap.subscribe(params => {
        this.usrDtls = JSON.parse(localStorage.getItem('usrDtls'));
        this.agnt_id = this.usrDtls.usr_ctgry_ky;
      });
    }
    this.months = [{ mnth_nm: 'January', mnth_id: 1 },
    { mnth_nm: 'February', mnth_id: 2 },
    { mnth_nm: 'March', mnth_id: 3 },
    { mnth_nm: 'April', mnth_id: 4 },
    { mnth_nm: 'May', mnth_id: 5 },
    { mnth_nm: 'June', mnth_id: 6 },
    { mnth_nm: 'July', mnth_id: 7 },
    { mnth_nm: 'August', mnth_id: 8 },
    { mnth_nm: 'September', mnth_id: 9 },
    { mnth_nm: 'October', mnth_id: 10 },
    { mnth_nm: 'November', mnth_id: 11 },
    { mnth_nm: 'December', mnth_id: 12 }];
    // tslint:disable-next-line:max-line-length
    this.year = [{ yr_nm: 2016, yr_id: 2016 }, { yr_nm: 2017, yr_id: 2017 }, { yr_nm: 2018, yr_id: 2018 }, { yr_nm: 2019, yr_id: 2019 }, { yr_nm: 2020, yr_id: 2020 }, { yr_nm: 2021, yr_id: 2021 },{ yr_nm: 2022, yr_id: 2022 },{ yr_nm: 2023, yr_id: 2023 }]

  }

  ngOnInit(): any {
    this.agntPymntsForm = this.fb.group({
      pymntFrmDt: [''],
      pymntToDt: ['']
    });
	this.usrDtls = JSON.parse(localStorage.getItem('usrDtls'));
    if (this.usrDtls.usr_ctgry_id == 8) {
      this.shwPckgeAddBtn = true;
    } else {
      this.shwPckgeAddBtn = false;
    }
    
    // this.getUsrPymnts();
    this.getAgntPackgeAgrmnt();
    this.getAgntDtls();
    // this.getAgntLmoCafDtls();
    // this.getAgntPrtAsgnmnt().then(res => this.gettabs());
    this.gettabs();
    // this.getPackageDtls()
    // console.log(this.route.snapshot.queryParamMap);
    // this.route.queryParams.subscribe(params => {
    //   const userId = params['Id'];
    //   // console.log(userId);
    // });

  }

  ngOnChanges(): any {
    this.showagentdata();
  }

  showagentdata(): any {
    this.route.params.subscribe((params) => {
      this.agnt_id = this.agentdata.agnt_id;
      console.log(this.agnt_id)
      this.selectedPckgeIndex = 0;
      // console.log(this.cafDtls);
      // this.getUsrPermissions();
    });
  }


  getPackageDtls() {
    this.pckgeDtls = false;
    this.shwLdr = true;
    // console.log(this.agnt_id)
    const rte = 'caf/customer/package/Agntwise/' + this.agnt_id;
    // console.log(rte)
    this.crdsrv.get(rte).subscribe((res) => {
      this.pkgeData = res['data'];
      this.shwLdr = false;
      // console.log(this.pkgeData);
      let index = 0;
      for (let i = 0; i < this.pkgeData.length; i++) {
        if (this.pkgeData[i].plan_exp == '31-12-9999') {
          this.activeLbl = true;
        } else {
          this.activeLbl = false;
        }
        index = index + 1;
        this.pkgeData[i].indx = index
      }
      this.pckgeDtls = true;
      this.packagecolumnDefs = [
        { headerName: 'Sno', field: 'indx', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 100, filter: false },
        { headerName: 'Package Name', field: 'pckge_nm', alignment: 'left', cellClass: 'pm-grid-number-cell', width: 210, filter: false, search: false },
        { headerName: 'Service Package', field: 'srvcpk_nm', alignment: 'left', cellClass: 'pm-grid-number-cell', width: 340, filter: false },
        { headerName: 'Core Service Name', field: 'cre_srvce_nm', alignment: 'left', cellClass: 'pm-grid-number-cell', width: 180, filter: false },
        { headerName: 'Package Charges', field: 'chrge_at', alignment: 'right', cellClass: 'pm-grid-number-cell', width: 150, filter: false },
        { headerName: 'Package GST Charges', field: 'gst_at', alignment: 'right', cellClass: 'pm-grid-number-cell', width: 150, filter: false },
        {
          headerName: 'Package Activation', field: 'plan_act', alignment: 'center', hide: ((this.activeLbl) == true) ? true : false,
          cellClass: 'pm-grid-number-cell', width: 150, filter: false
        },
        {
          headerName: 'Package Expiry', field: 'plan_exp', alignment: 'center', hide: ((this.activeLbl) == true) ? true : false,
          cellClass: 'pm-grid-number-cell', width: 180, filter: false
        },

      ];
      this.getIptvPckgesData();
    });

  }
  onPackge(e) {
    e.toolbarOptions.items.unshift({
      location: 'after',
      widget: 'dxButton',
      options: {
        icon: 'user',
        text: 'Purchase/Remove Addon Packages',
        onClick: this.openPckgeSideBar.bind(this, 'addPckgeFormPanel'),
        // this.roteNavigate.bind(this, 'addFormPanel')
        bindingOptions: {
          'disabled': 'isEmailButtonDisabled'
        }
      }
    });
  }

  getcafdetails(): any {
    this.cstmrDtlsTbl = false;
    // console.log(this.cafnumbr)
    const req_body = {
      agntId: this.agnt_id == undefined ? 0 : this.agnt_id,
      CAf: this.cafnumbr
    };
    // console.log(req_body);
    this.cstmr_caf_cntrl.caf_type_id = 0;
    this.cstmr_caf_cntrl.caf_msg_txt = '';
    this.cstmr_caf_cntrl.slctd_caf_id = 0;
    this.cstmr_caf_cntrl.mdlwe_sbscr_id = '';
    this.crdsrv.create(req_body, 'caf/getdt').subscribe((res) => {
      // this.cafDtls = res['data'];
      // console.log(res['data']);
      if (res['status'] == 200) {
        if (res['data'].length > 0) {
          this.cstmrDtlsTbl = true;
          this.cstmr_caf_cntrl.caf_type_id = res['data'][0]['caf_type_id'];
          if (this.cstmr_caf_cntrl.caf_type_id == 1) {
            this.pckgeCstmrData = res['data'];
            this.cstmr_caf_cntrl.caf_msg_txt = '';
            this.cstmr_caf_cntrl.slctd_caf_id = res['data'][0]['caf_id'];
            this.cstmr_caf_cntrl.mdlwe_sbscr_id = res['data'][0]['mdlwe_sbscr_id'];
          }
          else if (this.cstmr_caf_cntrl.caf_type_id == 2) {
            this.pckgeCstmrData = [];
            this.cstmr_caf_cntrl.caf_msg_txt = `${this.cafnumbr} NO IPTV CAF.`;
            this.cstmr_caf_cntrl.slctd_caf_id = 0;
            this.cstmr_caf_cntrl.mdlwe_sbscr_id = '';
          }
          // let fourIndx=0;
          // for(let h=0; h<this.cstmrData.length; h++){
          //   fourIndx= fourIndx+1;
          //   this.cstmrData[h].indx=fourIndx
          // }
          // this.lastTableView=true;
          // console.log(this.pckgeCstmrData);
          let ct = 0;
          this.pckgeCstmrData.filter(k => {
            k['sno'] = ++ct;
          });
          this.customerDefs = [
            { headerName: 'Sno', field: 'sno', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 50, sortable: true, filter: false },
            { headerName: 'FirstName', field: 'cstmr_nm', alignment: 'left', cellClass: 'pm-grid-number-cell', width: 200, sortable: true, filter: true },
            { headerName: 'Last Name', field: 'lst_nm', alignment: 'left', cellClass: 'pm-grid-number-cell', width: 150, sortable: true, filter: true },
            { headerName: 'Status', field: 'sts_nm', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 150, sortable: true, filter: true },
            { headerName: 'CAF NO', field: 'caf_nu', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 140, sortable: true, filter: true },
            { headerName: 'Package', field: 'pckge_nm', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 120, sortable: true, filter: true },
            { headerName: 'Mobile No', field: 'mbl_nu', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 120, sortable: true, filter: true },
            { headerName: 'Activation Date', field: 'actvn_dt', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 130, sortable: true, filter: true }
          ];
        }

      }
      else {
        this.snackBar.open('Something Went Wrong ', '', {
          duration: 2000,
          panelClass: ['red-snackbar'],
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
      }
    });
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

  openPckgeSideBar(key): any {
    this._dsSidebarService.getSidebar('addPckgeFormPanel').toggleOpen();
  }

  closePckgeSideBar(): any {
    this.selectedPckgeIndex = 0;
    this.cstmrDtlsTbl = false;
    this.cafnumbr = '';
    this._dsSidebarService.getSidebar('addPckgeFormPanel').toggleOpen();
  }
  getHsiPckgesData(): any {
    const data = {
      agnt_id: this.agnt_id
    };
    this.crdsrv.create(data, 'addons/packages/agent/addons/hsi').subscribe((res) => {
      // console.log(res['data']);
      this.hsiPckgsData = res['data'];
    });

    const rte = 'caf/customer/package/' + this.pckgeCstmrData[0].caf_id;
    // console.log(rte)
    this.crdsrv.get(rte).subscribe((res) => {
      this.cstmrPkgeData = res['data'];
      // console.log(this.cstmrPkgeData);
      this.shwLdr = false;
    });

    this.crdsrv.get('package/hsi/monthly/details/caf/' + this.pckgeCstmrData[0].caf_id).subscribe((res) => {
      // console.log(res['data']);
      this.cafHsiMnthPckgsData = res['data'];
    });
  }

  getIptvPckgesData(): any {
    this.crdsrv.create(this.srch_cntrl, 'addons/packages/addons/channels').subscribe((res) => {
      // console.log(res);
      // console.log(res['data']);
      if (res['status'] == 200) {
        // this.loader = false;
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
          this.addOnStandardPckgsLst[k].tot_amt = '' + (this.addOnStandardPckgsLst[k].chrge_at == null ? 0 : this.addOnStandardPckgsLst[k].chrge_at) + ' + ' + (this.addOnStandardPckgsLst[k].gst_at == null ? 0 : this.addOnStandardPckgsLst[k].gst_at) + '(GST) = ' + this.addOnStandardPckgsLst[k].ttl_cst;
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

  getRmvePckgesData(): any {
    this.cafDtlsData = [];
    // console.log(this.pckgeCstmrData);
    this.crdsrv.get(`addons/getAddonsFromCAF/${this.pckgeCstmrData[0].caf_id}`).subscribe((res) => {
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
            { headerName: 'Sno', field: 'indx', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 50, sortable: true, filter: false },
            { headerName: 'Package Name', field: 'pckge_nm', alignment: 'left', cellClass: 'pm-grid-number-cell', width: 150, sortable: true, filter: true },
            { headerName: 'Charge', field: 'chrge_at', alignment: 'right', cellClass: 'pm-grid-number-cell', width: 100, sortable: true, filter: true },
            { headerName: 'GST', field: 'gst_at', alignment: 'right', cellClass: 'pm-grid-number-cell', width: 100, sortable: true, filter: true },
            { headerName: 'Total', field: 'ttl_cst', alignment: 'right', cellClass: 'pm-grid-number-cell', width: 100, sortable: true, filter: true },
            { headerName: 'Total Channels', field: 'chnls_cnt', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 100, sortable: true, filter: true }
          ];
        }
      }
    });
  }

  

  roteNavigate(key) {
    // console.log('i am there2');
    this.router.navigate(['/admin/caf/customer/service-pack'], { queryParams: { 'paramsdata': true }, skipLocationChange: true })
  }
  tabChangeFn(event): any {
    this.shwLdr = true;
    // console.log(event.index);
    if (event.index === 0) {
      this.getAgntPackgeAgrmnt();
    } else if (event.index === 1) {
      this.getAgntLmoCafDtls();
    } else if (event.index === 2) {
      this.getAgntPrtAsgnmnt();
    } else if (event.index === 3) {
      this.getPackageDtls();
    } else if (event.index === 4) {
      this.getAgntCpeStck();
    } else if (event.index === 5) {
      this.getrevenuesharngByYear();
    }
    // else if (event.index === 5){
    //   this.getAgntSrleteas();
    // } 
    // else if (event.index === 5) {
    //   this.agntColctns(); 
    // } 
    else if (event.index === 6) {
      this.getUsrPymnts();
    } else if (event.index == 7) {
      this.getSumary();
    }
    // else if(event.index == 7){
    //   // console.log('i am heererererererer');
    //   this.getPackageDtls();
    // }
    // else if (event.index === 7){
    //   this.getAgntEvents();  
    // }else if (event.index === 8){
    //   this.getAgntSprtTckts();
    // }
  }


  // Package agreegment
  getAgntPackgeAgrmnt(): any {
    // tslint:disable-next-line:quotemark
    this.masterDetailTxt = true;
    const rte = `package/select_packageAgreement/${this.agnt_id}`;
    this.crdsrv.get(rte).subscribe((res) => {
      this.dataSource = res['data'];
      this.shwLdr = false;
      let index = 0;
      for (let k = 0; k < this.dataSource.length; k++) {
        index = index + 1;
        this.dataSource[k].indx = index;
      }
      if (res['status'] === 200) {
        this.columnDefs = [
          { headerName: 'S.No', field: 'indx', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 70, sortable: true, filter: false, columnFiltering: false },
          { headerName: 'Package Agreement Date', alignment: 'center', field: 'pckge_agrmt_dt', cellClass: 'pm-grid-number-cell', width: 200, columnFiltering: false },
          // tslint:disable-next-line:max-line-length
          { headerName: 'Approve Date', alignment: 'center', field: 'aprve_ts', cellClass: 'pm-grid-number-cell', width: 150, sortable: true, filter: true, columnFiltering: false },
          { headerName: 'Description', field: 'aprve_cmnt_tx', cellClass: 'pm-grid-number-cell', width: 180, sortable: true, filter: true, columnFiltering: false },
          { headerName: 'Approve By', field: 'aprve_usr_nm', cellClass: 'pm-grid-number-cell', width: 150, sortable: true, filter: true, columnFiltering: false },
          { headerName: 'Created On', field: 'i_ts', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 120, sortable: true, filter: true, columnFiltering: false },
          // tslint:disable-next-line:max-line-length
          { headerName: 'Packages Count', field: 'pckg_ct', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 140, sortable: true, filter: true, columnFiltering: false },
          {
            headerName: 'Base Packages Count', field: 'bsepckg_ct', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 160,
            sortable: true, filter: true, columnFiltering: false
          },
          {
            headerName: 'AddOn Packages Count', field: 'addpckg_ct', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 160,
            sortable: true, filter: true, columnFiltering: false
          },
          { headerName: 'Partners', field: 'agnt_cds', alignment: 'left', cellClass: 'pm-grid-number-cell', width: 120, sortable: true, filter: true, columnFiltering: false },
        ];
      }
    });
  }

  // port assignment
  getAgntPrtAsgnmnt(): any {
    this.masterDetailTxt = false;
    const rte = `olt/olt/ports/agent/${this.agnt_id}`;
    return new Promise((resolve, reject) => {
      this.crdsrv.get(rte).subscribe((res) => {
        let ct = 0;
        this.agntPrtAsgn = res['data'];
        this.shwLdr = false;
        this.dataSource = this.agntPrtAsgn;
        this.dataSource.filter((k) => {
          k['sno'] = ++ct;
        });
        this.columnDefs = [{ headerName: 'S.No', field: 'sno', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 60, height: 40, columnFiltering: false },
        {
          headerName: 'Sub Station Name', field: 'sbstn_nm', alignment: 'left', cellClass: 'pm-grid-number-cell',
          width: 200, height: 40, columnFiltering: false, filter: true
        },
        {
          headerName: 'Sub Station Type', field: 'sbstn_type_nm', alignment: 'left', cellClass: 'pm-grid-number-cell',
          width: 200, height: 40, columnFiltering: false, filter: true
        },
        {
          headerName: 'OLT Name', field: 'olt_nm', alignment: 'left', cellClass: 'pm-grid-number-cell', width: 200,
          height: 40, columnFiltering: false, filter: true
        },
        {
          headerName: 'OLT Port Name', field: 'olt_prt_nm', alignment: 'left', cellClass: 'pm-grid-number-cell', width: 170,
          height: 40, columnFiltering: false, filter: true
        },
        {
          headerName: 'OLT Port IP Address', field: 'olt_ip_addr_tx', alignment: 'center', cellClass: 'pm-grid-number-cell',
          width: 180, height: 40, columnFiltering: false, filter: true
        },
        {
          headerName: 'OLT Port Serial No', field: 'olt_srl_nu', alignment: 'center', cellClass: 'pm-grid-number-cell',
          width: 180, height: 40, columnFiltering: false, filter: true
        },
        {
          headerName: 'OLT Access Node', field: 'olt_acs_nde_id', alignment: 'center', cellClass: 'pm-grid-number-cell',
          width: 180, height: 40, columnFiltering: false, filter: true
        },
        {
          headerName: 'OLT Label No', field: 'olt_lble_nu', alignment: 'center', cellClass: 'pm-grid-number-cell',
          width: 180, height: 40, columnFiltering: false, filter: true
        },
        {
          headerName: 'Mandal Name', field: 'mndl_nm', alignment: 'left', cellClass: 'pm-grid-number-cell',
          width: 180, height: 40, columnFiltering: false, filter: true
        }];

        if (this.agntPrtAsgn.length > 0) {
          resolve();
        }
      });
    });
  }

  getAgntLmoCafDtls(): any {
    // tslint:disable-next-line:quotemark
    this.masterDetailTxt = false;
    const rte = `caf/getAgntCafDetails`;
    const data = {
      agntId: this.agnt_id
    };
    // const rte = `inventory/getAgentCpeStock/${this.agnt_id}`;
    this.crdsrv.create(data, rte).subscribe((res) => {
      this.agntcafdta = res['data'];
      // console.log(this.agntcafdta);
      this.shwLdr = false;
      this.dataSource = this.agntcafdta;
      // for (let p = 0; p < this.dataSource.length; p++) {
      //   this.dataSource[p]['cstmr_nm'] = this.dataSource[p].cstmr_fst_nm + this.dataSource[p].cstmr_lst_nm;
      // }
      this.columnDefs = [{ headerName: 'S.No', field: 'sno', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 60, height: 40, columnFiltering: false },
      { headerName: 'CAF Number', field: 'caf_nu', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 150, height: 40, columnFiltering: false, filter: true },
      { headerName: 'Profile', field: 'Profile', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 100, height: 40, columnFiltering: false, filter: true },
      { headerName: 'Customer Name', field: 'cstmr_nm', alignment: 'left', cellClass: 'pm-grid-number-cell', width: 200, height: 40, columnFiltering: false, filter: true },
      // tslint:disable-next-line:max-line-length
      { headerName: 'Customer Mobile', field: 'cntct_mble1_nu', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 150, height: 40, columnFiltering: false, filter: true },
      { headerName: 'Activation Date', field: 'actvnDt', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 120, height: 40, columnFiltering: false, filter: true },
      { headerName: 'CAF Type', field: 'caf_type_nm', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 150, height: 40, columnFiltering: true, filter: false },
      { headerName: 'Base Package', field: 'pckge_nm', alignment: 'left', cellClass: 'pm-grid-number-cell', width: 150, height: 40, columnFiltering: false, filter: true },
	  { headerName: 'Suspend Date', field: 'spnd_ts', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 150, height: 40, columnFiltering: false, filter: true },
      { headerName: 'Resume Date', field: 'rsme_ts', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 150, height: 40, columnFiltering: false, filter: true },
      { headerName: 'SuspendDays', field: 'SuspendDays', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 150, height: 40, columnFiltering: false, filter: true },
      { headerName: 'ActiveDays', field: 'ActiveDays', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 150, height: 40, columnFiltering: false, filter: true },
      { headerName: 'HSI USAGE (GB)', field: 'HSI USAGE (GB)', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 150, height: 40, columnFiltering: false, filter: true },
      { headerName: 'Status', field: 'sts_nm', alignment: 'left', cellClass: 'pm-grid-number-cell', width: 150, height: 40, columnFiltering: false, filter: true },
      { headerName: 'Billing Frequency', field: 'frqncy_nm', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 120, height: 40, columnFiltering: false, filter: true }];
    });
  }

  // Agent payments
  getUsrPymnts(): any {
    // tslint:disable-next-line:quotemark
    this.masterDetailTxt = false;
    const pymntData = {
      frmDt: this.agntPymntsForm.value.pymntFrmDt !== '' ? this.datePipe.transform(this.agntPymntsForm.value.pymntFrmDt, 'yyyy-MM-dd') : '',
      toDt: this.agntPymntsForm.value.pymntToDt !== '' ? this.datePipe.transform(this.agntPymntsForm.value.pymntToDt, 'yyyy-MM-dd') : '',
      agntId: this.agnt_id
    };

    const rte = `billing/payments/agent`;
    this.crdsrv.create(pymntData, rte).subscribe((res) => {
      if (res['status'] === 200) {
        this.agntPymntLst = res['data'];
        this.shwLdr = false;
        let ct = 0;
        this.dataSource = this.agntPymntLst;
        this.dataSource.filter(k => {
          k['s_no'] = ++ct;
        });
        this.columnDefs = [
          { headerName: 'S.No', field: 's_no', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 60, height: 40, columnFiltering: false },
          // { headerName: 'LMO Name', field: 'agnt_nm', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 200, height: 40, columnFiltering: false,  filter: true },
          // { headerName: 'LMO Code', field: 'agnt_cd', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 200, height: 40, columnFiltering: false,  filter: true },
          { headerName: 'Payment Mode', field: 'pymnt_mde_nm', alignment: 'left', cellClass: 'pm-grid-number-cell', width: 200, height: 40, filter: false, columnFiltering: true },
          // tslint:disable-next-line:max-line-length
          { headerName: 'Transaction Amount', field: 'trnsn_at', alignment: 'right', type: 'currency', currency: 'INR', precision: '2', cellClass: 'pm-grid-number-cell', width: 200, height: 40, columnFiltering: false, filter: true },
          {
            headerName: 'Transaction Date', field: 'trsn_dt', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 200, height: 40,
            columnFiltering: false, filter: true
          },
          {
            headerName: 'Transaction Cateogory', field: 'trnsn_ctgry_nm', alignment: 'left', cellClass: 'pm-grid-number-cell', width: 200,
            height: 40, columnFiltering: false, filter: true
          },
          { headerName: 'Bank Name', field: 'trnsn_bnk_nm', alignment: 'left', cellClass: 'pm-grid-number-cell', width: 200, height: 40, columnFiltering: false, filter: true },
          {
            headerName: 'Bank Reference Number', field: 'trns_ref_nu', alignment: 'center', cellClass: 'pm-grid-number-cell',
            width: 200, height: 40, columnFiltering: false, filter: true
          },
        ];
      }
    });
  }

  getSumary(): any {
    // tslint:disable-next-line:quotemark
    this.masterDetailTxt = false;
    const pymntData = {
      // frmDt: this.agntPymntsForm.value.pymntFrmDt !== '' ? this.datePipe.transform(this.agntPymntsForm.value.pymntFrmDt, 'yyyy-MM-dd') : '',
      // toDt: this.agntPymntsForm.value.pymntToDt !== '' ? this.datePipe.transform(this.agntPymntsForm.value.pymntToDt, 'yyyy-MM-dd') : '',
      agntId: this.agnt_id
    };

    const rte = `caf/getAgntSummaryDetails`;
    this.crdsrv.create(pymntData, rte).subscribe((res) => {
      if (res['status'] === 200) {
        for (let i = 0; i < res['data'].length; i++) {
          res['data'][i]['month'] = this.monthNames[res['data'][i].oprtn_mm - 1];
        }
        this.agntSumary = res['data'];
        this.shwLdr = false;
        this.dataSource = this.agntSumary;
        this.columnDefs = [
          { headerName: 'S.No', field: 'sno', alignment: 'center', cellClass: 'pm-grid-number-cell', columnFiltering: false, filter: false, width: 60, height: 40 },
          { headerName: 'Year', field: 'oprtn_yr', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 150, height: 40, columnFiltering: false, filter: true },
          { headerName: 'Month', field: 'month', alignment: 'left', cellClass: 'pm-grid-number-cell', width: 150, height: 40, columnFiltering: false, filter: true },
          {
            headerName: 'Suspended CAF', field: 'spnd_caf_ct', alignment: 'center', cellClass: 'pm-grid-number-cell',
            width: 150, height: 40, columnFiltering: false, filter: true
          },
          { headerName: 'Resumed CAF', field: 'rsmed_caf_ct', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 150, height: 40, columnFiltering: false, filter: true },
          { headerName: 'New CAF', field: 'nw_caf_ct', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 150, height: 40, columnFiltering: false, filter: true },
          // tslint:disable-next-line:max-line-length
          { headerName: 'Terminated CAF', field: 'trmnd_caf_ct', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 150, height: 40, columnFiltering: false, filter: true },
          { headerName: 'Box change', field: 'box_chnge_ct', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 150, height: 40, columnFiltering: false, filter: true },
          { headerName: 'PON change', field: 'pon_chnge_ct', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 150, height: 40, columnFiltering: false, filter: true },
          // tslint:disable-next-line:max-line-length
          { headerName: 'Allowed/Issued box', field: 'altd_bx_ct', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 150, height: 40, columnFiltering: false, filter: true },

        ];
      }
    });
  }

  // Package agreegment
  getAgntCpeStck(): any {
    // tslint:disable-next-line:quotemark
    this.masterDetailTxt = false;
    const rte = `inventory/getAgentCpeStock/prdctId/${this.agnt_id}/${1}`;
    this.crdsrv.get(rte).subscribe((res) => {
      this.dataSource = res['data'];
      this.shwLdr = false;
      let index = 0;
      this.dataSource.filter((k) => {
        k['sno'] = ++index;
      });
      if (res['status'] === 200) {
        this.columnDefs = [
          { headerName: 'S.No', field: 'sno', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 70, sortable: true, filter: false, columnFiltering: false },
          { headerName: 'CPE Serial No', field: 'srl_nu', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 260, columnFiltering: false },
          { headerName: 'CPE MAC Address', field: 'mac_addr_cd', alignment: 'left', cellClass: 'pm-grid-number-cell', width: 180, sortable: true, filter: true, columnFiltering: false },
          { headerName: 'Product Name', field: 'prdct_nm', alignment: 'left', cellClass: 'pm-grid-number-cell', width: 180, sortable: true, filter: true, columnFiltering: false },
          { headerName: 'Product Model', field: 'mdle_nm', alignment: 'left', cellClass: 'pm-grid-number-cell', width: 180, sortable: true, filter: true, columnFiltering: false },
          { headerName: 'Date', field: 'btch_ts', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 140, sortable: true, filter: true, columnFiltering: false },
          { headerName: 'Connected CAF', field: 'caf_id', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 180, sortable: true, filter: true, columnFiltering: false },
          { headerName: 'CAF Status', field: 'sts_nm', alignment: 'left', cellClass: 'pm-grid-number-cell', width: 140, sortable: true, filter: true, columnFiltering: false },
          // { headerName: 'District', field: 'dstrt_nm', alignment: 'left', cellClass: 'pm-grid-number-cell', width: 140, sortable: true, filter: true },
          // { headerName: 'Mandal', field: 'mndl_nm', alignment: 'left', cellClass: 'pm-grid-number-cell', width: 160, 
          // sortable: true, filter: true },
          // { headerName: 'Village', field: 'vlge_nm', alignment: 'left', cellClass: 'pm-grid-number-cell', width: 160, 
          // sortable: true, filter: true },
        ];
      }
    });
  }

  // getAgntEvents(): any {
  //   this.shwLdr = false;
  //   this.dataSource = [];
  //   this.columnDefs = [];
  // }

  // getAgntSprtTckts(): any {
  //   this.shwLdr = false;
  //   this.dataSource = [];
  //   this.columnDefs = [];
  // }

  getAgntDtls(): any {
    // const rte = `agent/agnt_dtls/${this.agnt_id}`;
    const rte = `agent/agntdtls/${this.agnt_id}`;
    this.crdsrv.get(rte).subscribe((res) => {
      this.agntDtls = res['data'];
      // console.log(this.agntDtls);
    });
  }
  getrevenuesharngByYear() {
    let data = {
      yearid: this.slctdyear,
      agnt_id: this.agnt_id
    };
    let rte = `billing/revenue/sharing/lmo/monthly`;
    this.crdsrv.create(data, rte).subscribe((res) => {
      this.monThWiseData = res['data'];
      // console.log(this.monThWiseData);
      this.shwLdr = false;
      let index = 1;
      for (let i = 0; i < this.monThWiseData.length; i++) {
        this.monThWiseData[i]['sno'] = index++;
        for (let j = 0; j < this.months.length; j++) {
          if (this.monThWiseData[i].monthid == this.months[j].mnth_id) {
            this.monThWiseData[i]['monthname'] = this.months[j].mnth_nm;
          }
        }
      }
      // console.log(this.monThWiseData);
      if (res['status'] == 200) {
        this.gridColumnDefs = [
          { headerName: 'Sno', field: 'sno', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 90, sortable: true, filter: false, columnFiltering: false },
          // { headerName: 'LMO Code', field: 'agnt_cd', cellStyle: { 'text-align': 'center' }, cellClass: 'pm-grid-number-cell', width: 160 },
          { headerName: 'Year', field: 'year', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 160, columnFiltering: false },
          { headerName: 'Month', field: 'monthname', alignment: 'left', cellClass: 'pm-grid-number-cell', width: 160, columnFiltering: false },
          // tslint:disable-next-line:max-line-length
          { headerName: 'APSFL Share', field: 'apsflshare', alignment: 'right', cellClass: 'pm-grid-number-cell', width: 160, sortable: true, filter: true, columnFiltering: false, format: { type: 'currency', currency: 'INR', precision: '0' } },
          // tslint:disable-next-line:max-line-length
          { headerName: 'MSO Share', field: 'msoshare', alignment: 'right', cellClass: 'pm-grid-number-cell', width: 160, sortable: true, filter: true, columnFiltering: false, format: { type: 'currency', currency: 'INR', precision: '0' } },
          { headerName: 'LMO Share', field: 'lmoshare', alignment: 'right', cellClass: 'pm-grid-number-cell', width: 160, sortable: true, 
          filter: true, columnFiltering: false, format: { type: 'currency', currency: 'INR', precision: '0' } },
          { headerName: 'Total Bill', field: 'total', alignment: 'right', cellClass: 'pm-grid-number-cell', width: 160, sortable: true, 
          filter: true, columnFiltering: false, format: { type: 'currency', currency: 'INR', precision: '0' } },
          { headerName: 'Total CAFs', field: 'cafcount', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 160, sortable: true, filter: true, columnFiltering: false },
          { headerName: 'Total Paid', field: 'Paid', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 160, sortable: true, filter: true, columnFiltering: false },
          { headerName: 'Total Not Paid', field: 'NotPaid', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 160, sortable: true, 
          filter: true, columnFiltering: false },
          { headerName: 'VOIP Charges', field: 'voip_chrge_at', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 160, sortable: true, 
          filter: true, columnFiltering: false },
          { headerName: 'Add On Charges', field: 'add_on_chrge_at', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 160, sortable: true,
           filter: true, columnFiltering: false },
          { headerName: 'Pro Rated CAF', field: 'pro_rted_caf_cnt', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 160, sortable: true, 
          filter: true, columnFiltering: false },
        ];
      }
    });
  }
  getdetails(): any {
    this.getrevenuesharngByYear();
  }
  onCelClick(FrstSelected): any {
    // console.log(FrstSelected.data)
    let data = {
      agentid: this.agnt_id,
      year: FrstSelected.data.year,
      month: FrstSelected.data.monthid
    };
    // console.log(data);
    let rte = `olt/revenueSharing/customer`;
    this.crdsrv.create(data, rte).subscribe((res) => {
      this.custmerWiseData = res['data']
      // console.log(this.custmerWiseData)
      let ind = 1;
      for (let k = 0; k < this.custmerWiseData.length; k++) {
        this.custmerWiseData[k]['Sno'] = ind++;
        for (let j = 0; j < this.months.length; j++) {
          if (this.custmerWiseData[k].invce_mm == this.months[j].mnth_id) {
            this.custmerWiseData[k]['monthname'] = this.months[j].mnth_nm;
          }
        }
      }
      // console.log(this.custmerWiseData);
    });

  }
  onScdCellClick(i): any {
    // console.log(i.data['Invoice Id']);
    let data = {
      caf_invce_id: i.data['Invoice Id'],
    };
    let rte = `olt/revenueSharing/customerdetails`;
    this.crdsrv.create(data, rte).subscribe((res) => {
      this.custmerWisedetailsData = res['data'];
      // console.log(this.custmerWisedetailsData)
      let ind = 1;
      for (let k = 0; k < this.custmerWisedetailsData.length; k++) {
        this.custmerWisedetailsData[k]['Sno'] = ind++;
      }
      // console.log(this.custmerWisedetailsData);
    });

  }

  // getConnSlots(): any {
  //   const rte = `agent/agnt_prt_conn_slts/${this.agnt_id}`;
  //   this.crdsrv.get(rte).subscribe((res) => {
  //     // console.log(res);
  //     this.agntDtls = res['data'];

  //   });
  // }

  gettabs(): any {
    this.Company = [{
      tab_id: 1,
      tab_nm: 'Package Agreement'
    },
    {
      tab_id: 5,
      tab_nm: 'CAF List'
    },
    {
      tab_id: 2,
      tab_nm: 'Port Assignment'
    },
    {
      tab_id: 3,
      tab_nm: 'Package Details'
    },
    {
      tab_id: 6,
      tab_nm: 'CPE Stock'
    },
    {
      tab_id: 7,
      tab_nm: 'Revenue Sharing'
    },
    // {
    //   tab_id: 3,
    //   tab_nm: 'Collections'
    // },
    {
      tab_id: 4,
      tab_nm: 'Payments To APSFL',
      // fucn : this.getUsrPymnts()
    },
    {
      tab_id: 8,
      tab_nm: 'Summary',
      // fucn : this.getUsrPymnts()
    },

      // {
      //   tab_id: 6,
      //   tab_nm: 'Serving Areas'
      // },

      // {
      //   tab_id: 8,
      //   tab_nm: 'Events'
      // },
    ];

  }

  onCellClick(e): any {
    if (e.data.pckge_agrmt_id) {
      const rte = `package/agreement/details/${e.data.pckge_agrmt_id}`;
      this.crdsrv.get(rte).subscribe((res) => {
        // console.log(res['data']);
        this.agrmntDtls = res['data'];
        // console.log(this.agrmntDtls);
        let index = 0;
        for (let k = 0; k < this.agrmntDtls.length; k++) {
          index = index + 1;
          this.agrmntDtls[k].sno = index;
        }
      })
    }
    if (e.value == 'Profile') {
      this.cstmrData = e.data;
      this.openSideBar();
    }
  }
  onVoewCellClick(event): any {
    // this.transfereService.setLoclData('data', e.data);
    // this.router.navigate([`/admin/caf/customer/profile`]);
    // const dialogRef = this.dialog.open(CustomerProfileComponent, {
    //   width: '95%', height: '95%', data: { ind: 1, imgData: data }
    // });

    // dialogRef.afterClosed().subscribe(result => {
    //   if (result == 'Cancel') {
    //   }
    // });
    // console.log(event);
    this.cstmrData = event.data;
    // console.log(event.data);
    this.openSideBar();
  }
  onpkgCellClick(i): any {
    // console.log('&&&&&&&&&&&&&&&&&&&&&&&');
    // console.log(i.data);
    const data = {
      tmple_id: i.data.tmple_id,
      pckge_id: i.data.pckge_id,
      packge_agrmnt_id: i.data.pckge_agrmt_id
    };
    let rte = `package/agreement/partners/details`;
    this.crdsrv.create(data, rte).subscribe((res) => {
      // console.log(res['data']);
      this.partnersDtls = res['data'];
      // console.log(this.partnersDtls);
      let index = 0;
      for (let k = 0; k < this.partnersDtls.length; k++) {
        index = index + 1;
        this.partnersDtls[k].sno = index;
      }
    })
  }
  openSideBar(): any {
    this._dsSidebarService.getSidebar('addFormPanel').toggleOpen();
  }
  closeSideBar(): any {
    this._dsSidebarService.getSidebar('addFormPanel').toggleOpen();
  }

  onCellPrepared(colDef, e) {

    if (e.rowType === 'data' && e.row.data && e.column.dataField == 'Profile') {
      e.cellElement.style.color = '#ff0000';
      e.cellElement.style.borderRadius = '10px';
      e.cellElement.style.fontWeight = 500;
      e.cellElement.style.background = 'rgba(243, 191, 176, 0.2784313725490196)';
      e.cellElement.style.backgroundClip = 'content-box';
      e.cellElement.style.cursor = 'pointer';
    }

  }
  // save iptv addons

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
    // console.log(this.pckgeCstmrData);
    if (this.pckgeCstmrData == undefined) {
      this.snackBar.open('Please select a CAF', '', {
        duration: 2500,
        panelClass: ['red-snackbar'],
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      });
    } else {
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
        'subscribercode': this.pckgeCstmrData[0].mdlwe_sbscr_id,
        'servicepacks': extrnl_api_srvc_pack_lst
      };
      const fnlPckgeData = {
        agntId: this.agnt_id,
        caf_id: this.pckgeCstmrData[0].caf_id,
        pckg_lst: this.slctdAllPckgs,
        extrnl_api_post_json: extrnl_api_post_json
      };
      // console.log(fnlPckgeData);
      // return;
      this.crdsrv.create(fnlPckgeData, 'addons/addCafPckgs').subscribe((res) => {
        if (res['status'] == 200) {
          this.snackBar.open('Successfully Addons added', '', {
            duration: 2000,
            panelClass: ['blue-snackbar'],
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
          });
        }
        else {
          this.snackBar.open('Something Went Wrong ', '', {
            duration: 2000,
            panelClass: ['red-snackbar'],
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
          });
        }
      });
    }

  }

  updateSelection(index, data): any {
    // console.log(index, data);

    for (let i = 0; i < this.hsiPckgsData.length; i++) {
      if (this.hsiPckgsData[i].s_no != data.s_no) {
        this.hsiPckgsData[i].checked = false;
      }
    }
  }

  saveAddonHsiPckgs(): any {
    this.fnlChckdData = [];
    // console.log(this.hsiPckgsData);
    // console.log(this.pckgeCstmrData);
    if (this.pckgeCstmrData == undefined) {
      this.snackBar.open('Please select a CAF', '', {
        duration: 2500,
        panelClass: ['red-snackbar'],
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      });
    } else {
      for (let h = 0; h < this.hsiPckgsData.length; h++) {
        if (this.hsiPckgsData[h].checked && this.hsiPckgsData[h].checked == true) {
          this.fnlChckdData.push(this.hsiPckgsData[h]);
        }
      }
      if (this.fnlChckdData.length == 0) {
        this.snackBar.open('Please select alteast one package', '', {
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
        'subscribercode': this.pckgeCstmrData[0].mdlwe_sbscr_id,
        'servicepacks': extrnl_api_srvc_pack_lst
      };

      let fnl_nw_hsi_pckge;

      let fnl_ttl_data_usge = (this.cafHsiMnthPckgsData[0].ttl_upld_ct/1024/1024/1024) + (this.cafHsiMnthPckgsData[0].ttl_dwnld_ct/1024/1024/1024);
      console.log(fnl_ttl_data_usge);
      if (fnl_ttl_data_usge < this.cafHsiMnthPckgsData[0].mnth_usge_lmt_ct){
        fnl_nw_hsi_pckge = Number(this.cafHsiMnthPckgsData[0].mnth_usge_lmt_ct - fnl_ttl_data_usge) + Number(this.fnlChckdData[0].vle_tx);
      }else if (fnl_ttl_data_usge > this.cafHsiMnthPckgsData[0].mnth_usge_lmt_ct){
        fnl_nw_hsi_pckge = Number(fnl_ttl_data_usge) + Number(this.fnlChckdData[0].vle_tx);
      }

      const fnlHsiPckgeData = {
        agntId: this.agnt_id,
        caf_id: this.pckgeCstmrData[0].caf_id,
        pckg_lst: this.fnlChckdData,
        caf_type_id: this.pckgeCstmrData[0].caf_type_id,
        aaa_cd: this.pckgeCstmrData[0].aaa_cd,
        crnt_pln_id: this.pckgeCstmrData[0].pckge_id,
        extrnl_api_post_json: extrnl_api_post_json,
        crnt_cstmr_pckg: this.cstmrPkgeData[0].srvcpk_nm.split(',')[1],
        add_on_hsi_pckg: this.fnlChckdData[0].vle_tx,
        prsnt_hsi_pckge: this.cafHsiMnthPckgsData[0].mnth_usge_lmt_ct,
        aaa_prfl_nm: this.pckgeCstmrData[0].hsi_orgnl_prfle_tx,
        nw_hsi_pckge: fnl_nw_hsi_pckge.toFixed(0)
        // nw_hsi_pckge: Number(this.cafHsiMnthPckgsData[0].mnth_usge_lmt_ct) + Number(this.fnlChckdData[0].vle_tx)
      };
      // console.log(fnlHsiPckgeData);
      this.shwPckgeLdr = true;
      // return;
      this.crdsrv.create(fnlHsiPckgeData, 'caf_operations/hsiAddOn').subscribe((res) => {
        if (res['status'] == 200) {
          this.shwPckgeLdr = false;
          this.snackBar.open('Successfully HSI Addons added', '', {
            duration: 2000,
            panelClass: ['blue-snackbar'],
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
          });
        }
        else {
          this.shwPckgeLdr = false;
          this.snackBar.open('Something Went Wrong ', '', {
            duration: 2000,
            panelClass: ['red-snackbar'],
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
          });
        }
      });
    }

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

    if (this.pckgeCstmrData == undefined) {
      this.snackBar.open('Please select a CAF', '', {
        duration: 2500,
        panelClass: ['red-snackbar'],
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      });
    } else{
    if (this.comment == undefined || this.comment == null || this.comment == ''){
      this.snackBar.open('Plase write the comment for removing the packages', '', {
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
          'subscribercode': this.pckgeCstmrData[0].mdlwe_sbscr_id,
          'servicepacks': extrnl_api_srvc_pack_lst
        };
  
        const fnlRmPckgeData = {
          agntId: this.agnt_id,
          caf_id: this.pckgeCstmrData[0].caf_id,
          pckg_lst: this.slctdAllPckgsFrDlt,
          extrnl_api_post_json: extrnl_api_post_json
        };
        // console.log(fnlRmPckgeData);
        // return;
        this.crdsrv.create(fnlRmPckgeData, 'packages/removeAddons').subscribe((res) => {
          if (res['status'] == 200) {
            this.snackBar.open('Successfully Addons added', '', {
              duration: 2000,
              panelClass: ['blue-snackbar'],
              horizontalPosition: this.horizontalPosition,
              verticalPosition: this.verticalPosition,
            });
          }
          else {
            this.snackBar.open("Something Went Wrong ", '', {
              duration: 2000,
              panelClass: ['red-snackbar'],
              horizontalPosition: this.horizontalPosition,
              verticalPosition: this.verticalPosition,
            });
          }

        });
      }
    }
  }
}
}
