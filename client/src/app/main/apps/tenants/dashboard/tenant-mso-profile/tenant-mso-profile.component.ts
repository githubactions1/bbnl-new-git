import { Component, OnInit } from '@angular/core';
import { CrudService } from 'app/main/apps/crud.service';
import { Router, ActivatedRoute } from '@angular/router';
import { TransfereService } from 'app/providers/transfer/transfer.service';
import { DatePipe } from '@angular/common';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-tenant-mso-profile',
  templateUrl: './tenant-mso-profile.component.html',
  styleUrls: ['./tenant-mso-profile.component.scss']
})
export class TenantMsoProfileComponent implements OnInit {

  Company;
  permissions: { "slct_in": number; "insrt_in": number; "updt_in": number; "dlte_in": number; "exprt_in": number; };
  agntDtls: any;
  pckgedta: any;
  agntprtassgn: any;
  usrDtls;
  agnt_dtls;
  monThWiseData;
  slctdyear;
  getHeaderDtls = function () { return { "title": 'Mso Information', "icon": "people_outline" } }
  agnt_id: string;
  currentyear;
  years=[];
  agntPymntLst;
  agntPymntsForm;
  lmodta;
  tabsdata;
  columnDefs;
  columnDefs1;
  columnDefs2;
  shwLdr = false;
  agnt_ky;
  months = [{ mnth_nm: 'January', mnth_id: 1 },
  { mnth_nm: 'February', mnth_id: 2 },
  { mnth_nm: 'March', mnth_id: 3 },
  { mnth_nm: 'April', mnth_id: 4 },
  { mnth_nm: 'May', mnth_id: 5 },
  { mnth_nm: 'June', mnth_id: 6 },
  { mnth_nm: 'July', mnth_id: 7 },
  { mnth_nm: 'August', mnth_id: 8 },
  { mnth_nm: 'September', mnth_id: 9 },
  { mnth_nm: 'October', mnth_id: 10 },
  { mnth_nm: 'November', mnth_id: 11 },
  { mnth_nm: 'December', mnth_id: 12 }]
  masterDetailTxt: boolean;
  constructor(public crdsrv: CrudService, public router: Router,private fb: FormBuilder, private route: ActivatedRoute,public transfereService: TransfereService, public datePipe: DatePipe) {    this.permissions = { "slct_in": 1, "insrt_in": 1, "updt_in": 1, "dlte_in": 1, "exprt_in": 1 };
  this.currentyear = (new Date()).getFullYear();
  var count = this.currentyear - 2016;
  for (var i = 0; i <= count; i++) {
    let yr = this.currentyear - i
    this.years.push(yr)
  }
  this.slctdyear = this.currentyear;
  this.permissions = { "slct_in": 1, "insrt_in": 1, "updt_in": 1, "dlte_in": 1, "exprt_in": 1 };
 
      this.usrDtls = JSON.parse(localStorage.getItem('usrDtls'));
      if(this.usrDtls.usr_ctgry_id==7){
        this.agnt_id=this.usrDtls.usr_ctgry_ky;
      }
      else{
        this.agnt_id=''
      }
      this.agnt_ky = this.usrDtls.usr_ctgry_id;
 
  }

