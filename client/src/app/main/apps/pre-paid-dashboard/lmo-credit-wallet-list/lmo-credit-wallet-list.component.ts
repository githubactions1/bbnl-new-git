import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { TransfereService } from "app/providers/transfer/transfer.service";
import { CrudService } from "app/main/apps/crud.service";
import { DsSidebarService } from "@glits/components/sidebar/sidebar.service";
import { HttpClient } from "@angular/common/http";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { DatePipe } from "@angular/common";
import {
    MatTableDataSource,
    MatPaginator,
    MatSort,
    MatSnackBarHorizontalPosition,
    MatSnackBarVerticalPosition,
    MatDialogRef,
    MatSnackBar,
    MatDialog,
    MAT_DIALOG_DATA,
} from "@angular/material";
import { DeleteDialogComponent } from "app/main/shared/components/delete-dialog/delete-dialog.component";
import { exit } from "process";
import { take, takeUntil } from 'rxjs/operators';
import { ReplaySubject } from "rxjs";
import { Category } from "aws-sdk/clients/support";
import * as moment from "moment";

@Component({
  selector: 'app-lmo-credit-wallet-list',
  templateUrl: './lmo-credit-wallet-list.component.html',
  styleUrls: ['./lmo-credit-wallet-list.component.scss']
})
export class LmoCreditWalletListComponent implements OnInit {

  
  [x: string]: any;
  picker1:any;
  permissions;
  columnDefs;
  checkfromDate;
  checktoDate;
  date = new FormControl(new Date());
  walletreportsData: FormGroup; 
  Reports:any;
  public toDate: Date;
  public fromDate: Date;
  myDateValue:any;
  sdeMnuLdr = false;
  public cstmrData: any;
  wallet_type:any;
  complaint_source:any;
  lmoinput:boolean = false;
  lmotype:boolean = true;
  employeeDetails:any;
  org;
  suborg;
  getreport:boolean = false;
  serializedDate = new FormControl(new Date().toISOString());
  confirmDialogRef: MatDialogRef<DeleteDialogComponent>;
  horizontalPosition: MatSnackBarHorizontalPosition = "right";
  verticalPosition: MatSnackBarVerticalPosition = "top";
  getHeaderDtls = function () {
      return { title: "APSFL - LMO Credit Wallet List", icon: "people_outline" };
  };
public filteredBanks: ReplaySubject<Category[]> = new ReplaySubject<Category[]>(1);
 
constructor( private _dsSidebarService: DsSidebarService,
  private http: HttpClient,
  private router: Router,
  private _formBuilder: FormBuilder,
  private crdsrv: CrudService,
  private datePipe: DatePipe,
  private snackBar: MatSnackBar,
  public dialog: MatDialog,
  public TransfereService: TransfereService) {this.permissions = { 'slct_in': 1, 'insrt_in': 0, 'updt_in': 1, 'dlte_in': 1, 'exprt_in': 1 };}
ngOnInit() {
  this.walletreportsData = this._formBuilder.group({
      fromDate: [null, Validators.required],
      toDate: [null, Validators.required],
      wallet_type: ['', Validators],
  });
  this.user_data();
}

user_data(){
  this.usrdtls = JSON.parse(localStorage.getItem("usrDtls"));
  console.log(this.usrdtls)
  console.log(this.usrdtls.usr_ctgry_id)
  if(this.usrdtls.usr_ctgry_id =='8' )
  {
      this.lmotype = false;
  }
  else{
      this.lmotype = true;
  }

  }


walletDate() {
      
  if (this.walletreportsData.invalid) {
      this.snackBar.open("Please Enter Valid Data", '', {
        duration: 2000,
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      });
    }
     else {
      this.walletreportsData.value['fromDate'] = this.datePipe.transform(this.walletreportsData.value.fromDate, 'yyyy-MM-dd');
      this.walletreportsData.value['toDate'] = this.datePipe.transform(this.walletreportsData.value.toDate, 'yyyy-MM-dd');
	  this.checktoDate = new Date(this.walletreportsData.value['toDate']);
      this.checkfromDate = new Date(this.walletreportsData.value['fromDate']);
      var diff = Math.abs(this.checktoDate - this.checkfromDate);
       var remaining_days = Math.floor(diff / 86400000);
       console.log("remaining_days",remaining_days);
             var data = {
        frmdate: this.walletreportsData.value["fromDate"],
        todate: this.walletreportsData.value["toDate"],
        wallet_type: this.walletreportsData.value["wallet_type"],
        cafid: this.walletreportsData.value["cafid"],
      };
       console.log("remaining_days",remaining_days);
       if(this.usrdtls.usr_ctgry_id == 8){
        if (remaining_days < 93) {

          console.log(data);
          this.searchLoader = true;
          this.crdsrv.create(data, "lmoprepaid/reportCreditlist").subscribe((res) => {
            this.walletreportsData.reset();
            this.walletReports = res["data"];
            console.log(this.walletReports);
            this.getreport = true;
            this.searchLoader = false;
            if (res['perm']) {
              this.permissions = res['perm'][0];
            } else {
              this.shwPermMsg = 'You do not have permissions to do this operation. Please contact Administrator to get permissions.';
            }
            let counter = 0;
            this.walletReports.filter((k) => {
              k['s_no'] = ++counter;
            });
  
          });
  
          this.columnDefs = [
			{ headerName: 'Sno', field: 's_no', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 100, dataType: 'number', filter: true },
			{ headerName: 'LMO Code', field: 'mrcht_usr_nm', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 150,filter: true },
			{ headerName: 'LMO Name', field: 'fst_nm', alignment:'center', cellClass: 'pm-grid-number-cell', width: 100, dataType: 'number', filter: true },
			{ headerName: 'Mobile Number', field: 'mbl_nu', alignment:'center', cellClass: 'pm-grid-number-cell', width: 100, dataType: 'number', filter: true },
			{ headerName: 'CAF ID', field: 'cust_id', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 150,filter: true },
			{ headerName: 'District', field: 'dstrt_nm', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 150, filter: true },
			{ headerName: 'Mandal', field: 'mndl_nm', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 150, filter: true },
			{ headerName: 'Credit/Debit', field: 'money_type', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 250,filter: true },
			{ headerName: 'Open Balance', field: 'open_bal', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 150, dataType: 'string' ,filter: true},
			{ headerName: 'Amount', field: 'amount', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 150,filter: true },
			{ headerName: 'Close Balance', field: 'close_bal', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 150 ,filter: true},
			{ headerName: 'Gateway', field: 'pgateway', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 150,filter: true },
			{ headerName: 'Transaction Id', field: 'txnid', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 150,filter: true },
			{ headerName: 'Transaction No', field: 'txnNo', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 150,filter: true },
			{ headerName: 'Created Date', field: 'date_created', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 150 ,filter: true}, 
          ];
        } else {
          this.snackBar.open(`Please Select Days Range between 1 to 93 DAYS, You are searching for ${remaining_days} days data`, '', {
            duration: 3000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
          });
        }
      } else {  
      if(remaining_days < 31){
  console.log(data);
  this.searchLoader = true;
  this.crdsrv.create(data, "lmoprepaid/reportCreditlist").subscribe((res) => {
      this.walletReports = res["data"];
      console.log(this.walletReports);
      this.getreport = true;
       this.searchLoader = false;
      if (res['perm']){
          this.permissions = res['perm'][0];
        } else{
          this.shwPermMsg = 'You do not have permissions to do this operation. Please contact Administrator to get permissions.';
        }
        let counter = 0;
  this.walletReports.filter((k) => {
    k['s_no'] = ++counter;
  });

  });
 
  this.columnDefs = [
      { headerName: 'Sno', field: 's_no', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 100, dataType: 'number', filter: true },
      { headerName: 'LMO Code', field: 'mrcht_usr_nm', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 150,filter: true },
      { headerName: 'LMO Name', field: 'fst_nm', alignment:'center', cellClass: 'pm-grid-number-cell', width: 100, dataType: 'number', filter: true },
      { headerName: 'Mobile Number', field: 'mbl_nu', alignment:'center', cellClass: 'pm-grid-number-cell', width: 100, dataType: 'number', filter: true },
      { headerName: 'CAF ID', field: 'cust_id', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 150,filter: true },
	  { headerName: 'District', field: 'dstrt_nm', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 150, filter: true },
      { headerName: 'Mandal', field: 'mndl_nm', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 150, filter: true },
      { headerName: 'Credit/Debit', field: 'money_type', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 250,filter: true },
      { headerName: 'Open Balance', field: 'open_bal', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 150, dataType: 'string' ,filter: true},
      { headerName: 'Amount', field: 'amount', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 150,filter: true },
      { headerName: 'Close Balance', field: 'close_bal', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 150 ,filter: true},
      { headerName: 'Gateway', field: 'pgateway', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 150,filter: true },
      { headerName: 'Transaction Id', field: 'txnid', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 150,filter: true },
      { headerName: 'Transaction No', field: 'txnNo', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 150,filter: true },
      { headerName: 'Created Date', field: 'date_created', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 150 ,filter: true}, 
    ];
	} else {
      this.snackBar.open(`Please Select Days Range between 1 to 31 DAYS, You are searching for ${remaining_days} days data`, '', {
        duration: 3000,
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      });
    }
	}
}
    
}
}
