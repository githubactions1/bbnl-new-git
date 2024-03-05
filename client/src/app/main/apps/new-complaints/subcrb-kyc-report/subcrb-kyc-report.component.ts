import { Component, OnInit } from '@angular/core';
import { TransfereService } from "app/providers/transfer/transfer.service";
import { CrudService } from 'app/main/apps/crud.service';
import { DsSidebarService } from '@glits/components/sidebar/sidebar.service';
import * as _ from 'lodash';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { switchMap, debounceTime, tap, finalize } from 'rxjs/operators';


@Component({
  selector: 'app-subcrb-kyc-report',
  templateUrl: './subcrb-kyc-report.component.html',
  styleUrls: ['./subcrb-kyc-report.component.scss']
})
export class SubcrbKycReportComponent implements OnInit {

  shwLdr = false;
  showcount = false;
  showmsg=false;
  totalcompData: any;
  rowData: any;

  name: string;
  
  subkycrpt :FormGroup
  instl_dstrt_lst=[];
  dstrt_lmo_lst=[];
  lmolist=[];

  filteredAgents: any;
  errorMsg: string;
  isLoading: boolean = false;

  dstrtdata:any;
  lmocodedata:any;
  codedata:any;
  selectedOption;

  permissions;
  
  columnDefs;
  public kyclmodata: any;
  
  fileName:any;
  fileNamekycdone:any;
  fileNamekycnotdone:any;
  filekyctodaydone:any;
  filekycyestdone:any

 totalcafcount;
 kycdonecount;
 kycnotdonecount;
 kycdonetodaycount;
 kycdoneyestcount;

 totallmocnt:any;
 kyccomplete:any;
 kycnotcomplete:any;
 totaltoday:any;
 totalyest:any;

  kyccompleteddata:boolean = false;
  kycnotcompletedata:boolean = false;
  totaltodaydata:boolean = false;
  totalyestdata:boolean = false;



  getHeaderDtls = function () {
    return { title: "Subscriber KYC Report", icon: "people_outline" };
  };


  constructor(public TransfereService: TransfereService, public crdsrv: CrudService,
    private _dsSidebarService: DsSidebarService, private _formBuilder: FormBuilder) {
    this.permissions = { 'slct_in': 1, 'insrt_in': 1, 'updt_in': 1, 'dlte_in': 1, 'exprt_in': 1 };
    this.GetkycdistrictList();
  }

  GetkycdistrictList() {
    let kycdistricturl ="admin/states/1/districts";
    this.crdsrv.get(kycdistricturl).subscribe((res) => {
      if (res['data'].length > 0) {
        this.instl_dstrt_lst = res['data'];
       // console.log(this.instl_dstrt_lst)
       this.subkycrpt.get('lmocode').reset();
    }})
  }

  getcountview(){
      if (this.subkycrpt.invalid) {
          this.showmsg=true;
        }
         else {
          this.showcount=true;
          this.dstrtdata= this.subkycrpt.value.district;
          this.lmocodedata= this.subkycrpt.value.lmocode;
          //console.log('dstid:',this.dstrtdata);
          //console.log('lmo:',this.lmocodedata);
          this.total_caf_cnt(this.dstrtdata,this.lmocodedata);
          this.total_kycdone_cnt(this.dstrtdata,this.lmocodedata);
          this.total_kycnotdone_cnt(this.dstrtdata,this.lmocodedata);
          this.total_kyc_donetoday_cnt(this.dstrtdata,this.lmocodedata);
          this.total_kyc_doneyest_cnt(this.dstrtdata,this.lmocodedata);
          this.kyccompleteddata = false;
          this.kycnotcompletedata = false;
          this.totaltodaydata=false;
          this.totalyestdata=false;
              };
  
  }
    
  total_caf_cnt(dst_id,lmo_id){
    this.shwLdr = true;
    dst_id=this.subkycrpt.value.district
    lmo_id=this.subkycrpt.value.lmocode.agnt_id
    let rte = 'caf_operations/districtwiselmocafcount/'+dst_id+'/'+lmo_id;
   let resdata
   // console.log(rte);
    this.crdsrv.get(rte).subscribe((res) => {
      resdata = res['data']
     //console.log(resdata)
      this.totalcafcount= res['data'][0]['count'];
      if( this.totalcafcount == null ||  this.totalcafcount == undefined ){
        this.totalcafcount =0;
      }
      //console.log('kycdonecnt',this.totalcafcount);
      this.shwLdr = false;
    });
  }

