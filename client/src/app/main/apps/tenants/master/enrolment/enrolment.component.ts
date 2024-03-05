import { Component, OnInit } from '@angular/core';
import { CrudService } from 'app/main/apps/crud.service';
import { Router, NavigationExtras } from '@angular/router';
import { MatDialogRef, MatDialog } from '@angular/material';
import { DeleteDialogComponent } from 'app/main/shared/components/delete-dialog/delete-dialog.component';
import { MessageDialogComponent } from 'app/main/shared/components/message-dialog/message-dialog.component';
import { TransfereService } from 'app/providers/transfer/transfer.service';

@Component({
  selector: 'app-enrolment',
  templateUrl: './enrolment.component.html',
  styleUrls: ['./enrolment.component.scss']
})
export class EnrolmentComponent implements OnInit {
  confirmMsgDialogRef: MatDialogRef<MessageDialogComponent>;
  permissions;
  columnDefs;
  rowData: any;
  confirmDialogRef: MatDialogRef<DeleteDialogComponent>;
  shwLdr = true;
  // shwrject: boolean = false;
  rejData: any;
  column;
  getHeaderDtls = function (): any { return { 'title': 'Enrollment List', 'icon': 'people_outline' }; };
  shwPermMsg: string;
  
  constructor(public crdsrv: CrudService, private router: Router, public dialog: MatDialog, public transfereService: TransfereService) {
    // this.permissions = { 'slct_in': 1, 'insrt_in': 0, 'updt_in': 1, 'dlte_in': 1, 'exprt_in': 1 };
    // let permTxt = 'Enrollment List';
    // let prmeRte = `user/permissions/${permTxt}`;
    // this.crdsrv.get(prmeRte).subscribe((res) => {
    //   console.log(res['data'][0]);
    //   this.permissions = res['data'][0];
    // });
  }

  ngOnInit(): any {
    this.shwLdr = true;
    this.getAgentLst();
    // this.getUsrPermissions();
  }

  // getUsrPermissions(): any {
  //   console.log('getUsrPermissions');
  //   let permTxt = 'Enrollment List';
  //   let prmeRte = `user/permissions/${permTxt}`;
  //   this.crdsrv.get(prmeRte).subscribe((res) => {
  //     console.log(res['data'][0]);
  //     this.permissions = res['data'][0];
  //   });
  // }

  tabChangeFn(event): any {
    console.log(event);
    // if (event.index == 0) {
    //   this.getAgentLst();
    // } else 
    // tslint:disable-next-line:triple-equals
    if (event.index == 1) {
      this.getAgentRejectLst();
    }
  }

  onCellClick(key, lmodata): any {
    let agntId;
    let prtnr_nm;
    if (lmodata == null) {
      agntId = '';
      prtnr_nm = '';
    } else {
      agntId = lmodata.data.agnt_id;
      prtnr_nm = lmodata.data.prtnr_nm;
    }
    // this.router.navigate(['admin/tenant'],
    //   { queryParams: { key: key, enrl_ind: 1, value: agntId, parameter: prtnr_nm }, skipLocationChange: true });
    // window.history.pushState('', '', 'admin/tenant');
    this.transfereService.setLoclData('data', {  key: key, value: agntId, parameter: prtnr_nm, enrl_ind: 1 });
    this.router.navigate([`/admin/tenant`]);
  }

  getAgentLst(): any {
    const rte = `agent/enrollments`;
    this.crdsrv.get(rte).subscribe((res) => {
      // tslint:disable-next-line:triple-equals
      if (res['status'] == 200) {
        let ct = 0;
        this.rowData = res['data'];
        console.log(this.rowData)
        this.rowData.filter(k => {
          k['sno'] = ++ct;
        });
        this.shwLdr = false;
        if (res['perm']){
          this.permissions = res['perm'][0];
        } else{
          this.shwPermMsg = 'You do not have permissions to do this operation. Please contact Administrator to get permissions.';
        }
        this.columnDefs = [
          { headerName: 'Sno', field: 'sno',  textAlign: 'center', cellClass: 'pm-grid-number-cell', width: 100, filter:false},
          { headerName: 'Tenant Name', field: 'agnt_nm', cellStyle: 'left', cellClass: 'pm-grid-number-cell', width: 265 },
          { headerName: 'Tenant Type', field: 'prtnr_nm', cellStyle: 'left', cellClass: 'pm-grid-number-cell', width: 150 },
          { headerName: 'Enrollment No', field: 'enrlt_nu', algnmnt:"center", cellClass: 'pm-grid-number-cell', width: 125 },
          { headerName: 'Enrolled Date', field: 'enrl_dt', algnmnt:"center", cellClass: 'pm-grid-number-cell', width: 125 },
          { headerName: 'Mobile Number', field: 'ofce_mbl_nu', algnmnt:"center", cellClass: 'pm-grid-number-cell', width:150 },
          { headerName: 'Village', field: 'ofc_vlg_nm',  cellClass: 'pm-grid-number-cell', width: 150 },
          { headerName: 'Mandal', field: 'ofc_mndl_nm',  cellClass: 'pm-grid-number-cell', width: 150 },
          { headerName: 'District', field: 'ofc_dstrct_nm',  cellClass: 'pm-grid-number-cell', width: 150 },
          { headerName: 'State Name', field: 'ofc_ste_nm',  cellClass: 'pm-grid-number-cell', width: 150 },
          { headerName: 'Gst No', field: 'gst_nu', hide: true,  cellClass: 'pm-grid-number-cell', width: 150 },
          // { headerName: 'Postal Registration No', field: 'pstl_reg_nu',  cellClass: 'pm-grid-number-cell', width: 265 },
          // { headerName: 'Postal Expiration Date', field: 'date',  cellClass: 'pm-grid-number-cell', width: 265 }
        ];
      }
    });
  }

