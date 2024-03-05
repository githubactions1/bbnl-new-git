import { Component, OnInit, ViewChild, ElementRef, ChangeDetectorRef, HostListener } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition, MatSnackBar, MatDialog } from '@angular/material';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray } from '@angular/forms';
// import { FuseSidebarService } from '@fuse/components/sidebar/sidebar.service';
import { DsSidebarService } from '@glits/components/sidebar/sidebar.service';
import { CrudService } from 'app/main/apps/crud.service';
import { DatePipe } from '@angular/common';
import { MatAccordion } from '@angular/material/expansion';
import DataSource from 'devextreme/data/data_source';
import { Router, ActivatedRoute } from '@angular/router';
import { debounceTime, tap, switchMap, finalize } from 'rxjs/operators';
import { TenantEnrollmentOtpDialogComponent } from '../tenant-enrollment-otp-dialog/tenant-enrollment-otp-dialog.component';
import { Location } from '@angular/common';
import { DsConfigService } from '@glits/services/config.service';
import { MessageDialogComponent } from 'app/main/shared/components/message-dialog/message-dialog.component';


@Component({
  selector: 'app-lmo-enrollment',
  templateUrl: './lmo-enrollment.component.html',
  styleUrls: ['./lmo-enrollment.component.scss']
})
export class LmoEnrollmentComponent implements OnInit {
  confirmDialogRef: MatDialogRef<TenantEnrollmentOtpDialogComponent>;
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  agntFormGroup: FormGroup;
  agntDtlsFormGroup: FormGroup;
  frm_type;
  showFiller = false;
  showTble = true;
  showStepr = false;
  showAddBtn = true;
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
  // editClicked: boolean = false;
  editData;
  dstrt_id;
  mandlLst: any;
  vilge_lst;
  btnNm;
  deleteClicked = false;
  delData;
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
  filteredAgents: any;
  errorMsg: string;
  isLoading: boolean;

  public routerLinkVariable = '/admin';

  selectedofceSte: any;
  selectedofceDsrt: any;
  selectedofceMndl: any;
  selectedBrnchSte: any;
  selectedBrnchDsrt: any;
  selectedBrnchMndl: any;
  dst_lst: any;
  brnch_dstrct_lst: any;
  mnd_lst: any;
  brnch_mndlLst: any;
  selfRegPndg: boolean;
  srchdagntDtls: any;
  vlgLst: any;
  brnch_vlge_lst: any;
  shwLdr: boolean;
  @HostListener('window:popstate', ['$event'])
  confirmMsgDialogRef: MatDialogRef<MessageDialogComponent>;
  getHeaderDtls = function (): any { return { 'title': 'Tenant Details', 'icon': 'people_outline' }; };
  disrct_id: any;
   sbmtBtnDsble: boolean;
  formDtls: any;
  shwRegMsg: any;
  


  constructor(private _fuseSidebarService: DsSidebarService, public fb: FormBuilder, public crdsrv: CrudService, public datePipe: DatePipe,
    private _snackBar: MatSnackBar, public dialog: MatDialog, private cd: ChangeDetectorRef, private router: ActivatedRoute, private route: Router,
    private _dsConfigService: DsConfigService,
    private location: Location) { }


