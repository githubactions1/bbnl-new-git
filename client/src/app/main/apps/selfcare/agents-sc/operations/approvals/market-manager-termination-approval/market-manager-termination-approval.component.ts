import { Component, OnInit } from '@angular/core';
import { CrudService } from 'app/main/apps/crud.service';
import { MessageDialogComponent } from 'app/main/shared/components/message-dialog/message-dialog.component';
import { MatDialogRef, MatDialog, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition, MatSnackBar } from '@angular/material';
import { DsSidebarService } from '@glits/components/sidebar/sidebar.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { TransfereService } from 'app/providers/transfer/transfer.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-market-manager-termination-approval',
  templateUrl: './market-manager-termination-approval.component.html',
  styleUrls: ['./market-manager-termination-approval.component.scss']
})
export class MarketManagerTerminationApprovalComponent implements OnInit {
  cafsTrmndAprvlLst: any;
  cafTrmndAprvlColumnDefs;
  permissions;
  slctdCafs: any;
  shwBtns = false;
  openSidebarKey = 'addFormPanel';
  confirmMsgDialogRef: MatDialogRef<MessageDialogComponent>;
  cafTrmndFormGroup: FormGroup;
  /**
      * @param {DsSidebarService} _dsSidebarService
      */
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  cafTrmndAprvlByUsrLst;
  cafTrmndAprvlByUsrColumnDefs;
  rcntcafsTrmndAprvlLst;
  rcntcafTrmndAprvlColumnDefs;
  cafTrmndForm: FormGroup;
  sdeMnuLdr = false;
  shwLdr = false;
  loader: boolean;
  postSlctdCafsData: any;
  // tslint:disable-next-line:typedef
  getHeaderDtls = function () { return { 'title': 'CAF Termination Approvals', 'icon': 'people' }; };
  rjctTrmnd: boolean;
  shwPermMsg: string;



  constructor(public crdSrv: CrudService, public dialog: MatDialog, private _dsSidebarService: DsSidebarService, private _formBuilder: FormBuilder
    , public snackBar: MatSnackBar, public datePipe: DatePipe, public TransfereService: TransfereService, public route: Router) {
    // this.permissions = { 'slct_in': 1, 'insrt_in': 0, 'updt_in': 1, 'dlte_in': 1, 'exprt_in': 0 };
    // const permTxt = 'CAF Termination';
    // const prmeRte = `user/permissions/${permTxt}`;
    // this.crdSrv.get(prmeRte).subscribe((res) => {
    //   // console.log(res['data'][0]);
    //   this.permissions = res['data'][0];
    // });
  }

  ngOnInit(): void {

    this.cafTrmndForm = this._formBuilder.group({
      cafTrmndFrmDt: [''],
      cafTrmndToDt: ['']
    });

    this.getcafsTrmndAprvlLst();

    this.cafTrmndFormGroup = this._formBuilder.group({
      caf_trmnd_aprvl_desc_tx: ['']
    });
  }

  tabChangeFn(event): void {
    if (event.index === 1) {
      this.getLgnUsrUploads();
    } else if (event.index === 2) {
      this.getAllRcntUploads();
    }
  }

