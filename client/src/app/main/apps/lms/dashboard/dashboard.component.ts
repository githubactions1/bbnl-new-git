import { Component, OnInit, ViewChild, Input, AfterViewInit, NgZone } from '@angular/core';

import { animate, state, style, transition, trigger } from '@angular/animations';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import { MatPaginator, MatTableDataSource, MatDialog } from '@angular/material';
import { JSONP_HOME } from '@angular/http/src/backends/browser_jsonp';
import { CrudService } from '../../crud.service';
// import { FltrHeaderSrvc } from 'app/providers/filterheader/fltrheader.service';
import { UserService } from 'app/providers/user/user.serivce';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { TutorialEdtComponent } from '../tutorial/tutorial-edt/tutorial-edt.component';
import { FormGroup } from '@angular/forms';

export interface Element {
  s_no: any;
  dst_nm: string;
  ulb_nm: string;
  trn_attnd_ttl: number;
  trn_unattnd_ttl: number;
  ttl_ulb: number;
  ttl_trn_lctn: number;
  dst_full_nm: string
  sch_nm: string
  trn_yt_ated: Number
  schdld: Number
  nt_schdue: Number
}
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})

export class DashboardComponent implements OnInit, AfterViewInit {
  @Input() elmtDta: any;
  dataSource: MatTableDataSource<[any]>; stwsecrdata2: any;
  trngData: any;
  counter = 0
  headerfiledttl = true
  test = "test"
  bcKbtnTy = 'state'
  grphType = 'distrct'
  chartData = [];
  spnrIn;
  columns = []
  pagination: boolean = true;
  dsbrdCrdCntsType;
  stwsecrdata: any
  filterBy;
  grphBarDfltKeys = [{
    key: 'sch_ttl_attnd',
    label: 'Total Attended'
  }, {
    key: 'sch_ttl_nt_attnd',
    label: 'Not-Attended'
  },
  {
    key: 'trn_yt_ated',
    label: 'Yet To Attended'
  }];
  //displayedColumns = ['dst_nm', 'trn_attnd_ttl', 'trn_unattnd_ttl', 'ttl_ulb', 'ttl_trn_lctn', 'action'];

  grphBarDfltCnts = 3;

  grphDfltAxisLables = {
    xAxesLbl: 'Districts',
    yAxesLbl: 'Attented Vs Not-Attented'
  }
  brdCumFltrTitle = [{
    title: 'AP',
    type: 'state',
    id: 1
  }];
  breakpoint: number;
  dtSorc_data: any
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild('chartdiv') loadaftr
  varHdr: string;
  currentTrng: any;
  ulbTrnData: any;
  displayedColumns: string[];

  UsrDtls = {
    hyrchy_id: 0,
    dstrt_nm: '',
    dstrt_id: 0,
    hyrchy_grp_nm: '',
    hyrchy_grp_id: 0,
    urbn_in: 0
  };
  rowData = [];


  columnDefs = [];
  isExcelDwnLd: boolean = false;
  excelDataHeaders;
  excelFileNm;
  crdls: boolean = true;
  tablData = {
    tablName: '',
    clmnData: [],
    rowData: [],
    dwnLadExcl: {
      hdrData: [],
      fileName: '',
      excelData: []
    }
  }
  paginationPageSize = 10
  trnbtnEnb = 'functionary'
  dyWsRprt: any;
  getRowHeight;
  brcdtfrgrbKbtN: any;
  btngdywise: boolean = true;
  routerbk: number;
  currentTab: any;
  dialogRef: any;
  ttlcount: any;
  dprtMntLst: any;
  dprtMntLstBndng: any;
  upld: boolean = false
  chart: am4charts.XYChart;
  totPrcntData: any
  trngLst: any;
  toggleBtns = [];
  ttl_schduled = {
    ttl_mbrs_ct: 0,
    yet_attend: 0,
    tl_atend: 0,
    tl_ntatd: 0,
    tl_cmptd: 0,
    tl_ntcmp: 0,
    tl_shduld: 0,
    tl_ntshduld: 0
  }
  fltrData: any = [];
  yetatdLst: any;
  dshBrdUrbn_in: any;
  twnFltrTitle: string;
  tab_ctrl: any;
  trng_id: any;
  Urbn_in: any;
  ulbtrnId: any;
  mndltrnId: any;
  mdldstid: any;
  SvmtrnData: any;
  TblExlTyp: string;
  Ttl_mbrs_Viwd: boolean = false;
  public sub: Observable<string>;
  public TabEnble: string;
  value = 20;
  spinner: boolean = true

  constructor(private apiSrvc: CrudService, private usrService: UserService, private route: Router, public actrouter: ActivatedRoute, private _matDialog: MatDialog) {
    this.ttlcount = {

    }
    this.UsrDtls = this.usrService.getUsrDta();
    this.dshBrdUrbn_in = (this.UsrDtls.urbn_in === undefined || this.UsrDtls.urbn_in == null) ? 3 : this.UsrDtls.urbn_in;

    if (this.dshBrdUrbn_in == 1) {
      this.twnFltrTitle = 'URBAN';
      // this.cardHeading = 'Ward Sachivalayams';
    } else if (this.dshBrdUrbn_in == 0) {
      this.twnFltrTitle = 'RURAL';

      // this.cardHeading = 'Grama Sachivalayams';
    } else {
      this.twnFltrTitle = 'ALL';
      // this.cardHeading = 'Grama/Ward Sachivalayams';
    }
   // this.fltrHdrSrvc.setSubTitle(this.twnFltrTitle);
    if (this.UsrDtls.hyrchy_id == 3) {

      this.brdCumFltrTitle.push(
        {
          title: this.UsrDtls.dstrt_nm,
          type: 'distrct',
          id: this.UsrDtls.dstrt_id
        },
        {
          title: this.UsrDtls.hyrchy_grp_nm,
          type: 'mndal',
          id: this.UsrDtls.hyrchy_grp_id
        }
      );
      this.grphType = 'mndal';
    } else if (this.UsrDtls.hyrchy_id == 2) {
      this.brdCumFltrTitle.push({
        title: this.UsrDtls.hyrchy_grp_nm,
        type: 'distrct',
        id: this.UsrDtls.hyrchy_grp_id
      });
      this.grphType = 'ULB';

    } else {
      this.brdCumFltrTitle = [{
        title: 'AP',
        type: 'state',
        id: 1
      }];
      //   this.grphType = 'state';

    }
    let rowHeight = 45;
    this.getRowHeight = function (params) {
      return rowHeight;
    };

  }



