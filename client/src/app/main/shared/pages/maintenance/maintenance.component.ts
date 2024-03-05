import { Component, ViewEncapsulation } from '@angular/core';

import { DsConfigService } from '@glits/services/config.service';
import { dsAnimations } from '@glits/animations';

@Component({
    selector     : 'maintenance',
    templateUrl  : './maintenance.component.html',
    styleUrls    : ['./maintenance.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : dsAnimations
})
export class MaintenanceComponent
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
