import { Component, OnInit } from '@angular/core';
import { TransfereService } from 'app/providers/transfer/transfer.service';
import { CrudService } from '../../../crud.service';

@Component({
  selector: 'app-customer-profile',
  templateUrl: './customer-profile.component.html',
  styleUrls: ['./customer-profile.component.scss']
})
export class CustomerProfileComponent implements OnInit {

  permissions;
  rowData = [];
  columnDefs = [];
  call_log = [];
  invoiceData = [];
  columnDef = [];
  invice_dtls = [];
  loader: boolean = false;
  getHeaderDtls = function () { return { "title": 'Customer Information', "icon": "people_outline" } }
  cafDtls: any;
  srvpcs: any;

  constructor(public TransfereService:TransfereService,public crdsrv: CrudService,) {
    this.permissions = { "slct_in": 1, "insrt_in": 0, "updt_in": 1, "dlte_in": 1, "exprt_in": 1 };
  }

  ngOnInit() {


    this.cafDtls=this.TransfereService.getData()
    console.log(this.cafDtls)
   
    this.call_log = [{
      phone: 9542313555,
      call_type: "Incomin",
      duration: "0.32",
      time: "12:32 pm",
    }, {
      phone: 9542313555,
      call_type: "Incomin",
      duration: "0.32",
      time: "12:32 pm",
    }, {
      phone: 9542313555,
      call_type: "outgoing",
      duration: "0.32",
      time: "12:32 pm",
    }
    ];

    this.rowData = this.call_log;
    this.columnDefs = [
      { headerName: 'Phone No', field: 'phone', cellStyle: { 'text-align': "center" }, cellClass: "pm-grid-number-cell", width: 100, filter: false, search: false },
      { headerName: 'Call Type', field: 'call_type', cellStyle: { 'text-align': "left" }, cellClass: "pm-grid-number-cell", width: 150, filter: true },
      { headerName: 'Duration', field: 'duration', cellStyle: { 'text-align': "left" }, cellClass: "pm-grid-number-cell", width: 250, filter: true },
      { headerName: 'Time', field: 'time', cellStyle: { 'text-align': "left" }, cellClass: "pm-grid-number-cell", width: 250, filter: true },
      // { headerName: 'Email', field: 'cstmr_emle_tx', cellStyle: { 'text-align': "left" }, cellClass: "pm-grid-number-cell", width: 200, filter: true },
      // { headerName: 'Gender', field: 'gndr_nm', cellStyle: { 'text-align': "left" }, cellClass: "pm-grid-number-cell", width: 150, filter: true }
    ];
    this.getinvoiceLst();
    this.getpackagedtls()

  }


getpackagedtls(){
  const rte = 'caf/srvpcs/' + this.cafDtls.crnt_pckge_id;
  console.log(rte)
  this.crdsrv.get(rte).subscribe((res) => {
    this.srvpcs = res['data'];
    console.log(res['data'])
    console.log(this.srvpcs)
  })
}

  // getdata(){
  //   this.cafDtls=this.TransfereService.getData()
  //   console.log(this.cafDtls)
  // }
  getinvoiceLst() {

    this.invice_dtls = [{
      pkg_Nm: "Home-Mini",
      amnt: 700,
      sts: "Paid",
      du_dt: "",
      pd_dt: "29-01-2019",
      dtls : [{
        Telephone_Charges: 10,
        Package_Cost: 500,
        Box_Rent: 100,
        Add_On_Package_Cost: 10,
        Boost_Package_Cost: 50,
        GST_Charges: 30
      }]
    }, {
      pkg_Nm: "Home-Mini",
      amnt: 610,
      sts: "Paid",
      du_dt: "",
      pd_dt: "29-01-2019",
      dtls : [{
        Telephone_Charges: 100,
        Package_Cost: 300,
        Box_Rent: 100,
        Add_On_Package_Cost: 20,
        Boost_Package_Cost: 50,
        GST_Charges: 40
      }]
    }, {
      pkg_Nm: "Home-Mini",
      amnt: 399,
      sts: "Pending",
      du_dt: "29-01-2019",
      pd_dt: "",
      dtls : [{
        Telephone_Charges: 10,
        Package_Cost: 200,
        Box_Rent: 100,
        Add_On_Package_Cost: 20,
        Boost_Package_Cost: 50,
        GST_Charges: 19
      }]
    }
    ];
    console.log(this.invice_dtls);

    this.invoiceData = this.invice_dtls;
    this.columnDef = [
      { headerName: 'Package Name', field: 'pkg_Nm', cellStyle: { 'text-align': "center" }, cellClass: "pm-grid-number-cell", width: 100, filter: false, search: false },
      { headerName: 'Amount', field: 'amnt', cellStyle: { 'text-align': "left" }, cellClass: "pm-grid-number-cell", width: 150, filter: true },
      { headerName: 'Status', field: 'sts', cellStyle: { 'text-align': "left" }, cellClass: "pm-grid-number-cell", width: 250, filter: true },
      { headerName: 'Due Date', field: 'du_dt', cellStyle: { 'text-align': "left" }, cellClass: "pm-grid-number-cell", width: 250, filter: true },
      { headerName: 'Paid Date', field: 'pd_dt', cellStyle: { 'text-align': "left" }, cellClass: "pm-grid-number-cell", width: 250, filter: true },
 
    ];


  }

}
