import { Component, OnInit } from '@angular/core';
import { CrudService } from '../../crud.service';

@Component({
  selector: 'app-hsi-dashboard',
  templateUrl: './hsi-dashboard.component.html',
  styleUrls: ['./hsi-dashboard.component.scss']
})
export class HsiDashboardComponent implements OnInit {
  hsiDayWise;
  architecturesInfo;
  monthwisedata;
  hsiMnthWise;
  selectedYear;
  currentyear;
  years=[];
  selectedDate;
  today;
  selectedMonth
  selectedYear1;
  selectedYear2;
  hsiMnthWiseCafsCnt;
  monthwiseCafdata;
  hsiCrrntDayData=[{tdy_up:0,tdy_dwn:0},{prvs_up:0,prvs_dwn:0}];
  months = [{ id: 1, nm: 'January' }, { id: 2, nm: 'February' }, { id: 3, nm: 'March' }, { id: 4, nm: 'April' }, { id: 5, nm: 'May' }, { id: 6, nm: 'June' }, { id: 7, nm: 'July' }, { id: 8, nm: 'August' }, { id: 9, nm: 'Spetember' }, { id: 10, nm: 'October' }, { id: 11, nm: "November" }, { id: 12, nm: 'December' }]
  hsiCrrntMnthData =[{up:0,dwn:0},{up:0,dwn:0}]
  formatter = new Intl.NumberFormat('en-IN', { maximumSignificantDigits: 8 })
  getHeaderDtls = function (): any { return { 'title': 'HSI ( High Speed Internet )', 'icon': 'language' }; };

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
    var date = new Date(),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    this.today = [date.getFullYear(), mnth, day].join("-");
    this.selectedMonth = date.getMonth() + 1
    this.getHsiDayWise(this.selectedMonth,this.selectedYear);
    this.getHsiMnthWise(this.selectedYear1);
    this.getcurrntprvsmnth();
    this.getMnthWiseCafsCnt(this.selectedYear2);
    this.getcurrntprvsdays();
  }
  getHsiDayWise(mnth,year) {
    let rte1 = `dashbrd/HsidayWiseUsge/${mnth}/${year}`
    this.crdSrvc.get(rte1).subscribe((res) => {
      console.log(res['data'])
      if (res['data'].length > 0) {
        this.hsiDayWise = res['data']
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
  getHsiMnthWise(year) {
    let rte1 = `dashbrd/HsimnthWiseUsge/${year}`
    this.crdSrvc.get(rte1).subscribe((res) => {
      if (res['data'].length > 0) {
        this.hsiMnthWise = res['data']
      }
      this.monthwisedata = [{
        value: "up",
        name: "Upload",
        color: "#FFD55A"
      },
      {
        value: "dwn",
        name: "Download",
        color: "#210070"
      }];
    })
  }
  selectmnth(){
    this.getHsiDayWise(this.selectedMonth,this.selectedYear);
  }
  selectyear(){
    this.getHsiMnthWise(this.selectedYear1)
  }
  selectyear2(){
    this.getMnthWiseCafsCnt(this.selectedYear2)
  }
  customizeText = (arg: any) => {
    return arg.valueText;
}
customizeText1 = (arg: any) => {
  return {text:"Days in Month"};
}
getcurrntprvsmnth(){
  let rte1 = `dashbrd/HsiCrrntMnthCnt`
  var formatter = new Intl.NumberFormat('en-IN', { maximumSignificantDigits: 8 })
  this.crdSrvc.get(rte1).subscribe((res) => {
    if (res['data'].length > 0) {
      for(let i=0; i<res['data'].length; i++){
        res['data'][i].up = formatter.format(res['data'][i].up)+" TB";
        res['data'][i].dwn = formatter.format(res['data'][i].dwn)+" TB";
      }
      if(res['data'].length >= 2){
        this.hsiCrrntMnthData = res['data']
      }
      else if(res['data'].length == 1){
        this.hsiCrrntMnthData[0] = res['data'][0];
        this.hsiCrrntMnthData[1] = {up:0,dwn:0}
      }
    }
    console.log(this.hsiCrrntMnthData)
  })
}
getcurrntprvsdays(){
  let rte1 = `dashbrd/HsitdyprvsDayCnt`
  var formatter = new Intl.NumberFormat('en-IN', { maximumSignificantDigits: 8 })
  this.crdSrvc.get(rte1).subscribe((res) => {
    console.log(res['data'])
    if (res['data'].length > 0) {
      res['data'][0]['tdy_up'] = formatter.format(res['data'][0][0].tdy_up)+" TB";
      res['data'][0]['tdy_dwn'] = formatter.format(res['data'][0][0].tdy_dwn)+" TB";
      res['data'][1]['prvs_up'] = formatter.format(res['data'][1][0].prvs_up)+" TB";
      res['data'][1]['prvs_dwn'] = formatter.format(res['data'][1][0].prvs_dwn)+" TB";
    this.hsiCrrntDayData = res['data'];
    console.log(this.hsiCrrntDayData)

    }
  })
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
getMnthWiseCafsCnt(year){
  let rte1 = `dashbrd/HsiMnthWiseUsgCafs/${year}`
  this.crdSrvc.get(rte1).subscribe((res) => {
    if (res['data'].length > 0) {
      this.hsiMnthWiseCafsCnt = res['data'];
      this.monthwiseCafdata = [{
        value: "up",
        name: "Upload",
        color: "#FFD55A"
      },
      {
        value: "dwn",
        name: "Download",
        color: "#210070"
      }];
    }
    })
}
customizeTooltip1 = (info: any) => {
  return {
      html: `<div><div class='tooltip-header' style='text-align:center;text-decoration:underline;font-size:18px;font-weight:500;margin-bottom:1px'>
          ${info.argumentText}</div>
          <div class='tooltip-body'><div class='row'><div class='series-name col-8' style='font-size:13px'>
          50 To 100GB
          </div><div class='value-text col-4' style='font-size:13px;font-weight:500'>
          ${this.formatter.format(info.point.data['50_TO_100_D'])}
          </div></div><div class='row'><div class='series-name col-8' style='font-size:13px'>
          100 To 200GB
          </div><div class='value-text col-4' style='font-size:13px;font-weight:500'>
          ${this.formatter.format(info.point.data['100_TO_200_D'])}
          </div></div><div class='row'><div class='series-name col-8' style='font-size:13px'>
          ABOVE 200GB
          </div><div class='value-text col-4' style='font-size:13px;font-weight:500'>
          ${this.formatter.format(info.point.data['ABOVE_200_D'])}
          </div></div><div class='row'><div class='series-name col-8' style='font-size:13px'>
          BELOW 50GB
          </div><div class='value-text col-4' style='font-size:12px;font-weight:500'>
          ${this.formatter.format(info.point.data['BELOW_50_D'])}
          </div></div></div></div>`
  }
}
// getText1(item, value): any {
//   var formatter = new Intl.NumberFormat('en-IN', { maximumSignificantDigits: 3 })
//   var above_50 = formatter.format(item['50_TO_100_D']);
//   var above_100 = formatter.format(item['100_TO_200_D']);
//   var above_200 = formatter.format(item['ABOVE_200_D']);
//   var below_50 = formatter.format(item['BELOW_50_D']);
// return "<div><div class='tooltip-header'>" +
// item.mnth_nm + "</div><br>" + "<div class='tooltip-body'><div style='font-size:12px'>"+ '50_TO_100 GB' + ' - ' +'<div style="font-size:15px">' + '<b>' + above_50 + '</b>'+ '</div>'+'<br>' + '<br>'+'<div style="font-size:12px">'+'100_TO_200 GB' + ' - ' + '<div style="font-size:15px">' + '<b>' + above_100 + '</b>' + '</div>'+ '<br>'+'<div style="font-size:12px">'+'ABOVE_200 GB' + ' - ' + '<div style="font-size:15px">' + '<b>' +above_200+'</b>' + '</div>'+ '<br>'+'<div style="font-size:12px">'+'BELOW_50 GB' + ' - ' + '<div style="font-size:15px">' + '<b>' +below_50+'</b>' + '</div></div>';
// }
customizeTooltip2 = (arg) => {
  return {
      text: this.getText2(arg.point.data, arg.valueText)
  };
}
getText2(item, value): any {
  var formatter = new Intl.NumberFormat('en-IN', { maximumSignificantDigits: 3 })
  var uploadval = formatter.format(item.up);
  var downldval = formatter.format(item.dwn)
return  '<div style="font-size:12px">'+'Upload' + ' - ' + '<div style="font-size:15px">' + '<b>' + uploadval + " TB"+'</b>' + '</div>' + '<br>'+'<div style="font-size:12px">'+'Download' + ' - ' + '<div style="font-size:15px">' + '<b>' + downldval + " TB"+'</b>' + '</div>';
}
}
