import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { switchMap, debounceTime, tap, map, finalize } from 'rxjs/operators';
import { CrudService } from '../../crud.service';
import { ExportService } from 'app/main/services/export.service';
import * as XLSX from 'xlsx';
import { DatePipe } from '@angular/common';
import { MatSnackBar, MatSnackBarVerticalPosition, MatSnackBarHorizontalPosition, MatDialogRef, MatDialog } from '@angular/material';
import { MessageDialogComponent } from 'app/main/shared/components/message-dialog/message-dialog.component';

@Component({
  selector: 'app-lmo-payments',
  templateUrl: './lmo-payments.component.html',
  styleUrls: ['./lmo-payments.component.scss']
})
export class LmoPaymentsComponent implements OnInit {
  lmoPymntsForm: FormGroup;
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  filteredAgents: any;
  errorMsg: string;
  isLoading: boolean;
  columnDefs;
  usrPymntData;
  exceldDatasoure;
  lmoSlctd = false;
  permissions;
  pymntCtgryLst: any;
  fileUploaded: any;
  shwrcds: boolean;
  isValid: boolean;
  storeData: any;
  worksheet: XLSX.WorkSheet;
  ExclDta = [];
  ttlRcds: number;
  exclGrid: boolean;
  columnDefsRcrd;
  agntPymntLst: any;
  usrUpldPymntsLst: any;
  usrUpldPymntsColumnDefs;
  recentPymntsLst: any;
  recentPymntsColumnDefs;
  upldFileNm: any;
  agntPymntsForm: FormGroup;
  rcntsLdr: boolean;
  updtsLdr: boolean;
  shwLdr: boolean;
  shwPermMsg: string;
  confirmMsgDialogRef: MatDialogRef<MessageDialogComponent>;
  today = new Date(); 
  // tslint:disable-next-line:typedef
  getHeaderDtls = function () { return { 'title': 'Payments To APSFL', 'icon': 'money' }; };
  
  

  constructor(private fb: FormBuilder, public crdSrv: CrudService, public excel: ExportService, public datePipe: DatePipe, private _snackBar: MatSnackBar,
    public dialog: MatDialog) {
      this.today.setDate(this.today.getDate());
    // this.permissions = { 'slct_in': 1, 'insrt_in': 0, 'updt_in': 1, 'dlte_in': 1, 'exprt_in': 1 };
    // const permTxt = 'Payments to APSFL';
    // const prmeRte = `user/permissions/${permTxt}`;
    // this.crdSrv.get(prmeRte).subscribe((res) => {
    //   // console.log(res['data'][0]);
    //   this.permissions = res['data'][0];
    // });
  }

  ngOnInit(): any {

    this.agntPymntsForm = this.fb.group({
      pymntFrmDt: [''],
      pymntToDt: ['']
    });

    this.lmoPymntsForm = this.fb.group({
      lmoCode: ['', Validators.required],
      pymntType: ['', Validators.required],
      pymntRefNo: ['', Validators.required],
      pymntDt: ['', Validators.required],
      bnkNm: ['', Validators.required],
      amt: ['', Validators.required],
      excl: ['', Validators.required],
      cmt: ['']
    });

      this.lmoPymntsForm.get('lmoCode').valueChanges
        .pipe(
          debounceTime(500),
          tap(() => {
            this.errorMsg = '';
            this.filteredAgents = [];
            this.isLoading = true;
          }),
          switchMap((value) => {
            if (value){
            if (value.length >= 3 || value.length !==  null) {
              return this.crdSrv.get('agent/getAgentBySearch/' + value)
                .pipe(
                  finalize(() => {
                    this.isLoading = false;
                  }),
                );
            }
          }
          })
        )
        .subscribe(data => {
          if (data['data'] === undefined) {
            this.errorMsg = data['Error'];
            this.filteredAgents = [];
          } else {
            this.errorMsg = '';
            this.filteredAgents = data['data'];
          }
        });


    // this.getUsrPymnts('');
    this.getPymntCtgry();
    this.getLgnUsrUploads();
  }

