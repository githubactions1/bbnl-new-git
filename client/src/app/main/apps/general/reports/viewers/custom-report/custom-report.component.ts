import { Component, OnInit, NgZone, ViewChild, Input, EventEmitter, Output,Pipe, PipeTransform } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { CrudService } from '../../../../crud.service';
import { MatPaginator, MatTableDataSource, MatSort, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition, MatSnackBar } from '@angular/material';
import * as _moment from 'moment';
const moment = _moment;
import * as _ from 'lodash';
import { DxDataGridComponent } from 'devextreme-angular';
import { TransfereService } from 'app/providers/transfer/transfer.service';
import { DomSanitizer } from '@angular/platform-browser';


@Pipe({
  name: 'safeUrl'
})

@Component({
  selector: 'app-custom-report',
  templateUrl: './custom-report.component.html',
  styleUrls: ['./custom-report.component.scss']
})
export class CustomReportComponent implements OnInit {
  @Input() lgnrptid;
  @Input() ponrptid;
  @Input() ponagntid;
  @Input() rvnueShrng;
  @Input() shwRptHeader;
  @Input() shwRptDesc;
  @Input() mnthlyInvce;

  shwRptHdng;

  @ViewChild(DxDataGridComponent) dataGrid: DxDataGridComponent;
  data;
  hi;
  config: any; months: any; agents: any; year: any; query: string = ''; qurydata: any;
  rpt_id: any; TableHeaders: any = []; keyvalue: any = []; pstdetails: any = []; pstCafs: any = [];
  rptfltrsdata: any = []; TableData: any = []; showquery: boolean = false;
  drpDwndata: boolean = false; jsondata: boolean = false;
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  fltrsdata: any = []; tabledata: any = []; cloumdata: any = [];
  dstlst: any; tomndl: any; todst: any; mndlst: any; desgnlst: any; columnDefs = []; rowData = [];
  statusList: any; slctdStatusId: any;
  rowexceldata = []; getRowHeight; columnApi: any; params: any; columnKeys = []; slctdDsglId: any;
  slctdDstrctId: any; slctdyear: any; slctdmnth: any; slctdMndlId: any; slctVlgId:any;slctpckId:any; fromDate: any; toDate: any;
  isPdfDwnLd; pdfPagesize = 'A3'; PdfpageOrientation; pdfheaderRows; ReportHeader; pdftableData;
  tableHeadersWthDataValues; fileName; acessUser: boolean; msg; loader: boolean;
  @Output() gridReadyEvent = new EventEmitter<string>();
  ttlPges: number; crntPge: number; topOptions = { alignedGrids: [], suppressHorizontalScroll: true };
  bottomOptions = { alignedGrids: [] };
  pdfheaders: string[]; myArray: any; keysdata2: string[]; rowpdfdata: any; selectedkeys: { type: string; value: any; compare: any }[]; selectedParamskeys: { type: string; value: any; compare: any }[];
  drlSelected = [];
  rptParamDta: any; prmsdta: any[]; pdrpdwndata: any[]; fltrDate: any; slctdpartner: any;
  slctdport: any; rowselected: any; shwBtn: boolean; href: any; clickArray = []; localStrData: any;
  selectedIndex: number; oltRptFltr: any; shwBredCum: boolean; datafield: any; LocalOltData: any;
  shwpgHdr: boolean; isLoadPanelVisible: boolean = false; sbscbr_cd: any; rvnuDtls: any = [];
  sbstn_field: any; msolmosMstrData: any = []; dstMndlLst: any = []; caf_nu: any;
  hdrView: boolean = true; stdCds: any; std_code: any; cal_mnts: any; usrdtls: any; drdldwn: any;
  mndl_nu: any; cf_typ: any; frqncy_lst: any; caf_type: any; frqncy: any; ovrall_new_caf_ct: any;
  ovrall_trmnd_caf_ct: any; ovrall_spnd_caf_ct: any; ovrall_spnd_rsmd_caf_ct: any; ovrall_blbe_caf_ct: any;
  ovrall_tot_caf_ct: any; shwMnthlyInvceRptCrds: boolean; ovrall_voip_amt: number; ovrall_add_on_amt: number; ovrall_add_on_apsfl_amt: any; ovrall_add_on_mso_amt: any; ovrall_add_on_lmo_amt: any;
  ovrall_voip_apsfl_amt: any; ovrall_voip_mso_amt: any; ovrall_voip_lmo_amt: any; shwMnthlyrvnueRptCrds: boolean; tot_caf_ct: any; tot_prtd_caf_ct: any; tot_pd_caf_ct: any; tot_nt_pd_caf_ct: any;
  tot_bx_only_caf_ct: any; tot_spnd_caf_ct: any; tot_rsmed_caf_ct: any; tot_nw_caf_ct: any; tot_trmnd_caf_ct: any; tot_box_chnge_ct: any; tot_pon_chnge_ct: any; caption: string; prev_date: string; crd_id: any;
  lmo_cnt: any; pop_cnt: any; prt_cnt: any;
  shwponwthZeroCrd: boolean;
  excl_ind: any;
  ponrpt: boolean = false;
  drlDwnFrmAnthrPge: boolean = false;
  packagefilter: boolean = false;
  vlLst: any;
  tktstsDtls: any=[];
  tkttypDtls: any=[];
  TypeID:any;
  slctddays:any;
  categryID:any;
  CategoryDtls: any;
  subCategoryDtls: any;
  tcktTeamDtls: any;
  sanitizedUrl
  pckgelst: any;
  constructor(private router: Router, private route: ActivatedRoute, private location: Location, private apiSrvc: CrudService, public snackBar: MatSnackBar,
    public transfereService: TransfereService,private domSanitizer: DomSanitizer) {
    this.selectedIndex = 0;
    this.usrdtls = localStorage.getItem('OLTDATA');
    if (this.usrdtls) {
      this.drdldwn = JSON.parse(this.usrdtls);
      this.clickArray = this.drdldwn
    }

    this.route.queryParams.subscribe(params => {
      this.rptParamDta = params.paramsdata;
      if (params && this.rptParamDta) {
      }
    });

    this.todst = 0;
    this.tomndl = 0;
    this.months = [{ mnth_nm: 'January', mnth_id: 1 }, { mnth_nm: 'February', mnth_id: 2 },
    { mnth_nm: 'March', mnth_id: 3 }, { mnth_nm: 'April', mnth_id: 4 }, { mnth_nm: 'May', mnth_id: 5 },
    { mnth_nm: 'June', mnth_id: 6 }, { mnth_nm: 'July', mnth_id: 7 }, { mnth_nm: 'August', mnth_id: 8 },
    { mnth_nm: 'September', mnth_id: 9 }, { mnth_nm: 'October', mnth_id: 10 },
    { mnth_nm: 'November', mnth_id: 11 }, { mnth_nm: 'December', mnth_id: 12 }];
    this.year = [{ yr_nm: 2017, yr_id: 2017 }, { yr_nm: 2018, yr_id: 2018 }, { yr_nm: 2019, yr_id: 2019 }, { yr_nm: 2020, yr_id: 2020 },{ yr_nm: 2021, yr_id: 2021 },{ yr_nm: 2022, yr_id: 2022 }
	,{ yr_nm: 2023, yr_id: 2023 },{ yr_nm: 2024, yr_id: 2024 }]

    let rowHeight = 40;
    this.getRowHeight = function (params) {
      return rowHeight;
    };
    this.loader = false;
  }

  ngOnInit() {
    console.log(this.ponrptid);
    console.log(this.ponagntid);

    // if(this.ponrptid){
    //   this.rpt_id = this.ponrptid;
    //   let url = '/admin/reports/custom/' + this.rpt_id;
    //   this.location.replaceState('admin/sc/agent/olt/pon-wise-caf');
    //   this.ponrpt=true;
    //   this.getdata(this.rpt_id);
    // }
    this.getfrqncy();
    this.statusLst();
    this.getcafType();
    if (this.rvnueShrng) {
      this.hdrView = false;
      this.drlDwnFrmAnthrPge = true;
      this.rpt_id = this.rvnueShrng;
      let url = '/admin/reports/custom/' + this.rpt_id;
      this.location.replaceState('admin/billing/revenue-sharing');
      this.getdata(this.rpt_id);
    }
    if (this.mnthlyInvce) {
      this.hdrView = false;
      this.rpt_id = this.mnthlyInvce;
      let url = '/admin/reports/custom/' + this.rpt_id;
      this.location.replaceState('admin/billing/monthly-invoice');
      this.getdata(this.rpt_id);
    }
    if (this.lgnrptid) {
      this.hdrView = false;
      this.rpt_id = this.lgnrptid;
      let url = '/admin/reports/custom/' + this.rpt_id;
      this.location.replaceState('admin/userprofile');
      this.getdata(this.rpt_id);
    } else if (this.rvnueShrng == undefined && this.lgnrptid == undefined && this.mnthlyInvce == undefined && this.ponrptid == undefined) {
      this.route.params.subscribe(params => {
        this.rpt_id = params.rptid;
        this.shwRptHeader = true;
        this.shwRptDesc = true;
        let url = '/admin/reports/custom/' + this.rpt_id;
        this.location.replaceState(url);
        this.getdata(this.rpt_id);
      })
    }
	    var year_fr_day =new Date().getFullYear();
    var month_fr_day =new Date().getMonth()+1;
    this.slctddays = new Date(year_fr_day, month_fr_day, 0).getDate();

  }
  statusLst() {
    const rte = `caf/caf-status`;
    this.apiSrvc.get(rte).subscribe(res => {
      this.statusList = res['data'];
      console.log(this.statusList);
    })
  }
  generateColumns(data: any[]) {
    let columnDefinitions = [];
    data.map(object => {
      Object
        .keys(object)
        .map(key => {
          let mappedColumn = {
            headerName: key.toUpperCase(),
            field: key,
            cellStyle: { textAlign: 'center' },
            isSum: true, groupIndex: 0
          };
          columnDefinitions.push(mappedColumn);
        });
    });
    columnDefinitions = columnDefinitions.filter((column, index, self) =>
      index === self.findIndex((colAtIndex) => (
        colAtIndex.field === column.field
      ))
    )
    return columnDefinitions;
  }

  getHeaderDtls() {
    this.shwpgHdr = true;
    return { "title": this.fltrsdata[0].rpt_nm, "icon": "list_alt", "desc": this.fltrsdata[0].rpt_desc }
  }

  getdstLst(did) {
    const rte = `sql/distrctLst/${did}`;
    this.apiSrvc.get(rte).subscribe(res => {
      if (res['status'] == 200) {
        if (res['data'].length > 0) {
          this.dstlst = res['data'];
          if (this.rowselected == undefined) {
            this.slctdMndlId = 0;
          }

        }
      }
    })
  }
  getMndlLst(slctdDstrctId) {
    if (slctdDstrctId == 0) {
      this.mndlst = [];
      this.slctdMndlId = 0;
    } else {
      const rte = `sql/mandalLst/${slctdDstrctId}`
      this.apiSrvc.get(rte).subscribe(res => {
        this.mndlst = res['data'];
      })
    }
  }

  getVillagsLst(mandalId){
    console.log(this.slctdDstrctId);
    console.log(mandalId);
    const rte = `user/getvlgs/${mandalId}/${this.slctdDstrctId}`;
    this.apiSrvc.get(rte).subscribe((res) => {
      console.log(res['data'])
      this.vlLst=res['data']
    });
  }

  getcafType() {
    const rte = `caf/caf-type/`
    this.apiSrvc.get(rte).subscribe(res => {
      this.cf_typ = res['data'];
    })
  }

  getfrqncy() {
    const rte = `crm/billingFrequency`
    this.apiSrvc.get(rte).subscribe(res => {
      this.frqncy_lst = res['data'];
    })
  }

  getStdCode(slctdDstrctId) {
    if (slctdDstrctId == 0) {
      this.stdCds = [];
    } else {
      const rte = `sql/stdCodes/${slctdDstrctId}`
      this.apiSrvc.get(rte).subscribe(res => {
        this.stdCds = res['data'];
      })
    }
  }

  getStatus(){
    const rte = 'support/Ticket-Status'
    this.apiSrvc.get(rte).subscribe(res => {
      this.tktstsDtls = res['data'];
      console.log(this.tktstsDtls)
    })
  }

  getTicketType(){
    const rte = 'ticket/Type'
    this.apiSrvc.get(rte).subscribe(res => {
      this.tkttypDtls = res['data'];
      console.log(this.tkttypDtls)
    })
  }

  ForCategory(){
    console.log(this.TypeID);
    const rte = `ticket/getCategories/${this.TypeID}`
    this.apiSrvc.get(rte).subscribe(res => {
      this.CategoryDtls = res['data'];
      console.log(this.CategoryDtls);
      console.log(this.CategoryDtls.length);
    })
  }
  ForSubCategory(){
    console.log(this.categryID);
    const rte = `ticket/getSubCategories/${this.categryID}`
    this.apiSrvc.get(rte).subscribe(res => {
      this.subCategoryDtls = res['data'];
      console.log(this.subCategoryDtls);
      })
  }
  getpackage(){
    // console.log(this.categryID);
    const rte = `package/get_rpt_packages`
    this.apiSrvc.get(rte).subscribe(res => {
      this.pckgelst = res['data'];
      console.log(this.pckgelst);
      })
  }

  getTeam(){
    const rte = `ticket/teams`
    this.apiSrvc.get(rte).subscribe(res => {
      this.tcktTeamDtls = res['data'];
      console.log(this.tcktTeamDtls);
      })
  }

  getstdCdMndlLst(stdCode) {
    if (stdCode == 0) {
      this.mndlst = [];
    } else {
      const rte = `sql/stdCdMndls/${stdCode.dstrt_id}/${stdCode.mndl_id}/${stdCode.std_cd}`
      this.apiSrvc.get(rte).subscribe(res => {
        this.mndlst = res['data'];
      })
    }
  }

