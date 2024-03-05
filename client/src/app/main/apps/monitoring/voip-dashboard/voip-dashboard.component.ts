import { Component, OnInit } from '@angular/core';
import { CrudService } from '../../crud.service';

@Component({
  selector: 'app-voip-dashboard',
  templateUrl: './voip-dashboard.component.html',
  styleUrls: ['./voip-dashboard.component.scss']
})
export class VoipDashboardComponent implements OnInit {
  voipchrgs;
  voipdaymnthlycalls;
  voipdaymnthlydata;
  voiphrlyycalls;
  voiphrlydata;
  voiphrlycalls;
  currentyear;
  years=[];
  selectedYear;
  selectedYear1;
  selectedYear2;
  today;
  selectedMonth;
  selectedDate;
  voipCurrntCallscnts=[{ct:0}];
  voipTotalCallscnts=[{usd_cnt:0},{usd_cnt_crr_mnth:0}];
  hourly=[{id:0,nm:"00-01"},{id:1,nm:"01-02"},{id:2,nm:"02-03"},{id:3,nm:"03-04"},{id:4,nm:"04-05"},{id:5,nm:"05-06"},{id:6,nm:"06-07"},{id:7,nm:"07-08"},{id:8,nm:'08-09'},{id:9,nm:"09-10"},{id:10,nm:"10-11"},{id:11,nm:"11-12"},{id:12,nm:"12-13"},{id:13,nm:"13-14"},{id:14,nm:"14-15"},{id:15,nm:"15-16"},{id:16,nm:"16-17"},{id:17,nm:"17-18"},{id:18,nm:'18-19'},{id:19,nm:"19-20"},{id:20,nm:"20-21"},{id:21,nm:"21-22"},{id:22,nm:"22-23"},{id:23,nm:"23-00"}];
  voipphnenumcnts=[{ct:0,asgnd_cnt:0,ind_cntt:0,ent_cntt:0,fncy_cnt:0}]
  months = [{ id: 1, nm: 'January' }, { id: 2, nm: 'February' }, { id: 3, nm: 'March' }, { id: 4, nm: 'April' }, { id: 5, nm: 'May' }, { id: 6, nm: 'June' }, { id: 7, nm: 'July' }, { id: 8, nm: 'August' }, { id: 9, nm: 'Spetember' }, { id: 10, nm: 'October' }, { id: 11, nm: "November" }, { id: 12, nm: 'December' }]
  formatter = new Intl.NumberFormat('en-IN', { maximumSignificantDigits: 8 })
  getHeaderDtls = function (): any { return { 'title': 'VoIP ( Voice over Internet Protocol )', 'icon': 'local_phone' }; };
  constructor(public crdSrvc: CrudService) {
    this.currentyear = (new Date()).getFullYear();
    var count = this.currentyear - 2016;
    for (var i = 0; i <= count; i++) {
      let yr = this.currentyear - i
      this.years.push(yr)
    }
    this.selectedYear = this.currentyear;
    this.selectedYear1 = this.currentyear;
    this.selectedYear2 = this.currentyear;
   }

