import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { DsSidebarService } from '@glits/components/sidebar/sidebar.service';
import { DatePipe } from '@angular/common';
import { DeleteDialogComponent } from 'app/main/shared/components/delete-dialog/delete-dialog.component';
import {
  MatSnackBar, MatDialog, MatSnackBarVerticalPosition, MatSnackBarHorizontalPosition,

} from '@angular/material';
import { CrudService } from 'app/main/apps/crud.service';
import { Router } from '@angular/router';
import { TransfereService } from 'app/providers/transfer/transfer.service';
@Component({
  selector: 'app-ent-node-addition-form',
  templateUrl: './ent-node-addition-form.component.html',
  styleUrls: ['./ent-node-addition-form.component.scss']
})
export class EntNodeAdditionFormComponent implements OnInit {
  firstFormGroup: FormGroup;
  gndrLst: any;
  frm_type: any;
  showStepr = false;
  updateData: any;
  deleteCstmr: boolean;
  ste_lst: any;
  dstrt_lst: any;
  mndl_lst: any;
  vlge_lst: any;
  columnDefs = [];
  districtId: any;
  spnrCtrl = false;
  getHeaderDtls = function () { return { "title": 'Create Enterprise Customer Node', "icon": "people_outline" } }
  blng_frqncy_lst: any;
  mndal_lst: any;
  mandalId: any;
  vilge_lst: any;
  permissions;
  cafnum = 1234567;
  packages: any;
  cstmrtyp: any;
  srvpcs: any;
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  isChecked: any;
  parentCustDtls: any;
  usrdtls: any;
  instl_dstrt_lst: any;
  blng_dstrt_lst: any;
  instl_mndl_lst: any;
  blng_mndl_lst: any;
  instl_vlge_lst: any;
  blng_vlge_lst: any;
  distrct_id: any;
  rtedis: any;
  rtemndl: any;
  rtevlg: any;
  siusr: boolean = false;
  constructor(private _formBuilder: FormBuilder, public transferService: TransfereService, private crdsrv: CrudService, private datePipe: DatePipe, private router: Router, private snackBar: MatSnackBar, public dialog: MatDialog, ) {
    this.permissions = { "slct_in": 1, "insrt_in": 0, "updt_in": 1, "dlte_in": 1, "exprt_in": 1 };
  }

