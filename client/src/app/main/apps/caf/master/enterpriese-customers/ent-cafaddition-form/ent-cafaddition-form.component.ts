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
  selector: 'app-ent-cafaddition-form',
  templateUrl: './ent-cafaddition-form.component.html',
  styleUrls: ['./ent-cafaddition-form.component.scss']
})
export class EntCafadditionFormComponent implements OnInit {
  pckgeProperties: any

  firstFormGroup: FormGroup;
  gndrLst: any;
  
  showStepr = false;
  sideBarHeader: string;
  editClicked: boolean = false;
  updateData: any;
  deleteCstmr: boolean;
  ste_lst: any;
  dstrt_lst: any;
  mndl_lst: any;
  vlge_lst: any;
 
  districtId: any;
  spnrCtrl = false;
  confirmDialogRef: MatDialogRef<DeleteDialogComponent>;
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  getHeaderDtls = function () { return { "title": 'Add New Enterprise Customer', "icon": "people_outline" } }
  blng_frqncy_lst: any;
  mndal_lst: any;
  mandalId: any;
  vilge_lst: any;
  permissions;

  packages: any;
 
  srvpcs: any;
  frmData: any;
  EnblUpbtn: boolean = false;
  
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
  usrdtls: any;
  boxDetails: any;
  poplst: any;
 
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
  constructor(private _fuseSidebarService: DsSidebarService, private http: HttpClient, private router: Router, private _formBuilder: FormBuilder, private crdsrv: CrudService, private datePipe: DatePipe, private snackBar: MatSnackBar, public dialog: MatDialog, public TransfereService: TransfereService) 

  { }

