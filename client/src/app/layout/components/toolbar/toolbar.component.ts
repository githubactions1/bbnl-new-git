import {
    Component,
    EventEmitter,
    OnDestroy,
    OnInit,
    ViewEncapsulation,
} from "@angular/core";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { TranslateService } from "@ngx-translate/core";
import * as _ from "lodash";
import { DsConfigService } from "@glits/services/config.service";
import { DsSidebarService } from "@glits/components/sidebar/sidebar.service";

import { navigation } from "app/navigation/navigation";
import { MatDialog, MatDialogConfig } from "@angular/material";
//import { QRDialogComponent } from '../qrdialog/qrdialog.component';
import { Router } from "@angular/router";
// import { AuthService } from 'app/main/baseapps/auth/auth.service';
import { UserService } from "app/providers/user/user.serivce";
import { AuthService } from "app/main/auth/auth.service";
import { CrudService } from "app/main/apps/crud.service";
import { HttpClient } from "@angular/common/http";
import { Http } from "@angular/http";
import { any } from "@amcharts/amcharts4/.internal/core/utils/Array";
import { string } from "@amcharts/amcharts4/core";
import { MessageDialogComponent } from "app/main/shared/components/message-dialog/message-dialog.component";

@Component({
    selector: "toolbar",
    templateUrl: "./toolbar.component.html",
    styleUrls: ["./toolbar.component.scss"],
    encapsulation: ViewEncapsulation.None,
})
export class ToolbarComponent implements OnInit, OnDestroy {
    [x: string]: any;
    horizontalNavbar: boolean;
    rightNavbar: boolean;
    hiddenNavbar: boolean;
    languages: any;
    actvChecked: boolean;
    navigation: any;
    selectedLanguage: any;
    userStatusOptions: any[];
    userData = {
        mrcht_dsply_nm: "",
        mrcht_usr_imge_url_tx: "",
        fst_nm: "",
        dsgn_nm: "",
        hyrchy_grp_nm: "",
    };
    userDtls: any = {};
    top_line1: any;
    top_line2: any;
    top_line3: any;
    top_line4: any;
    // Private
    timer: NodeJS.Timer;

    private _unsubscribeAll: Subject<any>;
    dialogRef: any;
    prflData: any;
    checked: any;
    saveagntdata : any;
    usrdtls: any;
    actvDisable: boolean = true;
    actvInd: any;
    employeeactive: any;
    empactive: boolean = false;
    empinactive: boolean = true;
    bellicon: boolean = false;
    walletcount: boolean = false;
    show: boolean = false;
	agntshow: boolean = false;
    breaks: boolean = false;
    ready: boolean = false;

    swithbtn: any;
    sladatainfo: any;
    walletinfo: any;
    id: any;
    readinfo: any;
    breakinfo: any;
    data: any;
    showOne: boolean;
    showTwo: boolean;
    showThree: boolean;
    showFour: boolean;
    showFive: boolean;
    showSix: boolean;

