import { Component, OnInit, ViewChild } from '@angular/core';
import { CrudService } from '../../crud.service';
import { DsSidebarService } from '@glits/components/sidebar/sidebar.service';
import { peginationsrvc } from '../../paginationServce';
import CustomStore from 'devextreme/data/custom_store';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { DatePipe } from '@angular/common';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material';
import {  DxDataGridComponent } from 'devextreme-angular';

@Component({
  selector: 'app-customer-waveoffs',
  templateUrl: './customer-waveoffs.component.html',
  styleUrls: ['./customer-waveoffs.component.scss']
})
export class CustomerWaveoffsComponent implements OnInit {
  @ViewChild('dataGridRef', { read: false }) dataGrid: DxDataGridComponent;
  // @ViewChild('dataGridRef') dataGrid: DxDataGridComponent;
  cstmrWaveOffLst: any;
  cstmrWaveOffColumnDefs = [];
  permissions;
  shwLdr = false;
   /**
      * @param {DsSidebarService} _dsSidebarService
      */
  cstmrLst: CustomStore;
  cstmrColumnDefs;
  slctdCstmrs: any;
  pageLdr = true;
  sdeMnuLdr = false;
  cstmrCafsLst: any;
  cstmrCafWaveOffColumnDefs = [];
  tasksDataSourceStorage = [];
  isLinear = true;
  cstmrWaveOffFormGroup: FormGroup;
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  shwCafDtls = false;
  slctdCstmrCafsColumnDefs;
  fnlPostCstmrCafDataColumnDefs;
  slctdCstmrCafs: any;
  slctdCstmrCafsLst: any;
  fnlPostCstmrCafData: any;
  cafData: any[];
  cstmrWaveOffByUsrLst: any;
  recentCstmrWaveOffLst: any;
  cstmrCafWaveOffByUsrColumnDefs;
  cstmrWaveOffByUsrColumnDefs;
  recentCstmrWaveOffColumnDefs;
  recentCstmrCafWaveOffColumnDefs;
  cstmrWvrForm: FormGroup;
  loader:boolean;
  selectedRowsData: any[] & Promise<any> & JQueryPromise<any>;
  // tslint:disable-next-line:typedef
  getHeaderDtls = function () { return { 'title': 'Customer Waivers List', 'icon': 'money' }; };
  shwPermMsg: string;
  
  constructor(public crdSrv: CrudService, private _dsSidebarService: DsSidebarService, private pgntn: peginationsrvc, private _formBuilder: FormBuilder, 
    public datePipe: DatePipe, public snackBar: MatSnackBar) { 
    // this.permissions = { 'slct_in': 1, 'insrt_in': 0, 'updt_in': 1, 'dlte_in': 1, 'exprt_in': 0 };
    // const permTxt = 'Customer Waivers';
    // const prmeRte = `user/permissions/${permTxt}`;
    // this.crdSrv.get(prmeRte).subscribe((res) => {
    //   // console.log(res['data'][0]);
    //   this.permissions = res['data'][0];
    // });
  }

  ngOnInit(): any {
    this.cstmrWvrForm = this._formBuilder.group({
      cstmrWvrFrmDt: [''],
      cstmrWvrToDt: ['']
    });
    this.getCstmrWaveOffLst();
    this.cstmrWaveOffFormGroup = this._formBuilder.group({
      efctve_dt: [''],
      expry_dt: [''],
      wvr_desc_tx: ['']
    });
  }

  tabChangeFn(event): void {
    if (event.index === 1) {
      this.getLgnUsrUploads();
    } else if (event.index === 2) {
      this.getAllRcntUploads();
    }
  }

