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
interface escalationPriority {
    value: any;
    viewValue: string;
}
interface levelName {
    value: any;
    viewValue: string;
}
@Component({
    selector: "ds-edit-sla",
    templateUrl: "./edit-complaint-sla.component.html",
    styleUrls: ["./edit-complaint-sla.component.scss"],
})
@Injectable({ providedIn: "root" })
export class EditComplaintSlaComponent implements OnInit {
    @Input() sladata: any;
    [x: string]: any;
    clsbtn = false;
    // @Input() sladata: any;
    horizontalPosition: MatSnackBarHorizontalPosition = "end";
    verticalPosition: MatSnackBarVerticalPosition = "top";
    addsla: FormGroup;
    // sladata = this.Url.onCellClick();
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
    sameCafDtls: boolean;
    cafId: any;
    employeeDetails: any;
    myGroup: any;
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
        srch_txt: "",
        srch_ldng: false,
        lmt_pstn: 1,
        pcge_mde: "1",
        agntId: "",
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

    // @ViewChildren ('checkBox' ) checkBox: QueryList<any>;
    checked = [];
    fnlChckdData = [];
    usrDtls: any;
    addonPckgsPrm: any;
    crntDataSpd: any;
    crntDataSpd_apldDt: any;
    prvsDataSpd: any;
    cmpltTab: any;
    hsiBstrPckDt: any;
    shwTrlHsiCrd: boolean;
    cafHsiMnthPckgsData: any;
    getHeaderDtls = function (): any {
        return { title: "Edit Employee", icon: "people_outline" };
    };
    crntMnthNm: string;
    crntYr: number;
    grphMnthYr: string;
    ticketcolumnDefs: (
        | {
              headerName: string;
              field: string;
              alignment: string;
              cellClass: string;
              width: number;
              filter: boolean;
              search?: undefined;
          }
        | {
              headerName: string;
              field: string;
              alignment: string;
              cellClass: string;
              width: number;
              filter: boolean;
              search: boolean;
          }
    )[];
    TicketData: any;
    shwTicketMsg: string;
    categorylist: any;
    selected: any;
    modalitie: any;
    showMecustomer: boolean = false;
    closeOverby: boolean = false;
    closedfileby: boolean = false;
    btnenable: boolean = false;
    showMerequest: boolean = false;
    addonchannel: boolean = false;
    planupgrade: boolean = false;
    plandowngrade: boolean = false;
    complaint_status: any;
    showcustomerdetails: boolean = true;
    channellist: [] = [];
    can_edit = true;
    searchLoader: boolean;
    disableSelect: any;
    disableBtn: boolean;
    selectdropdowndisable: boolean;
    editcomplaint: any;
    editing: any;
    base64Image: any;
    owner_typ: any;
    assigned_emply: any;
    complmtlogData: any;
    customercategory: any;
    servicescategory: any;
    enquirycategory: any;
    lmoinput: boolean = false;
    assigneddropdown: boolean = true;
    selectedFile: any;
    complaintform: any;
    imagesize: boolean;
    imgsizemessage: boolean;
    org;
    suborg;
    slaid: any;
    shwLdr = false;
    merchentid: any;
    mrchntdata: any;
    constructor(
        public TransfereService: TransfereService,
        public crdsrv: CrudService,
        private dsSidebarService: DsSidebarService,
        @Inject(MAT_DIALOG_DATA) public cafdata: DialogData,
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

        const permTxt1 = "Addon packages";
        const prmeRte1 = `user/permissions/${permTxt1}`;
        this.crdsrv.get(prmeRte1).subscribe((res) => {
            this.addonPckgsPrm = res["data"][0];
            // console.log(this.addonPckgsPrm);
            if (this.addonPckgsPrm == undefined) {
                this.addonPckgsPrm = {};
            }
            // console.log(this.addonPckgsPrm.insrt_in);
        });
        //   this.route.queryParams.subscribe(params => {
        //     console.log(params);

        //   });
        //   this.sladata = this.TransfereService.getLoclData('data');
        //   console.log(this.TransfereService.getData());
        //   console.log(this.sladata);
        //   console.log("Basic Edit");
    }

    close() {
        this.dialog.closeAll();
    }

    ngOnInit() {
        
        this.addsla = this._formBuilder.group({
            sla_id: [null, Validators],
            issue_owner: [null, Validators],
            level_one_time: [null, Validators.required],
            level_two_time: [null, Validators.required],
            level_three_time: [null, Validators],
            level_four_time: [null, Validators],
            Other_emails: [null, Validators],
            owner_typ: [null, Validators.required],
        });
        this.sladata = this.TransfereService.getLoclData("data");
        this.clsbtn = true;
        this.usrDtls = JSON.parse(localStorage.getItem("usrDtls"));
        this.getissuwowner();
        this.getslaDetails();
        this.slaedit();
        // this.getslaid();
    }
    ngOnChanges(): any {
        this.getslaDetails();
    }