  ngOnInit() {


    this.sub = this.actrouter.paramMap
      .map(() => window.history.state);

    this.sub.subscribe((val) => this.TabEnble = val);

    if (typeof this.TabEnble['data'] != 'undefined') {
      this.currentTab = this.TabEnble['data']['a'];
      //this.selectedIndex(1)
    }

    this.selectedIndex(0)



  }




  ngAfterViewInit() {

    console.log(this.loadaftr)
  }

  selectedIndex(event) {
    this.spinner = false
    console.log(event)
    this.Ttl_mbrs_Viwd = false
    this.apiSrvc.get('/web/common/trninglst/' + event).subscribe((res) => {
      console.log(res)
      this.trngLst = res['data']
      console.log(this.trngLst)
      this.toggleBtns = []
      for (var i = 0; i <= 1; i++) {
        this.trngLst[i]['isActive'] = false
        this.toggleBtns.push(this.trngLst[i])
      }
      this.getTrainingData(this.trngLst[0].trng_id, this.dshBrdUrbn_in)

      if (event == 1) {
        this.Ttl_mbrs_Viwd = true
        console.log(this.Ttl_mbrs_Viwd)

        this.getTrainingData(this.trngLst[0].trng_id, this.dshBrdUrbn_in)
      }

    });




    this.tab_ctrl = (data) => {
      console.log(data)
      if (data == 'URBAN') {
        this.dshBrdUrbn_in = 1;
        this.getTrainingData(this.trng_id, this.dshBrdUrbn_in)

      } else if (data == 'RURAL') {
        this.dshBrdUrbn_in = 0;
        this.getTrainingData(this.trng_id, this.dshBrdUrbn_in)

      } else if (data == 'ALL') {
        this.dshBrdUrbn_in = 2;
        this.getTrainingData(this.trng_id, this.dshBrdUrbn_in)
      }
    };
    // this.fltrHdrSrvc.setTabCtrl(this.tab_ctrl);
    // this.fltrHdrSrvc.setTabCtrl(this.tab_ctrl);
    // this.fltrHdrSrvc.setBrdCumCtrl((slctd_brd_cm, data, twn_fltr) => {
    //   this.brdCumCtrl(slctd_brd_cm)
    // });

  }

