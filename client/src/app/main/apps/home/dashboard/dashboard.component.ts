import { Component, OnInit } from '@angular/core';
import { CrudService } from '../../crud.service';
import { number } from '@amcharts/amcharts4/core';
import { Router } from '@angular/router';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  chartdata = [];
  griddata = [];
  distLst: any;
  permissions;
  years: number[] = [];
  currentyear;
  prvsyear;
  yearfrrvnue: number = new Date().getFullYear();
  monthfrrvnue: number = new Date().getMonth();
  columnDefs = [];
  distmsodata = [];
  cafs;
  totalotlcnt :any;
  gridData:any;

  currentmonth: number;
  grossProductData: { state: string; Received: number; Pending: number; Total: number; }[];
  defaultVisible = true;
  withTemplateVisible = true;
  withAnimationVisible = true;

  selected: any;
  stpBxsCount = [{ ttl_stp_bxs: 0, ttl_lmo_stp_bxs: 0, ttl_mso_stp_bxs: 0, ttl_apsfl_stp_bxs: 0 }];
  agntCount = [{ ttl_cnt: 0, mso_cnt: 0, lmo_cnt: 0, apsfl_cnt: 0 }];
  cafCount = [{ ttl_cnt: 0, ind_cnt: 0, ent_cnt: 0, ent_priv_cnt: 0, ent_govt_cnt: 0, rmng_ent_govt_cnt: 0,bbnl :0,goi:0,Others:0 }];
  cafsharescnt = [{PLAN_NAME:"HomeBasic",CAF_COUNT:0, APSFL_SHARE:0,LMO_SHARE:0, MSO_SHARE:0,Add_on_Charges:0},{PLAN_NAME:"HomeMini",CAF_COUNT:0, APSFL_SHARE:0,LMO_SHARE:0, MSO_SHARE:0,Add_on_Charges:0},{
    PLAN_NAME:"Home Essential",CAF_COUNT:0, APSFL_SHARE:0,LMO_SHARE:0, MSO_SHARE:0,Add_on_Charges:0},{PLAN_NAME:"HomeStandard",CAF_COUNT:0, APSFL_SHARE:0,LMO_SHARE:0, MSO_SHARE:0,Add_on_Charges:0},
    {PLAN_NAME:"Home Premium",CAF_COUNT:0, APSFL_SHARE:0,LMO_SHARE:0, MSO_SHARE:0,Add_on_Charges:0,},{PLAN_NAME:"TOTAL",CAF_COUNT:0, APSFL_SHARE:0,LMO_SHARE:0, MSO_SHARE:0,Add_on_Charges:0,}];

  share = [{ ttl_shre: '0', curnt_mnth_ttl_shre: '0', prev_mnth_ttl_shre: '0', curnt_apsfl_shre: '0', pre_apsfl_shre: '0', curnt_mso_shre: '0', pre_mso_shre: '0', curnt_lmo_shre: '0', pre_lmo_shre: '0', apsfl_shre: '0', mso_shre: '0', lmo_shre: '0' }];
  selectedYear;
  selectedYearGrid;
  selectedYearsGrid;
  selectedMonthGrid;
  selectedDist;
  monthfrpln;
  monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  months_id = [
    { id: '01', name: "January" }, { id: '02', name: "February" }, { id: '03', name: "March" }, { id: '04', name: "April" }, { id: '05', name: "May" }, { id: '064', name: "June" }, { id: '07', name: "July" }, { id: '08', name: "August" }, { id: '09', name: "Spetember" }, { id: '10', name: "October" }, { id: '11', name: "November" }, { id: '12', name: "December" }
  ]
  mnthnm: any;
  mnthcrnt: any;
  columnDefs1;
  showLdr: boolean;
  prmsdta;
  showOne: boolean;
    showTwo: boolean;
    showThree: boolean;
    showFour:boolean;
  gridColumnDefs = [];
  ShowGr: boolean = false;
  shwLdr: boolean;
  edibtnenble: boolean = false;
  cardType: any;


  constructor(public crdSrvc: CrudService, private router: Router) {
    this.permissions = { "slct_in": 1, "insrt_in": 1, "updt_in": 1, "dlte_in": 1, "exprt_in": 1 };
  }
  onPointClick(val) { };

  ngOnInit() {
    this.getCpeCounts();
    this.getAgntsCounts();
    this.getCafCounts();
	
    this.getdistricts();
    this.totaloltcount();

 //this.currentyear = (new Date()).getFullYear();
   
  
 this.monthfrpln = (new Date()).getMonth()+1;
 console.log(this.monthfrpln)
 if(this.monthfrpln == 1){
   this.currentyear = (new Date()).getFullYear()-1;
   this.prvsyear = (new Date()).getFullYear()-1;
 } else if(this.monthfrpln == 2) {
   this.currentyear = (new Date()).getFullYear();
   this.prvsyear = (new Date()).getFullYear()-1;
 }else {
   this.currentyear = (new Date()).getFullYear();
   this.prvsyear = (new Date()).getFullYear();
 }
 var count = this.currentyear - 2016;
 for (var i = 0; i <= count; i++) {
   let yr = this.currentyear - i;
   this.years.push(yr);
 }
   var mnt = this.monthfrpln-1;
   if(mnt == 0){
     this.monthfrpln = 12;
     this.mnthnm = this.monthNames[this.monthfrpln- 1];
     this.mnthcrnt = this.monthNames[this.monthfrpln - 2];
   } else if ( mnt == 1){
     console.log(mnt, this.monthfrpln)
     this.mnthnm = this.monthNames[this.monthfrpln - 2];
     this.mnthcrnt = this.monthNames[11];
   } else {
     this.mnthnm = this.monthNames[this.monthfrpln- 2];
     this.mnthcrnt = this.monthNames[this.monthfrpln - 3];
   }

 //this.mnthnm = this.monthNames[(new Date()).getMonth() - 1];
 //this.mnthcrnt = this.monthNames[(new Date()).getMonth() - 2];

 console.log("month names ",this.mnthnm,this.mnthcrnt);
 this.selectedYear = this.currentyear;
 this.selectedYearGrid = this.currentyear;
 
 
 this.selectedMonthGrid = this.monthfrpln-1;
    this.submit();
    this.getgriddata();
	//this.getcafsharescnt();

  }

  getData(type){

    this.cardType = this.getgridCardName(type);
    if (type == 1) {
      this.getCard1();
  } else if (type == 2) {
      this.getCard2();
  } else if (type == 3) {
      this.getCard3();
  } else if (type == 4) {
    this.getCard4();
} 
  }

  getgridCardName(type) {
    if (type == 1) {
        return "Government";
    } else if (type == 2) {
        return "Private";
    } else if (type == 3) {
        return "Others";
    } else if (type == 4) {
        return "OLT List";
    } 

}

  getCard1(){
    // console.log("data")
        this.gridData = [];
        this.ShowGr = true;
        this.showOne = true; this.showTwo = false; this.showThree = false; this.showFour = false;


        /********************************Get Active CAF's list ****************************************** */
        if (this.showOne == true) {
            this.shwLdr = true;
            this.edibtnenble = false;
            let rte = "dashbrd/entlistviwes";
            // this.nxtData = "lmoprepaid/totalprepaidcafslistdata";
            // console.log(rte);
            const lmoData = {
                "id":1
    

            };
            this.crdSrvc.create(lmoData,rte).subscribe((res) => {
              console.log(res)
                this.gridData = res["data"];
                let ct = 0;
              this.gridData.filter((k)=>{
                k["sno"] = ++ct;
              });
                console.log(this.gridData);
                this.shwLdr = false;
            });
            this.gridColumnDefs = [
                { headerName: 'S.NO', field: 'sno', alignment: 'center', filter: false },
                { headerName: 'DISTRICT NAME', alignment: 'center', field: 'district_Name' },
                { headerName: 'AGENT NAME', alignment: 'center', field: 'agnt_cd' },
                { headerName: 'CAF ID', alignment: 'center', field: 'caf_id' },
                // { headerName: 'LMO CODE', alignment: 'center', field: 'lmo_agnt_id' },
                { headerName: 'MOBILE', field: 'mbl_nu', alignment: 'center' },
                // { headerName: 'STATUS', field: 'status', alignment: 'center' },
                // { headerName: 'Cycle Start Date', field: 'Cycle_Start_Date', alignment: 'center' },
                // { headerName: 'Cycle End Date', field: 'Cycle_End_Date', alignment: 'center' },
            ];
        }
    

}

  getCard2(){
    // console.log("data3")
        this.gridData = [];
        this.ShowGr = true;
        this.showOne = false; this.showTwo = true; this.showThree = false; this.showFour = false;


        /********************************Get Active CAF's list ****************************************** */
        if (this.showThree == false) {
            this.shwLdr = true;
            this.edibtnenble = false;
            let rte = "dashbrd/entlistviwes";
            // this.nxtData = "lmoprepaid/totalprepaidcafslistdata";
            // console.log(rte);
			const lmoData = {
                "id":2
    

            };
            
            this.crdSrvc.create(lmoData,rte).subscribe((res) => {
              // console.log(res)
                this.gridData = res["data"];
                let ct = 0;
              this.gridData.filter((k)=>{
                k["sno"] = ++ct;
              });
                console.log(this.gridData);
                this.shwLdr = false;
            });
            this.gridColumnDefs = [
                { headerName: 'S.NO', field: 'sno', alignment: 'center', filter: false },
                { headerName: 'DISTRICT NAME', alignment: 'center', field: 'district_Name' },
                { headerName: 'AGENT NAME', alignment: 'center', field: 'agnt_cd' },
                { headerName: 'CAF ID', alignment: 'center', field: 'caf_id' },
                // { headerName: 'LMO CODE', alignment: 'center', field: 'lmo_agnt_id' },
                { headerName: 'MOBILE', field: 'mbl_nu', alignment: 'center' },
                // { headerName: 'STATUS', field: 'status', alignment: 'center' },
                // { headerName: 'Cycle Start Date', field: 'Cycle_Start_Date', alignment: 'center' },
                // { headerName: 'Cycle End Date', field: 'Cycle_End_Date', alignment: 'center' },
            ];
        }
    

}

  getCard3(){
    console.log("data3")
        this.gridData = [];
        this.ShowGr = true;
        this.showOne = false; this.showTwo = false; this.showThree = true; this.showFour = false;


        /********************************Get Active CAF's list ****************************************** */
        if (this.showThree == true) {
            this.shwLdr = true;
            this.edibtnenble = false;
            let rte = "dashbrd/entlistviwes";
            // this.nxtData = "lmoprepaid/totalprepaidcafslistdata";
            console.log(rte);
            const lmoData = {
                "id":3

            };
            this.crdSrvc.create(lmoData,rte).subscribe((res) => {
              // console.log(res)
                this.gridData = res["data"];
                let ct = 0;
              this.gridData.filter((k)=>{
                k["sno"] = ++ct;
              });
                console.log(this.gridData);
                this.shwLdr = false;
            });
            this.gridColumnDefs = [
                { headerName: 'S.NO', field: 'sno', alignment: 'center', filter: false },
                { headerName: 'DISTRICT NAME', alignment: 'center', field: 'district_Name' },
                { headerName: 'AGENT NAME', alignment: 'center', field: 'agnt_cd' },
                { headerName: 'CAF ID', alignment: 'center', field: 'caf_id' },
                // { headerName: 'LMO CODE', alignment: 'center', field: 'lmo_agnt_id' },
                { headerName: 'MOBILE', field: 'mbl_nu', alignment: 'center' },
                // { headerName: 'STATUS', field: 'status', alignment: 'center' },
                // { headerName: 'Cycle Start Date', field: 'Cycle_Start_Date', alignment: 'center' },
                // { headerName: 'Cycle End Date', field: 'Cycle_End_Date', alignment: 'center' },
            ];
        }
    

}

