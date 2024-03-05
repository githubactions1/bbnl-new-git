import { Component, OnInit } from '@angular/core';
import { CrudService } from 'app/main/apps/crud.service';
import { MessageDialogComponent } from 'app/main/shared/components/message-dialog/message-dialog.component';
import { MatDialogRef, MatDialog, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition, MatSnackBar } from '@angular/material';
import { DsSidebarService } from '@glits/components/sidebar/sidebar.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-customer-waveoff-approvals',
  templateUrl: './customer-waveoff-approvals.component.html',
  styleUrls: ['./customer-waveoff-approvals.component.scss']
})
export class CustomerWaveoffApprovalsComponent implements OnInit {
  cstmrWaveOffLst: any;
  cstmrWaveOffColumnDefs;
  permissions;
  slctdCstmrs: any;
  shwBtns = false;
  openSidebarKey = 'addFormPanel';
  confirmMsgDialogRef: MatDialogRef<MessageDialogComponent>;
  cstmrWaveOffFormGroup: FormGroup;
  /**
      * @param {DsSidebarService} _dsSidebarService
      */
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  cstmrWaveOffByUsrLst;
  cstmrWaveOffByUsrColumnDefs;
  recentCstmrWaveOffLst;
  recentCstmrWaveOffColumnDefs;
  cstmrWvrForm: FormGroup;
  sdeMnuLdr = false;
  shwLdr = false;
  loader:boolean;
  // tslint:disable-next-line:typedef
  getHeaderDtls = function () { return { 'title': 'Customer Waivers Approvals', 'icon': 'money' }; };
  shwPermMsg: string;
  
  
  constructor(public crdSrv: CrudService, public dialog: MatDialog, private _dsSidebarService: DsSidebarService, private _formBuilder: FormBuilder
    , public snackBar: MatSnackBar, public datePipe: DatePipe) { 
    // this.permissions = { 'slct_in': 1, 'insrt_in': 0, 'updt_in': 1, 'dlte_in': 1, 'exprt_in': 0 };
    // const permTxt = 'Customer Waivers';
    // const prmeRte = `user/permissions/${permTxt}`;
    // this.crdSrv.get(prmeRte).subscribe((res) => {
    //   // console.log(res['data'][0]);
    //   this.permissions = res['data'][0];
    // });
  }

  ngOnInit(): void {
    this.cstmrWvrForm = this._formBuilder.group({
      cstmrWvrFrmDt: [''],
      cstmrWvrToDt: ['']
    });
    this.getCstmrWaveOffLst();

    this.cstmrWaveOffFormGroup = this._formBuilder.group({
      wvr_aprvl_desc_tx: ['']
    });
  }

  tabChangeFn(event): void {
    if (event.index === 1) {
      this.getLgnUsrUploads();
    } else if (event.index === 2) {
      this.getAllRcntUploads();
    }
  }

  getCstmrWaveOffLst(): void {
    this.loader=true;
    // if (this.permissions == undefined){
    //   this.loader = false;
    // }
    const rte = `billing/customer/caf/waveoffs/approvals`;
    this.crdSrv.get(rte).subscribe((res) => {
      if (res['status'] === 200) {
        this.loader=false;
        this.cstmrWaveOffLst = res['data'];
        let ct = 0;
        this.cstmrWaveOffLst.filter((k) => {
          k['sno'] = ++ct;
        });
        if (res['perm']){
          this.permissions = res['perm'][0];
        } else{
          this.shwPermMsg = 'You do not have permissions to do this operation. Please contact Administrator to get permissions.';
        }
        // console.log(this.cstmrWaveOffLst);
        this.cstmrWaveOffColumnDefs = [
          { headerName: 'S.No', field: 'sno', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 60, height: 40 , filter: false, columnFiltering: false},
          { headerName: 'CAF Name', field: 'cstmr_nm', alignment: 'left', cellClass: 'pm-grid-number-cell', width: 200, height: 40, filter: true , columnFiltering: false},
          { headerName: 'CAF No', field: 'caf_nu', alignment: 'left', cellClass: 'pm-grid-number-cell', width: 200, height: 40, filter: true , columnFiltering: false},
          { headerName: 'CAF Type', field: 'caf_type_nm', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 200, height: 40, filter: false, columnFiltering: true },
          { headerName: 'Email', field: 'instl_eml1_tx==0:"NA"?instl_eml1_tx', alignment: 'left', cellClass: 'pm-grid-number-cell', width: 200, height: 40, filter: true , columnFiltering: false},
          { headerName: 'Mobile', field: 'mbl_nu', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 200, height: 40, filter: true , columnFiltering: false},
          { headerName: 'Location', field: 'instl_addr1_tx', alignment: 'left', cellClass: 'pm-grid-number-cell', width: 200, height: 40, filter: true , columnFiltering: false},
          { headerName: 'Effective Date', field: 'efcte_dt', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 200, height: 40, filter: true , columnFiltering: false},
          { headerName: 'Expiry Date', field: 'expry_dt', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 200, height: 40, filter: true , columnFiltering: false}
        ];
      }
    });
  }
  
