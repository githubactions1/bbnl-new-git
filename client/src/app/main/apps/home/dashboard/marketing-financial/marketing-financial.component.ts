import { Component, OnInit } from '@angular/core';
import { CrudService } from 'app/main/apps/crud.service';

@Component({
  selector: 'app-marketing-financial',
  templateUrl: './marketing-financial.component.html',
  styleUrls: ['./marketing-financial.component.scss']
})
export class MarketingFinancialComponent implements OnInit {
  showLdr: boolean;
  currentyear;
  monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  share = [{ indvl_ttl_shre: '0', curnt_mnth_indvl_ttl_shre: '0', prev_mnth_indvl_ttl_shre: '0', curnt_indvl_apsfl_shre: '0', pre_indvl_apsfl_shre: '0', curnt_indvl_mso_shre: '0', pre_indvl_mso_shre: '0', curnt_indvl_lmo_shre: '0', pre_indvl_lmo_shre: '0', indvl_apsfl_shre: '0', indvl_mso_shre: '0', indvl_lmo_shre: '0'
,ent_ttl_shre: '0', curnt_mnth_ent_ttl_shre: '0', prev_mnth_ent_ttl_shre: '0', curnt_ent_apsfl_shre: '0', pre_ent_apsfl_shre: '0', curnt_ent_mso_shre: '0', pre_ent_mso_shre: '0', curnt_ent_lmo_shre: '0', pre_ent_lmo_shre: '0', ent_apsfl_shre: '0', ent_mso_shre: '0', ent_lmo_shre: '0' }];
  mnthnm: any;
  mnthcrnt: any;
  chartdata: any;
  selectedYearGrid: any;
  griddata;
  years = [];
  dstrctNm: any;
  constructor(public crdSrvc: CrudService) { }

  ngOnInit(): any {
    this.currentyear = (new Date()).getFullYear();
    this.selectedYearGrid = this.currentyear - 1;
    var count = this.currentyear - 2016;
    for (var i = 0; i <= count; i++) {
      let yr = this.currentyear - i;
      this.years.push(yr);
    }
    this.getIndvlEntshreDtls();
    this.graphdata();
    this.getgriddata();
  }

  onPointClick(val) { };
  