  getTrainingData(trn_id, dshBrdUrbn_in) {
    this.counter = 0

    console.log(trn_id, dshBrdUrbn_in)
    this.Urbn_in = dshBrdUrbn_in
    console.log(this.Urbn_in)
    this.trng_id = trn_id

    console.log(trn_id)
    this.bcKbtnTy = 'state'
    this.trnbtnEnb = 'functionary'
    console.log("hi")

    for (var i = 0; i < this.toggleBtns.length; i++) {
      if (this.trngLst[i].trng_id == this.trng_id) {
        this.trngLst[i]['isActive'] = true
      } else {
        this.trngLst[i]['isActive'] = false
      }

    }

    if (this.UsrDtls.hyrchy_id == 1) {

      this.breakpoint = (window.innerWidth <= 400) ? 1 : (window.innerWidth <= 600 && window.innerWidth >= 400) ? 2 :
        (window.innerWidth <= 800 && window.innerWidth >= 600) ? 3 : 2;
      this.brdCumFltrTitle = [{
        title: 'AP',
        type: 'state',
        id: trn_id
      }];

      //this.fltrHdrSrvc.setMainTitle(this.brdCumFltrTitle)


      // this.fltrHdrSrvc.setMainTitle(this.brdCumFltrTitle);
      //  this.apiSrvc.get('/web/common/yetToatd').subscribe((res) => {
      //   console.log(res)
      // this.yetatdLst=res['data']
      // console.log(this.yetatdLst)



      // });

      this.apiSrvc.get('/web/common/trninglst/' + trn_id + '/' + this.Urbn_in).subscribe((res) => {

        console.log(res);
        this.spinner = true
        this.trngData = res['data']

        //this.varHdr = "District Wise " + this.trngData[0].trng_nm + " Details"

        let grphLables = {
          xAxesLbl: 'ULBS',
          yAxesLbl: 'Attended Vs Un-Attended'
        }


        var tl_cmpltd = 0
        var tl_ntcmpltd = 0
        var tl_atend = 0
        var tl_ntatd = 0
        var tl_asgnd = 0
        var ttl_scdlusr = 0
        var yet_ated = 0
        var tl_shduld = 0
        var tl_ntshduld = 0

        for (var i = 0; i < this.trngData.length; i++) {

          this.trngData[i]['ttl_nt_schd'] = this.trngData[i].tl_asignd - (this.trngData[i].sch_ttl_attnd + this.trngData[i].ttl_sch_assgnd)
          this.trngData[i]['trn_yt_ated'] = this.trngData[i].ttl_sch_assgnd + this.trngData[i].ttl_nt_schd
          if (this.trngData[i].sch_ttl_attnd == null && this.trngData[i].ttl_sch_assgnd == null && this.trngData[i].sch_ttl_nt_attnd == null) {
            this.trngData[i].sch_ttl_attnd = 0
            this.trngData[i].ttl_sch_assgnd = 0
            this.trngData[i].sch_ttl_nt_attnd = 0

          }
          ttl_scdlusr = ttl_scdlusr + this.trngData[i].tl_asignd

          tl_cmpltd = tl_cmpltd + this.trngData[i].trn_cmptld
          tl_ntcmpltd = tl_ntcmpltd + this.trngData[i].trn_ntcmptld
          tl_atend = tl_atend + this.trngData[i].sch_ttl_attnd
          tl_ntatd = tl_ntatd + this.trngData[i].sch_ttl_nt_attnd
          tl_shduld = tl_shduld + this.trngData[i].ttl_sch_assgnd


          if (this.trngData[i].trng_id == trn_id) {
            this.varHdr = "District Wise " + this.trngData[i].trng_nm + " Details"
            this.currentTrng = this.trngData[i].trng_nm
            // this.fltrData.push(this.trngData[i])
          } else {
            this.varHdr = "District Wise " + this.trngLst[0].trng_nm + " Details"
          }
        }
        console.log(this.trngData);

        tl_ntshduld = ttl_scdlusr - (tl_shduld + tl_atend)

        yet_ated = tl_shduld + tl_ntshduld

        this.ttl_schduled = {
          ttl_mbrs_ct: ttl_scdlusr,
          yet_attend: yet_ated,
          tl_atend: tl_atend,
          tl_ntatd: tl_ntatd,
          tl_cmptd: tl_cmpltd,
          tl_ntcmp: tl_ntcmpltd,
          tl_shduld: tl_shduld,
          tl_ntshduld: tl_ntshduld
        }

        console.log(this.ttl_schduled)
        console.log(this.fltrData)

        console.log(this.ttl_schduled)
        // if (this.fltrData[0].trng_id == trn_id) {
        //   this.trnbtnEnb = 'functionary'
        //   this.grphType = 'distrct'

        //   this.varHdr = "District Wise " + this.fltrData[0].trng_nm + " Details"

        // } else if (this.fltrData[0].trng_id == trn_id) {
        //   this.trnbtnEnb = 'Introductory'
        //   this.varHdr = "District Wise " + this.fltrData[0].trng_nm + " Details"
        //   this.grphType = 'distrct'

        // }


        this.dtSorc_data = this.trngData
        this.TblExlTyp = 'distrct'
        for (var i = 0; i < this.dtSorc_data.length; i++) {
          this.dtSorc_data[i]['s_no'] = ++this.counter
        }

        console.log(this.dtSorc_data)

        this.rowData = this.dtSorc_data
        if (this.Ttl_mbrs_Viwd == false) {
          this.columnDefs = [
            { headerName: 'sno', field: 's_no', sortable: true, cellStyle: { textAlign: 'center' }, filter: true, width: 80 },
            { headerName: 'District Name', field: 'dstrt_nm', sortable: true, cellStyle: { textAlign: 'left' }, filter: true, width: 320 },
            { headerName: 'Attended', field: 'sch_ttl_attnd', sortable: true, cellStyle: { textAlign: 'center' }, filter: true, width: 320 },
            { headerName: 'Yet To Attend', field: 'trn_yt_ated', sortable: true, cellStyle: { textAlign: 'center' }, filter: true, width: 320 },
            { headerName: 'scheduled', field: 'ttl_sch_assgnd', sortable: true, cellStyle: { textAlign: 'center' }, filter: true, width: 320 },
            { headerName: 'Not-scheduled', field: 'ttl_nt_schd', sortable: true, cellStyle: { textAlign: 'center' }, filter: true, width: 320 },
            { headerName: 'Not-Attended', field: 'sch_ttl_nt_attnd', sortable: true, cellStyle: { textAlign: 'center' }, filter: true, width: 320 },
          ];
        } else if (this.Ttl_mbrs_Viwd == true) {
          this.columnDefs = [
            { headerName: 'sno', field: 's_no', sortable: true, cellStyle: { textAlign: 'center' }, filter: true, width: 80 },
            { headerName: 'District Name', field: 'dstrt_nm', sortable: true, cellStyle: { textAlign: 'left' }, filter: true, width: 320 },
            { headerName: 'viewed', field: 'sch_ttl_attnd', sortable: true, cellStyle: { textAlign: 'center' }, filter: true, width: 320 },
            { headerName: 'Yet To view', field: 'trn_yt_ated', sortable: true, cellStyle: { textAlign: 'center' }, filter: true, width: 320 },
            { headerName: 'scheduled', field: 'ttl_sch_assgnd', sortable: true, cellStyle: { textAlign: 'center' }, filter: true, width: 320 },
            { headerName: 'Not-scheduled', field: 'ttl_nt_schd', sortable: true, cellStyle: { textAlign: 'center' }, filter: true, width: 320 },
            { headerName: 'Not-viewed', field: 'sch_ttl_nt_attnd', sortable: true, cellStyle: { textAlign: 'center' }, filter: true, width: 320 },
          ];
        }

        console.log(this.currentTrng)
        console.log(this.ttl_schduled)

        const totlmebatdrsprcnt = ((this.ttl_schduled.tl_cmptd / this.ttl_schduled.ttl_mbrs_ct) * 100);
        const totlmebntatdrsprcnt = ((this.ttl_schduled.tl_ntcmp / this.ttl_schduled.ttl_mbrs_ct) * 100);
        //   const totlmebnyedrsprcnt =((this.ttl_schduled.yet_attend / this.ttl_schduled.tl_shduld) * 100);
        //   const totlmebschprcnt = ((this.ttl_schduled.tl_shduld / this.ttl_schduled.tl_shduld) * 100);
        //  const totlmebntschprcnt = ((this.ttl_schduled.tl_ntshduld / this.ttl_schduled.tl_shduld) * 100);
        //  const totlmebatdrsprcnt = ((this.ttlcount.trn_attnd_ttl / this.ttlcount.toal_members) * 100);
        //  const totlmebntatdrsprcnt = ((this.ttlcount.trn_unattnd_ttl / this.ttlcount.toal_members) * 100);
        //  const totlmebnyedrsprcnt = ((this.ttlcount.trn_yt_ated / this.ttlcount.toal_members) * 100);
        //  const totlmebschprcnt = ((this.ttlcount.schdld / this.ttlcount.toal_members) * 100);
        //  const totlmebntschprcnt = ((this.ttlcount.nt_schdue / this.ttlcount.toal_members) * 100);


        this.totPrcntData = [{

          totmebatdprct: totlmebatdrsprcnt.toFixed(0),
          totmebntatdprct: totlmebntatdrsprcnt.toFixed(0),
          // totmebytatprct: totlmebnyedrsprcnt.toFixed(0),
          // totmebschprct: totlmebschprcnt.toFixed(0),
          // totmebntschprct: totlmebntschprcnt.toFixed(0),
          totMbrs: 'Completed Mbrs'
        }];



        this.totPrcntBarGraph(this.totPrcntData)
        this.chart = am4core.create("chartdiv", am4charts.XYChart);

        if (this.Ttl_mbrs_Viwd == false) {
          this.loadGraph(this.trngData, this.grphBarDfltCnts, this.grphBarDfltKeys, this.grphDfltAxisLables, "dstrt_cd");
        } else if (this.Ttl_mbrs_Viwd == true) {

          var grphBarDfltKeys = [{
            key: 'sch_ttl_attnd',
            label: 'Total viewed'
          }, {
            key: 'sch_ttl_nt_attnd',
            label: 'Not-viewed'
          },
          {
            key: 'trn_yt_ated',
            label: 'Yet To view'
          }];
          var grphDfltAxisLables = {
            xAxesLbl: 'ULBS',
            yAxesLbl: 'viewed Vs Not-viewed'
          }

          this.loadGraph(this.trngData, this.grphBarDfltCnts, grphBarDfltKeys, grphDfltAxisLables, "dstrt_cd");

        }


        console.log(this.dtSorc_data)
        // this.dataSource = new MatTableDataSource(this.dtSorc_data)
        // this.dataSource.paginator = this.paginator

      }, (err) => {

      })


    }
    else if (this.UsrDtls.hyrchy_id == 2) {
      // this.fltrHdrSrvc.setMainTitle(this.brdCumFltrTitle);
      // this.varHdr = "ULB Wise " + this.UsrDtls.dstrt_nm + " Details"
      // this.apiSrvc.get('/web/common/ulbnglst').subscribe((res) => {
      //   console.log("********************")
      //   console.log(res);
      //   this.ulbTrnData = res['data']
      //   this.dtSorc_data = this.ulbTrnData
      //   console.log(this.dtSorc_data)

      //   this.dtSorc_data.filter(k => {
      //     k['s_no'] = ++this.counter
      //   })
      //   console.log(this.dtSorc_data)
      //   this.apiSrvc.get('/web/common/trninglst').subscribe((res) => {
      //     // console.log("********************")
      //     console.log(res);
      //     this.trngData = res['data']
      //     this.currentTrng = this.trngData[0]
      //     this.dtSorc_data = this.trngData[0].dist_wse_dtls
      //   }, (err) => {

      //   })

      //   let grphLables = {
      //     xAxesLbl: 'ULBS',
      //     yAxesLbl: 'Attended Vs Un-Attended'
      //   }
      //   this.columnDefs = [
      //     { headerName: 'sno', field: 's_no', sortable: true, cellStyle: { textAlign: 'center' }, filter: true, width: 80 },
      //     { headerName: 'ULB Name ', field: 'ulb_nm', sortable: true, cellStyle: { textAlign: 'left' }, filter: true, width: 250 },
      //     { headerName: 'Attended', field: 'trn_attnd_ttl', sortable: true, cellStyle: { textAlign: 'center' }, filter: true, width: 250 },
      //     { headerName: 'Yet To Attend', field: 'trn_yt_ated', sortable: true, cellStyle: { textAlign: 'center' }, filter: true, width: 250 },
      //     { headerName: 'scheduled', field: 'schdld', sortable: true, cellStyle: { textAlign: 'center' }, filter: true, width: 250 },
      //     { headerName: 'Un-scheduled', field: 'nt_schdue', sortable: true, cellStyle: { textAlign: 'center' }, filter: true, width: 250 },
      //     { headerName: 'Un-Attended', field: 'trn_unattnd_ttl', sortable: true, cellStyle: { textAlign: 'center' }, filter: true, width: 250 },
      //   ];

      //     this.loadGraph(this.ulbTrnData, this.grphBarDfltCnts, this.grphBarDfltKeys, grphLables, "ulb_nm");

      //   console.log(this.dtSorc_data)
      //   this.rowData = this.dtSorc_data

      // }, (err) => {

      // })
    }
    // this.getUlbData()
  }


