import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

export interface DialogData {
  chng_lg_dt : any;
  chng_lg_txt : string;
}

@Component({
  selector: 'app-change-log-modal',
  templateUrl: './change-log-modal.component.html',
  styleUrls: ['./change-log-modal.component.scss']
})
export class ChangeLogModalComponent implements OnInit {
  [x: string]: any;

  headElements = ['#', 'Date', 'Text'];

  constructor(public dialogRef: MatDialogRef<ChangeLogModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
    console.log(data);
  }

  ngOnInit() {

  }


  public decline() {
    this.dialogRef.close(false);
  }

  public accept() {
    this.dialogRef.close(true);
  }

}