  getdata(rptid) {
    console.log(this.rptParamDta);
    this.loader = true;
    this.acessUser = true;
    console.log(this.rowselected);
    console.log(this.rpt_id);
    // if(this.rpt_id == 3000067){
    //   console.log("hiiiiiiiiiiiiiiiiiiiiiiiii");
    //   console.log(this.rptParamDta);
    //         // this.rptParamDta = [{
    //   //   type: "CATEGORY_0",
    //   //   value: 1,
    //   //   compare: "CATEGORY_0",
    //   // }]
    // }
    if(this.rpt_id == 3000029){
      this.rptParamDta = 0
    }
    if (this.drdldwn && this.drdldwn.length > 0 && this.rowselected == undefined && this.rpt_id != 3000029 && this.rpt_id != 114841790497947688 && this.rpt_id != 3000064) {
      console.log("111111111111");
      this.selectedIndex = this.drdldwn.length;
      for (var i = 1; i < this.drdldwn.length; i++) {
        this.mndl_nu = this.drdldwn[i].type == 'agnt_id' ? this.drdldwn[i].mndl_nu : 0
        this.rptParamDta = [{
          type: this.drdldwn[i].type == 'dist_id',
          value: this.drdldwn[i].dist_id ? this.drdldwn[i].dist_id : 0,
          compare: "DISTRICT_0",
        }, {
          type: this.drdldwn[i].type == 'caf_type_id',
          value: this.rowselected != undefined ? this.rowselected.caf_type_id : this.sbstn_field == 'Enterprise Till Date' ? 2 : 1,
          compare: "CAF TYPE_0",
        }, {
          type: this.drdldwn[i].type == 'agnt_id' || this.drdldwn[i].type == 'caf_id',
          value: this.rowselected != undefined ? this.rowselected.agnt_id : this.drdldwn[i].value,
          compare: "AGENT_0",
        }, {
          type: this.drdldwn[i].type == 'prdct_id' ? 'PRODUCT_0' : false,
          value: this.rowselected != undefined ? this.rowselected.prdct_id : this.drdldwn[i].prdct_id,
          compare: "PRODUCT_0",
        },
        {
          type: this.drdldwn[i].type == 'agnt_id' ? 'PORT_0' : '',
          value: this.rowselected != undefined ? this.rowselected.olt_prt_nm : this.drdldwn[i].olt_prt_nm,
          compare: "PORT_0",
        },
        {
          type: this.drdldwn[i].type == 'agnt_id' ? 'MANDAL_0' : '',
          value: this.rowselected != undefined ? this.rowselected.mndl_nu : this.drdldwn[i].mndl_nu,
          compare: "MANDAL_0",
        }, {
          type: 'SUBSTATION_0',
          value: this.rowselected != undefined ? this.rowselected.sbstn_id : this.drdldwn[i].sbstn_id,
          compare: "SUBSTATION_0",
        }, {
          type: 'OLT_0',
          value: this.rowselected != undefined ? this.rowselected.olt_id : this.drdldwn[i].olt_id,
          compare: "OLT_0",
        }, {
          type: 'SLOT_0',
          value: this.rowselected != undefined ? this.rowselected.olt_slt_id : this.drdldwn[i].olt_slt_id,
          compare: "SLOT_0",
        }, {
          type: 'SPLIT_0',
          value: this.rowselected != undefined ? this.rowselected.splt_id : this.drdldwn[i].splt_id,
          compare: "SPLIT_0",
        }, {
          type: 'EMPLOYEE_0',
          value: this.rowselected != undefined ? this.rowselected.cstmr_id : this.drdldwn[i].cstmr_id,
          compare: "EMPLOYEE_0",
        }, {
          type: 'MONTH_0',
          value: this.rowselected != undefined ? this.rowselected.invce_mm : this.drdldwn[i].month,
          compare: "MONTH_0",
        }, {
          type: 'YEAR_0',
          value: this.rowselected != undefined ? this.rowselected.invce_yr : this.drdldwn[i].year,
          compare: "YEAR_0",
        }, {
          type: 'INVOICE_0',
          value: this.rowselected != undefined ? this.rowselected.caf_invce_id : this.drdldwn[i].caf_invce_id,
          compare: "INVOICE_0",
        }
        ]
      }
    } else if (this.rowselected != undefined && this.rpt_id != 114841790497947688 && this.rpt_id != 3000029 && this.rpt_id != 3000064) {
      console.log("222222222222");
      this.rptParamDta = [{
        type: "dstrct_id",
        value: this.rowselected.dstrt_id ? this.rowselected.dstrt_id : this.rowselected.dstrct_id,
        compare: "DISTRICT_0",
      },
      {
        type: "mndl_id",
        value: this.rowselected.mndl_id ? this.rowselected.mndl_id : this.rowselected.mndl_nu,
        compare: "MANDAL_0",
      },
      {
        type: "sbstn_id",
        value: this.rowselected.sbstn_id,
        compare: "SUBSTATION_0",
      },
      {
        type: "olt_id",
        value: this.rowselected.olt_id,
        compare: "OLT_0",
      },
      {
        type: "PORT_0",
        value: this.rowselected.olt_prt_nm,
        compare: "PORT_0",
      },
      {
        type: "olt_slt_id",
        value: this.rowselected.olt_slt_id,
        compare: "SLOT_0",
      },
      {
        type: "splt_id",
        value: this.rowselected.splt_id,
        compare: "SPLIT_0",
      }, {
        type: "agnt_id",
        value: this.rowselected.agnt_id,
        compare: "AGENT_0",
      }, {
        type: "actvn_dt",
        value: 'CURDATE()',
        compare: "DATE_0",
      }
        // , {
        //   type: "caf_type_id",
        //   value: this.rowselected.caf_type_id ? this.rowselected.caf_type_id : 0,
        //   compare: "CAF TYPE_0",
        // }
        , {
        type: 'YEAR_0',
        value: this.rowselected.invce_yr,
        compare: "YEAR_0",
      }, {
        type: 'MONTH_0',
        value: this.rowselected.invoice_month,
        compare: "MONTH_0",
      }]
    } 
    else if(this.rowselected != undefined && this.rpt_id == 114841790497947688 && this.rpt_id != 3000064){
      this.rptParamDta = [{
        type: "AGENT_0",
        value: this.rowselected.agnt_id ? this.rowselected.agnt_id : 0,
        compare: "AGENT_0",
      }]
    }
    else {
      this.rptParamDta = this.rptParamDta ? JSON.parse(this.rptParamDta) : 0
    }

    if (this.datafield == 'House_Hold_CAF' || this.datafield == 'cur_House_Hold_CAF' || this.datafield == 'total_hse_hld') {
      this.rptParamDta.splice(-1, 1)
      this.rptParamDta.push({
        type: "CAF TYPE_0",
        value: this.datafield == 'House_Hold_CAF' ? 1 + ' AND cs.actvn_dt <= CURDATE()' : this.datafield == 'cur_House_Hold_CAF' ? 1 + ' AND cs.actvn_dt = CURDATE()' : 1,
        compare: "CAF TYPE_0"
      })
    } else if ((this.datafield == 'tot_govt_actv' || this.datafield == 'tot_govt_deactv') || (this.datafield == 'tot_prvt_actvn' || this.datafield == 'tot_prvt_dect')) {
      this.rptParamDta.splice(-1, 1)
      this.rptParamDta.push({
        type: "ENTERPRISE TYPE_0",
        value: this.datafield == 'tot_govt_actv' ? 1 + ' AND cs.enty_sts_id = 6' : this.datafield == 'tot_govt_deactv' ? 1 + ' AND cs.enty_sts_id = 8' : this.datafield == 'tot_prvt_actvn' ? 2 + ' AND cs.enty_sts_id = 6' : 2 + 'AND cs.enty_sts_id = 8',
        compare: "ENTERPRISE TYPE_0",
      }, {
        type: "CAF TYPE_0",
        value: 2,
        compare: "CAF TYPE_0",
      })
    } else if ((this.datafield == 'gvt_avtve' || this.datafield == 'deactv') || (this.datafield == 'prvt_act' || this.datafield == 'prvt_deact')) {
      this.rptParamDta.splice(-1, 1)
      this.rptParamDta.push({
        type: "ENTERPRISE TYPE_0",
        value: this.datafield == 'gvt_avtve' ? 1 + ' AND cs.enty_sts_id = 6 AND cs.actvn_dt <= CURDATE()' : this.datafield == 'deactv' ? 1 + ' AND cs.enty_sts_id = 8 AND cs.actvn_dt <= CURDATE()' : this.datafield == 'prvt_act' ? 2 + ' AND cs.enty_sts_id = 6 AND cs.actvn_dt <= CURDATE()' : 2 + 'AND cs.enty_sts_id = 8  AND cs.actvn_dt <= CURDATE()',
        compare: "ENTERPRISE TYPE_0",
      }, {
        type: "CAF TYPE_0",
        value: 2,
        compare: "CAF TYPE_0",
      })
    } else if ((this.datafield == 'cur_govt_act' || this.datafield == 'cur_govt_deact') || (this.datafield == 'cur_Prvt_act' || this.datafield == 'cur_prvt_deact')) {
      this.rptParamDta.splice(-1, 1)
      this.rptParamDta.push({
        type: "ENTERPRISE TYPE_0",
        value: this.datafield == 'cur_govt_act' ? 1 + ' AND cs.enty_sts_id = 6 AND cs.actvn_dt = CURDATE()' : this.datafield == 'cur_govt_deact' ? 1 + ' AND cs.enty_sts_id = 8 AND cs.actvn_dt = CURDATE()' : this.datafield == 'cur_Prvt_act' ? 2 + ' AND cs.enty_sts_id = 6 AND cs.actvn_dt = CURDATE()' : 2 + 'AND cs.enty_sts_id = 8  AND cs.actvn_dt = CURDATE()',
        compare: "ENTERPRISE TYPE_0",
      }, {
        type: "CAF TYPE_0",
        value: 2,
        compare: "CAF TYPE_0",
      })
    } else if ((this.datafield == 'tot_govt_actv' || this.datafield == 'tot_govt_deactv') || (this.datafield == 'tot_prvt_actvn' || this.datafield == 'tot_prvt_dect')) {
      this.rptParamDta.splice(-1, 1)
      this.rptParamDta.push({
        type: "ENTERPRISE TYPE_0",
        value: this.datafield == 'tot_govt_actv' ? 1 + ' AND cs.enty_sts_id = 6' : this.datafield == 'tot_govt_deactv' ? 1 + ' AND cs.enty_sts_id = 8' : this.datafield == 'tot_prvt_actvn' ? 2 + ' AND cs.enty_sts_id = 6' : 2 + 'AND cs.enty_sts_id = 8 ',
        compare: "ENTERPRISE TYPE_0",
      }, {
        type: "CAF TYPE_0",
        value: 2,
        compare: "CAF TYPE_0",
      })
    } else if (this.datafield == 'cumulative') {
      this.rptParamDta = [{
        type: "DISTRICT_0",
        value: this.rowselected != undefined ? this.rowselected.dstrt_id : this.rowselected.dstrct_id,
        compare: "DISTRICT_0",
      },
      {
        type: "mndl_id",
        value: this.rowselected.mndl_id ? this.rowselected.mndl_id : this.rowselected.mndl_nu,
        compare: "MANDAL_0",
      }]
    } else if (this.slctdpartner == 1) {
      this.rptParamDta = [{
        type: "prtnr_id",
        value: 1,
        compare: "AGENT_0",
      }]
    }
    console.log(this.datafield)
    if (this.datafield == 'Caf_Done_Count') {
      this.rptParamDta = [{
        type: "prtnr_id",
        value: this.rowselected.agnt_id,
        compare: "AGENT_0",
      }]
    } else if (this.datafield == 'Caf_Suspended_Count') {
      this.rptParamDta = [{
        type: "prtnr_id",
        value: this.rowselected.agnt_id + 'AND cf.actve_in = 0 AND spnd_in =1',
        compare: "AGENT_0",
      }]
    } else if (this.datafield == 'Stock_Available_Count') {
      this.rptParamDta = [{
        type: "prtnr_id",
        value: this.rowselected.agnt_id + ' AND cf.actve_in = 0 AND spnd_in =1',
        compare: "AGENT_0",
      }]
    }
    console.log(this.sbstn_field)
    if (this.datafield == "CAF_Active" || this.datafield == "In_Active_CAF" || this.datafield == "CAF_Suspended" || this.datafield == "Total_CAF" || this.datafield == "pndng_caf_crdt" || this.datafield == "pndng_prvsn_cnt" || this.datafield == "pndng_pmnt_cnt") {
      // console.log("::::::::::::::::::::::::")
      this.rptParamDta = [{
        type: "ACTIVE_0",
        value: this.datafield == "CAF_Active" ? 6 : 0,
        compare: "ACTIVE_0",
      },
      {
        type: "ACTIVE_0",
        value: this.datafield == "In_Active_CAF" ? 8 : 0,
        compare: "ACTIVE_0",
      }, {
        type: "ACTIVE_0",
        value: this.datafield == "CAF_Suspended" ? 7 : 0,
        compare: "ACTIVE_0",
      }, {
        type: "ACTIVE_0",
        value: this.datafield == "pndng_caf_crdt" ? 88 : 0,
        compare: "ACTIVE_0",
      }, {
        type: "ACTIVE_0",
        value: this.datafield == "pndng_prvsn_cnt" ? 2 : 0,
        compare: "ACTIVE_0",
      }, {
        type: "ACTIVE_0",
        value: this.datafield == "pndng_pmnt_cnt" ? 89 : 0,
        compare: "ACTIVE_0",
      }, {
        type: "ACTIVE_0",
        value: this.datafield == "Total_CAF" ? 0 : 0,
        compare: "ACTIVE_0",
      }, {
        type: "EMPLOYEE_0",
        value: this.rowselected.cstmr_id,
        compare: "EMPLOYEE_0",
      }]
    }

    if (this.sbstn_field == 1 || this.sbstn_field == 2 || this.sbstn_field == 3 || this.sbstn_field == 4 || this.sbstn_field == 5 || this.sbstn_field == 6 || this.sbstn_field == 7 || this.sbstn_field == 8) {
      this.rptParamDta = [{
        type: this.sbstn_field,
        value: this.rowselected.sbstn_id,
        compare: "SUBSTATION_0",
      }, {
        type: this.sbstn_field,
        value: this.sbstn_field,
        compare: "PORT_0",
      }
        , {
        type: 'Mandal',
        value: (this.slctdMndlId == 0 || this.slctdMndlId == undefined) ? 0 : this.rowselected.mndl_nu,
        compare: "MANDAL_0",
      }, {
        type: 'District',
        value: this.slctdDstrctId == 0 ? 0 : this.rowselected.dstrt_id,
        compare: "DISTRICT_0",
      }
      ]
    } else if (this.sbstn_field == "Total") {
      this.rptParamDta = [{
        type: this.sbstn_field,
        value: this.rowselected.sbstn_id,
        compare: "SUBSTATION_0",
      }, {
        type: 'District',
        value: this.slctdDstrctId == 0 ? 0 : this.rowselected.dstrt_id,
        compare: "DISTRICT_0",
      }]
    }
    if (this.datafield == 'mso_cnt') {
      this.rptParamDta = [{
        type: 'AGENT_0',
        value: this.rowselected.agnt_id,
        compare: "AGENT_0",
      }, {
        type: 'MANDAL_0',
        value: this.slctdMndlId != undefined ? this.slctdMndlId : 0,
        compare: "MANDAL_0",
      }, {
        type: 'DISTRICT_0',
        value: this.slctdDstrctId ? this.slctdDstrctId : this.rowselected.dstrt_id,
        compare: "DISTRICT_0",
      }]
    }

    if (this.datafield == 'cnt') {
      this.rptParamDta = [{
        type: 'YEAR_0',
        value: this.rowselected.year,
        compare: "YEAR_0",
      }, {
        type: 'CAF_0',
        value: this.rowselected.caf_nu,
        compare: "CAF_0",
      }]
    }

    if (this.datafield == 'onu_stck' || this.datafield == 'cpe_stck' || this.datafield == 'mke_wse_stk' || this.datafield == 'avalilable' || this.datafield == 'trmin') {
      this.rptParamDta = [{
        type: 'AGENT_0',
        value: this.datafield == 'mke_wse_stk' ? this.rowselected.agnt_id + ' AND i.splr_id is NOT NULL' : this.datafield == 'avalilable' ? this.rowselected.agnt_id + ' AND i.caf_id is null AND i.prdct_id =1' : this.datafield == 'trmin' ? this.rowselected.agnt_id + ' AND c.enty_sts_id = 8' : this.rowselected.agnt_id,
        compare: "AGENT_0",
      }, {
        type: 'PRODUCT_0',
        value: this.datafield == 'mke_wse_stk' || this.datafield == 'avalilable' || this.datafield == 'trmin' ? 0 : this.datafield == 'onu_stck' ? 1 + ' and i.caf_id is NULL' : 2 + ' and i.caf_id is NULL',
        compare: "PRODUCT_0",
      }, {
        type: 'MANDAL_0',
        value: this.slctdMndlId != undefined ? this.slctdMndlId : 0,
        compare: "MANDAL_0",
      }, {
        type: 'DISTRICT_0',
        value: this.slctdDstrctId ? this.slctdDstrctId : this.rowselected.dstrt_id,
        compare: "DISTRICT_0",
      }]
    } else if (this.datafield == 'total_stock') {
      this.rptParamDta = [{
        type: 'AGENT_0',
        value: this.rowselected.agnt_id,
        compare: "AGENT_0",
      }, {
        type: 'MANDAL_0',
        value: this.slctdMndlId != undefined ? this.slctdMndlId : 0,
        compare: "MANDAL_0",
      }, {
        type: 'DISTRICT_0',
        value: this.slctdDstrctId ? this.slctdDstrctId : this.rowselected.dstrt_id,
        compare: "DISTRICT_0",
      }]
    } else if (this.datafield == 'caf_dne_cnt') {
      this.rptParamDta = [{
        type: 'AGENT_0',
        value: this.rowselected.agnt_id + ' AND i.caf_id is not NULL',
        compare: "AGENT_0",
      }, {
        type: 'MANDAL_0',
        value: this.slctdMndlId != undefined ? this.slctdMndlId : 0,
        compare: "MANDAL_0",
      }, {
        type: 'DISTRICT_0',
        value: this.slctdDstrctId ? this.slctdDstrctId : this.rowselected.dstrt_id,
        compare: "DISTRICT_0",
      }, {
        type: 'PORT_0',
        value: this.rowselected.olt_prt_nm,
        compare: "PORT_0",
      }, {
        type: 'OLT_0',
        value: this.rowselected.olt_id,
        compare: "OLT_0",
      }, {
        type: 'YEAR_0',
        value: this.slctdyear,
        compare: "YEAR_0",
      }, {
        type: 'MONTH_0',
        value: this.slctdmnth,
        compare: "MONTH_0",
      }]
    }
    else if (this.sbstn_field == 'Invoice Month') {
      this.rptParamDta = [{
        type: 'YEAR_0',
        value: this.rowselected.invce_yr,
        compare: "YEAR_0",
      }, {
        type: 'YEAR_1',
        value: this.rowselected.invce_yr,
        compare: "YEAR_1",
      }, {
        type: 'MONTH_0',
        value: this.rowselected.invce_month,
        compare: "MONTH_0",
      }]
    }
    if (this.datafield == 'caf_invce_id') {
      this.rptParamDta = [{
        type: 'INVOICE_0',
        value: this.rowselected.caf_invce_id ? this.rowselected.caf_invce_id : 0,
        compare: "INVOICE_0",
      }, {
        type: 'AGENT_0',
        value: this.rowselected.agnt_id ? this.rowselected.agnt_id : 0,
        compare: "AGENT_0",
      }, {
        type: 'YEAR_0',
        value: this.rowselected.invce_yr ? this.rowselected.invce_yr : 0,
        compare: "YEAR_0",
      }, {
        type: 'MONTH_0',
        value: this.rowselected.invoice_mnth ? this.rowselected.invoice_mnth : 0,
        compare: "MONTH_0",
      }]
    }

    if (this.datafield == 'CAF_Count' || this.datafield == 'Paid_Count' || this.datafield == 'Not_Paid_Count') {
      this.rptParamDta = [{
        type: 'AGENT_0',
        value: this.datafield == 'Paid_Count' ? this.rowselected.agnt_id + ' AND e.pd_in = 0' : this.datafield == 'Not_Paid_Count' ? this.rowselected.agnt_id + ' AND e.pd_in = 1' : this.rowselected.agnt_id,
        compare: "AGENT_0",
      }, {
        type: 'CAF_0',
        value: this.rowselected.caf_nu ? this.rowselected.caf_nu : 0,
        compare: "CAF_0",
      }, {
        type: 'DISTRICT_0',
        value: this.slctdDstrctId != undefined ? this.slctdDstrctId : this.rowselected.dstrt_id,
        compare: "DISTRICT_0",
      }, {
        type: 'YEAR_0',
        value: this.slctdyear != undefined ? this.slctdyear : 0,
        compare: "YEAR_0",
      }, {
        type: 'MONTH_0',
        value: this.slctdmnth != undefined ? this.slctdmnth : 0,
        compare: "MONTH_0",
      }]
    }
    // if(rptid == 3000020){
    //   console.log("Godkrishnaa");
    //   if(this.ponrpt == true){
    //     console.log("true");
    //     this.rptParamDta = [{
    //       type: "agentId",
    //       value: this.ponagntid,
    //       compare: "AGENT_0",
    //     }]
    //   }
    //   else if(this.ponrpt == false){
    //     console.log("false");
    //     this.rptParamDta = [{
    //       type: "agentId",
    //       value: 0,
    //       compare: "AGENT_0",
    //     }]
    //   }
    // }
    let postdata = {
      rpt_id: rptid,
      rpt_params_data: this.rptParamDta
    }
    console.log(postdata)
    const rte = `sql/getallrptdetails`;
    this.apiSrvc.create(postdata, rte).subscribe((res) => {
      this.fltrsdata = [];
      this.tabledata = [];
      this.cloumdata = '';
      if (res['data'][0] == 'NO' && res['data'][1] == 'NO' && res['data'][2] == 'NO') {
        this.acessUser = false;
        this.msg = "You Don't Have Access To View This Report";
      }
      else {
        this.acessUser = true;
        if (res['status'] == 200) {
          console.log(res['data']);
          this.loader = false;
          this.fltrsdata = [];
          this.tabledata = [];
          this.excl_ind = res['data'][0].excel_in == 1 ? true : false;
          this.fltrsdata = res['data'][0];
          console.log(this.fltrsdata);
          for(i=0; i<this.fltrsdata.length;i++){
            console.log(this.fltrsdata.length)
            if(this.fltrsdata[i].fltr_id == 45){
              this.packagefilter = true;
              this.getpackage();
              console.log("jjjjjjjkl;")
              break;
            } else{
              this.packagefilter = false;
            }
          }
         
          this.tabledata = res['data'][1];
          this.cloumdata = res['data'][2];
          this.jsondata = true;
          var d = new Date();
          this.prev_date = `No.Of CAF's Up To ` + (d.getDate() < 10 ? '0' : '' + (d.getDate() - 1) + `-` + (d.getDate() < 10 ? '0' : '' + d.getMonth()) + `-` + (d.getFullYear()))
          this.caption = `No.Of CAF's on the Day ` + (d.getDate() < 10 ? '0' : '' + (d.getDate()) + `-` + (d.getDate() < 10 ? '0' : '' + d.getMonth()) + `-` + (d.getFullYear()))
          if (this.rpt_id == 3000003) {
            this.mnthlyInvceData(this.tabledata);
          }
          // if(this.rpt_id == 3000033 && this.fltrsdata[0].fltr_lbl_tx == 'From Date' && this.fltrsdata[1].fltr_lbl_tx == 'To Date'){
          //   console.log("i am thereeeeeeeeeeeeeeeeeeeeeeeeee");
          //   this.fromDate = new Date();
          //   this.toDate = new Date();         
          // }

        if(this.rpt_id == 3000053 || this.rpt_id == 3000054){
          // this.shwRptHdng = 'CAF Coverage ' + this.tabledata[0].date;
          this.shwRptHdng = 'CAF Coverage ' + this.tabledata[0].mnth_nm;
        }
        if(this.rpt_id == 3000057){
           this.slctdmnth = 0;
          this.slctdyear = this.rowselected != undefined ? this.slctdyear : d.getFullYear();
        }
		if(this.rpt_id == 30001453000145 || this.rpt_id == 30001453000145 ){
          console.log("d.getMonth()",d.getMonth());
          console.log("this.slctdmnth",this.slctdmnth);
          this.slctdmnth = this.rowselected != undefined ? this.slctdmnth : d.getMonth();
          if(d.getMonth() == 12){
            this.slctdyear = this.rowselected != undefined ? this.slctdyear : d.getFullYear()-1;
          }else {
            this.slctdyear = this.rowselected != undefined ? this.slctdyear : d.getFullYear();
          }

       }
          if (this.rpt_id == 11) {
            this.lmoActivities(this.tabledata);
          }
          if(this.fltrsdata[0].dflt_vlue_tx == 'YEAR(CURDATE())' && this.fltrsdata[1].dflt_vlue_tx == 'MONTH(CURDATE()) - 1'){
            this.slctdmnth = this.rowselected != undefined ? this.slctdmnth : d.getMonth();
            this.slctdyear = this.rowselected != undefined ? this.slctdyear : d.getFullYear();
          }

          if (this.rpt_id == '114841790497947677') {
            this.ponWthZeroPort(this.tabledata);
          }
          if (this.fltrsdata[0].fltr_varble_tx == 'DISTRICT_0') {
            this.slctdDstrctId = this.rowselected != undefined ? this.rowselected.dstrt_id : parseInt(this.fltrsdata[0].dflt_vlue_tx);
            this.getMndlLst(this.slctdDstrctId);
            this.getStdCode(this.fltrsdata[0].dflt_vlue_tx);
            if (this.fltrsdata.length == 4 && this.fltrsdata[3].fltr_lbl_tx == 'card') {
              // this.crd_id = 1;
            }
          } else if (this.fltrsdata[0].dflt_vlue_tx == 3 && this.fltrsdata[0].fltr_varble_tx == 'AGENT_0') {
            this.slctdpartner = 3
          } else if (this.fltrsdata.length == 3 && this.fltrsdata[0].dflt_vlue_tx == 'YEAR(CURDATE())' && this.fltrsdata[1].dflt_vlue_tx == 'MONTH(CURDATE())' && (this.fltrsdata[2].fltr_lbl_tx == 'Caf' || this.fltrsdata[2].fltr_lbl_tx == 'Agent')) {
            this.slctdmnth = this.rowselected != undefined ? this.slctdmnth : d.getMonth() + 1;
            this.slctdyear = this.rowselected != undefined ? this.slctdyear : d.getFullYear();
            // this.caf_nu = this.fltrsdata[2].dflt_vlue_tx;
            // this.slctdpartner = this.fltrsdata[2].dflt_vlue_tx;
            console.log(this.caf_nu);
            if (this.fltrsdata[2].fltr_lbl_tx == 'Caf') {
              this.caf_nu = this.fltrsdata[2].dflt_vlue_tx;
            }
            if (this.fltrsdata[2].fltr_lbl_tx == 'Agent') {
              this.slctdpartner = this.fltrsdata[2].dflt_vlue_tx;
            }

            let sum_upld = 1;
            let sum_dnld = 1;
            for (var i = 1; i <= 31; i++) {
              sum_upld += this.fltrsdata[0][`dy_up_${i}`];
              sum_dnld += this.fltrsdata[0][`dy_dw_${i}`];
            }
            this.fltrsdata[0]['s_no'] = 1;
            this.fltrsdata[0]['upldsize'] = Math.round(((sum_upld / 1024) / 1024 / 1024));
            this.fltrsdata[0]['dwnldsize'] = Math.round(((sum_dnld / 1024) / 1024 / 1024));
            this.fltrsdata[0]['totalsize'] = Math.round(((sum_upld / 1024) / 1024 / 1024)) + Math.round(((sum_dnld / 1024) / 1024 / 1024));
          } else if ((this.fltrsdata.length == 3 && this.fltrsdata[0].dflt_vlue_tx == 'YEAR(CURDATE())' && this.fltrsdata[1].dflt_vlue_tx == 'MONTH(CURDATE())' && (this.fltrsdata[2].fltr_varble_tx == 'DISTRICT_0') || (this.fltrsdata.length == 3 && this.fltrsdata[2].fltr_lbl_tx == 1) || this.fltrsdata.length == 2 && this.fltrsdata[1].fltr_lbl_tx == 'CAF')) {
            this.cal_mnts = this.rpt_id == 2000016 ? this.fltrsdata[2].dflt_vlue_tx : undefined
            this.caf_nu = this.rpt_id == 1000004 ? this.fltrsdata[2].dflt_vlue_tx : this.rpt_id == 3000012 ? this.fltrsdata[1].dflt_vlue_tx : this.rpt_id == 3000014 ? this.fltrsdata[2].dflt_vlue_tx : undefined;
            if (this.rpt_id == 3000001) {
              this.slctdDstrctId = this.rowselected != undefined ? this.rowselected.dstrt_id : 0;
            } else {
              this.slctdDstrctId = this.rowselected != undefined ? this.rowselected.dstrt_id : 12;
            }
            this.slctdmnth = this.rowselected != undefined ? this.rowselected.invce_month : d.getMonth() + 1;
            this.slctdyear = this.rowselected != undefined ? this.slctdyear : d.getFullYear();
            this.caf_type = this.rowselected != undefined ? this.rowselected.caf_type_id : 0
          } else if (this.fltrsdata[0].fltr_varble_tx == 'YEAR_1' && rptid == '2000008') {
            if (this.rptParamDta && this.rptParamDta != undefined) {
              console.log('****************sravani****************')
              console.log(this.rptParamDta)
              console.log('*****************satya**************')
              this.slctdyear = this.rptParamDta[1].value;
            } else {
              this.slctdyear = d.getFullYear();
            }

          } else if ((this.fltrsdata.length == 1 && this.fltrsdata[0].dflt_vlue_tx == 'YEAR(CURDATE())') || (((this.fltrsdata.length == 2) && this.fltrsdata[0].dflt_vlue_tx == 'YEAR(CURDATE())' && this.fltrsdata[1] && this.fltrsdata[1].dflt_vlue_tx == 'MONTH(CURDATE())'))) {
            this.cal_mnts = 30;
            if (this.fltrsdata[2]) {
              this.slctdpartner = this.fltrsdata[2].dflt_vlue_tx
            }
            this.slctdmnth = this.rowselected != undefined ? this.rowselected.slctdmnth : d.getMonth() + 1;
            this.slctdyear = this.rowselected != undefined ? this.slctdyear : d.getFullYear();
            this.slctdDstrctId = this.rowselected != undefined ? this.rowselected.dstrt_id : 12;
          } else if ((this.fltrsdata.length == 4 && this.fltrsdata[0].dflt_vlue_tx == 'YEAR(CURDATE())' && this.fltrsdata[1] && this.fltrsdata[1].dflt_vlue_tx == 'MONTH(CURDATE()) - 1') || (this.fltrsdata.length == 4 && this.fltrsdata[0].dflt_vlue_tx == 'YEAR(CURDATE())')) {
            var d = new Date();
            let val = parseInt(this.fltrsdata[1].dflt_vlue_tx);
            if (val != 0) {
              this.slctdmnth = this.rowselected != undefined ? this.rowselected.invoice_month : d.getMonth();
            }
            this.slctdDstrctId = this.slctdDstrctId != undefined ? this.slctdDstrctId : 0;
            this.slctdyear = this.rowselected != undefined ? this.slctdyear : d.getFullYear();
            this.slctdmnth = this.rowselected != undefined ? this.rowselected.invoice_month : d.getMonth();
          } else if (this.fltrsdata[0].dflt_vlue_tx == 'DISTRICT_0' && this.fltrsdata[0].fltr_varble_tx == 'DATE_0') {
            this.fromDate = new Date();
            this.toDate = new Date();
          } else if (this.fltrsdata[0].fltr_lbl_tx == 'Revenue_Year') {
            this.slctdyear = this.rowselected != undefined ? this.slctdyear : d.getFullYear();
          } else if (this.fltrsdata[0].fltr_lbl_tx == 'lmo_activity') {
            this.slctdpartner = this.fltrsdata[0].dflt_vlue_tx
          } 
          else if ((this.fltrsdata.length == 3 && this.fltrsdata[0].fltr_lbl_tx == 'From Date' && this.fltrsdata[1].fltr_lbl_tx == 'To Date' && this.fltrsdata[2].fltr_varble_tx == 'SUBSCRIBER_0') || this.fltrsdata.length == 2 && this.fltrsdata[0].fltr_lbl_tx == 'From Date' && this.fltrsdata[1].fltr_lbl_tx == 'To Date') {
          
            this.fromDate = new Date();
            this.toDate = new Date();
          }
          if (this.fltrsdata.length > 0) {
            this.getHeaderDtls();
          }
        } else {
          this.loader = false;
          this.acessUser = false;
          this.msg = "You Don't Have Access To View This Report";
        }

        if (this.fltrsdata.length == undefined || (this.fltrsdata.length == 1 && this.fltrsdata[0].fltr_id == null)) {
          this.drpDwndata = true;
        } else {
          this.drpDwndata = true;
          this.getdstLst(this.todst);
        }
        if (this.tabledata.length == undefined) {
        }
        else {
          if (this.tabledata) {
            let d = this.tabledata;
            let h = 0, hdr = [];
            for (let j in d[0]) {
              hdr[h] = j;
              h++;
            }
            this.TableHeaders = hdr;
            this.TableData = this.tabledata;
            this.rowData = this.TableData;
            console.log(this.rowData)
            this.rowpdfdata = this.TableData;
            this.rowexceldata = this.TableData;
            this.columnDefs = this.cloumdata;
            console.log(this.columnDefs)
            this.dataGrid.instance.clearFilter("search");
          } else {
            this.TableData = [];
          }
        }
      }
    }, (error) => {
      this.loader = false;
      this.acessUser = false;
      this.msg = "You Don't Have Access To View This Report";
    });
  }

//   empDtls() {
//     if(this.rpt_id == 3000075){
//       var downOlts = {
//         DATE_0: this.fromDate != undefined ? moment(this.fromDate).format('YYYY-MM-DD') : 0,
//         DATE_1: this.toDate != undefined ? moment(this.toDate).format('YYYY-MM-DD') : 0,
//         DISTRICT_0: this.slctdDstrctId != undefined ? this.slctdDstrctId : 0,
//         MANDAL_0: this.slctdMndlId != undefined ? this.slctdMndlId : 0,
//       }
//       this.pstdetails[0] = this.rpt_id;
//       this.pstdetails[1] = Object.keys(downOlts).map(key => ({ type: key, value: downOlts[key] }));
//       console.log(this.pstdetails);
//       const rte = `sql/postTodefaultValues`;
//       this.apiSrvc.create(this.pstdetails, rte).subscribe((res) => {
//         if (res['status'] == 200) {
//           this.loader = false;
//           this.rowData = res['data'][0];
//           this.rowpdfdata = res['data'][0];
//           this.rowexceldata = res['data'][0];
//           this.columnDefs = res['data'][1];
//           console.log(this.rowData);
//           console.log(this.rowexceldata);
//           this.jsondata = true;
//         }
//       })
//     }
   
//     if(this.rpt_id == 3000025 || this.rpt_id == 3000048 || this.rpt_id == 3000027 || this.rpt_id == 3000091 || this.rpt_id == 3000043 || this.rpt_id == 3000037 || this.rpt_id == 3000057 || this.rpt_id == 3000021 || this.rpt_id == 3000056 && (this.rpt_id != 3000070 || this.rpt_id != 3000086 || this.rpt_id != 3000087 || this.rpt_id != 3000088 || this.rpt_id != 3000090 || this.rpt_id != 3000092|| this.rpt_id != 3000093|| this.rpt_id != 3000094|| this.rpt_id != 3000095 || this.rpt_id != 3000078 || this.rpt_id != 3000071 || this.rpt_id != 3000072 || this.rpt_id != 3000073 || this.rpt_id != 3000075) ){
//       var frEgntRpt = {
//         YEAR_0: this.slctdyear != undefined ? this.slctdyear : 0,
//         MONTH_0: this.slctdmnth != undefined ? this.slctdmnth : 0,
//         AGENT_0: this.slctdpartner != undefined ? this.slctdpartner : 0,
//         DISTRICT_0: this.slctdDstrctId != undefined ? this.slctdDstrctId : 0,
//         DATE_0: this.fltrDate != undefined ? moment(this.fltrDate).format('YYYY-MM-DD') : 0,
//         MANDAL_0: this.slctdMndlId != undefined ? this.slctdMndlId : 0,
//         STATUS_0: this.slctdStatusId != undefined ? this.slctdStatusId : 0,
//         'CITY/ULB_0': this.slctVlgId != undefined ? this.slctVlgId : 0,
//         'CAF TYPE_0': this.caf_type != undefined ? this.caf_type : 0,
//         TYPE_0: this.caf_type != undefined ? this.caf_type : 0,
//       }
//       this.pstdetails[0] = this.rpt_id;
//       this.pstdetails[1] = Object.keys(frEgntRpt).map(key => ({ type: key, value: frEgntRpt[key] }));
//       console.log(this.pstdetails);
//       const rte = `sql/postTodefaultValues`;
//       this.apiSrvc.create(this.pstdetails, rte).subscribe((res) => {
//         if (res['status'] == 200) {
//           this.loader = false;
//           this.rowData = res['data'][0];
//           this.rowpdfdata = res['data'][0];
//           this.rowexceldata = res['data'][0];
//           this.columnDefs = res['data'][1];
//           console.log(this.rowData);
//           console.log(this.rowexceldata);
//           this.jsondata = true;
//         }
//       })
//     }
//     if(this.rpt_id != 3000075){
//     if (this.rpt_id == 3000033 ||  this.rpt_id != 3000027 ||  this.rpt_id != 3000091 || this.rpt_id == 3000035 || this.rpt_id == 3000063 || this.rpt_id == 3000070 || this.rpt_id == 3000078 || this.rpt_id != 3000075 ||  this.rpt_id == 3000071 || this.rpt_id == 3000072 || this.rpt_id == 3000073 || this.rpt_id != 3000086 || this.rpt_id != 3000087 || this.rpt_id != 3000088 || this.rpt_id != 3000090|| this.rpt_id != 3000092|| this.rpt_id != 3000093|| this.rpt_id != 3000094|| this.rpt_id != 3000095 && (this.fromDate != undefined || this.toDate != undefined || this.slctdStatusId != undefined || this.slctdpartner != undefined ||  this.rpt_id != 3000027 ||  this.rpt_id != 3000091 || this.rpt_id != 3000075) && this.rpt_id != 3000075) {
//       this.loader = true;
//       this.columnDefs = [];
//       this.rowData = [];
//       console.log(this.slctdpartner);
//       var erpData = {
//         STATUS_0: this.slctdStatusId != undefined ? this.slctdStatusId : 0,
//         AGENT_0: this.slctdpartner != undefined ? this.slctdpartner : 0,
//         DATE_0: this.fromDate != undefined ? moment(this.fromDate).format('YYYY-MM-DD') : 0,
//         DATE_1: this.toDate != undefined ? moment(this.toDate).format('YYYY-MM-DD') : 0,
//         DATE_2: this.fromDate != undefined ? moment(this.fromDate).format('YYYY-MM-DD') : 0,
//         DATE_3: this.toDate != undefined ? moment(this.toDate).format('YYYY-MM-DD') : 0,
//         OLT_0:0,
//         OLT_1:0,
//         YEAR_0: this.slctdyear != undefined ? this.slctdyear : 0,
//         MONTH_0: this.slctdmnth != undefined ? this.slctdmnth : 0,
//         DISTRICT_0: this.slctdDstrctId != undefined ? this.slctdDstrctId : 0
//       }
//       console.log(erpData);
    
// //       const objectArray = Object.entries(erpData);
// //       let a = []
// // objectArray.forEach(([key, value]) => { 
// // a.push({
// // type: key,
// // value: value}) 
// // console.log(a); 
// // this.pstCafs[1]=a;
// // });
//      this.pstdetails[1] = Object.keys(erpData).map(key => ({ type: key, value: erpData[key] }));
//       console.log(this.pstdetails[1].length);
//       console.log(this.pstdetails);
//         this.pstdetails[0] = this.rpt_id;
//         console.log(this.pstdetails);
//       const rte = `sql/postTodefaultValues`;
//       this.apiSrvc.create(this.pstdetails, rte).subscribe((res) => {
//         if (res['status'] == 200) {
//           this.loader = false;
//           this.rowData = res['data'][0];
//           this.rowpdfdata = res['data'][0];
//           this.rowexceldata = res['data'][0];
//           this.columnDefs = res['data'][1];
//           console.log(this.rowData);
//           console.log(this.rowexceldata);
//           this.jsondata = true;
//         }
//       })
//     }
//   }
//     if ((this.slctdpartner != undefined || this.rpt_id != 3000025 || this.rpt_id != 3000075 || this.rpt_id  != 3000063 || this.rpt_id != 3000070 || this.rpt_id != 3000086 || this.rpt_id != 3000087|| this.rpt_id != 3000088|| this.rpt_id != 3000090 || this.rpt_id != 3000092|| this.rpt_id != 3000093|| this.rpt_id != 3000094|| this.rpt_id != 3000095 || this.rpt_id == 3000078 || this.rpt_id != 3000071 || this.rpt_id != 3000072 || this.rpt_id != 3000073 || this.rpt_id != 3000027 ||  this.rpt_id != 3000091 || this.slctdpartner == 0 || this.rpt_id != 3000056 || this.rpt_id != 3000050 || this.rpt_id != 3000033 || this.rpt_id != 3000043 || this.rpt_id != 3000035 || this.rpt_id != 1000001) && this.rpt_id != 3000037 && this.rpt_id != 3000057 && this.rpt_id != 1000001 && this.rpt_id != 3000033 && this.rpt_id != 3000035 && this.slctdyear == undefined && this.slctdmnth == undefined && this.rpt_id != '114841790497947677' && this.rpt_id != 3000050 && this.rpt_id != 3000043 && this.rpt_id != 3000025 && this.rpt_id != 114841790497947671 && this.rpt_id != 3000056 &&  this.rpt_id != 3000027 && this.rpt_id != 3000091 && this.rpt_id  != 3000063 && this.rpt_id != 3000070 && this.rpt_id != 3000086 && this.rpt_id != 3000087 && this.rpt_id != 3000088 && this.rpt_id != 3000090 && this.rpt_id != 3000092 && this.rpt_id != 3000093 && this.rpt_id != 3000094 && this.rpt_id != 3000095 && this.rpt_id != 3000078 && this.rpt_id != 3000071 && this.rpt_id != 3000072 && this.rpt_id != 3000073 && this.rpt_id != 3000075) {
          
//       this.loader = true;
//       this.columnDefs = [];
//       this.rowData = [];
//       var PrtnrsData = {
//         AGENT_0: this.slctdpartner != undefined ? this.slctdpartner : 0,
//         YEAR_0: this.slctdyear != undefined ? this.slctdyear : 0,
//         MONTH_0: this.slctdmnth != undefined ? this.slctdmnth : 0,
//       }
//       this.pstdetails[0] = this.rpt_id;
//       this.pstdetails[1] = Object.keys(PrtnrsData).map(key => ({ type: key, value: PrtnrsData[key] }));
//       const rte = `sql/postTodefaultValues`;
//       console.log(this.pstdetails);
//       this.apiSrvc.create(this.pstdetails, rte).subscribe((res) => {
//         if (res['status'] == 200) {
//           this.loader = false;
//           this.rowData = res['data'][0];
//           this.rowpdfdata = res['data'][0];
//           this.rowexceldata = res['data'][0];
//           this.columnDefs = res['data'][1];
//         }
//       })
//     }
//     if (this.cal_mnts != undefined && this.slctdyear != undefined && this.rpt_id != 3000075  && this.rpt_id != 3000027 && this.rpt_id != 3000091 && this.rpt_id != 3000070 &&  this.rpt_id != 3000086 && this.rpt_id != 3000087 && this.rpt_id != 3000088 && this.rpt_id != 3000090 && this.rpt_id != 3000092 && this.rpt_id != 3000093 && this.rpt_id != 3000094 && this.rpt_id != 3000095 && this.rpt_id != 3000078 && this.rpt_id != 3000071 && this.rpt_id != 3000072 && this.rpt_id != 3000073 && this.rpt_id  != 3000063 &&  this.rpt_id != 3000037 && this.rpt_id != 3000057 && this.slctdmnth != undefined && this.slctdpartner == undefined && this.cal_mnts != '' && this.caf_nu == undefined && this.rpt_id != '3000021' && this.rpt_id != 3000025 && this.rpt_id != 3000037 && this.rpt_id != 3000057 && this.rpt_id  != 3000063 && this.rpt_id != 3000075) {

//       this.loader = true;
//       this.columnDefs = [];
//       this.rowData = [];
//       var caldData = {
//         TEXTBOX_0: this.cal_mnts != undefined ? this.cal_mnts : 0,
//         MONTH_0: this.slctdmnth != undefined ? this.slctdmnth : 0,
//         YEAR_0: this.slctdyear != undefined ? this.slctdyear : 0,
//         YEAR_1: this.slctdyear != undefined ? this.slctdyear : 0,
//         'CAF TYPE_0': this.caf_type != undefined ? this.caf_type : 0,
//         FREQUENCY_0: this.frqncy != undefined ? this.frqncy : 0,
//       }
//       this.pstdetails[0] = this.rpt_id;
//       this.pstdetails[1] = Object.keys(caldData).map(key => ({ type: key, value: caldData[key] }));
//       const rte = `sql/postTodefaultValues`;
//       console.log(this.pstdetails);
//       this.apiSrvc.create(this.pstdetails, rte).subscribe((res) => {
//         if (res['status'] == 200) {
//           this.loader = false;
//           this.rowData = res['data'][0];
//           this.rowpdfdata = res['data'][0];
//           this.rowexceldata = res['data'][0];
//           this.columnDefs = res['data'][1];
//           console.log(this.columnDefs);
//           if (this.rpt_id == 11) {
//             this.lmoActivities(this.rowData);
//           }
//         }
//       })
//     } else if (this.rpt_id == 2000016 && (this.cal_mnts == undefined || this.cal_mnts == '')) {
//       this.snackBar.open("Please Enter Call Duration Minutes", 'End now', {
//         duration: 3000,
//         horizontalPosition: this.horizontalPosition,
//         verticalPosition: this.verticalPosition,
//       });
//     }

//     if ((this.slctdmnth != undefined && this.rpt_id != 3000001 &&  this.rpt_id != 3000075 && this.rpt_id  != 3000063 &&  this.rpt_id != 3000070 && this.rpt_id != 3000086 && this.rpt_id != 3000087 && this.rpt_id != 3000088 && this.rpt_id != 3000090 && this.rpt_id != 3000092 && this.rpt_id != 3000093 && this.rpt_id != 3000094 && this.rpt_id != 3000095 && this.rpt_id != 3000078 && this.rpt_id != 3000071 && this.rpt_id != 3000072 && this.rpt_id != 3000073 && this.rpt_id != 3000027 && this.rpt_id != 3000091 && this.rpt_id != 3000048 && this.rpt_id != 3000029 &&  this.rpt_id != 3000027 && this.rpt_id != 3000091 &&  this.slctdyear != undefined && this.slctdDstrctId != undefined && this.rpt_id != 3000037 && this.rpt_id != 3000057 && this.slctdpartner == undefined && this.cal_mnts == undefined && this.frqncy == undefined && this.caf_type != undefined && this.caf_nu == undefined && this.rpt_id != 2000016 && this.rpt_id != 3000012) || (this.slctdyear != undefined && this.slctdmnth != undefined && this.caf_nu == undefined && this.slctdpartner == undefined && this.cal_mnts == undefined && this.frqncy == undefined && this.caf_type != undefined && this.rpt_id != 2000016 && this.rpt_id != 3000012 && this.rpt_id != 3000025 && this.rpt_id != 3000037 && this.rpt_id != 3000057 && this.rpt_id != 3000001 &&  this.rpt_id != 3000048 &&  this.rpt_id != 3000027 && this.rpt_id != 3000091 && this.rpt_id != 3000029 &&  this.rpt_id != 3000027 && this.rpt_id != 3000091 && this.rpt_id  != 3000063 && this.rpt_id != 3000070 && this.rpt_id != 3000086 && this.rpt_id != 3000087 && this.rpt_id != 3000088 && this.rpt_id != 3000090 && this.rpt_id != 3000092 && this.rpt_id != 3000093 && this.rpt_id != 3000094 && this.rpt_id != 3000095 && this.rpt_id != 3000078 && this.rpt_id != 3000071 && this.rpt_id != 3000072 && this.rpt_id != 3000073 && this.rpt_id != 3000075 )) {
//       this.loader = true;
//       this.columnDefs = [];
//       this.rowData = [];
//       var rvnucafdata = {
//         MONTH_0: this.slctdmnth != undefined ? this.slctdmnth : 0,
//         YEAR_0: this.slctdyear != undefined ? this.slctdyear : 0,
//         DISTRICT_0: this.slctdDstrctId != undefined ? this.slctdDstrctId : 0,
//         'CAF TYPE_0': this.caf_type != undefined ? this.caf_type : 0,
//         FREQUENCY_0: this.frqncy != undefined ? this.frqncy : 0,
//       }

//       this.rvnuDtls[0] = this.rpt_id;
//       this.rvnuDtls[1] = Object.keys(rvnucafdata).map(key => ({ type: key, value: rvnucafdata[key] }));
//       console.log(this.rvnuDtls)
//       const rte = `sql/postTodefaultValues`;
//       this.apiSrvc.create(this.rvnuDtls, rte).subscribe((res) => {
//         if (res['status'] == 200) {
//           this.loader = false;
//           this.rowData = res['data'][0];
//           this.rowpdfdata = res['data'][0];
//           this.rowexceldata = res['data'][0];
//           this.columnDefs = res['data'][1];
//         }

//         if (this.rpt_id == 3000003) {
//           this.mnthlyInvceData(this.rowpdfdata);
//         }
//       })
//     } else if (this.slctdyear != undefined && this.rpt_id  != 3000063 && this.rpt_id != 3000075 && this.rpt_id != 3000070 && this.rpt_id != 3000086 && this.rpt_id != 3000087 && this.rpt_id != 3000088 && this.rpt_id != 3000090 && this.rpt_id != 3000092 && this.rpt_id != 3000093 && this.rpt_id != 3000094 && this.rpt_id != 3000095 && this.rpt_id != 3000078 && this.rpt_id != 3000071 && this.rpt_id != 3000072 && this.rpt_id != 3000073 && this.caf_nu == undefined && this.slctdmnth == undefined && this.caf_nu != '' && this.rpt_id != 3000057 && this.rpt_id != 3000027 && this.rpt_id != 3000091) {
//       this.loader = true;
//       this.columnDefs = [];
//       this.rowData = [];
//       var rvnushredata = {
//         MONTH_0: this.slctdmnth != undefined ? this.slctdmnth : 0,
//         YEAR_0: this.slctdyear != undefined ? this.slctdyear : 0,
//         DISTRICT_0: this.slctdDstrctId != undefined ? this.slctdDstrctId : 0,
//         YEAR_1: this.slctdyear != undefined ? this.slctdyear : 0,
//       }
//       console.log(rvnushredata)
//       this.rvnuDtls[0] = this.rpt_id;
//       this.rvnuDtls[1] = Object.keys(rvnushredata).map(key => ({ type: key, value: rvnushredata[key] }));
//       const rte = `sql/postTodefaultValues`;
//       this.apiSrvc.create(this.rvnuDtls, rte).subscribe((res) => {
//         if (res['status'] == 200) {
//           this.loader = false;
//           this.rowData = res['data'][0];
//           this.rowpdfdata = res['data'][0];
//           this.rowexceldata = res['data'][0];
//           this.columnDefs = res['data'][1];
//         }
//       })
//     } else if ((this.rpt_id == 1000004 || this.rpt_id == 3000014 ||   this.rpt_id != 3000027 || this.rpt_id != 3000091 || this.rpt_id != 3000091) && (this.caf_nu == undefined || this.caf_nu == '')) {
//       this.snackBar.open("Please Enter CAF Number", 'Close', {
//         duration: 3000,
//         horizontalPosition: this.horizontalPosition,
//         verticalPosition: this.verticalPosition,
//       });
//     }

//     if (this.slctdyear != undefined && this.slctdmnth != undefined && this.rpt_id  != 3000063 && this.rpt_id != 3000075 && this.rpt_id != 3000070 && this.rpt_id != 3000086 && this.rpt_id != 3000087 && this.rpt_id != 3000088 && this.rpt_id != 3000090 && this.rpt_id != 3000092 && this.rpt_id != 3000093 && this.rpt_id != 3000094 && this.rpt_id != 3000095 && this.rpt_id != 3000078 && this.rpt_id != 3000071 && this.rpt_id != 3000072 && this.rpt_id != 3000073 &&  this.rpt_id != 3000027 && this.rpt_id != 3000091 && this.slctdpartner != undefined && this.caf_nu != '' && this.caf_nu == undefined && this.rpt_id != 3000037 && this.rpt_id != 3000057) {
//       this.loader = true;
//       this.columnDefs = [];
//       this.rowData = [];
//       var invc_hstry = {
//         YEAR_0: this.slctdyear ? this.slctdyear : 0,
//         MONTH_0: this.slctdmnth ? this.slctdmnth : 0,
//         AGENT_0: this.slctdpartner != undefined ? this.slctdpartner : 0
//       }
//       this.pstdetails[0] = this.rpt_id;
//       this.pstdetails[1] = Object.keys(invc_hstry).map(key => ({ type: key, value: invc_hstry[key] }));
//       const rte = `sql/postTodefaultValues`;
//       this.apiSrvc.create(this.pstdetails, rte).subscribe((res) => {
//         if (res['status'] == 200) {
//           this.loader = false;
//           this.rowData = res['data'][0];
//           this.rowpdfdata = res['data'][0];
//           this.rowexceldata = res['data'][0];
//           this.columnDefs = res['data'][1];
//           console.log(this.rowData);
//         }
//       })
//     }
//     if (this.caf_nu != undefined) {
//       if(this.slctdmnth == undefined || this.slctdmnth == null){
//         this.slctdmnth = 0;
//       }
//     }
//     if (this.slctdyear != undefined && this.rpt_id != 3000027 && this.rpt_id != 3000091 &&  this.rpt_id != 3000075 && this.rpt_id  != 3000063 && this.rpt_id != 3000070 && this.rpt_id != 3000086 && this.rpt_id != 3000087 && this.rpt_id != 3000088 && this.rpt_id != 3000090 && this.rpt_id != 3000092 && this.rpt_id != 3000093 && this.rpt_id != 3000094 && this.rpt_id != 3000095 && this.rpt_id != 3000078 && this.rpt_id != 3000071 && this.rpt_id != 3000072 && this.rpt_id != 3000073 && this.slctdmnth != undefined && this.caf_nu != undefined && this.caf_nu != '' && this.rpt_id != 3000037 && this.rpt_id != 3000057) {
//       this.loader = true;
//       this.columnDefs = [];
//       this.rowData = [];
//       var cal_hstry = {
//         YEAR_0: this.slctdyear,
//         MONTH_0: this.slctdmnth != undefined ? this.slctdmnth : 0,
//         CAF_0: this.caf_nu != undefined ? this.caf_nu : 0,
//         AGENT_0: this.caf_nu != undefined ? this.caf_nu : 0
//       }
//       this.pstdetails[0] = this.rpt_id;
//       this.pstdetails[1] = Object.keys(cal_hstry).map(key => ({ type: key, value: cal_hstry[key] }));
//       console.log(this.pstdetails[1])
//       const rte = `sql/postTodefaultValues`;
//       this.apiSrvc.create(this.pstdetails, rte).subscribe((res) => {
//         if (res['status'] == 200) {
//           this.loader = false;
//           this.rowData = res['data'][0];
//           this.rowpdfdata = res['data'][0];
//           this.rowexceldata = res['data'][0];
//           this.columnDefs = res['data'][1];
//           console.log(this.rowData);
//           if (this.rpt_id == '114841790497947679') {
//             let sum_upld = 1;
//             let sum_dnld = 1;
//             for (var i = 1; i <= 31; i++) {
//               sum_upld += this.rowData[0][`dy_up_${i}`];
//               sum_dnld += this.rowData[0][`dy_dw_${i}`];
//             }
//             this.rowData[0]['s_no'] = 1;
//             this.rowData[0]['upldsize'] = Math.round(((sum_upld / 1024) / 1024 / 1024));
//             this.rowData[0]['dwnldsize'] = Math.round((sum_dnld / 1024) / 1024);
//             this.rowData[0]['totalsize'] = Math.round((sum_upld / 1024) / 1024) + Math.round((sum_dnld / 1024) / 1024);
//           }
//         }
//       })
//     } else if ((this.rpt_id == 3000012) && (this.caf_nu == undefined || this.caf_nu == '')) {
//       this.snackBar.open("Please Enter CAF Number", 'Close', {
//         duration: 3000,
//         horizontalPosition: this.horizontalPosition,
//         verticalPosition: this.verticalPosition,
//       });
//     }

//     if (this.fromDate != undefined && this.toDate != undefined && this.slctdDstrctId != undefined &&  this.rpt_id != 3000075 && this.rpt_id  != 3000063 && this.rpt_id != 3000070 &&  this.rpt_id != 3000086 && this.rpt_id != 3000087 && this.rpt_id != 3000088 && this.rpt_id != 3000090 && this.rpt_id != 3000092 && this.rpt_id != 3000093 && this.rpt_id != 3000094 && this.rpt_id != 3000095 && this.rpt_id != 3000078 && this.rpt_id != 3000071 && this.rpt_id != 3000072 && this.rpt_id != 3000073) {
//       this.columnDefs = [];
//       this.rowData = [];
//       this.loader = true;
//       var frtoDstrctdata = {
//         DATE_0: this.fromDate != undefined ? moment(this.fromDate).format('YYYY-MM-DD') : 0,
//         DATE_1: this.toDate != undefined ? moment(this.toDate).format('YYYY-MM-DD') : 0,
//         DISTRICT_0: this.slctdDstrctId != undefined ? this.slctdDstrctId : 0,
//       }
//       this.pstdetails[0] = this.rpt_id;
//       this.pstdetails[1] = Object.keys(frtoDstrctdata).map(key => ({ type: key, value: frtoDstrctdata[key] }));
//       const rte = `sql/postTodefaultValues`;
//       this.apiSrvc.create(this.pstdetails, rte).subscribe((res) => {
//         if (res['status'] == 200) {
//           this.loader = false;
//           this.rowData = res['data'][0];
//           this.rowpdfdata = res['data'][0];
//           this.rowexceldata = res['data'][0];
//           this.columnDefs = res['data'][1];
//         }
//       })
//     }
//     if (this.slctdMndlId != undefined && this.rpt_id  != 3000063 && this.rpt_id != 3000027 && this.rpt_id != 3000091 &&  this.rpt_id != 3000075 && this.rpt_id != 3000070 && this.rpt_id != 3000086  && this.rpt_id != 3000087 && this.rpt_id != 3000088 && this.rpt_id != 3000090 && this.rpt_id != 3000092 && this.rpt_id != 3000093 && this.rpt_id != 3000094 && this.rpt_id != 3000095 && this.rpt_id != 3000078 && this.rpt_id != 3000071 && this.rpt_id != 3000072 && this.rpt_id != 3000073 && this.rpt_id != 3000056 && this.slctdDstrctId != undefined && this.rpt_id != 3000043 && this.rpt_id != 3000029 && this.rpt_id != 3000033 && this.rpt_id != 3000035 && this.rpt_id != '114841790497947676' && this.rpt_id != '114841790497947670' && this.std_code == undefined && this.rpt_id != 3000012 && this.rpt_id != 3000014 && this.rpt_id != 1000004 && this.rpt_id != 3000021 && this.rpt_id != 3000025 && this.rpt_id != 3000037 && this.rpt_id != 3000057 && this.rpt_id != 3000033 && this.rpt_id != 3000035 &&  this.rpt_id != 3000048 && this.rpt_id != 3000029 && this.rpt_id != 3000043 && this.rpt_id != '114841790497947677' && this.rpt_id != 3000056 && this.rpt_id != 3000027 && this.rpt_id  != 3000063 && this.rpt_id != 3000070 && this.rpt_id != 3000086 && this.rpt_id != 3000087 && this.rpt_id != 3000088 && this.rpt_id != 3000090 && this.rpt_id != 3000092 && this.rpt_id != 3000093 && this.rpt_id != 3000094 && this.rpt_id != 3000095 && this.rpt_id != 3000078 && this.rpt_id != 3000071 && this.rpt_id != 3000072 && this.rpt_id != 3000073 && this.rpt_id != 3000075) {
//       if (this.rpt_id == '114841790497947677' && (this.slctdpartner != undefined && this.slctdpartner != "") && this.slctdDstrctId != 0) {
//         this.snackBar.open("Please Select 'District and Mandal' OR LMO Code Only", 'Close', {
//           duration: 5000,
//           horizontalPosition: this.horizontalPosition,
//           verticalPosition: this.verticalPosition,
//         });
//       } else {
//         this.columnDefs = [];
//         this.rowData = [];
//         this.loader = true;
//         var detailsdata = {
//           DISTRICT_0: this.slctdDstrctId != undefined ? this.slctdDstrctId : 0,
//           MANDAL_0: this.slctdMndlId != undefined ? this.slctdMndlId : 0,
//           AGENT_0: this.slctdpartner != undefined ? this.slctdpartner : 0
//         }
//         this.pstdetails[0] = this.rpt_id;
//         this.pstdetails[1] = Object.keys(detailsdata).map(key => ({ type: key, value: detailsdata[key] }));
//         const rte = `sql/postTodefaultValues`;
//         console.log(this.pstdetails[1])
//         this.apiSrvc.create(this.pstdetails, rte).subscribe((res) => {
//           if (res['status'] == 200) {
//             this.loader = false;
//             this.rowData = res['data'][0];
//             this.rowpdfdata = res['data'][0];
//             this.rowexceldata = res['data'][0];
//             this.columnDefs = res['data'][1];
//           }
//           console.log(this.rowData);
//           this.lmo_cnt = 0;
//           this.pop_cnt = 0;
//           this.prt_cnt = 0;
//           if (this.rpt_id == '114841790497947677') {
//             this.ponWthZeroPort(this.rowData);
//           }
//         })
//       }
//     }
//     if (this.fromDate != undefined && this.toDate != undefined &&  this.rpt_id != 3000075 && this.sbscbr_cd == undefined && this.rpt_id != 3000070 && this.sbscbr_cd == undefined && this.rpt_id != 3000086 && this.rpt_id != 3000087 && this.rpt_id != 3000088 && this.rpt_id != 3000090 && this.rpt_id != 3000092 && this.rpt_id != 3000093 && this.rpt_id != 3000094 && this.rpt_id != 3000095  && this.sbscbr_cd == undefined  && this.rpt_id != 3000078 && this.rpt_id != 3000071 && this.rpt_id != 3000072 && this.rpt_id != 3000073 && this.rpt_id  != 3000063 && this.rpt_id != 3000027 && this.rpt_id != 3000091 && this.rpt_id != '114841790497947671' && this.rpt_id != 3000037 && this.rpt_id != 3000057 && this.rpt_id != 3000033 && this.rpt_id != 3000035) {
//       this.columnDefs = [];
//       this.rowData = [];
//       var datesdata = {
//         DATE_0: this.fromDate != undefined ? moment(this.fromDate).format('YYYY-MM-DD') : 0,
//         DATE_1: this.toDate != undefined ? moment(this.toDate).format('YYYY-MM-DD') : 0,
//         YEAR_0: this.slctdyear != undefined ? this.slctdyear : 0,
//         MONTH_0: this.slctdmnth != undefined ? this.slctdmnth : 0,
//       }
//       this.pstdetails[0] = this.rpt_id;
//       this.pstdetails[1] = Object.keys(datesdata).map(key => ({ type: key, value: datesdata[key] }));
//       const rte = `sql/postTodefaultValues`;
//       console.log(this.pstdetails)
//       this.apiSrvc.create(this.pstdetails, rte).subscribe((res) => {
//         if (res['status'] == 200) {
//           this.loader = false;
//           this.rowData = res['data'][0];
//           this.rowpdfdata = res['data'][0];
//           this.rowexceldata = res['data'][0];
//           this.columnDefs = res['data'][1];
//         }
//       })
//     }

//     if (this.sbscbr_cd != undefined && this.rpt_id != 3000027 && this.rpt_id != 3000091 && this.rpt_id != 3000070 && this.rpt_id != 3000086 && this.rpt_id != 3000087 && this.rpt_id != 3000088 && this.rpt_id != 3000090 && this.rpt_id != 3000092 && this.rpt_id != 3000093 && this.rpt_id != 3000094 && this.rpt_id != 3000095  && this.rpt_id != 3000078 && this.rpt_id != 3000075 && this.rpt_id != 3000071 && this.rpt_id != 3000072 && this.rpt_id != 3000073 && this.rpt_id  != 3000063 && this.fromDate != undefined && this.toDate != undefined && this.rpt_id == '114841790497947671' && this.rpt_id != 3000037 && this.rpt_id != 3000057 && this.rpt_id !=1000001) {
//       this.columnDefs = [];
//       this.rowData = [];
//       this.loader = true;
//       var sbscrdata = {
//         DATE_0: this.fromDate != undefined ? moment(this.fromDate).format('YYYY-MM-DD') : 0,
//         DATE_1: this.toDate != undefined ? moment(this.toDate).format('YYYY-MM-DD') : 0,
//         SUBSCRIBER_0: this.sbscbr_cd != undefined ? this.sbscbr_cd : 0,
//       }
//       this.pstdetails[0] = this.rpt_id;
//       this.pstdetails[1] = Object.keys(sbscrdata).map(key => ({ type: key, value: sbscrdata[key] }));
//       const rte = `sql/postTodefaultValues`;
//       console.log(this.pstdetails)
//       this.apiSrvc.create(this.pstdetails, rte).subscribe((res) => {
//         if (res['status'] == 200) {
//           this.loader = false;
//           this.rowData = res['data'][0];
//           this.rowpdfdata = res['data'][0];
//           this.rowexceldata = res['data'][0];
//           this.columnDefs = res['data'][1];
//         }
//       })
//     } else if ((this.sbscbr_cd == undefined || this.sbscbr_cd == '') && this.rpt_id == '114841790497947671') {
//       this.snackBar.open("Please Enter Subscriber Code", 'Close', {
//         duration: 3000,
//         horizontalPosition: this.horizontalPosition,
//         verticalPosition: this.verticalPosition,
//       });
//     }
//     if ((this.slctdmnth && this.rpt_id != 3000037 && this.rpt_id != 3000066 &&  this.rpt_id != 3000075 && this.rpt_id != 3000070 &&  this.rpt_id != 3000086 && this.rpt_id != 3000087 && this.rpt_id != 3000088 && this.rpt_id != 3000090 && this.rpt_id != 3000092 && this.rpt_id != 3000093 && this.rpt_id != 3000094 && this.rpt_id != 3000095 && this.rpt_id != 3000078 && this.rpt_id != 3000071 && this.rpt_id != 3000072 && this.rpt_id != 3000073 && this.rpt_id  != 3000063 && this.rpt_id != 3000065 && this.rpt_id != 3000027 && this.rpt_id != 3000091 && this.rpt_id != 3000057 && this.slctdyear && this.slctdDstrctId && this.slctdpartner == undefined && this.cal_mnts == undefined && this.frqncy == undefined && this.caf_type == undefined) || (this.slctdyear && this.slctdmnth && this.caf_nu == undefined && this.slctdpartner == undefined && this.cal_mnts == undefined && this.frqncy == undefined && this.caf_type == undefined && this.rpt_id != 3000037 && this.rpt_id != 3000057 && this.rpt_id != 3000027 && this.rpt_id != 3000091 && this.rpt_id  != 3000063 && this.rpt_id != 3000065 && this.rpt_id != 3000066 && this.rpt_id != 3000070 &&  this.rpt_id != 3000086 && this.rpt_id != 3000087 && this.rpt_id != 3000088 && this.rpt_id != 3000090 && this.rpt_id != 3000092 && this.rpt_id != 3000093 && this.rpt_id != 3000094 && this.rpt_id != 3000095 && this.rpt_id != 3000078 && this.rpt_id != 3000071 && this.rpt_id != 3000072 && this.rpt_id != 3000073 && this.rpt_id != 3000075)) {
//      console.log("i cameeeeeeeeee");
//       this.loader = true;
//       this.columnDefs = [];
//       this.rowData = [];
//       var rvnucafdata = {
//         MONTH_0: this.slctdmnth != undefined ? this.slctdmnth : 0,
//         YEAR_0: this.slctdyear != undefined ? this.slctdyear : 0,
//         DISTRICT_0: this.slctdDstrctId != undefined ? this.slctdDstrctId : 0,
//         'CAF TYPE_0': this.caf_type != undefined ? this.caf_type : 0,
//         FREQUENCY_0: this.frqncy != undefined ? this.frqncy : 0,
//       }
//       this.rvnuDtls[0] = this.rpt_id;
//       this.rvnuDtls[1] = Object.keys(rvnucafdata).map(key => ({ type: key, value: rvnucafdata[key] }));
//       console.log(this.rvnuDtls)
//       const rte = `sql/postTodefaultValues`;
//       this.apiSrvc.create(this.rvnuDtls, rte).subscribe((res) => {
//         if (res['status'] == 200) {
//           this.loader = false;
//           this.rowData = res['data'][0];
//           this.rowpdfdata = res['data'][0];
//           this.rowexceldata = res['data'][0];
//           this.columnDefs = res['data'][1];
//         }
//       })
//     }
//     if ((this.slctdDstrctId && this.rpt_id != 3000027 && this.rpt_id != 3000091 && this.rpt_id != 3000070 && this.rpt_id != 3000086 && this.rpt_id != 3000087 && this.rpt_id != 3000088 && this.rpt_id != 3000090 && this.rpt_id != 3000092 && this.rpt_id != 3000093 && this.rpt_id != 3000094 && this.rpt_id != 3000095 && this.rpt_id != 3000078 && this.rpt_id != 3000075 && this.rpt_id != 3000071 && this.rpt_id != 3000072 && this.rpt_id != 3000073 && this.rpt_id  != 3000063 && this.slctdMndlId && this.std_code != undefined) || (this.slctdDstrctId && this.slctdyear == undefined && this.slctdmnth == undefined && this.std_code != undefined && this.rpt_id != 3000037 && this.rpt_id != 3000057 && this.rpt_id != 3000027 && this.rpt_id != 3000091 && this.rpt_id  != 3000063 && this.rpt_id != 3000070 && this.rpt_id != 3000086 && this.rpt_id != 3000087 && this.rpt_id != 3000088 && this.rpt_id != 3000090 && this.rpt_id != 3000092 && this.rpt_id != 3000093 && this.rpt_id != 3000094 && this.rpt_id != 3000095  && this.rpt_id != 3000078 && this.rpt_id != 3000071 && this.rpt_id != 3000072 && this.rpt_id != 3000073 && this.rpt_id != 3000075)) {
//       this.loader = true;
//       this.columnDefs = [];
//       this.rowData = [];
//       var dstrctMndldata = {
//         DISTRICT_0: this.slctdDstrctId,
//         MANDAL_0: this.slctdMndlId != undefined ? this.slctdMndlId : 0,
//         STD_CODE_0: this.std_code != undefined ? this.std_code.std_cd : 0,
//         PHONE_0: 0
//       }
//       this.dstMndlLst[0] = this.rpt_id;
//       this.dstMndlLst[1] = Object.keys(dstrctMndldata).map(key => ({ type: key, value: dstrctMndldata[key] }));
//       const rte = `sql/postTodefaultValues`;
//       this.apiSrvc.create(this.dstMndlLst, rte).subscribe((res) => {
//         if (res['status'] == 200) {
//           this.loader = false;
//           this.rowData = res['data'][0];
//           this.rowpdfdata = res['data'][0];
//           this.rowexceldata = res['data'][0];
//           this.columnDefs = res['data'][1];
//         }
//       })
//     }
//     if (((this.slctdDstrctId || this.slctdDstrctId == 0 && this.rpt_id  != 3000063 && this.rpt_id != 3000070 && this.rpt_id != 3000086 && this.rpt_id != 3000087 && this.rpt_id != 3000088 && this.rpt_id != 3000090 && this.rpt_id != 3000092 && this.rpt_id != 3000093 && this.rpt_id != 3000094 && this.rpt_id != 3000095 && this.rpt_id != 3000078 && this.rpt_id != 3000075 && this.rpt_id != 3000071 && this.rpt_id != 3000072 && this.rpt_id != 3000073 && this.rpt_id  != 3000068 && this.rpt_id != 3000027 && this.rpt_id != 3000091 && this.rpt_id != 3000056 && this.rpt_id != 3000033 && this.rpt_id != 3000035 && this.rpt_id != 3000037 && this.rpt_id != 3000057 && this.rpt_id != 1000002 && this.rpt_id != 1000003 && this.rpt_id != 8 && this.rpt_id != 114841790497947689 && this.rpt_id != 3000018 && this.rpt_id != 3000043 && this.rpt_id != 3000051 && this.rpt_id !=  3000052 && this.rpt_id != '114841790497947677' && this.std_code == undefined) && this.slctdyear == undefined && this.slctdmnth == undefined) && (this.slctdMndlId || this.slctdMndlId == 0 && this.rpt_id != '114841790497947677') && this.std_code == undefined && this.rpt_id != 3000025 && this.rpt_id != 3000037 && this.rpt_id != 3000057 && this.rpt_id != 3000033 && this.rpt_id != 3000035 && this.rpt_id != 1000002  && this.rpt_id != 1000003 && this.rpt_id != 8 && this.rpt_id != 114841790497947689 && this.rpt_id != 3000018 && this.rpt_id != 3000043 && this.rpt_id != 3000051 && this.rpt_id !=  3000052 && this.rpt_id != 3000027 && this.rpt_id != 3000091 && this.rpt_id != 3000056 && this.rpt_id  != 3000063 && this.rpt_id  != 3000068 && this.rpt_id != 3000070 && this.rpt_id != 3000086 && this.rpt_id != 3000087 && this.rpt_id != 3000088 && this.rpt_id != 3000090 && this.rpt_id != 3000092 && this.rpt_id != 3000093 && this.rpt_id != 3000094 && this.rpt_id != 3000095 && this.rpt_id != 3000078 && this.rpt_id != 3000071 && this.rpt_id != 3000072 && this.rpt_id != 3000073 && this.rpt_id != 3000075) {
//       this.loader = true;
//       this.columnDefs = [];
//       this.rowData = [];
//       var bankdata = {
//         DISTRICT_0: this.slctdDstrctId != undefined ? this.slctdDstrctId : 0,
//         MANDAL_0: this.slctdMndlId != undefined ? this.slctdMndlId : 0,
//         // CARD_0: this.crd_id != undefined ? this.crd_id : 0
//       }
//       this.msolmosMstrData[0] = this.rpt_id;
//       this.msolmosMstrData[1] = Object.keys(bankdata).map(key => ({ type: key, value: bankdata[key] }));
//       console.log(this.msolmosMstrData)
//       const rte = `sql/postTodefaultValues`;
//       this.apiSrvc.create(this.msolmosMstrData, rte).subscribe((res) => {
//         if (res['status'] == 200) {
//           this.loader = false;
//           this.rowData = res['data'][0];
//           this.rowpdfdata = res['data'][0];
//           this.rowexceldata = res['data'][0];
//           this.columnDefs = res['data'][1];
//         }
//       })
//     }

//     if ((this.slctdyear != undefined &&  this.rpt_id != 3000027 && this.rpt_id != 3000091 && this.rpt_id != 3000075 && this.rpt_id != 3000070 && this.rpt_id != 3000086 && this.rpt_id != 3000087 && this.rpt_id != 3000088 && this.rpt_id != 3000090 && this.rpt_id != 3000092 && this.rpt_id != 3000093 && this.rpt_id != 3000094 && this.rpt_id != 3000095 && this.rpt_id != 3000078 && this.rpt_id != 3000071 && this.rpt_id != 3000072 && this.rpt_id != 3000073 && this.rpt_id  != 3000063 && this.rpt_id != 3000048 && this.rpt_id != 3000043 && this.caf_type != undefined && this.slctdmnth != undefined && this.rpt_id != 3000037 && this.rpt_id != 3000057 && this.cal_mnts == undefined && this.rpt_id != 2000016 && this.rpt_id != 3000012 && this.rpt_id != 3000014) || (this.slctdyear != undefined && this.caf_type != undefined && this.slctdmnth != undefined && this.frqncy != undefined && this.cal_mnts == undefined && this.rpt_id != 2000016 && this.rpt_id != 3000012 && this.rpt_id != 3000014 && this.rpt_id != 3000037 && this.rpt_id != 3000057 &&  this.rpt_id != 3000048 && this.rpt_id != 3000043 && this.rpt_id != 3000027 && this.rpt_id  != 3000063 && this.rpt_id != 3000070 && this.rpt_id != 3000086 && this.rpt_id != 3000087 && this.rpt_id != 3000088 && this.rpt_id != 3000090 && this.rpt_id != 3000092 && this.rpt_id != 3000093 && this.rpt_id != 3000094 && this.rpt_id != 3000095 && this.rpt_id != 3000078 && this.rpt_id != 3000071 && this.rpt_id != 3000072 && this.rpt_id != 3000073 && this.rpt_id != 3000075 )) {
//       this.columnDefs = [];
//       this.rowData = [];
//       this.loader = true;
//       let frqncyData = {
//         YEAR_0: this.slctdyear != undefined ? this.slctdyear : 0,
//         MONTH_0: this.slctdmnth != undefined ? this.slctdmnth : 0,
//         'CAF TYPE_0': this.caf_type != undefined ? this.caf_type : 0,
//         FREQUENCY_0: this.frqncy != undefined ? this.frqncy : 0,
//         DISTRICT_0: this.slctdDstrctId != undefined ? this.slctdDstrctId : 0,
//       }
//       this.pstdetails[0] = this.rpt_id;
//       this.pstdetails[1] = Object.keys(frqncyData).map(key => ({ type: key, value: frqncyData[key] }));
//       const rte = `sql/postTodefaultValues`;
//       console.log(this.pstdetails)
//       this.apiSrvc.create(this.pstdetails, rte).subscribe((res) => {
//         if (res['status'] == 200) {
//           this.loader = false;
//           this.rowData = res['data'][0];
//           this.rowpdfdata = res['data'][0];
//           this.rowexceldata = res['data'][0];
//           this.columnDefs = res['data'][1];
//           console.log(this.columnDefs);
//         }
//       })
//     }

//     if (this.fltrDate && this.rpt_id != 3000043) {
//       this.columnDefs = [];
//       this.rowData = [];
//       this.loader = true;
//       let fltrdata = {
//         DATE_0: this.fltrDate != undefined ? moment(this.fltrDate).format('YYYY-MM-DD') : 0,
//       }
//       this.pstdetails[0] = this.rpt_id;
//       this.pstdetails[1] = Object.keys(fltrdata).map(key => ({ type: key, value: fltrdata[key] }));
//       const rte = `sql/postTodefaultValues`;
//       console.log(this.pstdetails)
//       this.apiSrvc.create(this.pstdetails, rte).subscribe((res) => {
//         if (res['status'] == 200) {
//           this.loader = false;
//           this.rowData = res['data'][0];
//           this.rowpdfdata = res['data'][0];
//           this.rowexceldata = res['data'][0];
//           this.columnDefs = res['data'][1];
//         }
//       })
//     }
//   }
empDtls() {
  this.loader = true;
    this.slctddays = new Date(this.slctdyear, this.slctdmnth, 0).getDate();
  var postData = {
    YEAR_0: this.slctdyear != undefined ? this.slctdyear : 0,
    YEAR_1: this.slctdyear != undefined ? this.slctdyear : 0,
    MONTH_0: this.slctdmnth != undefined ? this.slctdmnth : 0,
	MONTH_1: this.slctdmnth != undefined ? this.slctdmnth : 0,
	DAYS: this.slctddays != undefined ? this.slctddays : 0,
    AGENT_0: this.slctdpartner != undefined ? this.slctdpartner : 0,
    DISTRICT_0: this.slctdDstrctId != undefined ? this.slctdDstrctId : 0,
    MANDAL_0: this.slctdMndlId != undefined ? this.slctdMndlId : 0,
    DATE_0: this.fromDate != undefined ? moment(this.fromDate).format('YYYY-MM-DD') : this.fltrDate != undefined ? moment(this.fltrDate).format('YYYY-MM-DD') : 0,
    DATE_1: this.toDate != undefined ? moment(this.toDate).format('YYYY-MM-DD') : 0,
    // DATE_2: this.fltrDate != undefined ? moment(this.fltrDate).format('YYYY-MM-DD') : 0,
    STATUS_0: this.slctdStatusId != undefined ? this.slctdStatusId : 0,
    'CITY/ULB_0': this.slctVlgId != undefined ? this.slctVlgId : 0,
    'CAF TYPE_0': this.caf_type != undefined ? this.caf_type : 0,
    PACKAGE_0:this.slctpckId != undefined ? this.slctpckId : 0,
    TYPE_0: this.caf_type != undefined ? this.caf_type : 0,
    TEXTBOX_0: this.cal_mnts != undefined ? this.cal_mnts : 0,
    FREQUENCY_0: this.frqncy != undefined ? this.frqncy : 0,
    CAF_0: this.caf_nu != undefined ? this.caf_nu : 0,
    SUBSCRIBER_0: this.sbscbr_cd != undefined ? this.sbscbr_cd : 0,
    STD_CODE_0: this.std_code != undefined ? this.std_code.std_cd : 0,
    PHONE_0: 0
  }
  this.pstdetails[0] = this.rpt_id;
  this.pstdetails[1] = Object.keys(postData).map(key => ({ type: key, value: postData[key] }));
  console.log(this.pstdetails);
  const rte = `sql/postTodefaultValues`;
  this.apiSrvc.create(this.pstdetails, rte).subscribe((res) => {
    if (res['status'] == 200) {
      this.loader = false;
      this.rowData = []
      this.rowData = res['data'][0];
      this.rowpdfdata = []
      this.rowpdfdata = res['data'][0];
      this.rowexceldata =[]
      this.rowexceldata = res['data'][0];
      this.columnDefs=[]
      this.columnDefs = res['data'][1];
      console.log(this.rowData);
      console.log(this.rowexceldata);
      console.log(this.rowpdfdata);
      console.log(this.columnDefs);
      this.jsondata = true;
    }
  })
 
}
  
