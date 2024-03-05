import { Component, OnInit } from '@angular/core';
import { CrudService } from 'app/main/apps/crud.service';

@Component({
  selector: 'app-payments-dashboard',
  templateUrl: './payments-dashboard.component.html',
  styleUrls: ['./payments-dashboard.component.scss']
})
export class PaymentsDashboardComponent implements OnInit {
  chartdata = [];
  agntPdTdyMnth: any;
  curDate = new Date();
  crntYr = this.curDate.getFullYear();
  crntMnth = this.curDate.getMonth() + 1;
  agntBlnceMnth = this.curDate.getMonth() + 1;
  dyWseChartdata: any;
  months = [
    // tslint:disable-next-line:max-line-length
    { id: 1, name: 'January' }, { id: 2, name: 'February' }, { id: 3, name: 'March' }, { id: 4, name: 'April' }, { id: 5, name: 'May' }, { id: 6, name: 'June' }, { id: 7, name: 'July' }, { id: 8, name: 'August' }, { id: 9, name: 'Spetember' }, { id: 10, name: 'October' }, { id: 11, name: 'November' }, { id: 12, name: 'December' }
  ];
  shwNoDataDiv = false;
  agntBlnceMnthdata: any;
  showLdr: boolean;
  columnDefs = [];
  apsflShreData: any;
  formatter = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
  });
  crntMnthNm: string;
  constructor(public crdSrv: CrudService) { }

  ngOnInit(): any {
    this.getAgntPymntTdyMnth();
    this.getAgntPymntMnthlyGrph();
    this.getAgntPymntDyWseGrph();
    this.getAgntBlnceDtls();
    this.getApsflShreByCstmrTyp();
  }

  getAgntPymntTdyMnth(): any{
    const rte = `billing/agent/payments/today/month`;
    this.crdSrv.get(rte).subscribe((res) => {
      if (res['status'] === 200) {
        this.agntPdTdyMnth = res['data'][0];
        this.agntPdTdyMnth['crnt_mnth_pd_amt'] = this.formatter.format(this.agntPdTdyMnth.crnt_mnth_pd_amt);
        this.agntPdTdyMnth['tdy_pd_amt'] = this.formatter.format(this.agntPdTdyMnth.tdy_pd_amt);
        this.agntPdTdyMnth['ystrdy_pd_amt'] = this.formatter.format(this.agntPdTdyMnth.ystrdy_pd_amt);
      }
    });
  }

  getAgntPymntMnthlyGrph(): any{
    const rte = `billing/agent/payments/monthly`;
    this.crdSrv.get(rte).subscribe((res) => {
      if (res['status'] === 200) {
        this.chartdata = res['data'];
      }
    });
  }

  getAgntPymntDyWseGrph(): any{
    for (let i = 0; i < this.months.length; i++){
      if  (this.crntMnth == this.months[i].id){
        this.crntMnthNm = this.months[i].name;
      }
    }

    const rte = `billing/agent/payments/month/daywise/${this.crntMnth}`;
    this.crdSrv.get(rte).subscribe((res) => {
      if (res['status'] === 200) {
        this.dyWseChartdata = res['data'];
        this.dyWseChartdata.tot_dy_amt_aprvd = this.formatter.format(this.dyWseChartdata.tot_dy_amt_aprvd);
        this.dyWseChartdata.tot_dy_amt_nt_aprvd = this.formatter.format(this.dyWseChartdata.tot_dy_amt_nt_aprvd);
        if (this.dyWseChartdata.length == 0){
          this.shwNoDataDiv = true;
        } else {
          this.shwNoDataDiv = false;
        }
      }
    });
  }

  getAgntBlnceDtls(): any{
    this.showLdr = true;
    const rte = `billing/agent/payment/balance`;
    this.crdSrv.get(rte).subscribe((res) => {
      if (res['status'] === 200) {
        let ct = 0;
        this.agntBlnceMnthdata = res['data'];
        this.agntBlnceMnthdata.filter(k => {
          k['sno'] = ++ct;
        });
        this.showLdr = false;
        this.columnDefs = [
          { headerName: 'Sno', field: 'sno', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 100, filter: false },
          { headerName: 'LMO Code', field: 'agnt_cd', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 150 },
          { headerName: 'LMO Name', field: 'agnt_nm', alignment: 'left', cellClass: 'pm-grid-number-cell', width: 150 },
          { headerName: 'Mobile Number', field: 'ofce_mbl_nu', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 150 },
          // tslint:disable-next-line:max-line-length
          { headerName: 'LMO Balance Amount', field: 'tot_agnt_bal_amt', alignment: 'right', type: 'currency', currency: 'INR', precision: '2', 
          valueFormat: '₹ #,##,##,##,##0.##',
          cellClass: 'pm-grid-number-cell', width: 150 }
        ];
      }
    });
  }

  selectedMnth(data): any{
    this.crntMnth = data.value;
    this.getAgntPymntDyWseGrph();
  }

  getApsflShreByCstmrTyp(): any{
    const rte = `billing/payment/apsflshare/details/month`;
    this.crdSrv.get(rte).subscribe((res) => {
      if (res['status'] === 200) {
        this.apsflShreData = res['data'][0];
        this.apsflShreData['indvl_apsfl_shre'] = this.formatter.format(this.apsflShreData.indvl_apsfl_shre);
        this.apsflShreData['entrp_apsfl_shre'] = this.formatter.format(this.apsflShreData.entrp_apsfl_shre);
      }
    });
  }

  customizeTooltip(arg: any) {
    return {
      text: arg.seriesName + ' - ' + arg.valueText
    };
  }
}