  total_kycdone_cnt(dst_id,lmo_id){
    this.shwLdr = true;
    dst_id=this.subkycrpt.value.district
    lmo_id=this.subkycrpt.value.lmocode.agnt_id
    let rte = 'caf_operations/disctrictwiselmokycdonecount/'+dst_id+'/'+lmo_id;
   let resdata
   // console.log(rte);
    this.crdsrv.get(rte).subscribe((res) => {
      resdata = res['data']
     //console.log(resdata)
      this.kycdonecount= res['data'][0]['count'];
      if( this.kycdonecount == null ||  this.kycdonecount == undefined ){
        this.kycdonecount =0;
      }
     // console.log('kycdonecnt',this.kycdonecount);
      this.shwLdr = false;
    });
  }
    
  total_kycnotdone_cnt(dst_id,lmo_id){
    this.shwLdr = true;
    dst_id=this.subkycrpt.value.district
    lmo_id=this.subkycrpt.value.lmocode.agnt_id
    let rte = 'caf_operations/disctrictwiselmokycdonetobecount/'+dst_id+'/'+lmo_id;
    let resdata
    //console.log(rte);
    this.crdsrv.get(rte).subscribe((res) => {
     resdata = res['data']
   //  console.log(resdata)
      this.kycnotdonecount= res['data'][0]['count'];
      if( this.kycnotdonecount == null ||  this.kycnotdonecount == undefined ){
        this.kycnotdonecount =0;
      }
    // console.log('kycnotdonecnt',this.kycnotdonecount);
      this.shwLdr = false;
    });
  }

  total_kyc_donetoday_cnt(dst_id,lmo_id){
    this.shwLdr = true;
    dst_id=this.subkycrpt.value.district
    lmo_id=this.subkycrpt.value.lmocode.agnt_id
    let rte = 'caf_operations/todaydaydonedistricwisekyccount/'+dst_id+'/'+lmo_id;
    let resdata
    //console.log(rte);
    this.crdsrv.get(rte).subscribe((res) => {
      resdata = res['data']
    //  console.log(resdata)
      this.kycdonetodaycount= res['data'][0]['count'];
      if( this.kycdonetodaycount == null ||  this.kycdonetodaycount == undefined ){
        this.kycdonetodaycount = 0;
      }
    // console.log('totalkycdonetodaycnt',this.kycdonetodaycount);
      this.shwLdr = false;
    });
  }

  total_kyc_doneyest_cnt(dst_id,lmo_id){
    this.shwLdr = true;
    dst_id=this.subkycrpt.value.district
    lmo_id=this.subkycrpt.value.lmocode.agnt_id
    let rte = 'caf_operations/yesterdaydonedistricwisekyccount/'+dst_id+'/'+lmo_id;
    let resdata
   //console.log(rte);
    this.crdsrv.get(rte).subscribe((res) => {
      resdata = res['data']
    //  console.log(resdata)
      this.kycdoneyestcount= res['data'][0]['count'];
      if( this.kycdoneyestcount == null ||  this.kycdoneyestcount == undefined ){
        this.kycdoneyestcount =0;
      }
     // console.log('totalkycdoneyestcnt',this.kycdoneyestcount);
      this.shwLdr = false;
    });
  }


  kyc_completed(dst_id,lmo_id) {
    //kyc completed
    this.shwLdr = true;
    dst_id=this.subkycrpt.value.district
    lmo_id=this.subkycrpt.value.lmocode.agnt_id
    let rte = 'caf_operations/listdistrictwisekycdone/'+dst_id+'/'+lmo_id;
    // console.log(rte);
    this.crdsrv.get(rte).subscribe((res) => {
      this.kyccomplete = res['data'];
      this.kyccompleteddata = true;
      this.kycnotcompletedata = false;
      this.totaltodaydata=false;
      this.totalyestdata=false;
   //  console.log('kycdone',this.kyccomplete);
      this.shwLdr = false;
      let counter = 0;
      this.kyccomplete.filter((k) => {
        k['s_no'] = ++counter;
      });
    });
    this.columnDefs = [
      { headerName: 'Sno', field: 's_no', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 80, dataType: 'number', filter: false },
      { headerName: 'LMO CODE', field: 'agnt_cd', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 200, filter: true },
      { headerName: 'LMO Name', field: 'agnt_nm', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 200, filter: true },
      { headerName: 'CAF_ID', field: 'caf_id', alignment: 'center', cellClass: 'pm-grid-number-cell', width:200, filter:true},
      { headerName: 'Mandal', field: 'mandal', alignment: 'center', cellClass: 'pm-grid-number-cell', width:250, filter:true},
      { headerName: 'Village', field: 'village', alignment: 'center', cellClass: 'pm-grid-number-cell', width:250, filter:true},
      { headerName: 'Moblie No', field: 'mbl_nu', alignment: 'center', cellClass: 'pm-grid-number-cell', width:250, filter:true},
      { headerName: 'Office Contact Name', field: 'ofce_cntct_nm', alignment: 'center', cellClass: 'pm-grid-number-cell', width:250, filter:true},
      { headerName: 'Date Done', field: 'date', alignment: 'center', cellClass: 'pm-grid-number-cell', width:250, filter:true},
    ];
  }

