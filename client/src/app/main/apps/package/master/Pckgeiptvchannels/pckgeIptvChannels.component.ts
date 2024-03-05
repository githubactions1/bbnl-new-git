import { Component, OnInit, ViewChild } from '@angular/core';
import { CrudService } from 'app/main/apps/crud.service';
import { DsSidebarService } from '@glits/components/sidebar/sidebar.service';
import { AtomService } from 'app/main/services/atom.service';
import { MessageDialogComponent } from 'app/main/shared/components/message-dialog/message-dialog.component';
import { MatDialogRef, MatDialog, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition, MatSnackBar } from '@angular/material';
//  import {
//   MatTableDataSource, MatPaginator, MatSort, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition, MatDialogRef, MatSnackBar, MatDialog,
//   MAT_DIALOG_DATA
// } from '@angular/material';
@Component({
  selector: 'app-pckgeIptvChannels',
  templateUrl: './pckgeIptvChannels.component.html',
  styleUrls: ['./pckgeIptvChannels.component.scss']
})
export class PckgeiptvchannelsComponent implements OnInit {
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  columnDefs: any;
  gridData: any;
  initdata: any;
  gridApi;
  permissions;
  mainMessage;
  confirmMsgDialogRef: MatDialogRef<MessageDialogComponent>;
  loader: boolean;
  getRowHeight = function () { return 40; }
  getHeaderDtls = function () { return { "title": this.formDetails.stngs.form_title, "icon": "receipt" } }
  public fields: any[] = [
    { type: 'pk', name: 'chnle_id', label: 'Channel Identifier', isCustom: false, customData: {}, required: false, hidden: true },

    { type: 'text', name: 'chnle_nm', label: 'Channel Name', isCustom: false, customData: { "route": null, "input_key": null, "key": null, "label_key": null, "label": null, "table": null }, value: '', required: false, hidden: false },
    { type: 'dropdown', name: 'cre_srvce_id', label: 'Core Service', isCustom: true, customData: { "route": "package/cresrvce", "input_key": null, "key": "cre_srvce_id", "label_key": "cre_srvce_nm", "label": "Core Service", "table": "cre_srvce_lst_t" }, value: '', required: false, hidden: false },
    { type: 'text', name: 'chnle_cd', label: 'Channel Number code', isCustom: false, customData: { "route": null, "input_key": null, "key": null, "label_key": null, "label": null, "table": null }, value: '', required: false, hidden: false },
    { type: 'text', name: 'chnle_hndlr_tx', label: 'Channel Handler', isCustom: false, customData: { "route": null, "input_key": null, "key": null, "label_key": null, "label": null, "table": null }, value: '', required: false, hidden: false },
    { type: 'dropdown', name: 'lnge_id', label: 'Language', isCustom: true, customData: { "route": "package/languanges", "input_key": null, "key": "lnge_id", "label_key": "lnge_nm", "label": "Language", "table": "lnge_lst_t" }, value: '', required: false, hidden: false },
    { type: 'dropdown', name: 'brdcr_id', label: 'Broadcaster', isCustom: true, customData: { "route": "package/broadcasters", "input_key": null, "key": "brdcr_id", "label_key": "brdcr_nm", "label": "Broadcaster", "table": "brdcr_lst_t" }, value: '', required: false, hidden: false },
    { type: 'text', name: 'msp_cd', label: 'MSP Code', isCustom: false, customData: { "route": null, "input_key": null, "key": null, "label_key": null, "label": null, "table": null }, value: '', required: false, hidden: false },
  ];
  public formDetails: any = {
    fnctns: {},
    apis: {
      "sel_url": "package/pckgeIptvChannels",
      "upd_url": "package/pckgeIptvChannels/:chnle_id",
      "ins_url": "package/pckgeIptvChannels",
      "del_url": "package/pckgeIptvChannels/:chnle_id"
    },
    initdata: {},
    fields: this.fields,
    key_field: ["chnle_id"],
    stngs: {
      "style": "mat",
      "saveBtn": true,
      "saveAsBtn": false,
      "closeBtn": true,
      "model_style": "right",
      "form_title": "Package IPTV Channels",
      "deleteBtn": false,
      "show_lables": false,
      "oper_mode": "new"

    }
  }
  constructor(private _dsSidebarService: DsSidebarService, public dialog: MatDialog, public crdsrv: CrudService, public atmSrv: AtomService, public snackBar: MatSnackBar) {
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
    'perm_url': 'user/permissions/Package IptvChannels'
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
    this.loader = true;
    this.crdsrv.get(this.formDetails.apis.sel_url).subscribe((res) => {
      if (res['status'] == 200) {
        this.loader = false;
        this.permissions = (res['perm'] === undefined) ? this.permissions : res['perm'][0];
        if (this.user.permissions.slct_in == 0) this.mainMessage = "You do not have permissions to do this operation. Please contact Administrator to get user.permissions."
        if (res['data'].length == 0) this.mainMessage = "No entries found in the database."

        this.gridData = res['data'];
        this.columnDefs = [
          { headerName: 'Sno', field: 'sno', alignment: 'center', cellClass: "pm-grid-number-cell", width: 100, sortable: true, filter: false },
          { headerName: 'Channel Name', field: 'chnle_nm', alignment: 'left', width: 150, cellClass: "pm-grid-number-cell" },
          { headerName: 'Channel Code', field: 'chnle_cd', alignment: 'center', cellClass: "pm-grid-number-cell", width: 100, sortable: true, filter: true },
          { headerName: 'Language', field: 'lnge_nm', alignment: 'left', cellClass: "pm-grid-number-cell", width: 100, sortable: true, filter: true },
          { headerName: 'Broadcaster', field: 'brdcr_nm', alignment: 'left', cellClass: "pm-grid-number-cell", width: 250, sortable: true, filter: true },
          { headerName: 'Channel Handler', field: 'chnle_hndlr_tx', hide: true, alignment: 'left', cellClass: "pm-grid-number-cell", width: 550, sortable: true, filter: true },
          { headerName: 'MSP Code', field: 'msp_cd', alignment: 'center', cellClass: "pm-grid-number-cell", width: 100, sortable: true, filter: true },
        ];

      } else if (res['status'] == 404) {
        this.permissions = { "slct_in": 0, "insrt_in": 0, "updt_in": 0, "dlte_in": 0, "exprt_in": 0 }
      }
    })
  }


