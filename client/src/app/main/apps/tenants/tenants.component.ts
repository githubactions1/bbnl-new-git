import { Component, OnInit, ViewChild, ElementRef, ChangeDetectorRef, HostListener } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition, MatSnackBar, MatDialog } from '@angular/material';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray } from '@angular/forms';
// import { FuseSidebarService } from '@fuse/components/sidebar/sidebar.service';
import { DsSidebarService } from '@glits/components/sidebar/sidebar.service';
import { CrudService } from 'app/main/apps/crud.service';
import { DatePipe } from '@angular/common';
import { DeleteDialogComponent } from 'app/main/shared/components/delete-dialog/delete-dialog.component';
import { MatAccordion } from '@angular/material/expansion';
import DataSource from 'devextreme/data/data_source';
import { Router, ActivatedRoute } from '@angular/router';
import { bool } from 'aws-sdk/clients/signer';
import { Location } from '@angular/common';
import { MessageDialogComponent } from 'app/main/shared/components/message-dialog/message-dialog.component';
import { TransfereService } from 'app/providers/transfer/transfer.service';

@Component({
  selector: 'app-tenants',
  templateUrl: './tenants.component.html',
  styleUrls: ['./tenants.component.scss']
})
export class TenantsComponent implements OnInit {
  confirmMsgDialogRef: MatDialogRef<MessageDialogComponent>;
  confirmonboardDialogRef: MatDialogRef<MessageDialogComponent>;
  confirmDialogRef: MatDialogRef<DeleteDialogComponent>;
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  agntFormGroup: FormGroup;
  frm_type;
  showFiller = false;
  showTble = true;
  showStepr = false;
  showAddBtn = true;
  loader: boolean = false;
  leftsidebarHdng;
  statesLst;
  dstrctsLst;
  ste_id;
  dstrct_id;
  mndlLst: any;
  mndl_id;
  vlge_lst;
  agntCtgryLst;
  bnkacntType;
  IdprfDcmnts = [];
  addrprfDcmnts = [];
  rowData;
  columnDefs;
  getRowHeight;
  moreClicked = false;
  disabled = false;
  moreData;
  editClicked = false;
  editData;
  dstrt_id;
  mandlLst: any;
  vilge_lst;
  btnNm;
  deleteClicked = false;
  delData;
  tenantcode = true;
  // deletebtn: boolean;
  isChecked: boolean;
  @ViewChild('fileInput') el: ElementRef;
  agntcd;
  selectedAgntTyp: any;
  slctdAgntType: any;
  productsDataSource: DataSource;
  searchModeOption = 'contains';
  searchExprOption: any = 'Name';
  searchTimeoutOption = 200;
  minSearchLengthOption = 0;
  showDataBeforeSearchOption = false;
  sb_stn_lst;
  slctdSbStns = [];
  slctdPrvSbStns = [];
  srvng_cbl_type_lst;
  srvng_ast_type_lst;
  imageUrl: string | ArrayBuffer;
  agntIdPrfImageUrl: string | ArrayBuffer;
  editFile: boolean;
  removeUpload: boolean;
  agntAdrsPrfImageUrl: string | ArrayBuffer;
  agntLnsePrfImageUrl: string | ArrayBuffer;
  agntDocTyps: any;
  dta: any;
  agent_id: any;
  updBtnDisable = false;
  selectedofceSte: any;
  selectedofceDsrt: any;
  selectedofceMndl: any;
  selectedBrnchSte: any;
  selectedBrnchDsrt: any;
  selectedBrnchMndl: any;
  district_id: any;
  shwPermMsg;
  permissions;
  @HostListener('window:popstate', ['$event'])
  getHeaderDtls = function (): any { return { 'title': 'Tenant Details', 'icon': 'people_outline' }; };
  usr_rle_id: number;


  constructor(private _fuseSidebarService: DsSidebarService, public fb: FormBuilder, public crdsrv: CrudService, public datePipe: DatePipe,
    private _snackBar: MatSnackBar, public dialog: MatDialog, private cd: ChangeDetectorRef, private route: ActivatedRoute, private router: Router,
    private _location: Location, public transfereService: TransfereService) { 
	      this.shwPermMsg = 'You do not have permissions to do this operation. Please contact Administrator to get permissions.';
		  }


  sndTnt(data): any {
    // console.log(data);
    if (data) {
      if (data.key === 'new') {
        this.getTntDtls('new', null, null);
      } else if (data.key === 'edit' || data.key === 'view') {
        // console.log(data.key);
        if (data.key === 'view') {
          this.updBtnDisable = true;
        } else {
          this.updBtnDisable = false;
        }
        this.dta = data;
        // console.log(data)
        if (data.enrl_ind == 1) {
          const rte = `agent/agents/` + data.value;
          this.crdsrv.get(rte).subscribe((res) => {
            if (res['status'] === 200) {
              // console.log(res['data']);
              const tntDtls = res['data'];
              // // console.log(tntDtls.agnt_info[0].agnt_id);
              this.agent_id = tntDtls.agnt_info[0].agnt_id;
              this.getTntDtls('edit', tntDtls, 1);
            }
          });
        } else {
          const rte = `agent/agents/` + data.value;
          // // console.log(rte);
          this.crdsrv.get(rte).subscribe((res) => {
            if (res['status'] === 200) {
              // console.log(res['data']);
              const tntDtls = res['data'];
              this.agent_id = tntDtls.agnt_info[0].agnt_id;
              this.getTntDtls('edit', tntDtls, null);
            }
          });
        }
      } else if (data.usr_ctgry_ky != null) {
        const rte = `agent/agents/` + data.usr_ctgry_ky;
        // // console.log(rte);
        this.crdsrv.get(rte).subscribe((res) => {
          if (res['status'] === 200) {
            // console.log(res['data']);
            const tntDtls = res['data'];
            // // console.log(tntDtls.agnt_info[0].agnt_id);
            this.agent_id = tntDtls.agnt_info[0].agnt_id;
            this.getTntDtls('edit', tntDtls, 3);
          }
        });
      }
    } else {
      this.getTntDtls('new', null, null);
    }
  }
  ngOnInit(): any {

    this.route.queryParams.subscribe(params => {

      // const p = params;

      // console.log(p);

      const p = this.transfereService.getLoclData("data");

      const lcStrgeData = JSON.parse(localStorage.getItem('usrDtls'));
      // console.log(lcStrgeData);

      if (p.key === 'edit' || p.key === 'view') {
        if (localStorage.getItem('tnt')) {
          localStorage.removeItem('tnt');
        }
        localStorage.setItem('tnt', JSON.stringify(p));
        // console.log('tnt');
        // console.log(p);
        this.sndTnt(p);
      } else if (lcStrgeData.usr_ctgry_ky != null) {
        // console.log('LMO');
        this.sndTnt(lcStrgeData);
      }
      else {
        const lcStgeTnt = localStorage.getItem('tnt');
        this.sndTnt(JSON.parse(lcStgeTnt));
      }
      return;
    });

    // this.getAgentLst();
    const emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
    const phoneNumber = /^(\+\d{1,3}[- ]?)?\d{10}$/;
    const gstNumber = /^([0]{1}[1-9]{1}|[1-2]{1}[0-9]{1}|[3]{1}[0-7]{1})([a-zA-Z]{5}[0-9]{4}[a-zA-Z]{1}[1-9a-zA-Z]{1}[zZ]{1}[0-9a-zA-Z]{1})+$/;
    const adharnumber = /^\d{12}$/;
    const pannumber = /^([a-zA-Z]{5}[0-9]{4}[a-zA-Z]{1})+$/;
    this.agntFormGroup = this.fb.group({
      agnt_Typ: new FormControl({ value: '', disabled: true }, Validators.required),
      agnt_Cd: new FormControl({ value: '', disabled: true }, Validators.required),
      enrlmnt_Nu: new FormControl({ value: '', disabled: true }, Validators.required),
      agnt_nm: new FormControl('', Validators.required),
      // lastName: new FormControl('', Validators.required),
      adhr_Nu: new FormControl('', Validators.pattern(adharnumber)),
      pan_Nu: new FormControl('', Validators.pattern(pannumber)),
      tan_Nu: new FormControl(''),
      tan_nu: new FormControl(''),
      gst_Nu: new FormControl('', Validators.pattern(gstNumber)),
      pstl_reg_Nu: new FormControl(''),
      pstl_exp_dt: new FormControl(''),
      lnse_Nu: new FormControl(''),
      lnse_rg: new FormControl(''),
      srvng_areas: this.fb.array([this.fb.group({
        srving_ara_id: '', ara_nm: '', cbl_type: '', rng_cbl_lngth: '', srv_ara_state: '', srv_ara_dstrt: '', srv_ara_mndl: '',
        srv_ara_vlge: '', sbsc_ct: '', cnct_ct: '', dgtl_cnct_ct: '', anlg_cnct_ct: ''
      })]),
      srvng_asts: this.fb.array([this.fb.group({
        srvng_ast_id: '', arv_ast_cbl_type: '', ast_type: '', rte_nm: '', snt_trns_tm: '', ime_nu: '',
        vrsn_nu: ''
      })]),
      sb_stns: this.fb.array([this.fb.group({ sb_stn: '', sb_stn_dst: '', sbstn_agnt_id: '' })]),
      officeAddress: this.fb.group({
        ofce_cntct_Nm: new FormControl('', Validators.required),
        ofce_mble_Nu: new FormControl('', Validators.pattern(phoneNumber)),
        ofce_email: new FormControl('', Validators.pattern(emailPattern)),
        ofce_address1: new FormControl('', Validators.required),
        ofce_address2: new FormControl(''),
        ofce_lcty_nm: new FormControl(''),
        ofce_ara_nm: new FormControl(''),
        ofce_City: new FormControl(''),
        ofce_State: new FormControl(''),
        ofce_Dstrt: new FormControl('', Validators.required),
        ofce_Mndl: new FormControl('', Validators.required),
        ofce_Vlge: new FormControl('', Validators.required),
        ofce_pn_cd: new FormControl('', Validators.required),
        ofce_lndline_cd: new FormControl(''),
        ofce_lndline: new FormControl('')
      }),
      branchAddress: this.fb.group({
        brnch_cntct_Nm: new FormControl(''),
        brnch_mble_Nu: new FormControl('', Validators.pattern(phoneNumber)),
        brnch_email: new FormControl('', Validators.pattern(emailPattern)),
        brnch_address1: new FormControl(''),
        brnch_address2: new FormControl(''),
        brnch_lcty_nm: new FormControl(''),
        brnch_ara_nm: new FormControl(''),
        brnch_City: new FormControl(''),
        brnch_State: new FormControl(''),
        brnch_Dstrt: new FormControl(''),
        brnch_Mndl: new FormControl(''),
        brnch_Vlge: new FormControl(''),
        brnch_pn_cd: new FormControl(''),
        brnch_lndline_cd: new FormControl(''),
        brnch_lndline: new FormControl(''),
        brnch_chk_ind: new FormControl('')
      }),
      id_Nu: new FormControl(''),
      id_dcmn: new FormControl(''),
      // Id_dcmn_txt: new FormControl('', Validators.required),
      adrs_Nu: new FormControl(''),
      adrs_dcmn: new FormControl(''),
      // adrs_dcmn_txt:new FormControl('', Validators.required),
      acnt_Nu: new FormControl(''),
      ifsc_cd: new FormControl(''),
      accnt_typ: new FormControl(''),
      brnch: new FormControl(''),
      bnk_nm: new FormControl(''),

    });
    if (this.agntFormGroup.value.sb_stns) {
      this.addSbStns();
    }

    this.getagntCtgry();
    this.getAssetsTypes();
    this.getCableTypes();
    this.getSubstations();
    this.getDstrct(0);
    this.onValueChanges();
  }

