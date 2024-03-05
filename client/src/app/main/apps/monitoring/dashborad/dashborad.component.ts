import { Component, OnInit } from '@angular/core';
import { CrudService } from '../../crud.service';
import { DsSidebarService } from '@glits/components/sidebar/sidebar.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition, MatDialog } from '@angular/material';


@Component({
  selector: 'app-dashborad',
  templateUrl: './dashborad.component.html',
  styleUrls: ['./dashborad.component.scss']
})
export class DashboradComponent implements OnInit {
  slctdOltscolumnDefs: any;
  allcolumndefs:any;
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  areas: any;
  customers: any;
  oltdatacounts = [{ total: 0, active: 0, inactive: 0 }];
  ontdatacounts = [{ total: 0, active: 0, entr_inactive: 0, indv_inactive: 0 }];
  oltschrt: any;
  ontschrt: any;
  hourlyOltCounts = [{ one_hr: 0, three_hr: 0, twelve_hr: 0, twntfur_hr: 0 }];
  OnthourlyCounts = [{ one_hr: 0, three_hr: 0, twelve_hr: 0, twntfur_hr: 0 }];
  liveTvWatch = [{ iptv_nlne_ct: 0, iptv_nlne_ltv_ct: 0, iptv_vod_ct: 0 }]
  VoipCount = [{ incmng_cals_ct: 0, otgng_cals_ct: 0 }]
  DistrctWiseOltDt: any;
  notoperatindata = [];
  ntop = false;
  oprt = true;
  cmntTxBx = [];
  updtcmtBx = [];
  mutlslctData = [];

  pieColorPalette = [/*blue*/'#44C8F5',/*orange*/'#FF8C61', /*red*/'#CC444B'];
  getHeaderDtls = function (): any { return { 'title': 'OLT( Optical Line Terminal )', 'icon': 'language' }; };
  slctdDta: any;
  configUrl: string;
  handleError: (err: any, caught: Observable<Object>) => never;
  rfrshData: any;
  sdbarData: any;
  sdbar: boolean;
  isueCtgryLst: boolean;
  comment: any;
  ctgryID: any;
  subctgryID: any;
  totalCmnt: any = [];
  upCmnt: any = [];
  relInsrt: any = [];
  relUpdte: any = [];
  grtoutOlts: any;
  cmntFrLp: any;
  insrt: boolean = false;
  updte: boolean = false;
  subCat: boolean = false;
  buttonHide: boolean = false;
  isueSubCtgryLst: any;
  phnmbr: any;
  checkData: any;
  manyOlts: any;
  singleolt: boolean;
  mutltiOltComments: any;
  districts:any;
  districtID:any;
  // firstFormGroup: FormGroup;
  // secondFormGroup: FormGroup;
  constructor(public crdSrvc: CrudService, private dsSidebarService: DsSidebarService, private http: HttpClient, public snackBar: MatSnackBar) { }

  ngOnInit() {
    this.getOltCounts();
    this.getHoulrOltCounts();
    this.getOntCounts();
    this.getHoulrOntCounts();
    this.getLiveTvWatchCount();
    this.getVoipCallsCount();
    this.getDistrctWiseOlts();
    this.getIsueCtgryDtls();
    this.getDistricts();
  }

  getDistricts() {
    let rte = 'agent/dstrctList'
    this.crdSrvc.get(rte).subscribe((res) => {
      this.districts = res['data']
      console.log(this.districts);
    })
  }
  getSubCategory(catId) {
    this.subCat = false;
    console.log(catId);
    let rte = `olt/getIssueSubCategory/${catId}`
    this.crdSrvc.get(rte).subscribe((res) => {
      console.log(res['data']);
      this.isueSubCtgryLst = res['data']
      if (res['status'] == 200) {
        this.subCat = true;
      }
      else {
        this.subCat = false;
      }
    })
  }
  getIsueCtgryDtls() {
    let rte = `olt/getIssueCategory`
    this.crdSrvc.get(rte).subscribe((res) => {
      console.log(res['data']);
      this.isueCtgryLst = res['data']
    });
  }

