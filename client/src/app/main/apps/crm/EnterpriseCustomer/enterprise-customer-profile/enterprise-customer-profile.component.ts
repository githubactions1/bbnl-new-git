import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TransfereService } from 'app/providers/transfer/transfer.service';
import { CrudService } from '../../../crud.service';

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
  getHeaderDtls = function () { return { "title": 'Enterprise Customer Information', "icon": "people_outline" } }
  cafDtls;
  nodes: any;
  totalNodes: number;
  nodesList = [];

  constructor(private router: Router, public TransfereService: TransfereService, public crdsrv: CrudService, private route: Router) {
    this.permissions = { "slct_in": 1, "insrt_in": 0, "updt_in": 1, "dlte_in": 1, "exprt_in": 1 };
  }

  ngOnInit() {
    this.getinvoiceLst();

    this.cafDtls = this.TransfereService.getLoclData('cafData')
    //console.log(this.TransfereService.getData())
    this.getUniqueNodes()
    this.setCafDetailsGrid();
  }
  getUniqueNodes() {
    this.nodes = this.groupBy(this.cafDtls.cafs, 'cstmr_id');
    this.totalNodes = Object.keys(this.nodes).length;

    for (let i = 0; i < this.totalNodes; i++) {
      console.log(this.nodes["100056"])
      this.nodesList.push({ "node_nm": this.nodes[Object.keys(this.nodes)[i].toString()][0].frst_nm, "node_id": this.nodes[Object.keys(this.nodes)[i].toString()][0].cstmr_id })

    }
    console.log(this.nodesList)
  }
  getinvoiceLst() {

    this.invice_dtls = [{
      caf_id: "1234569",
      pkg_Nm: "Home-Mini",
      amnt: 700,
      sts: "Paid",
      invc_gnrtd_dt: "29-1-2019",
      du_dt: "",
      pd_dt: "29-01-2019",
      dtls: [{
        Telephone_Charges: 10,
        Package_Cost: 500,
        Box_Rent: 100,
        Add_On_Package_Cost: 10,
        Boost_Package_Cost: 50,
        GST_Charges: 30
      }]
    }, {
      caf_id: "1234569",
      pkg_Nm: "Home-Mini",
      amnt: 610,
      sts: "Paid",
      invc_gnrtd_dt: "29-1-2019",
      du_dt: "",
      pd_dt: "29-01-2019",
      dtls: [{
        Telephone_Charges: 100,
        Package_Cost: 300,
        Box_Rent: 100,
        Add_On_Package_Cost: 20,
        Boost_Package_Cost: 50,
        GST_Charges: 40
      }]
    }, {
      caf_id: "1234569",
      pkg_Nm: "Home-Mini",
      amnt: 399,
      sts: "Pending",
      invc_gnrtd_dt: "29-1-2019",
      du_dt: "29-01-2019",
      pd_dt: "",
      dtls: [{
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
      { headerName: 'CAF Id', field: 'caf_id', cellStyle: { 'text-align': "center" }, cellClass: "pm-grid-number-cell", width: 200, filter: false, search: false },
      { headerName: 'Package Name', field: 'pkg_Nm', cellStyle: { 'text-align': "center" }, cellClass: "pm-grid-number-cell", width: 200, filter: false, search: false },
      { headerName: 'Amount', field: 'amnt', cellStyle: { 'text-align': "left" }, cellClass: "pm-grid-number-cell", width: 150, filter: true },
      { headerName: 'Status', field: 'sts', cellStyle: { 'text-align': "left" }, cellClass: "pm-grid-number-cell", width: 150, filter: true },
      { headerName: 'Ivoice Generated Date', field: 'invc_gnrtd_dt', cellStyle: { 'text-align': "left" }, cellClass: "pm-grid-number-cell", width: 200, filter: true },
      { headerName: 'Due Date', field: 'du_dt', cellStyle: { 'text-align': "left" }, cellClass: "pm-grid-number-cell", width: 150, filter: true },
      { headerName: 'Paid Date', field: 'pd_dt', cellStyle: { 'text-align': "left" }, cellClass: "pm-grid-number-cell", width: 150, filter: true },

    ];


  }

  setCafDetailsGrid() {
    this.rowData = this.cafDtls.cafs;
    this.columnDefs = [
      { headerName: 'Sno', field: 'sno', cellStyle: { 'text-align': "center" }, cellClass: "pm-grid-number-cell", width: 100, filter: false, search: false },
      { headerName: 'Organization Name', field: 'frst_nm', cellStyle: { 'text-align': "left" }, cellClass: "pm-grid-number-cell", width: 250, filter: true },
      { headerName: 'Mobile Number', field: 'cntct_mble1_nu', cellStyle: { 'text-align': "left" }, cellClass: "pm-grid-number-cell", width: 150, filter: true },
      { headerName: 'Address', field: 'loc_lcly_tx', cellStyle: { 'text-align': "left" }, cellClass: "pm-grid-number-cell", width: 200, filter: true },
      { headerName: 'Agent', field: 'lmo_agnt_cd', cellStyle: { 'text-align': "center" }, cellClass: "pm-grid-number-cell", width: 100, filter: false, search: false },
      { headerName: 'District', field: 'dstrt_nm', cellStyle: { 'text-align': "left" }, cellClass: "pm-grid-number-cell", width: 250, filter: true },
      { headerName: 'Mandal', field: 'mndl_nm', cellStyle: { 'text-align': "left" }, cellClass: "pm-grid-number-cell", width: 150, filter: true }
    ];



  }

  onviewClick(data) {
    this.TransfereService.setData(data.row.data)
    this.router.navigate([`/admin/crm/customer/profile`])
  }

  addNewCaf() {
    //this.TransfereService.setData(this.cafDtls)

    this.route.navigate([`/admin/caf/new-caf`])

  }
  addNewNode() {
    this.TransfereService.setData({
      "prnt_cstmr_id": this.cafDtls.prnt_cstmr_id,
      "cstmr_id": this.cafDtls.cstmr_id,
      "frst_nm": this.cafDtls.frst_nm,
      "entrpe_type_id": this.cafDtls.entrpe_type_id,
    })
    this.route.navigate([`/admin/caf/new-node`])

  }
  saveBulkUpload() {
    this.TransfereService.setData(this.cafDtls)
    this.route.navigate([`admin/caf/bulk-caf-upload`])

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
}  