  onToolbarPreparing(e): any {
    // //// console.log(e);
    e.toolbarOptions.items.unshift({
      location: 'after',
      widget: 'dxButton',
      options: {
        icon: 'plus',
        text: 'Add New Tenant',
        onClick: this.getTntDtls.bind(this, 'addFormPanel', 'new', null),
        // this.onCellClick( this.selectedUsers),
        bindingOptions: {
          'disabled': 'isEmailButtonDisabled'
        }
      }
    });
  }

  get srvngAreas(): any {
    return this.agntFormGroup.get('srvng_areas') as FormArray;
  }

  addSrvngAreas(): any {
    this.srvngAreas.push(this.fb.group({
      ara_nm: '', cbl_type: '', rng_cbl_lngth: '', srv_ara_state: '', srv_ara_dstrt: '', srv_ara_mndl: '', srv_ara_vlge: '',
      sbsc_ct: '', cnct_ct: '', dgtl_cnct_ct: '', anlg_cnct_ct: ''
    }));
  }

  deleteSrvngAreas(index): any {
    this.srvngAreas.removeAt(index);
  }

  get srvngAsts(): any {
    return this.agntFormGroup.get('srvng_asts') as FormArray;
  }

  addSrvngAsts(): any {
    this.srvngAsts.push(this.fb.group({ srvng_ast_id: '', arv_ast_cbl_type: '', ast_type: '', rte_nm: '', snt_trns_tm: '', ime_nu: '', vrsn_nu: '' }));
  }

  deleteSrvngAsts(index): any {
    this.srvngAsts.removeAt(index);
  }

  get sbStns(): any {
    return this.agntFormGroup.get('sb_stns') as FormArray;
  }
  addSbStns(): any {
    this.sbStns.push(this.fb.group({ sb_stn: '', sb_stn_dst: '', sbstn_agnt_id: '' }));
  }

  onValueChanges(): void {
    this.agntFormGroup.get('officeAddress').valueChanges.subscribe(val => {
      if (this.isChecked) {
        // this.agntFormGroup.get('branchAddress').setValue(this.agntFormGroup.get('officeAddress').value);
        this.agntFormGroup.get('branchAddress').get('brnch_cntct_Nm').setValue(this.agntFormGroup.get('officeAddress').get('ofce_cntct_Nm').value);
        this.agntFormGroup.get('branchAddress').get('brnch_mble_Nu').setValue(this.agntFormGroup.get('officeAddress').get('ofce_mble_Nu').value);
        this.agntFormGroup.get('branchAddress').get('brnch_email').setValue(this.agntFormGroup.get('officeAddress').get('ofce_email').value);
        this.agntFormGroup.get('branchAddress').get('brnch_address').setValue(this.agntFormGroup.get('officeAddress').get('ofce_address').value);
        this.agntFormGroup.get('branchAddress').get('brnch_ara_nm').setValue(this.agntFormGroup.get('officeAddress').get('ofce_ara_nm').value);
        this.agntFormGroup.get('branchAddress').get('brnch_City').setValue(this.agntFormGroup.get('officeAddress').get('ofce_City').value);
        this.agntFormGroup.get('branchAddress').get('brnch_State').setValue(this.agntFormGroup.get('officeAddress').get('ofce_State').value);
        this.agntFormGroup.get('branchAddress').get('brnch_Dstrt').setValue(this.agntFormGroup.get('officeAddress').get('ofce_Dstrt').value);
        this.agntFormGroup.get('branchAddress').get('brnch_Mndl').setValue(this.agntFormGroup.get('officeAddress').get('ofce_Mndl').value);
        this.agntFormGroup.get('branchAddress').get('brnch_Vlge').setValue(this.agntFormGroup.get('officeAddress').get('ofce_Vlge').value);
        this.agntFormGroup.get('branchAddress').get('brnch_pn_cd').setValue(this.agntFormGroup.get('officeAddress').get('ofce_pn_cd').value);
        this.agntFormGroup.get('branchAddress').get('brnch_lndline').setValue(this.agntFormGroup.get('officeAddress').get('ofce_lndline').value);
      }
    });
  }
  tbleStpr(frm_type): any {
    this.frm_type = frm_type;
    if (this.frm_type === 'new') {
      this.agntFormGroup.reset();
      // this.rolenm.reset();
      this.showTble = false;
      this.showStepr = true;
      this.showAddBtn = false;
      // this.showBckBtn = true;
    }
  }
  bckBtn(): any {
    this.showAddBtn = true;
    // this.showBckBtn = false;
    this.showStepr = false;
    this.showTble = true;
    // this.getusrDetails();
  }

  //   onAgntTypChnge() {
  //     //// console.log(this.selectedAgntTyp);
  //     for (let i = 0; i < this.agntCtgryLst.length; i++) {
  //       if (this.selectedAgntTyp == this.agntCtgryLst[i].prtnr_id){
  //         this.slctdAgntType = this.agntCtgryLst[i].prtnr_nm;
  //       }
  //     }
  //   }

