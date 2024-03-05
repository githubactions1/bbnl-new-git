import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { DsConfigService } from '@glits/services/config.service';
import { dsAnimations } from '@glits/animations';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { confirmPasswordValidator } from '../register/register.component';
import { UserService } from 'app/providers/user/user.serivce';

@Component({
    selector: 'forgot-password',
    templateUrl: './forgot-password.component.html',
    styleUrls: ['./forgot-password.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: dsAnimations
})
export class ForgotPasswordComponent implements OnInit {
    forgotPasswordForm: FormGroup;
    err_msg = null;
    shwrcvrydiv: boolean;
    shwOtpdiv: boolean;
    otpForm: FormGroup;
    rndm_otp: string;
    shwPwddiv: boolean;
    PasswordForm: FormGroup;
    userData: any;
    mrcht_usr_id: any;

    /**
     * Constructor
     *
     * @param {DsConfigService} _dsConfigService
     * @param {FormBuilder} _formBuilder
     */
    constructor(
        private _dsConfigService: DsConfigService,
        private _formBuilder: FormBuilder,
        private authService: AuthService,
        public router: Router,
        private userService: UserService
    ) {
        // Configure the layout
        this._dsConfigService.config = {
            layout: {
                navbar: {
                    hidden: true
                },
                toolbar: {
                    hidden: true
                },
                footer: {
                    hidden: true
                },
                sidepanel: {
                    hidden: true
                }
            }
        };

        this.userService.USER_DETAILS.subscribe(val => {
            this.userData = val;
            console.log(val);
        });
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        this.forgotPasswordForm = this._formBuilder.group({
            username: ['', [Validators.required]],
            // email: ['', [Validators.required, Validators.email]],
            mobile: ['', [Validators.required]]
        });

        this.otpForm = this._formBuilder.group({
            otp: ['', [Validators.required]]
        });

        this.PasswordForm = this._formBuilder.group({
            nw_pswrd: ['', Validators.required],
            passwordConfirm: ['', [Validators.required, confirmPasswordValidator]]
        });
        this.shwrcvrydiv = true;
    }

    submit() {
        console.log(this.forgotPasswordForm.value)
        this.err_msg = null;
        let data = {
            phno: this.forgotPasswordForm.value.mobile,
            mrcht_usr_nm: this.forgotPasswordForm.value.username,
            phone_no: this.forgotPasswordForm.value.mobile,
            ntfcn_cgry_id: 3
        };

        this.authService.forgetPassword(data, (err, res) => {
            console.log(res)
            this.rndm_otp = res.data.code;
            this.mrcht_usr_id = res.data.mrcht_usr_id;
            if (err) {
                return;
            }
            if (res && res.status == 200) {
                if (res.data.errorCode == 'UserNotExistError') {
                    this.err_msg = "Incorrect username or phone number. Please try again.";
                } else if (res.data.mrcht_usr_nm == this.forgotPasswordForm.value.username && res.data.mbl_nu == this.forgotPasswordForm.value.mobile) {
                    this.shwrcvrydiv = false;
                    this.shwOtpdiv = true;
                } else {
                    this.err_msg = "Incorrect username or phone number. Please try again.";
                }
                if (!res.data) {
                    this.err_msg = "Incorrect username or phone number. Please try again.";

                } else {
                    // this.router.navigate(['/']);
                }
            }
        })
    }

    otpsubmit() {
        if (this.rndm_otp == this.otpForm.value.otp) {
            this.shwPwddiv = true;
            this.shwOtpdiv = false;
        } else {
            this.err_msg = "Enter Valid OTP.";
        }
    }

    finalSubmit() {
        this.err_msg = '';
        let data = {
            mrcht_usr_id: this.mrcht_usr_id,
            nw_pswrd: this.PasswordForm.value.nw_pswrd
        }
        if (this.PasswordForm.value.nw_pswrd == this.PasswordForm.value.passwordConfirm) {
            this.authService.resetPassword(data, (err, res) => {
                if (err) { return; }
                if (res && res.status == 200) {
                    if (!res.data) {
                        this.err_msg = "Try again with a password that you haven't used before";
                    } else {
                        this.router.navigate(['/']);
                    }
                }
            })
        } else {
            this.err_msg = "Password doesn't match";
            this.PasswordForm.reset();
        }
    }
    gotoRcry() {
        this.shwOtpdiv = false;
        this.shwrcvrydiv = true;
    }
    gotootpDiv() {
        this.router.navigate(['/']);
   }

   navlogin() {
    this.router.navigate(['/']);
   }
}