    //dialog: any;
    // changed = new EventEmitter<boolean>()
    /**
     * Constructor
     *
     * @param {DsConfigService} _dsConfigService
     * @param {DsSidebarService} _dsSidebarService
     * @param {TranslateService} _translateService
     */
    constructor(
        //public _matDialog: MatDialog,
        private _dsConfigService: DsConfigService,
        private _dsSidebarService: DsSidebarService,
        private _translateService: TranslateService,
        private userService: UserService,
        private authService: AuthService,
        private router: Router,
        public crdsrv: CrudService,
        public dialog: MatDialog,
        //public apiCtrl: CrudService,
        private http: HttpClient,
        public apiCtrl: CrudService,
        private https: Http
    ) {
        this.userService.listen().subscribe((m: any) => {
            this.onFilterClick();
        });

        this.userService.USER_DETAILS.subscribe((val) => {
            this.userData = val;
            //   console.log(val);
            if (
                val.usr_ctgry_id == 1 ||
                val.usr_ctgry_id == 2 ||
                val.usr_ctgry_id == 3 ||
                val.usr_ctgry_id == 6 ||
                val.usr_ctgry_id == 10
            ) {
                this.top_line1 = val.frst_nm;
                this.top_line2 = val.dsgn_nm;
                this.top_line3 = val.orgn_nm;
                this.top_line4 = val.lstlgn;
            } else if (val.usr_ctgry_id == 4) {
                // Customers
                this.top_line1 = val.caf_nu;
                this.top_line2 = val.sts_nm;
                this.top_line4 = val.lstlgn;
            } else if (val.usr_ctgry_id == 5) {
                // Enterprise Customers
                this.top_line1 = val.caf_nu;
                this.top_line2 = val.sts_nm;
                this.top_line4 = val.lstlgn;
            } else if (val.usr_ctgry_id == 7) {
                // MSO
                this.top_line1 = val.frst_nm;
                this.top_line2 = val.mso_cd;
                this.top_line3 = val.mso_org_nm;
                this.top_line4 = val.lstlgn;
            } else if (val.usr_ctgry_id == 8) {
                // LMO
                this.top_line1 = val.frst_nm;
                this.top_line2 = val.mso_cd + "/" + val.lmo_cd;
                this.top_line3 = val.lmo_org_nm;
                this.top_line4 = val.lstlgn;
            }
        });

        this.navigation = navigation;

        // Set the private defaults
        this._unsubscribeAll = new Subject();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        // this.user = localStorage.getItem('usrDtls');
        // this.usrDtls = JSON.parse(this.user);
        // console.log(this.usrDtls);
        // console.log("Success")
        this.userDtls = JSON.parse(localStorage.getItem("usrDtls"));
        // Subscribe to the config changes
        this._dsConfigService.config
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((settings) => {
                this.horizontalNavbar =
                    settings.layout.navbar.position === "top";
                this.rightNavbar = settings.layout.navbar.position === "right";
                this.hiddenNavbar = settings.layout.navbar.hidden === true;
            });

        // Set the selected language from default languages
        this.selectedLanguage = _.find(this.languages, {
            id: this._translateService.currentLang,
        });
        this.onFilterClick();
        // this.activemode();
        this.usrdtls = JSON.parse(localStorage.getItem("usrDtls"));
        console.log(this.usrdtls.mrcht_usr_id);
        if (this.usrdtls) {
            this.walletamountfrlmo();
        }

        if (
            this.usrdtls.mrcht_usr_id == "103003841" ||
            this.usrdtls.mrcht_usr_id == "103003453" ||
            this.usrdtls.mrcht_usr_id == "103006215" ||
            this.usrdtls.mrcht_usr_id == "103003454" ||
            this.usrdtls.mrcht_usr_id == "103003445" ||
            this.usrdtls.mrcht_usr_id == "103006443" ||
            this.usrdtls.mrcht_usr_id == "103007881" ||
            this.usrdtls.mrcht_usr_id == "103007882" ||
            this.usrdtls.mrcht_usr_id == "103003929" ||
            this.usrdtls.mrcht_usr_id == "103003974"
        ) {
            // if(this.usrdtls.mrcht_usr_id == '103003841' || this.usrdtls.mrcht_usr_id == '103003453' || this.usrdtls.mrcht_usr_id == '103006215' || this.usrdtls.mrcht_usr_id == '103003454' || this.usrdtls.mrcht_usr_id == '103003445' || this.usrdtls.mrcht_usr_id == '103006443' || this.usrdtls.mrcht_usr_id == '103011067'|| this.usrdtls.mrcht_usr_id == '103011068' || this.usrdtls.mrcht_usr_id == '103003929' || this.usrdtls.mrcht_usr_id == '103003974' )
            console.log("hi");
            this.slaticketlist();
            this.id = setInterval(() => {
                this.slaticketlist();
            }, 300000);
        }
        if (this.usrdtls.mnu_prfle_id == "1") {
            this.bellicon = false;
        } else {
            this.bellicon = true;
        }
		if (this.usrdtls.ivr_usr_id != null && this.usrdtls.ivr_usr_id != undefined && this.usrdtls.ivr_pswrd != null  && this.usrdtls.ivr_pswrd != undefined) {
            this.agntshow = true;
        } else {
            this.agntshow = false
        }
    }
    walletamountfrlmo() {
        this.crdsrv.get("lmoprepaid/walletamountfrlmo").subscribe((res) => {
            this.walletinfo = res["data"];
            if (this.usrdtls.usr_ctgry_id == 8 && this.usrdtls.prpd_flag == 1) {
                this.walletcount = true;
            } else {
                this.walletcount = false;
            }
            console.log(res["data"]);
            console.log(this.walletinfo);
            console.log(this.walletinfo.balance);
        });
    }

    // ---- IVR CODE ---- ///

