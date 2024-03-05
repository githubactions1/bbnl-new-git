import { Component, OnInit, ViewChild } from '@angular/core';
import { CrudService } from 'app/main/apps/crud.service';
import { DsSidebarService } from '@glits/components/sidebar/sidebar.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
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
import { bool } from 'aws-sdk/clients/signer';


interface Enti {
  value: string;
  viewValue: string;
}
interface vewdel {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-caf-updation-new',
  templateUrl: './caf-updation-new.component.html',
  styleUrls: ['./caf-updation-new.component.scss']
})
export class CafUpdationNewComponent implements OnInit {
  cafupdfrm: FormGroup;
  profilefrm: FormGroup;
  addonfrm: FormGroup;
  slide: FormGroup;
  // horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  // verticalPosition: MatSnackBarVerticalPosition = 'top';


  // pon_opernt:boolean = false;
  slider_show = false;

  boxchngtyp = []

  internepack = []
  upstrm_prfl_nm = false;
  subs_prfle_nm = false;
  srvce_pack = false;
  new_ip_aadrs = false;
  new_caard = false;
  new_pon_numbr = false;
  new_onu_iD = false;


  caf_num
  sbscr_cd
  cafstslst = []
  cafdata = []
  msgin: boolean;
  nocafdtls: boolean;
  message;
  message1;
  showdata: boolean;
  prfleredcecls: boolean = false;
  splprfleredcecls: boolean = false;
  addonchckclls: boolean = false;
  addonchck: boolean = false;
  interpack: boolean = false;
  pedmain: boolean = false;
  pondelete: boolean = false;
  agoracd: any;
  de_lte;
  ponpackdelte: boolean = false;
  Agh_Agh_Hsi_Iptv_push = false;
  Agh_Agh_Hsi_Iptv_del = false;
  Agh_Agh_Hsi_push = false;
  Agh_Agh_Hsi_del = false;
  Das_das_Hsi_del = false;
  Das_das_Hsi_push = false;
  Das_Das_Iptv_Hsi_del = false;
  Das_Das_Iptv_Hsi_push = false;
  Agh_Das_Hsi_push = false;
  Agh_Das_Hsi_del = false;
  Agh_Das_Hsi_Iptv_del = false;
  Agh_Das_Hsi_Iptv_push = false;
  Das_Agh_Hsi_push = false;
  Das_Agh_Hsi_del = false;
  Das_Agh_Hsi_Iptv_del = false;
  Das_Agh_Hsi_Iptv_push = false;

  loader: boolean;
  getHeaderDtls = function () { return { "title": "Curl Operation And Updation", "icon": "receipt" } }
  trmndChecked: boolean;
  spsndChecked: boolean;
  actvChecked: boolean;
  trmndInd: any;
  spsndInd: any;
  actvInd: any;
  trmndDisable: boolean = true;
  actvDisable: boolean = true;
  spsndDisable: boolean = true;

  edibtnenble: boolean = false;
  etnble123: boolean = false;
  etnble234: boolean = false;
  etnble345: boolean = false;
  etnble567: boolean = false;
  etnble678: boolean = false;
  etnble789: boolean = false;

  boxenb: boolean = false;
  boxenb2: boolean = false;
  boxenb3: boolean = false;

  ponchg123: boolean = false;
  ponchg234: boolean = false;
  ponchg345: boolean = false;

  ponchgagh_das123: boolean = false;
  ponchgagh_das234: boolean = false;
  ponchgagh_das345: boolean = false;
  ponchgagh_das456: boolean = false;

  repng123: boolean = false;
  repng234: boolean = false;
  repng345: boolean = false;
  repng456: boolean = false;

  suspnd123: boolean = false;
  suspnd234: boolean = false;
  suspnd345: boolean = false;
  suspnd456: boolean = false;

  daspndg123: boolean = false;
  daspndg234: boolean = false;
  daspndg345: boolean = false;
  daspndg456: boolean = false;
  daspndg567: boolean = false;
  daspndg678: boolean = false;

  pndg123: boolean = false;
  pndg234: boolean = false;
  pndg345: boolean = false;
  pndg567: boolean = false;
  pndg678: boolean = false;
  pndg789: boolean = false;
  pndg891: boolean = false;

  ponadd123: boolean = false;
  ponadd234: boolean = false;
  ponadd345: boolean = false;
  ponadd567: boolean = false;
  ponadd678: boolean = false;
  ponadd789: boolean = false;
  pndg7891: boolean = false;
  ponadd891: boolean = false;

  pendend: boolean = false;
  click: boolean = true;

  pckg: boolean = false;
  ponpackage: boolean = false;


  pack123: boolean = false;
  pack234: boolean = false;
  pack345: boolean = false;

  DAS_DAS_HSI_1: boolean = false;
  DAS_DAS_HSI_2: boolean = false;
  DAS_DAS_HSI_3: boolean = false;



  PonPack123: boolean = false;
  PonPack234: boolean = false;
  PonPack345: boolean = false;
  PonPack456: boolean = false;
  PonPack567: boolean = false;

  Packdt123: boolean = false;
  Packdt234: boolean = false;
  Packdt345: boolean = false;

  internetpack: boolean = false;

  Reduced: boolean = false;

  chnged_srl_nu;
  onudtls;
  iptvDtls;
  chnged_iptv_mac_in = 0;
  chnged_srl_nu_in = 0;
  splts
  spltDtls
  onu
  crd
  agrcd_chngd: boolean = false;
  shwedtbtn: boolean;
  updateBtn: boolean = false;
  creation: boolean;
  curlRslts: any = [];
  cafstsshow: any;
  usrdtls: any;
  extapifrm: FormGroup;
  entitylst: any;
  rowData: any;
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  searchLoader: boolean = false;
  splperson: boolean = false;
  editbtn: boolean = false;
  columnDefs = [];
  showTble = false;
  actionlst: any;
  statuslst: any;
  getRowHeight;
  permissions;
  newString: string;
  addoncurlRslts;
  prflerdcecurlRslts;



  entities: Enti[] = [
    { value: '1', viewValue: 'CAF' },
    { value: '2', viewValue: 'MSO/LMO/LCO' },
  ];
  viewdel: vewdel[] = [
    { value: 'view', viewValue: 'VIEW' },
    { value: 'delete', viewValue: 'DELETE' },
  ]
  curldata: any;
  addservicedata: any;
  shwLdr: boolean;
  shwPermMsg: string;
  ponDas_DAS1: boolean = false;
  agh_das_del1: boolean = false;
  agh_das_del2: boolean = false;
  agh_das_del3: boolean = false;
  agh_das_del4: boolean = false;

  agh_das_push1: boolean = false;
  agh_das_push2: boolean = false;
  agh_das_push3: boolean = false;

  ponchngDas_Agh1: boolean = false;

  ponadddasagh1: boolean = false;
  ponadddasagh2: boolean = false;
  ponadddasagh3: boolean = false;
  ponadddasagh4: boolean = false;
  ponadddasagh5: boolean = false;

  ponDas_DAS_hsi: boolean = false;

  ponAgh_DAS_hsi: boolean = false;

  ponchngDas_Agh_hsi: boolean = false;

  das_agh_push1: boolean = false;
  das_agh_push2: boolean = false;
  //mdlwre_cd: string;

  constructor(private http: HttpClient, private _dsSidebarService: DsSidebarService, public crdsrv: CrudService, public atmSrv: AtomService, public dialog: MatDialog, public fb: FormBuilder, public datePipe: DatePipe, public snackBar: MatSnackBar, private _formBuilder: FormBuilder, public _snackBar: MatSnackBar) {
    const permTxt = 'Curl Execution New';
    const prmeRte = `user/permissions/${permTxt}`;
    this.crdsrv.get(prmeRte).subscribe((res) => {
      if (res['data']) {
        this.permissions = res['data'][0];
      } else {
        this.shwPermMsg = 'You do not have permissions to do this operation. Please contact Administrator to get permissions.';
      }
    });
    // this.permissions = { "slct_in": 1, "insrt_in": 1, "updt_in": 1, "dlte_in": 1, "exprt_in": 0 }
    this.shwPermMsg = 'You do not have permissions to do this operation. Please contact Administrator to get permissions.';
  }

  ngOnInit() {
    // let namePattern = /^[a-zA-Z \s]+$/;
    // let cardPattern = /^\d\.\d{0,2}$/;
    // let ipad = /^([0-9]{1,3})\.([0-9]{1,3})\.([0-9]{1,3})\.([0-9]{1,3})$/;
    //let numberPattern = ;
    this.usrdtls = JSON.parse(localStorage.getItem("usrDtls"));
    this.getcafsts();
    this.creation = false;
    this.msgin = true;
    this.nocafdtls = false;
    this.showdata = false;
    if (this.usrdtls.mrcht_usr_id == 101090446 || this.usrdtls.mrcht_usr_id == 103013104 || this.usrdtls.mrcht_usr_id == 101090725 || this.usrdtls.mrcht_usr_id == 134000424 || this.usrdtls.mrcht_usr_id == 113005153 || this.usrdtls.mrcht_usr_id == 134000497 || this.usrdtls.mrcht_usr_id == 101062702)
      this.Reduced = true;
    if (this.usrdtls.mrcht_usr_id == 101000312)
      this.splperson = true
    if (this.usrdtls.mrcht_usr_id == 101090446 || this.usrdtls.mrcht_usr_id == 103013104 || this.usrdtls.mrcht_usr_id == 101090725 || this.usrdtls.mrcht_usr_id == 134000424 || this.usrdtls.mrcht_usr_id == 113005153)
      this.addonchck = true;
    this.message = 'Please Enter CAF Number or Subscriber Code To Get Details';

    this.profilefrm = this.fb.group({
      aaa_cd: [''],
      de_lte: ['', [Validators.required]],
      acce_id: ['', [Validators.required]],
      up_stream: ['', Validators.required],
      down_stream: ['', Validators.required],
    })
    this.addonfrm = this.fb.group({
      mdl_wre_cd: ['', [Validators.required]],
      service_pack_nm: ['', [Validators.required]]
    })

    this.cafupdfrm = this.fb.group({
      aaa_cd: new FormControl(''),
      agora_cd: new FormControl(''),
      aga_cd: new FormControl(''),
      mdlwre_cd: new FormControl(''),
      enty_sts_id: new FormControl(''),
      onu_srl_nu: new FormControl(''),
      old_agora_srl_nu: new FormControl(''),
      agora_srl_nu: new FormControl(''),
      onu_mac_addr: new FormControl(''),
      iptv_srl_nu: new FormControl(''),
      iptv_mac_addr: new FormControl(''),
      trmnd_in: new FormControl(''),
      trmnd_dt: new FormControl(''),
      spnd_in: new FormControl(''),
      spnd_ts: new FormControl(''),
      actve_in: new FormControl(''),
      actv_dt: new FormControl(''),
      onu_mdle_cd: new FormControl(''),
      pckge_id: new FormControl(''),


      service_pack: ['', [Validators.required]],
      ip_adr: ['', [Validators.required]],
      crd: ['', [Validators.required]],
      pon: ['', Validators.required],
      onu: ['', Validators.required],
      iptv_mac_new: ['', [Validators.required]],
      lst_nm: ['', [Validators.required]],
      cstmr_nm: ['', [Validators.required]],
      caf_nu: ['', [Validators.required]],
      up_stream: ['', Validators.required],
      olt_crd_nu: ['', [Validators.required]],
      olt_onu_id: ['', [Validators.required]],
      down_stream: ['', [Validators.required]],
      de_lte: ['', [Validators.required]],
      expry_date: ['', [Validators.required]],
      old_pon_das: ['', [Validators.required]],
      old_pon_das1: ['', [Validators.required]],
      new_pon_das: ['', [Validators.required]],
      new_crd_das: ['', [Validators.required]],
      new_ip_adr_das: ['', [Validators.required]],
      new_onu_id_das: ['', [Validators.required]],
      new_ip_addr_agh_das: ['', Validators.required],
      new_card_agh_das: ['', Validators.required],
      new_pon_agh_das: ['', Validators.required],
      new_onu_id_agh_das: ['', Validators.required],


      device_id: ['', [Validators.required]],
      device_cat: ['', [Validators.required]],
      partner_code: ['', [Validators.required]],
      title: ['', [Validators.required]],
      first_nm: ['', [Validators.required]],
      last_nm: ['', [Validators.required]],
      cnt_no: ['', [Validators.required]],
      email_id: ['', [Validators.required]],
      identity_proof: ['', [Validators.required]],
      addrs: ['', [Validators.required]],
      vilage: ['', [Validators.required]],
      mdl: ['', [Validators.required]],
      dsrtc_cde: ['', [Validators.required]],
      state_cde: ['', [Validators.required]],
      country_cde: ['', [Validators.required]],
      cnt_is: ['', [Validators.required]],
      remark: ['', [Validators.required]],
      caf_numb: ['', [Validators.required]],
      strt_dt: ['', [Validators.required]],
      acce_id: ['', [Validators.required]],


    });


    this.slide = this._formBuilder.group({
      slider1: new FormControl(false),
      slider2: new FormControl(false),
      slider3: new FormControl(false),
      slider4: new FormControl(false),
    })

    this.extapifrm = this._formBuilder.group({
      entity: ['', Validators.required],
      entyid: ['', Validators],
      action: ['', Validators],
      status: ['', Validators],

      str_dt: ['', Validators],
      end_dt: ['', Validators],
      till_dt: ['', Validators],


    });
    this.getentity()


    this.boxchngtyp = [
      { id: 1, type: " Only IPTV" },
      { id: 2, type: "Only ONU" },
      { id: 3, type: "Both" }
    ]
    console.log('caf frm cafupdfrm', this.cafupdfrm.value)
  }


  onSlideToggleChange(sliderName: string): void {
    // Set other sliders to false when one slider is toggled
    Object.keys(this.slide.controls).forEach((controlName) => {
      if (controlName !== sliderName) {
        this.slide.get(controlName).setValue(false);
      }

      if (this.slide.get("slider1").value == false) {
        this.ponchg123 = false;
        this.ponchg234 = false;
        this.ponchg345 = false;
        this.Packdt123 = false;
        this.Packdt234 = false;
        this.Packdt345 = false;
        this.PonPack234 = false;
        this.PonPack345 = false;
        this.PonPack456 = false;
        this.ponadd234 = false;
        this.ponadd345 = false;
        this.ponadd567 = false;
        this.ponadd678 = false;
        this.ponadd789 = false;
        this.ponadd891 = false;
        this.Agh_Agh_Hsi_push = false;
        this.Agh_Agh_Hsi_del = false;
        this.Agh_Agh_Hsi_Iptv_del = false;
        this.Agh_Agh_Hsi_Iptv_push = false;
      } else {
        // console.log("Slider1 trigger",this.ponpackdelte)
        if (this.ponpackdelte && this.slide.get('slider1').value && this.interpack && this.ponpackage) {
          this.Agh_Agh_Hsi_del = true;
          this.Agh_Agh_Hsi_push = true;
        } else if (this.pondelete && this.slide.get('slider1')) {
          this.Agh_Agh_Hsi_Iptv_del = true;
          this.Agh_Agh_Hsi_Iptv_push = true
        }

      }
      if (this.slide.get("slider2").value == false) {
        this.ponDas_DAS1 = false;
        this.ponDas_DAS_hsi = false;
        this.Das_das_Hsi_del = false;
        this.Das_das_Hsi_push = false;
        this.Das_Das_Iptv_Hsi_del = false;
        this.Das_Das_Iptv_Hsi_push = false;
        this.cafupdfrm.get('new_ip_adr_das').clearValidators();
        this.cafupdfrm.get('new_ip_adr_das').updateValueAndValidity();
        this.cafupdfrm.get('new_crd_das').clearValidators();
        this.cafupdfrm.get('new_crd_das').updateValueAndValidity();
        this.cafupdfrm.get('new_pon_das').clearValidators();
        this.cafupdfrm.get('new_pon_das').updateValueAndValidity();
        this.cafupdfrm.get('new_onu_id_das').clearValidators();
        this.cafupdfrm.get('new_onu_id_das').updateValueAndValidity();

      } else {
        if (this.ponpackage && this.slide.get('slider2').value) {
          this.Das_das_Hsi_del = true;
          this.Das_das_Hsi_push = true;
        } else if (this.pondelete && this.slide.get('slider2').value) {
          this.Das_Das_Iptv_Hsi_del = true;
          this.Das_Das_Iptv_Hsi_push = true;
        }
      }
      if (this.slide.get("slider3").value == false) {
        this.ponchgagh_das123 = false;
        this.ponchgagh_das234 = false;
        this.ponchgagh_das345 = false;
        this.ponchgagh_das456 = false;
        this.agh_das_del1 = false;
        this.agh_das_del2 = false;
        this.agh_das_del3 = false;
        this.agh_das_del4 = false;
        this.agh_das_push1 = false;
        this.agh_das_push2 = false;
        this.agh_das_push3 = false;
        this.ponAgh_DAS_hsi = false;
        this.Agh_Das_Hsi_del = false;
        this.Agh_Das_Hsi_push = false;
        this.Agh_Das_Hsi_Iptv_del = false;
        this.Agh_Das_Hsi_Iptv_push = false;
        this.cafupdfrm.get('new_ip_addr_agh_das').clearValidators();
        this.cafupdfrm.get('new_ip_addr_agh_das').updateValueAndValidity();
        this.cafupdfrm.get('new_card_agh_das').clearValidators();
        this.cafupdfrm.get('new_card_agh_das').updateValueAndValidity();
        this.cafupdfrm.get('new_pon_agh_das').clearValidators();
        this.cafupdfrm.get('new_pon_agh_das').updateValueAndValidity();
        this.cafupdfrm.get('new_onu_id_agh_das').clearValidators();
        this.cafupdfrm.get('new_onu_id_agh_das').updateValueAndValidity();

      } else {
        if (this.ponpackdelte && this.slide.get('slider3').value && this.interpack) {
          this.Agh_Das_Hsi_del = true;
          this.Agh_Das_Hsi_push = true;
        }
        else if (this.pondelete && this.slide.get('slider3').value) {
          this.Agh_Das_Hsi_Iptv_del = true
          this.Agh_Das_Hsi_Iptv_push = true

        }
      }
      if (this.slide.get("slider4").value == false) {
        this.ponchngDas_Agh_hsi = false;
        this.ponchngDas_Agh1 = false;
        this.ponadddasagh1 = false;
        this.ponadddasagh2 = false;
        this.ponadddasagh3 = false;
        this.ponadddasagh4 = false;
        this.ponadddasagh5 = false;


        this.das_agh_push1 = false;
        this.das_agh_push2 = false;
        this.Das_Agh_Hsi_push = false;
        this.Das_Agh_Hsi_del = false;
        this.Das_Agh_Hsi_Iptv_push = false;
        this.Das_Agh_Hsi_Iptv_del = false;
        this.cafupdfrm.get("up_stream").setValidators(null)
        this.cafupdfrm.get("aaa_cd").setValidators(null)
        this.cafupdfrm.get("down_stream").setValidators(null)
      } else {
        if (this.ponpackage && this.slide.get('slider4').value) {
          this.Das_Agh_Hsi_push = true;
          this.Das_Agh_Hsi_del = true;
        }
        else if (this.pondelete && this.slide.get('slider4').value) {
          this.Das_Agh_Hsi_Iptv_push = true;
          this.Das_Agh_Hsi_Iptv_del = true
        }
      }
    });
  }

  splprflereducecalls() {
    this.splprfleredcecls = !this.splprfleredcecls;
  }
  prflereducecalls() {
    this.prfleredcecls = !this.prfleredcecls;
  }
  addonchckcall() {
    this.addonchckclls = !this.addonchckclls;
  }
  getcafsts() {

    let rte1 = `caf/getcafsts`;
    this.crdsrv.get(rte1).subscribe((res) => {
      if (res['status'] == 200) {
        this.cafstslst = res['data'];

      }
    }, (error) => {
    });
  }