  // sndTnt(data) {
  //   if (data) {
  //     if (data.key == 'new') {
  //       this.getTntDtls('new', null);
  //     } else {
  //       let rte = `agent/agents/` + data.value;
  //       this.crdsrv.get(rte).subscribe((res) => {
  //         if (res['status'] == 200) {
  //           
  //           const tntDtls = res['data'];
  //           this.getTntDtls('edit', tntDtls);
  //         }
  //       });
  //     }
  //   } else {
  //     this.getTntDtls('new', null);
  //   }
  // }
  ngOnInit(): any {

    // let url = 'admin/enrollment/lmo';
    // this.location.replaceState(url);

    // this.router.queryParams.subscribe(params => {

    //   const p = params;

    //   if (p.key == 'new' || p.key == 'edit') {
    //     if (localStorage.getItem('tnt')) {
    //       localStorage.removeItem('tnt');
    //     }
    //     localStorage.setItem('tnt', JSON.stringify(p));
    //     this.sndTnt(p);
    //   } else {
    //     let lcStgeTnt = localStorage.getItem('tnt');
    //     this.sndTnt(JSON.parse(lcStgeTnt));
    //   }



    //   //  if (p.key == 'new'){
    //   //   this.getTntDtls('new', null);
    //   //   localStorage.setItem('tnt', JSON.stringify(p));
    //   //  } else {
    //   //      let tnt_id;
    //   //      if (p.value) {
    //   //         // JSON.stringify(p)
    //   //         localStorage.setItem('tnt', {key: p.key, value: p.value});
    //   //         tnt_id = p.value;
    //   //      } else {
    //   //         tnt_id = localStorage.getItem('tnt');
    //   //      }
    //   //    let rte = `agent/agents/` + tnt_id;
    //   //   this.crdsrv.get(rte).subscribe((res) => {
    //   //     if (res['status'] == 200) {
    //   //       
    //   //       const tntDtls = res['data'][0];

    //   //       this.getTntDtls('edit', tntDtls);
    //   //     }
    //   //   });
    //   //  }
    // });

    // this.getAgentLst();
    const emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
    const phoneNumber = /^(\+\d{1,3}[- ]?)?\d{10}$/;
    const gstNumber = /^([0]{1}[1-9]{1}|[1-2]{1}[0-9]{1}|[3]{1}[0-7]{1})([a-zA-Z]{5}[0-9]{4}[a-zA-Z]{1}[1-9a-zA-Z]{1}[zZ]{1}[0-9a-zA-Z]{1})+$/;
    const adharnumber = /^\d{12}$/;
    const pannumber = /^([a-zA-Z]{5}[0-9]{4}[a-zA-Z]{1})+$/;
    this.agntFormGroup = this.fb.group({
      // agnt_Typ: new FormControl('', Validators.required),
      // agnt_Cd: new FormControl('', Validators.required),
      // enrlmnt_Nu: new FormControl('', Validators.required),
      agnt_nm: new FormControl('', Validators.required),
      // lastName: new FormControl('', Validators.required),
      adhr_Nu: new FormControl('', Validators.pattern(adharnumber)),
      pan_Nu: new FormControl('', Validators.pattern(pannumber)),
      tan_Nu: new FormControl(''),
      tan_nu: new FormControl(''),
      gst_Nu: new FormControl('', Validators.pattern(gstNumber)),
      pstl_reg_Nu: new FormControl(''),
      pstl_exp_dt: new FormControl(''),
      lmoCode: new FormControl('', Validators.required),
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
      Id_dcmn_txt: new FormControl(''),
      adrs_Nu: new FormControl(''),
      adrs_dcmn: new FormControl(''),
      adrs_dcmn_txt: new FormControl(''),
      acnt_Nu: new FormControl(''),
      ifsc_cd: new FormControl(''),
      accnt_typ: new FormControl(''),
      brnch: new FormControl(''),
      bnk_nm: new FormControl(''),

    });
    this.agntDtlsFormGroup = this.fb.group({
      adhr_No: new FormControl('', Validators.required),
      mble_Nu: new FormControl('', Validators.required),
    });
    if (this.agntFormGroup.value.sb_stns) {
      this.addSbStns();
    }
    // this.getstates();
    this.getagntCtgry();
    this.getAssetsTypes();
    this.getCableTypes();
    // this.getSubstations();
    this.getDstrct(0, null);
    this.onValueChanges();

    this.agntFormGroup.get('lmoCode').valueChanges
      .pipe(
        debounceTime(500),
        tap(() => {
          this.errorMsg = '';
          this.filteredAgents = [];
          this.isLoading = true;
        }),
        switchMap((value) => {
          if (value.length >= 3) {
            return this.crdsrv.get('agent/getAgentBySearch/' + value)
              .pipe(
                finalize(() => {
                  this.isLoading = false;
                }),
              );
          }
        })
      )
      .subscribe(data => {
        if (data['data'] === undefined) {
          this.errorMsg = data['Error'];
          this.filteredAgents = [];
        } else {
          this.errorMsg = '';
          this.filteredAgents = data['data'];
        }
      });
      this.agntFormGroup.get('branchAddress').get('brnch_State').valueChanges.subscribe(value => {
        this.getDstrct(value, 1);
      });
      this.agntFormGroup.get('branchAddress').get('brnch_Dstrt').valueChanges.subscribe(value => {
        this.getMndl(value, 1);
      });
      this.agntFormGroup.get('branchAddress').get('brnch_Mndl').valueChanges.subscribe(value => {
        this.getvillages(value, 1);
      });
      this.agntFormGroup.get('officeAddress').get('ofce_State').valueChanges.subscribe(value => {
        this.getDstrct(value, 2);
      });
      this.agntFormGroup.get('officeAddress').get('ofce_Dstrt').valueChanges.subscribe(value => {
        this.getMndl(value, 2);
      });
      this.agntFormGroup.get('officeAddress').get('ofce_Mndl').valueChanges.subscribe(value => {
        this.getvillages(value, 2);
      });

      this._dsConfigService.config = {
        layout: {
            navbar: {
                hidden: true
            },
            toolbar: {
                hidden: true
            },
            footer: {
                hidden: true
            },
            sidepanel: {
                hidden: true
            }
        }
    };
    this.getstates();
    this.getTntDtls();

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
  //     for (let i = 0; i < this.agntCtgryLst.length; i++) {
  //       if (this.selectedAgntTyp == this.agntCtgryLst[i].prtnr_id){
  //         this.slctdAgntType = this.agntCtgryLst[i].prtnr_nm;
  //       }
  //     }
  //   }

  getTntDtls(): any {


    this.leftsidebarHdng = 'Add New Tenant';

    this.getstates();
    this.getDcmntsLst();
    this.getBnkAcntType();
    this.getagntCtgry();
    this.btnNm = 'SUBMIT';
    // this._fuseSidebarService.getSidebar(key).toggleOpen();
    // this.agntFormGroup.get('agnt_Typ').setValue('');
    // this.agntFormGroup.get('agnt_Cd').setValue('');
    // this.agntFormGroup.get('enrlmnt_Nu').setValue('');
    this.agntFormGroup.get('agnt_nm').setValue('');
    // this.agntFormGroup.get('lastName').setValue('');
    this.agntFormGroup.get('adhr_Nu').setValue('');
    this.agntFormGroup.get('pan_Nu').setValue('');
    this.agntFormGroup.get('tan_Nu').setValue('');
    this.agntFormGroup.get('tan_nu').setValue('');
    this.agntFormGroup.get('gst_Nu').setValue('');
    this.agntFormGroup.get('pstl_reg_Nu').setValue('');
    this.agntFormGroup.get('pstl_exp_dt').setValue('');
    this.agntFormGroup.get('lmoCode').setValue('');
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

    // this.editClicked = false;
    // this.deletebtn = false;

  }

  getagntCtgry(): any {
    // this.agntCtgryLst = [];
    const rte = `agent/agntctgry`;
    this.crdsrv.get(rte).subscribe((res) => {
      if (res['status'] === 200) {
        this.agntCtgryLst = res['data'];
        // let lcStrgeData = JSON.parse(localStorage.getItem('tnt'));
        // for (let i = 0; i < this.agntCtgryLst.length; i++){
        //   if (lcStrgeData.parameter == (this.agntCtgryLst[i].prtnr_nm).toLowerCase()){
        //     this.agntFormGroup.get('agnt_Typ').setValue(this.agntCtgryLst[i].prtnr_id);
        //   }
        // }
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
      //   if (this.editClicked == true) {
      //     this.ste_id = this.editData.ofce_ste_id;
      //     this.ste_id = this.editData.brnch_ste_id;
      //     this.getDstrct(this.ste_id);
      //   }
    });
  }
  getDstrct(ste_id, dst_in): any {
    // this.dstrctsLst = [];
    // this.ste_id = this.agntFormGroup.get('officeAddress.ofce_State').value;
    const rte = `user/getDstrcts/${ste_id}`;
    this.crdsrv.get(rte).subscribe((res) => {
      
      if (res['status'] === 200) {
        if (dst_in === 3) {
          this.dst_lst = res['data'];
        } else if (dst_in === 2) {
          this.dstrctsLst = res['data'];
        }else if (dst_in === 1) {
          this.brnch_dstrct_lst = res['data'];
        } else if (dst_in == null){
          this.dstrctsLst = res['data'];
        }
      }
      //   if (this.editClicked == true) {
      //     this.dstrt_id = this.editData.dstrt_id;
      //   }
    });
  }
  
  getMndl(dstrt_id, mndl_ind): any {
    this.disrct_id = dstrt_id;
    const rte = `user/getMndls/${dstrt_id}`;
    this.crdsrv.get(rte).subscribe((res) => {
      
      if (res['status'] === 200) {
        if (mndl_ind === 3) {
          this.mnd_lst = res['data'];
        } else if (mndl_ind === 2) {
          this.mndlLst = res['data'];
        } else if (mndl_ind === 1) {
          this.brnch_mndlLst = res['data'];
        }
      }
      //   if (this.editClicked == true) {
      //     this.dstrt_id = this.editData.dstrt_id;
      //   }
    });
  }
  getvillages(mndl_id, vlg_in): any {
    const rte = `user/getvlgs/${mndl_id}/${this.disrct_id}`;
    this.crdsrv.get(rte).subscribe((res) => {
      
      if (res['status'] === 200) {
        if (vlg_in === 3) {
          this.vlgLst = res['data'];
        } else if (vlg_in === 2) {
          this.vlge_lst = res['data'];
        } else if (vlg_in === 1) {
          this.brnch_vlge_lst = res['data'];
        }
        this.getSubstations();
      }
    });

    // if (data.length == 1) {
    //   if (data[0].id == 1) {
    //     this.vlge_lst = [];
    //     this.mndl_id = this.agntFormGroup.get('officeAddress.ofce_Mndl').value
    //     const rte = `user/getvlgs/${this.mndl_id}`;
    //     this.crdsrv.get(rte).subscribe((res) => {
    //       
    //       this.vlge_lst = res['data'];
    //     })

    //   }
    //   else if (data[0].id == 2) {
    //     this.vilge_lst = [];
    //     this.mndl_id = this.agntFormGroup.get('branchAddress.brnch_Mndl').value
    //     const rte = `user/getvlgs/${this.mndl_id}`;
    //     this.crdsrv.get(rte).subscribe((res) => {
    //       
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
    //       
    //       this.vlge_lst = res['data'];
    //     })

    //   }
    //   if (data[1].id == 2) {
    //     this.vilge_lst = [];
    //     this.mndl_id = this.agntFormGroup.get('branchAddress.brnch_Mndl').value
    //     const rte = `user/getvlgs/${this.mndl_id}`;
    //     this.crdsrv.get(rte).subscribe((res) => {
    //       
    //       this.vilge_lst = res['data'];
    //     })

    //   }
    // }
  }
  getSubstations(): any {
    const postData = {
      dstrct_id: this.agntFormGroup.value.officeAddress.ofce_Dstrt,
      mndl_id: this.agntFormGroup.value.officeAddress.ofce_Mndl
    };
    let sbStnLst = [];
    const rte = `admin/subStn/search`;
    this.crdsrv.create(postData, rte).subscribe((res) => {
      for (let p = 0; p < res['data'].length; p++){
        sbStnLst.push({sbstn_id: res['data'][p].sbstn_id, sbstn_nm: res['data'][p].sbstn_nm, sbstn_unq_cd: res['data'][p].sbstn_unq_cd,
        sbstn_type_id: res['data'][p].sbstn_type_id, dstrct_id: res['data'][p].dstrct_id, mndl_id: res['data'][p].mndl_id, 
        sbstn_nm_cd: res['data'][p].sbstn_nm + ' (' + res['data'][p].sbstn_unq_cd + ')'});
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
    if (file){
      this._snackBar.open('File Uploaded successfully', '', {
        duration: 2000,
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      });
    }
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
    // tslint:disable-next-line:prefer-const
    let newFileList = Array.from(this.el.nativeElement.files);
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
  onValueChanged(event): any {
    this.slctdSbStns.push(event.value);
    this.slctdPrvSbStns.push(event.previousValue);
  }
  saveAgent(): any {
    this.shwLdr = true;
    // this.agntcd = this.agntFormGroup.get('agnt_Cd').value;
    // let isagentfound = false;
    // for (let i = 0; i < this.rowData.length; i++) {
    //   if (this.agntcd == this.rowData[i].agnt_cd) {
    //     isagentfound = true;
    //   }
    // }
    // if (!isagentfound){
    this.agntFormGroup.value.pstl_exp_dt = this.datePipe.transform(this.agntFormGroup.value.pstl_exp_dt, 'yyyy-MM-dd');
    // const postData = this.agntFormGroup.value;
    // this.agntFormGroup.get('srvng_areas')

    const agntData = {
      agntInfo: {
        agnt_Typ: 1,
        // agnt_Cd: this.agntFormGroup.value.agnt_Cd,
        // enrlmnt_Nu: this.agntFormGroup.value.enrlmnt_Nu,
        agnt_nm: this.agntFormGroup.value.agnt_nm,
        // lastName: this.agntFormGroup.value.lastName,
        adhr_Nu: this.agntFormGroup.value.adhr_Nu,
        pan_Nu: this.agntFormGroup.value.pan_Nu,
        tan_Nu: this.agntFormGroup.value.tan_Nu,
        tan_nu: this.agntFormGroup.value.tan_nu,
        gst_Nu: this.agntFormGroup.value.gst_Nu,
        pstl_reg_Nu: this.agntFormGroup.value.pstl_reg_Nu,
        pstl_exp_dt: this.agntFormGroup.value.pstl_exp_dt,
        lmoCode: this.agntFormGroup.value.lmoCode
      },
      agntIdPrfDtls: {
        prf_Nu: this.agntFormGroup.value.id_Nu,
        rgn_id: '',
        prf_dcmn: this.agntFormGroup.value.id_dcmn,
        prf_doc_img: this.agntIdPrfImageUrl,
        doc_ctgry: 2
      },
      agntAdrsPrfDtls: {
        prf_Nu: this.agntFormGroup.value.adrs_Nu,
        rgn_id: '',
        prf_dcmn: this.agntFormGroup.value.adrs_dcmn,
        prf_doc_img: this.agntAdrsPrfImageUrl,
        doc_ctgry: 1
      },
      agntLnsePrfDtls: {
        prf_Nu: this.agntFormGroup.value.lnse_Nu,
        rgn_id: this.agntFormGroup.value.lnse_rg,
        prf_dcmn: '',
        prf_doc_img: this.agntLnsePrfImageUrl,
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
    fnlAgntDtls['agntPrfDtls'] = [];


    for (let i = 0; i < this.agntFormGroup.value.srvng_areas.length; i++) {
      if (this.agntFormGroup.value.srvng_areas[i].ara_nm !== '') {
        fnlAgntDtls['srvng_areas'].push(this.agntFormGroup.value.srvng_areas[i]);
      }
    }

    for (let j = 0; j < this.agntFormGroup.value.srvng_asts.length; j++) {
      if (this.agntFormGroup.value.srvng_asts[j].arv_ast_cbl_type !== '') {
        fnlAgntDtls['srvng_asts'].push(this.agntFormGroup.value.srvng_asts[j]);
      }
    }
    
    for (let k = 0; k < this.agntFormGroup.value.sb_stns.length; k++) {
      if (this.agntFormGroup.value.sb_stns[k].sb_stn != null || this.agntFormGroup.value.sb_stns[k].sb_stn !== ' ') {
        fnlAgntDtls['sb_stns'].push(this.agntFormGroup.value.sb_stns[k]);
      }
    }
    if (this.agntFormGroup.value.officeAddress.ofce_cntct_Nm === '' || this.agntFormGroup.value.officeAddress.ofce_mble_Nu === '' 
    || this.agntFormGroup.value.officeAddress.ofce_email === ''
    || this.agntFormGroup.value.officeAddress.ofce_address === '' || this.agntFormGroup.value.officeAddress.ofce_State === '' 
    || this.agntFormGroup.value.officeAddress.ofce_Dstrt === '' || this.agntFormGroup.value.officeAddress.ofce_Mndl === ''
    || this.agntFormGroup.value.officeAddress.ofce_Vlge === '' || this.agntFormGroup.value.officeAddress.ofce_pn_cd === ''
    || this.agntFormGroup.value.adhr_Nu === '' || this.agntFormGroup.value.agnt_nm === '') {
      this.shwLdr = false;
      this._snackBar.open('Please fill Aadhar, office details and company information', '', {
        
        duration: 3500,
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      });
    } else {
      fnlAgntDtls['officeAddress'] = agntData.officeAddress;

    }

    if (this.agntFormGroup.value.branchAddress.ofce_cntct_Nm === '') {
      this.shwLdr = false;
      this._snackBar.open('Please fill Branch details', '', {
        duration: 3500,
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      });
    } else {
      fnlAgntDtls['branchAddress'] = agntData.branchAddress;
    }
    if (this.agntFormGroup.value.acnt_Nu !== '') {
      fnlAgntDtls['agntBnkDtls'] = agntData.agntBnkDtls;
    }
    if (this.agntFormGroup.value.lnse_Nu !== '') {
      fnlAgntDtls['agntPrfDtls'].push(agntData.agntLnsePrfDtls);
    }
    if (this.agntFormGroup.value.adrs_Nu !== '') {
      fnlAgntDtls['agntPrfDtls'].push(agntData.agntAdrsPrfDtls);
    }
    if (this.agntFormGroup.value.id_Nu !== '') {
      fnlAgntDtls['agntPrfDtls'].push(agntData.agntIdPrfDtls);
    }

    if (this.agntFormGroup.value.agnt_Typ !== '') {
      fnlAgntDtls['agntInfo'] = agntData.agntInfo;
    }

    // tslint:disable-next-line:prefer-const
    let data = {
      phone_no: fnlAgntDtls['officeAddress'].ofce_mble_Nu,
      prtnr_id: 1,
      ntfcn_cgry_id: 1
    };
    // console.log(fnlAgntDtls);
    // return;
    let checkDtls = {};
    const chckDtls_rte = `agent/lmo/mso/details/adhr_nu/mbl_nu`;
    checkDtls['self_reg'] = true;
    checkDtls['mbl_nu'] = fnlAgntDtls['officeAddress'].ofce_mble_Nu;
    checkDtls['adhr_nu'] = fnlAgntDtls['agntInfo'].adhr_Nu;
    checkDtls['ctgry_id'] = 1;
    // return;
    this.crdsrv.create(checkDtls, chckDtls_rte).subscribe((res) => {
      console.log(res['data']);
      if (res['data'].length > 0){
        this._snackBar.open("LMO already exists", '', {
          duration: 2000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
        this.shwLdr = false;
      } else{
        const rte1 = `agent/agent`;
        this.crdsrv.create(fnlAgntDtls, rte1).subscribe((result) => {
          if (result['status'] == 200){
            console.log(result['data']);
            // return;
            fnlAgntDtls['newagnt_id'] = result['data'].insertId;
			fnlAgntDtls['pwd_tx'] = fnlAgntDtls['officeAddress'].ofce_mble_Nu;
            fnlAgntDtls['usr_ctgry_ky'] = result['data'].insertId;
            fnlAgntDtls['rle_id'] = 5;
            fnlAgntDtls['mrcht_id'] = 1;
            fnlAgntDtls['emple_id'] = "";
            fnlAgntDtls['app_id'] = "";
            fnlAgntDtls['agnt_ctgry_id'] = 1;
            const rte = `register/send_otp`;
            this.crdsrv.create(data, rte).subscribe((res1) => {
              this.shwLdr = false;
              if (!res1['data'].errorCode) {
              this.confirmDialogRef = this.dialog.open(TenantEnrollmentOtpDialogComponent, {
                width: '25%',
                panelClass: 'my-class',
                data: fnlAgntDtls,
                disableClose: true
              });
              this.shwLdr = true;
              this.confirmDialogRef.afterClosed().subscribe((response) => {
                this.shwLdr = false;
                // this.agntFormGroup.reset();
                // if (response == undefined) { }
                // else if (response.status == 200) { console.log('in enrollment'); }
              });
          }else {
                this._snackBar.open("LMO already exists", '', {
                  duration: 2000,
                  horizontalPosition: this.horizontalPosition,
                  verticalPosition: this.verticalPosition,
                });
              }
        });
      }
    });

    // return;
    // insert details into agent
    // const rte1 = `agent/agent`;
    // this.crdsrv.create(fnlAgntDtls, rte1).subscribe((result) => {
    //   if (result['status'] == 200){
    //     const rte = `register/send_otp`;
    //     this.crdsrv.create(data, rte).subscribe((res) => {
    //       this.shwLdr = false;
    //       if (!res['data'].errorCode) {
    //       this.confirmDialogRef = this.dialog.open(TenantEnrollmentOtpDialogComponent, {
    //         width: '25%',
    //         panelClass: 'my-class',
    //         data: fnlAgntDtls,
    //         disableClose: true
    //       });
    //       this.shwLdr = true;
    //       this.confirmDialogRef.afterClosed().subscribe((response) => {
    //         this.shwLdr = false;
    //         this.agntFormGroup.reset();
    //         // if (response == undefined) { }
    //         // else if (response.status == 200) { console.log('in enrollment'); }
    //       });
    //   }
    // });
    // const rte = `register/send_otp`;
    // this.crdsrv.create(data, rte).subscribe((res) => {
    //   this.shwLdr = false;
    //   if (!res['data'].errorCode) {
    //     const rte1 = `agent/agent`;
    //     this.dialog.closeAll();
    //     this.crdsrv.create(fnlAgntDtls, rte1).subscribe((result) => {
    //       if (result['status'] == 200){
    //         console.log(result['data']);
    //         return;
    //         this.confirmDialogRef = this.dialog.open(TenantEnrollmentOtpDialogComponent, {
    //           width: '25%',
    //           panelClass: 'my-class',
    //           data: fnlAgntDtls,
    //           disableClose: true
    //         });
    //         this.shwLdr = true;
    //         this.confirmDialogRef.afterClosed().subscribe((response) => {
    //           this.shwLdr = false;
    //           this.agntFormGroup.reset();
    //           // if (response == undefined) { }
    //           // else if (response.status == 200) { console.log('in enrollment'); }
    //         });
    //       }
          
    //     });
        
    //   } else {
    //     this._snackBar.open("MSO already exists", '', {
    //       duration: 2000,
    //       horizontalPosition: this.horizontalPosition,
    //       verticalPosition: this.verticalPosition,
    //     });
    //   }
    // });



    // otp auth
    // const dialogRef  = this.dialog.open(TenantEnrollmentOtpDialogComponent, {
    //   width: '50%',
    //   panelClass: 'my-class',
    //   data: {
    //     // message: 'Are you sure deleting this Schedule ?',
    //     fnlAgntDtls: fnlAgntDtls

    //   }
    // });
    // dialogRef.afterClosed().subscribe(result => {
    //   console.log('The dialog was closed');
    //   // this.animal = result;
    // });


    // const rte = `agent/enrollment`;
    //     this.crdsrv.create(fnlAgntDtls, rte).subscribe((res) => {
    //     console.log(res);
    //     if (res['status'] == 200){
    //       this._snackBar.open("Your Sucessfully Saved", '', {
    //         duration: 2000,
    //         horizontalPosition: this.horizontalPosition,
    //         verticalPosition: this.verticalPosition,
    //       });
    //     }
    //   });


    // return;
    //   const rte = `agent/agent`;
    //   this.crdsrv.create(fnlAgntDtls, rte).subscribe((res) => {
    //   console.log(res);
    //   if (res['status'] == 200){
    //     this._snackBar.open("Sucessfully Added", '', {
    //       duration: 2000,
    //       horizontalPosition: this.horizontalPosition,
    //       verticalPosition: this.verticalPosition,
    //     });
    //   }
    //   // this.getAgentLst();
    //   // this.getTntDtls('addFormPanel', null);
    // });
    // }
    // else
    // {
    //   this._snackBar.open('Agent Code already exist', '', {
    //     duration: 2000,
    //     panelClass: ['blue-snackbar'],
    //     horizontalPosition: this.horizontalPosition,
    //     verticalPosition: this.verticalPosition,
    //   });
    // }

  }
    });
  }

  displayFn(agent): any {
    if (agent) { return agent.agnt_nm + ' ' + '|' + ' ' + agent.agnt_cd; }
  }

  goBack(): void {
    this.route.navigate(['/admin']);
  }
  reset(): any {
    this.agntFormGroup.reset();
    this.sbmtBtnDsble = false;
  }
  sndAgntOtp(): any{
    console.log(this.srchdagntDtls);
    this.srchdagntDtls['newagnt_id'] = this.srchdagntDtls.agnt_id;
    this.srchdagntDtls['phone_no'] = this.srchdagntDtls.ofce_mbl_nu;
    this.srchdagntDtls['ntfcn_cgry_id'] = 1;
   
      const rte = `register/send_otp`;
      this.crdsrv.create(this.srchdagntDtls, rte).subscribe((res1) => {
        this.shwLdr = false;
        if (!res1['data'].errorCode) {
        this.confirmDialogRef = this.dialog.open(TenantEnrollmentOtpDialogComponent, {
          width: '25%',
          panelClass: 'my-class',
          data: this.srchdagntDtls,
          disableClose: true
        });
        this.shwLdr = true;
        this.confirmDialogRef.afterClosed().subscribe((response) => {
          this.shwLdr = false;
          // this.agntFormGroup.reset();
          // if (response == undefined) { }
          // else if (response.status == 200) { console.log('in enrollment'); }
        });
        }else {
              this._snackBar.open("MSO already exists", '', {
                duration: 2000,
                horizontalPosition: this.horizontalPosition,
                verticalPosition: this.verticalPosition,
              });
            }
      });
  }
  getAgntDtls(): any{
    let agnt_info_dtls;
    // this.agntFormGroup.value.adhr_Nu,
    // this.agntFormGroup.value.officeAddress.ofce_mbl_nu
    console.log(this.agntFormGroup)
    console.log(this.agntFormGroup.value.officeAddress);
    console.log(this.agntFormGroup.value.adhr_Nu, this.agntFormGroup.value.officeAddress.ofce_mble_Nu);
    // return;
    let getAgntDta = {};
    const rte = `agent/lmo/mso/details/adhr_nu/mbl_nu`;
    getAgntDta['self_reg'] = false;
    getAgntDta['mbl_nu'] = this.agntFormGroup.value.officeAddress.ofce_mble_Nu;
    getAgntDta['adhr_nu'] = this.agntFormGroup.value.adhr_Nu;
    getAgntDta['ctgry_id'] = 1;

    this.crdsrv.create(getAgntDta, rte).subscribe((res) => {
      agnt_info_dtls = res['data'][0];
      this.formDtls = res['data'][0];
      
      console.log(agnt_info_dtls);

      if (agnt_info_dtls == undefined) {
        this.shwRegMsg = "Details not available for the respective Aadhar & mobile number,Please fill the form to register as LMO";
        this.selfRegPndg = false;
        this.agntFormGroup.get('adhr_Nu').setValue(this.agntFormGroup.value.adhr_Nu);
        this.agntFormGroup.get('officeAddress.ofce_mble_Nu').setValue(this.agntFormGroup.value.officeAddress.ofce_mble_Nu);
      } else if (agnt_info_dtls.slf_rgnrn_ts != null && agnt_info_dtls.onbrd_in == 0){
        this.shwRegMsg = "This LMO is already registered but pending for approval, Please contact APSFL team to know the status";
        this.selfRegPndg = false;
        this.sbmtBtnDsble = true;
      } else if (agnt_info_dtls.slf_rgnrn_ts != null && agnt_info_dtls.onbrd_in == 1){
        this.shwRegMsg = "This LMO is already registered and approved,please login with your credentails that are send to your email";
        this.selfRegPndg = false;
        this.sbmtBtnDsble = true;
      } else if (agnt_info_dtls.slf_rgnrn_ts == null){
        this.shwRegMsg = "Please click Resend OTP button below to complete registration";
        this.srchdagntDtls = this.formDtls;
        this.selfRegPndg = true;
        // this.agntFormGroup.get('adhr_Nu').setValue(this.agntFormGroup.value.adhr_Nu);
        // this.agntFormGroup.get('officeAddress.ofce_mble_Nu').setValue(this.agntFormGroup.value.officeAddress.ofce_mble_Nu);
      } 

      let lstPopupData;
        lstPopupData = {
          title: this.shwRegMsg,
          msg: '',
          icon: 'account_circle',
          btnLst: [{
            label: 'Ok',
            res: 'ok'
          }]
        };
        this.confirmMsgDialogRef = this.dialog.open(MessageDialogComponent, {
          width: '25%',
          panelClass: 'my-class',
          data: lstPopupData
        });

      // if (agnt_info_dtls == undefined){
      //   this.selfRegPndg = false;
      //   this._snackBar.open("Please Enter form below to register", '', {
      //     duration: 3500,
      //     horizontalPosition: this.horizontalPosition,
      //     verticalPosition: this.verticalPosition,
      //   });
      // }
      if (agnt_info_dtls != undefined){

      
    // this.agntFormGroup.get('orgn_typ').setValue(agnt_info_dtls.agnt_ctgry_id);
      // this.agntFormGroup.get('agnt_Cd').setValue(agnt_info_dtls.agnt_cd);
      // this.agntFormGroup.get('enrlmnt_Nu').setValue(agnt_info_dtls.enrlt_nu);
      this.agntFormGroup.get('agnt_nm').setValue(agnt_info_dtls.agnt_nm);
      // this.agntFormGroup.get('lastName').setValue(agnt_info_dtls.lst_nm);
      this.agntFormGroup.get('adhr_Nu').setValue(agnt_info_dtls.adhr_nu);
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
      }
    });
  }
}
