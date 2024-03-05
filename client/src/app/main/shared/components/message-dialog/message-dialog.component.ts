import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData {
  title: string;
  msg: string;
  btnLst: [];
}


@Component({
  selector: 'app-message-dialog',
  templateUrl: './message-dialog.component.html',
  styleUrls: ['./message-dialog.component.scss']
})
export class MessageDialogComponent implements OnInit {

  flag2: any;
  data;
  constructor(public dialogRef: MatDialogRef<MessageDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public msgData: DialogData) {
    this.data = msgData;
  }

  ngOnInit() {
    // console.log(this.data);

  }

  onBtnClick(res): void {
    this.dialogRef.close(res);
  }
}