    escalation_priority: escalationPriority[] = [
        { value: 1, viewValue: "Primary" },
        { value: 2, viewValue: "Secondary" },
        { value: 3, viewValue: "Territory" },
    ];

    level_name: levelName[] = [
        { value: 1, viewValue: "Level-1" },
        { value: 2, viewValue: "Level-2" },
        { value: 3, viewValue: "Level-3" },
        { value: 4, viewValue: "Level-4" },
    ];

    getissuwowner() {
        const rte = `subscriberApp/OCCIssueCstmrTyp/0`;
        this.crdsrv.get(rte).subscribe((res) => {
            this.org = res["data"];
            console.log(this.org);
        });
        this.reset();
    }
    reset() {
        this.employeeDetails = "";
    }

    getsubemployee() {
        const rte =`subscriberApp/OCCIssueCstmrSubTyp/` + this.addsla.value.employeeInfo.owner_typ;
        this.crdsrv.get(rte).subscribe((res) => {
            this.suborg = res["data"];
            console.log(this.suborg);
            const newLocal1 = "complaint_owner_id";
            const newLocal2 = "emp_active";
            if (
                this.suborg[0][newLocal1] == "4" &&
                this.suborg[0][newLocal2] == "1"
            ) {
                this.lmoinput = true;
                this.assigneddropdown = false;
                this.addsla
                    .get("employeeInfo")
                    .get("assigned_emply")
                    .setValidators(null);
            } else {
                this.lmoinput = false;
                this.assigneddropdown = true;
            }
        });
    }

    // getslaid(): any {
    //     const cmprte = `subscriberApp/slagetdatainsert`;
    //     this.crdsrv.get(cmprte).subscribe((res) => {
    //         if (res["status"] === 200) {
    //             this.slaid = res["data"];
    //             console.log(this.slaid);
    //             console.log(this.slaid[0].ID);
    //         }
    //     });
    // }

   
    slaedit() {
        if (this.addsla.invalid) {
            this.snackBar.open("Please Enter Valid Data", "", {
                duration: 2000,
                horizontalPosition: this.horizontalPosition,
                verticalPosition: this.verticalPosition,
            });
        } else {
            var data = {               
                // id: this.addsla.value["owner_typ"],
                issue_owner: this.addsla.value["issue_owner"],
                level_one_time: this.addsla.value["level_one_time"],
                level_two_time: this.addsla.value["level_two_time"],
                level_three_time: this.addsla.value["level_three_time"],
                level_four_time: this.addsla.value["level_four_time"],
                Other_emails: this.addsla.value["Other_emails"],
            };
            console.log(data);
            this.crdsrv.create(data, "subscriberApp/editslahoursdata").subscribe((res) => {
                    this.editsla= res["data"];
                    console.log(this.editsla);
                    if (res["status"] == 200) {
                        this.snackBar.open("Updated Sucessfully", "", {
                            duration: 2000,
                            horizontalPosition: this.horizontalPosition,
                            verticalPosition: this.verticalPosition,
                        });
                        // console.log(this.siusr)
                        // if (this.siusr) {
                        //     this.router.navigate([
                        //         `admin/cmplnts/view_complaint`,
                        //     ]);
                        // } else {
                        //     this.router.navigate([
                        //         "admin/cmplnts/complaint_dashboard",
                        //     ]);
                        // }
                        window.location.reload();
                    }
                });
        }
    }

    getslaDetails(): any {
        console.log(this.sladata.issue_owner);
        this.shwLdr = true;
        let rte2 = "subscriberApp/slagetdatainsert/" + this.sladata.issue_owner;
        // console.log(rte2);
        this.crdsrv.get(rte2).subscribe((res) => {
            this.sladatadata = res["data"];
            console.log(this.sladatadata);
            // const group = this.complaithis.sladatantcafdata.get('employeeInfo') as FormGroup;
            this.addsla.patchValue({sla_id: this.sladatadata[0]["ID"]});
            this.addsla.patchValue({issue_owner:parseInt(this.sladatadata[0]["issue_owner"])});
            this.addsla.patchValue({owner_typ: this.sladatadata[0]["complaint_owner_name"]});
            this.addsla.patchValue({level_one_time: this.sladatadata[0]["Escltn_lvl_one_time"]});
            this.addsla.patchValue({level_two_time: this.sladatadata[0]["Escltn_lvl_two_time"]});
            this.addsla.patchValue({level_three_time: this.sladatadata[0]["Escltn_lvl_three_time"]});
            this.addsla.patchValue({level_four_time: this.sladatadata[0]["Escltn_lvl_four_time"]});
            this.addsla.patchValue({Other_emails: this.sladatadata[0]["Escltn_other_email"]});
            this.shwLdr = false;
        });
    }

}
