import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Platform } from '@angular/cdk/platform';
import { TranslateService } from '@ngx-translate/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { DsConfigService } from '@glits/services/config.service';
import { DsNavigationService } from '@glits/components/navigation/navigation.service';
import { DsSidebarService } from '@glits/components/sidebar/sidebar.service';
import { DsSplashScreenService } from '@glits/services/splash-screen.service';
import { DsTranslationLoaderService } from '@glits/services/translation-loader.service';

import { navigation } from 'app/navigation/navigation';
import { locale as navigationEnglish } from 'app/navigation/i18n/en';
import { locale as navigationTurkish } from 'app/navigation/i18n/tr';
// import { AuthService } from './main/auth/auth.service';
import { Router } from '@angular/router';
// import { ChangeLogModalComponent } from './main/apps/general/setup/change-log/change-log-modal/change-log-modal.component';
import { CrudService } from './main/apps/crud.service';
import { MatDialog } from '@angular/material';
import { ChangeLogModalComponent } from './main/apps/general/change-log/master/change-log/change-log-modal/change-log-modal.component';

@Component({
    selector: 'app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
    dsConfig: any;
    navigation: any;

    // Private
    private _unsubscribeAll: Subject<any>;
    usrDtls: any;
    chg_lg_info: any;
    menudata: any;

    /**
     * Constructor
     *
     * @param {DOCUMENT} document
     * @param {DsConfigService} _dsConfigService
     * @param {DsNavigationService} _dsNavigationService
     * @param {DsSidebarService} _dsSidebarService
     * @param {DsSplashScreenService} _dsSplashScreenService
     * @param {DsTranslationLoaderService} _dsTranslationLoaderService
     * @param {Platform} _platform
     * @param {TranslateService} _translateService
     */
    constructor(
        @Inject(DOCUMENT) private document: any,
        private _dsConfigService: DsConfigService,
        private _dsNavigationService: DsNavigationService,
        private _dsSidebarService: DsSidebarService,
        private _dsSplashScreenService: DsSplashScreenService,
        private _dsTranslationLoaderService: DsTranslationLoaderService,
        private _translateService: TranslateService,
        private _platform: Platform,
        public crdsrv: CrudService,
        public dialog: MatDialog,
        // private authService: AuthService,
        public router: Router
    ) {
        this.usrDtls = JSON.parse(localStorage.getItem('usrDtls'));
        this.navigation = navigation;

        // Register the navigation to the service
        this._dsNavigationService.register('main', this.navigation);

        // // Set the main navigation as our current navigation
        this._dsNavigationService.setCurrentNavigation('main');

        
        // ********************For Jquery***********************************
        // this.menudata = JSON.parse(localStorage.getItem('menuDetls'));
        // this._dsNavigationService.unregister('main');
        // this._dsNavigationService.register('main', this.menudata);
        
        // ********************For Jquery***********************************

 


        // Add languages
        this._translateService.addLangs(['en', 'tr']);

        // Set the default language
        this._translateService.setDefaultLang('en');

        // Set the navigation translations
        this._dsTranslationLoaderService.loadTranslations(navigationEnglish, navigationTurkish);

        // Use a language
        this._translateService.use('en');

        /**
         * ----------------------------------------------------------------------------------------------------
         * ngxTranslate Fix Start
         * ----------------------------------------------------------------------------------------------------
         */

        /**
         * If you are using a language other than the default one, i.e. Turkish in this case,
         * you may encounter an issue where some of the components are not actually being
         * translated when your app first initialized.
         *
         * This is related to ngxTranslate module and below there is a temporary fix while we
         * are moving the multi language implementation over to the Angular's core language
         * service.
         **/

        // Set the default language to 'en' and then back to 'tr'.
        // '.use' cannot be used here as ngxTranslate won't switch to a language that's already
        // been selected and there is no way to force it, so we overcome the issue by switching
        // the default language back and forth.
        /**
         setTimeout(() => {
            this._translateService.setDefaultLang('en');
            this._translateService.setDefaultLang('tr');
         });
         */

        /**
         * ----------------------------------------------------------------------------------------------------
         * ngxTranslate Fix End
         * ----------------------------------------------------------------------------------------------------
         */

        // Add is-mobile class to the body if the platform is mobile
        if (this._platform.ANDROID || this._platform.IOS) {
            this.document.body.classList.add('is-mobile');
        }

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
        // Subscribe to config changes
        this._dsConfigService.config
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((config) => {

                this.dsConfig = config;

                // Boxed
                if (this.dsConfig.layout.width === 'boxed') {
                    this.document.body.classList.add('boxed');
                }
                else {
                    this.document.body.classList.remove('boxed');
                }

                // Color theme - Use normal for loop for IE11 compatibility
                for (let i = 0; i < this.document.body.classList.length; i++) {
                    const className = this.document.body.classList[i];

                    if (className.startsWith('theme-')) {
                        this.document.body.classList.remove(className);
                    }
                }

                this.document.body.classList.add(this.dsConfig.colorTheme);
            });
        this.getChangeLog();
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    getChangeLog() {
        if (this.usrDtls) {
            if (this.usrDtls.chng_lg_in == 1) {
                console.log("change log")
                const rte = 'user/change-log/get_chng_lg_info';
                this.crdsrv.gtChangeLog(rte).subscribe(result => {
                    console.log(result['data']);
                    if (result['status'] == 200) {
                        if (result['data'].length > 0) {
                            this.chg_lg_info = result['data'];
                            const dialogRef = this.dialog.open(ChangeLogModalComponent, { width: '1500px', height: 'auto', data: this.chg_lg_info });
                            dialogRef.afterClosed().subscribe(result => {
                                console.log(result);
                                if (result == true) {
                                    let data = {
                                        chng_lg_in: 0,
                                        mrcht_usr_id: this.usrDtls.mrcht_usr_id
                                    }
                                    const rte = 'user/change-log/udt_lg_ind';
                                    this.crdsrv.udtlgsts(rte, data).subscribe(res => {
                                        console.log(res);
                                    })
                                }
                            });
                        }
                    }
                })
            }
        }

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
}
