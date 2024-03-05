import { Component, OnInit, ViewChild } from '@angular/core';
import { CrudService } from 'app/main/apps/crud.service';
import { DsSidebarService } from '@glits/components/sidebar/sidebar.service';
import { AtomService } from 'app/main/services/atom.service';
import { FormGroup, FormBuilder, FormControl, Validators, FormArray } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { DeleteDialogComponent } from 'app/main/shared/components/delete-dialog/delete-dialog.component';
import * as _ from 'lodash';
import {
  MatTableDataSource, MatPaginator, MatSort, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition, MatDialogRef, MatSnackBar, MatDialog,
  MAT_DIALOG_DATA
} from '@angular/material';

@Component({
  selector: 'app-packageServiceLst',
  templateUrl: './packageServiceLst.component.html',
  styleUrls: ['./packageServiceLst.component.scss']
})
export class PackageservicelstComponent implements OnInit {
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  confirmDialogRef: MatDialogRef<DeleteDialogComponent>;
  columnDefs: any;
  gridData: any;
  initdata: any;
  srvcpckForm: FormGroup;
  hsiVlForm: FormGroup
  cresrvc_id;
  gridApi;
  shwChnls: boolean;
  shwhsifrm: boolean;
  shwnodata:boolean;
  loader: boolean;
  permissions;
  mainMessage;
  message;
  frmDtls: boolean;
  mainFrm: boolean;
  hsiprptyLst;
  selectedid = [];
  srvcpcktypelst;
  searchText: string;
  setupCln;
  editData;
  editClicked: boolean = false;
  deleteEmplye: boolean;
  grdLst;
  hsiData;
  srvpckChnls=[];
  isdisabled: boolean = false;
  getRowHeight = function () { return 40; }
  getHeaderDtls = function () { return { "title": this.formDetails.stngs.form_title, "icon": "receipt" } }
  public fields: any[] = [
    { type: 'pk', name: 'srvcpk_id', label: 'Bundle Identifier', isCustom: false, customData: {}, required: false, hidden: true },
    { type: 'textarea', name: 'srvcpk_nm', label: 'Bundle Name', isCustom: false, customData: { "route": null, "input_key": null, "key": null, "label_key": null, "label": null, "table": null }, multiline: true, rowcount: 6, value: '', required: false, hidden: false },
    { type: 'dropdown', name: 'cre_srvce_id', label: '', isCustom: true, customData: { "route": "package/cresrvce", "input_key": null, "key": "cre_srvce_id", "label_key": "cre_srvce_nm", "label": null, "table": "cre_srvce_lst_t" }, value: '', required: false, hidden: false },
    { type: 'text', name: 'msp_cd', label: 'MSP code', isCustom: false, customData: { "route": null, "input_key": null, "key": null, "label_key": null, "label": null, "table": null }, value: '', required: false, hidden: false },
    { type: 'text', name: 'srvcpk_hndlr_tx', label: 'Bundle handle text', isCustom: false, customData: { "route": null, "input_key": null, "key": null, "label_key": null, "label": null, "table": null }, value: '', required: false, hidden: false },
    { type: 'text', name: 'efcte_dt', label: '?Effective date', isCustom: false, customData: { "route": null, "input_key": null, "key": null, "label_key": null, "label": null, "table": null }, value: '', required: false, hidden: false },
    { type: 'text', name: 'expry_dt', label: 'Expiry date', isCustom: false, customData: { "route": null, "input_key": null, "key": null, "label_key": null, "label": null, "table": null }, value: '', required: false, hidden: false },
    { type: 'dropdown', name: 'bndle_type_id', label: 'Bundle type Identifier', isCustom: false, customData: { "route": null, "input_key": null, "key": null, "label_key": null, "label": null, "table": null }, value: '', required: false, hidden: false },
    { type: 'text', name: 'lckn_dys_ct', label: 'Lockin days count', isCustom: false, customData: { "route": null, "input_key": null, "key": null, "label_key": null, "label": null, "table": null }, value: '', required: false, hidden: false },
    { type: 'dropdown', name: 'srvcpk_type_id', label: '', isCustom: true, customData: { "route": "package/packageServicetype", "input_key": null, "key": "srvcpk_type_id", "label_key": "srvcpk_type_nm", "label": null, "table": "pckge_srvcpk_type_lst_t" }, value: '', required: false, hidden: false },
    { type: 'text', name: 'chrg_amnt', label: 'Service pack amount', isCustom: false, customData: { "route": null, "input_key": null, "key": null, "label_key": null, "label": null, "table": null }, value: '', required: false, hidden: false },
  ];
  public formDetails: any = {
    fnctns: {},
    apis: {
      "sel_url": "package/packageServiceLst",
      "upd_url": "package/packageServiceLst/:srvcpk_id",
      "ins_url": "package/packageServiceLst",
      "del_url": "package/packageServiceLst/:srvcpk_id"
    },
    initdata: {},
    fields: this.fields,
    key_field: ["srvcpk_id"],
    stngs: {
      "style": "mat",
      "saveBtn": true,
      "saveAsBtn": false,
      "closeBtn": true,
      "model_style": "right",
      "form_title": "Service Pack",
      "deleteBtn": false,
      "show_lables": false,
      "oper_mode": "new"

    }
  }
  leftsidebarHdng: string;
  cresrvcslst: any;
  chnleLst: any;
  searchInput: FormControl;
  private _unsubscribeAll: Subject<any>;
  id: any;
  editFormData: any;