  prtwseRpt() {
    if (this.slctdport == 1 && this.rpt_id == 18) {
      this.router.navigate(['/admin/reports/custom/' + '114841790497947676']);
    } else if (this.slctdport == 2 && this.rpt_id == '114841790497947676') {
      this.router.navigate(['/admin/reports/custom/' + 18]);
    }
  }
  downloadPdf($event): void {
    var myArray = []
    this.isPdfDwnLd = $event;
    this.pdfPagesize = 'A3';
    this.PdfpageOrientation = 'landscape';
    this.pdfheaderRows = 1;
    this.ReportHeader = this.fltrsdata[0].rpt_nm;
    this.pdftableData = this.rowpdfdata;
    for (var r = 0; r < this.cloumdata.length; r++) {
      for (var m = 0; m < this.rowpdfdata.length; m++) {
        var keysdata = Object.keys(this.rowpdfdata[m])
        for (var k = 0; k < keysdata.length; k++) {
          if (keysdata[k] == this.cloumdata[r].field) {
            var key = this.cloumdata[r].headerName;
            var obj = {};
            obj[key] = this.rowpdfdata[m][keysdata[k]];
            Object.assign(this.rowpdfdata[m], obj);
          }
        }
      }
    }
    for (var s = 0; s < this.cloumdata.length; s++) {
      myArray.push(this.cloumdata[s].headerName);
    }

    this.tableHeadersWthDataValues = myArray;
    this.fileName = this.fltrsdata[0].pdf_nm;
  }