  getPymntCtgry(): any {
    // this.pymntCtgryLst = [];
    const rte = `billing/AgntPymntMode`;
    this.crdSrv.get(rte).subscribe((res) => {
      if (res['status'] === 200) {
        this.pymntCtgryLst = res['data'];
      }
    });
  }

  getUsrPymnts(data): any {
    // return;
    this.lmoSlctd = true;
    const postAgntData = {
      agntId: data.agnt_id,
      frmDt: '',
      toDt: ''
    };

    const rte = `billing/payments/agent`;
    this.crdSrv.create(postAgntData, rte).subscribe((res) => {
      console.log(res);
      if (res['status'] === 200) {
        this.agntPymntLst = res['data'];
        let ct = 0;
        // console.log(this.agntPymntLst);
        this.agntPymntLst.filter(p => {
          p['srno'] = ++ct;
        });
        // console.log(this.agntPymntLst);
      }
    });

    this.columnDefs = [
      { headerName: 'S.No', field: 'srno', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 60, height: 40 },
      { headerName: 'LMO Name', field: 'agnt_nm', alignment: 'left', cellClass: 'pm-grid-number-cell', width: 200, height: 40, filter: true },
      { headerName: 'LMO Code', field: 'agnt_cd', alignment: 'left', cellClass: 'pm-grid-number-cell', width: 200, height: 40, filter: true },
      { headerName: 'Payment Mode', field: 'pymnt_mde_nm', alignment: 'left', cellClass: 'pm-grid-number-cell', width: 200, height: 40, filter: true },
      { headerName: 'Transaction Amount', field: 'trnsn_at',  type: 'currency', currency: 'INR', precision: '2',
       alignment: 'right', cellClass: 'pm-grid-number-cell', width: 200, height: 40, filter: true },
      { headerName: 'Transaction Date', field: 'trsn_dt', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 200, height: 40, filter: true },
      { headerName: 'Transaction Type', field: 'trnsn_ctgry_nm', alignment: 'left', cellClass: 'pm-grid-number-cell', width: 200, height: 40, filter: true },
      // tslint:disable-next-line:max-line-length
      { headerName: 'Bank Name', visible: true, field: 'trnsn_bnk_nm', alignment: 'left', cellClass: 'pm-grid-number-cell', width: 200, height: 40, filter: true },
      // tslint:disable-next-line:max-line-length
      { headerName: 'Bank Reference Number', visible: false, field: 'trns_ref_nu', alignment: 'left', cellClass: 'pm-grid-number-cell', width: 200, height: 40, filter: true },
    ];
  }
  
