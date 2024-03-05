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

interface Ticket_type {
    value: string;
    viewValue: string;
}

class ImageSnippet {
    constructor(public src: string, public file: File) {}
}

@Injectable({ providedIn: 'root' })
@Component({
    selector: "app-general-enquiry",
    templateUrl: "./general-enquiry.component.html",
    styleUrls: ["./general-enquiry.component.scss"],
})
export class GeneralEnquiryComponent implements OnInit {
    [x: string]: any;
    public generaldata: any;
    org;
    suborg;
    generalinfodata: FormGroup;
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
        return { title: "General Enquiry", icon: "people_outline" };
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
    formreset:any;
    Newconnection: boolean = true;
    Calldrop: boolean = false;
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
        console.log(localStorage.getItem('uid'));
        // let emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
        let phoneNumber = /^(\+\d{1,3}[- ]?)?\d{10}$/;
        let pinCode = /^(\+\d{1,3}[- ]?)?\d{6}$/;
        this.generalinfodata = this._formBuilder.group({
            ticket_type:["", Validators.required],
            Name: ["", Validators.required],
            // Email: ["", [Validators.pattern(emailPattern)]],
            Email: ["", Validators],
            mobileNumber: ["",[Validators.required, Validators.pattern(phoneNumber)],],
            mandal: ["", Validators.required],
            village: ["", Validators],
            pincode: ["", [Validators.required, Validators.pattern(pinCode)]],
            description: ["", Validators.required],
            districtInfo: this._formBuilder.group({
                dst_manager: ["", Validators.required],
                district: ["", Validators.required],
            }),
        });
        this.getdistrictname();
        this.getgeneraldataLst();
    }
    ticket_type: Ticket_type[] = [
        {value: '1', viewValue: 'New Connection'},
        {value: '2', viewValue: 'Call Drop'},
		{ value: '3', viewValue: 'New APSFL Patnership' },
        { value: '4', viewValue: 'New PON/OLT Allocation' }
      ];
    
      newticketType(newtickettype){
          console.log(newtickettype);
          if (newtickettype == "2") {
            this.Newconnection = false;
            this.generalinfodata.get('Name').setErrors(null);
            this.generalinfodata.get('mandal').setErrors(null);
            this.generalinfodata.get('pincode').setErrors(null);
            this.generalinfodata.get('districtInfo').get('district').setErrors(null);
            this.generalinfodata.get('districtInfo').get('dst_manager').setErrors(null);
          }
          else {
            this.Newconnection = true;
            this.generalinfodata.get('Name').setValidators([Validators.required]);
            this.generalinfodata.get('mandal').setValidators([Validators.required]);
            this.generalinfodata.get('pincode').setValidators([Validators.required]);
            this.generalinfodata.get('districtInfo').get('district').setValidators([Validators.required]);
            this.generalinfodata.get('districtInfo').get('dst_manager').setValidators([Validators.required]);
          }
    }
    
   

    addGeneralinfo() {
        if (this.generalinfodata.invalid) {
            this.snackBar.open("Please Enter Valid Data", '', {
              duration: 2000,
              horizontalPosition: this.horizontalPosition,
              verticalPosition: this.verticalPosition,
            });
          }
           else {
        var data = {
            mrcnt_id:localStorage.getItem('uid'),
            ticket_type:this.generalinfodata.value["ticket_type"],
            name: this.generalinfodata.value["Name"],
            email: this.generalinfodata.value["Email"],
            mobile: this.generalinfodata.value["mobileNumber"],
            village: this.generalinfodata.value["village"],
            mandal: this.generalinfodata.value["mandal"],
            district: this.generalinfodata.value.districtInfo["district"],
            pincode: this.generalinfodata.value["pincode"],
            dst_manager: this.generalinfodata.value.districtInfo["dst_manager"],
            description: this.generalinfodata.value["description"],
        };
        console.log(data);
        this.searchLoader = true;
        this.crdsrv.create(data, "subscriberApp/OCCIssueCatgrygenralenqry").subscribe((res) => {
            this.newEnquiry = res["data"];
            if (res['status'] == 200) {
                this.snackBar.open("Sucessfully Added", '', {
                  duration: 2000,
                  horizontalPosition: this.horizontalPosition,
                  verticalPosition: this.verticalPosition,
                });
                window.location.reload();
              }
            // console.log(this.newEnquiry);
            this.searchLoader = false;           
        });
    }
    }

    district() {
        const rte = `user/getdstrcts/1`;
        this.crdsrv.get(rte).subscribe((res) => {
            this.districts = res["data"];
            console.log(res["data"]);
        });
    }

    getdistrictname() {
        const rte = `user/getdstrcts/1`;
        this.crdsrv.get(rte).subscribe((res) => {
            this.districts = res["data"];
            console.log(res["data"]);
        });
    }

    dstmangers() {
        const rte = `subscriberApp/OCCIssueDstrtMngr/` + this.generalinfodata.value.districtInfo.district;
        this.crdsrv.get(rte).subscribe((res) => {
            this.dstmanager = res["data"];
            console.log(this.dstmanager);
        });
    }




    getgeneraldataLst(): any{
        this.loading = true;
        const cmprte = `subscriberApp/OCCIssuegetGnrlenqry`;
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
              { headerName: 'General Number', field: 'Ticket_no', alignment:'center', cellClass: 'pm-grid-number-cell', width: 100, dataType: 'number', filter: true },
              { headerName: 'Ticket Type', field: 'tckt_name', alignment:'center', cellClass: 'pm-grid-number-cell', width: 100, dataType: 'number', filter: true },
              { headerName: 'Name', field: 'first_name', alignment:'center', cellClass: 'pm-grid-number-cell', width: 100, dataType: 'number', filter: true },
              { headerName: 'EMail ID', field: 'email_id', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 100, dataType: 'string' ,filter: true},
              { headerName: 'Mobile Number', field: 'mobile_no', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 150,filter: true },
              { headerName: 'Mandal Name', field: 'mandal', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 100 ,filter: true},
              { headerName: 'Village Name', field: 'village', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 150 ,filter: true},
              { headerName: 'District Name', field: 'dstrt_nm', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 100 ,filter: true},
              { headerName: 'Pincode', field: 'pincode', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 100 ,filter: true},
              { headerName: 'Sales Manager Name', field: 'manager', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 150 ,filter: true}, 
              { headerName: 'Sales Manager Number', field: 'sales_mbl_nu', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 150 ,filter: true}, 
              { headerName: 'Created By', field: 'merchant_name', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 150 ,filter: true}, 
              { headerName: 'Created On', field: 'created_on', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 150 ,filter: true},
              { headerName: 'Created date', field: 'created_date', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 150 ,filter: true},
              { headerName: 'Description', field: 'description', alignment: 'center', cellClass: 'pm-grid-number-cell',width: 150 ,filter: true},
              { headerName: 'View', field: 'View', alignment: 'center', cellClass: 'pm-grid-number-cell',width: 150 ,filter: true},
            ];
          }
        });
      }
      openSideBar(): any {
        this._dsSidebarService.getSidebar('addFormPanel1').toggleOpen();
      }
      closeSideBar(): any {
        this._dsSidebarService.getSidebar('addFormPanel1').toggleOpen();
      }
      onCellClick(event): any{
        console.log(event.value);
        if (event.value == 'View'){
         this.generaldata = event.data;
         console.log(this.generaldata);
        this.openSideBar();
        }
      }

      onCellPrepared(colDef, e) {
    
        if (e.rowType === "data" && e.row.data && e.column.dataField == 'View') {
            e.cellElement.style.color = '#05963a';
            e.cellElement.style.fontWeight = 500;
            e.cellElement.style.background= 'rgba(189, 238, 130, 0.28)';
            e.cellElement.style.backgroundClip= 'content-box';
            e.cellElement.style.cursor = "pointer";
        }
    
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