  getLgnUsrUploads(): void {
    this.loader=true;
    if (this.permissions == undefined){
      this.loader = false;
    }
    const rte = `billing/customer/caf/waveoffs/user`;
    this.crdSrv.get(rte).subscribe((res) => {
      if (res['status'] === 200) {
        this.loader=false;
        this.cstmrWaveOffByUsrLst = res['data'];
        // console.log(this.cstmrWaveOffByUsrLst);
        this.pageLdr = false;
        let counter = 0;
        let cafCt = 0;

        this.cstmrWaveOffByUsrLst.filter((k) => {
          k['sno'] = ++counter;
          cafCt = 0;
          k.cafDtls.filter((l) => {
            l['sno'] = ++cafCt;
          });
        });
        for (let m = 0; m < this.cstmrWaveOffByUsrLst.length; m++){
          this.cstmrWaveOffByUsrLst[m]['cstmr_nm'] = this.cstmrWaveOffByUsrLst[m].tle_nm + this.cstmrWaveOffByUsrLst[m].cstmr_nm;
          this.cstmrWaveOffByUsrLst[m]['tot_cafs'] = this.cstmrWaveOffByUsrLst[m].cafDtls.length;
        }
      }
      this.cstmrWaveOffByUsrColumnDefs = [
        { headerName: 'S.No', field: 'sno', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 60, height: 40, columnFiltering: false },
        { headerName: 'Customer Name', field: 'cstmr_nm', alignment: 'left', cellClass: 'pm-grid-number-cell', width: 200, height: 40, filter: true, columnFiltering: false },
        { headerName: 'Connection Type', field: 'entrpe_type_nm', alignment: 'left', cellClass: 'pm-grid-number-cell', width: 200, height: 40, filter: true, 
        columnFiltering: false },
        { headerName: 'CAF Type', field: 'caf_type_nm', alignment: 'left', cellClass: 'pm-grid-number-cell', width: 200, height: 40, filter: true, columnFiltering: true },
        { headerName: 'Email', field: 'loc_eml1_tx', alignment: 'left', cellClass: 'pm-grid-number-cell', width: 200, height: 40, filter: true, columnFiltering: false },
        { headerName: 'Mobile', field: 'cntct_mble1_nu', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 200, height: 40, filter: true, columnFiltering: false },
        { headerName: 'Locality', field: 'loc_lcly_tx', alignment: 'left', cellClass: 'pm-grid-number-cell', width: 200, height: 40, filter: true, columnFiltering: false },
        { headerName: 'Address', field: 'loc_addr1_tx', alignment: 'left', cellClass: 'pm-grid-number-cell', width: 200, height: 40, filter: true, columnFiltering: false },
        { headerName: 'District', field: 'dstrt_nm', alignment: 'left', cellClass: 'pm-grid-number-cell', width: 200, height: 40, filter: true, columnFiltering: false },
        { headerName: 'Village', field: 'vlge_nm', alignment: 'left', cellClass: 'pm-grid-number-cell', width: 200, height: 40, filter: true, columnFiltering: false },
        { headerName: 'Total CAFS', field: 'tot_cafs', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 200, height: 40, filter: true, columnFiltering: false }
      ];
  
      this.cstmrCafWaveOffByUsrColumnDefs = [
        { headerName: 'S.No', field: 'sno', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 60, height: 40 , columnFiltering: false},
        { headerName: 'CAF Name', field: 'cstmr_nm', alignment: 'left', cellClass: 'pm-grid-number-cell', width: 200, height: 40, filter: true , columnFiltering: false},
        { headerName: 'CAF No', field: 'caf_nu', alignment: 'left', cellClass: 'pm-grid-number-cell', width: 200, height: 40, filter: true , columnFiltering: false},
        { headerName: 'Email', field: 'instl_eml1_tx==0?"":instl_eml1_tx', alignment: 'left', cellClass: 'pm-grid-number-cell', width: 200, height: 40, filter: true , 
        columnFiltering: false},
        { headerName: 'Mobile', field: 'mbl_nu', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 200, height: 40, filter: true , columnFiltering: false},
        { headerName: 'Activation Date', field: 'actvn_dt', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 200, height: 40, filter: true , columnFiltering: false},
        { headerName: 'Location', field: 'instl_addr1_tx', alignment: 'left', cellClass: 'pm-grid-number-cell', width: 200, height: 40, filter: true , columnFiltering: false}
      ];
    });

    
  }

