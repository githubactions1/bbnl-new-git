import { Component, OnInit } from "@angular/core";
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
interface Complaintstatus {
    value: any;
    viewValue: string;
  } 
interface Complaintsourse {
    value: any;
    viewValue: string;
  } 

@Component({
  selector: 'app-complaints-reports',
  templateUrl: './complaints-reports.component.html',
  styleUrls: ['./complaints-reports.component.scss']
})
export class ComplaintsReportsComponent implements OnInit {
    [x: string]: any;
    picker1:any;
    permissions;
    columnDefs;
    date = new FormControl(new Date());
    reportsData: FormGroup; 
    Reports:any;
    public toDate: Date;
    public fromDate: Date
    myDateValue:any;
    sdeMnuLdr = false;
    public cstmrData: any;
    complaint_status:any;
    complaint_source:any;
    lmoinput:boolean = false;
    assigneddropdown:boolean = true;
    employeeDetails:any;
    org;
	occ;
    suborg;
    getreport:boolean = false;
    serializedDate = new FormControl(new Date().toISOString());
    confirmDialogRef: MatDialogRef<DeleteDialogComponent>;
    horizontalPosition: MatSnackBarHorizontalPosition = "right";
    verticalPosition: MatSnackBarVerticalPosition = "top";
    getHeaderDtls = function () {
        return { title: "Service & Help Desk Reports", icon: "people_outline" };
    };
   
/** list of banks filtered by search keyword */
public filteredBanks: ReplaySubject<Category[]> = new ReplaySubject<Category[]>(1);

    constructor(
        private _dsSidebarService: DsSidebarService,
        private http: HttpClient,
        private router: Router,
        private _formBuilder: FormBuilder,
        private crdsrv: CrudService,
        private datePipe: DatePipe,
        private snackBar: MatSnackBar,
        public dialog: MatDialog,
        public TransfereService: TransfereService
    ) {this.permissions = { 'slct_in': 1, 'insrt_in': 0, 'updt_in': 1, 'dlte_in': 1, 'exprt_in': 1 };}

