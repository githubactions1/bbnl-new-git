import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TransfereService } from 'app/providers/transfer/transfer.service';
import { CrudService } from 'app/main/apps/crud.service';
import { DsSidebarService } from '@glits/components/sidebar/sidebar.service';
@Component({
  selector: 'app-ill-cafs-profile',
  templateUrl: './ill-cafs-profile.component.html',
  styleUrls: ['./ill-cafs-profile.component.scss']
})
export class IllCafsProfileComponent implements OnInit {


  permissions;
  rowData = [];
  columnDefs = [];
  cstmrdata = [];
  invoiceData = [];
  columnDef = [];
  invice_dtls = [];
  loader: boolean = false;
  cafDtls;
  nodes: any;
  totalNodes: number;
  nodesList = [];
  cafcount: any;
  nodeLst: any[];
  nodcount: any;
  cstmrData: any;
  crntMnthCnts: any;
  allPrvMnthCnts: any;
  getHeaderDtls = function () { return { 'title': 'Enterprise Customer Information', 'icon': 'people_outline' } };
  

  constructor(private router: Router, public TransfereService: TransfereService, public crdsrv: CrudService, private route: Router, private _dsSidebarService: DsSidebarService) {
    this.permissions = { 'slct_in': 1, 'insrt_in': 1, 'updt_in': 1, 'dlte_in': 1, 'exprt_in': 1 };
  }

  ngOnInit() {
    this.cafDtls = this.TransfereService.getLoclData('cafData');
    console.log(this.cafDtls);
    this.getdetails();
    this.setCafDetailsGrid();
  }


  getdetails() {
    // console.log('in get caf')
    this.loader = true;
    const rte = `caf/entcaflst/` + this.cafDtls.cstmr_id;
    this.crdsrv.get(rte).subscribe(res => {
      this.cafcount = res['data'][0];
      console.log(this.cafcount);
    });
    const rte1 = `caf/entnodecnt/` + this.cafDtls.cstmr_id;
    this.crdsrv.get(rte1).subscribe(res => {
      this.nodcount = res['data'][0];
      console.log(this.nodcount);
    });

    const cafCrntMnthRte = `caf/entcustomers/operations/` + this.cafDtls.cstmr_id;
    this.crdsrv.get(cafCrntMnthRte).subscribe(res => {
      this.crntMnthCnts = res['data'][0];
      this.allPrvMnthCnts = res['data'];
      console.log(this.crntMnthCnts);
      console.log(this.allPrvMnthCnts);
    });

    const rte2 = `caf/entnodelst/` + this.cafDtls.cstmr_id;
    // console.log(rte2)
    this.crdsrv.get(rte2).subscribe(res => {
      // console.log(res)
      this.rowData = res['data'];
      console.log(this.rowData);
      this.nodeLst = res['data'];
      this.loader = false;
      let counter = 0;
      this.rowData.filter((k) => {
        k['sno'] = ++counter;
      });
      this.columnDefs = [
        { headerName: 'Sno', field: 'sno', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 100, filter: false, search: false },
        {
          headerName: 'CAF No', field: 'caf_nu', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 150, filter: true,
          filterOperations: ['contains', 'startswith', '=']
        },
        { headerName: 'Profile', field: 'Profile', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 100, height: 40, columnFiltering: false, filter: true },
        { headerName: 'Name', field: 'cstmr_nm', alignment: 'left', cellClass: 'pm-grid-number-cell', width: 150, filter: true },
        {
          headerName: 'Mobile Number', field: 'cntct_mble1_nu', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 150, filter: true,
          filterOperations: ['contains', 'startswith', '='], selectedFilterOperation: 'contains', allowFiltering: true
        },
        { headerName: 'Status', field: 'sts_nm', alignment: 'left', cellClass: 'pm-grid-number-cell', width: 125, filter: true },
        { headerName: 'LMO', field: 'lmo_cd', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 125, filter: true },
        { headerName: 'Billing Frequency', field: 'frqncy_nm', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 110, filter: true },
        { headerName: 'Activation Date', field: 'actvn_dt', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 125, filter: true },
        { headerName: 'Suspended Date', field: 'spnd_dt', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 125, filter: true },
        { headerName: 'Resume Date', field: ' rsme_dt', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 125, filter: true },
        { headerName: 'Termination Date', field: 'trmnd_dt', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 125, filter: true }
      ];
    });
  }
  setCafDetailsGrid() {



  }

  onCellClick(event) {
    // console.log(data)
    // this.TransfereService.setLoclData('data',data.row.data)
    // this.router.navigate([`/admin/caf/customer/profile`]);
    console.log(event);
    if (event.value == 'Profile') {
      this.cstmrData = event.data;
      console.log(event.data);
      this.openSideBar();
    }
  }

  addNewCaf() {
    let frm_actn = 'entnew'
    this.TransfereService.setData(frm_actn)
    this.TransfereService.setLoclData('entcafData', this.cafDtls)
    this.route.navigate([`/admin/ILL/caf/form`])
    // this.route.navigate([`/admin/caf/entcustomer/new-caf`])

  }
  addNewNode() {
    this.TransfereService.setData({
      // 'prnt_cstmr_id': this.cafDtls.prnt_cstmr_id,
      'cstmr_id': this.cafDtls.cstmr_id,
      'frst_nm': this.cafDtls.cstmr_nm,
      'entrpe_type_id': this.cafDtls.entrpe_type_id,
    })
    this.route.navigate([`/admin/caf/new-node`])

  }
  saveBulkUpload() {
    this.TransfereService.setData(this.cafDtls)
    this.route.navigate([`admin/caf/bulk-caf-upload`])

  }
  onCelleditClick(data) {

    this.TransfereService.setLoclData('entcafData', data.row.data)
    this.route.navigate([`/admin/caf/entcustomer/caf-edit`])
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
  openSideBar(): any {
    this._dsSidebarService.getSidebar('addFormPanel').toggleOpen();
  }
  closeSideBar(): any {
    this._dsSidebarService.getSidebar('addFormPanel').toggleOpen();
  }

  onCellPrepared(colDef, e) {

    if (e.rowType === "data" && e.row.data && e.column.dataField == 'Profile') {
      e.cellElement.style.color = '#ff0000';
      e.cellElement.style.fontWeight = 500;
      e.cellElement.style.borderRadius = '10px';
      e.cellElement.style.background = 'rgba(243, 191, 176, 0.2784313725490196)';
      e.cellElement.style.backgroundClip = 'content-box';
      e.cellElement.style.cursor = "pointer";
    }

  }


}
