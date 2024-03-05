import { Component, OnInit, ViewChild } from '@angular/core';
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
// import { CustomerProfileComponent } from './customer-profile/customer-profile.component';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit {

  firstFormGroup: FormGroup;
  gndrLst: any;
  showTble = false;
  showAddBtn = true;
  showBckBtn: boolean;
  frm_type: any;
  showStepr = false;
  sideBarHeader: string;
  editClicked: boolean = false;
  updateData: any;
  deleteCstmr: boolean;
  columnDefs = [];
  columnDefss = [];
  rowData = [];
  getRowHeight;
  selectedRowKeys: any;
  districtId: any;
  spnrCtrl = false;
  confirmDialogRef: MatDialogRef<DeleteDialogComponent>;
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  districts: any = [];
  permissions;
  cafFRm: FormGroup;
  lmosLst: any = [];
  gridData: any = [];
  searchModeOption: string = 'contains';
  searchExprOption: any = 'fst_nm';
  searchTimeoutOption: number = 200;
  minSearchLengthOption: number = 0;
  showDataBeforeSearchOption: boolean = false;
  showCafSidebar = false;
  showSidebar: boolean = false;
  public cstmrData: any;
  searchExprOptionItems: Array<any> = [{
    name: 'fst_nm',
    value: 'fst_nm'
  }, {
    name: ['Name', 'Category'],
    value: ['Name', 'Category']
  }];
  CafTyp: any;
  Cafstus: any;
  mndl_lst: any;
  lmoLoader: boolean = false;
  searchLoader: boolean = false;
  usrdtls: any;
  agnt_dta: any;
  disabled:boolean=false;
  getHeaderDtls = function (): any { return { 'title': 'Customers  List', 'icon': 'people_outline' }; };

  constructor(public _dsSidebarService: DsSidebarService, private _formBuilder: FormBuilder, private crdsrv: CrudService, private datePipe: DatePipe, public dataService: Dataservice,
    private snackBar: MatSnackBar, public dialog: MatDialog, private route: Router, 
    public TransfereService: TransfereService) {

    let rowHeight = 40;
    this.getRowHeight = function (params) {
      return rowHeight;
    };
    const permTxt = 'Customer Creation';
    const prmeRte = `user/permissions/${permTxt}`;
    this.crdsrv.get(prmeRte).subscribe((res) => {
      this.showCafSidebar = false;
      this.showSidebar = true;
      if (res['data']){
        this.permissions = res['data'][0];
      }
    });
  }

  bckBtn() {
    this.showAddBtn = true;
    this.showBckBtn = false;
    this.showStepr = false;
    this.showTble = true;
  }
  ngOnInit() {
    this.usrdtls = JSON.parse(localStorage.getItem('usrDtls'));
    console.log(this.usrdtls)
    this.cafFRm = this._formBuilder.group({
      dstrc_id: ['',Validators],
      mso_nm: ['', Validators],
      mobileno: ['', Validators],
      CAf: ['', Validators],
      adhar: ['', Validators],
      str_dt: ['', Validators],
      end_dt: ['', Validators],
      till_dt: ['', Validators],
      mso_id: ['', Validators],
      org_nm: ['', Validators],
      Apsf_id: ['', Validators],
      Reg_no: ['', Validators],
      Caf_sts: ['', Validators],
      mndl_nu: ['', Validators]
    });

    this.getDistricts();
    this.getCafType();
    this.getCafStus();
    this.dataService.getLmoLst().then((res) => {
      this.lmosLst = res;
      this.gridData = this.lmosLst;
    })
    if(this.usrdtls.usr_ctgry_id==8) {
      this.disabled=true
      var rte=`agent/agents/${this.usrdtls.usr_ctgry_ky}`  
      this.crdsrv.get(rte).subscribe(res => {
        this.agnt_dta=res['data']['agnt_info'][0]
      })
    }
  }

  getMandals(id) {
    const rte = `admin/mandals/${id}`;
    this.crdsrv.get(rte).subscribe((res) => {
      this.mndl_lst = res['data'];
    })
  }

  getCafType() {
    this.crdsrv.get('caf/caf-type').subscribe(res => {
      console.log(res)
      this.CafTyp = res['data']
    })

  }
  getCafStus() {
    this.crdsrv.get('caf/caf-status').subscribe(res => {
      console.log(res)
      this.Cafstus = res['data']
    })
  }

  onValueChanged(value) {
    console.log(value)

  }
  getDistricts() {

    this.crdsrv.get('admin/districts').subscribe(res => {
      console.log(res)
      this.districts = res['data']
    })
  }


  getDetails() {
this.searchLoader = true;
    if(this.cafFRm.value.dstrc_id  || this.cafFRm.value.mndl_nu  || this.cafFRm.value.mso_nm  || this.cafFRm.value.mobileno  ||
    this.cafFRm.value.CAf  ||  this.cafFRm.value.org_nm  ||
     this.cafFRm.value.Caf_sts  || this.cafFRm.value.adhar  || this.cafFRm.value.str_dt  || this.cafFRm.value.end_dt  ){
       if(this.usrdtls.usr_ctgry_id==8){
          console.log(this.agnt_dta)
             if(this.agnt_dta.ofce_dstrt_id==this.cafFRm.value.dstrc_id && this.agnt_dta.ofce_mndl_id == this.cafFRm.value.mndl_nu){
              if (this.cafFRm.value['till_dt'] == true) {
                this.searchLoader = true;
                var data = {
                  Caf_type: 1,
                  dstrc_id: this.cafFRm.value['dstrc_id'],
                  mso_nm: this.cafFRm.value['mso_nm'],
                  mso_id: this.cafFRm.value['mso_id'],
                  mobileno: this.cafFRm.value['mobileno'],
                  CAf: this.cafFRm.value['CAf'],
                  adhar: this.cafFRm.value['adhar'],
                  till_dt: this.datePipe.transform(new Date(), 'dd/MM/yyyy'),
                  org_nm: this.cafFRm.value['org_nm'],
                  Apsf_id: this.cafFRm.value['Apsf_id'],
                  Reg_no: this.cafFRm.value['Reg_no'],
                  Caf_sts: this.cafFRm.value['Caf_sts'],
                  mndl_id: this.cafFRm.value['mndl_nu'],
                };
                if (data.mso_nm.includes('LMO') == true){
                  data['agntId'] = this.cafFRm.value['mso_id'];
                } else {
                  data['mso_id'] = this.cafFRm.value['mso_id'];
                }
                this.crdsrv.create(data, 'caf/getdt').subscribe(res => {
                  this.rowData = res['data'];
                  this.searchLoader = false;
                  if (res['data']) {
                    this.showTble = true;
          
                  }
          
                })
          
              } else {
                this.searchLoader = true;
                this.cafFRm.value['str_dt'] = this.datePipe.transform(this.cafFRm.value.str_dt, 'yyyy-MM-dd');
                this.cafFRm.value['end_dt'] = this.datePipe.transform(this.cafFRm.value.end_dt, 'yyyy-MM-dd');
                var Data = {
                  Caf_type: 1,
                  dstrc_id: this.cafFRm.value['dstrc_id'],
                  mso_nm: this.cafFRm.value['mso_nm'],
                  mso_id: this.cafFRm.value['mso_id'],
                  mobileno: this.cafFRm.value['mobileno'],
                  CAf: this.cafFRm.value['CAf'],
                  adhar: this.cafFRm.value['adhar'],
                  str_dt: this.cafFRm.value['str_dt'],
                  end_dt: this.cafFRm.value['end_dt'],
                  org_nm: this.cafFRm.value['org_nm'],
                  Apsf_id: this.cafFRm.value['Apsf_id'],
                  Reg_no: this.cafFRm.value['Reg_no'],
                  Caf_sts: this.cafFRm.value['Caf_sts'],
                  mndl_id: this.cafFRm.value['mndl_nu']
                };
                if (Data.mso_nm.includes('LMO') == true){
                  Data['agntId'] = this.cafFRm.value['mso_id'];
                } else {
                  Data['mso_id'] = this.cafFRm.value['mso_id'];
                }
                this.crdsrv.create(Data, 'caf/getdt').subscribe(res => {
                  this.rowData = res['data']
                  this.searchLoader = false;
                  if (res['data']) {
                    this.showTble = true;
                  }
                  console.log(this.rowData);
                })
              }
             }else{
              this.snackBar.open('permision denied for this action', 'Undo', {
                duration: 3000,
                horizontalPosition: this.horizontalPosition,
                verticalPosition: this.verticalPosition,
              });
             }  
       }else{
        if (this.cafFRm.value['till_dt'] == true) {
          this.searchLoader = true;
          let data = {
            Caf_type: 1,
            dstrc_id: this.cafFRm.value['dstrc_id'],
            mso_nm: this.cafFRm.value['mso_nm'],
            // mso_id: this.cafFRm.value['mso_id'],
            mobileno: this.cafFRm.value['mobileno'],
            CAf: this.cafFRm.value['CAf'],
            adhar: this.cafFRm.value['adhar'],
            till_dt: this.datePipe.transform(new Date(), 'dd/MM/yyyy'),
            org_nm: this.cafFRm.value['org_nm'],
            Apsf_id: this.cafFRm.value['Apsf_id'],
            Reg_no: this.cafFRm.value['Reg_no'],
            Caf_sts: this.cafFRm.value['Caf_sts'],
            mndl_id: this.cafFRm.value['mndl_nu'],
          };
          if (data.mso_nm.includes('LMO') == true){
            data['agntId'] = this.cafFRm.value['mso_id'];
          } else {
            data['mso_id'] = this.cafFRm.value['mso_id'];
          }
          this.crdsrv.create(data, 'caf/getdt').subscribe(res => {
            this.rowData = res['data'];
            this.searchLoader = false;
            if (res['data']) {
              this.showTble = true;
    
            }
    
          })
    
        } else {
          this.searchLoader = true;
          this.cafFRm.value['str_dt'] = this.datePipe.transform(this.cafFRm.value.str_dt, 'yyyy-MM-dd');
          this.cafFRm.value['end_dt'] = this.datePipe.transform(this.cafFRm.value.end_dt, 'yyyy-MM-dd');
          let Data = {
            Caf_type: 1,
            dstrc_id: this.cafFRm.value['dstrc_id'],
            mso_nm: this.cafFRm.value['mso_nm'],
            // mso_id: this.cafFRm.value['mso_id'],
            mobileno: this.cafFRm.value['mobileno'],
            CAf: this.cafFRm.value['CAf'],
            adhar: this.cafFRm.value['adhar'],
            str_dt: this.cafFRm.value['str_dt'],
            end_dt: this.cafFRm.value['end_dt'],
            org_nm: this.cafFRm.value['org_nm'],
            Apsf_id: this.cafFRm.value['Apsf_id'],
            Reg_no: this.cafFRm.value['Reg_no'],
            Caf_sts: this.cafFRm.value['Caf_sts'],
            mndl_id: this.cafFRm.value['mndl_nu'],
    
          };
          if (Data.mso_nm.includes('LMO') == true){
            Data['agntId'] = this.cafFRm.value['mso_id'];
          } else {
            Data['mso_id'] = this.cafFRm.value['mso_id'];
          }
          console.log(Data);
          this.crdsrv.create(Data, 'caf/getdt').subscribe(res => {
            this.rowData = res['data']
            this.searchLoader = false;
            if (res['data']) {
              this.showTble = true;
            }
            console.log(this.rowData);
          });
        }
       }
    
    }else{
      this.snackBar.open('please Select atleast District', 'Undo', {
        duration: 3000,
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      });
    }
    
    // console.log(this.cafFRm.value);
    this.columnDefs = [
      { headerName: 'Sno', field: 'sno', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 100, filter: false, search: false, columnFiltering: false },
      // tslint:disable-next-line:max-line-length
      { headerName: 'CAF No', field: 'caf_nu', alignment: 'center' , cellClass: 'pm-grid-number-cell', width: 150, filter: true , columnFiltering: false, filterOperations: [ 'contains', 'startswith', '=' ] },
      { headerName: 'Profile', field: 'Profile', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 100, height: 40, columnFiltering: false,  filter: true },
      { headerName: 'Name', field: 'cstmr_nm',  cellClass: 'pm-grid-number-cell', width: 150, filter: true, search: false, columnFiltering: false },
      // tslint:disable-next-line:max-line-length
      { headerName: 'Mobile Number', field: 'cntct_mble1_nu', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 150, filter: true , columnFiltering: false, filterOperations: [ 'contains', 'startswith', '=' ], selectedFilterOperation: 'contains',allowFiltering: true },
      { headerName: 'Status', field: 'sts_nm',  cellClass: 'pm-grid-number-cell', width: 125, filter: false, columnFiltering: true },
      { headerName: 'LMO', field: 'lmo_cd',  cellClass: 'pm-grid-number-cell', width: 125, filter: true, columnFiltering: false },
      { headerName: 'Billing Frequency', field: 'frqncy_nm',  cellClass: 'pm-grid-number-cell', width: 110, filter: true, columnFiltering: false },
      { headerName: 'Activation Date', field: 'actvn_dt', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 125, filter: true, columnFiltering: false },
      { headerName: 'ONU Serial NO', field: 'onu_srl_nu', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 125, filter: true, columnFiltering: false },
      { headerName: 'iptv Serial NO', field: 'iptv_srl_nu', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 125, filter: true, columnFiltering: false },
      { headerName: 'subscriber code', field: 'mdlwe_sbscr_id', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 125, filter: true, columnFiltering: false },
     // { headerName: 'TelePhone Allocated', field: 'spnd_dt', alignment:'center', cellClass: 'pm-grid-number-cell', width: 125, filter: true, columnFiltering: false },
      // { headerName: 'Suspended Date', field: 'spnd_dt', alignment:'center', cellClass: 'pm-grid-number-cell', width: 125, filter: true, columnFiltering: false },
      // { headerName: 'Resume Date', field: 'rsme_dt', alignment:'center', cellClass: 'pm-grid-number-cell', width: 125, filter: true, columnFiltering: false },
      // { headerName: 'Termination Date', field: 'trmnd_dt', alignment:'center', cellClass: 'pm-grid-number-cell', width: 125, filter: true, columnFiltering: false }
    ];
  }


 
  Reset(Form) {
    this.showTble = false;
    Form.reset();
    console.log(this.cafFRm);

    // this.cafFRm.reset()
    // this.cafFRm.controls['mso_nm'].markAsPristine();
    // this.cafFRm.controls['dstrc_id'].markAsPristine();
    // this.cafFRm.controls['str_dt'].markAsPristine();
    // this.cafFRm.controls['end_dt'].markAsPristine();
    // this.cafFRm.reset(this.cafFRm.getRawValue(), {emitEvent: false});
    this.crdsrv.create({}, '/caf/caf').subscribe(() => {

    });
  }


  selectSingleRow(event) {
    console.log(event);
    this.cafFRm.get('mso_nm').setValue(`${event.data.agnt_nm} | ${event.data.agnt_cd}`);
    this.cafFRm.get('mso_id').setValue(event.data.agnt_id);
    this.closeSideBar();
  }

  onCelleditClick(data) {
    this.searchLoader = true;
    // console.log(data.cellElement.innerText)
    if (data.cellElement.innerText = 'view') {
      console.log(data.row.data);
      // this.TransfereService.setData(data.row.data)
      this.TransfereService.setLoclData('cafData', data.row.data);
      let frm_actn = 'update';
      this.TransfereService.setData(frm_actn);
      this.route.navigate([`/admin/caf/new-caf`]);
      // this.route.navigate([`/admin/caf/individual/new-caf`])
     

    }

  }
  //   onToolbarPreparing(e) {
  //     console.log(e);
  //      e.toolbarOptions.items.unshift({
  //        location: 'after',
  //        widget: 'dxButton',
  //        options: {
  //            icon: 'plus',
  //            text: 'Add New Customer',
  //            onClick:this.form.bind(this),
  //            // this.onCellClick( this.selectedUsers),
  //           bindingOptions: {
  //              'disabled': 'isEmailButtonDisabled'
  //            }
  //        }
  //    });
  // }

  ViewLmolst(): any {
    this.lmoLoader = true;
    this.showCafSidebar = false;
    this.showSidebar = true;
    console.log('In ViewLmolst');
    this.dataService.getLmoLst().then((res) => {
      this.lmosLst = res;
      this.lmoLoader = false;
      this.gridData = this.lmosLst;
    });

    this.columnDefss = [
      { headerName: 'Sno', field: 'sno', cellStyle: { 'text-align': 'center' }, cellClass: 'pm-grid-number-cell', width: 100, sortable: true, filter: false },
      { headerName: 'LMO/MSO Name', field: 'agnt_nm', cellStyle: { 'text-align': 'center' }, cellClass: 'pm-grid-number-cell', width: 265 },
      { headerName: 'Code', field: 'agnt_cd', cellStyle: { 'text-align': 'left' }, cellClass: 'pm-grid-number-cell', width: 100, sortable: true, filter: true }
    ];
    this.openSideBar();
  }

  addNewEntry() { 
  
    this.route.navigate([`/admin/caf/new-caf`]);
    // this.route.navigate([`/admin/caf/individual/new-caf`])

  }
  onCellClick(event): any {
    // this.searchLoader = true;
    // console.log(data)
    // this.TransfereService.setLoclData('data',data.row.data)
    // this.route.navigate([`/admin/caf/customer/profile`])
    // const dialogRef = this.dialog.open(CustomerProfileComponent, {
    //   width: '95%', height: '95%', data: { ind: 1, imgData: data }
    // });

    // dialogRef.afterClosed().subscribe(result => {
    //   if (result == 'Cancel') {
    //   }
    // });
    // onviewClick(event): any{
      if (event.value == 'Profile'){
      this.showSidebar = false;
      this.showCafSidebar = true;
      console.log(event);
      this.cstmrData = event.data;
      console.log(event.data);
      this.openSideBar();
    }

  }

  openSideBar = function () {
    this._dsSidebarService.getSidebar('addFormPanel').toggleOpen();
  };
  closeSideBar = function () {
    this._dsSidebarService.getSidebar('addFormPanel').toggleOpen();
  };
  
  onCellPrepared(colDef, e) {
    
    if (e.rowType === 'data' && e.row.data && e.column.dataField == 'Profile') {
      e.cellElement.style.color = '#ff0000';
      e.cellElement.style.fontWeight = 500;
      e.cellElement.style.borderRadius = '10px';
       e.cellElement.style.background = 'rgba(243, 191, 176, 0.2784313725490196)';
       e.cellElement.style.backgroundClip = 'content-box';
       e.cellElement.style.cursor = 'pointer';
    }
 
}
}
