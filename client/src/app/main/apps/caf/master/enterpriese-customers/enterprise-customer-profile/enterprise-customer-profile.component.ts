import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TransfereService } from 'app/providers/transfer/transfer.service';
import { CrudService } from 'app/main/apps/crud.service';
import { DsSidebarService } from '@glits/components/sidebar/sidebar.service';
import { DatePipe } from '@angular/common'
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-enterprise-customer-profile',
  templateUrl: './enterprise-customer-profile.component.html',
  styleUrls: ['./enterprise-customer-profile.component.scss']
})
export class EnterpriseCustomerProfileComponent implements OnInit {

  permissions;
  rowData = [];
  columnDefs = [];
  cstmrdata = [];
  invoiceData = [];
  columnDef = [];
  invice_dtls = [];
  loader: boolean = false;
  cafDtls;
  nodes: any;
  totalNodes: number;
  nodesList = [];
  cafcount: any;
  nodeLst: any[];
  nodcount: any;
  cstmrData: any;
  crntMnthCnts: any;
  allPrvMnthCnts: any;
  activeCnt = 0;
  oltdatacounts = [{ total: 0, active: 0, inactive: 0 }];
  hourlyOltCounts = [{ one_hr: 0, three_hr: 0, twelve_hr: 0, twntfur_hr: 0 }];
  onudatacounts = [{ total: 0, active: 0, inactive: 0 }];
  hourlyOnuCounts = [{ one_hr: 0, three_hr: 0, twelve_hr: 0,les_twelve_hr: 0, twntfur_hr: 0 }];
  entpCstmrBnd = { mnthupld: 0, mnthdld: 0, ttl_limit: 0 };
  entpCstmrPrvsBnd = { mnthupld: 0, mnthdld: 0, ttl_limit: 0 };
  cafWseDtls;
  cafWseDtlscolumnDefs;
  hsiDayWise;
  architecturesInfo;
  currentyear;
  selectedYear;
  selectedMonth;
  dataSource;
  href;
  dstrctSummryCnts;
  dstrctSummryCntscolumnDefs;
  cafhsiDayWise;
  cafhsiDayWisearchitecturesInfo;
  daycafdt;
  months = [{ id: 1, nm: 'January' }, { id: 2, nm: 'February' }, { id: 3, nm: 'March' }, { id: 4, nm: 'April' }, { id: 5, nm: 'May' }, { id: 6, nm: 'June' }, { id: 7, nm: 'July' }, { id: 8, nm: 'August' }, { id: 9, nm: 'Spetember' }, { id: 10, nm: 'October' }, { id: 11, nm: "November" }, { id: 12, nm: 'December' }]
  getHeaderDtls = function () { return { 'title': 'Enterprise Customer Information', 'icon': 'people_outline' } };
  tdy_up;  
  calculateSummary;
  entpCstmrTdyBnd={tdy_up:0,tdy_dwn:0};
  years=[];
  selectedYear1;
  selectedMonth1;
  mnthName;
  shwHsiGrph: boolean = false;
  constructor(private router: Router, private actroute: ActivatedRoute, private location: Location, public TransfereService: TransfereService, public crdsrv: CrudService, private route: Router, private _dsSidebarService: DsSidebarService, public datepipe: DatePipe) {
    this.permissions = { 'slct_in': 1, 'insrt_in': 1, 'updt_in': 1, 'dlte_in': 1, 'exprt_in': 1 };
    this.href = this.router.url;
    console.log(this.router.url);
    this.currentyear = (new Date()).getFullYear();
    var count = this.currentyear - 2016;
    for (var i = 0; i <= count; i++) {
      let yr = this.currentyear - i
      this.years.push(yr)
    }
    this.selectedYear1 = this.currentyear;
  
  }
  selectmnth(){
    console.log(this.selectedMonth1)
    console.log(this.selectedYear1)
    let event = {row:{data:{caf_id: this.daycafdt}}}
    this.onCellClick1(event,this.selectedYear1,this.selectedMonth1);
  }