  savePayments(): any {
    this.lmoPymntsForm.value.pymntDt = this.datePipe.transform(this.lmoPymntsForm.value.pymntDt, 'yyyy-MM-dd');
    const lmoPymntsArry = [];
    if (this.lmoPymntsForm.value.pymntType == null || this.lmoPymntsForm.value.pymntRefNo == null
      || this.lmoPymntsForm.value.pymntRefNo == "" || this.lmoPymntsForm.value.pymntDt == null 
      || this.lmoPymntsForm.value.bnkNm == null || this.lmoPymntsForm.value.bnkNm == "" 
      || this.lmoPymntsForm.value.amt == null || this.lmoPymntsForm.value.amt == ""){
        this._snackBar.open('Please enter all the mandatory fields', '', {
          duration: 3500,
          panelClass: ['red-snackbar'],
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
    } else {
      lmoPymntsArry.push({
        agnt_id: this.lmoPymntsForm.value.lmoCode.agnt_id,
        trsn_dt: this.lmoPymntsForm.value.pymntDt,
        trnsn_type_id: 6,
        pymnt_mde_id: this.lmoPymntsForm.value.pymntType,
        dd_nu: this.lmoPymntsForm.value.pymntRefNo,
        trnsn_at: this.lmoPymntsForm.value.amt,
        cmnt_tx: this.lmoPymntsForm.value.cmt,
        upld_in: 0,
        trnsn_bnk_nm: this.lmoPymntsForm.value.bnkNm
      });
      // console.log(lmoPymntsArry);
      // return;
      // this.postAgntPymnts(lmoPymntsArry);
      console.log("thereeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee");
    }
  }

  postAgntPymnts(data): any {
    this.shwLdr = true;
    const rte = `billing/agent/payments`;
    this.crdSrv.create(data, rte).subscribe((res) => {
      if (res['status'] === 200) {
        if (res['data'].insertId) {
          this.shwLdr = false;
          this._snackBar.open('Payment details Sucessfully Saved', '', {
            duration: 3500,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
          });
        } else {
          this.shwLdr = false;
          this._snackBar.open('Payment details Already Uploaded', '', {
            duration: 3500,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
          });
        }
        if (data[0].upld_in === 0) {
          this.getUsrPymnts(data[0]);
        }
      }
    }, (error) => {
      console.log(error);
    });
  }
  displayFn(agent): any {
    if (agent) { return agent.agnt_nm + ' ' + '|' + ' ' + agent.agnt_cd; }
  }

  downloadtemplate(): any {

    this.exceldDatasoure = [
      {
        'sno': '1',
        'lmo_cd': 'LMO773',
        'bank_ref_nu': '7061820620001',
        'tot_amt': '3000',
        'Date': '6.7.2018'
      },
      {
        'sno': '2',
        'lmo_cd': 'LMO2189',
        'bank_ref_nu': '7061821200004',
        'tot_amt': '17991',
        'Date': '6.7.2018'
      },
      {
        'sno': '3',
        'lmo_cd': 'LMO14994',
        'bank_ref_nu': '7061807780001',
        'tot_amt': '10900',
        'Date': '6.7.2018'
      },
      {
        'sno': '4',
        'lmo_cd': 'LMO11703',
        'bank_ref_nu': '7061821200003',
        'tot_amt': '4935.50',
        'Date': '6.7.2018'
      },
      {
        'sno': '5',
        'lmo_cd': 'LMO13651',
        'bank_ref_nu': '7061823610001',
        'tot_amt': '8200',
        'Date': '6.7.2018'
      },
      {
        'sno': '6',
        'lmo_cd': 'LMO275',
        'bank_ref_nu': '7061801750001',
        'tot_amt': '3242',
        'Date': '6.7.2018'
      },
      {
        'sno': '7',
        'lmo_cd': 'LMO1758',
        'bank_ref_nu': '7061821200002',
        'tot_amt': '5000',
        'Date': '6.7.2018'
      },
      {
        'sno': '8',
        'lmo_cd': 'LMO2455',
        'bank_ref_nu': '7061823810001',
        'tot_amt': '753',
        'Date': '6.7.2018'
      },
      {
        'sno': '9',
        'lmo_cd': 'LMO8656',
        'bank_ref_nu': '7061802030001',
        'tot_amt': '1950',
        'Date': '6.7.2018'
      },
      {
        'sno': '10',
        'lmo_cd': 'LMO12960',
        'bank_ref_nu': '7061803080003',
        'tot_amt': '11130',
        'Date': '6.7.2018'
      }];
    this.excel.exportAsExcelFile(this.exceldDatasoure, 'Lmopayments');
  }

  uploadedFile(event): any {
    this.fileUploaded = event.target.files[0];
    this.upldFileNm = this.fileUploaded.name;
    this.readExcel();
    this.shwrcds = true;
    this.lmoPymntsForm.reset();
    this.lmoSlctd = false;
  }
  readExcel(): any {
    this.isValid = true;
    const readFile = new FileReader();
    readFile.onload = (e) => {
      this.storeData = readFile.result;
      const data = new Uint8Array(this.storeData);
      const arr = new Array();
      for (let i = 0; i !==  data.length; ++i) { arr[i] = String.fromCharCode(data[i]); }
      const bstr = arr.join('');
      const workbook = XLSX.read(bstr, {
        type: 'binary', cellDates: true,
        cellNF: false,
        cellText: false
      });
      const first_sheet_name = workbook.SheetNames[0];
      this.worksheet = workbook.Sheets[first_sheet_name];
      this.ExclDta = XLSX.utils.sheet_to_json(this.worksheet, { raw: true });

      this.columnDefsRcrd = [
        { headerName: 'S.No', field: 'sno', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 60, height: 40 },
        { headerName: 'LMO', field: 'lmo_cd', alignment: 'left', cellClass: 'pm-grid-number-cell', width: 200, height: 40, filter: true },
        { headerName: 'Bank', field: 'bank_ref_nu', alignment: 'left', cellClass: 'pm-grid-number-cell', width: 200, height: 40, filter: true },
        { headerName: 'Amount', field: 'tot_amt', alignment: 'right', cellClass: 'pm-grid-number-cell', width: 200, height: 40, filter: true },
        { headerName: 'Date', field: 'Date', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 200, height: 40, filter: true },

      ];

      if (this.ExclDta.length === 0) { this.isValid = false; }
      this.ttlRcds = this.ExclDta.length;

      for (let i = 0; i < this.ExclDta.length; i++) {
        // if (typeof this.ExclDta[i]['lmo_cd'] !== 'number'
        //   && typeof this.ExclDta[i]['bank_ref_nu'] !== 'string'
        //   && typeof this.ExclDta[i]['tot_amt'] !== 'number'
        //   && typeof this.ExclDta[i]['Date'] !== 'object')
        if (typeof this.ExclDta[i]['lmo_cd'] !== 'number'
          && this.ExclDta[i].hasOwnProperty('credit_type') == true
          && typeof this.ExclDta[i]['bank_ref_nu'] == 'string'
          && typeof this.ExclDta[i]['tot_amt'] !== 'number'
          && typeof this.ExclDta[i]['Date'] == 'string')
           {
          this.isValid = false;
          this.exclGrid = false;
          break;
        } else {
          this.isValid = true;
          this.exclGrid = true;
        }

      }
    };
    readFile.readAsArrayBuffer(this.fileUploaded);
  }

  saveBulkUpload(): any {
    console.log("I AM THEREEEEEEEEEEEEEEE");
    const lmoPymntsArry = [];
    // let lmoIdsArry = [];
    const rte = `agent/lmo`;
    this.crdSrv.get(rte).subscribe((res) => {
      const lmoData = res['data'];

      for (let i = 0; i < this.ExclDta.length; i++) {
        for (let j = 0; j < lmoData.length; j++) {
          // tslint:disable-next-line:triple-equals
          if (this.ExclDta[i].lmo_cd == lmoData[j].agnt_cd) {
            lmoPymntsArry.push({
              agnt_id: lmoData[j].agnt_id,
              agnt_cd: this.ExclDta[i].lmo_cd,
              trsn_dt: this.ExclDta[i].Date.split('.').reverse().join('-'),
              trnsn_type_id: 6,
              trnsn_at: this.ExclDta[i].tot_amt,
              pymnt_mde_id: '',
              dd_nu: this.ExclDta[i].bank_ref_nu,
              cmnt_tx: '',
              upld_in: 1,
              tot_rcds: this.ttlRcds,
              bnkNm: ''
            });
          }
        }
      }

      if (this.ExclDta.length !==  lmoPymntsArry.length) {
        const lmo_diff_arry = [];
        const fnl_lmo_diff_arry = [];
        this.ExclDta.forEach(el1 => {
          const el1IsPresentInArr2 = lmoPymntsArry.some(el2 => el2.agnt_cd === el1.lmo_cd);
          if (!el1IsPresentInArr2) {
            lmo_diff_arry.push(el1);
          }
        });
        // console.log(lmo_diff_arry);
        for (let m = 0; m < lmo_diff_arry.length; m++){
          fnl_lmo_diff_arry.push(lmo_diff_arry[m].lmo_cd);
        }
        // console.log(fnl_lmo_diff_arry);
        if (lmo_diff_arry){
          const lstPopupData = {
            // tslint:disable-next-line:quotemark
            title: "The LMO codes mentioned doesn't match, please check" + "\n" + fnl_lmo_diff_arry,
            msg: '',
            icon: 'account_circle',
            btnLst: [{
              label: 'Ok',
              res: 'ok'
            }]
          };
          this.confirmMsgDialogRef = this.dialog.open(MessageDialogComponent, {
            width: '25%',
            panelClass: 'my-class',
            data: lstPopupData
          });
        }

        // this._snackBar.open('Please give correct LMO data in uploaded file', '', {
        //   duration: 4500,
        //   horizontalPosition: this.horizontalPosition,
        //   verticalPosition: this.verticalPosition,
        // });
      } 
      else {
        const noBnkRfnceNu = [];
        console.log(lmoPymntsArry);

        for (let i = 0; i < lmoPymntsArry.length; i++){
          if (lmoPymntsArry[i].dd_nu === undefined || lmoPymntsArry[i].dd_nu === ''){
            noBnkRfnceNu.push(lmoPymntsArry[i].agnt_cd);
          }
        }
    
        if (noBnkRfnceNu.length > 0){
          const bnlrefPopupData = {
            // tslint:disable-next-line:quotemark
            title: "Please enter the bank reference number for"  + "\n" + noBnkRfnceNu,
            msg: '',
            icon: 'account_circle',
            btnLst: [{
              label: 'Ok',
              res: 'ok'
            }]
          };
          this.confirmMsgDialogRef = this.dialog.open(MessageDialogComponent, {
            width: '25%',
            panelClass: 'my-class',
            data: bnlrefPopupData
          });
        }else{
          console.log(lmoPymntsArry);
          // return;
            this.postAgntPymnts(lmoPymntsArry);
        }
      }

    });
  }

  tabChangeFn(event): any {
    if (event.index === 1) {
      this.getLgnUsrUploads();
    } else if (event.index === 2) {
      this.getAllRcntUploads();
    }
  }

  getLgnUsrUploads(): any {
    this.updtsLdr = true;
    const rte = `billing/payments/user`;
    this.crdSrv.get(rte).subscribe((res) => {
      if (res['status'] === 200) {
        this.usrUpldPymntsLst = res['data'];
        this.updtsLdr = false;
        let ct = 0;
        // console.log(this.usrUpldPymntsLst);
        this.usrUpldPymntsLst.filter(p => {
          p['srno'] = ++ct;
        });
        if (res['perm']){
          this.permissions = res['perm'][0];
        } else{
          this.shwPermMsg = 'You do not have permissions to do this operation. Please contact Administrator to get permissions.';
        }
        this.usrUpldPymntsColumnDefs = [
          { headerName: 'S.No', field: 'srno', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 60, height: 40, columnFiltering: false },
          { headerName: 'LMO Name', field: 'agnt_nm', alignment: 'left', cellClass: 'pm-grid-number-cell', width: 200, height: 40, filter: true, columnFiltering: false },
          { headerName: 'LMO Code', field: 'agnt_cd', alignment: 'left', cellClass: 'pm-grid-number-cell', width: 200, height: 40, filter: true, columnFiltering: false },
          { headerName: 'Payment Mode', field: 'pymnt_mde_nm', alignment: 'left', cellClass: 'pm-grid-number-cell', width: 200, height: 40, filter: false, columnFiltering: true },
          { headerName: 'Bank Name', field: 'trnsn_bnk_nm', alignment: 'left', cellClass: 'pm-grid-number-cell', width: 200, height: 40, filter: true, columnFiltering: false },
          // tslint:disable-next-line:max-line-length
          { headerName: 'Transaction Amount', field: 'trnsn_at', type: 'currency', currency: 'INR', precision: '2', alignment: 'right', cellClass: 'pm-grid-number-cell', width: 200, height: 40, filter: true, columnFiltering: false },
          { headerName: 'Transaction Date', field: 'trsn_dt', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 200, height: 40, filter: true, columnFiltering: false },
          {
            headerName: 'Bank Reference Number', field: 'trns_ref_nu', alignment: 'left', cellClass: 'pm-grid-number-cell', width: 200,
            height: 40, filter: true, columnFiltering: false
          },
          {
            headerName: 'Comments', field: 'cmnt_tx', alignment: 'left', cellClass: 'pm-grid-number-cell', width: 200, height: 40,
            filter: true, columnFiltering: false
          },
        ];

      }
    }, (error) => {
      console.log(error);
    });
  }

  getAllRcntUploads(): any {
    this.rcntsLdr = true;
    const pymntData = {
      frmDt: this.agntPymntsForm.value.pymntFrmDt !== '' ? this.datePipe.transform(this.agntPymntsForm.value.pymntFrmDt, 'yyyy-MM-dd') : '',
      toDt: this.agntPymntsForm.value.pymntToDt !== '' ? this.datePipe.transform(this.agntPymntsForm.value.pymntToDt, 'yyyy-MM-dd') : '',
    };

    const rte = `billing/payments/recent`;
    this.crdSrv.create(pymntData, rte).subscribe((res) => {
      if (res['status'] === 200) {
        this.recentPymntsLst = res['data'];
        this.rcntsLdr = false;
        let ct = 0;
        // console.log(this.recentPymntsLst);
        this.recentPymntsLst.filter(p => {
          p['srno'] = ++ct;
        });
        this.recentPymntsColumnDefs = [
          { headerName: 'S.No', field: 'srno', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 60, height: 40, columnFiltering: false },
          { headerName: 'LMO Name', field: 'agnt_nm', alignment: 'left', cellClass: 'pm-grid-number-cell', width: 200, height: 40, filter: true, columnFiltering: false },
          { headerName: 'LMO Code', field: 'agnt_cd', alignment: 'left', cellClass: 'pm-grid-number-cell', width: 200, height: 40, filter: true, columnFiltering: false },
          { headerName: 'Payment Mode', field: 'pymnt_mde_nm', alignment: 'left', cellClass: 'pm-grid-number-cell', width: 200, height: 40, filter: false, columnFiltering: true },
          { headerName: 'Bank Name', field: 'trnsn_bnk_nm', alignment: 'left', cellClass: 'pm-grid-number-cell', width: 200, height: 40, filter: true, columnFiltering: false },
          { headerName: 'Transaction Amount', field: 'trnsn_at', type: 'currency', currency: 'INR', precision: '2', alignment: 'right', 
          cellClass: 'pm-grid-number-cell', width: 200, height: 40, filter: true, columnFiltering: false },
          { headerName: 'Transaction Date', field: 'trsn_dt', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 200, height: 40, filter: true, columnFiltering: false },
          {
            headerName: 'Bank Reference Number', field: 'trns_ref_nu', alignment: 'left', cellClass: 'pm-grid-number-cell', width: 200,
            height: 40, filter: true, columnFiltering: false
          },
          {
            headerName: 'Comments', field: 'cmnt_tx', alignment: 'left', cellClass: 'pm-grid-number-cell', width: 200, height: 40,
            filter: true, columnFiltering: false
          },
        ];

      }
    }, (error) => {
      console.log(error);
    });
  }
}