    readyDetail() {
        this.showOne = false;
        this.showTwo = true;
        //console.log("READYAGENT SUCCESS")
        let data = {
            action: "READYAGENT",
            user_id: this.usrdtls.ivr_usr_id,
            update_break: "NO",
            refno: this.usrdtls.mrcht_usr_id,
        };
        this.crdsrv
            .create(data, "caf_operations/ivr_readyagent")
            .subscribe((res) => {
                this.readinfo = res["data"];
                console.log(this.readinfo);
                console.log("I am Ready API Hit Sucessful");

                this.timer = this.getIncomeCall();
            });
    }

    getIncomeCall() {
        
        console.log("In function");
        return setInterval(() => {
            clearInterval(this.timer);
            this.dialog.closeAll();
            const rte = `lmoprepaid/activeagentflagnotification`;
            var postData = {
                agentId: this.usrdtls.ivr_usr_id,
            };
            console.log("In function1");
            this.crdsrv.create(postData, rte).subscribe((res) => {
                if (
                    res["status"] === 200 &&
                    res["data"] &&
                    res["data"].length > 0
                ) {
                    this.showOne = false; this.showTwo = true; 
                    this.saveagntdata = res['data']
                    this.confirmMsgDialogRef = this.dialog.open(
                        MessageDialogComponent,
                        {
                            width: "25%",
                            panelClass: "my-class",
                            data: {
                                title: "Incoming Call",
                                msg: "Do You Want to Answer the Call?",

                                btnLst: [
                                    {
                                        label: "Accept",
                                        color: "Blue",
                                        res: "yes",
                                    }
                                ],
                            },
                        }
                    );
                    this.confirmMsgDialogRef
                        .afterClosed()
                        .subscribe((response) => {
                            if (response) {
                                if (response === "yes") {
                                    clearInterval(this.timer);
                                    this.dialog.closeAll();
                                    var accptData = {
                                        ID: this.usrdtls.ivr_usr_id,
                                    };
                                    const rte = `lmoprepaid/updatedflagnotify`;
                                    this.crdsrv
                                        .create(accptData, rte)
                                        .subscribe((res) => {
                                            if (res) {
                                               
                                                this.router.navigate([
                                                    "admin/cmplnts/add_complaint",
                                                ]);
                                                this.show = true;
                                                this.breaks = true;
                                                this.ready = true;
                                            } else {
                                                this.timer = this.getIncomeCall();
                                            }
                                        });
                                } else {
                                    alert("Call Rejected");
                                    clearInterval(this.timer);
                                    this.dialog.closeAll();
                                }
                            }
                        });
                    this.timer = this.getIncomeCall();
                } else {
                    //clearInterval(this.timer);
                    this.timer = this.getIncomeCall();
                }
            });
        }, 5000);
    }

     break() {
        this.showOne = true;
        this.showTwo = false;
        this.confirmMsgDialogRef = this.dialog.open(
            MessageDialogComponent,
            {
                width: "25%",
                panelClass: "my-class",
                data: {
                    title: "Break",
                    msg: "",

                    btnLst: [
                        {
                            label: "Lunch / Tea",
                            color: "Blue",
                            res: "yes",
                        },
                        {
                            label: "Ready",
                            color: "Red",
                            res: "no",
                        },
                    ],
                },
            }
        );
        this.confirmMsgDialogRef
        .afterClosed()
        .subscribe((response) => {
            console.log("response in break", response)
            if (response) {
                if (response === "yes") {

                    this.dialog.closeAll();

                    let data = {
                        action: "BREAK",
                        operation: "add",
                        process_name: "ConVox_Process",
                        break_name: "lunch",
                        break_time: "13:00:00",
                        break_description: "lunch break",
                        assigned_to_process: "Y",
                        refno: this.usrdtls.mrcht_usr_id,
                    };
                    this.crdsrv
                        .create(
                            data,
                            "caf_operations/ivr_breakuser"
                        )
                        .subscribe((res) => {
                            clearInterval(this.timer);
                            this.breakinfo = res["data"];
                            console.log(this.breakinfo);
                            console.log("Break API Hit Sucessful");
                        });


                } else {
                    this.showTwo = true;
                    this.dialog.closeAll();
                    let data = {
                        action: "BREAK",
                        operation: "delete",
                        process_name: "ConVox_Process",
                        break_name: "lunch",
                        refno: this.usrdtls.mrcht_usr_id
                    };
                    this.showOne = false;
                    this.showTwo = true;
                    this.crdsrv
                        .create(
                            data,
                            "caf_operations/ivr_breakdelete"
                        )
                        .subscribe((res) => {
                            this.breakinfo = res["data"];
                            console.log(this.breakinfo);
                            this.timer = this.getIncomeCall();                            
                            console.log("Break API Hit Sucessful");
                        });
                }
            }
        });

    }

