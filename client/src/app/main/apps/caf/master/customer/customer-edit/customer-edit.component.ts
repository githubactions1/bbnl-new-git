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
  selector: 'app-customer-edit',
  templateUrl: './customer-edit.component.html',
  styleUrls: ['./customer-edit.component.scss']
})
export class CustomerEditComponent implements OnInit {
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
  getHeaderDtls = function () { return { "title": 'Update individual Customer', "icon": "people_outline" } }
  blng_frqncy_lst: any;
  mndal_lst: any;
  mandalId: any;
  vilge_lst: any;
  permissions;
  frmData: any;
  blng_vlge_lst: any[];
  instl_vlge_lst: any[];
  blng_mndl_lst: any[];
  instl_mndl_lst: any[];
  blng_dstrt_lst: any[];
  instl_dstrt_lst: any[];
  loader: boolean = false;
  isChecked: any;
  usrdtls: any;
  
  poplst: any;
 
  splits: any;
  radioSelected: any;
  radioSelected1: any;
  
  trnfpt = [];

  aadhaar: any;
  adr: any;
  entfrmData: any;
  
  poploc: any;
  Date: any;
  cstmrdtls: any;
 
  constructor(private _fuseSidebarService: DsSidebarService, private http: HttpClient, private router: Router, private _formBuilder: FormBuilder, private crdsrv: CrudService, private datePipe: DatePipe, private snackBar: MatSnackBar, public dialog: MatDialog, public TransfereService: TransfereService) { }

