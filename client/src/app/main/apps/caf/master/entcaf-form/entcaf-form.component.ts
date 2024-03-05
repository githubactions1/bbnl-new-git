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
import { TransfereService } from 'app/providers/transfer/transfer.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-entcaf-form',
  templateUrl: './entcaf-form.component.html',
  styleUrls: ['./entcaf-form.component.scss']
})
export class EntcafFormComponent implements OnInit {
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
  confirmDialogRef: MatDialogRef<DeleteDialogComponent>;
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  getHeaderDtls = function () { return { "title": 'Add New Enterpriese Customer', "icon": "people_outline" } }
  blng_frqncy_lst: any;
  mndal_lst: any;
  mandalId: any;
  vilge_lst: any;
  permissions;
  cafnum = 1234567;
  packages: any;
  cstmrtyp: any;
  srvpcs: any;
  org: any;
  suborg: any;
  cafDtls: any;
  instl_dstrt_lst: any;
  blng_dstrt_lst: any;
  instl_mndl_lst: any;
  blng_mndl_lst: any;
  instl_vlge_lst: any;
  blng_vlge_lst: any;

  isChecked:any;
  usrdtls: any;
  distrct_id: any;
  siusr: boolean = false
  rtedis: any;
  rtemndl: any;
  rtevlg: any;
  constructor(private _fuseSidebarService: DsSidebarService, private _formBuilder: FormBuilder, private crdsrv: CrudService,
    private datePipe: DatePipe, private snackBar: MatSnackBar, public dialog: MatDialog, public TransfereService: TransfereService,
     private router: Router) {

    this.permissions = { "slct_in": 1, "insrt_in": 0, "updt_in": 1, "dlte_in": 1, "exprt_in": 1 };
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
      this.firstFormGroup.get('frqncy_id').setValue(cstmrUpdtData.blng_frqny_id);
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
      this.firstFormGroup.get('frqncy_id').setValue('');
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
      this.firstFormGroup.reset();
    }
  }


  ngOnInit() {
    // console.log(this.org)
    this.usrdtls = JSON.parse(localStorage.getItem('usrDtls'));
    this.cafDtls = this.TransfereService.getData()
    console.log(this.TransfereService.getData())
    if(this.usrdtls.user_id==101004190 || this.usrdtls.user_id==101076366){
      this.siusr = true
    }
    let emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
    let phoneNumber = /^(\+\d{1,3}[- ]?)?\d{10}$/;
    const namePattern = /^[a-zA-Z \s]+$/;

    this.firstFormGroup = this._formBuilder.group({
      sub_org_typ: ['', Validators.required],
      org_typ: ['', Validators.required],
      orgName: ['', [Validators.required, Validators.pattern(namePattern)]],
      cntprsnName: ['', [Validators, Validators.pattern(namePattern)]],
      cntprsndis: ['', Validators.required],
      date: ['', Validators],
      father_husbandname: ['', Validators],
      
      pan_card_no: ['', Validators],
      email: ['', [Validators.pattern(emailPattern)]],
      cntct_prsn_mobileNumber: ['', [Validators.required, Validators.pattern(phoneNumber)]],
      frqncy_id: ['', Validators.required],
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
      blng_house_flat_no: ['', Validators.required],
      blng_buildingname: ['', Validators],
      blng_streetname: ['', Validators.required],
      blng_Area_Localityname: ['', Validators.required],
      blng_pincode: ['', Validators.required],
      blng_state: ['', Validators.required],
      blng_district: ['', Validators.required],
      blng_mandal: ['', Validators.required],
      blng_city_villagename: ['', Validators.required],
      blng_fax_no: ['', Validators],
      instl_fax_no: ['', Validators],
      instl_chk_ind: ['', Validators],

    });
    if (this.cafDtls) {
      // this.firstFormGroup.get('sub_org_typ').setValue(this.cafDtls.cstmr_fst_nm);
      this.firstFormGroup.get('org_typ').setValue(this.cafDtls.entrpe_type_id);
      this.firstFormGroup.get('orgName').setValue(this.cafDtls.frst_nm);
      this.firstFormGroup.get('cntprsnName').setValue(this.cafDtls.cntct_nm);
      this.firstFormGroup.get('cntprsndis').setValue(this.cafDtls.cstmr_dtf_brth);
      this.firstFormGroup.get('gender').setValue(this.cafDtls.cstmr_fthr_hsbd_nm);
      this.firstFormGroup.get('dateofbirth').setValue(this.cafDtls.adhr_nu);
      this.firstFormGroup.get('father_husbandname').setValue(this.cafDtls.pan_nu);
      this.firstFormGroup.get('adharno').setValue(this.cafDtls.adhr_nu);
      this.firstFormGroup.get('pan_card_no').setValue(this.cafDtls.pan_nu);
      this.firstFormGroup.get('email').setValue(this.cafDtls.loc_eml1_tx);
      this.firstFormGroup.get('cntct_prsn_mble_nu').setValue(this.cafDtls.cntct_mble1_nu);
      this.firstFormGroup.get('frqncy_id').setValue(this.cafDtls.instl_hse_nu);
      this.firstFormGroup.get('activationdate').setValue(this.cafDtls.instl_bldng_tx);
      this.firstFormGroup.get('instl_house_flat_no').setValue(this.cafDtls.instl_lat);
      this.firstFormGroup.get('instl_buildingname').setValue(this.cafDtls.instl_lng);
      this.firstFormGroup.get('instl_streetname').setValue(this.cafDtls.instl_strte_tx);
      this.firstFormGroup.get('instl_Area_Localityname').setValue(this.cafDtls.instl_lclty_tx);
      this.firstFormGroup.get('instl_pincode').setValue(this.cafDtls.instl_pn_cd);
      this.firstFormGroup.get('blng_house_flat_no').setValue(this.cafDtls.blng_addr2_tx);
      this.firstFormGroup.get('blng_streetname').setValue(this.cafDtls.blng_strte_tx);
      this.firstFormGroup.get('blng_Area_Localityname').setValue(this.cafDtls.blng_lcly_tx);
      this.firstFormGroup.get('blng_pincode').setValue(this.cafDtls.blng_pn_cd);
      this.getsuborg()
    }
    this.getGender();
    this.getStates();
    this.getBillingFrequency();
    // this.getpackages()
    this.getorg()
    //  this.getcstmrtyp()
    this.firstFormGroup.controls['instl_state'].valueChanges.subscribe(value => {
      this.getDistricts(1, 1)
    });
    this.firstFormGroup.controls['instl_district'].valueChanges.subscribe(value => {
      this.getMandals(value, 1)
    });
    this.firstFormGroup.controls['instl_mandal'].valueChanges.subscribe(value => {
      this.getVillages(value, 1)
    });
    this.firstFormGroup.controls['blng_state'].valueChanges.subscribe(value => {
      this.getDistricts(1, 2)
    });
    this.firstFormGroup.controls['blng_district'].valueChanges.subscribe(value => {
      this.getMandals(value, 2)
    });
    this.firstFormGroup.controls['blng_mandal'].valueChanges.subscribe(value => {
      this.getVillages(value, 2)
    });
  }

  getGender() {
    const prfleRte = `user/gender`;
    this.crdsrv.get(prfleRte).subscribe((res) => {
      this.gndrLst = res['data'];
    }, (error) => {
      console.log(error);
    });
  }
  getBillingFrequency() {
    const rte = `crm/billingFrequency`;
    this.crdsrv.get(rte).subscribe((res) => {
      this.blng_frqncy_lst = res['data'];
      console.log(this.blng_frqncy_lst)
    })
  }

  getStates() {
    console.log("On State Called")
    const rte = `admin/states`;
    this.crdsrv.get(rte).subscribe((res) => {
      if (res['data'].length > 0) {
        this.ste_lst = res['data'];
        if (this.cafDtls) {
          console.log("On State Set")
          this.firstFormGroup.get('instl_state').setValue(parseInt(this.cafDtls.blng_ste_id));
          this.firstFormGroup.get('blng_state').setValue(parseInt(this.cafDtls.blng_ste_id));
        }

      }
    })
  }

  getDistricts(ste_id, add_typ) {
    console.log(this.usrdtls.user_id)
    if(this.usrdtls.user_id==101004190 || this.usrdtls.user_id==101076366){
      console.log(this.usrdtls.user_id +"if")
      this.rtedis = `admin/states/${ste_id}/districts`;
    }
    else{
      console.log(this.usrdtls.user_id +"else")
      this.rtedis =`caf/agntdstrcts`
    }
    // const rte = `admin/states/${ste_id}/districts`;
    this.crdsrv.get(this.rtedis).subscribe((res) => {
      if (add_typ == 1) {
        this.instl_dstrt_lst = res['data'];
        if (this.cafDtls)
          this.firstFormGroup.get('instl_district').setValue(this.cafDtls.loc_dstrct_id);
      } else if (add_typ == 2) {
        this.blng_dstrt_lst = res['data'];
        if (this.cafDtls)
          this.firstFormGroup.get('blng_district').setValue(parseInt(this.cafDtls.blng_dstrct_id));
      }
    });
  }
  getorg() {
    const rte = `caf/EntrpeCstmrTyp`;
    this.crdsrv.get(rte).subscribe((res) => {
      this.org = res['data'];
      console.log(this.org)
    });
  }
  getsuborg() {
    const rte = `caf/EntCstmrSubTyp/` + this.firstFormGroup.value.org_typ;
    this.crdsrv.get(rte).subscribe((res) => {
      this.suborg = res['data'];
    });

  }

  getMandals(dst_id, add_typ) {
    this.distrct_id=dst_id
    console.log(this.usrdtls.user_id)
    if(this.usrdtls.user_id==101004190 || this.usrdtls.user_id==101076366){
      console.log(this.usrdtls.user_id +"if")
      this.rtemndl = `admin/districts/${dst_id}/mandals`;
    }
    else{
      console.log(this.usrdtls.user_id +"else")
      this.rtemndl =`caf/agntmndls/${dst_id}`
    }
    this.distrct_id=dst_id
    // const rte = `admin/districts/${dst_id}/mandals`;
    this.crdsrv.get(this.rtemndl).subscribe((res) => {
      if (add_typ == 1) {
        this.instl_mndl_lst = res['data'];
        if (this.cafDtls)
          this.firstFormGroup.get('instl_mandal').setValue(this.cafDtls.loc_mndl_id);
      } else if (add_typ == 2) {
        this.blng_mndl_lst = res['data'];
        if (this.cafDtls)
          this.firstFormGroup.get('blng_mandal').setValue(parseInt(this.cafDtls.blng_mndl_id));
      }




    });
  }



  getVillages(mndl_id, add_typ) {
    if(this.usrdtls.user_id==101004190 || this.usrdtls.user_id==101076366){
      console.log(this.usrdtls.user_id +"if")
      this.rtevlg = `user/getvlgs/${mndl_id}/${this.distrct_id}`;
    }
    else{
      console.log(this.usrdtls.user_id +"else")
      this.rtevlg =`caf/agntvlgs/${mndl_id}/${this.distrct_id}`
    }
    // const rte = `user/getvlgs/${mndl_id}/${this.firstFormGroup.value.instl_district}`;
    // const rte = `admin/mandals/${mndl_id}/villages`;
    this.crdsrv.get(this.rtevlg).subscribe((res) => {
      console.log(res['data'])
      if (add_typ == 1) {
        this.instl_vlge_lst = res['data'];
        if (this.cafDtls)
          this.firstFormGroup.get('instl_city_villagename').setValue(this.cafDtls.loc_vlge_id);
      } else if (add_typ == 2) {
        console.log(res['data'])
        this.blng_vlge_lst = res['data'];
        if (this.cafDtls)
          this.firstFormGroup.get('blng_city_villagename').setValue(parseInt(this.cafDtls.blng_vlge_id));
      }
    });

  }
  save() {
    console.log(this.firstFormGroup.value)
    console.log(this.firstFormGroup.invalid)
    if (this.firstFormGroup.invalid) {
      this.snackBar.open("Please Enter Valid Data", '', {
        duration: 2000,
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      });
    }
    else {
      let data = {
        agnt_id: '',
        cntprsnName: this.firstFormGroup.value.cntprsnName,
        org_typ:this.firstFormGroup.value.org_typ,
        // gndr_id: this.firstFormGroup.value.gender,
        cstmr_dtf_brth: this.firstFormGroup.value.dateofbirth,
        cstmr_fthr_hsbd_nm: this.firstFormGroup.value.father_husbandname,
        adhr_nu: this.firstFormGroup.value.adharno,
        pan_nu: this.firstFormGroup.value.pan_card_no,
        cstmr_emle_tx: this.firstFormGroup.value.email,
        orgName: this.firstFormGroup.value.orgName,
        blng_frqny_id: this.firstFormGroup.value.frqncy_id,
        actvtn_dt: this.firstFormGroup.value.activationdate,
        instl_house_flat_no: this.firstFormGroup.value.instl_house_flat_no,
        instl_buildingname: this.firstFormGroup.value.instl_buildingname,
        instl_streetname: this.firstFormGroup.value.instl_streetname,
        loc_lcly_tx: this.firstFormGroup.value.instl_Area_Localityname,
        instl_pn_cd: this.firstFormGroup.value.instl_pincode,
        instl_ste_id: this.firstFormGroup.value.instl_state,
        instl_dstrt_id: this.firstFormGroup.value.instl_district,
        instl_mndle_id: this.firstFormGroup.value.instl_mandal,
        instl_cty_id: this.firstFormGroup.value.instl_city_villagename,
        instl_lat: this.firstFormGroup.value.instl_latitude,
        instl_lng: this.firstFormGroup.value.instl_longitude,
        cntct_prsn_nm: this.firstFormGroup.value.contactpersonname,
        mbl_nu: this.firstFormGroup.value.cntct_prsn_mobileNumber,
       
        blng_house_flat_no: this.firstFormGroup.value.blng_house_flat_no,
        blng_buildingname: this.firstFormGroup.value.blng_buildingname,
        blng_streetname: this.firstFormGroup.value.blng_streetname,
        blng_lclty_tx: this.firstFormGroup.value.blng_Area_Localityname,
        blng_pn_cd: this.firstFormGroup.value.blng_pincode,
        blng_ste_id: this.firstFormGroup.value.blng_state,
        blng_dstrt_id: this.firstFormGroup.value.blng_district,
        blng_mndle_id: this.firstFormGroup.value.blng_mandal,
        blng_cty_id: this.firstFormGroup.value.blng_city_villagename,
        blng_lat: this.firstFormGroup.value.blng_latitude,
        blng_lng: this.firstFormGroup.value.blng_longitude,
      };
      // let data = this.firstFormGroup.value;
      switch (this.firstFormGroup.value.frqncy_id) {
        case 1:
          data["billfreqlov"] = "MONTHLY"
          data["billrunday"] = "MONTHLY"
          break;
        case 2:
          data["billfreqlov"] = "QUATERLY"
          data["billrunday"] = "QUATERLY"
          break;
        case 3:
          data["billfreqlov"] = "HALFYEARLY"
          data["billrunday"] = "HALFYEARLY"
          break;
        case 4:
          data["billfreqlov"] = "YEARLY"
          data["billrunday"] = "YEARLY"
          break;
  
      }
      data["status"] = 1;
      data["enty_sts_id"] = 1;
      data["agnt_id"] = this.usrdtls.usr_ctgry_ky
      data["gender"] = 0
      data["caf_type_id"] = 2
      const rte = "caf/entcustomer";
      console.log(data)
      this.crdsrv.create(data, rte).subscribe((res) => {
        console.log(res);
        if (res['status'] == 200) {
          this.snackBar.open("Sucessfully Added", '', {
            duration: 2000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
          });
          //  this.getcustomer();
          //   this.opensideBar('addFormPanel', null);
          if(this.siusr){
            this.router.navigate(['admin/caf/enterprice/organization'])
          }else{
            this.router.navigate(['admin/caf/entcustomers'])
          }
          
        }


      });
    }
  }


  checkValue(event: any) {
    console.log(this.firstFormGroup.value);
    // console.log(event);
    if (event == 'true') {
      console.log(event);
      this.mndal_lst = this.mndl_lst;
      this.vilge_lst = this.vlge_lst;
      let data = this.firstFormGroup.value;
      this.firstFormGroup.get('blng_house_flat_no').setValue(data.instl_house_flat_no);
      this.firstFormGroup.get('blng_buildingname').setValue(data.instl_buildingname);
      this.firstFormGroup.get('blng_streetname').setValue(data.instl_streetname);
      this.firstFormGroup.get('blng_Area_Localityname').setValue(data.instl_Area_Localityname);
      this.firstFormGroup.get('blng_pincode').setValue(data.instl_pincode);
      this.firstFormGroup.get('blng_state').setValue(data.instl_state);
      this.firstFormGroup.get('blng_district').setValue(data.instl_district);
      this.firstFormGroup.get('blng_mandal').setValue(data.instl_mandal);
      this.firstFormGroup.get('blng_city_villagename').setValue(data.instl_city_villagename);
      this.firstFormGroup.get('blng_fax_no').setValue(data.instl_fax_no);
      this.firstFormGroup.get('blng_latitude').setValue(data.instl_latitude);
      this.firstFormGroup.get('blng_longitude').setValue(data.instl_longitude);
    } else {
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
        }
      });
    });


  }



  saveCustomer() {
    if (this.editClicked == false) {
    } else if (this.deleteCstmr == true) {
      this.delete(this.updateData);
    } else {
      this.update(this.updateData);
    }
  }

 


  update(data) {
    const rte = `crm/customer/customer/${data.cstmr_id}`;
    this.firstFormGroup.value['dateofbirth'] = this.datePipe.transform(this.firstFormGroup.value.dateofbirth, 'yyyy-MM-dd');
    this.firstFormGroup.value['activationdate'] = this.datePipe.transform(this.firstFormGroup.value.activationdate, 'yyyy-MM-dd');


    let cstmrData = {
      agnt_id: '',
      cntprsnName: this.firstFormGroup.value.cntprsnName,
      cstmr_mdl_nm: this.firstFormGroup.value.middleName,
      cstmr_lst_nm: this.firstFormGroup.value.lastName,
      gndr_id: this.firstFormGroup.value.gender,
      cstmr_dtf_brth: this.firstFormGroup.value.dateofbirth,
      
      adhr_nu: this.firstFormGroup.value.adharno,
      pan_nu: this.firstFormGroup.value.pan_card_no,
      cstmr_emle_tx: this.firstFormGroup.value.email,
      cstmr_mble_nu: this.firstFormGroup.value.cntct_prsn_mobileNumber,
      blng_frqny_id: this.firstFormGroup.value.frqncy_id,
      actvtn_dt: this.firstFormGroup.value.activationdate,
      instl_hse_nu: this.firstFormGroup.value.instl_house_flat_no,
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
      }
    }, (error) => {
      console.log(error);
    });
  }

}
