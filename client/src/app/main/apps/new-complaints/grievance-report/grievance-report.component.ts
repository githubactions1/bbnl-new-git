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
import {DxFileUploaderModule} from 'devextreme-angular';

@Component({
  selector: 'app-grievance-report',
  templateUrl: './grievance-report.component.html',
  styleUrls: ['./grievance-report.component.scss']
})
export class GrievanceReportComponent implements OnInit  {
    confirmDialogRef: MatDialogRef<DeleteDialogComponent>;
  permissions;
  columnDefs;
  showTble;
  public cstmrData: any;
  rowData: any;
  loading: any;
  fileUploaded: any;
  cmpltData:any;
  sdeMnuLdr = false;
  lmoColumnDefs = [];
  value: any[] = [];
  // tslint:disable-next-line:quotemark
  getHeaderDtls = function (): any { return { 'title': "Grievance Report", 'icon': 'people_outline' }; };
  msoLmoDtls: any;
  complaintsview: any;
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  shwPermMsg : string;
    cmpltsdata: any;
    file: any;
    httpService: any;
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
    const cmprte = `lmoprepaid/grievancelist`;
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
          { headerName: 'District', field: 'dstrct', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 150,filter: true },
          { headerName: 'Timestamp', field: 'Timestamp', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 150, dataType: 'number', filter: true },
          { headerName: 'Employee Name ', field: 'Employee_name', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 150, dataType: 'number', filter: true },
          { headerName: 'Operator & Customer Name', field: 'operator_name', alignment:'center', cellClass: 'pm-grid-number-cell', width: 100, dataType: 'number', filter: true },
          { headerName: 'LMO/MSO Code', field: 'agnt_cd', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 100, dataType: 'string' ,filter: true},
          { headerName: 'Mobile Number', field: 'cll_mbl', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 100, dataType: 'string' ,filter: true},
          { headerName: 'E-mail Id', field: 'email_add', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 150,filter: true },
          { headerName: 'Operator/Customer Helpdesk Reach', field: 'help_desk', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 150 ,filter: true},
          { headerName: 'Operator/Customer Helpdesk Reach Reason', field: 'custmer_Help_Desk', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 150 ,filter: true}, 
          { headerName: 'Enquiry Type', field: 'cll_typ', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 100 ,filter: true},         
          { headerName: 'Remarks', field: 'rmrks', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 100 ,filter: true},
        //   { headerName: 'Supporting Documents', field: 'suprt_doc', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 150 ,filter: true}, 
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

onFileUpload(event){
    this.fileUploaded = event.target.files[0];
    console.log(event.target.files[0].name);
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
