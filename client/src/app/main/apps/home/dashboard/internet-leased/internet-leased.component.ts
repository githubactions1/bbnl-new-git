import { Component, OnInit } from '@angular/core';
import { CrudService } from 'app/main/apps/crud.service';
import { DsSidebarService } from '@glits/components/sidebar/sidebar.service';
import { MAT_DIALOG_DATA, MatDialog, MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material';
import { Router } from '@angular/router';



@Component({
  selector: 'app-internet-leased',
  templateUrl: './internet-leased.component.html',
  styleUrls: ['./internet-leased.component.scss']
})
export class InternetLeasedComponent implements OnInit {
  illcafcnts=[{caf_cnt:'0',ttl_cnnts:'0',actv_cnnts:'0',suspd_cnnts:'0'}];
  totalcafslst;
  showLdr: boolean;
  columnDefs: any;
  showCafSidebar = false;
  openSidebarKey = 'addFormPanel';
  selectedIndex = 0;
  setCafId: any;
  pckgDtls: any;
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  hsiDtls: any;
  cstdtls;
  illcafInvceamnt = [{ ttl_shre: '0', curnt_mnth_ttl_shre: '0', prev_mnth_ttl_shre: '0', curnt_apsfl_shre: '0', pre_apsfl_shre: '0', curnt_mso_shre: '0', pre_mso_shre: '0', curnt_lmo_shre: '0', pre_lmo_shre: '0', apsfl_shre: '0', mso_shre: '0', lmo_shre: '0' }];
  mnthnm;
  currentyear;
  mnthcrnt;
  monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
prmsdtaill;
selectedYearGrid;
griddata;
permissions = { "slct_in": 1, "insrt_in": 1, "updt_in": 1, "dlte_in": 1, "exprt_in": 1 };
years=[];
getHeaderDtls = function (): any { return { 'title': 'ILL-Dashboard ( Internet Leased Line )', 'icon': 'language' }; };

  constructor(public crdSrvc: CrudService,public _dsSidebarService: DsSidebarService,public snackBar: MatSnackBar,private router: Router) { }

  ngOnInit() {
    this.selectedIndex = 0;
    this.currentyear = (new Date()).getFullYear();
    var count = this.currentyear - 2016;
    for (var i = 0; i <= count; i++) {
      let yr = this.currentyear - i;
      this.years.push(yr);
    }
    this.mnthnm = this.monthNames[(new Date()).getMonth() - 1];
    this.mnthcrnt = this.monthNames[(new Date()).getMonth() - 2];
    console.log(this.years);
    this.selectedYearGrid = this.currentyear;
    this.getillconnectionscnt();
    this.getallillcafs();
    this.getinvcemntPrvsMnth();
    this.getgriddata();
  }
  getillconnectionscnt(){
    let rte = `dashbrd/getillConnctnsCnt`
    this.crdSrvc.get(rte).subscribe((res) => {
      console.log(res);
      this.illcafcnts = res['data'];
    })
  }
  dhbrdCellclk(devclmns) {
    console.log(devclmns)
    if(devclmns.data){
    this.prmsdtaill = [{
      type: 'YEAR_0',
      value: devclmns.data.invce_yr,
      compare: "YEAR_0",
    }, {
      type: 'MONTH_0',
      value: devclmns.data.invce_mm,
      compare: "MONTH_0",
    }]
  }
  console.log(this.prmsdtaill)
    this.router.navigate(['/admin/reports/custom/' + '3000091'], { queryParams: { "paramsdata": JSON.stringify(this.prmsdtaill) }, skipLocationChange: true });
  }
     
  getinvcemntPrvsMnth(){
    var formatter = new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
    })
    var n1 = (new Date()).getMonth() - 1;
    var n2 = (new Date()).getMonth();
    let ttl_shre = 0; let apsfl_shre = 0; let mso_shre = 0; let lmo_shre = 0;
    let rte = `dashbrd/getinvceamnt/lesdcstmr/${this.currentyear}`;
    this.crdSrvc.get(rte).subscribe((res) => {
      console.log(res);
      res['data'].forEach((element) => {
        this.showLdr = false;
        ttl_shre = ttl_shre + element.TOTAL_INVOICE_AMOUNT;
        apsfl_shre = apsfl_shre + element.APSFL_SHARE;
        mso_shre = mso_shre + element.MSO_SHARE;
        lmo_shre = lmo_shre + element.LMO_SHARE;

        if (n2 == element.invce_mm) {
          this.illcafInvceamnt[0].curnt_mnth_ttl_shre = formatter.format(element.TOTAL_INVOICE_AMOUNT);
          this.illcafInvceamnt[0].curnt_apsfl_shre = formatter.format(element.APSFL_SHARE);
          this.illcafInvceamnt[0].curnt_mso_shre = formatter.format(element.MSO_SHARE);
          this.illcafInvceamnt[0].curnt_lmo_shre = formatter.format(element.LMO_SHARE);
        }
        else if (n1 == element.invce_mm) {
          this.illcafInvceamnt[0].prev_mnth_ttl_shre = formatter.format(element.TOTAL_INVOICE_AMOUNT);
          this.illcafInvceamnt[0].pre_apsfl_shre = formatter.format(element.APSFL_SHARE);
          this.illcafInvceamnt[0].pre_mso_shre = formatter.format(element.MSO_SHARE);
          this.illcafInvceamnt[0].pre_lmo_shre = formatter.format(element.LMO_SHARE);
        }
        this.illcafInvceamnt[0].ttl_shre = formatter.format(ttl_shre);
        this.illcafInvceamnt[0].apsfl_shre = formatter.format(apsfl_shre);
        this.illcafInvceamnt[0].mso_shre = formatter.format(mso_shre);
        this.illcafInvceamnt[0].lmo_shre = formatter.format(lmo_shre);

      })
      // res['data'][0].mthly_amnt=formatter.format(res['data'][0].mthly_amnt);
      // res['data'][0].quatly_amnt=formatter.format(res['data'][0].quatly_amnt);
      // res['data'][0].half_amnt=formatter.format(res['data'][0].half_amnt);
      // res['data'][0].yrly_amnt=formatter.format(res['data'][0].yrly_amnt);
      // this.illcafInvceamnt = res['data'];
    })
  }
    getallillcafs(){
      this.showLdr = true;
      let rte = `dashbrd/getAllillCafs`
      this.crdSrvc.get(rte).subscribe((res) => {
        console.log(res);
        for(let i=0;i<res['data'].length;i++){
          res['data'][i]['Profile']="Profile"
        }
        this.totalcafslst = res['data'];
        this.showLdr = false;
        this.columnDefs = [
          { headerName: 'Sno', field: 's_no', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 100, filter: false },
          { headerName: 'CAF No', field: 'caf_nu', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 100 },
          { headerName: 'Profile', field: 'Profile', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 100 },
          { headerName: 'Customer Name', field: 'cstmr_nm', alignment: 'left', cellClass: 'pm-grid-number-cell', width: 200 },
          { headerName: 'Mobile Number', field: 'mbl_nu', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 130 },
          { headerName: 'Status', field: 'sts_nm', alignment: 'left', cellClass: 'pm-grid-number-cell', width: 100 },
          { headerName: 'District Name', field: 'dstrt_nm', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 120 },
          { headerName: 'LMO', field: 'agnt_cd', alignment: 'left', cellClass: 'pm-grid-number-cell', width: 100 },
          { headerName: 'Billing Frequency', field: 'frqncy_nm', alignment: 'left', cellClass: 'pm-grid-number-cell', width: 130 },
          { headerName: 'Activation Date', field: 'actvn_dt', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 150 },
          { headerName:'ONU Serial No', field: 'onu_srl_nu', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 120},
          { headerName:'Package Name', field: 'pckge_nm', alignment: 'left', cellClass: 'pm-grid-number-cell', width: 100},
          { headerName:'Package Cost', field: 'chrge_at', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 100}
        ];
      })
    }

    // onCelleditClick(data){
    //   console.log(data)
    //   this.setCafId = data.data.caf_nu;
    //   this.cstdtls=data.data;
    //   console.log(this.cstdtls)
    //   this.showCafSidebar = true;
    //   this.openSideBar();
    //   this.getPackageDtls(this.setCafId);
    //   this.getHsiDtls(this.setCafId)
    // }
    openSideBar = function () {
      console.log("in open sidebar")
      this.showCafSidebar = true;

      this._dsSidebarService.getSidebar('addFormPanel').toggleOpen();
    };

    getPackageDtls(id){
      console.log(id)
      this.showLdr = true;
      let rte = `caf/customer/ApppackagesNw/${id}`
      this.crdSrvc.get(rte).subscribe((res) => {
        console.log(res);
        if(res['data']){
          this.pckgDtls = res['data'];
          this.showLdr = false;
        }
        else {
          this.showLdr = false;
          this.snackBar.open('Packages Data not Found.', '', {
            duration: 3000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
          });
        }
      })
    }
    getHsiDtls(id){
      console.log(id)
      this.showLdr = true;
      let rte = `dashbrd/leasedCstmr/hsi/${id}`
      this.crdSrvc.get(rte).subscribe((res) => {
        console.log(res);
        if(res['data']){
          this.hsiDtls = res['data'];
          this.showLdr = false;
        }
        else {
          this.showLdr = false;
          this.snackBar.open('Usage Data not Found.', '', {
            duration: 3000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
          });
        }
      })
    }
    onCellClick(event): any {
      console.log("event",event.value)
      if (event.value == 'Profile'){
        this.setCafId = event.data.caf_nu;
        this.cstdtls=event.data;
        console.log(this.cstdtls)
        this.showCafSidebar = true;
        this.openSideBar();
        this.getPackageDtls(this.setCafId);
        this.getHsiDtls(this.setCafId)
      }
    }
    onCellPrepared(colDef, e) {
    
      if (e.rowType === 'data' && e.row.data && e.column.dataField == 'Profile') {
        e.cellElement.style.color = '#ff0000';
        e.cellElement.style.fontWeight = 500;
        e.cellElement.style.borderRadius = '10px';
         e.cellElement.style.background = 'rgba(243, 191, 176, 0.2784313725490196)';
         e.cellElement.style.backgroundClip = 'content-box';
         e.cellElement.style.cursor = 'pointer';
      }
   
  }
  getgriddata(){
    let rte1 = `dashbrd/getinvceamnt/lesdcstmr/${this.selectedYearGrid}`
    this.crdSrvc.get(rte1).subscribe((res) => {
      for (var i = 0; i < res['data'].length; i++) {
        res['data'][i]['month'] = this.monthNames[res['data'][i].invce_mm - 1];
      }
      this.griddata = res['data']
      console.log(this.griddata)
    })
  }
}
