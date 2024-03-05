import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotificationsComponent } from './master/notifications/notifications.component';
import { UserGroupsComponent } from './user-groups/user-groups/user-groups.component';
import { CreateNotificationsComponent } from './master/notifications/create-notifications/create-notifications.component';
const routes: Routes = [
  { path: '', component: NotificationsComponent, pathMatch: 'full' },
  { path: 'usergroup', component: UserGroupsComponent },
  { path: 'user/notifications', component: CreateNotificationsComponent  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NotificationsRoutingModule { }
