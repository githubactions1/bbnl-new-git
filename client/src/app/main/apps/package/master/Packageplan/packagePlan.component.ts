import { Component, OnInit, ViewChild } from '@angular/core';
import { CrudService } from 'app/main/apps/crud.service';
import { DsSidebarService } from '@glits/components/sidebar/sidebar.service';
import { AtomService } from 'app/main/services/atom.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { DeleteDialogComponent } from 'app/main/shared/components/delete-dialog/delete-dialog.component';
import { DatePipe } from '@angular/common';
import {
  MatTableDataSource, MatPaginator, MatSort, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition, MatDialogRef, MatSnackBar, MatDialog,
  MAT_DIALOG_DATA
} from '@angular/material';
import { eraseStyles } from '@angular/animations/browser/src/util';
@Component({
  selector: 'app-packagePlan',
  templateUrl: './packagePlan.component.html',
  styleUrls: ['./packagePlan.component.scss']
})
export class PackageplanComponent implements OnInit {
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  confirmDialogRef: MatDialogRef<DeleteDialogComponent>;
  loader: boolean;
  columnDefs: any;
  gridData: any;
  initdata: any;
  gridApi;
  permissions;
  mainMessage;
  packageForm: FormGroup;
  leftsidebarHdng;
  data;
  selectedid = [];
  cresrvcslst;
  cresrvc_id;
  caftypeLst;
  srvcpcklst = [];
  srvcpcktypelst;
  srvctype;
  resdata;
  grdLst;
  editData;
  editClicked: boolean = false;
  editpckge: boolean;
  shwslctdsrvcs: boolean;
  nwsrvcpck = [];
  newdata = [];
  isChecked: boolean;
  tx_prcnt = '18%';
  shwLdr: boolean = true;
  iptvextrnlrspnse:boolean=false;
  getRowHeight = function () { return 40; }
  getHeaderDtls = function () { return { "title": this.formDetails.stngs.form_title, "icon": "receipt" } }
  public fields: any[] = [
    { type: 'pk', name: 'pckge_id', label: 'plan Identifier', isCustom: false, customData: {}, required: false, hidden: true },

    { type: 'text', name: 'pckge_nm', label: 'Plan Name', isCustom: false, customData: { "route": null, "input_key": null, "key": null, "label_key": null, "label": null, "table": null }, value: '', required: false, hidden: false },
    { type: 'text', name: 'efcte_dt', label: 'efcte Date', isCustom: false, customData: { "route": null, "input_key": null, "key": null, "label_key": null, "label": null, "table": null }, value: '', required: false, hidden: false },
    { type: 'text', name: 'expre_dt', label: 'expiry date', isCustom: false, customData: { "route": null, "input_key": null, "key": null, "label_key": null, "label": null, "table": null }, value: '', required: false, hidden: false },
    { type: 'dropdown', name: 'caf_type_id', label: 'Caf Type', isCustom: true, customData: { "route": "caf/caf-type", "input_key": null, "key": "caf_type_id", "label_key": "caf_type_nm", "label": "Caf Type", "table": "caf_type_lst_t" }, value: '', required: false, hidden: false },
    { type: 'text', name: 'chrge_at', label: 'charge amount', isCustom: false, customData: { "route": null, "input_key": null, "key": null, "label_key": null, "label": null, "table": null }, value: '', required: false, hidden: false },
    { type: 'text', name: 'gst_at', label: 'GST amount', isCustom: false, customData: { "route": null, "input_key": null, "key": null, "label_key": null, "label": null, "table": null }, value: '', required: false, hidden: false },
  ];
  public formDetails: any = {
    fnctns: {},
    apis: {
      "sel_url": "package/packagePlan",
      "upd_url": "package/packagePlan/:pckge_id",
      "ins_url": "package/packagePlan",
      "del_url": "package/packagePlan/:pckge_id"
    },
    initdata: {},
    fields: this.fields,
    key_field: ["pckge_id"],
    stngs: {
      "style": "mat",
      "saveBtn": true,
      "saveAsBtn": false,
      "closeBtn": true,
      "model_style": "right",
      "form_title": "Package/Plan/Product",
      "editbtn": false,
      "show_lables": false,
      "oper_mode": "new"

    }
  }
  updateData: any;
  sideBarHeader: string;
  olslctdpcks: any[];
  delData: any;
  delbtnclickData = [];
  chrgeTypLst: any;
  srvcsLst = [];
  pckgeColumns = [];
  grdLst1: any;
  constructor(private _dsSidebarService: DsSidebarService, public crdsrv: CrudService, public atmSrv: AtomService, public datePipe: DatePipe, public snackBar: MatSnackBar, public dialog: MatDialog) {
    this.initdata = {}
    // this.permissions = { "slct_in": 1, "insrt_in": 1, "updt_in": 1, "dlte_in": 1, "exprt_in": 0 }
    const permTxt = 'Package Plan';
    const prmeRte = `user/permissions/${permTxt}`;
    this.crdsrv.get(prmeRte).subscribe((res) => {
      // console.log(res['data'][0]);
      if (res['status'] == 200) {
        if (res['data'].length)
          this.permissions = res['data'][0];
      }
    });
  }
  ngOnInit() {
    this.shwslctdsrvcs = false
    this.getGridData();
    this.packageForm = new FormGroup({
      cre_srvce_id: new FormControl('', Validators.required),
      srvcpk_type_id: new FormControl(''),
      pckge_nm: new FormControl(''),
      caf_type_id: new FormControl('', Validators.required),
      efcte_dt: new FormControl('', Validators.required),
      expre_dt: new FormControl('', Validators.required),
      chrge_at: new FormControl(''),
      gst_at: new FormControl('', Validators.required),
      glbl_in: new FormControl(''),
      lckn_dys_ct: new FormControl('', Validators.required),
      chrge_cde_id: new FormControl(''),
      srvcpk_id: new FormControl(''),
      tx_prcnt: new FormControl({ value: '', disabled: true })
    });
  }
  getCreSrvcs() {
    let rte1 = `package/cresrvce`
    this.crdsrv.get(rte1).subscribe((res) => {
      this.cresrvcslst = res['data'];
    }, (error) => {
    });
  }