  constructor(private _dsSidebarService: DsSidebarService, public crdsrv: CrudService, public atmSrv: AtomService, public dialog: MatDialog, public fb: FormBuilder, public datePipe: DatePipe, public snackBar: MatSnackBar) {
    this.setupCln = _.cloneDeep(this.chnleLst);

    this.initdata = {}
    // this.permissions = { "slct_in": 1, "insrt_in": 1, "updt_in": 1, "dlte_in": 1, "exprt_in": 0 }
    const permTxt = 'Service Pack';
    const prmeRte = `user/permissions/${permTxt}`;
    this.crdsrv.get(prmeRte).subscribe((res) => {
      // console.log(res['data'][0]);
      this.permissions = res['data'][0];
    });
  }
  ngOnInit() {
    this.atmSrv.dropDownData.subscribe((data) => {
      this.getDependedFieldsData(data);
    });
    this.searchInput = new FormControl('');
    this.getGridData();
    this.getFieldsCustomData();
    this.frmDtls = false
    this.mainFrm = true
    this.srvcpckForm = this.fb.group({
      cre_srvce_id: new FormControl('', Validators.required),
      srvcpk_type_id: new FormControl('', Validators.required),
      srvcpk_nm: new FormControl('', Validators.required),
      efcte_dt: new FormControl('', Validators.required),
      expry_dt: new FormControl('', Validators.required)
    });
    this.hsiVlForm = this.fb.group({
      hsi_vls: this.fb.array([this.fb.group(
        {
          hsi_prpty_id: '',
          hsi_cd: '',
          hsi_lbl: '',
          hsi_nm: '',
          vlu_txt: ''
        })])
    })
    this.shwChnls = false;
    this.shwnodata =false;
  }
  initilieze = () => {
    this.chnleLst = _.cloneDeep(this.setupCln);
  }
  get hsifm() {
    return this.hsiVlForm.get('hsi_vls') as FormArray;
  }
  srchFltr = (val) => {
    this.initilieze();
    if (val && val.trim() !== '') {
      this.chnleLst = this.chnleLst.filter((item) => {
        let d = [];
        d = item.subsetup.filter((k) => {
          return (k.nm.toLowerCase().indexOf(val.toLowerCase()) > -1);
        });
        if (d.length > 0) {
          return item.subsetup = d;
        }
        else {

        }

      });
    }
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
    this.loader = true;
    let rte = `package/packageServiceLst`
    this.crdsrv.get(rte).subscribe((res) => {
      if (res['status'] == 200) {
        this.loader = false;
        this.permissions = (res['perm'] === undefined) ? this.permissions : res['perm'][0];
        if (this.permissions.slct_in == 0) this.mainMessage = "You do not have permissions to do this operation. Please contact Administrator to get permissions."
        if (res['data'].length == 0) this.mainMessage = "No entries found in the database."
        this.gridData = res['data'];
        let counter = 0;
        this.grdLst = this.gridData;
        this.grdLst.filter((k) => {
          k['sno'] = ++counter;
        });
        this.columnDefs = [
          { headerName: 'Sno', field: 'sno', alignment: 'center', cellClass: "pm-grid-number-cell",  sortable: true, filter: false },
          { headerName: 'Service Pack Name', field: 'srvcpk_nm', alignment: 'left', cellClass: "pm-grid-number-cell",  sortable: true, filter: true },
          { headerName: 'Core Service Name', field: 'cre_srvce_nm', alignment: 'center', cellClass: "pm-grid-number-cell", sortable: true, filter: true },
          { headerName: 'MSP code', field: 'msp_cd', alignment: 'center', cellClass: "pm-grid-number-cell", sortable: true, filter: true },
          { headerName: 'Effective date', field: 'date', alignment: 'center', cellClass: "pm-grid-number-cell",sortable: true, filter: true },
          { headerName: 'Expiry date', field: 'date1', alignment: 'center', cellClass: "pm-grid-number-cell",sortable: true, filter: true },
          { headerName: 'Service Type', field: 'srvcpk_type_nm', alignment: 'left', cellClass: "pm-grid-number-cell",sortable: true, filter: true },
          { headerName: 'Cost', field: 'chrge_at', alignment: 'right',type: 'currency', currency: 'INR', precision: '2', 
           cellClass: "pm-grid-number-cell", filter: false, search: false },
          {headerName: 'GST', field: 'gst_at', alignment: 'right',type: 'currency', currency: 'INR', precision: '2', 
           cellClass: "pm-grid-number-cell", filter: false, search: false },
          { headerName: 'Created By', field: 'fst_nm', alignment: 'left', cellClass: "pm-grid-number-cell",sortable: true, filter: true },
          { headerName: 'Created on', field: 'crte_dt', alignment: 'center', cellClass: "pm-grid-number-cell",sortable: true, filter: true }
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
        icon: 'user',
        text: 'Add New Service Pack',
        onClick: this.openForm.bind(this, 'new', null)
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
    this.editData = event.data
    this.editClicked = true;
    this.isdisabled = true;
    this.deleteEmplye = false;
    this.openForm('edit', this.editData)
  }
  onDelete2(event) {
    let deldata = event.data;
    this.delete(deldata)
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
            //console.log(data)
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
  getCreSrvcs() {
    let rte1 = `package/cresrvce`
    this.crdsrv.get(rte1).subscribe((res) => {
      //consolensole.log(res['data'])
      this.cresrvcslst = res['data'];
      //consolensole.log(this.dprtlst)
    }, (error) => {
      //consolensole.log(error)
    });
  }
  selectedcresrvc() {
    if (this.editClicked == true) {
      this.cresrvc_id = this.editData.cre_srvce_id
    }
    else {
      this.cresrvc_id = this.srvcpckForm.get('cre_srvce_id').value
    }
    if (this.cresrvc_id == 1) {
      this.loader = true;
      this.hsiprptyLst = []
      let rte1 = `package/hsiproperties`
      this.crdsrv.get(rte1).subscribe((res) => {
        //consolensole.log(res['data'])
        if (res['status'] == 200) {
          this.hsiprptyLst = res['data'];
          this.loader = false
          this.shwhsifrm = true;
          this.shwChnls = false;
          this.shwnodata=false;
          this.hsiVlForm.setControl('hsi_vls', new FormArray([]));
          if (this.editClicked == true) {
            this.hsiData=[]
            let rte2 ='package/srvpckDtls';
            let data ={
              cresrvc_id:this.cresrvc_id,
              srvpck_id:this.editFormData.srvcpk_id
            }
            this.crdsrv.create(data,rte2).subscribe((res) => {
             this.hsiData= res['data']
             if(this.hsiData.length > 0)
            {
              for (let k = 0; k < this.hsiData.length; k++) {
                   this.hsifm.push(this.fb.group({
                     hsi_prpty_id: this.hsiData[k].prpry_id,
                     hsi_cd: this.hsiData[k].prpry_nm,
                     hsi_lbl: this.hsiData[k].prpry_dscn_tx,
                     hsi_nm: this.hsiData[k].prpry_hndlr_tx,
                     vlu_txt: this.hsiData[k].vle_tx
                   }))
               }
            }
            })
           
          }
          else if (this.editClicked == false) {
            for (let k = 0; k < this.hsiprptyLst.length; k++) {
              if (this.hsiprptyLst[k] != undefined) {
                this.hsifm.push(this.fb.group({
                  hsi_prpty_id: this.hsiprptyLst[k].prpry_id,
                  hsi_cd: this.hsiprptyLst[k].prpry_nm,
                  hsi_lbl: this.hsiprptyLst[k].prpry_dscn_tx,
                  hsi_nm: this.hsiprptyLst[k].prpry_hndlr_tx,
                  vlu_txt: ''
                }))
              }

            }
          }
          this.hsiVlForm.get('hsi_vls').patchValue(this.hsifm.value);
        }

      }, (error) => {
      });
    }
    if (this.cresrvc_id == 2) {
      this.loader = true;
      let rte = `package/channels`
      this.crdsrv.get(rte).subscribe((res) => {
        if (res['status'] == 200) {
          this.chnleLst = res['data'];
          this.loader = false
          this.shwChnls = true
          this.shwhsifrm = false;
          this.shwnodata=false;
          if (this.editClicked == true) {
            let rte2 ='package/srvpckDtls';
            let data ={
              cresrvc_id:this.cresrvc_id,
              srvpck_id:this.editFormData.srvcpk_id
            }
            this.crdsrv.create(data,rte2).subscribe((res) => {
              this.srvpckChnls= res['data']
              this.srvpckChnls.filter(i=>{
                i['isActive'] = true
              })
              this.selectedid=this.srvpckChnls
              for (let i = 0; i < this.chnleLst.length; i++) {
                for (let j = 0; j < this.chnleLst[i].opts.length; j++) {
                  if(this.selectedid.length > 0)
                  {
                    for (let k = 0; k < this.selectedid.length; k++) {
                      if (this.selectedid[k].chnle_id == this.chnleLst[i].opts[j].chnle_id) {
                        this.chnleLst[i].opts[j].isActive = true
                      }
                    }
                  }                
                }
              }
            })
            this.searchInput.valueChanges
            .pipe(
              takeUntil(this._unsubscribeAll),
              debounceTime(300),
              distinctUntilChanged()
            )
            .subscribe(searchText => {
              this.srchFltr(searchText);
            });
          }
          this.searchInput.valueChanges
            .pipe(
              takeUntil(this._unsubscribeAll),
              debounceTime(300),
              distinctUntilChanged()
            )
            .subscribe(searchText => {
              this.srchFltr(searchText);
            });
        }

      }, (error) => {
      });
    }
    else
    {
      this.shwhsifrm=false;
      this.shwChnls=false;
      this.shwnodata=true;
      this.message="No Details Available For This Service Pack"
    }
  }
  saveSrvcpck() {
    let data = this.srvcpckForm.value
    if (data.cre_srvce_id == 2) {
      if (this.editClicked == true) {
        this.loader=true;
        data["selectedsrvcpcks"] = this.selectedid
        data["srvc_pck_id"] = this.editData.srvcpk_id
        this.srvcpckForm.value.efcte_dt = this.datePipe.transform(this.srvcpckForm.value.efcte_dt, "yyyy-MM-dd");
        this.srvcpckForm.value.expry_dt = this.datePipe.transform(this.srvcpckForm.value.expry_dt, "yyyy-MM-dd");
        let rte1 = `package/packageServiceLst/` + this.editData.srvcpk_id
        console.log(data)
        this.crdsrv.create(data, rte1).subscribe((res) => {
          if (res['status'] == 200) {
            this.loader=false;
            this.snackBar.open("Sucessfully Updated", '', {
              duration: 3000,
              horizontalPosition: this.horizontalPosition,
              verticalPosition: this.verticalPosition,
            });
            this.back();
            this.getGridData();
          }
        }, (error) => {
        });
      }
      else {
        this.loader=true;
        this.srvcpckForm.value.efcte_dt = this.datePipe.transform(this.srvcpckForm.value.efcte_dt, "yyyy-MM-dd");
        this.srvcpckForm.value.expry_dt = this.datePipe.transform(this.srvcpckForm.value.expry_dt, "yyyy-MM-dd");
        data["selectedsrvcpcks"] = this.selectedid
        let rte1 = `package/packageServiceLst`
        console.log(data)
        this.crdsrv.create(data, rte1).subscribe((res) => {
          if (res['status'] == 200) {
            this.loader=false;
            this.snackBar.open("Sucessfully Added", '', {
              duration: 3000,
              horizontalPosition: this.horizontalPosition,
              verticalPosition: this.verticalPosition,
            });
            this.back();
            this.getGridData();
          }
        }, (error) => {
        });
      }
    }
    if (data.cre_srvce_id == 1) {
      if (this.editClicked == true) {
        this.loader=true;
        data['hsiPrptyvlues'] = this.hsiVlForm.value.hsi_vls;
        data["srvc_pck_id"] = this.editData.srvcpk_id
        this.srvcpckForm.value.efcte_dt = this.datePipe.transform(this.srvcpckForm.value.efcte_dt, "yyyy-MM-dd");
        this.srvcpckForm.value.expry_dt = this.datePipe.transform(this.srvcpckForm.value.expry_dt, "yyyy-MM-dd");
        let rte1 = `package/packageServiceLst/` + this.editData.srvcpk_id
        this.crdsrv.create(data, rte1).subscribe((res) => {
          if (res['status'] == 200) {
            this.loader=false;
            this.snackBar.open("Sucessfully Updated", '', {
              duration: 3000,
              horizontalPosition: this.horizontalPosition,
              verticalPosition: this.verticalPosition,
            });
            this.back();
            this.getGridData();
          }
        }, (error) => {
        });
      }
      else {
        this.loader=true;
        this.srvcpckForm.value.efcte_dt = this.datePipe.transform(this.srvcpckForm.value.efcte_dt, "yyyy-MM-dd");
        this.srvcpckForm.value.expry_dt = this.datePipe.transform(this.srvcpckForm.value.expry_dt, "yyyy-MM-dd");
        data['hsiPrptyvlues'] = this.hsiVlForm.value.hsi_vls;
        let rte1 = `package/packageServiceLst`
        this.crdsrv.create(data, rte1).subscribe((res) => {
          if (res['status'] == 200) {
            this.loader=false;
            this.snackBar.open("Sucessfully Added", '', {
              duration: 3000,
              horizontalPosition: this.horizontalPosition,
              verticalPosition: this.verticalPosition,
            });
            this.back();
            this.getGridData();
          }
        }, (error) => {
        });
      }

    }
  }
  getsrvctype() {
    let rte1 = 'package/packageServicetype'
    this.crdsrv.get(rte1).subscribe((res) => {
      this.srvcpcktypelst = res['data'];
    }, (error) => {
    });
  }
  openForm(key, value) {
    this.mainFrm = false;
    this.frmDtls = true;
    if (key == 'new') {
      this.leftsidebarHdng = 'Add Service Pack'
      this.srvcpckForm.reset();
      this.getCreSrvcs()
      this.getsrvctype()
      this.selectedid = [];
      this.shwhsifrm = false;
      this.shwChnls = false;
      this.shwnodata=false;
      this.searchText = '';
      this.editClicked = false;
      this.isdisabled = false;
      this.srvcpckForm.get('cre_srvce_id').setValue('');
      this.srvcpckForm.get('srvcpk_type_id').setValue('');
      this.srvcpckForm.get('srvcpk_nm').setValue('');
      this.srvcpckForm.get('efcte_dt').setValue('');
      this.srvcpckForm.get('expry_dt').setValue('');
    }
    else if (key == 'edit') {
      this.editFormData = value
      this.leftsidebarHdng = 'Edit Service Pack'
      this.getCreSrvcs();
      this.getsrvctype();
      this.searchText = '';
      this.srvcpckForm.get('cre_srvce_id').setValue(value.cre_srvce_id);
      this.srvcpckForm.get('srvcpk_type_id').setValue(value.srvcpk_type_id);
      this.srvcpckForm.get('srvcpk_nm').setValue(value.srvcpk_nm);
      let date = this.datePipe.transform(value.efcte_dt, "yyyy-MM-dd");
      let date1 = this.datePipe.transform(value.expry_dt, "yyyy-MM-dd");
      this.srvcpckForm.get('efcte_dt').setValue(date);
      this.srvcpckForm.get('expry_dt').setValue(date1);
      this.selectedcresrvc();
    }
  }
  back() {
    this.frmDtls = false;
    this.mainFrm = true
  }
  getid(e, data, i) {
    if (e.checked == false) {
      for (var j = 0; i < this.chnleLst.length; j++) {
        for (var k = 0; k < this.chnleLst[j].opts.length; k++) {
          for (var l = 0; l < this.selectedid.length; l++) {
            if (this.chnleLst[j].opts[k].chnle_id == this.selectedid[l].chnle_id) {
              this.selectedid.splice(i, 1);
            }
          }
        }
      }
    }
    else {
      if (this.editClicked == true) {
        this.selectedid.push(
          {
            chnle_id: data.chnle_id,
            chnle_cd: data.chnle_cd,
            chnle_nm: data.opt_nm,
            isActive: true,
            isNew: true
          }
        )
      }
      else {
        this.selectedid.push(
          {
            chnle_id: data.chnle_id,
            chnle_cd: data.chnle_cd,
            chnle_nm: data.opt_nm,
            isActive: true,
            isNew: true
          }
        )
      }
    }

  }
  delbtn(d) {
    d["isActive"] = false
    for (let i = 0; i < this.chnleLst.length; i++) {
      for (let j = 0; j < this.chnleLst[i].opts.length; j++) {
        if (d.chnle_id == this.chnleLst[i].opts[j].chnle_id) {
          this.chnleLst[i].opts[j].isActive = false
        }

      }
    }
  }

  delete(data) {
    this.confirmDialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '25%',
      panelClass: 'my-class',
      data: { message: 'Are you sure deleting this item ?', id: data.srvcpk_id, nm: data.srvcpk_nm, entityname: 'Service Pack', flag: false, rte: `package/packageServiceLst/${data.srvcpk_id}` }
    });

    this.confirmDialogRef.afterClosed().subscribe((response) => {
      if (response == undefined) { }
      else if (response.status == 200)
        this.back();
      this.getGridData();
    })
  }
}
