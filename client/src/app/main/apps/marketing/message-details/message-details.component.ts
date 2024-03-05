import { Component, OnInit, ViewChild } from '@angular/core';
import { DsSidebarService } from '@glits/components/sidebar/sidebar.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


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

@Component({
  selector: 'app-message-details',
  templateUrl: './message-details.component.html',
  styleUrls: ['./message-details.component.scss']
})
export class MessageDetailsComponent implements OnInit {

  firstFormGroup: FormGroup;
  gndrLst: any;
  showTble = false;
  showAddBtn = true;
  showBckBtn: boolean;
  frm_type: any;
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
  confirmDialogRef: MatDialogRef<DeleteDialogComponent>;
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  districts: any = []
  getHeaderDtls = function () { return { "title": 'Message List', "icon": "people_outline" } }
  permissions;
  msgFrm: FormGroup;
  lmosLst: any = [];
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
  CafTyp: any;
  Cafstus: any;
  mndl_lst: any;
  lmoLoader: boolean = false;
  searchLoader: boolean = false;
  msgType: any;
  msctgry: any;
  msgSts: any;
  constructor(public _dsSidebarService: DsSidebarService, private _formBuilder: FormBuilder, private crdsrv: CrudService, private datePipe: DatePipe, public dataService: Dataservice,
    private snackBar: MatSnackBar, public dialog: MatDialog, private route: Router, public TransfereService: TransfereService) {
    let rowHeight = 40;
    this.getRowHeight = function (params) {
      return rowHeight;
    };
    // this.permissions = { "slct_in": 1, "insrt_in": 0, "updt_in": 1, "dlte_in": 1, "exprt_in": 1 };
    const permTxt = 'Message Details';
    const prmeRte = `user/permissions/${permTxt}`;
    this.crdsrv.get(prmeRte).subscribe((res) => {
      console.log(res['data'][0]);
      this.permissions = res['data'][0];
    });

  }

  ngOnInit() {


    this.msgFrm = this._formBuilder.group({
      Catg_id: [''],
      msgty_id: ['', Validators],
      str_dt: ['', Validators],
      end_dt: ['', Validators],
      till_dt: ['', Validators],
      Stuts_id: ['', Validators]
    });
    this.getmsgCtgryLst()
    this.getMsgStuts()
  }

  getmsgCtgryLst() {
    this.crdsrv.get('caf/getfnts').subscribe(res => {
      console.log(res)
      this.msgType = res['data']['msgTyp']
      this.msctgry = res['data']['msctgry']


    })
  }

  getMsgStuts() {
    this.crdsrv.get('caf/MsgStuts').subscribe(res => {
      console.log(this.msgSts = res['data'])
    })
  }

  getDetails() {





    if (this.msgFrm.value.Catg_id || this.msgFrm.value.msgty_id || this.msgFrm.value.str_dt || this.msgFrm.value.end_dt || this.msgFrm.value.till_dt == true || this.msgFrm.value.Stuts_id) {
      if (this.msgFrm.value['till_dt'] == true) {

        var data = {
          Catg_id: this.msgFrm.value['Catg_id'],
          msgty_id: this.msgFrm.value['msgty_id'],
          till_dt: this.datePipe.transform(new Date(), 'dd/MM/yyyy'),
          Stuts_id: this.msgFrm.value['Stuts_id']
        }
        console.log(data)
        
        this.crdsrv.create(data, "caf/gtmsges").subscribe(res => {
          if (res['status'] == 200) {
            this.loader = false;
            this.rowData = res["data"]
            this.searchLoader = false;
            if (res["data"]) {
              this.showTble = true

            }
          }
        })

      } else {
        this.msgFrm.value['str_dt'] = this.datePipe.transform(this.msgFrm.value.str_dt, 'yyyy-MM-dd');
        this.msgFrm.value['end_dt'] = this.datePipe.transform(this.msgFrm.value.end_dt, 'yyyy-MM-dd');
        var Data = {
          Catg_id: this.msgFrm.value['Catg_id'],
          msgty_id: this.msgFrm.value['msgty_id'],
          str_dt: this.msgFrm.value['str_dt'],
          end_dt: this.msgFrm.value['end_dt'],
          Stuts_id: this.msgFrm.value['Stuts_id'],

        }
        console.log(Data)
        this.loader = true;
        this.crdsrv.create(Data, "caf/gtmsges").subscribe(res => {
          if(res['status']==200)
          {
            this.loader=false;
            this.rowData = res["data"]
            this.rowData.filter((k)=>{
             k.send_dt=this.datePipe.transform( k.send_dt, 'yyyy-MM-dd');
             
            })
            this.searchLoader = false;
            if (res["data"]) {
              this.showTble = true
            }
            console.log(this.rowData)
          }
         
        })
      }
    } else {
      this.snackBar.open('please Select atleast One type', 'Undo', {
        duration: 3000,
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      });
    }

    console.log(this.msgFrm.value)
    this.columnDefs = [
      { headerName: 'Sno', field: 'sno', cellStyle: { 'text-align': "center" }, cellClass: "pm-grid-number-cell", width: 100, filter: false, search: false },
      { headerName: 'CategoryName', field: 'msgs_ctgry_nm', cellStyle: { 'text-align': "left" }, cellClass: "pm-grid-number-cell", width: 150, filter: true },
      { headerName: 'MessageType', field: 'msge_type_nm', cellStyle: { 'text-align': "left" }, cellClass: "pm-grid-number-cell", width: 200, filter: true },
      { headerName: 'Message', field: 'msge_tx', cellStyle: { 'text-align': "left" }, cellClass: "pm-grid-number-cell", width: 250, filter: true },
      { headerName: 'Date', field: 'send_dt', cellStyle: { 'text-align': "left" }, cellClass: "pm-grid-number-cell", width: 250, filter: true },
      { headerName: 'Message Status', field: 'sts_nm', cellStyle: { 'text-align': "left" }, cellClass: "pm-grid-number-cell", width: 200, filter: true },
      // { headerName: 'Contact Person Name', field: 'cntct_nm', cellStyle: { 'text-align': "left" }, cellClass: "pm-grid-number-cell", width: 250, filter: true },
      // { headerName: 'Contact Person Mobile NO', field: 'cntct_mble1_nu', cellStyle: { 'text-align': "left" }, cellClass: "pm-grid-number-cell", width: 250, filter: true },
      // { headerName: 'Billing Mandal', field: 'blng_mndl_nm', cellStyle: { 'text-align': "left" }, cellClass: "pm-grid-number-cell", width: 150, filter: true },
      // { headerName: 'Billing City/Village', field: 'blng_vlg_nm', cellStyle: { 'text-align': "left" }, cellClass: "pm-grid-number-cell", width: 150, filter: true },
      // { headerName: 'Billing Frequency', field: 'billfreqlov', cellStyle: { 'text-align': "left" }, cellClass: "pm-grid-number-cell", width: 250, filter: true },
      // { headerName: 'Activation Date', field: 'actvtn_dt', cellStyle: { 'text-align': "left" }, cellClass: "pm-grid-number-cell", width: 250, filter: true },


    ];

  }

  Reset(Form) {
    this.showTble = false
    Form.reset()

  }

  onCellClick(data) {
    console.log(data.row.data)
    this.TransfereService.setLoclData('msgDtls', data.row.data)
    this.route.navigate(['/admin/marketing/msg-dtls-view'])
  }

  getMandals(data) {

  }
}
