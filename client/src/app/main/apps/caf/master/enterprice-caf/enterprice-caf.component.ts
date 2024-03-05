import { Component, OnInit } from '@angular/core';
import { CrudService } from 'app/main/apps/crud.service';
import { TransfereService } from 'app/providers/transfer/transfer.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-enterprice-caf',
  templateUrl: './enterprice-caf.component.html',
  styleUrls: ['./enterprice-caf.component.scss']
})
export class EnterpriceCafComponent implements OnInit {
  getHeaderDtls = function () { return { "title": 'Enterprise Customers', "icon": "people_outline" } }
  spnrCtrl = false;
  loader: boolean = false;
  columnDefs = [];
  rowData = [];
  permissions;
  cnncount: any;
  blkcnt: any;
  tercnt: any;
  spndcnt: any;
  activecnt: any;
  ttlcnt: any;
  constructor(private crdsrv: CrudService,private route: Router, public TransfereService: TransfereService) { }

  ngOnInit() {
     this.permissions = { "slct_in": 1, "insrt_in": 1, "updt_in": 1, "dlte_in": 1, "exprt_in": 1 };
    this.getEntCustomerData();
  }
  getEntCustomerData() {
    this.spnrCtrl = true;
    this.loader = true;
    // console.log("hiiii");
    const rte1 = `caf/connectioncnt`;
  // console.log(rte1)
  this.crdsrv.get(rte1).subscribe(res => {
     console.log(res)
    this.cnncount = res['data']
     console.log(this.cnncount)
     this.ttlcnt =0
     this.cnncount.filter((k) => {
       this.ttlcnt =this.ttlcnt + k.ct
      if(k.enty_sts_id == 6){
        this.activecnt = k.ct
      }
      else if(k.enty_sts_id == 7){
        this.spndcnt = k.ct
      }
      else if(k.enty_sts_id == 8){
        this.tercnt = k.ct
      }
      else if(k.enty_sts_id == 88){
        this.blkcnt = k.ct
      }
    });
    console.log(this.activecnt)
    console.log(this.spndcnt)
    console.log(this.tercnt)
    console.log(this.blkcnt)
    console.log(this.ttlcnt)

  })
    const rte = `caf/entcaf`;
    this.crdsrv.get(rte).subscribe((res) => {
      // console.log(res['data']);
      this.loader = false;

      this.rowData = res['data'];
      let counter = 0;
      this.rowData.filter((k) => {
        k['s_no'] = ++counter;
      });
      console.log(this.rowData)
      this.columnDefs = [
        { headerName: 'Sno', field: 's_no', algnmnt: "center", cellClass: "pm-grid-number-cell", width: 50, filter: false, search: false, columnFiltering: false },
        { headerName: 'Organization Name', field: 'cstmr_nm',  cellClass: "pm-grid-number-cell", width: 250, filter: true, columnFiltering: false },
        { headerName: 'Contact Person Name', field: 'cntct_nm',  cellClass: "pm-grid-number-cell", width: 300, filter: true , hide: false, columnFiltering: false},
        { headerName: 'Organization Type', field: 'entrpe_type_nm',  cellClass: "pm-grid-number-cell", width: 100, filter: false , search: false, hide: false, columnFiltering: true},
        { headerName: 'Mobile Number', field: 'cntct_mble1_nu',  algnmnt: "center", cellClass: "pm-grid-number-cell", width: 150, filter: true, columnFiltering: false },
        { headerName: 'Email', field: 'loc_eml1_tx',  cellClass: "pm-grid-number-cell", width: 200, filter: true, columnFiltering: false },
        { headerName: 'Billing Frequency', field: 'frqncy_nm', cellStyle: { 'text-align': "left" }, cellClass: "pm-grid-number-cell", 
        width: 150, filter: true, columnFiltering: true },
        { headerName: 'Activation Date', field: 'actvn_dt',  algnmnt: "center", cellClass: "pm-grid-number-cell", width: 150, filter: true, columnFiltering: false },
        { headerName: 'Organization Type', field: 'entrpe_type_nm',  cellClass: "pm-grid-number-cell", width: 150, filter: true , hide: true, columnFiltering: false},
        { headerName: 'Mandal', field: 'mndl_nm',  cellClass: "pm-grid-number-cell", width: 150, filter: true, hide: true, columnFiltering: false },
        
      ];
    
      
    }, (error) => {
      //// console.log(error);
    });
  }
  addNewEntry() {
    // console.log("called")
    this.route.navigate([`/admin/caf/entfrm`])
  }
  onToolbarPreparing(e) {
    // console.log(e);
    e.toolbarOptions.items.unshift({
      location: 'after',
      widget: 'dxButton',
      options: {
        icon: 'plus',
        text: 'Add New Organization',
        onClick: this.addNewEntry.bind(this),
        // this.onCellClick( this.selectedUsers),
        bindingOptions: {
          'disabled': 'isEmailButtonDisabled'
        }
      }
    });
  }
  onCellClick(data) {
    if (data.cellElement.innerText === "View") {
      // console.log(data.row.data)
      this.TransfereService.setLoclData('cafData',data.row.data)

      this.route.navigate([`/admin/caf/entcustomer/profile`])

    }
    else if (data.cellElement.innerText === "Edit") {
      // console.log(data.row.data)
      data.row.data['type'] = "edit"
      // console.log(data.row.data)
      this.TransfereService.setLoclData('cafData',data.row.data)

      this.route.navigate([`/admin/caf/entfrm`])

    }

  }

}
