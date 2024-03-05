import { Component, OnInit, ViewChild, ElementRef, ChangeDetectionStrategy } from '@angular/core';
import { DsSidebarService } from '@glits/components/sidebar/sidebar.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import CustomStore from "devextreme/data/custom_store";
import DataSource from 'devextreme/data/data_source';
import { DatePipe } from '@angular/common';
import { DeleteDialogComponent } from 'app/main/shared/components/delete-dialog/delete-dialog.component';
import {
  MatTableDataSource, MatPaginator, MatSort, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition, MatDialogRef, MatSnackBar, MatDialog,
  MAT_DIALOG_DATA
} from '@angular/material';
import { CrudService } from 'app/main/apps/crud.service';
import { Router } from '@angular/router';
import { Dataservice } from 'app/main/shared/components/dataService';
import { DxTreeListComponent, DxDataGridComponent } from 'devextreme-angular';
import { TransfereService } from 'app/providers/transfer/transfer.service';
import { peginationsrvc } from '../../paginationServce';
@Component({
  selector: 'app-post-notification',
  templateUrl: './post-notification.component.html',
  styleUrls: ['./post-notification.component.scss']
})
export class PostNotificationComponent implements OnInit {
  @ViewChild('dataGridRef') dataGrid: DxDataGridComponent;
  firstFormGroup: FormGroup;
  gndrLst: any;
  showTble = true;
  showAddBtn = true;
  showBckBtn: boolean;
  frm_type: any;
  TypeMsg: any;
  showStepr = false;
  sideBarHeader: string;
  editClicked: boolean = false;
  updateData: any;
  deleteCstmr: boolean;
  columnDefs = [];
  columnDefss = [];
  rowData = [];
  getRowHeight;
  selectedRowKeys: any
  districtId: any;
  spnrCtrl = false;
  rrowdata: any = [];
  confirmDialogRef: MatDialogRef<DeleteDialogComponent>;
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  districts: any = []
  getHeaderDtls = function () { return { "title": 'IndividualFingerPrint', "icon": "people_outline" } }
  permissions;
  postForm: FormGroup;

  lmosLst: any = [];
  shofrm: any = 'Finger';
  groupPaging: boolean = false
  gridData: any = [];
  searchModeOption: string = "contains";
  searchExprOption: any = "fst_nm";
  searchTimeoutOption: number = 200;
  minSearchLengthOption: number = 0;
  showDataBeforeSearchOption: boolean = false;
  loader: boolean;
  searchExprOptionItems: Array<any> = [{
    name: "'fst_nm'",
    value: "fst_nm"
  }, {
    name: "['Name', 'Category']",
    value: ['Name', 'Category']
  }]
  cumrDtls: any = [];
  msgclrs: any;
  msgfnts: any;
  msgType: any;
  GlobalMsgType = 'invdufng'
  pageIndex = 0;
  selectedRowsData: any[] & Promise<any> & JQueryPromise<any>;
  msctgry: any = [];
  msgTypselctd: any = 1;
  store: CustomStore;

  constructor(public _dsSidebarService: DsSidebarService, private pgntn: peginationsrvc, private _formBuilder: FormBuilder, private crdsrv: CrudService, private datePipe: DatePipe, public dataService: Dataservice,
    private snackBar: MatSnackBar, public dialog: MatDialog, private route: Router, public TransfereService: TransfereService, public elRef: ElementRef) {

    this.getFntLst()
    let rowHeight = 40;
    this.getRowHeight = function (params) {
      return rowHeight;
    };

    // this.permissions = { "slct_in": 1, "insrt_in": 0, "updt_in": 1, "dlte_in": 1, "exprt_in": 1 };

    const permTxt = 'Finger Print';
    const prmeRte = `user/permissions/${permTxt}`;
    this.crdsrv.get(prmeRte).subscribe((res) => {
      console.log(res['data'][0]);
      this.permissions = res['data'][0];
    });

    const rte = `caf/fngcaf`;
    console.log(this.dataGrid)

    this.store = this.pgntn.get(rte, 'caf_id')
    console.log(this.store)

    this.columnDefs = [
      { headerName: 'Sno', field: 'sno', algnmnt: "center", filter: false, width: 50, search: false },
      { headerName: 'CAFNO', field: 'caf_id', algnmnt: "center", filter: false, search: false },
      { headerName: 'Customer Name', field: 'frst_nm', cellStyle: { 'text-align': "left" }, filter: true },
      { headerName: 'CAF DATE', field: 'actvn_dt', algnmnt: "center", filter: false, search: false },

      { headerName: 'Adhar Number', field: 'adhr_nu', algnmnt: "center", cellStyle: { 'text-align': "left" }, filter: true },
      { headerName: 'Iptv Mac Address', field: 'caf_mac_addr_tx', cellStyle: { 'text-align': "left" }, filter: true },
      { headerName: 'Subscriber Code', field: 'mdlwe_sbscr_id', cellStyle: { 'text-align': "left" }, filter: true },

    ];
  }