  ngOnInit() {
    if(this.router.url == "/admin/caf/entcustomer/profile") {
      console.log("ii else")
      this.cafDtls = this.TransfereService.getLoclData('cafData');
      this.currentyear = (new Date()).getFullYear();
      this.selectedYear = this.currentyear;
      this.getonucounts();
      this.getHoulrOnuCounts();
      this.getdetails();
      this.getDstrctWseSmmry();
    }
    else {
      var str = this.href.split("/");
      var resstr  = str[4].split("-")
      // this.location.replaceState('admin/home/raithu_barosa');  
      console.log(str)
      let rte = `dashbrd/entcaf/${resstr[3]}`
      this.crdsrv.get(rte).subscribe(res => {
        this.TransfereService.setLoclData('cafData', res['data'][0])
        this.cafDtls = this.TransfereService.getLoclData('cafData');
        console.log(this.cafDtls);
        this.currentyear = (new Date()).getFullYear();
        this.selectedYear = this.currentyear;
        this.getonucounts();
        this.getHoulrOnuCounts();
        this.getdetails();
        this.getDstrctWseSmmry();
      })
    }

  }
  onTabChanged($event) {
    let clickedIndex = $event.index;
    console.log(clickedIndex)
    if (clickedIndex == 0) {
      this.shwHsiGrph = false;
    }
    if (clickedIndex == 1) {
      this.shwHsiGrph = false;
    }
    if (clickedIndex == 2) {
      this.getHsibandWidth();
      this.getHsiPrvsbandWidth();
      this.getHsiTdybandWidth();
      this.getHsicafDtls();
      var date = new Date(),
        mnth = ("0" + (date.getMonth() + 1)).slice(-2),
        day = ("0" + date.getDate()).slice(-2);
      this.selectedMonth = date.getMonth() + 1;
      this.selectedMonth1 = date.getMonth() + 1
      this.getHsiDayWise(this.selectedMonth, this.selectedYear);
      this.shwHsiGrph = true;
    }
  }
  getDstrctWseSmmry(){
    const rte = `dashbrd/DstrctSmmry/` + this.cafDtls.cstmr_id;
    this.crdsrv.get(rte).subscribe(res => {
      this.dstrctSummryCnts = res['data'];
      console.log(this.dstrctSummryCnts);
      let counter = 0;
      this.dstrctSummryCnts.filter((k) => {
        k['sno'] = ++counter;
      });
      this.dstrctSummryCntscolumnDefs = [
        { headerName: 'Sno', field: 'sno', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 100, filter: false, search: false },
        { headerName: 'District', field: 'dstrt_nm', alignment: 'left', cellClass: 'pm-grid-number-cell', width: 150, filter: true, },
        { headerName: 'Total CAFs', field: 'ttl_caf_count', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 150, filter: true },
        { headerName: 'Active CAFs', field: 'act_caf_count', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 150, filter: true, },
        { headerName: 'Suspended CAFs', field: 'sus_caf_count', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 150, filter: true, },
        { headerName: 'Terminated CAFs', field: 'ter_caf_count', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 150, filter: true, },
        { headerName: 'Pending Status CAFs', field: 'others', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 150, filter: true, },
        { headerName: 'Total ONUs', field: 'ttl_onus', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 150, filter: true, },
        { headerName: 'Online ONUs', field: 'online_onus', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 150, filter: true, },
        { headerName: 'Offline ONUs', field: 'offline_onus', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 150, filter: true, },

      ];
    }); 
  }
  getonucounts() {
    const rte = `dashbrd/getEntpCstmronucounts/` + this.cafDtls.cstmr_id;
    this.crdsrv.get(rte).subscribe(res => {
      this.onudatacounts = res['data'];
      console.log(this.onudatacounts);
    });
  }
  getHoulrOnuCounts() {
    let rte1 = `dashbrd/getEntpCstmrHourlyonucounts/` + this.cafDtls.cstmr_id;
    this.crdsrv.get(rte1).subscribe((res) => {
      // console.log(res['data']);
      if (res['data'].length > 0) {
        this.hourlyOnuCounts = res['data']
      }
    })
  }
  getoltcounts() {
    const rte = `dashbrd/getEntpCstmroltcounts/` + this.cafDtls.cstmr_id;
    this.crdsrv.get(rte).subscribe(res => {
      this.oltdatacounts = res['data'];
      console.log(this.oltdatacounts);
    });
  }
  getHoulrOltCounts() {
    let rte1 = `dashbrd/getEntpCstmrHourloltcounts/` + this.cafDtls.cstmr_id;
    this.crdsrv.get(rte1).subscribe((res) => {
      // console.log(res['data']);
      if (res['data'].length > 0) {
        this.hourlyOltCounts = res['data']
      }
    })
  }
  getdetails() {
    // console.log('in get caf')
    this.loader = true;
    const rte = `caf/entcaflst/` + this.cafDtls.cstmr_id;
    this.crdsrv.get(rte).subscribe(res => {
      this.cafcount = res['data'][0];
      console.log(this.cafcount);
    });
    const rte1 = `caf/entnodecnt/` + this.cafDtls.cstmr_id;
    this.crdsrv.get(rte1).subscribe(res => {
      this.nodcount = res['data'][0];
      console.log(this.nodcount);
    });

    const cafCrntMnthRte = `caf/entcustomers/operations/` + this.cafDtls.cstmr_id;
    this.crdsrv.get(cafCrntMnthRte).subscribe(res => {
      this.crntMnthCnts = res['data'][0];
      this.allPrvMnthCnts = res['data'];
      console.log(this.crntMnthCnts);
      console.log(this.allPrvMnthCnts);
    });

    const rte2 = `caf/entnodelst/` + this.cafDtls.cstmr_id;
    // console.log(rte2)
    this.crdsrv.get(rte2).subscribe(res => {
      // console.log(res)
      this.rowData = res['data'];
      console.log(this.rowData);
      this.nodeLst = res['data'];
      this.loader = false;
      let counter = 0;
      console.log(this.activeCnt)

      this.rowData.filter((k) => {
        k['sno'] = ++counter;
        k['lst_chnge_tm'] = this.datepipe.transform(k.lst_chnge_tm, 'yyyy-MM-dd h:mm:ss');
      });
      this.columnDefs = [
        { headerName: 'Sno', field: 'sno', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 100, filter: false, search: false },
        {
          headerName: 'CAF No', field: 'caf_nu', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 150, filter: true,
          filterOperations: ['contains', 'startswith', '='], hide: false,
        },
        { headerName: 'Profile', field: 'Profile', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 100, height: 40, columnFiltering: false, filter: true, hide: false },
        { headerName: 'Name', field: 'cstmr_nm', alignment: 'left', cellClass: 'pm-grid-number-cell', width: 150, filter: true, hide: false },
        {
          headerName: 'Mobile Number', field: 'cntct_mble1_nu', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 150, filter: true,
          filterOperations: ['contains', 'startswith', '='], selectedFilterOperation: 'contains', allowFiltering: true, hide: false
        },
        { headerName: 'Status', field: 'sts_nm', alignment: 'left', cellClass: 'pm-grid-number-cell', width: 125, filter: true, hide: false },
        { headerName: 'ONU Status', field: 'ste_nm', alignment: 'left', cellClass: 'pm-grid-number-cell', width: 125, filter: true, hide: false },
        { headerName: 'ONU in current state from', field: 'lst_chnge_tm', alignment: 'left', cellClass: 'pm-grid-number-cell', width: 125, filter: true, hide: false },
        { headerName: 'LMO', field: 'lmo_cd', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 125, filter: true, hide: false },
        { headerName: 'Billing Frequency', field: 'frqncy_nm', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 110, filter: true, hide: false },
        { headerName: 'District', field: 'dstrt_nm', alignment: 'left', cellClass: 'pm-grid-number-cell', width: 125, filter: true, groupIndex: '0', hide: false },
        { headerName: 'Mandal', field: 'mndl_nm', alignment: 'left', cellClass: 'pm-grid-number-cell', width: 125, filter: true, hide: false },
        { headerName: 'Activation Date', field: 'actvn_dt', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 125, filter: true, hide: false },
        { headerName: 'Suspended Date', field: 'spnd_dt', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 125, filter: true, hide: true },
        { headerName: 'Resume Date', field: ' rsme_dt', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 125, filter: true, hide: true },
        { headerName: 'Termination Date', field: 'trmnd_dt', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 125, filter: true, hide: true }
      ];
    });
  }
  setCafDetailsGrid() {



  }

