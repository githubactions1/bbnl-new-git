import { Component, OnInit } from '@angular/core';
import { CrudService } from 'app/main/apps/crud.service';

@Component({
  selector: 'app-enterprise-dashboard',
  templateUrl: './enterprise-dashboard.component.html',
  styleUrls: ['./enterprise-dashboard.component.scss']
})
export class EnterpriseDashboardComponent implements OnInit {
  agntCount = [];
  cafCount = [];
  stpBxsCount = [];
  showLdr: boolean;
  cafTopTenLst: any;
  columnDefs;
  cafLst6MnthDtls: any;
  cafProvsn = [];
  types;
  cafTrmndCount: any;
  constructor(public crdSrvc: CrudService) { }

  ngOnInit(): any {
    this.types = ['line', 'stackedline', 'fullstackedline'];
    this.getCafSmryCounts();
    this.getCafTpTenDtls();
    this.getCafLast6MnthData();
  }

  getCafSmryCounts(): any {
    this.showLdr = true;
    const rte = `dashbrd/enterprise/cafs/counts/4`;
    this.crdSrvc.get(rte).subscribe((res) => {
      console.log(res['data']);
      this.cafCount = res['data'].cafresults[0];
      this.cafTrmndCount = res['data'].cafTrmndresults[0];
      console.log(this.cafCount);
      this.showLdr = false;
    });
  }

  getCafLast6MnthData(): any {
    this.showLdr = true;
    const rte = `dashbrd/enterprise/cafs/last6months/provisions/4`;
    this.crdSrvc.get(rte).subscribe((res) => {
      this.cafLst6MnthDtls = res['data'];
      console.log(this.cafLst6MnthDtls);
      this.cafProvsn = [
        {value: 'mnth_prvd', name: 'Total CAF\'s Provisioned'}];
      this.showLdr = false;
    });
  }

  getCafTpTenDtls(): any {
    this.showLdr = true;
    const rte = `dashbrd/enterprise/top/cafs/4`;
    const dstrct_fltr = true;
    this.crdSrvc.get(rte).subscribe((res) => {
      this.cafTopTenLst = res['data'];
      console.log(this.cafTopTenLst);
      let ct = 0;
      this.cafTopTenLst.filter(k => {
        k['sno'] = ++ct;
      });
      this.showLdr = false;
        this.columnDefs = [
          { headerName: 'Sno', field: 'sno', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 100 , filter: false},
          { headerName: 'Customer Name', field: 'cntct_nm', alignment: 'left', cellClass: 'pm-grid-number-cell', width: 350 },
          { headerName: 'Total CAFs', field: 'tot_cafs', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 100 },
          { headerName: 'Active CAFs', field: 'tot_actv_cafs', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 100 },
          { headerName: 'Suspended CAFs', field: 'tot_spnd_cafs', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 150 },
          { headerName: 'Terminated CAFs', field: 'tot_trmnd_cafs', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 150 },
          { headerName: 'CAFs Provisioned This Month', field: 'crnt_mnth_prvn_cafs', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 200 },
          { headerName: 'CAFs Suspended This Month', field: 'crnt_mnth_spnd_cafs', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 200 },
          { headerName: 'CAFs Terminated This Month', field: 'crnt_mnth_trmnd_cafs', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 200 },
          { headerName: 'District', field: 'dstrt_nm', alignment: 'left', cellClass: 'pm-grid-number-cell', width: 150 },
          { headerName: 'Mandal', field: 'mndl_nm', alignment: 'left', cellClass: 'pm-grid-number-cell', width: 150 }
        ];
      this.showLdr = false;
    });
  }

}