  ngOnInit() {
    
   
    this.usrdtls = JSON.parse(localStorage.getItem('usrDtls'));
    
    this.entfrmData = this.TransfereService.getLoclData('entcafData')
    this.Date = new Date();
    
    const emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
    const phoneNumber = /^(\+\d{1,3}[- ]?)?\d{10}$/;
    const adharno = /^(\+\d{1,3}[- ]?)?\d{12}$/;
    this.firstFormGroup = this._formBuilder.group({
      custInfo: this._formBuilder.group({

        prnt_cstmr_id:['', Validators.required],
        hdOrgName:  [{ value: this.entfrmData.cstmr_nm, disabled: true }, Validators.required],
        
        tle_nm: [''],
        frst_nm: ['', Validators.required],
        mdlr_nm: ['', Validators],
        lst_nm: ['', Validators.required],
        gndr_id: ['', Validators.required],
        dob_dt: ['', Validators.required],
        rltve_nm: ['', Validators],
        adhr_nu: ['',[ Validators.required,Validators.pattern(adharno)]],
        pan_nu: [''],
        loc_eml1_tx: ['', Validators.pattern(emailPattern)],
        loc_lmdle1_nu: ['', [Validators.required, Validators.pattern(phoneNumber)]],
        frqncy_id: ['', Validators.required],
        actvn_dt: ['', Validators.required],
        instl_house_flat_no: ['', Validators.required],
        instl_buildingname: ['', Validators],
        instl_streetname: ['', Validators.required],
        loc_lcly_tx: ['', Validators.required],
        instl_pincode: ['', Validators.required],
        instl_state: ['', Validators.required],
        loc_dstrct_id: ['', Validators.required],
        loc_mndl_id: ['', Validators.required],
        loc_vlge_id: ['', Validators.required],
        loc_lnd_nu: ['', Validators.required],
        loc_std_cd: ['', Validators.required],
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
        blng_lnd_nu: ['', Validators.required],
        blng_std_cd: ['', Validators.required],
        pop_id: ['', Validators.required]
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
      iptv_mdl: [{ value: '', disabled: true }, Validators],
      iptv_bx_srl_num: ['', Validators],
      iptv_mac_addr_tx: [{ value: '', disabled: true }, Validators],
      iptv_bx_own: ['', Validators],
      iptv_bx_emi: [{ value: '', disabled: true }, Validators],
      iptv_bx_amt: [{ value: '', disabled: true }, Validators],
      iptv_bx_up_amt: [{ value: '', disabled: true }, Validators],

      cpe_pop_id: [{ value: '', disabled: true }, Validators],
      iptv_stpbx_id: [{ value: '', disabled: true }, Validators],
      onu_stpbx_id: [{ value: '', disabled: true }, Validators],
    });


    this.getGender();
    this.getStates();
    this.getBillingFrequency();
    this.getpackages()
    this.getpopLst()
    this.oniptvsrlnu()
    this.getnodes()
    // this.getOltInfo(100005143);
   
 



    console.log(this.frmData)
   
   

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
  getnodes(){
    const prfleRte = `caf/nodes/` + this.entfrmData.cstmr_id;
    this.crdsrv.get(prfleRte).subscribe((res) => {
      this.nodes = res['data'];
      console.log(this.nodes);
    }, (error) => {
      console.log(error);
    });
  }

  onretrive() {
    this.http.get<any>('/caf/aadhaar/' + this.firstFormGroup.value.custInfo.adhr_nu).subscribe(data => {
      
      console.log(data)
      this.aadhaar = data.data.rspne_tx;
      console.log(this.aadhaar)
      var arr = this.aadhaar.CITIZEN_NAME.split(' ');
      console.log(arr)
      this.firstFormGroup.get('custInfo').get('frst_nm').setValue(arr[0])
      this.firstFormGroup.get('custInfo').get('lst_nm').setValue(arr[1])

      this.firstFormGroup.get('custInfo').get('dob_dt').setValue(this.aadhaar.DOB_DT)

      this.firstFormGroup.get('custInfo').get('loc_lmdle1_nu').setValue(this.aadhaar.MOBILE_NUMBER)
      this.firstFormGroup.get('custInfo').get('instl_streetname').setValue(this.aadhaar.STREET)
      this.firstFormGroup.get('custInfo').get('instl_pincode').setValue(this.aadhaar.PINCODE)
      this.firstFormGroup.get('custInfo').get('loc_eml1_tx').setValue(this.aadhaar.EMAIL_ID)
      this.firstFormGroup.get('custInfo').get('instl_house_flat_no').setValue(this.aadhaar.BUILDING_NAME)
      this.firstFormGroup.get('custInfo').get('instl_state').setValue(1)
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
  getGender() {
    const prfleRte = `user/gender`;
    this.crdsrv.get(prfleRte).subscribe((res) => {
      this.gndrLst = res['data'];
      // console.log(this.gndrLst);
    }, (error) => {
      console.log(error);
    });
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
    let count = 0
    const rte = `olt/slotDtls/` + this.firstFormGroup.value.olt_prt_id;
    this.crdsrv.get(rte).subscribe((res) => {
      if (res['data'].length == 0 ) {
        this.snackBar.open("No Splits Available", '', {
          duration: 2000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
      }
      this.level1 = res['data'];
      console.log(this.level1)
     
      // console.log(e.value)
      // this.getSlotOneLevels( this.firstFormGroup.value.olt_prt_id);
    })



  }
  getSlotTwo() {

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
 

    })

  }
  getSlotThree() {
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
 

      const rte = `olt/slotthreeDetailsForPort/`
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
        // console.log(e.value)
        // this.getSlotOneLevels( this.firstFormGroup.value.olt_prt_id);
      })
    
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


  getpackages() {
    console.log("Packages")
 
    const rte = `package/getPckgesByAgntId/${this.usrdtls.usr_ctgry_ky}/` + 2;
    console.log(rte)
    this.crdsrv.get(rte).subscribe((res) => {
      this.packages = res['data'];
      console.log(res['data'])
      console.log(this.packages)

      this.packages.filter((k) => {
       
          k['checked'] = false;
      });

    })
  }
  getpopLst() {
    console.log("pop")
   
      const rte = `caf/getPopByAgntId/${this.usrdtls.usr_ctgry_ky}/4`;
      this.crdsrv.get(rte).subscribe((res) => {
        this.poplst = res['data'];
        console.log(res['data'])
        console.log(this.poplst)
      })
    
  }
  onBlur() {

    // console.log(data.target.value)
    // console.log(data)
    const rte = `caf/boxdtls/` + this.firstFormGroup.value.onu_srl_nu;
    this.crdsrv.get(rte).subscribe((res) => {
      this.boxDetails = res['data'];
      console.log(res['data'])
      if (res['data'].length == 0) {
        this.snackBar.open("Invalid Box Serial number", '', {
          duration: 2000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
      }
      console.log(this.boxDetails[0].stpbx_id)
      const rte1 = `caf/boxallocated/` + this.boxDetails[0].stpbx_id;
      this.crdsrv.get(rte1).subscribe((res1) => {
        console.log(res1['data'])
        if (res1['data'].length > 0) {
          this.snackBar.open("Box Already Allocated", '', {
            duration: 2000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
          });
        }
        else {

          this.firstFormGroup.get('onu_mdl').setValue(this.boxDetails[0].mdle_nm)
          this.firstFormGroup.get('onu_mac_addr_tx').setValue(this.boxDetails[0].mac_addr_cd)
          this.firstFormGroup.get('onu_stpbx_id').setValue(this.boxDetails[0].stpbx_id)
          this.firstFormGroup.get('onu_amt').setValue(this.boxDetails[0].emi_at)
          this.firstFormGroup.get('onu_up_frmt_amt').setValue(this.boxDetails[0].up_frnt_chrgs_at)
          this.firstFormGroup.get('onu_emi').setValue(this.boxDetails[0].emi_ct)

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
        this.snackBar.open("Invalid Box Serial number", '', {
          duration: 2000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
      }
      const rte1 = `caf/boxallocated/` + this.iptvDetails[0].stpbx_id;
      this.crdsrv.get(rte1).subscribe((res1) => {
        console.log(res1['data'])
        if (res1['data'].length > 0) {
          this.snackBar.open("Box Already Allocated", '', {
            duration: 2000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
          });
        }
        else {

          this.firstFormGroup.get('iptv_mdl').setValue(this.iptvDetails[0].mdle_nm)
          this.firstFormGroup.get('iptv_mac_addr_tx').setValue(this.iptvDetails[0].mac_addr_cd)
          this.firstFormGroup.get('iptv_stpbx_id').setValue(this.iptvDetails[0].stpbx_id)
          this.firstFormGroup.get('iptv_bx_emi').setValue(this.iptvDetails[0].emi_ct)
          this.firstFormGroup.get('iptv_bx_amt').setValue(this.iptvDetails[0].emi_at)
          this.firstFormGroup.get('iptv_bx_up_amt').setValue(this.iptvDetails[0].up_frnt_chrgs_at)

        }
      })

    })
  }
  onFocus(data) {
    console.log(data)
  }

  getStates() {

    const rte = `admin/states`;

    this.crdsrv.get(rte).subscribe((res) => {
      if (res['data'].length > 0) {
        this.ste_lst = res['data'];
        console.log(this.ste_lst)
     

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
        for(let i=0; i < data.length;i++){
          console.log("in for")
          console.log(data[i].dstrt_id) 
            console.log(this.poploc[0].dstrt_id)
          if(data[i].dstrt_id == this.poploc[0].dstrt_id){
            console.log("in if")
            this.instl_dstrt_lst = [];
             this.instl_dstrt_lst.push(data[i])
            // this.instl_dstrt_lst[0] = data[i];
            console .log(this.instl_dstrt_lst)
          }
        }
        console.log(this.poploc)
        
      } else if (add_typ == 2) {
        this.blng_dstrt_lst = res['data'];
        
      } else if (add_typ == 3) {
        this.instl_dstrt_lst = res['data'];
        console.log(this.instl_dstrt_lst.length)
        for (let i = 0; i < this.instl_dstrt_lst.length; i++) {
          let str = this.instl_dstrt_lst[i].dstrt_nm.replace(" ", "")
          // console.log(str)
          if (this.aadhaar.DISTRICT_NAME.toLowerCase() == str.toLowerCase()) {
            console.log("hai")
            this.firstFormGroup.get('custInfo').get('loc_dstrct_id').setValue(this.instl_dstrt_lst[i].dstrt_id);

            console.log(this.instl_dstrt_lst[i])
             this.getMandals(this.instl_dstrt_lst[i].dstrt_id,3)
          }
        }
        // this.firstFormGroup.get('custInfo').get('loc_dstrct_id').setValue(parseInt(this.adr));
      }

    });
  }
  getMandals(dst_id, add_typ) {
    console.log(add_typ)
    const rte = `agent/mandalList/${dst_id}`;
    this.crdsrv.get(rte).subscribe((res) => {



      if (add_typ == 1) {
        // this.instl_mndl_lst = res['data'];
        let data = res['data']
        for(let i=0; i < data.length;i++){
          console.log("in for")
          console.log(data[i].mndl_id) 
            console.log(this.poploc[0].mndl_id)
          if(data[i].mndl_id == this.poploc[0].mndl_id){
            console.log("in if")
            this.instl_mndl_lst = [];
             this.instl_mndl_lst.push(data[i])
            // this.instl_dstrt_lst[0] = data[i];
            console .log(this.instl_mndl_lst)
          }
        }
        console.log(this.poploc)
        

      } else if (add_typ == 2) {
        this.blng_mndl_lst = res['data'];
       
      } else if (add_typ == 3) {
        this.instl_mndl_lst = res['data'];
        for (let i = 0; i < this.instl_mndl_lst.length; i++) {
          let str = this.instl_mndl_lst[i].mndl_nm.replace(" ", "")
          // console.log(str)
          if (this.aadhaar.TEHSIL_NAME.toLowerCase() == str.toLowerCase()) {
            console.log("hai")
            this.firstFormGroup.get('custInfo').get('loc_mndl_id').setValue(this.instl_mndl_lst[i].mndl_nu);

            console.log(this.instl_mndl_lst[i])
            this.getVillages(this.instl_mndl_lst[i].mndl_nu,3)

          }
        }
      
      }
      



    });
  }

  getVillages(mndl_id, add_typ) {
    console.log(this.firstFormGroup.value.custInfo.blng_dstrct_id)
         if (add_typ == 1) {
           const rte = `user/getvlgs/${mndl_id}/${this.firstFormGroup.value.custInfo.loc_dstrct_id}`;
           // this.instl_vlge_lst = res['data'];
           this.crdsrv.get(rte).subscribe((res) => {
             let data = res['data']
             this.instl_vlge_lst = [];
             for (let i = 0; i < data.length; i++) {
               console.log("in for")
               console.log(data[i].vlge_id)
               // console.log(this.poploc[0].vlge_id)
               if (data[i].vlge_id == this.poploc[0].vlge_id) {
                 console.log("in if")
     
                 this.instl_vlge_lst.push(data[i])
                 // this.instl_dstrt_lst[0] = data[i];
                 console.log(this.instl_vlge_lst)
               }
             }
             console.log(this.poploc)
             console.log(this.instl_vlge_lst)
             // if (this.frmData)
             //   this.firstFormGroup.get('custInfo').get('loc_vlge_id').setValue(this.frmData.loc_vlge_id);
           
           })
         } else if (add_typ == 2) {
           const rte = `user/getvlgs/${mndl_id}/${this.firstFormGroup.value.custInfo.blng_dstrct_id}`;
           this.crdsrv.get(rte).subscribe((res) => {
             this.blng_vlge_lst = res['data'];
             console.log(this.blng_vlge_lst)
           // if (this.frmData)
           //   this.firstFormGroup.get('custInfo').get('blng_vlge_id').setValue(parseInt(this.frmData.blng_vlge_id));
           })
           
         } else if (add_typ == 3) {
           const rte = `user/getvlgs/${mndl_id}/${this.firstFormGroup.value.custInfo.loc_dstrct_id}`;
           this.crdsrv.get(rte).subscribe((res) => {
             this.instl_vlge_lst = res['data'];
           console.log(this.instl_vlge_lst)
           for (let i = 0; i < this.instl_vlge_lst.length; i++) {
             let str = this.instl_vlge_lst[i].vlge_nm.replace(" ", "")
             // console.log(str)
             if (this.aadhaar.VT_NAME.toLowerCase() == str.toLowerCase()) {
               console.log("hai")
               this.firstFormGroup.get('custInfo').get('loc_vlge_id').setValue(this.instl_vlge_lst[i].vlge_id);
   
               console.log(this.instl_vlge_lst[i])
   
             }
           }
           })
           
         }
        
      
   
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

    let dt = []
    data.srvcs.filter((k) => {
      if (k.cre_srvce_id == 1) {
        dt.push({
          srvcpk_id: k.srvcpk_id,
          pckge_id: data.pckge_id

        })
      }
    })

    console.log(data)
    this.eftdt =data.efcte_dt
    this.expdt =data.expry_dt
    console.log(this.eftdt)
    console.log(this.expdt)

    const rte = `caf/getpckgeProperties`

    this.crdsrv.create(dt, rte).subscribe((res) => {
      this.pckgeProperties = res['data'];
      console.log(this.pckgeProperties)
      console.log(this.pckgeProperties[0].aaa_up_nrml + "_" + this.pckgeProperties[0].aaa_dw_nrml)
      // this.getSlotOneLevels( this.firstFormGroup.value.olt_prt_id);
    })
    this.packgdta = data

  }




  checkValue(event: any) {
    console.log(this.firstFormGroup.value);
    // console.log(event);
    if (event == 'true') {
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
    console.log(this.firstFormGroup.invalid)
    if (this.firstFormGroup.invalid) {
      this.snackBar.open("Please Enter Valid Data", '', {
        duration: 2000,
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      });
  }
  else{
    const rte = "caf/splt/"+this.splt_id;
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
      else{
        this.newentry();        
      }


    });
  }
    
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
  }

  newentry() {
    this.loader = true;
    // this.usrdtls = JSON.parse(localStorage.getItem('usrDtls'));
    // console.log(this.formDesgination.value);
    // console.log(this.firstFormGroup.value);
    this.firstFormGroup.value['dob_dt'] = this.datePipe.transform(this.firstFormGroup.value.dob_dt, 'yyyy-MM-dd');
    this.firstFormGroup.value['actvn_dt'] = this.datePipe.transform(this.firstFormGroup.value.actvn_dt, 'yyyy-MM-dd');

    // this.usrdtls = JSON.parse(localStorage.getItem('usrDtls'));
    const rte = "caf_operations/provision";


    let data = this.firstFormGroup.getRawValue();

    let custData = this.firstFormGroup.get('custInfo').value;
    data = Object.assign(data, custData)
    //data["caf_id"] = this.cafid;
    switch (this.firstFormGroup.value.frqncy_id) {
      case 1:
        data["billfreqlov"] = 1
        data["billrunday"] = "MONTHLY"
        break;
      case 2:
        data["billfreqlov"] = 2
        data["billrunday"] = "QUATERLY"
        break;
      case 3:
        data["billfreqlov"] = 3
        data["billrunday"] = "HALFYEARLY"
        break;
      case 4:
        data["billfreqlov"] = 4
        data["billrunday"] = "YEARLY"
        break;

    }

    data["status"] = 1;
    data["enty_sts_id"] = 1;
    data["agnt_id"] = this.usrdtls.usr_ctgry_ky
    // data["lmo_agnt_cd"] = "LMO18966"
    // data["mso_agnt_cd"] = "LMO18966"
    data["lat"] = ""
    data["lng"] = ""
    data["crnt_caf_sts_id"] = 1
    data["lg_id"] = "lag::"
    data["olt_prt_splt_tx"] = `${this.firstFormGroup.value.lvl1_slt}-${this.firstFormGroup.value.lvl2_slt}-${this.firstFormGroup.value.lvl3_slt}`
    data["blble_caf_in"] = 0;
    data["apsf_unq_id"] = 0;
    data["cnctn_sts_id"] = 1;
    data["splt_id"] = this.splt_id;
    data["mdle_cd"] = this.boxDetails.mdle_cd
    data["olt_crd_nu"] = this.lagDtls.crd_id
	data["accessId"] = this.aaa_mac_id
    data["olt_prt_nm"] = this.lagDtls.olt_prt_nm
    data["olt_acs_nde_id"] = this.lagDtls.olt_acs_nde_id
    data["olt_ip_addr_tx"] = this.lagDtls.olt_ip_addr_tx
    data["olt_srl_nu"] = this.lagDtls.olt_srl_nu
    data["cst_at"] = this.packgdta.total
    data["efcte_dt"] = this.datePipe.transform(this.eftdt, 'yyyy-MM-dd');
    data["expry_dt"] = this.datePipe.transform(this.expdt, 'yyyy-MM-dd');
    data["onu_id"]=this.onu_id
    let adjstdPrt = 0;
    if (data.olt_crd_nu == 1 && this.boxDetails[0].mdle_cd.includes('D')) {
      adjstdPrt = data.olt_prt_nm + 8;
    }

   // data["olt_prt_nm"] = this.lagDtls.olt_prt_nm
    data["aghra_cd"] = data.olt_ip_addr_tx + "-" + data.olt_crd_nu + "-" + adjstdPrt + "-" + this.onu_id + "-HSI";
    data["aaa_cd"] = this.aaa_cd + ":" + data.olt_crd_nu + ":" + data.olt_prt_nm + ":" + this.onu_id;
    
      data["caf_type_id"] = 2
      data["prnt_cstmr_id"] = this.firstFormGroup.value.node
 
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
      "tps": this.trnfpt,
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
      "address": data.instl_buildingname + ","+ data.instl_streetname + "," + data.loc_lcly_tx,
      "stateCode": "AP",
      "countryCode": "INDIA",
      "countryISO2": "IN",
      "partnerCode": this.usrdtls.lmo_cd,
      "village": this.vlgnm,
      "mandal": this.mandalnm,
      "districtCode": this.distnm,
      "admin": "1",
      "fec": "true",
      "swUpgradeMode": "2", 
      
      "registerType": "1",
    }
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
      prv_Dtls["serialNumber"] = data.onu_srl_nu;
    }
    console.log(data)

    console.log(prv_Dtls)
    data["prv_Dtls"] = prv_Dtls
   
    console.log(data)
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

      }else if (res['status'] == 700) {
        this.snackBar.open("Split Is Already Used For Another CAF Select Other Split ", '', {
          duration: 2000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
        this.loader = false;
        //this.router.navigate(['admin/caf/customers'])
        //  this.getcustomer();
        //   this.opensideBar('addFormPanel', null);

      }else if (res['status'] == 250) {
        this.snackBar.open("OLT is DOWN. Please Try Again Later ", '', {
          duration: 2000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
        this.loader = false;
        //this.router.navigate(['admin/caf/customers'])
        //  this.getcustomer();
        //   this.opensideBar('addFormPanel', null);

      }


    });
  }
 

  pop() {
    // console.log(event)
    console.log(this.firstFormGroup.value.pop_id)
    this.firstFormGroup.get('cpe_pop_id').setValue(this.firstFormGroup.get("custInfo").value.pop_id)
    const rte = `olt/getOltdtls/` + this.firstFormGroup.get("custInfo").value.pop_id;
    this.crdsrv.get(rte).subscribe((res) => {
      this.oltDtls = res['data'];
      console.log(res['data'])

    })
    const rte1 = `caf/poploc/` + this.firstFormGroup.get("custInfo").value.pop_id;
    this.crdsrv.get(rte1).subscribe((res) => {
      this.poploc = res['data'];
      console.log(res['data'])

    })
  }

  
  onnode(data) {
    console.log(data)
    
    this.firstFormGroup.get('custInfo').get('adhr_nu').setValue(data.adhr_nu)
   
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
