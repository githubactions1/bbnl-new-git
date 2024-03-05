import { Component, OnInit, ViewChild } from '@angular/core';
import { CrudService } from 'app/main/apps/crud.service';
import { DsSidebarService } from '@glits/components/sidebar/sidebar.service';
import { AtomService } from 'app/main/services/atom.service';

@Component({
  selector: 'app-villages',
  templateUrl: './villages.component.html',
  styleUrls: ['./villages.component.scss']
})
export class VillagesComponent implements OnInit {
  columnDefs: any;
  gridData: any;
  initdata: any;
  gridApi;
  permissions;
  mainMessage;
  loader:boolean;
  getRowHeight = function () { return 40; }
  getHeaderDtls = function () { return { "title": this.formDetails.stngs.form_title, "icon": "receipt" } }
  public fields: any[] = [
    { type: 'pk', name: 'vlge_id', label: 'Village Identifier', isCustom: false, customData: {}, required: false, hidden: true },

    { type: 'dropdown', name: 'ste_id', label: 'State', isCustom: true, customData: { "route": "admin/states", "input_key": null, "key": "ste_id", "label_key": "ste_nm", "label": "State", "table": "ste_lst_t" }, value: '', required: false, hidden: false },
    { type: 'dropdown', name: 'dstrt_id', label: 'District', isCustom: true, customData: { "route": "admin/states/ste_id/districts", "input_key": "ste_id", "key": "dstrt_id", "label_key": "dstrt_nm", "label": "District", "table": "dstrt_lst_t" }, value: '', required: false, hidden: false },
    { type: 'dropdown', name: 'mndl_id', label: 'Mandals', isCustom: true, customData: { "route": "admin/districts/dstrt_id/mandals", "input_key": "dstrt_id", "key": "mndl_nu", "label_key": "mndl_nm", "label": "Mandals", "table": "mndl_lst_t" }, value: '', required: false, hidden: false },
    { type: 'text', name: 'vlge_nm', label: 'Village', isCustom: false, customData: { "route": null, "input_key": null, "key": null, "label_key": null, "label": null, "table": null }, value: '', required: false, hidden: false },
    { type: 'text', name: 'vlge_cd', label: 'Village Code', isCustom: false, customData: { "route": null, "input_key": null, "key": null, "label_key": null, "label": null, "table": null }, value: '', required: false, hidden: false },
    { type: 'text', name: 'ptnl_ct', label: '', isCustom: false, customData: { "route": null, "input_key": null, "key": null, "label_key": null, "label": null, "table": null }, value: '', required: false, hidden: false },
    { type: 'text', name: 'trgt_ct', label: '', isCustom: false, customData: { "route": null, "input_key": null, "key": null, "label_key": null, "label": null, "table": null }, value: '', required: false, hidden: false },
    { type: 'text', name: 'std_cd', label: 'STD code', isCustom: false, customData: { "route": null, "input_key": null, "key": null, "label_key": null, "label": null, "table": null }, value: '', required: false, hidden: false },
  ];
  public formDetails: any = {
    fnctns: {},
    apis: {
      "sel_url": "admin/villages",
      "upd_url": "admin/villages/:vlge_id",
      "ins_url": "admin/villages",
      "del_url": "admin/villages/:vlge_id"
    },
    initdata: {},
    fields: this.fields,
    key_field: ["vlge_id"],
    stngs: {
      "style": "mat",
      "saveBtn": true,
      "saveAsBtn": false,
      "closeBtn": true,
      "model_style": "right",
      "form_title": " Village",
      "deleteBtn": false,
      "show_lables": false,
      "oper_mode": "new"

    }
  }
  constructor(private _dsSidebarService: DsSidebarService, public crdsrv: CrudService, public atmSrv: AtomService) {
    this.initdata = {}
    this.permissions = { "slct_in": 1, "insrt_in": 0, "updt_in": 0, "dlte_in": 0, "exprt_in": 0 }
  }
  ngOnInit() {
    this.atmSrv.dropDownData.subscribe((data) => {
      this.getDependedFieldsData(data);
    });
    this.getUsrPermissions();
    this.getFieldsCustomData();
  }
  getFieldsCustomData() {
    this.fields.forEach(element => {
      if (element.isCustom) {
        let eleData = this.getCustomData(element.customData)
        element['options'] = eleData;
      }
    });
    console.log(this.fields)
  }
  getCustomData(customData) {
    let options = [];
    if (customData.input_key == null) {
      this.crdsrv.get(customData.route).subscribe((res) => {
        let data = res['data']
        data.forEach(element => {
          options.push({
            key: element[customData.key],
            label: element[customData.label_key]
          })
        });
      })
      return options;
    } else {
      return options;
    }

  }

