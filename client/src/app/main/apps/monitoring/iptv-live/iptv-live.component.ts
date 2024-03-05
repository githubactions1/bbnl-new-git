import { Component, OnInit } from '@angular/core';
import { CrudService } from '../../crud.service';

@Component({
  selector: 'app-iptv-live',
  templateUrl: './iptv-live.component.html',
  styleUrls: ['./iptv-live.component.scss']
})
export class IptvLiveComponent implements OnInit {

  types: string[] = ["spline", "stackedspline", "fullstackedspline"];
  architecturesInfo = [];
  newregistration = [];
  iptvCardsCnts = [{ iptv_actve_sbcr_ct: 0, iptv_tdy_rgtn_ct: 0, iptv_nlne_ct: 0, iptv_nlne_ltv_ct: 0 }]
  iptvlivedshbrd: any;
  dataSource;
  seldate;
  today;
  iptvMnthdshbrd = [];
  monthdshbrdcnts;
  min;
  max;
  total;
  average;
  minmaxavg;
  selectedMonth;
  selectedDate
  years: number[] = [];
  selectedYear;
  currentyear;
  addonCrdsCnt = [{ ttl_actv_addns: 0, tdy_actv_addns: 0, tdy_deactv_addns: 0 }]
  months = [{ id: 1, nm: 'January' }, { id: 2, nm: 'February' }, { id: 3, nm: 'March' }, { id: 4, nm: 'April' }, { id: 5, nm: 'May' }, { id: 6, nm: 'June' }, { id: 7, nm: 'July' }, { id: 8, nm: 'August' }, { id: 9, nm: 'Spetember' }, { id: 10, nm: 'October' }, { id: 11, nm: "November" }, { id: 12, nm: 'December' }]
  formatter = new Intl.NumberFormat('en-IN', { maximumSignificantDigits: 8 })
  getHeaderDtls = function (): any { return { 'title': 'IPTV ( Internet Protocol television )', 'icon': 'tv' }; };
  constructor(public crdSrvc: CrudService) {
    this.currentyear = (new Date()).getFullYear();
    var count = this.currentyear - 2016;
    for (var i = 0; i <= count; i++) {
      let yr = this.currentyear - i
      this.years.push(yr)
    }
    this.selectedYear = this.currentyear;
  }