    mute() {
        this.showOne = false; this.showThree = true; this.showFour = false; this.showFive = false; this.showSix = false;
        let data = {
            action: "MUTE",
            user_id: this.usrdtls.ivr_usr_id,
            refno: this.usrdtls.mrcht_usr_id,
        };
        this.crdsrv
            .create(
                data,
                "caf_operations/ivr_mute"
            )
            .subscribe((res) => {
                this.muteinfo = res["data"];
                console.log(this.muteinfo);
                console.log("Mute API Hit Sucessful");
            });
    }

    unMute() {
        this.showOne = false; this.showThree = false; this.showFour = true; this.showFive = false; this.showSix = false;
        let data = {
            action: "UNMUTE",
            user_id: this.usrdtls.ivr_usr_id,
            refno: this.usrdtls.mrcht_usr_id,
        };
        this.crdsrv
            .create(
                data,
                "caf_operations/ivr_unmute"
            )
            .subscribe((res) => {
                this.unmuteinfo = res["data"];
                console.log(this.unmuteinfo);
                console.log("Unmute API Hit Sucessful");
            });
    }

    hold() {
        this.showOne = false; this.showThree = false; this.showFour = false; this.showFive = true; this.showSix = false;
        let data = {
            action: "HOLD",
            user_id: this.usrdtls.ivr_usr_id,
            refno: this.usrdtls.mrcht_usr_id,
        };
        this.crdsrv
            .create(
                data,
                "caf_operations/ivr_hold"
            )
            .subscribe((res) => {
                this.holdinfo = res["data"];
                console.log(this.holdinfo);
                console.log("Hold API Hit Sucessful");
            });
    }

    unHold() {
        this.showOne = false; this.showThree = false; this.showFour = false; this.showFive = false; this.showSix = true;
        let data = {
            action: "UNHOLD",
            user_id: this.usrdtls.ivr_usr_id,
            refno: this.usrdtls.mrcht_usr_id,
        };
        this.crdsrv
            .create(
                data,
                "caf_operations/ivr_unhold"
            )
            .subscribe((res) => {
                this.unholdinfo = res["data"];
                console.log(this.unholdinfo);
                console.log("Unhold API Hit Sucessful");
            });
    }

    closeCall() {
        this.breaks = false;
        this.ready = false;
        this.show = false;                                                        
        let data = {
            action: "CLOSE",
            endcall_type: "CLOSE",
            convoxid: "19",
            disposition: "Test",
            agent_id: this.usrdtls.ivr_usr_id,
            process_crm_id: "1014",
            mobile_number: this.saveagntdata.mobileno,
            set_followUp: "Y",
            callback_date: "",
            callback_hrs: "",
            callback_mins: "",
            refno: this.usrdtls.mrcht_usr_id,
        };
        this.crdsrv
            .create(data, "caf_operations/ivr_closeuser")
            .subscribe((res) => {
                this.callinfo = res["data"];
                console.log(this.callinfo);
                this.timer = this.getIncomeCall();
                console.log("Close Call API Hit Sucessful");
                //this.router.navigate([`admin/sc/agent/lmo/dashboard`]);
            });
    }

    /// ---- IVR CODE END ---- ///

    slatickets() {
        this.router.navigate([`admin/cmplnts/view_complaint`]);
    }