  kyc_notcompleted(dst_id,lmo_id) {
    //kyc pending
    this.shwLdr = true;
    dst_id=this.subkycrpt.value.district
    lmo_id=this.subkycrpt.value.lmocode.agnt_id
    let rte = 'caf_operations/listdistrictwisekycdonetobe/'+dst_id+'/'+lmo_id;
    // console.log(rte);
    this.crdsrv.get(rte).subscribe((res) => {
      this.kycnotcomplete = res['data'];
      this.kycnotcompletedata = true;
      this.kyccompleteddata = false;
      this.totaltodaydata=false;
      this.totalyestdata=false;
    //  console.log('kycNOTdone',this.kycnotcomplete);
      this.shwLdr = false;
      let counter = 0;
      this.kycnotcomplete.filter((k) => {
        k['s_no'] = ++counter;
      }); 
    });
    this.columnDefs = [
      { headerName: 'Sno', field: 's_no', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 100, dataType: 'number', filter: false },
      { headerName: 'LMO CODE', field: 'agnt_cd', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 200, filter: true },
      { headerName: 'LMO Name', field: 'agnt_nm', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 300, filter: true },
      { headerName: 'CAF_id', field: 'caf_id', alignment: 'center', cellClass: 'pm-grid-number-cell', width:250, filter:true},
      { headerName: 'Moblie No', field: 'mbl_nu', alignment: 'center', cellClass: 'pm-grid-number-cell', width:250, filter:true},
      { headerName: 'Office Contact Name', field: 'ofce_cntct_nm', alignment: 'center', cellClass: 'pm-grid-number-cell', width:300, filter:true},
    ];
  }


  total_done_today(dst_id,lmo_id){
    //kycdonetoday
    this.shwLdr = true;
    dst_id=this.subkycrpt.value.district
    lmo_id=this.subkycrpt.value.lmocode.agnt_id
    let rte = 'caf_operations/todaydonedistrictwisekyclist/'+dst_id+'/'+lmo_id;
    // console.log(rte);
    this.crdsrv.get(rte).subscribe((res) => {
      this.totaltoday = res['data'];
      this.totaltodaydata=true;
      this.kyccompleteddata= false;
      this.kycnotcompletedata = false;
      this.totalyestdata=false;
     //console.log('kycdonetoday',this.totaltoday);
      this.shwLdr = false;

      let counter = 0;
      this.totaltoday.filter((k) => {
        k['s_no'] = ++counter;
      });
    });

    this.columnDefs = [
      { headerName: 'Sno', field: 's_no', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 80, dataType: 'number', filter: false },
      { headerName: 'LMO CODE', field: 'agnt_cd', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 200, filter: true },
      { headerName: 'LMO Name', field: 'agnt_nm', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 200, filter: true },
      { headerName: 'CAF_ID', field: 'caf_id', alignment: 'center', cellClass: 'pm-grid-number-cell', width:200, filter:true},
      { headerName: 'Mandal', field: 'mandal', alignment: 'center', cellClass: 'pm-grid-number-cell', width:250, filter:true},
      { headerName: 'Village', field: 'village', alignment: 'center', cellClass: 'pm-grid-number-cell', width:250, filter:true},
      { headerName: 'Moblie No', field: 'mbl_nu', alignment: 'center', cellClass: 'pm-grid-number-cell', width:250, filter:true},
      { headerName: 'Office Contact Name', field: 'ofce_cntct_nm', alignment: 'center', cellClass: 'pm-grid-number-cell', width:250, filter:true},
      { headerName: 'Date Done', field: 'date', alignment: 'center', cellClass: 'pm-grid-number-cell', width:250, filter:true},
    ];
  }