  totPrcntBarGraph(currentTrng) {

    // Create chart instance
    let totPrcntChart = am4core.create("totPrcntChartDiv", am4charts.XYChart);

    // Add data
    totPrcntChart.data = currentTrng;

    totPrcntChart.legend = new am4charts.Legend();
    totPrcntChart.legend.position = "bottom";
    totPrcntChart.legend.fontSize = "12";

    // Create axes
    let categoryAxis = totPrcntChart.yAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = "totMbrs";
    categoryAxis.renderer.grid.template.opacity = 0;

    let valueAxis = totPrcntChart.xAxes.push(new am4charts.ValueAxis());
    valueAxis.min = 0;
    valueAxis.renderer.grid.template.opacity = 0;
    valueAxis.renderer.ticks.template.strokeOpacity = 0.5;
    valueAxis.renderer.ticks.template.stroke = am4core.color("#495C43");
    valueAxis.renderer.ticks.template.length = 10;
    valueAxis.renderer.line.strokeOpacity = 0.5;
    valueAxis.renderer.baseGrid.disabled = true;
    valueAxis.renderer.minGridDistance = 40;

    // Create series
    function createSeries(field, name) {
      var series = totPrcntChart.series.push(new am4charts.ColumnSeries());
      series.dataFields.valueX = field;
      series.dataFields.categoryY = "totMbrs";
      series.stacked = true;
      series.name = name;
      series.columns.template.tooltipText = "[bold]{name}[/][font-size:14px]{categoryX}: {valueX}";
      series.columns.template.cursorOverStyle = am4core.MouseCursorStyle.pointer;

      var labelBullet = series.bullets.push(new am4charts.LabelBullet());
      labelBullet.locationX = 0.5;
      labelBullet.label.text = "{valueX}%";
      labelBullet.label.fill = am4core.color("#fff");
    }

    createSeries("totmebatdprct", "Total Training completed %");
    createSeries("totmebntatdprct", "Total Taraining Not completed %");
    // createSeries("totmebytatprct", "Total Yet To Attende%");
    // createSeries("totmebschprct", "Total scheduled%");
    // createSeries("totmebntschprct", "Total Not scheduled%");
  }

