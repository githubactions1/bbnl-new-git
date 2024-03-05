import { Component, OnInit } from '@angular/core';
import { CrudService } from 'app/main/apps/crud.service';
import { Router } from '@angular/router';

import { TransfereService } from 'app/providers/transfer/transfer.service';
@Component({
  selector: 'app-msodashboard',
  templateUrl: './msodashboard.component.html',
  styleUrls: ['./msodashboard.component.scss']
})
export class MsodashboardComponent implements OnInit {
  showLdr: boolean;
  stpBxsCount: any;
  agntCount: any;
  cafCount: any;
  lmoSumryCnts: any;
  columnDefs: any;
  years: number[] = [];
  monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  months = [
    // tslint:disable-next-line:max-line-length
    { id: '1', name: 'January' }, { id: '2', name: 'February' }, { id: '3', name: 'March' }, { id: '4', name: 'April' }, { id: '5', name: 'May' }, { id: '6', name: 'June' }, { id: '7', name: 'July' }, { id: '8', name: 'August' }, { id: '9', name: 'Spetember' }, { id: '10', name: 'October' }, { id: '11', name: 'November' }, { id: '12', name: 'December' }
  ];
  currentyear: number;
  curdate = new Date();
  selectedYear;
  selectedMonth;
  crntPrvsMnthCounts = [];
  cafOprtnCrntMnth: any;
  cafOprtnPrvMnth: any;
  crntMnthNm = this.monthNames[this.curdate.getMonth()];
  prvMnthNm = this.monthNames[this.curdate.getMonth() - 1];
  totalLmos:any
  crntYrNm = this.curdate.getFullYear();
  dstrctNm: any;
  usrdtls: any;
  Lmos=[];
  agnt_id;
  constructor(public crdSrvc: CrudService, private router: Router,public TransfereService: TransfereService) { }

  ngOnInit() {
    this.usrdtls = JSON.parse(localStorage.getItem('usrDtls'));

    console.log(this.usrdtls)
    if(this.usrdtls.usr_ctgry_id==7){
      this.agnt_id=this.usrdtls.usr_ctgry_ky;
    }
    else{
      this.agnt_id=''
    }

    this.selectedYear = this.curdate.getFullYear();
    this.selectedMonth = this.curdate.getMonth() + 1;
    this.getCpeCounts();
    this.getAgntsCounts();
    this.getCafCounts();
    this.getLmoWiseData();
    this.getCrntPrvMnthOprtnCnts();
    this.getAgntsbymso()
    this.currentyear = (new Date()).getFullYear();
    const count = this.currentyear - 2016;
    for (let i = 0; i <= count; i++) {
      const yr = this.currentyear - i;
      this.years.push(yr);
    }
  }
  getCpeCounts(): any {
    this.showLdr = true;
    const rte = `agent/LmoCpeCnt/${this.agnt_id}`;
    const dstrct_fltr = true;
    this.crdSrvc.get(rte).subscribe((res) => {
      this.stpBxsCount = res['data'];
      this.showLdr = false;
    });
  }
  getAgntsCounts(): any {
    this.showLdr = true;
    const rte = `dashbrd/getAgentsConuts`;
    const dstrct_fltr = true;
    this.crdSrvc.create({dstrct_fltr: dstrct_fltr}, rte).subscribe((res) => {
      this.agntCount = res['data'];
      this.showLdr = false;
    });
  }
  getAgntsbymso(): any {
    this.showLdr = true;
    const rte = `agent/agentsmso/${this.agnt_id}`;
    const dstrct_fltr = true;
    this.crdSrvc.get(rte).subscribe((res) => {
      // this.agntCount = res['data'];
      for(let i=0;i<res['data'].length;i++){
        res['data'][i]['Profile'] = "Profile"
      }
            this.Lmos=res['data'];
            this.totalLmos=this.Lmos.length;
            this.columnDefs = [
              { headerName: 'Sno', field: 's_no', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 100 , filter: false},
              { headerName: 'LMO Code', field: 'lmo_cd', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 150 },
              { headerName: 'Profile', field: 'Profile', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 100 },
              { headerName: 'LMO Name', field: 'lmo_nm', alignment: 'left', cellClass: 'pm-grid-number-cell', width: 265 },
              { headerName: 'On Board', field: 'lmo_onbrd_dt', alignment: 'left', cellClass: 'pm-grid-number-cell', width: 100 },
              { headerName: 'Contact Name', field: 'lmo_cntct_nm', alignment: 'left', cellClass: 'pm-grid-number-cell', width: 150 },
              { headerName: 'Mobile Number', field: 'lmo_mbl_nu', alignment: 'left', cellClass: 'pm-grid-number-cell', width: 150 },
              { headerName: 'Total CAFS', field: 'lmo_ct', alignment: 'left', cellClass: 'pm-grid-number-cell', width: 100 },
              { headerName: 'State', field: 'lmo_ofc_ste_nm', alignment: 'left', cellClass: 'pm-grid-number-cell', width: 150 },
              { headerName: 'District', field: 'lmo_ofc_dstrct_nm', alignment: 'left', cellClass: 'pm-grid-number-cell', width: 150 },
              { headerName: 'Mandal', field: 'lmo_ofc_mndl_nm', alignment: 'left', cellClass: 'pm-grid-number-cell', width: 150 },
              { headerName: 'Village', field: 'lmo_ofc_vlg_nm', alignment: 'left', cellClass: 'pm-grid-number-cell', width: 150 }
            ];

      console.log(res['data'])
      this.showLdr = false;
    });
  }