  getTntDtls(value, p, actn): any {
    console.log(p.agnt_srvars)
    const agnt_srv_ara =p.agnt_srvars
    if (value === 'edit') {
      // tslint:disable-next-line:triple-equals
      if (actn == 3) {
        this.btnNm = '';
      } else {
        // tslint:disable-next-line:triple-equals
        if (this.dta.enrl_ind == 1) {
          this.btnNm = 'Onboard';
          this.tenantcode = false;
        } else {
          this.btnNm = 'Update';
        }
      }
      // console.log(p);
      // console.log(value);
      // return;

      if (actn === 1) {
        this.tenantcode = false;
      } else {
        this.tenantcode = true;
      }

      // console.log(p);
      // return;
      let fnlAgntDtls = {};
      p['srvng_areas'] = [];
      p['srvng_asts'] = [];
      p['sb_stns'] = [];
      p['agntPrfDtls'] = [];

      for (let i = 0; i < this.agntFormGroup.value.srvng_areas.length; i++) {
        if (this.agntFormGroup.value.srvng_areas[i].ara_nm !== '') {
          p['srvng_areas'].push(this.agntFormGroup.value.srvng_areas[i]);
        }
      }

      for (let j = 0; j < this.agntFormGroup.value.srvng_asts.length; j++) {
        if (this.agntFormGroup.value.srvng_asts[j].arv_ast_cbl_type !== '') {
          p['srvng_asts'].push(this.agntFormGroup.value.srvng_asts[j]);
        }
      }

      for (let k = 0; k < this.agntFormGroup.value.sb_stns.length; k++) {
        // console.log(this.agntFormGroup.value.sb_stns[k].sb_stn);
        if (this.agntFormGroup.value.sb_stns[k].sb_stn != null || this.agntFormGroup.value.sb_stns[k].sb_stn != ' ' || this.agntFormGroup.value.sb_stns[k].sb_stn != '""') {
          p['sb_stns'].push(this.agntFormGroup.value.sb_stns[k]);
        }
      }

      const agnt_info_dtls = p.agnt_info[0];
      let agnt_srv_ara_dts = p['srvng_areas'];
      const agnt_srvasrts = p['srvng_asts'];
      const agnt_sbstns = p['sb_stns'];
      const agnt_dcmnts = p.agnt_Dcmnts;
      const agnt_bnk_dtls = p.agnt_Bnk[0];

      // console.log(agnt_info_dtls);
      // console.log(agnt_srvasrts);
      // console.log(agnt_sbstns);
      // console.log(agnt_dcmnts);
      // return;

      this.getstates();
      this.getDstrct(p.agnt_info[0].ofce_ste_id);

      if (p.agnt_info[0].brnch_ste_id != null || p.agnt_info[0].brnch_ste_id != 0) {
        this.getDstrct(p.agnt_info[0].brnch_ste_id);
      }

      this.getMndl(p.agnt_info[0].ofce_dstrt_id);

      if (p.agnt_info[0].brnch_dstrt_id != null || p.agnt_info[0].brnch_dstrt_id != 0) {
        this.getMndl(p.agnt_info[0].brnch_dstrt_id);
      }

      this.getvillages(p.agnt_info[0].ofce_mndl_id);

      if (p.agnt_info[0].brnch_dstrt_id != null || p.agnt_info[0].brnch_dstrt_id != 0 && p.agnt_info[0].brnch_mndl_id != null
        || p.agnt_info[0].brnch_mndl_id != 0) {

        if (p.agnt_info[0].brnch_dstrt_id != 0 && p.agnt_info[0].brnch_mndl_id != 0) {
          console.log(p.agnt_info[0].brnch_dstrt_id);
          this.getvillages(p.agnt_info[0].brnch_mndl_id);
        }
      }


      // this.getDcmntsLst();
      // this.getBnkAcntType();
      // this.getagntCtgry();

      //   this.leftsidebarHdng = 'Edit Tenant';
      this.editClicked = true;
      this.editData = p;
      if (p.brnch_chk_in === 1) {
        this.agntFormGroup.get('branchAddress.brnch_chk_ind').setValue(true);
      }
      else {
        this.agntFormGroup.get('branchAddress.brnch_chk_ind').setValue(false);
      }

      this.agntFormGroup.get('agnt_Typ').setValue(agnt_info_dtls.agnt_ctgry_id);
      this.agntFormGroup.get('agnt_Cd').setValue(agnt_info_dtls.agnt_cd);
      this.agntFormGroup.get('enrlmnt_Nu').setValue(agnt_info_dtls.enrlt_nu);
      this.agntFormGroup.get('agnt_nm').setValue(agnt_info_dtls.agnt_nm);
      // this.agntFormGroup.get('lastName').setValue(agnt_info_dtls.lst_nm);
      this.agntFormGroup.get('adhr_Nu').setValue(agnt_info_dtls.full_adhr_nu);
      this.agntFormGroup.get('pan_Nu').setValue(agnt_info_dtls.pan_nu);
      this.agntFormGroup.get('tan_Nu').setValue(agnt_info_dtls.tan_nu);
      this.agntFormGroup.get('tan_nu').setValue(agnt_info_dtls.tan_nu);
      this.agntFormGroup.get('gst_Nu').setValue(agnt_info_dtls.gst_nu);
      this.agntFormGroup.get('pstl_reg_Nu').setValue(agnt_info_dtls.pstl_rgstn_nu);
      this.agntFormGroup.get('pstl_exp_dt').setValue(agnt_info_dtls.pstl_exprn_dt);
      this.agntFormGroup.get('officeAddress.ofce_cntct_Nm').setValue(agnt_info_dtls.ofce_cntct_nm);
      this.agntFormGroup.get('officeAddress.ofce_mble_Nu').setValue(agnt_info_dtls.ofce_mbl_nu);
      this.agntFormGroup.get('officeAddress.ofce_email').setValue(agnt_info_dtls.ofce_eml_tx);
      this.agntFormGroup.get('officeAddress.ofce_address1').setValue(agnt_info_dtls.ofce_addr1_tx);
      this.agntFormGroup.get('officeAddress.ofce_address2').setValue(agnt_info_dtls.ofce_addr2_tx);
      this.agntFormGroup.get('officeAddress.ofce_lcty_nm').setValue(agnt_info_dtls.ofce_lclty_nm);
      this.agntFormGroup.get('officeAddress.ofce_ara_nm').setValue(agnt_info_dtls.ofce_ara_nm);
      this.agntFormGroup.get('officeAddress.ofce_City').setValue(agnt_info_dtls.ofce_cty_nm);
      this.agntFormGroup.get('officeAddress.ofce_State').setValue(agnt_info_dtls.ofce_ste_id);
      this.agntFormGroup.get('officeAddress.ofce_Dstrt').setValue(agnt_info_dtls.ofce_dstrt_id);
      this.agntFormGroup.get('officeAddress.ofce_Mndl').setValue(agnt_info_dtls.ofce_mndl_id);
      this.agntFormGroup.get('officeAddress.ofce_Vlge').setValue(agnt_info_dtls.ofce_vlge_id);
      this.agntFormGroup.get('officeAddress.ofce_pn_cd').setValue(agnt_info_dtls.ofce_pn_cd);
      this.agntFormGroup.get('officeAddress.ofce_lndline_cd').setValue(agnt_info_dtls.ofce_std_cd);
      this.agntFormGroup.get('officeAddress.ofce_lndline').setValue(agnt_info_dtls.ofce_lndle_nu);
      this.agntFormGroup.get('branchAddress.brnch_cntct_Nm').setValue(agnt_info_dtls.brnch_cntct_nm);
      this.agntFormGroup.get('branchAddress.brnch_mble_Nu').setValue(agnt_info_dtls.brnch_mbl_nu);
      this.agntFormGroup.get('branchAddress.brnch_email').setValue(agnt_info_dtls.brnch_eml_tx);
      this.agntFormGroup.get('branchAddress.brnch_address1').setValue(agnt_info_dtls.brnch_addr1_tx);
      this.agntFormGroup.get('branchAddress.brnch_address2').setValue(agnt_info_dtls.brnch_addr2_tx);
      this.agntFormGroup.get('branchAddress.brnch_lcty_nm').setValue(agnt_info_dtls.brnch_lclty_nm);
      this.agntFormGroup.get('branchAddress.brnch_ara_nm').setValue(agnt_info_dtls.brnch_ara_nm);
      this.agntFormGroup.get('branchAddress.brnch_City').setValue(agnt_info_dtls.brnch_cty_nm);
      this.agntFormGroup.get('branchAddress.brnch_State').setValue(agnt_info_dtls.brnch_ste_id);
      this.agntFormGroup.get('branchAddress.brnch_Dstrt').setValue(agnt_info_dtls.brnch_dstrt_id);
      this.agntFormGroup.get('branchAddress.brnch_Mndl').setValue(agnt_info_dtls.brnch_mndl_id);
      this.agntFormGroup.get('branchAddress.brnch_Vlge').setValue(agnt_info_dtls.brnch_vlge_id);
      this.agntFormGroup.get('branchAddress.brnch_pn_cd').setValue(agnt_info_dtls.brnch_pn_cd);
      this.agntFormGroup.get('branchAddress.brnch_lndline').setValue(agnt_info_dtls.brnch_lndne_nu);
      this.agntFormGroup.get('branchAddress.brnch_lndline_cd').setValue(agnt_info_dtls.brnch_std_cd);
      // this.agntFormGroup.get('id_Nu').setValue(p.id_prf_nu);
      // this.agntFormGroup.get('id_dcmn').setValue(p.id_dcmns_typ_id);
      // this.agntFormGroup.get('id_dcmn_txt').setValue(p.id_atcht_pth_tx);
      // this.agntFormGroup.get('adrs_Nu').setValue(p.addrs_prf_nu);
      // this.agntFormGroup.get('adrs_dcmn').setValue(p.addrs_dcmns_typ_id);
      // this.agntFormGroup.get('adrs_dcmn_txt').setValue(p.addrs_atcht_pth_tx);
      // this.agntFormGroup.get('adrs_Nu').setValue(p.addrs_prf_nu);
      // this.agntFormGroup.get('adrs_dcmn').setValue(p.addrs_dcmns_typ_id);
      // this.agntFormGroup.get('adrs_dcmn_txt').setValue(p.addrs_atcht_pth_tx);
      if (agnt_bnk_dtls !== undefined) {
        this.getBnkAcntType();
        this.agntFormGroup.get('acnt_Nu').setValue(agnt_bnk_dtls.bnk_acnt_nu);
        this.agntFormGroup.get('ifsc_cd').setValue(agnt_bnk_dtls.ifsc_cd);
        // this.agntFormGroup.get('accnt_typ').setValue(agnt_bnk_dtls.bnk_acnt_typ_id);
        this.agntFormGroup.get('brnch').setValue(agnt_bnk_dtls.brnch_nm);
        this.agntFormGroup.get('bnk_nm').setValue(agnt_bnk_dtls.bnk_nm);
        if (agnt_bnk_dtls.svngs_in === 1) {
          this.agntFormGroup.get('accnt_typ').setValue(1);
        } else {
          this.agntFormGroup.get('accnt_typ').setValue(2);
        }
      } else {
        this.getDcmntsLst();
        this.getBnkAcntType();
        this.getagntCtgry();
        this.agntFormGroup.get('acnt_Nu').setValue('');
        this.agntFormGroup.get('ifsc_cd').setValue('');
        this.agntFormGroup.get('accnt_typ').setValue('');
        this.agntFormGroup.get('brnch').setValue('');
        this.agntFormGroup.get('bnk_nm').setValue('');
      }

      //   srving_ara_nm	cble_type_id	cble_lngth_ct	dstrct_id	dstrt_nm	mndl_id	mndl_nm	vlge_id	vlge_nm	sbscbr_ct	cnctn_ct	dgtl_cntn_ct	anlge_cntn_ct
// this.get_agntsrvng_lst(agnt_id)

      if (agnt_srv_ara_dts.length !== 0) {
        // agnt_srv_ara_dts =agnt_srv_ara
        const srvArasLst = [];
        for (let i = 0; i < agnt_srv_ara_dts.length; i++) {
          this.getMndl(agnt_srv_ara_dts[i].dstrct_id);
          this.getvillages(agnt_srv_ara_dts[i].mndl_id);
          srvArasLst.push({
            srving_ara_id: agnt_srv_ara_dts[i].srving_ara_id,
            ara_nm: agnt_srv_ara_dts[i].srving_ara_nm,
            cbl_type: agnt_srv_ara_dts[i].cble_type_id,
            rng_cbl_lngth: agnt_srv_ara_dts[i].cble_lngth_ct,
            srv_ara_state: 1,
            srv_ara_dstrt: agnt_srv_ara_dts[i].dstrct_id,
            srv_ara_mndl: agnt_srv_ara_dts[i].mndl_id,
            srv_ara_vlge: agnt_srv_ara_dts[i].vlge_id,
            sbsc_ct: agnt_srv_ara_dts[i].sbscbr_ct,
            cnct_ct: agnt_srv_ara_dts[i].cnctn_ct,
            dgtl_cnct_ct: agnt_srv_ara_dts[i].dgtl_cntn_ct,
            anlg_cnct_ct: agnt_srv_ara_dts[i].anlge_cntn_ct
          });
        }
        console.log(srvArasLst);
        this.agntFormGroup.get('srvng_areas').patchValue(srvArasLst);
      }
      else{
        agnt_srv_ara_dts = agnt_srv_ara
        const srvArasLst = [];
        for (let i = 0; i < agnt_srv_ara_dts.length; i++) {
          this.getMndl(agnt_srv_ara_dts[i].dstrct_id);
          this.getvillages(agnt_srv_ara_dts[i].mndl_id);
          srvArasLst.push({
            srving_ara_id: agnt_srv_ara_dts[i].srving_ara_id,
            ara_nm: agnt_srv_ara_dts[i].srving_ara_nm,
            cbl_type: agnt_srv_ara_dts[i].cble_type_id,
            rng_cbl_lngth: agnt_srv_ara_dts[i].cble_lngth_ct,
            srv_ara_state: 1,
            srv_ara_dstrt: agnt_srv_ara_dts[i].dstrct_id,
            srv_ara_mndl: agnt_srv_ara_dts[i].mndl_id,
            srv_ara_vlge: agnt_srv_ara_dts[i].vlge_id,
            sbsc_ct: agnt_srv_ara_dts[i].sbscbr_ct,
            cnct_ct: agnt_srv_ara_dts[i].cnctn_ct,
            dgtl_cnct_ct: agnt_srv_ara_dts[i].dgtl_cntn_ct,
            anlg_cnct_ct: agnt_srv_ara_dts[i].anlge_cntn_ct
          });
        }
        console.log(srvArasLst);
        this.agntFormGroup.get('srvng_areas').patchValue(srvArasLst);
      }

      if (agnt_srvasrts.length !== 0) {
        const srvAstsLst = [];
        for (let j = 0; j < agnt_srvasrts.length; j++) {
          srvAstsLst.push({
            srvng_ast_id: agnt_srvasrts[j].srvng_ast_id, arv_ast_cbl_type: agnt_srvasrts[j].cble_type_id, ast_type: agnt_srvasrts[j].asrt_id,
            rte_nm: agnt_srvasrts[j].rt_nm, snt_trns_tm: agnt_srvasrts[j].snd_trnse, ime_nu: agnt_srvasrts[j].imie_nu, vrsn_nu: agnt_srvasrts[j].vrsn_nu
          });
        }
        this.agntFormGroup.get('srvng_asts').patchValue(srvAstsLst);
      }

      this.getSubstations();
      if (agnt_sbstns.length !== 0) {
        const sbStnsLst = [];
        console.log(agnt_sbstns)
        for (let k = 0; k < agnt_sbstns.length; k++) {
          console.log(agnt_sbstns[k])
          sbStnsLst.push({ sb_stn: agnt_sbstns[k].sbstn_id, sb_stn_dst: agnt_sbstns[k].sbstn_dstnce_ct, sbstn_agnt_id: agnt_sbstns[k].sbstn_agnt_id });
        }
        this.agntFormGroup.get('sb_stns').patchValue(sbStnsLst);
      }

      if (agnt_dcmnts.length !== 0) {
        for (let k = 0; k < agnt_dcmnts.length; k++) {
          // console.log(agnt_dcmnts[k].dcmnt_ctgry_id);
          if (agnt_dcmnts[k].dcmnt_ctgry_id === 2) {
            this.agntFormGroup.get('id_Nu').setValue(agnt_dcmnts[k].dcmnt_prf_nu);
            this.agntFormGroup.get('id_dcmn').setValue(agnt_dcmnts[k].dcmnt_type_id);
            // console.log('ID');
          }
          if (agnt_dcmnts[k].dcmnt_ctgry_id === 1) {
            this.agntFormGroup.get('adrs_Nu').setValue(agnt_dcmnts[k].dcmnt_prf_nu);
            this.agntFormGroup.get('adrs_dcmn').setValue(agnt_dcmnts[k].dcmnt_type_id);
            // console.log('ADDRESS');
          }
          if (agnt_dcmnts[k].dcmnt_ctgry_id === 3) {
            this.agntFormGroup.get('lnse_Nu').setValue(agnt_dcmnts[k].dcmnt_prf_nu);
            this.agntFormGroup.get('lnse_rg').setValue(agnt_dcmnts[k].dcmnt_rgn_id);
            // console.log('LICENCE');
          }
        }
      }

    }
    else {
      this.leftsidebarHdng = 'Add New Tenant';
      this.tenantcode = false;

      this.getstates();
      this.getDcmntsLst();
      this.getBnkAcntType();
      this.getagntCtgry();
      this.btnNm = 'SAVE';
      // this._fuseSidebarService.getSidebar(key).toggleOpen();
      this.agntFormGroup.get('agnt_Typ').setValue('');
      this.agntFormGroup.get('agnt_Cd').setValue('');
      this.agntFormGroup.get('enrlmnt_Nu').setValue('');
      this.agntFormGroup.get('agnt_nm').setValue('');
      // this.agntFormGroup.get('lastName').setValue('');
      this.agntFormGroup.get('adhr_Nu').setValue('');
      this.agntFormGroup.get('pan_Nu').setValue('');
      this.agntFormGroup.get('tan_Nu').setValue('');
      this.agntFormGroup.get('tan_nu').setValue('');
      this.agntFormGroup.get('gst_Nu').setValue('');
      this.agntFormGroup.get('pstl_reg_Nu').setValue('');
      this.agntFormGroup.get('pstl_exp_dt').setValue('');
      this.agntFormGroup.get('ofce_cntct_Nm').setValue('');
      this.agntFormGroup.get('ofce_mble_Nu').setValue('');
      this.agntFormGroup.get('ofce_email').setValue('');
      this.agntFormGroup.get('ofce_address').setValue('');
      this.agntFormGroup.get('ofce_ara_nm').setValue('');
      this.agntFormGroup.get('ofce_City').setValue('');
      this.agntFormGroup.get('ofce_State').setValue('');
      this.agntFormGroup.get('ofce_Dstrt').setValue('');
      this.agntFormGroup.get('ofce_Mndl').setValue('');
      this.agntFormGroup.get('ofce_Vlge').setValue('');
      this.agntFormGroup.get('ofce_pn_cd').setValue('');
      this.agntFormGroup.get('ofce_lndline').setValue('');
      this.agntFormGroup.get('brnch_cntct_Nm').setValue('');
      this.agntFormGroup.get('brnch_mble_Nu').setValue('');
      this.agntFormGroup.get('brnch_email').setValue('');
      this.agntFormGroup.get('brnch_address').setValue('');
      this.agntFormGroup.get('brnch_ara_nm').setValue('');
      this.agntFormGroup.get('brnch_City').setValue('');
      this.agntFormGroup.get('brnch_State').setValue('');
      this.agntFormGroup.get('brnch_Dstrt').setValue('');
      this.agntFormGroup.get('brnch_Mndl').setValue('');
      this.agntFormGroup.get('brnch_Vlge').setValue('');
      this.agntFormGroup.get('brnch_pn_cd').setValue('');
      this.agntFormGroup.get('brnch_lndline').setValue('');
      this.agntFormGroup.get('id_Nu').setValue('');
      this.agntFormGroup.get('id_dcmn').setValue('');
      this.agntFormGroup.get('adrs_Nu').setValue('');
      this.agntFormGroup.get('adrs_dcmn').setValue('');
      this.agntFormGroup.get('acnt_Nu').setValue('');
      this.agntFormGroup.get('ifsc_cd').setValue('');
      this.agntFormGroup.get('accnt_typ').setValue('');
      this.agntFormGroup.get('brnch').setValue('');
      this.agntFormGroup.get('bnk_nm').setValue('');

      this.editClicked = false;
      // this.deletebtn = false;
    }
  }