  getcafsTrmndAprvlLst(): void {
    this.shwBtns = false;
    this.slctdCafs = [];
    this.loader = true;
    const rte = `caf/terminate/request/cafs/approval`;
    this.crdSrv.get(rte).subscribe((res) => {
      if (res['status'] === 200) {
        this.loader = false;
        this.cafsTrmndAprvlLst = res['data'];
        // console.log(this.cafsTrmndAprvlLst);
        let ct = 0;
        this.cafsTrmndAprvlLst.filter((k) => {
          k['sno'] = ++ct;
        });
        if (res['perm']){
          this.permissions = res['perm'][0];
        } else{
          this.shwPermMsg = 'You do not have permissions to do this operation. Please contact Administrator to get permissions.';
        }
        this.cafTrmndAprvlColumnDefs = [
          { headerName: 'S.No', field: 'sno', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 60, height: 40, filter: false, columnFiltering: false },
          { headerName: 'LMO Code', field: 'agnt_cd', alignment: 'left', cellClass: 'pm-grid-number-cell', width: 200, height: 40, filter: true, columnFiltering: false },
          { headerName: 'LMO Name', field: 'agnt_nm', alignment: 'left', cellClass: 'pm-grid-number-cell', width: 200, height: 40, filter: true, columnFiltering: false },
          {
            headerName: 'LMO Balance Amount', field: 'agnt_blnce_at', type: 'currency', currency: 'INR', precision: '2',
            alignment: 'right', cellClass: 'pm-grid-number-cell', width: 200, height: 40, filter: false, columnFiltering: false
          },
          { headerName: 'Customer Name', field: 'cstmr_nm', alignment: 'left', cellClass: 'pm-grid-number-cell', width: 200, height: 40, filter: true, columnFiltering: false },
          { headerName: 'CAF No', field: 'caf_nu', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 200, height: 40, filter: true, columnFiltering: false },
          { headerName: 'CAF Type', field: 'caf_type_nm', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 200, height: 40, filter: false, columnFiltering: true },
          {
            headerName: 'Email', field: 'instl_eml1_tx==0:"NA"?instl_eml1_tx', alignment: 'left', cellClass: 'pm-grid-number-cell', width: 200, height: 40,
            filter: true, columnFiltering: false
          },
          { headerName: 'Mobile', field: 'mbl_nu', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 200, height: 40, filter: true, columnFiltering: false },
          { headerName: 'Location', field: 'instl_addr1_tx', alignment: 'left', cellClass: 'pm-grid-number-cell', width: 200, height: 40, filter: true, columnFiltering: false },
          { headerName: 'Adhar No', field: 'adhr_nu', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 200, height: 40, filter: true, columnFiltering: false },
          {
            headerName: 'Activation Date', field: 'actvn_dt',
            dataType: 'date', format: 'dd-MM-yyyy', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 200, height: 40, filter: true, columnFiltering: false
          }
        ];
      }
    });
  }

  getLgnUsrUploads(): void {
    this.shwBtns = false;
    this.slctdCafs = [];
    this.loader = true;
    const rte = `caf/terminate/request/cafs/approved/user`;

    this.crdSrv.get(rte).subscribe((res) => {
      if (res['status'] === 200) {
        this.loader = false;
        this.cafTrmndAprvlByUsrLst = res['data'];
        let ct = 0;
        this.cafTrmndAprvlByUsrLst.filter((k) => {
          k['sno'] = ++ct;
        });

        this.cafTrmndAprvlByUsrColumnDefs = [
          { headerName: 'S.No', field: 'sno', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 60, height: 40, filter: false, columnFiltering: false },
          { headerName: 'LMO Code', field: 'agnt_cd', alignment: 'left', cellClass: 'pm-grid-number-cell', width: 200, height: 40, filter: true, columnFiltering: false },
          { headerName: 'LMO Name', field: 'agnt_nm', alignment: 'left', cellClass: 'pm-grid-number-cell', width: 200, height: 40, filter: true, columnFiltering: false },
          {
            headerName: 'LMO Balance Amount', field: 'agnt_blnce_at', type: 'currency', currency: 'INR', precision: '2',
            alignment: 'right', cellClass: 'pm-grid-number-cell', width: 200, height: 40, filter: false, columnFiltering: false
          },
          { headerName: 'Customer Name', field: 'cstmr_nm', alignment: 'left', cellClass: 'pm-grid-number-cell', width: 200, height: 40, filter: true, columnFiltering: false },
          { headerName: 'CAF No', field: 'caf_nu', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 200, height: 40, filter: true, columnFiltering: false },
          { headerName: 'CAF Type', field: 'caf_type_nm', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 200, height: 40, filter: false, columnFiltering: true },
          {
            headerName: 'Email', field: 'instl_eml1_tx==0:"NA"?instl_eml1_tx', alignment: 'left', cellClass: 'pm-grid-number-cell', width: 200, height: 40,
            filter: true, columnFiltering: false
          },
          { headerName: 'Mobile', field: 'mbl_nu', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 200, height: 40, filter: true, columnFiltering: false },
          { headerName: 'Location', field: 'instl_addr1_tx', alignment: 'left', cellClass: 'pm-grid-number-cell', width: 200, height: 40, filter: true, columnFiltering: false },
          { headerName: 'Adhar No', field: 'adhr_nu', alignment: 'left', cellClass: 'pm-grid-number-cell', width: 200, height: 40, filter: true, columnFiltering: false },
          {
            headerName: 'Activation Date', field: 'actvn_dt',
            dataType: 'date', format: 'dd-MM-yyyy', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 200, height: 40, filter: true, columnFiltering: false
          },
          {
            headerName: 'Termination Request Date', field: 'trmnd_req_dt', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 200, height: 40,
            filter: true, columnFiltering: false
          },
          { headerName: 'Termination Date', field: 'aprvd_ts', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 200, height: 40, filter: true, columnFiltering: false }
        ];
      }
    });
  }