  onCellPrepared(colDef, e) {
    
    if (e.rowType === "data" && e.row.data && e.column.dataField == 'Profile') {
      e.cellElement.style.color = '#ff0000';
      e.cellElement.style.borderRadius = '10px';
      e.cellElement.style.fontWeight = 500;
       e.cellElement.style.background= 'rgba(243, 191, 176, 0.2784313725490196)';
       e.cellElement.style.backgroundClip= 'content-box';
       e.cellElement.style.cursor = "pointer";
    }
 
}
  getCafCounts(): any {
    this.showLdr = true;
    const rte = `agent/cafcountbymso/${this.agnt_id}`;
    const dstrct_fltr = true;
    this.crdSrvc.get( rte).subscribe((res) => {
      this.cafCount = res['data'];
      this.showLdr = false;
    });
  }
  getLmoWiseData(): any{
    this.showLdr = true;
    // console.log(this.selectedMonth);
    const rte = `dashbrd/agent/monthly/operational/summary/${this.selectedYear}/${this.selectedMonth}`;
    this.crdSrvc.get(rte).subscribe((res) => {
      this.lmoSumryCnts = res['data'];
      this.dstrctNm = this.lmoSumryCnts[0].dstrt_nm;
      // console.log(this.dstrctNm);
      let ct = 0;
      this.lmoSumryCnts.filter(k => {
        k['sno'] = ++ct;
      });
      this.showLdr = false;
      
    });
  }

  getCrntPrvMnthOprtnCnts(): any{
    this.showLdr = true;
    const rte = `agent/CrntPrvsMnthCnt/${this.agnt_id}`;
    const dstrct_fltr = true;
    this.crdSrvc.get(rte).subscribe((res) => {
      this.crntPrvsMnthCounts = res['data'];

      console.log(this.crntPrvsMnthCounts)
      this.cafOprtnCrntMnth = res['data'].crntMnthRes[0];
      this.cafOprtnPrvMnth = res['data'].prvMnthRes[0];
      this.showLdr = false;
    });
  }

  onCellClick(e){
    console.log(e)
    // this.TransfereService.setData(data.data)
    if(e.value =='Profile'){
    this.TransfereService.setLoclData('data',e.data)
    this.router.navigate([`/admin/tenant/lmo/profile`])
    }
  }
}