  getagntCtgry(): any {
    // this.agntCtgryLst = [];
    const rte = `agent/agntctgry`;
    this.crdsrv.get(rte).subscribe((res) => {
      if (res['status'] === 200) {
        this.agntCtgryLst = res['data'];
        // //// console.log(this.agntCtgryLst);
        const lcStrgeData = JSON.parse(localStorage.getItem('tnt'));
        for (let i = 0; i < this.agntCtgryLst.length; i++) {
          if (lcStrgeData.parameter === (this.agntCtgryLst[i].prtnr_nm).toLowerCase()) {
            this.agntFormGroup.get('agnt_Typ').setValue(this.agntCtgryLst[i].prtnr_id);
          }
        }
      }
    });
  }
  getBnkAcntType(): any {
    this.bnkacntType = [];
    const rte = `user/bnkAcntType`;
    this.crdsrv.get(rte).subscribe((res) => {
      if (res['status'] === 200) {
        this.bnkacntType = res['data'];
      }
    });
  }
  getDcmntsLst(): any {
    const rte = `agent/document/types`;

    this.IdprfDcmnts = [];
    this.addrprfDcmnts = [];
    this.crdsrv.get(rte).subscribe((res) => {
      this.agntDocTyps = res['data'];
      // if (res['data'].length > 0) {
      //   for (var i = 0; i < res['data'].length; i++) {
      //     if (res['data'][i].stnd_dcmns_ctgry_id == 1) {
      //       this.IdprfDcmnts.push(res['data'][i])
      //     }

      //     else if (res['data'][i].stnd_dcmns_ctgry_id == 4) {
      //       this.addrprfDcmnts.push(res['data'][i])
      //     }
      //   }
      //   this.productsDataSource = new DataSource({
      //     store: {
      //         data: this.addrprfDcmnts,
      //         type: 'array',
      //         key: 'ID'
      //     }
      // });
      // }
    });
  }
  getstates(): any {
    this.statesLst = [];
    const rte = `user/getstates`;
    this.crdsrv.get(rte).subscribe((res) => {
      if (res['status'] === 200) {
        this.statesLst = res['data'];
      }
    });
  }
  getDstrct(ste_id): any {
    this.dstrctsLst = [];
    const rte = `user/getDstrcts/${ste_id}`;
    this.crdsrv.get(rte).subscribe((res) => {
      if (res['status'] === 200) {
        this.dstrctsLst = res['data'];
      }
    });
  }
  getMndl(dstrt_id): any {
    this.district_id = dstrt_id;
    const rte = `user/getMndls/${dstrt_id}`;
    this.crdsrv.get(rte).subscribe((res) => {
      if (res['status'] === 200) {
        this.mndlLst = res['data'];
      }
    });
  }
  getvillages(mndl_id): any {
    console.log(this.district_id);
    console.log(mndl_id);
    const rte = `user/getvlgs/${mndl_id}/${this.district_id}`;
    this.crdsrv.get(rte).subscribe((res) => {
      this.vlge_lst = res['data'];
    });

    // if (data.length == 1) {
    //   if (data[0].id == 1) {
    //     this.vlge_lst = [];
    //     this.mndl_id = this.agntFormGroup.get('officeAddress.ofce_Mndl').value
    //     const rte = `user/getvlgs/${this.mndl_id}`;
    //     this.crdsrv.get(rte).subscribe((res) => {
    //       //// console.log(res['data']);
    //       this.vlge_lst = res['data'];
    //     })

    //   }
    //   else if (data[0].id == 2) {
    //     this.vilge_lst = [];
    //     this.mndl_id = this.agntFormGroup.get('branchAddress.brnch_Mndl').value
    //     const rte = `user/getvlgs/${this.mndl_id}`;
    //     this.crdsrv.get(rte).subscribe((res) => {
    //       //// console.log(res['data']);
    //       this.vilge_lst = res['data'];
    //     })

    //   }
    // }
    // if (data.length > 1) {
    //   if (data[0].id == 1) {
    //     this.vlge_lst = [];
    //     this.mndl_id = this.agntFormGroup.get('officeAddress.ofce_Mndl').value
    //     const rte = `user/getvlgs/${this.mndl_id}`;
    //     this.crdsrv.get(rte).subscribe((res) => {
    //       //// console.log(res['data']);
    //       this.vlge_lst = res['data'];
    //     })

    //   }
    //   if (data[1].id == 2) {
    //     this.vilge_lst = [];
    //     this.mndl_id = this.agntFormGroup.get('branchAddress.brnch_Mndl').value
    //     const rte = `user/getvlgs/${this.mndl_id}`;
    //     this.crdsrv.get(rte).subscribe((res) => {
    //       //// console.log(res['data']);
    //       this.vilge_lst = res['data'];
    //     })

    //   }
    // }
  }
  // getSubstations(): any {
  //   const rte = `admin/subStn`;
  //   this.crdsrv.get(rte).subscribe((res) => {
  //     // // console.log(res['data']);
  //     this.sb_stn_lst = res['data'];
  //   });
  // }
  getSubstations(): any {
    const postData = {
      dstrct_id: this.agntFormGroup.value.officeAddress.ofce_Dstrt,
      mndl_id: this.agntFormGroup.value.officeAddress.ofce_Mndl
    };
    let sbStnLst = [];
    console.log(this.agntFormGroup.value);
    const rte = `admin/subStn/search`;
    this.crdsrv.create(postData, rte).subscribe((res) => {
      console.log(res['data']);
      for (let p = 0; p < res['data'].length; p++) {
        sbStnLst.push({
          sbstn_id: res['data'][p].sbstn_id, sbstn_nm: res['data'][p].sbstn_nm, sbstn_unq_cd: res['data'][p].sbstn_unq_cd,
          sbstn_type_id: res['data'][p].sbstn_type_id, dstrct_id: res['data'][p].dstrct_id, mndl_id: res['data'][p].mndl_id,
          agnt_vlge_id: this.agntFormGroup.value.officeAddress.ofce_Vlge,
          sbstn_nm_cd: res['data'][p].sbstn_nm + ' (' + res['data'][p].sbstn_unq_cd + ')'
        });
      }
      this.sb_stn_lst = sbStnLst;
    });
  }
  getCableTypes(): any {
    const rte = `package/srvngcbltyplst`;
    this.crdsrv.get(rte).subscribe((res) => {
      this.srvng_cbl_type_lst = res['data'];
    });
  }
  getAssetsTypes(): any {
    const rte = `package/Srvngasrtlst`;
    this.crdsrv.get(rte).subscribe((res) => {
      this.srvng_ast_type_lst = res['data'];
    });
  }