  total_done_yest(dst_id,lmo_id){
    this.shwLdr = true;
    dst_id=this.subkycrpt.value.district
    lmo_id=this.subkycrpt.value.lmocode.agnt_id
    let rte = 'caf_operations/yesterdaydonedistrictwisekyclist/'+dst_id+'/'+lmo_id;
    // console.log(rte);
    this.crdsrv.get(rte).subscribe((res) => {
      this.totalyest = res['data'];
      this.totalyestdata=true
      this.totaltodaydata=false;
      this.kyccompleteddata= false;
      this.kycnotcompletedata = false;
     //console.log('kycdoneyest',this.totalyest);
      this.shwLdr = false;

      let counter = 0;
      this.totalyest.filter((k) => {
        k['s_no'] = ++counter;
      });
    });

    this.columnDefs = [
      { headerName: 'Sno', field: 's_no', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 80, dataType: 'number', filter: false },
      { headerName: 'LMO CODE', field: 'agnt_cd', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 200, filter: true },
      { headerName: 'LMO Name', field: 'agnt_nm', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 200, filter: true },
      { headerName: 'CAF_ID', field: 'caf_id', alignment: 'center', cellClass: 'pm-grid-number-cell', width:200, filter:true},
      { headerName: 'Mandal', field: 'mandal', alignment: 'center', cellClass: 'pm-grid-number-cell', width:250, filter:true},
      { headerName: 'Village', field: 'village', alignment: 'center', cellClass: 'pm-grid-number-cell', width:250, filter:true},
      { headerName: 'Moblie No', field: 'mbl_nu', alignment: 'center', cellClass: 'pm-grid-number-cell', width:250, filter:true},
      { headerName: 'Office Contact Name', field: 'ofce_cntct_nm', alignment: 'center', cellClass: 'pm-grid-number-cell', width:250, filter:true},
      { headerName: 'Date Done', field: 'date', alignment: 'center', cellClass: 'pm-grid-number-cell', width:250, filter:true},
    ];
  }



  openSideBar(): any {
    this._dsSidebarService.getSidebar('addFormPanel1').toggleOpen();
  }
  closeSideBar(): any {
    this._dsSidebarService.getSidebar('addFormPanel1').toggleOpen();
  }


  onCellClick(event): any {
  //  console.log(event.value);
    if (event.value == 'Edit') {
      this.kyclmodata = event.data;
     // console.log(event.data);
      this.openSideBar();
    }
  }

  onCellPrepared(colDef, e) {

    if (e.rowType === "data" && e.row.data && e.column.dataField == 'Edit') {
      e.cellElement.style.color = '#ff0000';
      e.cellElement.style.fontWeight = 500;
      e.cellElement.style.background = 'rgba(243, 191, 176, 0.2784313725490196)';
      e.cellElement.style.backgroundClip = 'content-box';
      e.cellElement.style.cursor = "pointer";
    }
  }

  getagntid(data): any {
    // return;
    //this.lmoSlctd = true;
    //console.log(data.agnt_cd)
    const postAgntData = {
      agntcode: data.agnt_cd
    };
  }

  displayFn(agent): any {
    if (agent) { return agent.agnt_cd; }
  }


  RequireMatch(control: AbstractControl) {
    const selection: any = control.value;
    if (typeof selection === 'string') {
        return { incorrect: true };
    }
    return null;
}


  ngOnInit() {
     this.total_kycdone_cnt;
     this.total_kycnotdone_cnt;
     this.total_kyc_donetoday_cnt;
     this.total_kyc_doneyest_cnt;
     this.subkycrpt = this._formBuilder.group({
      district:new FormControl('', [Validators.required]),
      lmocode:new FormControl('', [Validators.required,this.RequireMatch]),
      });
       this.subkycrpt.get('lmocode').valueChanges
                 .pipe(
                   debounceTime(500),
                   tap(() => {
                     this.errorMsg = '';
                     this.filteredAgents = [];
                     this.isLoading = true;
                   }),
                   switchMap((value) => {
                     if (value){
                     if (value.length >= 4 || value.length != null) {
                      this.codedata=this.subkycrpt.value.district
                      let rte = 'caf_operations/distrctwiselmoscount/'+this.codedata+'/';
                       return this.crdsrv.get(rte + value)
                         .pipe(
                           finalize(() => {
                             this.isLoading = false;
                             value=this.subkycrpt.value.lmocode
                             //console.log(value)
                           }),
                         );
                     }}}))
                 .subscribe(data => {
                 // console.log(data);
                 // console.log(data['data']);
                   if (data['data'] === undefined) {
                     this.errorMsg = data['Error'];
                     this.filteredAgents = [];
                   } else {
                     this.errorMsg = '';
                     this.filteredAgents = data['data'];
                     //console.log(this.filteredAgents);
                     
                   }
                 });
              }

}
