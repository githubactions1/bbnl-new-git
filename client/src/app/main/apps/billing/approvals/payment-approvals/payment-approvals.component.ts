import { Component, OnInit, ViewChild } from '@angular/core';
import { CrudService } from 'app/main/apps/crud.service';
import { MessageDialogComponent } from 'app/main/shared/components/message-dialog/message-dialog.component';
import { MatDialogRef, MatDialog, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition, MatSnackBar } from '@angular/material';
import { DsSidebarService } from '@glits/components/sidebar/sidebar.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { DxDataGridComponent } from 'devextreme-angular';

@Component({
  selector: 'app-payment-approvals',
  templateUrl: './payment-approvals.component.html',
  styleUrls: ['./payment-approvals.component.scss']
})
export class PaymentApprovalsComponent implements OnInit {
  pymntsAprvlLst: any;
  pymntAprvlColumnDefs;
  permissions;
  slctdAgnts: any;
  shwBtns = false;
  openSidebarKey = 'addFormPanel';
  confirmMsgDialogRef: MatDialogRef<MessageDialogComponent>;
  cstmrWaveOffFormGroup: FormGroup;
  /**
      * @param {DsSidebarService} _dsSidebarService
      */
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  pymntsAprvlByUsrLst;
  pymntAprvlByUsrColumnDefs;
  rcntPymntsAprvlLst;
  rcntPymntAprvlColumnDefs;
  agntPymntsForm: FormGroup;
  sdeMnuLdr = false;
  shwLdr = false;
  fnlSlctdAgnts = [];
  @ViewChild(DxDataGridComponent, { }) dataGrid: DxDataGridComponent;
  // tslint:disable-next-line:typedef
  getHeaderDtls = function () { return { 'title': 'Payment Approvals', 'icon': 'money' }; };
  shwPermMsg: string;
  
  
  
  constructor(public crdSrv: CrudService, public dialog: MatDialog, private _dsSidebarService: DsSidebarService, private _formBuilder: FormBuilder
    , public snackBar: MatSnackBar, public datePipe: DatePipe) { 
    // this.permissions = { 'slct_in': 1, 'insrt_in': 0, 'updt_in': 1, 'dlte_in': 1, 'exprt_in': 0 };
    // const permTxt = 'Payments to APSFL';
    // const prmeRte = `user/permissions/${permTxt}`;
    // this.crdSrv.get(prmeRte).subscribe((res) => {
    //   console.log(res['data'][0]);
    //   this.permissions = res['data'][0];
    // });
  }

  ngOnInit(): void {

    this.agntPymntsForm = this._formBuilder.group({
      pymntFrmDt: [''],
      pymntToDt: ['']
    });

    this.getPymntsAprvlLst();

    this.cstmrWaveOffFormGroup = this._formBuilder.group({
      pymnt_aprvl_desc_tx: ['']
    });
  }

  tabChangeFn(event): void {
    if (event.index === 1) {
      this.getLgnUsrUploads();
    } else if (event.index === 2) {
      this.getAllRcntUploads();
    }
  }