  //   oltslctn(chkdata){
  // console.log(chkdata);
  // console.log(chkdata.selectedRowsData);
  // this.checkData = chkdata.selectedRowsData;
  // console.log(this.checkData);
  //   }
  slctdolt(){
    console.log(this.manyOlts);
      this.openSideBar('addFormPanelTwo');
      var index = 0;
      for (var k = 0; k < this.manyOlts.length; k++) {
        index = index + 1;
        this.manyOlts[k].sno = index;
      }
      console.log(this.manyOlts);
      this.slctdOltscolumnDefs = [
        { headerName: 'Sno', field: 'sno', cellStyle: { 'text-align': 'center' }, cellClass: 'pm-grid-number-cell', width: 55, sortable: true, filter: false },
        { headerName: 'OLT Name', field: 'olt_nm', cellStyle: { 'text-align': 'center' }, cellClass: 'pm-grid-number-cell', width: 200 },
        { headerName: 'OLT Ip Address', field: 'olt_ip_addr_tx', cellStyle: { 'text-align': 'left' }, cellClass: 'pm-grid-number-cell', width: 140, sortable: true, filter: true },
        { headerName: 'OLT Serial Number', field: 'olt_srl_nu', cellStyle: { 'text-align': 'left' }, cellClass: 'pm-grid-number-cell', width: 140, sortable: true, filter: true },
        { headerName: 'OLT Type', field: 'olt_type_nm', cellStyle: { 'text-align': 'left' }, cellClass: 'pm-grid-number-cell', width: 145, sortable: true, filter: true },
        { headerName: 'Substion', field: 'sbstn_nm', cellStyle: { 'text-align': 'left' }, cellClass: 'pm-grid-number-cell', width: 180, sortable: true, filter: true },
        { headerName: 'Operational State', field: 'ste_nm', cellStyle: { 'text-align': 'left' }, cellClass: 'pm-grid-number-cell', width: 150, sortable: true, filter: true },
        { headerName: 'Operational State From', field: 'oprtnl_ste_chnge_ts', cellStyle: { 'text-align': 'left' }, cellClass: 'pm-grid-number-cell', width: 175, sortable: true, filter: true },
        { headerName: 'District', field: 'dstrt_nm', cellStyle: { 'text-align': 'left' }, cellClass: 'pm-grid-number-cell', width: 140, sortable: true, filter: true },
        { headerName: 'Network Engineer', field: 'cntct_nm', cellStyle: { 'text-align': 'left' }, cellClass: 'pm-grid-number-cell', width: 150, sortable: true, filter: true },
        { headerName: 'Phone Number', field: 'mble1_ph', cellStyle: { 'text-align': 'left' }, cellClass: 'pm-grid-number-cell', width: 140, sortable: true, filter: true },
      ];
  }
  saveMultpleOlts(){
    this.mutlslctData = [];
    console.log(this.manyOlts);
    console.log(this.mutltiOltComments);
    console.log(this.ctgryID);
    console.log(this.subctgryID);
    for(var m=0; m<this.manyOlts.length; m++){
       if(!this.manyOlts[m].cmnt_tx){
        this.manyOlts[m].cmnt_tx=this.mutltiOltComments;
       }
       else{
        this.manyOlts[m].cmnt_tx = this.manyOlts[m].cmnt_tx + ','+ this.mutltiOltComments
       }
    }
    console.log(this.manyOlts);

    this.mutlslctData = Object.keys(this.manyOlts).map(l => ({olt_id:this.manyOlts[l].olt_id,oprtnl_ste_id:this.manyOlts[l].oprtnl_ste_id,oprtnl_ste_strt_ts:this.manyOlts[l].oprtnl_ste_orgn_ts,oprtnl_ste_strt_dt:this.manyOlts[l].ste_dt,
      olt_sts_id:this.manyOlts[l].olt_sts_id,olt_sts_strt_ts:this.manyOlts[l].oprtnl_sts_orgn_ts,olt_sts_strt_dt:this.manyOlts[l].sts_dt,olt_iss_ctgry_id: this.ctgryID == undefined ? 0 : this.ctgryID,
      olt_iss_sub_ctgry_id: this.subctgryID == undefined ? 0 : this.subctgryID,
      cmnt_tx:this.manyOlts[l].cmnt_tx,relCmnts: this.mutltiOltComments,olt_outage_id:this.manyOlts[l].olt_outage_id,mble1_ph: this.manyOlts[l].mble1_ph}))
      console.log(this.mutlslctData);

      let rte = `olt/insertUpdate/multipleoltoutageDtls`;
      this.crdSrvc.create(this.mutlslctData, rte).subscribe((res) => {
        console.log(res['status']);
        if(res['status'] == 200){
          this.snackBar.open('Sucessfully Saved', '', {
            duration: 2000,
            panelClass: ['blue-snackbar'],
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
          });
          this.getDistrctWiseOlts();
          this.mutltiOltComments='';
        }
      })
      
  }
  savemltplecmnts() {
    console.log(this.checkData);
  }
  oltSelection(data) {
    this.manyOlts = data.selectedRowsData;
    console.log(this.manyOlts);
    console.log(this.manyOlts.length);
    if(this.manyOlts.length > 1){
      this.buttonHide=true;
    }
    else{
      this.buttonHide=false;
    }
  }
 
