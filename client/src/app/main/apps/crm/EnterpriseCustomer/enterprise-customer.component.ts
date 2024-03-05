import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CrudService } from 'app/main/apps/crud.service';
import { DsSidebarService } from '@glits/components/sidebar/sidebar.service';
import { Validators, FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition, MatDialogRef, MatDialog } from '@angular/material';
import { UploadFileService } from 'app/providers/s3/UploadFileService';
import { DomSanitizer } from '@angular/platform-browser';
import { DeleteDialogComponent } from 'app/main/shared/components/delete-dialog/delete-dialog.component';
import { distinctUntilChanged, switchMap, startWith, tap } from 'rxjs/operators';
import { EMPTY } from 'rxjs';

@Component({
  selector: 'app-enterprise-customer',
  templateUrl: './enterprise-customer.component.html',
  styleUrls: ['./enterprise-customer.component.scss']
})

export class EnterpriseCustomerComponent implements OnInit {
  columnDefs: any;
  rowData: any;
  initdata: any;
  gridApi;
  permissions;
  permMessage = "You do not have permissions to do this operation. Please contact Administrator to get permissions."
  getRowHeight = function () { return 40; }
  getHeaderDtls = function () { return { "title": this.formDetails.stngs.form_title, "icon": "receipt" } }
  public fields: any[] = [
    { type: 'text', name: 'entrpe_cstmr_nm', label: 'Enterprise Customer Name', isCustom: false, customData: '', value: '', required: false, hidden: true },
    { type: 'text', name: 'entrpe_cstmr_cd', label: 'Enterprise Customer Code', isCustom: false, customData: '', value: '', required: false, hidden: true },
    { type: 'dropdown', name: 'entrpe_type_id', label: 'Enterprise Type', isCustom: false, customData: '', value: '', required: false, hidden: true },
    { type: 'dropdown', name: 'entpnr_sub_type_id', label: 'Enterprise Sub Type', isCustom: false, customData: '', value: '', required: false, hidden: true },
    { type: 'text', name: 'entpnr_org_nm', label: 'Enterprise Organization Name', isCustom: false, customData: '', value: '', required: false, hidden: true },
    { type: 'text', name: 'rgstn_vat_tan_no', label: 'Enterprise Registration or VAT or TAN Number', isCustom: false, customData: '', value: '', required: false, hidden: true },
    { type: 'text', name: 'incrn_dt', label: 'Enterprise incorporate date', isCustom: false, customData: '', value: '', required: false, hidden: true },
    { type: 'text', name: 'adhr_nu', label: 'Aadhar Number', isCustom: false, customData: '', value: '', required: false, hidden: true },
    { type: 'text', name: 'pan_nu', label: 'PAN Number', isCustom: false, customData: '', value: '', required: false, hidden: true },
    { type: 'text', name: 'gst_nu', label: 'GST Number', isCustom: false, customData: '', value: '', required: false, hidden: true },
    { type: 'text', name: 'cntct_prsn_nm', label: 'Contact Person Name', isCustom: false, customData: '', value: '', required: false, hidden: true },
    { type: 'text', name: 'cntct_prsn_mble_nu', label: 'Contact Person Mobile Number', isCustom: false, customData: '', value: '', required: false, hidden: true },
    { type: 'text', name: 'cntct_prsn_emle_tx', label: 'Contact Person Email Id', isCustom: false, customData: '', value: '', required: false, hidden: true },
    { type: 'dropdown', name: 'cntct_prsn_dsgn_id', label: 'Contact Person Designation', isCustom: false, customData: '', value: '', required: false, hidden: true },
    { type: 'dropdown', name: 'blng_frqny_id', label: 'Billing Frequency', isCustom: false, customData: '', value: '', required: false, hidden: true },
    { type: 'text', name: 'actvtn_dt', label: 'Activation Date', isCustom: false, customData: '', value: '', required: false, hidden: true },
    { type: 'text', name: 'instl_hse_nu', label: 'Installation House or Flat Number', isCustom: false, customData: '', value: '', required: false, hidden: true },
    { type: 'text', name: 'instl_bldng_tx', label: 'Installation Building Name', isCustom: false, customData: '', value: '', required: false, hidden: true },
    { type: 'text', name: 'instl_strte_tx', label: 'Installation Street', isCustom: false, customData: '', value: '', required: false, hidden: true },
    { type: 'text', name: 'instl_lclty_tx', label: 'Installation Locality or Area', isCustom: false, customData: '', value: '', required: false, hidden: true },
    { type: 'dropdown', name: 'instl_mndle_id', label: 'Installation Mandal id', isCustom: false, customData: '', value: '', required: false, hidden: true },
    { type: 'dropdown', name: 'instl_cty_id', label: 'Installation City or Village id', isCustom: false, customData: '', value: '', required: false, hidden: true },
    { type: 'dropdown', name: 'instl_dstrt_id', label: 'Installation District id', isCustom: false, customData: '', value: '', required: false, hidden: true },
    { type: 'dropdown', name: 'instl_ste_id', label: 'Installation State id', isCustom: false, customData: '', value: '', required: false, hidden: true },
    { type: 'text', name: 'instl_pn_cd', label: 'Installation Pincode', isCustom: false, customData: '', value: '', required: false, hidden: true },
    { type: 'text', name: 'instl_fax_nu', label: 'Installation Fax Number', isCustom: false, customData: '', value: '', required: false, hidden: true },
    { type: 'text', name: 'instl_lnd_nu', label: 'Installation Land Line Number', isCustom: false, customData: '', value: '', required: false, hidden: true },
    { type: 'text', name: 'instl_lat', label: 'Installation Latitude', isCustom: false, customData: '', value: '', required: false, hidden: true },
    { type: 'text', name: 'instl_lng', label: 'Installation Longitude', isCustom: false, customData: '', value: '', required: false, hidden: true },
    { type: 'text', name: 'blng_hse_nu', label: 'Billing Building or Flat Number', isCustom: false, customData: '', value: '', required: false, hidden: true },
    { type: 'text', name: 'blng_bldng_tx', label: 'Billing Building Name', isCustom: false, customData: '', value: '', required: false, hidden: true },
    { type: 'text', name: 'blng_strte_tx', label: 'Billing Atreet', isCustom: false, customData: '', value: '', required: false, hidden: true },
    { type: 'text', name: 'blng_lclty_tx', label: 'Billing Locality or Area', isCustom: false, customData: '', value: '', required: false, hidden: true },
    { type: 'dropdown', name: 'blng_mndle_id', label: 'Billing Mandal id', isCustom: false, customData: '', value: '', required: false, hidden: true },
    { type: 'dropdown', name: 'blng_cty_id', label: 'Billing City or Village id', isCustom: false, customData: '', value: '', required: false, hidden: true },
    { type: 'dropdown', name: 'blng_dstrt_id', label: 'Billing District id', isCustom: false, customData: '', value: '', required: false, hidden: true },
    { type: 'dropdown', name: 'blng_ste_id', label: 'Billing State id', isCustom: false, customData: '', value: '', required: false, hidden: true },
    { type: 'text', name: 'blng_pn_cd', label: 'Billing Pincode', isCustom: false, customData: '', value: '', required: false, hidden: true },
    { type: 'text', name: 'blng_fax_nu', label: 'Billing Fax Number', isCustom: false, customData: '', value: '', required: false, hidden: true },
    { type: 'text', name: 'blng_lnd_nu', label: 'Billing Land Line Number', isCustom: false, customData: '', value: '', required: false, hidden: true },
    { type: 'text', name: 'blng_lat', label: 'Billing Latitude', isCustom: false, customData: '', value: '', required: false, hidden: true },
    { type: 'text', name: 'blng_lng', label: 'Billing Longitude', isCustom: false, customData: '', value: '', required: false, hidden: true },
    { type: 'text', name: 'chckd_ind', label: '', isCustom: false, customData: '', value: '', required: false, hidden: true },
  ];
  public formDetails: any = {
    fnctns: {},
    apis: {
      "sel_url": "crm/enterpriseCustomer",
      "upd_url": "crm/enterpriseCustomer/:entrpe_cstmr_id",
      "ins_url": "crm/enterpriseCustomer",
      "del_url": "crm/enterpriseCustomer/:entrpe_cstmr_id"
    },
    initdata: {},
    fields: this.fields,
    key_field: ["entrpe_cstmr_id"],
    stngs: {
      "style": "mat",
      "saveBtn": true,
      "saveAsBtn": false,
      "closeBtn": true,
      "model_style": "right",
      "form_title": "enterprise Customer",
      "deleteBtn": false,
      "show_lables": false,
      "oper_mode": "new"

    }
  }
  EnterpriseCstmrForm: FormGroup;
  ste_lst: any;
  dstrt_lst: any;
  mndl_lst: any;
  vlge_lst: any;
  hdr_type: any;

  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  confirmDialogRef: MatDialogRef<DeleteDialogComponent>;
  entpr_cstmr_typ: any;
  entpr_cstmr_sub_typ: any;
  dsgns_lst: any;
  blng_frqncy_lst: any;
  @ViewChild('fileInput') el: ElementRef;
  imageUrl: string | ArrayBuffer;
  selectedFiles: FileList;
  adhr_img_url: any;
  pan_img_url: any;
  gst_img_url: any;
  gst_img_url_tx: string | ArrayBuffer;
  pan_img_url_tx: string | ArrayBuffer;
  adhr_img_url_tx: string | ArrayBuffer;
  gridColumnApi: any;

