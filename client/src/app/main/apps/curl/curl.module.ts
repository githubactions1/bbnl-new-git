
import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivate } from '@angular/router';
import { CommonModule } from '@angular/common';
import {
    MatInputModule, MatFormFieldModule, MatToolbarModule, MatPaginatorModule, MatListModule, MatDialogModule,
    MatProgressSpinnerModule, MatSelectModule, MatOptionModule, MatDatepickerModule, MatCardModule, MatGridListModule, MatBottomSheetModule, MatDividerModule,
    MatRadioModule, MatButtonModule, MatIconModule, MatCheckboxModule
} from '@angular/material';
import { SharedModule } from 'app/main/shared/shared.module';
import { CurlComponent } from './curl.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DsSharedModule } from '@glits/shared.module';

const routes: Routes = [
    { path: '**', component: CurlComponent },
];
@NgModule({
    declarations: [CurlComponent],
    imports: [
        CommonModule,
        SharedModule,
        FormsModule,
        ReactiveFormsModule,
        DsSharedModule,
        MatInputModule, MatFormFieldModule, MatToolbarModule, MatPaginatorModule, MatListModule, MatDialogModule,
        MatProgressSpinnerModule, MatSelectModule, MatOptionModule, MatDatepickerModule, MatCardModule, MatGridListModule, MatBottomSheetModule, MatDividerModule,
        MatRadioModule, MatButtonModule, MatIconModule, MatCheckboxModule,
        RouterModule.forChild(routes)
    ],

    providers: [],
    entryComponents: [
    ]
})
export class CurlModule { }