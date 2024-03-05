  import { Component, OnInit } from '@angular/core';
  import { CrudService } from 'app/main/apps/crud.service';
  import {
    MatTableDataSource, MatPaginator, MatSort, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition, MatDialogRef, MatSnackBar, MatDialog,
    MAT_DIALOG_DATA
  } from '@angular/material';

  @Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
  })
  export class DashboardComponent implements OnInit {
    showLdr: boolean;
    cafCount = [{ ttl_cnt: 0, ind_cnt: 0, ent_cnt: 0, ent_priv_cnt: 0, ent_govt_cnt: 0 }];
    usrdtls;
    stpBxsCount = [{ ttl_stp_bxs: 0, ttl_lmo_stp_bxs: 0, ttl_mso_stp_bxs: 0, ttl_apsfl_stp_bxs: 0 ,ttl_aval_stp_bxs:0,ttl_caf_stp_bxs:0}];
    cafLst6MnthCount;
    cafOprtns;
    cafTdyCount:any;
    cafprvMnthCount:any;
    lmochck: boolean=false;
    horizontalPosition: MatSnackBarHorizontalPosition = 'right';
    verticalPosition: MatSnackBarVerticalPosition = 'top';
    lmochckurl;
    months_id = [
      { id: '01', name: "January" }, { id: '02', name: "February" }, { id: '03', name: "March" }, { id: '04', name: "April" }, { id: '05', name: "May" }, { id: '064', name: "June" }, { id: '07', name: "July" }, { id: '08', name: "August" }, { id: '09', name: "Spetember" }, { id: '10', name: "October" }, { id: '11', name: "November" }, { id: '12', name: "December" }
    ]
    constructor(public crdSrvc: CrudService, public _snackBar: MatSnackBar) { }

    ngOnInit() {
      this.usrdtls = JSON.parse(localStorage.getItem('usrDtls'));
      this.getCafCounts();
      this.getCpeCounts();
      this.getCafOprts();
      this.getCafTdyCnts();
      //this.getlinkUrl();
      console.log("this.usrdtls.usr_ctgry_id",this.usrdtls.usr_ctgry_id);
      
      if(this.usrdtls.usr_ctgry_id == 8){
        console.log("true");
        
        this.lmochck = true
        console.log("this.lmochck",this.lmochck);
      }
      
    }
    chequegetlinkUrl(){
      const rte = `dashbrd/getlmodata/${this.usrdtls.usr_ctgry_ky}`;
      this.crdSrvc.get(rte).subscribe((res) => {
        if(res['data'] && res['data'].length > 0){
          this.lmochckurl= res['data'][0]['dcmnt_canceled_cheque']
          window.open(`https://bbnlbss.apsfl.co.in/prepaidimages${this.lmochckurl}`)
        } else {
          this._snackBar.open('No Data Found in DB... Please Do KYC', '', {
            duration: 2000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
          });
        }
      });
      
    }
    AadhargetlinkUrl(){
      const rte = `dashbrd/getlmodata/${this.usrdtls.usr_ctgry_ky}`;
      this.crdSrvc.get(rte).subscribe((res) => {
        if(res['data'] && res['data'].length > 0){
          this.lmochckurl= res['data'][0]['dcmnt_url_tx']
          window.open(`https://bbnlbss.apsfl.co.in/prepaidimages${this.lmochckurl}`)
        } else {
          this._snackBar.open('No Data Found in DB... Please Do KYC', '', {
            duration: 2000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
          });
        }
      });
      
    }
    PANgetlinkUrl(){
      const rte = `dashbrd/getlmodata/${this.usrdtls.usr_ctgry_ky}`;
      this.crdSrvc.get(rte).subscribe((res) => {
        if(res['data'] && res['data'].length > 0){
          this.lmochckurl= res['data'][0]['dcmnt_pan']
          window.open(`https://bbnlbss.apsfl.co.in/prepaidimages${this.lmochckurl}`)
        } else {
          this._snackBar.open('No Data Found in DB... Please Do KYC', '', {
            duration: 2000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
          });
        }
      });
      
    }
    IDproofgetlinkUrl(){
      const rte = `dashbrd/getlmodata/${this.usrdtls.usr_ctgry_ky}`;
      this.crdSrvc.get(rte).subscribe((res) => {
        if(res['data'] && res['data'].length > 0){
          this.lmochckurl= res['data'][0]['dcmnt_id_proof']
          window.open(`https://bbnlbss.apsfl.co.in/prepaidimages${this.lmochckurl}`)
        } else {
          this._snackBar.open('No Data Found in DB... Please Do KYC', '', {
            duration: 2000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
          });
        }
      });
      
    }
    getCafCounts(): any {
      this.showLdr = true;

      const rte = `dashbrd/getCafConuts/${this.usrdtls.usr_ctgry_ky}`;
      this.crdSrvc.get(rte).subscribe((res) => {
        this.cafCount = res['data'];
        this.showLdr = false;
      });
    }
    getCpeCounts(): any {
      this.showLdr = true;
      const rte = `dashbrd/getCpeConuts/${this.usrdtls.usr_ctgry_ky}`;
      this.crdSrvc.get(rte).subscribe((res) => {
        this.stpBxsCount = res['data'];
        this.showLdr = false;
      });
    }
    getCafOprts(): any{
      this.showLdr = true;
      const rte = `dashbrd/caf/last6months/${this.usrdtls.usr_ctgry_ky}`;
      this.crdSrvc.get(rte).subscribe((res) => {
        for(let i=0;i<res['data'].length;i++){
          res['data'][i]['x-axis']=`${res['data'][i]['mnth_nm'].substring(0,3)}-${res['data'][i]['oprtn_yr']}`;
        }
        this.cafLst6MnthCount = res['data'];

        this.cafOprtns = [
          { value: "SUSPENDED_CT", name: "Suspended Count" ,color:"#F8B195"},
          { value: "RESUMED_CT", name: "Resume Count",color:"#F67280" },
          { value: "NEW_CAF_CT", name: "New CAF Count",color:"#C06C84" },
          { value: "TERMINATED_CT", name: "Terminated Count",color:"#6C5B7B" },
          { value: "BOX_CHANGE", name: "Box Change Count",color:"#355C7D" },
          { value: "PON_CHANGE", name: "Pon Change Count",color:"#83AF9B" },
    
        ];
    })
  }
  getCafTdyCnts(): any {
    this.showLdr = true;
    const rte = `dashbrd/caf/currentMnth/${this.usrdtls.usr_ctgry_ky}`;
    this.crdSrvc.get(rte).subscribe((res) => {

      if(res['data'].length==0){
        let datacurgt = [{'SUSPENDED_CT':0,'RESUMED_CT':0,'NEW_CAF_CT':0,'TERMINATED_CT':0,'BOX_CHANGE':0,'PON_CHANGE':0,'mnth_nm':''}]
        this.cafTdyCount=datacurgt[0];
        let datagt = [{'SUSPENDED_CT':0,'RESUMED_CT':0,'NEW_CAF_CT':0,'TERMINATED_CT':0,'BOX_CHANGE':0,'PON_CHANGE':0,'mnth_nm':''}]
        this.cafprvMnthCount=datagt[0];
      }
      else if(res['data'].length==1){
        this.cafTdyCount = res['data'][0];
        var d = new Date();
        var month = d.getMonth();
        let datagt = [{'SUSPENDED_CT':0,'RESUMED_CT':0,'NEW_CAF_CT':0,'TERMINATED_CT':0,'BOX_CHANGE':0,'PON_CHANGE':0,'mnth_nm':''}]
        datagt[0]['mnth_nm']=this.months_id[month].name;
        this.cafprvMnthCount=datagt[0];
    
    }
    else{
        this.cafTdyCount = res['data'][0];
        this.cafprvMnthCount=res['data'][1];
    }

      this.showLdr = false;
    });
  }
  customizeTooltip = (arg) => {
    return {
        text: this.getText(arg, arg.valueText)
    };
  }
  getText(item, value): any {
  return  item.seriesName + ' - ' + '<div style="font-size:15px">' + '<b>' + value + '</b>' + '</div>';
  }
  }
