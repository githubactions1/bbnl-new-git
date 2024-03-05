import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//import { AppstoreComponent } from './appstore.component';
import { AppstoreListComponent } from './master/appstore/appstore-list/appstore-list.component';
// import { AppstoreEditComponent } from './master/appstore/appstore-edit/appstore-edit.component';
// import { AppsEditComponent } from './master/apps/apps-edit/apps-edit.component';
// import { AppsListComponent } from './master/apps/apps-list/apps-list.component';
// import { AppsDtlComponent } from './master/apps/apps-dtl/apps-dtl.component';


const routes: Routes = [
 // { path: '', redirectTo: 'board/created' },
  { path: '', component: AppstoreListComponent } ,
  { path: '*', component: AppstoreListComponent }
  ];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppstoreRoutingModule { 
    constructor(){
       console.log("In AppstoreRoutingModule")
  }
}