  public isSameAddressControl: FormControl = new FormControl(false);
  districtId: any;
  mndal_lst: any;
  mandalId: any;
  vilge_lst: any;

  constructor(private _dsSidebarService: DsSidebarService, public crdsrv: CrudService, private fb: FormBuilder, private datePipe: DatePipe, public snackBar: MatSnackBar, public dialog: MatDialog, private uploadService: UploadFileService, private domSanitizer: DomSanitizer) {
    this.initdata = {}
    this.permissions = { "slct_in": 1, "insrt_in": 0, "updt_in": 0, "dlte_in": 0, "exprt_in": 0 }
  }
  ngOnInit() {
    this.getGridData();
    this.getFieldsCustomData();

    let emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
    let phoneNumber = /^(\+\d{1,3}[- ]?)?\d{10}$/;
    let aadharValidate = /^(\+\d{1,3}[- ]?)?\d{12}$/;
    let pincodeValidate = /^(\+\d{1,3}[- ]?)?\d{6}$/
    this.EnterpriseCstmrForm = this.fb.group({
      entrpe_cstmr_nm: new FormControl('', Validators.required),
      entrpe_cstmr_cd: new FormControl('', Validators.required),
      entrpe_type_id: new FormControl('', Validators.required),
      entpnr_sub_type_id: new FormControl('', Validators.required),
      entpnr_org_nm: new FormControl('', Validators.required),
      rgstn_vat_tan_no: new FormControl('', Validators.required),
      incrn_dt: new FormControl('', Validators.required),
      blng_frqny_id: new FormControl('', Validators.required),
      cntct_prsn_nm: new FormControl('', Validators.required),
      cntct_prsn_mble_nu: new FormControl('', [Validators.required, Validators.pattern(phoneNumber)]),
      cntct_prsn_emle_tx: new FormControl('', Validators.pattern(emailPattern)),
      cntct_prsn_dsgn_id: new FormControl('', Validators.required),
      adhr_nu: new FormControl('', [Validators.required, Validators.pattern(aadharValidate)]),
      pan_nu: new FormControl('', Validators.required),
      gst_nu: new FormControl(''),
      actvtn_dt: new FormControl('', Validators.required),
      instl_chk_ind: new FormControl(''),
      // installationAddress: this.fb.group({
      instl_hse_nu: new FormControl('', Validators.required),
      instl_bldng_tx: new FormControl('', Validators.required),
      instl_strte_tx: new FormControl('', Validators.required),
      instl_lclty_tx: new FormControl('', Validators.required),
      instl_cty_id: new FormControl('', Validators.required),
      instl_mndle_id: new FormControl('', Validators.required),
      instl_dstrt_id: new FormControl('', Validators.required),
      instl_ste_id: new FormControl('', Validators.required),
      instl_pn_cd: new FormControl('', [Validators.required, Validators.pattern(pincodeValidate)]),
      instl_lnd_nu: new FormControl(''),
      instl_fax_nu: new FormControl(''),
      instl_lat: new FormControl(''),
      instl_lng: new FormControl(''),
      // }),
      // billingAddress: this.fb.group({
      blng_hse_nu: new FormControl('', Validators.required),
      blng_bldng_tx: new FormControl('', Validators.required),
      blng_strte_tx: new FormControl('', Validators.required),
      blng_lclty_tx: new FormControl('', Validators.required),
      blng_cty_id: new FormControl('', Validators.required),
      blng_mndle_id: new FormControl('', Validators.required),
      blng_dstrt_id: new FormControl('', Validators.required),
      blng_ste_id: new FormControl('', Validators.required),
      blng_pn_cd: new FormControl('', [Validators.required, Validators.pattern(pincodeValidate)]),
      blng_lnd_nu: new FormControl(''),
      blng_fax_nu: new FormControl(''),
      blng_lat: new FormControl(''),
      blng_lng: new FormControl(''),
      // })
    });
    this.getStates();
    this.getEntrpeCstmrType();
    this.getDesignations();
    this.getBillingFrequency();

    this.isSameAddressControl.valueChanges
      .pipe(
        distinctUntilChanged(),
        switchMap(isSameAddress => {
          console.log(isSameAddress)
          if (isSameAddress) {
            return this.EnterpriseCstmrForm.get('installationAddress').valueChanges
              .pipe(
                startWith(this.EnterpriseCstmrForm.get('installationAddress').valueChanges),
                tap(value =>
                  this.EnterpriseCstmrForm
                    .get('billingAddress')
                    .setValue(value)
                )
              )
          } else {
            this.EnterpriseCstmrForm
              .get('billingAddress')
              .reset();

            return EMPTY;
          }
        })
      )
      .subscribe();
  }

