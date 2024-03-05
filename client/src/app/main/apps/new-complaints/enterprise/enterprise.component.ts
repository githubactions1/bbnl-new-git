import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogRef, MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material';
import { TransfereService } from 'app/providers/transfer/transfer.service';
import { Router } from '@angular/router';
import { DsSidebarService } from '@glits/components/sidebar/sidebar.service';
import { CrudService } from '../../crud.service';
import { DeleteDialogComponent } from 'app/main/shared/components/delete-dialog/delete-dialog.component';
import { UserService } from 'app/providers/user/user.serivce';

@Component({
  selector: 'app-enterprise',
  templateUrl: './enterprise.component.html',
  styleUrls: ['./enterprise.component.scss']
})
export class EnterpriseComponent implements OnInit {
    confirmDialogRef: MatDialogRef<DeleteDialogComponent>;
  permissions;
  columnDefs;
  showTble;
  public cstmrData: any;
  rowData: any;
  loading: any;
  cmpltData:any;
  sdeMnuLdr = false;
  lmoColumnDefs = [];
  // tslint:disable-next-line:quotemark
  getHeaderDtls = function (): any { return { 'title': "Enterprise Report", 'icon': 'people_outline' }; };
  msoLmoDtls: any;
  complaintsview: any;
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  shwPermMsg : string;
    cmpltsdata: any;
  constructor(public crdsrv: CrudService, private router: Router, public dialog: MatDialog,  public transfereService: TransfereService, private _dsSidebarService: DsSidebarService) {
    this.permissions = { 'slct_in': 1, 'insrt_in': 0, 'updt_in': 1, 'dlte_in': 1, 'exprt_in': 1 };
    // let permTxt = 'MSO List';
    // let prmeRte = `user/permissions/${permTxt}`;
    // this.crdsrv.get(prmeRte).subscribe((res) => {
    //   this.permissions = res['data'][0];
    // });
  }

  ngOnInit(): any {
    this.getcomplaintLst();
  }

  
  getcomplaintLst(): any{
    this.loading = true;
    const cmprte = `lmoprepaid/enterpricecallcntr`;
    this.crdsrv.get(cmprte).subscribe((res) => {
      if (res['status'] === 200) {
        this.loading = false;
        this.rowData = res['data'];
        let counter = 0;
        this.rowData.filter((k) => {
          k['s_no'] = ++counter;
        });
        if (res['perm']){
          this.permissions = res['perm'][0];
        } else{
          this.shwPermMsg = 'You do not have permissions to do this operation. Please contact Administrator to get permissions.';
        }
        this.columnDefs = [
          { headerName: 'Sno', field: 'sno', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 80, dataType: 'number', filter: true },
          { headerName: 'Timestamp', field: 'Timestamp', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 150,filter: true },
          { headerName: 'Organisaton Name', field: 'organization_Name', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 200, dataType: 'number', filter: true },
          { headerName: 'Lmo Code', field: 'agnt_cd', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 100, dataType: 'number', filter: true },
		  { headerName: 'Ticket Created By', field: 'tkt_rse_by', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 150,filter: true },
          { headerName: 'District', field: 'dstrct', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 150,filter: true },
          { headerName: 'Caf Id', field: 'caf_id', alignment:'center', cellClass: 'pm-grid-number-cell', width: 100, dataType: 'number', filter: true },
          { headerName: 'Issue Type', field: 'Issue_type', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 150, dataType: 'string' ,filter: true},
          { headerName: 'Concerned Team', field: 'concern_team', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 150,filter: true },
          { headerName: 'Ticket Status', field: 'ticket_status', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 150,filter: true },
          { headerName: 'Remarks', field: 'rmrks', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 100 ,filter: true},
          { headerName: 'Caller Mobile', field: 'cll_mbl', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 150 ,filter: true},
          { headerName: 'Caller Type', field: 'cll_typ', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 160 ,filter: true},
		  { headerName: 'Created On', field: 'dateCreated', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 150 ,filter: true}, 
          { headerName: 'Created Date', field: 'createdDate', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 150 ,filter: true},
          { headerName: 'Email Address', field: 'email_add', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 150 ,filter: true},
		  { headerName: 'Closed On', field: 'closedatetime', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 150 ,filter: true}, 
          { headerName: 'Closed Date', field: 'closedate', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 150 ,filter: true},
          { headerName: 'Total Time', field: 'datediff', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 150 ,filter: true},
          //{ headerName: 'Department Code', field: 'dprt_cd', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 180 ,filter: true},  
        ];
      }
    });
  }
  onCellPrepared(colDef, e) {
    
    if (e.rowType === "data" && e.row.data && e.column.dataField == 'Edit') {
      e.cellElement.style.color = '#ff0000';
      e.cellElement.style.fontWeight = 500;
       e.cellElement.style.background= 'rgba(243, 191, 176, 0.2784313725490196)';
       e.cellElement.style.backgroundClip= 'content-box';
       e.cellElement.style.cursor = "pointer";
    }

}
onCellClick(event): any{
  console.log(event.value);
  if (event.value == 'Edit'){
   this.cstmrData = event.data;
   console.log(event.data);
  this.openSideBar();
  }
}

// Reset(Form) {
//     this.showTble = false
//     Form.reset()
//     // console.log(this.cafFRm)
//     // this.crdSrv.create({}, "caf/caf").subscribe(() => {

//     // })
//   }

  openSideBar(): any {
    this._dsSidebarService.getSidebar('addFormPanel1').toggleOpen();
  }
  closeSideBar(): any {
    this._dsSidebarService.getSidebar('addFormPanel1').toggleOpen();
  }


  onRowExpanding(e): any {
    e.component.collapseAll(-1);
    console.log(e.key);

    const rte = ``;
    this.crdsrv.get(rte).subscribe((res) => {
      this.complaintsview = res['data'];
      console.log(this.complaintsview);
    });
  }


}
