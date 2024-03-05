import { Component, OnInit } from '@angular/core';
import { CrudService } from 'app/main/apps/crud.service';

@Component({
  selector: 'app-call-hstry',
  templateUrl: './call-hstry.component.html',
  styleUrls: ['./call-hstry.component.scss']
})
export class CallHstryComponent implements OnInit {
  voipData;
  years=[];
  selectedYear;
  currentyear;
  shwLdr=false;
  year;
  cafsData;
  usrDtls;
  longtabs=[];
  cafId;
  constructor(public crdsrv: CrudService) { 
    this.usrDtls = JSON.parse(localStorage.getItem('usrDtls'));
    console.log(this.usrDtls)
    this.getcafs();
  }

  ngOnInit() {
    var date = new Date();
    this.year = date.getFullYear();
    this.currentyear = (new Date()).getFullYear();
    var count = this.currentyear - 2016;
    for (var i = 0; i <= count; i++) {
      let yr = this.currentyear - i;
      this.years.push(yr);
    }
    this.selectedYear = this.currentyear;
  }
  getcafs() {
    this.shwLdr = true;
    const rte = 'dashbrd/CafsDtls/' + this.usrDtls.usr_ctgry_ky;
    // console.log(rte)
    this.crdsrv.get(rte).subscribe((res) => {
      console.log(res);
      if (res['status'] == 200) {
        this.cafsData = res['data'];
        console.log(this.cafsData)
        for (let i = 0; i < this.cafsData.length; i++) {
          this.longtabs.push({ id: i, text: this.cafsData[i].caf_nu })
        }
        console.log(this.longtabs)
        // for (let i = 0; i <= this.cafsData.length; i++) {
        //   this.tab_nms.push(this.cafsData[i]);
        // }
        // console.log( this.tab_nms)
        this.shwLdr = false;
        let selefsttbdt = {
          itemData: this.longtabs[0]
        }
        this.selectTab(selefsttbdt)
      }
    });
  }
  getvoip(cafId, year) {
    this.shwLdr = true;
    const rte = `dashbrd/customer/voip/${cafId}/${year}`;
    console.log(rte)
    this.crdsrv.get(rte).subscribe((res) => {
      let index = 1;
      for (let i = 0; i < res['data'].length; i++) {
        res['data'][i]['sno'] = index++
      }
      this.voipData = res['data'];
      console.log(this.voipData)
      this.shwLdr = false;
      
    })
  }
  selectyear(){
    this.getvoip(this.cafId,this.selectedYear) 
  }
  selectTab(e) {
    this.cafId = e.itemData.text;
    this.getvoip(e.itemData.text,this.selectedYear)
  }
  // selectyear2() {
  //   this.getvoip(this.cafDtls[0].caf_nu, this.year)
  // }
}