  getPymntsAprvlLst(): void {
    this.shwBtns = false;
    this.shwLdr = true;
    // if (this.permissions == undefined){
    //   this.shwLdr = false;
    // }
    this.slctdAgnts = [];
    const rte = `billing/agent/payment/approvals/details`;
    // const postAprvlData = {
    //   aprvl: true,
    //   frmDt: '',
    //   toDt: ''
    // };
    this.crdSrv.get(rte).subscribe((res) => {
      console.log(res);
      if (res['status'] === 200) {
        this.pymntsAprvlLst = res['data'];
        let ct = 0;
        this.pymntsAprvlLst.filter(k => {
          k['s_no'] = ++ct;
        });
        if (res['perm']){
          this.permissions = res['perm'][0];
        } else{
          this.shwLdr = false;
          this.shwPermMsg = 'You do not have permissions to do this operation. Please contact Administrator to get permissions.';
        }
        this.shwLdr = false;
        this.pymntAprvlColumnDefs = [
          { headerName: 'S.No', field: 's_no', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 60, height: 40, filter: false },
          { headerName: 'LMO Name', field: 'agnt_nm', alignment: 'left', cellClass: 'pm-grid-number-cell', width: 200, height: 40, filter: true },
          { headerName: 'LMO Code', field: 'agnt_cd', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 200, height: 40, filter: true },
          { headerName: 'Transaction Number', field: 'trns_ref_nu', alignment: 'left', cellClass: 'pm-grid-number-cell', width: 200, height: 40, filter: true },
          { headerName: 'Bank Name', field: 'trnsn_bnk_nm', alignment: 'left', cellClass: 'pm-grid-number-cell', width: 200, height: 40, filter: true },
          { headerName: 'Description', field: 'cmnt_tx', alignment: 'left', cellClass: 'pm-grid-number-cell', width: 200, height: 40, filter: true },
          { headerName: 'Transaction Amount', field: 'trnsn_at', alignment: 'right', type: 'currency', currency: 'INR', precision: '2', 
          cellClass: 'pm-grid-number-cell', width: 200, height: 40, filter: true },
          { headerName: 'Transaction Date', field: 'trsn_dt', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 200, height: 40, filter: true }
        ];
      }
    });
  }

  getLgnUsrUploads(): void {
    this.shwBtns = false;
    this.slctdAgnts = [];
    const rte = `billing/agent/payment/approvals/user`;

    this.crdSrv.get(rte).subscribe((res) => {
      if (res['status'] === 200) {
        this.pymntsAprvlByUsrLst = res['data'];
        let ct = 0;
        this.pymntsAprvlByUsrLst.filter(k => {
          k['s_no'] = ++ct;
        });
        this.pymntAprvlByUsrColumnDefs = [
          { headerName: 'S.No', field: 's_no', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 60, height: 40, filter: false },
          { headerName: 'LMO Name', field: 'agnt_nm', alignment: 'left', cellClass: 'pm-grid-number-cell', width: 200, height: 40, filter: true },
          { headerName: 'LMO Code', field: 'agnt_cd', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 200, height: 40, filter: true },
          { headerName: 'Transaction Number', field: 'trns_ref_nu', alignment: 'left', cellClass: 'pm-grid-number-cell', width: 200, height: 40, filter: true },
          { headerName: 'Bank Name', field: 'trnsn_bnk_nm', alignment: 'left', cellClass: 'pm-grid-number-cell', width: 200, height: 40, filter: true },
          { headerName: 'Description', field: 'cmnt_tx', alignment: 'left', cellClass: 'pm-grid-number-cell', width: 200, height: 40, filter: true },
          // tslint:disable-next-line:max-line-length
          { headerName: 'Transaction Amount', field: 'trnsn_at', alignment: 'right', type: 'currency', currency: 'INR', precision: '2', cellClass: 'pm-grid-number-cell', width: 200, height: 40, filter: true },
          { headerName: 'Transaction Date', field: 'trsn_dt', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 200, height: 40, filter: true },
          { headerName: 'Approval Date', field: 'aprve_dt', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 200, height: 40, filter: true }
        ];
      }
    });
  }