  getDtls() {
    this.slide.reset();
    this.Das_Agh_Hsi_Iptv_push = false;
    this.Das_Agh_Hsi_Iptv_del = false;
    this.Das_Agh_Hsi_push = false;
    this.Das_Agh_Hsi_del = false;
    this.Agh_Das_Hsi_Iptv_del = false
    this.Agh_Das_Hsi_Iptv_push = false
    this.Agh_Das_Hsi_push = false
    this.Agh_Das_Hsi_del = false;
    this.Das_Das_Iptv_Hsi_push = false;
    this.Das_Das_Iptv_Hsi_del = false;
    this.Das_das_Hsi_del = false;
    this.Das_das_Hsi_push = false;
    this.Agh_Agh_Hsi_Iptv_push = false;
    this.Agh_Agh_Hsi_Iptv_del = false;
    this.Agh_Agh_Hsi_push = false
    this.Agh_Agh_Hsi_del = false;
    this.agh_das_push1 = false;
    this.agh_das_push2 = false;
    this.agh_das_push3 = false;
    this.ponDas_DAS1 = false;
    this.ponAgh_DAS_hsi = false;
    this.ponDas_DAS_hsi = false;
    this.agh_das_del1 = false;
    this.agh_das_del2 = false;
    this.agh_das_del3 = false;
    this.agh_das_del4 = false;
    this.ponchngDas_Agh_hsi = false;
    this.das_agh_push1 = false;
    this.das_agh_push2 = false;
    this.ponadddasagh1 = false;
    this.ponadddasagh2 = false;
    this.ponadddasagh3 = false;
    this.ponadddasagh4 = false;
    // this.pon_opernt = false;
    this.slider_show = false;
    this.curlRslts = null;
    this.agrcd_chngd = false;
    this.prfleredcecls = false;
    this.msgin = false;
    this.creation = true;
    this.nocafdtls = false;
    this.loader = true;
    this.edibtnenble = false;
    this.etnble123 = false;
    this.etnble234 = false;
    this.etnble345 = false;
    this.etnble567 = false;
    this.etnble678 = false;
    this.etnble789 = false;
    this.boxenb = false;
    this.boxenb2 = false;
    this.boxenb3 = false;
    this.ponchgagh_das123 = false;
    this.ponchgagh_das234 = false;
    this.ponchgagh_das345 = false;
    this.ponchgagh_das456 = false;
    this.ponchg123 = false;
    this.ponchg234 = false;
    this.ponchg345 = false;
    this.repng123 = false;
    this.repng234 = false;
    this.repng345 = false;
    this.repng456 = false;
    this.suspnd123 = false;
    this.suspnd234 = false;
    this.suspnd345 = false;
    this.suspnd456 = false;
    this.daspndg123 = false;
    this.daspndg234 = false;
    this.daspndg345 = false;
    this.daspndg456 = false;
    this.daspndg567 = false;
    this.daspndg678 = false;
    this.pndg123 = false;
    this.pndg234 = false;
    this.pndg345 = false;
    this.pndg567 = false;
    this.pndg678 = false;
    this.pndg789 = false;
    this.pndg891 = false;
    this.ponadd123 = false;
    this.ponadd234 = false;
    this.ponadd345 = false;
    this.ponadd567 = false;
    this.ponadd678 = false;
    this.ponadd789 = false;
    this.pndg7891 = false;
    this.ponadd891 = false;
    this.pendend = false;
    this.pckg = false;
    this.ponpackage = false;
    this.DAS_DAS_HSI_1 = false;
    this.DAS_DAS_HSI_2 = false;
    this.DAS_DAS_HSI_3 = false;
    this.pack123 = false;
    this.pack234 = false;
    this.pack345 = false;
    this.PonPack123 = false;
    this.PonPack234 = false;
    this.PonPack345 = false;
    this.PonPack456 = false;
    this.PonPack567 = false;
    this.internetpack = false;
    this.interpack = false;
    this.pedmain = false;
    this.pondelete = false;
    this.ponpackdelte = false;
    this.Packdt123 = false;
    this.Packdt234 = false;
    this.Packdt345 = false;
    this.updateBtn = false;

    let data = {
      caf_id: this.caf_num,
      subscr_cd: this.sbscr_cd
    }
    let rte1 = `caf/getcafdtls/`;
    this.crdsrv.create(data, rte1).subscribe((res) => {
      if (res['status'] == 200) {
        if (res['data'].length > 0) {
          this.loader = false;
          this.showdata = true;
          this.cafdata = res['data'];
          console.log(this.cafdata[0].enty_sts_id)
          console.log(this.cafdata)
          if (this.cafdata[0].enty_sts_id == 6) {
            this.cafstsshow = "disabled"

            this.cafupdfrm.controls['enty_sts_id'].disable();
          }
          if (this.cafdata[0].enty_sts_id == 11) {
            this.click = false;
          }
          if (this.usrdtls.mrcht_usr_id == 101090446 || this.usrdtls.mrcht_usr_id == 103013104 || this.usrdtls.mrcht_usr_id == 101090725 || this.usrdtls.mrcht_usr_id == 134000424 || this.usrdtls.mrcht_usr_id == 113005153) {
            this.editbtn = true;
          } else if (this.cafdata[0].enty_sts_id == 6 || this.cafdata[0].enty_sts_id == 1 || this.cafdata[0].enty_sts_id == 10 || this.cafdata[0].enty_sts_id == 11) {
            this.editbtn = true;
          } else {
            this.editbtn = false;
          }
          if (this.cafdata[0].pckge_id == 9000001 ||
            this.cafdata[0].pckge_id == 9000000 ||
            this.cafdata[0].pckge_id == 8000007 ||
            this.cafdata[0].pckge_id == 10000000 ||
            this.cafdata[0].pckge_id == 3000118 ||
            this.cafdata[0].pckge_id == 502 ||
            this.cafdata[0].pckge_id == 63 ||
            this.cafdata[0].pckge_id == 62 ||
            this.cafdata[0].pckge_id == 61 ||
            this.cafdata[0].pckge_id == 59 ||
            this.cafdata[0].pckge_id == 58 ||
            this.cafdata[0].pckge_id == 3000135 ||
            this.cafdata[0].pckge_id == 57 ||
            this.cafdata[0].pckge_id == 53 ||
            this.cafdata[0].pckge_id == 56 ||
            this.cafdata[0].pckge_id == 54
          ) {
            this.cafstsshow = "disabled"
            this.cafupdfrm.controls['pckge_id'].disable();
            this.interpack = true;
            this.pckg = true;
            this.pedmain = false;
            this.pondelete = false;
            this.internetpack = true;
            this.ponpackage = true;
          }

          else {
            this.cafupdfrm.get('enty_sts_id').enable();
            this.cafstsshow = "enabled";
            this.interpack = false;
            this.pckg = false;
            this.pedmain = true;
            this.pondelete = true;
            this.internetpack = false;

          }
          if (this.caf_num) {
            this.shwedtbtn = true;
          }
          if (this.sbscr_cd) {
            this.shwedtbtn = false;
          }
          // console.log(this.cafdata)
          if (this.cafdata[0].trmnd_in == 0) {
            this.trmndChecked = false;
            this.trmndInd = 0;
          } else {
            this.trmndInd = 1
            this.trmndChecked = true;
          }
          if (this.cafdata[0].spnd_in == 0) {
            this.spsndChecked = false;
            this.spsndInd = 0
          } else {
            this.spsndChecked = true;
            this.spsndInd = 1;
          }
          if (this.cafdata[0].actve_in == 0) {
            this.actvChecked = false;
            this.actvInd = 0;
          } else {
            this.actvChecked = true;
            this.actvInd = 1
          }


          //   //split
          this.agoracd = this.cafdata[0].aghra_cd;
          const agarr = this.agoracd.split("-H");
          this.agoracd = agarr[0];

          this.cafupdfrm.disable();
          this.cafupdfrm.get('aaa_cd').setValue(this.cafdata[0].aaa_cd);
          this.cafupdfrm.get('agora_cd').setValue(this.cafdata[0].aghra_cd);
          this.cafupdfrm.get('aga_cd').setValue(this.agoracd);
          this.cafupdfrm.get('mdlwre_cd').setValue(this.cafdata[0].mdlwe_sbscr_id);
          this.cafupdfrm.get('enty_sts_id').setValue(this.cafdata[0].enty_sts_id);
          this.cafupdfrm.get('pckge_id').setValue(this.cafdata[0].pckge_id);
          this.cafupdfrm.get('onu_srl_nu').setValue(this.cafdata[0].onu_srl_nu);
          this.cafupdfrm.get('onu_mac_addr').setValue(this.cafdata[0].onu_mac_addr_tx);
          this.cafupdfrm.get('iptv_srl_nu').setValue(this.cafdata[0].iptv_srl_nu);
          this.cafupdfrm.get('iptv_mac_addr').setValue(this.cafdata[0].iptv_mac_addr_tx);
          this.cafupdfrm.get('trmnd_dt').setValue(this.cafdata[0].trmnd_dt);
          this.cafupdfrm.get('spnd_ts').setValue(this.cafdata[0].spnd_ts);
          this.cafupdfrm.get('actv_dt').setValue(this.cafdata[0].actvn_dt);
          this.cafupdfrm.get('onu_mdle_cd').setValue(this.cafdata[0].mdle_cd);
          this.cafupdfrm.get('ip_adr').setValue(this.cafdata[0].ip_adr);
          this.cafupdfrm.get('iptv_mac_new').setValue(this.cafdata[0].iptv_mac_new_tx);
          this.cafupdfrm.get('first_nm').setValue(this.cafdata[0].frst_nm);
          this.cafupdfrm.get('lst_nm').setValue(this.cafdata[0].lst_nm);
          this.cafupdfrm.get('cnt_no').setValue(this.cafdata[0].mbl_nu);
          this.cafupdfrm.get('title').setValue(this.cafdata[0].tle_nm);
          this.cafupdfrm.get('addrs').setValue(this.cafdata[0].address);
          this.cafupdfrm.get('vilage').setValue(this.cafdata[0].vlge_nm);
          this.cafupdfrm.get('mdl').setValue(this.cafdata[0].mndl_nm);
          this.cafupdfrm.get('dsrtc_cde').setValue(this.cafdata[0].dstrt_nm);
          this.cafupdfrm.get('cstmr_nm').setValue(this.cafdata[0].cstmr_nm);
          this.cafupdfrm.get('caf_nu').setValue(this.cafdata[0].caf_nu);
          this.cafupdfrm.get('up_stream').setValue(this.cafdata[0].up_stream);
          this.cafupdfrm.get('down_stream').setValue(this.cafdata[0].down_stream);
          this.cafupdfrm.get('olt_crd_nu').setValue(this.cafdata[0].olt_crd_nu);
          this.cafupdfrm.get('olt_onu_id').setValue(this.cafdata[0].olt_onu_id);
          this.cafupdfrm.get('pon').setValue(this.cafdata[0].pon);
          this.cafupdfrm.get('de_lte').setValue(this.cafdata[0].de_lte);
          this.cafupdfrm.get('expry_date').setValue(this.cafdata[0].expry_date);


          if (this.cafdata[0].onu_srl_nu.startsWith('dsnw')) {
            console.log("came to caps")
            this.cafupdfrm.get('agora_srl_nu').setValue(this.cafdata[0].onu_srl_nu.replace('dsnw', '44534E57'));
          } else if (this.cafdata[0].onu_srl_nu.startsWith('DSNW')) {
            this.cafupdfrm.get('agora_srl_nu').setValue(this.cafdata[0].onu_srl_nu.replace('DSNW', '44534E57'));
          } else if (this.cafdata[0].onu_srl_nu.startsWith('zteg')) {
            this.cafupdfrm.get('agora_srl_nu').setValue(this.cafdata[0].onu_srl_nu.replace('zteg', '5A544547'));

          } else if (this.cafdata[0].onu_srl_nu.startsWith('ZTEG')) {
            this.cafupdfrm.get('agora_srl_nu').setValue(this.cafdata[0].onu_srl_nu.replace('ZTEG', '5A544547'));

          } else if (this.cafdata[0].onu_srl_nu.startsWith('YGE1')) {
            console.log("YAGA")
            this.cafupdfrm.get('agora_srl_nu').setValue(this.cafdata[0].onu_srl_nu.replace('YGE1', '59474531'));

          } else if (this.cafdata[0].onu_srl_nu.startsWith('yge1')) {
            console.log("YAGA")
            this.cafupdfrm.get('agora_srl_nu').setValue(this.cafdata[0].onu_srl_nu.replace('yge1', '59474531'));

          } else if (this.cafdata[0].onu_srl_nu.startsWith('KONK')) {
            this.cafupdfrm.get('agora_srl_nu').setValue(this.cafdata[0].onu_srl_nu.replace('KONK', '4B4F4E4B'));
          } else if (this.cafdata[0].onu_srl_nu.startsWith('konk')) {
            this.cafupdfrm.get('agora_srl_nu').setValue(this.cafdata[0].onu_srl_nu.replace('knok', '4B4F4E4B'));
          } else if (this.cafdata[0].onu_srl_nu.startsWith('RLGM')) {
            this.cafupdfrm.get('agora_srl_nu').setValue(this.cafdata[0].onu_srl_nu.replace('RLGM', '524C474D'));
          } else if (this.cafdata[0].onu_srl_nu.startsWith('rlgm')) {
            this.cafupdfrm.get('agora_srl_nu').setValue(this.cafdata[0].onu_srl_nu.replace('rlgm', '524C474D'));
          } else {
            this.cafupdfrm.get('agora_srl_nu').setValue(this.cafdata[0].onu_srl_nu)
          }
          // console.log(this.cafupdfrm.value.agora_srl_nu)
        }
        else {
          this.loader = false;
          this.showdata = false;
          this.msgin = false;
          this.creation = false;
          this.nocafdtls = true;
          this.message1 = "CAF Details Not Availble"
        }

      }
    }, (error) => {
    });
  }
  edit() {
    this.cafupdfrm.enable();
    // this.pon_opernt = true;
    this.spsndDisable = false;
    this.trmndDisable = false;
    this.actvDisable = false;
    this.edibtnenble = true;
    this.pendend = true;
    this.boxenb = true;
    this.updateBtn = true;
    this.cafupdfrm.get('new_ip_adr_das').clearValidators();
    this.cafupdfrm.get('new_ip_adr_das').updateValueAndValidity();
    this.cafupdfrm.get('new_crd_das').clearValidators();
    this.cafupdfrm.get('new_crd_das').updateValueAndValidity();
    this.cafupdfrm.get('new_pon_das').clearValidators();
    this.cafupdfrm.get('new_pon_das').updateValueAndValidity();
    this.cafupdfrm.get('new_onu_id_das').clearValidators();
    this.cafupdfrm.get('new_onu_id_das').updateValueAndValidity();
    this.cafupdfrm.get('new_ip_addr_agh_das').clearValidators();
    this.cafupdfrm.get('new_ip_addr_agh_das').updateValueAndValidity();
    this.cafupdfrm.get('new_card_agh_das').clearValidators();
    this.cafupdfrm.get('new_card_agh_das').updateValueAndValidity();
    this.cafupdfrm.get('new_pon_agh_das').clearValidators();
    this.cafupdfrm.get('new_pon_agh_das').updateValueAndValidity();
    this.cafupdfrm.get('new_onu_id_agh_das').clearValidators();
    this.cafupdfrm.get('new_onu_id_agh_das').updateValueAndValidity();
    this.cafupdfrm.get('down_stream').clearValidators();
    this.cafupdfrm.get('down_stream').updateValueAndValidity();
    this.cafupdfrm.get('lst_nm').clearValidators();
    this.cafupdfrm.get('lst_nm').updateValueAndValidity();

    if (this.cafdata[0].enty_sts_id === 11) {
      this.slider_show = true;
    }

    if (this.internetpack == true) {
      this.pedmain = false;
      this.pckg = true;
      this.pondelete = false;
      this.ponpackage = true;
      this.ponpackdelte = true;
      this.onDasanBlur();
    } else {
      this.pckg = false;
      this.pedmain = true;
      this.ponpackage = false;
      this.pondelete = true;
      this.ponpackdelte = false;
      this.onDasanBlur();
    }
    if (this.ponpackage) {
      this.Das_das_Hsi_del = true;
      this.Das_das_Hsi_push = true;
    } else if (this.pondelete) {
      this.Das_Das_Iptv_Hsi_del = true;
      this.Das_Das_Iptv_Hsi_push = true;
    }

  }

  cancel() {
    this.cafupdfrm.reset()
    this.caf_num = ''
    this.sbscr_cd = ''
    this.msgin = true;
    this.creation = true;
    this.nocafdtls = false;
    this.showdata = false;
    this.edibtnenble = false;
    this.spsndDisable = true;
    this.trmndDisable = true;
    this.actvDisable = true;
    this.pendend = false;
    this.boxenb = false;
    this.pckg = false;
  }


  Updtcafdtls() {
    this.loader = true;
    this.etnble234 = false; this.etnble345 = false; this.etnble345 = false; this.etnble567 = false; this.etnble678 = false; this.etnble789 = false;
    if (this.agrcd_chngd == true) {
      // console.log("to be pon change")
      this.cafupdfrm.value.splt_id = this.spltDtls[0].splt_id;
      this.cafupdfrm.value.splts = this.splts;
      this.cafupdfrm.value.onu = this.onu
      this.cafupdfrm.value.oldonu = this.cafdata[0].olt_onu_id
      this.cafupdfrm.value.actve_in = this.actvInd;
      this.cafupdfrm.value.spnd_in = this.spsndInd;
      this.cafupdfrm.value.trmnd_in = this.trmndInd;
      if (this.cafupdfrm.value.trmnd_dt == null || this.cafupdfrm.value.trmnd_dt == "0000-00-00") {
        this.cafupdfrm.value.trmnd_dt = ""
      }
      else {
        this.cafupdfrm.value.trmnd_dt = this.datePipe.transform(this.cafupdfrm.value.trmnd_dt, "yyyy-MM-dd");
      }
      if (this.cafupdfrm.value.spnd_ts == null || this.cafupdfrm.value.spnd_ts == "0000-00-00") {
        this.cafupdfrm.value.spnd_ts = ""
      }
      else {
        this.cafupdfrm.value.spnd_ts = this.datePipe.transform(this.cafupdfrm.value.spnd_ts, "yyyy-MM-dd");
      }
      if (this.cafupdfrm.value.actv_dt == null || this.cafupdfrm.value.actv_dt == "0000-00-00") {
        this.cafupdfrm.value.actv_dt = ""
      }
      else {
        this.cafupdfrm.value.actv_dt = this.datePipe.transform(this.cafupdfrm.value.actv_dt, "yyyy-MM-dd");
      }
      this.cafupdfrm.value.crd = this.crd
      if (!this.interpack && this.cafdata[0].caf_type_id == 1) {
        //} else if(!this.interpack && this.cafdata[0].caf_type_nm == 'INDIVIDUAL'){
        console.log("subscriber code")
        if (this.cafdata[0].mdlwe_sbscr_id == null || this.cafdata[0].mdlwe_sbscr_id == '' || this.cafdata[0].mdlwe_sbscr_id == "" || this.cafdata[0].mdlwe_sbscr_id == undefined || this.cafdata[0].mdlwe_sbscr_id == 'undefined') {
          console.log("subscriber code 1")
          if (this.cafupdfrm.value.mdlwre_cd == null || this.cafupdfrm.value.mdlwre_cd == '' || this.cafupdfrm.value.mdlwre_cd == "" || this.cafupdfrm.value.mdlwre_cd == undefined || this.cafupdfrm.value.mdlwre_cd == 'undefined') {
            this.loader = false;
            this.snackBar.open("Please check subscriber code", '', {
              duration: 3000,
              horizontalPosition: this.horizontalPosition,
              verticalPosition: this.verticalPosition,
            });
            return;
          }
        }
      }
      // console.log(this.cafupdfrm.value)
      let data = this.cafupdfrm.value
      let rte = `caf/spltsupdtn/` + this.caf_num
      this.crdsrv.create(data, rte).subscribe((res) => {
        if (res['status'] == 200) {
          this.loader = false;
          this.snackBar.open("CAF Details Updated Sucessfully", '', {
            duration: 3000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
          });
          this.cancel();
        }
      }, (error) => {
      });
    } else {
      let rte1 = `caf/cafupdtn/` + this.caf_num
      let data = this.cafupdfrm.value
      if (this.cafupdfrm.value.trmnd_dt == null || this.cafupdfrm.value.trmnd_dt == "0000-00-00") {
        this.cafupdfrm.value.trmnd_dt = ""
      }
      else {
        this.cafupdfrm.value.trmnd_dt = this.datePipe.transform(this.cafupdfrm.value.trmnd_dt, "yyyy-MM-dd");
      }
      if (this.cafupdfrm.value.spnd_ts == null || this.cafupdfrm.value.spnd_ts == "0000-00-00") {
        this.cafupdfrm.value.spnd_ts = ""
      }
      else {
        this.cafupdfrm.value.spnd_ts = this.datePipe.transform(this.cafupdfrm.value.spnd_ts, "yyyy-MM-dd");
      }
      if (this.cafupdfrm.value.actv_dt == null || this.cafupdfrm.value.actv_dt == "0000-00-00") {
        this.cafupdfrm.value.actv_dt = ""
      }
      else {
        this.cafupdfrm.value.actv_dt = this.datePipe.transform(this.cafupdfrm.value.actv_dt, "yyyy-MM-dd");
      }

      this.cafupdfrm.value.spnd_in = this.spsndInd;
      this.cafupdfrm.value.trmnd_in = this.trmndInd;
      this.cafupdfrm.value.actve_in = this.actvInd;
      if (this.chnged_srl_nu_in == 0 && this.chnged_iptv_mac_in == 0) {
        this.cafupdfrm.value.onu_stpbx_id = this.cafdata[0].onu_stpbx_id
        this.cafupdfrm.value.iptv_stpbx_id = this.cafdata[0].iptv_stpbx_id
      }
      else if (this.chnged_srl_nu_in == 1 && this.chnged_iptv_mac_in == 0) {
        this.cafupdfrm.value.onu_stpbx_id = this.onudtls[0].stpbx_id
        this.cafupdfrm.value.iptv_stpbx_id = this.cafdata[0].iptv_stpbx_id
      }
      else if (this.chnged_iptv_mac_in == 1 && this.chnged_srl_nu_in == 0) {
        this.cafupdfrm.value.onu_stpbx_id = this.cafdata[0].onu_stpbx_id
        this.cafupdfrm.value.iptv_stpbx_id = this.iptvDtls[0].stpbx_id
      }
      else if (this.chnged_srl_nu_in == 1 && this.chnged_iptv_mac_in == 1) {
        this.cafupdfrm.value.onu_stpbx_id = this.onudtls[0].stpbx_id
        this.cafupdfrm.value.iptv_stpbx_id = this.iptvDtls[0].stpbx_id
      }
      // if(this.cafdata[0]['enty_sts_id'] == 10){
      //   console.log("Box Change Initiated")
      //   if(this.cafdata[0]['onu_srl_nu'] == this.cafupdfrm.value.onu_srl_nu && this.cafdata[0]['iptv_srl_nu'] == this.cafupdfrm.value.iptv_srl_nu){
      //     this.loader = false;
      //     this.snackBar.open("Please change onu or iptv", '', {
      //       duration: 3000,
      //       horizontalPosition: this.horizontalPosition,
      //       verticalPosition: this.verticalPosition,
      //     });
      //     return;
      //   }
      // }

      // if(this.cafdata[0]['enty_sts_id'] == 11){
      //   console.log("Pon Change Initiated")
      //   if(this.cafdata[0]['aaa_cd'] == this.cafupdfrm.value.aaa_cd || this.cafdata[0]['aghra_cd'] == this.cafupdfrm.value.agora_cd){
      //     this.loader = false;
      //     this.snackBar.open("Please check aaa or aghora code", '', {
      //       duration: 3000,
      //       horizontalPosition: this.horizontalPosition,
      //       verticalPosition: this.verticalPosition,
      //     });
      //     return;
      //   }
      // }
      if (this.cafdata[0]['enty_sts_id'] == 1) {
        console.log("Pending Activation");

        console.log("internet and individual", !this.interpack && this.cafdata[0].caf_type_nm == 'INDIVIDUAL')
        console.log("cafdata sbscr cd", this.cafdata[0].mdlwe_sbscr_id == null || this.cafdata[0].mdlwe_sbscr_id == '' || this.cafdata[0].mdlwe_sbscr_id == "" || this.cafdata[0].mdlwe_sbscr_id == undefined || this.cafdata[0].mdlwe_sbscr_id == 'undefined')
        console.log("form group sbscr cd", this.cafupdfrm.value.mdlwre_cd == null || this.cafupdfrm.value.mdlwre_cd == '' || this.cafupdfrm.value.mdlwre_cd == "" || this.cafupdfrm.value.mdlwre_cd == undefined || this.cafupdfrm.value.mdlwre_cd == 'undefined')
        // if(this.cafdata[0]['aaa_cd'] == this.cafupdfrm.value.aaa_cd || this.cafdata[0]['aghra_cd'] == this.cafupdfrm.value.agora_cd){
        //   this.loader = false;
        //   this.snackBar.open("Please check aaa or aghora code", '', {
        //     duration: 3000,
        //     horizontalPosition: this.horizontalPosition,
        //     verticalPosition: this.verticalPosition,
        //   });
        //   return;
        // } else 
        if (!this.interpack && this.cafdata[0].caf_type_id == 1) {
          //} else if(!this.interpack && this.cafdata[0].caf_type_nm == 'INDIVIDUAL'){
          console.log("subscriber code")
          if (this.cafdata[0].mdlwe_sbscr_id == null || this.cafdata[0].mdlwe_sbscr_id == '' || this.cafdata[0].mdlwe_sbscr_id == "" || this.cafdata[0].mdlwe_sbscr_id == undefined || this.cafdata[0].mdlwe_sbscr_id == 'undefined') {
            console.log("subscriber code 1")
            if (this.cafupdfrm.value.mdlwre_cd == null || this.cafupdfrm.value.mdlwre_cd == '' || this.cafupdfrm.value.mdlwre_cd == "" || this.cafupdfrm.value.mdlwre_cd == undefined || this.cafupdfrm.value.mdlwre_cd == 'undefined') {
              this.loader = false;
              this.snackBar.open("Please check subscriber code", '', {
                duration: 3000,
                horizontalPosition: this.horizontalPosition,
                verticalPosition: this.verticalPosition,
              });
              return;
            }
          } else if (this.cafupdfrm.value.mdlwre_cd == null || this.cafupdfrm.value.mdlwre_cd == '' || this.cafupdfrm.value.mdlwre_cd == "" || this.cafupdfrm.value.mdlwre_cd == undefined || this.cafupdfrm.value.mdlwre_cd == 'undefined') {
            this.loader = false;
            this.snackBar.open("Please check subscriber code", '', {
              duration: 3000,
              horizontalPosition: this.horizontalPosition,
              verticalPosition: this.verticalPosition,
            });
            return;
          }
        }
      }
      // console.log(this.cafupdfrm.value)
      this.crdsrv.create(data, rte1).subscribe((res) => {
        if (res['status'] == 200) {
          this.loader = false;
          this.snackBar.open("CAF Details Updated Sucessfully", '', {
            duration: 3000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
          });
          this.cancel();
        }
      }, (error) => {
      });
    }

  }

  ButtonToggletrmnd(event): any {
    console.log(event);
    if (event == true) {
      this.trmndInd = 1;
    } else {
      this.trmndInd = 0;
    }
  }


  ButtonTogglespsnd(event): any {
    console.log(event)
    if (event == true) {
      this.spsndInd = 1;
    }
    else {
      this.spsndInd = 0;
    }
  }


  ButtonToggleactv(event): any {
    console.log(event)
    if (event == true) {
      this.actvInd = 1;
    }
    else {
      this.actvInd = 0;
    }
  }




  onDasanBlur() {
    // if(this.cafdata[0].olt_vndr_id == 11 || this.cafdata[0].olt_vndr_id == 1){

    // }
    console.log(this.cafupdfrm.value.agora_cd)
    var das_cd = this.cafupdfrm.value.agora_cd;

    var fileds = das_cd.split('-')
    var pondas = fileds[2]
    // console.log(pondas)
    this.cafupdfrm.get('old_pon_das').setValue(pondas)

    console.log(this.cafupdfrm.value.aaa_cd)
    var fieldss = (this.cafupdfrm.value.aaa_cd).split(':')
    var pondas1 = fieldss[3]

    console.log(pondas1, "Testing Pon NUmber")
    this.cafupdfrm.get('old_pon_das1').setValue(pondas1)


  }