  getAllRcntUploads(): void {
    
    const cstmrWvrData = {
      frmDt: this.cstmrWvrForm.value.cstmrWvrFrmDt !== '' ? this.datePipe.transform(this.cstmrWvrForm.value.cstmrWvrFrmDt, 'yyyy-MM-dd') : '',
      toDt: this.cstmrWvrForm.value.cstmrWvrToDt !== '' ? this.datePipe.transform(this.cstmrWvrForm.value.cstmrWvrToDt, 'yyyy-MM-dd') : '',
    };
    this.loader=true;
    const rte = `billing/customer/caf/waveoffs/recent`;
    this.crdSrv.create(cstmrWvrData, rte).subscribe((res) => {
      if (res['status'] === 200) {
        this.loader=false
        // this.cstmrCafWaveOffColumnDefs = res['data'];
        this.recentCstmrWaveOffLst = res['data'];
        // console.log(this.recentCstmrWaveOffLst);
        this.pageLdr = false;
        let counter = 0;
        let cafCt = 0;
        // cafDtls

        this.recentCstmrWaveOffLst.filter((k) => {
          cafCt = 0;
          k['sno'] = ++counter;
            k.cafDtls.filter((l) => {
              l['sno'] = ++cafCt;
            });
        });

        for (let m = 0; m < this.recentCstmrWaveOffLst.length; m++){
          this.recentCstmrWaveOffLst[m]['cstmr_nm'] = this.recentCstmrWaveOffLst[m].tle_nm + this.recentCstmrWaveOffLst[m].cstmr_nm;
          this.recentCstmrWaveOffLst[m]['tot_cafs'] = this.recentCstmrWaveOffLst[m].cafDtls.length;
        }
      }
    });

    this.recentCstmrWaveOffColumnDefs = [
      { headerName: 'S.No', field: 'sno', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 60, height: 40 , columnFiltering: false},
      { headerName: 'Customer Name', field: 'cstmr_nm', alignment: 'left', cellClass: 'pm-grid-number-cell', width: 200, height: 40, filter: true , columnFiltering: false},
      { headerName: 'Connection Type', field: 'entrpe_type_nm', alignment: 'left', cellClass: 'pm-grid-number-cell', width: 200, height: 40, filter: true , columnFiltering: false},
      { headerName: 'CAF Type', field: 'caf_type_nm', alignment: 'left', cellClass: 'pm-grid-number-cell', width: 200, height: 40, filter: true, columnFiltering: true },
      { headerName: 'Email', field: 'loc_eml1_tx', alignment: 'left', cellClass: 'pm-grid-number-cell', width: 200, height: 40, filter: true , columnFiltering: false},
      { headerName: 'Mobile', field: 'cntct_mble1_nu', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 200, height: 40, filter: true , columnFiltering: false},
      { headerName: 'Locality', field: 'loc_lcly_tx', alignment: 'left', cellClass: 'pm-grid-number-cell', width: 200, height: 40, filter: true , columnFiltering: false},
      { headerName: 'Address', field: 'loc_addr1_tx', alignment: 'left', cellClass: 'pm-grid-number-cell', width: 200, height: 40, filter: true , columnFiltering: false},
      { headerName: 'District', field: 'dstrt_nm', alignment: 'left', cellClass: 'pm-grid-number-cell', width: 200, height: 40, filter: true , columnFiltering: false},
      { headerName: 'Village', field: 'vlge_nm', alignment: 'left', cellClass: 'pm-grid-number-cell', width: 200, height: 40, filter: true , columnFiltering: false},
      { headerName: 'Total CAFS', field: 'tot_cafs', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 200, height: 40, filter: true , columnFiltering: false}
    ];

    this.recentCstmrCafWaveOffColumnDefs = [
      { headerName: 'S.No', field: 'sno', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 60, height: 40 , columnFiltering: false},
      { headerName: 'CAF Name', field: 'cstmr_nm', alignment: 'left', cellClass: 'pm-grid-number-cell', width: 200, height: 40, filter: true , columnFiltering: false},
      { headerName: 'CAF No', field: 'caf_nu', alignment: 'left', cellClass: 'pm-grid-number-cell', width: 200, height: 40, filter: true , columnFiltering: false},
      { headerName: 'Email', field: 'instl_eml1_tx==0?"":instl_eml1_tx', alignment: 'left', cellClass: 'pm-grid-number-cell', width: 200, height: 40, filter: true , 
      columnFiltering: false},
      { headerName: 'Mobile', field: 'mbl_nu', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 200, height: 40, filter: true , columnFiltering: false},
      { headerName: 'Activation Date', field: 'actvn_dt', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 200, height: 40, filter: true , columnFiltering: false},
      { headerName: 'Location', field: 'instl_addr1_tx', alignment: 'left', cellClass: 'pm-grid-number-cell', width: 200, height: 40, filter: true , columnFiltering: false}
    ];
  }