getCard4(){
  // console.log("data")
      this.gridData = [];
      this.ShowGr = true;
      this.showOne = false; this.showTwo = false; this.showThree = false ; this.showFour = true;


      /********************************Get Active CAF's list ****************************************** */
      if (this.showFour == true) {
          this.shwLdr = true;
          this.edibtnenble = false;
          let rte = "dashbrd/oltlistview";
          // this.nxtData = "lmoprepaid/totalprepaidcafslistdata";
          // console.log(rte);
          // const lmoData = {
          //     dstrt: "Bapatla",
          //     dstrt_fltr: true,
          //     "lmt_pstn": 0,

          // };
          this.crdSrvc.get(rte).subscribe((res) => {
            console.log(res)
              this.gridData = res["data"];
              let ct = 0;
              this.gridData.filter((k)=>{
                k["sno"] = ++ct;
              });
              // console.log(this.gridData);
              this.shwLdr = false;
          });
          this.gridColumnDefs = [
              { headerName: 'S.NO', field: 'sno', alignment: 'center', filter: false },
              { headerName: 'OLT ID', alignment: 'center', field: 'olt_id' },
              { headerName: 'OLT NAME', alignment: 'center', field: 'olt_nm' },
              { headerName: 'OLT IP ADDRESS', alignment: 'center', field: 'olt_ip_addr_tx' },
              { headerName: 'OLT SERIAL NUMBER', alignment: 'center', field: 'olt_srl_nu' },
              { headerName: 'SUBSTATION NAME', field: 'sbstn_nm', alignment: 'center' },
              // { headerName: 'STATUS', field: 'status', alignment: 'center' },
              // { headerName: 'Cycle Start Date', field: 'Cycle_Start_Date', alignment: 'center' },
              // { headerName: 'Cycle End Date', field: 'Cycle_End_Date', alignment: 'center' },
          ];
      }
  

}

  customizeTooltip(arg: any) {
    return {
      text: arg.seriesName + ' - ' + arg.valueText
    };
  }

  getdistricts() {
    let rte = `user/getdstrcts/${1}`
    this.crdSrvc.get(rte).subscribe((res) => {
      this.distLst = res['data'];
      this.selectedDist = 'ALL';
      this.graphdata();

    })
  }

  getCpeCounts() {
    this.showLdr = true;
    let rte = `dashbrd/getCpeConuts`;
    const dstrct_fltr = false;
    this.crdSrvc.create({dstrct_fltr: dstrct_fltr}, rte).subscribe((res) => {
      this.stpBxsCount = res['data'];
      this.showLdr = false;
    });
  }
  getAgntsCounts() {
    this.showLdr = true;
    let rte = `dashbrd/getAgentsConuts`;
    const dstrct_fltr = false;
    this.crdSrvc.create({dstrct_fltr: dstrct_fltr}, rte).subscribe((res) => {
      this.agntCount = res['data'];
      this.showLdr = false;
    });
  }
  getCafCounts() {
    this.showLdr = true;
    let rte = `dashbrd/getCafConuts`;
    const dstrct_fltr = false;
    this.crdSrvc.create({dstrct_fltr: dstrct_fltr}, rte).subscribe((res) => {
	console.log(res)
      this.cafCount = res['data'];
      this.showLdr = false;
    })
  }

  totaloltcount(){
    let rte = "dashbrd/totalolts";
    this.crdSrvc.get(rte).subscribe((res)=>{
      // console.log(rte)
      // console.log(res)
        this.totalotlcnt = res["data"]
    })
  }


  getgovtlstData(){
    // console.log("Value coming")
    let rte = "";
    this.crdSrvc.get(rte).subscribe((res)=>{
      console.log(res)
          this.gridData = res["data"]
    })
  }

  getprivtlstData(){
    let rte = "";
    this.crdSrvc.get(rte).subscribe((res)=>{
      console.log(res)
          this.gridData = res["data"]
    })
  }

  getotherlstData(){
    let rte = "";
    this.crdSrvc.get(rte).subscribe((res)=>{
      console.log(res)
          this.gridData = res["data"]
    })
  }


  getcafsharescnt() {
    this.showLdr = true;
    let rte = `dashbrd/planwisedata/${this.selectedYearsGrid}/${this.selectedMonthGrid}`;
    const dstrct_fltr = false;
    this.crdSrvc.get(rte).subscribe((res) => {
      console.log(" check cafshares",this.cafsharescnt);
      if(res['data'].length > 1){
        this.cafsharescnt = res['data'];
        console.log(" check cafshares in if condition ",this.cafsharescnt);
        console.log("cafshares[0]",this.cafsharescnt[0]);
        console.log("cafshares[1]",this.cafsharescnt[1]);
      } else {
        this.cafsharescnt = [{PLAN_NAME:"HomeBasic",CAF_COUNT:0, APSFL_SHARE:0,LMO_SHARE:0, MSO_SHARE:0,Add_on_Charges:0},{PLAN_NAME:"HomeMini",CAF_COUNT:0, APSFL_SHARE:0,LMO_SHARE:0, MSO_SHARE:0,Add_on_Charges:0},{
          PLAN_NAME:"Home Essential",CAF_COUNT:0, APSFL_SHARE:0,LMO_SHARE:0, MSO_SHARE:0,Add_on_Charges:0},{PLAN_NAME:"HomeStandard",CAF_COUNT:0, APSFL_SHARE:0,LMO_SHARE:0, MSO_SHARE:0,Add_on_Charges:0},
          {PLAN_NAME:"Home Premium",CAF_COUNT:0, APSFL_SHARE:0,LMO_SHARE:0, MSO_SHARE:0,Add_on_Charges:0,},{PLAN_NAME:"TOTAL",CAF_COUNT:0, APSFL_SHARE:0,LMO_SHARE:0, MSO_SHARE:0,Add_on_Charges:0,}];
      }
     
      this.showLdr = false;
    })
  }

  submit() {
    this.showLdr = true;
    //var mnt = this.monthfrpln-1;
    var mnt = this.monthfrpln;
    if(mnt == 0){
      this.monthfrpln = 12;
      n1 = this.monthfrpln;
      n2 = this.monthfrpln - 1;
    } else if ( mnt == 1){
      n1= this.monthfrpln - 1;
      n2 = 12;
    } else if ( mnt == 12){
      n1= 12;
      n2 = this.monthfrpln - 1;
    } else {
      n1 = this.monthfrpln-1;
      n2 = this.monthfrpln - 2;
    }
    var n1 ;
    var n2 ;
    var n3 = this.currentyear ;
    var n4 = this.prvsyear;
    console.log(n1,n2,n3,n4)
    
    let ttl_shre = 0; let apsfl_shre = 0; let mso_shre = 0; let lmo_shre = 0;
    let rte1 = `dashbrd/getAllShareConuts/${this.currentyear}`
    this.crdSrvc.get(rte1).subscribe((res) => {
      res['data'].forEach((element) => {
        this.showLdr = false;
        var formatter = new Intl.NumberFormat('en-IN', {
          style: 'currency',
          currency: 'INR',
        })
        ttl_shre = ttl_shre + element.TOTAL_INVOICE_AMOUNT;
        apsfl_shre = apsfl_shre + element.APSFL_SHARE;
        mso_shre = mso_shre + element.MSO_SHARE;
        lmo_shre = lmo_shre + element.LMO_SHARE;

        if (n1 == element.invce_mm && n3 == element.invce_yr) {
          this.share[0].curnt_mnth_ttl_shre = formatter.format(element.TOTAL_INVOICE_AMOUNT);
          this.share[0].curnt_apsfl_shre = formatter.format(element.APSFL_SHARE);
          this.share[0].curnt_mso_shre = formatter.format(element.MSO_SHARE);
          this.share[0].curnt_lmo_shre = formatter.format(element.LMO_SHARE);
        }
        else if (n2 == element.invce_mm && n4 == element.invce_yr) {
          this.share[0].prev_mnth_ttl_shre = formatter.format(element.TOTAL_INVOICE_AMOUNT);
          this.share[0].pre_apsfl_shre = formatter.format(element.APSFL_SHARE);
          this.share[0].pre_mso_shre = formatter.format(element.MSO_SHARE);
          this.share[0].pre_lmo_shre = formatter.format(element.LMO_SHARE);
        }
        this.share[0].ttl_shre = formatter.format(ttl_shre);
        this.share[0].apsfl_shre = formatter.format(apsfl_shre);
        this.share[0].mso_shre = formatter.format(mso_shre);
        this.share[0].lmo_shre = formatter.format(lmo_shre);

      })
      console.log(this.share)
    })
  }

  graphdata() {
    this.showLdr = true;
    if (this.selectedDist == "ALL") {
      let rte1 = `dashbrd/getAllShareConuts/${this.selectedYear}`
      this.crdSrvc.get(rte1).subscribe((res) => {
        for (var i = 0; i < res['data'].length; i++) {
          if(res['data'][i].invce_mm)
          res['data'][i]['month'] = this.monthNames[res['data'][i].invce_mm - 1];
        }
        this.showLdr = false;
        this.chartdata = res['data']
      })
    }
    else {
      let rte = `dashbrd/getShareConuts/${this.selectedYear}/${this.selectedDist}`
      this.crdSrvc.get(rte).subscribe((res) => {
        for (var i = 0; i < res['data'].length; i++) {
          res['data'][i]['month'] = this.monthNames[res['data'][i].invce_mm - 1];
        }
        this.showLdr = false;
        this.chartdata = res['data']
      })
    }
  }
  getgriddata() {

    let rte1 = `dashbrd/getAllShareConuts/${this.selectedYearGrid}`
    this.crdSrvc.get(rte1).subscribe((res) => {
      for (var i = 0; i < res['data'].length; i++) {
        res['data'][i]['month'] = this.monthNames[res['data'][i].invce_mm - 1];
      }
      this.griddata = res['data']
      console.log(this.griddata)
    })
    // let rte2 = `dashbrd/getCafsConuts/${this.selectedYearGrid}`
    // this.crdSrvc.get(rte2).subscribe((res) => {
    //   for (var i = 0; i < res['data'][0].length; i++) {
    //     res['data'][0][i]['month'] = this.monthNames[res['data'][0][i].mnth_nm - 1];
    //     for (var j = 0; j < res['data'][1].length; j++) {
    //       if (res['data'][0][i].mnth_nm == res['data'][1][j].mnth_id) {
    //         res['data'][0][i]['sno'] = res['data'][1][j].sno;
    //         if (res['data'][1][j].ttl_sus_cafs == null) { res['data'][1][j].ttl_sus_cafs = 0 }
    //         res['data'][0][i]['ttl_suspnd'] = res['data'][1][j].ttl_sus_cafs;
    //       }
    //     }
    //   }
    //   this.cafs = res['data'][0];
    // })
  }

  dhbrdCellclk(devclmns) {
    if(devclmns.data){
    this.prmsdta = [{
      type: 'YEAR_1',
      value:  devclmns.data.invce_yr,
      compare: "YEAR_1",
    }, {
      type: 'YEAR_0',
      value: devclmns.data.invce_yr,
      compare: "YEAR_0",
    }, {
      type: 'MONTH_0',
      value: devclmns.data.invce_mm,
      compare: "MONTH_0",
    }]
  }

    this.router.navigate(['/admin/reports/custom/' + '2000008'], { queryParams: { "paramsdata": JSON.stringify(this.prmsdta) }, skipLocationChange: true });
  }
  onCellPrepared( e: any) {
    if (e.rowType === "data" && e.row.data) {
      e.cellElement.style.cursor = "pointer";
    }
  }

}