  downloadExcel($event) {

    let TrngData = [];
    if (this.TblExlTyp == 'distrct') {
      this.excelDataHeaders = [
        'sno', 'District Name', 'Total', 'Attended', 'Yet To Attend', 'scheduled', 'Not-scheduled', 'Not-Attended'];

      for (let i = 0; i < this.dtSorc_data.length; i++) {
        TrngData.push({
          's_no': this.dtSorc_data[i].s_no,
          'dst_nm': this.dtSorc_data[i].dstrt_nm,
          'trn_attnd_ttl': this.dtSorc_data[i].sch_ttl_attnd,
          'trn_yt_ated': this.dtSorc_data[i].trn_yt_ated,
          'schdld': this.dtSorc_data[i].ttl_sch_assgnd,
          'nt_schdue': this.dtSorc_data[i].ttl_nt_schd,
          'trn_unattnd_ttl': this.dtSorc_data[i].sch_ttl_nt_attnd

        })
      }
    } else if (this.TblExlTyp == 'Mandal') {
      this.excelDataHeaders = [
        'sno', 'Mandal/ULb Name', 'Total', 'Attended', 'Yet To Attend', 'scheduled', 'Not-scheduled', 'Not-Attended'];

      for (let i = 0; i < this.dtSorc_data.length; i++) {
        TrngData.push({
          's_no': this.dtSorc_data[i].s_no,
          'ulb_nm': this.dtSorc_data[i].mndl_nm,
          'trn_attnd_ttl': this.dtSorc_data[i].sch_ttl_attnd,
          'trn_yt_ated': this.dtSorc_data[i].trn_yt_ated,
          'schdld': this.dtSorc_data[i].ttl_sch_assgnd,
          'nt_schdue': this.dtSorc_data[i].ttl_nt_schd,
          'trn_unattnd_ttl': this.dtSorc_data[i].sch_ttl_nt_attnd

        })
      }
    } else if (this.TblExlTyp == 'Sacvlym') {
      this.excelDataHeaders = [
        'sno', 'Sachivalyam Name', 'Total', 'Attended', 'Yet To Attend', 'scheduled', 'Not-scheduled', 'Not-Attended'];

      for (let i = 0; i < this.dtSorc_data.length; i++) {
        TrngData.push({
          's_no': this.dtSorc_data[i].s_no,
          'svm_nm': this.dtSorc_data[i].svm_nm,
          'trn_attnd_ttl': this.dtSorc_data[i].sch_ttl_attnd,
          'trn_yt_ated': this.dtSorc_data[i].trn_yt_ated,
          'schdld': this.dtSorc_data[i].ttl_sch_assgnd,
          'nt_schdue': this.dtSorc_data[i].ttl_nt_schd,
          'trn_unattnd_ttl': this.dtSorc_data[i].sch_ttl_nt_attnd

        })
      }
    }


    this.tablData = {
      tablName: 'SACHIVALAYAM',
      clmnData: this.columnDefs,
      rowData: this.dtSorc_data,
      dwnLadExcl: {
        hdrData: this.excelDataHeaders,
        fileName: 'Trnlst',
        excelData: TrngData
      }
    }


    if (this.dtSorc_data.length > 0) {
      this.isExcelDwnLd = $event;
      this.excelDataHeaders = this.tablData.dwnLadExcl.hdrData;
      this.excelFileNm = this.tablData.dwnLadExcl.fileName;;
    }


  }


  loadGraph = (chart_data, grphBarCnt, GrphKys, GrphAxisLabls, category) => {

    console.log(chart_data);
    this.chart = am4core.create("chartdiv", am4charts.XYChart);
    this.chart.data = chart_data;
    let categoryAxis = this.chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = category;
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.renderer.minGridDistance = 5;
    categoryAxis.renderer.labels.template.rotation = -90;
    categoryAxis.renderer.labels.template.verticalCenter = "middle";
    categoryAxis.renderer.labels.template.horizontalCenter = "left";
    categoryAxis.renderer.grid.template.disabled = true;
    let xAxesLbl = ' '
    if (this.grphType == 'distrct') {
      xAxesLbl = ' Districts '
    }
    else if (this.grphType == 'ULB') {
      xAxesLbl = ' Mandals/ULB '
    }
    else if (this.grphType == 'schvlym') {
      xAxesLbl = ' Sachivalayam '

    }


    categoryAxis.title.text = xAxesLbl;

    let valueAxis = this.chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.title.text = GrphAxisLabls.yAxesLbl;
    valueAxis.renderer.inside = true;
    valueAxis.renderer.labels.template.disabled = true;
    valueAxis.min = 0;
    // categoryAxis.title.text = 'Reported Vs NotReported'
    for (let index = 0; index < grphBarCnt; index++) {
      this.createSeries(GrphKys[index].key, GrphKys[index].label, category);
    }
    this.chart.legend = new am4charts.Legend();
    this.chart.exporting.menu = new am4core.ExportMenu();

    this.chart.exporting.menu.items = [{
      "label": "...",
      "menu": [
        { "type": "png", "label": "PNG" },
        { "label": "Print", "type": "print" }
      ]
    }];



  }
  row: any
  createSeries(field, name, category) {
    // Set up series
    let series = this.chart.series.push(new am4charts.ColumnSeries());
    series.name = name;
    series.dataFields.valueY = field;
    series.dataFields.categoryX = category;
    series.sequencedInterpolation = true;

    // Make it stacked
    series.stacked = true;

    // Configure columns
    series.columns.template.width = am4core.percent(60);
    series.columns.template.tooltipText = "[bold]{name}[/]\n[font-size:14px]{categoryX}: {valueY}";
    series.columns.template.cursorOverStyle = am4core.MouseCursorStyle.pointer;


    series.columns.template.events.on("hit",
      function (ev) {
        console.log("clicked on ", ev.target);
        console.log(this.grphType)
        this.row = {
          data: ev.target.dataItem.dataContext,
          colDef: {
            field: "dstrt_nm",
            filter: true,
            headerName: "District Name",
            sortable: true,
            width: 250,
          }
        }
        if (ev.target.dataItem.dataContext['dywis'] == 'dywise') {
          alert('click back button')
        }

        else if (this.grphType == "distrct") {
          this.getUlbData(this.row)
        } else if (this.grphType == "ULB") {
          this.row = {
            data: ev.target.dataItem.dataContext,
            colDef: {
              field: "mndl_nm",
              filter: true,
              headerName: "Mandal Name",
              sortable: true,
              width: 250,
            }

          }
          this.getschdata(this.row)
        } else if (this.grphType = 'sach') {
          console.log('nomoredata')
        }

      },
      this);

    let labelBullet = series.bullets.push(new am4charts.LabelBullet());
    labelBullet.label.text = "{valueY}";
    labelBullet.locationY = 0.5;
    return series;
  }

