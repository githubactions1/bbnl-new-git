
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { DsSidebarService } from '@glits/components/sidebar/sidebar.service';
import { DatePipe } from '@angular/common';
import { DeleteDialogComponent } from 'app/main/shared/components/delete-dialog/delete-dialog.component';
import {
  MatTableDataSource, MatPaginator, MatSort, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition, MatDialogRef, MatSnackBar, MatDialog,
  MAT_DIALOG_DATA
} from '@angular/material';
import { CrudService } from 'app/main/apps/crud.service';
import { TransfereService } from 'app/providers/transfer/transfer.service';
import { filter } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-caf-form',
  templateUrl: './caf-form.component.html',
  styleUrls: ['./caf-form.component.scss']
})
export class CafFormComponent implements OnInit {
  pckgeProperties: any

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
  getHeaderDtls = function () { return { "title": 'Add New CAF', "icon": "people_outline" } }
  blng_frqncy_lst: any;
  mndal_lst: any;
  mandalId: any;
  vilge_lst: any;
  permissions;
	department_names:any;
  packages: any;
  cstmrtyp: any;
  srvpcs: any;
  frmData: any;
  EnblUpbtn: boolean = false;
  cafid: any;
  oltDtls: any;
  slotDtls: any;
  prtDtls: any;
  sltLvlOne: any[];
  sltLvlTwo: any[];
  sltLvlThree: any[];
  blng_vlge_lst: any[];
  instl_vlge_lst: any[];
  blng_mndl_lst: any[];
  instl_mndl_lst: any[];
  blng_dstrt_lst: any[];
  instl_dstrt_lst: any[];
  loader: boolean = false;
  isChecked: any;
  entcaf: boolean = false;
  newhsicaf: boolean = false;
  siusr: boolean = false;
  usrdtls: any;
  boxDetails: any;
  poplst: any;
  frm_actn: any;
  splits: any;
  radioSelected: any;
  radioSelected1: any;
  iptvDetails: any;
  lagDtls: any;
  caftyp_id = 0
  level1: any;
  level2: any;
  level3: any;
  onu_id: any;
  packgdta: any;
  tps: any;
  trnfpt = [];
  splt_id: any;
  aaa_mac_id: any;
  aaa_cd: any;
  onuchecked = false;
  iptvchecked = false;
  aadhaar: any;
  showCafSidebar: boolean = false;
  showSidebar: boolean = false;
  adr: any;
  entfrmData: any;
  nodes: any;
  distnm: any;
  mandalnm: any;
  vlgnm: any;
  eftdt: any;
  expdt: any;
  poploc: any;
  Date: any;
  ttlTelCnctns = 0;
  adharErrorMsg: any;
  nxt=true
  partnerCode: any;
  columnDefss: any;
  lmoLoader: boolean;
  distId: any;
  constructor(private _dsSidebarService: DsSidebarService, private http: HttpClient, private router: Router, private _formBuilder: FormBuilder, private crdsrv: CrudService, private datePipe: DatePipe, private snackBar: MatSnackBar, public dialog: MatDialog, public TransfereService: TransfereService) {

    const permTxt = 'Customer Creation';
    const prmeRte = `user/permissions/${permTxt}`;
    this.crdsrv.get(prmeRte).subscribe((res) => {
      this.showCafSidebar = false;
      this.showSidebar = true;
       console.log(res['data'][0]);
      this.permissions = res['data'][0];
    });

    this.permissions = { "slct_in": 1, "insrt_in": 0, "updt_in": 1, "dlte_in": 1, "exprt_in": 1 };
  }