  getAllRcntUploads(): void {
    this.shwBtns = false;
    this.slctdCafs = [];

    const pymntData = {
      frmDt: this.cafTrmndForm.value.cafTrmndFrmDt !== '' ? this.datePipe.transform(this.cafTrmndForm.value.cafTrmndFrmDt, 'yyyy-MM-dd') : '',
      toDt: this.cafTrmndForm.value.cafTrmndToDt !== '' ? this.datePipe.transform(this.cafTrmndForm.value.cafTrmndToDt, 'yyyy-MM-dd') : '',
    };
    this.loader = true;
    const rte = `caf/terminate/request/cafs/approved/recent`;

    this.crdSrv.create(pymntData, rte).subscribe((res) => {
      if (res['status'] === 200) {
        this.loader = false;
        this.rcntcafsTrmndAprvlLst = res['data'];
        let ct = 0;
        this.rcntcafsTrmndAprvlLst.filter((k) => {
          k['sno'] = ++ct;
        });
        this.rcntcafTrmndAprvlColumnDefs = [
          { headerName: 'S.No', field: 'sno', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 60, height: 40, filter: false, columnFiltering: false },
          { headerName: 'LMO Code', field: 'agnt_cd', alignment: 'left', cellClass: 'pm-grid-number-cell', width: 200, height: 40, filter: true, columnFiltering: false },
          { headerName: 'LMO Name', field: 'agnt_nm', alignment: 'left', cellClass: 'pm-grid-number-cell', width: 200, height: 40, filter: true, columnFiltering: false },
          {
            headerName: 'LMO Balance Amount', field: 'agnt_blnce_at', type: 'currency', currency: 'INR', precision: '2',
            alignment: 'right', cellClass: 'pm-grid-number-cell', width: 200, height: 40, filter: false, columnFiltering: false
          },
          { headerName: 'Customer Name', field: 'cstmr_nm', alignment: 'left', cellClass: 'pm-grid-number-cell', width: 200, height: 40, filter: true, columnFiltering: false },
          { headerName: 'CAF No', field: 'caf_nu', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 200, height: 40, filter: true, columnFiltering: false },
          { headerName: 'CAF Type', field: 'caf_type_nm', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 200, height: 40, filter: false, columnFiltering: true },
          // tslint:disable-next-line:max-line-length
          { headerName: 'Email', field: 'instl_eml1_tx==0:"NA"?instl_eml1_tx', alignment: 'left', cellClass: 'pm-grid-number-cell', width: 200, height: 40, filter: true, columnFiltering: false },
          { headerName: 'Mobile', field: 'mbl_nu', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 200, height: 40, filter: true, columnFiltering: false },
          { headerName: 'Location', field: 'instl_addr1_tx', alignment: 'left', cellClass: 'pm-grid-number-cell', width: 200, height: 40, filter: true, columnFiltering: false },
          { headerName: 'Adhar No', field: 'adhr_nu', alignment: 'left', cellClass: 'pm-grid-number-cell', width: 200, height: 40, filter: true, columnFiltering: false },
          {
            headerName: 'Activation Date', field: 'actvn_dt',
            dataType: 'date', format: 'dd-MM-yyyy', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 200, height: 40, filter: true, columnFiltering: false
          },
          {
            headerName: 'Termination Request Date', field: 'trmnd_req_dt', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 200, height: 40,
            filter: true, columnFiltering: false
          },
          { headerName: 'Termination Date', field: 'aprvd_ts', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 200, height: 40, filter: true, columnFiltering: false }
        ];
      }
    });
  }

  onRowSelected(event): void {
    this.slctdCafs = event.selectedRowsData;

    if (this.slctdCafs.length !== 0) {
      this.shwBtns = true;
    } else {
      this.shwBtns = false;
    }
  }

  aprveCafsTrmnd(): void {
    this.rjctTrmnd = false;
    this._dsSidebarService.getSidebar(this.openSidebarKey).toggleOpen();
  }


