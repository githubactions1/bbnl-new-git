import { Component, OnInit } from '@angular/core';
import { CrudService } from 'app/main/apps/crud.service';
import { Router } from '@angular/router';
import { TransfereService } from 'app/providers/transfer/transfer.service';


@Component({
  selector: 'app-customers-invoice',
  templateUrl: './customers-invoice.component.html',
  styleUrls: ['./customers-invoice.component.scss']
})
export class CustomersInvoiceComponent implements OnInit {
  shwLdr: boolean;
  startDate;
  invoiceData = [];
  noInvceDataDiv: boolean;
  invoicecolumnDefs = [];
  invoiceChrgsData = [];
  longtabs = [];
  usrDtls: any;
  cafId
  getHeaderDtls = function () { return { "title": 'Customer Invoice', "icon": "people_outline" } }
  cafsData = [];
  // tab_nms=[];
  caf_id: any;
  // permissions;
  currentyear;
  years=[];
  selectedYear;
  constructor(public crdsrv: CrudService,private router: Router,public TransfereService: TransfereService) {
    this.usrDtls = JSON.parse(localStorage.getItem('usrDtls'));
    console.log(this.usrDtls)
    // this.permissions = { "slct_in": 0, "insrt_in": 0, "updt_in": 0, "dlte_in": 0, "exprt_in": 1 };
  }

  ngOnInit() {
    this.currentyear = (new Date()).getFullYear();
    var count = this.currentyear - 2016;
    for (var i = 0; i <= count; i++) {
      let yr = this.currentyear - i;
      this.years.push(yr);
    }
    this.selectedYear = this.currentyear;
    this.getcafs();

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
  selectyear(){
    console.log("select year",this.selectedYear)
    this.getInvoice(this.cafId)

  }
  getInvoice(caf_id) {
    this.shwLdr = true;
    const rte = `caf/customer/Cafinvoice/${caf_id}/${this.selectedYear}`;
    // console.log(rte)
    this.crdsrv.get(rte).subscribe((res) => {
      // console.log(res['data']);
      let index = 1;
      for (let i = 0; i < res['data'].length; i++) {
        res['data'][i]['sno'] = index++;
        res['data'][i]['invcedtl'] = res['data'][i]['format(invce_at,2)'];
        res['data'][i]['pymnt_sts'] = res['data'][i]['Payment Status'];
        // res['data'][i]['month'] = this.monthNames[res['data'][i].invce_mm - 1];
      }
      this.invoiceData = res['data'];
      console.log(this.invoiceData)
      this.shwLdr = false;
      // console.log(this.invoiceData);
      if (this.invoiceData.length == 0) {
        this.noInvceDataDiv = true;
      } else {
        this.noInvceDataDiv = false;
      }
      // console.log(this.data.package)
      // this.rowdatapackage = this.data.package;
    });
  }
  onCelInvClick(data): any {
    // console.log(data);
    this.shwLdr = true;
    const invrte = 'caf/customer/invoices/charges/' + data.data.caf_invce_id;
    // console.log(invrte);
    this.crdsrv.get(invrte).subscribe((res) => {
      // console.log(res['data']);
      this.invoiceChrgsData = res['data'];
      this.shwLdr = false;
      // console.log(this.invoiceData);

    });
  }
  viewhtml(cafid){
    console.log(cafid)
    this.TransfereService.setLoclData('data',{data: cafid})
    this.router.navigate([`/admin/sc/customer/invoice/download`])
  }
  selectTab(e) {
    this.cafId = e.itemData.text;
    this.getInvoice(e.itemData.text)
  }
}