  getCstmrWaveOffLst(): void {
    this.loader = true;
    // if (this.permissions == undefined){
    //   this.loader = false;
    // }
    const rte = `billing/customer/caf/waveoffs`;
    this.crdSrv.get(rte).subscribe((res) => {
      if (res['status'] === 200) {
        this.loader = false;
        // this.cstmrCafWaveOffColumnDefs = res['data'];
        this.cstmrWaveOffLst = res['data'];
        this.pageLdr = false;
        let counter = 0;
        let cafCt = 0;

        if (res['perm']){
          this.permissions = res['perm'][0];
        } else{
          this.shwPermMsg = 'You do not have permissions to do this operation. Please contact Administrator to get permissions.';
        }
        
        // console.log(this.cstmrWaveOffLst);

        this.cstmrWaveOffLst.filter((k) => {
          cafCt = 0;
          k['sno'] = ++counter;
          k.cafDtls.filter((l) => {
            l['sno'] = ++cafCt;
          });
        });

        for (let m = 0; m < this.cstmrWaveOffLst.length; m++){
          this.cstmrWaveOffLst[m]['cstmr_nm'] = this.cstmrWaveOffLst[m].tle_nm + this.cstmrWaveOffLst[m].cstmr_nm;
          this.cstmrWaveOffLst[m]['tot_cafs'] = this.cstmrWaveOffLst[m].cafDtls.length;
        }
      }
    });

    this.cstmrWaveOffColumnDefs = [
      { headerName: 'S.No', field: 'sno', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 60, height: 40 , columnFiltering: false},
      { headerName: 'Customer Name', field: 'cstmr_nm', alignment: 'left', cellClass: 'pm-grid-number-cell', width: 200, height: 40, filter: true , columnFiltering: false},
      { headerName: 'Connection Type', field: 'entrpe_type_nm', alignment: 'left', cellClass: 'pm-grid-number-cell', width: 200, height: 40, filter: true , columnFiltering: false},
      { headerName: 'CAF Type', field: 'caf_type_nm', alignment: 'left', cellClass: 'pm-grid-number-cell', width: 200, height: 40, filter: true, columnFiltering: true },
      { headerName: 'Email', field: 'loc_eml1_tx', alignment: 'left', cellClass: 'pm-grid-number-cell', width: 200, height: 40, filter: true , columnFiltering: false},
      { headerName: 'Mobile', field: 'cntct_mble1_nu', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 200, height: 40, filter: true , columnFiltering: false},
      { headerName: 'Effective Date', field: 'efcte_dt', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 200, height: 40, filter: true , columnFiltering: false},
      { headerName: 'Expiry Date', field: 'expry_dt', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 200, height: 40, filter: true , columnFiltering: false},
      { headerName: 'Approved On', field: 'aprvd_on', alignment: 'left', cellClass: 'pm-grid-number-cell', width: 200, height: 40, filter: true , columnFiltering: false},
      { headerName: 'Locality', field: 'loc_lcly_tx', alignment: 'left', cellClass: 'pm-grid-number-cell', width: 200, height: 40, filter: true , columnFiltering: false},
      { headerName: 'Address', field: 'loc_addr1_tx', alignment: 'left', cellClass: 'pm-grid-number-cell', width: 200, height: 40, filter: true , columnFiltering: false},
      { headerName: 'District', field: 'dstrt_nm', alignment: 'left', cellClass: 'pm-grid-number-cell', width: 200, height: 40, filter: true , columnFiltering: false},
      { headerName: 'Village', field: 'vlge_nm', alignment: 'left', cellClass: 'pm-grid-number-cell', width: 200, height: 40, filter: true , columnFiltering: false},
      { headerName: 'Total CAFS', field: 'tot_cafs', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 200, height: 40, filter: true , columnFiltering: false}
    ];

    this.cstmrCafWaveOffColumnDefs = [
      { headerName: 'S.No', field: 'sno', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 60, height: 40 , columnFiltering: false},
      { headerName: 'CAF Name', field: 'cstmr_nm', alignment: 'left', cellClass: 'pm-grid-number-cell', width: 200, height: 40, filter: true , columnFiltering: false},
      { headerName: 'CAF No', field: 'caf_nu', alignment: 'left', cellClass: 'pm-grid-number-cell', width: 200, height: 40, filter: true , columnFiltering: false},
      { headerName: 'Email', field: 'instl_eml1_tx==0?"":instl_eml1_tx', alignment: 'left', cellClass: 'pm-grid-number-cell', width: 200, height: 40, filter: true , 
      columnFiltering: false},
      { headerName: 'Mobile', field: 'mbl_nu', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 200, height: 40, filter: true , columnFiltering: false},
      { headerName: 'Activation Date', field: 'actvn_dt', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 200, height: 40, filter: true , columnFiltering: false},
      { headerName: 'Location', field: 'instl_addr1_tx', alignment: 'left', cellClass: 'pm-grid-number-cell', width: 200, height: 40, filter: true , columnFiltering: false}
    ];
  }

