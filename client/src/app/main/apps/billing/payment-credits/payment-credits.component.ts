import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { switchMap, debounceTime, tap, map, finalize } from 'rxjs/operators';
import { CrudService } from '../../crud.service';
import { ExportService } from 'app/main/services/export.service';
import * as XLSX from 'xlsx';
import { DatePipe } from '@angular/common';
import { MatSnackBar, MatSnackBarVerticalPosition, MatSnackBarHorizontalPosition } from '@angular/material';

@Component({
  selector: 'app-payment-credits',
  templateUrl: './payment-credits.component.html',
  styleUrls: ['./payment-credits.component.scss']
})
export class PaymentCreditsComponent implements OnInit {
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
  crdtTrnsnTypes = [];
  shwLdr = false;
  agntPymntsForm: FormGroup;
  loader:boolean;
  // tslint:disable-next-line:typedef
  getHeaderDtls = function () { return { 'title': 'Credits To LMO', 'icon': 'money' }; };
  shwPermMsg: string;
  
  
  

  constructor(private fb: FormBuilder, public crdSrv: CrudService, public excel: ExportService, public datePipe: DatePipe, private _snackBar: MatSnackBar) {
    // this.permissions = { 'slct_in': 1, 'insrt_in': 0, 'updt_in': 1, 'dlte_in': 1, 'exprt_in': 1 };
    // const permTxt = 'Payment Credits';
    // const prmeRte = `user/permissions/${permTxt}`;
    // this.crdSrv.get(prmeRte).subscribe((res) => {
    //   this.permissions = res['data'][0];
    // });
  }

