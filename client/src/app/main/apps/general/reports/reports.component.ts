import { Component, OnInit } from '@angular/core';
import { CrudService } from '../../crud.service';
import { Router } from '@angular/router';
import * as _ from 'lodash'
@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {
  rptCtgryLst = [];
  breakpoint: number;
  empGrdData: any;
  ctgrylst = [];
  rptLst = [];
  smryRpts = [];
  othrRpts = [];
  rptGteLst = [];
  chckd = [];
  usrLgnDtls: any;
  hdrDta: any;
  searchText = '';
  loader: boolean;
  getHeaderDtls = function () { return { "title": "MIS-REPORTS", "icon": "list_alt" } }
  constructor(private apiSrvc: CrudService, private router: Router) {
    this.usrLgnDtls = JSON.parse(localStorage.getItem('usrDtls'));
    var allParams = this.router.url;
    if (allParams = '/admin/reports') {
      localStorage.setItem('OLTDATA', '');
    }
  }

  ngOnInit() {
    this.getCtgryLst();
    this.getReprtLst();
    this.breakpoint = (window.innerWidth <= 400) ? 1 : 6;
  }
  onResize(event) {
    this.breakpoint = (event.target.innerWidth <= 400) ? 1 : 6;
  }

  getCtgryLst = () => {
    this.apiSrvc.get('reports/ctgrylst').subscribe((res) => {
      this.ctgrylst = res['data']
      this.ctgrylst.filter((k) => {
        k.chk_ind = true;
      })
    }, (err) => {
      console.log(err);
    })
  }

  getReprtLst = () => {
    this.loader = true;
    const rte = `reports/rprtlst/${this.usrLgnDtls.mrcht_usr_id}`;
    this.apiSrvc.get(rte).subscribe((res) => {
      if (res['status'] == 200) {
        this.loader = false;
        var obj = { "opts": [] };
        for (let i = 0; i < res['data'].length; i++) {
          for (let j = 0; j < res['data'][i].opts.length; j++) {
            res['data'][i].opts[j]['grp_nm'] = res['data'][i].opts[j].rpt_nm;
          }
        }
        this.rptLst = res['data'];
        this.rptLst.filter((k) => {
          if (k.opts) {
            k.opts.filter((r) => {
              r.rpt_shw_in = true;
              _.assign(r, obj);
            })
          }
        })
        console.log(this.rptLst)
        _.orderBy(this.rptLst, ['grp_nm', 'grp_nm'], ['asc', 'asc']);
        this.rptLst.filter((k) => {
          k.opts = _.orderBy(k.opts, ['grp_nm', 'cmplt_in'], ['desc', 'desc']);
        })
      }
    }, (err) => {
      console.log(err);
    })
  }

  uniqueArray(arrArg) {
    console.log(arrArg)
    return arrArg.filter(function (elem, pos, arr) {
      return arr.indexOf(elem) === pos;
    });
  }

  changeCheckbox() {
    this.ctgrylst.filter((k) => {
      this.rptLst.filter((g) => {
        if (g.opts) {
          g.opts.filter((r) => {
            if (k.rpt_ctgry_id == r.rpt_ctgry_id) {
              r.rpt_shw_in = k.chk_ind;
            }

          })
        }
      })
    })
    _.orderBy(this.rptLst, ['grp_nm', 'grp_nm'], ['asc', 'asc']);
  }
  gotoRpt = function (rp, data) {
    let adtpostData = {
      rprId: rp.rpt_id
    }
    const rteo = `sql/getStatusrprt`;
    this.apiSrvc.create(adtpostData, rteo).subscribe((res) => {
      console.log(res['status']);
    });
    if (rp.rpt_typ_id == 1) {
      this.router.navigate([rp.rpt_url_txt]);
    }
    else if (rp.rpt_typ_id == 2) {
      this.router.navigate(['/admin/reports/custom/' + rp.rpt_id], { queryParams: {} })
    }
    else if (rp.rpt_typ_id == 3) {
      this.router.navigate(['/admin/custom-monthly/' + data.rpt_id + '/'], { queryParams: { "prmsdata": data }, skipLocationChange: true });
      window.history.pushState('', '', '/admin/custom-monthly/' + data.rpt_id + '/');
    }
  }
}