  onAddn(ndata) {
    this.updtcmtBx = [];
    this.cmntTxBx = [];
    this.insrt = false;
    this.updte = false;
    this.sdbarData = ndata.data;
    this.sdbar = true;
    this.subCat = false;
    
      let rte = `olt/getOltoutageDtls/${this.sdbarData.olt_id}`;
      this.crdSrvc.get(rte).subscribe((res) => {
        // console.log(res['data']);
        this.phnmbr = res['data'][2];
        this.cmntFrLp = res['data'][1];
        this.grtoutOlts = res['data'][0];
        console.log(res['data'].length);
        if (res['data'][0].length === 0) {
          this.openSideBar('addFormPanel');
          this.cmntTxBx.push({ 'index': '', 'cmntext': '' })
          this.insrt = true;
          this.ctgryID = '';
          this.subctgryID = '';
        }
        else {
          this.openSideBar('addFormPanel');
          console.log(res['data'][0]);
          console.log(this.grtoutOlts);
          this.updtcmtBx.push({ 'index': '', 'cmntext': '' })
          this.updte = true;
          this.ctgryID = this.grtoutOlts[0].olt_iss_ctgry_id;
          this.getSubCategory(this.ctgryID);
          this.subctgryID = this.grtoutOlts[0].olt_iss_sub_ctgry_id;
        }
      });
  }

  refresh(rdata) {
    this.slctdDta = rdata.data;
    let rte = `olt/getRefreshOlt`;
    this.crdSrvc.create(this.slctdDta, rte).subscribe((res) => {
      this.rfrshData = res['data'];
      if (res['status'] == 200) {
        for (let i = 0; i < this.DistrctWiseOltDt.length; i++) {
          if (this.DistrctWiseOltDt[i].olt_id == this.rfrshData[0].olt_id) {

            this.DistrctWiseOltDt[i].sftwe_vrsn_tx = this.rfrshData[0].sftwe_vrsn_tx;
            this.DistrctWiseOltDt[i].hrdwe_vrsn_tx = this.rfrshData[0].hrdwe_vrsn_tx;
            this.DistrctWiseOltDt[i].site_nm = this.rfrshData[0].site_nm;
            this.DistrctWiseOltDt[i].olt_srl_nu = this.rfrshData[0].olt_srl_nu;
            this.DistrctWiseOltDt[i].ste_nm = this.rfrshData[0].ste_nm;
            this.DistrctWiseOltDt[i].oprtnl_ste_chnge_ts = this.rfrshData[0].oprtnl_ste_chnge_ts;
            this.DistrctWiseOltDt[i].sts_nm = this.rfrshData[0].sts_nm;
            this.DistrctWiseOltDt[i].oprnl_sts_chnge_ts = this.rfrshData[0].oprnl_sts_chnge_ts;
            this.DistrctWiseOltDt[i].lst_rfrh_ts = this.rfrshData[0].lst_rfrh_ts;
          }
        }
      }

    })

  }



  openSideBar(key) {
    this.dsSidebarService.getSidebar(key).toggleOpen();
  }

