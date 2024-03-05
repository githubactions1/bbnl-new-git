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
  selector: 'app-sharing-report',
  templateUrl: './sharing-report.component.html',
  styleUrls: ['./sharing-report.component.scss']
})
export class SharingReportComponent implements OnInit {

 
    [x: string]: any;
    picker1:any;
    permissions;
    columnDefs;
	checkfromDate;
	checktoDate;
    date = new FormControl(new Date());
    apsflsharingreportsData: FormGroup; 
    Reports:any;
    public toDate: Date;
    public fromDate: Date;
    myDateValue:any;
    sdeMnuLdr = false;
    public cstmrData: any;
    apsflsharing_type:any;
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
        return { title: "APSFL Sharing List", icon: "people_outline" };
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
    public TransfereService: TransfereService)
    {this.permissions = { 'slct_in': 1, 'insrt_in': 0, 'updt_in': 1, 'dlte_in': 1, 'exprt_in': 1 };}
  ngOnInit() {
    this.apsflsharingreportsData = this._formBuilder.group({
        fromDate: [null, Validators.required],
        toDate: [null, Validators.required],
        apsflsharing_type: ['', Validators],
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
  apsflsharingDate() {
        
    if (this.apsflsharingreportsData.invalid) {
        this.snackBar.open("Please Enter Valid Data", '', {
          duration: 2000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
      }
       else {
        this.apsflsharingreportsData.value['fromDate'] = this.datePipe.transform(this.apsflsharingreportsData.value.fromDate, 'yyyy-MM-dd');
        this.apsflsharingreportsData.value['toDate'] = this.datePipe.transform(this.apsflsharingreportsData.value.toDate, 'yyyy-MM-dd');
		this.checktoDate = new Date(this.apsflsharingreportsData.value['toDate']);
      this.checkfromDate = new Date(this.apsflsharingreportsData.value['fromDate']);
      var diff = Math.abs(this.checktoDate - this.checkfromDate);
       var remaining_days = Math.floor(diff / 86400000);
       console.log("remaining_days",remaining_days);
       var data = {
        frmdate: this.apsflsharingreportsData.value["fromDate"],
        todate: this.apsflsharingreportsData.value["toDate"],
        apsflsharing_type: this.apsflsharingreportsData.value["apsflsharing_type"],
        cafid: this.apsflsharingreportsData.value["cafid"],
      };
      if(this.usrdtls.usr_ctgry_id == 8){
        if (remaining_days < 93) {
          console.log(data);
          this.searchLoader = true;
          this.crdsrv.create(data, "lmoprepaid/sharingreport").subscribe((res) => {
            this.apsflsharingreportsData.reset();
            this.apsflsharingReports = res["data"];
            console.log(this.apsflsharingReports);
            this.getreport = true;
            this.searchLoader = false;
            if (res['perm']) {
              this.permissions = res['perm'][0];
            } else {
              this.shwPermMsg = 'You do not have permissions to do this operation. Please contact Administrator to get permissions.';
            }
            let counter = 0;
            this.apsflsharingReports.filter((k) => {
              k['s_no'] = ++counter;
            });
  
          });
  
          this.columnDefs = [
            { headerName: 'Sno', field: 's_no', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 100, dataType: 'number', filter: true },
			{ headerName: 'Customer Name', field: 'frst_nm', alignment:'center', cellClass: 'pm-grid-number-cell', width: 150, dataType: 'number', filter: true },
			{ headerName: 'LMO Name', field: 'LMO_CODE', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 100, dataType: 'string' ,filter: true},
			{ headerName: 'MSO Name', field: 'MSO_CODE', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 150,filter: true },
			{ headerName: 'CAF ID', field: 'cust_id', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 150,filter: true },
			{ headerName: 'Package Name', field: 'pckge_nm', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 150,filter: true },
			{ headerName: 'Base Package Price', field: 'bse_pck_price', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 150, dataType: 'string' ,filter: true},
			{ headerName: 'LMO Share', field: 'LMO_share', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 150,filter: true },
			{ headerName: 'CPE Rental', field: 'cpe_rental', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 150 ,filter: true}, 
			{ headerName: 'MSO Share', field: 'MSO_share', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 150 ,filter: true},
			{ headerName: 'APSFL Share', field: 'APSFL_share', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 150 ,filter: true}, 
			{ headerName: 'Taxes-GST', field: 'tax', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 150 ,filter: true}, 
			{ headerName: 'APSFL Total Share', field: 'ttl_apsfl', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 150 ,filter: true},  
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
    this.crdsrv.create(data, "lmoprepaid/sharingreport").subscribe((res) => {
        this.apsflsharingReports = res["data"];
        console.log(this.apsflsharingReports);
        this.getreport = true;
        this.searchLoader = false;
        if (res['perm']){
            this.permissions = res['perm'][0];
          } else{
            this.shwPermMsg = 'You do not have permissions to do this operation. Please contact Administrator to get permissions.';
          }
          let counter = 0;
    this.apsflsharingReports.filter((k) => {
      k['s_no'] = ++counter;
    });
  
    });
   
    this.columnDefs = [
        { headerName: 'Sno', field: 's_no', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 100, dataType: 'number', filter: true },
        { headerName: 'Customer Name', field: 'frst_nm', alignment:'center', cellClass: 'pm-grid-number-cell', width: 150, dataType: 'number', filter: true },
        { headerName: 'LMO Name', field: 'LMO_CODE', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 100, dataType: 'string' ,filter: true},
        { headerName: 'MSO Name', field: 'MSO_CODE', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 150,filter: true },
        { headerName: 'CAF ID', field: 'cust_id', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 150,filter: true },
        { headerName: 'Package Name', field: 'pckge_nm', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 150,filter: true },
        { headerName: 'Base Package Price', field: 'bse_pck_price', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 150, dataType: 'string' ,filter: true},
        { headerName: 'LMO Share', field: 'LMO_share', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 150,filter: true },
        { headerName: 'CPE Rental', field: 'cpe_rental', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 150 ,filter: true}, 
        { headerName: 'MSO Share', field: 'MSO_share', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 150 ,filter: true},
        { headerName: 'APSFL Share', field: 'APSFL_share', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 150 ,filter: true}, 
        { headerName: 'Taxes-GST', field: 'tax', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 150 ,filter: true}, 
        { headerName: 'APSFL Total Share', field: 'ttl_apsfl', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 150 ,filter: true}, 
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
