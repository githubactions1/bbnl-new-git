import { Component, OnInit } from '@angular/core';
import { CrudService } from 'app/main/apps/crud.service';
import { DsSidebarService } from '@glits/components/sidebar/sidebar.service';
import { DatePipe } from '@angular/common';
import { FormBuilder, FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import {
  MatTableDataSource, MatPaginator, MatSort, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition, MatDialogRef, MatSnackBar, MatDialog,
  MAT_DIALOG_DATA
} from '@angular/material';
import { DeleteDialogComponent } from 'app/main/shared/components/delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.scss']
})
export class JobsComponent implements OnInit {
  firstFormGroup: FormGroup;
  permissions;
  columnDefs = [];
  rowData = [];
  hstrydata = [];
  schData = [];
  columndef = [];
  column = [];
  logdata: any;
  showTble = false;
  showedit = false;
  showlogdata = false;
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  confirmDialogRef: MatDialogRef<DeleteDialogComponent>;
  formDta = [];
  job_id: any;
  tskData = [];
  columntask = [];
  // showscheduleTble = false;
  getHeaderDtls = function () { return { "title": 'Batch Jobs  List', "icon": "people_outline" } };
  leftsidebarHdng: string;



  constructor(private crdsrv: CrudService, private _fuseSidebarService: DsSidebarService, private datePipe: DatePipe, private _formBuilder: FormBuilder,
    private snackBar: MatSnackBar, public dialog: MatDialog) {
    // this.firstFormGroup = this._formBuilder.group({
    //   credentials: this._formBuilder.array([]),
    // });
    // console.log(this.firstFormGroup)
  }

