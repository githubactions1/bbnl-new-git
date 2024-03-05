import { Component, OnInit } from '@angular/core';
import { CrudService } from 'app/main/apps/crud.service';
import { MessageDialogComponent } from 'app/main/shared/components/message-dialog/message-dialog.component';
import { MatDialogRef, MatDialog, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition, MatSnackBar } from '@angular/material';
import { DsSidebarService } from '@glits/components/sidebar/sidebar.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-payment-credit-approval',
  templateUrl: './payment-credit-approval.component.html',
  styleUrls: ['./payment-credit-approval.component.scss']
})
export class PaymentCreditApprovalComponent implements OnInit {
  pymntsAprvlLst: any;
  pymntAprvlColumnDefs;
  permissions;
  slctdAgnts: any;
  shwBtns: boolean = false;
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
  pageLdr : boolean;
  sdeMnuLdr : boolean;
  loader:boolean;
  // tslint:disable-next-line:typedef
  getHeaderDtls = function () { return { 'title': 'Credits To LMO Approvals', 'icon': 'money' }};
  shwPermMsg: string;
  
  
  constructor(public crdSrv: CrudService, public dialog: MatDialog, private _dsSidebarService: DsSidebarService, private _formBuilder: FormBuilder
    , public snackBar: MatSnackBar, public datePipe: DatePipe) { 
    // this.permissions = { 'slct_in': 1, 'insrt_in': 0, 'updt_in': 1, 'dlte_in': 1, 'exprt_in': 0 };
    // const permTxt = 'Payment Credits';
    // const prmeRte = `user/permissions/${permTxt}`;
    // this.crdSrv.get(prmeRte).subscribe((res) => {
    //   // console.log(res['data'][0]);
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
    this.slctdAgnts = [];
    this.loader = true;
    if (this.permissions == undefined){
      this.loader = false;
    }
    const rte = `billing/agent/payment/credit/approvals`;
    this.crdSrv.get(rte).subscribe((res) => {
      if (res['status'] === 200) {
        this.loader = false;
        this.pymntsAprvlLst = res['data'];
        if (res['perm']){
          this.permissions = res['perm'][0];
        } else{
          this.shwPermMsg = 'You do not have permissions to do this operation. Please contact Administrator to get permissions.';
        }
        this.pymntAprvlColumnDefs = [
          { headerName: 'S.No', field: 'sno', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 60, height: 40, filter: false },
          { headerName: 'LMO Name', field: 'agnt_nm', alignment: 'left', cellClass: 'pm-grid-number-cell', width: 200, height: 40, filter: true },
          { headerName: 'Transaction Number', field: 'trns_ref_nu', alignment: 'left', cellClass: 'pm-grid-number-cell', width: 200, height: 40, filter: true },
          { headerName: 'Bank Name', field: 'trnsn_bnk_nm', alignment: 'left', cellClass: 'pm-grid-number-cell', width: 200, height: 40, filter: true },
          { headerName: 'Description', field: 'cmnt_tx', alignment: 'left', cellClass: 'pm-grid-number-cell', width: 200, height: 40, filter: true },
          // tslint:disable-next-line:max-line-length
          { headerName: 'Transaction Amount', field: 'trnsn_at', alignment: 'right', type: 'currency', currency: 'INR', precision: '2' ,cellClass: 'pm-grid-number-cell', width: 200, height: 40, filter: true },
          { headerName: 'Transaction Date', field: 'trsn_dt', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 200, height: 40, filter: true }
        ];
      }
    });
  }

  getLgnUsrUploads(): void {
    this.shwBtns = false;
    this.slctdAgnts = [];
    this.loader=true;
    const rte = `billing/agent/payment/credit/approvals/user`;

    this.crdSrv.get(rte).subscribe((res) => {
      if (res['status'] === 200) {
        this.loader=false;
        this.pymntsAprvlByUsrLst = res['data'];

        this.pymntAprvlByUsrColumnDefs = [
          { headerName: 'S.No', field: 'sno', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 60, height: 40,filter:false },
          { headerName: 'LMO Name', field: 'agnt_nm', alignment: 'left', cellClass: 'pm-grid-number-cell', width: 200, height: 40, filter: true },
          { headerName: 'Transaction Number', field: 'trns_ref_nu', alignment: 'left', cellClass: 'pm-grid-number-cell', width: 200, height: 40, filter: true },
          { headerName: 'Bank Name', field: 'trnsn_bnk_nm', alignment: 'left', cellClass: 'pm-grid-number-cell', width: 200, height: 40, filter: true },
          { headerName: 'Description', field: 'cmnt_tx', alignment: 'left', cellClass: 'pm-grid-number-cell', width: 200, height: 40, filter: true },
          // tslint:disable-next-line:max-line-length
          { headerName: 'Transaction Amount', field: 'trnsn_at', alignment: 'right', type: 'currency', currency: 'INR', precision: '2' ,cellClass: 'pm-grid-number-cell', width: 200, height: 40, filter: true },
          { headerName: 'Transaction Date', field: 'trsn_dt', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 200, height: 40, filter: true }
        ];
      }
    });
  }