  ngOnInit(): void {

    this.agntPymntsForm = this.fb.group({
      pymntFrmDt: [''],
      pymntToDt: ['']
    });

    this.lmoPymntsForm = this.fb.group({
      lmoCode: ['', Validators.required],
      pymntCrdtType: ['', Validators.required],
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
            if (value.length >= 3 || value.length != null) {
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


    this.getTrnsnTypes();
    this.getPymntMode();
    this.getLgnUsrUploads();
  }

  getTrnsnTypes(): void{
    const rte = `billing/payments/transaction/types`;
    this.crdSrv.get(rte).subscribe((res) => {
      if (res['status'] === 200) {
        const trnsnTypeLst = res['data'];
        for (let r = 0; r < trnsnTypeLst.length; r++){
          if (trnsnTypeLst[r].trnsn_ctgry_id === 1){
            this.crdtTrnsnTypes.push(trnsnTypeLst[r]);
          }
        }
      }
    });
  }
  getPymntMode(): void {
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
      if (res['status'] === 200) {
        this.agntPymntLst = res['data'];
      }
    });

    this.columnDefs = [
      { headerName: 'S.No', field: 'sno', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 60, height: 40 },
      { headerName: 'LMO Name', field: 'agnt_nm', alignment: 'left', cellClass: 'pm-grid-number-cell', width: 200, height: 40, filter: true },
      { headerName: 'LMO Code', field: 'agnt_cd', alignment: 'left', cellClass: 'pm-grid-number-cell', width: 200, height: 40, filter: true },
      { headerName: 'Payment Mode', field: 'pymnt_mde_nm', alignment: 'left', cellClass: 'pm-grid-number-cell', width: 200, height: 40, filter: true },
      // tslint:disable-next-line:max-line-length
      { headerName: 'Transaction Amount', field: 'trnsn_at', alignment: 'right', type: 'currency', currency: 'INR', precision: '2', cellClass: 'pm-grid-number-cell', width: 200, height: 40, filter: true },
      { headerName: 'Transaction Date', field: 'trsn_dt', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 200, height: 40, filter: true },
      // tslint:disable-next-line:max-line-length
      { headerName: 'Bank Name', visible: true, field: 'trnsn_bnk_nm', alignment: 'left', cellClass: 'pm-grid-number-cell', width: 200, height: 40, filter: true },
      // tslint:disable-next-line:max-line-length
      { headerName: 'Bank Reference Number', visible: false, field: 'trns_ref_nu', alignment: 'left', cellClass: 'pm-grid-number-cell', width: 200, height: 40, filter: true },
    ];
  }
  
  savePayments(): any {
    this.lmoPymntsForm.value.pymntDt = this.datePipe.transform(this.lmoPymntsForm.value.pymntDt, 'yyyy-MM-dd');
    const lmoPymntsArry = [];
    lmoPymntsArry.push({
      agnt_id: this.lmoPymntsForm.value.lmoCode.agnt_id,
      trsn_dt: this.lmoPymntsForm.value.pymntDt,
      trnsn_type_id: this.lmoPymntsForm.value.pymntCrdtType,
      pymnt_mde_id: this.lmoPymntsForm.value.pymntType,
      dd_nu: this.lmoPymntsForm.value.pymntRefNo,
      trnsn_at: this.lmoPymntsForm.value.amt,
      cmnt_tx: this.lmoPymntsForm.value.cmt,
      upld_in: 0,
      trnsn_bnk_nm: this.lmoPymntsForm.value.bnkNm,
      pymnt_crdt: true
    });
    this.postAgntPymnts(lmoPymntsArry);
  }

  postAgntPymnts(data): any {
    this.shwLdr = true;
    const rte = `billing/agent/payments`;
    this.crdSrv.create(data, rte).subscribe((res) => {
      if (res['status'] === 200) {
        this.shwLdr = false;
        this._snackBar.open('Payment Sucessfully Saved', '', {
          duration: 2000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
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
        'credit_type': 'OLT Credit',
        'bank_ref_nu': '7061820620001',
        'tot_amt': '1,000.00',
        'Date': '6/7/18'
      },
      {
        'sno': '2',
        'lmo_cd': 'LMO2189',
        'credit_type': 'APSFL Outage Credit',
        'bank_ref_nu': '7061821200004',
        'tot_amt': '6,650.00',
        'Date': '6/7/18'
      },
      {
        'sno': '3',
        'lmo_cd': 'LMO14994',
        'credit_type': 'Disputed Credit',
        'bank_ref_nu': '7061807780001',
        'tot_amt': '3,600.00',
        'Date': '6/7/18'
      },
      {
        'sno': '4',
        'lmo_cd': 'LMO11703',
        'credit_type': 'Box Issue Credit',
        'bank_ref_nu': '7061821200003',
        'tot_amt': '1,235.00',
        'Date': '6/7/18'
      },
      {
        'sno': '5',
        'lmo_cd': 'LMO13651',
        'credit_type': 'Discount to Customers',
        'bank_ref_nu': '7061823610001',
        'tot_amt': '1,500.00',
        'Date': '6/7/18'
      },
      {
        'sno': '6',
        'lmo_cd': 'LMO275',
        'credit_type': 'Discount to Customers',
        'bank_ref_nu': '7061801750001',
        'tot_amt': '3,500.00',
        'Date': '6/7/18'
      },
      {
        'sno': '7',
        'lmo_cd': 'LMO1758',
        'credit_type': 'Wallet Credit Adjustment',
        'bank_ref_nu': '7061821200002',
        'tot_amt': '5,000.00',
        'Date': '6/7/18'
      },
      {
        'sno': '8',
        'lmo_cd': 'LMO2455',
        'credit_type': 'Wallet Initial Credit',
        'bank_ref_nu': '7061823810001',
        'tot_amt': '4,000.00',
        'Date': '6/7/18'
      },
      {
        'sno': '9',
        'lmo_cd': 'LMO8656',
        'credit_type': 'Wallet Initial Credit',
        'bank_ref_nu': '7061802030001',
        'tot_amt': '4,000.00',
        'Date': '6/7/18'
      },
      {
        'sno': '10',
        'lmo_cd': 'LMO12960',
        'credit_type': 'APSFL LMO Insentive',
        'bank_ref_nu': '7061803080003',
        'tot_amt': '10,000.00',
        'Date': '6/7/18'
      }];
    this.excel.exportAsExcelFile(this.exceldDatasoure, 'payment-credits');
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
      for (let i = 0; i !== data.length; ++i) { arr[i] = String.fromCharCode(data[i]); }
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
        { headerName: 'Credit Type', field: 'credit_type', alignment: 'left', cellClass: 'pm-grid-number-cell', width: 200, height: 40, filter: true },
        { headerName: 'Bank', field: 'bank_ref_nu', alignment: 'left', cellClass: 'pm-grid-number-cell', width: 200, height: 40, filter: true },
        { headerName: 'Amount', field: 'tot_amt', alignment: 'left', cellClass: 'pm-grid-number-cell', width: 200, height: 40, filter: true },
        { headerName: 'Date', field: 'Date', alignment: 'left', cellClass: 'pm-grid-number-cell', width: 200, height: 40, filter: true },

      ];

      console.log(this.ExclDta);

      if (this.ExclDta.length === 0) { this.isValid = false; }
      this.ttlRcds = this.ExclDta.length;

      for (let i = 0; i < this.ExclDta.length; i++) {
        if (typeof this.ExclDta[i]['lmo_cd'] !== 'number'
        && typeof this.ExclDta[i]['credit_type'] == 'undefined' && this.ExclDta[i].hasOwnProperty('credit_type') == false
          && typeof this.ExclDta[i]['bank_ref_nu'] == 'string'
          && typeof this.ExclDta[i]['tot_amt'] !== 'number'
          && typeof this.ExclDta[i]['Date'] == 'string') {
          this.isValid = false;
          this.exclGrid = false;
          break;
        } else {
          console.log('in else');
          this.isValid = true;
          this.exclGrid = true;
        }

      }
    };
    readFile.readAsArrayBuffer(this.fileUploaded);
  }

  saveBulkUpload(): any {
    const lmoPymntsArry = [];
    // let lmoIdsArry = [];
    this.shwLdr = true;
    const rte = `agent/lmo`;
    this.crdSrv.get(rte).subscribe((res) => {
      const lmoData = res['data'];

      for (let i = 0; i < this.ExclDta.length; i++) {
        for (let j = 0; j < lmoData.length; j++) {
            if (this.ExclDta[i].lmo_cd === lmoData[j].agnt_cd) {
                lmoPymntsArry.push({
                  agnt_id: lmoData[j].agnt_id,
                  agnt_cd: this.ExclDta[i].lmo_cd,
                  trsn_dt: this.ExclDta[i].Date.split('/').reverse().join('-'),
                  trnsn_type_nm: this.ExclDta[i].credit_type,
                  trnsn_at: (this.ExclDta[i].tot_amt).replace(/\,/g, ''),
                  pymnt_mde_id: '',
                  dd_nu: this.ExclDta[i].bank_ref_nu,
                  cmnt_tx: '',
                  upld_in: 1,
                  tot_rcds: this.ttlRcds,
                  bnkNm: '',
                  pymnt_crdt: true
                });
            }
        }
      }

      if (this.ExclDta.length !== lmoPymntsArry.length) {
        this._snackBar.open('Please give correct LMO data in uploaded file', '', {
          duration: 3500,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
      } else {
        const wrongCrdtTrnsTypes = [];
        for (let t = 0; t < lmoPymntsArry.length; t++){
          for (let r = 0; r < this.crdtTrnsnTypes.length; r++){
            if ((lmoPymntsArry[t].trnsn_type_nm).toLowerCase() === (this.crdtTrnsnTypes[r].trnsn_type_nm).toLowerCase()){
              lmoPymntsArry[t]['trnsn_type_id'] = this.crdtTrnsnTypes[r].trnsn_type_id;
            }
          }
        }
        
        for (let y = 0; y < lmoPymntsArry.length; y++){
          if (!lmoPymntsArry[y].trnsn_type_id){
            wrongCrdtTrnsTypes.push(lmoPymntsArry[y]);
          }
        }

        if (wrongCrdtTrnsTypes.length !== 0){
          this._snackBar.open('Please give valid credit types', '', {
              duration: 3500,
              horizontalPosition: this.horizontalPosition,
              verticalPosition: this.verticalPosition,
            });
        }
        this.shwLdr = false;
        this.postAgntPymnts(lmoPymntsArry);
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
    this.loader = true;
    const rte = `billing/payments/credits/user`;
    this.crdSrv.get(rte).subscribe((res) => {
      if (res['status'] === 200) {
        this.loader = false;
        this.usrUpldPymntsLst = res['data'];
        if (res['perm']){
          this.permissions = res['perm'][0];
        } else{
          this.shwPermMsg = 'You do not have permissions to do this operation. Please contact Administrator to get permissions.';
        }
        this.usrUpldPymntsColumnDefs = [
          { headerName: 'S.No', field: 'sno', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 60, height: 40, filter: false, columnFiltering: false },
          { headerName: 'LMO Name', field: 'agnt_nm', alignment: 'left', cellClass: 'pm-grid-number-cell', width: 200, height: 40, filter: true, columnFiltering: false },
          { headerName: 'LMO Code', field: 'agnt_cd', alignment: 'left', cellClass: 'pm-grid-number-cell', width: 200, height: 40, filter: true, columnFiltering: false },
          { headerName: 'Payment Mode', field: 'pymnt_mde_nm', alignment: 'left', cellClass: 'pm-grid-number-cell', width: 200, height: 40, filter: false, columnFiltering: true },
          { headerName: 'Bank Name', field: 'trnsn_bnk_nm', alignment: 'left', cellClass: 'pm-grid-number-cell', width: 200, height: 40, filter: true, columnFiltering: false },
          { headerName: 'Transaction Amount', field: 'trnsn_at', alignment: 'right', type: 'currency', currency: 'INR', precision: '2', 
          cellClass: 'pm-grid-number-cell', width: 200, height: 40, filter: true , columnFiltering: false},
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

    const pymntData = {
      frmDt: this.agntPymntsForm.value.pymntFrmDt !== '' ? this.datePipe.transform(this.agntPymntsForm.value.pymntFrmDt, 'yyyy-MM-dd') : '',
      toDt: this.agntPymntsForm.value.pymntToDt !== '' ? this.datePipe.transform(this.agntPymntsForm.value.pymntToDt, 'yyyy-MM-dd') : '',
    };
    this.loader=true;
    const rte = `billing/payments/credits/recent`;
    this.crdSrv.create(pymntData, rte).subscribe((res) => {
      if (res['status'] === 200) {
        this.loader=false;
        this.recentPymntsLst = res['data'];

        this.recentPymntsColumnDefs = [
          { headerName: 'S.No', field: 'sno', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 60, height: 40, filter: false, columnFiltering: false },
          { headerName: 'LMO Name', field: 'agnt_nm', alignment: 'left', cellClass: 'pm-grid-number-cell', width: 200, height: 40, filter: true, columnFiltering: false },
          { headerName: 'LMO Code', field: 'agnt_cd', alignment: 'left', cellClass: 'pm-grid-number-cell', width: 200, height: 40, filter: true, columnFiltering: false },
          { headerName: 'Payment Mode', field: 'pymnt_mde_nm', alignment: 'left', cellClass: 'pm-grid-number-cell', width: 200, height: 40, filter: false, columnFiltering: true },
          { headerName: 'Bank Name', field: 'trnsn_bnk_nm', alignment: 'left', cellClass: 'pm-grid-number-cell', width: 200, height: 40, filter: true, columnFiltering: false },
          { headerName: 'Transaction Amount', field: 'trnsn_at', alignment: 'right', type: 'currency', currency: 'INR', precision: '2', 
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