  onCellClick(clmns, event) {
    console.log(clmns)
    console.log(this.drlDwnFrmAnthrPge);
    console.log(this.rpt_id);
    this.rowselected = event.data;
    console.log(this.rowselected);
    console.log(event.column.dataField);
    console.log(event.column.caption);
    if (this.drlDwnFrmAnthrPge == true) {
      this.prmsdta = [];
      this.drlSelected = [];
      if (this.rpt_id == 3000029 && event.column.dataField == 'TOTAL_CAF_COUNT') {
        this.drlSelected.push({ type: 'AGENT_0', value: this.rowselected.agnt_id, compare: 'AGENT_0' })
        console.log(this.drlSelected[0]);
        this.prmsdta.push(this.drlSelected[0])
        console.log(this.prmsdta);
        if (this.selectedIndex == 0) {
          const allParams = this.route.snapshot.params;
          const param1 = allParams.rptid
          this.href = param1;
          if (this.clickArray.length == 0) {
            this.clickArray.push({
              index: this.selectedIndex,
              report_id: allParams,
              dist_id: 0,
              label: 'HOME'
            })
            console.log(this.clickArray);
            localStorage.setItem('OLTDATA', JSON.stringify(this.clickArray));
          }
          this.selectedIndex++;
          this.shwBredCum = true;
        }
        if (this.clickArray.length <= 6) {
          setTimeout(() => {
            const allParams = this.route.snapshot.params;
            const param1 = allParams.rptid
            this.href = param1;
            this.clickArray.push({
              index: this.selectedIndex,
              report_id: allParams,
              dist_id: event.data.dstrct_id ? event.data.dstrct_id : event.data.instl_dstrct_id ? event.data.dstrt_id : event.data.dstrt_id,
              type: this.prmsdta.length > 0 && this.prmsdta[0].type == 'caf_type_id' ? this.rowselected.caf_type_id : false,
              value: this.rowselected.agnt_id,
              prdct_id: this.rowselected.prdct_id,
              mndl_nu: this.rowselected != undefined ? this.rowselected.mndl_nu : this.slctdMndlId,
              olt_prt_nm: this.rowselected.olt_prt_nm,
              sbstn_id: this.rowselected.sbstn_id,
              olt_id: this.rowselected.olt_id,
              olt_slt_id: this.rowselected.olt_slt_id,
              splt_id: this.rowselected.splt_id,
              cstmr_id: this.rowselected.cstmr_id,
              label: this.rowselected.olt_prt_nm != undefined && this.rpt_id == 17 ? 'Port ' + this.sbstn_field : this.sbstn_field,
              year: this.rowselected.invce_yr,
              month: Number.isInteger(this.rowselected.invce_mm) == true ? this.rowselected.invce_mm : this.rowselected.invce_month != undefined ? this.rowselected.invce_month : this.rowselected.invoice_month,
              caf_invce_id: this.rowselected.caf_invce_id != undefined ? this.rowselected.caf_invce_id : ''
            })
            this.slctdDstrctId = event.data.dstrct_id
            this.selectedIndex++;
            this.localStrData = this.clickArray
            localStorage.setItem('OLTDATA', JSON.stringify(this.localStrData));
          }, 2000);
        }
        for (var m = 0; m < clmns.length; m++) {
          if ((event.column.dataField == clmns[m].field) && clmns[m].reporturl != "" && clmns[m].reporturl != null) {
         this.router.navigate(['/admin/reports/custom/' + clmns[m].reporturl], { queryParams: { "paramsdata": JSON.stringify(this.prmsdta) }, skipLocationChange: true })
          }
        }
      }

    }
    if (this.rpt_id == 3000063 && (event.column.dataField == 'power' || event.column.dataField == 'UPS' || event.column.dataField == 'Fiber' || event.column.dataField == 'NetworkElements')) {
      this.prmsdta = [];
      this.drlSelected = [];
      console.log("allllllllllllllllllllllllllllllll");
      console.log(this.fromDate);
      console.log(this.toDate);
      if(this.fromDate && this.toDate){
        if(event.column.dataField == 'power'){
          this.drlSelected.push({ type: 'CATEGORY_0', value: 1, compare: 'CATEGORY_0'},
          { type: 'DATE_0', value: moment(this.fromDate).format('YYYY-MM-DD'), compare: 'DATE_0'},
          { type: 'DATE_1', value: moment(this.toDate).format('YYYY-MM-DD'), compare: 'DATE_1'})
        }
        if(event.column.dataField == 'UPS'){
          this.drlSelected.push({ type: 'CATEGORY_0', value: 2, compare: 'CATEGORY_0'},
          { type: 'DATE_0', value: moment(this.fromDate).format('YYYY-MM-DD'), compare: 'DATE_0'},
          { type: 'DATE_1', value: moment(this.toDate).format('YYYY-MM-DD'), compare: 'DATE_1'})
        }
        if(event.column.dataField == 'Fiber'){
          this.drlSelected.push({ type: 'CATEGORY_0', value: 3, compare: 'CATEGORY_0'},
          { type: 'DATE_0', value: moment(this.fromDate).format('YYYY-MM-DD'), compare: 'DATE_0'},
          { type: 'DATE_1', value: moment(this.toDate).format('YYYY-MM-DD'), compare: 'DATE_1'})
        }
        if(event.column.dataField == 'NetworkElements'){
          this.drlSelected.push({ type: 'CATEGORY_0', value: 4, compare: 'CATEGORY_0'},
          { type: 'DATE_0', value: moment(this.fromDate).format('YYYY-MM-DD'), compare: 'DATE_0'},
          { type: 'DATE_1', value: moment(this.toDate).format('YYYY-MM-DD'), compare: 'DATE_1'})
        }
       
      }
      else{
        if(event.column.dataField == 'power'){
          this.drlSelected.push({ type: 'CATEGORY_0', value: 1, compare: 'CATEGORY_0'})
        }
        if(event.column.dataField == 'UPS'){
          this.drlSelected.push({ type: 'CATEGORY_0', value: 2, compare: 'CATEGORY_0'})
        }
        if(event.column.dataField == 'Fiber'){
          this.drlSelected.push({ type: 'CATEGORY_0', value: 3, compare: 'CATEGORY_0'})
        }
        if(event.column.dataField == 'NetworkElements'){
          this.drlSelected.push({ type: 'CATEGORY_0', value: 4, compare: 'CATEGORY_0'})
        }
        
      }
      console.log(this.drlSelected);
      this.prmsdta.push(this.drlSelected);
      console.log(this.prmsdta[0]);
      this.router.navigate(['/admin/reports/custom/' + 3000064], { queryParams: { "paramsdata": JSON.stringify(this.prmsdta[0]) }, skipLocationChange: true })
    }
   
    if (this.rowselected && this.drlDwnFrmAnthrPge != true && this.rpt_id != 3000063) {
      console.log(this.rowselected)
      this.datafield = event.column.dataField;
      this.sbstn_field = event.column.caption
      this.selectedkeys = Object.keys(this.rowselected).map(key => ({ type: key, value: this.rowselected[key], compare: '' }));
      console.log(this.selectedkeys);
      this.prmsdta = [];
      this.pdrpdwndata = [];
      for (var c = 0; c < clmns.length; c++) {
        if (event.column.dataField == clmns[c].field) {

          if (clmns[c].reporturl != "" && clmns[c].reporturl != null) {
            if (clmns[c].reportparms != "" && clmns[c].reportparms != null) {
              var str_array = clmns[c].reportparms.split(',');
              var str_array_one = clmns[c].reportFilterparms.split(',');
              for (var k = 0; k < this.selectedkeys.length; k++) {
                for (var s = 0; s < str_array.length; s++) {
                  if (str_array[s].replace(/ +/g, "") == this.selectedkeys[k].type) {
                    this.selectedkeys[k].compare = str_array_one[s]
                    this.prmsdta.push(this.selectedkeys[k]);
                    console.log(this.prmsdta)
                  }
                  if (s + 1 == str_array.length) {
                    if (k + 1 == this.selectedkeys.length) {
                      if (this.fromDate && this.toDate) {
                        this.pdrpdwndata.push({ 'DATE_0': moment(this.fromDate).format('YYYY-MM-DD'), 'DATE_1': moment(this.toDate).format('YYYY-MM-DD') })
                        var paramsSlctd = this.pdrpdwndata[0]
                        this.selectedParamskeys = Object.keys(paramsSlctd).map(keys => ({ type: '', value: paramsSlctd[keys], compare: keys }));
                        for (var p = 0; p < this.selectedParamskeys.length; p++) {
                          this.prmsdta.push(this.selectedParamskeys[p])
                        }
                      }
                      this.router.navigate(['/admin/reports/custom/' + clmns[c].reporturl], { queryParams: { "paramsdata": JSON.stringify(this.prmsdta) }, skipLocationChange: true })
                    }
                  }
                }
              }
              if (this.selectedIndex == 0) {
                const allParams = this.route.snapshot.params;
                const param1 = allParams.rptid
                this.href = param1;
                if (this.clickArray.length == 0) {
                  this.clickArray.push({
                    index: this.selectedIndex,
                    report_id: allParams,
                    dist_id: 0,
                    label: 'HOME'
                  })
                  console.log(this.clickArray);
                  localStorage.setItem('OLTDATA', JSON.stringify(this.clickArray));
                }
                this.selectedIndex++;
                this.shwBredCum = true;
              }
              if (this.clickArray.length <= 6) {
                setTimeout(() => {
                  const allParams = this.route.snapshot.params;
                  const param1 = allParams.rptid
                  this.href = param1;
                  this.clickArray.push({
                    index: this.selectedIndex,
                    report_id: allParams,
                    dist_id: event.data.dstrct_id ? event.data.dstrct_id : event.data.instl_dstrct_id ? event.data.dstrt_id : event.data.dstrt_id,
                    type: this.prmsdta.length > 0 && this.prmsdta[0].type == 'caf_type_id' ? this.rowselected.caf_type_id : false,
                    value: this.rowselected.agnt_id,
                    prdct_id: this.rowselected.prdct_id,
                    mndl_nu: this.rowselected != undefined ? this.rowselected.mndl_nu : this.slctdMndlId,
                    olt_prt_nm: this.rowselected.olt_prt_nm,
                    sbstn_id: this.rowselected.sbstn_id,
                    olt_id: this.rowselected.olt_id,
                    olt_slt_id: this.rowselected.olt_slt_id,
                    splt_id: this.rowselected.splt_id,
                    cstmr_id: this.rowselected.cstmr_id,
                    label: this.rowselected.olt_prt_nm != undefined && this.rpt_id == 17 ? 'Port ' + this.sbstn_field : this.sbstn_field,
                    year: this.rowselected.invce_yr,
                    month: Number.isInteger(this.rowselected.invce_mm) == true ? this.rowselected.invce_mm : this.rowselected.invce_month != undefined ? this.rowselected.invce_month : this.rowselected.invoice_month,
                    caf_invce_id: this.rowselected.caf_invce_id != undefined ? this.rowselected.caf_invce_id : ''
                  })
                  this.slctdDstrctId = event.data.dstrct_id
                  this.selectedIndex++;
                  this.localStrData = this.clickArray
                  localStorage.setItem('OLTDATA', JSON.stringify(this.localStrData));
                }, 2000);
              }
              console.log(this.prmsdta);
            }
            else {
              this.router.navigate(['/admin/reports/custom/' + clmns[c].reporturl], { queryParams: {}, skipLocationChange: true })
            }
          }
        }
      }
    }
  }

