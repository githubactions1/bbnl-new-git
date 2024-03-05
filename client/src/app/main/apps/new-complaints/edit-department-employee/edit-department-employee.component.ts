// import { Component, OnInit } from '@angular/core';
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
@Component({
  selector: 'ds-edit-employee',
  templateUrl: './edit-department-employee.component.html',
  styleUrls: ['./edit-department-employee.component.scss']
})
export class EditDepartmentEmployeeComponent implements OnInit {
    clsbtn = false;
    @Input() employedata: any;
    horizontalPosition: MatSnackBarHorizontalPosition = 'end';
    verticalPosition: MatSnackBarVerticalPosition = 'top';
    
    merchentemployeedata: FormGroup;
    
    invoiceChrgsData: any;
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
    getHeaderDtls = function (): any { return { 'title': 'Edit Employee', 'icon': 'people_outline' }; };
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
    btnenable: boolean = false;
    showMerequest: boolean = false;
    addonchannel: boolean = false;
    planupgrade: boolean = false;
    plandowngrade: boolean = false;
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
    org;
    merchentid: any;
    mrchntdata: any;
    updatesubemployee: any;
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


  ngOnInit() {

    this.merchentemployeedata = this._formBuilder.group({
        owner_id: ["", Validators.required],
        merchant_id: ["", Validators.required],
        employee_name: ["", Validators.required],
        complaint_sub_emp_id: ["", Validators],
    });
    this.employedata = this.TransfereService.getLoclData("data");
    this.getissuwowner();
    this.getMerchentid();
    this.merchentid= this.TransfereService.getLoclData('data');
        // console.log(this.merchentid)

  }

  ngOnChanges(): any {
    this.getMerchentid();
}

  getissuwowner() {
    const rte = `subscriberApp/OCCIssueCstmrTyp/2`;
    this.crdsrv.get(rte).subscribe((res) => {
      this.org = res['data'];
      console.log(this.org)
    });
  }
//   
  getMerchentid(): any {
    console.log(this.employedata.mrcht_usr_id);
    let rte2 = 'subscriberApp/getbysubemployees/' + this.employedata.mrcht_usr_id;
    // console.log(rte2);
    this.crdsrv.get(rte2).subscribe((res) => {
      this.mrchntdata = res['data'];
        console.log(this.mrchntdata);
    this.merchentemployeedata.patchValue({owner_id:parseInt(this.mrchntdata[0]["complaint_owner_id"])});      
    this.merchentemployeedata.patchValue({merchant_id:this.mrchntdata[0]["mrcht_usr_id"]});
    this.merchentemployeedata.patchValue({employee_name:this.mrchntdata[0]["complaint_sub_emp_name"]});
    this.merchentemployeedata.patchValue({complaint_sub_emp_id:this.mrchntdata[0]["complaint_sub_emp_id"]});
});
  }



  close() {
    this.dialog.closeAll();
  }

  editmerchntid(): any
  {
    
    if (this.merchentemployeedata.invalid) {
        this.snackBar.open("Please Enter Valid Data", '', {
          duration: 2000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
      }
       else {
        var data = {
            emp_id: this.merchentemployeedata.value["complaint_sub_emp_id"],
            owner_id: this.merchentemployeedata.value["owner_id"],
            merchent_id: this.merchentemployeedata.value["merchant_id"],
            employeename: this.merchentemployeedata.value["employee_name"],
           
        };
        console.log(data);
        this.searchLoader = true;
        this.crdsrv.create(data, "subscriberApp/updateaddsubemployees").subscribe((res) => {
            this.updatesubemployee = res["data"];
            if (res['status'] == 200) {
                this.snackBar.open("Sucessfully Added", '', {
                  duration: 2000,
                  horizontalPosition: this.horizontalPosition,
                  verticalPosition: this.verticalPosition,
                });
                window.location.reload();
              }
            console.log(this.updatesubemployee);
            this.searchLoader = false;
          
        });
       }  
  }


}
