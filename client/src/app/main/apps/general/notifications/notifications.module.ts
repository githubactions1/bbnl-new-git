import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationsRoutingModule } from './notifications-routing.module';
import { NotificationsComponent } from './master/notifications/notifications.component';
import { NotificationsEdtComponent } from './master/notifications/notifications-edt/notifications-edt.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DsSidebarModule } from '@glits/components';
import { DsSharedModule } from '@glits/shared.module';
import { SharedModule } from 'app/main/shared/shared.module'
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule, MatFormFieldModule,MatInputModule,MatButtonModule,MatSelectModule, MatProgressSpinnerModule} from '@angular/material';
import { UserGroupsComponent } from './user-groups/user-groups/user-groups.component';
import { CreateNotificationsComponent } from './master/notifications/create-notifications/create-notifications.component';
import { DxDataGridModule,  DxBulletModule, DxTemplateModule, DxButtonModule } from 'devextreme-angular';
@NgModule({
  declarations: [NotificationsComponent, NotificationsEdtComponent, DashboardComponent, UserGroupsComponent, CreateNotificationsComponent],
  imports: [
    CommonModule,
    NotificationsRoutingModule, DsSharedModule,SharedModule,
    DsSidebarModule, ReactiveFormsModule, MatCardModule, MatFormFieldModule, MatButtonModule, MatInputModule, MatSelectModule,  MatProgressSpinnerModule,
    DxDataGridModule,
    DxTemplateModule,
    DxBulletModule, DxButtonModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]

})
export class NotificationsModule { }
