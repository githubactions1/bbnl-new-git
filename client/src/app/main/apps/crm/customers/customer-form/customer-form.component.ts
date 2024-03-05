import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { DsSidebarService } from '@glits/components/sidebar/sidebar.service';
import { DatePipe } from '@angular/common';
import { DeleteDialogComponent } from 'app/main/shared/components/delete-dialog/delete-dialog.component';
import {
  MatTableDataSource, MatPaginator, MatSort, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition, MatDialogRef, MatSnackBar, MatDialog,
  MAT_DIALOG_DATA
} from '@angular/material';
import { CrudService } from 'app/main/apps/crud.service';
@Component({
  selector: 'app-customer-form',
  templateUrl: './customer-form.component.html',
  styleUrls: ['./customer-form.component.scss']
})
export class CustomerFormComponent implements OnInit {
  firstFormGroup: FormGroup;
  gndrLst: any;
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
  districtId: any;
  spnrCtrl = false;

  isChecked: any;


  // confirmDialogRef: MatDialogRef<DeleteDialogComponent>;
  // horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  // verticalPosition: MatSnackBarVerticalPosition = 'top';
  getHeaderDtls = function () { return { "title": 'Add New Customer', "icon": "people_outline" } }
  blng_frqncy_lst: any;
  mndal_lst: any;
  mandalId: any;
  vilge_lst: any;
  permissions;


  constructor(private _fuseSidebarService: DsSidebarService, private _formBuilder: FormBuilder, private crdsrv: CrudService, private datePipe: DatePipe, private snackBar: MatSnackBar, public dialog: MatDialog, ) {

  }

  checkValue(val) { }
  getvillages(val) { }
  opensideBar(val1, val2, val3) { }

  ngOnInit() {

    let emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
    let phoneNumber = /^(\+\d{1,3}[- ]?)?\d{10}$/;
    this.firstFormGroup = this._formBuilder.group({
      cafnu: [{ value: '123456', disabled: true }, Validators.required],
      custmrTyp: ['', Validators.required],
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
      Package: ['', Validators.required],
      instl_city_villagename: ['', Validators.required],
      // instl_latitude: ['', Validators],
      // instl_longitude: ['', Validators],
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

    //  this.getcstmrtyp()


  }
  addcstmr() {
    console.log(this.firstFormGroup.value)
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

}
