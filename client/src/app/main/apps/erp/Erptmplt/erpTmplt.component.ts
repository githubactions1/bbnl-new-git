import { Component, OnInit, ViewChild } from '@angular/core';
import { CrudService } from 'app/main/apps/crud.service';
import { DsSidebarService } from '@glits/components/sidebar/sidebar.service';
import { AtomService } from 'app/main/services/atom.service';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition, MatDialog } from '@angular/material';
import { DeleteDialogComponent } from 'app/main/shared/components/delete-dialog/delete-dialog.component';
import { MessageDialogComponent } from 'app/main/shared/components/message-dialog/message-dialog.component';




@Component({
  selector: 'app-erpTmplt',
  templateUrl: './erpTmplt.component.html',
  styleUrls: ['./erpTmplt.component.scss']
})
export class ErptmpltComponent implements OnInit {
  columnDefs: any;
  gridData: any;
  initdata: any;
  gridApi;
  updateButton: boolean = false;
  saveButton: boolean = true;
  permissions;
  mainMessage;
  loader:boolean;
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  confirmDialogRef: MatDialogRef<DeleteDialogComponent>;
  dialogRef: any;
  confirmMsgDialogRef: MatDialogRef<MessageDialogComponent>;
  count = 0;
  getRowHeight = function () { return 40; }
  getHeaderDtls = function () { return { "title": this.formDetails.stngs.form_title, "icon": "receipt" } }
  public fields: any[] = [
    { type: 'pk', name: 'tmple_id', label: 'Erp Template Identifier', isCustom: false, customData: {}, required: false, hidden: true },

    { type: 'text', name: 'tmple_cd', label: 'Erp template code', isCustom: false, customData: { "route": null, "input_key": null, "key": null, "label_key": null, "label": null, "table": null }, value: '', required: false, hidden: false },
    { type: 'text', name: 'tmple_nm', label: 'Erp template name', isCustom: false, customData: { "route": null, "input_key": null, "key": null, "label_key": null, "label": null, "table": null }, value: '', required: false, hidden: false },
    { type: 'dropdown', name: 'tmple_type_id', label: '', isCustom: true, customData: { "route": "erp/erpTmpltTyp", "input_key": null, "key": "tmple_type_id", "label_key": "tmple_type_nm", "label": null, "table": "erp_tmple_type_lst_t" }, value: '', required: false, hidden: false },
    { type: 'textarea', name: 'tmple_dscrn_tx', label: 'Template dscription', isCustom: false, customData: { "route": null, "input_key": null, "key": null, "label_key": null, "label": null, "table": null }, multiline: true, rowcount: 6, value: '', required: false, hidden: false },
  ];
  public formDetails: any = {
    fnctns: {},
    apis: {
      "sel_url": "erp/erpTmplt",
      "upd_url": "erp/erpTmplt/:tmple_id",
      "ins_url": "erp/erpTmplt",
      "del_url": "erp/erpTmplt/:tmple_id"
    },
    initdata: {},
    fields: this.fields,
    key_field: ["tmple_id"],
    stngs: {
      "style": "mat",
      "saveBtn": true,
      "saveAsBtn": false,
      "closeBtn": true,
      "model_style": "right",
      "form_title": "Revenue Sharing Template",
      "deleteBtn": false,
      "show_lables": false,
      "oper_mode": "new"

    }
  }
  tmpType: any;
  tmpCode: any;
  tmpName: any;
  ptnrsCount: any;
  number: any[];
  rgnTntPrcData: any[];
  regionsData: any;
  tmpTypeData: any;
  tenantsData: any;
  partnersData: any;
  tmpDescription: any;
  tmplID: any;
  shwPermMsg: string;
  constructor(private _dsSidebarService: DsSidebarService, public crdsrv: CrudService, public atmSrv: AtomService, public snackBar: MatSnackBar, public dialog: MatDialog) {
    this.initdata = {}
    // this.permissions = { "slct_in": 1, "insrt_in": 1, "updt_in": 1, "dlte_in": 1, "exprt_in": 0 };
    // const permTxt = 'ERP Template Creation';
    // const prmeRte = `user/permissions/${permTxt}`;
    // this.crdsrv.get(prmeRte).subscribe((res) => {
    //   // console.log(res['data'][0]);
    //  if (res['status'] == 200) {
    //     if (res['data'].length)
    //     {this.permissions = res['data'][0]; }
    //   }
    // });
  }
  ngOnInit() {
    this.atmSrv.dropDownData.subscribe((data) => {
      this.getDependedFieldsData(data);
    });
    this.getGridData();
    this.getFieldsCustomData();
    // this.AddPartners();
    this.areasORregionsLst();
    this.tmpTypeLst();
    this.partnersLst();
  }
  getFieldsCustomData() {
    this.fields.forEach(element => {
      if (element.isCustom) {
        let eleData = this.getCustomData(element.customData)
        element['options'] = eleData;
      }
    });
    // console.log(this.fields)
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
  getGridData() {
    this.loader=true;
    this.crdsrv.get(this.formDetails.apis.sel_url).subscribe((res) => {
      if (res['status'] == 200) {
        this.loader=false;
        if (res['perm']){
          this.permissions = res['perm'][0];
        } else{
          this.shwPermMsg = 'You do not have permissions to do this operation. Please contact Administrator to get permissions.';
        }
        // console.log(res['data']);
        this.gridData = res['data'];
        // console.log(this.gridData);
        let index = 0;
        let p = 0;
        for (var k = 0; k < this.gridData.length; k++) {
          index = index + 1;
          this.gridData[k].indx = index;
        }
        this.gridData.filter((m) => {
          p = 0;
          m.regions.filter((l) => {
            l['s_no'] = ++p;
          });
        });
        // console.log(this.gridData);
        this.columnDefs = [
          { headerName: 'Sno', field: 'indx', cellStyle:'center', cellClass: "pm-grid-number-cell", width: 50, sortable: true, filter: false },
          { headerName: 'Template code', field: 'tmple_cd', cellStyle:'left', cellClass: "pm-grid-number-cell", width: 150, sortable: true, filter: true },
          { headerName: 'Template name', field: 'tmple_nm', cellStyle:'left', cellClass: "pm-grid-number-cell", width: 150, sortable: true, filter: true },
          { headerName: 'Template description', field: 'tmple_dscrn_tx', cellStyle:'left', cellClass: "pm-grid-number-cell", width: 150, sortable: true, filter: true },
          { headerName: 'Template Type', field: 'tmple_type_nm', cellStyle:'center', cellClass: "pm-grid-number-cell", width: 150, sortable: true, filter: true },

        ];

      } 
      // else if (res['status'] == 404) {
      //   this.permissions = { "slct_in": 0, "insrt_in": 0, "updt_in": 0, "dlte_in": 0, "exprt_in": 0 }
      // }
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
    // this.openSideBar();
  }
  onEdit2(event) {

    this.formDetails.initdata = event.data;
    this.initdata = event.data;
    this.getDependedFieldsData(this.initdata)
    this.formDetails.stngs.deleteBtn = false;
    this.formDetails.stngs.saveBtn = true;
    this.formDetails.stngs.oper_mode = "edit"
    // this.openSideBar();
  }
  onDelete2(event) {
    this.formDetails.initdata = event.data;
    this.initdata = event.data;
    this.getDependedFieldsData(this.initdata)
    this.formDetails.stngs.deleteBtn = true;
    this.formDetails.stngs.saveBtn = false;
    this.formDetails.stngs.oper_mode = "delete"
    // this.openSideBar();
  }

  // openSideBar =function() {
  //   this._dsSidebarService.getSidebar('addFormPanel').toggleOpen();
  // }
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
  //my Template


  onToolbarPreparing(e) {
    // console.log(e);
    e.toolbarOptions.items.unshift({
      location: 'after',
      widget: 'dxButton',
      options: {
        icon: 'plus',
        text: 'Add New Template',
        onClick: this.openSideBar.bind(this, 'addFormPanel'),
        bindingOptions: {
          'disabled': 'isEmailButtonDisabled'
        }
      }
    });
  }
  areasORregionsLst() {
    let rte = 'erp/araType'
    this.crdsrv.get(rte).subscribe((res) => {
      this.regionsData = res['data']
    })
  }
  tmpTypeLst() {
    let rte = 'erp/erpTmpltTyp'
    this.crdsrv.get(rte).subscribe((res) => {
      this.tmpTypeData = res['data']
    })
  }
  partnersLst() {
    let rte = 'erp/erpprtnrslstt'
    this.crdsrv.get(rte).subscribe((res) => {
      this.partnersData = res['data']
    })
  }
  openSideBar(key) {
    // console.log(key);
    this.updateButton = false;
    this.saveButton = true;
    this._dsSidebarService.getSidebar(key).toggleOpen();
    this.AddPartners();
    // this.rgnTntPrcData =[];
  }
  saveTmpl() {
    // console.log(this.tmpCode);
    // console.log(this.tmpName);
    // console.log(this.tmpType);
    // console.log(this.tmpDescription);
    // console.log(this.rgnTntPrcData);
    let data = {
      tmple_cd: this.tmpCode,
      tmple_nm: this.tmpName,
      tmple_type_id: this.tmpType,
      tmple_dscrn_tx: this.tmpDescription,
    }
    // console.log(data);
    let rte = 'erp/erpTmplt'
    this.crdsrv.create(data, rte).subscribe((res) => {
      // console.log(res['data'].insertId);
      if (res['data'].insertId > 0) {
        let data = {
          tmple_id: res['data'].insertId,
          rgnsPrtnrsData: this.rgnTntPrcData
        }
        // console.log(data);
        let rte = 'erp/erpTmpltprtnrs'
        this.crdsrv.create(data, rte).subscribe((res) => {
          // console.log(res['data'].insertId);
          if (res['data'].insertId > 0) {
            this.snackBar.open("Sucessfully Added", '', {
              duration: 2000,
              panelClass: ['blue-snackbar'],
              horizontalPosition: this.horizontalPosition,
              verticalPosition: this.verticalPosition,
            });
          }
        })
      }
    })

  }
  //   valuechange(event){
  //     this.rgnTntPrcData =[];
  // console.log(event.target.value);
  // let number = event.target.value;
  // console.log(number)
  //  let count=1;
  // for(var i=0; i<number; i++){
  //   this.rgnTntPrcData.push({'id':count,'regions':'','tenants':'','percentage':''})
  //   count++
  // }
  // console.log(this.rgnTntPrcData);
  //   }
  AddPartners() {
    // this.rgnTntPrcData =[];
    // console.log(this.rgnTntPrcData);
    if (this.rgnTntPrcData == undefined) {
      this.rgnTntPrcData = [];
      // console.log(event);
      this.count = this.count + 1;
      // console.log(this.count);
      let incrmnt = 1;
      for (var i = 0; i < this.count; i++) {
        this.rgnTntPrcData.push({ 'id': incrmnt, 'regions': '', 'tenants': '', 'percentage': '' })
        incrmnt++
      }
      return;
    }
    if (this.rgnTntPrcData) {
      this.count=0;
      this.count = this.count + 1;
      // console.log(this.count);
      let incrmnt = 1;
      for (var i = 0; i < this.count; i++) {
        this.rgnTntPrcData.push({ 'id': incrmnt, 'regions': '', 'tenants': '', 'percentage': '' })
        incrmnt++
      }
    }
    // this.rgnTntPrcData = [];
    // this.count = this.count+1;
    // console.log(this.count);
    // let incrmnt=1;
    // for(var i=0; i<this.count; i++){
    //   this.rgnTntPrcData.push({'id':incrmnt,'regions':'','tenants':'','percentage':''})
    //   incrmnt++
    // }
  }

  delete(array, index) {
    var arr = array
    var dlindex = index
    arr.splice(dlindex, 1);
    this.count = this.count - 1;
  }

  editData(editData) {
	this.rgnTntPrcData = []
    this.updateButton = true;
    this.saveButton = false;
    // console.log(editData);
    this.tmplID = editData.data.tmple_id
    this.tmpCode = editData.data.tmple_cd;
    this.tmpName = editData.data.tmple_nm;
    this.tmpDescription = editData.data.tmple_dscrn_tx;
    this.tmpType = editData.data.tmple_type_id;
    // console.log(this.rgnTntPrcData);
    for (var i = 0; i < editData.data.regions.length; i++) {
      this.rgnTntPrcData.push({ 'id': '', 'regions': editData.data.regions[i].ara_type_id, 'tenants': editData.data.regions[i].prtnr_id, 'percentage': editData.data.regions[i].Percentage })
    }

    this._dsSidebarService.getSidebar('addFormPanel').toggleOpen();

  }
  deleteData(delData) {
    this.confirmMsgDialogRef = this.dialog.open(MessageDialogComponent, {
      width: '25%',
      panelClass: 'my-class',
      data: {
          title: '',
          msg: 'Are you sure, you want to Delete this Template',
          btnLst: [{
              label: 'Ok',
              res: 'ok'
          },{
            label: 'Cancel',
            res: 'cancel'
        }]
      }
  });
  this.confirmMsgDialogRef.afterClosed().subscribe((response) => {
    if (response) { 
      if(response == 'ok'){
        // console.log(delData);
        let rte = `erp/erpTmplt/${delData.data.tmple_id}`
        // console.log(rte);
        this.crdsrv.delete(rte).subscribe((res) => {
          // console.log(res['status']);
          if (res['status'] == 200) {
            let rte = `erp/erpTmpltPrtnrRel/${delData.data.tmple_id}`
            this.crdsrv.delete(rte).subscribe((res) => {
              // console.log(res['status']);
              if(res['status'] == 200){
                this.getGridData();
              }
            })
          }
    
        })
      }
      else{
        this.getGridData();
      }
    }
  })
  }
  updtTmpl() {
    // console.log("updating");
    // console.log(this.tmplID);
    // console.log(this.tmpCode);
    // console.log(this.tmpName);
    // console.log(this.tmpDescription);
    // console.log(this.tmpType);
    // console.log(this.rgnTntPrcData);
    let postUpdata = {
      tmple_cd: this.tmpCode,
      tmple_nm: this.tmpName,
      tmple_type_id: this.tmpType,
      tmple_dscrn_tx: this.tmpDescription,
    }
    let rte = `erp/erpTmplt/${this.tmplID}`
    // console.log(rte);
    this.crdsrv.update(postUpdata, rte).subscribe((res) => {
      // console.log(res['status']);
      if (res['status'] == 200) {
        let postUdata = {
          tmp_id: this.tmplID,
          rgnsPrtnrsUpData: this.rgnTntPrcData
        }
        // console.log(postUdata);
        let rte = 'erp/erpTmpltprtnrsUpdate'
        this.crdsrv.create(postUdata, rte).subscribe((res) => {
          // console.log(res['status']);
          if (res['status'] == 200) {
            this.snackBar.open("Sucessfully Updated", '', {
              duration: 2000,
              panelClass: ['blue-snackbar'],
              horizontalPosition: this.horizontalPosition,
              verticalPosition: this.verticalPosition,
            });
          }
        })
      }
    })
  }
}