  onCellClick(event) {
    console.log(event);
    if (event.value == 'Profile') {
      this.cstmrData = event.data;
      console.log(event.data);
      this.openSideBar();
    }
  }
  onCellClick1(event,yr,mnth){
    console.log(event.row.data.caf_id)
    this.daycafdt = event.row.data.caf_id
    console.log(this.selectedMonth1)
    this.mnthName =  this.months[this.selectedMonth1-1].nm
    console.log(this.mnthName)

    let rte1 = `dashbrd/getCafHsimnthWiseUsge/${event.row.data.caf_id}/${this.selectedYear1}/${this.selectedMonth1}`
    this.crdsrv.get(rte1).subscribe((res) => {
      console.log(res['data'])
      if (res['data'].length > 0) {
        this.cafhsiDayWise = res['data'];

        console.log(this.cafhsiDayWise);
      }
      this.cafhsiDayWisearchitecturesInfo = [{
        value: "upload",
        name: "Upload",
        color: "#FFD55A"
      },
      {
        value: "download",
        name: "Download",
        color: "#210070"
      }];
    })
  }
  addNewCaf() {
    let frm_actn = 'entnew'
    this.TransfereService.setData(frm_actn)
    this.TransfereService.setLoclData('entcafData', this.cafDtls)
    this.route.navigate([`/admin/caf/new-caf`])
    // this.route.navigate([`/admin/caf/entcustomer/new-caf`])

  }
  addBbnlNewCaf() {
    let frm_actn = 'entnew'
    this.TransfereService.setData(frm_actn)
    this.TransfereService.setLoclData('entcafData', this.cafDtls)
    this.route.navigate([`/admin/caf/bbnl-ind-new-caf`])
    // this.route.navigate([`/admin/caf/entcustomer/new-caf`])
  }
  customizeTooltip = (arg) => {
    return {
        text: this.getText(arg.point.data, arg.valueText)
    };
    
  
  }
  getText(item, value): any {
    var formatter = new Intl.NumberFormat('en-IN', { maximumSignificantDigits: 8 })
    var uploadval = formatter.format(item.upload);
    var downldval = formatter.format(item.download)
  return  '<div style="font-size:12px">'+'Upload' + ' - ' + '<div style="font-size:15px">' + '<b>' + uploadval + " TB"+'</b>' + '</div>' + '<br>'+'<div style="font-size:12px">'+'Download' + ' - ' + '<div style="font-size:15px">' + '<b>' + downldval + " TB"+'</b>' + '</div>';
  }
  addNewNode() {
    this.TransfereService.setData({
      // 'prnt_cstmr_id': this.cafDtls.prnt_cstmr_id,
      'cstmr_id': this.cafDtls.cstmr_id,
      'frst_nm': this.cafDtls.cstmr_nm,
      'entrpe_type_id': this.cafDtls.entrpe_type_id,
    })
    this.route.navigate([`/admin/caf/new-node`])

  }
  saveBulkUpload() {
    this.TransfereService.setData(this.cafDtls)
    this.route.navigate([`admin/caf/bulk-caf-upload`])

  }
  onCelleditClick(data) {

    this.TransfereService.setLoclData('entcafData', data.row.data)
    this.route.navigate([`/admin/caf/entcustomer/caf-edit`])
  }
  groupBy = (array, key) => {
    // Return the end result
    return array.reduce((result, currentValue) => {
      // If an array already present for key, push it to the array. Else create an array and push the object
      (result[currentValue[key]] = result[currentValue[key]] || []).push(
        currentValue
      );
      // Return the current iteration `result` value, this will be taken as next iteration `result` value and accumulate
      return result;
    }, {}); // empty object is the initial value for result object
  };
  openSideBar(): any {
    this._dsSidebarService.getSidebar('addFormPanel').toggleOpen();
  }
  closeSideBar(): any {
    this._dsSidebarService.getSidebar('addFormPanel').toggleOpen();
  }
;

