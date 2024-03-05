import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IllCafFormComponent } from './ill-caf-form/ill-caf-form.component';
import { IllCafsProfileComponent } from './ill-cafs-profile/ill-cafs-profile.component';
import { IllCafsComponent } from './ill-cafs/ill-cafs.component';
import { IllEnterpriseFormComponent } from './ill-enterprise-form/ill-enterprise-form.component';
import { IllPackageApprovalsComponent } from './ill-package-approvals/ill-package-approvals.component';
import { IllCafPackagesComponent } from './ill-caf-packages/ill-caf-packages.component';
import { IllLevel2PackageApprovalComponent } from './ill-package-approvals/ill-level2-package-approval/ill-level2-package-approval.component';


const routes: Routes = [
  { path: '', component: IllCafsComponent,  pathMatch : 'full' },
  { path: 'newIllEntprse', component: IllEnterpriseFormComponent,  pathMatch : 'full' }, 
  { path: 'iilPackage/approvel', component: IllPackageApprovalsComponent,  pathMatch : 'full' },
  { path: 'iilPackage/approvel-2', component: IllLevel2PackageApprovalComponent,  pathMatch : 'full' },
  { path: 'package', component: IllCafPackagesComponent,  pathMatch : 'full' },
  { path: 'form', component: IllCafFormComponent,  pathMatch : 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IllCafsRoutingModule { }