  getStates() {
    const rte = `user/getstates`;
    this.crdsrv.get(rte).subscribe((res) => {
      if (res['data'].length > 0) {
        this.ste_lst = res['data'];
      }
    })
  }

  getEntrpeCstmrType() {
    const rte = `crm/enterpriseCustomerType`;
    console.log(rte)
    this.crdsrv.get(rte).subscribe((res) => {
      this.entpr_cstmr_typ = res['data'];
      console.log(this.entpr_cstmr_typ)
    })
  }

  getEntrpeCstmrSubType() {
    const rte = `crm/enterpriseCustomerSubType/${this.EnterpriseCstmrForm.value.entrpe_type_id}`;
    console.log(rte)
    this.crdsrv.get(rte).subscribe((res) => {
      this.entpr_cstmr_sub_typ = res['data'];
    })
  }

  getDesignations() {
    const rte = `user/designations`;
    this.crdsrv.get(rte).subscribe((res) => {
      this.dsgns_lst = res['data'];
      console.log(this.dsgns_lst)
    })
  }

  getBillingFrequency() {
    const rte = `crm/billingFrequency`;
    this.crdsrv.get(rte).subscribe((res) => {
      this.blng_frqncy_lst = res['data'];
      console.log(this.blng_frqncy_lst)
    })
  }
  getDistricts() {
    console.log(this.EnterpriseCstmrForm.value.instl_ste_id);
    const rte = `user/getdstrcts/${this.EnterpriseCstmrForm.value.instl_ste_id}`;
    console.log(rte)
    this.crdsrv.get(rte).subscribe((res) => {
      this.dstrt_lst = res['data'];
    })
  }

  getMandals(data) {
    console.log(data);
    // const rte = `user/getMndls/${this.EnterpriseCstmrForm.value.instl_dstrt_id}`;
    // this.crdsrv.get(rte).subscribe((res) => {
    //   console.log(res['data']);
    //   this.mndl_lst = res['data'];
    if (data.length == 1) {
      console.log("in 1")
      if (data[0].id == 1) {
        this.districtId = this.EnterpriseCstmrForm.value.instl_dstrt_id;
        const rte = `user/getMndls/${this.districtId}`;
        this.crdsrv.get(rte).subscribe((res) => {
          this.mndl_lst = res['data'];
        });
      }
      else if (data[0].id == 2) {
        this.districtId = this.EnterpriseCstmrForm.value.blng_dstrt_id;
        const rte = `user/getMndls/${this.districtId}`;
        this.crdsrv.get(rte).subscribe((res) => {
          this.mndal_lst = res['data'];
          console.log(this.mndal_lst)
        }); 
      }
    }
    if (data.length > 1) {
      console.log("in 2")

      if (data[0].id == 1) {
        this.districtId = this.EnterpriseCstmrForm.value.instl_dstrt_id;
        const rte = `user/getMndls/${this.districtId}`;
        this.crdsrv.get(rte).subscribe((res) => {
          this.mndl_lst = res['data'];
        });
      }
      if (data[1].id == 2) {
        console.log(this.EnterpriseCstmrForm.value)
        this.districtId = this.EnterpriseCstmrForm.value.blng_dstrt_id;
        const rte = `user/getMndls/${this.districtId}`;
        this.crdsrv.get(rte).subscribe((res) => {
          this.mndal_lst = res['data'];
          console.log(this.mndal_lst)
        });
      }
    }
  }

  getvillages(data) {
    // console.log(this.EnterpriseCstmrForm.value.instl_mndle_id)
    // const rte = `user/getvlgs/${this.EnterpriseCstmrForm.value.instl_mndle_id}`;
    // this.crdsrv.get(rte).subscribe((res) => {
    //   console.log(res['data']);
    //   this.vlge_lst = res['data'];
    if (data.length == 1) {
      console.log("in 1")
      if (data[0].id == 1) {
        this.mandalId = this.EnterpriseCstmrForm.value.instl_mndle_id;
        const rte = `user/getvlgs/${this.mandalId}/${this.districtId}`;
        this.crdsrv.get(rte).subscribe((res) => {
          this.vlge_lst = res['data'];
        });
      }
      else if (data[0].id == 2) {
        this.mandalId = this.EnterpriseCstmrForm.value.blng_mndle_id;
        const rte = `user/getvlgs/${this.mandalId}/${this.districtId}`;
        this.crdsrv.get(rte).subscribe((res) => {
          this.vilge_lst = res['data'];
        });
      }
    }
    if (data.length > 1) {
      console.log("in 2")

      if (data[0].id == 1) {
        this.mandalId = this.EnterpriseCstmrForm.value.instl_mndle_id;
        const rte = `user/getvlgs/${this.mandalId}/${this.districtId}`;
        this.crdsrv.get(rte).subscribe((res) => {
          this.vlge_lst = res['data'];
        });
      }
      if (data[1].id == 2) {
        this.mandalId = this.EnterpriseCstmrForm.value.blng_mndle_id;
        const rte = `user/getvlgs/${this.mandalId}/${this.districtId}`;
        this.crdsrv.get(rte).subscribe((res) => {
          this.vilge_lst = res['data'];
        });
      }
    }
    // })
  }

