import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { TransfereService } from "app/providers/transfer/transfer.service";
import { CrudService } from "app/main/apps/crud.service";
import { DsSidebarService } from "@glits/components/sidebar/sidebar.service";
import { HttpClient } from "@angular/common/http";
import {
    FormBuilder,
    FormControl,
    FormGroup,
    Validators,
} from "@angular/forms";
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
import { take, takeUntil } from "rxjs/operators";
interface Packageplan {
    value: string;
    viewValue: string;
}

interface Priority {
    value: string;
    viewValue: string;
}

class ImageSnippet {
    constructor(public src: string, public file: File) {}
}

@Component({
  selector: 'app-add-employee-id',
  templateUrl: './add-employee-id.component.html',
  styleUrls: ['./add-employee-id.component.scss']
})
export class AddEmployeeIdComponent implements OnInit {

    [x: string]: any;
    org;
    suborg;
    addemployeeid: FormGroup;
    pckgeProperties: any;
    gndrLst: any;
    frm_type: any;
    showStepr = false;
    sideBarHeader: string;
    editClicked: boolean = false;
    updateData: any;
    deleteCstmr: boolean;
    ste_lst: any;
    dstrt_lst: any;
    mndl_lst: any;
    vlge_lst: any;
    columnDefs = [];
    districtId: any;
    selectedFile: ImageSnippet;
    spnrCtrl = false;
    confirmDialogRef: MatDialogRef<DeleteDialogComponent>;
    horizontalPosition: MatSnackBarHorizontalPosition = "right";
    verticalPosition: MatSnackBarVerticalPosition = "top";
    getHeaderDtls = function () {
        return { title: "Add Sub Employee ", icon: "people_outline" };
    };
    blng_frqncy_lst: any;
    mndal_lst: any;
    mandalId: any;
    vilge_lst: any;
    permissions;
    read;
    packages: any;
    cstmrtyp: any;
    srvpcs: any;
    frmData: any;
    EnblUpbtn: boolean = false;
    cafid: any;
    oltDtls: any;
    slotDtls: any;
    prtDtls: any;
    sltLvlOne: any[];
    sltLvlTwo: any[];
    sltLvlThree: any[];
    blng_vlge_lst: any[];
    instl_vlge_lst: any[];
    blng_mndl_lst: any[];
    instl_mndl_lst: any[];
    blng_dstrt_lst: any[];
    instl_dstrt_lst: any[];
    loader: boolean = false;
    isChecked: any;
    entcaf: boolean = false;
    siusr: boolean = false;
    usrdtls: any;
    boxDetails: any;
    poplst: any;
    frm_actn: any;
    splits: any;
    radioSelected: any;
    radioSelected1: any;
    iptvDetails: any;
    lagDtls: any;
    public employedata: any;
    caftyp_id = 0;
    level1: any;
    level2: any;
    level3: any;
    onu_id: any;
    packgdta: any;
    tps: any;
    trnfpt = [];
    splt_id: any;
    aaa_mac_id: any;
    aaa_cd: any;
    onuchecked = false;
    iptvchecked = false;
    aadhaar: any;
    showCafSidebar: boolean = false;
    showSidebar: boolean = false;
    adr: any;
    entfrmData: any;
    nodes: any;
    distnm: any;
    mandalnm: any;
    vlgnm: any;
    eftdt: any;
    expdt: any;
    poploc: any;
    Date: any;
    lsd_lne = 1;
    instd_by_prntnr_id = 4;
    adharErrorMsg: any;
    nxt = true;
    partnerCode: any;
    columnDefss: any;
    lmoLoader: boolean;
    distId: any;
    disabled: boolean | null;
    searchLoader: boolean;
    rowData: any;
    showTble: boolean;
    shwPrflePge: boolean;
    selectedValue: string;
    condition: string;
    elseBlock: string;
    lightindication: boolean = false;
    selected: string;
    selectedservice: string;
    showMecustomer: boolean = false;
    showMeenquiry: boolean = false;
    showMerequest: boolean = false;
    addonchannel: boolean = false;
    planupgrade: boolean = false;
    plandowngrade: boolean = false;
    showcustomerdetails: boolean = true;
    nullWithDefault: string = "N/A";
    notavailable: any;
    isValid: any;
    category: any;
    shwLdr = false;
    Terminated: any;
    channellist: any[];
    categorylist: any[];
    customercategory: any;
    servicescategory: any;
    enquirycategory: any;
    disableBtn: boolean;
    imagesize: boolean = true;
    imgsizemessage: boolean = false;
    lmoinput: boolean = false;
    assigneddropdown: boolean = true;
    terminate = false;
    districts: any;
    dstmanager: any;
    sdeMnuLdr = false;
    public issueType: FormControl = new FormControl();

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
    )  {
        this.permissions = { 'slct_in': 1, 'insrt_in': 0, 'updt_in': 1, 'dlte_in': 1, 'exprt_in': 1 };
        // let permTxt = 'MSO List';
        // let prmeRte = `user/permissions/${permTxt}`;
        // this.crdsrv.get(prmeRte).subscribe((res) => {
        //   this.permissions = res['data'][0];
        // });
      }


  ngOnInit() {
    this.addemployeeid = this._formBuilder.group({
        owner_id: ["", Validators.required],
        merchant_id: ["", Validators.required],
        employee_name: ["", Validators.required],
    });
    this.getissuwowner();
    this.getemployeeLst()
  }


  getissuwowner() {
    const rte = `subscriberApp/OCCIssueCstmrTyp/2`;
    this.crdsrv.get(rte).subscribe((res) => {
      this.org = res['data'];
      console.log(this.org)
    });
  }



  addemployeeinfo(){

    if (this.addemployeeid.invalid) {
        this.snackBar.open("Please Enter Valid Data", '', {
          duration: 2000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
      }
       else {
    var data = {
        owner_id: this.addemployeeid.value["owner_id"],
        merchent_id: this.addemployeeid.value["merchant_id"],
        employeename: this.addemployeeid.value["employee_name"],
       
    };
    console.log(data);
    this.searchLoader = true;
    this.crdsrv.create(data, "subscriberApp/addsubemployees").subscribe((res) => {
        this.newEnquiry = res["data"];
        if (res['status'] == 200) {
            this.snackBar.open("Sucessfully Added", '', {
              duration: 2000,
              horizontalPosition: this.horizontalPosition,
              verticalPosition: this.verticalPosition,
            });
            window.location.reload();
          }
        console.log(this.newEnquiry);
        this.searchLoader = false;
      
    });

}
  }



  openSideBar(): any {
    this._dsSidebarService.getSidebar('addFormPanel1').toggleOpen();
  }
  closeSideBar(): any {
    this._dsSidebarService.getSidebar('addFormPanel1').toggleOpen();
  }

  getemployeeLst(): any{
    this.loading = true;
    const cmprte = `subscriberApp/getsubemployeesdata`;
    this.crdsrv.get(cmprte).subscribe((res) => {
      if (res['status'] === 200) {
        this.loading = false;
        this.rowData = res['data'];
        console.log(this.rowData);
        let counter = 0;
        this.rowData.filter((k) => {
          k['sno'] = ++counter;
     
        });
        
        this.columnDefs = [
          { headerName: 'Sno', field: 'sno', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 80, dataType: 'number', filter: true },
          { headerName: 'Department Name', field: 'complaint_owner_name', alignment:'center', cellClass: 'pm-grid-number-cell', width: 150, dataType: 'number', filter: true },
          { headerName: 'Employee Name', field: 'complaint_sub_emp_name', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 150, dataType: 'string' ,filter: true},
          { headerName: 'Merchent ID', field: 'mrcht_usr_id', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 250,filter: true },
          { headerName: 'Status', field: 'a_in', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 250,filter: true },
          { headerName: 'Edit', field: 'Edit', alignment: 'center', cellClass: 'pm-grid-number-cell', width:100, height: 40, },
        ];
      }
    });
  }

  onCellClick(event): any{
    console.log(event.value);
    if (event.value == 'Edit'){
     this.employedata = event.data;
     console.log(event.data);
    this.openSideBar();
    }
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

}
