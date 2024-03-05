import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogRef, MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material';
import { TransfereService } from 'app/providers/transfer/transfer.service';
import { Router } from '@angular/router';
import { DsSidebarService } from '@glits/components/sidebar/sidebar.service';
import { CrudService } from '../../../crud.service';
import { MessageDialogComponent } from 'app/main/shared/components/message-dialog/message-dialog.component';
import { UserService } from 'app/providers/user/user.serivce';

@Component({
  selector: 'app-bulk-resume',
  templateUrl: './bulk-resume.component.html',
  styleUrls: ['./bulk-resume.component.scss']
})
export class BulkResumeComponent implements OnInit {
  loader: boolean;
  selectedItemKeys: any;
  disblesubmit: boolean = false;
    permissions: { slct_in: number; insrt_in: number; updt_in: number; dlte_in: number; exprt_in: number; };
  loading: boolean;
  rowData: any;
  shwPermMsg: string;
  columnDefs;
  showTble;
  public cstmrData: any;
  cmpltData: any;
  sdeMnuLdr = false;
  lmoColumnDefs = [];
  getHeaderDtls = function (): any { return { 'title': "Bulk CAF Activation", 'icon': 'people_outline' }; };
  msoLmoDtls: any;
  confirmMsgDialogRef: MatDialogRef<MessageDialogComponent>;
  complaintsview: any;
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  cmpltsdata: any;
  rowData1: any;
  lmocd: any;
  agnt_id: any;
  constructor(public crdsrv: CrudService, private router: Router, public dialog: MatDialog, public transfereService: 
    TransfereService, private _dsSidebarService: DsSidebarService, private userService: UserService) {  
    this.userService.USER_DETAILS.subscribe(val => {
      if (val.usr_ctgry_id == 8) {
        this.lmocd = val.lmo_cd;
        this.agnt_id = val.usr_ctgry_ky;
        console.log(this.agnt_id);
      }
    });
    
    this.permissions = { 'slct_in': 1, 'insrt_in': 0, 'updt_in': 1, 'dlte_in': 1, 'exprt_in': 1 };}

  ngOnInit() {
    this.suspendlstView();
  }
  suspendlstView(): any {
    this.loading = true;
    let data = {
      caf_nu: 0,
      mbl_nu: 0,
      adhar_nu: 0,
      agntID:this.agnt_id,
      sts:0,
    }
    const cmprte = `olt/suspended/cafs`;
    this.crdsrv.create(data,cmprte).subscribe((res) => {
      // console.log(this.cafDtlsData);
      if (res['status'] === 200) {
        this.loading = false;
        this.rowData = res['data'];
        // console.log(this.rowData);
        let counter = 0;
        this.rowData.filter((k) => {
          k['s_no'] = ++counter;
        });
        this.rowData.filter((k) => {
        
            k['shwChkBox'] = true;
          
        })
        if (res['perm']) {
          this.permissions = res['perm'][0];
        } else {
          this.shwPermMsg = 'You do not have permissions to do this operation. Please contact Administrator to get permissions.';
        }
        this.columnDefs = [
          { headerName: 'Sno', field: 's_no', cellStyle: { 'text-align': "center" }, cellClass: "pm-grid-number-cell", width: 80, sortable: true, filter: false },
          { headerName: 'CAF Number', field: 'caf_nu', cellStyle: { 'text-align': "center" }, cellClass: "pm-grid-number-cell", width: 180, sortable: true, filter: true },
          // { headerName: 'LMO Code', field: 'agnt_cd', cellStyle: { 'text-align': "center" }, cellClass: "pm-grid-number-cell", width: 180, sortable: true, filter: false },
          { headerName: 'Aadhar Number', field: 'adhr_nu', cellStyle: { 'text-align': "center" }, cellClass: "pm-grid-number-cell", width: 180, sortable: true, filter: true },
          { headerName: 'Mobile Number', field: 'mbl_nu', cellStyle: { 'text-align': "center" }, cellClass: "pm-grid-number-cell", width: 180, sortable: true, filter: true },
          { headerName: 'First Name', field: 'frst_nm', cellStyle: { 'text-align': "center" }, cellClass: "pm-grid-number-cell", width: 180, sortable: true, filter: true },
          { headerName: 'Last Name', field: 'lst_nm', cellStyle: { 'text-align': "center" }, cellClass: "pm-grid-number-cell", width: 180, sortable: true, filter: true },
          // { headerName: 'Address 1', field: 'instl_addr1_tx', cellStyle: { 'text-align': "center" }, cellClass: "pm-grid-number-cell", width: 120, sortable: true, filter: false },
          // { headerName: 'Address 2', field: 'instl_addr2_tx', cellStyle: { 'text-align': "center" }, cellClass: "pm-grid-number-cell", width: 150, sortable: true, filter: false },
          // { headerName: 'Locality', field: 'instl_lcly_tx', cellStyle: { 'text-align': "center" }, cellClass: "pm-grid-number-cell", width: 150, sortable: true, filter: false },
          // { headerName: 'Area', field: 'instl_ara_tx', cellStyle: { 'text-align': "center" }, cellClass: "pm-grid-number-cell", width: 150, sortable: true, filter: false },
          // { headerName: 'District', field: 'dstrt_nm', cellStyle: { 'text-align': "center" }, cellClass: "pm-grid-number-cell", width: 140, sortable: true, filter: false },
          // { headerName: 'Mandal', field: 'mndl_nm', cellStyle: { 'text-align': "center" }, cellClass: "pm-grid-number-cell", width: 150, sortable: true, filter: false },
          // { headerName: 'Village', field: 'vlge_nm', cellStyle: { 'text-align': "center" }, cellClass: "pm-grid-number-cell", width: 150, sortable: true, filter: false },
          { headerName: 'Last Suspended Date', field: 'spnd_dt', cellStyle: { 'text-align': "center" }, cellClass: "pm-grid-number-cell", width: 180, sortable: true, filter: true },
          { headerName: 'Days Suspended', field: 'spnd_count', cellStyle: { 'text-align': "center" }, cellClass: "pm-grid-number-cell", width: 180, sortable: true, filter: true },
          { headerName: 'Status', field: 'sts_nm', cellStyle: { 'text-align': "center" }, cellClass: "pm-grid-number-cell", width: 180, sortable: true, filter: true },

          // { headerName: 'Sno', field: 's_no', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 80, dataType: 'number', filter: true },
          // { headerName: 'Caf ID', field: 'caf_id', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 100, dataType: 'number', filter: true },
          // { headerName: 'Customer Name', field: 'cstmr_nm', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 150, dataType: 'string', filter: true },
          // { headerName: 'ONU Serial Number', field: 'onu_srl_nu', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 180, filter: true },
          // { headerName: 'IPTV Serial Number', field: 'iptv_srl_nu', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 150, filter: true },
          // { headerName: 'LMO Code', field: 'mrcht_usr_nm', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 150, filter: true },
          // { headerName: 'Mobile Number', field: 'mbl_nu', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 150, filter: true },
          // // { headerName: 'Action', field: 'Retrack', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 100, height: 40, },
        ];
      }
    });
  }

