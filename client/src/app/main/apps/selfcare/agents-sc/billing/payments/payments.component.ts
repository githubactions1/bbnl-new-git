import { Component, OnInit } from '@angular/core';
import { CrudService } from 'app/main/apps/crud.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.scss']
})
export class PaymentsComponent implements OnInit {
  agntPymntLst: any;
  columnDefs = [];
  agntPymntsForm: FormGroup;
  shwLdr: boolean;
  getHeaderDtls = function (): any { return { 'title': 'Payments To APSFL', 'icon': 'money' }; };
  
  constructor(public crdSrv: CrudService, private fb: FormBuilder, public datePipe: DatePipe) { }

  ngOnInit(): any {
    this.agntPymntsForm = this.fb.group({
      pymntFrmDt: [''],
      pymntToDt: ['']
    });
    this.getUsrPymnts();
  }

  getUsrPymnts(): any {

    const pymntData = {
      // tslint:disable-next-line:triple-equals
      frmDt: this.agntPymntsForm.value.pymntFrmDt != '' ? this.datePipe.transform(this.agntPymntsForm.value.pymntFrmDt, 'yyyy-MM-dd') : '',
      // tslint:disable-next-line:triple-equals
      toDt: this.agntPymntsForm.value.pymntToDt != '' ? this.datePipe.transform(this.agntPymntsForm.value.pymntToDt, 'yyyy-MM-dd') : '',
      agntId: '',
      aprvl: false
    };

    this.shwLdr = true;
    
     const rte = `billing/payments/agent`;
    //const rte = `/user/getPaymentDtls`;
    this.crdSrv.create(pymntData, rte).subscribe((res) => {
      // tslint:disable-next-line:triple-equals
      if (res['status'] == 200) {
        this.agntPymntLst = res['data'];
        console.log(this.agntPymntLst);
        this.shwLdr = false;
        let ct = 0;
        this.agntPymntLst.filter(k => {
          k['s_no'] = ++ct;
        });
      }
    });

    this.columnDefs = [
      { headerName: 'S.No', field: 's_no', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 150, height: 40, filter: false, columnFiltering: false },
      //{ headerName: 'Transaction Month', field: 'TRANSACTION_MONTH', alignment: 'left', cellClass: 'pm-grid-number-cell', width: 250, height: 40, filter: true, columnFiltering: false },
      { headerName: 'Transaction Date', field: 'trsn_dt', alignment: 'left', cellClass: 'pm-grid-number-cell', width: 250, height: 40, filter: true, columnFiltering: false },
      { headerName: 'Transaction Type', field: 'trnsn_type_nm', alignment: 'left', cellClass: 'pm-grid-number-cell', width: 250, height: 40, filter: true, columnFiltering: false },
      { headerName: 'Payment Mode', field: 'pymnt_mde_nm', alignment: 'left', cellClass: 'pm-grid-number-cell', width: 250, height: 40, filter: false, columnFiltering: true },
      { headerName: 'BALANCE TO PAY', field: 'BALANCE_TO_PAY', alignment: 'right', type: 'currency', currency: 'INR', precision: '2', cellClass: 'pm-grid-number-cell', width: 250, height: 40, filter: true, columnFiltering: false },
      { headerName: 'Credit Balance', field: 'agnt_blnce_at', alignment: 'right', type: 'currency', currency: 'INR', precision: '2', cellClass: 'pm-grid-number-cell', width: 250, height: 40, filter: true, columnFiltering: false },
      { headerName: 'Debit Balance', field: 'DEBIT', alignment: 'right', type: 'currency', currency: 'INR', precision: '2', cellClass: 'pm-grid-number-cell', width: 250, height: 40, filter: true, columnFiltering: false },
    ];
  }
}
