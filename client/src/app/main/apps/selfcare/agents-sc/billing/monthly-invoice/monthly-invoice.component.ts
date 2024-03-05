import { Component, OnInit } from '@angular/core';
import { CrudService } from 'app/main/apps/crud.service';
import * as _moment from 'moment';
const moment = _moment;

@Component({
  selector: 'app-monthly-invoice',
  templateUrl: './monthly-invoice.component.html',
  styleUrls: ['./monthly-invoice.component.scss']
})
export class MonthlyInvoiceComponent implements OnInit {
  year;
  months;
  shwLdr=true;
  usrdtls;
  slctdmnth: any;
  slctdyear: number;
  lmoMnthlyData;
  lmoMnthlyDataColumnDefs;

  getHeaderDtls = function (): any { return { 'title': 'Monthly Invoice', 'icon': 'list_alt'}; };
  
  constructor(public crdSrv: CrudService) { }

  ngOnInit() {
    this.usrdtls = JSON.parse(localStorage.getItem('usrDtls'));

    this.months = [{ mnth_nm: 'January', mnth_id: 1 }, { mnth_nm: 'February', mnth_id: 2 },
    { mnth_nm: 'March', mnth_id: 3 }, { mnth_nm: 'April', mnth_id: 4 }, { mnth_nm: 'May', mnth_id: 5 },
    { mnth_nm: 'June', mnth_id: 6 }, { mnth_nm: 'July', mnth_id: 7 }, { mnth_nm: 'August', mnth_id: 8 },
    { mnth_nm: 'September', mnth_id: 9 }, { mnth_nm: 'October', mnth_id: 10 },
    { mnth_nm: 'November', mnth_id: 11 }, { mnth_nm: 'December', mnth_id: 12 }];
    this.year = [{ yr_nm: 2017, yr_id: 2017 }, { yr_nm: 2018, yr_id: 2018 }, { yr_nm: 2019, yr_id: 2019 }, { yr_nm: 2020, yr_id: 2020 },{ yr_nm: 2021, yr_id: 2021},{ yr_nm: 2022, yr_id: 2022},
	  { yr_nm: 2023, yr_id: 2023}];

    let d = new Date();
    let date = d.getDate();
     let month = d.getMonth() + 1;
    let year = d.getFullYear();
    console.log(month);
     this.slctdmnth = month;
    this.slctdyear = year;
    this.getAgntInvceRpt(month,year);
  }
  getAgntInvceRpt(month,year): any {
    this.shwLdr=true;
    let rte=`billing/lmo/month/invoice/${year}/${month}/${this.usrdtls.lmo_cd}`;
    this.crdSrv.get(rte).subscribe((res) => {
      if (res['status'] == 200) {
        this.lmoMnthlyData = res['data'];
        this.shwLdr=false;
        this.lmoMnthlyDataColumnDefs = [
          { headerName: 'Sno', field: 's_no', alignment:'center', showInGroupFooter: false, cellClass: "pm-grid-number-cell", width: 50, sortable: true, filter: false },
          { headerName: 'Month', field: 'Month', alignment:'center', hide: (month==0)?false:true , showInGroupFooter: false, cellClass: "pm-grid-number-cell", width: 150, sortable: true, filter: false },
          { headerName: 'Invoice Id', field: 'InvoiceId',  alignment:'center', showInGroupFooter: false, formatcurrency: false, cellClass: "pm-grid-number-cell", width: 150},
          // { headerName: 'LMO Code', field: 'LMOCode', alignment:'center', showInGroupFooter: false, cellClass: "pm-grid-number-cell", width: 100},
          { headerName: 'Customer Name', alignment:'left', field: 'CustomerName', showInGroupFooter: false, cellClass: "pm-grid-number-cell", width: 150, sortable: true, filter: true },
          { headerName: 'Mobile Number', alignment:'center', field: 'MobileNumber', showInGroupFooter: false,  cellClass: "pm-grid-number-cell", width: 150, sortable: true, filter: true },
          { headerName: 'CAF No',alignment:'center', field: 'CafNo', showInGroupFooter: false,  formatcurrency: false, cellClass: "pm-grid-number-cell", width: 150, sortable: true, filter: true },
          { headerName: 'CAF Date', alignment:'center', field: 'CafDate',  showInGroupFooter: false, cellClass: "pm-grid-number-cell", width: 150, sortable: true, filter: true },
          { headerName: 'APSFL Share', alignment:'right', field: 'APSFLShare',  showInGroupFooter: true, summaryType:'sum', formatcurrency: true, type: 'currency', currency: 'INR', precision: '2', cellClass: "pm-grid-number-cell", width: 150, sortable: true, filter: true },
          { headerName: 'MSO Share', alignment:'right', field: 'MSOShare', showInGroupFooter: true, summaryType:'sum', formatcurrency: true, type: 'currency', currency: 'INR', precision: '2', cellClass: "pm-grid-number-cell", width: 100, sortable: true, filter: true },
          { headerName: 'LMO Share', alignment:'right', field: 'LMOShare', showInGroupFooter: true, summaryType:'sum', formatcurrency: true, type: 'currency', currency: 'INR', precision: '2', cellClass: "pm-grid-number-cell", width: 150, sortable: true, filter: true },
          { headerName: 'Total', alignment:'right', field: 'Total',  showInGroupFooter: true, summaryType:'sum', formatcurrency: true, type: 'currency', currency: 'INR', precision: '2', cellClass: "pm-grid-number-cell", width: 150, sortable: true, filter: true },
          { headerName: 'Payment Status', alignment:'center', field: 'PaymentStatus', showInGroupFooter: true,  cellClass: "pm-grid-number-cell", width: 150, sortable: true, filter: true }
        ];
      }

    })
  }
}