  ngOnInit() {
    this.selectedDate = new Date();
    var date = new Date(),
    mnth = ("0" + (date.getMonth() + 1)).slice(-2),
    day = ("0" + date.getDate()).slice(-2);
  this.today = [date.getFullYear(), mnth, day].join("-");
  this.selectedMonth = date.getMonth() + 1
    this.voipcallcharges(this.selectedYear2);
    this.voipdaywisecallscnts(this.selectedYear,this.selectedMonth);
    this.voipHrlywisecallscnts(this.selectedDate);
    this.voipcardcnts();
    this.voipTotalcnts();
    this.voipCuntMnthCallscnt();
  }
  voipcallcharges(year){
    let rte1 = `dashbrd/VoipMnthlyChrgesData/${year}`
    this.crdSrvc.get(rte1).subscribe((res) => {
      console.log(res['data'])
      if (res['data'].length > 0) {
        this.voipchrgs = res['data']
      }
    })
  }
  voipdaywisecallscnts(year,mnth){
    let rte1 = `dashbrd/VoipDayWiseData/${year}/${mnth}`
    this.crdSrvc.get(rte1).subscribe((res) => {
      this.voipdaymnthlycalls =[]
      if (res['data'].length > 0) {
        this.voipdaymnthlycalls = res['data']
      }
      this.voipdaymnthlydata = [{
        value: "INCOMING CALLS",
        name: "INCOMING CALLS",
        color: "#247ba0"
      },
      {
        value: "OUTGOING CALLS",
        name: "OUTGOING CALLS",
        color: "#70c1b3"
      },
      {
        value: "IN NETWORK CALLS",
        name: "IN NETWORK CALLS",
        color: "#b2dbbf"
      },
      {
        value: "ISD CALLS",
        name: "ISD CALLS",
        color: "#f6cd61"
      },
      {
        value: "LOCAL CALLS",
        name: "LOCAL CALLS",
        color: "#ff1654"
      },
      {
        value: "STD CALLS",
        name: "STD CALLS",
        color: "#355C7D"
      }];
    })
  }

  voipHrlywisecallscnts(date){
    var dateparm = date,
    mnth = ("0" + (dateparm.getMonth() + 1)).slice(-2),
    day = ("0" + dateparm.getDate()).slice(-2);
  var hrlygetdt = [dateparm.getFullYear()+mnth+day];
    let rte1 = `dashbrd/VoipHorlyWiseData/${hrlygetdt}`
    this.crdSrvc.get(rte1).subscribe((res) => {
      this.voiphrlycalls=[]
      if (res['data'].length > 0) {
        for(let i=0; i<res['data'].length-1;i++){
          console.log(res['data'][i].hr,this.hourly[i].id,this.hourly[i].nm)
          if(res['data'][i].hr==this.hourly[i+1].id){
            res['data'][i]['hrly_nm']=this.hourly[i+1].nm        
          }
        }
        this.voiphrlycalls = res['data']
      }
      console.log(this.voiphrlycalls)

      this.voiphrlydata = [{
        value: "INCOMING CALLS",
        name: "INCOMING CALLS",
        color: "#61BB46"
      },
      {
        value: "OUTGOING CALLS",
        name: "OUTGOING CALLS",
        color: "#FDB827"
      },
      {
        value: "IN NETWORK CALLS",
        name: "IN NETWORK CALLS",
        color: "#F5821F"
      },
      {
        value: "ISD CALLS",
        name: "ISD CALLS",
        color: "#963D97"
      },
      {
        value: "LOCAL CALLS",
        name: "LOCAL CALLS",
        color: "#009DDC"
      },
      {
        value: "STD CALLS",
        name: "STD CALLS",
        color: "#F67280"
      }];
    })
  }
  customizeTooltip = (item) => {
    console.log(item)
    return {
        html:`<div style="width:150px"><div style="font-size:13px;text-align:center;text-decoration:underline;font-weight:500;margin-bottom:1px"> ${item.argumentText}</div>
        <div class='row'>
        <div class='col-8'>Up to 100Rs</div>
        <div style="font-size:15px;font-weight:500"" class='col-4'>
        ${this.formatter.format(item.point.data['ltn_100'])}
        </div>
        </div>
        <div class='row'>
        <div class='col-8' style="fon-size:13px">100 to 300Rs</div>
        <div style="font-size:15px;font-weight:500" class='col-4'>${this.formatter.format(item.point.data['100_to_300'])}</div>
        </div>
        <div class='row'>
        <div class='col-8'>300 to 500Rs</div>
        <div style="font-size:15px;font-weight:500" class='col-4'>${this.formatter.format(item.point.data['300_to_500'])}</div>
        </div>
        <div class='row'>
        <div class='col-8'>500 to 1000Rs</div>
        <div style="font-size:15px;font-weight:500" class='col-4'>${this.formatter.format(item.point.data['500_to_1000'])}</div>
        </div>
        <div class='row'>
        <div class='col-8'>1000 to 2000Rs</div>
        <div style="font-size:15px;font-weight:500" class='col-4'>${this.formatter.format(item.point.data['1000_to_2000'])}</div>
        </div>
        <div class='row'>
        <div class='col-8'> > 2000Rs</div>
        <div style="font-size:15px;font-weight:500" class='col-4'>${this.formatter.format(item.point.data['gt_2000'])}</div>
        </div></div>`
    };
  }