  getAllRcntUploads(): void {
    this.shwBtns = false;
    this.slctdAgnts = [];

    const pymntData = {
      frmDt: this.agntPymntsForm.value.pymntFrmDt !== '' ? this.datePipe.transform(this.agntPymntsForm.value.pymntFrmDt, 'yyyy-MM-dd') : '',
      toDt: this.agntPymntsForm.value.pymntToDt !== '' ? this.datePipe.transform(this.agntPymntsForm.value.pymntToDt, 'yyyy-MM-dd') : '',
    };

    const rte = `billing/agent/payment/approvals/recent`;

    this.crdSrv.create(pymntData, rte).subscribe((res) => {
      if (res['status'] === 200) {
        this.rcntPymntsAprvlLst = res['data'];
        let ct = 0;
        this.rcntPymntsAprvlLst.filter(k => {
          k['s_no'] = ++ct;
        });
        this.rcntPymntAprvlColumnDefs = [
          { headerName: 'S.No', field: 's_no', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 60, height: 40, filter: false },
          { headerName: 'LMO Name', field: 'agnt_nm', alignment: 'left', cellClass: 'pm-grid-number-cell', width: 200, height: 40, filter: true },
          { headerName: 'LMO Code', field: 'agnt_cd', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 200, height: 40, filter: true },
          { headerName: 'Transaction Number', field: 'trns_ref_nu', alignment: 'left', cellClass: 'pm-grid-number-cell', width: 200, height: 40, filter: true },
          { headerName: 'Bank Name', field: 'trnsn_bnk_nm', alignment: 'left', cellClass: 'pm-grid-number-cell', width: 200, height: 40, filter: true },
          { headerName: 'Description', field: 'cmnt_tx', alignment: 'left', cellClass: 'pm-grid-number-cell', width: 200, height: 40, filter: true },
          // tslint:disable-next-line:max-line-length
          { headerName: 'Transaction Amount', field: 'trnsn_at', alignment: 'right', type: 'currency', currency: 'INR', precision: '2', cellClass: 'pm-grid-number-cell', width: 200, height: 40, filter: true },
          { headerName: 'Transaction Date', field: 'trsn_dt', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 200, height: 40, filter: true },
          { headerName: 'Approval Date', field: 'aprve_dt', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 200, height: 40, filter: true }
        ];
      }
    });
  }

  onRowSelected(event): void {
    this.slctdAgnts = [];
    this.slctdAgnts = event.selectedRowsData;

    console.log(this.slctdAgnts);

    if (this.slctdAgnts.length !== 0 ){
      this.shwBtns = true;
    } else{
      this.shwBtns = false;
    }
  }

  aprveCstmrWaveOffs(): void{
    this.cstmrWaveOffFormGroup.value.pymnt_aprvl_desc_tx = '';
    this._dsSidebarService.getSidebar(this.openSidebarKey).toggleOpen();
  }

