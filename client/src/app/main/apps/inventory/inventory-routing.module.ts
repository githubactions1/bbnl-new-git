import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StockUploadComponent } from './stock-upload/stock-upload.component';
import { SettopBoxComponent } from './master/settop-box/settop-box.component';
import { SettopBoxTransferComponent } from './master/settop-box/settop-box-transfer/settop-box-transfer.component';
import { SetupboxHistryDtlsComponent } from './master/settop-box/setupbox-histry-dtls/setupbox-histry-dtls.component';
import { OltComponent } from './master/olt/olt.component';
import {BoxChangeUpdationComponent} from './box-change-updation/box-change-updation.component'
import { OltMonitoringComponent } from './master/olt-monitoring/olt-monitoring.component';
const routes: Routes = [
  { path: 'set-top-boxs', component: SettopBoxComponent },
  { path: 'set-top-box/transfer', component: SettopBoxTransferComponent },
  { path: 'setup-box/transfer/:id', component: SetupboxHistryDtlsComponent },
  { path: 'olt', component: OltComponent },
  { path: 'olt/monitoring', component: OltMonitoringComponent },
  { path: '', component: StockUploadComponent },
  { path: '*', component: StockUploadComponent },
  { path: 'boxchangeupdation', component: BoxChangeUpdationComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InventoryRoutingModule { }
