import { Component, OnInit } from '@angular/core';
import { CrudService } from '../../crud.service';
import { Router } from '@angular/router';
import { TransfereService } from 'app/providers/transfer/transfer.service';

@Component({
  selector: 'app-ill-cafs',
  templateUrl: './ill-cafs.component.html',
  styleUrls: ['./ill-cafs.component.scss']
})
export class IllCafsComponent implements OnInit {
  illCafDtls;
  getHeaderDtls = function (): any { return { 'title': 'Enterprise ILL Customers', 'icon': 'people_outline' }; };
  loader = false;
  shwPermMsg: string;
  columnDefs;
  permissions;
  CstmrId
  constructor(public crdSrvc: CrudService,private route: Router, public TransfereService: TransfereService) { }

  ngOnInit() {
    console.log("ngonit")
    this.permissions = { "slct_in": 1, "insrt_in": 1, "updt_in": 1, "dlte_in": 1, "exprt_in": 1 };
    this.getillCafDtls();
  }
 getillCafDtls(){
   let rte = `caf/llfDtls`;
   this.loader = true;
   this.crdSrvc.get(rte).subscribe((res) => {
    this.loader = false;
     for(let i=0;i<res['data'].length;i++){
      res['data'][i]['sno'] = i+1;
     }
    this.illCafDtls = res['data']
    console.log(this.illCafDtls);
    this.columnDefs = [
      { headerName: 'Sno', field: 'sno', algnmnt: 'center', cellClass: 'pm-grid-number-cell', width: 50, filter: false, search: false, columnFiltering: false },
      { headerName: 'Customer Id', field: 'cstmr_id', algnmnt: 'center',  cellClass: 'pm-grid-number-cell', width: 150, filter: true, columnFiltering: false },
      { headerName: 'Organization Name', field: 'cstmr_nm',  cellClass: 'pm-grid-number-cell', width: 250, filter: true, columnFiltering: false },
      { headerName: 'Contact Person Name', field: 'cntct_nm',  cellClass: 'pm-grid-number-cell', width: 300, filter: true , hide: false, columnFiltering: false},
      { headerName: 'Mobile Number', field: 'cntct_mble1_nu',  algnmnt: 'center', cellClass: 'pm-grid-number-cell', width: 150, filter: true, columnFiltering: false },
      { headerName: 'Email', field: 'loc_eml1_tx',  cellClass: 'pm-grid-number-cell', width: 200, filter: true, columnFiltering: false },
      { headerName: 'Billing Frequency', field: 'frqncy_nm', cellStyle: { 'text-align': 'left' }, cellClass: 'pm-grid-number-cell', width: 130, filter: true, columnFiltering: false },
      { headerName: 'Activation Date', field: 'actvn_dt',  algnmnt: 'center', cellClass: 'pm-grid-number-cell', width: 150, filter: true, columnFiltering: false },
      { headerName: 'Organization Type', field: 'entrpe_type_nm',  cellClass: 'pm-grid-number-cell', width: 150, filter: true , hide: false, columnFiltering: false},
      { headerName: 'District', field: 'dstrt_nm',  cellClass: 'pm-grid-number-cell', width: 150, filter: true, hide: false, columnFiltering: false },
      { headerName: 'Mandal', field: 'mndl_nm',  cellClass: 'pm-grid-number-cell', width: 150, filter: true, hide: false, columnFiltering: false },
      { headerName: 'Village', field: 'vlge_nm',  cellClass: 'pm-grid-number-cell', width: 150, filter: true, hide: false, columnFiltering: false },
      { headerName: 'Total CAF', field: 'ttl_cafs',  cellClass: 'pm-grid-number-cell',algnmnt: 'center', width: 100, filter: false , search: false, hide: false, columnFiltering: false},
      { headerName: 'Total Packages', field: 'ttl_pckges',  cellClass: 'pm-grid-number-cell',algnmnt: 'center', width: 100, filter: false , search: false, hide: false, columnFiltering: false},

    ]

  })
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
onCellPrepared(colDef, e) {
  if (e.rowType === "data" && e.row.data && e.column.dataField == "ttl_pckges") {
     e.cellElement.style.color = '#2d33e2';
     e.cellElement.style.borderRadius = '10px';
     e.cellElement.style.fontWeight = 500;
     e.cellElement.style.cursor = "pointer";
  }
}

addNewEntry() {
  // console.log("called")
  this.route.navigate([`/admin/ILL/caf/newIllEntprse`])
}
onCellClick(data) {
  console.log(data)
  if (data.column.dataField === 'ttl_pckges') {
     console.log(data.row.data)
    this.TransfereService.setLoclData('cafData',data.row.data)
    this.route.navigate([`/admin/ILL/caf/package`])
  }
}
}
