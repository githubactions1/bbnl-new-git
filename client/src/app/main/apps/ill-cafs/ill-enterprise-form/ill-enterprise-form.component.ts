import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CrudService } from '../../crud.service';
import { TransfereService } from 'app/providers/transfer/transfer.service';
import { MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition, MatSnackBar } from '@angular/material';
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';
import html2pdf from 'html2pdf.js';
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { Router } from '@angular/router';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import { MatStepper } from '@angular/material';

class ImageSnippet {
  constructor(public src: string, public file: File) { }
}

@Component({
  selector: 'app-ill-enterprise-form',
  templateUrl: './ill-enterprise-form.component.html',
  styleUrls: ['./ill-enterprise-form.component.scss']
})

export class IllEnterpriseFormComponent implements OnInit {
  getHeaderDtls = function () { return { "title": 'Add New ILL Enterpriese Customer', "icon": "people_outline" } }
  firstFormGroup: FormGroup;
  @ViewChild('stepper') private myStepper: MatStepper;
  totalStepsCount: number;
  org;
  suborg;
  prf_typ;
  instl_mndl_lst;
  blng_frqncy_lst;
  selectedFile: ImageSnippet;
  selectedFile1: ImageSnippet;
  loader = false;
  isChecked;

  upldFleEnble;
  instl_vlge_lst;
  OthersTxt;
  upldFleBsnEnble;
  OthersTxtBsn;
  distId;
  ste_lst;
  instl_dstrt_lst;
  usrdtls;
  siusr;
  blng_dstrt_lst;
  cafDtls;
  rtedis: any;
  distrct_id: any;
  rtemndl: any;
  rtevlg: any;
  vilge_lst;
  blng_mndl_lst;
  blng_vlge_lst;
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  mndal_lst: any;
  CstmrId;
  CstmrData;
  cstmrDataBind;
  ItmLst: any[];
  ItmLst1;
  StdCd;
  PhnNum;
  PanrGir;
  ProofOfId;
  SrvdOrdAddLn1;
  SrvdOrdAddLn2;
  SoCtyNm;
  SoPnCd;
  SoCntryNm;
  SoStNm;
  GstNum;
  BlnAcNum;
  BilAddLn1;
  BilAddLn2;
  BilCtyNm;
  BilPnCd;
  BilStNm;
  BilCntryNm;
  ProofOfBil;
  PrdctSlc;
  NumOfCon;
  IntPrtSpd;
  FeeMdl;
  CntrcyPd;
  BilPrdct;
  LmoCd;
  LmoNm;
  LmoMbl;
  sameblng;
  ipaddrss;
  cnctprdtyp;
  price;
  apsflshre;
  lmoshre;
  msoshre;
  gst;
  cre_srvcs;
  bilngChckd;
  slctd_plns;
  cstmrdtls
  pdfBindDat=[{cntct_nm:"",cntct_mble1_nu:"",loc_eml1_tx:"",cntct_prsn_nm:"",cntct_prsn_phne_num:"",cntct_prsn_eml:""}];
  constructor(private _formBuilder: FormBuilder, public crdSrvc: CrudService, private snackBar: MatSnackBar, public TransfereService: TransfereService, private router: Router) {
    this.ItmLst = ['s', 'r', 'a', 'v', 'a', 'n', 'i', '', 'm', 'a', 'c', 'h', 'i', 'n', 'a', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '];
    this.ItmLst1 = [' ', ' ', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '', '', '', ' ', ' ', '', '', ''];
    this.StdCd = ['', '', '', '', ''];
    this.PhnNum = ['', '', '', '', '', '', '', '', '', ''];
    this.PanrGir = ['', '', '', '', '', '', '', '', '', ''];
    this.ProofOfId = "";
    this.SrvdOrdAddLn1 = ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''];
    this.SrvdOrdAddLn2 = ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''];
    this.SoCtyNm = ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''];
    this.SoPnCd = ['', '', '', '', '', ''];
    this.SoStNm = ['A', 'N', 'D', 'H', 'R', 'A', ' ', 'P', 'R', 'A', 'D', 'E', 'S', 'H']
    this.SoCntryNm = ['I', 'N', 'D', 'I', 'A'];
    this.GstNum = ['', '', '', '', '', '', '', '', '', '', '', '', '', '', ''];
    this.BlnAcNum = ['', '', '', '', '', '', '', '', '', '', '', '', '', '', ''];
    this.BilAddLn1 = ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''];
    this.BilAddLn2 = ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''];
    this.BilCtyNm = ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''];
    this.BilPnCd = ['', '', '', '', '', ''];
    this.BilStNm = ['A', 'N', 'D', 'H', 'R', 'A', ' ', 'P', 'R', 'A', 'D', 'E', 'S', 'H']
    this.BilCntryNm = ['I', 'N', 'D', 'I', 'A'];
    this.ProofOfBil = "";
    this.PrdctSlc = "";
    this.NumOfCon = ['', ''];
    this.IntPrtSpd = ['', '', '', '', ''];
    this.FeeMdl = ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''];
    this.CntrcyPd = ['', ''];
    this.BilPrdct = ['', '', '', '', '', '', '', '', '', '', '', ''];
    this.LmoCd = ['', '', '', '', '', '', '', '', '', ''];
    this.LmoNm = ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''];
    this.LmoMbl = ['', '', '', '', '', '', '', '', '', ''];
    this.price = "";
    this.apsflshre = "";
    this.lmoshre = "";
    this.msoshre = "";
    this.gst = ""
  }
  message: string;

  // ngAfterViewInit() {
  //   this.message = this.child.message;
  //   html2pdf(this.message,{
  //     margin: 1,
  //     filename: 'myfile.pdf',
  //     image: {type: 'png', quality: 1},
  //     width: '100vh',
  //     height: '100vh',
  //     html2canvas: {scale: 3,letterRendering: true,useCORS: true},
  //     jsPDF: {unit: 'mm', format: 'a4', orientation: 'portrait', pagesplit: true}
  //     })
  // }
  ngOnInit() {
    this.getorg();
    this.getBillingFrequency();
    this.getStates();
    this.getCresrvcs();
    this.cafDtls = this.TransfereService.getLoclData('cafData');
    this.CstmrData = this.TransfereService.getLoclData('data')
    console.log(this.CstmrData);
    if (!this.CstmrData) { }
    else if (this.CstmrData.cstmrId) {
      console.log("in pacjahe");
      this.getcstmrData();
    }
    this.getPrfTypes();
    let emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
    let phoneNumber = /^(\+\d{1,3}[- ]?)?\d{10}$/;
    const namePattern = /^[a-zA-Z \s]+$/;
    const adharnumber = /^(\+\d{1,3}[- ]?)?\d{12}$/;
    let panNumber = /^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$/;
    let gstNumber = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;
    this.usrdtls = JSON.parse(localStorage.getItem('usrDtls'));
    if (this.usrdtls.prt_in == 2) {
      this.siusr = true
    }
    this.firstFormGroup = this._formBuilder.group({
      custInfo: this._formBuilder.group({
        sub_org_typ: ['', Validators.required],
        org_typ: ['', Validators.required],
        orgName: ['', [Validators.required, Validators.pattern(namePattern)]],
        cntprsnName: ['', [Validators, Validators.pattern(namePattern)]],
        cntprsndis: ['', Validators.required],
        date: ['', Validators],
        father_husbandname: ['', Validators],
        pan_card_no: ['', [Validators.required, Validators.pattern(panNumber)]],
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
        gst_no: ['', [Validators.required, Validators.pattern(gstNumber)]],
        prf_typ_id: ['', Validators.required],
        bsn_prf_typ_id: ['', Validators.required],
        prf_idnty_url: ['', Validators.required],
        prf_idnty_thrs: [''],
        prf_idnty_bsn_thrs: [''],
        addrs_idnty_prf_url: ['', Validators.required],
        iTcntprsnName: ['', [Validators, Validators.pattern(namePattern)]],
        iTcnctPrsnemail: ['', [Validators.pattern(emailPattern)]],
        iTcntct_prsn_mobileNumber: ['', [Validators.required, Validators.pattern(phoneNumber)]],
      }),
      // ip_schme: ['', Validators.required],
      intrnt_prt_spd_up: ['', Validators.required],
      intrnt_prt_spd_up_txt: ['', Validators.required],
      // intrnt_prt_spd_dwn: ['', Validators.required],
      // intrnt_prt_spd_dwn_txt: ['', Validators.required],
      num_cnts: ['', Validators.required],
      price: ['', Validators.required],
      apsfl_shre: ['', Validators.required],
      // lmo_shre: ['', Validators.required],
      cntrct_prd: ['', Validators.required],
      cntrct_prd_txt: ['', Validators.required],
      gst_at: ['', Validators.required],
      cre_srvc: ['', Validators.required],
      onetmechrge: ['', Validators.required],
      // one_tme_apsfl_shre: ['', Validators.required],
      // one_tm_lmo_shre: ['',Validators.required],
      pckge_pln: ['',Validators.required],
    });

    this.firstFormGroup.get('custInfo').get('instl_state').valueChanges.subscribe(value => {
      this.getDistricts(1, 1)
    });
    this.firstFormGroup.get('custInfo').get('instl_district').valueChanges.subscribe(value => {
      this.getMandals(value, 1)
    });
    this.firstFormGroup.get('custInfo').get('instl_mandal').valueChanges.subscribe(value => {
      this.getVillages(value, 1)
    });
    this.firstFormGroup.get('custInfo').get('blng_state').valueChanges.subscribe(value => {
      this.getDistricts(1, 2)
    });
    this.firstFormGroup.get('custInfo').get('blng_district').valueChanges.subscribe(value => {
      this.getMandals(value, 2)
    });
    this.firstFormGroup.get('custInfo').get('blng_mandal').valueChanges.subscribe(value => {
      this.getVillages(value, 2)
    });
    this.slctd_plns=[{
      slctd_pln_id:1,
      slctd_pln_nm:"Prepaid"
    },
    {
      slctd_pln_id:2,
      slctd_pln_nm:"Postpaid"
    }]
  }
  getPrfTypes() {
    const rte = `caf/getProofTypes`;
    this.crdSrvc.get(rte).subscribe((res) => {
      console.log(res['data'])
      this.prf_typ = res['data'];
    })
  }

  getcstmrData() {
    setTimeout(() => {
      this.myStepper.next();
    }, 300)
    let rte=`caf/CstmrDataget/${this.CstmrData.cstmrId}`;
    this.crdSrvc.get(rte).subscribe(res=>{
      this.cstmrdtls = res['data']
    })
  }
  checkValue(event: any) {
    console.log(event);
    if (event == 'true') {
      this.bilngChckd = 1;
      console.log(event);
      let data = this.firstFormGroup.value;
      console.log(data.custInfo.instl_house_flat_no)
      this.firstFormGroup.get('custInfo.blng_house_flat_no').setValue(data.custInfo.instl_house_flat_no);
      this.firstFormGroup.get('custInfo.blng_buildingname').setValue(data.custInfo.instl_buildingname);
      this.firstFormGroup.get('custInfo.blng_streetname').setValue(data.custInfo.instl_streetname);
      this.firstFormGroup.get('custInfo.blng_Area_Localityname').setValue(data.custInfo.instl_Area_Localityname);
      this.firstFormGroup.get('custInfo.blng_pincode').setValue(data.custInfo.instl_pincode);
      this.firstFormGroup.get('custInfo.blng_state').setValue(data.custInfo.instl_state);
      this.firstFormGroup.get('custInfo.blng_district').setValue(data.custInfo.instl_district);
      this.firstFormGroup.get('custInfo.blng_mandal').setValue(data.custInfo.instl_mandal);
      this.firstFormGroup.get('custInfo.blng_city_villagename').setValue(data.custInfo.instl_city_villagename);
      this.firstFormGroup.get('custInfo.blng_fax_no').setValue(data.custInfo.instl_fax_no);
    } else {
      this.bilngChckd = 2;
      this.firstFormGroup.get('custInfo').get('blng_house_flat_no').reset();
      this.firstFormGroup.get('custInfo').get('blng_buildingname').reset();
      this.firstFormGroup.get('custInfo').get('blng_streetname').reset();
      this.firstFormGroup.get('custInfo').get('blng_Area_Localityname').reset();
      this.firstFormGroup.get('custInfo').get('blng_pincode').reset();
      this.firstFormGroup.get('custInfo').get('blng_fax_no').reset();

      this.firstFormGroup.get('custInfo').get('contactpersonname').reset();
      this.firstFormGroup.get('custInfo').get('cntct_prsn_mobileNumber').reset();
      this.firstFormGroup.get('custInfo').get('cntct_prsn_email').reset();
      this.firstFormGroup.get('custInfo').get('blng_state').reset();
      this.firstFormGroup.get('custInfo').get('blng_district').reset();
      this.firstFormGroup.get('custInfo').get('blng_mandal').reset();
      this.firstFormGroup.get('custInfo').get('blng_city_villagename').reset();
    }

  }
  ngOnDestroy() {
    this.TransfereService.ClearLocalData('data')
  }
  getCresrvcs() {
    // const rte = `caf/getcreSrvcs`;
    // this.crdSrvc.get(rte).subscribe((res) => {
    //   console.log(res['data'])
    //   this.cre_srvcs = res['data'];
    // })
    this.cre_srvcs = [{
      cre_srvce_id:1,
      cre_srvce_nm:"ILL",
    },{
      cre_srvce_id:2,
      cre_srvce_nm:"VPN", 
    }]
  }
  getGstAmnt() {
    console.log("gst amount");
    let gstAmntval = 18 / 100 * this.firstFormGroup.value.price;
    let gstAmnt = gstAmntval.toFixed(2);
    this.firstFormGroup.get('gst_at').setValue(gstAmnt);
    let totalAmntVal = parseInt(gstAmnt)+parseInt(this.firstFormGroup.value.price);
    let totalAmnt = totalAmntVal.toFixed(2)
    this.firstFormGroup.get('apsfl_shre').setValue(totalAmnt)
    console.log(this.firstFormGroup.value.gst_at)
  }
  save() {
    console.log(this.firstFormGroup);

   if (parseInt(this.firstFormGroup.value.price) + parseInt(this.firstFormGroup.value.gst_at) !== parseInt(this.firstFormGroup.value.apsfl_shre)) {
      this.snackBar.open("Please Enter Valid Share Amount ", '', {
        duration: 2000,
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      });
    }
    // else if (parseInt(this.firstFormGroup.value.onetmechrge)) {
    //   this.snackBar.open("Please Enter Valid One Time Share Amount ", '', {
    //     duration: 2000,
    //     horizontalPosition: this.horizontalPosition,
    //     verticalPosition: this.verticalPosition,
    //   });
    // }
    else {
      console.log("in else")
      if (!this.CstmrData) {
        if (this.firstFormGroup.invalid) {
          this.snackBar.open("Please Enter Valid Data", '', {
            duration: 2000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
          });
        }
        else{
        let filetypCstInfo;
        let filetypeCstBlngAdd;
        let prt_spd;
        let pckgenm;
        if (this.selectedFile.file.type == "application/pdf") {
          filetypCstInfo = "pdf"
        }
        else {
          filetypCstInfo = "image"
        }
        if (this.selectedFile1.file.type == "application/pdf") {
          filetypeCstBlngAdd = "pdf"
        }
        else {
          filetypeCstBlngAdd = "image"
        }
        this.firstFormGroup.value.custInfo.addrs_idnty_prf_url = this.selectedFile1.src;
        this.firstFormGroup.value.custInfo.prf_idnty_url = this.selectedFile.src;
        pckgenm = this.firstFormGroup.value.intrnt_prt_spd_up + '' + this.firstFormGroup.value.intrnt_prt_spd_up_txt + '_UP_' + this.firstFormGroup.value.intrnt_prt_spd_up + '' + this.firstFormGroup.value.intrnt_prt_spd_up_txt + '_DOWN'
        prt_spd = this.firstFormGroup.value.intrnt_prt_spd_up + '_' + this.firstFormGroup.value.intrnt_prt_spd_up_txt + '_' + this.firstFormGroup.value.intrnt_prt_spd_up + '_' + this.firstFormGroup.value.intrnt_prt_spd_up_txt;
        if(this.firstFormGroup.value.cre_srvc.length==2){
          this.firstFormGroup.value.cre_srvc = 3;
        }
        else{
          this.firstFormGroup.value.cre_srvc = this.firstFormGroup.value.cre_srvc[0]
        }
        let data = {
          agnt_id: '',
          cntprsnName: this.firstFormGroup.value.custInfo.cntprsnName,
          org_typ: this.firstFormGroup.value.custInfo.org_typ,
          sub_org_typ: this.firstFormGroup.value.custInfo.sub_org_typ,
          pan_nu: this.firstFormGroup.value.custInfo.pan_card_no,
          cstmr_emle_tx: this.firstFormGroup.value.custInfo.email,
          orgName: this.firstFormGroup.value.custInfo.orgName,
          blng_frqny_id: this.firstFormGroup.value.custInfo.frqncy_id,
          instl_house_flat_no: this.firstFormGroup.value.custInfo.instl_house_flat_no,
          instl_buildingname: this.firstFormGroup.value.custInfo.instl_buildingname,
          instl_streetname: this.firstFormGroup.value.custInfo.instl_streetname,
          loc_lcly_tx: this.firstFormGroup.value.custInfo.instl_Area_Localityname,
          instl_pn_cd: this.firstFormGroup.value.custInfo.instl_pincode,
          instl_ste_id: this.firstFormGroup.value.custInfo.instl_state,
          instl_dstrt_id: this.firstFormGroup.value.custInfo.instl_district,
          instl_mndle_id: this.firstFormGroup.value.custInfo.instl_mandal,
          instl_cty_id: this.firstFormGroup.value.custInfo.instl_city_villagename,
          cntct_prsn_nm: this.firstFormGroup.value.custInfo.cntprsnName,
          mbl_nu: this.firstFormGroup.value.custInfo.cntct_prsn_mobileNumber,
          blng_house_flat_no: this.firstFormGroup.value.custInfo.blng_house_flat_no,
          blng_buildingname: this.firstFormGroup.value.custInfo.blng_buildingname,
          blng_streetname: this.firstFormGroup.value.custInfo.blng_streetname,
          blng_lclty_tx: this.firstFormGroup.value.custInfo.blng_Area_Localityname,
          blng_pn_cd: this.firstFormGroup.value.custInfo.blng_pincode,
          blng_ste_id: this.firstFormGroup.value.custInfo.blng_state,
          blng_dstrt_id: this.firstFormGroup.value.custInfo.blng_district,
          blng_mndle_id: this.firstFormGroup.value.custInfo.blng_mandal,
          blng_cty_id: this.firstFormGroup.value.custInfo.blng_city_villagename,
          actvtn_dt: this.firstFormGroup.value.custInfo.activationdate,
          gst_no: this.firstFormGroup.value.custInfo.gst_no,
          addtnl_dtls: [{
            ip_schme: this.firstFormGroup.value.ip_schme,
            prt_spd: prt_spd,
            num_cnts: this.firstFormGroup.value.num_cnts,
            price: this.firstFormGroup.value.price,
            apsfl_shre: this.firstFormGroup.value.apsfl_shre,
            // lmo_shre: this.firstFormGroup.value.lmo_shre,
            mso_shre: this.firstFormGroup.value.mso_shre,
            cntrct_prd: this.firstFormGroup.value.cntrct_prd,
            cntrct_prd_txt: this.firstFormGroup.value.cntrct_prd_txt,
            gst_at: this.firstFormGroup.value.gst_at,
            sm_as_blng_addrs_in:this.bilngChckd,
            lcl_pn_cd:this.firstFormGroup.value.custInfo.instl_pincode,
            cnct_prsn_nm:this.firstFormGroup.value.custInfo.iTcntprsnName,
            cnct_prsn_mbl_num:this.firstFormGroup.value.custInfo.iTcntct_prsn_mobileNumber,
            cnct_prsn_mbl_eml:this.firstFormGroup.value.custInfo.iTcnctPrsnemail,
            cre_srvc:this.firstFormGroup.value.cre_srvc,
            pckgenm: pckgenm,
            pckge_pln:this.firstFormGroup.value.pckge_pln,      
            agnt_id: this.usrdtls.usr_ctgry_ky,
            onetmechrge: this.firstFormGroup.value.onetmechrge,
      // one_tme_apsfl_shre: this.firstFormGroup.value.one_tme_apsfl_shre,
      // one_tm_lmo_shre: this.firstFormGroup.value.one_tm_lmo_shre,

          }],
          attachments: [{
            cstInfoFileTyp: filetypCstInfo,
            prf_typ_id: this.firstFormGroup.value.custInfo.prf_typ_id,
            prf_idnty_url: this.firstFormGroup.value.custInfo.prf_idnty_url,
            prf_idnty_thrs: this.firstFormGroup.value.custInfo.prf_idnty_thrs,
            prf_atchmnt_idnty: 1,
            prf_atchmnt_bllng_addrs: 0
          },
          {
            cstInfoFileTyp: filetypeCstBlngAdd,
            prf_typ_id: this.firstFormGroup.value.custInfo.bsn_prf_typ_id,
            prf_idnty_url: this.firstFormGroup.value.custInfo.addrs_idnty_prf_url,
            prf_idnty_thrs: this.firstFormGroup.value.custInfo.prf_idnty_bsn_thrs,
            prf_atchmnt_idnty: 0,
            prf_atchmnt_bllng_addrs: 1

          }]
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
        data["agnt_id"] = this.usrdtls.usr_ctgry_ky;
        data.addtnl_dtls[0]["agnt_id"] = this.usrdtls.usr_ctgry_ky
        data["gender"] = 0
        data["caf_type_id"] = 2
        const rte = "caf/illentcustomer";
        this.loader = true;
        console.log(data);
        this.crdSrvc.create(data, rte).subscribe((res) => {
          console.log(res);
          if (res['status'] == 200) {
            this.loader = false;
            this.snackBar.open("Sucessfully Added", '', {
              duration: 2000,
              horizontalPosition: this.horizontalPosition,
              verticalPosition: this.verticalPosition,
            });
            this.router.navigate(['admin/ILL/caf']);
            if (this.siusr) {
            } else {
            }
          }
          else{
            this.snackBar.open("Something Went Worng", '', {
              duration: 2000,
              horizontalPosition: this.horizontalPosition,
              verticalPosition: this.verticalPosition,
            });  
          }
        });

      }
    }
      else {
        let prt_spd;
        let pckgenm;
        pckgenm = this.firstFormGroup.value.intrnt_prt_spd_up + '' + this.firstFormGroup.value.intrnt_prt_spd_up_txt + '_UP_' + this.firstFormGroup.value.intrnt_prt_spd_up + '' + this.firstFormGroup.value.intrnt_prt_spd_up_txt + '_DOWN'
        prt_spd = this.firstFormGroup.value.intrnt_prt_spd_up + '_' + this.firstFormGroup.value.intrnt_prt_spd_up_txt + '_' + this.firstFormGroup.value.intrnt_prt_spd_up + '_' + this.firstFormGroup.value.intrnt_prt_spd_up_txt;
        if(this.firstFormGroup.value.cre_srvc.length==2){
          this.firstFormGroup.value.cre_srvc = 3;
        }
        else{
          this.firstFormGroup.value.cre_srvc = this.firstFormGroup.value.cre_srvc[0]
        }

        let addtnl_dtls = [{
          prt_spd: prt_spd,
          num_cnts: this.firstFormGroup.value.num_cnts,
          price: this.firstFormGroup.value.price,
          apsfl_shre: this.firstFormGroup.value.apsfl_shre,
          // lmo_shre: this.firstFormGroup.value.lmo_shre,
          mso_shre: this.firstFormGroup.value.mso_shre,
          cntrct_prd: this.firstFormGroup.value.cntrct_prd,
          cntrct_prd_txt: this.firstFormGroup.value.cntrct_prd_txt,
          gst_at: this.firstFormGroup.value.gst_at,
          cnct_prsn_nm:this.cstmrdtls[0].cntct_prsn_nm,
          cnct_prsn_mbl_num:this.cstmrdtls[0].cntct_prsn_phne_num,
          cnct_prsn_mbl_eml:this.cstmrdtls[0].cntct_prsn_eml,
          cre_srvc:this.firstFormGroup.value.cre_srvc,           
          pckgenm: pckgenm,
          pckge_pln:this.firstFormGroup.value.pckge_pln,      
          agnt_id: this.usrdtls.usr_ctgry_ky,
          sm_as_blng_addrs_in:this.cstmrdtls[0].sm_as_blng_addrs_in,
          lcl_pn_cd:this.cstmrdtls[0].lcl_pn_cd,
          onetmechrge: this.firstFormGroup.value.onetmechrge,
          // one_tme_apsfl_shre: this.firstFormGroup.value.one_tme_apsfl_shre,
          // one_tm_lmo_shre: this.firstFormGroup.value.one_tm_lmo_shre,
    
        }]
        console.log(addtnl_dtls)
        let rte = `caf/addPckge/${this.CstmrData.cstmrId}`
        this.crdSrvc.create(addtnl_dtls, rte).subscribe((res) => {
          console.log(res);
          if (res['status'] == 200) {
            this.loader = false;
            this.snackBar.open("Sucessfully Added", '', {
              duration: 2000,
              horizontalPosition: this.horizontalPosition,
              verticalPosition: this.verticalPosition,
            });
            this.TransfereService.ClearLocalData('data')
            this.router.navigate(['admin/ILL/caf'])
            if (this.siusr) {
            } else {
            }

          }
          else{
            this.loader = false;
            this.snackBar.open("Something went worng", '', {
              duration: 2000,
              horizontalPosition: this.horizontalPosition,
              verticalPosition: this.verticalPosition,
            });
          }


        });
      }
    }

  }
  enableUpld() {
    console.log("enableUpld");
    console.log(this.firstFormGroup.value);
    this.upldFleEnble = true;
    if (this.firstFormGroup.value.custInfo.prf_typ_id == 5) {
      this.OthersTxt = true;
    }
    else {
      this.OthersTxt = false;
    }
  }
  get customerInfo() {
    return this.firstFormGroup.controls.custInfo as FormGroup;
  }
  enableUpldBsn() {
    console.log("enableUpldBsn");
    console.log(this.firstFormGroup.value);
    this.upldFleBsnEnble = true;
    if (this.firstFormGroup.value.custInfo.bsn_prf_typ_id == 5) {
      this.OthersTxtBsn = true;
    }
    else {
      this.OthersTxtBsn = false;
    }
  }
  getStates() {
    console.log("On State Called")
    const rte = `admin/states`;
    this.crdSrvc.get(rte).subscribe((res) => {
      if (res['data'].length > 0) {
        this.ste_lst = res['data'];
        // if (this.cafDtls) {
        //   console.log("On State Set")
        //   this.firstFormGroup.get('instl_state').setValue(parseInt(this.cafDtls.blng_ste_id));
        //   this.firstFormGroup.get('blng_state').setValue(parseInt(this.cafDtls.blng_ste_id));
        // }

      }
    })
  }

  getDistricts(ste_id, add_typ) {
    console.log(this.usrdtls.user_id)
    if (this.usrdtls.user_id == 101004190 || this.usrdtls.prt_in == 2) {
      console.log(this.usrdtls.user_id + "if")
      this.rtedis = `admin/states/${ste_id}/districts`;
    }
    if (this.usrdtls.prt_in == 2) {
      console.log(this.usrdtls.user_id + "if")
      this.rtedis = `admin/states/${ste_id}/districts`;

    }
    else {
      console.log(this.usrdtls.user_id + "else")
      this.rtedis = `caf/agntdstrcts`
    }
    // const rte = `admin/states/${ste_id}/districts`;
    this.crdSrvc.get(this.rtedis).subscribe((res) => {
      console.log(res['data'])
      console.log(add_typ)
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
  getMandals(dst_id, add_typ) {
    this.distrct_id = dst_id
    console.log(this.usrdtls.user_id)
    if (this.usrdtls.user_id == 101004190 || this.usrdtls.prt_in == 2) {
      console.log(this.usrdtls.user_id + "if")
      this.rtemndl = `admin/districts/${dst_id}/mandals`;
    }
    else {
      console.log(this.usrdtls.user_id + "else")
      this.rtemndl = `caf/agntmndls/${dst_id}`
    }
    this.distrct_id = dst_id
    // const rte = `admin/districts/${dst_id}/mandals`;
    this.crdSrvc.get(this.rtemndl).subscribe((res) => {
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
    if (this.usrdtls.user_id == 101004190 || this.usrdtls.prt_in == 2) {
      console.log(this.usrdtls.user_id + "if")
      this.rtevlg = `user/getvlgs/${mndl_id}/${this.distrct_id}`;
    }
    else {
      console.log(this.usrdtls.user_id + "else")
      this.rtevlg = `caf/agntvlgs/${mndl_id}/${this.distrct_id}`
    }
    // const rte = `user/getvlgs/${mndl_id}/${this.firstFormGroup.value.instl_district}`;
    // const rte = `admin/mandals/${mndl_id}/villages`;
    this.crdSrvc.get(this.rtevlg).subscribe((res) => {
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
  getorg() {
    const rte = `caf/EntrpeCstmrTyp`;
    this.crdSrvc.get(rte).subscribe((res) => {
      this.org = res['data'];
      console.log(this.org)
    });
  }
  getBillingFrequency() {
    const rte = `crm/billingFrequency`;
    this.crdSrvc.get(rte).subscribe((res) => {
      this.blng_frqncy_lst = res['data'];
      console.log(this.blng_frqncy_lst)
    })
  }
  getsuborg() {
    const rte = `caf/EntCstmrSubTyp/` + this.firstFormGroup.value.custInfo.org_typ;
    this.crdSrvc.get(rte).subscribe((res) => {
      this.suborg = res['data'];
    });

  }
  BsnprocessFile(typ, imageInput) {
    console.log("in image upload");
    console.log(imageInput.target.files[0])
    const file: File = imageInput.target.files[0];
    const reader = new FileReader();

    reader.addEventListener('load', (event: any) => {
      console.log("sravani")
      this.selectedFile1 = new ImageSnippet(event.target.result, file);
    });

    reader.readAsDataURL(file);

  }
  processFile(typ, imageInput) {
    console.log("in image upload");
    console.log(imageInput.target.files[0])
    const file: File = imageInput.target.files[0];
    const reader = new FileReader();

    reader.addEventListener('load', (event: any) => {
      console.log("sravani")
      this.selectedFile = new ImageSnippet(event.target.result, file);
    });

    reader.readAsDataURL(file);
  }
  downloadPdf() {
    document.getElementById("contentToConvert").style.display = "block";

    // var data = document.getElementById('contentToConvert');
    // console.log(data);
    var str = "<h2 style='color:red'>hello world</h2>";
    var enc = window.btoa(str)
    let rte = 'caf/dwnloafPDf';
    let data ={
      stringToDecode :enc
    }
    this.crdSrvc.create(data,rte).subscribe((res) => {
     console.log(res)
    });

    document.getElementById("full").style.display = "none";
    // html2pdf(data, {
    //   margin: 1,
    //   filename: 'myfile.pdf',
    //   width: '310vh',
    //   height: '297vh',
    //   image: { type: 'png', quality: 1 },
    //   html2canvas: { scale: 3, letterRendering: true, useCORS: true },
    //   jsPDF: { orientation: 'portrait', unit: 'mm', format: [297,310], pagesplit: true },
    // })
  }
  



  download() {
    var data = document.getElementById('contentToConvert');
    var date = new Date();
    html2canvas(data).then(canvas => {
      var imgWidth = 210;
      var pageHeight = 295;
      var imgHeight = canvas.height * imgWidth / canvas.width;
      var heightLeft = imgHeight;

      //enter code here
      const imgData = canvas.toDataURL('image/png')

      var doc = new jspdf('p', 'mm', 'a4', 'true');
      var position = 0;

      doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        doc.addPage();
        doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }
      doc.save('Visiometria_' + 1 + '_' + date.getTime() + '.pdf')

    });

  }

}