  uploadFile(id, event): any {
    const reader = new FileReader(); // HTML5 FileReader API
    const file = event.target.files[0];
    if (event.target.files && event.target.files[0]) {
      reader.readAsDataURL(file);

      // When file uploads set it to file formcontrol
      reader.onload = () => {
        this.imageUrl = reader.result;
        if (id === 1) {
          this.agntIdPrfImageUrl = reader.result;
        } else if (id === 2) {
          this.agntAdrsPrfImageUrl = reader.result;
        } else if (id === 3) {
          this.agntLnsePrfImageUrl = reader.result;
        }
        this.agntIdPrfImageUrl = reader.result;
        this.agntFormGroup.patchValue({
          file: reader.result
        });
        this.editFile = false;
        this.removeUpload = true;
      };
      // ChangeDetectorRef since file is loading outside the zone
      this.cd.markForCheck();
    }
  }

  removeUploadedFile(): any {
    const newFileList = Array.from(this.el.nativeElement.files);
    // this.imageUrl = 'https://i.pinimg.com/236x/d6/27/d9/d627d9cda385317de4812a4f7bd922e9--man--iron-man.jpg';
    // this.imageUrl = 'assets/images/avatars/profile.jpg';
    this.editFile = true;
    this.removeUpload = false;
    this.agntFormGroup.patchValue({
      file: [null]
    });
  }