  onToolbarPreparing(e): any {
      e.toolbarOptions.items.unshift({
        location: 'after',
        widget: 'dxButton',
        options: {
            icon: 'user',
            text: 'Add Customer Waivers',
            onClick: this.openSideBar.bind(this, 'addFormPanel')
        }
    });
}

  openSideBar(key): any {
    this.sdeMnuLdr = true;
    const rte = `caf/cstmrDtls`;
    this.cstmrLst = this.pgntn.get(rte, 'cstmr_nm');

    this.cstmrColumnDefs = [
      { headerName: 'S.No', field: 'sno', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 60, height: 40 , columnFiltering: false},
      { headerName: 'Customer Name', field: 'cstmr_nm', alignment: 'left', cellClass: 'pm-grid-number-cell', width: 200, height: 40, filter: true , columnFiltering: false},
      { headerName: 'Email', field: 'loc_eml1_tx', alignment: 'left', cellClass: 'pm-grid-number-cell', width: 200, height: 40, filter: true , columnFiltering: false},
      { headerName: 'Mobile', field: 'cntct_mble1_nu', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 200, height: 40, filter: true , columnFiltering: false},
      { headerName: 'Locality', field: 'loc_lcly_tx', alignment: 'left', cellClass: 'pm-grid-number-cell', width: 200, height: 40, filter: true , columnFiltering: false},
      { headerName: 'Address', field: 'loc_addr1_tx', alignment: 'left', cellClass: 'pm-grid-number-cell', width: 200, height: 40, filter: true , columnFiltering: false}
    ];
    this._dsSidebarService.getSidebar(key).toggleOpen();
    this.sdeMnuLdr = false;
  }

