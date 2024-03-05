import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule, MatDividerModule, MatIconModule, MatTabsModule } from '@angular/material';

import { DsSharedModule } from '@glits/shared.module';

import { ProfileService } from 'app/main/shared/pages/profile/profile.service';
import { ProfileComponent } from 'app/main/shared/pages/profile/profile.component';
import { ProfileTimelineComponent } from 'app/main/shared/pages/profile/tabs/timeline/timeline.component';
import { ProfileAboutComponent } from 'app/main/shared/pages/profile/tabs/about/about.component';
import { ProfilePhotosVideosComponent } from 'app/main/shared/pages/profile/tabs/photos-videos/photos-videos.component';


const routes = [
    {
        path     : 'profile',
        component: ProfileComponent,
        resolve  : {
            profile: ProfileService
        }
    }
];

@NgModule({
    declarations: [
        ProfileComponent,
        ProfileTimelineComponent,
        ProfileAboutComponent,
        ProfilePhotosVideosComponent
    ],
    imports     : [
        RouterModule.forChild(routes),

        MatButtonModule,
        MatDividerModule,
        MatIconModule,
        MatTabsModule,

        DsSharedModule
    ],
    providers   : [
        ProfileService
    ]
})
export class ProfileModule
{
}
