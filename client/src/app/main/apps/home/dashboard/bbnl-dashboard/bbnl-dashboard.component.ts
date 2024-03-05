import { Component, OnInit } from '@angular/core';
import { CrudService } from 'app/main/apps/crud.service';
import {
  MatTableDataSource, MatPaginator, MatSort, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition, MatDialogRef, MatSnackBar, MatDialog,
  MAT_DIALOG_DATA
} from '@angular/material';

@Component({
  selector: 'app-bbnl-dashboard',
  templateUrl: './bbnl-dashboard.component.html',
  styleUrls: ['./bbnl-dashboard.component.scss']
})
export class BbnlDashboardComponent implements OnInit {
  showLdr: boolean;
  stpBxsCount: any;
  agntCount: any;
  cafCount: any;
   showOne: boolean;
    showTwo: boolean;
    showThree: boolean;
    showFour:boolean;
  lmo_code;
  lmochckurl:boolean=false;
  lmodatachck:boolean=false;
  lmochck:boolean=false;
  lmoSumryCnts: any;
  columnDefs: any;
  years: number[] = [];
  monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  months = [
    // tslint:disable-next-line:max-line-length
    { id: 1, name: 'January' }, { id: 2, name: 'February' }, { id: 3, name: 'March' }, { id: 4, name: 'April' }, { id: 5, name: 'May' }, { id: 6, name: 'June' }, { id: 7, name: 'July' }, { id: 8, name: 'August' }, { id: 9, name: 'Spetember' }, { id: 10, name: 'October' }, { id: 11, name: 'November' }, { id: 12, name: 'December' }
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

  crntYrNm = this.curdate.getFullYear();
  dstrctNm: any;
  usrdtls: any;
  shwDstrctDrpdwn;
  dstrctLst: any;
  lmokycdetails;
  lmocnclchck;
  selectedDstrt;
  lmoaadhar;
  lmopan;
  lmocertificate;
  lmoidproof;
  totalotlcnt:any;
   gridColumnDefs = [];
 
   gridData:any;
   ShowGr: boolean = false;
    shwLdr: boolean;
	edibtnenble: boolean = false;
	cardType: any;
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  constructor(public crdSrvc: CrudService, public _snackBar: MatSnackBar) { }

  ngOnInit(): any {
  this.totaloltcount();
    this.selectedYear = this.curdate.getFullYear();
    this.selectedMonth = this.curdate.getMonth() + 1;
    this.currentyear = (new Date()).getFullYear();
      const count = this.currentyear - 2016;
      for (let i = 0; i <= count; i++) {
        const yr = this.currentyear - i;
        this.years.push(yr);
      }
    this.usrdtls = JSON.parse(localStorage.getItem('usrDtls'));
    /*if (this.usrdtls.hyrchy_grp_id == null) {
      this.shwDstrctDrpdwn = true;
      const rte = `admin/districts`;
      this.crdSrvc.get(rte).subscribe((res) => {
        this.dstrctLst = res['data'];
        // tslint:disable-next-line:triple-equals
        if (this.selectedDstrt == undefined) {
          this.selectedDstrt = 12;
          this.getCpeCounts();
          this.getAgntsCounts();
          this.getCafCounts();
          this.getLmoWiseData();
          this.getCrntPrvMnthOprtnCnts();
        }
      });
    } else {*/
      this.shwDstrctDrpdwn = false;
      this.getCpeCounts();
      this.getAgntsCounts();
      this.getCafCounts();
      this.getLmoWiseData();
      this.getCrntPrvMnthOprtnCnts();
    //}
    if(this.usrdtls.usr_ctgry_id != 8){
      console.log("true");
      
      this.lmochck = true
      console.log("this.lmochck",this.lmochck);
    }
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
    // console.log("data3")
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
  getlmokycDtls(){
    const rte = `dashbrd/getsinglelmodata`;
    if(this.lmo_code == null){
      this._snackBar.open('Please Fill Lmo Code', '', {
        duration: 2000,
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      });
    } else {
      let data ={
        "lmo_code": this.lmo_code
      }
      this.crdSrvc.create(data,rte).subscribe((res) => {
        if(res['data'] && res['data'].length > 0){
          this.lmokycdetails = res['data'];
          this.lmocnclchck = res['data'][0]['dcmnt_canceled_cheque'];
          this.lmoaadhar = res['data'][0]['dcmnt_url_tx']
          this.lmopan = res['data'][0]['dcmnt_pan']
          this.lmoidproof = res['data'][0]['dcmnt_id_proof']
          this.lmocertificate = res['data'][0]['dcmnt_incorparation_certificate']
          this.lmodatachck = true
        } else {
          this.lmodatachck = false
          this._snackBar.open('No Data Found in DB... Please Inform LMO To Update The KYC', '', {
            duration: 2000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
          });
        }
      });
    }
  }
  chequegetlinkUrl(id){
      if(this.lmokycdetails && this.lmokycdetails.length > 0){
        if(id==1){
          window.open(`http://bssuat.apsfl.co.in/prepaidimages${this.lmocnclchck}`)
        } else if(id==2){
          window.open(`http://bssuat.apsfl.co.in/prepaidimages${this.lmoaadhar}`)
        } else if(id==3){
          window.open(`http://bssuat.apsfl.co.in/prepaidimages${this.lmopan}`)
        } else if(id==4){
          window.open(`http://bssuat.apsfl.co.in/prepaidimages${this.lmoidproof}`)
        } else if(id==5){
          window.open(`http://bssuat.apsfl.co.in/prepaidimages${this.lmocertificate}`)
        }
      } else {
        this._snackBar.open('No Data Found in DB... Please Inform LMO To Update The KYC', '', {
          duration: 2000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
      }
    
  }

  selectedDstrct(data): any {
    this.selectedDstrt = data.value;
    this.getCpeCounts();
    this.getAgntsCounts();
    this.getCafCounts();
    this.getLmoWiseData();
    this.getCrntPrvMnthOprtnCnts();
  }

  getCpeCounts(): any {
    this.showLdr = true;
    const rte = `dashbrd/getCpeConuts`;
    const dstrct_fltr = false;
    this.crdSrvc.create({ dstrct_fltr: dstrct_fltr, slctdDstrct: this.selectedDstrt }, rte).subscribe((res) => {
      this.stpBxsCount = res['data'];
      this.showLdr = false;
    });
  }
  getAgntsCounts(): any {
    this.showLdr = true;
    const rte = `dashbrd/getAgentsConuts`;
    const dstrct_fltr = false;
    this.crdSrvc.create({ dstrct_fltr: dstrct_fltr, slctdDstrct: this.selectedDstrt }, rte).subscribe((res) => {
      this.agntCount = res['data'];
      this.showLdr = false;
    });
  }
  getCafCounts(): any {
    this.showLdr = true;
    const rte = `dashbrd/getCafConuts`;
    const dstrct_fltr = false;
    this.crdSrvc.create({ dstrct_fltr: dstrct_fltr, slctdDstrct: this.selectedDstrt }, rte).subscribe((res) => {
      this.cafCount = res['data'];
      this.showLdr = false;
    });
  }
  
   totaloltcount(){
    let rte = "dashbrd/totalolts";
    this.crdSrvc.get(rte).subscribe((res)=>{
      // console.log(rte)
      // console.log(res)
        this.totalotlcnt = res["data"]
    })
  }
  
  
  
  getLmoWiseData(): any {
    this.showLdr = true;
    const lmoData = {
      year: this.selectedYear,
      mnth: this.selectedMonth,
      dstrt: ''//this.selectedDstrt
    };
	
	
    const rte = `dashbrd/agent/monthly/operational/summary`;
    this.crdSrvc.create(lmoData, rte).subscribe((res) => {
      this.lmoSumryCnts = res['data'];
      this.dstrctNm = this.lmoSumryCnts[0].dstrt_nm;
      let ct = 0;
      this.lmoSumryCnts.filter(k => {
        k['sno'] = ++ct;
      });
      this.showLdr = false;
      this.columnDefs = [
        { headerName: 'Sno', field: 'sno', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 100, filter: false },
        { headerName: 'LMO Code', field: 'agnt_cd', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 150 },
        { headerName: 'LMO Name', field: 'agnt_nm', alignment: 'left', cellClass: 'pm-grid-number-cell', width: 265 },
        { headerName: 'CAFs Provisioned', field: 'nw_caf_ct', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 150 },
        { headerName: 'CAFs Suspended', field: 'spnd_caf_ct', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 150 },
        { headerName: 'CAFs Resume', field: 'rsmed_caf_ct', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 150 },
        { headerName: 'CAFs Terminated', field: 'trmnd_caf_ct', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 150 },
        { headerName: 'Box Change', field: 'box_chnge_ct', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 150 },
        { headerName: 'PON Change', field: 'pon_chnge_ct', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 150 }
      ];
    });
  }

  getCrntPrvMnthOprtnCnts(): any {
    this.showLdr = true;
    const rte = `dashbrd/current/previous/month/caf/operations`;
    const dstrtData = {
      dstrt: ''//this.selectedDstrt
    };
    this.crdSrvc.create(dstrtData, rte).subscribe((res) => {
      this.crntPrvsMnthCounts = res['data'];
      this.cafOprtnCrntMnth = res['data'].crntMnthRes[0];
      this.cafOprtnPrvMnth = res['data'].prvMnthRes[0];
      this.showLdr = false;
    });
  }
}