  saveAprveCstmrWaveOffs(): void{
    this.fnlSlctdAgnts = [];
  this.confirmMsgDialogRef = this.dialog.open(MessageDialogComponent, {
      width: '25%',
      panelClass: 'my-class',
      data: {
          title: 'Are you sure',
          msg: 'You really want to approve them',
          icon: 'account_box',
          btnLst: [{
              label: 'Yes',
              res: 'yes'
          }, {
            label: 'No',
            res: 'no'
        }]
      }
  });

  this.confirmMsgDialogRef.afterClosed().subscribe((response) => {
    if (response) {
      // tslint:disable-next-line:prefer-const
      this.fnlSlctdAgnts = [];
      if (response === 'yes'){
        this.shwLdr = true;
        this.fnlSlctdAgnts = [];
        for (let u = 0; u < this.slctdAgnts.length; u++){
          this.fnlSlctdAgnts.push({
            'pymnt_aprvl_desc_tx': this.cstmrWaveOffFormGroup.value.pymnt_aprvl_desc_tx, 'aprvl_in': 1,
            'wltBlCal_aprvl_in': 1, 'trsn_dt': this.slctdAgnts[u].trsn_dt.split('-').reverse().join('-'), 'agnt_blnce_at': this.slctdAgnts[u].agnt_blnce_at,
            'agnt_cd': this.slctdAgnts[u].agnt_cd, 'agnt_id': this.slctdAgnts[u].agnt_id, 'agnt_nm': this.slctdAgnts[u].agnt_nm,
            'cmnt_tx': this.slctdAgnts[u].cmnt_tx, 'pymnt_mde_id': this.slctdAgnts[u].pymnt_mde_id, 'pymnt_mde_nm': this.slctdAgnts[u].pymnt_mde_nm,
            'trns_ref_nu': this.slctdAgnts[u].trns_ref_nu, 'trnsn_at': this.slctdAgnts[u].trnsn_at, 'trnsn_bnk_nm': this.slctdAgnts[u].trnsn_bnk_nm,
            'trnsn_ctgry_id': this.slctdAgnts[u].trnsn_ctgry_id, 'trnsn_ctgry_nm': this.slctdAgnts[u].trnsn_ctgry_nm, 'trnsn_id': this.slctdAgnts[u].trnsn_id,
            'trnsn_type_id': this.slctdAgnts[u].trnsn_type_id, 'trnsn_type_nm': this.slctdAgnts[u].trnsn_type_nm, 'wlt_blnce_at': this.slctdAgnts[u].wlt_blnce_at
          });
        }
 console.log(this.fnlSlctdAgnts);
        const rte = `billing/agent/payment/approvals`;
        this.crdSrv.create(this.fnlSlctdAgnts, rte).subscribe((res) => {
          console.log(res['status']);
          if (res['status'] === 200) {
            this.shwLdr = false;
            this.snackBar.open('Payments Approved Sucessfully', '', {
              duration: 3500,
              horizontalPosition: this.horizontalPosition,
              verticalPosition: this.verticalPosition,
            });
            this.shwBtns = false;
            this.fnlSlctdAgnts = [];
            this.slctdAgnts = [];
            this.cstmrWaveOffFormGroup.reset();
            this.dataGrid.instance.clearSelection();
            this.closeSideBar();
            this.getPymntsAprvlLst();
          }
          else{
            this.snackBar.open('Something Went Wrong Try Again', '', {
              duration: 3500,
              horizontalPosition: this.horizontalPosition,
              verticalPosition: this.verticalPosition,
            });
            this.shwBtns = false;
            this.fnlSlctdAgnts = [];
            this.slctdAgnts = [];
            this.cstmrWaveOffFormGroup.reset();
            this.dataGrid.instance.clearSelection();
            this.closeSideBar();
            this.getPymntsAprvlLst();
          }
        });
      }
    }
  });
  }
  rjctCstmrWaveOffs(): void{
    this.confirmMsgDialogRef = this.dialog.open(MessageDialogComponent, {
      width: '25%',
      panelClass: 'my-class',
      data: {
          title: 'Are you sure',
          msg: 'You really want to reject them',
          btnLst: [{
              label: 'Yes',
              res: 'yes'
          }, {
            label: 'No',
            res: 'no'
        }]
      }
  });
  this.confirmMsgDialogRef.afterClosed().subscribe((response) => {
    if (response) {

      if (response === 'yes'){
        this.shwLdr = true;
        for (let u = 0; u < this.slctdAgnts.length; u++){
          this.slctdAgnts[u]['trsn_dt'] = this.slctdAgnts[u].trsn_dt.split('-').reverse().join('-');
          this.slctdAgnts[u]['aprvl_in'] = 0;
        }
        // console.log(this.slctdAgnts);
        const rte = `billing/agent/payment/approvals`;
        this.crdSrv.create(this.slctdAgnts, rte).subscribe((res) => {
          if (res['status'] === 200) {
            this.shwLdr = false;
            this.snackBar.open('Payments Rejected Sucessfully', '', {
              duration: 3500,
              horizontalPosition: this.horizontalPosition,
              verticalPosition: this.verticalPosition,
            });
            this.shwBtns = false;
            this.fnlSlctdAgnts = [];
            this.slctdAgnts = [];
            this.dataGrid.instance.clearSelection();
            this.getPymntsAprvlLst();
          }
        });
      }
    }
  });
  }

  closeSideBar(): void {
    this._dsSidebarService.getSidebar('addFormPanel').toggleOpen();
  }

}