  checkValue(event: any) {
    console.log(event.checked);
    let mndldata = [{
      "id": 1,
      "mndl": event.instl_dstrt_id

    }, {
      "id": 2,
      "mndl": event.blng_dstrt_id,
    }]
    this.getMandals(mndldata);
    if (event.checked == true) {      
      let data = this.EnterpriseCstmrForm.value;
      // this.EnterpriseCstmrForm.get('billingAddress.blng_hse_nu').setValue(data.instl_hse_nu);
      // this.EnterpriseCstmrForm.get('billingAddress.blng_bldng_tx').setValue(data.instl_bldng_tx);
      // this.EnterpriseCstmrForm.get('billingAddress.blng_strte_tx').setValue(data.instl_strte_tx);
      // this.EnterpriseCstmrForm.get('billingAddress.blng_lclty_tx').setValue(data.instl_lclty_tx);
      // this.EnterpriseCstmrForm.get('billingAddress.blng_ste_id').setValue(data.instl_ste_id);
      // this.EnterpriseCstmrForm.get('billingAddress.blng_dstrt_id').setValue(data.instl_dstrt_id);
      // this.EnterpriseCstmrForm.get('billingAddress.blng_mndle_id').setValue(data.instl_mndle_id);
      // this.EnterpriseCstmrForm.get('billingAddress.blng_cty_id').setValue(data.instl_cty_id);
      // this.EnterpriseCstmrForm.get('billingAddress.blng_pn_cd').setValue(data.instl_pn_cd);
      // this.EnterpriseCstmrForm.get('billingAddress.blng_fax_nu').setValue(data.instl_fax_nu);
      // this.EnterpriseCstmrForm.get('billingAddress.blng_lat').setValue(data.instl_lat);
      // this.EnterpriseCstmrForm.get('billingAddress.blng_lng').setValue(data.instl_lng);
      // this.EnterpriseCstmrForm.get('billingAddress.blng_lnd_nu').setValue(data.instl_lnd_nu);
      this.EnterpriseCstmrForm.get('blng_hse_nu').setValue(data.instl_hse_nu);
      this.EnterpriseCstmrForm.get('blng_bldng_tx').setValue(data.instl_bldng_tx);
      this.EnterpriseCstmrForm.get('blng_strte_tx').setValue(data.instl_strte_tx);
      this.EnterpriseCstmrForm.get('blng_lclty_tx').setValue(data.instl_lclty_tx);
      this.EnterpriseCstmrForm.get('blng_ste_id').setValue(data.instl_ste_id);
      this.EnterpriseCstmrForm.get('blng_dstrt_id').setValue(data.instl_dstrt_id);
      this.EnterpriseCstmrForm.get('blng_mndle_id').setValue(data.instl_mndle_id);
      this.EnterpriseCstmrForm.get('blng_cty_id').setValue(data.instl_cty_id);
      this.EnterpriseCstmrForm.get('blng_pn_cd').setValue(data.instl_pn_cd);
      this.EnterpriseCstmrForm.get('blng_fax_nu').setValue(data.instl_fax_nu);
      this.EnterpriseCstmrForm.get('blng_lat').setValue(data.instl_lat);
      this.EnterpriseCstmrForm.get('blng_lng').setValue(data.instl_lng);
      this.EnterpriseCstmrForm.get('blng_lnd_nu').setValue(data.instl_lnd_nu);

    } else {
      this.EnterpriseCstmrForm.get('blng_hse_nu').reset();
      this.EnterpriseCstmrForm.get('blng_bldng_tx').reset();
      this.EnterpriseCstmrForm.get('blng_strte_tx').reset();
      this.EnterpriseCstmrForm.get('blng_lclty_tx').reset();
      this.EnterpriseCstmrForm.get('blng_ste_id').reset();
      this.EnterpriseCstmrForm.get('blng_dstrt_id').reset();
      this.EnterpriseCstmrForm.get('blng_mndle_id').reset();
      this.EnterpriseCstmrForm.get('blng_cty_id').reset();
      this.EnterpriseCstmrForm.get('blng_pn_cd').reset();
      this.EnterpriseCstmrForm.get('blng_fax_nu').reset();
      this.EnterpriseCstmrForm.get('blng_lat').reset();
      this.EnterpriseCstmrForm.get('blng_lng').reset();
    }
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
  getCustomData(rte) {
    let options = [];
    this.crdsrv.get(rte).subscribe((res) => {
      let data = res['data']

      data.forEach(element => {
        let keys = Object.keys(element)
        let key = '';
        let label = '';
        keys.forEach((k) => {

          if (k.includes('_nm')) {
            label = element[k]
          }
          if (k.includes('_id')) {
            if (key == '')
              key = element[k]
          }

        })
        options.push({
          key: key,
          label: label
        })
      });
    })
    return options;
  }
  getGridData() {
    this.crdsrv.get(this.formDetails.apis.sel_url).subscribe((res) => {
      if (res['status'] == 200) {
        this.permissions = (res['perm'][0] === undefined) ? this.permissions : res['perm'][0];
        this.rowData = res['data'];
        console.log(this.rowData)
        this.columnDefs = [
          { headerName: 'Sno', field: 'sno', cellStyle: { 'text-align': "center" }, cellClass: "pm-grid-number-cell", width: 100, sortable: true, filter: false },
          { headerName: 'Customer Identifier', field: 'entrpe_cstmr_id', hide: true, cellStyle: { 'text-align': "center" }, cellClass: "pm-grid-number-cell", width: 100 },
          { headerName: 'Customer Name', field: 'entrpe_cstmr_nm', cellStyle: { 'text-align': "left" }, cellClass: "pm-grid-number-cell", width: 220, sortable: true, filter: true },
          { headerName: 'Customer Code', field: 'entrpe_cstmr_cd', cellStyle: { 'text-align': "left" }, cellClass: "pm-grid-number-cell", width: 180, sortable: true, filter: true },
          { headerName: 'Organization Type', field: 'entrpe_type_nm', cellStyle: { 'text-align': "left" }, cellClass: "pm-grid-number-cell", width: 220, sortable: true, filter: true },
          { headerName: 'Organization Sub Type', field: 'entrpe_sub_type_nm', cellStyle: { 'text-align': "left" }, cellClass: "pm-grid-number-cell", width: 220, sortable: true, filter: true },
          { headerName: 'Organization Name', field: 'entpnr_org_nm', cellStyle: { 'text-align': "left" }, cellClass: "pm-grid-number-cell", width: 220, sortable: true, filter: true },
          { headerName: 'Registration or VAT or TAN Number', field: 'rgstn_vat_tan_no', cellStyle: { 'text-align': "left" }, cellClass: "pm-grid-number-cell", width: 220, sortable: true, filter: true },
          { headerName: 'incorporate date', field: 'incrn_dt', cellStyle: { 'text-align': "left" }, cellClass: "pm-grid-number-cell", width: 220, sortable: true, filter: true },
          { headerName: 'Aadhar Number', field: 'adhr_nu', cellStyle: { 'text-align': "left" }, cellClass: "pm-grid-number-cell", width: 220, sortable: true, filter: true },
          { headerName: 'PAN Number', field: 'pan_nu', cellStyle: { 'text-align': "left" }, cellClass: "pm-grid-number-cell", width: 220, sortable: true, filter: true },
          { headerName: 'GST Number', field: 'gst_nu', cellStyle: { 'text-align': "left" }, cellClass: "pm-grid-number-cell", width: 220, sortable: true, filter: true },
          { headerName: 'Person Name', field: 'cntct_prsn_nm', cellStyle: { 'text-align': "left" }, cellClass: "pm-grid-number-cell", width: 220, sortable: true, filter: true },
          { headerName: 'Person Mobile Number', field: 'cntct_prsn_mble_nu', cellStyle: { 'text-align': "left" }, cellClass: "pm-grid-number-cell", width: 220, sortable: true, filter: true },
          { headerName: 'Person Email Id', field: 'cntct_prsn_emle_tx', cellStyle: { 'text-align': "left" }, cellClass: "pm-grid-number-cell", width: 220, sortable: true, filter: true },
          { headerName: 'Person Designation', field: 'cntct_prsn_dsgn_nm', cellStyle: { 'text-align': "left" }, cellClass: "pm-grid-number-cell", width: 220, sortable: true, filter: true },
          { headerName: 'Billing Frequency', field: 'blng_frqny_nm', cellStyle: { 'text-align': "left" }, cellClass: "pm-grid-number-cell", width: 220, sortable: true, filter: true },
          { headerName: 'Activation Date', field: 'actvtn_dt', cellStyle: { 'text-align': "left" }, cellClass: "pm-grid-number-cell", width: 220, sortable: true, filter: true },
          // { headerName: 'Installation House or Flat Number', field: 'instl_hse_nu', cellStyle: { 'text-align': "left" }, cellClass: "pm-grid-number-cell", width: 265, sortable: true, filter: true },
          // { headerName: '', field: 'instl_bldng_tx', cellStyle: { 'text-align': "left" }, cellClass: "pm-grid-number-cell", width: 265, sortable: true, filter: true },
          // { headerName: 'Installation Street', field: 'instl_strte_tx', cellStyle: { 'text-align': "left" }, cellClass: "pm-grid-number-cell", width: 265, sortable: true, filter: true },
          // { headerName: 'Installation Locality or Area', field: 'instl_lclty_tx', cellStyle: { 'text-align': "left" }, cellClass: "pm-grid-number-cell", width: 265, sortable: true, filter: true },
          // { headerName: 'Installation Mandal', field: 'instl_mndle_nm', cellStyle: { 'text-align': "left" }, cellClass: "pm-grid-number-cell", width: 265, sortable: true, filter: true },
          // { headerName: 'Installation City or Village', field: 'instl_cty_nm', cellStyle: { 'text-align': "left" }, cellClass: "pm-grid-number-cell", width: 265, sortable: true, filter: true },
          // { headerName: 'Installation District', field: 'instl_dstrt_nm', cellStyle: { 'text-align': "left" }, cellClass: "pm-grid-number-cell", width: 265, sortable: true, filter: true },
          // { headerName: 'Installation State', field: 'instl_ste_nm', cellStyle: { 'text-align': "left" }, cellClass: "pm-grid-number-cell", width: 265, sortable: true, filter: true },
          // { headerName: 'Installation Pincode', field: 'instl_pn_cd', cellStyle: { 'text-align': "left" }, cellClass: "pm-grid-number-cell", width: 265, sortable: true, filter: true },
          // { headerName: 'Installation Fax Number', field: 'instl_fax_nu', cellStyle: { 'text-align': "left" }, cellClass: "pm-grid-number-cell", width: 265, sortable: true, filter: true },
          // { headerName: 'Installation Land Line Number', field: 'instl_lnd_nu', cellStyle: { 'text-align': "left" }, cellClass: "pm-grid-number-cell", width: 265, sortable: true, filter: true },
          // { headerName: 'Installation Latitude', field: 'instl_lat', cellStyle: { 'text-align': "left" }, cellClass: "pm-grid-number-cell", width: 265, sortable: true, filter: true },
          // { headerName: 'Installation Longitude', field: 'instl_lng', cellStyle: { 'text-align': "left" }, cellClass: "pm-grid-number-cell", width: 265, sortable: true, filter: true },
          // { headerName: 'Billing Building or Flat Number', field: 'blng_hse_nu', cellStyle: { 'text-align': "left" }, cellClass: "pm-grid-number-cell", width: 265, sortable: true, filter: true },
          // { headerName: '', field: 'blng_bldng_tx', cellStyle: { 'text-align': "left" }, cellClass: "pm-grid-number-cell", width: 265, sortable: true, filter: true },
          // { headerName: 'Billing Atreet', field: 'blng_strte_tx', cellStyle: { 'text-align': "left" }, cellClass: "pm-grid-number-cell", width: 265, sortable: true, filter: true },
          // { headerName: 'Billing Locality or Area', field: 'blng_lclty_tx', cellStyle: { 'text-align': "left" }, cellClass: "pm-grid-number-cell", width: 265, sortable: true, filter: true },
          // { headerName: 'Billing Mandal', field: 'blng_mndle_nm', cellStyle: { 'text-align': "left" }, cellClass: "pm-grid-number-cell", width: 265, sortable: true, filter: true },
          // { headerName: 'Billing City or Village', field: 'blng_cty_nm', cellStyle: { 'text-align': "left" }, cellClass: "pm-grid-number-cell", width: 265, sortable: true, filter: true },
          // { headerName: 'Billing District', field: 'blng_dstrt_nm', cellStyle: { 'text-align': "left" }, cellClass: "pm-grid-number-cell", width: 265, sortable: true, filter: true },
          // { headerName: 'Billing State', field: 'blng_ste_nm', cellStyle: { 'text-align': "left" }, cellClass: "pm-grid-number-cell", width: 265, sortable: true, filter: true },
          // { headerName: 'Billing Pincode', field: 'blng_pn_cd', cellStyle: { 'text-align': "left" }, cellClass: "pm-grid-number-cell", width: 265, sortable: true, filter: true },
          // { headerName: 'Billing Fax Number', field: 'blng_fax_nu', cellStyle: { 'text-align': "left" }, cellClass: "pm-grid-number-cell", width: 265, sortable: true, filter: true },
          // { headerName: 'Billing Land Line Number', field: 'blng_lnd_nu', cellStyle: { 'text-align': "left" }, cellClass: "pm-grid-number-cell", width: 265, sortable: true, filter: true },
          // { headerName: 'Billing Latitude', field: 'blng_lat', cellStyle: { 'text-align': "left" }, cellClass: "pm-grid-number-cell", width: 265, sortable: true, filter: true },
          // { headerName: 'Billing Longitude', field: 'blng_lng', cellStyle: { 'text-align': "left" }, cellClass: "pm-grid-number-cell", width: 265, sortable: true, filter: true },
          // {
          //   headerName: 'Edit', cellStyle: { textAlign: 'center' }, width: 100,
          //   cellRenderer: function (param) {
          //     const eDiv = document.createElement('div');
          //     eDiv.innerHTML = `<button class="btn-simple editBtn-color edtBtnstls" >
          //                                 <mat-icon class="s-20 mat-icon material-icons">edit</mat-icon>
          //                           </button>`;
          //     return eDiv;
          //   }, hide: (this.permissions.updt_in == 1) ? false : true
          // },
          // {
          //   headerName: 'Delete', cellStyle: { textAlign: 'center' }, width: 100,
          //   cellRenderer: function (param) {
          //     const eDiv = document.createElement('div');
          //     eDiv.innerHTML = `<button class="btn-simple dlteBtnStyls" >
          //                             <mat-icon  class="s-20 mat-icon material-icons deleteBtn-icon-color" >delete</mat-icon>
          //                           </button>`;
          //     return eDiv;
          //   }, hide: (this.permissions.dlte_in == 1) ? false : true
          // }
        ];
      } else if (res['status'] == 404) {
        this.permissions = { "slct_in": 0, "insrt_in": 0, "updt_in": 0, "dlte_in": 0, "exprt_in": 0 }
      }
    })
  }

  onToolbarPreparing(e) {
    // console.log(e);
    e.toolbarOptions.items.unshift({
      location: 'after',
      widget: 'dxButton',
      options: {
        icon: 'plus',
        text: 'Add New Enterprise Customer',
        onClick: this.openSideBar.bind(this, 'addFormPanel', null),
        // this.onCellClick( this.selectedUsers),
        bindingOptions: {
          'disabled': 'isEmailButtonDisabled'
        }
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

  SaveEntpeCstmrForm() {
    console.log(this.hdr_type);
    // if (this.hdr_type == 'new') {
      this.EnterpriseCstmrForm.value['incrn_dt'] = this.datePipe.transform(this.EnterpriseCstmrForm.value.incrn_dt, "yyyy-MM-dd");
      this.EnterpriseCstmrForm.value['actvtn_dt'] = this.datePipe.transform(this.EnterpriseCstmrForm.value.actvtn_dt, "yyyy-MM-dd");
      this.EnterpriseCstmrForm.value['adhr_img_url_tx'] = this.adhr_img_url;
      this.EnterpriseCstmrForm.value['pan_img_url_tx'] = this.pan_img_url;
      this.EnterpriseCstmrForm.value['gst_img_url_tx'] = this.gst_img_url;
      const rte = "caf_operations/provision"
      this.crdsrv.create(this.EnterpriseCstmrForm.value, rte).subscribe((res) => {
        console.log(res['data']);
        this.snackBar.open("Enterprise Customer Sucessfully Added", 'End now', {
          duration: 3000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
        this.getGridData();
        this.closeSideBar();
      })

    // } else if (this.hdr_type == 'Edit') {
    //   console.log(this.EnterpriseCstmrForm.value)
    //   this.EnterpriseCstmrForm.value['incrn_dt'] = this.datePipe.transform(this.EnterpriseCstmrForm.value.incrn_dt, "yyyy-MM-dd");
    //   this.EnterpriseCstmrForm.value['actvtn_dt'] = this.datePipe.transform(this.EnterpriseCstmrForm.value.actvtn_dt, "yyyy-MM-dd");
    //   const rte = `crm/enterpriseCustomer/${this.formDetails.initdata.entrpe_cstmr_id}`
    //   this.crdsrv.create(this.EnterpriseCstmrForm.value, rte).subscribe((res) => {
    //     console.log(res['data']);
    //     this.snackBar.open("Enterprise Customer Sucessfully Updated", 'End now', {
    //       duration: 3000,
    //       horizontalPosition: this.horizontalPosition,
    //       verticalPosition: this.verticalPosition,
    //     });
    //     this.getGridData();
    //     this.closeSideBar();
    //   })
    // }

  }
  addNewEntry() {
    this.formDetails.stngs.oper_mode = "new";
    this.formDetails.initdata = {}
    this.formDetails.stngs.deleteBtn = false;
    this.formDetails.stngs.saveBtn = true;
    this.initdata = {}
    this.openSideBar('', 'addFormPanel', null);
    this.EnterpriseCstmrForm.reset();
    this.hdr_type = 'new';
    this.adhr_img_url_tx = '';
    this.pan_img_url_tx = '';
    this.gst_img_url_tx = '';
  }

  onCellClick(event) {
    this.formDetails.initdata = event.data;
    console.log(this.formDetails.initdata);
    // console.log(this.formDetails.initdatata.cntct_prsn_dsgn_id);
    this.initdata = event.data;
    this.hdr_type = event.colDef.headerName;
    if (event.colDef.headerName == 'Edit') {

      let data = [{
        "id": 1,
        "mndl": event.instl_mndle_id

      }, {
        "id": 2,
        "mndl": event.blng_mndle_id,
      }]

      let data1 = [{
        "id": 1,
        "vlg": event.instl_cty_id

      }, {
        "id": 2,
        "vlg": event.blng_cty_id,
      }]

      this.formDetails.stngs.deleteBtn = false;
      this.formDetails.stngs.saveBtn = true;
      this.formDetails.stngs.oper_mode = "edit"
      this.openSideBar('', 'addFormPanel', null);
      this.EnterpriseCstmrForm.get('entrpe_cstmr_nm').setValue(this.formDetails.initdata.entrpe_cstmr_nm);
      this.EnterpriseCstmrForm.get('entrpe_cstmr_cd').setValue(this.formDetails.initdata.entrpe_cstmr_cd);
      this.EnterpriseCstmrForm.get('entrpe_type_id').setValue(this.formDetails.initdata.entrpe_type_id);
      this.EnterpriseCstmrForm.get('entpnr_sub_type_id').setValue(this.formDetails.initdata.entpnr_sub_type_id);
      this.EnterpriseCstmrForm.get('entpnr_org_nm').setValue(this.formDetails.initdata.entpnr_org_nm);
      this.EnterpriseCstmrForm.get('rgstn_vat_tan_no').setValue(this.formDetails.initdata.rgstn_vat_tan_no);
      this.EnterpriseCstmrForm.get('cntct_prsn_nm').setValue(this.formDetails.initdata.cntct_prsn_nm);
      this.EnterpriseCstmrForm.get('cntct_prsn_mble_nu').setValue(this.formDetails.initdata.cntct_prsn_mble_nu);
      this.EnterpriseCstmrForm.get('cntct_prsn_emle_tx').setValue(this.formDetails.initdata.cntct_prsn_emle_tx);
      this.EnterpriseCstmrForm.get('cntct_prsn_dsgn_id').setValue(this.formDetails.initdata.cntct_prsn_dsgn_id);
      this.EnterpriseCstmrForm.get('blng_frqny_id').setValue(this.formDetails.initdata.blng_frqny_id);
      this.EnterpriseCstmrForm.get('adhr_nu').setValue(this.formDetails.initdata.adhr_nu);
      this.EnterpriseCstmrForm.get('pan_nu').setValue(this.formDetails.initdata.pan_nu);
      this.EnterpriseCstmrForm.get('gst_nu').setValue(this.formDetails.initdata.gst_nu);
      this.adhr_img_url_tx = this.formDetails.initdata.adhr_img_url_tx;
      this.pan_img_url_tx = this.formDetails.initdata.pan_img_url_tx;
      this.gst_img_url_tx = this.formDetails.initdata.gst_img_url_tx;
      // var tmp = this.formDetails.initdata.incrn_dt.split('/');
      this.EnterpriseCstmrForm.get('incrn_dt').setValue(this.formDetails.initdata.incrn_dt);

      this.EnterpriseCstmrForm.get('blng_hse_nu').setValue(this.formDetails.initdata.blng_hse_nu);
      this.EnterpriseCstmrForm.get('blng_bldng_tx').setValue(this.formDetails.initdata.blng_bldng_tx);
      this.EnterpriseCstmrForm.get('blng_strte_tx').setValue(this.formDetails.initdata.blng_strte_tx);
      this.EnterpriseCstmrForm.get('blng_lclty_tx').setValue(this.formDetails.initdata.blng_lclty_tx);
      this.EnterpriseCstmrForm.get('blng_ste_id').setValue(this.formDetails.initdata.blng_ste_id);
      this.EnterpriseCstmrForm.get('blng_dstrt_id').setValue(this.formDetails.initdata.blng_dstrt_id);
      this.EnterpriseCstmrForm.get('blng_mndle_id').setValue(this.formDetails.initdata.blng_mndle_id);
      this.EnterpriseCstmrForm.get('blng_cty_id').setValue(this.formDetails.initdata.blng_cty_id);
      this.EnterpriseCstmrForm.get('blng_pn_cd').setValue(this.formDetails.initdata.blng_pn_cd);
      this.EnterpriseCstmrForm.get('blng_lnd_nu').setValue(this.formDetails.initdata.blng_lnd_nu);
      this.EnterpriseCstmrForm.get('blng_fax_nu').setValue(this.formDetails.initdata.blng_fax_nu);
      this.EnterpriseCstmrForm.get('blng_lat').setValue(this.formDetails.initdata.blng_lat);
      this.EnterpriseCstmrForm.get('blng_lng').setValue(this.formDetails.initdata.blng_lng);

      this.EnterpriseCstmrForm.get('instl_hse_nu').setValue(this.formDetails.initdata.instl_hse_nu);
      this.EnterpriseCstmrForm.get('instl_bldng_tx').setValue(this.formDetails.initdata.instl_bldng_tx);
      this.EnterpriseCstmrForm.get('instl_strte_tx').setValue(this.formDetails.initdata.instl_strte_tx);
      this.EnterpriseCstmrForm.get('instl_lclty_tx').setValue(this.formDetails.initdata.instl_lclty_tx);
      this.EnterpriseCstmrForm.get('instl_ste_id').setValue(this.formDetails.initdata.instl_ste_id);
      this.EnterpriseCstmrForm.get('instl_dstrt_id').setValue(this.formDetails.initdata.instl_dstrt_id);
      this.EnterpriseCstmrForm.get('instl_mndle_id').setValue(this.formDetails.initdata.instl_mndle_id);
      this.EnterpriseCstmrForm.get('instl_cty_id').setValue(this.formDetails.initdata.instl_cty_id);
      this.EnterpriseCstmrForm.get('instl_pn_cd').setValue(this.formDetails.initdata.instl_pn_cd);
      this.EnterpriseCstmrForm.get('instl_lnd_nu').setValue(this.formDetails.initdata.instl_lng_nu);
      this.EnterpriseCstmrForm.get('instl_fax_nu').setValue(this.formDetails.initdata.instl_fax_nu);
      this.EnterpriseCstmrForm.get('instl_lat').setValue(this.formDetails.initdata.instl_lat);
      this.EnterpriseCstmrForm.get('instl_lng').setValue(this.formDetails.initdata.instl_lng);
      // var tmp1 = this.formDetails.initdata.actvtn_dt.split('/');
      this.EnterpriseCstmrForm.get('actvtn_dt').setValue(this.formDetails.initdata.actvtn_dt);
      if (this.formDetails.initdata.chckd_ind == 1) {
        this.EnterpriseCstmrForm.get('instl_chk_ind').setValue(true);
      }
      this.getDistricts();
      this.getMandals(data);
      this.getvillages(data1);
      this.getDesignations();
      this.getEntrpeCstmrType();
      this.getEntrpeCstmrSubType();


    } else if (event.colDef.headerName == 'Delete') {
      this.formDetails.stngs.deleteBtn = true;
      this.formDetails.stngs.saveBtn = false;
      this.formDetails.stngs.oper_mode = "delete"
      this.confirmDialogRef = this.dialog.open(DeleteDialogComponent, {
        width: '25%',
        panelClass: 'my-class',
        data: { message: 'Are you sure deleting this item ?', id: this.formDetails.initdata.entrpe_cstmr_id, nm: this.formDetails.initdata.entrpe_cstmr_nm, entityname: 'Enterprise Customer', flag: false, rte: `crm/enterpriseCustomer/${this.formDetails.initdata.entrpe_cstmr_id}` }
      });

      this.confirmDialogRef.afterClosed().subscribe((response) => {
        if (response == undefined) { }
        else if (response.status == 200)
          this.getGridData();
      })
    }
  }
  openSideBar(devid, key, data) {
    this._dsSidebarService.getSidebar('addFormPanel').toggleOpen();
  }
  closeSideBar() {
    this._dsSidebarService.getSidebar('addFormPanel').toggleOpen();
  }
  onBtnExport(): void {
    const params = {
      columnGroups: true,
      columnKeys: ['sno', 'entrpe_cstmr_nm', 'entrpe_cstmr_cd', 'entrpe_type_id', 'entpnr_sub_type_id', 'entpnr_org_nm', 'rgstn_vat_tan_no', 'incrn_dt', 'adhr_nu', 'pan_nu', 'gst_nu', 'cntct_prsn_nm', 'cntct_prsn_mble_nu', 'cntct_prsn_emle_tx', 'cntct_prsn_dsgn_id', 'blng_frqny_id', 'actvtn_dt', 'instl_hse_nu', 'instl_bldng_tx', 'instl_strte_tx', 'instl_lclty_tx', 'instl_mndle_id', 'instl_cty_id', 'instl_dstrt_id', 'instl_ste_id', 'instl_pn_cd', 'instl_fax_nu', 'instl_lnd_nu', 'instl_lat', 'instl_lng', 'blng_hse_nu', 'blng_bldng_tx', 'blng_strte_tx', 'blng_lclty_tx', 'blng_mndle_id', 'blng_cty_id', 'blng_dstrt_id', 'blng_ste_id', 'blng_pn_cd', 'blng_fax_nu', 'blng_lnd_nu', 'blng_lat', 'blng_lng', 'chckd_ind',],
      fileName: "ds_" + this.formDetails.stngs.form_title.replace(" ", "_")
    };
    this.gridApi.exportDataAsCsv(params);
  }
  videoUpldS3Res = [];
  imageprew = []
  uploadAdhr(event) {
    let reader = new FileReader();
    let file = event.target.files[0];
    console.log(file);
    if (event.target.files && event.target.files[0]) {
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.adhr_img_url_tx = reader.result;
        this.selectedFiles = event.target.files;
        this.imageprew = [{
          s3UpldPath: this.selectedFiles.item(0),
          video_path: this.domSanitizer.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(event.target.files[0])),
          file_nm: event.target.files[0].name,
          size: this.uploadService.formatBytes(event.target.files[0].size),
          ttl_file_size: 0,
          up_stream_bytes: 0,
          sh_prgrs: false,
          sucs_msg: '',
        }];
        console.log(this.selectedFiles)
        this.uploadService.uploadFile(this.imageprew[0].s3UpldPath, (err, res) => {
          console.log(res);
          this.adhr_img_url = res.Location;
          if (res && res.Location) {
            this.imageprew[0].sucs_msg = 'Successfully uploaded files.';
          }
          else {
            this.imageprew[0].sucs_msg = err;
          }
        });
      }
    }
  }

  uploadPan(event) {
    let reader = new FileReader();
    let file = event.target.files[0];
    if (event.target.files && event.target.files[0]) {
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.pan_img_url_tx = reader.result;
        this.selectedFiles = event.target.files;
        this.imageprew = [{
          s3UpldPath: this.selectedFiles.item(0),
          video_path: this.domSanitizer.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(event.target.files[0])),
          file_nm: event.target.files[0].name,
          size: this.uploadService.formatBytes(event.target.files[0].size),
          ttl_file_size: 0,
          up_stream_bytes: 0,
          sh_prgrs: false,
          sucs_msg: '',
        }];
        console.log(this.selectedFiles)
        this.uploadService.uploadFile(this.imageprew[0].s3UpldPath, (err, res) => {
          console.log(res);
          this.pan_img_url = res.Location;
          if (res && res.Location) {
            this.imageprew[0].sucs_msg = 'Successfully uploaded files.';
          }
          else {
            this.imageprew[0].sucs_msg = err;
          }
        });
      }
    }
  }

  uploadGst(event) {
    let reader = new FileReader();
    let file = event.target.files[0];
    if (event.target.files && event.target.files[0]) {
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.gst_img_url_tx = reader.result;
        this.selectedFiles = event.target.files;
        this.imageprew = [{
          s3UpldPath: this.selectedFiles.item(0),
          video_path: this.domSanitizer.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(event.target.files[0])),
          file_nm: event.target.files[0].name,
          size: this.uploadService.formatBytes(event.target.files[0].size),
          ttl_file_size: 0,
          up_stream_bytes: 0,
          sh_prgrs: false,
          sucs_msg: '',
        }];
        this.uploadService.uploadFile(this.imageprew[0].s3UpldPath, (err, res) => {
          this.gst_img_url = res.Location;
          if (res && res.Location) {
            this.imageprew[0].sucs_msg = 'Successfully uploaded files.';
          }
          else {
            this.imageprew[0].sucs_msg = err;
          }
        });
      }
    }
  }
  checkCheckBoxvalue(value) {
    console.log(value.checked);
    console.log(this.EnterpriseCstmrForm);
    this.EnterpriseCstmrForm.valueChanges
      .pipe(
        distinctUntilChanged(),
        switchMap(isSameAddress => {
          console.log(isSameAddress)
          if (isSameAddress) {
            return this.EnterpriseCstmrForm.get('installationAddress').valueChanges
              .pipe(
                startWith(this.EnterpriseCstmrForm.get('installationAddress').valueChanges),
                tap(value =>
                  this.EnterpriseCstmrForm
                    .get('billingAddress')
                    .setValue(value)
                )
              )
          } else {
            this.EnterpriseCstmrForm
              .get('billingAddress')
              .reset();

            return EMPTY;
          }
        })
      )
      .subscribe();
  }

  close() {
    this.EnterpriseCstmrForm.reset();
  }

}
