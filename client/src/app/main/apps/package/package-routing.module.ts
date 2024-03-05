import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LanguagesComponent } from './master/Languages/languages.component';
import { BroadcastersComponent } from './master/Broadcasters/broadcasters.component';

import { PackageservicetypeComponent } from './master/Packageservicetype/packageServicetype.component';
// import { ZonerlistComponent } from './master/Zonerlist/zonerList.component';
import { PackageplanComponent } from './master/Packageplan/packagePlan.component';
import { ServingassertlistComponent } from './master/Servingassertlist/Servingassertlist.component';
import { ServingcabletypelistComponent } from './master/Servingcabletypelist/Servingcabletypelist.component';
import { CresrvceComponent } from './master/Cresrvce/cresrvce.component';
import { PckgevoipfeaturesComponent } from './master/Pckgevoipfeatures/pckgevoipFeatures.component';
import { PckgeiptvchannelsComponent } from './master/Pckgeiptvchannels/pckgeIptvChannels.component';
import { PackageservicelstComponent } from './master/Packageservicelst/packageServiceLst.component';
import { GenrelistComponent } from './master/Genrelist/genrelist.component';
// PackageservicelstComponent
const routes: Routes = [
  { path: 'languages', component: LanguagesComponent },
  { path: 'broadcaster', component: BroadcastersComponent },
  { path: 'Coreservices', component: CresrvceComponent },
  { path: 'Packageservicetype', component: PackageservicetypeComponent },
  // { path     : 'Zonerlist', component: ZonerlistComponent},
  { path: 'generlist', component: GenrelistComponent },
  { path: 'Packageplan', component: PackageplanComponent },
  { path: 'servnasrtlst', component: ServingassertlistComponent },
  { path: 'iptv-channels', component: PckgeiptvchannelsComponent },
  { path: 'voipFeatures', component: PckgevoipfeaturesComponent },
  { path: 'servcblst', component: ServingcabletypelistComponent },
  { path: 'service-packs', component: PackageservicelstComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PackageRoutingModule { }