    slaticketlist() {
        var data1 = {
            user_id: this.usrdtls.mrcht_usr_id,
        };
        // uat
        if (
            this.usrdtls.mrcht_usr_id == "103003841" ||
            this.usrdtls.mrcht_usr_id == "103003453" ||
            this.usrdtls.mrcht_usr_id == "103006215" ||
            this.usrdtls.mrcht_usr_id == "103003454" ||
            this.usrdtls.mrcht_usr_id == "103003445" ||
            this.usrdtls.mrcht_usr_id == "103006443" ||
            this.usrdtls.mrcht_usr_id == "103007881" ||
            this.usrdtls.mrcht_usr_id == "103007882" ||
            this.usrdtls.mrcht_usr_id == "103003929" ||
            this.usrdtls.mrcht_usr_id == "103003974"
        ) {
            // production
            // if(this.usrdtls.mrcht_usr_id == '103003841' || this.usrdtls.mrcht_usr_id == '103003453' || this.usrdtls.mrcht_usr_id == '103006215' || this.usrdtls.mrcht_usr_id == '103003454' || this.usrdtls.mrcht_usr_id == '103003445' || this.usrdtls.mrcht_usr_id == '103006443' || this.usrdtls.mrcht_usr_id == '103011067'|| this.usrdtls.mrcht_usr_id == '103011068' || this.usrdtls.mrcht_usr_id == '103003929' || this.usrdtls.mrcht_usr_id == '103003974' )
            console.log(data1);
            this.crdsrv
                .create(data1, "subscriberApp/slantfcnshw")
                .subscribe((res) => {
                    this.sladatainfo = res["data"];
                    console.log(this.sladatainfo);
                });
        }
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    onFilterClick() {
        let loggedIn = localStorage.getItem("log");
        if (loggedIn) {
            const profile = `user/profile`;
            this.crdsrv.get(profile).subscribe((res) => {
                if (res["status"] == 200) {
                    this.userData = res["data"][0];
                } else {
                    // console.log('.............')
                }
            });
        }
    }

    activemode() {
        {
            const rte = `subscriberApp/toggleButtonValue`;
            this.crdsrv.get(rte).subscribe((res) => {
                this.swithbtn = res["data"][0]["emp_active"];
                console.log(this.swithbtn);
                if (this.swithbtn == 0) {
                    this.swithbtn = false;
                    console.log("if");
                    this.empactive = false;
                    this.empinactive = true;
                } else {
                    console.log("else");
                    this.swithbtn = true;
                    this.empactive = true;
                    this.empinactive = false;
                }
                console.log(this.swithbtn);
            });
        }
    }

    employeeToggleactv(event): any {
        console.log(event);
        if (event == true) {
            this.empactive = true;
            this.empinactive = false;
        } else {
            this.empactive = false;
            this.empinactive = true;
        }

        var data = { toggle: event };
        this.crdsrv
            .create(data, "subscriberApp/toggleButtonRes")
            .subscribe((res) => {
                this.employeeactive = res["data"];
                console.log(this.employeeactive);
            });
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Toggle sidebar open
     *
     * @param key
     */
    toggleSidebarOpen(key): void {
        this._dsSidebarService.getSidebar(key).toggleOpen();
    }

    /**
     * Search
     *
     * @param value
     */
    search(value): void {
        // Do your search here...
        console.log(value);
    }

    /**
     * Set the language
     *
     * @param lang
     */
    setLanguage(lang): void {
        // Set the selected language for the toolbar
        this.selectedLanguage = lang;

        // Use the selected language for translations
        this._translateService.use(lang.id);
    }

    // openQr(id) {
    //     this.dialogRef = this._matDialog.open(QRDialogComponent, {
    //         panelClass: 'qr-dialog',
    //         data: {
    //             id: id
    //         }
    //     });

    // }


    doLogout(): void {
        var postIvrData = {
            action:"LOGOUTUSER",
            user:this.usrdtls.ivr_usr_id,
            update_break:"lunch",
            refno: this.usrdtls.mrcht_usr_id
        };
    const ivrRte = `caf_operations/ivr_logoutuser`; 
    this.crdsrv.create(postIvrData, ivrRte).subscribe((res) => {
        if (
            res['data'].statusCode === 200 &&
            res['data']["body"] 
        ) {
            clearInterval(this.timer);
            //alert("lOGOUT SUCCESS");
        }
    });
       /* var postuserData = {
            action:"LOGOUTUSER",
            user:"103000730",
            update_break:"lunch",
            refno:this.usrdtls.mrcht_usr_id
        };
        const logRte = `caf_operations/ivr_logoutuser`;
        this.apiCtrl.create(postuserData, logRte).subscribe((res) => {
            console.log("ivr_logoutuser res",res);
            console.log("ivr_logoutuser res",res['data'][0]);
            console.log("ivr_logoutuser resstatusCode",res['data'].statusCode);
            console.log("ivr_logoutuser res [0] .statusCode",res['data'][0].statusCode);
            if (
                res['data'].statusCode === 200 &&
                res['data']["body"] &&
                res['data']["body"].length > 0
            ) {
                clearInterval(this.timer);
                alert("lOGOUT SUCCESS");

            }
        });*/
        localStorage.removeItem("usrDtls");
        localStorage.removeItem("rcntSrch");
        this.authService.doLogout((err, res) => {
           
            this.router.navigate(["/"]);

        });
    }
   
}