  onAgoraBlur() {
    this.agrcd_chngd = true;
    console.log(this.cafupdfrm.value.agora_cd)
    var agor_cd = this.cafupdfrm.value.agora_cd

    this.newString = this.cafupdfrm.value.agora_cd.slice(0, -5)
    console.log(this.newString)
    console.log("hello")


    var fields = agor_cd.split('-')
    var ip_adr = fields[0]
    this.crd = fields[1]
    var pon = fields[2]
    this.onu = fields[3]
    if (this.crd == 1) {
      var chng_pon = pon - 8

    }
    else {
      chng_pon = pon
    }

    var ipsplit = ip_adr.split('.')
    var ipsplit1 = ipsplit[0]
    var ipsplit2 = ipsplit[1]
    var ipsplit3 = ipsplit[2]
    var ipsplit4 = ipsplit[3]

    if (ipsplit[3].length == 2) {
      var chng_ipsplit4 = 0 + ipsplit4

    }
    else if (ipsplit[3].length == 1) {
      var chng_ipsplit4: any
      chng_ipsplit4 = "00" + ipsplit4

    }
    else {
      var chng_ipsplit4 = ipsplit4
    }
    var aaa_lag_id = "lag" + ':' + ipsplit3 + chng_ipsplit4 + ':' + this.crd + ':' + chng_pon + ':' + this.onu
    let data = {
      ip: ip_adr,
      crd: this.crd,
      pon: chng_pon,
      onu: this.onu
    }
    //  console.log(data)
    this.cafupdfrm.get('aaa_cd').setValue(aaa_lag_id);
    let rte1 = `olt/getsplitDtlsbyIp`

    this.crdsrv.create(data, rte1).subscribe((res) => {
      console.log(res['data'], "Testing IP")
      if (res['data'].length > 0) {
        this.spltDtls = res['data']
        this.splts = this.spltDtls[0].splt1_nu + "-" + this.spltDtls[0].splt2_nu + "-" + this.spltDtls[0].splt3_nu
      }
      else {
        this.snackBar.open("No Splits Data Found for ONU" + ':' + this.onu, '', {
          duration: 3000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
      }


    }, (error) => {
    });
  }
  onONUBlur() {
    this.chnged_srl_nu_in = 1
    if (this.cafupdfrm.value.agora_srl_nu.startsWith('44534E57')) {
      this.chnged_srl_nu = this.cafupdfrm.value.agora_srl_nu.replace('44534E57', 'DSNW');
    } else if (this.cafupdfrm.value.agora_srl_nu.startsWith('5A544547')) {
      this.chnged_srl_nu = this.cafupdfrm.value.agora_srl_nu.replace('5A544547', 'ZTEG');
    } else if (this.cafupdfrm.value.agora_srl_nu.startsWith('59474531')) {
      this.chnged_srl_nu = this.cafupdfrm.value.agora_srl_nu.replace('59474531', 'YGE1');
    } else if (this.cafupdfrm.value.agora_srl_nu.startsWith('4B4F4E4B')) {
      this.chnged_srl_nu = this.cafupdfrm.value.agora_srl_nu.replace('4B4F4E4B', 'KONK');
    } else {
      this.chnged_srl_nu = this.cafupdfrm.value.agora_srl_nu
    }
    let type = 2
    let data = {
      type: type,
      srl_nu: this.chnged_srl_nu
    }
    let rte1 = `inventory/boxdtls`;
    this.crdsrv.create(data, rte1).subscribe((res) => {
      if (res['status'] == 200) {
        if (res['data'].length > 0) {
          this.onudtls = res['data'];
          this.cafupdfrm.get('onu_srl_nu').setValue(this.onudtls[0].srl_nu);
          this.cafupdfrm.get('onu_mac_addr').setValue(this.onudtls[0].mac_addr_cd);
        }
        else {
          this.snackBar.open("Enter Valid ONU Serial Number", '', {
            duration: 3000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
          });
          this.cafupdfrm.get('onu_srl_nu').setValue("");
          this.cafupdfrm.get('onu_mac_addr').setValue("");
        }
      }

    }, (error) => {
    });
  }

  onIptvBlur() {
    console.log(this.cafupdfrm.value.iptv_mac_addr)
    console.log(this.cafdata)
    if (this.cafdata[0].caf_type_nm == 'ENTERPRISE') {
      this.cafupdfrm.get('iptv_srl_nu').setValue('')
      this.cafupdfrm.get('iptv_mac_addr').setValue('')
      this.cafupdfrm.get('mdlwre_cd').setValue('')
      this.cafupdfrm.get('iptv_mac_new').setValue('')
    }
    else {
      this.chnged_iptv_mac_in = 1
      let type = 1
      let data = {
        type: type,
        iptv_mac_ad: this.cafupdfrm.value.iptv_mac_addr
      }
      let rte1 = `inventory/boxdtls`;
      this.crdsrv.create(data, rte1).subscribe((res) => {
        if (res['status'] == 200) {
          if (res['data'].length > 0) {
            this.iptvDtls = res['data'];
            this.cafupdfrm.get('iptv_srl_nu').setValue(this.iptvDtls[0].srl_nu);
          }
          else {
            this.snackBar.open("Enter Valid IPTV Mac Address", '', {
              duration: 3000,
              horizontalPosition: this.horizontalPosition,
              verticalPosition: this.verticalPosition,
            });
            this.cafupdfrm.get('iptv_srl_nu').setValue("");
          }
        }

      }, (error) => {
      });
    }

  }


  getentity() {
    const rte = `entity/entity`;
    this.crdsrv.get(rte).subscribe((res) => {
      this.entitylst = res['data'];
      console.log(this.entitylst)
    })
  }
  onentityselect() {
    this.getactions()
    this.getstatus()
  }
  getactions() {
    console.log(this.extapifrm.value.entity)
    const rte = `entity/actions/` + this.extapifrm.value.entity;
    this.crdsrv.get(rte).subscribe((res) => {
      this.actionlst = res['data'];
      console.log(this.actionlst)
    })
  }
  getstatus() {
    console.log(this.extapifrm.value.entity)
    const rte = `entity/status/` + this.extapifrm.value.entity;
    this.crdsrv.get(rte).subscribe((res) => {
      this.statuslst = res['data'];
      console.log(this.statuslst)
    })
  }



  //*********************** Curl Operation start here ******************//
  PenActDas1() {
    this.cafupdfrm.enable()
    this.cafupdfrm.get('olt_onu_id').setValue(this.cafupdfrm.value.olt_onu_id);
    this.cafupdfrm.get('ip_adr').setValue(this.cafupdfrm.value.ip_adr);
    // this.cafupdfrm.get('pon').setValue(this.cafupdfrm.value.pon);
    this.cafupdfrm.get('olt_crd_nu').setValue(this.cafupdfrm.value.olt_crd_nu);
    this.cafupdfrm.get('up_stream').clearValidators();
    this.cafupdfrm.get('up_stream').updateValueAndValidity();
    this.cafupdfrm.get('down_stream').clearValidators();
    this.cafupdfrm.get('down_stream').updateValueAndValidity();
    this.cafupdfrm.get('service_pack').clearValidators();
    this.cafupdfrm.get('service_pack').updateValueAndValidity();
    this.daspndg234 = false;
    this.daspndg345 = false;
    this.daspndg456 = false;
    this.daspndg567 = false;
    this.daspndg678 = false;
    this.daspndg123 = true;//for testing
    this.edibtnenble = true;
    //this.interpack = false;
    this.pckg = false;
    this.Reduced = false;
    this.addonchck = false;

    let data = {
      "aid": { "ipAddress": this.cafupdfrm.value.ip_adr, "card": this.cafupdfrm.value.olt_crd_nu, "tp": this.cafupdfrm.value.pon, "onuId": this.cafupdfrm.value.olt_onu_id },
      "admin": 1, "fec": true, "swUpgradeMode": 2, "serialNumber": this.cafupdfrm.value.agora_srl_nu, "profileName": this.cafupdfrm.value.onu_mdle_cd, "registerType": "1", "name": this.cafupdfrm.value.lst_nm + this.cafupdfrm.value.cstmr_nm - this.cafupdfrm.value.caf_nu
    }
    this.shwLdr = true;
    this.http.post('https://bbnlbss.apsfl.co.in/apiv1/dashbrd/dasanCreateOnu', data).subscribe(res => {
      console.log(res);
      console.log(this.PenActDas1);
      //this.replaceSlashes;
      this.shwLdr = false;
      if (res['status'] == 200) {
        this.daspndg123 = true;
        this.curlRslts = res['data'];
        this._snackBar.open('Executed Sucessfully', '', {
          duration: 2000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
      } else
        this._snackBar.open('Something went wrong... Please try again', '', {
          duration: 2000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
    }, (error) => {
      this.shwLdr = false;
      console.log(error);
      this._snackBar.open('Something went wrong... Please try again', '', {
        duration: 2000,
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      });
    })

  }

  PenActDas2() {
    this.cafupdfrm.enable()
    this.cafupdfrm.get('up_stream').setValidators(Validators.required);
    this.cafupdfrm.get('up_stream').updateValueAndValidity();
    this.daspndg345 = false;
    this.daspndg456 = false;
    this.daspndg567 = false;
    this.daspndg678 = false;
    this.edibtnenble = true;
    this.Reduced = false;
    this.addonchck = false;
    this.daspndg234 = true; //for testing
    //this.interpack = false;
    if (this.cafupdfrm.get('up_stream').value) {
      let data = { "aid": { "ipAddress": this.cafupdfrm.value.ip_adr, "card": this.cafupdfrm.value.olt_crd_nu, "tp": this.cafupdfrm.value.old_pon_das1, "onuId": this.cafupdfrm.value.olt_onu_id }, "tps": [{ "card": "1", "tps": [this.cafupdfrm.value.old_pon_das1] }], "admin": 1, "name": "HSI", "networkServiceName": "HSI", "upstreamTrafficProfileName": this.cafupdfrm.value.up_stream, "downtreamTrafficProfileName": " ", "l2DhcpRelay": { "remoteId": "ID", "useGlobalDhcp": false, "op82": true, "op18": false, "op37": false }, "igmpOptions": { "useGlobal": false, "enable": true }, "nativeVlan": false };
      console.log(data, "Das_PndAct2")
      this.shwLdr = true;
      this.http.post('https://bbnlbss.apsfl.co.in/apiv1/dashbrd/dasanCreateOnuHsi', data).subscribe(res => {
        console.log(res);
        this.shwLdr = false;
        if (res['status'] == 200) {
          this.daspndg234 = true;
          this.curlRslts = res['data'];
          this._snackBar.open('Executed Sucessfully', '', {
            duration: 2000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
          });
        } else
          this._snackBar.open('Something went wrong... Please try again', '', {
            duration: 2000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
          });
      }, (error) => {
        this.shwLdr = false;
        console.log(error);
        this._snackBar.open('Something went wrong... Please try again', '', {
          duration: 2000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
      });
    } else {
      this.upstrm_prfl_nm = true;
    }


  }

  PenActDas3() {
    this.cafupdfrm.enable()
    this.daspndg456 = false;
    this.daspndg567 = false;
    this.daspndg678 = false;
    this.edibtnenble = true;
    this.Reduced = false;
    this.addonchck = false;
    //this.interpack = false;
    this.daspndg345 = true;//for testing
    let data =
      { "aid": { "ipAddress": this.cafupdfrm.value.ip_adr, "card": this.cafupdfrm.value.olt_crd_nu, "tp": this.cafupdfrm.value.old_pon_das1, "onuId": this.cafupdfrm.value.olt_onu_id }, "tps": [{ "card": "1", "tps": [this.cafupdfrm.value.old_pon_das1] }], "admin": "1", "networkServiceName": "IPTV", "name": "IPTV", "nativeVlan": false };
    console.log(data, "Das_PndAct3")
    this.shwLdr = true;
    this.http.post('https://bbnlbss.apsfl.co.in/apiv1/dashbrd/dasanCreateOnuIptv', data).subscribe(res => {
      console.log(res);
      this.shwLdr = false;
      if (res['status'] == 200) {
        this.daspndg345 = true;
        this.curlRslts = res['data'];
        this._snackBar.open('Executed Sucessfully', '', {
          duration: 2000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
      } else
        this._snackBar.open('Something went wrong... Please try again', '', {
          duration: 2000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
    }, (error) => {
      this.shwLdr = false;
      console.log(error);
      this._snackBar.open('Something went wrong... Please try again', '', {
        duration: 2000,
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      });
    });

  }


  // TODO:
  PenActDas4() {
    this.cafupdfrm.enable();
    this.cafupdfrm.get('down_stream').setValidators(Validators.required);
    this.cafupdfrm.get('down_stream').updateValueAndValidity();
    if (this.internetpack == false && (this.cafdata[0].mdlwe_sbscr_id == null || this.cafdata[0].mdlwe_sbscr_id == '')) {
      this.daspndg456 = true;
    } else if (this.internetpack == false && (this.cafdata[0].mdlwe_sbscr_id != null || this.cafdata[0].mdlwe_sbscr_id != '')) {
      this.daspndg456 = false;
      this.daspndg567 = true;
    }
    this.daspndg456 = true;
    this.daspndg567 = false;
    if (this.cafupdfrm.get('down_stream').value) {
      let data = { "aaa_cd": this.cafupdfrm.value.aaa_cd, "access_id": this.cafupdfrm.value.onu_mac_addr, "profile_tx": this.cafupdfrm.value.down_stream };
      console.log(data, "Das_PndAct4")
      //this.shwLdr = true;
      this.http.post("https://bbnlbss.apsfl.co.in/apiv1/dashbrd/createHuaweiProfile", data).subscribe(res => {
        console.log(res);
        this.shwLdr = false;
        if (res['status'] == 200) {
          this.curlRslts = res['data'];
          this.daspndg567 = true;
          this._snackBar.open('Executed Sucessfully', '', {
            duration: 2000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
          });
        } else
          this._snackBar.open('Something went wrong... Please try again', '', {
            duration: 2000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
          });
      }, (error) => {
        this.shwLdr = false;
        console.log(error);
        this._snackBar.open('Something went wrong... Please try again', '', {
          duration: 2000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
      });
    } else {
      this.subs_prfle_nm = true;
    }



  }

  SubscriberDas() {
    //this.edibtnenble = true;
    //this.updateBtn = true;
    //this.interpack = false;
    this.daspndg567 = true;
    let data = { "deviceid": this.cafupdfrm.value.iptv_mac_addr, "devicecategory": "OTHER_DEVICE", "partnerCode": "", "subscriber": { "title": this.cafupdfrm.value.title, "firstname": this.cafupdfrm.value.first_nm, "lastname": this.cafupdfrm.value.lst_nm, "contactno": this.cafupdfrm.value.cnt_no, "emailid": "", "identityProofId": 0, "address": this.cafupdfrm.value.addrs, "village": this.cafupdfrm.value.vilage, "mandal": this.cafupdfrm.value.mdl, "districtCode": this.cafupdfrm.value.dsrtc_cde, "stateCode": "AP", "countryCode": "INDIA", "countryIS02": "IN", "remarks": "", "cafNumber": this.cafupdfrm.value.caf_nu, "billingStartDate": "10" } };
    console.log(data, "Das Subscriber Test")
    this.shwLdr = true;
    this.http.post("https://bbnlbss.apsfl.co.in/apiv1/dashbrd/createNewSubscriber", data).subscribe(res => {
      console.log(res);
      this.shwLdr = false;
      if (res['status'] == 200) {
        this.curlRslts = res['data'];
        this._snackBar.open('Executed Sucessfully', '', {
          duration: 2000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
      } else
        this._snackBar.open('Something went wrong... Please try again', '', {
          duration: 2000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
    }, (error) => {
      this.shwLdr = false;
      console.log(error);
      this._snackBar.open('Something went wrong... Please try again', '', {
        duration: 2000,
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      });
    });

  }

  PenActDas5() {
    this.edibtnenble = true;
    this.cafupdfrm.get('service_pack').setValidators(Validators.required);
    this.cafupdfrm.get('service_pack').updateValueAndValidity();
    this.Reduced = false;
    this.addonchck = false;
    if (this.cafupdfrm.get('service_pack').value) {
      let data = { "subscribercode": this.cafupdfrm.value.mdlwre_cd, "servicepacks": [{ "servicepack": this.cafupdfrm.value.service_pack, "expirydate": "29991231" }] };
      console.log(data, "Package Push Name")
      this.shwLdr = true;
      this.http.post("https://bbnlbss.apsfl.co.in/apiv1/dashbrd/firstTimeaddnewservicepack", data).subscribe(res => {
        console.log(res);
        this.shwLdr = false;
        if (res['status'] == 200) {
          this.curlRslts = res['data'];
          this._snackBar.open('Executed Sucessfully', '', {
            duration: 2000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
          });
        } else
          this._snackBar.open('Something went wrong... Please try again', '', {
            duration: 2000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
          });
      }, (error) => {
        this.shwLdr = false;
        console.log(error);
        this._snackBar.open('Something went wrong... Please try again', '', {
          duration: 2000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
      });
    }
    else {
      this.srvce_pack = true;
    }


  }


  PenAct1() {
    this.cafupdfrm.enable()
    // this.cafupdfrm.get('olt_onu_id').setValue(this.cafupdfrm.value.olt_onu_id);
    // this.cafupdfrm.get('ip_adr').setValue(this.cafupdfrm.value.ip_adr);
    // this.cafupdfrm.get('pon').setValue(this.cafupdfrm.value.pon);
    // this.cafupdfrm.get('olt_crd_nu').setValue(this.cafupdfrm.value.olt_crd_nu);
    this.cafupdfrm.get('up_stream').clearValidators();
    this.cafupdfrm.get('up_stream').updateValueAndValidity();
    this.cafupdfrm.get('down_stream').clearValidators();
    this.cafupdfrm.get('down_stream').updateValueAndValidity();
    this.cafupdfrm.get('service_pack').clearValidators();
    this.cafupdfrm.get('service_pack').updateValueAndValidity();
    this.pndg345 = false;
    this.pndg567 = false;
    this.pndg678 = false;
    this.pndg789 = false;
    this.pndg891 = false;
    this.pndg234 = true;//for testing
    this.edibtnenble = true;
    //this.interpack = false;
    this.pckg = false;
    this.Reduced = false;
    this.addonchck = false;

    let data = { "aid": { "ipAddress": this.cafupdfrm.value.ip_adr, "card": this.cafupdfrm.value.olt_crd_nu, "tp": this.cafupdfrm.value.pon, "onuId": this.cafupdfrm.value.olt_onu_id }, "admin": "1", "fec": "true", "swUpgradeMode": "2", "serialNumber": this.cafupdfrm.value.agora_srl_nu, "profileName": this.cafupdfrm.value.onu_mdle_cd, "registerType": "1", "name": this.cafupdfrm.value.lst_nm + this.cafupdfrm.value.cstmr_nm + ' - ' + this.cafupdfrm.value.caf_nu };
    this.shwLdr = true;
    this.http.post('https://bbnlbss.apsfl.co.in/apiv1/dashbrd/dasanCreateOnu', data).subscribe(res => {
      console.log(res);
      console.log(this.PenAct1);
      //this.replaceSlashes;
      this.shwLdr = false;
      if (res['status'] == 200) {
        this.pndg234 = true;
        this.curlRslts = res['data'];
        this._snackBar.open('Executed Sucessfully', '', {
          duration: 2000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
      } else
        this._snackBar.open('Something went wrong... Please try again', '', {
          duration: 2000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
    }, (error) => {
      this.shwLdr = false;
      console.log(error);
      this._snackBar.open('Something went wrong... Please try again', '', {
        duration: 2000,
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      });
    })


  }

  PenAct2() {
    this.cafupdfrm.enable()
    this.cafupdfrm.get('up_stream').setValidators(Validators.required);
    this.cafupdfrm.get('up_stream').updateValueAndValidity();
    this.pndg567 = false;
    this.pndg678 = false;
    this.pndg789 = false;
    this.pndg891 = false;
    this.edibtnenble = true;
    this.Reduced = false;
    this.addonchck = false;
    this.pndg345 = true; //for testing
    //this.interpack = false;
    if (this.cafupdfrm.get('up_stream').value) {
      let data = { "aid": { "ipAddress": " this.cafupdfrm.value.ip_adr ", "card": this.cafupdfrm.value.olt_crd_nu, "tp": this.cafupdfrm.value.pon, "onuId": this.cafupdfrm.value.olt_onu_id }, "tps": [{ "card": "1", "tps": ["2"] }], "admin": "1", "name": "HSI", "networkServiceName": "HSI", "upstreamTrafficProfileName": this.cafupdfrm.value.up_stream, "downstreamTrafficProfileName": " ", "l2DhcpRelay": { "remoteId": "ID", "useGlobalDhcp": false, "op82": true, "op18": false, "op37": false }, "igmpOptions": { "useGlobal": false, "enable": true }, "nativeVlan": false };
      this.shwLdr = true;
      this.crdsrv.create(data, 'execurl')
        .subscribe((res) => {
          console.log(res);
          this.shwLdr = false;
          if (res['status'] == 200) {
            this.pndg345 = true;
            this.curlRslts = res['data'];
            this._snackBar.open('Executed Sucessfully', '', {
              duration: 2000,
              horizontalPosition: this.horizontalPosition,
              verticalPosition: this.verticalPosition,
            });
          } else
            this._snackBar.open('Something went wrong... Please try again', '', {
              duration: 2000,
              horizontalPosition: this.horizontalPosition,
              verticalPosition: this.verticalPosition,
            });
        }, (error) => {
          this.shwLdr = false;
          console.log(error);
          this._snackBar.open('Something went wrong... Please try again', '', {
            duration: 2000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
          });
        });
    }
    else {
      this.upstrm_prfl_nm = true;
    }


  }

  PenAct3() {
    this.cafupdfrm.enable()
    this.pndg678 = false;
    this.pndg789 = false;
    this.pndg891 = false;
    this.edibtnenble = true;
    this.Reduced = false;
    this.addonchck = false;
    //this.interpack = false;
    this.pndg567 = true;//for testing
    let data = {
      "enty_id": 1,
      "actn_id": 1,
      "actn_nm": "PENDING ACTIVATION",
      //curl -XPOST -H 'Authorization: Basic YnNzOkJzc0AxMjM=' -H "Content-type: application/json" -d '{"aid":{"ipAddress":"172.16.243.11","card":1,"tp":9,"onuId":120},"tps":[{"card":"1","tps":["2"]}],"admin":"1","networkServiceName":"IPTV","name":"IPTV","nativeVlan":false}' 'http://172.16.0.44:8080/agorang/rest/v1/eml/clientservicegpon'
      "commands": "curl -XPOST -H" + " 'Authorization" + ':' + " Basic YnNzOkJzc0AxMjM=' -H " + '"Content-type' + ':' + ' application/json" -d' + "'{" + '"aid"' + ':' + '{' + '"ipAddress"' + ':' + '"' + this.cafupdfrm.value.ip_adr + '"' + ',' + '"card"' + ':' + this.cafupdfrm.value.olt_crd_nu + ',' + '"tp"' + ':' + this.cafupdfrm.value.pon + ',' + '"onuId"' + ':' + this.cafupdfrm.value.olt_onu_id + '}' + ',' + '"tps"' + ':' + '[{' + '"card"' + ':' + '"1"' + ',' + '"tps"' + ':' + '["2"]' + '}]' + ',' + '"admin"' + ':' + '"1"' + ',' + '"networkServiceName"' + ':' + '"IPTV"' + ',' + '"name"' + ':' + '"IPTV"' + ',' + '"nativeVlan"' + ':' + 'false' + "}'" + " 'http://172.16.0.44:8080/agorang/rest/v1/eml/clientservicegpon'",
    };
    this.shwLdr = true;
    this.crdsrv.create(data, 'execurl')
      .subscribe((res) => {
        console.log(res);
        this.shwLdr = false;
        if (res['status'] == 200) {
          this.pndg567 = true;
          this.curlRslts = res['data'];
          this._snackBar.open('Executed Sucessfully', '', {
            duration: 2000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
          });
        } else
          this._snackBar.open('Something went wrong... Please try again', '', {
            duration: 2000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
          });
      }, (error) => {
        this.shwLdr = false;
        console.log(error);
        this._snackBar.open('Something went wrong... Please try again', '', {
          duration: 2000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
      });

  }

  PenAct4() {
    this.cafupdfrm.enable()
    this.pndg789 = false;
    this.pndg891 = false;
    this.edibtnenble = true;
    this.Reduced = false;
    this.addonchck = false;
    //this.interpack = false;
    this.pndg678 = true;//for testing
    let data = {
      "enty_id": 1,
      "actn_id": 1,
      "actn_nm": "PENDING ACTIVATION",
      "commands": "curl -XPUT -H" + " 'Authorization" + ':' + " Basic YnNzOkJzc0AxMjM=' -H" + ' "Content-type' + ':' + ' application/json" -d' + "'{" + '"admin"' + ':' + "0" + ',' + '"name"' + ':' + '"IPTV"' + "}'" + " 'http://172.16.0.44:8080/agorang/rest/v1/eml/clientservicegpon/" + this.cafupdfrm.value.ip_adr + '-' + this.cafupdfrm.value.olt_crd_nu + '-' + this.cafupdfrm.value.pon + '-' + this.cafupdfrm.value.olt_onu_id + '-' + "HSI/multicastpackage'",
    };
    this.shwLdr = true;
    this.crdsrv.create(data, 'execurl')
      .subscribe((res) => {
        console.log(res);
        this.shwLdr = false;
        if (res['status'] == 200) {
          this.pndg678 = true;
          this.curlRslts = res['data'];
          this._snackBar.open('Executed Sucessfully', '', {
            duration: 2000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
          });
        } else
          this._snackBar.open('Something went wrong... Please try again', '', {
            duration: 2000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
          });
      }, (error) => {
        this.shwLdr = false;
        console.log(error);
        this._snackBar.open('Something went wrong... Please try again', '', {
          duration: 2000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
      });

  }

  PenAct5() {
    this.cafupdfrm.enable()
    this.cafupdfrm.get("down_stream").setValidators(Validators.required);
    this.cafupdfrm.get('down_stream').updateValueAndValidity();
    this.pndg891 = false;
    this.edibtnenble = true;
    this.Reduced = false;
    this.addonchck = false;
    this.pndg789 = true; //for testing
    //this.interpack = false;
    if (this.cafupdfrm.get('down_stream').value) {
      let data = {
        "enty_id": 1,
        "actn_id": 1,
        "actn_nm": "PENDING ACTIVATION",
        "commands": "curl -XGET -H" + ' "Content-type' + ':' + ' application/json"' + " 'http://172.16.4.107/prov4serv/prov_if?oper=insert&client" + '=' + this.cafupdfrm.value.aaa_cd + '&avp' + '=' + "Filter-Id<>nonblock<>check&avp=accessId<><>reply&avp=Profile<>pV4<>reply&avp=cisco-avpair<>subscriber:sa=" + this.cafupdfrm.value.down_stream + "<>reply&avp=cisco-avpair<>subscriber:accounting-list=default<>reply'",
      };
      this.shwLdr = true;
      this.crdsrv.create(data, 'execurl')
        .subscribe((res) => {
          console.log(res);
          this.shwLdr = false;
          if (res['status'] == 200) {
            this.curlRslts = res['data'];
            this.pndg789 = true;
            this._snackBar.open('Executed Sucessfully', '', {
              duration: 2000,
              horizontalPosition: this.horizontalPosition,
              verticalPosition: this.verticalPosition,
            });
          } else
            this._snackBar.open('Something went wrong... Please try again', '', {
              duration: 2000,
              horizontalPosition: this.horizontalPosition,
              verticalPosition: this.verticalPosition,
            });
        }, (error) => {
          this.shwLdr = false;
          console.log(error);
          this._snackBar.open('Something went wrong... Please try again', '', {
            duration: 2000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
          });
        });
    }
    else {
      this.subs_prfle_nm = true;
    }


  }

  PenAct6() {
    this.cafupdfrm.enable();
    console.log("true", this.internetpack == false && (this.cafdata[0].mdlwe_sbscr_id == null || this.cafdata[0].mdlwe_sbscr_id == ''))
    console.log("false", this.internetpack == false && (this.cafdata[0].mdlwe_sbscr_id != null || this.cafdata[0].mdlwe_sbscr_id != ''))
    if (this.internetpack == false && (this.cafdata[0].mdlwe_sbscr_id == null || this.cafdata[0].mdlwe_sbscr_id == '')) {
      this.pndg7891 = true;
    } else if (this.internetpack == false && (this.cafdata[0].mdlwe_sbscr_id != null || this.cafdata[0].mdlwe_sbscr_id != '')) {
      this.pndg7891 = false;
      this.pndg891 = true;
    }
    console.log("this.pndg891 1244 line ", this.pndg891)
    this.edibtnenble = true;
    //this.interpack = false;
    this.Reduced = false;
    this.addonchck = false;
    let data = {
      "enty_id": 1,
      "actn_id": 1,
      "actn_nm": "PENDING ACTIVATION",
      "commands": "curl -XGET -H" + ' "Content-type: application/json"' + " 'http://172.16.4.107/prov4serv/prov_if?oper" + '=' + this.de_lte + '&' + "client" + '=' + this.cafupdfrm.value.aaa_cd + "'",

    };
    this.shwLdr = true;
    this.crdsrv.create(data, 'execurl')
      .subscribe((res) => {
        console.log(res);
        this.shwLdr = false;
        if (res['status'] == 200) {
          this.curlRslts = res['data'];
          this._snackBar.open('Executed Sucessfully', '', {
            duration: 2000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
          });
        } else
          this._snackBar.open('Something went wrong... Please try again', '', {
            duration: 2000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
          });
      }, (error) => {
        this.shwLdr = false;
        console.log(error);
        this._snackBar.open('Something went wrong... Please try again', '', {
          duration: 2000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
      });

  }

  PenAct7() {
    this.cafupdfrm.get('service_pack').setValidators(Validators.required);
    this.cafupdfrm.get('service_pack').updateValueAndValidity();
    this.edibtnenble = true;
    this.Reduced = false;
    this.addonchck = false;
    //this.updateBtn = true;
    //this.interpack = false;
    if (this.cafupdfrm.get('service_pack').value) {
      let data = {
        "enty_id": 1,
        "actn_id": 1,
        "actn_nm": "PENDING ACTIVATION",
        "commands": "curl -XPOST -H" + ' "username' + ':' + ' teraadmin" -H "apikey' + ':' + ' 6ed73c1a-7817-49ab-b185-981f97cf5fd8" -H' + ' "Content-type' + ':' + ' application/json" -d' + "'{" + '"subscribercode"' + ':' + '"' + this.cafupdfrm.value.mdlwre_cd + '"' + ',' + '"servicepacks"' + ':' + '[{' + '"servicepack"' + ':' + '"' + this.cafupdfrm.value.service_pack + '"' + ',' + '"expirydate"' + ':' + '"29991231"' + ',' + '"reason"' + ':' + '"I want To Activate"' + '}]' + ',' + '"expirydate"' + ':' + '"29991231"' + "}'" + ' "http://iptv.apsfl.co.in:8080/appserver/rest/iptv/addservicepack"',
      };
      this.shwLdr = true;
      this.crdsrv.create(data, 'execurl')
        .subscribe((res) => {
          console.log(res);
          this.shwLdr = false;
          if (res['status'] == 200) {
            this.curlRslts = res['data'];
            this._snackBar.open('Executed Sucessfully', '', {
              duration: 2000,
              horizontalPosition: this.horizontalPosition,
              verticalPosition: this.verticalPosition,
            });
          } else
            this._snackBar.open('Something went wrong... Please try again', '', {
              duration: 2000,
              horizontalPosition: this.horizontalPosition,
              verticalPosition: this.verticalPosition,
            });
        }, (error) => {
          this.shwLdr = false;
          console.log(error);
          this._snackBar.open('Something went wrong... Please try again', '', {
            duration: 2000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
          });
        });
    }
    else {
      this.srvce_pack = true;
    }


  }

  addoniptv() {
    this.edibtnenble = true;
    //this.updateBtn = true;
    //this.interpack = false;
    let data = { "subscribercode": this.addonfrm.value.mdl_wre_cd, "servicepacks": [{ "servicepack": this.addonfrm.value.service_pack_nm, "expirydate": "29991231", "reason": "I want To Activate" }], "expirydate": "29991231" };
    this.shwLdr = true;
    this.http.post('https://bbnlbss.apsfl.co.in/apiv1/dashbrd/firstTimeaddnewservicepack', data).subscribe(res => {
      console.log(res);
      this.shwLdr = false;
      if (res['status'] == 200) {
        this.addoncurlRslts = res['data'];
        this._snackBar.open('Executed Sucessfully', '', {
          duration: 2000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
      } else
        this._snackBar.open('Something went wrong... Please try again', '', {
          duration: 2000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
    }, (error) => {
      this.shwLdr = false;
      console.log(error);
      this._snackBar.open('Something went wrong... Please try again', '', {
        duration: 2000,
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      });
    });

  }



  ponchng1() {
    this.cafupdfrm.enable()
    this.ponchg123 = true;
    this.edibtnenble = true;
    this.onAgoraBlur();
    let data = {
      "enty_id": 1,
      "actn_id": 1,
      "actn_nm": "PON Change",
      "commands": "curl -XDELETE -H" + " 'Authorization: Basic YnNzOkJzc0AxMjM=' -H" + ' "Content-type: application/json"' + " 'http://172.16.0.44:8080/agorang/rest/v1/eml/clientservicegpon/" + this.cafupdfrm.value.aga_cd + '-' + "VOIP'",
    };
    console.log(data, "PonChange")
    this.shwLdr = true;
    this.crdsrv.create(data, 'execurl')
      .subscribe((res) => {
        console.log(res);
        this.shwLdr = false;
        if (res['status'] == 200) {
          this.curlRslts = res['data'];
          this._snackBar.open('Executed Sucessfully', '', {
            duration: 2000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
          });
        } else
          this._snackBar.open('Something went wrong... Please try again', '', {
            duration: 2000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
          });
      }, (error) => {
        this.shwLdr = false;
        console.log(error);
        this._snackBar.open('Something went wrong... Please try again', '', {
          duration: 2000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
      });

  }



  ponchng2() {
    this.cafupdfrm.enable()
    this.ponchg234 = true;
    this.edibtnenble = true;
    let data = {
      "enty_id": 1,
      "actn_id": 1,
      "actn_nm": "PON Change",
      "commands": "curl -XDELETE -H" + " 'Authorization: Basic YnNzOkJzc0AxMjM=' -H" + ' "Content-type: application/json"' + " 'http://172.16.0.44:8080/agorang/rest/v1/eml/clientservicegpon/" + this.cafupdfrm.value.aga_cd + '-' + "IPTV'",
    };
    console.log(data, "Pon change 2")
    this.shwLdr = true;
    this.crdsrv.create(data, 'execurl')
      .subscribe((res) => {
        console.log(res);
        this.shwLdr = false;
        if (res['status'] == 200) {
          this.curlRslts = res['data'];
          this._snackBar.open('Executed Sucessfully', '', {
            duration: 2000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
          });
        } else
          this._snackBar.open('Something went wrong... Please try again', '', {
            duration: 2000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
          });
      }, (error) => {
        this.shwLdr = false;
        console.log(error);
        this._snackBar.open('Something went wrong... Please try again', '', {
          duration: 2000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
      });

  }


  ponchng3() {
    this.cafupdfrm.enable()
    this.ponchg345 = true;
    this.edibtnenble = true;
    let data = {
      "enty_id": 1,
      "actn_id": 1,
      "actn_nm": "PON Change",
      "commands": "curl -XDELETE -H" + " 'Authorization: Basic YnNzOkJzc0AxMjM=' -H" + ' "Content-type: application/json"' + " 'http://172.16.0.44:8080/agorang/rest/v1/eml/clientservicegpon/" + this.cafupdfrm.value.agora_cd + "'",
    };
    console.log(data, "Pon change 3")
    this.shwLdr = true;
    this.crdsrv.create(data, 'execurl')
      .subscribe((res) => {
        console.log(res);
        this.shwLdr = false;
        if (res['status'] == 200) {
          this.curlRslts = res['data'];
          this._snackBar.open('Executed Sucessfully', '', {
            duration: 2000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
          });
        } else
          this._snackBar.open('Something went wrong... Please try again', '', {
            duration: 2000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
          });
      }, (error) => {
        this.shwLdr = false;
        console.log(error);
        this._snackBar.open('Something went wrong... Please try again', '', {
          duration: 2000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
      });

  }


  ponchng4() {
    this.edibtnenble = true;
    //this.updateBtn = true;
    let data = {
      "enty_id": 1,
      "actn_id": 1,
      "actn_nm": "PON Change",
      "commands": "curl -XDELETE -H" + " 'Authorization: Basic YnNzOkJzc0AxMjM=' -H" + ' "Content-type: application/json"' + " 'http://172.16.0.44:8080/agorang/rest/v1/eml/onu/" + this.cafupdfrm.value.aga_cd + "'",
    };
    console.log(data, "Ponchange 4")
    this.shwLdr = true;
    this.crdsrv.create(data, 'execurl')
      .subscribe((res) => {
        console.log(res);
        this.shwLdr = false;
        if (res['status'] == 200) {
          this.curlRslts = res['data'];
          this._snackBar.open('Executed Sucessfully', '', {
            duration: 2000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
          });
        } else
          this._snackBar.open('Something went wrong... Please try again', '', {
            duration: 2000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
          });
      }, (error) => {
        this.shwLdr = false;
        console.log(error);
        this._snackBar.open('Something went wrong... Please try again', '', {
          duration: 2000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
      });

  }



  PonAdd1() {
    this.cafupdfrm.get('up_stream').clearValidators();
    this.cafupdfrm.get('up_stream').updateValueAndValidity();
    this.cafupdfrm.get('down_stream').clearValidators();
    this.cafupdfrm.get('down_stream').updateValueAndValidity();
    this.cafupdfrm.get('service_pack').clearValidators();
    this.cafupdfrm.get('service_pack').updateValueAndValidity();
    this.cafupdfrm.enable()
    this.ponadd234 = true;
    this.edibtnenble = true;

    let data = {
      "enty_id": 1,
      "actn_id": 1,
      "commands": "curl -XPOST -H" + " 'Authorization" + ': ' + "Basic YnNzOkJzc0AxMjM=' -H " + '"Content-type' + ': ' + 'application/json" -d' + "'{" + '"aid"' + ':' + '{' + '"ipAddress"' + ':' + '"' + this.cafupdfrm.value.ip_adr + '"' + ',' + '"card"' + ':' + this.cafupdfrm.value.olt_crd_nu + ',' + '"tp"' + ':' + this.cafupdfrm.value.pon + ',' + '"onuId"' + ':' + this.cafupdfrm.value.olt_onu_id + '}' + ',' + '"admin"' + ':' + '"1"' + ',' + '"fec"' + ':' + '"true"' + ',' + '"swUpgradeMode"' + ':' + '"2"' + ',' + '"serialNumber"' + ':' + '"' + this.cafupdfrm.value.agora_srl_nu + '"' + ',' + '"profileName"' + ':' + '"' + this.cafupdfrm.value.onu_mdle_cd + '"' + ',' + '"registerType"' + ':' + '"1"' + ',' + '"name"' + ':' + '"' + this.cafupdfrm.value.lst_nm + this.cafupdfrm.value.cstmr_nm + ' - ' + this.cafupdfrm.value.caf_nu + '"' + "}'" + " 'http://172.16.0.44:8080/agorang/rest/v1/eml/onu'",
      "actn_nm": "PON CHANGE",
    };
    console.log(data, "Test")
    this.shwLdr = true;
    this.crdsrv.create(data, 'execurl')
      .subscribe((res) => {
        console.log(res);
        console.log(this.PenAct1);
        //this.replaceSlashes;
        this.shwLdr = false;
        if (res['status'] == 200) {
          this.curlRslts = res['data'];
          this._snackBar.open('Executed Sucessfully', '', {
            duration: 2000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
          });
        } else
          this._snackBar.open('Something went wrong... Please try again', '', {
            duration: 2000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
          });
      }, (error) => {
        this.shwLdr = false;
        console.log(error);
        this._snackBar.open('Something went wrong... Please try again', '', {
          duration: 2000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
      })


  }

  PonAdd2() {
    this.cafupdfrm.enable();
    this.cafupdfrm.get('up_stream').setValidators(Validators.required);
    this.cafupdfrm.get('up_stream').updateValueAndValidity();
    this.ponadd345 = true;
    this.edibtnenble = true;
    if (this.cafupdfrm.get('up_stream').value) {
      let data = {
        "enty_id": 1,
        "actn_id": 1,
        "actn_nm": "PON CHANGE",
        "commands": "curl -XPOST -H" + " 'Authorization" + ': ' + "Basic YnNzOkJzc0AxMjM='  -H" + '"Content-type' + ':' + ' application/json" -d' + "'{" + '"aid"' + ':' + '{' + '"ipAddress"' + ':' + '"' + this.cafupdfrm.value.ip_adr + '"' + ',' + '"card"' + ':' + this.cafupdfrm.value.olt_crd_nu + ',' + '"tp"' + ':' + this.cafupdfrm.value.pon + ',' + '"onuId"' + ':' + this.cafupdfrm.value.olt_onu_id + '}' + ',' + '"tps"' + ':' + '[{' + '"card"' + ':' + '"1"' + ',' + '"tps"' + ':' + '[2]' + '}]' + ',' + '"admin"' + ':' + '"1"' + ',' + '"networkServiceName"' + ':' + '"HSI"' + ',' + '"name"' + ':' + '"HSI"' + ',' + '"upstreamTrafficProfileName"' + ':' + '"' + this.cafupdfrm.value.up_stream + '"' + ',' + '"downstreamTrafficProfileName"' + ':' + '" "' + ',' + '"l2DhcpRelay"' + ':' + '{' + '"remoteId"' + ':' + '"ID"' + ',' + '"useGlobalDhcp"' + ':' + 'false' + ',' + '"op82"' + ':' + 'true' + ',' + '"op18"' + ':' + 'false' + ',' + '"op37"' + ':' + 'false' + '}' + ',' + '"igmpOptions"' + ':' + '{' + '"useGlobal"' + ':' + 'false' + ',' + '"enable"' + ':' + 'true' + '}' + ',' + '"nativeVlan"' + ':' + 'false' + "}'" + " 'http://172.16.0.44:8080/agorang/rest/v1/eml/clientservicegpon'",
      };
      console.log(data, "Pon change 1")
      this.shwLdr = true;
      this.crdsrv.create(data, 'execurl')
        .subscribe((res) => {
          console.log(res);
          this.shwLdr = false;
          if (res['status'] == 200) {
            this.curlRslts = res['data'];
            this._snackBar.open('Executed Sucessfully', '', {
              duration: 2000,
              horizontalPosition: this.horizontalPosition,
              verticalPosition: this.verticalPosition,
            });
          } else
            this._snackBar.open('Something went wrong... Please try again', '', {
              duration: 2000,
              horizontalPosition: this.horizontalPosition,
              verticalPosition: this.verticalPosition,
            });
        }, (error) => {
          this.shwLdr = false;
          console.log(error);
          this._snackBar.open('Something went wrong... Please try again', '', {
            duration: 2000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
          });
        });
    }
    else {
      this.upstrm_prfl_nm = true;
    }


  }




  PonAdd3() {
    this.cafupdfrm.enable()
    this.ponadd567 = true;
    this.edibtnenble = true;
    let data = {
      "enty_id": 1,
      "actn_id": 1,
      "actn_nm": "PON CHANGE",
      "commands": "curl -XPOST -H" + " 'Authorization" + ':' + " Basic YnNzOkJzc0AxMjM=' -H " + '"Content-type' + ':' + ' application/json" -d' + "'{" + '"aid"' + ':' + '{' + '"ipAddress"' + ':' + '"' + this.cafupdfrm.value.ip_adr + '"' + ',' + '"card"' + ':' + this.cafupdfrm.value.olt_crd_nu + ',' + '"tp"' + ':' + this.cafupdfrm.value.pon + ',' + '"onuId"' + ':' + this.cafupdfrm.value.olt_onu_id + '}' + ',' + '"tps"' + ':' + '[{' + '"card"' + ':' + '"1"' + ',' + '"tps"' + ':' + '[2]' + '}]' + ',' + '"admin"' + ':' + '"1"' + ',' + '"networkServiceName"' + ':' + '"IPTV"' + ',' + '"name"' + ':' + '"IPTV"' + ',' + '"nativeVlan"' + ':' + 'false' + "}'" + " 'http://172.16.0.44:8080/agorang/rest/v1/eml/clientservicegpon'",
    };
    console.log(data, "pon change 3")
    this.shwLdr = true;
    this.crdsrv.create(data, 'execurl')
      .subscribe((res) => {
        console.log(res);
        this.shwLdr = false;
        if (res['status'] == 200) {
          this.curlRslts = res['data'];
          this._snackBar.open('Executed Sucessfully', '', {
            duration: 2000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
          });
        } else
          this._snackBar.open('Something went wrong... Please try again', '', {
            duration: 2000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
          });
      }, (error) => {
        this.shwLdr = false;
        console.log(error);
        this._snackBar.open('Something went wrong... Please try again', '', {
          duration: 2000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
      });

  }


  PonAdd4() {
    this.cafupdfrm.enable()
    this.ponadd678 = true;
    this.edibtnenble = true;
    let data = {
      "enty_id": 1,
      "actn_id": 1,
      "actn_nm": "PON CHANGE",
      "commands": "curl -XPUT -H" + " 'Authorization" + ':' + " Basic YnNzOkJzc0AxMjM=' -H" + ' "Content-type' + ':' + ' application/json" -d' + "'{" + '"admin"' + ':' + "0" + ',' + '"name"' + ':' + '"IPTV"' + "}'" + " 'http://172.16.0.44:8080/agorang/rest/v1/eml/clientservicegpon/" + this.cafupdfrm.value.ip_adr + '-' + this.cafupdfrm.value.olt_crd_nu + '-' + this.cafupdfrm.value.pon + '-' + this.cafupdfrm.value.olt_onu_id + '-' + "HSI/multicastpackage'",
    };
    console.log(data, "Pon change 4")
    this.shwLdr = true;
    this.crdsrv.create(data, 'execurl')
      .subscribe((res) => {
        console.log(res);
        this.shwLdr = false;
        if (res['status'] == 200) {
          this.curlRslts = res['data'];
          this._snackBar.open('Executed Sucessfully', '', {
            duration: 2000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
          });
        } else
          this._snackBar.open('Something went wrong... Please try again', '', {
            duration: 2000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
          });
      }, (error) => {
        this.shwLdr = false;
        console.log(error);
        this._snackBar.open('Something went wrong... Please try again', '', {
          duration: 2000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
      });

  }


  PonAdd5() {
    this.cafupdfrm.enable()
    this.cafupdfrm.get('down_stream').setValidators(Validators.required);
    this.cafupdfrm.get('down_stream').updateValueAndValidity();
    this.ponadd789 = true;
    this.edibtnenble = true;
    if (this.cafupdfrm.get('down_stream').value) {
      let data = {
        "enty_id": 1,
        "actn_id": 1,
        "actn_nm": "PON CHANGE",
        "commands": "curl -XGET -H" + ' "Content-type' + ':' + ' application/json"' + " 'http://172.16.4.107/prov4serv/prov_if?oper=insert&client" + '=' + this.cafupdfrm.value.aaa_cd + '&avp' + '=' + "Filter-Id<>nonblock<>check&avp=accessId<>" + this.cafupdfrm.value.onu_mac_addr + "<>reply&avp=Profile<>pV4<>reply&avp=cisco-avpair<>subscriber:sa=" + this.cafupdfrm.value.down_stream + "<>reply&avp=cisco-avpair<>subscriber:accounting-list=default<>reply'",
      };
      console.log(data, "Pon change 5")
      this.shwLdr = true;
      this.crdsrv.create(data, 'execurl')
        .subscribe((res) => {
          console.log(res);
          this.shwLdr = false;
          if (res['status'] == 200) {
            this.curlRslts = res['data'];
            this._snackBar.open('Executed Sucessfully', '', {
              duration: 2000,
              horizontalPosition: this.horizontalPosition,
              verticalPosition: this.verticalPosition,
            });
          } else
            this._snackBar.open('Something went wrong... Please try again', '', {
              duration: 2000,
              horizontalPosition: this.horizontalPosition,
              verticalPosition: this.verticalPosition,
            });
        }, (error) => {
          this.shwLdr = false;
          console.log(error);
          this._snackBar.open('Something went wrong... Please try again', '', {
            duration: 2000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
          });
        });
    } else {
      this.subs_prfle_nm = true;
    }


  }


  PonAdd6() {
    this.cafupdfrm.enable()
    this.ponadd891 = true;
    this.edibtnenble = true;
    let data = {
      "enty_id": 1,
      "actn_id": 1,
      "actn_nm": "PON CHANGE",
      "commands": "curl -XGET -H" + ' "Content-type: application/json"' + " 'http://172.16.4.107/prov4serv/prov_if?oper" + '=' + this.de_lte + '&' + "client" + '=' + this.cafupdfrm.value.aaa_cd + "'"
    };
    console.log("Ponchange 6", data)
    this.shwLdr = true;
    this.crdsrv.create(data, 'execurl')
      .subscribe((res) => {
        console.log(res);
        this.shwLdr = false;
        if (res['status'] == 200) {
          this.curlRslts = res['data'];
          this._snackBar.open('Executed Sucessfully', '', {
            duration: 2000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
          });
        } else
          this._snackBar.open('Something went wrong... Please try again', '', {
            duration: 2000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
          });
      }, (error) => {
        this.shwLdr = false;
        console.log(error);
        this._snackBar.open('Something went wrong... Please try again', '', {
          duration: 2000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
      });

  }

  PonAdd7() {
    this.edibtnenble = true;
    this.cafupdfrm.get('service_pack').setValidators(Validators.required);
    this.cafupdfrm.get('service_pack').updateValueAndValidity();
    //this.updateBtn = true;
    if (this.cafupdfrm.get('service_pack').value) {
      let data = {
        "enty_id": 1,
        "actn_id": 1,
        "actn_nm": "PON CHANGE",
        "commands": "curl -XPOST -H" + ' "username' + ':' + ' teraadmin" -H "apikey' + ':' + ' 6ed73c1a-7817-49ab-b185-981f97cf5fd8" -H' + ' "Content-type' + ':' + ' application/json" -d' + "'{" + '"subscribercode"' + ':' + '"' + this.cafupdfrm.value.mdlwre_cd + '"' + ',' + '"servicepacks"' + ':' + '[{' + '"servicepack"' + ':' + '"' + this.cafupdfrm.value.service_pack + '"' + ',' + '"expirydate"' + ':' + '"29991231"' + ',' + '"reason"' + ':' + '"I want To Activate"' + '}]' + ',' + '"expirydate"' + ':' + '"29991231"' + "}'" + ' "http://iptv.apsfl.co.in:8080/appserver/rest/iptv/addservicepack"',
      };
      console.log(data, "Pon change 7")
      this.shwLdr = true;
      this.crdsrv.create(data, 'execurl')
        .subscribe((res) => {
          console.log(res);
          this.shwLdr = false;
          if (res['status'] == 200) {
            this.curlRslts = res['data'];
            this._snackBar.open('Executed Sucessfully', '', {
              duration: 2000,
              horizontalPosition: this.horizontalPosition,
              verticalPosition: this.verticalPosition,
            });
          } else
            this._snackBar.open('Something went wrong... Please try again', '', {
              duration: 2000,
              horizontalPosition: this.horizontalPosition,
              verticalPosition: this.verticalPosition,
            });
        }, (error) => {
          this.shwLdr = false;
          console.log(error);
          this._snackBar.open('Something went wrong... Please try again', '', {
            duration: 2000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
          });
        });
    } else {
      this.srvce_pack = true;
    }


  }


  boxchange1() {
    this.cafupdfrm.enable()
    this.edibtnenble = true;
    if (this.internetpack == false)
      this.boxenb2 = true;
    let data = {
      "sourceCTP":
      {
        "ipAddress": this.cafupdfrm.value.ip_adr,
        "slotIndex": this.cafupdfrm.value.olt_crd_nu,
        "portIndex": this.cafupdfrm.value.pon,
        "onuId": this.cafupdfrm.value.olt_onu_id,
        "serial": this.cafupdfrm.value.old_agora_srl_nu
      },
      "targetCTP":
      {
        "ipAddress": this.cafupdfrm.value.ip_adr,
        "ctp": {
          "serial": this.cafdata[0].onu_srl_nu
        }
      }
    };
    this.shwLdr = true;
    this.http.post('https://bbnlbss.apsfl.co.in/apiv1/dashbrd/dasanBoxchange', data).subscribe(res => {
      console.log(res);
      this.shwLdr = false;
      if (res['status'] == 200) {
        this.curlRslts = res['data'];
        this._snackBar.open('Executed Sucessfully', '', {
          duration: 2000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
      } else
        this._snackBar.open('Something went wrong... Please try again', '', {
          duration: 2000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
    }, (error) => {
      this.shwLdr = false;
      console.log(error);
      this._snackBar.open('Something went wrong... Please try again', '', {
        duration: 2000,
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      });
    });

  }




  boxchange2() {
    this.edibtnenble = true;
    //this.updateBtn = true;
    let data = {"subscriberCode":this.cafupdfrm.value.mdlwre_cd,"oldDevice":this.cafupdfrm.value.iptv_mac_addr,"newDevice":this.cafupdfrm.value.iptv_mac_new};
    this.shwLdr = true;
    this.http.post('https://bbnlbss.apsfl.co.in/apiv1/dashbrd/IPtvdasanBoxReplace', data).subscribe(res => {
        console.log(res);
        this.shwLdr = false;
        if (res['status'] == 200) {
          this.curlRslts = res['data'];
          this._snackBar.open('Executed Sucessfully', '', {
            duration: 2000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
          });
        } else
          this._snackBar.open('Something went wrong... Please try again', '', {
            duration: 2000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
          });
      }, (error) => {
        this.shwLdr = false;
        console.log(error);
        this._snackBar.open('Something went wrong... Please try again', '', {
          duration: 2000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
      });

  }




  Resume1() {
    this.cafupdfrm.enable()
    this.repng123 = true;
    this.edibtnenble = true;
    let data = { "aaa_cd": this.cafupdfrm.value.aaa_cd };
    var rte;
    if (this.de_lte == 'view') {
      rte = `https://bbnlbss.apsfl.co.in/apiv1/dashbrd/huaweiAAAview`;
    } else {
      rte = `https://bbnlbss.apsfl.co.in/apiv1/dashbrd/huaweiAAAdelete`;
    }
    console.log("rte", rte);

    console.log(data, "Pon Das Das del")
    this.shwLdr = true;
    this.http.post(rte, data).subscribe(res => {
        console.log(res);
        this.shwLdr = false;
        if (res['status'] == 200) {
          this.curlRslts = res['data'];
          this._snackBar.open('Executed Sucessfully', '', {
            duration: 2000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
          });
        } else
          this._snackBar.open('Something went wrong... Please try again', '', {
            duration: 2000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
          });
      }, (error) => {
        this.shwLdr = false;
        console.log(error);
        this._snackBar.open('Something went wrong... Please try again', '', {
          duration: 2000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
      });

  }


  Resume2() {
    this.cafupdfrm.enable()
    this.repng234 = true;
    this.edibtnenble = true;
    let data = { "aaa_cd": this.cafupdfrm.value.aaa_cd, "access_id": this.cafupdfrm.value.onu_mac_addr, "profile_tx": this.cafupdfrm.value.down_stream };
    console.log(data, "Das_PndAct4")
    //this.shwLdr = true;
    this.http.post("https://bbnlbss.apsfl.co.in/apiv1/dashbrd/createHuaweiProfile", data).subscribe(res => {
      console.log(res);
        this.shwLdr = false;
        if (res['status'] == 200) {
          this.curlRslts = res['data'];
          this._snackBar.open('Executed Sucessfully', '', {
            duration: 2000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
          });
        } else
          this._snackBar.open('Something went wrong... Please try again', '', {
            duration: 2000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
          });
      }, (error) => {
        this.shwLdr = false;
        console.log(error);
        this._snackBar.open('Something went wrong... Please try again', '', {
          duration: 2000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
      });

  }


  Resume3() {
    this.cafupdfrm.enable()
    this.repng345 = true;
    this.edibtnenble = true;
    let data = {
      "aaa_cd": this.cafupdfrm.value.aaa_cd,
      "sa": this.cafupdfrm.value.down_stream
    };
    this.shwLdr = true;
    this.http.post('https://bbnlbss.apsfl.co.in/apiv1/dashbrd/HuaweiBngUpdateProfile', data).subscribe(res => {
        console.log(res);
        this.shwLdr = false;
        if (res['status'] == 200) {
          this.curlRslts = res['data'];
          this._snackBar.open('Executed Sucessfully', '', {
            duration: 2000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
          });
        } else
          this._snackBar.open('Something went wrong... Please try again', '', {
            duration: 2000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
          });
      }, (error) => {
        this.shwLdr = false;
        console.log(error);
        this._snackBar.open('Something went wrong... Please try again', '', {
          duration: 2000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
      });

  }



  Resume4() {
    this.cafupdfrm.enable()
    this.edibtnenble = true;
    let data = { "subscribercode": this.cafupdfrm.value.mdlwre_cd, "servicepacks": [{ "servicepack": this.cafupdfrm.value.service_pack, "expirydate": "29991231" }] };
    console.log(data, "Package Push Name")
    this.shwLdr = true;
    this.http.post("https://bbnlbss.apsfl.co.in/apiv1/dashbrd/firstTimeaddnewservicepack", data).subscribe(res => {
        console.log(res);
        this.shwLdr = false;
        if (res['status'] == 200) {
          this.curlRslts = res['data'];
          this._snackBar.open('Executed Sucessfully', '', {
            duration: 2000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
          });
        } else
          this._snackBar.open('Something went wrong... Please try again', '', {
            duration: 2000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
          });
      }, (error) => {
        this.shwLdr = false;
        console.log(error);
        this._snackBar.open('Something went wrong... Please try again', '', {
          duration: 2000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
      });

  }


  // Resume5() {
  //   this.edibtnenble = true;
  //   this.updateBtn = true;
  //   let data = {
  //     "enty_id": 1,
  //     "actn_id": 1,
  //     "actn_nm": "Resume Pending",
  //     "commands": "curl -XPOST -H" + " 'username: teraadmin' -H" + " 'apikey" + ":" + " 6ed73c1a-7817-49ab-b185-981f97cf5fd8' -H" + ' "Content-type' + ":" + ' application/json" -d' + " '{" + '"subscribercode"' + ':' + '"' + this.cafupdfrm.value.mdlwre_cd + '"' + ',' + '"servicepacks"' + ':' + '[{' + '"servicepack"' + ':' + '"' + this.cafupdfrm.value.service_pack + '"' + ',' + '"reason"' + ':' + '"Amount not paid"' + "}]}' " + 'http://iptv.apsfl.co.in:8080/appserver/rest/iptv/disconnectservicepack'
  //   };
  //   this.shwLdr = true;
  //   this.crdsrv.create(data, 'execurl')
  //     .subscribe((res) => {
  //       console.log(res);
  //       this.shwLdr = false;
  //       if (res['status'] == 200) {
  //         this.curlRslts = res['data'];
  //         this._snackBar.open('Executed Sucessfully', '', {
  //           duration: 2000,
  //           horizontalPosition: this.horizontalPosition,
  //           verticalPosition: this.verticalPosition,
  //         });
  //       } else
  //         this._snackBar.open('Something went wrong... Please try again', '', {
  //           duration: 2000,
  //           horizontalPosition: this.horizontalPosition,
  //           verticalPosition: this.verticalPosition,
  //         });
  //     }, (error) => {
  //       this.shwLdr = false;
  //       console.log(error);
  //       this._snackBar.open('Something went wrong... Please try again', '', {
  //         duration: 2000,
  //         horizontalPosition: this.horizontalPosition,
  //         verticalPosition: this.verticalPosition,
  //       });
  //     });

  // }




  Suspnd1() {
    this.cafupdfrm.enable()
    this.suspnd123 = true;
    this.edibtnenble = true;
    let data = { "aaa_cd": this.cafupdfrm.value.aaa_cd };
    var rte;
    if (this.de_lte == 'view') {
      rte = `https://bbnlbss.apsfl.co.in/apiv1/dashbrd/huaweiAAAview`;
    } else {
      rte = `https://bbnlbss.apsfl.co.in/apiv1/dashbrd/huaweiAAAdelete`;
    }
    console.log("rte", rte);

    console.log(data, "Pon Das Das del")
    this.shwLdr = true;
    this.http.post(rte, data).subscribe(res => {
        console.log(res);
        this.shwLdr = false;
        if (res['status'] == 200) {
          this.curlRslts = res['data'];
          this._snackBar.open('Executed Sucessfully', '', {
            duration: 2000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
          });
        } else
          this._snackBar.open('Something went wrong... Please try again', '', {
            duration: 2000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
          });
      }, (error) => {
        this.shwLdr = false;
        console.log(error);
        this._snackBar.open('Something went wrong... Please try again', '', {
          duration: 2000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
      });

  }


  Suspnd2() {
    this.cafupdfrm.enable()
    this.suspnd234 = true;
    this.edibtnenble = true;

    let data = { "aaa_cd": this.cafupdfrm.value.aaa_cd, "access_id": this.cafupdfrm.value.onu_mac_addr, "profile_tx": this.cafupdfrm.value.down_stream };
      console.log(data, "Das_PndAct4")
      //this.shwLdr = true;
      this.http.post("https://bbnlbss.apsfl.co.in/apiv1/dashbrd/createHuaweiProfile", data).subscribe(res => {
        console.log(res);
        this.shwLdr = false;
        if (res['status'] == 200) {
          this.curlRslts = res['data'];
          this._snackBar.open('Executed Sucessfully', '', {
            duration: 2000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
          });
        } else
          this._snackBar.open('Something went wrong... Please try again', '', {
            duration: 2000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
          });
      }, (error) => {
        this.shwLdr = false;
        console.log(error);
        this._snackBar.open('Something went wrong... Please try again', '', {
          duration: 2000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
      });

  }


  Suspnd3() {
    this.cafupdfrm.enable()
    this.suspnd345 = true;
    this.edibtnenble = true;
    let data = {
      "aaa_cd": this.cafupdfrm.value.aaa_cd,
      "sa": this.cafupdfrm.value.down_stream
    };
    this.shwLdr = true;
    this.http.post('https://bbnlbss.apsfl.co.in/apiv1/dashbrd/HuaweiBngUpdateProfile', data).subscribe(res => {
        console.log(res);
        this.shwLdr = false;
        if (res['status'] == 200) {
          this.curlRslts = res['data'];
          this._snackBar.open('Executed Sucessfully', '', {
            duration: 2000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
          });
        } else
          this._snackBar.open('Something went wrong... Please try again', '', {
            duration: 2000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
          });
      }, (error) => {
        this.shwLdr = false;
        console.log(error);
        this._snackBar.open('Something went wrong... Please try again', '', {
          duration: 2000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
      });

  }



  // Suspnd4() {
  //   this.cafupdfrm.enable()
  //   this.suspnd456 = true;
  //   this.edibtnenble = true;
  //   let data = {
  //     "enty_id": 1,
  //     "actn_id": 1,
  //     "actn_nm": "Suspend Pending",
  //     "commands": "curl -XPOST -H" + ' "username' + ':' + ' teraadmin" -H "apikey' + ':' + ' 6ed73c1a-7817-49ab-b185-981f97cf5fd8" -H' + ' "Content-type' + ':' + ' application/json" -d' + " '{" + '"subscribercode"' + ':' + '"' + this.cafupdfrm.value.mdlwre_cd + '"' + ',' + '"servicepacks"' + ':' + '[{' + '"servicepack"' + ':' + '"' + this.cafupdfrm.value.service_pack + '"' + ',' + '"expirydate"' + ':' + '"' + this.cafupdfrm.value.expry_date + '"' + '}]}' + "'" + " http://iptv.apsfl.co.in:8080/appserver/rest/iptv/addservicepack",
  //   };
  //   this.shwLdr = true;
  //   this.crdsrv.create(data, 'execurl')
  //     .subscribe((res) => {
  //       console.log(res);
  //       this.shwLdr = false;
  //       if (res['status'] == 200) {
  //         this.curlRslts = res['data'];
  //         this._snackBar.open('Executed Sucessfully', '', {
  //           duration: 2000,
  //           horizontalPosition: this.horizontalPosition,
  //           verticalPosition: this.verticalPosition,
  //         });
  //       } else
  //         this._snackBar.open('Something went wrong... Please try again', '', {
  //           duration: 2000,
  //           horizontalPosition: this.horizontalPosition,
  //           verticalPosition: this.verticalPosition,
  //         });
  //     }, (error) => {
  //       this.shwLdr = false;
  //       console.log(error);
  //       this._snackBar.open('Something went wrong... Please try again', '', {
  //         duration: 2000,
  //         horizontalPosition: this.horizontalPosition,
  //         verticalPosition: this.verticalPosition,
  //       });
  //     });

  // }


  Suspnd5() {
    this.edibtnenble = true;
    //this.updateBtn = true;
    let data = 
      {"subscribercode":this.cafupdfrm.value.mdlwre_cd , "servicepacks":[{"servicepack":this.cafupdfrm.value.service_pack , "reason":"Amount not paid"}]}
    ;
    this.shwLdr = true;
    this.http.post('https://bbnlbss.apsfl.co.in/apiv1/dashbrd/disconnectservicepack', data).subscribe(res => {
        console.log(res);
        this.shwLdr = false;
        if (res['status'] == 200) {
          this.curlRslts = res['data'];
          this._snackBar.open('Executed Sucessfully', '', {
            duration: 2000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
          });
        } else
          this._snackBar.open('Something went wrong... Please try again', '', {
            duration: 2000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
          });
      }, (error) => {
        this.shwLdr = false;
        console.log(error);
        this._snackBar.open('Something went wrong... Please try again', '', {
          duration: 2000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
      });

  }





  Packag1() {
    this.cafupdfrm.enable();
    this.cafupdfrm.get('up_stream').clearValidators();
    this.cafupdfrm.get('up_stream').updateValueAndValidity();
    this.cafupdfrm.get('down_stream').clearValidators();
    this.cafupdfrm.get('down_stream').updateValueAndValidity();
    this.edibtnenble = true;
    this.pedmain = false;
    this.pack123 = true;

    let data = {
      "enty_id": 1,
      "actn_id": 1,
      "commands": "curl -XPOST -H" + " 'Authorization" + ': ' + "Basic YnNzOkJzc0AxMjM=' -H " + '"Content-type' + ': ' + 'application/json" -d' + "'{" + '"aid"' + ':' + '{' + '"ipAddress"' + ':' + '"' + this.cafupdfrm.value.ip_adr + '"' + ',' + '"card"' + ':' + this.cafupdfrm.value.olt_crd_nu + ',' + '"tp"' + ':' + this.cafupdfrm.value.pon + ',' + '"onuId"' + ':' + this.cafupdfrm.value.olt_onu_id + '}' + ',' + '"admin"' + ':' + '"1"' + ',' + '"fec"' + ':' + '"true"' + ',' + '"swUpgradeMode"' + ':' + '"2"' + ',' + '"serialNumber"' + ':' + '"' + this.cafupdfrm.value.agora_srl_nu + '"' + ',' + '"profileName"' + ':' + '"' + this.cafupdfrm.value.onu_mdle_cd + '"' + ',' + '"registerType"' + ':' + '"1"' + ',' + '"name"' + ':' + '"' + this.cafupdfrm.value.lst_nm + this.cafupdfrm.value.cstmr_nm + ' - ' + this.cafupdfrm.value.caf_nu + '"' + "}'" + " 'http://172.16.0.44:8080/agorang/rest/v1/eml/onu'",
      "actn_nm": "PENDING ACTIVATION",
    };
    this.shwLdr = true;
    this.http.post('http://172.16.0.44:8080/agorang/rest/v1/eml/onu', data).subscribe(res => {
      console.log(res);
      //this.replaceSlashes;
      this.shwLdr = false;
      if (res['status'] == 200) {
        this.curlRslts = res['data'];
        this._snackBar.open('Executed Sucessfully', '', {
          duration: 2000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
      } else
        this._snackBar.open('Something went wrong... Please try again', '', {
          duration: 2000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
    }, (error) => {
      this.shwLdr = false;
      console.log(error);
      this._snackBar.open('Something went wrong... Please try again', '', {
        duration: 2000,
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      });
    })


  }

  Packag2() {
    this.cafupdfrm.enable();
    this.cafupdfrm.get('up_stream').setValidators(Validators.required);
    this.cafupdfrm.get('up_stream').updateValueAndValidity();
    this.edibtnenble = true;
    this.pedmain = false;
    this.pack234 = true;
    if (this.cafupdfrm.get('up_stream').value) {
      let data = {
        "enty_id": 1,
        "actn_id": 1,
        "actn_nm": "PENDING ACTIVATION",
        "commands": "curl -XPOST -H" + " 'Authorization" + ': ' + "Basic YnNzOkJzc0AxMjM='  -H" + '"Content-type' + ':' + ' application/json" -d' + "'{" + '"aid"' + ':' + '{' + '"ipAddress"' + ':' + '"' + this.cafupdfrm.value.ip_adr + '"' + ',' + '"card"' + ':' + this.cafupdfrm.value.olt_crd_nu + ',' + '"tp"' + ':' + this.cafupdfrm.value.pon + ',' + '"onuId"' + ':' + this.cafupdfrm.value.olt_onu_id + '}' + ',' + '"tps"' + ':' + '[{' + '"card"' + ':' + '"1"' + ',' + '"tps"' + ':' + '["2"]' + '}]' + ',' + '"admin"' + ':' + '"1"' + ',' + '"name"' + ':' + '"HSI"' + ',' + '"networkServiceName"' + ':' + '"HSI"' + ',' + '"upstreamTrafficProfileName"' + ':' + '"' + this.cafupdfrm.value.up_stream + '"' + ',' + '"downstreamTrafficProfileName"' + ':' + '" "' + ',' + '"l2DhcpRelay"' + ':' + '{' + '"remoteId"' + ':' + '"ID"' + ',' + '"useGlobalDhcp"' + ':' + 'false' + ',' + '"op82"' + ':' + 'true' + ',' + '"op18"' + ':' + 'false' + ',' + '"op37"' + ':' + 'false' + '}' + ',' + '"igmpOptions"' + ':' + '{' + '"useGlobal"' + ':' + 'false' + ',' + '"enable"' + ':' + 'true' + '}' + ',' + '"nativeVlan"' + ':' + 'false' + "}'" + " 'http://172.16.0.44:8080/agorang/rest/v1/eml/clientservicegpon'",
      };
      this.shwLdr = true;
      this.crdsrv.create(data, 'execurl')
        .subscribe((res) => {
          console.log(res);
          this.shwLdr = false;
          if (res['status'] == 200) {
            this.curlRslts = res['data'];
            this._snackBar.open('Executed Sucessfully', '', {
              duration: 2000,
              horizontalPosition: this.horizontalPosition,
              verticalPosition: this.verticalPosition,
            });
          } else
            this._snackBar.open('Something went wrong... Please try again', '', {
              duration: 2000,
              horizontalPosition: this.horizontalPosition,
              verticalPosition: this.verticalPosition,
            });
        }, (error) => {
          this.shwLdr = false;
          console.log(error);
          this._snackBar.open('Something went wrong... Please try again', '', {
            duration: 2000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
          });
        });
    }
    else {
      this.upstrm_prfl_nm = true;
    }


  }

  Packag5() {
    this.cafupdfrm.enable()
    this.cafupdfrm.get('down_stream').setValidators(Validators.required);
    this.cafupdfrm.get('down_stream').updateValueAndValidity();
    this.edibtnenble = true;
    this.pedmain = false;
    this.pack345 = true;
    if (this.cafupdfrm.get('down_stream').value) {
      let data = {
        "enty_id": 1,
        "actn_id": 1,
        "actn_nm": "PENDING ACTIVATION",
        "commands": "curl -XGET -H" + ' "Content-type' + ':' + ' application/json"' + " 'http://172.16.4.107/prov4serv/prov_if?oper=insert&client" + '=' + this.cafupdfrm.value.aaa_cd + '&avp' + '=' + "Filter-Id<>nonblock<>check&avp=accessId<><>reply&avp=Profile<>pV4<>reply&avp=cisco-avpair<>subscriber:sa=" + this.cafupdfrm.value.down_stream + "<>reply&avp=cisco-avpair<>subscriber:accounting-list=default<>reply'",
      };
      this.shwLdr = true;
      this.crdsrv.create(data, 'execurl')
        .subscribe((res) => {
          console.log(res);
          this.shwLdr = false;
          if (res['status'] == 200) {
            this.curlRslts = res['data'];
            this._snackBar.open('Executed Sucessfully', '', {
              duration: 2000,
              horizontalPosition: this.horizontalPosition,
              verticalPosition: this.verticalPosition,
            });
          } else
            this._snackBar.open('Something went wrong... Please try again', '', {
              duration: 2000,
              horizontalPosition: this.horizontalPosition,
              verticalPosition: this.verticalPosition,
            });
        }, (error) => {
          this.shwLdr = false;
          console.log(error);
          this._snackBar.open('Something went wrong... Please try again', '', {
            duration: 2000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
          });
        });
    }
    else {
      this.subs_prfle_nm = true;
    }


  }


  Packag6() {
    this.cafupdfrm.enable()
    this.edibtnenble = true;
    //this.pedmain = false;
    let data = {
      "enty_id": 1,
      "actn_id": 1,
      "actn_nm": "PENDING ACTIVATION",
      "commands": "curl -XGET -H" + ' "Content-type: application/json"' + " 'http://172.16.4.107/prov4serv/prov_if?oper" + '=' + this.de_lte + '&' + "client" + '=' + this.cafupdfrm.value.aaa_cd + "'",

    };
    this.shwLdr = true;
    this.crdsrv.create(data, 'execurl')
      .subscribe((res) => {
        console.log(res);
        this.shwLdr = false;
        if (res['status'] == 200) {
          this.curlRslts = res['data'];
          this._snackBar.open('Executed Sucessfully', '', {
            duration: 2000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
          });
        } else
          this._snackBar.open('Something went wrong... Please try again', '', {
            duration: 2000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
          });
      }, (error) => {
        this.shwLdr = false;
        console.log(error);
        this._snackBar.open('Something went wrong... Please try again', '', {
          duration: 2000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
      });

  }



  //******************** DAS_ DAs HSI P.Activation Starts ***********************//

  DAS_DAS_HSi_PA1() {
    this.cafupdfrm.enable();
    this.cafupdfrm.get('up_stream').clearValidators();
    this.cafupdfrm.get('up_stream').updateValueAndValidity();
    this.cafupdfrm.get('down_stream').clearValidators();
    this.cafupdfrm.get('down_stream').updateValueAndValidity();
    this.edibtnenble = true;
    this.pedmain = false;
    this.DAS_DAS_HSI_1 = true;

    let data = { "aid": { "ipAddress": this.cafupdfrm.value.ip_adr, "type": 10023, "card": this.cafupdfrm.value.olt_crd_nu, "tp": this.cafupdfrm.value.pon, "onuId": this.cafupdfrm.value.olt_onu_id }, "admin": 1, "fec": true, "swUpgradeMode": 2, "serialNumber": this.cafupdfrm.value.onu_srl_nu, "profileName": this.cafupdfrm.value.onu_mdle_cd, "registerType": 1, "name": this.cafupdfrm.value.lst_nm - this.cafupdfrm.value.cstmr_nm - this.cafupdfrm.value.caf_nu };
    console.log("Hsi DAS_DAS1", data)
    //this.shwLdr = true;
    this.http.post("https://bbnlbss.apsfl.co.in/apiv1/dashbrd/dasanCreateOnu", data).subscribe(res => {
      console.log(res);
      //this.replaceSlashes;
      this.shwLdr = false;
      if (res['status'] == 200) {
        this.curlRslts = res['data'];
        this._snackBar.open('Executed Sucessfully', '', {
          duration: 2000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
      } else
        this._snackBar.open('Something went wrong... Please try again', '', {
          duration: 2000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
    }, (error) => {
      this.shwLdr = false;
      console.log(error);
      this._snackBar.open('Something went wrong... Please try again', '', {
        duration: 2000,
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      });
    })


  }

  DAS_DAS_HSi_PA2() {
    this.cafupdfrm.enable();
    this.cafupdfrm.get('up_stream').setValidators(Validators.required);
    this.cafupdfrm.get('up_stream').updateValueAndValidity();
    this.edibtnenble = true;
    this.pedmain = false;
    this.DAS_DAS_HSI_2 = true;
    if (this.cafupdfrm.get("up_stream").value) {
      let data = { "aid": { "ipAddress": this.cafupdfrm.value.ip_adr, "card": this.cafupdfrm.value.olt_crd_nu, "tp": this.cafupdfrm.value.pon, "onuId": this.cafupdfrm.value.olt_onu_id }, "tps": [{ "card": this.cafupdfrm.value.olt_crd_nu, "tps": ["6"] }], "admin": "1", "name": "HSI", "networkServiceName": "HSI", "upstreamTrafficProfileName": this.cafupdfrm.value.up_stream, "downstreamTrafficProfileName": " ", "l2DhcpRelay": { "remoteId": "ID", "useGlobalDhcp": false, "op82": true, "op18": false, "op37": false }, "igmpOptions": { "useGlobal": false, "enable": true }, "nativeVlan": false };
      console.log("Hsi DAS_DAS2", data)
      //this.shwLdr = true;
      this.http.post("https://bbnlbss.apsfl.co.in/apiv1/dashbrd/dasanCreateOnuHsi", data).subscribe(res => {
        console.log(res);
        this.shwLdr = false;
        if (res['status'] == 200) {
          this.curlRslts = res['data'];
          this._snackBar.open('Executed Sucessfully', '', {
            duration: 2000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
          });
        } else
          this._snackBar.open('Something went wrong... Please try again', '', {
            duration: 2000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
          });
      }, (error) => {
        this.shwLdr = false;
        console.log(error);
        this._snackBar.open('Something went wrong... Please try again', '', {
          duration: 2000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
      });
    }
    else {
      this.upstrm_prfl_nm = true;
    }


  }

  DAS_DAS_HSi_PA5() {
    this.cafupdfrm.enable();
    this.cafupdfrm.get('down_stream').setValidators(Validators.required);
    this.cafupdfrm.get('down_stream').updateValueAndValidity();
    this.edibtnenble = true;
    // this.pedmain = false;
    if (this.cafupdfrm.get("down_stream").value) {
      let data = { "aaa_cd": this.cafupdfrm.value.aaa_cd, "access_id": this.cafupdfrm.value.onu_mac_addr, "profile_tx": this.cafupdfrm.value.down_stream };
      console.log("Hsi DAS_DAS3", data)
      //this.shwLdr = true;
      this.http.post("https://bbnlbss.apsfl.co.in/apiv1/dashbrd/createHuaweiProfile", data).subscribe(res => {
        console.log(res);
        this.shwLdr = false;
        if (res['status'] == 200) {
          this.curlRslts = res['data'];
          this._snackBar.open('Executed Sucessfully', '', {
            duration: 2000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
          });
        } else
          this._snackBar.open('Something went wrong... Please try again', '', {
            duration: 2000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
          });
      }, (error) => {
        this.shwLdr = false;
        console.log(error);
        this._snackBar.open('Something went wrong... Please try again', '', {
          duration: 2000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
      });
    }
    else {
      this.subs_prfle_nm = true;
    }


  }


  //******************** DAS_ DAs HSI P.Activation ends ***********************//






  PonPack1() {
    this.cafupdfrm.enable();
    this.cafupdfrm.get('up_stream').clearValidators();
    this.cafupdfrm.get('up_stream').updateValueAndValidity();
    this.cafupdfrm.get('down_stream').clearValidators();
    this.cafupdfrm.get('down_stream').updateValueAndValidity();
    this.cafupdfrm.get('lst_nm').clearValidators();
    this.cafupdfrm.get('lst_nm').updateValueAndValidity();
    this.edibtnenble = true;
    //this.pondelete = false;
    this.PonPack234 = true;
    let data = {
      "enty_id": 1,
      "actn_id": 1,
      "commands": "curl -XPOST -H" + " 'Authorization" + ': ' + "Basic YnNzOkJzc0AxMjM=' -H " + '"Content-type' + ': ' + 'application/json" -d' + "'{" + '"aid"' + ':' + '{' + '"ipAddress"' + ':' + '"' + this.cafupdfrm.value.ip_adr + '"' + ',' + '"card"' + ':' + this.cafupdfrm.value.olt_crd_nu + ',' + '"tp"' + ':' + this.cafupdfrm.value.pon + ',' + '"onuId"' + ':' + this.cafupdfrm.value.olt_onu_id + '}' + ',' + '"admin"' + ':' + '"1"' + ',' + '"fec"' + ':' + '"true"' + ',' + '"swUpgradeMode"' + ':' + '"2"' + ',' + '"serialNumber"' + ':' + '"' + this.cafupdfrm.value.agora_srl_nu + '"' + ',' + '"profileName"' + ':' + '"' + this.cafupdfrm.value.onu_mdle_cd + '"' + ',' + '"registerType"' + ':' + '"1"' + ',' + '"name"' + ':' + '"' + this.cafupdfrm.value.lst_nm + this.cafupdfrm.value.cstmr_nm + ' - ' + this.cafupdfrm.value.caf_nu + '"' + "}'" + " 'http://172.16.0.44:8080/agorang/rest/v1/eml/onu'",
      "actn_nm": "PON CHANGE",
    };
    this.shwLdr = true;
    this.crdsrv.create(data, 'execurl')
      .subscribe((res) => {
        console.log(res);
        //console.log(this.PenAct1);
        //this.replaceSlashes;
        this.shwLdr = false;
        if (res['status'] == 200) {
          this.curlRslts = res['data'];
          this._snackBar.open('Executed Sucessfully', '', {
            duration: 2000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
          });
        } else
          this._snackBar.open('Something went wrong... Please try again', '', {
            duration: 2000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
          });
      }, (error) => {
        this.shwLdr = false;
        console.log(error);
        this._snackBar.open('Something went wrong... Please try again', '', {
          duration: 2000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
      })


  }



  PonPack2() {
    this.cafupdfrm.enable();
    this.cafupdfrm.get('up_stream').setValidators(Validators.required);
    this.cafupdfrm.get('up_stream').updateValueAndValidity();
    this.edibtnenble = true;
    this.PonPack345 = true;
    // this.pondelete = false;
    if (this.cafupdfrm.get('up_stream').value) {
      let data = {
        "enty_id": 1,
        "actn_id": 1,
        "actn_nm": "PON CHANGE",
        "commands": "curl -XPOST -H" + " 'Authorization" + ': ' + "Basic YnNzOkJzc0AxMjM='  -H" + '"Content-type' + ':' + ' application/json" -d' + "'{" + '"aid"' + ':' + '{' + '"ipAddress"' + ':' + '"' + this.cafupdfrm.value.ip_adr + '"' + ',' + '"card"' + ':' + this.cafupdfrm.value.olt_crd_nu + ',' + '"tp"' + ':' + this.cafupdfrm.value.pon + ',' + '"onuId"' + ':' + this.cafupdfrm.value.olt_onu_id + '}' + ',' + '"tps"' + ':' + '[{' + '"card"' + ':' + '"1"' + ',' + '"tps"' + ':' + '["2"]' + '}]' + ',' + '"admin"' + ':' + '"1"' + ',' + '"networkServiceName"' + ':' + '"HSI"' + ',' + '"name"' + ':' + '"HSI"' + ',' + '"upstreamTrafficProfileName"' + ':' + '"' + this.cafupdfrm.value.up_stream + '"' + ',' + '"downstreamTrafficProfileName"' + ':' + '" "' + ',' + '"l2DhcpRelay"' + ':' + '{' + '"remoteId"' + ':' + '"ID"' + ',' + '"useGlobalDhcp"' + ':' + 'false' + ',' + '"op82"' + ':' + 'true' + ',' + '"op18"' + ':' + 'false' + ',' + '"op37"' + ':' + 'false' + '}' + ',' + '"igmpOptions"' + ':' + '{' + '"useGlobal"' + ':' + 'false' + ',' + '"enable"' + ':' + 'true' + '}' + ',' + '"nativeVlan"' + ':' + 'false' + "}'" + " 'http://172.16.0.44:8080/agorang/rest/v1/eml/clientservicegpon'",
      };
      this.shwLdr = true;
      this.crdsrv.create(data, 'execurl')
        .subscribe((res) => {
          console.log(res);
          this.shwLdr = false;
          if (res['status'] == 200) {
            this.curlRslts = res['data'];
            this._snackBar.open('Executed Sucessfully', '', {
              duration: 2000,
              horizontalPosition: this.horizontalPosition,
              verticalPosition: this.verticalPosition,
            });
          } else
            this._snackBar.open('Something went wrong... Please try again', '', {
              duration: 2000,
              horizontalPosition: this.horizontalPosition,
              verticalPosition: this.verticalPosition,
            });
        }, (error) => {
          this.shwLdr = false;
          console.log(error);
          this._snackBar.open('Something went wrong... Please try again', '', {
            duration: 2000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
          });
        });
    } else {
      this.upstrm_prfl_nm = true;
    }


  }



  PonPack5() {
    this.cafupdfrm.enable();
    this.cafupdfrm.get('down_stream').setValidators(Validators.required);
    this.cafupdfrm.get('down_stream').updateValueAndValidity();
    this.edibtnenble = true;
    this.PonPack456 = true;
    //   this.pondelete = false;
    if (this.cafupdfrm.get('down_stream').value) {
      let data = {
        "enty_id": 1,
        "actn_id": 1,
        "actn_nm": "PON CHANGE",
        "commands": "curl -XGET -H" + ' "Content-type' + ':' + ' application/json"' + " 'http://172.16.4.107/prov4serv/prov_if?oper=insert&client" + '=' + this.cafupdfrm.value.aaa_cd + '&avp' + '=' + "Filter-Id<>nonblock<>check&avp=accessId<>" + this.cafupdfrm.value.onu_mac_addr + "<>reply&avp=Profile<>pV4<>reply&avp=cisco-avpair<>subscriber:sa=" + this.cafupdfrm.value.down_stream + "<>reply&avp=cisco-avpair<>subscriber:accounting-list=default<>reply'",
      };
      this.shwLdr = true;
      this.crdsrv.create(data, 'execurl')
        .subscribe((res) => {
          console.log(res);
          this.shwLdr = false;
          if (res['status'] == 200) {
            this.curlRslts = res['data'];
            this._snackBar.open('Executed Sucessfully', '', {
              duration: 2000,
              horizontalPosition: this.horizontalPosition,
              verticalPosition: this.verticalPosition,
            });
          } else
            this._snackBar.open('Something went wrong... Please try again', '', {
              duration: 2000,
              horizontalPosition: this.horizontalPosition,
              verticalPosition: this.verticalPosition,
            });
        }, (error) => {
          this.shwLdr = false;
          console.log(error);
          this._snackBar.open('Something went wrong... Please try again', '', {
            duration: 2000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
          });
        });
    } else {
      this.subs_prfle_nm = true;
    }



  }




  PonPack6() {
    this.cafupdfrm.enable()
    this.edibtnenble = true;
    //this.PonPack567 = true;
    //this.pondelete = false;
    let data = {
      "enty_id": 1,
      "actn_id": 1,
      "actn_nm": "PON CHANGE",
      "commands": "curl -XGET -H" + ' "Content-type: application/json"' + " 'http://172.16.4.107/prov4serv/prov_if?oper" + '=' + this.de_lte + '&' + "client" + '=' + this.cafupdfrm.value.aaa_cd + "'",

    };
    console.log(data, "AGH-AGH HSI TEsting View")
    this.shwLdr = true;
    this.crdsrv.create(data, 'execurl')
      .subscribe((res) => {
        console.log(res);
        this.shwLdr = false;
        if (res['status'] == 200) {
          this.curlRslts = res['data'];
          this._snackBar.open('Executed Sucessfully', '', {
            duration: 2000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
          });
        } else
          this._snackBar.open('Something went wrong... Please try again', '', {
            duration: 2000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
          });
      }, (error) => {
        this.shwLdr = false;
        console.log(error);
        this._snackBar.open('Something went wrong... Please try again', '', {
          duration: 2000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
      });

  }






  Packdet1() {
    this.cafupdfrm.enable()
    this.Packdt123 = true;
    this.edibtnenble = true;
    this.onAgoraBlur();
    let data = {
      "enty_id": 1,
      "actn_id": 1,
      "actn_nm": "PON Change",
      "commands": "curl -XDELETE -H" + " 'Authorization: Basic YnNzOkJzc0AxMjM=' -H" + ' "Content-type: application/json"' + " 'http://172.16.0.44:8080/agorang/rest/v1/eml/clientservicegpon/" + this.cafupdfrm.value.aga_cd + '-' + "VOIP'",
    };
    this.shwLdr = true;
    this.crdsrv.create(data, 'execurl')
      .subscribe((res) => {
        console.log(res);
        this.shwLdr = false;
        if (res['status'] == 200) {
          this.curlRslts = res['data'];
          this._snackBar.open('Executed Sucessfully', '', {
            duration: 2000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
          });
        } else
          this._snackBar.open('Something went wrong... Please try again', '', {
            duration: 2000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
          });
      }, (error) => {
        this.shwLdr = false;
        console.log(error);
        this._snackBar.open('Something went wrong... Please try again', '', {
          duration: 2000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
      });

  }



  Packdet2() {
    this.cafupdfrm.enable()
    this.Packdt234 = true;
    this.edibtnenble = true;
    let data = {
      "enty_id": 1,
      "actn_id": 1,
      "actn_nm": "PON Change",
      "commands": "curl -XDELETE -H" + " 'Authorization: Basic YnNzOkJzc0AxMjM=' -H" + ' "Content-type: application/json"' + " 'http://172.16.0.44:8080/agorang/rest/v1/eml/clientservicegpon/" + this.cafupdfrm.value.aga_cd + '-' + "IPTV'",
    };
    this.shwLdr = true;
    this.crdsrv.create(data, 'execurl')
      .subscribe((res) => {
        console.log(res);
        this.shwLdr = false;
        if (res['status'] == 200) {
          this.curlRslts = res['data'];
          this._snackBar.open('Executed Sucessfully', '', {
            duration: 2000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
          });
        } else
          this._snackBar.open('Something went wrong... Please try again', '', {
            duration: 2000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
          });
      }, (error) => {
        this.shwLdr = false;
        console.log(error);
        this._snackBar.open('Something went wrong... Please try again', '', {
          duration: 2000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
      });

  }


  Packdet3() {
    this.cafupdfrm.enable()
    this.Packdt345 = true;
    this.edibtnenble = true;
    let data = {
      "enty_id": 1,
      "actn_id": 1,
      "actn_nm": "PON Change",
      "commands": "curl -XDELETE -H" + " 'Authorization: Basic YnNzOkJzc0AxMjM=' -H" + ' "Content-type: application/json"' + " 'http://172.16.0.44:8080/agorang/rest/v1/eml/clientservicegpon/" + this.cafupdfrm.value.agora_cd + "'",
    };
    this.shwLdr = true;
    this.crdsrv.create(data, 'execurl')
      .subscribe((res) => {
        console.log(res);
        this.shwLdr = false;
        if (res['status'] == 200) {
          this.curlRslts = res['data'];
          this._snackBar.open('Executed Sucessfully', '', {
            duration: 2000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
          });
        } else
          this._snackBar.open('Something went wrong... Please try again', '', {
            duration: 2000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
          });
      }, (error) => {
        this.shwLdr = false;
        console.log(error);
        this._snackBar.open('Something went wrong... Please try again', '', {
          duration: 2000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
      });

  }


  Packdet4() {
    this.edibtnenble = true;
    //this.updateBtn = true;
    let data = {
      "enty_id": 1,
      "actn_id": 1,
      "actn_nm": "PON Change",
      "commands": "curl -XDELETE -H" + " 'Authorization: Basic YnNzOkJzc0AxMjM=' -H" + ' "Content-type: application/json"' + " 'http://172.16.0.44:8080/agorang/rest/v1/eml/onu/" + this.cafupdfrm.value.aga_cd + "'",
    };
    this.shwLdr = true;
    this.crdsrv.create(data, 'execurl')
      .subscribe((res) => {
        console.log(res);
        this.shwLdr = false;
        if (res['status'] == 200) {
          this.curlRslts = res['data'];
          this._snackBar.open('Executed Sucessfully', '', {
            duration: 2000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
          });
        } else
          this._snackBar.open('Something went wrong... Please try again', '', {
            duration: 2000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
          });
      }, (error) => {
        this.shwLdr = false;
        console.log(error);
        this._snackBar.open('Something went wrong... Please try again', '', {
          duration: 2000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
      });

  }

  pon_Das_Das_hsi() {
    this.cafupdfrm.enable()
    this.edibtnenble = true;

    let data = {
      "enty_id": 1,
      "actn_id": 1,
      "actn_nm": "PON CHANGE",
      "commands": `curl -XGET -H "Content-type: application/json" 'http://172.16.4.107/prov4serv/prov_if?oper=delete&client=lag:${this.cafupdfrm.value.aaa_cd}'`
    };
    console.log(data, "DAS-DAS_HSI")
    // this.shwLdr = true;
    // this.crdsrv.create(data, 'execurl')
    //   .subscribe((res) => {
    //     console.log(res);
    //     this.shwLdr = false;
    //     if (res['status'] == 200) {
    //       this.curlRslts = res['data'];
    //       this._snackBar.open('Executed Sucessfully', '', {
    //         duration: 2000,
    //         horizontalPosition: this.horizontalPosition,
    //         verticalPosition: this.verticalPosition,
    //       });
    //     } else
    //       this._snackBar.open('Something went wrong... Please try again', '', {
    //         duration: 2000,
    //         horizontalPosition: this.horizontalPosition,
    //         verticalPosition: this.verticalPosition,
    //       });
    //   }, (error) => {
    //     this.shwLdr = false;
    //     console.log(error);
    //     this._snackBar.open('Something went wrong... Please try again', '', {
    //       duration: 2000,
    //       horizontalPosition: this.horizontalPosition,
    //       verticalPosition: this.verticalPosition,
    //     });
    //   });

  }


  pon_Das_Das() {
    this.cafupdfrm.enable()
    this.edibtnenble = true;

    let data = { "aaa_cd": this.cafupdfrm.value.aaa_cd };
    var rte;
    if (this.de_lte == 'view') {
      rte = `https://bbnlbss.apsfl.co.in/apiv1/dashbrd/huaweiAAAview`;
    } else {
      rte = `https://bbnlbss.apsfl.co.in/apiv1/dashbrd/huaweiAAAdelete`;
    }
    console.log("rte", rte);

    console.log(data, "Pon Das Das del")
    this.shwLdr = true;
    this.http.post(rte, data).subscribe(res => {
      console.log(res);
      this.shwLdr = false;
      if (res['status'] == 200) {
        this.curlRslts = res['data'];
        this._snackBar.open('Executed Sucessfully', '', {
          duration: 2000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
      } else
        this._snackBar.open('Something went wrong... Please try again', '', {
          duration: 2000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
    }, (error) => {
      this.shwLdr = false;
      console.log(error);
      this._snackBar.open('Something went wrong... Please try again', '', {
        duration: 2000,
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      });
    });

  }

  ponchng1Agh_Das() {
    this.cafupdfrm.enable()
    this.ponchgagh_das123 = true;
    this.edibtnenble = true;
    this.onAgoraBlur();
    let data = {
      "enty_id": 1,
      "actn_id": 1,
      "actn_nm": "PON Change",
      "commands": "curl -XDELETE -H" + " 'Authorization: Basic YnNzOkJzc0AxMjM=' -H" + ' "Content-type: application/json"' + " 'http://172.16.0.44:8080/agorang/rest/v1/eml/clientservicegpon/" + this.cafupdfrm.value.aga_cd + '-' + "VOIP'",
    };
    console.log(data, "Ponchange delete Calls Agh-das 1 ")
    this.shwLdr = true;
    this.crdsrv.create(data, 'execurl')
      .subscribe((res) => {
        console.log(res);
        this.shwLdr = false;
        if (res['status'] == 200) {
          this.curlRslts = res['data'];
          this._snackBar.open('Executed Sucessfully', '', {
            duration: 2000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
          });
        } else
          this._snackBar.open('Something went wrong... Please try again', '', {
            duration: 2000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
          });
      }, (error) => {
        this.shwLdr = false;
        console.log(error);
        this._snackBar.open('Something went wrong... Please try again', '', {
          duration: 2000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
      });

  }



  ponchng2Agh_Das() {
    this.cafupdfrm.enable()
    this.ponchgagh_das234 = true;
    this.edibtnenble = true;
    let data = {
      "enty_id": 1,
      "actn_id": 1,
      "actn_nm": "PON Change",
      "commands": "curl -XDELETE -H" + " 'Authorization: Basic YnNzOkJzc0AxMjM=' -H" + ' "Content-type: application/json"' + " 'http://172.16.0.44:8080/agorang/rest/v1/eml/clientservicegpon/" + this.cafupdfrm.value.aga_cd + '-' + "IPTV'",
    };
    console.log(data, "Ponchange delete Calls Agh-das 2 ")
    this.shwLdr = true;
    this.crdsrv.create(data, 'execurl')
      .subscribe((res) => {
        console.log(res);
        this.shwLdr = false;
        if (res['status'] == 200) {
          this.curlRslts = res['data'];
          this._snackBar.open('Executed Sucessfully', '', {
            duration: 2000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
          });
        } else
          this._snackBar.open('Something went wrong... Please try again', '', {
            duration: 2000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
          });
      }, (error) => {
        this.shwLdr = false;
        console.log(error);
        this._snackBar.open('Something went wrong... Please try again', '', {
          duration: 2000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
      });

  }


  ponchng3Agh_Das() {
    this.cafupdfrm.enable()
    this.ponchgagh_das345 = true;
    this.edibtnenble = true;
    let data = {
      "enty_id": 1,
      "actn_id": 1,
      "actn_nm": "PON Change",
      "commands": "curl -XDELETE -H" + " 'Authorization: Basic YnNzOkJzc0AxMjM=' -H" + ' "Content-type: application/json"' + " 'http://172.16.0.44:8080/agorang/rest/v1/eml/clientservicegpon/" + this.cafupdfrm.value.agora_cd + "'",
    };
    console.log(data, "Ponchange delete Calls Agh-das 3 ")
    this.shwLdr = true;
    this.crdsrv.create(data, 'execurl')
      .subscribe((res) => {
        console.log(res);
        this.shwLdr = false;
        if (res['status'] == 200) {
          this.curlRslts = res['data'];
          this._snackBar.open('Executed Sucessfully', '', {
            duration: 2000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
          });
        } else
          this._snackBar.open('Something went wrong... Please try again', '', {
            duration: 2000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
          });
      }, (error) => {
        this.shwLdr = false;
        console.log(error);
        this._snackBar.open('Something went wrong... Please try again', '', {
          duration: 2000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
      });

  }


  ponchng4Agh_Das() {
    this.cafupdfrm.enable();
    this.ponchgagh_das456 = true;
    // this.edibtnenble = true;
    //this.updateBtn = true;
    let data = {
      "enty_id": 1,
      "actn_id": 1,
      "actn_nm": "PON Change",
      "commands": "curl -XDELETE -H" + " 'Authorization: Basic YnNzOkJzc0AxMjM=' -H" + ' "Content-type: application/json"' + " 'http://172.16.0.44:8080/agorang/rest/v1/eml/onu/" + this.cafupdfrm.value.aga_cd + "'",
    };
    console.log(data, "Ponchange delete Calls Agh-das 4 ")
    this.shwLdr = true;
    this.crdsrv.create(data, 'execurl')
      .subscribe((res) => {
        console.log(res);
        this.shwLdr = false;
        if (res['status'] == 200) {
          this.curlRslts = res['data'];
          this._snackBar.open('Executed Sucessfully', '', {
            duration: 2000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
          });
        } else
          this._snackBar.open('Something went wrong... Please try again', '', {
            duration: 2000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
          });
      }, (error) => {
        this.shwLdr = false;
        console.log(error);
        this._snackBar.open('Something went wrong... Please try again', '', {
          duration: 2000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
      });

  }

  pon_Agh_Das() {
    this.cafupdfrm.enable();
    this.edibtnenble = true;

    let data = {
      "enty_id": 1,
      "actn_id": 1,
      "actn_nm": "PON CHANGE",
      "commands": `curl -XGET -H "Content-type: application/json" 'http://172.16.4.107/prov4serv/prov_if?oper=${this.de_lte}&client=${this.cafupdfrm.value.aaa_cd}'`
    };
    console.log(data, "Delete Calls Agh-das 5 ")
    this.shwLdr = true;
    this.crdsrv.create(data, 'execurl')
      .subscribe((res) => {
        console.log(res);
        this.shwLdr = false;
        if (res['status'] == 200) {
          this.curlRslts = res['data'];
          this._snackBar.open('Executed Sucessfully', '', {
            duration: 2000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
          });
        } else
          this._snackBar.open('Something went wrong... Please try again', '', {
            duration: 2000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
          });
      }, (error) => {
        this.shwLdr = false;
        console.log(error);
        this._snackBar.open('Something went wrong... Please try again', '', {
          duration: 2000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
      });

  }


  ponpackDas_DAS_hsi1() {
    this.cafupdfrm.enable();
    const new_ip_adr_das1 = this.cafupdfrm.get('new_ip_adr_das').value;
    const new_crd_das1 = this.cafupdfrm.get('new_crd_das').value;
    const new_pon_das1 = this.cafupdfrm.get('new_pon_das').value;
    const new_onu_id_das1 = this.cafupdfrm.get('new_onu_id_das').value;
    this.ponDas_DAS_hsi = true;
    this.edibtnenble = true;
    // this.dasanValidator()
    if (this.cafupdfrm.get('new_ip_adr_das').value && this.cafupdfrm.get('new_crd_das').value && this.cafupdfrm.get('new_pon_das').value && this.cafupdfrm.get('new_onu_id_das').value) {
      let data = { "sourceCTP": { "ipAddress": this.cafupdfrm.value.new_ip_adr_das, "slotIndex": this.cafupdfrm.value.new_crd_das, "portIndex": this.cafupdfrm.value.new_pon_das, "onuId": this.cafupdfrm.value.new_onu_id_das }, "targetCTP": { "ipAddress": this.cafupdfrm.value.ip_adr, "ctp": { "slotIndex": this.cafupdfrm.value.olt_crd_nu }, "portIndex": this.cafupdfrm.value.old_pon_das }, "onuId": this.cafupdfrm.value.olt_onu_id };
      console.log(data, "DAS DAs HSI")
      this.shwLdr = true;
      this.http.post('https://bbnlbss.apsfl.co.in/apiv1/dashbrd/dasanCreateOnu', data).subscribe(res => {
        console.log(res);
        this.shwLdr = false;
        if (res['status'] == 200) {
          this.curlRslts = res['data'];
          this._snackBar.open('Executed Sucessfully', '', {
            duration: 2000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
          });
        } else
          this._snackBar.open('Something went wrong... Please try again', '', {
            duration: 2000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
          });
      }, (error) => {
        this.shwLdr = false;
        console.log(error);
        this._snackBar.open('Something went wrong... Please try again', '', {
          duration: 2000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
      });
    } else {
      if (new_ip_adr_das1 === null || new_ip_adr_das1.trim().length === 0) {
        // console.log("testnew_ip_adr_das")
        this.cafupdfrm.get('new_ip_adr_das').setValidators(Validators.required);
        this.cafupdfrm.get('new_ip_adr_das').updateValueAndValidity();
        this.new_ip_aadrs = true;
      }
      if (new_crd_das1 === null || new_crd_das1.trim().length === 0) {
        this.cafupdfrm.get('new_crd_das').setValidators(Validators.required);
        this.cafupdfrm.get('new_crd_das').updateValueAndValidity();
        this.new_caard = true;
      }
      if (new_pon_das1 === null || new_pon_das1.trim().length === 0) {
        this.cafupdfrm.get('new_pon_das').setValidators(Validators.required);
        this.cafupdfrm.get('new_pon_das').updateValueAndValidity();
        this.new_pon_numbr = true;
      }
      if (new_onu_id_das1 === null || new_onu_id_das1.trim().length === 0) {
        this.cafupdfrm.get('new_onu_id_das').setValidators(Validators.required);
        this.cafupdfrm.get('new_onu_id_das').updateValueAndValidity();
        this.new_onu_iD = true;
      }
    }


  }


  ponpackDas_DAS_hsi2() {
    this.cafupdfrm.enable();
    this.cafupdfrm.get('down_stream').setValidators(Validators.required);
    this.cafupdfrm.get('down_stream').updateValueAndValidity();
    this.edibtnenble = true;
    this.updateBtn = true;
    if (this.cafupdfrm.get('down_stream').value) {
      let data = {
        "aaa_cd": this.cafupdfrm.value.aaa_cd, "access_id": this.cafupdfrm.value.onu_mac_addr, "profile_tx": this.cafupdfrm.value.down_stream
      }
      console.log(data, "ponpackDas_DAS_hsi2")
      this.shwLdr = true;
      this.http.post('https://bbnlbss.apsfl.co.in/apiv1/dashbrd/createHuaweiProfile', data).subscribe(res => {
        console.log(res);
        //this.replaceSlashes;
        this.shwLdr = false;
        if (res['status'] == 200) {
          this.curlRslts = res['data'];
          this._snackBar.open('Executed Sucessfully', '', {
            duration: 2000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
          });
        } else
          this._snackBar.open('Something went wrong... Please try again', '', {
            duration: 2000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
          });
      }, (error) => {
        this.shwLdr = false;
        console.log(error);
        this._snackBar.open('Something went wrong... Please try again', '', {
          duration: 2000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
      })
    } else {
      this.subs_prfle_nm = true;
    }
  }

  ponpackAgh_DAS_hsi1() {
    this.cafupdfrm.enable();
    const new_ip_addr_agh_das1 = this.cafupdfrm.get("new_ip_addr_agh_das").value;
    const new_card_agh_das1 = this.cafupdfrm.get("new_card_agh_das").value;
    const new_pon_agh_das1 = this.cafupdfrm.get("new_pon_agh_das").value;
    const new_onu_id_agh_das1 = this.cafupdfrm.get("new_onu_id_agh_das").value;
    this.ponAgh_DAS_hsi = true;
    this.edibtnenble = true;
    // this.dasanValidator()
    if (this.cafupdfrm.get("new_ip_addr_agh_das").value && this.cafupdfrm.get("new_card_agh_das").value && this.cafupdfrm.get("new_pon_agh_das").value && this.cafupdfrm.get("new_onu_id_agh_das").value) {

      let data = {
        "enty_id": 1,
        "actn_id": 1,
        "commands": `curl -XPOST -H "Content-type: application/json" -H "Authorization: Basic Og==" -H "password: 1234" -H "username: rest" -d '{"sourceCTP":{"ipAddress":"${this.cafupdfrm.value.new_ip_addr_agh_das}","slotIndex":${this.cafupdfrm.value.new_card_agh_das},"portIndex":${this.cafupdfrm.value.new_pon_agh_das},"onuId":${this.cafupdfrm.value.new_onu_id_agh_das}},"targetCTP":{"ipAddress":"${this.cafupdfrm.value.ip_adr}","ctp":{"slotIndex":${this.cafupdfrm.value.olt_crd_nu},"portIndex":${this.cafupdfrm.value.old_pon_das},"onuId":${this.cafupdfrm.value.olt_onu_id}}}}' 'http://172.16.14.11:8090/nbi/managedelementmgr/ctp'`,
        "actn_nm": "PON CHANGE",
      };
      this.shwLdr = true;
      this.crdsrv.create(data, 'execurl')
        .subscribe((res) => {
          console.log(res);
          this.shwLdr = false;
          if (res['status'] == 200) {
            this.curlRslts = res['data'];
            this._snackBar.open('Executed Sucessfully', '', {
              duration: 2000,
              horizontalPosition: this.horizontalPosition,
              verticalPosition: this.verticalPosition,
            });
          } else
            this._snackBar.open('Something went wrong... Please try again', '', {
              duration: 2000,
              horizontalPosition: this.horizontalPosition,
              verticalPosition: this.verticalPosition,
            });
        }, (error) => {
          this.shwLdr = false;
          console.log(error);
          this._snackBar.open('Something went wrong... Please try again', '', {
            duration: 2000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
          });
        });

    } else {
      if (new_ip_addr_agh_das1 === null || new_ip_addr_agh_das1.trim().length === 0) {
        this.cafupdfrm.get('new_ip_addr_agh_das').setValidators(Validators.required);
        this.cafupdfrm.get('new_ip_addr_agh_das').updateValueAndValidity();
        this.new_ip_aadrs = true;
      }
      if (new_card_agh_das1 === null || new_card_agh_das1.trim().length === 0) {
        this.cafupdfrm.get('new_card_agh_das').setValidators(Validators.required);
        this.cafupdfrm.get('new_card_agh_das').updateValueAndValidity();
        this.new_caard = true;
      }
      if (new_pon_agh_das1 === null || new_pon_agh_das1.trim().length === 0) {
        this.cafupdfrm.get('new_pon_agh_das').setValidators(Validators.required);
        this.cafupdfrm.get('new_pon_agh_das').updateValueAndValidity();
        this.new_pon_numbr = true;
      }
      if (new_onu_id_agh_das1 === null || new_onu_id_agh_das1.trim().length === 0) {
        this.cafupdfrm.get('new_onu_id_agh_das').setValidators(Validators.required);
        this.cafupdfrm.get('new_onu_id_agh_das').updateValueAndValidity();
        this.new_onu_iD = true;
      }
    }


  }

  ponpackAgh_DAS_hsi2() {
    this.cafupdfrm.enable();
    this.cafupdfrm.get('down_stream').setValidators(Validators.required);
    this.cafupdfrm.get('down_stream').updateValueAndValidity();
    this.edibtnenble = true;
    this.updateBtn = true;
    if (this.cafupdfrm.get('down_stream').value) {
      let data = {
        "enty_id": 1,
        "actn_id": 1,
        "commands": `curl -XGET -H 'Authorization: Basic Og==' -H "Content-type: application/json" -H "password: 1234" -H "username: rest" 'http://172.16.4.107/prov4serv/prov_if?oper=delete&client=${this.cafupdfrm.value.aaa_cd}&avp=Filter-Id<>nonblock<>check&avp=accessId<>${this.cafupdfrm.value.onu_mac_addr}<>reply&avp=Profile<>pV4<>reply&avp=cisco-avpair<>subscriber:sa=${this.cafupdfrm.value.down_stream}<>reply&avp=cisco-avpair<>subscriber:accounting-list=default<>reply'`,
        "actn_nm": "PON CHANGE",

      };
      console.log(data)
      this.shwLdr = true;
      this.crdsrv.create(data, 'execurl')
        .subscribe((res) => {
          console.log(res);
          //this.replaceSlashes;
          this.shwLdr = false;
          if (res['status'] == 200) {
            this.curlRslts = res['data'];
            this._snackBar.open('Executed Sucessfully', '', {
              duration: 2000,
              horizontalPosition: this.horizontalPosition,
              verticalPosition: this.verticalPosition,
            });
          } else
            this._snackBar.open('Something went wrong... Please try again', '', {
              duration: 2000,
              horizontalPosition: this.horizontalPosition,
              verticalPosition: this.verticalPosition,
            });
        }, (error) => {
          this.shwLdr = false;
          console.log(error);
          this._snackBar.open('Something went wrong... Please try again', '', {
            duration: 2000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
          });
        })
    } else {
      this.subs_prfle_nm = true;
    }

  }


  ponpackDas_DAS1() {
    this.cafupdfrm.enable();
    const new_ip_adr_das1 = this.cafupdfrm.get('new_ip_adr_das').value;
    const new_crd_das1 = this.cafupdfrm.get('new_crd_das').value;
    const new_pon_das1 = this.cafupdfrm.get('new_pon_das').value;
    const new_onu_id_das1 = this.cafupdfrm.get('new_onu_id_das').value;
    this.ponDas_DAS1 = true;
    this.edibtnenble = true;
    // this.dasanValidator()
    if (this.cafupdfrm.get('new_ip_adr_das').value && this.cafupdfrm.get('new_crd_das').value && this.cafupdfrm.get('new_pon_das').value && this.cafupdfrm.get('new_onu_id_das').value) {
      let data = { "sourceCTP": { "ipAddress": this.cafupdfrm.value.ip_adr, "slotIndex": this.cafupdfrm.value.olt_crd_nu, "portIndex": this.cafupdfrm.value.old_pon_das, "onuId": this.cafupdfrm.value.olt_onu_id }, "targetCTP": { "ipAddress": this.cafupdfrm.value.new_ip_adr_das, "ctp": { "slotIndex": this.cafupdfrm.value.new_crd_das, "portIndex": this.cafupdfrm.value.new_pon_das, "onuId": this.cafupdfrm.value.new_onu_id_das } } };
      console.log(data, "Das-Das Hsi Push")
      this.shwLdr = true;
      this.http.post('https://bbnlbss.apsfl.co.in/apiv1/dashbrd/dasanCreateOnu', data).subscribe(res => {
        console.log(res);
        this.shwLdr = false;
        if (res['status'] == 200) {
          this.curlRslts = res['data'];
          this._snackBar.open('Executed Sucessfully', '', {
            duration: 2000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
          });
        } else
          this._snackBar.open('Something went wrong... Please try again', '', {
            duration: 2000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
          });
      }, (error) => {
        this.shwLdr = false;
        console.log(error);
        this._snackBar.open('Something went wrong... Please try again', '', {
          duration: 2000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
      });
    }
    else {
      if (new_ip_adr_das1 === null || new_ip_adr_das1.trim().length === 0) {
        // console.log("testnew_ip_adr_das")
        this.cafupdfrm.get('new_ip_adr_das').setValidators(Validators.required);
        this.cafupdfrm.get('new_ip_adr_das').updateValueAndValidity();
        this.new_ip_aadrs = true;
      }
      if (new_crd_das1 === null || new_crd_das1.trim().length === 0) {
        this.cafupdfrm.get('new_crd_das').setValidators(Validators.required);
        this.cafupdfrm.get('new_crd_das').updateValueAndValidity();
        this.new_caard = true;
      }
      if (new_pon_das1 === null || new_pon_das1.trim().length === 0) {
        this.cafupdfrm.get('new_pon_das').setValidators(Validators.required);
        this.cafupdfrm.get('new_pon_das').updateValueAndValidity();
        this.new_pon_numbr = true;
      }
      if (new_onu_id_das1 === null || new_onu_id_das1.trim().length === 0) {
        this.cafupdfrm.get('new_onu_id_das').setValidators(Validators.required);
        this.cafupdfrm.get('new_onu_id_das').updateValueAndValidity();
        this.new_onu_iD = true;
      }

    }


  }


  ponpackDas_DAS2() {
    this.cafupdfrm.enable();
    this.cafupdfrm.get('down_stream').setValidators(Validators.required);
    this.cafupdfrm.get('down_stream').updateValueAndValidity();
    this.edibtnenble = true;
    this.updateBtn = true;
    if (this.cafupdfrm.get('down_stream').value) {
      let data = {
        "aaa_cd": this.cafupdfrm.value.aaa_cd, "access_id": this.cafupdfrm.value.onu_mac_addr, "profile_tx": this.cafupdfrm.value.down_stream
      }
      console.log(data, "Das-DAs HSI-2 PUsh")
      this.shwLdr = true;
      this.http.post('https://bbnlbss.apsfl.co.in/apiv1/dashbrd/createHuaweiProfile', data).subscribe(res => {
        console.log(res);
        this.shwLdr = false;
        if (res['status'] == 200) {
          this.curlRslts = res['data'];
          this._snackBar.open('Executed Sucessfully', '', {
            duration: 2000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
          });
        } else
          this._snackBar.open('Something went wrong... Please try again', '', {
            duration: 2000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
          });
      }, (error) => {
        this.shwLdr = false;
        console.log(error);
        this._snackBar.open('Something went wrong... Please try again', '', {
          duration: 2000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
      })
    } else {
      this.subs_prfle_nm = true;
    }

  }



  Agh_das_del1() {
    this.cafupdfrm.enable()
    this.agh_das_del1 = true;
    this.edibtnenble = true;
    this.onAgoraBlur();
    let data = {
      "enty_id": 1,
      "actn_id": 1,
      "actn_nm": "PON Change",
      "commands": "curl -XDELETE -H" + " 'Authorization: Basic YnNzOkJzc0AxMjM=' -H" + ' "Content-type: application/json"' + " 'http://172.16.0.44:8080/agorang/rest/v1/eml/clientservicegpon/" + this.cafupdfrm.value.aga_cd + '-' + "VOIP'",
    };
    this.shwLdr = true;
    this.crdsrv.create(data, 'execurl')
      .subscribe((res) => {
        console.log(res);
        this.shwLdr = false;
        if (res['status'] == 200) {
          this.curlRslts = res['data'];
          this._snackBar.open('Executed Sucessfully', '', {
            duration: 2000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
          });
        } else
          this._snackBar.open('Something went wrong... Please try again', '', {
            duration: 2000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
          });
      }, (error) => {
        this.shwLdr = false;
        console.log(error);
        this._snackBar.open('Something went wrong... Please try again', '', {
          duration: 2000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
      });

  }

  Agh_das_del2() {
    this.cafupdfrm.enable()
    this.agh_das_del2 = true;
    this.edibtnenble = true;
    let data = {
      "enty_id": 1,
      "actn_id": 1,
      "actn_nm": "PON Change",
      "commands": "curl -XDELETE -H" + " 'Authorization: Basic YnNzOkJzc0AxMjM=' -H" + ' "Content-type: application/json"' + " 'http://172.16.0.44:8080/agorang/rest/v1/eml/clientservicegpon/" + this.cafupdfrm.value.aga_cd + '-' + "IPTV'",
    };
    this.shwLdr = true;
    this.crdsrv.create(data, 'execurl')
      .subscribe((res) => {
        console.log(res);
        this.shwLdr = false;
        if (res['status'] == 200) {
          this.curlRslts = res['data'];
          this._snackBar.open('Executed Sucessfully', '', {
            duration: 2000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
          });
        } else
          this._snackBar.open('Something went wrong... Please try again', '', {
            duration: 2000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
          });
      }, (error) => {
        this.shwLdr = false;
        console.log(error);
        this._snackBar.open('Something went wrong... Please try again', '', {
          duration: 2000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
      });

  }


  Agh_das_del3() {
    this.cafupdfrm.enable()
    this.agh_das_del3 = true;
    this.edibtnenble = true;
    let data = {
      "enty_id": 1,
      "actn_id": 1,
      "actn_nm": "PON Change",
      "commands": "curl -XDELETE -H" + " 'Authorization: Basic YnNzOkJzc0AxMjM=' -H" + ' "Content-type: application/json"' + " 'http://172.16.0.44:8080/agorang/rest/v1/eml/clientservicegpon/" + this.cafupdfrm.value.agora_cd + "'",
    };
    this.shwLdr = true;
    this.crdsrv.create(data, 'execurl')
      .subscribe((res) => {
        console.log(res);
        this.shwLdr = false;
        if (res['status'] == 200) {
          this.curlRslts = res['data'];
          this._snackBar.open('Executed Sucessfully', '', {
            duration: 2000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
          });
        } else
          this._snackBar.open('Something went wrong... Please try again', '', {
            duration: 2000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
          });
      }, (error) => {
        this.shwLdr = false;
        console.log(error);
        this._snackBar.open('Something went wrong... Please try again', '', {
          duration: 2000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
      });

  }

  Agh_das_del4() {
    this.cafupdfrm.enable()
    this.edibtnenble = true;
    this.updateBtn = true;
    this.agh_das_del4 = true;
    let data = {
      "enty_id": 1,
      "actn_id": 1,
      "actn_nm": "PON Change",
      "commands": "curl -XDELETE -H" + " 'Authorization: Basic YnNzOkJzc0AxMjM=' -H" + ' "Content-type: application/json"' + " 'http://172.16.0.44:8080/agorang/rest/v1/eml/onu/" + this.cafupdfrm.value.aga_cd + "'",
    };
    this.shwLdr = true;
    this.crdsrv.create(data, 'execurl')
      .subscribe((res) => {
        console.log(res);
        this.shwLdr = false;
        if (res['status'] == 200) {
          this.curlRslts = res['data'];
          this._snackBar.open('Executed Sucessfully', '', {
            duration: 2000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
          });
        } else
          this._snackBar.open('Something went wrong... Please try again', '', {
            duration: 2000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
          });
      }, (error) => {
        this.shwLdr = false;
        console.log(error);
        this._snackBar.open('Something went wrong... Please try again', '', {
          duration: 2000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
      });

  }


  Agh_das_del5() {
    this.cafupdfrm.enable();
    this.edibtnenble = true;
    this.updateBtn = true;
    let data = {
      "enty_id": 1,
      "actn_id": 1,
      "actn_nm": "PON CHANGE",
      "commands": `curl -XGET -H "Content-type: application/json" 'http://172.16.4.107/prov4serv/prov_if?oper=delete&client=lag:${this.cafupdfrm.value.aaa_cd}'`,

    };
    this.shwLdr = true;
    this.crdsrv.create(data, 'execurl')
      .subscribe((res) => {
        console.log(res);
        this.shwLdr = false;
        if (res['status'] == 200) {
          this.curlRslts = res['data'];
          this._snackBar.open('Executed Sucessfully', '', {
            duration: 2000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
          });
        } else
          this._snackBar.open('Something went wrong... Please try again', '', {
            duration: 2000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
          });
      }, (error) => {
        this.shwLdr = false;
        console.log(error);
        this._snackBar.open('Something went wrong... Please try again', '', {
          duration: 2000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
      });

  }

  agh_das_onu() {
    this.cafupdfrm.get('up_stream').clearValidators();
    this.cafupdfrm.get('up_stream').updateValueAndValidity();
    this.cafupdfrm.get('down_stream').clearValidators();
    this.cafupdfrm.get('down_stream').updateValueAndValidity();
    this.cafupdfrm.enable();
    this.edibtnenble = true;
    // this.pedmain1 = false;
    this.agh_das_push1 = true;


    let data = {
      "enty_id": 1,
      "actn_id": 1,
      "commands": `curl -XPOST -H "Content-type: application/json" -H "Authorization: Basic Og==" -H "password: 1234" -H "username: rest" -d '{"aid":{"ipAddress":"${this.cafupdfrm.value.ip_adr}","type":10023,"card":${this.cafupdfrm.value.olt_crd_nu},"tp":${this.cafupdfrm.value.old_pon_das1},"onuId":${this.cafupdfrm.value.olt_onu_id}},"admin":"1","fec":"true","swUpgradeMode":"2","serialNumber":"${this.cafupdfrm.value.agora_srl_nu}","profileName":"${this.cafupdfrm.value.onu_mdle_cd}","registerType":"1","name":"${this.cafupdfrm.value.caf_nu}"}' 'http://172.16.14.11:8090/agorang/rest/v1/eml/onu'`,
      "actn_nm": "PON CHANGE",
    };
    console.log(data, "agh_das_onu")
    this.shwLdr = true;
    this.crdsrv.create(data, 'execurl')
      .subscribe((res) => {
        console.log(res);
        //this.replaceSlashes;
        this.shwLdr = false;
        if (res['status'] == 200) {
          this.curlRslts = res['data'];
          this._snackBar.open('Executed Sucessfully', '', {
            duration: 2000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
          });
        } else
          this._snackBar.open('Something went wrong... Please try again', '', {
            duration: 2000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
          });
      }, (error) => {
        this.shwLdr = false;
        console.log(error);
        this._snackBar.open('Something went wrong... Please try again', '', {
          duration: 2000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
      })
  }

  agh_das_hsi() {
    this.cafupdfrm.enable();
    this.edibtnenble = true;
    // this.pedmain1 = false;
    this.agh_das_push2 = true;
    this.cafupdfrm.get('up_stream').setValidators(Validators.required)
    this.cafupdfrm.get('up_stream').updateValueAndValidity();

    if (this.cafupdfrm.get('up_stream').value) {
      let data = {
        "enty_id": 1,
        "actn_id": 1,
        "actn_nm": "PON CHANGE",
        "commands": `curl -XPOST -H "Content-type: application/json" -H "Authorization: Basic Og==" -H "password: 1234" -H "username: rest" -d '{"aid":{"ipAddress":"${this.cafupdfrm.value.ip_adr}","card":${this.cafupdfrm.value.olt_crd_nu},"tp":${this.cafupdfrm.value.old_pon_das1},"onuId":${this.cafupdfrm.value.olt_onu_id}},"tps":[{"card":"1","tps":[2]}],"admin":1,"name":"HSI","networkServiceName":"HSI","upstreamTrafficProfileName":"${this.cafupdfrm.value.up_stream}","downstreamTrafficProfileName":" ","l2DhcpRelay":{"remoteId":"ID","useGlobalDhcp":false,"op82":true,"op18":false,"op37":false},"igmpOptions":{"useGlobal":false,"enable":true},"nativeVlan":false}' 'http://172.16.14.11:8090/agorang/rest/v1/eml/clientservicegpon'`
      };
      console.log(data, "agh_das_hsi")
      this.shwLdr = true;
      this.crdsrv.create(data, 'execurl')
        .subscribe((res) => {
          console.log(res);
          this.shwLdr = false;
          if (res['status'] == 200) {
            this.curlRslts = res['data'];
            this._snackBar.open('Executed Sucessfully', '', {
              duration: 2000,
              horizontalPosition: this.horizontalPosition,
              verticalPosition: this.verticalPosition,
            });
          } else
            this._snackBar.open('Something went wrong... Please try again', '', {
              duration: 2000,
              horizontalPosition: this.horizontalPosition,
              verticalPosition: this.verticalPosition,
            });
        }, (error) => {
          this.shwLdr = false;
          console.log(error);
          this._snackBar.open('Something went wrong... Please try again', '', {
            duration: 2000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
          });
        });
    } else {
      this.upstrm_prfl_nm = true;
    }
  }

  agh_das_iptv() {
    this.cafupdfrm.enable();
    this.edibtnenble = true;
    // this.pedmain1 = false;
    this.agh_das_push3 = true;

    let data = {
      "enty_id": 1,
      "actn_id": 1,
      "actn_nm": "PON CHANGE",
      "commands": `curl -XPOST -H "Content-type: application/json" -H "Authorization: Basic Og==" -H "password: 1234" -H "username: rest" -d '{"aid":{"ipAddress":"${this.cafupdfrm.value.ip_adr}","card":${this.cafupdfrm.value.olt_crd_nu},"tp":${this.cafupdfrm.value.old_pon_das1},"onuId":${this.cafupdfrm.value.olt_onu_id}},"tps":[{"card":"1","tps":[2]}],"admin":"1","name":"IPTV","networkServiceName":"IPTV","nativeVlan":false}' 'http://172.16.14.11:8090/agorang/rest/v1/eml/clientservicegpon'`
    };
    console.log(data, "agh_das_iptv")
    this.shwLdr = true;
    this.crdsrv.create(data, 'execurl')
      .subscribe((res) => {
        console.log(res);
        this.shwLdr = false;
        if (res['status'] == 200) {
          this.curlRslts = res['data'];
          this._snackBar.open('Executed Sucessfully', '', {
            duration: 2000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
          });
        } else
          this._snackBar.open('Something went wrong... Please try again', '', {
            duration: 2000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
          });
      }, (error) => {
        this.shwLdr = false;
        console.log(error);
        this._snackBar.open('Something went wrong... Please try again', '', {
          duration: 2000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
      });
  }


  agh_das_aaa() {
    this.cafupdfrm.enable()
    this.cafupdfrm.get('down_stream').setValidators(Validators.required);
    this.cafupdfrm.get('down_stream').updateValueAndValidity()
    // this.ponadd234 = true;
    this.edibtnenble = true;

    if (this.cafupdfrm.get('down_stream').value) {
      let data = { "aaa_cd": this.cafupdfrm.value.aaa_cd, "access_id": this.cafupdfrm.value.onu_mac_addr, "profile_tx": this.cafupdfrm.value.down_stream };
      console.log("Hsi DAS_DAS3", data)
      //this.shwLdr = true;
      this.http.post("https://bbnlbss.apsfl.co.in/apiv1/dashbrd/createHuaweiProfile", data).subscribe(res => {
        console.log(res);
        //this.replaceSlashes;
        this.shwLdr = false;
        if (res['status'] == 200) {
          this.curlRslts = res['data'];
          this._snackBar.open('Executed Sucessfully', '', {
            duration: 2000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
          });
        } else
          this._snackBar.open('Something went wrong... Please try again', '', {
            duration: 2000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
          });
      }, (error) => {
        this.shwLdr = false;
        console.log(error);
        this._snackBar.open('Something went wrong... Please try again', '', {
          duration: 2000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
      })
    } else {
      this.subs_prfle_nm = true;
    }


  }

  // TODO:
  Subscriber() {
    //this.edibtnenble = true;
    //this.updateBtn = true;
    //this.interpack = false;
    this.pndg891 = true;
    let data = {
      "enty_id": 1,
      "actn_id": 1,
      "actn_nm": "Subscriber Code Creation",
      "commands": "curl -XPOST -H" + " 'username" + ':' + " teraadmin' -H 'apikey" + ':' + " 6ed73c1a-7817-49ab-b185-981f97cf5fd8' -H" + ' "Content-type' + ':' + ' application/json" -d' + "'{" + '"deviceid"' + ':' + '"' + this.cafupdfrm.value.iptv_mac_addr + '"' + ',' + '"devicecategory"' + ':' + '"OTHER_DEVICE"' + ',' + '"partnerCode"' + ':' + '""' + ',' + '"subscriber"' + ':' + '{' + '"title"' + ':' + '"' + this.cafupdfrm.value.title + '"' + ',' + '"firstname"' + ':' + '"' + this.cafupdfrm.value.first_nm + '"' + ',' + '"lastname"' + ':' + '"' + this.cafupdfrm.value.lst_nm + '"' + ',' + '"contactno"' + ':' + this.cafupdfrm.value.cnt_no + ',' + '"emailid":"",' + '"identityProofId":"0",' + "address" + ':' + '"' + this.cafupdfrm.value.addrs + '"' + ',' + '"village"' + ':' + '"' + this.cafupdfrm.value.vilage + '"' + ',' + '"mandal"' + ':' + '"' + this.cafupdfrm.value.mdl + '"' + ',' + '"districtCode"' + ':' + '"' + this.cafupdfrm.value.dsrtc_cde + '"' + ',' + '"stateCode"' + ':' + '"AP"' + ',' + '"countryCode"' + ':' + '"INDIA"' + ',' + '"countryIS02"' + ':' + '"IN"' + ',' + '"remarks"' + ':' + '""' + ',' + "cafNumber" + ':' + this.cafupdfrm.value.caf_nu + ',' + '"billingStartDate":"10"' + "}}' " + "'http://iptv.apsfl.co.in:8080/appserver/rest/iptv/registersubscriber'"
    };
    this.shwLdr = true;
    this.crdsrv.create(data, 'execurl')
      .subscribe((res) => {
        console.log(res);
        this.shwLdr = false;
        if (res['status'] == 200) {
          this.curlRslts = res['data'];
          this._snackBar.open('Executed Sucessfully', '', {
            duration: 2000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
          });
        } else
          this._snackBar.open('Something went wrong... Please try again', '', {
            duration: 2000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
          });
      }, (error) => {
        this.shwLdr = false;
        console.log(error);
        this._snackBar.open('Something went wrong... Please try again', '', {
          duration: 2000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
      });

  }

  das_agh_onu() {
    this.cafupdfrm.get('up_stream').clearValidators();
    this.cafupdfrm.get('up_stream').updateValueAndValidity();
    this.cafupdfrm.get('down_stream').clearValidators();
    this.cafupdfrm.get('down_stream').updateValueAndValidity();
    this.cafupdfrm.enable();
    this.edibtnenble = true;
    // this.pedmain1 = false;
    this.das_agh_push1 = true;


    let data = {
      "enty_id": 1,
      "actn_id": 1,
      "commands": `curl -XPOST -H "Content-type: application/json" -H "Authorization: Basic Og==" -H "password: 1234" -H "username: rest" -d '{"aid":{"ipAddress":"${this.cafupdfrm.value.ip_adr}","type":10023,"card":${this.cafupdfrm.value.olt_crd_nu},"tp":${this.cafupdfrm.value.pon},"onuId":${this.cafupdfrm.value.olt_onu_id}},"admin":"1","fec":"true","swUpgradeMode":"2","serialNumber":"${this.cafupdfrm.value.agora_srl_nu}","profileName":"${this.cafupdfrm.value.onu_mdle_cd}","registerType":"1","name":"${this.cafupdfrm.value.caf_nu}"}' 'http://172.16.14.11:8090/agorang/rest/v1/eml/onu'`,
      "actn_nm": "PON CHANGE",
    };
    console.log(data, "Pon Change Dasan For IPTV + Internet 1")
    // this.shwLdr = true;
    // this.crdsrv.create(data, 'execurl')
    //   .subscribe((res) => {
    //     console.log(res);
    //     //this.replaceSlashes;
    //     this.shwLdr = false;
    //     if (res['status'] == 200) {
    //       this.curlRslts = res['data'];
    //       this._snackBar.open('Executed Sucessfully', '', {
    //         duration: 2000,
    //         horizontalPosition: this.horizontalPosition,
    //         verticalPosition: this.verticalPosition,
    //       });
    //     } else
    //       this._snackBar.open('Something went wrong... Please try again', '', {
    //         duration: 2000,
    //         horizontalPosition: this.horizontalPosition,
    //         verticalPosition: this.verticalPosition,
    //       });
    //   }, (error) => {
    //     this.shwLdr = false;
    //     console.log(error);
    //     this._snackBar.open('Something went wrong... Please try again', '', {
    //       duration: 2000,
    //       horizontalPosition: this.horizontalPosition,
    //       verticalPosition: this.verticalPosition,
    //     });
    //   })

  }

  das_agh_hsi() {
    this.cafupdfrm.enable();
    this.edibtnenble = true;
    // this.pedmain1 = false;
    this.das_agh_push2 = true;
    this.cafupdfrm.get('up_stream').setValidators(Validators.required)
    this.cafupdfrm.get('up_stream').updateValueAndValidity();

    if (this.cafupdfrm.get('up_stream').value) {
      let data = {
        "enty_id": 1,
        "actn_id": 1,
        "actn_nm": "PON CHANGE",
        "commands": `curl -XPOST -H "Content-type: application/json" -H "Authorization: Basic Og==" -H "password: 1234" -H "username: rest" -d '{"aid":{"ipAddress":"${this.cafupdfrm.value.ip_adr}","card":${this.cafupdfrm.value.olt_crd_nu},"tp":${this.cafupdfrm.value.pon},"onuId":${this.cafupdfrm.value.olt_onu_id}},"tps":[{"card":"1","tps":["2"]}],"admin":"1","name":"HSI","networkServiceName":"HSI","upstreamTrafficProfileName":"${this.cafupdfrm.value.up_stream}","downstreamTrafficProfileName":" ","l2DhcpRelay":{"remoteId":"ID","useGlobalDhcp":false,"op82":true,"op18":false,"op37":false},"igmpOptions":{"useGlobal":false,"enable":true},"nativeVlan":false}' 'http://172.16.14.11:8090/agorang/rest/v1/eml/clientservicegpon'`
      };
      this.shwLdr = true;
      this.crdsrv.create(data, 'execurl')
        .subscribe((res) => {
          console.log(res);
          this.shwLdr = false;
          if (res['status'] == 200) {
            this.curlRslts = res['data'];
            this._snackBar.open('Executed Sucessfully', '', {
              duration: 2000,
              horizontalPosition: this.horizontalPosition,
              verticalPosition: this.verticalPosition,
            });
          } else
            this._snackBar.open('Something went wrong... Please try again', '', {
              duration: 2000,
              horizontalPosition: this.horizontalPosition,
              verticalPosition: this.verticalPosition,
            });
        }, (error) => {
          this.shwLdr = false;
          console.log(error);
          this._snackBar.open('Something went wrong... Please try again', '', {
            duration: 2000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
          });
        });
    } else {
      this.upstrm_prfl_nm = true;
    }

  }

  das_agh_aaa() {
    this.cafupdfrm.enable()
    this.cafupdfrm.get('down_stream').setValidators(Validators.required);
    this.cafupdfrm.get('down_stream').updateValueAndValidity()
    // this.ponadd234 = true;
    this.edibtnenble = true;

    if (this.cafupdfrm.get('down_stream').value) {
      let data = {
        "enty_id": 1,
        "actn_id": 1,
        "commands": `curl -XGET -H "Content-type:application/json" 'http://172.16.4.107/prov4serv/prov_if?oper=insert&client=lag:${this.cafupdfrm.value.aaa_cd}&avp=Filter-Id<>nonblock<>check&avp=accessId<><>reply&avp=Profile<>pV4<>reply&avp=cisco-avpair<>subscriber:sa=${this.cafupdfrm.value.down_stream}<>reply&avp=cisco-avpair<>subscriber:accounting-list=default<>reply'`,
        "actn_nm": "PON CHANGE",

      };
      console.log(data)
      this.shwLdr = true;
      this.crdsrv.create(data, 'execurl')
        .subscribe((res) => {
          console.log(res);
          //this.replaceSlashes;
          this.shwLdr = false;
          if (res['status'] == 200) {
            this.curlRslts = res['data'];
            this._snackBar.open('Executed Sucessfully', '', {
              duration: 2000,
              horizontalPosition: this.horizontalPosition,
              verticalPosition: this.verticalPosition,
            });
          } else
            this._snackBar.open('Something went wrong... Please try again', '', {
              duration: 2000,
              horizontalPosition: this.horizontalPosition,
              verticalPosition: this.verticalPosition,
            });
        }, (error) => {
          this.shwLdr = false;
          console.log(error);
          this._snackBar.open('Something went wrong... Please try again', '', {
            duration: 2000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
          });
        })
    } else {
      this.subs_prfle_nm = true;
    }


  }


  dasanpackPonch_onu() {
    this.cafupdfrm.get('up_stream').clearValidators();
    this.cafupdfrm.get('up_stream').updateValueAndValidity();
    this.cafupdfrm.get('down_stream').clearValidators();
    this.cafupdfrm.get('down_stream').updateValueAndValidity();
    this.cafupdfrm.enable();
    this.edibtnenble = true;
    // this.pedmain1 = false;
    this.agh_das_push1 = true;

    let data = {
      "enty_id": 1,
      "actn_id": 1,
      "commands": `curl -XPOST -H "Content-type: application/json" -H "Authorization: Basic Og==" -H "password: 1234" -H "username: rest" -d '{"aid":{"ipAddress":"${this.cafupdfrm.value.ip_adr}","type":10023,"card":${this.cafupdfrm.value.olt_crd_nu},"tp":${this.cafupdfrm.value.pon},"onuId":${this.cafupdfrm.value.olt_onu_id}},"admin":"1","fec":"true","swUpgradeMode":"2","serialNumber":"${this.cafupdfrm.value.agora_srl_nu}","profileName":"${this.cafupdfrm.value.onu_mdle_cd}","registerType":"1","name":"${this.cafupdfrm.value.caf_nu}"}' 'http://172.16.14.11:8090/agorang/rest/v1/eml/onu'`,
      "actn_nm": "PON CHANGE",
    };
    console.log(data, "Pon Change Dasan For IPTV + Internet 1")
    this.shwLdr = true;
    this.crdsrv.create(data, 'execurl')
      .subscribe((res) => {
        console.log(res);
        //this.replaceSlashes;
        this.shwLdr = false;
        if (res['status'] == 200) {
          this.curlRslts = res['data'];
          this._snackBar.open('Executed Sucessfully', '', {
            duration: 2000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
          });
        } else
          this._snackBar.open('Something went wrong... Please try again', '', {
            duration: 2000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
          });
      }, (error) => {
        this.shwLdr = false;
        console.log(error);
        this._snackBar.open('Something went wrong... Please try again', '', {
          duration: 2000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
      })

  }


  dasanpackPonch_hsi() {
    this.cafupdfrm.enable();
    this.cafupdfrm.get('up_stream').setValidators(Validators.required);
    this.cafupdfrm.get('up_stream').updateValueAndValidity();
    this.edibtnenble = true;
    // this.pedmain1 = false;
    this.agh_das_push2 = true;
    if (this.cafupdfrm.get('up_stream').value) {
      let data = {
        "enty_id": 1,
        "actn_id": 1,
        "actn_nm": "PON CHANGE",
        "commands": `curl -XPOST -H "Content-type: application/json" -H "Authorization: Basic Og==" -H "password: 1234" -H "username: rest" -d '{"aid":{"ipAddress":"${this.cafupdfrm.value.ip_adr}","card":${this.cafupdfrm.value.olt_crd_nu},"tp":${this.cafupdfrm.value.pon},"onuId":${this.cafupdfrm.value.olt_onu_id}},"tps":[{"card":"1","tps":["2"]}],"admin":"1","name":"HSI","networkServiceName":"HSI","upstreamTrafficProfileName":"${this.cafupdfrm.value.up_stream}","downstreamTrafficProfileName":" ","l2DhcpRelay":{"remoteId":"ID","useGlobalDhcp":false,"op82":true,"op18":false,"op37":false},"igmpOptions":{"useGlobal":false,"enable":true},"nativeVlan":false}' 'http://172.16.14.11:8090/agorang/rest/v1/eml/clientservicegpon'`
      };
      console.log(data, "Pon Change Dasan For IPTV + Internet 2")
      this.shwLdr = true;
      this.crdsrv.create(data, 'execurl')
        .subscribe((res) => {
          console.log(res);
          this.shwLdr = false;
          if (res['status'] == 200) {
            this.curlRslts = res['data'];
            this._snackBar.open('Executed Sucessfully', '', {
              duration: 2000,
              horizontalPosition: this.horizontalPosition,
              verticalPosition: this.verticalPosition,
            });
          } else
            this._snackBar.open('Something went wrong... Please try again', '', {
              duration: 2000,
              horizontalPosition: this.horizontalPosition,
              verticalPosition: this.verticalPosition,
            });
        }, (error) => {
          this.shwLdr = false;
          console.log(error);
          this._snackBar.open('Something went wrong... Please try again', '', {
            duration: 2000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
          });
        });
    } else {
      this.upstrm_prfl_nm = true;
    }

  }

  // dasanpackPonch_voip(){
  //   this.cafupdfrm.enable()
  //   this.edibtnenble = true;
  //   // this.pedmain1 = false;
  //   let data = {
  //     "enty_id": 1,
  //     "actn_id": 1,
  //     "actn_nm": "PON CHANGE",
  //     "commands": `curl -XGET -H 'Authorization: Basic Og==' -H "Content-type: application/json" -H "password: 1234" -H "username: rest" -d '{"aid":{"ipAddress":"${this.cafupdfrm.value.ip_adr}","card":${this.cafupdfrm.value.olt_crd_nu},"tp":${this.cafupdfrm.value.pon},"onuId":${this.cafupdfrm.value.olt_onu_id}},"tps":[{"card":"1","tps":["2"]}],"admin":"1","name":"VOIP","networkServiceName":"HSI","upstreamTrafficProfileName":"${this.cafupdfrm.value.up_stream}","downstreamTrafficProfileName":null,"l2DhcpRelay":{"remoteId":"ID","useGlobalDhcp":false,"op82":true,"op18":false,"op37":false},"igmpOptions":{"useGlobal":false,"enable":true},"nativeVlan":false,"encryption":true,"uniCtag":11,"ipManagement":true}' 'http://172.16.14.11:8090/agorang/rest/v1/eml/clientservicegpon'`
  //   };
  //   console.log(data,"AGH_DAS_VOIP")
  //   this.shwLdr = true;
  //   this.crdsrv.create(data, 'execurl')
  //     .subscribe((res) => {
  //       console.log(res);
  //       this.shwLdr = false;
  //       if (res['status'] == 200) {
  //         this.curlRslts = res['data'];
  //         this._snackBar.open('Executed Sucessfully', '', {
  //           duration: 2000,
  //           horizontalPosition: this.horizontalPosition,
  //           verticalPosition: this.verticalPosition,
  //         });
  //       } else
  //         this._snackBar.open('Something went wrong... Please try again', '', {
  //           duration: 2000,
  //           horizontalPosition: this.horizontalPosition,
  //           verticalPosition: this.verticalPosition,
  //         });
  //     }, (error) => {
  //       this.shwLdr = false;
  //       console.log(error);
  //       this._snackBar.open('Something went wrong... Please try again', '', {
  //         duration: 2000,
  //         horizontalPosition: this.horizontalPosition,
  //         verticalPosition: this.verticalPosition,
  //       });
  //     });
  // }

  dasanpackPonch_aaa() {
    this.cafupdfrm.enable();
    this.cafupdfrm.get('down_stream').setValidators(Validators.required);
    this.cafupdfrm.get('down_stream').updateValueAndValidity();
    // this.ponadd234 = true;
    this.edibtnenble = true;
    if (this.cafupdfrm.get('down_stream').value) {
      let data = {
        "enty_id": 1,
        "actn_id": 1,
        "commands": `curl -XGET -H "Content-type:application/json" 'http://172.16.4.107/prov4serv/prov_if?oper=insert&client=lag:${this.cafupdfrm.value.aaa_cd}&avp=Filter-Id<>nonblock<>check&avp=accessId<><>reply&avp=Profile<>pV4<>reply&avp=cisco-avpair<>subscriber:sa=${this.cafupdfrm.value.down_stream}<>reply&avp=cisco-avpair<>subscriber:accounting-list=default<>reply'`,
        "actn_nm": "PON CHANGE",

      };
      console.log(data)
      this.shwLdr = true;
      this.crdsrv.create(data, 'execurl')
        .subscribe((res) => {
          console.log(res);
          //this.replaceSlashes;
          this.shwLdr = false;
          if (res['status'] == 200) {
            this.curlRslts = res['data'];
            this._snackBar.open('Executed Sucessfully', '', {
              duration: 2000,
              horizontalPosition: this.horizontalPosition,
              verticalPosition: this.verticalPosition,
            });
          } else
            this._snackBar.open('Something went wrong... Please try again', '', {
              duration: 2000,
              horizontalPosition: this.horizontalPosition,
              verticalPosition: this.verticalPosition,
            });
        }, (error) => {
          this.shwLdr = false;
          console.log(error);
          this._snackBar.open('Something went wrong... Please try again', '', {
            duration: 2000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
          });
        })
    } else {
      this.subs_prfle_nm = true;
    }

  }


  Pondel_agh_das1() {
    {
      this.cafupdfrm.enable()
      // this.ponchngDas_Agh234 = true;
      this.edibtnenble = true;

      let data = {
        "enty_id": 1,
        "actn_id": 1,
        "commands": `curl -XDELETE -H "Content-type:application/json" -H "Authorization:Basic Og==" -H "password:1234" -H "username:rest" 'http://172.16.14.11:8090/nbi/managedelementmgr/${this.cafupdfrm.value.ip_adr}/ctp/${this.cafupdfrm.value.olt_crd_nu}/${this.cafupdfrm.value.pon}/${this.cafupdfrm.value.olt_onu_id}'`,
        "actn_nm": "PON CHANGE",

      };
      console.log(data)
      this.shwLdr = true;
      this.crdsrv.create(data, 'execurl')
        .subscribe((res) => {
          console.log(res);
          console.log(this.PenAct1);
          //this.replaceSlashes;
          this.shwLdr = false;
          if (res['status'] == 200) {
            this.curlRslts = res['data'];
            this._snackBar.open('Executed Sucessfully', '', {
              duration: 2000,
              horizontalPosition: this.horizontalPosition,
              verticalPosition: this.verticalPosition,
            });
          } else
            this._snackBar.open('Something went wrong... Please try again', '', {
              duration: 2000,
              horizontalPosition: this.horizontalPosition,
              verticalPosition: this.verticalPosition,
            });
        }, (error) => {
          this.shwLdr = false;
          console.log(error);
          this._snackBar.open('Something went wrong... Please try again', '', {
            duration: 2000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
          });
        })
    }
  }

  PondelDas_AghHSI1() {
    this.cafupdfrm.enable()
    this.ponchngDas_Agh_hsi = true;
    this.edibtnenble = true;

    let data = {
      "enty_id": 1,
      "actn_id": 1,
      "commands": `curl -XDELETE -H "Content-type:application/json" -H "Authorization:Basic Og==" -H "password:1234" -H "username:rest" 'http://172.16.14.11:8090/nbi/managedelementmgr/${this.cafupdfrm.value.ip_adr}/ctp/${this.cafupdfrm.value.olt_crd_nu}/${this.cafupdfrm.value.pon}/${this.cafupdfrm.value.olt_onu_id}'`,
      "actn_nm": "PON CHANGE",

    };
    console.log(data)
    this.shwLdr = true;
    this.crdsrv.create(data, 'execurl')
      .subscribe((res) => {
        console.log(res);
        console.log(this.PenAct1);
        //this.replaceSlashes;
        this.shwLdr = false;
        if (res['status'] == 200) {
          this.curlRslts = res['data'];
          this._snackBar.open('Executed Sucessfully', '', {
            duration: 2000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
          });
        } else
          this._snackBar.open('Something went wrong... Please try again', '', {
            duration: 2000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
          });
      }, (error) => {
        this.shwLdr = false;
        console.log(error);
        this._snackBar.open('Something went wrong... Please try again', '', {
          duration: 2000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
      })
  }

  PondelDas_AghHSI2() {
    {
      this.cafupdfrm.enable();
      this.edibtnenble = true;
      let data = {
        "enty_id": 1,
        "actn_id": 1,
        "actn_nm": "PON CHANGE",
        "commands": `curl -XGET -H 'Authorization: Basic Og==' -H "Content-type: application/json" -H "password: 1234" -H "username: rest" 'http://172.16.4.107/prov4serv/prov_if?oper=delete&client=lag:${this.cafupdfrm.value.aaa_cd}'`
      };
      console.log(data)
      this.shwLdr = true;
      this.crdsrv.create(data, 'execurl')
        .subscribe((res) => {
          console.log(res);
          this.shwLdr = false;
          if (res['status'] == 200) {
            this.curlRslts = res['data'];
            this._snackBar.open('Executed Sucessfully', '', {
              duration: 2000,
              horizontalPosition: this.horizontalPosition,
              verticalPosition: this.verticalPosition,
            });
          } else
            this._snackBar.open('Something went wrong... Please try again', '', {
              duration: 2000,
              horizontalPosition: this.horizontalPosition,
              verticalPosition: this.verticalPosition,
            });
        }, (error) => {
          this.shwLdr = false;
          console.log(error);
          this._snackBar.open('Something went wrong... Please try again', '', {
            duration: 2000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
          });
        });

    }
  }

  PondelDas_AghIP1() {
    this.cafupdfrm.enable()
    this.ponchngDas_Agh1 = true;
    this.edibtnenble = true;

    let data = {
      "enty_id": 1,
      "actn_id": 1,
      "commands": `curl -XDELETE -H "Content-type:application/json" -H "Authorization:Basic Og==" -H "password:1234" -H "username:rest" 'http://172.16.14.11:8090/nbi/managedelementmgr/${this.cafupdfrm.value.ip_adr}/ctp/${this.cafupdfrm.value.olt_crd_nu}/${this.cafupdfrm.value.old_pon_das1}/${this.cafupdfrm.value.olt_onu_id}'`,
      "actn_nm": "PON CHANGE",

    };
    console.log(data)
    this.shwLdr = true;
    this.crdsrv.create(data, 'execurl')
      .subscribe((res) => {
        console.log(res);
        console.log(this.PenAct1);
        //this.replaceSlashes;
        this.shwLdr = false;
        if (res['status'] == 200) {
          this.curlRslts = res['data'];
          this._snackBar.open('Executed Sucessfully', '', {
            duration: 2000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
          });
        } else
          this._snackBar.open('Something went wrong... Please try again', '', {
            duration: 2000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
          });
      }, (error) => {
        this.shwLdr = false;
        console.log(error);
        this._snackBar.open('Something went wrong... Please try again', '', {
          duration: 2000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
      })
  }

  PondelDas_AghIP2() {
    {
      this.cafupdfrm.enable();
      this.edibtnenble = true;
      let data = {
        "enty_id": 1,
        "actn_id": 1,
        "actn_nm": "PON CHANGE",
        "commands": `curl -XGET -H 'Authorization: Basic Og==' -H "Content-type: application/json" -H "password: 1234" -H "username: rest" 'http://172.16.4.107/prov4serv/prov_if?oper=${this.de_lte}&client=${this.cafupdfrm.value.aaa_cd}'`
      };
      console.log(data)
      this.shwLdr = true;
      this.crdsrv.create(data, 'execurl')
        .subscribe((res) => {
          console.log(res);
          this.shwLdr = false;
          if (res['status'] == 200) {
            this.curlRslts = res['data'];
            this._snackBar.open('Executed Sucessfully', '', {
              duration: 2000,
              horizontalPosition: this.horizontalPosition,
              verticalPosition: this.verticalPosition,
            });
          } else
            this._snackBar.open('Something went wrong... Please try again', '', {
              duration: 2000,
              horizontalPosition: this.horizontalPosition,
              verticalPosition: this.verticalPosition,
            });
        }, (error) => {
          this.shwLdr = false;
          console.log(error);
          this._snackBar.open('Something went wrong... Please try again', '', {
            duration: 2000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
          });
        });

    }
  }

  PonAddDasAgh1() {
    this.cafupdfrm.get('up_stream').clearValidators();
    this.cafupdfrm.get('up_stream').updateValueAndValidity();
    this.cafupdfrm.get('down_stream').clearValidators();
    this.cafupdfrm.get('down_stream').updateValueAndValidity();
    this.cafupdfrm.enable()
    this.ponadddasagh1 = true;
    this.edibtnenble = true;

    let data = {
      "enty_id": 1,
      "actn_id": 1,
      "commands": "curl -XPOST -H" + " 'Authorization" + ': ' + "Basic YnNzOkJzc0AxMjM=' -H " + '"Content-type' + ': ' + 'application/json" -d' + "'{" + '"aid"' + ':' + '{' + '"ipAddress"' + ':' + '"' + this.cafupdfrm.value.ip_adr + '"' + ',' + '"card"' + ':' + this.cafupdfrm.value.olt_crd_nu + ',' + '"tp"' + ':' + this.cafupdfrm.value.pon + ',' + '"onuId"' + ':' + this.cafupdfrm.value.olt_onu_id + '}' + ',' + '"admin"' + ':' + '"1"' + ',' + '"fec"' + ':' + '"true"' + ',' + '"swUpgradeMode"' + ':' + '"2"' + ',' + '"serialNumber"' + ':' + '"' + this.cafupdfrm.value.agora_srl_nu + '"' + ',' + '"profileName"' + ':' + '"' + this.cafupdfrm.value.onu_mdle_cd + '"' + ',' + '"registerType"' + ':' + '"1"' + ',' + '"name"' + ':' + '"' + this.cafupdfrm.value.lst_nm + this.cafupdfrm.value.cstmr_nm + ' - ' + this.cafupdfrm.value.caf_nu + '"' + "}'" + " 'http://172.16.0.44:8080/agorang/rest/v1/eml/onu'",
      "actn_nm": "PON CHANGE",
    };
    console.log(data)
    this.shwLdr = true;
    this.crdsrv.create(data, 'execurl')
      .subscribe((res) => {
        console.log(res);
        console.log(this.PenAct1);
        //this.replaceSlashes;
        this.shwLdr = false;
        if (res['status'] == 200) {
          this.curlRslts = res['data'];
          this._snackBar.open('Executed Sucessfully', '', {
            duration: 2000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
          });
        } else
          this._snackBar.open('Something went wrong... Please try again', '', {
            duration: 2000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
          });
      }, (error) => {
        this.shwLdr = false;
        console.log(error);
        this._snackBar.open('Something went wrong... Please try again', '', {
          duration: 2000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
      })


  }

  PonAddDasAgh2() {
    this.cafupdfrm.enable();
    this.cafupdfrm.get('up_stream').setValidators(Validators.required);
    this.cafupdfrm.get('up_stream').updateValueAndValidity();
    this.ponadddasagh2 = true;
    this.edibtnenble = true;

    if (this.cafupdfrm.get('up_stream').value) {
      let data = {
        "enty_id": 1,
        "actn_id": 1,
        "commands": "curl -XPOST -H" + " 'Authorization" + ': ' + "Basic YnNzOkJzc0AxMjM='  -H" + '"Content-type' + ':' + ' application/json" -d' + "'{" + '"aid"' + ':' + '{' + '"ipAddress"' + ':' + '"' + this.cafupdfrm.value.ip_adr + '"' + ',' + '"card"' + ':' + this.cafupdfrm.value.olt_crd_nu + ',' + '"tp"' + ':' + this.cafupdfrm.value.pon + ',' + '"onuId"' + ':' + this.cafupdfrm.value.olt_onu_id + '}' + ',' + '"tps"' + ':' + '[{' + '"card"' + ':' + '"1"' + ',' + '"tps"' + ':' + '[2]' + '}]' + ',' + '"admin"' + ':' + '"1"' + ',' + '"name"' + ':' + '"HSI"' + ',' + '"networkServiceName"' + ':' + '"HSI"' + ',' + '"upstreamTrafficProfileName"' + ':' + '"' + this.cafupdfrm.value.up_stream + '"' + ',' + '"downstreamTrafficProfileName"' + ':' + '" "' + ',' + '"l2DhcpRelay"' + ':' + '{' + '"remoteId"' + ':' + '"ID"' + ',' + '"useGlobalDhcp"' + ':' + 'false' + ',' + '"op82"' + ':' + 'true' + ',' + '"op18"' + ':' + 'false' + ',' + '"op37"' + ':' + 'false' + '}' + ',' + '"igmpOptions"' + ':' + '{' + '"useGlobal"' + ':' + 'false' + ',' + '"enable"' + ':' + 'true' + '}' + ',' + '"nativeVlan"' + ':' + 'false' + "}'" + " 'http://172.16.0.44:8080/agorang/rest/v1/eml/clientservicegpon'",
        "actn_nm": "PON CHANGE",
      };
      console.log(data)
      this.shwLdr = true;
      this.crdsrv.create(data, 'execurl')
        .subscribe((res) => {
          console.log(res);
          // console.log(this.PenAct1);
          //this.replaceSlashes;
          this.shwLdr = false;
          if (res['status'] == 200) {
            this.curlRslts = res['data'];
            this._snackBar.open('Executed Sucessfully', '', {
              duration: 2000,
              horizontalPosition: this.horizontalPosition,
              verticalPosition: this.verticalPosition,
            });
          } else
            this._snackBar.open('Something went wrong... Please try again', '', {
              duration: 2000,
              horizontalPosition: this.horizontalPosition,
              verticalPosition: this.verticalPosition,
            });
        }, (error) => {
          this.shwLdr = false;
          console.log(error);
          this._snackBar.open('Something went wrong... Please try again', '', {
            duration: 2000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
          });
        })
    } else {
      this.upstrm_prfl_nm = true;
    }


  }

  PonAddDasAgh3() {
    {
      this.cafupdfrm.enable()
      this.ponadddasagh3 = true;
      this.edibtnenble = true;

      let data = {
        "enty_id": 1,
        "actn_id": 1,
        "commands": "curl -XPOST -H" + " 'Authorization" + ':' + " Basic YnNzOkJzc0AxMjM=' -H " + '"Content-type' + ':' + ' application/json" -d' + "'{" + '"aid"' + ':' + '{' + '"ipAddress"' + ':' + '"' + this.cafupdfrm.value.ip_adr + '"' + ',' + '"card"' + ':' + this.cafupdfrm.value.olt_crd_nu + ',' + '"tp"' + ':' + this.cafupdfrm.value.pon + ',' + '"onuId"' + ':' + this.cafupdfrm.value.olt_onu_id + '}' + ',' + '"tps"' + ':' + '[{' + '"card"' + ':' + '"1"' + ',' + '"tps"' + ':' + '["2"]' + '}]' + ',' + '"admin"' + ':' + '"1"' + ',' + '"networkServiceName"' + ':' + '"IPTV"' + ',' + '"name"' + ':' + '"IPTV"' + ',' + '"nativeVlan"' + ':' + 'false' + "}'" + " 'http://172.16.0.44:8080/agorang/rest/v1/eml/clientservicegpon'",
        "actn_nm": "PON CHANGE",
      };
      console.log(data)
      this.shwLdr = true;
      this.crdsrv.create(data, 'execurl')
        .subscribe((res) => {
          console.log(res);
          // console.log(this.PenAct1);
          //this.replaceSlashes;
          this.shwLdr = false;
          if (res['status'] == 200) {
            this.curlRslts = res['data'];
            this._snackBar.open('Executed Sucessfully', '', {
              duration: 2000,
              horizontalPosition: this.horizontalPosition,
              verticalPosition: this.verticalPosition,
            });
          } else
            this._snackBar.open('Something went wrong... Please try again', '', {
              duration: 2000,
              horizontalPosition: this.horizontalPosition,
              verticalPosition: this.verticalPosition,
            });
        }, (error) => {
          this.shwLdr = false;
          console.log(error);
          this._snackBar.open('Something went wrong... Please try again', '', {
            duration: 2000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
          });
        })


    }
  }

  PonAddDasAgh4() {
    this.cafupdfrm.enable()
    this.ponadddasagh4 = true;
    this.edibtnenble = true;

    let data = {
      "enty_id": 1,
      "actn_id": 1,
      "commands": "curl -XPUT -H" + " 'Authorization" + ':' + " Basic YnNzOkJzc0AxMjM=' -H" + ' "Content-type' + ':' + ' application/json" -d' + "'{" + '"admin"' + ':' + "0" + ',' + '"name"' + ':' + '"IPTV"' + "}'" + " 'http://172.16.0.44:8080/agorang/rest/v1/eml/clientservicegpon/" + this.cafupdfrm.value.ip_adr + '-' + this.cafupdfrm.value.olt_crd_nu + '-' + this.cafupdfrm.value.pon + '-' + this.cafupdfrm.value.olt_onu_id + '-' + "HSI/multicastpackage'",
      "actn_nm": "PON CHANGE",
    };
    console.log(data)
    this.shwLdr = true;
    this.crdsrv.create(data, 'execurl')
      .subscribe((res) => {
        console.log(res);
        console.log(this.PenAct1);
        //this.replaceSlashes;
        this.shwLdr = false;
        if (res['status'] == 200) {
          this.curlRslts = res['data'];
          this._snackBar.open('Executed Sucessfully', '', {
            duration: 2000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
          });
        } else
          this._snackBar.open('Something went wrong... Please try again', '', {
            duration: 2000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
          });
      }, (error) => {
        this.shwLdr = false;
        console.log(error);
        this._snackBar.open('Something went wrong... Please try again', '', {
          duration: 2000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
      })


  }

  PonAddDasAgh5() {
    this.cafupdfrm.enable();
    this.cafupdfrm.get('down_stream').setValidators(Validators.required);
    this.cafupdfrm.get('down_stream').updateValueAndValidity();
    this.ponadddasagh5 = true;
    this.edibtnenble = true;

    if (this.cafupdfrm.get('down_stream').value) {
      let data = {
        "enty_id": 1,
        "actn_id": 1,
        "commands": "curl -XGET -H" + ' "Content-type' + ':' + ' application/json"' + " 'http://172.16.4.107/prov4serv/prov_if?oper=insert&client" + '=' + this.cafupdfrm.value.aaa_cd + '&avp' + '=' + "Filter-Id<>nonblock<>check&avp=accessId<>" + this.cafupdfrm.value.onu_mac_addr + "<>reply&avp=Profile<>pV4<>reply&avp=cisco-avpair<>subscriber:sa=" + this.cafupdfrm.value.down_stream + "<>reply&avp=cisco-avpair<>subscriber:accounting-list=default<>reply'",
        "actn_nm": "PON CHANGE",

      };
      console.log(data)
      this.shwLdr = true;
      this.crdsrv.create(data, 'execurl')
        .subscribe((res) => {
          console.log(res);
          console.log(this.PenAct1);
          //this.replaceSlashes;
          this.shwLdr = false;
          if (res['status'] == 200) {
            this.curlRslts = res['data'];
            this._snackBar.open('Executed Sucessfully', '', {
              duration: 2000,
              horizontalPosition: this.horizontalPosition,
              verticalPosition: this.verticalPosition,
            });
          } else
            this._snackBar.open('Something went wrong... Please try again', '', {
              duration: 2000,
              horizontalPosition: this.horizontalPosition,
              verticalPosition: this.verticalPosition,
            });
        }, (error) => {
          this.shwLdr = false;
          console.log(error);
          this._snackBar.open('Something went wrong... Please try again', '', {
            duration: 2000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
          });
        })
    } else {
      this.subs_prfle_nm = true;
    }


  }

  PonAddDasAgh6() {
    this.cafupdfrm.enable()
    // this.ponadd891 = true;
    this.edibtnenble = true;
    let data = {
      "enty_id": 1,
      "actn_id": 1,
      "actn_nm": "PON CHANGE",
      "commands": `curl -XGET -H 'Authorization: Basic Og==' -H "Content-type: application/json" -H "password: 1234" -H "username: rest" 'http://172.16.4.107/prov4serv/prov_if?oper=delete&client=lag:${this.cafupdfrm.value.aaa_cd}'`
    };
    console.log(data)
    this.shwLdr = true;
    this.crdsrv.create(data, 'execurl')
      .subscribe((res) => {
        console.log(res);
        this.shwLdr = false;
        if (res['status'] == 200) {
          this.curlRslts = res['data'];
          this._snackBar.open('Executed Sucessfully', '', {
            duration: 2000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
          });
        } else
          this._snackBar.open('Something went wrong... Please try again', '', {
            duration: 2000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
          });
      }, (error) => {
        this.shwLdr = false;
        console.log(error);
        this._snackBar.open('Something went wrong... Please try again', '', {
          duration: 2000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
      });

  }

  selectedDstrct(data) {
    console.log("dle_tx", data)
    this.de_lte = data.value;
  }



  //*********************** Profile Reduced start here ******************//


  ProfRed1() {
    console.log(this.profilefrm)
    this.creation = false;
    var rte;
    if (this.de_lte == 'view') {
      rte = `https://bbnlbss.apsfl.co.in/apiv1/dashbrd/huaweiAAAview`;
    } else {
      rte = `https://bbnlbss.apsfl.co.in/apiv1/dashbrd/huaweiAAAdelete`;
    }
    console.log("rte", rte);
    let data = {
      "aaa_cd": this.profilefrm.value.aaa_cd
    };
    console.log(data, "Pon Das Das del")
    this.shwLdr = true;
    this.http.post(rte, data).subscribe(res => {
      console.log(res);
      this.shwLdr = false;
      if (res['status'] == 200) {
        this.prflerdcecurlRslts = res['data'];
        this._snackBar.open('Executed Sucessfully', '', {
          duration: 2000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
      } else
        this._snackBar.open('Something went wrong... Please try again', '', {
          duration: 2000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
    }, (error) => {
      this.shwLdr = false;
      console.log(error);
      this._snackBar.open('Something went wrong... Please try again', '', {
        duration: 2000,
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      });
    });

  }

  ProfRed2() {
    this.creation = false;
    let data = {
      "aaa_cd": this.profilefrm.value.aaa_cd, "access_id": this.profilefrm.value.acce_id, "profile_tx": this.profilefrm.value.down_stream
    }
    console.log(data, "Das-DAs HSI-2 PUsh")
    this.shwLdr = true;
    this.http.post('https://bbnlbss.apsfl.co.in/apiv1/dashbrd/createHuaweiProfile', data).subscribe(res => {
      console.log(res);
      this.shwLdr = false;
      if (res['status'] == 200) {
        this.prflerdcecurlRslts = res['data'];
        this._snackBar.open('Executed Sucessfully', '', {
          duration: 2000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
      } else
        this._snackBar.open('Something went wrong... Please try again', '', {
          duration: 2000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
    }, (error) => {
      this.shwLdr = false;
      console.log(error);
      this._snackBar.open('Something went wrong... Please try again', '', {
        duration: 2000,
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      });
    });

  }


  ProfRed3() {
    this.creation = false;
    let data = {
      "aaa_cd": this.profilefrm.value.aaa_cd,
      "sa": this.profilefrm.value.down_stream
    };
    this.shwLdr = true;
    this.http.post('https://bbnlbss.apsfl.co.in/apiv1/dashbrd/HuaweiBngUpdateProfile', data).subscribe(res => {
      console.log(res);
      this.shwLdr = false;
      if (res['status'] == 200) {
        this.prflerdcecurlRslts = res['data'];
        this._snackBar.open('Executed Sucessfully', '', {
          duration: 2000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
      } else
        this._snackBar.open('Something went wrong... Please try again', '', {
          duration: 2000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
    }, (error) => {
      this.shwLdr = false;
      console.log(error);
      this._snackBar.open('Something went wrong... Please try again', '', {
        duration: 2000,
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      });
    });

  }



  //*********************** Profile Reduced end here ******************//



  //*********************** Curl Operation end here ******************//


  // buttonClick(){
  //   this.click = !this.click;
  // }

  onKey(event: KeyboardEvent) {
    // Checking to see if value is empty or not
    // remember we are using ternary operator here 
    //this.click = (event.target as HTMLInputElement).value === '' ? true : false;
  }



  // replaceSlashes() {

  //   let origString = 'string / with some // slashes /';
  //   let replacementString = '*';
  //   let replacedString =
  //     origString.replace(/\//g, replacementString);

  //   document.querySelector('.output').textContent =
  //     replacedString;
  // }



}