  devCellclk(devclmns, dvclkent) {
    this.shwBtn = true;
    this.onCellClick(devclmns, dvclkent);
  }

  backtoLevel(breadcrumb) {
    this.rptParamDta = [];
    let brd_cm_fltr = [];
    let counter = 0;
    let ky_counter = 0;
    this.clickArray.filter((k) => {
      ++counter;
      if (k.label == breadcrumb.label && k.index == breadcrumb.index) {
        ky_counter = counter;
      }
    });
    for (let index = 0; index < ky_counter; index++) {
      brd_cm_fltr.push(this.clickArray[index]);
    }
    this.clickArray = brd_cm_fltr;
    if (this.clickArray.length == 1 && this.clickArray[0].label == 'HOME') {
      this.prmsdta = [];
      this.rptParamDta = 0
    } else {
      this.prmsdta = this.clickArray;
    }
    console.log(breadcrumb.report_id.rptid);
    console.log(breadcrumb.index);
    console.log(this.prmsdta);

    this.router.navigate(['/admin/reports/custom/' + breadcrumb.report_id.rptid], { queryParams: { "paramsdata": JSON.stringify(this.prmsdta) }, skipLocationChange: true });
    --this.selectedIndex;
    if (breadcrumb.index == 0) {
      localStorage.setItem('OLTDATA', '');
    } else {
      localStorage.setItem('OLTDATA', JSON.stringify(this.clickArray));
    }
  }