    ngOnInit() {
		this.occ = 0;
        this.reportsData = this._formBuilder.group({
            fromDate: [null, Validators.required],
            toDate: [null, Validators.required],
            complaint_status: ['', Validators],
            complaint_source: ['', Validators],
            employeeInfo: this._formBuilder.group({
                assigned_emply: [null, Validators],
                owner_typ: [null, Validators], 
				occcctype: [null, Validators],
				cllrtyp: [null, Validators],
                }),
        });
        this.getissuwowner();
		this.callertype()
    }
	callertype() {
		this.crdsrv.get("subscriberApp/cllrtype").subscribe((res) => {
			this.cllrtype = res["data"];
			// console.log(this.channellist);
		});
	  }
	occcc(type){
		console.log("value occcc",type);
		//this.employeeInfo.controls['occcctype'].reset()
		this.occ = type
	}
    filterDate() {
        
        if (this.reportsData.invalid) {
            this.snackBar.open("Please Enter Valid Data", '', {
              duration: 2000,
              horizontalPosition: this.horizontalPosition,
              verticalPosition: this.verticalPosition,
            });
          }
           else {
            this.reportsData.value['fromDate'] = this.datePipe.transform(this.reportsData.value.fromDate, 'yyyy-MM-dd');
            this.reportsData.value['toDate'] = this.datePipe.transform(this.reportsData.value.toDate, 'yyyy-MM-dd');
        var data = {
            fromDate: this.reportsData.value["fromDate"],
            toDate: this.reportsData.value["toDate"],
            complaint_source:this.reportsData.value["complaint_source"],
            complaint_status:this.reportsData.value["complaint_status"],
            selectcomplaintowner: this.reportsData.value.employeeInfo["owner_typ"],
            assignedemployee: this.reportsData.value.employeeInfo["assigned_emply"],
			cllrtyp : this.reportsData.value.employeeInfo["cllrtyp"],
			tcktcrtedby : this.occ
        };
        console.log(data);
        this.searchLoader = true;
        this.crdsrv.create(data, "subscriberApp/reportsdateformat").subscribe((res) => {
            this.Reports = res["data"];
            // if (res['status'] == 200) {
            //     this.snackBar.open("Sucessfully Added", '', {
            //       duration: 2000,
            //       horizontalPosition: this.horizontalPosition,
            //       verticalPosition: this.verticalPosition,
            //     });
            //   }
            console.log(this.Reports);
            this.getreport = true;
            // this.searchLoader = false;
            if (res['perm']){
                this.permissions = res['perm'][0];
              } else{
                this.shwPermMsg = 'You do not have permissions to do this operation. Please contact Administrator to get permissions.';
              }
              let counter = 0;
        this.Reports.filter((k) => {
          k['s_no'] = ++counter;
        });
      
        });
       
        this.columnDefs = [
            { headerName: 'Sno', field: 's_no', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 80, dataType: 'number', filter: true },
            { headerName: 'Caf ID', field: 'caf_id', alignment:'center', cellClass: 'pm-grid-number-cell', width: 100, dataType: 'number', filter: true },
            { headerName: 'Ticket No', field: 'comp_ticketno', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 100, dataType: 'string' ,filter: true},
            { headerName: 'Complaint Source', field: 'comp_source', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 150,filter: true },
            { headerName: 'Issue Type', field: 'comp_ticket_type', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 150,filter: true },
			{ headerName: 'Caller Type', field: 'callertypee', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 150, filter: true },
			{ headerName: 'Ticket Created By', field: 'tkt_rse_by', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 150, filter: true },
            { headerName: 'District Name', field: 'dstrt_nm', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 100, dataType: 'string' ,filter: true},
            { headerName: 'Mandal Name', field: 'mndl_nm', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 150,filter: true },
            { headerName: 'Complaint Category', field: 'Category', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 150 ,filter: true},
            { headerName: 'Customer Mobile Number', field: 'alternate_mobile', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 150 ,filter: true}, 
            { headerName: 'Issue Owner', field: 'cmplnt_owner', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 100 ,filter: true},         
            { headerName: 'Status', field: 'cmp_sts', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 100 ,filter: true},
            { headerName: 'Assigned To', field: 'cmplnt_emp', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 150 ,filter: true}, 
            { headerName: 'Created by', field: 'mrcht_usr_nm', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 100 ,filter: true}, 
            { headerName: 'Created On', field: 'dateCreated', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 150 ,filter: true}, 
            { headerName: 'Created Date', field: 'createdDate', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 150 ,filter: true},
            { headerName: 'Complaint Remarks', field: 'complaint', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 150,filter: true },
            // { headerName: 'Edit', field: 'Edit', alignment: 'center', cellClass: 'pm-grid-number-cell', width:100, height: 40, },
          ];
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
  
  complnt_status: Complaintstatus[] = [
    {value: 1, viewValue: 'Open'},
    {value: 2, viewValue: 'Resolved'},
    {value: 3, viewValue: 'Close'},
  ];
  
  complaintsource:Complaintsourse[]= [
    {value: 1, viewValue: 'Web'},
    {value: 2, viewValue: 'App'},
  ];

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
  
  
    onEditClick(key, cmplntdata): any {
      let cad_Id;
      if (cmplntdata == null){
          cad_Id = '';
      } else {
          cad_Id = cmplntdata.data.caf_id;
      }
      this.transfereService.setLoclData('data', {  key: key, value: cad_Id, parameter: 'mso', enrl_ind: 0 });
      this.router.navigate([`admin/cmplnts/edit_complaint`]);
      
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

    getissuwowner() {
        const rte = `subscriberApp/OCCIssueCstmrTyp/0`;
        this.crdsrv.get(rte).subscribe((res) => {
          this.org = res['data'];
          console.log(this.org)
        });
        this.reset()
      }
      reset(){
        this.employeeDetails = "";
      } 
    
      getsubemployee() {
        const rte = `subscriberApp/OCCIssueCstmrSubTyp/` + this.reportsData.value.employeeInfo.owner_typ;
        this.crdsrv.get(rte).subscribe((res) => {
          this.suborg = res['data'];
          console.log(this.suborg)
          const newLocal1 = 'complaint_owner_id';
          const newLocal2 = 'emp_active';
          if(this.suborg[0][newLocal1] == '4' && this.suborg[0][newLocal2] == '1')
        {
            this.lmoinput = true;
            this.assigneddropdown = false;
            this.reportsData.get('employeeInfo').get('assigned_emply').setValidators(null);
        }
        else{
            this.lmoinput = false;
            this.assigneddropdown = true;
            
        }
        });
      }
}

