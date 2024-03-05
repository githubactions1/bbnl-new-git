import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { ErptmpltComponent } from './Erptmplt/erpTmplt.component';
import { ErptmplttypComponent } from './Erptmplttyp/erpTmpltTyp.component';
import { AratypeComponent } from './Aratype/araType.component';
import { ErpartnerlistComponent } from './Erpartnerlist/erPartnerList.component';
import { ErptmpltprtnrsComponent } from './Erptmpltprtnrs/erpTmpltprtnrs.component';

const routes: Routes = [ { path: '', component: DashboardComponent },
{ path: 'Erptmplttyp', component: ErptmplttypComponent },
{ path: 'revenue-sharing', component: ErptmpltComponent },
{ path: 'AreaType', component: AratypeComponent },
{ path: 'partnrList', component: ErpartnerlistComponent },
{ path: 'ERpTmpRnr', component: ErptmpltprtnrsComponent }, 
                       ];
                       
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ErpRoutingModule {  }
