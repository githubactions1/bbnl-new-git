import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/internal/operators';

import { DsConfigService } from '@glits/services/config.service';
import { dsAnimations } from '@glits/animations';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'reset-password',
    templateUrl: './reset-password.component.html',
    styleUrls: ['./reset-password.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: dsAnimations
})
export class ResetPasswordComponent implements OnInit, OnDestroy {
    resetPasswordForm: FormGroup;
    uid: any = null;
    err_msg: any = null;

    // Private
    private _unsubscribeAll: Subject<any>;

    constructor(
        private _dsConfigService: DsConfigService,
        public authService: AuthService,
        private _formBuilder: FormBuilder,
        public router: Router
    ) {
        this.uid = localStorage.getItem('uid');
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
        this.resetPasswordForm = this._formBuilder.group({
            // username: ['', [Validators.required]],
            nw_pswrd: ['', Validators.required],
            passwordConfirm: ['', [Validators.required, confirmPasswordValidator]]
        });

        // Update the validity of the 'passwordConfirm' field
        // when the 'password' field changes
        this.resetPasswordForm.get('nw_pswrd').valueChanges
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(() => {
                this.resetPasswordForm.get('passwordConfirm').updateValueAndValidity();
            });
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }
    submit() {
        console.log(this.resetPasswordForm);
        this.err_msg = null;
        this.resetPasswordForm.value.mrcht_usr_id = this.uid;

        this.authService.resetPassword(this.resetPasswordForm.value, (err, res) => {
            if (err) {
                return;
            }
            if (res && res.status == 200) {
                if (!res.data) {
                    this.err_msg = "Try again with a password that you haven't used before";
                } else {
                    this.router.navigate(['/']);
                }
            }
        })

    }
    navLogin() {
        this.router.navigate(['/']);
    }
}

/**
 * Confirm password validator
 *
 * @param {AbstractControl} control
 * @returns {ValidationErrors | null}
 */
export const confirmPasswordValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {

    if (!control.parent || !control) {
        return null;
    }

    const password = control.parent.get('nw_pswrd');
    const passwordConfirm = control.parent.get('passwordConfirm');

    if (!password || !passwordConfirm) {
        return null;
    }

    if (passwordConfirm.value === '') {
        return null;
    }

    if (password.value === passwordConfirm.value) {
        return null;
    }

    return { 'passwordsNotMatching': true };
};