  getAgentRejectLst(): any {
    this.shwLdr = true;
    const rte = `agent/enrollments/reject`;
    this.crdsrv.get(rte).subscribe((res) => {
      // tslint:disable-next-line:triple-equals
      if (res['status'] == 200) {
        // console.log(res['data']);
        this.rejData = res['data'];
        let ct = 0;
        this.shwLdr = false;
        this.rejData.filter(k => {
          k['sno'] = ++ct;
        });
        this.column = [
          { headerName: 'Sno', field: 'sno', textAlign: 'center', cellClass: 'pm-grid-number-cell', width: 100,filter:false },
          { headerName: 'Tenant Name', field: 'agnt_nm', cellStyle: 'left', cellClass: 'pm-grid-number-cell', width: 265 },
          { headerName: 'Enrollment No', field: 'enrlt_nu', algnmnt:"center", cellClass: 'pm-grid-number-cell', width: 125 },
          { headerName: 'Office Mobile Number', field: 'ofce_mbl_nu', algnmnt:"center", cellClass: 'pm-grid-number-cell', width: 150 },
          { headerName: 'Office State Name', field: 'ofc_ste_nm',  cellClass: 'pm-grid-number-cell', width: 150 },
          { headerName: 'Office District Name', field: 'ofc_dstrct_nm',  cellClass: 'pm-grid-number-cell', width: 150 },
          { headerName: 'Office Mandal Name', field: 'ofc_mndl_nm',  cellClass: 'pm-grid-number-cell', width: 150 },
          { headerName: 'Office Village Name', field: 'ofc_vlg_nm',  cellClass: 'pm-grid-number-cell', width: 150 },
          { headerName: 'Gst No', field: 'gst_nu', hide: true,  cellClass: 'pm-grid-number-cell', width: 150 },
          // { headerName: 'Postal Registration No', field: 'pstl_reg_nu',  cellClass: 'pm-grid-number-cell', width: 265 },
          // { headerName: 'Postal Expiration Date', field: 'date',  cellClass: 'pm-grid-number-cell', width: 265 }
        ];
      }
    });
  }

  rejectLmo(delDtls): any {
    console.log(delDtls);
    this.confirmDialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '25%',
      panelClass: 'my-class',
      data: {
        message: 'Are you sure reject this item ?', id: delDtls.data.agnt_id,
        nm: delDtls.data.agnt_nm, entityname: 'Tenant', flag: false, rte: `agent/reject/agent/${delDtls.data.agnt_id}`
      }
    });

    this.confirmDialogRef.afterClosed().subscribe((response) => {
      // tslint:disable-next-line:triple-equals
      if (response == undefined) { }
      // tslint:disable-next-line:triple-equals
      else if (response.status == 200) { this.getAgentLst();
        this.getAgentRejectLst(); }
    });
  }
  onCellUnrejectClick(dtls): any {
    console.log(dtls);
    let data;
    data = {
      title: 'Are you sure you want to Unreject',
      msg: dtls.data.agnt_id + '-' + dtls.data.agnt_nm,
      icon: 'account_circle',
      btnLst: [{
        label: 'Ok',
        res: 'ok'
      }, {
        label: 'Cancel',
        res: 'cancel'
      }]
    };
    this.confirmMsgDialogRef = this.dialog.open(MessageDialogComponent, {
      width: '25%',
      panelClass: 'my-class',
      data: data
    });
    this.confirmMsgDialogRef.afterClosed().subscribe((response) => {
      if (response) {
        if (response == 'ok') {
          const rte = `agent/unreject/agent/${dtls.data.agnt_id}`;
          this.crdsrv.get(rte).subscribe((res) => {
            if (res['status'] == 200) {
              console.log(res['data']);
              this.getAgentRejectLst();
              this.getAgentLst();
            }
          });

          // this.goBack();
          // this.router.navigate(['admin/tenant/enrolments']);
          // this._location.back();
          // this.updBtnDisable = true;
        } else {
          this.getAgentRejectLst();
        }
      }
    });
  }
}
