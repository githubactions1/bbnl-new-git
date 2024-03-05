import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button'; 
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MatListModule, MatSnackBarModule} from '@angular/material';
import { ProfilesComponent, StyleComponentDialog } from './profiles.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {   path     : '**', component: ProfilesComponent }
];

@NgModule({
  declarations: [ProfilesComponent, StyleComponentDialog],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatListModule,
    MatSnackBarModule,
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  entryComponents: [ProfilesComponent, StyleComponentDialog]
})
export class ProfilesModule { }
