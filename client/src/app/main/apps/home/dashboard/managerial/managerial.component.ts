import { Component, OnInit } from '@angular/core';
import { CrudService } from '../../../crud.service';
import { Router } from '@angular/router';
import { DxChartModule } from 'devextreme-angular';

@Component({
  selector: 'app-managerial',
  templateUrl: './managerial.component.html',
  styleUrls: ['./managerial.component.scss']
})
export class ManagerialComponent implements OnInit {
  
  // permissions;
  showLdr: boolean;
  stpBxsCount = [{ ttl_stp_bxs: 0, ttl_lmo_stp_bxs: 0, ttl_mso_stp_bxs: 0, ttl_apsfl_stp_bxs: 0 }];
  agntCount = [{ ttl_cnt: 0, mso_cnt: 0, lmo_cnt: 0, apsfl_cnt: 0 }];
  cafCount = [{ ttl_cnt: 0, ind_cnt: 0, ent_cnt: 0, ent_priv_cnt: 0, ent_govt_cnt: 0 }];

  state: string;
  maleyoung: number;
  malemiddle: number;
  maleolder: number;
  femaleyoung: number;
  femalemiddle: number;
  femaleolder: number;
  countriesInfo = [];
  cafOprtns = [];
  types;
  cafLst7DyCount;
  cafTdyCount: any;
  crntPrvsMnthCounts: any;

  constructor(public crdSrvc: CrudService, private router: Router) {
    // this.permissions = { 'slct_in': 1, 'insrt_in': 1, 'updt_in': 1, 'dlte_in': 1, 'exprt_in': 1 };
  }

  ngOnInit(): any {
    this.getCpeCounts();
    this.getAgntsCounts();
    this.getCafCounts();
    this.getCafLst7DyCnts();
    this.getCafTdyCnts();
    this.getLstCrntMnthCnts();
    this.types = ['line', 'stackedline', 'fullstackedline'];
  }


  getCpeCounts(): any {
    this.showLdr = true;
    const rte = `dashbrd/getCpeConuts`;
    const dstrct_fltr = false;
    this.crdSrvc.create({dstrct_fltr: dstrct_fltr}, rte).subscribe((res) => {
      this.stpBxsCount = res['data'];
      this.showLdr = false;
    });
  }
  getAgntsCounts(): any {
    this.showLdr = true;
    const rte = `dashbrd/getAgentsConuts`;
    const dstrct_fltr = false;
    this.crdSrvc.create({dstrct_fltr: dstrct_fltr}, rte).subscribe((res) => {
      this.agntCount = res['data'];
      this.showLdr = false;
    });
  }
  getCafCounts(): any {
    this.showLdr = true;
    const rte = `dashbrd/getCafConuts`;
    const dstrct_fltr = false;
    this.crdSrvc.create({dstrct_fltr: dstrct_fltr}, rte).subscribe((res) => {
      this.cafCount = res['data'];
      this.showLdr = false;
    });
  }

  getCafLst7DyCnts(): any {
    this.showLdr = true;
    const rte = `dashbrd/caf/last7days/counts`;
    this.crdSrvc.get(rte).subscribe((res) => {
      this.cafLst7DyCount = res['data'];
      // console.log(this.cafLst7DyCount);
          this.cafOprtns = [
          {value: 'tot_caf_prv_ct', name: 'Total CAF\'s Provisioned'},
          {value: 'tot_caf_spnd_ct', name: 'Total CAF\'s Suspended'},
          {value: 'tot_caf_rsme_ct', name: 'Total CAF\'s Resumed'},
          {value: 'tot_caf_trmd_ct', name: 'Total CAF\'s Terminated'},
          {value: 'bx_chnge_ct', name: 'Total Boxes Changed'},
          {value: 'pn_change_ct', name: 'Total PON\'s Changed'}];
      this.showLdr = false;
    });
  }

  getCafTdyCnts(): any {
    this.showLdr = true;
    const rte = `dashbrd/caf/currentday/counts`;
    this.crdSrvc.get(rte).subscribe((res) => {
      this.cafTdyCount = res['data'][0];
      // console.log(this.cafTdyCount);
      this.showLdr = false;
    });
  }

  getLstCrntMnthCnts(): any {
    this.showLdr = true;
    const rte = `dashbrd/current/previous/month/counts`;
    this.crdSrvc.get(rte).subscribe((res) => {
      this.crntPrvsMnthCounts = res['data'][0];
      console.log(this.crntPrvsMnthCounts);
      this.showLdr = false;
    });
  }

  customizeTooltip = (arg) => {
    return {
        text: this.getText(arg, arg.valueText)
    };
}

  getText(item, value): any {
    return item.argument + '<br>' + item.seriesName + ' - ' + '<div style="font-size:15px">' + '<b>' + value + '</b>' + '</div>';
  }
}
