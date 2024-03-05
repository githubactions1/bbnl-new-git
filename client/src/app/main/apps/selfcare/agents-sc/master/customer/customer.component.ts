import { Component, OnInit } from '@angular/core';
import { CrudService } from 'app/main/apps/crud.service';
import { UserService } from 'app/providers/user/user.serivce';
import { Router } from '@angular/router';
import { DsSidebarService } from '@glits/components/sidebar/sidebar.service';
import { TransfereService } from 'app/providers/transfer/transfer.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit {
  lgnDtls: any;
  lmocd: any;
  agnt_id: any;
  rowData: any;
  shwLdr = true;
  columnDefs;
  permissions;
  public cstmrData: any;
  getHeaderDtls = function (): any { return { 'title': 'Customers  Li', 'icon': 'people_outline' }; };
  
  constructor(private crdSrv: CrudService, private userService: UserService, private route: Router, private _dsSidebarService: DsSidebarService,
     public TransfereService: TransfereService) { 
    this.userService.USER_DETAILS.subscribe(val => {
      // console.log(val);
      this.lgnDtls = val;
      console.log(this.lgnDtls);
      if (val.usr_ctgry_id === 8) {
        this.lmocd = val.lmo_cd;
        this.agnt_id = val.usr_ctgry_ky;
      }
      else{
        this.agnt_id = val.usr_ctgry_ky;
      }
    });
    const permTxt = 'Agent Customer Creation';
    const prmeRte = `user/permissions/${permTxt}`;
    this.crdSrv.get(prmeRte).subscribe((res) => {
      console.log(res['data']);
      if (res['data']){
        this.permissions = res['data'][0];
      }
    });
  }

  ngOnInit(): any {
    console.log(this.cstmrData);
    this.getCafsData();
  }

  getCafsData(): any {
    this.shwLdr = true;
    const data = {
      agntId: this.agnt_id,
      Caf_type: 1
    };
    
    this.crdSrv.create(data, 'caf/getdt').subscribe(res => {
      this.rowData = res['data'];
      console.log(this.rowData);
      this.shwLdr = false;

      this.columnDefs = [
        { headerName: 'Sno', field: 'sno', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 100, filter: false, search: false, columnFiltering: false },
        // tslint:disable-next-line:max-line-length
        { headerName: 'CAF No', field: 'caf_nu', alignment: 'center' , cellClass: 'pm-grid-number-cell', width: 150, filter: true , columnFiltering: false, filterOperations: [ 'contains', 'startswith', '=' ] },
        { headerName: 'Profile', field: 'Profile', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 100, height: 40, columnFiltering: false,  filter: true },
        { headerName: 'Name', field: 'cstmr_nm',  cellClass: 'pm-grid-number-cell', width: 150, filter: true, search: false, columnFiltering: false },
        // tslint:disable-next-line:max-line-length
        { headerName: 'Mobile Number', field: 'cntct_mble1_nu', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 150, filter: true , columnFiltering: false, filterOperations: [ 'contains', 'startswith', '=' ], selectedFilterOperation: 'contains', allowFiltering: true },
        { headerName: 'Status', field: 'sts_nm',  cellClass: 'pm-grid-number-cell', width: 125, filter: false, columnFiltering: true },
        { headerName: 'Billing Frequency', field: 'frqncy_nm',  cellClass: 'pm-grid-number-cell', width: 110, filter: true, columnFiltering: false },
        { headerName: 'Activation Date', field: 'actvn_dt', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 125, filter: true, columnFiltering: false },
        { headerName: 'ONU Serial NO', field: 'onu_srl_nu', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 125, filter: true, columnFiltering: false },
        { headerName: 'iptv Serial NO', field: 'iptv_srl_nu', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 125, filter: true, columnFiltering: false },
        { headerName: 'subscriber code', field: 'mdlwe_sbscr_id', alignment: 'left', cellClass: 'pm-grid-number-cell', width: 125, filter: true, columnFiltering: false }
      ];
    });
  }

  onToolbarPreparing(e): any {
    // console.log(e);
    /*e.toolbarOptions.items.unshift({
      location: 'after',
      widget: 'dxButton',
      options: {
        icon: 'plus',
        text: 'Add APSFL New CAF',
        onClick: this.addNewEntry.bind(this, 'new'),
        bindingOptions: {
          'disabled': 'isEmailButtonDisabled'
        }
      }
    });*/
	e.toolbarOptions.items.unshift({
      location: 'after',
      widget: 'dxButton',
      options: {
        icon: 'plus',
        text: 'Add BBNL New CAF',
        onClick: this.addBbnlNewEntry.bind(this, 'new'),
        bindingOptions: {
          'disabled': 'isEmailButtonDisabled'
        }
      }
    });
  }

  addNewEntry(): any {
  let frm_actn ="new";
      this.TransfereService.setData(frm_actn);
    this.route.navigate([`/admin/caf/new-caf`]);
  }
  addBbnlNewEntry(): any {
  let frm_actn ="new";
    this.TransfereService.setData(frm_actn);
    this.route.navigate([`/admin/caf/bbnl-ind-new-caf`]);
  }
  // onviewClick(event): any{
  //   console.log(event);
  //   this.cstmrData = event.data;
  //   console.log(event.data);
  //   this.openSideBar();
  // }
  onCellClick(event): any{
     console.log(event);
      this.cstmrData = event.data;
      console.log(event.data);
     this.openSideBar();
     }




  onCelleditClick(data): any {
    this.shwLdr = true;
    console.log(data.cellElement.innerText);
    if (data.cellElement.innerText = "view") {
      console.log(data.row.data);
      // this.TransfereService.setData(data.row.data)
      this.TransfereService.setLoclData('cafData', data.row.data);
      let frm_actn ="update";
      this.TransfereService.setData(frm_actn);
      this.route.navigate([`/admin/caf/new-caf`]);
    }
  }

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
