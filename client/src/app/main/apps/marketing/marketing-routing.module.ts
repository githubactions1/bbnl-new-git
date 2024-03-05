import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { IndividualFingerPrintComponent } from './individual-finger-print/individual-finger-print.component';
import { GroupFingerprintComponent } from './group-fingerprint/group-fingerprint.component';
import { MessageDetailsComponent } from './message-details/message-details.component';
import { MessageDetailsViewComponent } from './message-details-view/message-details-view.component';
import { PostNotificationComponent } from './post-notification/post-notification.component';

const routes: Routes = [
  { path: 'finger-print', component: IndividualFingerPrintComponent },
  { path: 'Grp-finger-print', component: GroupFingerprintComponent },
  { path: 'msg-dtls', component: MessageDetailsComponent },
  { path: 'msg-dtls-view', component: MessageDetailsViewComponent },
  { path: 'pst-ntfctns', component: PostNotificationComponent },
  { path: '', component: DashboardComponent },
  { path: '*', component: DashboardComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MarketingRoutingModule { }
