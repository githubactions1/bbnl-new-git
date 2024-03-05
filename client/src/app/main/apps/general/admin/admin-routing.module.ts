import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { OrganisationsComponent } from './organisations/organisations.component';
import { MandalsComponent } from './mandals/mandals.component';

import { VillagesComponent } from './villages/villages.component';
import { CitiesComponent } from './cities/cities.component';
import { DesignationsComponent } from './designations/designations.component';

import { BranchesComponent } from './branches/branches.component';

import { BranchcategoryComponent } from './categories/branchCategory.component';
import { StatesComponent } from './states/states.component';
import { DistrictsComponent } from './districts/districts.component';
import { SubstntypComponent } from './Substntyp/subStnTyp.component';
import { SubstnComponent } from './Substn/subStn.component';


const routes: Routes = [ 
  { path     : 'states', component: StatesComponent},
  { path     : 'districts', component: DistrictsComponent},
  { path     : 'organisation', component: OrganisationsComponent},
  { path     : 'mandals', component: MandalsComponent},
  { path     : 'sub_stations', component: SubstnComponent},
  { path     : 'villages', component: VillagesComponent},
  { path     : 'cities', component: CitiesComponent},
  { path     : 'designations', component: DesignationsComponent},
  { path     : 'branches', component: BranchesComponent},
  { path     : 'categories', component: BranchcategoryComponent},
  { path     : 'sub_stationstyp', component: SubstntypComponent},]
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