  slctdGnrtSlryLst = []
  selectionChanged(data: any) {
    console.log(data)
    this.disblesubmit = false;
    this.slctdGnrtSlryLst = [];
    this.selectedItemKeys = data.selectedRowKeys;
    const SELECTEDKEYS = data.selectedRowKeys.filter(i => i.shwChkBox === true);
    // Filters the Keys from currentSelectedRowKeys to disable the checkbox, and IsNameExists is true  
    const DISABLEDKEYS = data.currentSelectedRowKeys.filter(i => (i.shwChkBox == false));
    if (DISABLEDKEYS.length > 0) {
      data.component.deselectRows(DISABLEDKEYS);
    }
    this.slctdGnrtSlryLst = SELECTEDKEYS;
     console.log(this.slctdGnrtSlryLst)
  }
  overrideOnValueChanged(event) {
    if (event.parentType === "dataRow" && event.row.rowType === "data" && event.command === 'select') {
      event.editorOptions.disabled = !event.row.data.shwChkBox;
    }
  }
  PostBulkResume() {
    this.loading = true;
    console.log(this.selectedItemKeys.length);
    if (this.selectedItemKeys.length > 10) {
      this.loading = false;
      console.log("In message");
      this.confirmMsgDialogRef = this.dialog.open(MessageDialogComponent, {
        width: '25%',
        panelClass: 'my-class',
        data: {
          title: '',
          msg: 'Select Maximum 10 CAFs',
          btnLst: [{
            label: 'Ok',
            res: 'ok'

          }
          ]
        }
      });
    } else {
      console.log(this.selectedItemKeys);
      this.loading = true;
      this.disblesubmit = true;
   
      this.crdsrv.create(this.selectedItemKeys, 'caf_operations/bulk-resume').subscribe(res => {
        this.loading = false;
        this.disblesubmit = false;
        if (res['status'] === 200) {
          this.confirmMsgDialogRef = this.dialog.open(MessageDialogComponent, {
            width: '25%',
            panelClass: 'my-class',
            data: {
              title: '',
              msg: 'All CAFs Resume Successfully',
              btnLst: [{
                label: 'Ok',
                res: 'ok'
    
              }
              ]
            }
          });
          this.suspendlstView();
          // this.toastr.success('Ticket Approved Successfully');
        } else {
          // this.toastr.error(res['message']);
        }
       
      }, (err) => {
        this.loading = false;
        this.disblesubmit = false;
        this.confirmMsgDialogRef = this.dialog.open(MessageDialogComponent, {
          width: '25%',
          panelClass: 'my-class',
          data: {
            title: '',
            msg: 'Something went wrong. Please try again later.',
            btnLst: [{
              label: 'Ok',
              res: 'ok'
  
            }
            ]
          }
        });
		this.suspendlstView();
        // this.toastr.error("Something went wrong. Please try again later.");
      });
    }

  }
}