  getChrgTyp() {
    let rte1 = `package/ChrgTyp`
    this.crdsrv.get(rte1).subscribe((res) => {
      this.chrgeTypLst = res['data'];
    }, (error) => {
    });
  }
  getFieldsCustomData() {
    this.fields.forEach(element => {
      if (element.isCustom) {
        let eleData = this.getCustomData(element.customData)
        element['options'] = eleData;
      }
    });
  }
  getCustomData(customData) {
    let options = [];
    if (customData.input_key == null) {
      this.crdsrv.get(customData.route).subscribe((res) => {
        let data = res['data'];
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
    this.loader = true;
    let rte = `package/getpackages`
    this.crdsrv.get(rte).subscribe((res) => {
      if (res['status'] == 200) {
        this.loader = false;
        this.permissions = (res['perm'] === undefined) ? this.permissions : res['perm'][0];
        if (this.permissions.slct_in == 0) this.mainMessage = "You do not have permissions to do this operation. Please contact Administrator to get permissions."
        if (res['data'].length == 0) this.mainMessage = "No entries found in the database."

        this.gridData = res['data'];
        let counter = 0;
        this.grdLst = this.gridData;
        this.shwLdr = false;
        let pckgeCt = 0;
        var formatter = new Intl.NumberFormat('en-IN', {
          style: 'currency',
          currency: 'INR',
        })

        this.grdLst.filter((k) => {
          pckgeCt = 0;
          k['sno'] = ++counter;
          k['frmtotal'] = formatter.format(k.total)
          k['gst'] = formatter.format(k.gst_at)
          k['chrg'] = formatter.format(k.chrg_at)
          k.srvcpcks.filter((l) => {

            l['s_no'] = ++pckgeCt;
          });
        });

        // this.grdLst.filter((k) => {
        //   k['sno'] = ++counter;
        // });
        this.columnDefs = [
          { headerName: 'Sno', field: 'sno', alignment: 'center', cellClass: "pm-grid-number-cell", width: 50, sortable: true, filter: false, columnFiltering: false },
          { headerName: 'Package Name', field: 'pckge_nm', alignment: 'left', cellClass: "pm-grid-number-cell", sortable: true, filter: true, columnFiltering: false },
          { headerName: 'Package Type', field: 'srvcpk_type_nm', alignment: 'left', cellClass: "pm-grid-number-cell", sortable: true, filter: true, columnFiltering: true },
          { headerName: 'Effective Date', field: 'efcte_dt', alignment: 'center', cellClass: "pm-grid-number-cell", sortable: true, filter: true, columnFiltering: false },
          { headerName: 'Expire date', field: 'expry_dt', alignment: 'center', cellClass: "pm-grid-number-cell", sortable: true, filter: true, columnFiltering: false },
          { headerName: 'Customer Type', field: 'caf_type_nm', alignment: 'center', cellClass: "pm-grid-number-cell", sortable: true, filter: true, columnFiltering: false },
          {
            headerName: 'Package Cost', field: 'chrg', alignment: 'right',
            cellClass: "pm-grid-number-cell", sortable: true, filter: true, columnFiltering: false
          },
          {
            headerName: 'GST', field: 'gst', alignment: 'right',
            cellClass: "pm-grid-number-cell", sortable: true, filter: true, columnFiltering: false
          },
          {
            headerName: 'Total Cost', field: 'frmtotal', alignment: 'right',
            cellClass: "pm-grid-number-cell", sortable: true, filter: true, columnFiltering: false
          }
        ];
        let counter1 = 0;
        this.grdLst1 = this.grdLst.srvcpcks;
        this.shwLdr = false;
        // this.grdLst1.filter((k) => {
        //   k['sno'] = ++counter1;
        // });
        this.pckgeColumns = [
          { headerName: 'Sno', field: 's_no', alignment: 'center', cellClass: "pm-grid-number-cell", width: 50, sortable: true, filter: false, columnFiltering: false },
          { headerName: 'Service Pack', field: 'srvcpk_nm', alignment: 'left', cellClass: "pm-grid-number-cell", filter: false, search: false },
          { headerName: 'Core Service', field: 'cre_srvce_nm', alignment: 'left', cellClass: "pm-grid-number-cell", filter: true },
          { headerName: 'Charges', field: 'chrgTyp', alignment: 'left', cellClass: "pm-grid-number-cell", filter: true },
          { headerName: 'Amount', field: 'chrge_at', alignment: 'right', type: 'currency', currency: 'INR', precision: '2', cellClass: "pm-grid-number-cell", filter: true },
          {
            headerName: 'GST', field: 'gst_at', alignment: 'right', type: 'currency', currency: 'INR', precision: '2',
            cellClass: "pm-grid-number-cell", filter: false, search: false
          }
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
    this.formDetails.stngs.editbtn = false;
    this.formDetails.stngs.saveBtn = true;
    this.initdata = {}
    this.openSideBar();
  }

  onEdit2(event) {
    this.editData = event.data
    this.editClicked = true;
    this.editpckge = true;
    this.formDetails.stngs.editbtn = true;
    this.formDetails.stngs.saveBtn = false;
    let name = 'addFormPanel'
    this.openSideBar1(name, 'edit', this.editData);
  }

  onDelete2(event) {
    let delData = event.data
    this.delete(delData)
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
    e.toolbarOptions.items.unshift({
      location: 'after',
      widget: 'dxButton',
      options: {
        icon: 'user',
        text: 'Add New Package/Plan/Product',
        onClick: this.openSideBar1.bind(this, 'addFormPanel', 'new')
      }
    });
  }

  openSideBar1(key, value, data) {
    if (value == 'new') {
      this.leftsidebarHdng = 'Add New Package'
      this._dsSidebarService.getSidebar(key).toggleOpen();
      this.editClicked = false;
      this.editpckge = false;
      this.getCreSrvcs()
      this.getcaftype()
      this.getsrvctype()
      this.getChrgTyp()
      this.srvcpcklst = [];
      this.srvcsLst = [];
      this.packageForm.reset();
      this.shwslctdsrvcs = false
      this.packageForm.get('cre_srvce_id').setValue('');
      this.packageForm.get('srvcpk_type_id').setValue('');
      this.packageForm.get('pckge_nm').setValue('');
      this.packageForm.get('caf_type_id').setValue('');
      this.packageForm.get('efcte_dt').setValue('');
      this.packageForm.get('expre_dt').setValue('');
      this.packageForm.get('chrge_at').setValue('');
      this.packageForm.get('gst_at').setValue('');
      this.packageForm.get('lckn_dys_ct').setValue('')
      this.packageForm.get('srvcpk_id').setValue('');
      this.packageForm.get('tx_prcnt').setValue(this.tx_prcnt);
    }
    else if (value == 'edit') {
      this.leftsidebarHdng = 'Edit Package'
      this.editClicked = true;
      this.editpckge=true;
      this.srvcpcklst = []
      this._dsSidebarService.getSidebar(key).toggleOpen();
      this.getCreSrvcs()
      this.getcaftype()
      this.getsrvctype()
      this.getChrgTyp()
      this.sideBarHeader = 'Edit';
      this.shwslctdsrvcs = true
      this.packageForm.get('cre_srvce_id').setValue('');
      this.packageForm.get('srvcpk_type_id').setValue(data.pckge_type_id);
      this.packageForm.get('chrge_cde_id').setValue(data.chrge_cde_id)
      this.packageForm.get('pckge_nm').setValue(data.pckge_nm);
      this.packageForm.get('caf_type_id').setValue(data.caf_type_id);
      let date = this.datePipe.transform(data.date, "yyyy-MM-dd");
      let date1 = this.datePipe.transform(data.date1, "yyyy-MM-dd");
      data.srvcpcks.filter(i => {
        i['isActive'] = true
        i['totamnt'] = i['chrge_at']+ i['gst_at']
      })
      this.srvcsLst = data.srvcpcks;
      this.packageForm.get('efcte_dt').setValue(date);
      this.packageForm.get('expre_dt').setValue(date1);
      this.packageForm.get('chrge_at').setValue('');
      this.packageForm.get('tx_prcnt').setValue(this.tx_prcnt);
      if (data.glbl_in == 1) {
        this.packageForm.get('glbl_in').setValue(true);
      }
      else {
        this.packageForm.get('glbl_in').setValue(false);
      }
      this.packageForm.get('lckn_dys_ct').setValue(data.lckn_dys_ct)
    }
    else {
      this._dsSidebarService.getSidebar(key).toggleOpen();
    }
  }

  selectedcresrvc() {
    this.getSrvcs()
  }

  getSrvcs() {
    this.srvcpcklst = [];
    this.srvctype = this.packageForm.get('srvcpk_type_id').value
    this.cresrvc_id = this.packageForm.value.cre_srvce_id.cre_srvce_id
    this.loader = true;
    let rte1 = 'package/srvcpcks/' + this.cresrvc_id
    this.crdsrv.get(rte1).subscribe((res) => {
      if (res['status'] == 200) {
        this.loader = false;
        if (this.srvctype == 1) {
          for (let i = 0; i < res['data'].length; i++) {
            if (res['data'][i].srvcpk_type_id == 1) {
              this.srvcpcklst.push(res['data'][i])
            }
          }
        }
        else if (this.srvctype == 2) {
          for (let i = 0; i < res['data'].length; i++) {
            if (res['data'][i].srvcpk_type_id == 2) {
              this.srvcpcklst.push(res['data'][i])
            }
          }
        }
        if (this.editClicked == true) {
          for (let k = 0; k < this.srvcpcklst.length; k++) {
            for (let l = 0; l < this.selectedid.length; l++) {
              if (this.srvcpcklst[k].srvcpk_id == this.selectedid[l].srvcpk_id) {
                this.srvcpcklst[k].isActive = true
              }
            }
          }
        }
        else {
          for (let k = 0; k < this.srvcpcklst.length; k++) {
            for (let l = 0; l < this.selectedid.length; l++) {
              if (this.srvcpcklst[k].srvcpk_id == this.selectedid[l].srvcpk_id) {
                this.srvcpcklst[k].isActive = true
              }
            }
          }
        }
      }

    }, (error) => {
    });
  }

  getcaftype() {
    this.cresrvc_id = this.packageForm.get('cre_srvce_id').value
    let rte1 = 'caf/caf-type'
    this.crdsrv.get(rte1).subscribe((res) => {
      this.caftypeLst = res['data'];
    }, (error) => {
    });
  }

  getsrvctype() {
    let rte1 = 'package/packageServicetype'
    this.crdsrv.get(rte1).subscribe((res) => {
      this.srvcpcktypelst = res['data'];
    }, (error) => {
    });
  }

  savePackage() {
    if (this.editClicked == true) {
      let edtdata = this.packageForm.value
      edtdata.efcte_dt = this.datePipe.transform(edtdata.efcte_dt, "yyyy-MM-dd"),
        edtdata.expre_dt = this.datePipe.transform(edtdata.expre_dt, "yyyy-MM-dd"),
        edtdata['edtpcks'] = this.srvcsLst
      if (edtdata.glbl_in == true) {
        edtdata.glbl_in = 1
      }
      else {
        edtdata.glbl_in = 0
      }
      edtdata['pckge_id'] = this.editData.pckge_id;
      let rte = 'package/packagePlan/' + this.editData.pckge_id;
      console.log(edtdata)
      this.crdsrv.create(edtdata, rte).subscribe((res) => {
        if (res['status'] == 200) {
          edtdata.edtpcks.filter((s)=>{
            var iptvary
            if(s.cre_srvce_id == 2 && s.isActive == true && s.isNew == true)
            {
              iptvary=s
              iptvary["pkgedt"]=this.editClicked
              iptvary["pckge_id"]=this.editData.pckge_id
              let rte = 'package/iptvextnlcall'
              this.crdsrv.create(iptvary, rte).subscribe((res) => {
              },(error) => {
              })
            }
          })
            this.snackBar.open("Package Updated Sucessfully", '', {
              duration: 3000,
              horizontalPosition: this.horizontalPosition,
              verticalPosition: this.verticalPosition,
            });
            this.openSideBar1('addFormPanel', null, null);
            this.getGridData();
        }
      }, (error) => {
      });

    }
    else {
      let data = this.packageForm.value;
      this.packageForm.value.efcte_dt = this.datePipe.transform(this.packageForm.value.efcte_dt, "yyyy-MM-dd");
      this.packageForm.value.expre_dt = this.datePipe.transform(this.packageForm.value.expre_dt, "yyyy-MM-dd");
      if (this.packageForm.value.glbl_in == true) {
        this.packageForm.value.glbl_in = 1;
      }
      else {
        this.packageForm.value.glbl_in = 0
      }
      data["selectedsrvcpcks"] = this.srvcsLst;
      let rte = 'package/packagePlan'
      this.crdsrv.create(data, rte).subscribe((res) => {
        if (res['status'] == 200) {
          data.selectedsrvcpcks.filter((s)=>{
            var iptvary={}
            if(s.cre_srvce_id == 2 && s.isActive == true && s.isNew == true)
            {
              iptvary=s
              iptvary["pkgedt"]=this.editClicked
              iptvary["pckge_id"]=res['data']
              let rte = 'package/iptvextnlcall'
              this.crdsrv.create(iptvary, rte).subscribe((res) => {
              },(error) => {
              })
            }
          })
            this.snackBar.open("Package Created Sucessfully", '', {
              duration: 3000,
              horizontalPosition: this.horizontalPosition,
              verticalPosition: this.verticalPosition,
            });
            this.openSideBar1('addFormPanel', null, null);
            this.getGridData();
        }

      }, (error) => {
      });
    }
  }

  addService() {
    let gst = 0;
    let amnt = 0;
    let totamnt = 0;
    amnt = this.packageForm.get('chrge_at').value;
    gst = amnt * 18 / 100;
    this.packageForm.get('gst_at').setValue(gst);
    totamnt = amnt + gst;
    let slctd_cre_srvc_in = 0;
    if (this.srvcsLst.length == 0) {
      this.srvcsLst.push(
        {
          srvcpk_id: this.packageForm.value.srvcpk_id.srvcpk_id,
          srvcpk_nm: this.packageForm.value.srvcpk_id.srvcpk_nm,
          cre_srvce_id: this.packageForm.value.cre_srvce_id.cre_srvce_id,
          cre_srvce_nm: this.packageForm.value.cre_srvce_id.cre_srvce_nm,
          chrgTyp_id: this.packageForm.value.chrge_cde_id.chrge_cde_id,
          chrgTyp: this.packageForm.value.chrge_cde_id.chrge_cde_dscn_tx,
          chrge_at: this.packageForm.value.chrge_at.toFixed(2),
          gst_at: this.packageForm.value.gst_at.toFixed(2),
          totamnt: totamnt.toFixed(2),
          isActive: true,
          isNew: true,
          pkgenm:this.packageForm.value.pckge_nm,
          pkgetypeid:this.packageForm.value.srvcpk_type_id,
          glbl_in:this.packageForm.value.glbl_in
        }
      )
      this.shwslctdsrvcs = true;
    }
    else if (this.srvcsLst.length > 0) {
      this.shwslctdsrvcs = true;
      for (var i = 0; i < this.srvcsLst.length; i++) {
        if (this.srvcsLst[i].cre_srvce_id == this.packageForm.value.cre_srvce_id.cre_srvce_id) {
          slctd_cre_srvc_in = 1;
        }
      }
      if (!slctd_cre_srvc_in) {
        this.srvcsLst.push({
          srvcpk_id: this.packageForm.value.srvcpk_id.srvcpk_id,
          srvcpk_nm: this.packageForm.value.srvcpk_id.srvcpk_nm,
          cre_srvce_id: this.packageForm.value.cre_srvce_id.cre_srvce_id,
          cre_srvce_nm: this.packageForm.value.cre_srvce_id.cre_srvce_nm,
          chrgTyp_id: this.packageForm.value.chrge_cde_id.chrge_cde_id,
          chrgTyp: this.packageForm.value.chrge_cde_id.chrge_cde_dscn_tx,
          chrge_at: this.packageForm.value.chrge_at.toFixed(2),
          gst_at: this.packageForm.value.gst_at.toFixed(2),
          totamnt: totamnt.toFixed(2),
          isActive: true,
          isNew: true,
          pkgenm:this.packageForm.value.pckge_nm,
          pkgetypeid:this.packageForm.value.srvcpk_type_id,
          glbl_in:this.packageForm.value.glbl_in
        });
      }
      else {
        this.snackBar.open("Core Service already existed", '', {
          duration: 3000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
      }
    }
    this.packageForm.get('srvcpk_id').reset();
    this.packageForm.get('chrge_cde_id').reset();
    this.packageForm.get('chrge_at').reset();
  }

  delpackage() {
    this.delete(this.delData);
  }

  delete(data) {
    this.confirmDialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '25%',
      panelClass: 'my-class',
      data: { message: 'Are you sure deleting this item ?', id: data.pckge_id, nm: data.pckge_nm, entityname: 'Plan', flag: false, rte: `package/packagePlan/${data.pckge_id}` }
    });

    this.confirmDialogRef.afterClosed().subscribe((response) => {
      if (response == undefined) { }
      else if (response.status == 200) { this.getGridData(); }
    });
  }

  delbtn(d) {
    d["isActive"] = false;
  }
}