  user: any = {
    permissions: { 'slct_in': 0, 'insrt_in': 0, 'updt_in': 0, 'dlte_in': 0, 'exprt_in': 0 },
    'perm_url': 'user/permissions/Villages Creation'
  }
  getUsrPermissions(): any {
    this.mainMessage = null;
    this.crdsrv.get(this.user.perm_url).subscribe((res) => {
      console.log(res['data']);
      if (res['status'] == 200) {
        if (res['data'].length)
          this.user.permissions = res['data'][0];
        if (this.user.permissions.slct_in === 1) {
          this.getGridData();
        } else
          this.mainMessage = 'You do not have permissions to do this operation. Please contact Administrator to get permissions.';
      }
    });
  }
  getGridData() {
    this.loader=true;
    this.crdsrv.get(this.formDetails.apis.sel_url).subscribe((res) => {
      if (res['status'] == 200) {
        this.loader=false;
        this.permissions = (res['perm'] === undefined) ? this.permissions : res['perm'][0];
        if (this.user.permissions.slct_in == 0) this.mainMessage = "You do not have permissions to do this operation. Please contact Administrator to get user.permissions."
        if (res['data'].length == 0) this.mainMessage = "No entries found in the database."
        let ct = 0;
        this.gridData = res['data'];
        this.gridData.filter(k => {
          k['s_no'] = ++ct;
        });
        this.columnDefs = [
          { headerName: 'Sno', field: 's_no', alignment: "center" , cellClass: "pm-grid-number-cell", width: 100, sortable: true, filter: false },
          { headerName: 'Village Identifier', field: 'vlge_id', hide: true, alignment: "center" , cellClass: "pm-grid-number-cell", width: 100 },
          { headerName: 'State', field: 'ste_nm', alignment: "left" , cellClass: "pm-grid-number-cell", width: 265, sortable: true, filter: true },
          { headerName: 'District', field: 'dstrt_nm', alignment: "left" , cellClass: "pm-grid-number-cell", width: 265, sortable: true, filter: true },
          { headerName: 'Mandals', field: 'mndl_nm', alignment: "left" , cellClass: "pm-grid-number-cell", width: 265, sortable: true, filter: true },
          { headerName: 'Village', field: 'vlge_nm', alignment: "left" , cellClass: "pm-grid-number-cell", width: 265, sortable: true, filter: true },
          // tslint:disable-next-line:max-line-length
          { headerName: 'Village Code', field: 'vlge_cd==null?"":vlge_cd', alignment: "left" , cellClass: "pm-grid-number-cell", width: 265, sortable: true, filter: true },
          // { headerName: '', field: 'ptnl_ct', alignment: "left" , cellClass: "pm-grid-number-cell", width: 265, sortable: true, filter: true },
          // { headerName: '', field: 'trgt_ct', alignment: "left" , cellClass: "pm-grid-number-cell", width: 265, sortable: true, filter: true },
          { headerName: 'STD code', field: 'std_cd', alignment: "left" , cellClass: "pm-grid-number-cell", width: 265, sortable: true, filter: true },
        ];

      } else if (res['status'] == 404) {
        this.permissions = { "slct_in": 0, "insrt_in": 0, "updt_in": 0, "dlte_in": 0, "exprt_in": 0 }
      }
    })
  }
  formEventTriggered(evetData) {
    if (evetData.dataUpdated)
      this.getGridData();
    if (evetData.closeForm) {
      this._dsSidebarService.getSidebar('addFormPanel').toggleOpen();
    }
  }
  addNewEntry() {
    this.formDetails.stngs.oper_mode = "new";
    this.formDetails.initdata = {}
    this.formDetails.stngs.deleteBtn = false;
    this.formDetails.stngs.saveBtn = true;
    this.initdata = {}
    this.openSideBar();
  }
  onEdit2(event) {

    this.formDetails.initdata = event.data;
    this.initdata = event.data;
    this.getDependedFieldsData(this.initdata)
    this.formDetails.stngs.deleteBtn = false;
    this.formDetails.stngs.saveBtn = true;
    this.formDetails.stngs.oper_mode = "edit"
    this.openSideBar();
  }
  onDelete2(event) {
    this.formDetails.initdata = event.data;
    this.initdata = event.data;
    this.getDependedFieldsData(this.initdata)
    this.formDetails.stngs.deleteBtn = true;
    this.formDetails.stngs.saveBtn = false;
    this.formDetails.stngs.oper_mode = "delete"
    this.openSideBar();
  }

  openSideBar = function () {
    this._dsSidebarService.getSidebar('addFormPanel').toggleOpen();
  }
  closeSideBar = function () {
    this._dsSidebarService.getSidebar('addFormPanel').toggleOpen();
  }
  getDependedFieldsData(data: any) {
    this.fields.forEach(element => {
      if (element.isCustom) {
        if (data.hasOwnProperty(element.customData.input_key)) {
          element['options'] = [];
          let rte = element.customData.route.replace(element.customData.input_key, data[element.customData.input_key])
          this.crdsrv.get(rte).subscribe((res) => {
            let data = res['data'];
            console.log(data)
            data.forEach(d => {
              element['options'].push({
                key: d[element.customData.key],
                label: d[element.customData.label_key]
              })
            })
          })
        }
      }
    });

  }

  onToolbarPreparing(e) {
    // console.log(e);
    e.toolbarOptions.items.unshift({
      location: 'after',
      widget: 'dxButton',
      options: {
        icon: 'plus',
        text: 'Add New' + this.formDetails.stngs.form_title,
        onClick: this.addNewEntry.bind(this, 'new'),
        bindingOptions: {
          'disabled': 'isEmailButtonDisabled'
        }
      }
    });
  }
}