  customizeTooltip1 = (item) => {
    console.log(item)
    return {
        html: `<div style="width:200px">
        <div class='row'>
        <div class='col-8'>IN NETWORK CALLS</div>
        <div style="font-size:15px;font-weight:500" class='col-4'>${this.formatter.format(item.point.data['IN NETWORK CALLS'])}</div>
        </div>
        <div class='row'>
        <div class='col-8'>INCOMING CALLS</div>
        <div style="font-size:15px;font-weight:500" class='col-4'>${this.formatter.format(item.point.data['INCOMING CALLS'])}</div>
        </div>
        <div class='row'>
        <div class='col-8'>ISD CALLS</div>
        <div style="font-size:15px;font-weight:500" class='col-4'>${this.formatter.format(item.point.data['ISD CALLS'])}</div>
        </div>
        <div class='row'>
        <div class='col-8'>LOCAL CALLS</div>
        <div style="font-size:15px;font-weight:500" class='col-4'>${this.formatter.format(item.point.data['LOCAL CALLS'])}</div>
        </div>
        <div class='row'>
        <div class='col-8'>OUTGOING CALLS</div>
        <div style="font-size:15px;font-weight:500" class='col-4'>${this.formatter.format(item.point.data['OUTGOING CALLS'])}</div>
        </div>
        <div class='row'>
        <div class='col-8'>STD CALLS</div>
        <div style="font-size:15px;font-weight:500" class='col-4'>${this.formatter.format(item.point.data['STD CALLS'])}</div>
        </div></div>`
    };
  }

 

  selectmnth(){
    this.voipdaywisecallscnts(this.selectedYear,this.selectedMonth);
  }
  selectyear2(){
    this.voipcallcharges(this.selectedYear2)
  }
  addEvent(c, e) {
    console.log(e.value)
    this.voipHrlywisecallscnts(e.value);
  }
  voipcardcnts(){
    let rte1 = `dashbrd/VoipPhneNumsCnt`
    this.crdSrvc.get(rte1).subscribe((res) => {
      console.log(res['data'])
      if (res['data'].length > 0) {
        res['data'][0].ct=this.formatter.format(res['data'][0].ct);
        res['data'][0].asgnd_cnt=this.formatter.format(res['data'][0].asgnd_cnt);
        res['data'][0].ind_cntt=this.formatter.format(res['data'][0].ind_cntt);
        res['data'][0].ent_cntt=this.formatter.format(res['data'][0].ent_cntt);
        res['data'][0].fncy_cnt=this.formatter.format(res['data'][0].fncy_cnt);
        this.voipphnenumcnts = res['data']
      }
    })
  }
  voipTotalcnts(){
    let rte1 = `dashbrd/VoipUsedPhneCnt`
    this.crdSrvc.get(rte1).subscribe((res) => {
      console.log(res['data'])
      if (res['data'].length > 0) {
        res['data'][0].usd_cnt=this.formatter.format(res['data'][0][0].usd_cnt);
        res['data'][1].usd_cnt_crr_mnth=this.formatter.format(res['data'][1][0].usd_cnt_crr_mnth)
        this.voipTotalCallscnts = res['data']
      }
    })
    console.log(this.voipTotalCallscnts)
  }
  voipCuntMnthCallscnt(){
    let rte1 = `dashbrd/VoipCurrntMnthCnt`
    this.crdSrvc.get(rte1).subscribe((res) => {
      console.log(res['data'])
      if (res['data'].length > 0) {
        res['data'][0].ct=this.formatter.format(res['data'][0].ct);
        this.voipCurrntCallscnts = res['data']
      }
    })
  }
}