  saveaprveCafsTrmnd(): void {
    if (this.rjctTrmnd == false) {
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
          this.postSlctdCafsData = [];
          if (response === 'yes') {
            for (let u = 0; u < this.slctdCafs.length; u++) {
              this.postSlctdCafsData.push({
                caf_id: this.slctdCafs[u].caf_id, caf_trmnd_aprvl_desc_tx: this.cafTrmndFormGroup.value.caf_trmnd_aprvl_desc_tx,
                trmnd: 'trmnd_in'
              });
            }
            console.log(this.postSlctdCafsData);
            // return;
            this.shwLdr = true;
            const rte = `caf/manager/terminate/cafs/approval`;
            this.crdSrv.create(this.postSlctdCafsData, rte).subscribe((res) => {
              if (res['status'] === 200) {
                this.shwLdr = false;
                this.snackBar.open('Approved Sucessfully', '', {
                  duration: 3000,
                  horizontalPosition: this.horizontalPosition,
                  verticalPosition: this.verticalPosition,
                });
                this.shwBtns = false;
                this.closeSideBar();
                this.getcafsTrmndAprvlLst();
              }
            });
          }
        }
      });
    } else {
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

          if (response === 'yes') {
            this.postSlctdCafsData = [];
            for (let u = 0; u < this.slctdCafs.length; u++) {
              this.postSlctdCafsData.push({
                caf_id: this.slctdCafs[u].caf_id, caf_trmnd_aprvl_desc_tx: this.cafTrmndFormGroup.value.caf_trmnd_aprvl_desc_tx,
                trmnd: 'rjctd_in', rjct_cmntx_tx: 'rjctd2_cmnt_tx'
              });
              // this.slctdCafs[u]['trmnd'] = 'rjctd_in';
            }
            console.log(this.postSlctdCafsData);
            // return;
            const rte = `caf/terminate/cafs/reject`;
            this.crdSrv.create(this.slctdCafs, rte).subscribe((res) => {
              if (res['status'] === 200) {
                this.snackBar.open('Rejected Sucessfully', '', {
                  duration: 3000,
                  horizontalPosition: this.horizontalPosition,
                  verticalPosition: this.verticalPosition,
                });
                this.shwBtns = false;
                this.getcafsTrmndAprvlLst();
              }
            });
          }
        }
      });
    }

  }

  rjctCafTrmnd(): void {
    this.rjctTrmnd = true;
    this._dsSidebarService.getSidebar(this.openSidebarKey).toggleOpen();
  }


  // rjctCafTrmnd(): void{
  //   this.confirmMsgDialogRef = this.dialog.open(MessageDialogComponent, {
  //     width: '25%',
  //     panelClass: 'my-class',
  //     data: {
  //         title: 'Are you sure',
  //         msg: 'You really want to reject them',
  //         btnLst: [{
  //             label: 'Yes',
  //             res: 'yes'
  //         }, {
  //           label: 'No',
  //           res: 'no'
  //       }]
  //     }
  // });
  // this.confirmMsgDialogRef.afterClosed().subscribe((response) => {
  //   if (response) {

  //     if (response === 'yes'){
  //       this.postSlctdCafsData = [];
  //       for (let u = 0; u < this.slctdCafs.length; u++){
  //         this.postSlctdCafsData.push({caf_id: this.slctdCafs[u].caf_id, caf_trmnd_aprvl_desc_tx: this.cafTrmndFormGroup.value.caf_trmnd_aprvl_desc_tx,
  //           trmnd: 'rjctd_in'});
  //         // this.slctdCafs[u]['trmnd'] = 'rjctd_in';
  //       }
  //       console.log(this.postSlctdCafsData);
  //       return;
  //       const rte = `caf/terminate/cafs/reject`;
  //       this.crdSrv.create(this.slctdCafs, rte).subscribe((res) => {
  //         if (res['status'] === 200) {
  //           this.snackBar.open('Rejected Sucessfully', '', {
  //             duration: 3000,
  //             horizontalPosition: this.horizontalPosition,
  //             verticalPosition: this.verticalPosition,
  //           });
  //           this.shwBtns = false;
  //           this.getcafsTrmndAprvlLst();
  //         }
  //       });
  //     }
  //   }
  // });
  // }

  closeSideBar(): void {
    this._dsSidebarService.getSidebar('addFormPanel').toggleOpen();
  }
  onviewClick(data) {
    // console.log(data);
    this.TransfereService.setLoclData('data', data.row.data);
    this.route.navigate([`/admin/caf/customer/profile`]);
  }

}
