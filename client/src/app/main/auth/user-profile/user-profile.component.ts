import { Component, OnInit, ViewEncapsulation, ViewChild, ElementRef, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { dsAnimations } from '@glits/animations';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { UserService } from 'app/providers/user/user.serivce';
// import { confirmPasswordValidator } from '../reset-password-2/reset-password-2.component';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { confirmPasswordValidator } from '../register/register.component';
import { MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition, MatIconModule, MatDialogRef, MatDialog } from '@angular/material';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CrudService } from 'app/main/apps/crud.service';
import { EventEmitter } from 'events';
import { Location } from '@angular/common';
import { MessageDialogComponent } from 'app/main/shared/components/message-dialog/message-dialog.component';

@Component({
    selector: 'user-profile',
    templateUrl: './user-profile.component.html',
    styleUrls: ['./user-profile.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: dsAnimations
})
export class UserProfileComponent implements OnInit {

    @Output() onFilter: EventEmitter = new EventEmitter();

    userProfileForm: FormGroup;
    resetPasswordForm: FormGroup;
    err_msg = null;
    userData: any = {};
    private _unsubscribeAll: Subject<any>;
    nw_pswrd: any;
    dsgnlst: any;
    dprtlst: any;
    orgnlst: any;
    outletslst: any;
    outletsctgrylst: any;
    menuPrfls: any;
    setupPrfls: any;
    editFile: boolean;
    removeUpload: boolean;
    imageUrl: string | ArrayBuffer;
    @ViewChild('fileInput') el: ElementRef;
    lgdData: any;
    horizontalPosition: MatSnackBarHorizontalPosition = 'right';
    verticalPosition: MatSnackBarVerticalPosition = 'top';
    prflData: any;
    upldImageUrl: string | ArrayBuffer;
    spnrCtrl = false;
    rptId;
    lgnTbClicked = false;
    confirmMsgDialogRef: MatDialogRef<MessageDialogComponent>;
    /**
     * Constructor
     *
     * @param {DsConfigService} _dsConfigService
     * @param {FormBuilder} _formBuilder
     */


    constructor(
        private _formBuilder: FormBuilder,
        private authService: AuthService,
        private userService: UserService, private _snackBar: MatSnackBar, public router: Router
        , private crdsrv: CrudService, private location: Location, public dialog: MatDialog
    ) {
        // Configure the layout
        this.userService.USER_DETAILS.subscribe(val => {
            this.userData = val;
            console.log(val);
        });
        this._unsubscribeAll = new Subject();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        let emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
        let phoneNumber = /^(\+\d{1,3}[- ]?)?\d{10}$/;
        const passwd = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{4,}/;
        this.userProfileForm = this._formBuilder.group({
            firstName: ['', Validators.required],
            lastName: [''],
            designation: [''],
            department: [''],
            branches: [''],
            organisation: [''],
            mobileNumber: ['', [Validators.required, Validators.pattern(phoneNumber)]],
            email: ['', [Validators.pattern(emailPattern)]],
            address: [''],
            userName: ['', Validators.required],
            password: [''],
            confirmPassword: [''],
            mnuPrfle: ['', Validators],
            stpPrfle: ['', Validators],
        });

        this.getProfileDtls();
        this.resetPasswordForm = this._formBuilder.group({
            old_pswrd: ['', [Validators.required]],
            nw_pswrd: ['', [Validators.required,Validators.pattern(passwd)]],
            passwordConfirm: ['', [Validators.required, confirmPasswordValidator]]
        });

        // Update the validity of the 'passwordConfirm' field
        // when the 'password' field changes
        this.resetPasswordForm.get('nw_pswrd').valueChanges
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(() => {
                this.resetPasswordForm.get('passwordConfirm').updateValueAndValidity();
            });

        // Designations List
        let rte = "user/designations"
        this.crdsrv.get(rte).subscribe((res) => {
            this.dsgnlst = res['data'];
        }, (error) => {
            console.log(error)
        });

        //Departments List
        let rte1 = `user/departments`
        this.crdsrv.get(rte1).subscribe((res) => {
            this.dprtlst = res['data'];
            console.log(this.dprtlst)
        }, (error) => {
            console.log(error)
        });

        //Organizations List
        let rte2 = `user/organizations`
        this.crdsrv.get(rte2).subscribe((res) => {
            this.orgnlst = res['data'];
        }, (error) => {
            console.log(error)
        });

        //Outlets List
        let rte3 = `user/outlets`
        this.crdsrv.get(rte3).subscribe((res) => {
            this.outletslst = res['data'];
        }, (error) => {
            console.log(error)
        });

        //Outlet categories List
        let rte4 = `user/outletcatogiries`
        this.crdsrv.get(rte4).subscribe((res) => {
            this.outletsctgrylst = res['data'];
        }, (error) => {
            console.log(error)
        });

        //Menu Profile
        const prfleRte = `user/menu/profile`;
        this.crdsrv.get(prfleRte).subscribe((res) => {
            this.menuPrfls = res['data'].mnuitems;
            console.log(this.menuPrfls)
        }, (error) => {
            console.log(error);
        });

        //Setup Profile
        const stpprfleRte = `user/setup/profiles`;
        this.crdsrv.get(stpprfleRte).subscribe((res) => {
            this.setupPrfls = res['data'];
            console.log(this.setupPrfls)
        }, (error) => {
            console.log(error);
        });
    }


    yourFn(event){
        console.log(event);
        if (event.index == 2){
            this.lgnTbClicked = true;
           this.rptId =  "114841790497947654";
           console.log(this.rptId);
        } else {
            this.lgnTbClicked = false;
            let url = '/admin/userprofile';
            this.location.replaceState(url);
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

    getProfileDtls() {
        const profile = `user/profile`;
        this.crdsrv.get(profile).subscribe((res) => {
            console.log(res['data'].length)
            console.log(res['data'])
            if (res['data'].length > 0) {
                this.prflData = res['data'][0];
                console.log(this.prflData)
                this.userProfileForm.get('firstName').setValue(this.prflData.fst_nm);
                this.userProfileForm.get('lastName').setValue(this.prflData.lst_nm);
                this.userProfileForm.get('designation').setValue(this.prflData.dsgn_id);
                this.userProfileForm.get('department').setValue(this.prflData.dprt_id);
                this.userProfileForm.get('branches').setValue(this.prflData.otlt_id);
                this.userProfileForm.get('organisation').setValue(this.prflData.orgn_id);
                this.userProfileForm.get('mobileNumber').setValue(this.prflData.mbl_nu);
                this.userProfileForm.get('email').setValue(this.prflData.eml_tx);
                this.userProfileForm.get('address').setValue(this.prflData.addrs_tx);
                this.userProfileForm.get('userName').setValue(this.prflData.mrcht_usr_nm);
                // this.userProfileForm.get('').setValue(this.userData.pswrd_encrd_tx);
                this.userProfileForm.get('mnuPrfle').setValue(this.prflData.mnu_prfle_id);
                this.userProfileForm.get('stpPrfle').setValue(this.prflData.stp_prfle_id);
                this.imageUrl = this.prflData.prfle_usr_img_url_tx;
            }
        })

    }

    saveUsrDt() {
        this.spnrCtrl = true;
        // console.log(this.userProfileForm);
        this.err_msg = null;
        console.log(this.userProfileForm);
        let data = {
            frmData: this.userProfileForm.value,
            mrcht_usr_nm: this.userData.mrcht_usr_nm,
            mrcht_usr_id: this.userData.mrcht_usr_id,
            image: this.upldImageUrl
        }
        console.log(data)
        this.authService.saveUsrDt(data, (err, res) => {
            if (err) {
                return;
            }
            if (res && res.status == 200) {
                if (!res.data) {
                    this.err_msg = "Try again with a password that you haven't used before";
                } else {
                    this._snackBar.open("Profile Sucessfully Updated data...", 'Close', {
                        duration: 3000,
                        horizontalPosition: this.horizontalPosition,
                        verticalPosition: this.verticalPosition,
                    });
                    this.spnrCtrl = false;
                    this.getProfileDtls();
                    this.userService.filter('Register click');
                }
            }
        })
    }
    submit() {
        this.err_msg = null;
        this.resetPasswordForm.value['mrcht_usr_id'] = this.userData.mrcht_usr_id;
        console.log(this.resetPasswordForm)
        this.authService.matchOldNewPassword(this.resetPasswordForm.value, (err, res) => {
            if (res.status == 200) {
                if (res.data.length > 0) {
                    if (res.data[0][0].pswrd_encrd_tx == res.data[1][0].pswrd_encrd_tx) {
                        if (this.resetPasswordForm.value.nw_pswrd == this.resetPasswordForm.value.passwordConfirm) {
                            let data = {
                                mrcht_usr_id: this.userData.mrcht_usr_id,
                                nw_pswrd: this.resetPasswordForm.value.nw_pswrd
                            };

                            let popupData;
                            popupData = {
                            title: 'Are you sure you want to',
                            msg: 'Change your password',
                            icon: 'account_circle',
                            btnLst: [{
                                label: 'Yes',
                                res: 'yes'
                              }, {
                                label: 'No',
                                res: 'no'
                              }]
                            };
                            this.confirmMsgDialogRef = this.dialog.open(MessageDialogComponent, {
                                width: '25%',
                                panelClass: 'my-class',
                                data: popupData
                              });
                              this.confirmMsgDialogRef.afterClosed().subscribe((response) => {
                                if (response) {
                                  if (response == 'yes') {
                                    //   console.log('clicked yes');
                                    //   return;
                                    this.authService.resetPassword(data, (err, res) => {
                                        if (err) { return; }
                                        if (res && res.status == 200) {
                                            if (!res.data) {
                                                this.err_msg = "Try again with a password that you haven't used before";
                                            } else {
                                                let lstPopupData;
                                                lstPopupData = {
                                                title: 'Your Password Changed Successfully',
                                                msg: 'Please Relogin',
                                                icon: 'account_circle',
                                                btnLst: [{
                                                    label: 'Ok',
                                                    res: 'ok'
                                                }]
                                                };
                                                this.confirmMsgDialogRef = this.dialog.open(MessageDialogComponent, {
                                                    width: '25%',
                                                    panelClass: 'my-class',
                                                    data: lstPopupData
                                                  });
                                                  this.confirmMsgDialogRef.afterClosed().subscribe((response) => {
                                                    if (response) {
                                                      if (response == 'ok') {
                                                            this.router.navigate(['/']);
                                                      }
                                                        }
                                                      });
                                                    }
                                            }
                                        });
                                    }
                                }
                            });
                            }
                        }
                        } else {
                            this.err_msg = "Password doesn't match";
                            this.resetPasswordForm.controls['passwordConfirm'].reset()
                            this.resetPasswordForm.controls['nw_pswrd'].reset();
                        }
                    } else {
                        this.err_msg = "Current password that you haven't entered is not correct";
                        this.resetPasswordForm.controls['old_pswrd'].reset();
                    }
                });
            }

    uploadFile(event): any {
        let reader = new FileReader();
        let file = event.target.files[0];
        if (event.target.files && event.target.files[0]) {
            reader.readAsDataURL(file);
            reader.onload = () => {
                this.imageUrl = reader.result;
                console.log(this.imageUrl);
                this.upldImageUrl = reader.result;
                this.userProfileForm.patchValue({
                    file: reader.result
                });
            }
        }
    }
}