  onCellPrepared(colDef, e) {
    if (colDef.length > 0) {
      colDef.filter((o) => {
        if (o.drwn_in == 1 && o.drwn_txt == true) {
          if (e.column.dataField == o.field) {
            e.cellElement.style.color = 'rgb(39, 153, 234)';
            e.cellElement.style.cursor = "pointer";
          }
        }
      })
    }
  }

  mnthlyInvceData(invceData) {
    this.shwMnthlyInvceRptCrds = true;
    this.ovrall_new_caf_ct = 0;
    this.ovrall_trmnd_caf_ct = 0;
    this.ovrall_spnd_caf_ct = 0;
    this.ovrall_spnd_rsmd_caf_ct = 0;
    this.ovrall_blbe_caf_ct = 0;
    this.ovrall_tot_caf_ct = 0;
    this.ovrall_add_on_amt = 0;
    this.ovrall_add_on_apsfl_amt = 0;
    this.ovrall_add_on_mso_amt = 0;
    this.ovrall_add_on_lmo_amt = 0;
    this.ovrall_voip_amt = 0;
    this.ovrall_voip_apsfl_amt = 0;
    this.ovrall_voip_mso_amt = 0;
    this.ovrall_voip_lmo_amt = 0;

    for (let m = 0; m < invceData.length; m++) {
      let formatter = new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
      });
      this.ovrall_new_caf_ct = this.ovrall_new_caf_ct + invceData[m].tot_nw_cafs;
      this.ovrall_trmnd_caf_ct = this.ovrall_trmnd_caf_ct + invceData[m].tot_trmd_cafs;
      this.ovrall_spnd_caf_ct = this.ovrall_spnd_caf_ct + invceData[m].tot_spnd_cafs;
      this.ovrall_spnd_rsmd_caf_ct = this.ovrall_spnd_rsmd_caf_ct + invceData[m].tot_spnd_rsmd_cafs;
      this.ovrall_blbe_caf_ct = this.ovrall_blbe_caf_ct + invceData[m].tot_blng_cafs;
      this.ovrall_tot_caf_ct = this.ovrall_tot_caf_ct + invceData[m].tot_cafs;
      this.ovrall_add_on_amt = this.ovrall_add_on_amt + invceData[m].tot_add_at;
      this.ovrall_add_on_apsfl_amt = this.ovrall_add_on_apsfl_amt + invceData[m].tot_add_apsfl_shre;
      this.ovrall_add_on_mso_amt = this.ovrall_add_on_mso_amt + invceData[m].tot_add_mso_shre;
      this.ovrall_add_on_lmo_amt = this.ovrall_add_on_lmo_amt + invceData[m].tot_add_lmo_shre;
      this.ovrall_voip_amt = this.ovrall_voip_amt + invceData[m].tot_voip_at;
      this.ovrall_voip_apsfl_amt = this.ovrall_voip_apsfl_amt + invceData[m].tot_voip_apsfl_shre;
      this.ovrall_voip_mso_amt = this.ovrall_voip_mso_amt + invceData[m].tot_voip_mso_shre;
      this.ovrall_voip_lmo_amt = this.ovrall_voip_lmo_amt + invceData[m].tot_voip_lmo_shre;
    }
  }

  lmoActivities(avtivityData) {
    this.shwMnthlyrvnueRptCrds = true;
    this.tot_caf_ct = 0;
    this.tot_prtd_caf_ct = 0;
    this.tot_pd_caf_ct = 0;
    this.tot_nt_pd_caf_ct = 0;
    this.tot_bx_only_caf_ct = 0;
    this.tot_spnd_caf_ct = 0;
    this.tot_rsmed_caf_ct = 0;
    this.tot_nw_caf_ct = 0;
    this.tot_trmnd_caf_ct = 0;
    this.tot_box_chnge_ct = 0;
    this.tot_pon_chnge_ct = 0;

    for (let m = 0; m < avtivityData.length; m++) {
      let formatter = new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
      });
      this.tot_prtd_caf_ct = this.tot_prtd_caf_ct + avtivityData[m].prtd_caf_ct;
      this.tot_caf_ct = this.tot_caf_ct + avtivityData[m].caf_ct;
      this.tot_pd_caf_ct = this.tot_pd_caf_ct + avtivityData[m].pd_caf_ct;
      this.tot_nt_pd_caf_ct = this.tot_nt_pd_caf_ct + avtivityData[m].nt_pd_caf_ct;
      this.tot_bx_only_caf_ct = this.tot_bx_only_caf_ct + avtivityData[m].bx_only_caf_ct;
      this.tot_spnd_caf_ct = this.tot_spnd_caf_ct + avtivityData[m].spnd_caf_ct;
      this.tot_rsmed_caf_ct = this.tot_rsmed_caf_ct + avtivityData[m].rsmed_caf_ct;
      this.tot_nw_caf_ct = this.tot_nw_caf_ct + avtivityData[m].nw_caf_ct;
      this.tot_trmnd_caf_ct = this.tot_trmnd_caf_ct + avtivityData[m].trmnd_caf_ct;
      this.tot_box_chnge_ct = this.tot_box_chnge_ct + avtivityData[m].box_chnge_ct;
      this.tot_pon_chnge_ct = this.tot_pon_chnge_ct + avtivityData[m].pon_chnge_ct;
    }
  }

  ponWthZeroPort(zroPrtData) {
    this.shwponwthZeroCrd = true;
    let popCnt = _(zroPrtData)
      .groupBy('olt_nm')
      .map(function (item, itemId) {
        var obj = {};
        obj[itemId] = _.countBy(item, 'olt_nm')
        return obj
      }).value();
    this.pop_cnt = popCnt.length;
    let lmoCnt = _(zroPrtData)
      .groupBy('agnt_cd')
      .map(function (item, itemId) {
        var obj = {};
        obj[itemId] = _.countBy(item, 'agnt_cd')
        return obj
      }).value();
    this.lmo_cnt = lmoCnt.length;
    this.prt_cnt = zroPrtData.length;
  }

  gotoLMO(rowdata){
    // console.log(rowdata);
    this.transfereService.setLoclData('data', rowdata.data);
    this.router.navigate([`/admin/tenant/lmo/profile`]);
  }
  sanitize(url,txt){
    return this.domSanitizer.bypassSecurityTrustResourceUrl(url+'/'+txt);
  }
}