import { Component, OnInit } from '@angular/core';
import * as XLSX from 'xlsx';
import { CrudService } from '../../crud.service';
import { FormControl, FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material';
import { debounceTime, tap, switchMap, finalize } from 'rxjs/operators';
import { DatePipe } from '@angular/common';
import { ExportService } from 'app/main/services/export.service';
// import moment from 'moment';
const moment = require('moment');
@Component({
  selector: 'app-bank-statement-upload',
  templateUrl: './bank-statement-upload.component.html',
  styleUrls: ['./bank-statement-upload.component.scss']
})
export class BankStatementUploadComponent implements OnInit {
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  fileUploaded: any;
  upldFileNm: any;
  storeData: any;
  worksheet: XLSX.WorkSheet;
  ExclDta = [];
  ttlRcds: number;
  pymntDtlsColumnDefs = [];
  pymntWthOutLmoDtlsColumnDefs = [];
  exclUpld = false;
  lmoPymntsForm: FormGroup;
  pymntDtlDataSource: any;
  pymntWthOutLmoDtlDataSource: any;
  totpymntDtlRcds: number;
  filteredAgents;
  errorMsg: string;
  isLoading: boolean;
  dsbleSbmt: boolean;
  dsbleSbmt1: boolean;
  toBeInstrdWthLmo: any;
  instrdWthLmo: any;
  toBeInstrdWthOutLmo = [];
  instrdWthOutLmo = [];
  showLdr = false;
  instrdWthLmoColumnDefs = [];
  toBeInstrdWthLmoColumnDefs;
  allAgntsData: any;
  uploadedLmoData = [];
  isValid: boolean;
  bnkStmtPymntForm: FormGroup;
  bnkStmtPymntsByUsrLst;
  bnkStmtPymntsByUsrLstColumnDefs;
  recentbnkStmtPymntsLst;
  recentbnkStmtPymntsColumnDefs;
  permissions;
  loader: boolean;
  exceldDatasoure;
  shwPermMsg: string;
  // tslint:disable-next-line:typedef
  getHeaderDtls = function () { return { 'title': 'Bank Statement Upload', 'icon': 'money' }; };

  constructor(public crdSrv: CrudService, private _snackBar: MatSnackBar, private fb: FormBuilder, public datePipe: DatePipe, public excel: ExportService) { 
    // this.permissions = { 'slct_in': 1, 'insrt_in': 0, 'updt_in': 1, 'dlte_in': 1, 'exprt_in': 0 };
    // const permTxt = 'Payments to APSFL';
    // const prmeRte = `user/permissions/${permTxt}`;
    // this.crdSrv.get(prmeRte).subscribe((res) => {
    //   // console.log(res['data'][0]);
    //   this.permissions = res['data'][0];
    // });
  }

  // tslint:disable-next-line:typedef
  ngOnInit() {

    this.bnkStmtPymntForm = this.fb.group({
      bnkStmtPymntFrmDt: [''],
      bnkStmtPymntToDt: ['']
    });

    this.lmoPymntsForm = this.fb.group({
      // lmoCode: [''],
      lmoCode: this.fb.array([this.fb.group(
        {
          trns_ctgry: '', lmo_nm: '', tot_amt: '', Date: '', ref_nu: '', mble_nu: '', lmo_cd: '', tot_trnsn_dta: ''
        })])
    });

    this.lmoPymntsForm.valueChanges
      .debounceTime(200).pipe(
        debounceTime(500),
        tap(() => {
          this.errorMsg = '';
          this.filteredAgents = [];
          this.isLoading = true;
        }),
        switchMap((value) => {
          if (value) {
            for (let i = 0; i < value.lmoCode.length; i++) {
              if (value.lmoCode[i].lmo_cd !== '') {

                if (value.lmoCode[i].lmo_cd.length >= 3 || value.lmoCode[i].lmo_cd.length != null) {
                  return this.crdSrv.get('agent/getAgentBySearch/' + value.lmoCode[i].lmo_cd)
                    .pipe(
                      finalize(() => {
                        this.isLoading = false;
                      }),
                    );
                }
              }
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
      this.getLgnUsrUploads();
  }


  tabChangeFn(event): void {
    if (event.index === 1) {
      this.getLgnUsrUploads();
    } else if (event.index === 2) {
      this.getAllRcntUploads();
    }
  }

  getLgnUsrUploads(): void {
    this.loader = true;
    if (this.permissions == undefined){
      this.loader = false;
    }
    const rte = `billing/bank/statement/payments/user`;
    this.crdSrv.get(rte).subscribe((res) => {
      if (res['status'] === 200) {
        this.loader=false;
        let ct = 0;
        this.bnkStmtPymntsByUsrLst = res['data'];
        this.bnkStmtPymntsByUsrLst.filter((k) => {
          k['sno'] = ++ct;
        });
        if (res['perm']){
          this.permissions = res['perm'][0];
        } else{
          this.shwPermMsg = 'You do not have permissions to do this operation. Please contact Administrator to get permissions.';
        }
        // console.log(this.bnkStmtPymntsByUsrLst);
        this.bnkStmtPymntsByUsrLstColumnDefs = [
          { headerName: 'S.No', field: 'sno', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 60, height: 40, columnFiltering: false },
          { headerName: 'LMO Code', field: 'agnt_cd', alignment: 'left', cellClass: 'pm-grid-number-cell', width: 200, height: 40, filter: true, columnFiltering: false },
          { headerName: 'LMO Name', field: 'agnt_nm', alignment: 'left', cellClass: 'pm-grid-number-cell', width: 200, height: 40, filter: true, columnFiltering: false },
          { headerName: 'Transaction Type', field: 'trnsn_type_nm', alignment: 'left', cellClass: 'pm-grid-number-cell', width: 200, height: 40, 
          filter: true, columnFiltering: false },
          { headerName: 'Payment Mode', field: 'pymnt_mde_nm', alignment: 'left', cellClass: 'pm-grid-number-cell', width: 200, height: 40, filter: false, columnFiltering: true },
          { headerName: 'Transaction Date', field: 'trsn_dt', alignment: 'left', cellClass: 'pm-grid-number-cell', width: 200, height: 40, filter: true, columnFiltering: false },
          { headerName: 'Transaction Reference No', field: 'trns_ref_nu', alignment: 'left', 
            cellClass: 'pm-grid-number-cell', width: 200, height: 40, filter: true, columnFiltering: false },
          { headerName: 'Transaction Amount', ffield: 'trnsn_at', alignment: 'right', type: 'currency', currency: 'INR', precision: '2',
            cellClass: 'pm-grid-number-cell', width: 200, height: 40, filter: true, columnFiltering: false }
        ];
      }
    });
  }

  getAllRcntUploads(): void {

    const bnkStmtPymntsData = {
      frmDt: this.bnkStmtPymntForm.value.bnkStmtPymntFrmDt !== '' ? this.datePipe.transform(this.bnkStmtPymntForm.value.bnkStmtPymntFrmDt, 'yyyy-MM-dd') : '',
      toDt: this.bnkStmtPymntForm.value.bnkStmtPymntToDt !== '' ? this.datePipe.transform(this.bnkStmtPymntForm.value.bnkStmtPymntToDt, 'yyyy-MM-dd') : '',
    };
    this.loader=true;
    const rte = `billing/bank/statement/payments/recent`;
    this.crdSrv.create(bnkStmtPymntsData, rte).subscribe((res) => {
      if (res['status'] === 200) {
        this.loader=false;
        let ct = 0;
        this.recentbnkStmtPymntsLst = res['data'];
        this.recentbnkStmtPymntsLst.filter((k) => {
          k['sno'] = ++ct;
        });
        // console.log(this.recentbnkStmtPymntsLst);
        this.recentbnkStmtPymntsColumnDefs = [
          { headerName: 'S.No', field: 'sno', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 60, height: 40, columnFiltering: false },
          { headerName: 'LMO Code', field: 'agnt_cd', alignment: 'left', cellClass: 'pm-grid-number-cell', width: 200, height: 40, filter: true, columnFiltering: false },
          { headerName: 'LMO Name', field: 'agnt_nm', alignment: 'left', cellClass: 'pm-grid-number-cell', width: 200, height: 40, filter: true, columnFiltering: false },
          { headerName: 'Transaction Type', field: 'trnsn_type_nm', alignment: 'left', cellClass: 'pm-grid-number-cell', width: 200, height: 40, 
          filter: true, columnFiltering: false },
          { headerName: 'Payment Mode', field: 'pymnt_mde_nm', alignment: 'left', cellClass: 'pm-grid-number-cell', width: 200, height: 40, filter: false, columnFiltering: true },
          { headerName: 'Transaction Date', field: 'trsn_dt', alignment: 'left', cellClass: 'pm-grid-number-cell', width: 200, height: 40, filter: true, columnFiltering: false },
          { headerName: 'Transaction Reference No', field: 'trns_ref_nu', alignment: 'left', 
            cellClass: 'pm-grid-number-cell', width: 200, height: 40, filter: true, columnFiltering: false },
          { headerName: 'Transaction Amount', ffield: 'trnsn_at', alignment: 'right', type: 'currency', currency: 'INR', precision: '2',
            cellClass: 'pm-grid-number-cell', width: 200, height: 40, filter: true, columnFiltering: false },
          { headerName: 'Uploaded By', field: 'fst_nm', alignment: 'left', 
          cellClass: 'pm-grid-number-cell', width: 200, height: 40, filter: true, columnFiltering: false },
          { headerName: 'Uploaded TimeStamp', field: 'upld_ts', alignment: 'left', 
          cellClass: 'pm-grid-number-cell', width: 200, height: 40, filter: true , columnFiltering: false}
        ];
      }
    });
  }

  get agntFm(): any {
    return this.lmoPymntsForm.get('lmoCode') as FormArray;
  }
  // addLmoCds() {
  //   this.agntFm.push(this.fb.group({ lmo_cd: ''}));
  // }

  onValueChanged(data): any {
    for (let i = 0; i < data.lmoCode.length; i++) {
      if (data.lmoCode[i].lmo_cd !== '') {
        data.lmoCode.debounceTime(200).pipe(
          debounceTime(500),
          tap(() => {
            this.errorMsg = '';
            this.filteredAgents = [];
            this.isLoading = true;
          }),
          switchMap((value) => {
            if (value) {
              if (value >= 3 || value != null) {
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
          .subscribe(data1 => {
            if (data1['data'] === undefined) {
              this.errorMsg = data['Error'];
              this.filteredAgents = [];
            } else {
              this.errorMsg = '';
              this.filteredAgents = data1['data'];
            }
          });
      }
    }
    this.dsbleSbmt1 = false;
  }
  // get agntFm() {
  //   return this.lmoPymntsForm.get('lmoCode') as FormArray;
  // }

  displayFn(agent): any {
    if (agent) { return agent.agnt_nm + ' ' + '|' + ' ' + agent.agnt_cd; }
  }

  uploadedExclFile(event): any {
    if (event.target) {
      this.fileUploaded = event.target.files[0];
    } else {
      this.fileUploaded = event;
    }

    this.upldFileNm = this.fileUploaded.name;
    this.readUpldExcel();
    // this.shwrcds = true;
    // this.lmoPymntsForm.reset();
    // this.lmoSlctd = false;
  }
  readUpldExcel(): any {
    this.isValid = true;
    this.showLdr = true;
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

      const pymntDtls = [];
      const pymntWthOutLmoDtls = [];
      this.uploadedLmoData = [];

      for (let i = 0; i < this.ExclDta.length; i++) {
        if (!this.ExclDta[i]['Transaction Description']) {

          this.isValid = false;
          this.showLdr = false;
          return;

        } else if (this.ExclDta[i]['Transaction Description'].substring(0, 3) === 'UPI') {

          const trnsDsp = this.ExclDta[i]['Transaction Description'].split('/');
          

          pymntWthOutLmoDtls.push({
            'trns_ctgry': trnsDsp[0], 'lmo_nm': trnsDsp[3], 'ref_nu': trnsDsp[1], 'mble_nu': trnsDsp[5], 'tot_amt': this.ExclDta[i]['Credit (Rs.)'],
            'Date': this.ExclDta[i]['Tran Date'], 'tot_trnsn_dta': this.ExclDta[i]['Transaction Description']
          });

        } else if (this.ExclDta[i]['Transaction Description'].substring(0, 4) === 'IMPS') {

          const trnsDsp = this.ExclDta[i]['Transaction Description'].split('/');

          pymntWthOutLmoDtls.push({
            'trns_ctgry': trnsDsp[0], 'lmo_nm': trnsDsp[3], 'ref_nu': trnsDsp[1], 'mble_nu': trnsDsp[2], 'tot_amt': this.ExclDta[i]['Credit (Rs.)'],
            'Date': this.ExclDta[i]['Tran Date'], 'tot_trnsn_dta': this.ExclDta[i]['Transaction Description']
          });

        } else if (this.ExclDta[i]['Transaction Description'].substring(0, 4) === 'NEFT') {

          const trnsDsp = this.ExclDta[i]['Transaction Description'].split('/');

          pymntWthOutLmoDtls.push({
            'trns_ctgry': trnsDsp[0], 'lmo_nm': trnsDsp[1], 'tot_amt': this.ExclDta[i]['Credit (Rs.)'],
            'Date': this.ExclDta[i]['Tran Date'], 'tot_trnsn_dta': this.ExclDta[i]['Transaction Description']
          });

        } else if (this.ExclDta[i]['Transaction Description'].substring(0, 4) === 'APSF') {

          const trnsDsp = this.ExclDta[i]['Transaction Description'].split(',');
          // console.log(trnsDsp);

          pymntDtls.push({
            'trns_ctgry': trnsDsp[0], 'lmo_cd': trnsDsp[1].substring(9, 20), 'bank_ref_nu': trnsDsp[2].substring(8, 25),
            'tot_amt': this.ExclDta[i]['Credit (Rs.)'], 'Date': this.ExclDta[i]['Tran Date'], 'tot_trnsn_dta': this.ExclDta[i]['Transaction Description']
          });
        }
      }
      this.ttlRcds = this.ExclDta.length;
      this.totpymntDtlRcds = pymntDtls.length;

      this.pymntDtlDataSource = pymntDtls;

      this.lmoPymntsForm.setControl('lmoCode', new FormArray([]));

      const chkTrnsnData = {
        pymntDtls: pymntDtls,
        pymntWthOutLmoDtls: pymntWthOutLmoDtls
      };
      this.getAgntIds(chkTrnsnData);
    };
    readFile.readAsArrayBuffer(this.fileUploaded);
  }

  getAgntIds(data): any {
    const rte = `agent/lmo`;
    this.crdSrv.get(rte).subscribe((res) => {

      const lmoData = res['data'];
      this.allAgntsData = res['data'];
      const lmoPymntsArry = [];
      const pymntsWthOtLmoArry = [];

      // console.log(data.pymntDtls);
      for (let i = 0; i < data.pymntDtls.length; i++) {
        for (let j = 0; j < lmoData.length; j++) {
          if (data.pymntDtls[i].lmo_cd === lmoData[j].agnt_cd) {
            lmoPymntsArry.push({
              agnt_id: lmoData[j].agnt_id,
              agnt_cd: data.pymntDtls[i].lmo_cd,
              trsn_dt: data.pymntDtls[i].Date.split('/').reverse().join('-'),
              frmtd_trsn_dt: data.pymntDtls[i].Date.split('/').join('-'),
              trnsn_type_id: 6,
              trnsn_at: data.pymntDtls[i].tot_amt.split(',').join(''),
              pymnt_mde_id: '',
              dd_nu: data.pymntDtls[i].bank_ref_nu,
              cmnt_tx: '',
              upld_in: 1,
              tot_rcds: this.totpymntDtlRcds,
              bnkNm: ''
            });
          }
        }
      }

      for (let i = 0; i < data.pymntWthOutLmoDtls.length; i++) {
        pymntsWthOtLmoArry.push({
          agnt_nm: data.pymntWthOutLmoDtls[i].lmo_nm,
          trsn_dt: data.pymntWthOutLmoDtls[i].Date.split('/').reverse().join('-'),
          snd_trnsn_dt: data.pymntWthOutLmoDtls[i].Date.split('/').join('-'),
          trnsn_type_id: 6,
          trnsn_at: data.pymntWthOutLmoDtls[i].tot_amt.split(',').join(''),
          pymnt_mde_id: '',
          dd_nu: data.pymntWthOutLmoDtls[i].ref_nu,
          mble_nu: data.pymntWthOutLmoDtls[i].mble_nu ? data.pymntWthOutLmoDtls[i].mble_nu : '',
          cmnt_tx: '',
          trnsn_tx: data.pymntWthOutLmoDtls[i].tot_trnsn_dta
        });
      }
      const chkTrnsnData = {
        pymntDtls: lmoPymntsArry,
        pymntWthOutLmoDtls: pymntsWthOtLmoArry
      };
      // console.log(chkTrnsnData);
      // return;
      this.getTrnsnToUpload(chkTrnsnData);
    });
  }

  getTrnsnToUpload(data): any {
    const rte = `billing/agent/transaction/check`;
    this.crdSrv.create(data, rte).subscribe((res) => {
      this.exclUpld = true;
      this.showLdr = false;
      this.uploadedLmoData = [];
      this.toBeInstrdWthLmo = [];

      this.lmoPymntsForm.setControl('lmoCode', new FormArray([]));
      this.toBeInstrdWthLmo = res['data'].toBeInstrdWthLmo;
      this.instrdWthLmo = res['data'].instrdWthLmo;

      


      this.toBeInstrdWthLmoColumnDefs = [
        { headerName: 'Transact By', field: 'Pay Bill', alignment: 'left', cellClass: 'pm-grid-number-cell', width: 100, height: 40 },
        { headerName: 'LMO Code', field: 'agnt_cd', alignment: 'left', cellClass: 'pm-grid-number-cell', width: 200, height: 40, filter: true },
        { headerName: 'Reference Number', field: 'dd_nu', alignment: 'left', cellClass: 'pm-grid-number-cell', width: 200, height: 40, filter: true },
        { headerName: 'Amount', field: 'trnsn_at', alignment: 'right', type: 'currency', currency: 'INR', precision: '2', 
        cellClass: 'pm-grid-number-cell', width: 200, height: 40, filter: true },
        { headerName: 'Date', field: 'frmtd_trsn_dt', alignment: 'left', cellClass: 'pm-grid-number-cell', width: 200, height: 40, filter: true },
      ];




      // this.toBeInstrdWthOutLmo = res['data'].toBeInstrdWthOutLmo;
      this.instrdWthOutLmo = res['data'].instrdWthOutLmo;

      // console.log(this.instrdWthOutLmo);
      // console.log(this.toBeInstrdWthLmo);
      
      // console.log(this.instrdWthLmo);

      if (res['data'].fnlAlrdyInstrdWthOutLmo.length !== 0) {
        for (let m = 0; m < res['data'].fnlAlrdyInstrdWthOutLmo.length; m++) {
          // if (res['data'].fnlAlrdyInstrdWthOutLmo.agnt_id){
          this.instrdWthLmo.push({
            agnt_id: res['data'].fnlAlrdyInstrdWthOutLmo[m].agnt_id,
            agnt_cd: res['data'].fnlAlrdyInstrdWthOutLmo[m].lmo_cd,
            trnsn_at: res['data'].fnlAlrdyInstrdWthOutLmo[m].trnsn_at,
            agnt_nm: res['data'].fnlAlrdyInstrdWthOutLmo[m].agnt_nm,
            mble_nu: res['data'].fnlAlrdyInstrdWthOutLmo[m].mble_nu,
            trnsn_type_id: 6,
            pymnt_mde_id: '',
            trsn_dt: res['data'].fnlAlrdyInstrdWthOutLmo[m].trsn_dt,
            trns_ref_nu: res['data'].fnlAlrdyInstrdWthOutLmo[m].trns_ref_nu,
            frmtd_trsn_dt: res['data'].fnlAlrdyInstrdWthOutLmo[m].snd_trnsn_dt ? res['data'].fnlAlrdyInstrdWthOutLmo[m].snd_trnsn_dt :
              (res['data'].fnlAlrdyInstrdWthOutLmo[m].trsn_dt).split('-').reverse().join('-'),
            cmnt_tx: '',
            trnsn_tx: res['data'].fnlAlrdyInstrdWthOutLmo[m].trnsn_tx,
          });
          // }
        }
      }

      for (let p = 0; p < this.instrdWthLmo.length; p++) {
        for (let q = 0; q < this.allAgntsData.length; q++) {
          if (this.instrdWthLmo[p].agnt_id === this.allAgntsData[q].agnt_id) {
            this.uploadedLmoData.push({
              agnt_id: this.instrdWthLmo[p].agnt_id,
              agnt_cd: this.allAgntsData[q].agnt_cd,
              trsn_dt: this.instrdWthLmo[p].frmtd_trsn_dt,
              trnsn_type_id: 6,
              trnsn_at: this.instrdWthLmo[p].trnsn_at,
              pymnt_mde_id: '',
              trns_ref_nu: this.instrdWthLmo[p].trns_ref_nu
            });
          }
        }
      }

      if (this.instrdWthOutLmo.length === 0) {
        this.instrdWthOutLmo = res['data'].fnlToBeInstrdWthOutLmo;
      }

      this.instrdWthLmoColumnDefs = [
        // { headerName: 'Transact By', field: 'Pay Bill', alignment: 'left', cellClass: 'pm-grid-number-cell', width: 100, height: 40 },
        { headerName: 'LMO Code', field: 'agnt_cd', alignment: 'left', cellClass: 'pm-grid-number-cell', width: 200, height: 40, filter: true },
        { headerName: 'Bank', field: 'trns_ref_nu', alignment: 'left', cellClass: 'pm-grid-number-cell', width: 200, height: 40, filter: true },
        { headerName: 'Amount', field: 'trnsn_at', alignment: 'right', type: 'currency', currency: 'INR', precision: '2' ,
        cellClass: 'pm-grid-number-cell', width: 200, height: 40, filter: true },
        { headerName: 'Date', field: 'trsn_dt', alignment: 'left', cellClass: 'pm-grid-number-cell', width: 200, height: 40, filter: true },
      ];

     

      // console.log(this.instrdWthOutLmo);

      for (let c = 0; c < this.instrdWthOutLmo.length; c++) {
        const trnsDsp = this.instrdWthOutLmo[c]['trnsn_tx'].split('/');
        this.agntFm.push(this.fb.group({
          trns_ctgry: trnsDsp[0],
          lmo_nm: this.instrdWthOutLmo[c].agnt_nm,
          tot_amt: this.instrdWthOutLmo[c].trnsn_at,
          Date: this.instrdWthOutLmo[c].frmtd_trsn_dt ? this.instrdWthOutLmo[c].frmtd_trsn_dt : this.instrdWthOutLmo[c].snd_trnsn_dt,
          trsn_dt: this.instrdWthOutLmo[c].trsn_dt,
          ref_nu: this.instrdWthOutLmo[c].trns_ref_nu ? this.instrdWthOutLmo[c].trns_ref_nu : this.instrdWthOutLmo[c].dd_nu,
          mble_nu: this.instrdWthOutLmo[c].mble_nu,
          tot_trnsn_dta: this.instrdWthOutLmo[c].tot_trnsn_dta,
          trnsn_tx: this.instrdWthOutLmo[c].trnsn_tx,
          lmo_cd: ''
        }));
      }
    });
  }

  saveBulkUpload(): any {
    const lmoPymntsArry = [];
    // let lmoIdsArry = [];
    const rte = `agent/lmo`;
    this.crdSrv.get(rte).subscribe((res) => {
      const lmoData = res['data'];

      console.log(this.pymntDtlDataSource);
      console.log(lmoData);

      for (let i = 0; i < this.pymntDtlDataSource.length; i++) {
        for (let j = 0; j < lmoData.length; j++) {
         
          if (this.pymntDtlDataSource[i].lmo_cd == lmoData[j].agnt_cd) {
            console.log(this.pymntDtlDataSource[i].lmo_cd, lmoData[j].agnt_cd);
            const trnsDsp = this.pymntDtlDataSource[i].tot_trnsn_dta.split(',');

            lmoPymntsArry.push({
              agnt_id: lmoData[j].agnt_id,
              agnt_cd: this.pymntDtlDataSource[i].lmo_cd,
              trsn_dt: this.pymntDtlDataSource[i].Date.split('/').reverse().join('-'),
              trnsn_type_id: 6,
              trnsn_at: this.pymntDtlDataSource[i].tot_amt.split(',').join(''),
              pymnt_mde_id: trnsDsp[0] === 'APSFL' ? 1 : 1,
              dd_nu: this.pymntDtlDataSource[i].bank_ref_nu,
              cmnt_tx: '',
              upld_in: 1,
              tot_rcds: this.totpymntDtlRcds,
              trnsn_bnk_nm: '',
              trnsn_tx: this.pymntDtlDataSource[i].tot_trnsn_dta,
            });
          }
        }
      }

      console.log(this.pymntDtlDataSource);
      console.log(lmoPymntsArry);

      // if (this.pymntDtlDataSource.length !== lmoPymntsArry.length) {
      //   this._snackBar.open('Please give correct LMO data in uploaded file', '', {
      //     duration: 3500,
      //     horizontalPosition: this.horizontalPosition,
      //     verticalPosition: this.verticalPosition,
      //   });
      // } else {
      //   console.log(lmoPymntsArry);
      //   return;
        this.postAgntPymnts(lmoPymntsArry);
      // }

    });
  }

  saveBulkUploadWthOutLmo(): any {

    const pymntsWthOtLmoArry = [];
    const pymntsAdedLmoArry = [];

    
    for (let i = 0; i < this.lmoPymntsForm.value.lmoCode.length; i++) {
      if (this.lmoPymntsForm.value.lmoCode[i].lmo_cd !== '') {

        const trnsDsp = this.lmoPymntsForm.value.lmoCode[i].trnsn_tx.split('/');

        pymntsAdedLmoArry.push({
          agnt_nm: this.lmoPymntsForm.value.lmoCode[i].lmo_nm,
          trsn_dt: this.datePipe.transform(this.lmoPymntsForm.value.lmoCode[i].trsn_dt, 'yyyy-MM-dd'),
          trnsn_type_id: 6,
          trnsn_at: this.lmoPymntsForm.value.lmoCode[i].tot_amt,
          pymnt_mde_id: trnsDsp[0] === 'NEFT' ? 3 : trnsDsp[0] === 'UPI' ? 9 : trnsDsp[0] === 'IMPS' ? 4 : 1,
          dd_nu: this.lmoPymntsForm.value.lmoCode[i].ref_nu === null ? '' : this.lmoPymntsForm.value.lmoCode[i].ref_nu,
          mble_nu: this.lmoPymntsForm.value.lmoCode[i].mble_nu ? this.lmoPymntsForm.value.lmoCode[i].mble_nu : '',
          cmnt_tx: '',
          agnt_id: this.lmoPymntsForm.value.lmoCode[i].lmo_cd.agnt_id,
          upld_in: 1,
          tot_rcds: this.lmoPymntsForm.value.lmoCode.length,
          trnsn_tx: this.lmoPymntsForm.value.lmoCode[i].trnsn_tx,
          trnsn_bnk_nm: ''
        });
      } else {

        const trnsDsp = this.lmoPymntsForm.value.lmoCode[i].trnsn_tx.split('/');

        pymntsWthOtLmoArry.push({
          agnt_nm: this.lmoPymntsForm.value.lmoCode[i].lmo_nm,
          trsn_dt: this.datePipe.transform(this.lmoPymntsForm.value.lmoCode[i].trsn_dt, 'yyyy-MM-dd'),
          trnsn_type_id: 6,
          trnsn_at: this.lmoPymntsForm.value.lmoCode[i].tot_amt,
          pymnt_mde_id: trnsDsp[0] === 'NEFT' ? 3 : trnsDsp[0] === 'UPI' ? 9 : trnsDsp[0] === 'IMPS' ? 4 : 1,
          dd_nu: this.lmoPymntsForm.value.lmoCode[i].ref_nu === null ? '' : this.lmoPymntsForm.value.lmoCode[i].ref_nu,
          mble_nu: this.lmoPymntsForm.value.lmoCode[i].mble_nu ? this.lmoPymntsForm.value.lmoCode[i].mble_nu : '',
          cmnt_tx: '',
          trnsn_tx: this.lmoPymntsForm.value.lmoCode[i].trnsn_tx,
          trnsn_bnk_nm: ''
        });
      }
    }

    // console.log(this.lmoPymntsForm.value.lmoCode);
    // console.log(pymntsAdedLmoArry);
    // console.log(pymntsWthOtLmoArry);
    // return;

    if (pymntsAdedLmoArry.length !== 0) {
      this.postAgntPymnts(pymntsAdedLmoArry);
    }

    this.postAgntPymntWthoutLmo(pymntsWthOtLmoArry);

  }

  postAgntPymnts(data): any {
    const rte = `billing/agent/payments`;
    this.crdSrv.create(data, rte).subscribe((res) => {
      if (res['status'] === 200) {
        if (res['data'].insertId) {
          this._snackBar.open('Payment details Sucessfully Saved', '', {
            duration: 2000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
          });
        } else {
          this._snackBar.open('Payment details Already Uploaded', '', {
            duration: 2500,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
          });
        }
        // this.dsbleSbmt = true;
        this.uploadedExclFile(this.fileUploaded);
      }
    }, (error) => {
      console.log(error);
    });
  }

  postAgntPymntWthoutLmo(data): any {
    const rte = `billing/agent/payments/staging`;
    this.crdSrv.create(data, rte).subscribe((res) => {
      if (res['status'] === 200) {
        if (res['data'].insertId) {
          this._snackBar.open('Payment details Sucessfully Saved', '', {
            duration: 2000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
          });
        } else {
          this._snackBar.open('Payment details Already Uploaded', '', {
            duration: 2500,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
          });
        }
        this.uploadedExclFile(this.fileUploaded);
      }
    }, (error) => {
      console.log(error);
    });
  }

  downloadtemplate(): any {	

    this.exceldDatasoure = [
      {
        'Tran Date': '19/02/2020',
        'Chq No.': '',
        'Transaction Description': 'IMPS/005004347556/919491789800/J JAYARANI',
        'Debit (Rs.)': '',
        'Credit (Rs.)': '4,600.00',
        'Balance (Rs.)': '4,20,074.96'
      },
      {
        'Tran Date': '19/02/2020',
        'Chq No.': '',
        'Transaction Description': 'APSFL,Bill Id. LMO8792,Ref No. 19022010190001',
        'Debit (Rs.)': '',
        'Credit (Rs.)': '7,000.00',
        'Balance (Rs.)': '6,83,275.96'
      },
      {
        'Tran Date': '19/02/2020',
        'Chq No.': '',
        'Transaction Description': 'NEFT/PONNAGANTI GOVINDHRAJU',
        'Debit (Rs.)': '',
        'Credit (Rs.)': '8,000.00',
        'Balance (Rs.)': '20,19,214.96'
      },
      {
        'Tran Date': '19/02/2020',
        'Chq No.': '',
        'Transaction Description': 'UPI/005033774183/CR/MASTHANA/SBIN/9441084441/Payme',
        'Debit (Rs.)': '',
        'Credit (Rs.)': '10,000.00',
        'Balance (Rs.)': '23,68,492.96'
      }];
    this.excel.exportAsExcelFile(this.exceldDatasoure, 'Lmopayments');
  }
}