  ngOnInit() {
    this.agntPymntsForm = this.fb.group({
      pymntFrmDt: [''],
      pymntToDt: ['']
    });
    this.gettabs();
    this.getAgntDtls();
    this.getAgntCollections();
    this.getAgntPackgeAgrmnt();
    this.getLmolst();
  }
  getAgntCollections(){
    this.monThWiseData=[]
    this.shwLdr = true;
    let rte = `olt/msorevenueShaing/${this.slctdyear}/${this.agnt_id}`;
    this.crdsrv.get(rte).subscribe((res) => {
      this.shwLdr = false;
      let index = 1;
      for (var i = 0; i < res['data'].length; i++) {
        res['data'][i]['sno'] = index++;
        for (var j = 0; j < this.months.length; j++) {
          if (res['data'][i].monthid == this.months[j].mnth_id) {
            res['data'][i]['monthname'] = this.months[j].mnth_nm
          }
        }
      }
      this.monThWiseData = res['data']
      console.log(this.monThWiseData);
      this.columnDefs1=[
        { headerName: 'Sno', field: 'sno', alignment:'center', cellClass: 'pm-grid-number-cell', width: 90, sortable: true, filter: false, columnFiltering: false },
        { headerName: 'Year', field: 'year',alignment:'center', cellClass: 'pm-grid-number-cell', width: 160, columnFiltering: false },
        { headerName: 'Month', field: 'monthname', alignment:'left', cellClass: 'pm-grid-number-cell', width: 160, columnFiltering: false },
        { headerName: 'MSO Share', field: 'msoshare', alignment:'right', cellClass: 'pm-grid-number-cell', width: 160, sortable: true, filter: true, columnFiltering: false, format: {type:'currency',currency:'INR', precision:'0'} },
        { headerName: 'Total CAFs', field: 'cafcount', alignment:'center',cellClass: 'pm-grid-number-cell', width: 150, sortable: true, filter: true, columnFiltering: false },
        { headerName: 'Total Paid', field: 'Paid', alignment:'center', cellClass: 'pm-grid-number-cell', width: 150, sortable: true, filter: true, columnFiltering: false },
        { headerName: 'Total Not Paid', field: 'NotPaid', alignment:'center', cellClass: 'pm-grid-number-cell', width: 150, sortable: true, filter: true, columnFiltering: false },
        { headerName: 'VOIP Charges', field: 'voip_chrge_at', alignment:'center',cellClass: 'pm-grid-number-cell', width: 150, sortable: true, filter: true, columnFiltering: false },
        { headerName: 'Add On Charges', field: 'add_on_chrge_at', alignment:'center', cellClass: 'pm-grid-number-cell', width: 150, sortable: true, filter: true, columnFiltering: false },
        { headerName: 'Pro Rated CAF', field: 'pro_rted_caf_cnt', alignment:'center', cellClass: 'pm-grid-number-cell', width: 150, sortable: true, filter: true, columnFiltering: false },
      ]
  })

  }
  getAgntPackgeAgrmnt() {
    this.pckgedta=[];
    this.shwLdr = true;
    let rte = `package/select_packageAgreement/${this.agnt_id}`
  this.crdsrv.get(rte).subscribe((res) => {      
      console.log(res)
      this.pckgedta = res['data']
      this.shwLdr = false;
      for(let i=0; i<res['data'].length; i++){
        res['data'][i]['sno'] = i+1;
      }
      this.pckgedta = res['data'];
      this.columnDefs= [{ headerName: 'S.No', field: 'sno', cellStyle: { 'text-align': "center" }, cellClass: "pm-grid-number-cell", width: 60, height: 40 },
      { headerName: 'Package Agreement Date', field: 'pckge_agrmt_dt', cellStyle: { 'text-align': "center" }, cellClass: "pm-grid-number-cell", width: 200, height: 40, filter: true },
      { headerName: 'Approve Date', field: 'aprve_ts', cellStyle: { 'text-align': "center" }, cellClass: "pm-grid-number-cell", width: 200, height: 40, filter: true },
      { headerName: 'Description', field: 'aprve_cmnt_tx', cellStyle: { 'text-align': "center" }, cellClass: "pm-grid-number-cell", width: 200, height: 40, filter: true },
      { headerName: 'Approve By', field: 'aprve_usr_nm',  cellClass: 'pm-grid-number-cell', width: 150, sortable: true, filter: true, columnFiltering: false },
      { headerName: 'Created On', field: 'i_ts', alignment:'center', cellClass: 'pm-grid-number-cell', width: 120, sortable: true, filter: true, columnFiltering: false },
      { headerName: 'Packages Count', field: 'pckg_ct', alignment:'center', cellClass: 'pm-grid-number-cell', width: 140, sortable: true, filter: true, columnFiltering: false },
      {headerName: 'Base Packages Count', field: 'bsepckg_ct', alignment:'center', cellClass: 'pm-grid-number-cell', width: 160,sortable: true, filter: true, columnFiltering: false },
      {headerName: 'AddOn Packages Count', field: 'addpckg_ct', alignment:'center', cellClass:'pm-grid-number-cell', width: 160,sortable: true, filter: true, columnFiltering: false },
      { headerName: 'Partners', field: 'agnt_cds', alignment: 'left', cellClass: 'pm-grid-number-cell', width: 120, sortable: true, filter: true, columnFiltering: false }]
    })
  }
  gettabs() {
    this.Company = [{
      tab_id: 1,
      tab_nm: 'Package Aggrement',    
    },
    {
      tab_id: 2,
      tab_nm: 'Collections',
    },
    {
      tab_id: 3,
      tab_nm: "Lmo's list",
    }];

  }
  getAgntDtls() {
    let rte = `agent/agnt_dtls/${this.agnt_id}`
    this.crdsrv.get(rte).subscribe((res) => {
      console.log(res)
      this.agntDtls = res['data']

    })
  }
  getLmolst() {
    this.lmodta=[];
    this.shwLdr = true;
    console.log(this.agnt_id)
    let rte = `agent/agentsmso/${this.agnt_id}`
      this.crdsrv.get(rte).toPromise().then(res => {
        console.log(res)
        this.shwLdr = false;
        for(let i=0; i<res['data'].length; i++){
          res['data'][i]['sno'] = i+1;
        }
        this.lmodta = res['data'];
        console.log(this.lmodta)
        this.columnDefs2= [{ headerName: 'Sno', field: 'sno', alignment:'center', cellClass: 'pm-grid-number-cell', width: 90, sortable: true, filter: false, columnFiltering: false },
        { headerName: 'Name', field: 'lmo_nm',alignment:'center', cellClass: 'pm-grid-number-cell', width: 160, columnFiltering: false },
        { headerName: 'Agent Code', field: 'lmo_cd', alignment:'center', cellClass: 'pm-grid-number-cell', width: 160, columnFiltering: false },
        { headerName: 'On Board Date', field: 'lmo_onbrd_dt', alignment:'center', cellClass: 'pm-grid-number-cell', width: 160, columnFiltering: false },
        { headerName: 'Mobile Number', field: 'lmo_mbl_nu', alignment:'center', cellClass: 'pm-grid-number-cell', width: 160, columnFiltering: false },
        { headerName: 'State Name', field: 'lmo_ofc_ste_nm', alignment:'center', cellClass: 'pm-grid-number-cell', width: 160, columnFiltering: false },
        { headerName: 'District Name', field: 'lmo_ofc_dstrct_nm', alignment:'center', cellClass: 'pm-grid-number-cell', width: 160, columnFiltering: false },
        { headerName: 'Mandal Name', field: 'lmo_ofc_mndl_nm', alignment:'center', cellClass: 'pm-grid-number-cell', width: 160, columnFiltering: false },
        { headerName: 'Village Name', field: 'lmo_ofc_vlg_nm', alignment:'center', cellClass: 'pm-grid-number-cell', width: 160, columnFiltering: false },
        { headerName: 'CAF Count', field: 'lmo_ct', alignment:'center', cellClass: 'pm-grid-number-cell', width: 100, columnFiltering: false },
      ]
      })

  }
  tabChangeFn(event): any {
    console.log(event.index)
    if(event.index==0){
      this.getAgntPackgeAgrmnt();
    }
    if(event.index==1){
      this.getAgntCollections();
    }
    if(event.index==2){
      this.getLmolst();
    }
   
  }

  onCellViewClick(rowdata): any{
    // console.log(rowdata);
    this.transfereService.setLoclData('data', rowdata.data);
    this.router.navigate([`/admin/tenant/lmo/profile`]);
  }

}
