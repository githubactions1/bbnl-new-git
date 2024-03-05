import { Component, ElementRef, Input, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import { MediaObserver } from '@angular/flex-layout';
import { CookieService } from 'ngx-cookie-service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { DsMatchMediaService } from '@glits/services/match-media.service';
import { DsNavigationService } from '@glits/components/navigation/navigation.service';

@Component({
    selector   : 'ds-shortcuts',
    templateUrl: './shortcuts.component.html',
    styleUrls  : ['./shortcuts.component.scss']
})
export class DsShortcutsComponent implements OnInit, OnDestroy
{
    shortcutItems: any[];
    navigationItems: any[];
    filteredNavigationItems: any[];
    searching: boolean;
    mobileShortcutsPanelActive: boolean;

    @Input()
    navigation: any;

    @ViewChild('searchInput')
    searchInputField;

    @ViewChild('shortcuts')
    shortcutsEl: ElementRef;

    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {CookieService} _cookieService
     * @param {DsMatchMediaService} _dsMatchMediaService
     * @param {DsNavigationService} _dsNavigationService
     * @param {MediaObserver} _mediaObserver
     * @param {Renderer2} _renderer
     */
    constructor(
        private _cookieService: CookieService,
        private _dsMatchMediaService: DsMatchMediaService,
        private _dsNavigationService: DsNavigationService,
        private _mediaObserver: MediaObserver,
        private _renderer: Renderer2
    )
    {
        // Set the defaults
        this.shortcutItems = [];
        this.searching = false;
        this.mobileShortcutsPanelActive = false;

        // Set the private defaults
        this._unsubscribeAll = new Subject();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
        // // Get the navigation items and flatten them
        // this.filteredNavigationItems = this.navigationItems = this._dsNavigationService.getFlatNavigation(this.navigation);

        // if ( this._cookieService.check('DS2.shortcuts') )
        // {
        //     this.shortcutItems = JSON.parse(this._cookieService.get('DS2.shortcuts'));
        // }
        // else
        // {
        //     // User's shortcut items
        //     this.shortcutItems = [
        //         {
        //             'title': 'Calendar',
        //             'type' : 'item',
        //             'icon' : 'today',
        //             'url'  : '/apps/calendar'
        //         },
        //         {
        //             'title': 'Mail',
        //             'type' : 'item',
        //             'icon' : 'email',
        //             'url'  : '/apps/mail'
        //         },
        //         {
        //             'title': 'Contacts',
        //             'type' : 'item',
        //             'icon' : 'account_box',
        //             'url'  : '/apps/contacts'
        //         },
        //         {
        //             'title': 'To-Do',
        //             'type' : 'item',
        //             'icon' : 'check_box',
        //             'url'  : '/apps/todo'
        //         },
        //         {
        //             'title': 'QR-CODE',
        //             'type' : 'item',
        //             'icon' : 'check_box',
        //             'url'  : '/apps/todo'
        //         }
        //     ];
        // }

        // // Subscribe to media changes
        // this._dsMatchMediaService.onMediaChange
        //     .pipe(takeUntil(this._unsubscribeAll))
        //     .subscribe(() => {
        //         if ( this._mediaObserver.isActive('gt-sm') )
        //         {
        //             this.hideMobileShortcutsPanel();
        //         }
        //     });
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void
    {
        // // Unsubscribe from all subscriptions
        // this._unsubscribeAll.next();
        // this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Search
     *
     * @param event
     */
    search(event): void
    {
        const value = event.target.value.toLowerCase();

        if ( value === '' )
        {
            this.searching = false;
            this.filteredNavigationItems = this.navigationItems;

            return;
        }

        this.searching = true;

        this.filteredNavigationItems = this.navigationItems.filter((navigationItem) => {
            return navigationItem.title.toLowerCase().includes(value);
        });
    }

    /**
     * Toggle shortcut
     *
     * @param event
     * @param itemToToggle
     */
    // toggleShortcut(event, itemToToggle): void
    // {
    //     event.stopPropagation();

    //     for ( let i = 0; i < this.shortcutItems.length; i++ )
    //     {
    //         if ( this.shortcutItems[i].url === itemToToggle.url )
    //         {
    //             this.shortcutItems.splice(i, 1);

    //             // Save to the cookies
    //             this._cookieService.set('DS2.shortcuts', JSON.stringify(this.shortcutItems));

    //             return;
    //         }
    //     }

    //     this.shortcutItems.push(itemToToggle);

    //     // Save to the cookies
    //     this._cookieService.set('DS2.shortcuts', JSON.stringify(this.shortcutItems));
    // }

    // /**
    //  * Is in shortcuts?
    //  *
    //  * @param navigationItem
    //  * @returns {any}
    //  */
    // isInShortcuts(navigationItem): any
    // {
    //     return this.shortcutItems.find(item => {
    //         return item.url === navigationItem.url;
    //     });
    // }

    // /**
    //  * On menu open
    //  */
    // onMenuOpen(): void
    // {
    //     setTimeout(() => {
    //         this.searchInputField.nativeElement.focus();
    //     });
    // }

    // /**
    //  * Show mobile shortcuts
    //  */
    // showMobileShortcutsPanel(): void
    // {
    //     this.mobileShortcutsPanelActive = true;
    //     this._renderer.addClass(this.shortcutsEl.nativeElement, 'show-mobile-panel');
    // }

    // /**
    //  * Hide mobile shortcuts
    //  */
    // hideMobileShortcutsPanel(): void
    // {
    //     this.mobileShortcutsPanelActive = false;
    //     this._renderer.removeClass(this.shortcutsEl.nativeElement, 'show-mobile-panel');
    // }
}