  ngOnInit() {
    
   
    this.usrdtls = JSON.parse(localStorage.getItem('usrDtls'));
    
    this.entfrmData = this.TransfereService.getLoclData('entcafData')
    console.log(this.entfrmData)
    this.Date = new Date();
    
    const emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
    const phoneNumber = /^(\+\d{1,3}[- ]?)?\d{10}$/;
    const adharno = /^(\+\d{1,3}[- ]?)?\d{12}$/;
    this.firstFormGroup = this._formBuilder.group({
      custInfo: this._formBuilder.group({
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
      })
    });


    this.getGender();
    this.getStates();
    this.getBillingFrequency();
   
   
    this.getcstmrdtls()
    // this.getOltInfo(100005143);


    console.log(this.entfrmData)
   
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
  getcstmrdtls(){
    const prfleRte = `caf/getcstmrdt/` + this.entfrmData.cstmr_id;
    this.crdsrv.get(prfleRte).subscribe((res) => {
      this.cstmrdtls = res['data'];
      console.log(this.cstmrdtls);
      this.firstFormGroup.get('custInfo').get('frst_nm').setValue(this.cstmrdtls[0].frst_nm)
      this.firstFormGroup.get('custInfo').get('adhr_nu').setValue(this.cstmrdtls[0].adhr_nu)
      // this.firstFormGroup.get('custInfo').get('prnt_cstmr_id').setValue(this.cstmrdtls[0].prnt_cstmr_id)
    this.firstFormGroup.get('custInfo').get('tle_nm').setValue(this.cstmrdtls[0].tle_nm)
    // this.firstFormGroup.get('custInfo').get('frst_nm').setValue(this.cstmrdtls[0].frst_nm)
    this.firstFormGroup.get('custInfo').get('mdlr_nm').setValue(this.cstmrdtls[0].mdlr_nm)
    this.firstFormGroup.get('custInfo').get('lst_nm').setValue(this.cstmrdtls[0].lst_nm)
    this.firstFormGroup.get('custInfo').get('gndr_id').setValue(this.cstmrdtls[0].gndr_id)
    this.firstFormGroup.get('custInfo').get('dob_dt').setValue(this.cstmrdtls[0].dob_dt)
    this.firstFormGroup.get('custInfo').get('rltve_nm').setValue(this.cstmrdtls[0].rltve_nm)

    this.firstFormGroup.get('custInfo').get('pan_nu').setValue(this.cstmrdtls[0].pan_nu)
    this.firstFormGroup.get('custInfo').get('loc_eml1_tx').setValue(this.cstmrdtls[0].loc_eml1_tx)
    this.firstFormGroup.get('custInfo').get('loc_lmdle1_nu').setValue(this.cstmrdtls[0].cntct_mble1_nu)

    this.firstFormGroup.get('custInfo').get('frqncy_id').setValue(this.cstmrdtls[0].frqncy_id)
    this.firstFormGroup.get('custInfo').get('actvn_dt').setValue(this.cstmrdtls[0].actvn_dt)
    this.firstFormGroup.get('custInfo').get('instl_house_flat_no').setValue(this.cstmrdtls[0].instl_addr1_tx)
    this.firstFormGroup.get('custInfo').get('instl_buildingname').setValue(this.cstmrdtls[0].loc_addr1_tx)
    this.firstFormGroup.get('custInfo').get('instl_streetname').setValue(this.cstmrdtls[0].loc_addr2_tx)
    this.firstFormGroup.get('custInfo').get('loc_lcly_tx').setValue(this.cstmrdtls[0].loc_ara_tx)
    this.firstFormGroup.get('custInfo').get('instl_pincode').setValue(this.cstmrdtls[0].blng_pn_cd)


    this.firstFormGroup.get('custInfo').get('loc_vlge_id').setValue(this.cstmrdtls[0].instl_vlge_id)
    this.firstFormGroup.get('custInfo').get('blng_cntct_nm').setValue(this.cstmrdtls[0].blng_cntct_nm)
    this.firstFormGroup.get('custInfo').get('mbl_nu').setValue(this.cstmrdtls[0].cntct_mble1_nu)
    this.firstFormGroup.get('custInfo').get('blng_eml1_tx').setValue(this.cstmrdtls[0].loc_eml1_tx)
    this.firstFormGroup.get('custInfo').get('blng_house_flat_no').setValue(this.cstmrdtls[0].bddr1_tx)
    this.firstFormGroup.get('custInfo').get('blng_buildingname').setValue(this.cstmrdtls[0].blng_addr2_tx)
    this.firstFormGroup.get('custInfo').get('blng_streetname').setValue(this.cstmrdtls[0].blng_lcly_tx)
    this.firstFormGroup.get('custInfo').get('blng_lcly_tx').setValue(this.cstmrdtls[0].blng_ara_tx)
    this.firstFormGroup.get('custInfo').get('blng_pn_cd').setValue(this.cstmrdtls[0].blng_pn_cd)
    this.firstFormGroup.get('custInfo').get('blng_vlge_id').setValue(this.cstmrdtls[0].blng_ste_id)
    this.firstFormGroup.get('custInfo').get('blng_std_cd').setValue(this.cstmrdtls[0].blng_std_cd)
    this.firstFormGroup.get('custInfo').get('blng_lnd_nu').setValue(this.cstmrdtls[0].blng_lmdle1_nu)
    this.firstFormGroup.get('custInfo').get('loc_std_cd').setValue(this.cstmrdtls[0].blng_std_cd)
    this.firstFormGroup.get('custInfo').get('loc_lnd_nu').setValue(this.cstmrdtls[0].blng_lmdle1_nu)

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
  getBillingFrequency() {
    const rte = `crm/billingFrequency`;
    this.crdsrv.get(rte).subscribe((res) => {
      this.blng_frqncy_lst = res['data'];
      console.log(this.blng_frqncy_lst)
    })
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
        this.instl_dstrt_lst = res['data']
      
        console.log(this.instl_dstrt_lst)
        
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
             // if (this.entfrmData)
             //   this.firstFormGroup.get('custInfo').get('loc_vlge_id').setValue(this.cstmrdtls[0].loc_vlge_id);
           
           })
         } else if (add_typ == 2) {
           const rte = `user/getvlgs/${mndl_id}/${this.firstFormGroup.value.custInfo.blng_dstrct_id}`;
           this.crdsrv.get(rte).subscribe((res) => {
             this.blng_vlge_lst = res['data'];
             console.log(this.blng_vlge_lst)
           // if (this.entfrmData)
           //   this.firstFormGroup.get('custInfo').get('blng_vlge_id').setValue(parseInt(this.entfrmData.blng_vlge_id));
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
  saveCustomer() {
    //  this.newentry();
    console.log(this.firstFormGroup.invalid)
    console.log(this.firstFormGroup.value.custInfo)
    let data = this.firstFormGroup.value.custInfo
    data['cstmr_id'] =this.cstmrdtls[0].cstmr_id
    console.log(data)
    this.crdsrv.create(data, 'caf/updatecstmrDtls').subscribe(res => {
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
  ngOnDestroy() {
    this.TransfereService.ClearLocalData('cafData')

  }


}
