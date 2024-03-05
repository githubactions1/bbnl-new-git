import { Component, ViewEncapsulation } from '@angular/core';

import { DsConfigService } from '@glits/services/config.service';
import { dsAnimations } from '@glits/animations';

@Component({
    selector     : 'mail-confirm',
    templateUrl  : './mail-confirm.component.html',
    styleUrls    : ['./mail-confirm.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : dsAnimations
})
export class MailConfirmComponent
{
    /**
     * Constructor
     *
     * @param {DsConfigService} _dsConfigService
     */
    constructor(
        private _dsConfigService: DsConfigService
    )
    {
        // Configure the layout
        this._dsConfigService.config = {
            layout: {
                navbar   : {
                    hidden: true
                },
                toolbar  : {
                    hidden: true
                },
                footer   : {
                    hidden: true
                },
                sidepanel: {
                    hidden: true
                }
            }
        };
    }
}
