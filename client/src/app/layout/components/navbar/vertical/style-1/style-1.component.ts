import { Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { delay, filter, take, takeUntil } from 'rxjs/operators';

import { DsConfigService } from '@glits/services/config.service';
import { DsNavigationService } from '@glits/components/navigation/navigation.service';
import { DsPerfectScrollbarDirective } from '@glits/directives/ds-perfect-scrollbar/ds-perfect-scrollbar.directive';
import { DsSidebarService } from '@glits/components/sidebar/sidebar.service';
import { MatDialogRef, MatDialog } from '@angular/material';

import * as _ from 'lodash';
import { CrudService } from 'app/main/apps/crud.service';
import { DeleteDialogComponent } from 'app/main/shared/components/delete-dialog/delete-dialog.component';
import { UserService } from 'app/providers/user/user.serivce';



@Component({
    selector: 'navbar-vertical-style-1',
    templateUrl: './style-1.component.html',
    styleUrls: ['./style-1.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class NavbarVerticalStyle1Component implements OnInit, OnDestroy {
    dsConfig: any;
    navigation: any;
    dialogRef: any;
    confirmDialogRef: MatDialogRef<DeleteDialogComponent>;

    // Private
    private _dsPerfectScrollbar: DsPerfectScrollbarDirective;
    private _unsubscribeAll: Subject<any>;
    usrdtls: any;
    prflData: any;

    /**
     * Constructor
     *
     * @param {DsConfigService} _dsConfigService
     * @param {DsNavigationService} _dsNavigationService
     * @param {DsSidebarService} _dsSidebarService
     * @param {Router} _router
     */
    constructor(
        private _dsConfigService: DsConfigService,
        private _dsNavigationService: DsNavigationService,
        private _dsSidebarService: DsSidebarService,
        private _router: Router,
        public dialog: MatDialog,
        private userService: UserService
        , private crdsrv: CrudService
    ) {
        // Set the private defaults
        this._unsubscribeAll = new Subject();
        this.userService.listen().subscribe((m: any) => {
            this.onFilterClick();
        })
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    // Directive
    @ViewChild(DsPerfectScrollbarDirective)
    set directive(theDirective: DsPerfectScrollbarDirective) {
        if (!theDirective) {
            return;
        }

        this._dsPerfectScrollbar = theDirective;

        // Update the scrollbar on collapsable item toggle
        this._dsNavigationService.onItemCollapseToggled
            .pipe(
                delay(500),
                takeUntil(this._unsubscribeAll)
            )
            .subscribe(() => {
                this._dsPerfectScrollbar.update();
            });

        // Scroll to the active item position
        this._router.events
            .pipe(
                filter((event) => event instanceof NavigationEnd),
                take(1)
            )
            .subscribe(() => {
                setTimeout(() => {
                    const activeNavItem: any = document.querySelector('navbar .nav-link.active');

                    if (activeNavItem && activeNavItem.offsetTop) {
                        const activeItemOffsetTop = activeNavItem.offsetTop,
                            activeItemOffsetParentTop = activeNavItem.offsetParent.offsetTop,
                            scrollDistance = activeItemOffsetTop - activeItemOffsetParentTop - (48 * 3) - 168;

                        this._dsPerfectScrollbar.scrollToTop(scrollDistance);
                    }
                });
            }
            );
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    tm: any;
    tm_logo;
    tm_usr_nm;
    tm_dsgn_nm;
    tm_hrchy_nm;
    tm_hyrchy_grp_nm;
    ngOnInit(): void {
        this.onFilterClick();
        this.usrdtls = JSON.parse(localStorage.getItem('usrDtls'));
        if (this.usrdtls) {
            if (!this.usrdtls.mrcht_dsply_nm) {
                this.tm = this.usrdtls.mrcht_nm;
                this.tm_logo = this.usrdtls.imge_url_tx;
                this.tm_usr_nm = this.usrdtls.frst_nm;
                this.tm_dsgn_nm = this.usrdtls.dsgn_nm;
                this.tm_hyrchy_grp_nm = this.usrdtls.hyrchy_grp_nm;
                this.tm_hrchy_nm = this.usrdtls.hyrchy_nm;

            }
            else {
                this.tm = this.usrdtls.mrcht_nm;
                this.tm_logo = this.usrdtls.imge_url_tx;
                this.tm_usr_nm = this.usrdtls.frst_nm;
                this.tm_dsgn_nm = this.usrdtls.dsgn_nm;
                this.tm_hyrchy_grp_nm = this.usrdtls.hyrchy_grp_nm;
                this.tm_hrchy_nm = this.usrdtls.hyrchy_nm;

            }
        }

        this._router.events
            .pipe(
                filter((event) => event instanceof NavigationEnd),
                takeUntil(this._unsubscribeAll)
            )
            .subscribe(() => {
                if (this._dsSidebarService.getSidebar('navbar')) {
                    this._dsSidebarService.getSidebar('navbar').close();
                }
            }
            );

        // Subscribe to the config changes
        this._dsConfigService.config
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((config) => {
                this.dsConfig = config;
            });

        // Get current navigation
        this._dsNavigationService.onNavigationChanged
            .pipe(
                filter(value => value !== null),
                takeUntil(this._unsubscribeAll)
            )
            .subscribe(() => {
                this.navigation = this._dsNavigationService.getCurrentNavigation();
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

    onFilterClick() {
        let loggedIn = localStorage.getItem('log');
        if(loggedIn)
        {
            
            const profile = `user/profile`;
            this.crdsrv.get(profile).subscribe((res) => {
                if(res['data'][0]){
                    this.prflData = res['data'][0];
                    this.tm_usr_nm = this.prflData.frst_nm;
                    this.tm_dsgn_nm = this.prflData.dsgn_nm;
                    this.tm_logo = this.prflData.prfl_usr_img_url_txt;
                }
                else{
                    console.log('Got Profile Data Empty')
                }
                
            })
        }
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Toggle sidebar opened status
     */
    toggleSidebarOpened(): void {
        this._dsSidebarService.getSidebar('navbar').toggleOpen();
    }

    /**
     * Toggle sidebar folded status
     */
    toggleSidebarFolded(): void {
        this._dsSidebarService.getSidebar('navbar').toggleFold();
    }
    add() {
        this.dialogRef = this.dialog.open(StyleComponentDialog, {
            // panelClass: 'contact-form-dialog',
            panelClass: 'sidemenu-optns-dialog',
            data: {
                action: 'new'
            }
        });
        this.dialogRef.afterClosed().subscribe(result => {
            console.log(`Dialog result: ${result}`);
        });
    }
}
@Component({
    selector: 'StyleComponent-dialog',
    templateUrl: 'StyleComponent-dialog.html',
})
export class StyleComponentDialog {
    menulst: any;
    menuitms;
    confirmDialogRef: MatDialogRef<DeleteDialogComponent>;
    dialogRef: any;

    /**
   * Constructor
   *
   * @param {DsNavigationService} _dsNavigationService
   */
    constructor(public crdsrv: CrudService, private _dsNavigationService: DsNavigationService, public dialog: MatDialog) { }
    ngOnInit() {
        this.menuitms = JSON.parse(localStorage.getItem('mnuDtls'));
        this.getmenus();
    }
    getmenus() {
        let rte = `baseproject/menu/items`
        this.crdsrv.get(rte).subscribe((res) => {
            this.menulst = res['data']
        })
    }
    addNavItemWithCustomFunction(type) {
        if (!type.prnt_mnu_itm_id) {
            const newNavItem = {
                id: type.mnu_itm_id,
                mnu_itm_id: type.mnu_itm_id,
                title: type.mnu_itm_nm,
                type: 'item',
                icon: type.mnu_itm_icn_tx,
                mnu_itm_nm: type.mnu_itm_nm,
                mnu_itm_url_tx: type.mnu_itm_url_tx,
                mnu_itm_icn_tx: type.mnu_itm_icn_tx,
                url: type.mnu_itm_url_tx,
                // translate: "NAV.APPLICATIONS",
            };
            this.menuitms[0].children.push(newNavItem)
            // Add the new nav item at the beginning of the navigation
            this._dsNavigationService.addNavigationItem(newNavItem, 'applications');
        }
        else {
            const newNavItem = {
                id: type.prnt_mnu_itm_id,
                // mnu_itm_id: type.prnt_mnu_itm_id,
                title: type.prnt_mnu_itm_nm,
                type: 'collapsable',
                icon: type.prnt_mnu_icn_tx,
                mnu_itm_nm: type.prnt_mnu_itm_nm,
                mnu_itm_icn_tx: type.prnt_mnu_icn_tx,
                // translate: "NAV.APPLICATIONS",
                children: [],
            };

            type.sub_mnus.filter((k2) => {
                if (k2.enble_in == 1) {
                    newNavItem.children.push({
                        id: k2.mnu_itm_id,
                        title: k2.mnu_itm_nm,
                        type: 'item',
                        url: k2.mnu_itm_url_tx,
                        mnu_itm_id: k2.mnu_itm_id,
                        mnu_itm_nm: k2.mnu_itm_nm,
                        mnu_itm_url_tx: k2.mnu_itm_url_tx,
                    })
                }
            })

            this.menuitms[0].children.splice(this.menuitms[0].children.indexOf(type.prnt_mnu_itm_id), 1);
            this.menuitms[0].children.push(newNavItem);
            localStorage.setItem('mnuDtls', JSON.stringify(this.menuitms));
            this._dsNavigationService.removeNavigationItem(type.prnt_mnu_itm_id);
            this._dsNavigationService.addNavigationItem(newNavItem, 'applications');
        }



    }
    change(lst, event, sub?) {
        if (event.checked == true) {
            if (!lst.prnt_mnu_itm_id) {
                this.addNavItemWithCustomFunction(lst);
                this.active(lst);
            }
            else {
                sub.enble_in = 1;
                sub.dsble_in = 0;
                this.addNavItemWithCustomFunction(lst);
                this.active(sub);
            }

        }
        else {
            if (!lst.prnt_mnu_itm_id) {
                this.unactive(lst);
            }
            else {
                this.unactive(sub);
            }
        }

    }
    active(data) {
        data.enble_in = 1;
        data.dsble_in = 0;
        let rte = 'merchant/menu/active'
        this.crdsrv.update(data, rte).subscribe((res) => {
            if (res['status'] == 200) {
                localStorage.setItem('mnuDtls', JSON.stringify(this.menuitms));
                setTimeout(() => {
                    this.crdsrv.setMnuDtl(this.menuitms);
                }, 500);
            }
        })

    }
    unactive(data) {
        console.log(data)
        this.confirmDialogRef = this.dialog.open(DeleteDialogComponent, {
            width: '40%',
            panelClass: 'my-class',
            data: { message: 'Are you sure deleting this menu ?', id: data.mnu_itm_id, nm: data.mnu_itm_nm, enble_in: 0, dsble_in: 1, entityname: 'Menu', flag: false, rte: `merchant/menu/active/${data.mnu_itm_id}` }
        });
        this.confirmDialogRef.afterClosed().subscribe((response) => {
            if (response == undefined) {
                this.getmenus();
            }
            else if (response['status'] == 200) {
                if (!data.prnt_mnu_itm_id) {
                    this._dsNavigationService.removeNavigationItem(data.mnu_itm_id);
                    this.menuitms[0].children.splice(this.menuitms[0].children.indexOf(data.mnu_itm_id), 1);
                    localStorage.setItem('mnuDtls', JSON.stringify(this.menuitms));
                    setTimeout(() => {
                        this.crdsrv.setMnuDtl(this.menuitms);
                    }, 500);
                }
                else {
                    this.menuitms[0].children.forEach(element => {
                        if (element.prnt_mnu_itm_id == data.prnt_mnu_itm_id) {
                            let stToDelete = data.mnu_itm_id;
                            _.remove(element.children, function (currentObject) {
                                return currentObject['mnu_itm_id'] === stToDelete;
                            });
                            this._dsNavigationService.removeNavigationItem(data.mnu_itm_id);
                            localStorage.setItem('mnuDtls', JSON.stringify(this.menuitms));
                            setTimeout(() => {
                                this.crdsrv.setMnuDtl(this.menuitms);
                            }, 500);
                        }
                    });
                }
            }
        })
    }
    close() {
        this.dialogRef = this.dialog.closeAll();
    }
}
