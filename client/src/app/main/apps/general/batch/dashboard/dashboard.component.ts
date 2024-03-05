import { Component, OnInit, Inject } from '@angular/core';
import { CrudService } from 'app/main/apps/crud.service';
import { DatePipe } from '@angular/common';
import {
  MatTableDataSource, MatPaginator, MatSort, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition, MatDialogRef, MatSnackBar, MatDialog,
  MAT_DIALOG_DATA
} from '@angular/material';
// import { DashboardDialogComponent } from '../dashboard';

export interface DialogData {
  logdata: string;
}
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  permissions;
  hstrydata = [];
  columndef = [];
  fromdate: Date;
  todate: Date;
  fromdt: string;
  todt: string;
  // dialogRef: any;
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  logdata: any;
  getHeaderDtls = function () { return { "title": 'Batch Jobs Dashboard', "icon": "people_outline" } };
  




  constructor(private crdsrv: CrudService, private datePipe: DatePipe, private snackBar: MatSnackBar, public dialog: MatDialog, @Inject(MAT_DIALOG_DATA) private _data: any) {
    this.permissions = { "slct_in": 1, "insrt_in": 0, "updt_in": 1, "dlte_in": 1, "exprt_in": 1 };
    this.fromdate = new Date();
    this.todate = new Date();
  }
  getjobsdata() {

    console.log(this.todate);
    console.log(this.fromdate);
    this.todt = this.datePipe.transform(this.todate, 'yyyy-MM-dd');
    this.fromdt = this.datePipe.transform(this.fromdate, 'yyyy-MM-dd');
    console.log(this.todt);
    console.log(this.fromdt);
    const rte = `batch/jobHistory`;
    console.log(rte);
    let pstdata = {
      todate: this.todt,
      frmdate: this.fromdt
    };
    this.crdsrv.create(pstdata, rte).subscribe((res) => {
      console.log(res);
      this.hstrydata = res['data'];
      console.log(this.hstrydata);
      this.columndef = [
        { headerName: 'Sno', field: 'sno', alignment: 'center', cellClass: "pm-grid-number-cell", width: 100, filter: false, search: false },
        { headerName: 'Job Name', field: 'jb_nm', alignment: 'left', cellClass: "pm-grid-number-cell", width: 250, filter: true },
        { headerName: 'Job Audit Id', field: 'jb_adt_id', alignment: 'left', cellClass: "pm-grid-number-cell", width: 150, filter: true },
        { headerName: 'Task Start Time', field: 'jb_strt_ts', alignment: 'left', cellClass: "pm-grid-number-cell", width: 200, filter: true },
        { headerName: 'Task End Time', field: 'jb_end_ts', alignment: 'left', cellClass: "pm-grid-number-cell", width: 200, filter: true },
        { headerName: 'Duration', field: 'duration', alignment: 'left', cellClass: "pm-grid-number-cell", width: 150, filter: true },
        { headerName: 'Status', field: 'status', alignment: 'left', cellClass: "pm-grid-number-cell", width: 150, filter: true },
      ];
    });
  }
  onRunCellClick(e) {
    console.log(e);
    // console.log(this.rowData);
    const rte = `batch/executeJob`;
    let data = {
      job_id: e.data.jb_id
    };
    console.log(data);
    this.crdsrv.create(data, rte).subscribe((res) => {
      console.log(res);
      if (res['status'] == 200) {
        this.snackBar.open("Run Sucessfully", '', {
          duration: 3000,
          panelClass: ['blue-snackbar'],
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
        this.getjobsdata();

      }
    },
      (error) => {
        console.log(error);
      });
  }
  onLogCellClick(lg){
    console.log(lg);
    const rte = `batch/joblog/${lg.data.jb_adt_id}`;
    this.crdsrv.get(rte).subscribe((res) => {
      console.log(res['data']);
      if(res['data'] == undefined){
        this.snackBar.open("No Logs", '', {
          duration: 3000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
      } else {
        this.logdata = res['data'];
        this.logdata = this.logdata.replace(new RegExp('\n', 'g'), ' ');
        const dialogRef  = this.dialog.open(DashboardDialogComponent, {
          width: '50%',
          panelClass: 'my-class',
          data: {
            // message: 'Are you sure deleting this Schedule ?',
            logdata: this.logdata
    
          }
        });
        dialogRef.afterClosed().subscribe(result => {
          console.log('The dialog was closed');
          // this.animal = result;
        });
      }
    },
      (error) => {
        console.log(error);
      });
  }
  ngOnInit() {
    this.getjobsdata();

  }
}

@Component({
  selector: 'dashboard-dialog',
  templateUrl: './dashboard-dialog.component.html',
})
export class DashboardDialogComponent {
  lgdata: any;

  constructor(
    public dialogRef: MatDialogRef<DashboardDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData ) {
      // this.lgdata = _data;
    }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