  getAllRcntUploads(): void {
    this.shwBtns = false;
    this.slctdAgnts = [];

    let pymntData = {
      frmDt: this.agntPymntsForm.value.pymntFrmDt !='' ? this.datePipe.transform(this.agntPymntsForm.value.pymntFrmDt, "yyyy-MM-dd") : '',
      toDt: this.agntPymntsForm.value.pymntToDt !='' ? this.datePipe.transform(this.agntPymntsForm.value.pymntToDt, "yyyy-MM-dd") : '',
    };
    this.loader=true;
    const rte = `billing/agent/payment/credit/approvals/recent`;

    this.crdSrv.create(pymntData, rte).subscribe((res) => {
      if (res['status'] === 200) {
        this.loader=false;
        this.rcntPymntsAprvlLst = res['data'];

        this.rcntPymntAprvlColumnDefs = [
          { headerName: 'S.No', field: 'sno', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 60, height: 40,filter:false },
          { headerName: 'LMO Name', field: 'agnt_nm', alignment: 'left', cellClass: 'pm-grid-number-cell', width: 200, height: 40, filter: true },
          { headerName: 'Transaction Number', field: 'trns_ref_nu', alignment: 'left', cellClass: 'pm-grid-number-cell', width: 200, height: 40, filter: true },
          { headerName: 'Bank Name', field: 'trnsn_bnk_nm', alignment: 'left', cellClass: 'pm-grid-number-cell', width: 200, height: 40, filter: true },
          { headerName: 'Description', field: 'cmnt_tx', alignment: 'left', cellClass: 'pm-grid-number-cell', width: 200, height: 40, filter: true },
          // tslint:disable-next-line:max-line-length
          { headerName: 'Transaction Amount', field: 'trnsn_at', alignment: 'right', type: 'currency', currency: 'INR', precision: '2' , cellClass: 'pm-grid-number-cell', width: 200, height: 40, filter: true },
          { headerName: 'Transaction Date', field: 'trsn_dt', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 200, height: 40, filter: true }
        ];
      }
    });
  }

  onRowSelected(event): void {
    this.slctdAgnts = event.selectedRowsData;

    if (this.slctdAgnts.length !== 0 ){
      this.shwBtns = true;
    } else{
      this.shwBtns = false;
    }
  }

  aprveCstmrWaveOffs(): void{

    this._dsSidebarService.getSidebar(this.openSidebarKey).toggleOpen();
  }

  saveAprveCstmrWaveOffs(): void{
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

      if (response === 'yes'){
        for (let u = 0; u < this.slctdAgnts.length; u++){
          this.slctdAgnts[u]['pymnt_aprvl_desc_tx'] = this.cstmrWaveOffFormGroup.value.pymnt_aprvl_desc_tx;
          this.slctdAgnts[u]['aprvl_in'] = 1;
          this.slctdAgnts[u]['wltBlCal_aprvl_in'] = 1;
          this.slctdAgnts[u]['trsn_dt'] = this.slctdAgnts[u].trsn_dt.split('-').reverse().join('-');
        }

        console.log(this.slctdAgnts);
        // return;
        const rte = `billing/agent/payment/approvals`;
        this.crdSrv.create(this.slctdAgnts, rte).subscribe((res) => {
          if (res['status'] === 200) {
            this.snackBar.open('Approved Sucessfully', '', {
              duration: 3000,
              horizontalPosition: this.horizontalPosition,
              verticalPosition: this.verticalPosition,
            });
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
        for (let u = 0; u < this.slctdAgnts.length; u++){
          this.slctdAgnts[u]['aprvl_in'] = 0;
        }
        const rte = `billing/agent/payment/approvals`;
        this.crdSrv.create(this.slctdAgnts, rte).subscribe((res) => {
          if (res['status'] === 200) {
            this.snackBar.open('Rejected Sucessfully', '', {
              duration: 3000,
              horizontalPosition: this.horizontalPosition,
              verticalPosition: this.verticalPosition,
            });
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
