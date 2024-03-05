import { Component,OnInit,Inject,Input,ViewChildren,QueryList,} from "@angular/core";
import { TransfereService } from "app/providers/transfer/transfer.service";
import { CrudService } from "app/main/apps/crud.service";
import {
    MAT_DIALOG_DATA,
    MatDialog,
    MatSnackBar,
    MatSnackBarHorizontalPosition,
    MatSnackBarVerticalPosition,
} from "@angular/material";
import { DialogData } from "app/main/apps/general/change-log/master/change-log/change-log-modal/change-log-modal.component";
import { ActivatedRoute } from "@angular/router";
import { Router } from "@angular/router";
import { DxChartModule } from "devextreme-angular";
import { DsSidebarService } from "@glits/components/sidebar/sidebar.service";
import * as _ from "lodash";
import { Observable, Observer } from "rxjs";
import { Injectable } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

interface Ticket_type {
    value: any;
    viewValue: string;
}

@Component({
  selector: 'ds-edit-general-equiry-tickets',
  templateUrl: './edit-general-equiry-tickets.component.html',
  styleUrls: ['./edit-general-equiry-tickets.component.scss']
})
@Injectable({ providedIn: "root" })

export class EditGeneralEquiryTicketsComponent implements OnInit {
    @Input() generaldata: any;
    viewGenralenqydata: FormGroup;
    org;
    suborg;
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
    Genraledata:any;
    columnDefs = [];
    districtId: any;
    spnrCtrl = false;
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
    usrDtls: any;
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
    clsbtn = false;
    Newconnection: boolean = true;
    Calldrop: boolean = false;
    sdeMnuLdr = false;
    gnrlenqDatainfo:any;
    constructor(
        public TransfereService: TransfereService,
        public crdsrv: CrudService,
        private dsSidebarService: DsSidebarService,
        public dialog: MatDialog,
        public route: ActivatedRoute,
        private _snackBar: MatSnackBar,
        private router: Router,
        private _formBuilder: FormBuilder,
        private snackBar: MatSnackBar
    ) {
        this.permissions = {
            slct_in: 1,
            insrt_in: 0,
            updt_in: 1,
            dlte_in: 1,
            exprt_in: 1,
        };
    }
  ngOnInit() {
      // let emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
      let phoneNumber = /^(\+\d{1,3}[- ]?)?\d{10}$/;
      let pinCode = /^(\+\d{1,3}[- ]?)?\d{6}$/;
      this.viewGenralenqydata = this._formBuilder.group({
        gen_enq_id:["", Validators.required],
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
            district: ["", Validators.required],
              dst_manager: ["", Validators.required],
          }),
      });
      this.generaldata = this.TransfereService.getLoclData("data");
      this.usrDtls = JSON.parse(localStorage.getItem("usrDtls"));
      this.getdistrictname();
      this.geteditgenrlEnqDetails();
  }

  ngOnChanges(): any {
    this.geteditgenrlEnqDetails();
}
close() {
    this.dialog.closeAll();
}
  ticket_type: Ticket_type[] = [
    {value: '1', viewValue: 'New Connection'},
    {value: '2', viewValue: 'Call Drop'},
  ];

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
    const rte = `subscriberApp/OCCIssueDstrtMngr/` + this.viewGenralenqydata.value.districtInfo.district;
    this.crdsrv.get(rte).subscribe((res) => {
        this.dstmanager = res["data"];
        console.log(this.dstmanager);
    });
}

geteditgenrlEnqDetails() {
    console.log(this.generaldata.gen_enq_id);
    this.shwLdr = true;
    let rte2 = "subscriberApp/OCCgetcmplntdtlss/"+ this.generaldata.gen_enq_id;
    this.crdsrv.get(rte2).subscribe((res) => {
        this.gnrlenqDatainfo = res["data"];
        console.log(this.gnrlenqDatainfo[0]);
        
        this.viewGenralenqydata.patchValue({gen_enq_id:parseInt(this.gnrlenqDatainfo[0]["gen_enq_id"])}); 
        this.viewGenralenqydata.patchValue({ticket_type:this.gnrlenqDatainfo[0]["tckt_name"]});
        this.viewGenralenqydata.patchValue({Name:this.gnrlenqDatainfo[0]["first_name"]}); 
        this.viewGenralenqydata.patchValue({Email:this.gnrlenqDatainfo[0]["email_id"]}); 
        this.viewGenralenqydata.patchValue({village:this.gnrlenqDatainfo[0]["village"]});
        this.viewGenralenqydata.patchValue({mobileNumber:this.gnrlenqDatainfo[0]["mobile_no"]});
        this.viewGenralenqydata.patchValue({mandal:this.gnrlenqDatainfo[0]["mandal"]});
        this.viewGenralenqydata.patchValue({pincode:this.gnrlenqDatainfo[0]["pincode"]}); 
        this.viewGenralenqydata.patchValue({description:this.gnrlenqDatainfo[0]["description"]}); 
        this.viewGenralenqydata.patchValue({districtInfo:{district:parseInt(this.gnrlenqDatainfo[0]["district"])}});
        this.viewGenralenqydata.patchValue({districtInfo:{dst_manager:this.gnrlenqDatainfo[0]["manager"]}});
    this.dstmangers();
        this.shwLdr = false;
    });
}

}