  bckBtn() {

    this.showStepr = false;


  }
  openSideBar = function () {
    this._dsSidebarService.getSidebar('addFormPanel').toggleOpen();
  }
  closeSideBar = function () {
    this._dsSidebarService.getSidebar('addFormPanel').toggleOpen();
  }
  ngOnInit() {
  this.getDepartmentNmas()
      this.frm_actn = this.TransfereService.getData();
    console.log("frm_actn",this.frm_actn);
	
    this.frm_actn = this.TransfereService.getData()
    this.usrdtls = JSON.parse(localStorage.getItem('usrDtls'));
    this.frmData = this.TransfereService.getLoclData('cafData')
    this.entfrmData = this.TransfereService.getLoclData('entcafData')
    this.Date = new Date();
    console.log(this.frmData)
    if(this.usrdtls.prt_in==2 || this.usrdtls.prt_in==3 ){
      this.siusr = true
    }
    const emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
    const phoneNumber = /^(\+\d{1,3}[- ]?)?\d{10}$/;
    // var adharno = /^(\+\d{1,3}[- ]?)?\d{10}$/;
    // const adharnumber = /^\[0-9]d{12}$/;
    const adharnumber = /^(\+\d{1,3}[- ]?)?\d{12}$/;
    const namePattern = /^[a-zA-Z \s]+$/;
    // const addrssPattern = /^[a-zA-Z ( )\\- 0-9 \s]+$/;
    this.firstFormGroup = this._formBuilder.group({
      custInfo: this._formBuilder.group({

        // caf_id: [{ value: '', disabled: true }, Validators.required],
        custmrTyp: [''],
		OrgnCde: ['', Validators.required],
        department_id: ['', Validators.required],
        tle_nm: [''],
        frst_nm: ['', [Validators.required, Validators.pattern(namePattern)]],
        mdlr_nm: ['', [Validators, Validators.pattern(namePattern)]],
        lst_nm: ['', [Validators.required, Validators.pattern(namePattern)]],
        gndr_id: ['', Validators],
        dob_dt: ['', Validators.required],
        rltve_nm: ['', [Validators, Validators.pattern(namePattern)]],
        adhr_nu:   ['',[Validators.pattern(adharnumber),  Validators.required]],
        pan_nu: [''],
        loc_eml1_tx: [''],
        loc_lmdle1_nu: ['', [Validators.required, Validators.pattern(phoneNumber)]],
        frqncy_id: ['', Validators.required],
        actvn_dt: ['', Validators.required],
        instl_house_flat_no: ['', Validators.required],
        instl_buildingname: ['', Validators],
        instl_streetname: ['', [Validators.required]],
        loc_lcly_tx: ['', [Validators.required]],
        instl_pincode: ['', Validators.required],
        instl_state: ['', Validators.required],
        loc_dstrct_id: ['', Validators.required],
        loc_mndl_id: ['', Validators.required],
        loc_vlge_id: ['', Validators.required],
        loc_lnd_nu: ['', Validators],
        loc_std_cd: ['', Validators],
        // instl_latitude: ['', Validators],
        // instl_longitude: ['', Validators],
        blng_cntct_nm: ['', Validators.required],
        mbl_nu: ['', [Validators.required, Validators.pattern(phoneNumber)]],
        blng_eml1_tx: ['', Validators],
        blng_house_flat_no: ['', Validators.required],
        blng_buildingname: ['', Validators],
        blng_streetname: ['', Validators.required],
        blng_lcly_tx: ['', Validators.required],
        blng_pn_cd: ['', Validators.required],
        blng_ste_id: ['', Validators.required],
        blng_dstrct_id: ['', Validators.required],
        blng_mndl_id: ['', Validators.required],
        instl_chk_ind: ['', Validators],
        blng_vlge_id: ['', Validators.required],
        blng_lnd_nu: ['',Validators],
        blng_std_cd: ['',Validators],
        pop_id: ['', Validators.required],
        pop_nm:['',Validators]
      }),
      crnt_pckge_id: ['', Validators.required],
      olt_id: ['', Validators],
      olt_prt_id: ['', Validators],
      lvl1_slt: ['', Validators],
      lvl2_slt: ['', Validators],
      lvl3_slt: ['', Validators],
      onu_mdl: [{ value: '', disabled: true }, Validators],
      onu_srl_nu: ['', Validators],
      onu_mac_addr_tx: [{ value: '', disabled: true }, Validators],
      onu_emi: [{ value: '', disabled: true }, Validators],

      onu_own: ['', Validators],
      onu_amt: [{ value: '', disabled: true }, Validators],
      onu_up_frmt_amt: [{ value: '', disabled: true }, Validators],
      inst_amt: ['', Validators],
      tel_cns: [0, Validators],
      iptv_mdl: [{ value: '', disabled: true }, Validators.required],
      iptv_bx_srl_num: ['', Validators.required],
      iptv_mac_addr_tx: [{ value: '', disabled: true }, Validators.required],
      iptv_bx_own: ['', Validators],
      iptv_bx_emi: [{ value: '', disabled: true }, Validators.required],
      iptv_bx_amt: [{ value: '', disabled: true }, Validators.required],
      iptv_bx_up_amt: [{ value: '', disabled: true }, Validators.required],
      iptv_stpbx_id: [{ value: '', disabled: true }, Validators.required],
      cpe_pop_id: [{ value: '', disabled: true }, Validators],
      onu_stpbx_id: [{ value: '', disabled: true }, Validators],
    });


const cstmrgroup = this.firstFormGroup.get('custInfo');
if(cstmrgroup.invalid){
  console.log("error")
}else{
  console.log("next")
}

console.log(this.firstFormGroup.get('custInfo').get('adhr_nu'))
    this.getGender();
  //  this.getStgetpackagesates();
    this.getBillingFrequency();
    this.getpackages()
    this.getpopLst()
    this.oniptvsrlnu()
    // this.getOltInfo(100005143);
    //  this.getcstmrtyp()
 



    console.log(this.frmData)
    if (this.frmData == undefined) {
      console.log("this.newhsicaf 2",this.newhsicaf);
		if( this.newhsicaf == true ) {
			this.EnblUpbtn = true;
		  this.firstFormGroup.get('iptv_mdl').setValidators(null)
		  this.firstFormGroup.get('iptv_bx_srl_num').setValidators(null)
		  this.firstFormGroup.get('iptv_mac_addr_tx').setValidators(null)
		  this.firstFormGroup.get('iptv_bx_own').setValidators(null)
		  this.firstFormGroup.get('iptv_bx_emi').setValidators(null)
		  this.firstFormGroup.get('iptv_bx_amt').setValidators(null)
		  this.firstFormGroup.get('iptv_bx_up_amt').setValidators(null)
		  this.firstFormGroup.get('iptv_stpbx_id').setValidators(null)
		  this.getHeaderDtls = function () { return { "title": 'Add New Hsi CAF', "icon": "people_outline" } }
		} else {
			this.EnblUpbtn = false
		}
	  
	  //this.EnblUpbtn = false
      // this.getcafid()

    }
    else if (this.entfrmData && this.frm_actn == "entnew") {
      const prfleRte = `caf/nodes/` + this.entfrmData.cstmr_id;
      this.crdsrv.get(prfleRte).subscribe((res) => {
        this.nodes = res['data'];
        console.log(this.nodes);
      }, (error) => {
        console.log(error);
      });
      console.log("hai")
      const group = this.firstFormGroup.get('custInfo') as FormGroup;
      group.addControl('hdOrgName', this._formBuilder.control({ value: this.entfrmData.cstmr_nm, disabled: true }, Validators.required));
      group.addControl('node', this._formBuilder.control('', Validators.required));
      //this.firstFormGroup['custInfo'].addControl('hdOrgName', new FormControl('', Validators.required));
      //this.getcafid()
      console.log(this.entfrmData)
      this.entcaf = true;
      this.firstFormGroup.get('iptv_mdl').setValidators(null)
      this.firstFormGroup.get('iptv_bx_srl_num').setValidators(null)
      this.firstFormGroup.get('iptv_mac_addr_tx').setValidators(null)
      this.firstFormGroup.get('iptv_bx_own').setValidators(null)
      this.firstFormGroup.get('iptv_bx_emi').setValidators(null)
      this.firstFormGroup.get('iptv_bx_amt').setValidators(null)
      this.firstFormGroup.get('iptv_bx_up_amt').setValidators(null)
      this.firstFormGroup.get('iptv_stpbx_id').setValidators(null)
      this.firstFormGroup.get('tel_cns').setValidators([Validators.required])
      this.firstFormGroup.get('custInfo').get('adhr_nu').setValidators([Validators.pattern(adharnumber)])
      this.firstFormGroup.get('custInfo').get('tle_nm').setValidators(null)
      this.firstFormGroup.get('custInfo').get('frst_nm').setValidators(null)
      this.firstFormGroup.get('custInfo').get('lst_nm').setValidators(null)
      this.firstFormGroup.get('custInfo').get('gndr_id').setValidators(null)
      this.getHeaderDtls = function () { return { "title": 'Add New CAF', "icon": "people_outline" } }
    }
    else if (this.frm_actn == "update") {
      console.log("hai")
      this.EnblUpbtn = true;
      console.log(this.frmData.olt_prt_splt_tx)
      this.splits = this.frmData.olt_prt_splt_tx.split('-')
      console.log(this.splits[0])
      // this.firstFormGroup.get('custInfo').get('caf_id').setValue(this.frmData.caf_nu)
      this.firstFormGroup.get('custInfo').get('adhr_nu').setValue(this.frmData.adhr_nu)
      // this.firstFormGroup.get('custInfo').get('caf_id').setValue(this.frmData.caf_nu)
      // this.firstFormGroup.get('custInfo').get('custmrTyp').setValue(this.frmData.adhr_nu)
      this.firstFormGroup.get('custInfo').get('tle_nm').setValue(this.frmData.tle_nm)
      this.firstFormGroup.get('custInfo').get('frst_nm').setValue(this.frmData.frst_nm)
      this.firstFormGroup.get('custInfo').get('mdlr_nm').setValue(this.frmData.mdlr_nm)
      this.firstFormGroup.get('custInfo').get('lst_nm').setValue(this.frmData.lst_nm)
      this.firstFormGroup.get('custInfo').get('gndr_id').setValue(this.frmData.gndr_id)
      this.firstFormGroup.get('custInfo').get('dob_dt').setValue(this.frmData.dob_dt)
      this.firstFormGroup.get('custInfo').get('rltve_nm').setValue(this.frmData.rltve_nm)

      this.firstFormGroup.get('custInfo').get('pan_nu').setValue(this.frmData.pan_nu)
      this.firstFormGroup.get('custInfo').get('loc_eml1_tx').setValue(this.frmData.loc_eml1_tx)
      this.firstFormGroup.get('custInfo').get('loc_lmdle1_nu').setValue(this.frmData.mbl_nu)

      this.firstFormGroup.get('custInfo').get('frqncy_id').setValue(this.frmData.frqncy_id)
      this.firstFormGroup.get('custInfo').get('actvn_dt').setValue(this.frmData.actvn_dt)
      this.firstFormGroup.get('custInfo').get('instl_house_flat_no').setValue(this.frmData.instl_addr1_tx)
      this.firstFormGroup.get('custInfo').get('instl_buildingname').setValue(this.frmData.instl_addr2_tx)
      this.firstFormGroup.get('custInfo').get('instl_streetname').setValue(this.frmData.instl_lcly_tx)
      this.firstFormGroup.get('custInfo').get('loc_lcly_tx').setValue(this.frmData.instl_ara_tx)
      this.firstFormGroup.get('custInfo').get('instl_pincode').setValue(this.frmData.blng_pn_cd)

      this.firstFormGroup.get('crnt_pckge_id').setValue(this.frmData.crnt_pckge_id)
      this.firstFormGroup.get('custInfo').get('loc_vlge_id').setValue(this.frmData.instl_vlge_id)
      this.firstFormGroup.get('custInfo').get('blng_cntct_nm').setValue(this.frmData.blng_cntct_nm)
      this.firstFormGroup.get('custInfo').get('mbl_nu').setValue(this.frmData.cntct_mble1_nu)
      this.firstFormGroup.get('custInfo').get('blng_eml1_tx').setValue(this.frmData.loc_eml1_tx)
      this.firstFormGroup.get('custInfo').get('blng_house_flat_no').setValue(this.frmData.blng_addr1_tx)
      this.firstFormGroup.get('custInfo').get('blng_buildingname').setValue(this.frmData.blng_addr2_tx)
      this.firstFormGroup.get('custInfo').get('blng_streetname').setValue(this.frmData.blng_lcly_tx)
      this.firstFormGroup.get('custInfo').get('blng_lcly_tx').setValue(this.frmData.blng_ara_tx)
      this.firstFormGroup.get('custInfo').get('blng_pn_cd').setValue(this.frmData.blng_pn_cd)
      this.firstFormGroup.get('custInfo').get('blng_vlge_id').setValue(this.frmData.blng_ste_id)
      this.firstFormGroup.get('custInfo').get('blng_std_cd').setValue(this.frmData.blng_std_cd)
      this.firstFormGroup.get('custInfo').get('blng_lnd_nu').setValue(this.frmData.blng_lmdle1_nu)
      this.firstFormGroup.get('custInfo').get('loc_std_cd').setValue(this.frmData.blng_std_cd)
      this.firstFormGroup.get('custInfo').get('loc_lnd_nu').setValue(this.frmData.blng_lmdle1_nu)
      this.firstFormGroup.get('custInfo').get('pop_id').setValue(this.frmData.pop_id)

      this.firstFormGroup.get('olt_id').setValue(this.frmData.olt_id)
      this.firstFormGroup.get('olt_prt_id').setValue(this.frmData.olt_prt_id)
      this.firstFormGroup.get('lvl1_slt').setValue(this.frmData.caf_nu)
      // this.firstFormGroup.get('lvl2_slt').setValue(this.frmData.caf_nu)
      // this.firstFormGroup.get('lvl3_slt').setValue(this.frmData.caf_nu)
      // this.firstFormGroup.get('onu_mdl').setValue(this.frmData.caf_nu)
      this.firstFormGroup.get('onu_srl_nu').setValue(this.frmData.onu_srl_nu)
      // this.firstFormGroup.get('onu_mac_addr_tx').setValue(this.frmData.caf_nu)
      this.firstFormGroup.get('onu_emi').setValue(this.frmData.onu_emi_ct)
      // this.firstFormGroup.get('instl_chk_ind').setValue(this.frmData.caf_nu)
      console.log(this.frmData.onu_own_in)
      if (this.frmData.onu_own_in == 1) {
        console.log(this.onuchecked)
        this.firstFormGroup.get('onu_own').setValue(1)
        this.onuchecked = true

      }
      else {
        this.onuchecked = false
        this.firstFormGroup.get('onu_own').setValue(0)
      }
      if (this.frmData.iptv_own_in == 1) {
        console.log(this.iptvchecked)
        this.firstFormGroup.get('onu_own').setValue(1)
        this.iptvchecked = true

      }
      else {
        this.iptvchecked = false
        this.firstFormGroup.get('onu_own').setValue(0)
      }
      this.radioSelected = this.frmData.iptv_own_in
      this.radioSelected1 = this.frmData.onu_own_in
      this.firstFormGroup.get('onu_amt').setValue(this.frmData.onu_prc_at)
      this.firstFormGroup.get('onu_up_frmt_amt').setValue(this.frmData.onu_upfrnt_at)
      this.firstFormGroup.get('inst_amt').setValue(this.frmData.instl_chrg_at)
      this.firstFormGroup.get('tel_cns').setValue(this.frmData.tp_ct)
      /*// this.firstFormGroup.get('iptv_mdl').setValue(this.frmData.caf_nu)
      this.firstFormGroup.get('iptv_bx_srl_num').setValue(this.frmData.iptv_srl_nu)
      // this.firstFormGroup.get('iptv_mac_addr_tx').setValue(this.frmData.caf_nu)
      this.firstFormGroup.get('iptv_bx_own').setValue(this.frmData.iptv_own_in)
      this.firstFormGroup.get('iptv_bx_emi').setValue(this.frmData.iptv_emi_ct)
      this.firstFormGroup.get('iptv_bx_amt').setValue(this.frmData.iptv_prc_at)
      this.firstFormGroup.get('iptv_bx_up_amt').setValue(this.frmData.iptv_upfrnt_at)*/
	  if( this.newhsicaf == true ) {
        console.log("this.newhsicaf == true else if")
        this.firstFormGroup.get('iptv_mdl').setValidators(null)
        this.firstFormGroup.get('iptv_bx_srl_num').setValidators(null)
        this.firstFormGroup.get('iptv_mac_addr_tx').setValidators(null)
        this.firstFormGroup.get('iptv_bx_own').setValidators(null)
        this.firstFormGroup.get('iptv_bx_emi').setValidators(null)
        this.firstFormGroup.get('iptv_bx_amt').setValidators(null)
        this.firstFormGroup.get('iptv_bx_up_amt').setValidators(null)
        this.firstFormGroup.get('iptv_stpbx_id').setValidators(null)
      } else {
        console.log("this.newhsicaf == false else if")
        // this.firstFormGroup.get('iptv_mdl').setValue(this.frmData.caf_nu)
        this.firstFormGroup.get('iptv_bx_srl_num').setValue(this.frmData.iptv_srl_nu)
        // this.firstFormGroup.get('iptv_mac_addr_tx').setValue(this.frmData.caf_nu)
        this.firstFormGroup.get('iptv_bx_own').setValue(this.frmData.iptv_own_in)
        this.firstFormGroup.get('iptv_bx_emi').setValue(this.frmData.iptv_emi_ct)
        this.firstFormGroup.get('iptv_bx_amt').setValue(this.frmData.iptv_prc_at)
        this.firstFormGroup.get('iptv_bx_up_amt').setValue(this.frmData.iptv_upfrnt_at)
      }
      this.getpopLst()
      this.pop()
      this.getPortByOltId()
      this.onBlur()
      this.oniptvsrlnu()
      this.getSlotDetailsForPort()
     

    }
    this.getStates()
    this.firstFormGroup.get('custInfo').get('instl_state').valueChanges.subscribe(value => {
      this.getDistricts(1, 1)
    });
    this.firstFormGroup.get('custInfo').get('loc_dstrct_id').valueChanges.subscribe(value => {
      this.getMandals(value, 1)
    });
    this.firstFormGroup.get('custInfo').get('loc_mndl_id').valueChanges.subscribe(value => {
      this.getVillages(value, 1)
    });
    this.firstFormGroup.get('custInfo').get('blng_ste_id').valueChanges.subscribe(value => {
      this.getDistricts(1, 2)
    });
    this.firstFormGroup.get('custInfo').get('blng_dstrct_id').valueChanges.subscribe(value => {
      this.getMandals(value, 2)
    });
    this.firstFormGroup.get('custInfo').get('blng_mndl_id').valueChanges.subscribe(value => {
      this.getVillages(value, 2)
    });

  }
  get customerInfo() {
    return this.firstFormGroup.controls.custInfo as FormGroup;
  }
  onretrive() {
    this.loader =true;
    this.http.get<any>('/caf/aadhaar/' + this.firstFormGroup.value.custInfo.adhr_nu).subscribe(data => {
      this.loader =false;
      console.log(data);
      this.aadhaar = data.data.res;
      console.log(this.aadhaar);
      if (data['status'] == "202") {
        this.adharErrorMsg = data.message;
      }
      // if (this.aadhaar.CITIZEN_NAME.length == 0 || this.aadhaar.CITIZEN_NAME == " ") {
      //   this.snackBar.open("No data found with given Aadhaar,Please enter data manually.", '', {
      //     duration: 2000,
      //     horizontalPosition: this.horizontalPosition,
      //     verticalPosition: this.verticalPosition,
      //   });
      // }
      // var arr = this.aadhaar.CITIZEN_NAME.split(' ');
      // console.log(arr)
      this.firstFormGroup.get('custInfo').get('frst_nm').setValue(this.aadhaar.FST_NM)
      this.firstFormGroup.get('custInfo').get('lst_nm').setValue(this.aadhaar.SUR_NM)

      this.firstFormGroup.get('custInfo').get('dob_dt').setValue(this.aadhaar.DOB_DT)
      if(this.aadhaar.GENDER.toLowerCase() == 'male')
      this.firstFormGroup.get('custInfo').get('gndr_id').setValue(1)
      else if(this.aadhaar.GENDER.toLowerCase() == 'female')
      this.firstFormGroup.get('custInfo').get('gndr_id').setValue(2)
      else
      this.firstFormGroup.get('custInfo').get('gndr_id').setValue(3)

      this.firstFormGroup.get('custInfo').get('loc_lmdle1_nu').setValue(this.aadhaar.MOBILE_NUMBER)
      this.firstFormGroup.get('custInfo').get('instl_streetname').setValue(this.aadhaar.STREET)
      this.firstFormGroup.get('custInfo').get('instl_pincode').setValue(this.aadhaar.PINCODE)
      this.firstFormGroup.get('custInfo').get('loc_eml1_tx').setValue(this.aadhaar.EMAIL_ID)
      this.firstFormGroup.get('custInfo').get('instl_house_flat_no').setValue(this.aadhaar.BUILDING_NAME)
     // this.firstFormGroup.get('custInfo').get('instl_state').setValue(1)
      // this.firstFormGroup.get('custInfo').get('instl_state').valueChanges.subscribe(value => {
      this.getDistricts(1, 3)
      // });
      // this.firstFormGroup.get('custInfo').get('loc_dstrct_id').valueChanges.subscribe(value => {
      //   this.getMandals(value, 3)
      // });
      // this.firstFormGroup.get('custInfo').get('loc_mndl_id').valueChanges.subscribe(value => {
      //   this.getVillages(value, 3)
      // });
      console.log(this.gndrLst)
      for (let i = 0; i < this.gndrLst.length; i++) {
        let str = this.gndrLst[i].gndr_nm
        console.log(str)
        console.log(this.aadhaar.GENDER.toLowerCase())
        if (this.aadhaar.GENDER.toLowerCase() == str.toLowerCase()) {
          console.log("hai")
          this.firstFormGroup.get('custInfo').get('gndr_id').setValue(this.gndrLst[i].gndr_id);

          console.log(this.gndrLst[i])
          // this.getMandals(this.instl_dstrt_lst[i].dstrt_id,3)
        }
      }
    })



  }
  get userName() { return  this.firstFormGroup.get('custInfo').get('adhr_nu') }
  getGender() {
    const prfleRte = `user/gender`;
    this.crdsrv.get(prfleRte).subscribe((res) => {
      this.gndrLst = res['data'];
      // console.log(this.gndrLst);
    }, (error) => {
      console.log(error);
    });
  }
  UpdateFrmdata() {




    // this.firstFormGroup.value["billrunday"] = this.frmData.billrunday
    console.log(this.frmData)
    switch (this.firstFormGroup.value.frqncy_id) {
      case 1:
        this.firstFormGroup.value["billfreqlov"] = "MONTHLY"
        this.firstFormGroup.value["billrunday"] = "MONTHLY"
        break;
      case 2:
        this.firstFormGroup.value["billfreqlov"] = "QUATERLY"
        this.firstFormGroup.value["billrunday"] = "QUATERLY"
        break;
      case 3:
        this.firstFormGroup.value["billfreqlov"] = "HALFYEARLY"
        this.firstFormGroup.value["billrunday"] = "HALFYEARLY"
        break;
      case 4:
        this.firstFormGroup.value["billfreqlov"] = "YEARLY"
        this.firstFormGroup.value["billrunday"] = "YEARLY"
        break;

    }
    console.log(this.firstFormGroup.value)
    let data = this.firstFormGroup.getRawValue()
    data["olt_prt_splt_tx"] = `${this.firstFormGroup.value.lvl1_slt}-${this.firstFormGroup.value.lvl2_slt}-${this.firstFormGroup.value.lvl3_slt}`
    data['cstmr_id'] = this.frmData.cstmr_id
    data['caf_nu'] = this.frmData.caf_nu
    data["billfreqlov"] = this.frmData.billfreqlov
    data["status"] = 1;
    data["enty_sts_id"] = 1;
    data["agnt_id"] = this.usrdtls.usr_ctgry_ky
    // data["lmo_agnt_cd"] = "LMO18966"
    // data["mso_agnt_cd"] = "LMO18966"
    data["lat"] = ""
    data["lng"] = ""
    data["crnt_caf_sts_id"] = 1
    data["caf_type_id"] = 1
    data["lg_id"] = "lag::"
    data["blble_caf_in"] = 0;
    data["apsf_unq_id"] = 0;
    data["cnctn_sts_id"] = 1;
    data["splt_id"] = this.splt_id;
    data["mdle_cd"] = this.boxDetails.mdle_cd
    data["olt_crd_nu"] = this.lagDtls.crd_id
    data["olt_prt_nm"] = this.lagDtls.olt_prt_nm
    data["olt_acs_nde_id"] = this.lagDtls.olt_acs_nde_id
    data["olt_ip_addr_tx"] = this.lagDtls.olt_ip_addr_tx
    data["olt_srl_nu"] = this.lagDtls.olt_srl_nu
    data["cst_at"] = this.packgdta.total
    console.log(data)
    this.crdsrv.update(data, 'caf/updatecafDtls').subscribe(res => {
      console.log(res)
      if (res['status'] = 200) {
        this.snackBar.open("Sucessfully Updated", '', {
          duration: 2000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
      }
    })

  }
  getOnuSrlNum(agentId: number) {
    const rte = `olt/oltdetails/${agentId}`;
    this.crdsrv.get(rte).subscribe((res) => {
      this.oltDtls = res['data'];
    })
  }
  getOltInfo(agentId: number) {
    const rte = `olt/oltdetails/${agentId}`;
    this.crdsrv.get(rte).subscribe((res) => {
      this.oltDtls = res['data'];
    })
  }
  getPortByOltId() {
    const rte = `olt/slotDetails/` + this.firstFormGroup.value.olt_id;
    this.crdsrv.get(rte).subscribe((res) => {
      this.prtDtls = res['data'];
      console.log(this.prtDtls)
    })
  }
  getSlotDetailsForPort() {

    // console.log(e)
    
    this.firstFormGroup.get('lvl1_slt').reset();
    this.firstFormGroup.get('lvl2_slt').reset();
    this.firstFormGroup.get('lvl3_slt').reset();
    let count = 0
    const rte = `olt/slotDtls/` + this.firstFormGroup.value.olt_prt_id;
    this.crdsrv.get(rte).subscribe((res) => {
      if (res['data'].length == 0 ) {
        this.snackBar.open("No Slots Available", '', {
          duration: 2000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
      }
      this.level1 = res['data'];
      console.log(this.level1)
      if (this.frm_actn == "update") {

        var index = this.level1.findIndex(x => x.splt1_nu == parseInt(this.splits[0]))
        // here you can check specific property for an object whether it exist in your array or not

        if (index === -1) {
          this.level1.push({ splt1_nu: parseInt(this.splits[0]) });
          this.firstFormGroup.get('lvl1_slt').setValue(parseInt(this.splits[0]))
        }
        else {
          console.log("object already exists")
          this.firstFormGroup.get('lvl1_slt').setValue(parseInt(this.splits[0]))
        }


        console.log(this.level1)

      }
      // console.log(e.value)
      // this.getSlotOneLevels( this.firstFormGroup.value.olt_prt_id);
    })



  }
  getSlotTwo() {
    this.firstFormGroup.get('lvl2_slt').reset();
    this.firstFormGroup.get('lvl3_slt').reset();
    let data = []
    data.push(
      {
        olt_prt_id: this.firstFormGroup.value.olt_prt_id,
        level1: this.firstFormGroup.value.lvl1_slt
      }
    )

    console.log(data)

    const rte = `olt/slottwoDetailsForPort/`
    console.log(this.firstFormGroup.value.lvl1_slt)
    this.crdsrv.create(data, rte).subscribe((res) => {
      if (res['data'].length == 0 ) {
        this.snackBar.open("No Splits Available", '', {
          duration: 2000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
      }
      this.level2 = res['data'];
      console.log(this.level2)
      if (this.frm_actn == "update") {

        var index = this.level1.findIndex(x => x.splt2_nu == parseInt(this.splits[1]))
        // here you can check specific property for an object whether it exist in your array or not

        if (index === -1) {
          this.level1.push({
            splt1_nu: parseInt(this.splits[0]), splt2_nu: parseInt(this.splits[1])
          });
          this.firstFormGroup.get('lvl2_slt').setValue(parseInt(this.splits[1]))
        }
        else {
          console.log("object already exists")
          this.firstFormGroup.get('lvl2_slt').setValue(parseInt(this.splits[1]))
        }


        console.log(this.level1)

      }

    })

  }
  getSlotThree() {
    this.firstFormGroup.get('lvl3_slt').reset();
    console.log(this.firstFormGroup.value.lvl2_slt)
    let data = []
    data.push(
      {
        olt_prt_id: this.firstFormGroup.value.olt_prt_id,
        level1: this.firstFormGroup.value.lvl1_slt,
        level2: this.firstFormGroup.value.lvl2_slt
      }
    )

    console.log(data)
    if (this.frm_actn == "update") {
      const rte = `olt/allslotthreeDetailsForPort/`
      console.log(this.firstFormGroup.value.lvl1_slt)
      this.crdsrv.create(data, rte).subscribe((res) => {
        if (res['data'].length == 0 ) {
          this.snackBar.open("No Splits Available", '', {
            duration: 2000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
          });
        }
        this.level3 = res['data'];
        console.log(this.level3)
        this.firstFormGroup.get('lvl3_slt').setValue(parseInt(this.splits[2]))

      })
    }
    else {

      const rte = `olt/slotthreeDetailsForPort/`
      console.log(this.firstFormGroup.value.lvl1_slt)
      this.crdsrv.create(data, rte).subscribe((res) => {
        this.level3 = res['data'];
        console.log(this.level3)
        // console.log(e.value)
        // this.getSlotOneLevels( this.firstFormGroup.value.olt_prt_id);
      })
    }
  }

  get_lagDtls(a) {
    console.log(a)
    this.lagDtls = a
    this.lagDtls.olt_ip_addr_tx

    var s = this.lagDtls.olt_ip_addr_tx
    var arr = s.split('.');
    console.log(arr)
    var modified = "lag:"
    for (var i = 2; i < arr.length; i++) {
      modified = modified + arr[i];
    }
    console.log(modified.toLowerCase())
    this.aaa_cd = modified.toLowerCase()

  }
  getonuId(data) {
    console.log(data)
    this.onu_id = data.onu_id
    this.splt_id = data.splt_id
  }

  getBillingFrequency() {
    const rte = `crm/billingFrequency`;
    this.crdsrv.get(rte).subscribe((res) => {
      this.blng_frqncy_lst = res['data'];
      console.log(this.blng_frqncy_lst)
    })
  }
  Viewpoplst() {
    this.lmoLoader = true;

    const rte = `caf/getPopByAgntId/${this.usrdtls.usr_ctgry_ky}/4`;
    this.crdsrv.get(rte).subscribe((res) => {
      this.poplst = res['data'];
  var count=0
      this.poplst.filter((k)=>{
        k['sno']=++count
      })
      console.log(res['data'])
      console.log(this.poplst)
    })
    // this.dataService.getLmoLst().then((res) => {
    //   this.lmosLst = res
    //   this.lmoLoader = false;
    //   this.gridData = this.lmosLst
    // })

    this.columnDefss = [
      { headerName: 'Sno', field: 'sno', cellStyle: { 'text-align': "center" }, cellClass: "pm-grid-number-cell", width: 100, sortable: true, filter: false },
      { headerName: 'pop Name', field: 'sbstn_nm', cellStyle: { 'text-align': "center" }, cellClass: "pm-grid-number-cell", width: 265 },
     // { headerName: 'Code', field: 'agnt_cd', cellStyle: { 'text-align': "left" }, cellClass: "pm-grid-number-cell", width: 100, sortable: true, filter: true },
    ];

    this.openSideBar()

  }

  selectSingleRow(event) {
    console.log(event)
    this.firstFormGroup.get('custInfo').get('pop_nm').setValue(`${event.data.sbstn_nm} `)
    this.firstFormGroup.get('custInfo').get('pop_id').setValue(` ${event.data.sbstn_id} `)
    // this.cafFRm.get('mso_nm').setValue(`${event.data.agnt_nm} | ${event.data.agnt_cd}`);
    // this.cafFRm.get('mso_id').setValue(event.data.agnt_id);
    this.closeSideBar()
    this.pop()

  }
  getpackages() {
    console.log("Packages")
    if (this.frm_actn == "entnew") {
      this.caftyp_id = 2
      console.log('ent')
      console.log(this.caftyp_id)
    }
    else {
      this.caftyp_id = 1
      console.log("ind")
    }
    const rte = `package/getPckgesByAgntId/${this.usrdtls.usr_ctgry_ky}/` + this.caftyp_id;
    console.log(rte)
    this.crdsrv.get(rte).subscribe((res) => {
      this.packages = res['data'];
      console.log(res['data'])
      console.log(this.packages)

      this.packages.filter((k) => {
        if (this.frm_actn == "update") {
          if (k.pckge_id == this.frmData.crnt_pln_id) {
            k['checked'] = true;
          }
        }
        else
          k['checked'] = false;
      });

    })
  }
  getpopLst() {
    console.log("pop")
    if (this.frm_actn == "update") {
      const rte = `caf/getPopByAgntId/${this.frmData.agnt_id}/4`;
      this.crdsrv.get(rte).subscribe((res) => {
        this.poplst = res['data'];
        console.log(res['data'])
        console.log(this.poplst)
      })
    }
    else if(this.siusr){
    
    }
     else {
      const rte = `caf/getPopByAgntId/${this.usrdtls.usr_ctgry_ky}/4`;
      this.crdsrv.get(rte).subscribe((res) => {
        this.poplst = res['data'];
        console.log(res['data'])
        console.log(this.poplst)
      })
    }
  }
  onBlur() {

    // console.log(data.target.value)
    // console.log(data)
    const rte = `caf/boxdtls/` + this.firstFormGroup.value.onu_srl_nu;
    this.crdsrv.get(rte).subscribe((res) => {
      this.boxDetails = res['data'];
      console.log(res['data'])
      if (res['data'].length == 0 || this.boxDetails.prdct_id == 2) {
        this.snackBar.open("ONU does not exist in DB", '', {
          duration: 2000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
      }
     // console.log(this.boxDetails[0].stpbx_id)
      const rte1 = `caf/boxallocated/` + this.boxDetails[0].stpbx_id;
      this.crdsrv.get(rte1).subscribe((res1) => {
        console.log(res1['data'])
        if (res1['data'].length > 0) {
          this.snackBar.open("ONU exist in DB but already assigned to another CAF", '', {
            duration: 2000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
          });
        }
        else {
          if ( this.boxDetails[0].prdct_id == 2) {
            this.snackBar.open("ONU does not exist in DB", '', {
              duration: 2000,
              horizontalPosition: this.horizontalPosition,
              verticalPosition: this.verticalPosition,
            });
          }
          else{

          this.firstFormGroup.get('onu_mdl').setValue(this.boxDetails[0].mdle_nm)
          this.firstFormGroup.get('onu_mac_addr_tx').setValue(this.boxDetails[0].mac_addr_cd)
          this.firstFormGroup.get('onu_stpbx_id').setValue(this.boxDetails[0].stpbx_id)
          this.firstFormGroup.get('onu_amt').setValue(this.boxDetails[0].emi_at)
          this.firstFormGroup.get('onu_up_frmt_amt').setValue(this.boxDetails[0].up_frnt_chrgs_at)
          this.firstFormGroup.get('onu_emi').setValue(this.boxDetails[0].emi_ct)

        }
      }
      })

      parseInt(this.boxDetails.mdl_dtls_tx)
      console.log(this.boxDetails[0].mdl_dtls_tx)
      this.tps = this.boxDetails[0].mdl_dtls_tx.split(",")
      console.log(this.tps)
      this.tps.forEach(t => {
        this.trnfpt.push(parseInt(t))
      });
      console.log(this.trnfpt)
      var s = this.boxDetails[0].mac_addr_cd
      var arr = s.split(':');
      var modified = ""
      for (var i = 0; i < arr.length; i++) {
        if (i % 2 == 1) {
          if (i == arr.length - 1) {
            modified = modified + arr[i];
          } else {
            modified = modified + arr[i] + ".";
          }

        } else {
          modified = modified + arr[i];
        }
      }
      console.log(modified.toLowerCase())
      this.aaa_mac_id = modified.toLowerCase()
    })


  }
  oniptvsrlnu() {

    const rte = `caf/boxdtls/` + this.firstFormGroup.value.iptv_bx_srl_num;
    this.crdsrv.get(rte).subscribe((res) => {
      this.iptvDetails = res['data'];
      console.log(res['data'])
      console.log(this.iptvDetails)
      if (res['data'].length == 0) {
        this.snackBar.open("IPTV does not exist in DB", '', {
          duration: 2000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
      }
      const rte1 = `caf/boxallocated/` + this.iptvDetails[0].stpbx_id;
      this.crdsrv.get(rte1).subscribe((res1) => {
        console.log(res1['data'])
        if (res1['data'].length > 0) {
          this.snackBar.open("IPTV  exist in DB but already assigned to another CAF", '', {
            duration: 2000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
          });
        }
        else {
          if ( this.iptvDetails[0].prdct_id == 1) {
            this.snackBar.open("IPTV does not exist in DB", '', {
              duration: 2000,
              horizontalPosition: this.horizontalPosition,
              verticalPosition: this.verticalPosition,
            });
          }
          else{
          this.firstFormGroup.get('iptv_mdl').setValue(this.iptvDetails[0].mdle_nm)
          this.firstFormGroup.get('iptv_mac_addr_tx').setValue(this.iptvDetails[0].mac_addr_cd)
          this.firstFormGroup.get('iptv_stpbx_id').setValue(this.iptvDetails[0].stpbx_id)
          this.firstFormGroup.get('iptv_bx_emi').setValue(this.iptvDetails[0].emi_ct)
          this.firstFormGroup.get('iptv_bx_amt').setValue(this.iptvDetails[0].emi_at)
          this.firstFormGroup.get('iptv_bx_up_amt').setValue(this.iptvDetails[0].up_frnt_chrgs_at)

        }
      }
      })

    })
  }
  onFocus(data) {
    console.log(data)
  }
  getDepartmentNmas() {
    const rte = `crm/entDepartmentNames`;
    this.crdsrv.get(rte).subscribe((res) => {
      this.department_names = res['data'];
      console.log(this.department_names)
    })
  }
  getStates() {

    const rte = `admin/states`;

    this.crdsrv.get(rte).subscribe((res) => {
      if (res['data'].length > 0) {
        this.ste_lst = res['data'];
        console.log(this.ste_lst)
        if(this.frmData){
          console.log("On State Set")
          this.firstFormGroup.get('custInfo').get('instl_state').setValue(parseInt(this.frmData.blng_ste_id));
          this.firstFormGroup.get('custInfo').get('blng_ste_id').setValue(parseInt(this.frmData.blng_ste_id));
        }
    

      }
    })
  }
  getDistricts(ste_id, add_typ) {
    console.log(add_typ)
    const rte = `admin/states/${ste_id}/districts`;
    console.log(rte)
    this.crdsrv.get(rte).subscribe((res) => {
      console.log(res)
      if (add_typ == 1) {
        let data = res['data']
        if(this.siusr){
          this.instl_dstrt_lst =data 
        }
        else{
        for (let i = 0; i < data.length; i++) {
          console.log("in for")
          console.log(data[i].dstrt_id)
          console.log(this.poploc[0].dstrt_id)
          if (data[i].dstrt_id == this.poploc[0].dstrt_id) {
            console.log("in if")
            this.instl_dstrt_lst = [];
            this.instl_dstrt_lst.push(data[i])
            // this.instl_dstrt_lst[0] = data[i];
            console.log(this.instl_dstrt_lst)
          }
        }
      }
        // console.log(this.poploc)
        // if (this.frmData)
        //   this.firstFormGroup.get('custInfo').get('loc_dstrct_id').setValue(this.frmData.loc_dstrct_id);
      } else if (add_typ == 2) {
        this.blng_dstrt_lst = res['data'];
        // if (this.frmData)
        //   this.firstFormGroup.get('custInfo').get('blng_dstrct_id').setValue(parseInt(this.frmData.blng_dstrct_id));
      } else if (add_typ == 3) {
        this.instl_dstrt_lst = res['data'];
        console.log(this.instl_dstrt_lst.length)
        for (let i = 0; i < this.instl_dstrt_lst.length; i++) {
          let str = this.instl_dstrt_lst[i].dstrt_nm.replace(" ", "")
          // console.log(str)
          if (this.aadhaar.DISTRICT_NAME.toLowerCase() == str.toLowerCase()) {
            console.log("hai")
            this.firstFormGroup.get('custInfo').get('loc_dstrct_id').setValue(this.instl_dstrt_lst[i].dstrt_id);
            this.distnm = this.instl_dstrt_lst[i].dstrt_nm
            console.log(this.distnm)
            console.log(this.instl_dstrt_lst[i])
            this.getMandals(this.instl_dstrt_lst[i].dstrt_id, 3)
          }
        }
        // this.firstFormGroup.get('custInfo').get('loc_dstrct_id').setValue(parseInt(this.adr));
      }

    });
  }
  getMandals(dst_id, add_typ) {
    console.log(add_typ)
    this.distId = dst_id
    const rte = `admin/districts/${dst_id}/mandals`;
    this.crdsrv.get(rte).subscribe((res) => {



      if (add_typ == 1) {
        // this.instl_mndl_lst = res['data'];
        let data = res['data']
        this.instl_mndl_lst = [];
        if(this.siusr){
          this.instl_mndl_lst =data 
        }
        else{
        for (let i = 0; i < data.length; i++) {
          console.log("in for")
          console.log(data[i].mndl_id)
          console.log(this.poploc[0].mndl_id)
          if (data[i].mndl_id == this.poploc[0].mndl_id) {
            console.log("in if")
            
            this.instl_mndl_lst.push(data[i])
            // this.instl_dstrt_lst[0] = data[i];
            console.log(this.instl_mndl_lst)
          }
        }
      }
        console.log(this.poploc)
        // if (this.frmData)
        //   this.firstFormGroup.get('custInfo').get('loc_mndl_id').setValue(this.frmData.loc_mndl_id);


      } else if (add_typ == 2) {
        this.blng_mndl_lst = res['data'];
        // if (this.frmData)
        //   this.firstFormGroup.get('custInfo').get('blng_mndl_id').setValue(parseInt(this.frmData.blng_mndl_id));
      } else if (add_typ == 3) {
        this.instl_mndl_lst = res['data'];
        for (let i = 0; i < this.instl_mndl_lst.length; i++) {
          let str = this.instl_mndl_lst[i].mndl_nm.replace(" ", "")
          // console.log(str)
          if (this.aadhaar.TEHSIL_NAME.toLowerCase() == str.toLowerCase()) {
            console.log("hai")
            this.firstFormGroup.get('custInfo').get('loc_mndl_id').setValue(this.instl_mndl_lst[i].mndl_nu);
            this.mandalnm = this.instl_mndl_lst[i].mndl_nm
            console.log(this.mandalnm)
            console.log(this.instl_mndl_lst[i])
            this.getVillages(this.instl_mndl_lst[i].mndl_nu, 3)

          }
        }

      }
      



    });
  }

  getVillages(mndl_id, add_typ) {
    const rte = `user/getvlgs/${mndl_id}/${this.distId}`;
    this.crdsrv.get(rte).subscribe((res) => {
      if (add_typ == 1) {
        // this.instl_vlge_lst = res['data'];
        let data = res['data']
        this.instl_vlge_lst = [];
        if(this.siusr){
          this.instl_vlge_lst =data 
        }
        else{
        for (let i = 0; i < data.length; i++) {
          console.log("in for")
          console.log(data[i].vlge_id)
          for (let j = 0; j < this.poploc.length; j++) {
          // console.log(this.poploc[0].vlge_id)
          if (data[i].vlge_id == this.poploc[j].vlge_id) {
            console.log("in if")

            this.instl_vlge_lst.push(data[i])
            // this.instl_dstrt_lst[0] = data[i];
            console.log(this.instl_vlge_lst)
          }
        }
      }
    }
        console.log(this.poploc)
        console.log(this.instl_vlge_lst)
        // if (this.frmData)
        //   this.firstFormGroup.get('custInfo').get('loc_vlge_id').setValue(this.frmData.loc_vlge_id);
      } else if (add_typ == 2) {
        this.blng_vlge_lst = res['data'];
        // if (this.frmData)
        //   this.firstFormGroup.get('custInfo').get('blng_vlge_id').setValue(parseInt(this.frmData.blng_vlge_id));
      } else if (add_typ == 3) {
        this.instl_vlge_lst = res['data'];
        console.log(this.instl_vlge_lst)
        for (let i = 0; i < this.instl_vlge_lst.length; i++) {
          let str = this.instl_vlge_lst[i].vlge_nm.replace(" ", "")
          // console.log(str)
          if (this.aadhaar.VT_NAME.toLowerCase() == str.toLowerCase()) {
            console.log("hai")
            this.firstFormGroup.get('custInfo').get('loc_vlge_id').setValue(this.instl_vlge_lst[i].vlge_id);
            this.vlgnm = this.instl_vlge_lst[i].vlge_nm
            console.log(this.vlgnm)
            console.log(this.instl_vlge_lst[i])

          }
        }
      }
   
    });

  }


  getPackagedtl(data) {
    console.log(data)
    const rte = 'caf/srvpcs/' + data.value;
    console.log(rte)
    this.crdsrv.get(rte).subscribe((res) => {
      this.srvpcs = res['data'];
      console.log(res['data'])
      console.log(this.srvpcs)
    })
   
  }
  getpackagedta(data) {
this.nxt=false
    let dt = []
    data.srvcs.filter((k) => {
      if (k.cre_srvce_id == 1 ||k.cre_srvce_id == 5) {
        dt.push({
          srvcpk_id: k.srvcpk_id,
          pckge_id: data.pckge_id

        })
      }
    })

    console.log(data)
    this.eftdt = data.efcte_dt
    this.expdt = data.expry_dt
    console.log(this.eftdt)
    console.log(this.expdt)

    const rte = `caf/getpckgeProperties`

    this.crdsrv.create(dt, rte).subscribe((res) => {
      this.pckgeProperties = res['data'];
      console.log(this.pckgeProperties)
      console.log(this.pckgeProperties[0].aaa_up_nrml + "_" + this.pckgeProperties[0].aaa_dw_nrml)
      // this.getSlotOneLevels( this.firstFormGroup.value.olt_prt_id);
	  console.log("pckgeProperties",this.pckgeProperties[0]);
		if( this.pckgeProperties[0]['iptv_flag'] == 1 ) {
			this.newhsicaf = true;
			console.log("this.newhsicaf",this.newhsicaf);
			console.log("pckgeProperties",this.pckgeProperties[0]);
		}
    })
    this.packgdta = data

  }




  checkValue(event: any) {
    console.log(this.firstFormGroup.value);
    // console.log(event);
    if (event.checked == true) {
      console.log(event);
      this.mndal_lst = this.mndl_lst;
      this.vilge_lst = this.vlge_lst;
      let data = this.firstFormGroup.get('custInfo').value;
      this.firstFormGroup.get('custInfo').get('blng_cntct_nm').setValue(data.frst_nm);
      this.firstFormGroup.get('custInfo').get('mbl_nu').setValue(data.loc_lmdle1_nu);
      this.firstFormGroup.get('custInfo').get('blng_eml1_tx').setValue(data.loc_eml1_tx);
      this.firstFormGroup.get('custInfo').get('blng_house_flat_no').setValue(data.instl_house_flat_no);
      this.firstFormGroup.get('custInfo').get('blng_buildingname').setValue(data.instl_buildingname);
      this.firstFormGroup.get('custInfo').get('blng_streetname').setValue(data.instl_streetname);
      this.firstFormGroup.get('custInfo').get('blng_lcly_tx').setValue(data.loc_lcly_tx);
      this.firstFormGroup.get('custInfo').get('blng_pn_cd').setValue(data.instl_pincode);
      this.firstFormGroup.get('custInfo').get('blng_ste_id').setValue(data.instl_state);
      this.firstFormGroup.get('custInfo').get('blng_dstrct_id').setValue(data.loc_dstrct_id);
      this.firstFormGroup.get('custInfo').get('blng_mndl_id').setValue(data.loc_mndl_id);
      this.firstFormGroup.get('custInfo').get('blng_vlge_id').setValue(data.loc_vlge_id);
      this.firstFormGroup.get('custInfo').get('blng_std_cd').setValue(data.loc_std_cd);
      this.firstFormGroup.get('custInfo').get('blng_lnd_nu').setValue(data.loc_lnd_nu);
    } else {
      console.log(event);
      // this.firstFormGroup.reset('billingAddress');
      this.firstFormGroup.get('custInfo').get('blng_cntct_nm').reset();
      this.firstFormGroup.get('custInfo').get('mbl_nu').reset();
      this.firstFormGroup.get('custInfo').get('blng_eml1_tx').reset();
      this.firstFormGroup.get('custInfo').get('blng_house_flat_no').reset();
      this.firstFormGroup.get('custInfo').get('blng_buildingname').reset();
      this.firstFormGroup.get('custInfo').get('blng_streetname').reset();
      this.firstFormGroup.get('custInfo').get('blng_lcly_tx').reset();
      this.firstFormGroup.get('custInfo').get('blng_pn_cd').reset();
      this.firstFormGroup.get('custInfo').get('blng_ste_id').reset();
      this.firstFormGroup.get('custInfo').get('blng_dstrct_id').reset();
      this.firstFormGroup.get('custInfo').get('blng_mndl_id').reset();
      this.firstFormGroup.get('custInfo').get('blng_vlge_id').reset();
      this.firstFormGroup.get('custInfo').get('blng_std_cd').reset();
      this.firstFormGroup.get('custInfo').get('blng_lnd_nu').reset();
    }
	if (!this.entcaf) {
      this.firstFormGroup.get('custInfo').get('department_id').setErrors(null)
      this.firstFormGroup.get('custInfo').get('OrgnCde').setErrors(null)
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

          // this.opensideBar('addFormPanel', null);
        }
      });
    });


  }

  saveCustomer() {
    //  this.newentry();
    if( this.pckgeProperties[0]['iptv_flag'] == 1 ) {
      this.newhsicaf = true;
      this.firstFormGroup.get('iptv_mdl').setErrors(null);
      this.firstFormGroup.get('iptv_bx_srl_num').setErrors(null)
      this.firstFormGroup.get('iptv_mac_addr_tx').setErrors(null)
      this.firstFormGroup.get('iptv_bx_own').setErrors(null)
      this.firstFormGroup.get('iptv_bx_emi').setErrors(null)
      this.firstFormGroup.get('iptv_bx_amt').setErrors(null)
      this.firstFormGroup.get('iptv_bx_up_amt').setErrors(null)
      this.firstFormGroup.get('iptv_stpbx_id').setErrors(null)
    }  
	if (!this.entcaf) {
      this.firstFormGroup.get('custInfo').get('department_id').setErrors(null)
      this.firstFormGroup.get('custInfo').get('OrgnCde').setErrors(null)
    }
    console.log(this.firstFormGroup)
    if (this.firstFormGroup.invalid) {
      this.snackBar.open("Please Enter Valid Data", '', {
        duration: 2000,
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      });
    }
    else {
      const rte = "caf/splt/" + this.splt_id;
      this.crdsrv.get(rte).subscribe((res) => {
        console.log(res);
        console.log(res['data'])
        if (res['data'].length == 0) {
          this.snackBar.open("Split Is Already Used For Another CAF Select Other Split ", '', {
            duration: 2000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
          });
          this.loader = false;
        }
        else {
          //console.log("New Entry")
          this.newentry();
        }


      });
    }
    // if (this.editClicked == false) {

    // } else if (this.deleteCstmr == true) {
    //   this.delete(this.updateData);
    // } else {
    //   this.update(this.updateData);
    // }
  }
  getdist(ds) {
    console.log(ds)
    this.distnm = ds.dstrt_nm
    console.log(this.distnm)
    
  }
  getmndl(m) {
    console.log(m)
    this.mandalnm = m.mndl_nm
    console.log(this.mandalnm)
    
  }

  getvlg(v) {
    console.log(v)
    this.vlgnm = v.vlge_nm
    console.log(this.vlgnm)
    if(this.siusr){
      console.log("si user")
      let data = []
      data.push(
        {
          dstrct_id: this.firstFormGroup.value.custInfo.loc_dstrct_id,
          mndl_id: this.firstFormGroup.value.custInfo.loc_mndl_id,
          vlge_id: this.firstFormGroup.value.custInfo.loc_vlge_id,
          agnt_id: this.usrdtls.usr_ctgry_ky,
		  apsfl_bbnl : 4
        }
      )
      const rte = `caf/getPop`;
      this.crdsrv.create(data, rte).subscribe((res) => {
        this.poplst = res['data'];
        console.log(res['data'])
        console.log(this.poplst)
      })
    }
  }

  newentry() {
    if(this.usrdtls.user_id==101004190){
      this.partnerCode = "SI0006"
    }
    else{
      this.partnerCode =this.usrdtls.lmo_cd
    }
    this.loader = true;
    // this.usrdtls = JSON.parse(localStorage.getItem('usrDtls'));
    // console.log(this.formDesgination.value);
    // console.log(this.firstFormGroup.value);
    this.firstFormGroup.value['dob_dt'] = this.datePipe.transform(this.firstFormGroup.value.dob_dt, 'yyyy-MM-dd');
    this.firstFormGroup.value['actvn_dt'] = this.datePipe.transform(this.firstFormGroup.value.actvn_dt, 'yyyy-MM-dd');

    // this.usrdtls = JSON.parse(localStorage.getItem('usrDtls'));
    const rte = "caf_operations/provision";
    //const rte = "caf/caf";

    let data = this.firstFormGroup.getRawValue();

    let custData = this.firstFormGroup.get('custInfo').value;
    data = Object.assign(data, custData)
    //data["caf_id"] = this.cafid;
    switch (this.firstFormGroup.value.frqncy_id) {
      case 1:
        data["blng_frqny_id"] = 1
        data["billfreqlov"] = 1
        data["billrunday"] = "MONTHLY"
        break;
      case 2:
        data["blng_frqny_id"] = 2
        data["billfreqlov"] = 2
        data["billrunday"] = "QUATERLY"
        break;
      case 3:
        data["blng_frqny_id"] = 3
        data["billfreqlov"] = 3
        data["billrunday"] = "HALFYEARLY"
        break;
      case 4:
        data["blng_frqny_id"] = 4
        data["billfreqlov"] = 4
        data["billrunday"] = "YEARLY"
        break;

    }
    data["instl_dstrt_id"]= this.firstFormGroup.value.custInfo.loc_dstrct_id,
	data["instl_mndle_id"] = this.firstFormGroup.value.custInfo.loc_mndl_id,
	data["loc_mndl_id"] = this.firstFormGroup.value.custInfo.loc_mndl_id,
	data["loc_vlge_id"] = this.firstFormGroup.value.custInfo.loc_vlge_id,
    data["instl_cty_id"]= this.firstFormGroup.value.custInfo.loc_vlge_id,
    data["status"] = 1;
    data["enty_sts_id"] = 1;
    data["agnt_id"] = this.usrdtls.usr_ctgry_ky
    // data["lmo_agnt_cd"] = "LMO18966"
    // data["mso_agnt_cd"] = "LMO18966"
    data["lat"] = ""
    data["lng"] = ""
    data["crnt_caf_sts_id"] = 1
    data["lg_id"] = "lag::"
	data["apsfl_bbnl"] = "4"
    data["olt_prt_splt_tx"] = `${this.firstFormGroup.value.lvl1_slt}-${this.firstFormGroup.value.lvl2_slt}-${this.firstFormGroup.value.lvl3_slt}`
    data["blble_caf_in"] = 0;
    data["apsf_unq_id"] = 0;
    data["cnctn_sts_id"] = 1;
    data["splt_id"] = this.splt_id;
    data["mdle_cd"] = this.boxDetails.mdle_cd
    data["olt_crd_nu"] = this.lagDtls.crd_id
    data["olt_prt_nm"] = this.lagDtls.olt_prt_nm
    data["olt_acs_nde_id"] = this.lagDtls.olt_acs_nde_id
    data["olt_ip_addr_tx"] = this.lagDtls.olt_ip_addr_tx
    data["olt_srl_nu"] = this.lagDtls.olt_srl_nu
    data["cst_at"] = this.packgdta.total
	data["accessId"] = this.aaa_mac_id
    data["efcte_dt"] = this.datePipe.transform(this.eftdt, 'yyyy-MM-dd');
    data["expry_dt"] = this.datePipe.transform(this.expdt, 'yyyy-MM-dd');
    data["onu_id"] = this.onu_id
	data["dprmnt_id"] = this.firstFormGroup.value.custInfo.department_id
    data["orgsn_cd"] = this.firstFormGroup.value.custInfo.OrgnCde
    let adjstdPrt = 0;
    if (data.olt_crd_nu == 1 && this.boxDetails[0].mdle_cd.includes('D')) {
      adjstdPrt = data.olt_prt_nm + 8;
    }

    // data["olt_prt_nm"] = this.lagDtls.olt_prt_nm
    data["aghra_cd"] = data.olt_ip_addr_tx + "-" + data.olt_crd_nu + "-" + adjstdPrt + "-" + this.onu_id + "-HSI";
    data["aaa_cd"] = this.aaa_cd + ":" + data.olt_crd_nu + ":" + data.olt_prt_nm + ":" + this.onu_id;
    if (this.entcaf) {
      data["caf_type_id"] = 2
      data["prnt_cstmr_id"] = this.firstFormGroup.value.node
    }
    else {
      data["caf_type_id"] = 1

    }
    console.log(this.pckgeProperties)


    var prv_Dtls = {
      "aghra_cd": data["aghra_cd"],
      "aaa_cd": data["aaa_cd"],
      "ipAddress": data.olt_ip_addr_tx,
      "card": data.olt_crd_nu,
      "adjstdPrt": adjstdPrt,
      "tp": data.olt_prt_nm,

      "onuId": this.onu_id,

      "olt_srl_nu": data.olt_srl_nu,

      "profileName": this.boxDetails[0].mdle_cd,
      "name": `${data.frst_nm}` + `${data.lst_nm}`,
      "tps": this.tps,
      "srvcs": this.packgdta.srvcs,
      "networkServiceName": "HSI",
      "upstreamTrafficProfileName": this.pckgeProperties[0].up_strm_trfficpfl_nm,
      "downstreamTrafficProfileName": this.pckgeProperties[0].dwn_strm_trfficpfl_nm,
      "nativeVlan": (this.boxDetails[0].ntve_lan_in == 0) ? false : true, 
      "accessId": this.aaa_mac_id,
      "fup": this.pckgeProperties[0].aaa_up_nrml + "_" + this.pckgeProperties[0].aaa_dw_nrml,

      "firstname": data.frst_nm,
      "lastname": data.lst_nm,
      "contactno": data.loc_lmdle1_nu,
      "emailid": data.loc_eml1_tx,
      "identityProofId": data.adhr_nu,
      "address": data.instl_buildingname + "," + data.instl_streetname + "," + data.loc_lcly_tx,
      "stateCode": "AP",
      "countryCode": "INDIA",
      "countryISO2": "IN",
      "partnerCode": this.partnerCode,
      "village": this.vlgnm,
      "mandal": this.mandalnm,
      "districtCode": this.distnm,
      "admin": "1",
      "fec": "true", 
      "swUpgradeMode": "2",

      "registerType": "1",
    }
    console.log (JSON.stringify(prv_Dtls))
    console.log(data.onu_srl_nu.startsWith('DSNW'))
    if (data.onu_srl_nu.startsWith('DSNW')) {
      prv_Dtls["serialNumber"] = data.onu_srl_nu.replace('DSNW', '44534E57');
    } else if (data.onu_srl_nu.startsWith('ZTEG')) {
      prv_Dtls["serialNumber"] = data.onu_srl_nu.replace('ZTEG', '5A544547');
    } else if (data.onu_srl_nu.startsWith('YGE1')) {
      prv_Dtls["serialNumber"] = data.onu_srl_nu.replace('YGE1', '59474531');
    } else if (data.onu_srl_nu.startsWith('RLGM')) {
      prv_Dtls["serialNumber"] = data.onu_srl_nu.replace('RLGM', '524C474D');
    } else if (data.onu_srl_nu.startsWith('KONK')) {
      prv_Dtls["serialNumber"] = data.onu_srl_nu.replace('KONK', '4B4F4E4B');
    }else{
      prv_Dtls["serialNumber"] = data.onu_srl_nu
    }
    console.log(data)

    console.log(JSON.stringify(prv_Dtls))
    data["prv_Dtls"] = prv_Dtls
    data["prnt_cstmr_id"] = data.node
    console.log(data)
    console.log(JSON.stringify(data))
    this.crdsrv.create(data, rte).subscribe((res) => {
      console.log(res);
      if (res['status'] == 200) {
        this.snackBar.open("Sucessfully Added", '', {
          duration: 2000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
        this.loader = false;
        //this.router.navigate(['admin/caf/customers'])
        //  this.getcustomer();
        //   this.opensideBar('addFormPanel', null);
        this.TransfereService.setLoclData('data',{caf_id: res["data"]})
        this.router.navigate([`/admin/caf/customer/profile`])
      } else if (res['status'] == 700) {
        this.snackBar.open("Split Is Already Used For Another CAF Select Other Split ", '', {
          duration: 2000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
        this.loader = false;
        //this.router.navigate(['admin/caf/customers'])
        //  this.getcustomer();
        //   this.opensideBar('addFormPanel', null);

      }else if (res['status'] == 150) {
        this.snackBar.open("agora is not responding please try again later ", '', {
          duration: 2000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
        this.loader = false;
        // this.router.navigate(['admin/caf//enterprice/list'])
        //  this.getcustomer();
        //   this.opensideBar('addFormPanel', null);

      }else if (res['status'] == 250) {
        this.snackBar.open("OLT is DOWN. Please Try Again Later ", '', {
          duration: 2000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
        this.loader = false;
        // this.router.navigate(['admin/caf//enterprice/list'])
        //  this.getcustomer();
        //   this.opensideBar('addFormPanel', null);

      }


    });
  }

  getcafid() {
    console.log("CAFID")
    const rte = `caf/cafid`;
    this.crdsrv.get(rte).subscribe((res) => {
      this.cafid = res['data']
      console.log(this.cafid)
      this.firstFormGroup.get('custInfo').get('caf_id').setValue(this.cafid)
    }, (error) => {
      console.log(error);
    });
  }
  pop() {
    // console.log(event)
    //console.log(this.firstFormGroup.value.pop_id)
    this.firstFormGroup.get('cpe_pop_id').setValue(this.firstFormGroup.get("custInfo").value.pop_id)
    const rte = `olt/getOltdtls/` + this.firstFormGroup.get("custInfo").value.pop_id;
    this.crdsrv.get(rte).subscribe((res) => {
      this.oltDtls = res['data'];
      console.log(res['data'])
      if (res['data'].length == 0) {
        this.snackBar.open("No ports assigned", '', {
          duration: 2000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
        this.loader = false;
      }
    })
    const rte1 = `caf/poploc/` + this.firstFormGroup.get("custInfo").value.pop_id;
    this.crdsrv.get(rte1).subscribe((res) => {
      this.poploc = res['data'];
      console.log(res['data'])

    })
  }
  testForm(){
    console.log(this.firstFormGroup)
  }

  // onCellClick(event) {
  //   console.log(event);
  //   if (event.cellElement.innerText == 'Edit') {
  //     // this.editentry(event.data);
  //     let data = [{
  //       "id": 1,
  //       "mndl": event.instl_mndle_id

  //     }, {
  //       "id": 2,
  //       "mndl": event.blng_mndle_id,
  //     }]
  //     let data1 = [{
  //       "id": 1,
  //       "vlg": event.instl_cty_id

  //     }, {
  //       "id": 2,
  //       "vlg": event.blng_cty_id,
  //     }]
  //     this.deleteCstmr = false;
  //     // this.opensideBar('addFormPanel', event.data);
  //     this.getStates();
  //     this.getDistricts();
  //     this.getMandals(data);
  //     this.getvillages(data1);

  //   } else if (event.cellElement.innerText == 'Delete') {
  //     this.deleteCstmr = true;
  //     // this.opensideBar('addFormPanel', event.data);
  //   }

  // }

 
  onnode(data) {
    console.log(data)
    // this.firstFormGroup.get('custInfo').get('caf_id').setValue(this.frmData.caf_nu)
    this.firstFormGroup.get('custInfo').get('adhr_nu').setValue(data.adhr_nu)
    // this.firstFormGroup.get('custInfo').get('caf_id').setValue(this.frmData.caf_nu)
    // this.firstFormGroup.get('custInfo').get('custmrTyp').setValue(this.frmData.adhr_nu)
    this.firstFormGroup.get('custInfo').get('tle_nm').setValue(data.tle_nm)
    this.firstFormGroup.get('custInfo').get('frst_nm').setValue(data.frst_nm)
    this.firstFormGroup.get('custInfo').get('mdlr_nm').setValue(data.mdlr_nm)
    this.firstFormGroup.get('custInfo').get('lst_nm').setValue(data.lst_nm)
    this.firstFormGroup.get('custInfo').get('gndr_id').setValue(data.gndr_id)
    this.firstFormGroup.get('custInfo').get('dob_dt').setValue(data.dob_dt)
    this.firstFormGroup.get('custInfo').get('rltve_nm').setValue(data.rltve_nm)

    this.firstFormGroup.get('custInfo').get('pan_nu').setValue(data.pan_nu)
    this.firstFormGroup.get('custInfo').get('loc_eml1_tx').setValue(data.loc_eml1_tx)
    this.firstFormGroup.get('custInfo').get('loc_lmdle1_nu').setValue(data.cntct_mble1_nu)

    this.firstFormGroup.get('custInfo').get('frqncy_id').setValue(data.frqncy_id)
    this.firstFormGroup.get('custInfo').get('actvn_dt').setValue(data.actvn_dt)
    this.firstFormGroup.get('custInfo').get('instl_house_flat_no').setValue(data.instl_addr1_tx)
    this.firstFormGroup.get('custInfo').get('instl_buildingname').setValue(data.instl_addr2_tx)
    this.firstFormGroup.get('custInfo').get('instl_streetname').setValue(data.instl_lcly_tx)
    this.firstFormGroup.get('custInfo').get('loc_lcly_tx').setValue(data.instl_ara_tx)
    this.firstFormGroup.get('custInfo').get('instl_pincode').setValue(data.blng_pn_cd)


    this.firstFormGroup.get('custInfo').get('loc_vlge_id').setValue(data.instl_vlge_id)
    this.firstFormGroup.get('custInfo').get('blng_cntct_nm').setValue(data.blng_cntct_nm)
    this.firstFormGroup.get('custInfo').get('mbl_nu').setValue(data.cntct_mble1_nu)
    this.firstFormGroup.get('custInfo').get('blng_eml1_tx').setValue(data.loc_eml1_tx)
    this.firstFormGroup.get('custInfo').get('blng_house_flat_no').setValue(data.blng_addr1_tx)
    this.firstFormGroup.get('custInfo').get('blng_buildingname').setValue(data.blng_addr2_tx)
    this.firstFormGroup.get('custInfo').get('blng_streetname').setValue(data.blng_lcly_tx)
    this.firstFormGroup.get('custInfo').get('blng_lcly_tx').setValue(data.blng_ara_tx)
    this.firstFormGroup.get('custInfo').get('blng_pn_cd').setValue(data.blng_pn_cd)
    this.firstFormGroup.get('custInfo').get('blng_vlge_id').setValue(data.blng_ste_id)
    this.firstFormGroup.get('custInfo').get('blng_std_cd').setValue(data.blng_std_cd)
    this.firstFormGroup.get('custInfo').get('blng_lnd_nu').setValue(data.blng_lmdle1_nu)
    this.firstFormGroup.get('custInfo').get('loc_std_cd').setValue(data.blng_std_cd)
    this.firstFormGroup.get('custInfo').get('loc_lnd_nu').setValue(data.blng_lmdle1_nu)
  }

  ngOnDestroy() {
    this.TransfereService.ClearLocalData('cafData')

  }

}
