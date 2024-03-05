import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';

import { DS_CONFIG } from '@glits/services/config.service';

@NgModule()
export class DsModule
{
    constructor(@Optional() @SkipSelf() parentModule: DsModule)
    {
        if ( parentModule )
        {
            throw new Error('DsModule is already loaded. Import it in the AppModule only!');
        }
    }

    static forRoot(config): ModuleWithProviders
    {
        return {
            ngModule : DsModule,
            providers: [
                {
                    provide : DS_CONFIG,
                    useValue: config
                }
            ]
        };
    }
}
