import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
@Component({
  selector: 'app-trainer-dtl',
  templateUrl: './trainer-dtl.component.html',
  styleUrls: ['./trainer-dtl.component.scss']
})
export class TrainerDtlComponent implements OnInit {
  trainerdata
  constructor(public dialogRef: MatDialogRef<TrainerDtlComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { 
    this.trainerdata=this.data.data
      console.log(this.trainerdata)
  }

  ngOnInit() {
    console.log(this.trainerdata)
  }

}