  ngOnInit() {

    console.log(this.pageIndex)
    this.postForm = this._formBuilder.group({
      subject: ['', [Validators.required]],
      message: ['', [Validators.required]],
    });




  }

  getPgeIndx(event) {

    //  if(event.fullName=="paging.pageIndex" ||event.fullName=="paging.pageSize" ){
    //  console.log(event)
    //   var index= this.dataGrid.instance.pageIndex();
    //   var pgsze=this.dataGrid.instance.pageSize()
    //   console.log(index)
    //   var data={
    //     pgsze:pgsze,
    //     pgIndex:index+1
    //   }
    //   console.log(data)
    //   //this.getcustomer(data)
    //  }

  }

  getSelectedData() {
    return this.selectedRowsData = this.dataGrid.instance.getSelectedRowsData();

    // ===== or when deferred selection is used =====
    // this.dataGrid.instance.getSelectedRowsData().then((selectedRowsData) => {
    //     // Your code goes here
    // });
  }



  getFntLst() {
    this.crdsrv.get('caf/getfnts').subscribe(res => {
      this.msgclrs = res['data']['clrData']
      this.msgfnts = res['data']['fntData']
      this.msgType = res['data']['msgTyp']
      this.msctgry = res['data']['msctgry']
      console.log(res['data'])
    })
  }
  getcustomer() {
    var data
    this.loader = true;
    console.log("hiiii");
    const rte = `caf/fngcaf`;
    this.crdsrv.create(data, rte).subscribe((res) => {
      if (res['status'] == 200) {
        this.loader = false;
        console.log(res['data']);
        this.rowData = res['data'];



        this.columnDefs = [
          { headerName: 'Sno', field: 'sno', algnmnt: "center", width: 50, filter: false, search: false },
          { headerName: 'CAFNO', field: 'caf_nu', algnmnt: "center", filter: false, search: false },
          { headerName: 'First Name', field: 'frst_nm', cellStyle: { 'text-align': "left" }, filter: true },
          { headerName: 'CAF DATE', field: 'actvn_dt', algnmnt: "center", filter: false, search: false },

          { headerName: 'Adhar Number', field: 'adhr_nu', algnmnt: "center", cellStyle: { 'text-align': "left" }, filter: true },
          { headerName: 'Iptv Mac Address', field: 'caf_mac_addr_tx', cellStyle: { 'text-align': "left" }, filter: true },
          { headerName: 'Subscriber Code', field: 'mdlwe_sbscr_id', cellStyle: { 'text-align': "left" }, filter: true },

        ];
      }


    }, (error) => {
      //console.log(error);
    });
  }

  optionChanged(index) {
    console.log(index)

  }