  getUlbData(row) {
    console.log(row)

    if (row.colDef.headerName == 'District Name') {


      if (this.bcKbtnTy == 'distrct') {

      } else if (this.bcKbtnTy == 'ULB') {

      } else if (this.grphType == 'distrct') {
        this.brdCumFltrTitle.push({
          title: row.data.dstrt_nm,
          type: 'ulb',
          id: row.data.dstrt_id
        })
      }


      this.brcdtfrgrbKbtN = row
      this.bcKbtnTy = 'distrct'
      this.counter = 0
      if (row.colDef.frmBtdcrm == 1) {
        console.log('hi')
        this.mndltrnId
        this.mdldstid
      } else {
        this.mndltrnId = row.data.trng_id
        this.mdldstid = row.data.dstrt_id
      }

      console.log(this.mndltrnId, this.mdldstid)
      this.varHdr = "Mandal " + this.currentTrng + " Details"
      this.apiSrvc.get('/web/common/ulbnglst/' + this.mdldstid + '/' + this.mndltrnId + '/' + this.Urbn_in).subscribe((res) => {
        // console.log("********************")
        console.log(res);
        this.grphType = "ULB"
        this.ulbTrnData = res['data']
        this.dtSorc_data = this.ulbTrnData
        this.TblExlTyp = 'Mandal'
        let grphLables = {
          xAxesLbl: 'ULBS',
          yAxesLbl: 'Attended Vs Un-Attended'
        }


        var tl_cmpltd = 0
        var tl_ntcmpltd = 0
        var tl_atend = 0
        var tl_ntatd = 0
        var tl_asgnd = 0
        var ttl_scdlusr = 0
        var tl_shduld = 0
        var tl_ntshduld = 0
        var yet_ated = 0
        console.log(this.ulbTrnData);

        for (var i = 0; i < this.ulbTrnData.length; i++) {

          this.ulbTrnData[i]['ttl_nt_schd'] = this.ulbTrnData[i].tl_asignd - (this.ulbTrnData[i].sch_ttl_attnd + this.ulbTrnData[i].ttl_sch_assgnd)
          this.ulbTrnData[i]['trn_yt_ated'] = this.ulbTrnData[i].ttl_sch_assgnd + this.ulbTrnData[i].ttl_nt_schd
          ttl_scdlusr = ttl_scdlusr + this.ulbTrnData[i].tl_asignd

          tl_cmpltd = tl_cmpltd + this.ulbTrnData[i].trn_cmptld
          tl_ntcmpltd = tl_ntcmpltd + this.ulbTrnData[i].trn_ntcmptld
          tl_atend = tl_atend + this.ulbTrnData[i].sch_ttl_attnd
          tl_ntatd = tl_ntatd + this.ulbTrnData[i].sch_ttl_nt_attnd
          tl_shduld = tl_shduld + this.ulbTrnData[i].ttl_sch_assgnd
        }


        console.log(this.ulbTrnData);

        tl_ntshduld = ttl_scdlusr - (tl_shduld + tl_atend)

        yet_ated = tl_shduld + tl_ntshduld

        this.ttl_schduled = {
          ttl_mbrs_ct: ttl_scdlusr,
          yet_attend: yet_ated,
          tl_atend: tl_atend,
          tl_ntatd: tl_ntatd,
          tl_cmptd: tl_cmpltd,
          tl_ntcmp: tl_ntcmpltd,
          tl_shduld: tl_shduld,
          tl_ntshduld: tl_ntshduld
        }

        console.log(this.ttl_schduled)

        const totlmebatdrsprcnt = ((this.ttl_schduled.tl_cmptd / this.ttl_schduled.ttl_mbrs_ct) * 100);
        const totlmebntatdrsprcnt = ((this.ttl_schduled.tl_ntcmp / this.ttl_schduled.ttl_mbrs_ct) * 100);
        this.totPrcntData = [{

          totmebatdprct: totlmebatdrsprcnt.toFixed(0),
          totmebntatdprct: totlmebntatdrsprcnt.toFixed(0),
          // totmebytatprct: totlmebnyedrsprcnt.toFixed(0),
          // totmebschprct: totlmebschprcnt.toFixed(0),
          // totmebntschprct: totlmebntschprcnt.toFixed(0),
          totMbrs: 'Completed Mbrs'
        }];


        this.totPrcntBarGraph(this.totPrcntData)

        if (this.Ttl_mbrs_Viwd == false) {
          this.columnDefs = [
            { headerName: 'sno', field: 's_no', sortable: true, cellStyle: { textAlign: 'center' }, filter: true, width: 80 },
            { headerName: 'Mandal Name', field: 'mndl_nm', sortable: true, cellStyle: { textAlign: 'left' }, filter: true, width: 320 },
            { headerName: 'Attended', field: 'sch_ttl_attnd', sortable: true, cellStyle: { textAlign: 'center' }, filter: true, width: 320 },
            { headerName: 'Yet To Attend', field: 'trn_yt_ated', sortable: true, cellStyle: { textAlign: 'center' }, filter: true, width: 320 },
            { headerName: 'scheduled', field: 'ttl_sch_assgnd', sortable: true, cellStyle: { textAlign: 'center' }, filter: true, width: 320 },
            { headerName: 'Un-scheduled', field: 'ttl_nt_schd', sortable: true, cellStyle: { textAlign: 'center' }, filter: true, width: 320 },
            { headerName: 'Un-Attended', field: 'sch_ttl_nt_attnd', sortable: true, cellStyle: { textAlign: 'center' }, filter: true, width: 320 },
          ];
        } else if (this.Ttl_mbrs_Viwd == true) {
          this.columnDefs = [
            { headerName: 'sno', field: 's_no', sortable: true, cellStyle: { textAlign: 'center' }, filter: true, width: 80 },
            { headerName: 'Mandal Name', field: 'mndl_nm', sortable: true, cellStyle: { textAlign: 'left' }, filter: true, width: 320 },
            { headerName: 'viewed', field: 'sch_ttl_attnd', sortable: true, cellStyle: { textAlign: 'center' }, filter: true, width: 320 },
            { headerName: 'Yet To view', field: 'trn_yt_ated', sortable: true, cellStyle: { textAlign: 'center' }, filter: true, width: 320 },
            { headerName: 'scheduled', field: 'ttl_sch_assgnd', sortable: true, cellStyle: { textAlign: 'center' }, filter: true, width: 320 },
            { headerName: 'Un-scheduled', field: 'ttl_nt_schd', sortable: true, cellStyle: { textAlign: 'center' }, filter: true, width: 320 },
            { headerName: 'Not-viewed', field: 'sch_ttl_nt_attnd', sortable: true, cellStyle: { textAlign: 'center' }, filter: true, width: 320 },
          ];
        }

        if (this.Ttl_mbrs_Viwd == false) {
          this.loadGraph(this.ulbTrnData, this.grphBarDfltCnts, this.grphBarDfltKeys, grphLables, "mndl_nm");
        } else if (this.Ttl_mbrs_Viwd == true) {

          var grphBarDfltKeys = [{
            key: 'sch_ttl_attnd',
            label: 'Total viewed'
          }, {
            key: 'sch_ttl_nt_attnd',
            label: 'Not-viewed'
          },
          {
            key: 'trn_yt_ated',
            label: 'Yet To view'
          }];
          var grphDfltAxisLables = {
            xAxesLbl: 'ULBS',
            yAxesLbl: 'viewed Vs Not-viewed'
          }

          this.loadGraph(this.ulbTrnData, this.grphBarDfltCnts, grphBarDfltKeys, grphDfltAxisLables, "mndl_nm");
        }


        console.log(this.dtSorc_data)
        this.dtSorc_data.filter(k => {
          k['s_no'] = ++this.counter
        })
        this.rowData = this.dtSorc_data
      }, (err) => {

      })
    }
    if (row.colDef.headerName == 'Mandal Name') {
      console.log('hi')
      this.getschdata(row)
      this.varHdr = "sachivalayam Wise " + this.currentTrng + " Details"
    }


  }