  onRowSelected(event): any {
    this.slctdCstmrs = event.selectedRowsData;
  //   this.dataGrid.instance.getSelectedRowsData().then((selectedRowsData) => {
  //     console.log(selectedRowsData);
  //     return this.selectedRowsData = selectedRowsData;
  // });
  }

  getSlctdCstmrs(): any {
    
    if (this.slctdCstmrs.length === 1){
      this.shwCafDtls = true;
      this.loader=true;
      const rte = `caf/getcafdetails/${this.slctdCstmrs[0].cstmr_id}`;
    this.crdSrv.get(rte).subscribe((res) => {
      if(res['status']==200)
      {
        this.slctdCstmrCafsLst = res['data'];
       this.slctdCstmrCafsColumnDefs = [
        { headerName: 'Sno', field: 'sno', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 100, filter: false, search: false },
        { headerName: 'Customer Name', field: 'cstmr_nm', alignment: 'left', cellClass: 'pm-grid-number-cell', width: 100, filter: false, search: false },
        { headerName: 'First Name', field: 'frst_nm', cellStyle: { 'text-align': 'left' }, cellClass: 'pm-grid-number-cell', width: 250, filter: true , columnFiltering: false},
        // tslint:disable-next-line:max-line-length
        { headerName: 'CAF DATE', field: 'actvn_dt'.split('-').reverse().join('-'), alignment: 'center', cellClass: 'pm-grid-number-cell', width: 100, filter: false, search: false },
        { headerName: 'Adhar Number', field: 'adhr_nu', alignment: 'center',cellClass: 'pm-grid-number-cell', width: 150, filter: true , columnFiltering: false},
        { headerName: 'Iptv Mac Address', field: 'caf_mac_addr_tx', cellStyle: { 'text-align': 'left' }, cellClass: 'pm-grid-number-cell', width: 150, filter: true , columnFiltering: false},
        { headerName: 'Subscriber Code', field: 'mdlwe_sbscr_id', cellStyle: { 'text-align': 'left' }, cellClass: 'pm-grid-number-cell', width: 150, filter: true , columnFiltering: false},
      ];
      }
      
    });
      return;
    } else {
      this.shwCafDtls = false;
    }
  }

  onCstmrCafRowSelected(event): void {
    this.slctdCstmrCafs = event.selectedRowsData;
  }