  getIndvlEntshreDtls(): any{
    this.showLdr = true;
   
    this.mnthnm = this.monthNames[(new Date()).getMonth() - 1];
    this.mnthcrnt = this.monthNames[(new Date()).getMonth() - 2];
    let n1 = (new Date()).getMonth() - 1;
    let n2 = (new Date()).getMonth();
    let indvl_ttl_shre = 0; let indvl_apsfl_shre = 0; let indvl_mso_shre = 0; let indvl_lmo_shre = 0;
    let ent_ttl_shre = 0; let ent_apsfl_shre = 0; let ent_mso_shre = 0; let ent_lmo_shre = 0;
    let rte1 = `dashbrd/previous/month/share/counts`;
    this.crdSrvc.get(rte1).subscribe((res) => {
      console.log(res['data']);
      res['data'].indvlRes.forEach((element) => {
        this.showLdr = false;
        var formatter = new Intl.NumberFormat('en-IN', {
          style: 'currency',
          currency: 'INR',
        })
        indvl_ttl_shre = indvl_ttl_shre + element.INDV_TOTAL_INVOICE_AMOUNT;
        indvl_apsfl_shre = indvl_apsfl_shre + element.INDV_APSFL_SHARE;
        indvl_mso_shre = indvl_mso_shre + element.INDV_MSO_SHARE;
        indvl_lmo_shre = indvl_lmo_shre + element.INDV_LMO_SHARE;

        if (n2 == element.invce_mm) {
          this.share[0].curnt_mnth_indvl_ttl_shre = formatter.format(element.INDV_TOTAL_INVOICE_AMOUNT);
          this.share[0].curnt_indvl_apsfl_shre = formatter.format(element.INDV_APSFL_SHARE);
          this.share[0].curnt_indvl_mso_shre = formatter.format(element.INDV_MSO_SHARE);
          this.share[0].curnt_indvl_lmo_shre = formatter.format(element.INDV_LMO_SHARE);
        }
        else if (n1 == element.invce_mm) {
          this.share[0].prev_mnth_indvl_ttl_shre = formatter.format(element.INDV_TOTAL_INVOICE_AMOUNT);
          this.share[0].pre_indvl_apsfl_shre = formatter.format(element.INDV_APSFL_SHARE);
          this.share[0].pre_indvl_mso_shre = formatter.format(element.INDV_MSO_SHARE);
          this.share[0].pre_indvl_lmo_shre = formatter.format(element.INDV_LMO_SHARE);
        }
        this.share[0].indvl_ttl_shre = formatter.format(indvl_ttl_shre);
        this.share[0].indvl_apsfl_shre = formatter.format(indvl_apsfl_shre);
        this.share[0].indvl_mso_shre = formatter.format(indvl_mso_shre);
        this.share[0].indvl_lmo_shre = formatter.format(indvl_lmo_shre);

      })
      
      res['data'].entRes.forEach((element) => {
        this.showLdr = false;
        var formatter = new Intl.NumberFormat('en-IN', {
          style: 'currency',
          currency: 'INR',
        })
        ent_ttl_shre = ent_ttl_shre + element.ENT_TOTAL_INVOICE_AMOUNT;
        ent_apsfl_shre = ent_apsfl_shre + element.ENT_APSFL_SHARE;
        ent_mso_shre = ent_mso_shre + element.ENT_MSO_SHARE;
        ent_lmo_shre = ent_lmo_shre + element.ENT_LMO_SHARE;

        if (n2 == element.invce_mm) {
          this.share[0].curnt_mnth_ent_ttl_shre = formatter.format(element.ENT_TOTAL_INVOICE_AMOUNT);
          this.share[0].curnt_ent_apsfl_shre = formatter.format(element.ENT_APSFL_SHARE);
          this.share[0].curnt_ent_mso_shre = formatter.format(element.ENT_MSO_SHARE);
          this.share[0].curnt_ent_lmo_shre = formatter.format(element.ENT_LMO_SHARE);
        }
        else if (n1 == element.invce_mm) {
          this.share[0].prev_mnth_ent_ttl_shre = formatter.format(element.ENT_TOTAL_INVOICE_AMOUNT);
          this.share[0].pre_ent_apsfl_shre = formatter.format(element.ENT_APSFL_SHARE);
          this.share[0].pre_ent_mso_shre = formatter.format(element.ENT_MSO_SHARE);
          this.share[0].pre_ent_lmo_shre = formatter.format(element.ENT_LMO_SHARE);
        }
        this.share[0].ent_ttl_shre = formatter.format(ent_ttl_shre);
        this.share[0].ent_apsfl_shre = formatter.format(ent_apsfl_shre);
        this.share[0].ent_mso_shre = formatter.format(ent_mso_shre);
        this.share[0].ent_lmo_shre = formatter.format(ent_lmo_shre);

      })
      console.log(this.share);
    })
  }

  graphdata(): any {
    this.showLdr = true;
      let selectedDist = 0;
      let rte = `dashbrd/getShareConuts/${this.currentyear}/${selectedDist}`
      this.crdSrvc.get(rte).subscribe((res) => {
        for (var i = 0; i < res['data'].length; i++) {
          res['data'][i]['month'] = this.monthNames[res['data'][i].invce_mm - 1];
        }
        this.showLdr = false;
        this.chartdata = res['data']
      })
  }

  getgriddata() {

    let rte = `dashbrd/district/monthly/revenue/sharing/${this.selectedYearGrid}`;
    this.crdSrvc.get(rte).subscribe((res) => {
      for (let i = 0; i < res['data'].length; i++) {
        res['data'][i]['month'] = this.monthNames[res['data'][i].invce_mm - 1];
      }
      this.griddata = res['data'];
      this.dstrctNm = this.griddata[0].dstrt_nm;
      console.log(this.griddata);
    });
  }
  onCellPrepared( e: any): any {
    if (e.rowType === 'data' && e.row.data) {
      e.cellElement.style.cursor = 'pointer';
    }
  }
}
