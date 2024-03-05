import { Component, OnInit } from '@angular/core';
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
import { DsSidebarService } from '@glits/components/sidebar/sidebar.service';
import { TransfereService } from 'app/providers/transfer/transfer.service';
@Component({
  selector: 'app-enterpriese-customers',
  templateUrl: './enterpriese-customers.component.html',
  styleUrls: ['./enterpriese-customers.component.scss']
})
export class EnterprieseCustomersComponent implements OnInit {

  // firstFormGroup: FormGroup;
  gndrLst: any;
  showTble = true;
  showAddBtn = true;
  showBckBtn: boolean;
  frm_type: any;
  showStepr = false;
  sideBarHeader: string;
  editClicked: boolean = false;
  updateData: any;
  deleteCstmr: boolean;
  columnDefs = [];
  rowData = [];
  getRowHeight;
  districtId: any;
  spnrCtrl = false;
  confirmDialogRef: MatDialogRef<DeleteDialogComponent>;
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  districts: any = []
  permissions;
  cafFRm: FormGroup;
  lmosLst: any = [];

  searchModeOption: string = 'contains';
  searchExprOption: any = 'fst_nm';
  searchTimeoutOption: number = 200;
  minSearchLengthOption: number = 0;
  showDataBeforeSearchOption: boolean = false;
  searchExprOptionItems: Array<any> = [{
    name: 'fst_nm',
    value: 'fst_nm'
  }, {
    name: ['Name', 'Category'],
    value: ['Name', 'Category']
  }];
  loader = false;
  columnDefs2: any;
  cafColumns: any;
  shwPermMsg: string;
  getHeaderDtls = function (): any { return { 'title': 'Enterprise Customers', 'icon': 'people_outline' }; };
  
  constructor(private _fuseSidebarService: DsSidebarService, private _formBuilder: FormBuilder, private crdsrv: CrudService, private datePipe: DatePipe,
    private snackBar: MatSnackBar, public dialog: MatDialog, private route: Router, public TransfereService: TransfereService) {
    let rowHeight = 40;
    this.getRowHeight = function (params) {
      return rowHeight;
    };
    // this.permissions = { 'slct_in': 1, 'insrt_in': 0, 'updt_in': 1, 'dlte_in': 1, 'exprt_in': 1 };
    // const permTxt = 'Enterprise Customer Creation';
    // const prmeRte = `user/permissions/${permTxt}`;
    // this.crdsrv.get(prmeRte).subscribe((res) => {
    //    console.log(res['data'][0]);
    //   this.permissions = res['data'][0];
    // });
  }
  ngOnInit() {

    this.getEntCustomerData();

  }
  getEntCustomerData() {
    this.spnrCtrl = true;
    this.loader = true;
    // console.log('hiiii');
    const rte = `caf/entcaf`;
    this.crdsrv.get(rte).subscribe((res) => {
      // console.log(res['data']);
      this.loader = false;

      if (res['perm']){
        this.permissions = res['perm'][0];
        console.log(this.permissions)
      } else{
        this.shwPermMsg = 'You do not have permissions to do this operation. Please contact Administrator to get permissions.';
      }
      
      this.rowData = res['data'];
      let counter = 0;
      this.rowData.filter((k) => {
        k['s_no'] = ++counter;
      });
      console.log(this.rowData);
      this.columnDefs = [
        { headerName: 'Sno', field: 's_no', algnmnt: 'center', cellClass: 'pm-grid-number-cell', width: 50, filter: false, search: false, columnFiltering: false },
        { headerName: 'Customer Id', field: 'cstmr_id', algnmnt: 'center',  cellClass: 'pm-grid-number-cell', width: 150, filter: true, columnFiltering: false },
        { headerName: 'Organization Name', field: 'cstmr_nm',  cellClass: 'pm-grid-number-cell', width: 250, filter: true, columnFiltering: false },
        { headerName: 'Contact Person Name', field: 'cntct_nm',  cellClass: 'pm-grid-number-cell', width: 300, filter: true , hide: false, columnFiltering: false},
        { headerName: 'Mobile Number', field: 'cntct_mble1_nu',  algnmnt: 'center', cellClass: 'pm-grid-number-cell', width: 150, filter: true, columnFiltering: false },
        { headerName: 'Email', field: 'loc_eml1_tx',  cellClass: 'pm-grid-number-cell', width: 200, filter: true, columnFiltering: false },
        // tslint:disable-next-line:max-line-length
        { headerName: 'Billing Frequency', field: 'frqncy_nm', cellStyle: { 'text-align': 'left' }, cellClass: 'pm-grid-number-cell', width: 130, filter: true, columnFiltering: false },
        { headerName: 'Activation Date', field: 'actvn_dt',  algnmnt: 'center', cellClass: 'pm-grid-number-cell', width: 150, filter: true, columnFiltering: false },
        { headerName: 'Organization Type', field: 'entrpe_type_nm',  cellClass: 'pm-grid-number-cell', width: 150, filter: true , hide: false, columnFiltering: false},
        { headerName: 'District', field: 'dstrt_nm',  cellClass: 'pm-grid-number-cell', width: 150, filter: true, hide: false, columnFiltering: false },
        { headerName: 'Mandal', field: 'mndl_nm',  cellClass: 'pm-grid-number-cell', width: 150, filter: true, hide: false, columnFiltering: false },
        { headerName: 'Village', field: 'vlge_nm',  cellClass: 'pm-grid-number-cell', width: 150, filter: true, hide: false, columnFiltering: false },
        // tslint:disable-next-line:max-line-length
        { headerName: 'Total CAF', field: 'ttl_cafs',  cellClass: 'pm-grid-number-cell',algnmnt: 'center', width: 100, filter: false , search: false, hide: false, columnFiltering: false},
        
      ];
      this.columnDefs2 = [
        { headerName: 'Sno', field: 'sno',algnmnt: 'center', cellClass: 'pm-grid-number-cell', width: 100, filter: false, search: false ,hide:false},
        { headerName: 'Organization Name', field: 'cstmr_nm', cellStyle: { 'text-align': 'left' }, cellClass: 'pm-grid-number-cell', width: 250, filter: true ,hide:false},
        { headerName: 'Contact Person Name', field: 'blng_cntct_nm', cellStyle: { 'text-align': 'left' }, cellClass: 'pm-grid-number-cell', width: 250, filter: true ,hide:false},
        { headerName: 'Mobile Number', field: 'cntct_mble1_nu',algnmnt: 'center', cellClass: 'pm-grid-number-cell', width: 150, filter: true ,hide:false},
        { headerName: 'Email', field: 'loc_eml1_tx', cellClass: 'pm-grid-number-cell', width: 150, filter: true ,hide:false},
        { headerName: 'Address', field: 'officeloc',  cellClass: 'pm-grid-number-cell', width: 200, filter: true ,hide:false},
        { headerName: 'District', field: 'dstrt_nm', cellClass: 'pm-grid-number-cell', width: 250, filter: true,hide:false },
        { headerName: 'Mandal', field: 'mndl_nm',  cellClass: 'pm-grid-number-cell', width: 150, filter: true , hide:false},
        { headerName: 'Agent', field: 'lmo_agnt_cd',  cellClass: 'pm-grid-number-cell', width: 100, filter: false,hide:true, search: false },
  
      ];
      
    }, (error) => {
      //// console.log(error);
    });
  }

