import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { CrudService } from 'app/main/apps/crud.service';

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.scss']
})
export class DeleteDialogComponent implements OnInit {

  dialogRef: any;
  deldata: any;
  flag: boolean;
  flag1: boolean;
  results: any;
  flag2: boolean;
   /**
  * @param _data
  * @param {MatDialogRef<DeleteDialogComponent>} matDialogRef
  */
  constructor(public dialog: MatDialog, @Inject(MAT_DIALOG_DATA) private _data: any, public crdsrv: CrudService, public matDialogRef: MatDialogRef<DeleteDialogComponent>) {
    this.deldata = _data;
   }

  ngOnInit() {
  }
  close(): void {
    this.dialogRef = this.dialog.closeAll();
  }
  delete(){
    this.flag = false;
    this.crdsrv.delete(this.deldata.rte).subscribe((res) => {
      this.results = res;
      if (res['status'] == 200) {
        this.flag = true;
        this.flag2 = true;
      }
    }, (error) => {
      this.flag1 = true;
      this.flag = false;
      this.flag2 = true;
    });
  }
}
