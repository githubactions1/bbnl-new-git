import { Component, OnInit, Inject, Input, ViewChildren, QueryList } from '@angular/core';
import { TransfereService } from 'app/providers/transfer/transfer.service';
import { CrudService } from 'app/main/apps/crud.service';
import { MAT_DIALOG_DATA, MatDialog, MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material';
import { DialogData } from 'app/main/apps/general/change-log/master/change-log/change-log-modal/change-log-modal.component';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { DxChartModule } from 'devextreme-angular';
import { DsSidebarService } from '@glits/components/sidebar/sidebar.service';
import * as _ from 'lodash';
import { Observable, Observer } from "rxjs";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { truncateSync } from 'fs';
import { log } from 'console';
interface Packageplan {
    value: string;
    viewValue: string;
  } 
interface Complainttype {
    value: any;
    viewValue: string;
  } 

  interface Priority {
    value: string;
    viewValue: string;
  } 
    interface Complaintstatus {
    value: any;
    viewValue: string;
  } 
  interface ClosedOver{
    value: string;
    viewValue: string;
  } 
  
  interface IssueFound {
    value: string;
    viewValue: string;
  } 
  
  class ImageSnippet {
    constructor(public src: string, public file: File) { }
  }

@Component({
  selector: 'ds-edit-complaints',
  templateUrl: './edit-complaints.component.html',
  styleUrls: ['./edit-complaints.component.scss']
})
export class EditComplaintsComponent implements OnInit {
    @Input() cstmrData: any;
    horizontalPosition: MatSnackBarHorizontalPosition = 'end';
    verticalPosition: MatSnackBarVerticalPosition = 'top';
    cafDtls: any;
    srvpcs: any;
    loader = false;
    // caf_id =2000265
    data = [];
    org:any;
    suborg:any;
    boxcolumnDefs = [];
    packagecolumnDefs = [];
    pkgeData = [];
    siusr: boolean = false;
    complaintcafdata: FormGroup;
    voipData = [];
    voipcolumnDefs = [];
    hsicolumnDefs = [];
    hsiData = [];
    hsieachday = [];
    shwLdr = false;
    cafDtlsData: any;
    clsbtn = false;
    shwtab = true;
    monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    invoiceChrgsData: any;
    dialogRef: any;
    permissions;
    rowData = [];
    columnDefs = [];
    call_log = [];
    invoiceData = [];
    invoicecolumnDefs = [];
    hsiEachdaycolumnDefs = [];
    selectedIndex = 0;
    selectedPckgeIndex = 0;
    // columnDef = [];
    invice_dtls = [];
    activeLbl: boolean;
    cafAdhrMtchData: any;
    cafAdhrMtchDataColumnDefs;
    cafCstmrMtchData: any;
    cafCstmrMtchDataColumnDefs;
    cafMblnuMtchDataColumnDefs;
    cafMblnuMtchData;
    shwNoDataDiv = false;
    ontDtls1 :any;
    sameCafDtls: boolean;
    cafId: any;
    employeeDetails:any;
    myGroup:any;
    cafSts: any;
    inEvntTab = false;
    shwVoipMsg: string;
    hsiEchDayLineGraph: any[];
    cafHsiUsgeOprtns = [];
    types;
    noOntDtls: boolean;
    shwRltdCfsNoDataDiv: boolean;
    noInvceDataDiv: boolean;
    srvcPkPermissn: any;
    srch_cntrl = {
      srch_txt: '',
      srch_ldng: false,
      lmt_pstn: 1,
      pcge_mde: '1',
      agntId: ''
    };
    shwPckgeAddBtn: boolean;
    addOnStandardPckgsLst = [];
    channels: any;
    ChanlArry: any;
    view: boolean;
    slctdAllPckgs: any;
    shwSveBtn = false;
    removeAddonPckgs: any;
    rmvAddonscolumnDefs;
    slctdAllPckgsFrDlt: any;
    shwRmBtn: boolean;
    comment: any;
    hsiPckgsData: any;
    @ViewChildren ('checkBox' ) checkBox: QueryList<any>;
    checked = [];
    fnlChckdData = [];
    usrDtls: any;
    addonPckgsPrm: any;
    crntDataSpd: any;
    crntDataSpd_apldDt: any;
    prvsDataSpd: any;
    cmpltTab:any;
    hsiBstrPckDt: any;
    shwTrlHsiCrd: boolean;
    cafHsiMnthPckgsData: any;
    getHeaderDtls = function (): any { return { 'title': 'Complaint Information', 'icon': 'people_outline' }; };
    crntMnthNm: string;
    crntYr: number;
    grphMnthYr: string;
    ticketcolumnDefs: ({ headerName: string; field: string; alignment: string; cellClass: string; width: number; filter: boolean; search?: undefined; } | { headerName: string; field: string; alignment: string; cellClass: string; width: number; filter: boolean; search: boolean; })[];
    TicketData: any;
    shwTicketMsg: string;
    categorylist:any;
    selected:any;
    modalitie:any;
    showMecustomer: boolean = false;
    closeOverby: boolean = false;
    closedfileby: boolean = false;
   openholdinprogress: boolean = false;
    resolveclose: boolean = false;
    btnenable: boolean = false;
    showMerequest: boolean = false;
    addonchannel: boolean = false;
    planupgrade: boolean = false;
    plandowngrade: boolean = false;
    autorslve: boolean =false
    inprogresssts: boolean =false
    holdsts: boolean =false
    complaint_status:any;
    showcustomerdetails: boolean = true;
    channellist:[]=[];
    can_edit = true;
    searchLoader: boolean;
    disableSelect:any;
    disableBtn: boolean;
    selectdropdowndisable:boolean;
    editcomplaint: any;
    editing:any;
    openrsle:boolean=false;
    rsleclse:boolean=false;
    clse:boolean=false
    base64Image: any;
    owner_typ:any;
    assigned_emply:any;
    complmtlogData: any;
    customercategory:any;
    servicescategory:any;
    enquirycategory:any;
    lmoinput:boolean = false;
    assigneddropdown:boolean = true;
    selectedFile: any;
    complaintform: any;
    imagesize: boolean;
    imgsizemessage: boolean;
    chckcomplnt_status;
    // selected = 'c.comp_cat';
    // rowdatapackage: any;
    constructor(public TransfereService: TransfereService, public crdsrv: CrudService, private dsSidebarService: DsSidebarService, @Inject(MAT_DIALOG_DATA) public cafdata: DialogData, public dialog: MatDialog, public route: ActivatedRoute, private _snackBar: MatSnackBar, private router: Router,private _formBuilder: FormBuilder, private snackBar: MatSnackBar,) {
      this.permissions = { 'slct_in': 1, 'insrt_in': 0, 'updt_in': 1, 'dlte_in': 1, 'exprt_in': 1 };
     
      const permTxt1 = 'Addon packages';
      const prmeRte1 = `user/permissions/${permTxt1}`;
      this.crdsrv.get(prmeRte1).subscribe((res) => {
        this.addonPckgsPrm = res['data'][0];
        // console.log(this.addonPckgsPrm);
        if (this.addonPckgsPrm == undefined){ this.addonPckgsPrm = {}; }
        // console.log(this.addonPckgsPrm.insrt_in);
      });
    }
    // ngAfterViewInit (){
  
    // }
    ngOnInit(): any {
      console.log("ngonit")
      this.closeOverby = false;
      //this.getdata();
      this.getcomplaintsDetails();
    this.categoryList();
    this.customercategoryList();
    this.servicescategoryList();
    this.enquirycategoryList();
    this.channelList();
    this.getissuwowner();
    
      this.selectedIndex = 0;
      this.usrDtls = JSON.parse(localStorage.getItem('usrDtls'));
      this.types = ['line', 'stackedline', 'fullstackedline'];
      if (this.cafdata['imgData'] != undefined) {
        // this.cafDtls = this.cafdata['imgData'].data;
        console.log(this.cafDtls.caf_id)
        this.getUsrPermissions();
        // this.close();
        this.clsbtn = true;
      } else if (this.cstmrData) {
        console.log(this.cstmrData)
        console.log(this.cstmrData.comp_status)

        this.showCstmrData();
      } else {
        this.cafDtls = this.TransfereService.getLoclData('data');
        console.log(this.cafDtls)
        //  // console.log(this.cafDtls.caf_id)
        this.getUsrPermissions();
      }
    
      this.complaintcafdata = this._formBuilder.group({
     
        complt_ticket_type: ['', Validators],
        select_category: ['', Validators.required],
        complaint_status: ['', Validators.required],
        priority: ['', Validators.required],
        complaint_remarks: ['', Validators.required],
        alternate_number: ['', Validators],
        issue_found: ['', Validators],
        action_taken: ['', Validators],
        closed_over_by: ['', Validators],
        Updfile: [null, Validators],
        employeeInfo: this._formBuilder.group({
        owner_typ: ['', Validators.required], 
        assigned_emply: ['', Validators.required],
        }),
    });

        // let disableBtn = false;
        //          this.complaintcafdata.valueChanges 
        //        .subscribe((changedObj: any) => {
        //            // this.disableBtn = this. cafdetails.valid;
        //             this.disableBtn = this.complaintcafdata.valid;
        //        });
    }
  
    

    ngOnChanges(): any {
      this.showCstmrData();
    }
    // complnt_status: Complaintstatus[] = [
    //   {value: 1, viewValue: 'Open'},
    //   {value: 2, viewValue: 'Resolved'},
    //   {value: 3, viewValue: 'Close'},
    //   {value: 4, viewValue: 'Auto-Resolution'}
    // ];
    // complnt_status_open: Complaintstatus[] = [
    //   {value: 1, viewValue: 'Open'},
    //   {value: 5, viewValue: 'In-Progress'},
    //   {value: 6, viewValue: 'Hold'},
    //   {value: 2, viewValue: 'Resolved'},
    //   {value: 4, viewValue: 'Auto-Resolution'}
    // ];
    // complnt_status_resolve: Complaintstatus[] = [
    //   {value: 2, viewValue: 'Resolved'},
    //   {value: 3, viewValue: 'Close'},
    //   {value: 4, viewValue: 'Auto-Resolution'},
    //   {value: 5, viewValue: 'In-Progress'},
    //   {value: 6, viewValue: 'Hold'}
    // ];
    // complnt_status_close: Complaintstatus[] = [
    //   {value: 5, viewValue: 'In-Progress'},
    //   {value: 6, viewValue: 'Hold'},
    //   {value: 3, viewValue: 'Close'}
    // ];
    // complnt_status_autorslve: Complaintstatus[] = [
    //   {value: 5, viewValue: 'In-Progress'},
    //   {value: 6, viewValue: 'Hold'},
    //   {value: 3, viewValue: 'Close'},
    //   {value: 4, viewValue: 'Auto-Resolution'}
    // ];
    // complnt_status_inprogresssts: Complaintstatus[] = [
    //   {value: 5, viewValue: 'In-Progress'},
    //   {value: 6, viewValue: 'Hold'},
    //   {value: 2, viewValue: 'Resolved'},
    //   {value: 4, viewValue: 'Auto-Resolution'},
    //   {value: 3, viewValue: 'Close'}
    // ];
    // complnt_status_holdsts: Complaintstatus[] = [
    //   {value: 5, viewValue: 'In-Progress'},
    //   {value: 6, viewValue: 'Hold'},
    //   {value: 2, viewValue: 'Resolved'},
    //   {value: 4, viewValue: 'Auto-Resolution'},
    //   {value: 3, viewValue: 'Close'}
    // ];
  
    showCstmrData(): any {
      this.route.params.subscribe((params) => {
        if(this.cstmrData.comp_status == 1 ){
          this.openrsle=true;
          this.rsleclse=false;
          this.clse=false;
          this.autorslve=false;
          this.inprogresssts =false;
          this.holdsts =false;
          this.chckcomplnt_status = [
            {value: 1, viewValue: 'Open'},
            {value: 5, viewValue: 'In-Progress'},
            {value: 6, viewValue: 'Hold'},
            {value: 2, viewValue: 'Resolved'},
            {value: 4, viewValue: 'Auto-Resolution'}
          ];
        } else if (this.cstmrData.comp_status == 2 ){
          this.openrsle=false;
          this.rsleclse=true;
          this.clse=false;
          this.autorslve=false;
          this.inprogresssts =false;
          this.holdsts =false;
          this.chckcomplnt_status = [
            {value: 2, viewValue: 'Resolved'},
            {value: 3, viewValue: 'Close'},
            {value: 4, viewValue: 'Auto-Resolution'},
            {value: 5, viewValue: 'In-Progress'},
            {value: 6, viewValue: 'Hold'}
          ];
        } else if (this.cstmrData.comp_status == 3 ){
          this.openrsle=false;
          this.rsleclse=false;
          this.clse=true;
          this.autorslve=false;
          this.inprogresssts =false;
          this.holdsts =false;
          this.chckcomplnt_status = [
            {value: 3, viewValue: 'Close'}
          ];
        } else if (this.cstmrData.comp_status == 4 ) {
          this.openrsle=false;
          this.rsleclse=false;
          this.clse=false;
          this.autorslve=true;
          this.inprogresssts =false;
          this.holdsts =false;
          this.chckcomplnt_status = [
            {value: 5, viewValue: 'In-Progress'},
            {value: 6, viewValue: 'Hold'},
            {value: 3, viewValue: 'Close'},
            {value: 4, viewValue: 'Auto-Resolution'}
          ];
        } else if (this.cstmrData.comp_status == 5 ) {
          this.openrsle=false;
          this.rsleclse=false;
          this.clse=false;
          this.autorslve=false;
          this.inprogresssts =true;
          this.holdsts =false;
          this.chckcomplnt_status = [
            {value: 5, viewValue: 'In-Progress'},
            {value: 6, viewValue: 'Hold'},
            {value: 2, viewValue: 'Resolved'},
            {value: 4, viewValue: 'Auto-Resolution'}
          ];
        } else if (this.cstmrData.comp_status == 6 ) {
          this.openrsle=false;
          this.rsleclse=false;
          this.clse=false;
          this.autorslve=false;
          this.inprogresssts =false;
          this.holdsts =true;
          this.chckcomplnt_status = [
            {value: 5, viewValue: 'In-Progress'},
            {value: 6, viewValue: 'Hold'},
            {value: 2, viewValue: 'Resolved'},
            {value: 4, viewValue: 'Auto-Resolution'}
          ];
        }
        this.cafDtls = this.cstmrData;
        this.selectedIndex = 0;
        console.log(this.cafDtls);
        this.getUsrPermissions();
      });
    }
  
    // console.log(this.rowData)
    // this.columnDefs = [
    //   { headerName: 'Name', field: 'cstmr_nm', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 200, filter: false, search: false },
    //   { headerName: 'Mobile Number', field: 'mbl_nu', alignment: 'left', cellClass: 'pm-grid-number-cell', width: 150, filter: true },
    //   { headerName: 'aadhar Id', field: 'adhr_nu', alignment: 'left', cellClass: 'pm-grid-number-cell', width: 150, filter: true },
    //   { headerName: 'Activation Date', field: 'actvn_dt', alignment: 'left', cellClass: 'pm-grid-number-cell', width: 150, filter: true },
    //   { headerName: 'Email', field: 'instl_eml1_tx', alignment: 'left', cellClass: 'pm-grid-number-cell', width: 200, filter: true },
    //   { headerName: 'Location', field: 'instl_addr2_tx', alignment: 'left', cellClass: 'pm-grid-number-cell', width: 150, filter: true }
    // ];
  
  
    // tslint:disable-next-line:member-ordering
    user: any = {
      permissions: { 'slct_in': 1, 'insrt_in': 0, 'updt_in': 0, 'dlte_in': 0, 'exprt_in': 0 },
      'perm_url': 'user/permissions/Edit Complaints'
    };
  
    // tslint:disable-next-line:member-ordering
    mainMessage = null;
  
    getUsrPermissions(): any {
      this.mainMessage = null;
      this.user.permissions = { 'slct_in': 1, 'insrt_in': 0, 'updt_in': 0, 'dlte_in': 0, 'exprt_in': 0 };
    //   this.crdsrv.get(this.user.perm_url).subscribe((res) => {
    //     // console.log(res['data']);
    //     this.user.permissions = res['data'][0];
    //     if (this.user.permissions.slct_in === 0) {
    //       this.mainMessage = 'You do not have permissions to do this operation. Please contact Administrator to get permissions.';
    //     } else
      
    //   if (this.router.url == '/admin/cmplnts/view_complaint') {
    //     this.shwPckgeAddBtn = true;
    //   } else {
    //     this.shwPckgeAddBtn = false;
    //   }
  
      this.getdata();
      //this.getcomplaintsDetails()
     // });
    }
  
    getcomplaintsDetails(): any {
        this.shwLdr = true;
        let rte2 = 'subscriberApp/OCCgetcmplntdtls/' + this.cafDtls.caf_id + '/' + this.cafDtls.comp_ticketno;
        // console.log(rte2);
        this.crdsrv.get(rte2).subscribe((res) => {
          this.ontDtls1 = res['data'];
            console.log(this.ontDtls1);
			if(this.ontDtls1[0].comp_status == 1 || this.ontDtls1[0].comp_status == 5 || this.ontDtls1[0].comp_status == 1){
              this.openholdinprogress = true
              this.resolveclose = false;
            } else {
              this.openholdinprogress = false
              this.resolveclose = true;
            }
            // const group = this.complaintcafdata.get('employeeInfo') as FormGroup;
            
            this.complaintcafdata.patchValue({complt_ticket_type:this.ontDtls1[0]["comp_ticket_type"]});      
            this.complaintcafdata.patchValue({select_category:this.ontDtls1[0]["comp_cat"]});
            this.complaintcafdata.patchValue({service_request_type:this.ontDtls1[0]["comp_request_service"]});
            this.complaintcafdata.patchValue({complaint_status:this.ontDtls1[0]["comp_status"]});
            this.complaintcafdata.patchValue({alternate_number:this.ontDtls1[0]["alternate_mobile"]});
            this.complaintcafdata.patchValue({priority:this.ontDtls1[0]["comp_priority"]});
            this.complaintcafdata.patchValue({issue_found:parseInt(this.ontDtls1[0]["issue_found"])});
            this.complaintcafdata.patchValue({action_taken:this.ontDtls1[0]["action_taken"]});
            this.complaintcafdata.patchValue({closed_over_by:this.ontDtls1[0]["closed_over"]});
            this.complaintcafdata.patchValue({employeeInfo:{owner_typ:parseInt(this.ontDtls1[0]["complaint_owner"])}});
            this.complaintcafdata.patchValue({employeeInfo:{assigned_emply:parseInt(this.ontDtls1[0]["complaint_assigned_to"])}});
            this.getsubemployee();
            
            // console.log(this.ontDtls1);
                  this.shwLdr = false;
                  const newLocal = 'comp_status';
                  console.log("this.ontDtls1[0][newLocal]",this.ontDtls1[0][newLocal]);
                  if(this.ontDtls1[0][newLocal] !='3')
                  {
                    this.btnenable = true;
                  } else {
                      this.btnenable = false;
                  }
                  if(this.ontDtls1[0][newLocal] =='2')
                  {
                    this.closeOverby = true;
                  } else {
                      this.closeOverby = false;
                  }
        });


        
      }
      
    
    getdata() {
      this.shwLdr = true;
      let rte = 'caf/customer/profile/' + this.cafDtls.caf_id;
      // console.log(rte);
      this.crdsrv.get(rte).subscribe((res) => {
        this.cafDtlsData = res['data'];
        // console.log(this.cafDtlsData);
        this.rowData = this.cafDtlsData;
        this.getcomplaintsDetails();
        // console.log(this.rowData);
        this.shwLdr = false;
      });
    }
    
    complaintedit() {
        let filetypCstInfo;
        //console.log(this.selectedFile.file.type)
        if(this.selectedFile){
            if (this.selectedFile.file.type == "application/pdf") {
            filetypCstInfo = "pdf"
            }
            else {
            filetypCstInfo = "image"
            }
            this.complaintcafdata.value.Updfile = this.selectedFile.src;
        }
        if (this.complaintcafdata.invalid) {
            this.snackBar.open("Please Enter Valid Data", '', {
              duration: 2000,
              horizontalPosition: this.horizontalPosition,
              verticalPosition: this.verticalPosition,
            });
          }
           else {
        if(this.complaintcafdata.value.employeeInfo["owner_typ"]!=4){
            var data = {
                cafid:  this.cafDtls.caf_id ,
                ticketnumber: this.cafDtls.comp_ticketno,
                complaintid:this.cafDtls.complaint_id,
                complt_ticket_type: this.complaintcafdata.value["complt_ticket_type"],
                servicerequest: this.complaintcafdata.value["service_request_type"],
                complaintcategory: this.complaintcafdata.value["select_category"],
                channellist: this.complaintcafdata.value["channel_list"],
                upgradpackage: this.complaintcafdata.value["upgrade_package"],
                plandowngradation: this.complaintcafdata.value["plan_downgradation"],
                complaintstatus: this.complaintcafdata.value["complaint_status"],
                priority:this.complaintcafdata.value["priority"],
                closed_over:this.complaintcafdata.value["closed_over_by"],
                issue_found:this.complaintcafdata.value["issue_found"],
                action_taken:this.complaintcafdata.value["action_taken"],
                selectcomplaintowner: this.complaintcafdata.value.employeeInfo["owner_typ"],
                assignedemployee: this.complaintcafdata.value.employeeInfo["assigned_emply"],
                complaintremarks: this.complaintcafdata.value["complaint_remarks"],
                attachments: [{
                    cstInfoFileTyp: filetypCstInfo,
                    uploadfile: this.complaintcafdata.value.Updfile,
                }],
            };

        }
        else{
            var data = {
                cafid:  this.cafDtls.caf_id ,
                ticketnumber: this.cafDtls.comp_ticketno,
                complaintid:this.cafDtls.complaint_id,
                complt_ticket_type: this.complaintcafdata.value["complt_ticket_type"],
                servicerequest: this.complaintcafdata.value["service_request_type"],
                complaintcategory: this.complaintcafdata.value["select_category"],
                channellist: this.complaintcafdata.value["channel_list"],
                upgradpackage: this.complaintcafdata.value["upgrade_package"],
                plandowngradation: this.complaintcafdata.value["plan_downgradation"],
                complaintstatus: this.complaintcafdata.value["complaint_status"],
                priority:this.complaintcafdata.value["priority"],
                closed_over:this.complaintcafdata.value["closed_over_by"],
                issue_found:this.complaintcafdata.value["issue_found"],
                action_taken:this.complaintcafdata.value["action_taken"],
                selectcomplaintowner: this.complaintcafdata.value.employeeInfo["owner_typ"],
                assignedemployee:this.cafDtlsData[0].agnt_cd,
                complaintremarks: this.complaintcafdata.value["complaint_remarks"],
                attachments: [{
                    cstInfoFileTyp: filetypCstInfo,
                    uploadfile: this.complaintcafdata.value.Updfile,
                }],
            };
        }

        // console.log(data)
        this.searchLoader = true;
         this.crdsrv.create(data, "subscriberApp/OCCIssueAssgnCat").subscribe((res) => {
            this.editcomplaint = res["data"];
            if (res['status'] == 200) {
                this.snackBar.open("Updated Sucessfully", '', {
                  duration: 2000,
                  horizontalPosition: this.horizontalPosition,
                  verticalPosition: this.verticalPosition,
                });
                // console.log(this.siusr)
                if(this.siusr){
                    this.router.navigate([`admin/cmplnts/view_complaint`])
                }else{
                  this.router.navigate(['admin/cmplnts/complaint_dashboard'])
                }
                
              }
              
            // console.log(this.editcomplaint);
            // this.router.navigate([`admin/cmplnts/complaint_dashboard`])
            // this.searchLoader = true;
        });
    // }
}    
} 
   

    tabChangeFn(event) {

      if (event.index == 0) {
        this.getdata();
      } else if (event.index === 1) {
        this.cmpLogLst();
      } 
    }

    ticketType(tickettype) {
        //   alert(tickettype);
        if (tickettype == "Customer Complaints") {
            this.showMecustomer = true;
            this.showMerequest = false;
            this.addonchannel = false;
            this.planupgrade = false;
            this.plandowngrade = false;
        } else {
            this.showMecustomer = false;
            this.showMerequest = true;
        }
    }

    closed_over_by(closedby){
      console.log("closedby event",closedby)
        if (closedby == "2") {
            this.closeOverby = true;
        } else {
            this.closeOverby = false;
        }
        if (closedby == "3") {
            this.closedfileby = true;
        } else {
            this.closedfileby = false;
        }
    }


    
    servicesRequest(servicesRequest) {
        //   alert(servicesRequest)
        if (servicesRequest == "addonchannel") {
            this.addonchannel = true;
            this.planupgrade = false;
            this.plandowngrade = false;
            this.showMecustomer = false;
        } else if (servicesRequest == "planupgrade") {
            this.addonchannel = false;
            this.planupgrade = true;
            this.plandowngrade = false;
            this.showMecustomer = false;
        } else if (servicesRequest == "plandowngrade") {
            this.addonchannel = false;
            this.planupgrade = false;
            this.plandowngrade = true;
            this.showMecustomer = false;
        }
    }
  
    // getEvents(): any {
    //   this.inEvntTab = true;
    //   this.cafId = this.cafDtlsData[0].caf_id;
    //   this.cafSts = this.cafDtlsData[0].enty_sts_id;
    // }
   
    close() {
        this.dialog.closeAll();
      }
    //   categoryList(){
    //     var data = {
    //         select_category: this.complaintcafdata.value["select_category"],
    //     };
    //     this.crdsrv.create(data,"subscriberApp/get_comp_cat").subscribe((res) => {
    //         this.categorylist = res["data"];
    //         // console.log(this.categorylist);
            
    //     });
    //     this.complaintcafdata.setValue(this.categorylist)
    // }

    categoryList(){
        const rte = `subscriberApp/get_comp_cat`;
        this.crdsrv.get(rte).subscribe((res) => {
            this.categorylist = res["data"];
          console.log(this.categorylist)
        });
        
    }


    customercategoryList(){
        const rte = `subscriberApp/OCCIssueCatgrytype/1`;
        this.crdsrv.get(rte).subscribe((res) => {
            this.customercategory = res["data"];
        //   console.log(res["data"])
          
        });
    }

    servicescategoryList(){
        const rte = `subscriberApp/OCCIssueCatgrytype/2`;
        this.crdsrv.get(rte).subscribe((res) => {
            this.servicescategory = res["data"];
        //   console.log(res["data"])
        });
    }
    enquirycategoryList(){
        const rte = `subscriberApp/OCCIssueCatgrytype/3`;
        this.crdsrv.get(rte).subscribe((res) => {
            this.enquirycategory = res["data"];
        //   console.log(res["data"])
          
        });
    }
    reset(){
        this.employeeDetails = "";
      } 

    getissuwowner() {
        const rte = `subscriberApp/OCCIssueCstmrTyp/2`;
        this.crdsrv.get(rte).subscribe((res) => {
          this.org = res['data'];
        //   console.log(this.org)
        });
      }
    
      getsubemployee() {
        const rte = `subscriberApp/OCCIssueCstmrSubTyp/`+ this.complaintcafdata.value.employeeInfo.owner_typ;
        this.crdsrv.get(rte).subscribe((res) => {
          this.suborg = res['data'];
          const newLocal1 = 'complaint_owner_id';
          const newLocal2 = 'emp_active';
          if(this.suborg[0][newLocal1] == '4' && this.suborg[0][newLocal2] == '1')
        {
            this.lmoinput = true;
            this.assigneddropdown = false;
            this.complaintcafdata.get('employeeInfo').get('assigned_emply').setValidators(null);
        }
        else{
            this.lmoinput = false;
            this.assigneddropdown = true;
        }
        //   console.log(this.suborg)
        });
    
      }
      channelList(){
        this.crdsrv.get("subscriberApp/OCCgetAddOnpackages").subscribe((res) => {
            this.channellist = res["data"];
            // console.log(this.channellist);
        });
    }

      planpackages: Packageplan[] = [
        {value: '1', viewValue: 'Home Mini'},
        {value: '2', viewValue: 'Home Basic'},
        {value: '3', viewValue: 'Home Essential'},
        {value: '4', viewValue: 'Home Premium'}
      ];
      
      
      
      priority: Priority[] = [
        {value: '1', viewValue: 'Low'},
        {value: '2', viewValue: 'Medium'},
        {value: '3', viewValue: 'High'},
      ];

      closed_by: ClosedOver[] = [
        {value: '1', viewValue: 'Phone'},
        {value: '2', viewValue: 'Direct Visit'},
      ];

      issue_found: IssueFound[] = [
        {value: '1', viewValue: 'Ip Issue'},
        {value: '2', viewValue: 'Customer End Issue'},
        {value: '3', viewValue: 'Zone Change'},
      ];

      complainttype: Complainttype[] = [
        {value: 'Customer Complaints', viewValue: 'Customer Complaints'},
        {value: 'Service Request', viewValue: 'Service Request'},
        {value: 'Enquiry', viewValue: 'Enquiry'}
      ];

      cmpLogLst(){
        this.shwLdr=true;
        const rte = `subscriberApp/OCCIssueTicktId/${this.cafDtls.complaint_id}` ;
        this.crdsrv.get(rte).subscribe((res) => {
          if(res['status']==200)
          {
            this.shwLdr=false;
            // console.log(res);
            this.complmtlogData=res['data'];
            let count = 0;
            console.log(this.complmtlogData)
           
          }
          
        });
    
    
      }

      
      downloadImage() {
        let imageUrl = `https://bbnlbss.apsfl.co.in/images/${this.cafDtls.comp_ticketno}`;
        //   "http://southparkstudios.mtvnimages.com/shared/characters/celebrities/mr-hankey.png?height=165";
   
        this.getBase64ImageFromURL(imageUrl).subscribe(base64data => {
          console.log(base64data);
          this.base64Image = "data:image/jpg;base64," + base64data;
          // save image to disk
          var link = document.createElement("a");
          document.body.appendChild(link); // for Firefox
          link.setAttribute("href", this.base64Image);
        //   console.log(this.cafDtls.comp_ticketno);
          link.setAttribute("download", this.cafDtls.comp_ticketno + ".jpg");
          link.click();
        });
      }

      closedownloadImage() {
        let imageUrl = `https://bbnlbss.apsfl.co.in/images/${this.cafDtls.comp_ticketno}close`;
        //   "http://southparkstudios.mtvnimages.com/shared/characters/celebrities/mr-hankey.png?height=165";
   
        this.getBase64ImageFromURL(imageUrl).subscribe(base64data => {
          console.log(base64data);
          this.base64Image = "data:image/jpg;base64," + base64data;
          // save image to disk
          var link = document.createElement("a");
          document.body.appendChild(link); // for Firefox
          link.setAttribute("href", this.base64Image);
        //   console.log(this.cafDtls.comp_ticketno);
          link.setAttribute("download", this.cafDtls.comp_ticketno + ".jpg");
          link.click();
        });
      }
    
      getBase64ImageFromURL(url: string) {
        return Observable.create((observer: Observer<string>) => {
          const img: HTMLImageElement = new Image();
          img.crossOrigin = "Anonymous";
          img.src = url;
          if (!img.complete) {
            img.onload = () => {
              observer.next(this.getBase64Image(img));
              observer.complete();
            };
            img.onerror = err => {
              observer.error(err);
            };
          } else {
            observer.next(this.getBase64Image(img));
            observer.complete();
          }
        });
      }
    
      getBase64Image(img: HTMLImageElement) {
        const canvas: HTMLCanvasElement = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx: CanvasRenderingContext2D = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);
        const dataURL: string = canvas.toDataURL("image/png");
    
        return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
      }
    
      screenshotsFile(typ, imageInput) {
        console.log("in image upload");
        console.log(imageInput.target.files[0])
        const file: File = imageInput.target.files[0];
        const reader = new FileReader();
        if(imageInput.target.files[0].size>512000){
            this.imagesize = false;
            this.imgsizemessage =true;
            // alert(`uploaded file size is ${(imageInput.target.files[0].size/1024).toFixed(2)} kb, please reduce the file size to less than 300kb then upload`);
            this.snackBar.open(`uploaded file size is ${(imageInput.target.files[0].size/1024).toFixed(2)} kb, please reduce the file size to less than 500kb then upload`, '', {
                    duration: 2000,
                    horizontalPosition: this.horizontalPosition,
                    verticalPosition: this.verticalPosition,
                  });
                  this.disableBtn = this.complaintcafdata.valid;
          }else{
            this.imagesize = true;
            this.imgsizemessage =false;
        reader.addEventListener('load', (event: any) => {
          console.log("siva")
          this.selectedFile = new ImageSnippet(event.target.result, file);
        });
        this.disableBtn = this.complaintcafdata.invalid;
    }
    reader.readAsDataURL(file);
      }



  }