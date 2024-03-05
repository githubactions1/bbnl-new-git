import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChangeLogComponent } from './master/change-log/change-log.component';
import { AddChangeLogComponent } from './master/change-log/add-change-log/add-change-log.component';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChangeLogRoutingModule { }
