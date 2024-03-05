import { Component, OnInit } from '@angular/core';
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
import { Injectable } from '@angular/core';
import { DeleteDialogComponent } from "app/main/shared/components/delete-dialog/delete-dialog.component";
import { exit } from "process";
import { take, takeUntil } from "rxjs/operators";
interface escalationPriority {
    value: any;
    viewValue: string;
  } 
interface levelName {
    value: any;
    viewValue: string;
  }   
  
@Component({
  selector: 'app-complaints-sla',
  templateUrl: './complaints-sla.component.html',
  styleUrls: ['./complaints-sla.component.scss']
})

@Injectable({ providedIn: 'root' })
export class ComplaintsSlaComponent implements OnInit {
    
    [x: string]: any;
    org;
    suborg;
    addsla: FormGroup;
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
    spnrCtrl = false;
    confirmDialogRef: MatDialogRef<DeleteDialogComponent>;
    horizontalPosition: MatSnackBarHorizontalPosition = "right";
    verticalPosition: MatSnackBarVerticalPosition = "top";
    getHeaderDtls = function () {
        return { title: "Service & Help Desk SLA", icon: "people_outline" };
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
    employeeDetails:any;
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
    public sladata: any;
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
    this.addsla = this._formBuilder.group({
        level_one_time: [null, Validators.required],
        level_two_time: [null, Validators.required],
        level_three_time: [null, Validators],
        level_four_time: [null, Validators],
        Other_emails: [null, Validators],
        owner_typ: [null, Validators.required],
    });

    this.getissuwowner()
    this.getslaLst()
  }



  getissuwowner() {
    const rte = `subscriberApp/OCCIssueCstmrTyp/2`;
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
    const rte = `subscriberApp/OCCIssueCstmrSubTyp/` + this.addsla.value.employeeInfo.owner_typ;
    this.crdsrv.get(rte).subscribe((res) => {
      this.suborg = res['data'];
      console.log(this.suborg)
      const newLocal1 = 'complaint_owner_id';
      const newLocal2 = 'emp_active';
      if(this.suborg[0][newLocal1] == '4' && this.suborg[0][newLocal2] == '1')
    {
        this.lmoinput = true;
        this.assigneddropdown = false;
        this.addsla.get('employeeInfo').get('assigned_emply').setValidators(null);
    }
    else{
        this.lmoinput = false;
        this.assigneddropdown = true;
        
    }
    });
  }

  addslainfo(){

    if (this.addsla.invalid) {
        this.snackBar.open("Please Enter Valid Data", '', {
          duration: 2000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
      }
       else {
    var data = {
        issue_owner: this.addsla.value["owner_typ"],
        level_one_time: this.addsla.value["level_one_time"],
        level_two_time: this.addsla.value["level_two_time"],
        level_three_time: this.addsla.value["level_three_time"],
        level_four_time: this.addsla.value["level_four_time"],
        Other_emails: this.addsla.value["Other_emails"],
    };
    console.log(data);
    this.searchLoader = true;
    this.crdsrv.create(data, "subscriberApp/sladatainsert").subscribe((res) => {
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

  escalation_priority: escalationPriority[] = [
    {value: 1, viewValue: 'Primary'},
    {value: 2, viewValue: 'Secondary'},
    {value: 3, viewValue: 'Territory'},
  ];
  
  level_name: levelName[] = [
    {value: 1, viewValue: 'Level-1'},
    {value: 2, viewValue: 'Level-2'},
    {value: 3, viewValue: 'Level-3'},
    {value: 4, viewValue: 'Level-4'},
  ];


  openSideBar(): any {
    this._dsSidebarService.getSidebar('addFormPanel1').toggleOpen();
  }
  closeSideBar(): any {
    this._dsSidebarService.getSidebar('addFormPanel1').toggleOpen();
  }

  getslaLst(): any{
    this.loading = true;
    const cmprte = `subscriberApp/slagetdatainsert`;
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
          { headerName: 'Issue Owner', field: 'complaint_owner_name', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 150, dataType: 'string' ,filter: true},
          { headerName: 'Level One Time', field: 'Escltn_lvl_one_time', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 150,filter: true },
          { headerName: 'Level Two Time', field: 'Escltn_lvl_two_time', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 150,filter: true },
          { headerName: 'Level Three Time', field: 'Escltn_lvl_three_time', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 150,filter: true },
          { headerName: 'Level Four Time', field: 'Escltn_lvl_four_time', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 150,filter: true },
          { headerName: 'Other Emails', field: 'Escltn_other_email', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 250,filter: true },
          { headerName: 'Edit', field: 'Edit', alignment: 'center', cellClass: 'pm-grid-number-cell', width:100, height: 40, },
        ];
      }
    });
  }

  onCellClick(event): any{
    console.log(event.value);
    if (event.value == 'Edit'){
     this.sladata = event.data;
    //  console.log(this.sladata.ID);
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