  bckBtn() {

    this.showAddBtn = true;
    this.showBckBtn = false;
    this.showStepr = false;
    this.showTble = true;
    this.getcustomer();
  }
  send(frmdat) {
    let data = frmdat;
    let selectedData = this.getSelectedData();
    if (selectedData.length > 0) {
      data["subscribercode"] = selectedData[0].mdlwe_sbscr_id;

      this.crdsrv.create(data, "caf/post-notification").subscribe((res) => {
        if (res['data'].length > 0) {
          this.snackBar.open('Notification Sent', 'Undo', {
            duration: 3000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
          });
        }
        console.log(res)
      })

    }
    console.log()
    //  let subCode;
    //   if (frmdat.sub_cd) {
    //     console.log(frmdat.sub_cd)
    //     var sb_cd = frmdat.sub_cd.split(',')
    //     for (var i = 0; i < sb_cd.length; i++) {
    //       subscribercds.push(sb_cd[i])
    //     }

    //   }
    //   console.log(this.msgTypselctd)

    //   if (subscribercds.length > 0) {
    //     if (this.msgTypselctd == 1) {

    //       console.log("FingetPrint conditon")
    //       Fngdata = {
    //         command: commdtype,
    //         GlobalMsg: this.GlobalMsgType,
    //         msgcat: this.msgTypselctd,
    //         cafid: caf_id,
    //         subscriberCodes: subscribercds,
    //         position: frmdat.postn,
    //         fontType: frmdat.fnt_typ,
    //         fontName: this.msgfnts[frmdat.fnt_typ - 1].fnt_nm,
    //         fontSize: frmdat.fnt_sz,
    //         Fingertype: frmdat.fng_typ,
    //         channel: frmdat.chnl,
    //         fontColor: frmdat.fnt_clr,
    //         fontColornm: this.msgclrs[frmdat.fnt_clr - 1].clr_nm,
    //         bgColor: frmdat.bg_clr,
    //         bgColornm: this.msgclrs[frmdat.fnt_clr - 1].clr_nm,
    //         duration: frmdat.dur,
    //         expiryDate: frmdat.ex_dt
    //       }

    //       this.crdsrv.create(Fngdata, "caf/sndMsg").subscribe((res) => {
    //         if (res['data'].length > 0) {
    //           this.snackBar.open('Message Submited', 'Undo', {
    //             duration: 3000,
    //             horizontalPosition: this.horizontalPosition,
    //             verticalPosition: this.verticalPosition,
    //           });
    //         }
    //         console.log(res)
    //       })



    //       console.log(Fngdata)

    //     }

    //     if (this.msgTypselctd == 2) {
    //       console.log("Osd conditon")
    //       console.log(this.msgfnts[frmdat.fnt_typ - 1].fnt_nm)

    //       Osddata = {
    //         module: "DRM",
    //         command: commdtype,
    //         msgcat: this.msgTypselctd,
    //         GlobalMsg: this.GlobalMsgType,
    //         cafid: caf_id,
    //         subscriberCodes: subscribercds,
    //         position: frmdat.postn,
    //         fontTypeId: frmdat.fnt_typ,
    //         fontType: this.msgfnts[frmdat.fnt_typ - 1].fnt_nm,
    //         fontSize: frmdat.fnt_sz,
    //         fontColorId: frmdat.fnt_clr,
    //         fontColor: this.msgclrs[frmdat.fnt_clr - 1].clr_nm,
    //         msgtype: frmdat.msgtyp,
    //         bgColorId: frmdat.bg_clr,
    //         bgColor: this.msgclrs[frmdat.fnt_clr - 1].clr_nm,
    //         duration: frmdat.dur,
    //         message: frmdat.msg,
    //         userCanCloseMessage: ((frmdat.usrmsgcls == 1) ? true : false),
    //         expiryDate: frmdat.ex_dt
    //       }
    //       console.log(Osddata)
    //       this.crdsrv.create(Osddata, "caf/sndMsg").subscribe((res) => {
    //         if (res['data'].length > 0) {
    //           this.snackBar.open('Message Submited', 'Undo', {
    //             duration: 3000,
    //             horizontalPosition: this.horizontalPosition,
    //             verticalPosition: this.verticalPosition,
    //           });
    //         }
    //         console.log(res)
    //       })

    //     }



    //   } else {
    //     this.snackBar.open('please Select atleast one caf', 'Undo', {
    //       duration: 3000,
    //       horizontalPosition: this.horizontalPosition,
    //       verticalPosition: this.verticalPosition,
    //     });
    //   }

    //   console.log(frmdat)



  }
  Reset(Form) {
    console.log('reset')
    Form.reset()

  }


  onToolbarPreparing(e) {
    console.log(e)
  }
}
