import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CrudService } from '../../crud.service';
import { DsSidebarService } from '@glits/components/sidebar/sidebar.service';
import { DatePipe } from '@angular/common';
import { DeleteDialogComponent } from 'app/main/shared/components/delete-dialog/delete-dialog.component';
import {
  MatTableDataSource, MatPaginator, MatSort, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition, MatDialogRef, MatSnackBar, MatDialog,
  MAT_DIALOG_DATA
} from '@angular/material';
import { Router } from '@angular/router';


@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnInit {
  firstFormGroup: FormGroup;
  gndrLst: any;
  showTble = true;
  showAddBtn = true;
  showBckBtn: boolean;
  frm_type: any;
  showStepr = false;
  sideBarHeader: string;
  editClicked: boolean = false;
  updateData: any;
  deleteCstmr: boolean;
  ste_lst: any;
  dstrt_lst: any;
  mndl_lst: any;
  vlge_lst: any;
  columnDefs = [];
  rowData = [];
  getRowHeight;
  districtId: any;
  spnrCtrl = false;
  confirmDialogRef: MatDialogRef<DeleteDialogComponent>;
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  getHeaderDtls = function () { return { "title": 'Customers  List', "icon": "people_outline" } }
  blng_frqncy_lst: any;
  mndal_lst: any;
  mandalId: any;
  vilge_lst: any;
  permissions;

  isChecked:any;

  constructor(private _fuseSidebarService: DsSidebarService, private _formBuilder: FormBuilder, private crdsrv: CrudService,
     private datePipe: DatePipe, private snackBar: MatSnackBar, public dialog: MatDialog,private route: Router ) {

    let rowHeight = 40;
    this.getRowHeight = function (params) {
      return rowHeight;
    };
    this.permissions = { "slct_in": 1, "insrt_in": 0, "updt_in": 1, "dlte_in": 1, "exprt_in": 1 };
  }

  getcustomer() {
    this.spnrCtrl = true;
    console.log("hiiii");
    const rte = `crm/customer/customer`;
    this.crdsrv.get(rte).subscribe((res) => {
      console.log(res['data']);
      this.rowData = res['data'];
      this.columnDefs = [
        { headerName: 'Sno', field: 'sno', cellStyle: { 'text-align': "center" }, cellClass: "pm-grid-number-cell", width: 100, filter: false, search: false },
        { headerName: 'Name', field: 'frst_nm', cellStyle: { 'text-align': "left" }, cellClass: "pm-grid-number-cell", width: 250, filter: true },
        // { headerName: 'Last Name', field: 'cstmr_lst_nm', cellStyle: { 'text-align': "left" }, cellClass: "pm-grid-number-cell", width: 250, filter: true },
        { headerName: 'Mobile Number', field: 'cntct_mble1_nu', cellStyle: { 'text-align': "left" }, cellClass: "pm-grid-number-cell", width: 150, filter: true },
        { headerName: 'Email', field: 'loc_eml1_tx', cellStyle: { 'text-align': "left" }, cellClass: "pm-grid-number-cell", width: 200, filter: true },
        // { headerName: 'Gender', field: 'gndr_nm', cellStyle: { 'text-align': "left" }, cellClass: "pm-grid-number-cell", width: 150, filter: true },
        // { headerName: 'Mobile No', field: 'lst_nm' },
        // { headerName: 'Email', field: 'lst_nm' },
        // { headerName: 'Adhar Number', field: 'adhr_nu', cellStyle: { 'text-align': "left" }, cellClass: "pm-grid-number-cell", width: 150, filter: true },
        // { headerName: 'Pan Number', field: 'pan_nu', cellStyle: { 'text-align': "left" }, cellClass: "pm-grid-number-cell", width: 150, filter: true },
        // { headerName: 'Contact Person Name', field: 'cntct_prsn_nm', cellStyle: { 'text-align': "left" }, cellClass: "pm-grid-number-cell", width: 250, filter: true },
        { headerName: 'Contact Person Mobile NO', field: 'blng_cntct_mble1_nu', cellStyle: { 'text-align': "left" }, cellClass: "pm-grid-number-cell", width: 250, filter: true },
        { headerName: 'Contact Person Email', field: 'loc_eml1_tx', cellStyle: { 'text-align': "left" }, cellClass: "pm-grid-number-cell", width: 250, filter: true },
        { headerName: 'Billing Frequency', field: 'billfreqlov', cellStyle: { 'text-align': "left" }, cellClass: "pm-grid-number-cell", width: 250, filter: true },
        // { headerName: 'Activation Date', field: 'actvtn_dt', cellStyle: { 'text-align': "left" }, cellClass: "pm-grid-number-cell", width: 250, filter: true },
        // { headerName: 'Installation House No', field: 'instl_hse_nu', cellStyle: { 'text-align': "left" }, cellClass: "pm-grid-number-cell", width: 150, filter: true },
        { headerName: 'Installation Street', field: 'loc_addr1_tx', cellStyle: { 'text-align': "left" }, cellClass: "pm-grid-number-cell", width: 150, filter: true },
        { headerName: 'Installation Location', field: 'loc_addr2_tx', cellStyle: { 'text-align': "left" }, cellClass: "pm-grid-number-cell", width: 150, filter: true },
        // { headerName: 'Installation State', field: 'instl_ste_nm', cellStyle: { 'text-align': "left" }, cellClass: "pm-grid-number-cell", width: 150, filter: true },
        // { headerName: 'Installation District', field: 'instl_dstrct_nm', cellStyle: { 'text-align': "left" }, cellClass: "pm-grid-number-cell", width: 150, filter: true },
        // { headerName: 'Installation Mandal', field: 'instl_mndl_nm', cellStyle: { 'text-align': "left" }, cellClass: "pm-grid-number-cell", width: 150, filter: true },
        { headerName: 'Installation City/Village', field: 'loc_lcly_tx', cellStyle: { 'text-align': "left" }, cellClass: "pm-grid-number-cell", width: 150, filter: true },
        { headerName: 'Billing House No', field: 'blng_addr2_tx', cellStyle: { 'text-align': "left" }, cellClass: "pm-grid-number-cell", width: 150, filter: true },
        { headerName: 'Billing Street', field: 'blng_addr1_tx', cellStyle: { 'text-align': "left" }, cellClass: "pm-grid-number-cell", width: 150, filter: true },
        // { headerName: 'Billing Location', field: 'blng_lcly_tx', cellStyle: { 'text-align': "left" }, cellClass: "pm-grid-number-cell", width: 150, filter: true },
        // { headerName: 'Billing State', field: 'blng_dte_nm', cellStyle: { 'text-align': "left" }, cellClass: "pm-grid-number-cell", width: 150, filter: true },
        // { headerName: 'Billing District', field: 'blng_dstrct_nm', cellStyle: { 'text-align': "left" }, cellClass: "pm-grid-number-cell", width: 150, filter: true },
        // { headerName: 'Billing Mandal', field: 'blng_mndl_nm', cellStyle: { 'text-align': "left" }, cellClass: "pm-grid-number-cell", width: 150, filter: true },
        { headerName: 'Billing City/Village', field: 'loc_lcly_tx', cellStyle: { 'text-align': "left" }, cellClass: "pm-grid-number-cell", width: 150, filter: true },
       
      ];

    }, (error) => {
      //console.log(error);
    });
  }

  onToolbarPreparing(e) {
    // console.log(e);
      e.toolbarOptions.items.unshift({
        location: 'after',
        widget: 'dxButton',
        options: {
            icon: 'plus',
            text: 'Add New Customer',
            onClick: this.addNewEntry.bind(this),
            // this.onCellClick( this.selectedUsers),
            bindingOptions: {
              'disabled': 'isEmailButtonDisabled'
            }
        }
    });
}
addNewEntry(){
  this.route.navigate([`/admin/crm/customer/form`])
}
  opensideBar(key, cstmrUpdtData) {

    if (cstmrUpdtData) {
      console.log("edit")
      console.log(this.firstFormGroup)
      console.log(cstmrUpdtData);
      this.sideBarHeader = 'Edit';
      this.editClicked = true;
      this.updateData = cstmrUpdtData;
      this.firstFormGroup.get('firstName').setValue(cstmrUpdtData.cstmr_fst_nm);
      this.firstFormGroup.get('middleName').setValue(cstmrUpdtData.cstmr_mdl_nm);
      this.firstFormGroup.get('lastName').setValue(cstmrUpdtData.cstmr_lst_nm);
      this.firstFormGroup.get('gender').setValue(cstmrUpdtData.gndr_id);
      this.firstFormGroup.get('dateofbirth').setValue(cstmrUpdtData.cstmr_dtf_brth);
      this.firstFormGroup.get('father_husbandname').setValue(cstmrUpdtData.cstmr_fthr_hsbd_nm);
      this.firstFormGroup.get('adharno').setValue(cstmrUpdtData.adhr_nu);
      this.firstFormGroup.get('pan_card_no').setValue(cstmrUpdtData.pan_nu);
      this.firstFormGroup.get('email').setValue(cstmrUpdtData.cstmr_emle_tx);
      this.firstFormGroup.get('mobileNumber').setValue(cstmrUpdtData.cstmr_mble_nu);
      this.firstFormGroup.get('billing_frequency').setValue(cstmrUpdtData.blng_frqny_id);
      this.firstFormGroup.get('activationdate').setValue(cstmrUpdtData.actvtn_dt);
      this.firstFormGroup.get('instl_house_flat_no').setValue(cstmrUpdtData.instl_hse_nu);
      this.firstFormGroup.get('instl_buildingname').setValue(cstmrUpdtData.instl_bldng_tx);
      this.firstFormGroup.get('instl_streetname').setValue(cstmrUpdtData.instl_strte_tx);
      this.firstFormGroup.get('instl_Area_Localityname').setValue(cstmrUpdtData.instl_lclty_tx);
      this.firstFormGroup.get('instl_pincode').setValue(cstmrUpdtData.instl_pn_cd);
      this.firstFormGroup.get('instl_state').setValue(cstmrUpdtData.instl_ste_id);
      this.firstFormGroup.get('instl_district').setValue(cstmrUpdtData.instl_dstrt_id);
      this.firstFormGroup.get('instl_mandal').setValue(cstmrUpdtData.instl_mndle_id);
      this.firstFormGroup.get('instl_city_villagename').setValue(cstmrUpdtData.instl_cty_id);
      this.firstFormGroup.get('instl_latitude').setValue(cstmrUpdtData.instl_lat);
      this.firstFormGroup.get('instl_longitude').setValue(cstmrUpdtData.instl_lng);
      this.firstFormGroup.get('contactpersonname').setValue(cstmrUpdtData.cntct_prsn_nm);
      this.firstFormGroup.get('cntct_prsn_mobileNumber').setValue(cstmrUpdtData.cntct_prsn_mble_nu);
      this.firstFormGroup.get('cntct_prsn_email').setValue(cstmrUpdtData.cntct_prsn_emle_tx);
      this.firstFormGroup.get('blng_house_flat_no').setValue(cstmrUpdtData.blng_hse_nu);
      this.firstFormGroup.get('blng_buildingname').setValue(cstmrUpdtData.blng_bldng_tx);
      this.firstFormGroup.get('blng_streetname').setValue(cstmrUpdtData.blng_strte_tx);
      this.firstFormGroup.get('blng_Area_Localityname').setValue(cstmrUpdtData.blng_lclty_tx);
      this.firstFormGroup.get('blng_pincode').setValue(cstmrUpdtData.blng_pn_cd);
      this.firstFormGroup.get('blng_state').setValue(cstmrUpdtData.blng_ste_id);
      this.firstFormGroup.get('blng_district').setValue(cstmrUpdtData.blng_dstrt_id);
      this.firstFormGroup.get('blng_mandal').setValue(cstmrUpdtData.blng_mndle_id);
      this.firstFormGroup.get('blng_city_villagename').setValue(cstmrUpdtData.blng_cty_id);
      this.firstFormGroup.get('blng_latitude').setValue(cstmrUpdtData.blng_lat);
      this.firstFormGroup.get('blng_longitude').setValue(cstmrUpdtData.blng_lng);
    } else {
      this.sideBarHeader = 'Add New';
      this.editClicked = false;
      this.deleteCstmr = false;
      console.log("Newwwww")
      this.firstFormGroup.get('firstName').setValue('');
      this.firstFormGroup.get('middleName').setValue('');
      this.firstFormGroup.get('lastName').setValue('');
      this.firstFormGroup.get('gender').setValue('');
      this.firstFormGroup.get('dateofbirth').setValue('');
      this.firstFormGroup.get('father_husbandname').setValue('');
      this.firstFormGroup.get('adharno').setValue('');
      this.firstFormGroup.get('pan_card_no').setValue('');
      this.firstFormGroup.get('email').setValue('');
      this.firstFormGroup.get('mobileNumber').setValue('');
      this.firstFormGroup.get('billing_frequency').setValue('');
      this.firstFormGroup.get('activationdate').setValue('');
      this.firstFormGroup.get('instl_house_flat_no').setValue('');
      this.firstFormGroup.get('instl_buildingname').setValue('');
      this.firstFormGroup.get('instl_streetname').setValue('');
      this.firstFormGroup.get('instl_Area_Localityname').setValue('');
      this.firstFormGroup.get('instl_pincode').setValue('');
      this.firstFormGroup.get('instl_state').setValue('');
      this.firstFormGroup.get('instl_district').setValue('');
      this.firstFormGroup.get('instl_mandal').setValue('');
      this.firstFormGroup.get('instl_city_villagename').setValue('');
      this.firstFormGroup.get('instl_latitude').setValue('');
      this.firstFormGroup.get('instl_longitude').setValue('');
      this.firstFormGroup.get('contactpersonname').setValue('');
      this.firstFormGroup.get('cntct_prsn_mobileNumber').setValue('');
      this.firstFormGroup.get('cntct_prsn_email').setValue('');
      this.firstFormGroup.get('blng_house_flat_no').setValue('');
      this.firstFormGroup.get('blng_buildingname').setValue('');
      this.firstFormGroup.get('blng_streetname').setValue('');
      this.firstFormGroup.get('blng_Area_Localityname').setValue('');
      this.firstFormGroup.get('blng_pincode').setValue('');
      this.firstFormGroup.get('blng_state').setValue('');
      this.firstFormGroup.get('blng_district').setValue('');
      this.firstFormGroup.get('blng_mandal').setValue('');
      this.firstFormGroup.get('blng_city_villagename').setValue('');
      this.firstFormGroup.get('blng_latitude').setValue('');
      this.firstFormGroup.get('blng_longitude').setValue('');
      this.firstFormGroup.reset();
    }
    // console.log(orgUpdtData);

    // this.FormLoctn.get('orgn_nm').setValue('');

    this._fuseSidebarService.getSidebar(key).toggleOpen();
  }

  bckBtn() {
    this.showAddBtn = true;
    this.showBckBtn = false;
    this.showStepr = false;
    this.showTble = true;
    this.getcustomer();
  }

  ngOnInit() {
    this.getcustomer();
    let emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
    let phoneNumber = /^(\+\d{1,3}[- ]?)?\d{10}$/;
    this.firstFormGroup = this._formBuilder.group({
      // firstCtrl: ['', Validators.required],
      firstName: ['', Validators.required],
      middleName: ['', Validators],
      lastName: ['', Validators.required],
      gender: ['', Validators.required],
      dateofbirth: ['', Validators.required],
      father_husbandname: ['', Validators],
      adharno: ['', Validators.required],
      pan_card_no: ['', Validators],
      email: ['', [Validators.pattern(emailPattern)]],
      mobileNumber: ['', [Validators.required, Validators.pattern(phoneNumber)]],
      billing_frequency: ['', Validators.required],
      activationdate: ['', Validators.required],
      instl_house_flat_no: ['', Validators.required],
      instl_buildingname: ['', Validators],
      instl_streetname: ['', Validators.required],
      instl_Area_Localityname: ['', Validators.required],
      instl_pincode: ['', Validators.required],
      instl_state: ['', Validators.required],
      instl_district: ['', Validators.required],
      instl_mandal: ['', Validators.required],
      instl_city_villagename: ['', Validators.required],
      instl_latitude: ['', Validators],
      instl_longitude: ['', Validators],
      contactpersonname: ['', Validators.required],
      cntct_prsn_mobileNumber: ['', Validators.required],
      cntct_prsn_email: ['', Validators],
      blng_house_flat_no: ['', Validators.required],
      blng_buildingname: ['', Validators],
      blng_streetname: ['', Validators.required],
      blng_Area_Localityname: ['', Validators.required],
      blng_pincode: ['', Validators.required],
      blng_state: ['', Validators.required],
      blng_district: ['', Validators.required],
      blng_mandal: ['', Validators.required],
      blng_city_villagename: ['', Validators.required],
      blng_latitude: ['', Validators],
      blng_longitude: ['', Validators],
      instl_chk_ind: ['', Validators],


    });

    const prfleRte = `user/gender`;
    this.crdsrv.get(prfleRte).subscribe((res) => {
      this.gndrLst = res['data'];
      // console.log(this.gndrLst);
    }, (error) => {
      console.log(error);
    });
    this.getStates();
    this.getBillingFrequency();


  }
  getBillingFrequency() {
    const rte = `crm/billingFrequency`;
    this.crdsrv.get(rte).subscribe((res) => {
      this.blng_frqncy_lst = res['data'];
      console.log(this.blng_frqncy_lst)
    })
  }

  getStates() {
    const rte = `user/getstates`;
    this.crdsrv.get(rte).subscribe((res) => {
      if (res['data'].length > 0) {
        this.ste_lst = res['data'];
      }
      // console.log(this.ste_lst)
    })
  }

  getDistricts() {
    console.log(this.firstFormGroup.value.instl_ste_id);
    const rte = `user/getdstrcts/${this.firstFormGroup.value.instl_state}`;
    // console.log(rte);
    this.crdsrv.get(rte).subscribe((res) => {
      this.dstrt_lst = res['data'];
      // this.firstFormGroup.get('instl_district').setValue(instl_dstrt_id);
    });
  }

  getMandals(data) {
    console.log(data);

    if (data.length == 1) {
      console.log("in 1")
      if (data[0].id == 1) {
        this.districtId = this.firstFormGroup.value.instl_district;
        const rte = `user/getMndls/${this.districtId}`;
        this.crdsrv.get(rte).subscribe((res) => {
          this.mndl_lst = res['data'];
        });
      }
      else if (data[0].id == 2) {
        this.districtId = this.firstFormGroup.value.blng_district;
        const rte = `user/getMndls/${this.districtId}`;
        this.crdsrv.get(rte).subscribe((res) => {
          this.mndal_lst = res['data'];
        });
      }
    }
    if (data.length > 1) {
      console.log("in 2")

      if (data[0].id == 1) {
        this.districtId = this.firstFormGroup.value.instl_district;
        const rte = `user/getMndls/${this.districtId}`;
        this.crdsrv.get(rte).subscribe((res) => {
          this.mndl_lst = res['data'];
        });
      }
      if (data[1].id == 2) {
        this.districtId = this.firstFormGroup.value.blng_district;
        const rte = `user/getMndls/${this.districtId}`;
        this.crdsrv.get(rte).subscribe((res) => {
          this.mndal_lst = res['data'];
        });
      }
    }
    console.log(this.districtId);
  }

  getvillages(data) {
    console.log(data);
    if (data.length == 1) {
      console.log("in 1")
      if (data[0].id == 1) {
        this.mandalId = this.firstFormGroup.value.instl_mandal;
        const rte = `user/getvlgs/${this.mandalId}/${this.districtId}`;
        this.crdsrv.get(rte).subscribe((res) => {
          this.vlge_lst = res['data'];
        });
      }
      else if (data[0].id == 2) {
        this.mandalId = this.firstFormGroup.value.blng_mandal;
        const rte = `user/getvlgs/${this.mandalId}/${this.districtId}`;
        this.crdsrv.get(rte).subscribe((res) => {
          this.vilge_lst = res['data'];
        });
      }
    }
    if (data.length > 1) {
      console.log("in 2")

      if (data[0].id == 1) {
        this.mandalId = this.firstFormGroup.value.instl_mandal;
        const rte = `user/getvlgs/${this.mandalId}/${this.districtId}`;
        this.crdsrv.get(rte).subscribe((res) => {
          this.vlge_lst = res['data'];
        });
      }
      if (data[1].id == 2) {
        this.mandalId = this.firstFormGroup.value.blng_mandal;
        const rte = `user/getvlgs/${this.mandalId}/${this.districtId}`;
        this.crdsrv.get(rte).subscribe((res) => {
          this.vilge_lst = res['data'];
        });
      }
    }
    console.log(this.mandalId);
  }


  checkValue(event: any) {
    console.log(this.firstFormGroup.value);
    // console.log(event);
    if (event == 'true') {
      console.log(event);
      this.mndal_lst = this.mndl_lst;
      this.vilge_lst = this.vlge_lst;
      let data = this.firstFormGroup.value;
      this.firstFormGroup.get('contactpersonname').setValue(data.firstName);
      this.firstFormGroup.get('cntct_prsn_mobileNumber').setValue(data.mobileNumber);
      this.firstFormGroup.get('cntct_prsn_email').setValue(data.email);
      this.firstFormGroup.get('blng_house_flat_no').setValue(data.instl_house_flat_no);
      this.firstFormGroup.get('blng_buildingname').setValue(data.instl_buildingname);
      this.firstFormGroup.get('blng_streetname').setValue(data.instl_streetname);
      this.firstFormGroup.get('blng_Area_Localityname').setValue(data.instl_Area_Localityname);
      this.firstFormGroup.get('blng_pincode').setValue(data.instl_pincode);
      this.firstFormGroup.get('blng_state').setValue(data.instl_state);
      this.firstFormGroup.get('blng_district').setValue(data.instl_district);
      this.firstFormGroup.get('blng_mandal').setValue(data.instl_mandal);
      this.firstFormGroup.get('blng_city_villagename').setValue(data.instl_city_villagename);
      this.firstFormGroup.get('blng_latitude').setValue(data.instl_latitude);
      this.firstFormGroup.get('blng_longitude').setValue(data.instl_longitude);
    } else {
      console.log(event);
      // this.firstFormGroup.reset('billingAddress');
      this.firstFormGroup.get('contactpersonname').reset();
      this.firstFormGroup.get('cntct_prsn_mobileNumber').reset();
      this.firstFormGroup.get('cntct_prsn_email').reset();
      this.firstFormGroup.get('blng_house_flat_no').reset();
      this.firstFormGroup.get('blng_buildingname').reset();
      this.firstFormGroup.get('blng_streetname').reset();
      this.firstFormGroup.get('blng_Area_Localityname').reset();
      this.firstFormGroup.get('blng_pincode').reset();
      this.firstFormGroup.get('blng_state').reset();
      this.firstFormGroup.get('blng_district').reset();
      this.firstFormGroup.get('blng_mandal').reset();
      this.firstFormGroup.get('blng_city_villagename').reset();
      this.firstFormGroup.get('blng_latitude').reset();
      this.firstFormGroup.get('blng_longitude').reset();
    }
  }


  installationAddress() {
    if (this.firstFormGroup.value.instl_chk_ind == true) {

    }
  }

  delete(data) {
    console.log("delete");
    console.log(data);

    let cstmrDelRte = `crm/customer/customer/${data.cstmr_id}`;
    this.crdsrv.delete(cstmrDelRte).subscribe((res) => {


      this.confirmDialogRef = this.dialog.open(DeleteDialogComponent, {
        width: '25%',
        panelClass: 'my-class',
        data: { message: 'Are you sure deleting this item ?', id: data.cstmr_id, nm: data.cstmr_fst_nm, entityname: 'Customer', flag: false, rte: `crm/customer/customer/${data.cstmr_id}` }
      });

      this.confirmDialogRef.afterClosed().subscribe((response) => {
        if (response == undefined) { }
        else if (response.status == 200) {
          this.getcustomer();
          this.opensideBar('addFormPanel', null);
        }
      });
    });


  }

  closeSideBar = function () {
    this._fuseSidebarService.getSidebar('addFormPanel').toggleOpen();
    this.firstFormGroup.reset();
  }

  saveCustomer() {
    if (this.editClicked == false) {
      this.newentry();
    } else if (this.deleteCstmr == true) {
      this.delete(this.updateData);
    } else {
      this.update(this.updateData);
    }
  }

  newentry() {
    // this.usrdtls = JSON.parse(localStorage.getItem('usrDtls'));
    // console.log(this.formDesgination.value);
    // console.log(this.firstFormGroup.value);
    this.firstFormGroup.value['dateofbirth'] = this.datePipe.transform(this.firstFormGroup.value.dateofbirth, 'yyyy-MM-dd');
    this.firstFormGroup.value['activationdate'] = this.datePipe.transform(this.firstFormGroup.value.activationdate, 'yyyy-MM-dd');

    // this.usrdtls = JSON.parse(localStorage.getItem('usrDtls'));
    const rte = `crm/customer/customer`;
    let data = {
      agnt_id: '',
      cstmr_fst_nm: this.firstFormGroup.value.firstName,
      cstmr_mdl_nm: this.firstFormGroup.value.middleName,
      cstmr_lst_nm: this.firstFormGroup.value.lastName,
      gndr_id: this.firstFormGroup.value.gender,
      cstmr_dtf_brth: this.firstFormGroup.value.dateofbirth,
      cstmr_fthr_hsbd_nm: this.firstFormGroup.value.father_husbandname,
      adhr_nu: this.firstFormGroup.value.adharno,
      pan_nu: this.firstFormGroup.value.pan_card_no,
      cstmr_emle_tx: this.firstFormGroup.value.email,
      cstmr_mble_nu: this.firstFormGroup.value.mobileNumber,
      blng_frqny_id: this.firstFormGroup.value.billing_frequency,
      actvtn_dt: this.firstFormGroup.value.activationdate,
      instl_hse_nu: this.firstFormGroup.value.instl_house_flat_no,
      // instl_lnd_nu: '',
      // cntct_prsn_dsgn_id: '',
      instl_bldng_tx: this.firstFormGroup.value.instl_buildingname,
      instl_strte_tx: this.firstFormGroup.value.instl_streetname,
      instl_lclty_tx: this.firstFormGroup.value.instl_Area_Localityname,
      instl_pn_cd: this.firstFormGroup.value.instl_pincode,
      instl_ste_id: this.firstFormGroup.value.instl_state,
      instl_dstrt_id: this.firstFormGroup.value.instl_district,
      instl_mndle_id: this.firstFormGroup.value.instl_mandal,
      instl_cty_id: this.firstFormGroup.value.instl_city_villagename,
      instl_lat: this.firstFormGroup.value.instl_latitude,
      instl_lng: this.firstFormGroup.value.instl_longitude,
      cntct_prsn_nm: this.firstFormGroup.value.contactpersonname,
      cntct_prsn_mble_nu: this.firstFormGroup.value.cntct_prsn_mobileNumber,
      cntct_prsn_emle_tx: this.firstFormGroup.value.cntct_prsn_email,
      blng_hse_nu: this.firstFormGroup.value.blng_house_flat_no,
      // blng_lnd_nu: '',
      blng_bldng_tx: this.firstFormGroup.value.blng_buildingname,
      blng_strte_tx: this.firstFormGroup.value.blng_streetname,
      blng_lclty_tx: this.firstFormGroup.value.blng_Area_Localityname,
      blng_pn_cd: this.firstFormGroup.value.blng_pincode,
      blng_ste_id: this.firstFormGroup.value.blng_state,
      blng_dstrt_id: this.firstFormGroup.value.blng_district,
      blng_mndle_id: this.firstFormGroup.value.blng_mandal,
      blng_cty_id: this.firstFormGroup.value.blng_city_villagename,
      blng_lat: this.firstFormGroup.value.blng_latitude,
      blng_lng: this.firstFormGroup.value.blng_longitude,
      // mrcht_id: this.usrdtls.mrcht_id
    };
    console.log(data);
    this.crdsrv.create(data, rte).subscribe((res) => {
      console.log(res);
      if (res['status'] == 200) {
        this.snackBar.open("Sucessfully Added", '', {
          duration: 2000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
        this.getcustomer();
        this.opensideBar('addFormPanel', null);

      }


    });
  }
  // }, (error) => {
  //   console.log(error);
  // });

  update(data) {
    // console.log(this.firstFormGroup.value);
    // console.log(data);
    //   // return;

    const rte = `crm/customer/customer/${data.cstmr_id}`;
    //   this.usrdtls = JSON.parse(localStorage.getItem('usrDtls'));
    this.firstFormGroup.value['dateofbirth'] = this.datePipe.transform(this.firstFormGroup.value.dateofbirth, 'yyyy-MM-dd');
    this.firstFormGroup.value['activationdate'] = this.datePipe.transform(this.firstFormGroup.value.activationdate, 'yyyy-MM-dd');


    let cstmrData = {
      agnt_id: '',
      cstmr_fst_nm: this.firstFormGroup.value.firstName,
      cstmr_mdl_nm: this.firstFormGroup.value.middleName,
      cstmr_lst_nm: this.firstFormGroup.value.lastName,
      gndr_id: this.firstFormGroup.value.gender,
      cstmr_dtf_brth: this.firstFormGroup.value.dateofbirth,
      cstmr_fthr_hsbd_nm: this.firstFormGroup.value.father_husbandname,
      adhr_nu: this.firstFormGroup.value.adharno,
      pan_nu: this.firstFormGroup.value.pan_card_no,
      cstmr_emle_tx: this.firstFormGroup.value.email,
      cstmr_mble_nu: this.firstFormGroup.value.mobileNumber,
      blng_frqny_id: this.firstFormGroup.value.billing_frequency,
      actvtn_dt: this.firstFormGroup.value.activationdate,
      instl_hse_nu: this.firstFormGroup.value.instl_house_flat_no,
      // instl_lnd_nu: '',
      // cntct_prsn_dsgn_id: '',
      instl_bldng_tx: this.firstFormGroup.value.instl_buildingname,
      instl_strte_tx: this.firstFormGroup.value.instl_streetname,
      instl_lclty_tx: this.firstFormGroup.value.instl_Area_Localityname,
      instl_pn_cd: this.firstFormGroup.value.instl_pincode,
      instl_ste_id: this.firstFormGroup.value.instl_state,
      instl_dstrt_id: this.firstFormGroup.value.instl_district,
      instl_mndle_id: this.firstFormGroup.value.instl_mandal,
      instl_cty_id: this.firstFormGroup.value.instl_city_villagename,
      instl_lat: this.firstFormGroup.value.instl_latitude,
      instl_lng: this.firstFormGroup.value.instl_longitude,
      cntct_prsn_nm: this.firstFormGroup.value.contactpersonname,
      cntct_prsn_mble_nu: this.firstFormGroup.value.cntct_prsn_mobileNumber,
      cntct_prsn_emle_tx: this.firstFormGroup.value.cntct_prsn_email,
      blng_hse_nu: this.firstFormGroup.value.blng_house_flat_no,
      // blng_lnd_nu: '',
      blng_bldng_tx: this.firstFormGroup.value.blng_buildingname,
      blng_strte_tx: this.firstFormGroup.value.blng_streetname,
      blng_lclty_tx: this.firstFormGroup.value.blng_Area_Localityname,
      blng_pn_cd: this.firstFormGroup.value.blng_pincode,
      blng_ste_id: this.firstFormGroup.value.blng_state,
      blng_dstrt_id: this.firstFormGroup.value.blng_district,
      blng_mndle_id: this.firstFormGroup.value.blng_mandal,
      blng_cty_id: this.firstFormGroup.value.blng_city_villagename,
      blng_lat: this.firstFormGroup.value.blng_latitude,
      blng_lng: this.firstFormGroup.value.blng_longitude,

    };

    this.crdsrv.create(cstmrData, rte).subscribe((res) => {
      if (res['status'] == 200) {
        this.snackBar.open("Sucessfully Updated", '', {
          duration: 3000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
        this.getcustomer();
        this.opensideBar('addFormPanel', null);
      }
    }, (error) => {
      console.log(error);
    });
  }

  onCellClick(event) {
    console.log(event);
    if (event.cellElement.innerText == 'Edit') {
      // this.editentry(event.data);
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
      this.deleteCstmr = false;
      this.opensideBar('addFormPanel', event.data);
      this.getStates();
      this.getDistricts();
      this.getMandals(data);
      this.getvillages(data1);

    } else if (event.cellElement.innerText == 'Delete') {
      this.deleteCstmr = true;
      this.opensideBar('addFormPanel', event.data);
    }

  }
}


