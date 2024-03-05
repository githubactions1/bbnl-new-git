import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { DsConfigService } from "@glits/services/config.service";
import { dsAnimations } from "@glits/animations";
import { Router } from "@angular/router";
import { DsNavigationService } from "@glits/components/navigation/navigation.service";
import { UserService } from "app/providers/user/user.serivce";
import { AuthService } from "../auth.service";
import * as moment from "moment";
import { CrudService } from "app/main/apps/crud.service";
import { MatDialog, MatDialogRef } from "@angular/material";
import { MessageDialogComponent } from "app/main/shared/components/message-dialog/message-dialog.component";
import { Alert } from "selenium-webdriver";
import button from "devextreme/ui/button";
import { DomSanitizer } from "@angular/platform-browser";
//import { MD5CryptoService } from "app/main/services/md5.service";
// import { CrudService } from '../../../apps/merchant/crud.service';

@Component({
    selector: "login",
    templateUrl: "./login.component.html",
    styleUrls: ["./login.component.scss"],
    encapsulation: ViewEncapsulation.None,
    animations: dsAnimations,
})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    showhide = true;
    errmsg: any;
    userData: any = {};
    baseUrl = "http://localhost:4200";
    newmerchant = false;
    regForm: FormGroup;
    err_msg = null;
    IPVAR;
    IPVALR;
    login_ct = null;
    lockout_ts = null;
    submitLgn = false;
    stopWatchTm = null;
    userDtls: any;
    usrlocdata: any;
    msoDiv: boolean = false;
    lmoDiv: boolean = false;
    timeinterval: NodeJS.Timer;
    confirmMsgDialogRef: MatDialogRef<MessageDialogComponent>;
    timer: NodeJS.Timer;
    agent_id: any;
	captchText: any;
    captchID = null;
    saltKey = null;
    captchImg: any;
    loader: boolean;

    /**
     * Constructor
     *
     * @param {DsConfigService} _dsConfigService
     * @param {FormBuilder} _formBuilder
     */
    constructor(
        private _dsConfigService: DsConfigService,
        private _dsNavigationService: DsNavigationService,
        private _formBuilder: FormBuilder,
        public authService: AuthService,
        public userService: UserService,
        public router: Router,
        public apiCtrl: CrudService,
        private http: HttpClient,
        public dialog: MatDialog,
        private domSanitizer: DomSanitizer,
        //private md5Srvc: MD5CryptoService
    ) {
        var userId = localStorage.getItem("uid");
        var usrDtls = localStorage.getItem("usrDtls");
        this.usrlocdata = JSON.parse(localStorage.getItem("usrDtls"));
        // var clnt = localStorage.getItem('clnts') ? JSON.parse(localStorage.getItem('clnts')) : {};
        if (usrDtls) {
            let data = JSON.parse(usrDtls);
            if (data && data.prfle_dshbd_url_tx != null) {
                this.router.navigate([data.prfle_dshbd_url_tx]);
            }
        }
        // Configure the layout
        this._dsConfigService.config = {
            layout: {
                navbar: {
                    hidden: true,
                },
                toolbar: {
                    hidden: true,
                },
                footer: {
                    hidden: true,
                },
                sidepanel: {
                    hidden: true,
                },
            },
        };
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        var errmsg = "Special characters ' /  { } * ()`%^ not allowed! ";
        let pwdpattern = /^[a-zA-Z0-9s!@#$&]+$/;
        this.loginForm = this._formBuilder.group({
            username: ["", [Validators.required]],
            password: [
                "",
                [Validators.pattern(pwdpattern), Validators.required],
            ],
			captcha: [null, [Validators.required]]
        });
        this.regForm = this._formBuilder.group({
            name: ["", [Validators.required]],
            email: ["", Validators.required],
            number: ["", [Validators.required]],
            org: ["", Validators.required],
        });
        //console.log(this.loginForm.get('password').hasError('required'))
		this.getCaptchaText();
    }
	validateCaptcha = (calbk) => {
        if (this.loginForm.value['captcha'] && this.loginForm.value['captcha'].trim() != '') {
          calbk(true);
        } else {
          calbk(false);
        }
    }
    run_clock() {
        var countdown = 30 * 60 * 1000;
        this.stopWatchTm = "30:00";
        var timerId = setInterval(() => {
            countdown -= 1000;
            var min = Math.floor(countdown / (60 * 1000));
            var sec = Math.floor((countdown - min * 60 * 1000) / 1000); //correct

            if (countdown <= 0) {
                clearInterval(timerId);
                this.submitLgn = false;
                //doSomething();
            } else {
                this.stopWatchTm = min + " : " + sec;
            }
        }, 1000);
    }

    /*doLogin() {
        //this.checkipofclient();

        // this.router.navigate(['baseproject/dashboard']);
        this.err_msg = null;
        this.login_ct =
            localStorage.getItem("" + this.loginForm.value.username) || 0;
        localStorage.setItem("" + this.loginForm.value.username, this.login_ct);

        this.authService.doLogin(this.loginForm.value, (err, res) => {
            // if (err && err == false) {
            //     this.err_msg = 'Something went wrong. Please check your internet connection and try again.';
            //     return;
            // }

            if (res && res.status == 200) {
                if (!res.data) {
                    this.login_ct++;
                    localStorage.setItem(
                        "" + this.loginForm.value.username,
                        this.login_ct
                    );
                    this.err_msg = "Incorrect username or password.";
                    return;
                }
                localStorage.removeItem("" + this.loginForm.value.username);
                this.userData = res.data;
                localStorage.setItem("uid", res.data.user.mrcht_usr_id);
                localStorage.setItem("usrmnudtls", this.IPVAR);
                if (res.data.user.pwd_chngd_in == 1) {
                    this.router.navigate(["/admin/reset-password"]);
                    // return;
                } else {
                    this.userService.loggedIn(true);
                    this.userService.setUsrDta(res.data.user);
                    this.UsrPrfles(res.data.user);
                }
            } else {
                this.err_msg = "Incorrect username or password.";
            }
        });
    }*/
	    doLogin() {
        localStorage.clear();

        this.validateCaptcha((cptch_res) => {
            if (cptch_res) {
                this.loader = true;
                this.errmsg = false;
                this.err_msg = null;
                var req_body = {
                    username: '' + this.loginForm.value.username,
                    //   password: this.getEncpryPwd(this.loginForm.value.password, this.saltKey),
                    password: this.loginForm.value.password,
                    app: 'web',
                    captcha: this.loginForm.value.captcha.trim(),
                    captchaID: this.captchID,
                    saltKey: this.saltKey
                }
                this.err_msg = null;
                this.login_ct =
                    localStorage.getItem("" + this.loginForm.value.username) || 0;
                localStorage.setItem("" + this.loginForm.value.username, this.login_ct);

                this.authService.doLogin(req_body, (err, res) => {
                    // if (err && err == false) {
                    //     this.err_msg = 'Something went wrong. Please check your internet connection and try again.';
                    //     return;
                    // }
                    if (res && res.status == 200) {
                        if (!res.data) {
                            this.login_ct++;
                            localStorage.setItem(
                                "" + this.loginForm.value.username,
                                this.login_ct
                            );
                            // this.err_msg = "Incorrect username or password.";
                            this.getCaptchaText();
                            this.loginForm['captcha'] = '';
                            this.errmsg = true;
                            this.loader = false;
                            this.err_msg = "Incorrect username or password.";
                            return;
                        }
                        localStorage.removeItem("" + this.loginForm.value.username);
                        this.userData = res.data;
                        localStorage.setItem("uid", res.data.user.mrcht_usr_id);
                        localStorage.setItem("usrmnudtls", this.IPVAR);
                        if (res.data.user.pwd_chngd_in == 1) {
                            this.router.navigate(["/admin/reset-password"]);
                            // return;
                        } else {
                            this.userService.loggedIn(true);
                            this.userService.setUsrDta(res.data.user);
                            this.UsrPrfles(res.data.user);
                        }

                        // this.err_msg = "Incorrect username or password.";
                    } else if (res['status'] == 411 || res['status'] == 601) {
                        this.errmsg = true;
                        this.loader = false;
                        this.err_msg = res['message'];
                    } else {
                        this.getCaptchaText();
                        this.loginForm['captcha'] = '';
                        this.errmsg = true;
                        this.loader = false;
                        this.err_msg = res['message'];
                    }
                });
            }
            else {
                this.errmsg = true;
                this.loader = false;
                this.err_msg = "Please enter valid captcha";
            }
        })





        // //this.checkipofclient();

        // // this.router.navigate(['baseproject/dashboard']);
        // this.err_msg = null;
        // this.login_ct =
        //     localStorage.getItem("" + this.loginForm.value.username) || 0;
        // localStorage.setItem("" + this.loginForm.value.username, this.login_ct);

        // this.authService.doLogin(this.loginForm.value, (err, res) => {
        //     // if (err && err == false) {
        //     //     this.err_msg = 'Something went wrong. Please check your internet connection and try again.';
        //     //     return;
        //     // }
        //     if (res && res.status == 200) {
        //         if (!res.data) {
        //             this.login_ct++;
        //             localStorage.setItem(
        //                 "" + this.loginForm.value.username,
        //                 this.login_ct
        //             );
        //             this.err_msg = "Incorrect username or password.";
        //             return;
        //         }
        //         localStorage.removeItem("" + this.loginForm.value.username);
        //         this.userData = res.data;
        //         localStorage.setItem("uid", res.data.user.mrcht_usr_id);
        //         localStorage.setItem("usrmnudtls", this.IPVAR);
        //         if (res.data.user.pwd_chngd_in == 1) {
        //             this.router.navigate(["/admin/reset-password"]);
        //             // return;
        //         } else {
        //             this.userService.loggedIn(true);
        //             this.userService.setUsrDta(res.data.user);
        //             this.UsrPrfles(res.data.user);
        //         }
        //     } else {
        //         this.err_msg = "Incorrect username or password.";
        //     }
        // });
    }
    getCaptchaText = () => {
        this.errmsg = false;
        this.apiCtrl.get('login/capcha').subscribe((res) => {
            if (res['status'] == 200 && res['data']) {
                this.captchID = res['data']['cptch_id'];
                this.saltKey = res['data']['salt_ky'];
                this.captchImg = this.domSanitizer.bypassSecurityTrustUrl(res['data']['data']);
            }
            else {
                this.errmsg = true;
                this.err_msg = res['message'];
                this.captchID = null;
                this.saltKey = null;
                this.captchImg = null;
            }
        }, (err) => {
            this.captchID = null;
            this.saltKey = null;
            this.captchImg = null;
        })
    }
	
    UsrPrfles(user) {
        this.authService.getUsrPrfl((err, res) => {
            console.log(res.data);
            let d = {};
            if (res.data.length > 0) {
                d = res.data[0];
            }
            const a = Object.assign({}, user, d);
            this.userDtls = a.prfle_dshbd_url_tx;
            localStorage.setItem("usrDtls", JSON.stringify(a));
            // setTimeout(() => {
            this.apiCtrl.setUsrDtl(a);
            // }, 500);

            this.userService.setUsrDta(a);
            this.authService.getAplctnMnuPrfls((err, res) => {
                if (err) {
                    console.log(err);
                    return;
                }

                if (this.userDtls == undefined) {
                    if (res.data[0] == undefined) {
                        this.err_msg = "You have no access to this account.";
                    } else {
                        this.userDtls = res.data[0].prfle_dshbd_url_tx;
                    }
                    // localStorage.setItem('usrDtls', JSON.stringify(this.userDtls));
                }

                res.data.forEach((element) => {
                    (element["id"] = element.id),
                        (element["title"] = element.prnt_mnu_itm_nm),
                        (element["type"] = "item"),
                        (element["exactMatch"] = true),
                        (element["icon"] = element.mnu_itm_icn_tx),
                        (element["url"] = element.url),
                        (element["translate"] =
                            "NAV." + element.prnt_mnu_itm_nm);
                });

                let menudata = [
                    {
                        id: "applications",
                        title: "Applications",
                        translate: "NAV.APPLICATIONS",
                        type: "group",
                        children: res.data,
                    },
                ];
                localStorage.setItem("mnuDtls", JSON.stringify(menudata));
                this.userData = JSON.parse(localStorage.getItem("usrDtls"));
                if(this.userData.ivr_pswrd != null && this.userData.ivr_pswrd != undefined && this.userData.ivr_usr_id != null && this.userData.ivr_usr_id != undefined){
                    this.getIncmngCall();
                }
                
                setTimeout(() => {
                    this.apiCtrl.setMnuDtl(menudata);
                }, 500);
                this._dsNavigationService.unregister("main");
                // Register the navigation to the service
                // console.log("glits Software Innovations pvt ltd..");
                this._dsNavigationService.register("main", menudata);
                var lastAccessedUrl = window.sessionStorage.getItem(
                    a.usr_id + "::lastAccessedUrl"
                );
                if (lastAccessedUrl) {
                    this.router.navigate([lastAccessedUrl]);
                } else {
                    if (this.userDtls != null) {
                        this.router.navigate([this.userDtls]);
                        // this.router.navigate(['/infra/dashboard']);
                    }
                }
            });
        });
    }

    // InComing Call Code //
    getIncmngCall() {
        var postIvrData = {
            action: "LOGINUSER",
            user_type: "Agent",
            username: this.userData.ivr_usr_id,
            process: "ConVox_Process",
            password: this.userData.ivr_pswrd,
            station: this.userData.ivr_station,
            refno: this.userData.mrcht_usr_id,
        };
        console.log("userData",this.userData)
        const ivrRte = `caf_operations/ivr_loginuser`;
        this.apiCtrl.create(postIvrData, ivrRte).subscribe((res) => {
            if (
                res["status"] === 200 &&
                res["data"] &&
                res["data"].length > 0
            ) {
                alert("lOGIN SUCCESS");
            }
        });
    }

    openform = () => {
        this.showhide = !this.showhide;
    };
    closeForm = () => {
        this.showhide = false;
    };

    Newmerchantform = () => {
        this.newmerchant = !this.newmerchant;
    };
    merchantcloseForm = () => {
        this.newmerchant = false;
    };

    gotoMsoRegPage() {
        this.msoDiv = true;
        this.lmoDiv = false;
        this.router.navigate(["admin/enrollment/mso"]);
    }

    gotoLmoRegPage() {
        this.lmoDiv = true;
        this.msoDiv = false;
        this.router.navigate(["admin/enrollment/lmo"]);
    }
}