  closeSideBar() {
    this.dsSidebarService.getSidebar('addFormPanel').toggleOpen();
  }
  closeSideBarTwo(){
    this.dsSidebarService.getSidebar('addFormPanelTwo').toggleOpen();
  }
  //   closescdSideBar(){
  //     this.dsSidebarService.getSidebar('slctdOltPanel').toggleOpen();
  // }
  getOltCounts() {
    let rte1 = `dashbrd/getoltcounts`;
    this.crdSrvc.get(rte1).subscribe((res) => {
      console.log(res['data']);
      this.oltdatacounts = res['data'];
      this.oltschrt = [{
        status: "active",
        area: this.oltdatacounts[0].active,
        color: "#FA4659"
      }, {
        status: "inactive",
        area: this.oltdatacounts[0].inactive,
        color: "#2EB872"
      }];
    })
  }
  getHoulrOltCounts() {
    let rte1 = `dashbrd/getHourloltcounts`
    this.crdSrvc.get(rte1).subscribe((res) => {
      // console.log(res['data']);
      if (res['data'].length > 0) {
        this.hourlyOltCounts = res['data']
      }
    })
  }
  getOntCounts() {
    let rte1 = `dashbrd/getOntCounts`;
    this.crdSrvc.get(rte1).subscribe((res) => {
      console.log(res['data'])
      this.ontdatacounts = res['data']
      this.ontschrt = [{
        status: "active",
        area: this.ontdatacounts[0].active,
        color: "#FA4659"
      }, {
        status: "EnterPrise-Inactive",
        area: this.ontdatacounts[0].entr_inactive,
        color: "#2EB872"
      }, {
        status: "Individual-Inactive",
        area: this.ontdatacounts[0].indv_inactive,
        color: "#2EB872"
      }];
    });
  }
  getHoulrOntCounts() {
    let rte1 = `dashbrd/getHourlontcounts`;
    this.crdSrvc.get(rte1).subscribe((res) => {
      // console.log(res['data']);
      if (res['data'].length > 0) {
        this.OnthourlyCounts = res['data'];
      }
    });
  }
  getLiveTvWatchCount() {
    let rte1 = `dashbrd/getLiveTvWatchCount`
    this.crdSrvc.get(rte1).subscribe((res) => {
      if (res['data'].length) {
        this.liveTvWatch = res['data'];
      }
    });
  }
  getVoipCallsCount() {
    let rte1 = `dashbrd/getVoipCallCount`
    this.crdSrvc.get(rte1).subscribe((res) => {
      // console.log(res['data']);
      if (res['data'].length > 0) {
        this.VoipCount = res['data'];
      }
    })
  }
  getOLtsByDistrict(){
    console.log(this.districtID);
    this.getDistrctWiseOlts();
  }
  getDistrctWiseOlts() {
    this.ntop = false;
    this.oprt = true;
    console.log(this.districtID)
	if(typeof(this.districtID) == 'undefined' || typeof(this.districtID) == undefined ){
      console.log("this.districtID",this.districtID)
      this.districtID = 0
    }
    let rte1 = `dashbrd/distrctWseOlts/${this.districtID}`;
    this.crdSrvc.get(rte1).subscribe((res) => {
      console.log(res['data'])
      for (let i = 0; i < res['data'].length; i++) {
        // res['data'][i]['sno'] = i + 1;
        if (res['data'][i].oprtnl_ste_id != 1) {
          if (res['data'][i].hr < 1) {
            res['data'][i].hr = '<1';
          }
          else if (res['data'][i].hr < 3 && res['data'][i].hr > 1) {
            res['data'][i].hr = '<3';
          }
          else if (res['data'][i].hr >= 12 && res['data'][i].hr < 24) {
            res['data'][i].hr = '>12';
          }
          else if (res['data'][i].hr >= 24) {
            res['data'][i].hr = '>24';
          }
        }
      }
      this.DistrctWiseOltDt = res['data'];
      console.log(this.DistrctWiseOltDt);
      var index = 0
        for (var k = 0; k < this.DistrctWiseOltDt.length; k++) {
          index = index + 1;
          this.DistrctWiseOltDt[k].sno = index
        }
        console.log(this.DistrctWiseOltDt);
        this.allcolumndefs = [
          { headerName: 'Sno', field: 'sno', cellStyle: 'center', cellClass: "pm-grid-number-cell", width: 70, sortable: false, filter: false, headfilter:false, sortOrder:false },
          { headerName: 'District', field: 'dstrt_nm', cellStyle: 'center', cellClass: "pm-grid-number-cell", width: 130, sortable: true, filter: true, headfilter:false, sortOrder:false },
          { headerName: 'Mandal', field: 'mndl_nm', cellStyle: 'center', cellClass: "pm-grid-number-cell", width: 140, sortable: true, filter: true, headfilter:false, sortOrder:false },
          { headerName: 'Substation', field: 'sbstn_nm', cellStyle: 'center', cellClass: "pm-grid-number-cell", width: 150, sortable: true, filter: true, headfilter:false, sortOrder:false },
          { headerName: 'OLT Name', field: 'olt_nm', cellStyle: 'center', cellClass: "pm-grid-number-cell", width: 150, sortable: true, filter: true, headfilter:false, sortOrder:false },
          { headerName: 'OLT Type Name', field: 'olt_type_nm', cellStyle: 'center', cellClass: "pm-grid-number-cell", width: 130, sortable: true, filter: true, headfilter:false, sortOrder:false },
          { headerName: 'OLT Ip Address', field: 'olt_ip_addr_tx', cellStyle: 'center', cellClass: "pm-grid-number-cell", width: 130, sortable: true, filter: true, headfilter:false, sortOrder:false },
          { headerName: 'OLT Serial No', field: 'olt_srl_nu', cellStyle: 'center', cellClass: "pm-grid-number-cell", width: 130, sortable: true, filter: true, headfilter:false, sortOrder:false },
          { headerName: 'CAF Count', field: 'cafcount', cellStyle: 'center', cellClass: "pm-grid-number-cell", width: 130, sortable: true, filter: true, headfilter:false, sortOrder:false },
          { headerName: 'Software version', field: 'sftwe_vrsn_tx', cellStyle: 'center', cellClass: "pm-grid-number-cell", width: 135, sortable: true, filter: true, headfilter:false, sortOrder:false },
          // { headerName: 'Down Hours', field: 'hr', cellStyle: 'center', cellClass: "pm-grid-number-cell", width: 150, sortable: true, filter: false },
          { headerName: 'Operational State', field: 'ste_nm', cellStyle: 'center', cellClass: "pm-grid-number-cell", width: 145, sortable: true, filter: true, headfilter:true, sortOrder:false },
          { headerName: 'Down Time', field: 'dwnDateTime', cellStyle: 'center', cellClass: "pm-grid-number-cell", width: 135, sortable: true, filter: true, headfilter:false, sortOrder:false },
          { headerName: 'Up Time', field: 'updtDateTime', cellStyle: 'center', cellClass: "pm-grid-number-cell", width: 150, sortable: true, filter: true, headfilter:false, sortOrder:false },
          { headerName: 'Total Time(HH:MM:SS)', field: 'actualHrsAndMinuts', cellStyle: 'center', cellClass: "pm-grid-number-cell", width: 150, sortable: true, filter: true, headfilter:false, sortOrder:false },
          { headerName: 'Up Time(%)', field: 'upPrntge', cellStyle: 'center', cellClass: "pm-grid-number-cell", width: 150, sortable: true, filter: true, headfilter:false, sortOrder:false },
          { headerName: 'Operational State From', field: 'oprtnl_ste_chnge_ts', cellStyle: 'center', cellClass: "pm-grid-number-cell", width: 150, sortable: true, filter: true, headfilter:false, sortOrder:false },
          { headerName: 'Admin Status', field: 'sts_nm', cellStyle: 'center', cellClass: "pm-grid-number-cell", width: 145, sortable: true, filter: true, headfilter:true, sortOrder:false },
          { headerName: 'Issue Category', field: 'olt_iss_ctgry_nm', cellStyle: 'center', cellClass: "pm-grid-number-cell", width: 150, sortable: true, filter: true, headfilter:true, sortOrder:false },
          { headerName: 'Issue Sub-Category', field: 'olt_iss_sub_ctgry_nm', cellStyle: 'center', cellClass: "pm-grid-number-cell", width: 150, sortable: true, filter: true, headfilter:true, sortOrder:false },
          { headerName: 'Comment Description', field: 'cmnt_tx', cellStyle: 'center', cellClass: "pm-grid-number-cell", width: 170, sortable: true, filter: true, headfilter:false, sortOrder:false },
          { headerName: 'Comment Created By', field: 'createuser', cellStyle: 'center', cellClass: "pm-grid-number-cell", width: 150, sortable: true, filter: true, headfilter:false, sortOrder:false },
          { headerName: 'Comment Updated By', field: 'updateuser', cellStyle: 'center', cellClass: "pm-grid-number-cell", width: 150, sortable: true, filter: true, headfilter:false, sortOrder:false },
          { headerName: 'Comment Updated On', field: 'updatecommentdate', cellStyle: 'center', cellClass: "pm-grid-number-cell", width: 150, sortable: true, filter: true, headfilter:false, sortOrder:false },

        ]
    })
  }
  getnotactvedt() {
    // console.log("not active");
    this.ntop = true;
    this.oprt = false;
    this.notoperatindata = [];
    for (let i = 0; i < this.DistrctWiseOltDt.length; i++) {
      // if (this.DistrctWiseOltDt[i].ste_nm == "Down" || this.DistrctWiseOltDt[i].ste_nm == "Degraded" || this.DistrctWiseOltDt[i].ste_nm == "Not Operational") {
      //   this.notoperatindata.push(this.DistrctWiseOltDt[i]);
      // }
      if (this.DistrctWiseOltDt[i].ste_nm == "Down" || this.DistrctWiseOltDt[i].ste_nm == "Not Operational") {
        this.notoperatindata.push(this.DistrctWiseOltDt[i]);
      }
    }
    console.log(this.notoperatindata);
    var index = 0
    for (var n = 0; n < this.notoperatindata.length; n++) {
      index = index + 1;
      this.notoperatindata[n].sno = index
    }

  }
  onToolbarPreparing(e) {
    e.toolbarOptions.items.unshift(
      {
        location: 'after',
        widget: 'dxButton',
        options: {
          text: 'Refresh',
          onClick: this.getDistrctWiseOlts.bind(this),
          bindingOptions: {
            'disabled': 'isEmailButtonDisabled'
          }
        }
      },
      {
        location: 'after',
        widget: 'dxButton',
        options: {
          text: 'Total Olts',
          onClick: this.getDistrctWiseOlts.bind(this),
          bindingOptions: {
            'disabled': 'isEmailButtonDisabled'
          }
        }
      }
      // {
      //   location: 'after',
      //   widget: 'dxButton',
      //   options: {
      //     text: 'Down Olts',
      //     onClick: this.getnotactvedt.bind(this),
      //     bindingOptions: {
      //       'disabled': 'isEmailButtonDisabled'
      //     }
      //   }
      // }
      );
  }

