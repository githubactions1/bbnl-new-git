import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivate } from '@angular/router';
import { CommonModule } from '@angular/common';
import {
  MatInputModule, MatFormFieldModule, MatToolbarModule, MatPaginatorModule, MatListModule, MatDialogModule,
  MatProgressSpinnerModule, MatSelectModule, MatOptionModule, MatDatepickerModule, MatCardModule, MatGridListModule, MatBottomSheetModule, MatDividerModule,
  MatRadioModule, MatButtonModule, MatIconModule, MatCheckboxModule
} from '@angular/material';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { SharedModule } from 'app/main/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DsSharedModule } from '@glits/shared.module';
import { CafnewComponent } from './cafnew.component'

const routes: Routes = [
  { path: '**', component: CafnewComponent },
];


@NgModule({
  declarations: [CafnewComponent],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    DsSharedModule,
    MatInputModule, MatFormFieldModule, MatToolbarModule, MatPaginatorModule, MatListModule, MatDialogModule,
    MatProgressSpinnerModule, MatSelectModule, MatOptionModule, MatDatepickerModule, MatCardModule, MatGridListModule, MatBottomSheetModule, MatDividerModule,
    MatRadioModule, MatButtonModule, MatIconModule, MatCheckboxModule, MatSlideToggleModule,
    RouterModule.forChild(routes)
  ],

  providers: [],
  entryComponents: [
  ]
})
export class CafnewModule { }