  opensideBar(val1, val2) { }
  ngOnInit() {
    this.usrdtls = JSON.parse(localStorage.getItem('usrDtls'));
    if(this.usrdtls.user_id==101004190){
      this.siusr = true
    }
    this.parentCustDtls = this.transferService.getData()
    console.log(this.parentCustDtls)
    let emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
    let phoneNumber = /^(\+\d{1,3}[- ]?)?\d{10}$/;
    this.firstFormGroup = this._formBuilder.group({
      // hdOrgName: ['', Validators.required],
      hdOrgName: [{ value: this.parentCustDtls.frst_nm, disabled: true }, Validators.required],
      orgName: ['', Validators.required],
      custmrTyp: ['', Validators.required],
      cntprsnName: ['', Validators],
      cntprsndis: ['', Validators.required],
      pan_card_no: ['', Validators],
      email: ['', [Validators.pattern(emailPattern)]],
      cntct_prsn_mble_nu: ['', [Validators.required, Validators.pattern(phoneNumber)]],
      pymtres: ['', Validators.required],
      instl_house_flat_no: ['', Validators.required],
      instl_buildingname: ['', Validators],
      instl_streetname: ['', Validators.required],
      instl_Area_Localityname: ['', Validators.required],
      instl_pincode: ['', Validators.required],
      instl_state: ['', Validators.required],
      instl_district: ['', Validators.required],
      instl_mandal: ['', Validators.required],
      // Package: ['', Validators.required],
      instl_city_villagename: ['', Validators.required],
      instl_latitude: ['', Validators],
      instl_longitude: ['', Validators],
      // contactpersonname: ['', Validators.required],
      // cntct_prsn_mobileNumber: ['', Validators.required],
      // cntct_prsn_email: ['', Validators],
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
    })
    const prfleRte = `user/gender`;
    this.crdsrv.get(prfleRte).subscribe((res) => {
      this.gndrLst = res['data'];
      // console.log(this.gndrLst);
    }, (error) => {
      console.log(error);
    });
    this.firstFormGroup.controls['instl_state'].valueChanges.subscribe(value => {
      console.log(value)
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
    this.getStates();
    // this.getBillingFrequency();
    // this.getpackages()
    //  this.getcstmrtyp()
  }
  getStates() {
    console.log("On State Called")
    const rte = `admin/states`;
    this.crdsrv.get(rte).subscribe((res) => {
      if (res['data'].length > 0) {
        this.ste_lst = res['data'];
     

      }
    })
  }

  getDistricts(ste_id, add_typ) {
    
    console.log(this.usrdtls.user_id)
    if(this.usrdtls.user_id==101004190){
      console.log(this.usrdtls.user_id +"if")
      this.rtedis = `admin/states/${ste_id}/districts`;
    }
    else{
      console.log(this.usrdtls.user_id +"else")
      this.rtedis =`caf/agntdstrcts`
    }
    
    // const rte = `admin/states/${ste_id}/districts`;
    this.crdsrv.get(this.rtedis).subscribe((res) => {
      console.log(res['data'])
      if (add_typ == 1) {
        this.instl_dstrt_lst = res['data'];
      } else if (add_typ == 2) {
        this.blng_dstrt_lst = res['data'];
       }
    });
  }
 

  getMandals(dst_id, add_typ) {
    console.log(this.usrdtls.user_id)
    if(this.usrdtls.user_id==101004190){
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
        
      } else if (add_typ == 2) {
        this.blng_mndl_lst = res['data'];
       
      }

    });
  }
  getVillages(mndl_id, add_typ) {
    if(this.usrdtls.user_id==101004190){
      console.log(this.usrdtls.user_id +"if")
      this.rtevlg = `user/getvlgs/${mndl_id}/${this.distrct_id}`;
    }
    else{
      console.log(this.usrdtls.user_id +"else")
      this.rtevlg =`user/getvlgs/${mndl_id}/${this.distrct_id}`
    }
    // const rte = `caf/agntvlgs/${mndl_id}/${this.distrct_id}`;
    // const rte = `user/getvlgs/${mndl_id}/${this.firstFormGroup.value.instl_district}`;
    // const rte = `admin/mandals/${mndl_id}/villages`;
    this.crdsrv.get(this.rtevlg).subscribe((res) => {
      if (add_typ == 1) {
        this.instl_vlge_lst = res['data'];
        console.log(this.instl_vlge_lst)
        
      } else if (add_typ == 2) {
        this.blng_vlge_lst = res['data'];
        
      }
    });

  }

  checkValue(event: any) {
    console.log(this.firstFormGroup.value);
    // console.log(event);
    if (event == 'true') {
      console.log(event);
      this.mndal_lst = this.mndl_lst;
      this.vilge_lst = this.vlge_lst;
      let data = this.firstFormGroup.value;
      // this.firstFormGroup.get('contactpersonname').setValue(data.firstName);
      // this.firstFormGroup.get('cntct_prsn_mobileNumber').setValue(data.cntct_prsn_mble_nu);
      // this.firstFormGroup.get('cntct_prsn_email').setValue(data.email);
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
      // this.firstFormGroup.get('blng_longitude').setValue(data.instl_longitude);
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
  newentry() {
    // let data = this.firstFormGroup.value;
   
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
        mbl_nu: this.firstFormGroup.value.cntct_prsn_mble_nu,
       
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
      console.log(data)
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
    
      data['prnt_cstmr_id'] = this.parentCustDtls.cstmr_id;
    
    data["org_typ"] =  this.parentCustDtls.entrpe_type_id;
    data["billrunday"] = null
    data["billfreqlov"] = null
    data["activationdate"] = null
    data["dateofinc"] = null
    data["status"] = 1;
    data["enty_sts_id"] = 1;
    data["agnt_id"] = this.usrdtls.usr_ctgry_ky
    data["lmo_agnt_cd"] = this.usrdtls.lmo_cd
    data["mso_agnt_cd"] = this.usrdtls.mso_cd
    data["gender"] = 0
    data["caf_type_id"] = 2
    const rte = "caf/addnode";
    this.crdsrv.create(data, rte).subscribe((res) => {
      console.log(res);
      if (res['status'] == 200) {
        this.snackBar.open("Sucessfully Added", '', {
          duration: 2000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
        // this.router.navigate(['admin/caf/customers'])
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