  gtDtwisegrp() {
    this.btngdywise = false
    var type
    if (this.bcKbtnTy == 'state') {
      type = 'district'
    } else if (this.bcKbtnTy == 'distrct') {
      type = 'Mandal'
    } else if (this.bcKbtnTy == 'ULB') {
      type = 'Sacvalyam'
    }

    this.apiSrvc.get('/web/common/lstfwdysgrpdt/' + this.Urbn_in + '/' + this.trng_id + '/' + type).subscribe((res) => {

      this.dyWsRprt = res['data']
      console.log(this.dyWsRprt)

      if (this.grphType == 'ULB') {
        this.grphDfltAxisLables = {
          xAxesLbl: 'ULBS',
          yAxesLbl: 'Attended Vs Un-Attended'
        }

      }
      var grphBarDfltKeys = [{
        key: 'sch_ttl_attnd',
        label: 'Total Attended'
      }, {
        key: 'sch_ttl_nt_attnd',
        label: 'Not-Attended'
      }]
      this.loadGraph(this.dyWsRprt, this.grphBarDfltCnts, this.grphBarDfltKeys, this.grphDfltAxisLables, "dstrt_nm");

    })

  }


  gtDtwisegrpbk(w) {
    console.log(this.bcKbtnTy)
    this.btngdywise = true
    if (this.bcKbtnTy == 'state') {
      this.loadGraph(this.trngData, this.grphBarDfltCnts, this.grphBarDfltKeys, this.grphDfltAxisLables, "dstrt_cd");
      // this.getTrainingData(this.trng_id,this.Urbn_in)
      console.log('hi')
    }
    else if (this.bcKbtnTy == 'distrct') {
      console.log('hi')
      this.grphType = 'distrct'
      this.loadGraph(this.ulbTrnData, this.grphBarDfltCnts, this.grphBarDfltKeys, this.grphDfltAxisLables, "mndl_nm");
      // this.getUlbData(this.brcdtfrgrbKbtN)
    } else if (this.bcKbtnTy == 'ULB') {
      this.loadGraph(this.SvmtrnData, this.grphBarDfltCnts, this.grphBarDfltKeys, this.grphDfltAxisLables, "svm_nm");
      // this.getschdata(this.brcdtfrgrbKbtN)
    }

  }




