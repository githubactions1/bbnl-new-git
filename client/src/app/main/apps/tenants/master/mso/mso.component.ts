import { Component, OnInit } from '@angular/core';
import { CrudService } from 'app/main/apps/crud.service';
import { Router, NavigationExtras } from '@angular/router';
import { MatDialogRef, MatDialog } from '@angular/material';
import { DeleteDialogComponent } from 'app/main/shared/components/delete-dialog/delete-dialog.component';
import { TransfereService } from 'app/providers/transfer/transfer.service';
@Component({
  selector: 'app-mso',
  templateUrl: './mso.component.html',
  styleUrls: ['./mso.component.scss']
})
export class MsoComponent implements OnInit {
  confirmDialogRef: MatDialogRef<DeleteDialogComponent>;
  permissions;
  columnDefs;
  rowData: any;
  loading: any;
  lmoColumnDefs = [];
  // tslint:disable-next-line:quotemark
  getHeaderDtls = function (): any { return { 'title': "MSO's Details", 'icon': 'people_outline' }; };
  msoLmoDtls: any;
  shwPermMsg: string;
  constructor(public crdsrv: CrudService, private router: Router, public dialog: MatDialog,  public transfereService: TransfereService) {
    // this.permissions = { 'slct_in': 1, 'insrt_in': 0, 'updt_in': 1, 'dlte_in': 1, 'exprt_in': 1 };
    // let permTxt = 'MSO List';
    // let prmeRte = `user/permissions/${permTxt}`;
    // this.crdsrv.get(prmeRte).subscribe((res) => {
    //   this.permissions = res['data'][0];
    // });
  }

  ngOnInit(): any {
    this.getAgentLst();
  }

  // onToolbarPreparing(e) {
  //   e.toolbarOptions.items.unshift({
  //     location: 'after',
  //     widget: 'dxButton',
  //     options: {
  //       icon: 'plus',
  //       text: 'Add MSO',
  //       onClick: this.onCellClick.bind(this, 'new', null),
  //       bindingOptions: {
  //         'disabled': 'isEmailButtonDisabled'
  //       }
  //     }
  //   });
  // }

  onCellClick(key, lmodata): any {
    let agntId;
    if (lmodata == null){
      agntId = '';
    } else {
      agntId = lmodata.data.mso_id;
    }
    this.transfereService.setLoclData('data', {  key: key, value: agntId, parameter: 'mso', enrl_ind: 0 });
    this.router.navigate([`/admin/tenant`]);
    // this.router.navigate(['admin/tenant'],
    //   { queryParams: {  key: key, value: agntId, parameter: 'mso' }, skipLocationChange: true });
    // window.history.pushState('', '', 'admin/tenant');
  }

  getAgentLst(): any{
    this.loading = true;
    const rte = `agent/mso`;
    this.crdsrv.get(rte).subscribe((res) => {
      if (res['status'] === 200) {
        this.loading = false;
        this.rowData = res['data'];
        let counter = 0;
        // let lmoCt = 0;
        this.rowData.filter((k) => {
          // lmoCt = 0;
          k['s_no'] = ++counter;
          // k['lmo_ct'] = k.lmoDtls.length;
          // k.lmoDtls.filter((l) => {
            
          //   l['s_no'] = ++lmoCt;
          // });
        });
        if (res['perm']){
          this.permissions = res['perm'][0];
        } else{
          this.shwPermMsg = 'You do not have permissions to do this operation. Please contact Administrator to get permissions.';
        }
        this.columnDefs = [
          { headerName: 'Sno', field: 's_no', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 100, dataType: 'number' },
          { headerName: 'MSO Name', field: 'mso_nm', alignment: 'left', cellClass: 'pm-grid-number-cell', width: 265, dataType: 'string'},
          { headerName: 'MSO Code', field: 'mso_cd', alignment: 'left', cellClass: 'pm-grid-number-cell', width: 150 },
          { headerName: 'Enrollmnet No', field: 'mso_enrlt_nu', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 150 },
          { headerName: 'Office Contact Name', field: 'mso_cntct_nm', alignment: 'left', cellClass: 'pm-grid-number-cell', width: 150 },
          { headerName: 'Office Mobile Number', field: 'mso_mbl_nu', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 150 },
          { headerName: 'Office State Name', field: 'mso_ofc_ste_nm', alignment: 'left', cellClass: 'pm-grid-number-cell', width: 150 },
          { headerName: 'Office District Name', field: 'mso_ofc_dstrct_nm', alignment: 'left', cellClass: 'pm-grid-number-cell', width: 150 },
          { headerName: 'Office Mandal Name', field: 'mso_ofc_mndl_nm', alignment: 'left', cellClass: 'pm-grid-number-cell', width: 150 },
          { headerName: 'Office Village Name', field: 'mso_ofc_vlg_nm', alignment: 'left', cellClass: 'pm-grid-number-cell', width: 150 },
          { headerName: 'Onboard Date', field: 'mso_onbrd_dt', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 150 },
          { headerName: 'No.of LMO\'s', field: 'lmo_ct', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 150 },
          // { headerName: 'Gst No', field: 'mso_gst_nu', alignment: 'left', cellClass: 'pm-grid-number-cell', width: 265 },
          // { headerName: 'Postal Registration No', field: 'mso_pstl_rgstn_nu', alignment: 'left', cellClass: 'pm-grid-number-cell', width: 150 },
          // { headerName: 'Postal Expiration Date', field: 'mso_reg_date', alignment: 'left', cellClass: 'pm-grid-number-cell', width: 150 }
        ];
      }
    });
  }

  onRowExpanding(e): any {
    e.component.collapseAll(-1);
    console.log(e.key);

    const rte = `agent/mso/lmo/${e.key.mso_id}`;
    this.crdsrv.get(rte).subscribe((res) => {
      this.msoLmoDtls = res['data'];
      console.log(this.msoLmoDtls);
    });
  }

  deleteMso(delDtls): any {
    this.confirmDialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '25%',
      panelClass: 'my-class',
      data: { message: 'Are you sure deleting this item ?', id: delDtls.data.agnt_id, 
              nm: delDtls.data.NAME, entityname: 'Agent', flag: false, rte: `agent/delAgent/${delDtls.data.agnt_id}` }
    });

    this.confirmDialogRef.afterClosed().subscribe((response) => {
      if (response === undefined) { }
      else if (response.status === 200) { this.getAgentLst(); }
    });
  }
}