  onCellPrepared(colDef, e) {
    // console.log(e)

    if (e.rowType === "data" && e.row.data && e.column.dataField == 'Profile') {
      e.cellElement.style.color = '#ff0000';
      e.cellElement.style.fontWeight = 500;
      e.cellElement.style.borderRadius = '10px';
      e.cellElement.style.background = 'rgba(243, 191, 176, 0.2784313725490196)';
      e.cellElement.style.backgroundClip = 'content-box';
      e.cellElement.style.cursor = "pointer";
    }
      if (e.rowType === "data" && e.row.data && e.column.dataField == 'ste_nm') {
        if(e.text=="Operational"){
          e.cellElement.style.color = 'green';
          e.cellElement.style.fontWeight = 500;
        }
        else{
          e.cellElement.style.color = '#8a0b0b';
          e.cellElement.style.fontWeight = 500;
        }
      }

  }
  getHsibandWidth() {
    const rte = `dashbrd/getEntpCstmrBndWdth/` + this.cafDtls.cstmr_id;
    this.crdsrv.get(rte).subscribe(res => {
      console.log(res['data'])
      this.entpCstmrBnd = res['data'][0];
      console.log(this.entpCstmrBnd);
    });
  }
  getHsiPrvsbandWidth() {
    const rte = `dashbrd/getBndWdthPrvsMnth/` + this.cafDtls.cstmr_id;
    this.crdsrv.get(rte).subscribe(res => {
      this.entpCstmrPrvsBnd = res['data'][0];
      console.log(this.entpCstmrPrvsBnd);
    });
  }
  getHsiTdybandWidth() {
    const rte = `dashbrd/getTdyBndWdth/` + this.cafDtls.cstmr_id;
    this.crdsrv.get(rte).subscribe(res => {
      this.entpCstmrTdyBnd = res['data'][0];
      console.log(this.entpCstmrTdyBnd);
    });
  }
  getHsicafDtls() {
    const rte = `dashbrd/getBndWdthByCafWse/` + this.cafDtls.cstmr_id;
    this.crdsrv.get(rte).subscribe(res => {
      this.cafWseDtls = res['data'];
      console.log(this.cafWseDtls);
      let counter = 0;
      this.cafWseDtls.filter((k) => {
        k['sno'] = ++counter;
      });
      let event = {row:{data:{caf_id: this.cafWseDtls[0].caf_id}}}
      this.onCellClick1(event, this.selectedYear1, this.selectedMonth1);
      this.cafWseDtlscolumnDefs = [
        { headerName: 'Sno', field: 'sno', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 100, filter: false, search: false },
        {
          headerName: 'CAF No', field: 'caf_id', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 150, filter: true, filterOperations: ['contains', 'startswith', '=']
        },
        { headerName: 'Total Upload Usage (GB)', field: 'upd', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 150, filter: true, },
        { headerName: 'Total Download Usage (GB)', field: 'dwn', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 150, filter: true, },
        { headerName: 'Total Limit (GB)', field: 'ttl_limit', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 150, filter: true, },
        { headerName: 'District', field: 'dstrt_nm', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 150, filter: true, groupIndex: '0' },
        { headerName: 'Mandal', field: 'mndl_nm', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 150, filter: true, },
        { headerName: 'Village', field: 'vlge_nm', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 150, filter: true, },

      ];
    });
  }
  getHsiDayWise(mnth, year) {
    let rte1 = `dashbrd/getHsimnthWiseUsge/${mnth}/${year}/${this.cafDtls.cstmr_id}`
    this.crdsrv.get(rte1).subscribe((res) => {
      console.log(res['data'])
      if (res['data'].length > 0) {
        this.hsiDayWise = res['data'];

        console.log(this.hsiDayWise);
      }
      this.architecturesInfo = [{
        value: "upload",
        name: "Upload",
        color: "#FFD55A"
      },
      {
        value: "download",
        name: "Download",
        color: "#210070"
      }];
    })
  }
  customizeText = (arg: any) => {
    return arg.valueText;
}
}  