  user: any = {
    permissions: { 'slct_in': 0, 'insrt_in': 0, 'updt_in': 0, 'dlte_in': 0, 'exprt_in': 0 },
    'perm_url': 'user/permissions/Desginations Creation'
  }
  mainMessage:string = null;
  getUsrPermissions(): any {
    this.mainMessage = null;
    this.crdsrv.get(this.user.perm_url).subscribe((res) => {
      console.log(res['data']);
      this.user.permissions = res['data'][0];
      if (this.user.permissions.slct_in === 0) {
        this.mainMessage = 'You do not have permissions to do this operation. Please contact Administrator to get permissions.';
      } else
        this.getjobdetails();
    });
  }
  getjobdetails() {
    // this.spnrCtrl = true;
    console.log("hiiii");
    const rte = `batch/jobsLst`;
    this.crdsrv.get(rte).subscribe((res) => {
      console.log(res['data']);
      this.rowData = res['data'];
      let counter = 0;

      this.rowData.filter((k) => {
        k['s_no'] = ++counter;
      });
      this.columnDefs = [
        { headerName: 'Sno', field: 's_no', alignment: 'center', cellClass: "pm-grid-number-cell", width: 100, filter: false, search: false },
        { headerName: 'Job Name', field: 'jb_nm', alignment: 'left', cellClass: "pm-grid-number-cell", width: 250, filter: true },
        { headerName: 'Schedule Name', field: 'schde_nm', alignment: 'left', cellClass: "pm-grid-number-cell", width: 250, filter: true },
        { headerName: 'Schedule Description Text', field: 'schde_dscn_tx', alignment: 'left', cellClass: "pm-grid-number-cell", width: 150, filter: true },
        // { headerName: 'Tasks', field: '', alignment: 'left', cellClass: "pm-grid-number-cell", width: 200, filter: true },
        // { headerName: 'Gender', field: 'gndr_nm', alignment: 'left', cellClass: "pm-grid-number-cell", width: 150, filter: true },
      ];

    }, (error) => {
      //console.log(error);
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
        // this.opensideBar('addFormPanel', null);
      }
    },
      (error) => {
        console.log(error);
      });
  }

  onhisCellClick(h) {
    this.showTble = true;
    this.logdata = [];
    console.log(h.data.jb_id);
    const rte = `batch/jobHistory/${h.data.jb_id}`;
    console.log(rte);
    this.crdsrv.get(rte).subscribe((res) => {
      console.log(res);
      this.hstrydata = res['data'];
      console.log(this.hstrydata);
      this.columndef = [
        { headerName: 'Sno', field: 'sno', alignment: 'center', cellClass: "pm-grid-number-cell", width: 100, filter: false, search: false },
        { headerName: 'Job Name', field: 'jb_nm', alignment: 'left', cellClass: "pm-grid-number-cell", width: 150, filter: true },
        { headerName: 'Job Audit Id', field: 'jb_adt_id', alignment: 'left', cellClass: "pm-grid-number-cell", width: 100, filter: true },
        { headerName: 'Task Start Time', field: 'tsk_strt_ts', alignment: 'left', cellClass: "pm-grid-number-cell", width: 150, filter: true },
        { headerName: 'Task End Time', field: 'tsk_end_ts', alignment: 'left', cellClass: "pm-grid-number-cell", width: 150, filter: true },
        { headerName: 'Status', field: 'status', alignment: 'left', cellClass: "pm-grid-number-cell", width: 100, filter: true },
      ];
    });
    this.opensideBar('addFormPanel', null, null);
    // }
  }

  opensideBar(key, value, data) {
    console.log(value)
    console.log(data)

    if (value == 'edit') {
      // this.editind = 0;
      // this.olt_id = data.olt_id;
      // this.getDstrct(0);
      this.job_id = data.job_id;
      this.showedit = true;
      this.showTble == false;
      this.leftsidebarHdng = 'Edit Schedule';
      this.firstFormGroup.get('schedule_nm').setValue(data.schde_nm);
      this.firstFormGroup.get('schedule_desc').setValue(data.schde_dscn_tx);
      this.firstFormGroup.get('month').setValue(data.mnths_tx);
      this.firstFormGroup.get('weekdays').setValue(data.wkdys_tx);
      this.firstFormGroup.get('dates').setValue(data.dts_tx);
      this.firstFormGroup.get('hours').setValue(data.hrs_tx);
      this.firstFormGroup.get('minutes').setValue(data.mnts_tx);

    } else if (value == 'new') {
      // this.editind = 1;
      this.showedit = true;
      this.showTble == false;
      this.leftsidebarHdng = 'Add New Schedule';
      // this.firstFormGroup.reset();
      this.firstFormGroup.get('schedule_nm').setValue('');
      this.firstFormGroup.get('schedule_desc').setValue('');
      this.firstFormGroup.get('month').setValue('');
      this.firstFormGroup.get('weekdays').setValue('');
      this.firstFormGroup.get('dates').setValue('');
      this.firstFormGroup.get('hours').setValue('');
      this.firstFormGroup.get('minutes').setValue('');
      this.firstFormGroup.reset();
    }
    this._fuseSidebarService.getSidebar(key).toggleOpen();
  }
  // onSchCellClick(s) {
  // this.showTble = false;
  // this.showedit = true;
  // this.formDta = [];
  // console.log(s);
  // console.log(this.firstFormGroup);
  // console.log(s.data.job_id);
  // this.job_id = s.data.job_id;
  // const rte = `batch/jobscheduleLst/${s.data.job_id}`;
  // console.log(rte);
  // this.crdsrv.get(rte).subscribe((res) => {
  //   console.log(res);
  //   this.schData = res['data'];
  //   console.log(this.schData);

  // this.column = [
  //   { headerName: 'Sno', field: 'sno', alignment: 'center', cellClass: "pm-grid-number-cell", width: 100, filter: false, search: false },
  //   { headerName: 'Job Name', field: 'jb_nm', alignment: 'left', cellClass: "pm-grid-number-cell", width: 200, filter: true },
  //   { headerName: 'Schedule Name', field: 'schde_nm', alignment: 'left', cellClass: "pm-grid-number-cell", width: 200, filter: true },
  //   { headerName: 'Schedule Description', field: 'schde_dscn_tx', alignment: 'left', cellClass: "pm-grid-number-cell", width: 250, filter: true },
  //   { headerName: 'Cron Tab', field: 'cron_tab', alignment: 'left', cellClass: "pm-grid-number-cell", width: 250, filter: true },
  // ];
  // this.opensideBar('addFormPanel', null);
  // this.oneditClick();
  // });
  // }

  // closeSideBar = function () {
  //   this._fuseSidebarService.getSidebar('addFormPanel').toggleOpen();
  //   this.firstFormGroup.reset();
  // };
  addform() {
    // this.showedit = true;
    this.showedit = true;
    this.showTble == false;
    this.opensideBar('addFormPanel', 'new', null);
    // this.formDta.push({
    //   'schedule_nm': '', 'schd_desc': '', 'month': '', 'weekdays': '', 'dates': '', 'hours': '', 'minutes': ''
    // });
  }

  saveSchedule() {
    // console.log(dt);
    console.log(this.job_id);
    // console.log(event);
    console.log(this.firstFormGroup.value)
    let data = {
      schde_nm: this.firstFormGroup.value.schedule_nm,
      schde_dscn_tx: this.firstFormGroup.value.schd_desc,
      mnths_tx: this.firstFormGroup.value.month,
      wkdys_tx: this.firstFormGroup.value.weekdays,
      dts_tx: this.firstFormGroup.value.dates,
      hrs_tx: this.firstFormGroup.value.hours,
      mnts_tx: this.firstFormGroup.value.minutes,
      jb_id: this.job_id
    };
    console.log(data);
    // return
    const rte = `batch/jobschedule`;
    this.crdsrv.create(data, rte).subscribe((res) => {
      if (res['status'] == 200) {
        this.snackBar.open("Sucessfully Updated", '', {
          duration: 3000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
        this.opensideBar('addFormPanel', null, null);
        this.getjobdetails();
      }
    },
      (error) => {
        console.log(error);
      });
  }
  oneditClick(e) {
    // this.formDta = [];
    console.log(e);
    this.showedit = true;
    this.showTble = false;
    this.opensideBar('addFormPanel', 'edit', e.data);
    // const rte = `batch/jobschedule/${e.data.job_id}/${e.data.schde_id}`;
    // console.log(rte);
    // this.crdsrv.get(rte).subscribe((res) => {
    //   console.log(res);
    //   this.schData = res['data'];
    //   console.log(this.schData);
    // if (this.schData.length == 0) {
    //   // console.log("If")
    //   this.formDta.push({
    //     'schedule_nm': '', 'schd_desc': '', 'month': '', 'weekdays': '', 'dates': '', 'hours': '', 'minutes': ''
    //   });
    //   // this.opensideBar('addFormPanel', null);
    // } else {
    //   // for (var i = 0; i < this.schData.length; i++) {
    //     // console.log("IN else")
    //     this.formDta.push({
    //       'schedule_nm': this.schData[0].schde_nm, 'schd_desc': this.schData[0].schde_dscn_tx,
    //       'month': this.schData[0].mnths_tx,
    //       'weekdays': this.schData[0].wkdys_tx, 'dates': this.schData[0].dts_tx, 'hours': this.schData[0].hrs_tx, 'minutes': this.schData[0].mnts_tx
    //     });
    //   // }
    // }
    // });
    // /jobschedule/:jb_id/:sche_id

    // this.showTble = false;
    // if (this.schData.length == 0) {
    //   this.formDta.push({
    //     'schedule_nm': '', 'schd_desc': '', 'month': '', 'weekdays': '', 'dates': '', 'hours': '', 'minutes': ''
    //   });
    //   // this.opensideBar('addFormPanel', null);
    // } else {
    //   for (var i = 0; i < this.schData.length; i++) {
    //     this.formDta.push({
    //       'schedule_nm': this.schData[i].schde_nm, 'schd_desc': this.schData[i].schde_dscn_tx,
    //       'month': this.schData[i].mnths_tx,
    //       'weekdays': this.schData[i].wkdys_tx, 'dates': this.schData[i].dts_tx, 'hours': this.schData[i].hrs_tx, 'minutes': this.schData[i].mnts_tx
    //     });
    //   }
    // }
    // console.log(this.formDta);
    // if (i == this.schData.length) {
    //   console.log(this.formDta);

    // }
  }
  ondeleteClick(data) {
    console.log(data);
    // console.log(data.data.schde_id);

    this.confirmDialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '25%',
      panelClass: 'my-class',
      data: {
        message: 'Are you sure deleting this Schedule ?',
        id: data.data.schde_id, nm: data.data.schde_nm, entityname: 'Schedule', flag: false, rte: `batch/jobschedule/${data.data.schde_id}/${data.data.job_id}`
      }
    });

    this.confirmDialogRef.afterClosed().subscribe((response) => {
      if (response == undefined) { }
      else if (response.status == 200) {
        // this.opensideBar('addFormPanel', null, null);
        this.getjobdetails();
      }
    });
  }
  onLogClick(lg) {
    console.log(lg);
    this.showlogdata = true;
    const rte = `batch/joblog/${lg.data.jb_adt_id}`;
    this.crdsrv.get(rte).subscribe((res) => {
      console.log(res['data']);
      this.logdata = res['data'];
      // this.logdata = this.logdata.replace(new RegExp('\n', 'g'), '<br /> ');
      // if (res['status'] == 200) {
      if (res['data'] == undefined) {
        this.snackBar.open("No Logs", '', {
          duration: 3000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
      } else {
        this.logdata = res['data'];
        this.logdata = this.logdata.replace(new RegExp('\n', 'g'), '<br /> ');

      }
      // }
    },
      (error) => {
        console.log(error);
      });
  }

  onTaskCellClick(data) {
    this.showTble = false;
    this.showedit = false;
    this.formDta = [];
    console.log(data);
    console.log(this.firstFormGroup);
    console.log(data.data.jb_id);
    // this.job_id = data.data.jb_id;
    const rte = `batch/jobtasks/${data.data.jb_id}`;
    console.log(rte);
    this.crdsrv.get(rte).subscribe((res) => {
      console.log(res);
      this.tskData = res['data'];
      console.log(this.tskData);

      // this.columntask = [
      //   { headerName: 'Sno', field: 'sno', alignment: 'center', cellClass: "pm-grid-number-cell", width: 100, filter: false, search: false },
      //   { headerName: 'Task Name', field: 'tsk_nm', alignment: 'left', cellClass: "pm-grid-number-cell", width: 200, filter: true },
      //   { headerName: 'Task Description', field: 'tsk_desc_tx', alignment: 'left', cellClass: "pm-grid-number-cell", width: 200, filter: true },
      //   { headerName: 'Task Cateogry', field: 'tsk_ctgry_nm', alignment: 'left', cellClass: "pm-grid-number-cell", width: 250, filter: true },
      //   // { headerName: 'Cron Tab', field: 'cron_tab', alignment: 'left', cellClass: "pm-grid-number-cell", width: 250, filter: true },
      // ];
      this.opensideBar('addFormPanel', null, null);
    });
  }


  ngOnInit() {
    this.getUsrPermissions();

    this.firstFormGroup = this._formBuilder.group({
      schedule_nm: ['', Validators.required],
      schedule_desc: ['', Validators.required],
      month: ['', Validators.required],
      weekdays: ['', Validators.required],
      dates: ['', Validators.required],
      hours: ['', Validators.required],
      minutes: ['', Validators.required]
    });

  }

}
