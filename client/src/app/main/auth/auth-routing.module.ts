import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from 'app/main/auth/login/login.component';
import { RegisterComponent } from 'app/main/auth/register/register.component';
import { ResetPasswordComponent } from 'app/main/auth/reset-password/reset-password.component';
import { ForgotPasswordComponent } from 'app/main/auth/forgot-password/forgot-password.component';
// import { UserProfileComponent } from './user-profile/user-profile.component';
import { MsoEnrollmentComponent} from 'app/main/auth/tenant-enrollment/mso-enrollment/mso-enrollment.component';
import { LmoEnrollmentComponent} from 'app/main/auth/tenant-enrollment/lmo-enrollment/lmo-enrollment.component';
const routes: Routes = [
  {
  path     : '',
  component: LoginComponent
},
{
  path     : 'register',
  component: RegisterComponent
},{
  path     : 'reset-password',
  component: ResetPasswordComponent
},{
    path     : 'forgot-password',
    component: ForgotPasswordComponent
 }, {
  path     : 'enrollment/mso',
  component: MsoEnrollmentComponent
}, {
  path     : 'enrollment/lmo',
  component: LmoEnrollmentComponent
}
//  {
//   path     : 'user-profile',
//   component: UserProfileComponent
// }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