  checkValue(e): any {
    if (e.checked === true) {
      // // console.log('true')
      this.mandlLst = this.mndlLst;
      this.vilge_lst = this.vlge_lst;
      const data = this.agntFormGroup.value.officeAddress;
      this.agntFormGroup.get('branchAddress.brnch_cntct_Nm').setValue(data.ofce_cntct_Nm);
      this.agntFormGroup.get('branchAddress.brnch_mble_Nu').setValue(data.ofce_mble_Nu);
      this.agntFormGroup.get('branchAddress.brnch_email').setValue(data.ofce_email);
      this.agntFormGroup.get('branchAddress.brnch_address1').setValue(data.ofce_address1);
      this.agntFormGroup.get('branchAddress.brnch_address2').setValue(data.ofce_address2);
      this.agntFormGroup.get('branchAddress.brnch_lcty_nm').setValue(data.ofce_lcty_nm);
      this.agntFormGroup.get('branchAddress.brnch_ara_nm').setValue(data.ofce_ara_nm);
      this.agntFormGroup.get('branchAddress.brnch_City').setValue(data.ofce_City);
      this.agntFormGroup.get('branchAddress.brnch_State').setValue(data.ofce_State);
      this.agntFormGroup.get('branchAddress.brnch_Dstrt').setValue(data.ofce_Dstrt);
      this.agntFormGroup.get('branchAddress.brnch_Mndl').setValue(data.ofce_Mndl);
      this.agntFormGroup.get('branchAddress.brnch_Vlge').setValue(data.ofce_Vlge);
      this.agntFormGroup.get('branchAddress.brnch_pn_cd').setValue(data.ofce_pn_cd);
      this.agntFormGroup.get('branchAddress.brnch_lndline_cd').setValue(data.ofce_lndline_cd);
      this.agntFormGroup.get('branchAddress.brnch_lndline').setValue(data.ofce_lndline);
    }
    else {
      // console.log('false');
      this.agntFormGroup.get('branchAddress.brnch_cntct_Nm').setValue('');
      this.agntFormGroup.get('branchAddress.brnch_mble_Nu').setValue('');
      this.agntFormGroup.get('branchAddress.brnch_email').setValue('');
      this.agntFormGroup.get('branchAddress.brnch_address1').setValue('');
      this.agntFormGroup.get('branchAddress.brnch_address2').setValue('');
      this.agntFormGroup.get('branchAddress.brnch_lcty_nm').setValue('');
      this.agntFormGroup.get('branchAddress.brnch_ara_nm').setValue('');
      this.agntFormGroup.get('branchAddress.brnch_City').setValue('');
      this.agntFormGroup.get('branchAddress.brnch_State').setValue('');
      this.agntFormGroup.get('branchAddress.brnch_Dstrt').setValue('');
      this.agntFormGroup.get('branchAddress.brnch_Mndl').setValue('');
      this.agntFormGroup.get('branchAddress.brnch_Vlge').setValue('');
      this.agntFormGroup.get('branchAddress.brnch_pn_cd').setValue('');
      this.agntFormGroup.get('branchAddress.brnch_lndline_cd').setValue('');
      this.agntFormGroup.get('branchAddress.brnch_lndline').setValue('');
    }
  }
  onValueChanged(event) {

    this.slctdSbStns.push(event.value);
    this.slctdPrvSbStns.push(event.previousValue);
  }
  saveAgent(): any {

    if (this.editClicked == true) {
      this.loader = true;
      // console.log(this.editData.agnt_id);
      this.agntFormGroup.value.pstl_exp_dt = this.datePipe.transform(this.agntFormGroup.value.pstl_exp_dt, 'yyyy-MM-dd');
      // tslint:disable-next-line:prefer-const
      let editeddata = this.agntFormGroup.value;
      // console.log(editeddata);
      // console.log(this.dta);
      // // console.log(this.agntFormGroup.getRawValue().enrlmnt_Nu)
      // tslint:disable-next-line:triple-equals
      if (this.dta.enrl_ind == 1) {
        editeddata.agnt_Cd = this.dta.parameter + this.agntFormGroup.getRawValue().enrlmnt_Nu;
        editeddata.onbrd_in = 1;
        if (this.dta.parameter === 'LMO') {
          editeddata.usr_ctgry = 8;
        } else if (this.dta.parameter === 'MSO') {
          editeddata.usr_ctgry = 7;
        }
      } else {
        // console.log('outside if');
        // console.log(editeddata.agnt_Cd);
      }
      let data;
      // console.log(this.agent_id);
      editeddata.agent_id = this.agent_id;
      // console.log(editeddata);
      // tslint:disable-next-line:triple-equals
      if (editeddata.onbrd_in == 1) {
        data = {
          title: 'Are you sure you want to onboard',
          msg: this.dta.parameter + '-' + editeddata.agnt_nm,
          icon: 'account_circle',
          btnLst: [{
            label: 'Ok',
            res: 'ok'
          }, {
            label: 'Cancel',
            res: 'cancel'
          }]
        };

        let fnlAgntDtls = {};
        fnlAgntDtls['srvng_areas'] = [];
        fnlAgntDtls['srvng_asts'] = [];
        fnlAgntDtls['sb_stns'] = [];
        fnlAgntDtls['agntPrfDtls'] = [];

        for (let i = 0; i < this.agntFormGroup.value.srvng_areas.length; i++) {
          console.log(this.agntFormGroup.value.srvng_areas[i].ara_nm)
          if (this.agntFormGroup.value.srvng_areas[i].ara_nm != '') {
            fnlAgntDtls['srvng_areas'].push(this.agntFormGroup.value.srvng_areas[i]);
          }
          console.log(fnlAgntDtls['srvng_areas'])
        }

        for (let j = 0; j < this.agntFormGroup.value.srvng_asts.length; j++) {
          console.log(this.agntFormGroup.value.srvng_asts[j].arv_ast_cbl_type)
          if (this.agntFormGroup.value.srvng_asts[j].arv_ast_cbl_type != '') {
            fnlAgntDtls['srvng_asts'].push(this.agntFormGroup.value.srvng_asts[j]);
          }
        }

        for (let k = 0; k < this.agntFormGroup.value.sb_stns.length; k++) {
          // console.log(this.agntFormGroup.value.sb_stns[k].sb_stn);
          if (this.agntFormGroup.value.sb_stns[k].sb_stn != null || this.agntFormGroup.value.sb_stns[k].sb_stn != ' ' || this.agntFormGroup.value.sb_stns[k].sb_stn != '""') {
            fnlAgntDtls['sb_stns'].push(this.agntFormGroup.value.sb_stns[k]);
          }
        }

        editeddata['srvng_areas'] = fnlAgntDtls['srvng_areas'];
        editeddata['srvng_asts'] = fnlAgntDtls['srvng_asts'];
        editeddata['sb_stns'] = fnlAgntDtls['sb_stns'];


        this.confirmonboardDialogRef = this.dialog.open(MessageDialogComponent, {
          width: '25%',
          panelClass: 'my-class',
          data: data
        });
        this.confirmonboardDialogRef.afterClosed().subscribe((response) => {
          if (response) {
            // tslint:disable-next-line:triple-equals
            if (response == 'ok') {

              editeddata['initial_onbrd'] = true;
              console.log(editeddata);
              // return;
              const rte = `agent/update/agent/${this.agent_id}`;
              this.crdsrv.create(editeddata, rte).subscribe((res) => {
                // tslint:disable-next-line:triple-equals
                console.log(res)
                if (res['status'] == 200) {
                  // if (res['data'].insertedId) {

                  this._snackBar.open('Sucessfully updated', '', {
                    duration: 2000,
                    horizontalPosition: this.horizontalPosition,
                    verticalPosition: this.verticalPosition,
                  });
                  // }
                  // return;
                  // tslint:disable-next-line:triple-equals
                  if (editeddata.onbrd_in == 1) {
                    const rte1 = `user/add/user`;
                    const rte2 = `agent/add/user/rle/premissions`;
                    // tslint:disable-next-line:no-shadowed-variable
                    let data;
                    this.crdsrv.create(editeddata, rte1).subscribe((usrres1) => {

                      if (usrres1['status'] == 200) {
                        // console.log(usrres1);
                        usrres1['data'].rle_id = 11;
                        // console.log(usrres1);

                        this.crdsrv.create(usrres1['data'], rte2).subscribe((res1) => {

                          if (res1['status'] == 200) {
                            // console.log(res1);
                            this.loader = false;
                            this._snackBar.open('User Created Successfully', '', {
                              duration: 2000,
                              horizontalPosition: this.horizontalPosition,
                              verticalPosition: this.verticalPosition,
                            });
                            this.router.navigate(['admin/tenant/enrolments']);
                          }
                        });


                      }

                      // console.log(res1);
                      // tslint:disable-next-line:triple-equals
                      // if (res1['status'] == 200) {
                      //   if (res1['data'].insertId) {
                      //     // console.log(res['data']);
                      //     data = {
                      //       title: 'Tenant Successfully Created',
                      //       msg: 'Login credentials send to respective Mail:' + editeddata.officeAddress.ofce_email,
                      //       icon: 'account_circle',
                      //       btnLst: [{
                      //         label: 'Ok',
                      //         res: 'ok'
                      //       }]
                      //     };
                      //   } else {
                      //     data = {
                      //       title: '',
                      //       msg: res['data'],
                      //       icon: 'account_circle',
                      //       btnLst: [{
                      //         label: 'Ok',
                      //         res: 'ok'
                      //       }]
                      //     };
                      //   }
                      //   this.confirmMsgDialogRef = this.dialog.open(MessageDialogComponent, {
                      //     width: '25%',
                      //     panelClass: 'my-class',
                      //     data: data
                      //   });
                      //   this.confirmMsgDialogRef.afterClosed().subscribe((response1) => {
                      //     if (response1) {
                      //       // tslint:disable-next-line:triple-equals
                      //       if (response1 == 'ok') {
                      //         // this.goBack();
                      //         // this.router.navigate(['admin/tenant/enrolments']);
                      //         this._location.back();
                      //         this.updBtnDisable = true;
                      //       } else {
                      //         this._location.back();
                      //       }
                      //     }
                      //   });
                      // }
                    });
                    // } else {
                    //   this.router.navigate(['admin/tenant/enrolments']);
                    // }

                    // console.log('Onboard');
                  } else {
                    // console.log('editdata');
                    // this.goBack();
                    // this.getAgentLst();
                    // tslint:disable-next-line:no-unused-expression
                  } (error) => {
                    // console.log(error);
                  };
                  // this.goBack();
                  // this.getAgentLst();
                  //   this.getTntDtls('addFormPanel', null);
                }
              }, (error) => {
                // console.log(error);
              });
            } else {
              // this._location.back();
            }
          }
        });
      } else {
        console.log(editeddata)
        let fnlAgntDtls = {};
        fnlAgntDtls['srvng_areas'] = [];
        fnlAgntDtls['srvng_asts'] = [];
        fnlAgntDtls['sb_stns'] = [];
        fnlAgntDtls['agntPrfDtls'] = [];

        for (let i = 0; i < this.agntFormGroup.value.srvng_areas.length; i++) {
          console.log(this.agntFormGroup.value.srvng_areas[i].ara_nm)
          if (this.agntFormGroup.value.srvng_areas[i].ara_nm != '') {
            fnlAgntDtls['srvng_areas'].push(this.agntFormGroup.value.srvng_areas[i]);
          }
          console.log(fnlAgntDtls['srvng_areas'])
        }

        for (let j = 0; j < this.agntFormGroup.value.srvng_asts.length; j++) {
          console.log(this.agntFormGroup.value.srvng_asts[j].arv_ast_cbl_type)
          if (this.agntFormGroup.value.srvng_asts[j].arv_ast_cbl_type != '') {
            fnlAgntDtls['srvng_asts'].push(this.agntFormGroup.value.srvng_asts[j]);
          }
        }

        for (let k = 0; k < this.agntFormGroup.value.sb_stns.length; k++) {
          console.log(this.agntFormGroup.value.sb_stns[k].sb_stn_dst);
          if (this.agntFormGroup.value.sb_stns[k].sb_stn != null || this.agntFormGroup.value.sb_stns[k].sb_stn != ' ' || this.agntFormGroup.value.sb_stns[k].sb_stn != '""') {
            if (this.agntFormGroup.value.sb_stns[k].sb_stn_dst != undefined) {
              fnlAgntDtls['sb_stns'].push(this.agntFormGroup.value.sb_stns[k]);
            }
            // fnlAgntDtls['sb_stns'][k].sbstn_agnt_id =this.agent_id;
          }
        }
        console.log(fnlAgntDtls['sb_stns']);

        editeddata['srvng_areas'] = fnlAgntDtls['srvng_areas'];
        editeddata['srvng_asts'] = fnlAgntDtls['srvng_asts'];
        editeddata['sb_stns'] = fnlAgntDtls['sb_stns'];
        console.log(this.agent_id)
        console.log(editeddata)
        console.log(editeddata['sb_stns'])
        // return;
        const rte = `agent/update/agent/${this.agent_id}`;
        this.crdsrv.create(editeddata, rte).subscribe((res) => {
          // tslint:disable-next-line:triple-equals
          if (res['status'] == 200) {
            // if (res['data'].insertedId) {
            this._snackBar.open('Sucessfully Updated', '', {
              duration: 2000,
              horizontalPosition: this.horizontalPosition,
              verticalPosition: this.verticalPosition,
            });
            if (this.dta.parameter == 'lmo') {
              this.router.navigate(['admin/tenant/lmo']);
            } else if (this.dta.parameter == 'mso') {
              this.router.navigate(['admin/tenant/mso']);
            }
          }
        });
      }
    }
    else {

      this.agntFormGroup.value.pstl_exp_dt = this.datePipe.transform(this.agntFormGroup.value.pstl_exp_dt, 'yyyy-MM-dd');
      const agntData = {
        agntInfo: {
          agnt_Typ: this.agntFormGroup.value.agnt_Typ,
          agnt_Cd: this.agntFormGroup.value.agnt_Cd,
          enrlmnt_Nu: this.agntFormGroup.value.enrlmnt_Nu,
          agnt_nm: this.agntFormGroup.value.agnt_nm,
          // lastName: this.agntFormGroup.value.lastName,
          adhr_Nu: this.agntFormGroup.value.adhr_Nu,
          pan_Nu: this.agntFormGroup.value.pan_Nu,
          tan_Nu: this.agntFormGroup.value.tan_Nu,
          tan_nu: this.agntFormGroup.value.tan_nu,
          gst_Nu: this.agntFormGroup.value.gst_Nu,
          pstl_reg_Nu: this.agntFormGroup.value.pstl_reg_Nu,
          pstl_exp_dt: this.agntFormGroup.value.pstl_exp_dt
        },
        agntIdPrfDtls: {
          id_Nu: this.agntFormGroup.value.id_Nu,
          id_dcmn: this.agntFormGroup.value.id_dcmn,
          id_doc_img: this.agntIdPrfImageUrl,
          doc_ctgry: 2
        },
        agntAdrsPrfDtls: {
          adrs_Nu: this.agntFormGroup.value.adrs_Nu,
          adrs_dcmn: this.agntFormGroup.value.adrs_dcmn,
          adrs_doc_img: this.agntAdrsPrfImageUrl,
          doc_ctgry: 1
        },
        agntLnsePrfDtls: {
          lnse_Nu: this.agntFormGroup.value.lnse_Nu,
          lnse_rg: '',
          lnse_doc_img: this.agntLnsePrfImageUrl,
          doc_ctgry: 3
        },
        agntBnkDtls: {
          acnt_Nu: this.agntFormGroup.value.acnt_Nu,
          ifsc_cd: this.agntFormGroup.value.ifsc_cd,
          accnt_typ: this.agntFormGroup.value.accnt_typ,
          brnch: this.agntFormGroup.value.brnch,
          bnk_nm: this.agntFormGroup.value.bnk_nm
        },
        srvng_areas: this.agntFormGroup.value.srvng_areas,
        srvng_asts: this.agntFormGroup.value.srvng_asts,
        sb_stns: this.agntFormGroup.value.sb_stns,
        officeAddress: this.agntFormGroup.value.officeAddress,
        branchAddress: this.agntFormGroup.value.branchAddress
      };

      // tslint:disable-next-line:prefer-const
      let fnlAgntDtls = {};
      fnlAgntDtls['srvng_areas'] = [];
      fnlAgntDtls['srvng_asts'] = [];
      fnlAgntDtls['sb_stns'] = [];

      for (let i = 0; i < this.agntFormGroup.value.srvng_areas.length; i++) {
        // tslint:disable-next-line:triple-equals
        if (this.agntFormGroup.value.srvng_areas[i].ara_nm != '') {
          fnlAgntDtls['srvng_areas'].push(this.agntFormGroup.value.srvng_areas[i]);
        }
      }

      for (let j = 0; j < this.agntFormGroup.value.srvng_asts.length; j++) {
        // tslint:disable-next-line:triple-equals
        if (this.agntFormGroup.value.srvng_asts[j].arv_ast_cbl_type != '') {
          fnlAgntDtls['srvng_asts'].push(this.agntFormGroup.value.srvng_asts[j]);
        }
      }
      for (let k = 0; k < this.agntFormGroup.value.sb_stns.length; k++) {
        // tslint:disable-next-line:triple-equals
        if (this.agntFormGroup.value.sb_stns[k].sb_stn != '') {
          fnlAgntDtls['sb_stns'].push(this.agntFormGroup.value.sb_stns[k]);
        }
      }
      // tslint:disable-next-line:triple-equals
      if (this.agntFormGroup.value.officeAddress.ofce_cntct_Nm == '') {
        this._snackBar.open('Please fill office details', '', {
          duration: 2000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
      } else {
        fnlAgntDtls['officeAddress'] = agntData.officeAddress;

      }

      if (this.agntFormGroup.value.branchAddress.ofce_cntct_Nm == '') {
        this._snackBar.open('Please fill Branch details', '', {
          duration: 2000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
      } else {
        fnlAgntDtls['branchAddress'] = agntData.branchAddress;
      }
      // tslint:disable-next-line:triple-equals
      if (this.agntFormGroup.value.acnt_Nu != '') {
        fnlAgntDtls['agntBnkDtls'] = agntData.agntBnkDtls;
      }
      // tslint:disable-next-line:triple-equals
      if (this.agntFormGroup.value.lnse_Nu != '') {
        fnlAgntDtls['agntLnsePrfDtls'] = agntData.agntLnsePrfDtls;
      }
      // tslint:disable-next-line:triple-equals
      if (this.agntFormGroup.value.adrs_Nu != '') {
        fnlAgntDtls['agntAdrsPrfDtls'] = agntData.agntAdrsPrfDtls;
      }
      // tslint:disable-next-line:triple-equals
      if (this.agntFormGroup.value.id_Nu != '') {
        fnlAgntDtls['agntIdPrfDtls'] = agntData.agntIdPrfDtls;
      }
      // tslint:disable-next-line:triple-equals
      if (this.agntFormGroup.value.agnt_Typ != '') {
        fnlAgntDtls['agntInfo'] = agntData.agntInfo;
      }
      this.loader = true;
      const rte = `agent/agent`;
      this.crdsrv.create(fnlAgntDtls, rte).subscribe((res) => {
        if (res['status'] == 200) {
          this.loader = false;
          this._snackBar.open('Sucessfully Added', '', {
            duration: 2000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
          });
        }
      });
    }
  }
  getAgentLst(): any {
    const rte = `agent/getAgents`;
    this.crdsrv.get(rte).subscribe((res) => {
      // tslint:disable-next-line:triple-equals
      if (res['status'] == 200) {
        // console.log(res['data']);
        this.rowData = res['data'];
        this.columnDefs = [
          { headerName: 'Sno', field: 's_no', textAlign: 'center', cellClass: 'pm-grid-number-cell', width: 265 },
          { headerName: 'Agent Name', field: 'NAME', cellStyle: 'left', cellClass: 'pm-grid-number-cell', width: 265 },
          { headerName: 'Agent Code', field: 'agnt_cd', 'text-align': 'center', cellClass: 'pm-grid-number-cell', width: 265 },
          { headerName: 'Agent Category', field: 'prtnr_nm', cellStyle: { 'text-align': 'center' }, cellClass: 'pm-grid-number-cell', width: 265 },
          { headerName: 'Enrollmnet No', field: 'enrlmnt_nu', cellStyle: { 'text-align': 'center' }, cellClass: 'pm-grid-number-cell', width: 265 },
          { headerName: 'Aadhar No', field: 'adhr_nu', cellStyle: { 'text-align': 'center' }, cellClass: 'pm-grid-number-cell', width: 265 },
          { headerName: 'Pan No', field: 'pan_nu', cellStyle: { 'text-align': 'center' }, cellClass: 'pm-grid-number-cell', width: 265 },
          { headerName: 'Tan No', field: 'tan_nu', cellStyle: { 'text-align': 'center' }, cellClass: 'pm-grid-number-cell', width: 265 },
          { headerName: 'Tin No', field: 'tan_nu', cellStyle: { 'text-align': 'center' }, cellClass: 'pm-grid-number-cell', width: 265 },
          { headerName: 'Gst No', field: 'gst_nu', cellStyle: { 'text-align': 'center' }, cellClass: 'pm-grid-number-cell', width: 265 },
          { headerName: 'Postal Registration No', field: 'pstl_reg_nu', cellStyle: { 'text-align': 'center' }, cellClass: 'pm-grid-number-cell', width: 265 },
          { headerName: 'Postal Expiration Date', field: 'date', cellStyle: { 'text-align': 'center' }, cellClass: 'pm-grid-number-cell', width: 265 },
        ];
      }
    });
  }
  onCellClick(event): any {
    // tslint:disable-next-line:triple-equals
    if (event.cellElement.innerText == 'Edit') {
      this.editEntry(event.data);
      const data = [{
        'id': 1,
        'mndl': event.ofce_mndl_id

      }, {
        'id': 2,
        'mndl': event.brnch_mndl_id,
      }];

      const data1 = [{
        'id': 1,
        'vlg': event.ofce_vlge_id

      }, {
        'id': 2,
        'vlg': event.brnch_vlge_id,
      }];
      this.getstates();
      this.getMndl(data);
      // this.getvillages(data1);
    }
    // tslint:disable-next-line:triple-equals
    if (event.cellElement.innerText == 'Delete') {
      this.deleteEntry(event.data);
      const data = [{
        'id': 1,
        'mndl': event.ofce_mndl_id

      }, {
        'id': 2,
        'mndl': event.brnch_mndl_id,
      }];

      const data1 = [{
        'id': 1,
        'vlg': event.ofce_vlge_id

      }, {
        'id': 2,
        'vlg': event.brnch_vlge_id,
      }];
      this.getstates();
      this.getMndl(data);
      // this.getvillages(data1);
    }
  }
  // moreDetails(data){
  //   //// console.log(data)
  //   this.moreClicked=true;
  //   this.disabled=true;
  //   this.moreData=data;
  //   let name='addFormPanel';
  //   this.getTntDtls(name,'more',this.moreData)
  // }
  editEntry(data): any {
    this.editClicked = true;
    this.editData = data;
    const name = 'addFormPanel';
    this.getTntDtls('edit', this.editData, null);
  }
  deleteEntry(data): any {
    this.deleteClicked = true;
    this.delData = data;
    const name = 'addFormPanel';
    this.getTntDtls('delete', this.delData, null);
  }
  deleteAgent(): any {
    this.delete(this.delData);
  }
  delete(data): any {

    this.confirmDialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '25%',
      panelClass: 'my-class',
      data: { message: 'Are you sure deleting this item ?', id: data.agnt_id, nm: data.NAME, entityname: 'Agent', flag: false, rte: `agent/delete/agent/${data.agnt_id}` }
    });

    this.confirmDialogRef.afterClosed().subscribe((response) => {
      // tslint:disable-next-line:triple-equals
      if (response == undefined) { }
      // tslint:disable-next-line:triple-equals
      else if (response.status == 200) { this.getAgentLst(); this.getTntDtls('addFormPanel', null, null); }
    });
  }

  goBack(): any {
    // this.agntFormGroup.reset();
    // this._location.back();

    // console.log(this.dta.parameter);
    if (this.dta.parameter == 'lmo') {
      this.router.navigate(['admin/tenant/lmo']);
    } else if (this.dta.parameter == 'mso') {
      this.router.navigate(['admin/tenant/mso']);
    } else {
      this.router.navigate(['admin/tenant/enrolments']);
    }

    // const lcStrgeData = JSON.parse(localStorage.getItem('tnt'));
    // // console.log(this.dta);
  }
}