  getschdata(row) {
    var trnId
    var mndlId
    console.log(row)
    if (row) {
      trnId = row.data.trng_id
      mndlId = row.data.mndl_id
    }

    console.log(trnId, mndlId)
    this.bcKbtnTy = 'ULB'
    if (this.grphType == "ULB") {
      this.brdCumFltrTitle.push({
        title: row.data.mndl_nm,
        type: 'ulb',
        id: row.data.mndl_id
      })

    }
    this.varHdr = "sachivalayam Wise " + this.currentTrng + " Details"
    this.apiSrvc.get('/web/common/schnglst/' + mndlId + '/' + this.trng_id).subscribe((res) => {
      // console.log("********************")

      this.grphType = 'sach'
      console.log(res);
      this.SvmtrnData = res['data']


      let grphLables = {
        xAxesLbl: 'scahivalayams',
        yAxesLbl: 'Attended Vs Un-Attended'
      }

      var tl_cmpltd = 0
      var tl_ntcmpltd = 0
      var tl_atend = 0
      var tl_ntatd = 0
      var tl_asgnd = 0
      var ttl_scdlusr = 0
      var tl_shduld = 0
      var tl_ntshduld = 0
      var yet_ated = 0
      console.log(this.SvmtrnData);

      for (var i = 0; i < this.SvmtrnData.length; i++) {

        this.SvmtrnData[i]['ttl_nt_schd'] = this.SvmtrnData[i].tl_asignd - (this.SvmtrnData[i].sch_ttl_attnd + this.SvmtrnData[i].ttl_sch_assgnd)
        this.SvmtrnData[i]['trn_yt_ated'] = this.SvmtrnData[i].ttl_sch_assgnd + this.SvmtrnData[i].ttl_nt_schd
        ttl_scdlusr = ttl_scdlusr + this.SvmtrnData[i].tl_asignd

        tl_cmpltd = tl_cmpltd + this.SvmtrnData[i].trn_cmptld
        tl_ntcmpltd = tl_ntcmpltd + this.SvmtrnData[i].trn_ntcmptld
        tl_atend = tl_atend + this.SvmtrnData[i].sch_ttl_attnd
        tl_ntatd = tl_ntatd + this.SvmtrnData[i].sch_ttl_nt_attnd
        tl_shduld = tl_shduld + this.SvmtrnData[i].ttl_sch_assgnd
      }
      this.dtSorc_data = this.SvmtrnData

      console.log(this.SvmtrnData);

      tl_ntshduld = ttl_scdlusr - (tl_shduld + tl_atend)

      yet_ated = tl_shduld + tl_ntshduld

      this.ttl_schduled = {
        ttl_mbrs_ct: ttl_scdlusr,
        yet_attend: yet_ated,
        tl_atend: tl_atend,
        tl_ntatd: tl_ntatd,
        tl_cmptd: tl_cmpltd,
        tl_ntcmp: tl_ntcmpltd,
        tl_shduld: tl_shduld,
        tl_ntshduld: tl_ntshduld
      }

      console.log(this.ttl_schduled)

      const totlmebatdrsprcnt = ((this.ttl_schduled.tl_cmptd / this.ttl_schduled.ttl_mbrs_ct) * 100);
      const totlmebntatdrsprcnt = ((this.ttl_schduled.tl_ntcmp / this.ttl_schduled.ttl_mbrs_ct) * 100);
      this.totPrcntData = [{

        totmebatdprct: totlmebatdrsprcnt.toFixed(0),
        totmebntatdprct: totlmebntatdrsprcnt.toFixed(0),
        // totmebytatprct: totlmebnyedrsprcnt.toFixed(0),
        // totmebschprct: totlmebschprcnt.toFixed(0),
        // totmebntschprct: totlmebntschprcnt.toFixed(0),
        totMbrs: 'Completed Mbrs'
      }];


      this.totPrcntBarGraph(this.totPrcntData)


      if (this.Ttl_mbrs_Viwd == false) {
        this.columnDefs = [
          { headerName: 'sno', field: 's_no', sortable: true, cellStyle: { textAlign: 'center' }, filter: true, width: 80 },
          { headerName: 'sachivalayam Name ', field: 'svm_nm', sortable: true, cellStyle: { textAlign: 'left' }, filter: true, width: 320 },
          { headerName: 'Attended', field: 'sch_ttl_attnd', sortable: true, cellStyle: { textAlign: 'center' }, filter: true, width: 320 },
          { headerName: 'Yet To Attend', field: 'trn_yt_ated', sortable: true, cellStyle: { textAlign: 'center' }, filter: true, width: 320 },
          { headerName: 'scheduled', field: 'ttl_sch_assgnd', sortable: true, cellStyle: { textAlign: 'center' }, filter: true, width: 320 },
          { headerName: 'Un-scheduled', field: 'nt_schdue', sortable: true, cellStyle: { textAlign: 'center' }, filter: true, width: 320 },
          { headerName: 'Un-Attended', field: 'sch_ttl_nt_attnd', sortable: true, cellStyle: { textAlign: 'center' }, filter: true, width: 320 },
        ];

        this.loadGraph(this.SvmtrnData, this.grphBarDfltCnts, this.grphBarDfltKeys, grphLables, "svm_nm");
      } else if (this.Ttl_mbrs_Viwd == true) {
        this.columnDefs = [
          { headerName: 'sno', field: 's_no', sortable: true, cellStyle: { textAlign: 'center' }, filter: true, width: 80 },
          { headerName: 'sachivalayam Name ', field: 'svm_nm', sortable: true, cellStyle: { textAlign: 'left' }, filter: true, width: 320 },
          { headerName: 'viewed', field: 'sch_ttl_attnd', sortable: true, cellStyle: { textAlign: 'center' }, filter: true, width: 320 },
          { headerName: 'Yet To view', field: 'trn_yt_ated', sortable: true, cellStyle: { textAlign: 'center' }, filter: true, width: 320 },
          { headerName: 'scheduled', field: 'ttl_sch_assgnd', sortable: true, cellStyle: { textAlign: 'center' }, filter: true, width: 320 },
          { headerName: 'Un-scheduled', field: 'nt_schdue', sortable: true, cellStyle: { textAlign: 'center' }, filter: true, width: 320 },
          { headerName: 'Not-viewed', field: 'sch_ttl_nt_attnd', sortable: true, cellStyle: { textAlign: 'center' }, filter: true, width: 320 },
        ];


        var grphBarDfltKeys = [{
          key: 'sch_ttl_attnd',
          label: 'Total viewed'
        }, {
          key: 'sch_ttl_nt_attnd',
          label: 'Not-viewed'
        },
        {
          key: 'trn_yt_ated',
          label: 'Yet To view'
        }];
        var grphDfltAxisLables = {
          xAxesLbl: 'ULBS',
          yAxesLbl: 'viewed Vs Not-viewed'
        }
        this.loadGraph(this.SvmtrnData, this.grphBarDfltCnts, grphBarDfltKeys, grphDfltAxisLables, "svm_nm");
      }


      console.log(this.dtSorc_data)
      this.dtSorc_data.filter(k => {
        k['s_no'] = ++this.counter
      })
      this.TblExlTyp = 'Sacvlym'
      this.rowData = this.dtSorc_data
    }, (err) => {

    })

    // this.grphType = 'distrct'
  }


  crdclk() {
    console.log("clkd")
    this.route.navigate([`/admin/lms/dashboard/tutorial`])
  }

  changeFilter(filter): void {
    this.filterBy = filter;
    //  this.filterBy = filter;
    //  this._contactsService.onFilterChanged.next(this.filterBy);
    this.dprtMntLstBndng = this.dprtMntLst.filter(k => {
      if (k.catgr_id == filter) {
        return k
      }
    })
    console.log(this.dprtMntLstBndng)


    console.log(filter)

    this.routerbk = filter
  }

  brdCumCtrl = (slctd_brd_cm) => {

    console.log(slctd_brd_cm)
    // this.brdCumFltrTitle = data;
    // this.grphType = slctd_brd_cm.type;

    if (slctd_brd_cm.type == 'state') {
      this.getTrainingData(slctd_brd_cm.id, this.dshBrdUrbn_in)
      this.grphType = 'distrct'
    }
    if (slctd_brd_cm.type == 'ulb') {
      this.row = {
        data: slctd_brd_cm,
        colDef: {
          field: "ulb_nm",
          filter: true,
          headerName: "District Name",
          sortable: true,
          width: 250,
          frmBtdcrm: 1
        }

      }
      this.getUlbData(this.row)

    }


  }
  upload(): void {
    this.route.navigate([`/admin/lms/dashboard/test`])
    // this.dialogRef = this._matDialog.open(TutorialEdtComponent, {
    //     panelClass: 'event-form-dialog',
    //     data      : {
    //         action: 'new',
    //         width : "600px"
    //         // date  : this.selectedDay.date
    //     }
    // });
    // this.dialogRef.afterClosed()
    //     .subscribe((response: FormGroup) => {
    //         if ( !response )
    //         {
    //             return;
    //         }
    //         // const newEvent = response.getRawValue();

    //     });
  }



}