  ngOnInit() {
    this.getIptvCardCounts();
    this.selectedDate = new Date();
    var date = new Date(),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    this.today = [date.getFullYear(), mnth, day].join("-");
    this.getHoulyLiveIptvSts(this.today);
    this.selectedMonth = date.getMonth() + 1
    var month = date.getMonth() + 1
    this.getMnthlyIptvSts(month,this.selectedYear);
    this.getactvaddons();


  }
  getIptvCardCounts() {
    let rte1 = `dashbrd/iptvcrdcnts`
    this.crdSrvc.get(rte1).subscribe((res) => {
      console.log(res['data'])
      if (res['data'].length > 0) {
        res['data'][0].iptv_actve_sbcr_ct=this.formatter.format(res['data'][0].iptv_actve_sbcr_ct);
        res['data'][0].iptv_tdy_rgtn_ct=this.formatter.format(res['data'][0].iptv_tdy_rgtn_ct);
        res['data'][0].iptv_nlne_ct=this.formatter.format(res['data'][0].iptv_nlne_ct);
        res['data'][0].iptv_nlne_ltv_ct=this.formatter.format(res['data'][0].iptv_nlne_ltv_ct);
        this.iptvCardsCnts = res['data']
      }
    })
  }
  getHoulyLiveIptvSts(date) {
    let rte1 = `dashbrd/getHourlyLiveSts/${date}`
    this.crdSrvc.get(rte1).subscribe((res) => {
      for (let i = 0; i < res['data'].length; i++) {
        res['data'][i]['x-axis'] = res['data'][i]['hrly_nm'];
      }
      this.iptvlivedshbrd = res['data']
      this.architecturesInfo = [{
        value: "iptv_actve_sbcr_ct",
        name: "Subscribers Count",
        color: "#F8B195"
      },
      {
        value: "iptv_tdy_rgtn_ct",
        name: "Registration Count",
        color: "#F67280"
      },
      {
        value: "iptv_nlne_ct",
        name: "VOD Count",
        color: "#C06C84"
      },
      {
        value: "iptv_nlne_ltv_ct",
        name: "IPTV Online",
        color: "#6C5B7B"
      }];
    })
  }
  customizeTooltip = (arg) => {
    return {
        html: `<div class="row">
        <div style="font-size:12px" class="col-8">Active Subscribers</div>
        <div style="font-size:15px;font-weight:500" class="col-4">${this.formatter.format(arg.point.data.iptv_actve_sbcr_ct)} </div>
        </div>
        <div class="row">
        <div style="font-size:12px" class="col-8">Registration Count</div>
        <div style="font-size:15px;font-weight:500" class="col-4">${this.formatter.format(arg.point.data.iptv_tdy_rgtn_ct)}</div>
        </div>
        <div class="row">
        <div style="font-size:12px" class="col-8">OnlineTv Count</div>
        <div style="font-size:15px;font-weight:500" class="col-4">${this.formatter.format(arg.point.data.iptv_nlne_ltv_ct)}</div>
        </div>
        <div class="row">
        <div style="font-size:12px" class="col-8">VOD Count</div>
        <div style="font-size:15px;font-weight:500" class="col-4">${this.formatter.format(arg.point.data.iptv_nlne_ct)}</div>
        </div>`
    };
  }
  customizeTooltip1 = (arg) => {
    console.log(arg)
    return {
        html: `<div style="width:200px"><div style="font-size:13px;text-align:center;font-weight:500;margin-bottom:1px">OnlineTv Count</div>
        <div class="row">
        <div style="font-size:12px" class="col-8">Maximum</div>
        <div style="font-size:15px;font-weight:500" class="col-4">${this.formatter.format(arg.point.data.max)} </div>
        </div>
        <div class="row">
        <div style="font-size:12px" class="col-8">Minimum</div>
        <div style="font-size:15px;font-weight:500" class="col-4">${this.formatter.format(arg.point.data.min)}</div>
        </div>
        <div class="row">
        <div style="font-size:12px" class="col-8">Average</div>
        <div style="font-size:15px;font-weight:500" class="col-4">${this.formatter.format(arg.point.data.avg)}</div>
        </div>
        </div></div>`
    };
  }
  // getText(item, value): any {
  //   console.log(item)
  //   var formatter = new Intl.NumberFormat('en-IN', { maximumSignificantDigits: 3 })
  //   var actvSubval = formatter.format(item.iptv_actve_sbcr_ct);
  //   var regstnCnt = formatter.format(item.iptv_tdy_rgtn_ct);
  //   var onlineTvCnt = formatter.format(item.iptv_nlne_ltv_ct);
  //   var vodCnt = formatter.format(item.iptv_nlne_ct);
  // return  '<div style="font-size:12px" class="col-6">'+'Active Subscribers' + ' - ' + '<div style="font-size:15px" class="col-6">' + '<b>' + actvSubval +'</b>' + '</div>' + '<br>'+'<div style="font-size:12px" class="col-6">'+'Registration Count' + ' - ' + '<div style="font-size:15px" class="col-6">' + '<b>' + regstnCnt +'</b>' + '</div>'+ '<br>'+'<div style="font-size:12px" class="col-6">'+'OnlineTv Count' + ' - ' + '<div style="font-size:15px" class="col-6">' + '<b>' + onlineTvCnt +'</b>' + '</div>'+ '</div>'+ '<br>'+'<div style="font-size:12px" class="col-6">'+'VOD Count' + ' - ' + '<div style="font-size:15px" class="col-6">' + '<b>' + vodCnt +'</b>' + '</div>';
  // }
  addEvent(c, e) {
    console.log(c)
    console.log(e['value'])
    var date = new Date(e['value']),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    this.seldate = [date.getFullYear(), mnth, day].join("-");
    console.log(this.seldate)
    this.getHoulyLiveIptvSts(this.seldate)

  }
  selectmnth(){
    console.log("in month")
    this.getMnthlyIptvSts(this.selectedMonth,this.selectedYear)
  }
  getMnthlyIptvSts(mnth,year) {
    this.iptvMnthdshbrd = []
    let rte1 = `dashbrd/getMnthDysSts/${mnth}/${year}`
    this.crdSrvc.get(rte1).subscribe((res) => {
      var cntdays = res['data'][0].Days;
      var flag;
      for (let m = 1; m <= cntdays; m++) {
        for (let y = 0; y < res['data'].length; y++) {
          if (res['data'][y].iptv_dt == m) {
            this.iptvMnthdshbrd.push({ iptv_dt: m, max: res['data'][y].max, min: res['data'][y].min, avg: res['data'][y].avg })
            flag = false;
            break;
          }
          else {
            flag = true;
          }

        }
        if (flag) {
          this.iptvMnthdshbrd.push({ iptv_dt: m, max: null, min: null, avg: null })
          continue;

        }
      }
      // this.iptvMnthdshbrd = res['data']



      console.log(this.iptvMnthdshbrd)
      this.monthdshbrdcnts = [
        {
          value: "min",
          name: "Minimum",
          color: "#F5785F"
        }, {
          value: "max",
          name: "Maximum",
          color: "#F7A964"
        }, {
          value: "avg",
          name: "Average",
          color: "#4AC0D5"
        }];
    })


  }
  getactvaddons(){
    let rte1 = `dashbrd/Addonscnts`
    this.crdSrvc.get(rte1).subscribe((res) => {
      console.log(res['data'])
      if (res['data'].length > 0) {
        res['data'][0].ttl_actv_addns=this.formatter.format(res['data'][0].ttl_actv_addns);
        res['data'][0].tdy_actv_addns=this.formatter.format(res['data'][0].tdy_actv_addns);
        res['data'][0].tdy_deactv_addns=this.formatter.format(res['data'][0].tdy_deactv_addns);
        this.addonCrdsCnt = res['data']
      }
    })
  }
}