  bckBtn() {
    this.showAddBtn = true;
    this.showBckBtn = false;
    this.showStepr = false;
    this.showTble = true;
    this.getEntCustomerData();
  }
  onCellClick(data) {
    if (data.cellElement.innerText === 'View') {
      // console.log(data.row.data)
      this.TransfereService.setLoclData('cafData',data.row.data)

      this.route.navigate([`/admin/caf/entcustomer/profile`])

    }
    else if (data.cellElement.innerText === 'Edit') {
      // console.log(data.row.data)
      data.row.data['type'] = 'edit'
      // console.log(data.row.data)
      this.TransfereService.setLoclData('cafData',data.row.data)

      this.route.navigate([`/admin/caf/entfrm`])

    }

  }
  onCafClicked(data) {
    if (data.cellElement.innerText === 'View') {
      // console.log(data.row.data)
      this.TransfereService.setLoclData('cafData',data.row.data)
      this.route.navigate([`/admin/caf/customer/profile`])
    }
    else if (data.cellElement.innerText === 'Edit') {
      data.row.data['type'] = 'edit'
      this.TransfereService.setLoclData('cafData',data.row.data)
      //this.TransfereService.setData(data.row.data)
      this.route.navigate([`/admin/caf/new-caf`])

    }
  }


  getLmo() {
    // console.log('hi')
    this.crdsrv.get(`caf/lmos`).subscribe(res => {
      // console.log(res)
      this.lmosLst = res['data']
    })
    // this.crdsrv.get(`caf/lmos/${dtrid}`).subscribe(res=>{
    //   // console.log(res)
    //   this.lmosLst=res['data']
    // })

  }
  addNewEntry() {
    // console.log('called')
    this.route.navigate([`/admin/caf/entfrm`])
  }


  onValueChanged(value) {
    // console.log(value)

  }
  getDistricts() {

    this.crdsrv.get('admin/districts').subscribe(res => {
      // console.log(res)
      this.districts = res['data']

    })
  }
  form() {
    // console.log('called')

    this.route.navigate([`/admin/caf/caffrm`])
  }




  onToolbarPreparing(e) {
    // console.log(e);
    e.toolbarOptions.items.unshift({
      location: 'after',
      widget: 'dxButton',
      options: {
        icon: 'plus',
        text: 'Add New Organization',
        onClick: this.addNewEntry.bind(this),
        // this.onCellClick( this.selectedUsers),
        bindingOptions: {
          'disabled': 'isEmailButtonDisabled'
        }
      }
    });
  }

}