  save(a) {

    console.log(a);
    if (a == 1) {
      if (this.cmntTxBx[0].cmntext.length > 0) {
        this.totalCmnt = '';
        this.relInsrt = this.cmntTxBx;
        for (let i = 0; i < this.cmntTxBx.length; i++) {
          this.cmntTxBx[i].index = i + 1;
          if (i != 0) {
            this.totalCmnt = this.totalCmnt + ',' + this.cmntTxBx[i].cmntext;
          }
          else {
            this.totalCmnt = this.totalCmnt + this.cmntTxBx[i].cmntext;
          }
        }

        let data = {
          olt_id: this.sdbarData.olt_id,
          oprtnl_ste_id: this.sdbarData.oprtnl_ste_id,
          oprtnl_ste_strt_ts: this.sdbarData.oprtnl_ste_orgn_ts,
          oprtnl_ste_strt_dt: this.sdbarData.ste_dt,
          olt_sts_id: this.sdbarData.olt_sts_id,
          olt_sts_strt_ts: this.sdbarData.oprtnl_sts_orgn_ts,
          olt_sts_strt_dt: this.sdbarData.sts_dt,
          olt_iss_ctgry_id: this.ctgryID == undefined ? 0 : this.ctgryID,
          olt_iss_sub_ctgry_id: this.subctgryID == undefined ? 0 : this.subctgryID,
          cmnt_tx: this.totalCmnt == undefined ? 'no comment' : this.totalCmnt,
          relCmnts: this.relInsrt,
          mble1_ph: this.sdbarData.mble1_ph
        };
        let rte = `olt/insertUpdate/oltoutageDtls`;
        this.crdSrvc.create(data, rte).subscribe((res) => {
          if (res['status'] == 200) {
            this.snackBar.open('Sucessfully Saved', '', {
              duration: 2000,
              panelClass: ['blue-snackbar'],
              horizontalPosition: this.horizontalPosition,
              verticalPosition: this.verticalPosition,
            });
            let rte = `olt/getOltoutageDtls/${this.sdbarData.olt_id}`;
            this.crdSrvc.get(rte).subscribe((res) => {
              this.cmntFrLp = res['data'][1];
              this.updte = true;
              this.insrt = false;
              this.cmntTxBx = [];
              this.updtcmtBx = [];
              this.cmntTxBx.push({ 'index': '', 'cmntext': '' });
              this.updtcmtBx.push({ 'index': '', 'cmntext': '' });
            })
          }
        });
      }
      else {
        this.snackBar.open('Write The Comment', '', {
          duration: 2000,
          panelClass: ['red-snackbar'],
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
      }

    }
    else if (a == 2) {
      if (this.updtcmtBx[0].cmntext.length > 0) {
        let rtes = `olt/getOltoutageDtls/${this.sdbarData.olt_id}`;
        this.crdSrvc.get(rtes).subscribe((res) => {
          this.grtoutOlts = res['data'][0];
          this.upCmnt = '';
          console.log(this.grtoutOlts[0].cmnt_tx);
          console.log(this.updtcmtBx);
          this.relUpdte = this.updtcmtBx;
          for (let i = 0; i < this.updtcmtBx.length; i++) {
            this.updtcmtBx[i].index = i + 1;
            this.upCmnt = this.upCmnt + ',' + this.updtcmtBx[i].cmntext;
          }
          console.log(this.upCmnt);
          this.upCmnt = this.grtoutOlts[0].cmnt_tx + this.upCmnt;
          console.log(this.upCmnt);
          let data = {
            olt_id: this.sdbarData.olt_id,
            oprtnl_ste_id: this.sdbarData.oprtnl_ste_id,
            oprtnl_ste_strt_ts: this.sdbarData.oprtnl_ste_orgn_ts,
            oprtnl_ste_strt_dt: this.sdbarData.ste_dt,
            olt_sts_id: this.sdbarData.olt_sts_id,
            olt_sts_strt_ts: this.sdbarData.oprtnl_sts_orgn_ts,
            olt_sts_strt_dt: this.sdbarData.sts_dt,
            olt_iss_ctgry_id: this.ctgryID == undefined ? 0 : this.ctgryID,
            olt_iss_sub_ctgry_id: this.subctgryID == undefined ? 0 : this.subctgryID,
            cmnt_tx: this.upCmnt == undefined ? 'no comment' : this.upCmnt,
            relCmnts: this.relUpdte,
            olt_outage_id: this.grtoutOlts[0].olt_outage_id,
            mble1_ph: this.phnmbr[0].mble1_ph
          }
          console.log(data);
          let rte = `olt/insertUpdate/oltoutageDtls`;
          this.crdSrvc.create(data, rte).subscribe((res) => {
            console.log(res['status']);
            if (res['status'] == 200) {
              this.snackBar.open('Sucessfully Updated', '', {
                duration: 2000,
                panelClass: ['blue-snackbar'],
                horizontalPosition: this.horizontalPosition,
                verticalPosition: this.verticalPosition,
              });
              // this.closeSideBar();
              let rte = `olt/getOltoutageDtls/${this.sdbarData.olt_id}`;
              this.crdSrvc.get(rte).subscribe((res) => {
                this.cmntFrLp = res['data'][1];
                this.cmntTxBx = [];
                this.updtcmtBx = [];
                this.cmntTxBx.push({ 'index': '', 'cmntext': '' });
                this.updtcmtBx.push({ 'index': '', 'cmntext': '' });
              })
            }
          });
        })
      }
      else {
        this.snackBar.open('Write The Comment', '', {
          duration: 2000,
          panelClass: ['red-snackbar'],
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
      }


    }


  }

  addtxtbox() {
    this.cmntTxBx.push({ 'index': '', 'cmntext': '' });
  }

  addtxtboxUpdt() {
    this.updtcmtBx.push({ 'index': '', 'cmntext': '' });
  }

  // update() {

  // }
}