  getSummaryDtls(): void{
    if (this.slctdCstmrs.length === 1){
      let counter = 0;
      this.fnlPostCstmrCafData = [];
      for (let i = 0; i < this.slctdCstmrCafs.length; i++){
        this.slctdCstmrCafs[i]['efctve_dt'] = this.datePipe.transform(this.cstmrWaveOffFormGroup.value.efctve_dt, 'yyyy-MM-dd');
        this.slctdCstmrCafs[i]['expry_dt'] = this.datePipe.transform(this.cstmrWaveOffFormGroup.value.expry_dt, 'yyyy-MM-dd');
        this.slctdCstmrCafs[i]['wvr_desc_tx'] = this.cstmrWaveOffFormGroup.value.wvr_desc_tx;
        this.slctdCstmrCafs[i]['srno'] = ++counter;
      }
      this.fnlPostCstmrCafData = this.slctdCstmrCafs;
      this.fnlPostCstmrCafDataColumnDefs = [
        { headerName: 'Sno', field: 'srno', alignment: 'left', cellClass: 'pm-grid-number-cell', width: 100, filter: false, search: false },
        { headerName: 'CAF Name', field: 'cstmr_nm', cellStyle: { 'text-align': 'left' }, cellClass: 'pm-grid-number-cell', width: 250, filter: true , columnFiltering: false},
        // tslint:disable-next-line:max-line-length
        { headerName: 'Effective Date', field: 'efctve_dt'.split('-').reverse().join('-'), alignment: 'center', cellClass: 'pm-grid-number-cell', width: 100, filter: false, search: false },
        // tslint:disable-next-line:max-line-length
        { headerName: 'Expiry Date', field: 'expry_dt'.split('-').reverse().join('-'), alignment: 'center', cellClass: 'pm-grid-number-cell', width: 150, filter: false },
        { headerName: 'Description', field: 'wvr_desc_tx', cellStyle: { 'text-align': 'left' }, cellClass: 'pm-grid-number-cell', width: 150, filter: true , columnFiltering: false}
      ];
      this.getCstmrForCaf();
    } else {
      this.fnlPostCstmrCafData = [];
      let ct = 0;
      this.fnlPostCstmrCafData = this.slctdCstmrs;
      for (let i = 0; i < this.slctdCstmrs.length; i++){
        this.slctdCstmrs[i]['efctve_dt'] = this.datePipe.transform(this.cstmrWaveOffFormGroup.value.efctve_dt, 'yyyy-MM-dd');
        this.slctdCstmrs[i]['expry_dt'] = this.datePipe.transform(this.cstmrWaveOffFormGroup.value.expry_dt, 'yyyy-MM-dd');
        this.slctdCstmrs[i]['wvr_desc_tx'] = this.cstmrWaveOffFormGroup.value.wvr_desc_tx;
        this.slctdCstmrs[i]['srno'] = ++ct;
      }

      this.fnlPostCstmrCafDataColumnDefs = [
        { headerName: 'Sno', field: 'srno', alignment: 'left', cellClass: 'pm-grid-number-cell', width: 100, filter: false, search: false },
        { headerName: 'Customer Name', field: 'cstmr_nm', cellStyle: { 'text-align': 'left' }, cellClass: 'pm-grid-number-cell', width: 250, filter: true , columnFiltering: false},
        // tslint:disable-next-line:max-line-length
        { headerName: 'Effective Date', field: 'efctve_dt'.split('-').reverse().join('-'), alignment: 'center', cellClass: 'pm-grid-number-cell', width: 100, filter: false, search: false },
        // tslint:disable-next-line:max-line-length
        { headerName: 'Expiry Date', field: 'expry_dt'.split('-').reverse().join('-'), alignment: 'center', cellClass: 'pm-grid-number-cell', width: 150, filter: false },
        { headerName: 'Description', field: 'wvr_desc_tx', cellStyle: { 'text-align': 'left' }, cellClass: 'pm-grid-number-cell', width: 150, filter: true , columnFiltering: false}
      ];
    }
    
  }
  
  getCstmrForCaf(): any{
    this.fnlPostCstmrCafData = [];
for (let i = 0; i < this.slctdCstmrs.length; i++){
        const rte = `caf/getcafdetails/${this.slctdCstmrs[i].cstmr_id}`;
        this.crdSrv.get(rte).subscribe((res) => {

          this.fnlPostCstmrCafData.push({caf_id: res['data'][0]});
          this.fnlPostCstmrCafData[i].efctve_dt = this.datePipe.transform(this.cstmrWaveOffFormGroup.value.efctve_dt, 'yyyy-MM-dd');
          this.fnlPostCstmrCafData[i].expry_dt = this.datePipe.transform(this.cstmrWaveOffFormGroup.value.expry_dt, 'yyyy-MM-dd');
          this.fnlPostCstmrCafData[i].wvr_desc_tx = this.cstmrWaveOffFormGroup.value.wvr_desc_tx;
        });
        
      }
  }
  saveCstmrWaveOffs(): void{

    const rte = `billing/customer/caf/waveoffs`;
    this.crdSrv.create(this.fnlPostCstmrCafData, rte).subscribe((res) => {
      if (res['status'] === 200) {
        this.snackBar.open('Sucessfully Added', '', {
          duration: 3000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
        this.closeSideBar();
        this.getCstmrWaveOffLst();
      }
    });
  }

  closeSideBar(): any {
    this._dsSidebarService.getSidebar('addFormPanel').toggleOpen();
  }
}