  getLgnUsrUploads(): void {
    this.loader=true;
    const rte = `billing/customer/caf/waveoffs/approvals/user`;
    this.crdSrv.get(rte).subscribe((res) => {
      if (res['status'] === 200) {
        this.loader=false;
        let ct = 0;
        this.cstmrWaveOffByUsrLst = res['data'];
        this.cstmrWaveOffByUsrLst.filter((k) => {
          k['sno'] = ++ct;
        });
        this.cstmrWaveOffByUsrColumnDefs = [
          { headerName: 'S.No', field: 'sno', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 60, height: 40 , columnFiltering: false},
          { headerName: 'CAF Name', field: 'cstmr_nm', alignment: 'left', cellClass: 'pm-grid-number-cell', width: 200, height: 40, filter: true , columnFiltering: false},
          { headerName: 'CAF No', field: 'caf_nu', alignment: 'left', cellClass: 'pm-grid-number-cell', width: 200, height: 40, filter: true , columnFiltering: false},
          { headerName: 'CAF Type', field: 'caf_type_nm', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 200, height: 40, filter: false, columnFiltering: true },
          { headerName: 'Email', field: 'instl_eml1_tx==0:"NA"?instl_eml1_tx', alignment: 'left', cellClass: 'pm-grid-number-cell', width: 200, height: 40, filter: true , 
          columnFiltering: false},
          { headerName: 'Mobile', field: 'mbl_nu', alignment: 'left', cellClass: 'pm-grid-number-cell', width: 200, height: 40, filter: true , columnFiltering: false},
          { headerName: 'Location', field: 'instl_addr1_tx', alignment: 'left', cellClass: 'pm-grid-number-cell', width: 200, height: 40, filter: true , columnFiltering: false},
          { headerName: 'Effective Date', field: 'efcte_dt', alignment: 'left', cellClass: 'pm-grid-number-cell', width: 200, height: 40, filter: true , columnFiltering: false},
          { headerName: 'Expiry Date', field: 'expry_dt', alignment: 'left', cellClass: 'pm-grid-number-cell', width: 200, height: 40, filter: true , columnFiltering: false}
        ];
      }
    });
  }

  getAllRcntUploads(): void {

    const cstmrWvrData = {
      frmDt: this.cstmrWvrForm.value.cstmrWvrFrmDt !== '' ? this.datePipe.transform(this.cstmrWvrForm.value.cstmrWvrFrmDt, 'yyyy-MM-dd') : '',
      toDt: this.cstmrWvrForm.value.cstmrWvrToDt !== '' ? this.datePipe.transform(this.cstmrWvrForm.value.cstmrWvrToDt, 'yyyy-MM-dd') : '',
    };
    this.loader=true;
    const rte = `billing/customer/caf/waveoffs/approvals/recent`;
    this.crdSrv.create(cstmrWvrData, rte).subscribe((res) => {
      if (res['status'] === 200) {
        this.loader=false;
        let ct = 0;
        this.recentCstmrWaveOffLst = res['data'];
        this.recentCstmrWaveOffLst.filter((k) => {
          k['sno'] = ++ct;
        });
        this.recentCstmrWaveOffColumnDefs = [
          { headerName: 'S.No', field: 'sno', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 60, height: 40 , columnFiltering: false},
          { headerName: 'CAF Name', field: 'cstmr_nm', alignment: 'left', cellClass: 'pm-grid-number-cell', width: 200, height: 40, filter: true , columnFiltering: false},
          { headerName: 'CAF No', field: 'caf_nu', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 200, height: 40, filter: true , columnFiltering: false},
          { headerName: 'CAF Type', field: 'caf_type_nm', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 200, height: 40, filter: false, columnFiltering: true },
          { headerName: 'Email', field: 'instl_eml1_tx==0:"NA"?instl_eml1_tx', alignment: 'left', cellClass: 'pm-grid-number-cell', width: 200, height: 40, filter: true , columnFiltering: false},
          { headerName: 'Mobile', field: 'mbl_nu', alignment: 'left', cellClass: 'pm-grid-number-cell', width: 200, height: 40, filter: true , columnFiltering: false},
          { headerName: 'Location', field: 'instl_addr1_tx', alignment: 'left', cellClass: 'pm-grid-number-cell', width: 200, height: 40, filter: true , columnFiltering: false},
          { headerName: 'Effective Date', field: 'efcte_dt', alignment: 'left', cellClass: 'pm-grid-number-cell', width: 200, height: 40, filter: true , columnFiltering: false},
          { headerName: 'Expiry Date', field: 'expry_dt', alignment: 'left', cellClass: 'pm-grid-number-cell', width: 200, height: 40, filter: true , columnFiltering: false}
        ];
      }
    });
  }

  onRowSelected(event): void {
    this.slctdCstmrs = event.selectedRowsData;

    if (this.slctdCstmrs.length !== 0 ){
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
        for (let u = 0; u < this.slctdCstmrs.length; u++){
          this.slctdCstmrs[u]['wvr_aprvl_desc_tx'] = this.cstmrWaveOffFormGroup.value.wvr_aprvl_desc_tx;
          this.slctdCstmrs[u]['aprvl_in'] = 1;
        }

        const rte = `billing/customer/caf/waveoffs/approvals`;
        this.crdSrv.create(this.slctdCstmrs, rte).subscribe((res) => {
          if (res['status'] === 200) {
            this.snackBar.open('Approved Sucessfully', '', {
              duration: 3000,
              horizontalPosition: this.horizontalPosition,
              verticalPosition: this.verticalPosition,
            });
            this.shwBtns = false;
            this.closeSideBar();
            this.getCstmrWaveOffLst();
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
        for (let u = 0; u < this.slctdCstmrs.length; u++){
          this.slctdCstmrs[u]['aprvl_in'] = 0;
        }
        const rte = `billing/customer/caf/waveoffs/approvals`;
        this.crdSrv.create(this.slctdCstmrs, rte).subscribe((res) => {
          if (res['status'] === 200) {
            this.snackBar.open('Rejected Sucessfully', '', {
              duration: 3000,
              horizontalPosition: this.horizontalPosition,
              verticalPosition: this.verticalPosition,
            });
            this.getCstmrWaveOffLst();
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
