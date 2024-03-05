import { Component, OnInit,ViewChildren ,QueryList} from '@angular/core';
import { CrudService } from 'app/main/apps/crud.service';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import {PluginServiceGlobalRegistrationAndOptions,Color  } from 'ng2-charts'
import { MAT_DIALOG_DATA, MatDialog, MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material';
import { DsSidebarService } from '@glits/components/sidebar/sidebar.service';
import * as _ from 'lodash';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  usrDtls;
  doughnutChartColors: Color[] = [{
    backgroundColor: ['#99c24d','#f18f01'],
   }]
  cafDtls: any = [{ caf_nu: 0,cstmr_nm:'',actvn_ts:'',phne_nu:'',address:'',sts_nm:'',frqncy_nm:'',pckge_nm:'',onu_srl_nu:'',mdle_nm:'',agnt_nm:'',ofce_mbl_nu:'' }];
  hsiData;
  searchText:any;
  hsicolumnDefs;
  hsieachday;
  hsiEchDayLineGraph;
  cafHsiUsgeOprtns;
  hsiEachdaycolumnDefs;
  permissions;
  pkgeData;
  barChartPlugins1;
  activeLbl;
  packagecolumnDefs;
  voipcolumdefs;
  voipData;
  longtabs = [];
  year;
  cafHsiMnthPckgsData;
  currentyear;
  years = [];
  chnlesLst;
  chnlesLstColdefs;
  tabContent;
  ttldata;
  shwLdr;
  chartLabels;
  chartData1;
  monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  chartData;
  hsiPckgsData;
  labels: { fontColor: 'red' }
  barChartLabels;
  chartOptions;
  public barchartOptions: PluginServiceGlobalRegistrationAndOptions[] = [];
  barChartPlugins
  pieChartLabels;
  pieChartData;
  monthName;
  fnlChckdData = [];
  selectedPckgeIndex = 0;
  srch_cntrl = {
    srch_txt: '',
    srch_ldng: false,
    lmt_pstn: 1,
    pcge_mde: '1',
    agntId: ''
  };
  addOnStandardPckgsLst=[]
  columnDefs = [];
  selectedIndex = 0;
  loader = false;
  slctdAllPckgs=[]
  channels:any
  ChanlArry=[]
  view: boolean;
  @ViewChildren ('checkBox' ) checkBox: QueryList<any>;
  shwSveBtn = false;
  constructor(public crdsrv: CrudService,private dsSidebarService: DsSidebarService,private _snackBar: MatSnackBar) {
    this.permissions = { "slct_in": 1, "insrt_in": 0, "updt_in": 1, "dlte_in": 1, "exprt_in": 1 };

    this.usrDtls = JSON.parse(localStorage.getItem('usrDtls'));
    console.log(this.usrDtls.usr_ctgry_ky);
    this.currentyear = (new Date()).getFullYear();
    var count = this.currentyear - 2016;
    for (var i = 0; i <= count; i++) {
      let yr = this.currentyear - i
      this.years.push(yr)
    }
  }

  ngOnInit() {
   this.selectedIndex = 0;
    var date = new Date();
    this.year = date.getFullYear();
    this.getcafsdtls();
    if (this.selectedIndex == 0) {
      this.getIptvPckgesData();
    }
  }
  getcafsdtls() {
    const rte = `dashbrd/CafsDtls/${this.usrDtls.usr_ctgry_ky}`;
    this.crdsrv.get(rte).subscribe((res) => {
      console.log(res['data'])
      this.ttldata = res['data']
      if (res['data'].length == 1) {
        this.cafDtls = res['data']
        this.getcafhsi(this.cafDtls[0].caf_nu)
        this.getpackage(this.cafDtls[0].caf_nu)
        this.getvoip(this.cafDtls[0].caf_nu, this.year)
        this.getcurrntmnthdatalimit(this.cafDtls[0].caf_nu)
      }
      else {
        for (let i = 0; i < this.ttldata.length; i++) {
          this.longtabs.push({ id: i, text: this.ttldata[i].caf_nu })
        }
        console.log(this.longtabs)
        let selefsttbdt = {
          itemData: this.longtabs[0]
        }
        this.selectTab(selefsttbdt)

      }
      console.log(this.longtabs)
      console.log(res['data'])
    })
  }
  selectTab(e) {
    console.log(e)
    for (let i = 0; i < this.ttldata.length; i++) {
      console.log(this.ttldata[i].caf_nu, e.itemData.text)
      if (this.ttldata[i].caf_nu == e.itemData.text) {
        this.cafDtls = [this.ttldata[i]]
      }
    }
    console.log(this.cafDtls)
    this.getcafhsi(e.itemData.text)
    this.getpackage(e.itemData.text)
    this.getvoip(e.itemData.text, this.year)
    this.getcurrntmnthdatalimit(e.itemData.text)
  }
  getcafhsi(cafId) {
    this.shwLdr = true;
    const rte = 'caf/customer/hsi/' + cafId;
    this.crdsrv.get(rte).subscribe((res) => {
      for (let i = 0; i < res['data'].length; i++) {
        res['data'][i]['month'] = this.monthNames[res['data'][i].mnt_ct - 1];
      }
      this.hsiData = res['data'];

      console.log(this.hsiData)
      this.shwLdr = false;
      var date = new Date();
      var yearTdy = date.getFullYear();
      var mnthTdy = date.getMonth() + 1;
      let uploadarry = []
      let dwnloadary = []
      for (let i = 0; i < this.hsiData.length; i++) {
        console.log(yearTdy,this.hsiData[i].yr_ct)
        console.log(mnthTdy,this.hsiData[i].mnt_ct)
        if (this.hsiData[i].yr_ct == yearTdy && this.hsiData[i].mnt_ct == mnthTdy) {
            this.monthName = this.monthNames[this.hsiData[i].mnt_ct - 1];
          this.hsiData[i].eachday.filter((k) => {
            console.log(k)
            for (let index = 1; index <= 31; index++) {
                uploadarry.push(k[`day_${index}_TU`])
                dwnloadary.push(k[`day_${index}_TD`])
          this.chartData = [{ data: uploadarry, label: 'upload', fill: false, responsive: true }, { data: dwnloadary, label: 'download', fill: false, responsive: true }]
            }
          })
        }
      }
      this.chartLabels = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31]
      this.chartOptions={
        scales: {
        yAxes: [{
        scaleLabel: {
           display: true,
           labelString: 'Data Usage in(GB)'
        }
     }],
     xAxes: [{
      scaleLabel: {
         display: true,
         labelString: 'Days'
      }
   }]
    },
    plugins: {
      datalabels: {
        font: {
          display:'none',
          weight: 'bold',
          size: 0
        }
      }
    }
    }
    
      console.log(this.chartData)


    })
  }

  getdaywisedata(y,m){
    let uploadarry = []
    let dwnloadary = []
    for (let i = 0; i < this.hsiData.length; i++) {
      if (this.hsiData[i].yr_ct == y && this.hsiData[i].mnt_ct == m) {
        this.monthName = this.monthNames[this.hsiData[i].mnt_ct - 1];
        this.hsiData[i].eachday.filter((k) => {
          console.log(k)
          for (let index = 1; index <= 31; index++) {
              uploadarry.push(k[`day_${index}_TU`])
              dwnloadary.push(k[`day_${index}_TD`])
        this.chartData = [{ data: uploadarry, label: 'upload', fill: false, responsive: true }, { data: dwnloadary, label: 'download', fill: false, responsive: true }]
          }
        })
      }
    }
    this.chartLabels = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31]
  }
  customizeTooltip2 = (arg) => {
    return {
      text: this.getText2(arg.point.data, arg.valueText)
    };
  }
  getText2(item, value): any {
    console.log(item)
    var formatter = new Intl.NumberFormat('en-IN', { maximumSignificantDigits: 3 })
    var uploadval = formatter.format(item.upload);
    var downldval = formatter.format(item.download)
    return '<div style="font-size:12px">' + 'Upload' + ' - ' + '<div style="font-size:15px">' + '<b>' + uploadval + " GB" + '</b>' + '</div>' + '<br>' + '<div style="font-size:12px">' + 'Download' + ' - ' + '<div style="font-size:15px">' + '<b>' + downldval + " GB" + '</b>' + '</div>';
  }
  getpackage(cafId) {
    this.shwLdr = true;
    const rte = 'caf/customer/package/' + cafId;
    this.crdsrv.get(rte).subscribe((res) => {
      let index = 1;
      for (let i = 0; i < res['data'].length; i++) {
        res['data'][i]['sno'] = index++
      }
      this.pkgeData = res['data'];
      this.shwLdr = false;
      console.log(this.pkgeData)
      for (let i = 0; i < this.pkgeData.length; i++) {
        if (this.pkgeData[i].plan_exp == '31-12-9999') {
          this.activeLbl = true;
        } else {
          this.activeLbl = false;
        }
      }

      this.packagecolumnDefs = [
        { headerName: 'Sno', field: 'sno', alignment: 'center', cellClass: "pm-grid-number-cell", width: 100, filter: false },
        { headerName: 'Package Name', field: 'pckge_nm', alignment: 'left', cellClass: "pm-grid-number-cell", width: 120, filter: false, search: false },
        { headerName: 'Service Package', field: 'srvcpk_nm', alignment: 'left', cellClass: "pm-grid-number-cell", width: 280, filter: false },
        { headerName: 'Core Service Name', field: 'cre_srvce_nm', alignment: 'left', cellClass: "pm-grid-number-cell", width: 150, filter: false },
        { headerName: 'Package Charges', field: 'chrge_at', alignment: 'right', cellClass: "pm-grid-number-cell", width: 150, filter: false },
        { headerName: 'GST Charges', field: 'gst_at', alignment: 'right', cellClass: "pm-grid-number-cell", width: 100, filter: false },
        {
          headerName: 'Package Activation', field: 'plan_act', alignment: 'center', hide: ((this.activeLbl) == true) ? true : false,
          cellClass: "pm-grid-number-cell", width: 100, filter: false
        },
        {
          headerName: 'Package Expiry', field: 'plan_exp', alignment: 'center', hide: ((this.activeLbl) == true) ? true : false,
          cellClass: "pm-grid-number-cell", width: 100, filter: false
        },

      ];
    });
    let rte1 = `package/channels`
    this.crdsrv.get(rte1).subscribe((res) => {
      if (res['status'] == 200) {
        this.chnlesLst = res['data'];
        console.log(res['data'])
      }
      // let index=1;
      // for(let i=0;i<res['data'][1].chnlDtls.length;i++){
      //   res['data'][1].chnlDtls[i]['sno']=index++
      // }
      // this.chnlesLst = res['data'][1].chnlDtls;
      // console.log(this.chnlesLst)

      this.chnlesLstColdefs = [{ headerName: 'Sno', field: 'sno', alignment: 'center', cellClass: "pm-grid-number-cell", width: 100, filter: false },
      { headerName: 'Channel Name', field: 'chnle_nm', alignment: 'center', cellClass: "pm-grid-number-cell", width: 100, filter: false },
      { headerName: 'Channel Code', field: 'chnle_cd', alignment: 'center', cellClass: "pm-grid-number-cell", width: 100, filter: false },
      { headerName: 'Service Name', field: 'srvcpk_nm', alignment: 'center', cellClass: "pm-grid-number-cell", width: 100, filter: false },
      { headerName: 'Package Name', field: 'pckge_nm', alignment: 'center', cellClass: "pm-grid-number-cell", width: 100, filter: false },
      { headerName: 'Core Service Name', field: 'cre_srvce_nm', alignment: 'center', cellClass: "pm-grid-number-cell", width: 100, filter: false }]
    })

  }
  getvoip(cafId, year) {
    this.shwLdr = true;
    const rte = `dashbrd/customer/voip/${cafId}/${year}`;
    this.crdsrv.get(rte).subscribe((res) => {
      let index = 1;
      for (let i = 0; i < res['data'].length; i++) {
        res['data'][i]['sno'] = index++
      }
      this.voipData = res['data'];
      this.shwLdr = false;
      this.voipcolumdefs = [{ headerName: 'Sno', field: 'sno', alignment: 'center', cellClass: "pm-grid-number-cell", width: 100, filter: false },
      { headerName: 'Year', field: 'call_yr', alignment: 'center', cellClass: "pm-grid-number-cell", width: 100, filter: false },
      { headerName: 'Month', field: 'mnth_nm', alignment: 'center', cellClass: "pm-grid-number-cell", width: 100, filter: false },
      { headerName: 'Charges', field: 'lcl_chrge_at', alignment: 'center', cellClass: "pm-grid-number-cell", width: 100, filter: false },
      { headerName: 'STD Charges', field: 'std_chrge_at', alignment: 'center', cellClass: "pm-grid-number-cell", width: 100, filter: false },
      { headerName: 'ISD Charges', field: 'isd_chrge_at', alignment: 'center', cellClass: "pm-grid-number-cell", width: 100, filter: false },
      ]
    })
  }
  selectyear2() {
    this.getvoip(this.cafDtls[0].caf_nu, this.year)
  }
  onToolbarPreparing(e) {
    e.toolbarOptions.items.unshift({
      location: 'after',
      widget: 'dxButton',
      options: {
        icon: 'user',
        text: 'Purchage/Delete IPTV Package',
        // onClick: this.openSideBar.bind(this, 'addFormPanel'),
        bindingOptions: {
          'disabled': 'isEmailButtonDisabled'
        }
      }
    });
  }
  getcurrntmnthdatalimit(cafId){
    let rte =`dashbrd/customer/hsilimit/${cafId}`;
    this.crdsrv.get(rte).subscribe((res) => {
      console.log(res['data'])
      let usage = (res['data'][0].usg_dwn)+(res['data'][0].usg_upld);
      let remgdt = res['data'][0].ttl_limit-usage
      this.pieChartLabels = ['Remaining data', 'Used data'];
      this.pieChartData = [remgdt.toFixed(2),usage.toFixed(2)];
      console.log(this.pieChartLabels)
      console.log(this.pieChartData)
      this.barChartPlugins = [pluginDataLabels];
      this.barchartOptions =   [{
        beforeDraw(chart) {
          const ctx = chart.ctx;
          const txt = res['data'][0].ttl_limit;
          const sidePadding = 60;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          const centerX = ((chart.chartArea.left + chart.chartArea.right) / 2);
          const centerY = ((chart.chartArea.top + chart.chartArea.bottom) / 2);
          const stringWidth = ctx.measureText(txt).width;
          ctx.fillStyle = 'black';
          ctx.fillText('Total:'+res['data'][0].ttl_limit+'GB', centerX, centerY);
        },
        
      }]
    
    })
  }

  // openSideBar = function () {
  //   console.log(key)
  //   this.dsSidebarService.getSidebar('addFormPanel').toggleOpen();
  //   // this.router.navigate(['/admin/caf/customer/service-pack'], { queryParams: { 'paramsdata': true }, skipLocationChange: true });
  // }

  openSideBar(key,value,data) {
    this.dsSidebarService.getSidebar('addFormPanel').toggleOpen();
  }
  closeSideBar() {
    this.dsSidebarService.getSidebar('addFormPanel').toggleOpen();
  }
  tabChangePckgeFn(event): any {
    console.log(event)

    if (event.index == 0) {
      this.getIptvPckgesData();
    } else if (event.index == 1) {
      this.getHsiPckgesData();
    }
  }

  getIptvPckgesData(): any {
    this.crdsrv.create(this.srch_cntrl, 'addons/packages/addons/channels').subscribe((res) => {
      // console.log(res);
      // console.log(res['data']);
      if (res['status'] == 200) {
        this.loader = false;
        res['data'].filter((k) => {
          k['expanded'] = false;
          k['isChecked'] = false;
          this.addOnStandardPckgsLst.push(k);
        });
        this.addOnStandardPckgsLst = _.uniqBy(this.addOnStandardPckgsLst, 'pckge_id');
        
        let index = 0;
        for (let k = 0; k < this.addOnStandardPckgsLst.length; k++) {
          index = index + 1;
          this.addOnStandardPckgsLst[k].indx = index;
          // tslint:disable-next-line:max-line-length
          this.addOnStandardPckgsLst[k].tot_amt = "" + (this.addOnStandardPckgsLst[k].chrge_at == null ? 0 : this.addOnStandardPckgsLst[k].chrge_at) + " + " + (this.addOnStandardPckgsLst[k].gst_at == null ? 0 : this.addOnStandardPckgsLst[k].gst_at) + "(GST) = " + this.addOnStandardPckgsLst[k].ttl_cst;
        }
        console.log(this.addOnStandardPckgsLst);
        this.columnDefs = [
          { headerName: 'Sno', field: 'indx', cellClass: 'pm-grid-number-cell', width: 50, alignment: 'center', sortable: true, filter: false },
          { headerName: 'Package Name', field: 'pckge_nm', cellClass: 'pm-grid-number-cell', alignment: 'left', width: 250, sortable: true, filter: true },
          { headerName: 'Amount', field: 'tot_amt', cellClass: 'pm-grid-number-cell', width: 200, alignment: 'right', sortable: true, filter: true },
          // { headerName: 'GST', field: 'gst_at', cellClass: 'pm-grid-number-cell', width: 50, sortable: true, filter: true },
          // { headerName: 'Total', field: 'ttl_cst', cellClass: 'pm-grid-number-cell', width: 50, sortable: true, filter: true },
          { headerName: 'Total Channels', field: 'chnls_cnt', cellClass: 'pm-grid-number-cell', width: 100, alignment: 'center', sortable: true, filter: true }
        ];
      }
      else {
        this.addOnStandardPckgsLst = [];
      }
    }, (err) => {
      this.addOnStandardPckgsLst = [];
    });
  }
  addOnPckgsSlctd(data)
  {
    this.slctdAllPckgs = data.selectedRowsData;
    if (this.slctdAllPckgs.length == 0) {
      this.shwSveBtn = false;
    } else {
      this.shwSveBtn = true;
    }
  }
  getChanneslList = (chl) => {
    this.ChanlArry = [];
    chl.component.collapseAll(-1);
    // console.log(chl.key.srvcpk_id);
    this.crdsrv.get(`addons/getChannels/${chl.key.srvcpk_id}`).subscribe((res) => {
      // console.log(res['status']);
      if (res['status'] == 200) {
        if (res['data'].length > 0) {
          // console.log(res['data']);
          this.ChanlArry = res['data'];
          chl['chnls_lst'] = res['data'];
          chl.chnls_cnt = chl['chnls_lst'].length;
          let sindx = 0;
          let ct = 0;
          for (let k = 0; k < chl.chnls_cnt.length; k++) {
            sindx = sindx + 1;
            chl['chnls_lst'][k].indx = sindx;
            // console.log(chl);
            this.channels.chnle_id = chl.chnls_lst[k].chnle_id;
            this.channels.chnle_nm = chl.chnls_lst[k].chnle_nm;
            this.channels.srvcpk_id = chl.chnls_lst[k].srvcpk_id;
            this.channels.indx = chl.chnls_lst[k].indx;
          }
          // console.log(this.channels);
          // this.ChanlArry.push(this.channels);
          // console.log(this.ChanlArry);
          this.ChanlArry.filter(c => {
            c['s_no'] = ++ct;
          });
          this.view = true;
        }
      }
    });
  }

  saveAddonPckgs(): any {
    let extrnl_api_srvc_pack_lst = [];
    // console.log(this.slctdAllPckgs);
    this.slctdAllPckgs.filter((k) => {
      extrnl_api_srvc_pack_lst.push({
        'servicepack': k.pckge_nm,
        'expirydate': k.extrnl_api_expry_dt
      });
    });
    // console.log(this.cafDtlsData);
    // console.log(this.cstmrData);
    const extrnl_api_post_json = {
      'subscribercode': this.cafDtls[0].mdlwe_sbscr_id,
      'servicepacks': extrnl_api_srvc_pack_lst
    };
    const fnlPckgeData = {
      agntId: this.usrDtls.mrcht_usr_id,
      caf_id: this.cafDtls[0].caf_nu,
      pckg_lst: this.slctdAllPckgs,
      extrnl_api_post_json: extrnl_api_post_json
    };
    console.log(fnlPckgeData);
    this.crdsrv.create(fnlPckgeData, 'addons/addCafPckgs').subscribe((res) => {
      if (res['status'] == 200) {
        this._snackBar.open('Successfully Addons added', '', {
          duration: 2000,
          panelClass: ['blue-snackbar'],
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
      }
      else{
        this._snackBar.open('Something Went Wrong ', '', {
          duration: 2000,
          panelClass: ['red-snackbar'],
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
      }
    })
  }
  getHsiPckgesData(): any { 
    this.crdsrv.create(this.srch_cntrl, 'addons/packages/addons/hsi').subscribe((res) => {
      console.log(res['data']);
      this.hsiPckgsData = res['data'];
    });
    this.crdsrv.get('package/hsi/monthly/details/caf/' + this.cafDtls[0].caf_id).subscribe((res) => {
      console.log(res['data']);
      this.cafHsiMnthPckgsData = res['data'];
    });
  }
 
  saveAddonHsiPckgs(): any{
    this.fnlChckdData = [];
    // console.log(this.hsiPckgsData);

    for (let h = 0; h < this.hsiPckgsData.length; h++){
      if (this.hsiPckgsData[h].checked && this.hsiPckgsData[h].checked == true){
        this.fnlChckdData.push(this.hsiPckgsData[h]);
      }
    }
    if (this.fnlChckdData.length == 0){
      this._snackBar.open('Please select alteast one package', '', {
        duration: 2500,
        panelClass: ['red-snackbar'],
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      });
    }
    // console.log(this.fnlChckdData[0]);
    // console.log(this.cafDtlsData[0]);
    // console.log(this.usrDtls);

    let extrnl_api_srvc_pack_lst = [];

    this.fnlChckdData.filter((k) => {
      extrnl_api_srvc_pack_lst.push({
        'servicepack': k.srvcpk_nm,
        'expirydate': k.extrnl_api_expry_dt
      });
    });

    const extrnl_api_post_json = {
      'subscribercode': this.cafDtls[0].mdlwe_sbscr_id,
      'servicepacks': extrnl_api_srvc_pack_lst
    };

    // console.log(this.fnlChckdData);

    let fnl_nw_hsi_pckge;

    let fnl_ttl_data_usge = (this.cafHsiMnthPckgsData[0].ttl_upld_ct/1024/1024/1024) + (this.cafHsiMnthPckgsData[0].ttl_dwnld_ct/1024/1024/1024);
    console.log(fnl_ttl_data_usge);
    if (fnl_ttl_data_usge < this.cafHsiMnthPckgsData[0].mnth_usge_lmt_ct){
      fnl_nw_hsi_pckge = Number(this.cafHsiMnthPckgsData[0].mnth_usge_lmt_ct - fnl_ttl_data_usge) + Number(this.fnlChckdData[0].vle_tx);
    }else if (fnl_ttl_data_usge > this.cafHsiMnthPckgsData[0].mnth_usge_lmt_ct){
      fnl_nw_hsi_pckge = Number(fnl_ttl_data_usge) + Number(this.fnlChckdData[0].vle_tx);
    }

    const fnlHsiPckgeData = {
      agntId: this.usrDtls.mrcht_usr_id,
      caf_id: this.cafDtls[0].caf_id,
      pckg_lst: this.fnlChckdData,
      caf_type_id: this.cafDtls[0].caf_type_id,
      aaa_cd: this.cafDtls[0].aaa_cd,
      crnt_pln_id: this.cafDtls[0].pckge_id,
      extrnl_api_post_json: extrnl_api_post_json,
      crnt_cstmr_pckg: this.pkgeData[0].srvcpk_nm.split(',')[1],
      add_on_hsi_pckg: this.fnlChckdData[0].vle_tx,
      prsnt_hsi_pckge: this.cafHsiMnthPckgsData[0].mnth_usge_lmt_ct,
      aaa_prfl_nm: this.cafDtls[0].hsi_orgnl_prfle_tx,
      nw_hsi_pckge: fnl_nw_hsi_pckge.toFixed(0)
      // nw_hsi_pckge: Number(this.cafHsiMnthPckgsData[0].mnth_usge_lmt_ct) + Number(this.fnlChckdData[0].vle_tx) (old changed as top line)
    };
    // console.log(fnlHsiPckgeData);
// return;
    this.crdsrv.create(fnlHsiPckgeData, 'caf_operations/hsiAddOn').subscribe((res) => {
      if (res['status'] == 200) {
        this._snackBar.open('Successfully HSI Addons added', '', {
          duration: 2000,
          panelClass: ['blue-snackbar'],
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
      }
      else{
        this._snackBar.open('Something Went Wrong ', '', {
          duration: 2000,
          panelClass: ['red-snackbar'],
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
      }
    });
  }
}