  onToolbarPreparing(e) {
    e.toolbarOptions.items.unshift({
      location: 'after',
      widget: 'dxButton',
      options: {
        icon: 'refresh',
        text: 'Refresh',
        onClick: this.refrshChnles.bind(this, '')
      }
    });
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

  refrshChnles() {
    this.confirmMsgDialogRef = this.dialog.open(MessageDialogComponent, {
      width: '25%',
      panelClass: 'my-class',
      data: {
        title: 'Are you sure',
        msg: 'Do You Want To Refresh Channels',
        icon: 'account_box',
        btnLst: [{
          label: 'Yes',
          res: 'yes'
        }, {
          label: 'No',
          res: 'no'
        }]
      }
    });

    this.confirmMsgDialogRef.afterClosed().subscribe((response) => {
      if (response) {
        if (response === 'yes') {
          this.loader = true;
          let rte = `package/refrshChnles`
          this.crdsrv.get(rte).subscribe((res) => {
            if (res['status'] == 200) {
              this.loader = false;
              if (res['data'] == 0) {
                this.snackBar.open("No New Channels Added", '', {
                  duration: 3000,
                  horizontalPosition: this.horizontalPosition,
                  verticalPosition: this.verticalPosition,
                });
              }
              else if (res['data'] == 1) {
                this.snackBar.open("Added " + res['data'] + " New Channel", '', {
                  duration: 3000,
                  horizontalPosition: this.horizontalPosition,
                  verticalPosition: this.verticalPosition,
                });
              }
              else {
                this.snackBar.open("Added " + res['data'] + " New Channels", '', {
                  duration: 3000,
                  horizontalPosition: this.horizontalPosition,
                  verticalPosition: this.verticalPosition,
                });
              }
              this.getGridData();
            }
          })
        }
      }
    });

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
}
