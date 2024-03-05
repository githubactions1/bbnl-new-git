import { Component, OnInit, ViewChild } from '@angular/core';
import { CrudService } from 'app/main/apps/crud.service';
import { DsSidebarService } from '@glits/components/sidebar/sidebar.service';
import { AtomService } from 'app/main/services/atom.service';
import { FormGroup, FormBuilder, FormControl, Validators, FormArray } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { DeleteDialogComponent } from 'app/main/shared/components/delete-dialog/delete-dialog.component';
import * as _ from 'lodash';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'app/providers/user/user.serivce';

import {
  MatTableDataSource, MatPaginator, MatSort, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition, MatDialogRef, MatSnackBar, MatDialog,
  MAT_DIALOG_DATA
} from '@angular/material';

@Component({
  selector: 'app-service-pack',
  templateUrl: './service-pack.component.html',
  styleUrls: ['./service-pack.component.scss']
})
export class ServicePackComponent implements OnInit {
  getHeaderDtls = function () { return { "title": "ADD Service Packs", "icon": "list_alt" } }
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  confirmDialogRef: MatDialogRef<DeleteDialogComponent>;
  cresrvcslst:any;
  cstmrData = [];
  lastTableView:boolean;
  hsiVlForm: FormGroup;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  fourthFormGroup: FormGroup;
  fifthFormGroup:FormGroup;
  cresrvc_id;
  selectedid = [];
  view:boolean;
  srvcpcktypelst;
  srvcpckForm: FormGroup;
  hsiprptyLst;
  shwChnls: boolean;
  shwhsifrm: boolean;
  loader: boolean;
  compltwPackages:any;
  chnleLst: any;
  columnDefs:any;
  selectedPckge:any;
  customerRemovDefs:any;
  RmvAddonscolumnDefs:any;
  customerDefs:any;
  setupCln;
  cafnumbr:any;
  nextView:boolean;
  searchInput: FormControl;
  private _unsubscribeAll: Subject<any>;
  srch_cntrl = {
    srch_txt: '',
    srch_ldng: false,
    lmt_pstn: 0,
    pcge_mde: '1',
    agntId: '',
  };
  channels = {
    chnle_id: '',
    chnle_nm: '',
    srvcpk_id: '',
    indx: '',
  };
  cstmr_caf_cntrl = {
    caf_type_id: 0,
    caf_msg_txt: '',
    slctd_caf_id: 0,
    mdlwe_sbscr_id: '',
  };
  permissions;
  lmocd:any;
  agnt_id:any;
  addOnStandardPckgsLst = [];
  addOnLocalPckgsLst = [];
  selectedLocalData: any;
  selectedStandData: any;
  cafDtls: any;
  ChanlArry =[];
  dtlsOfRmvCaf: any;
  delcafnumbr: any;
  removeAddonPckgs = [];
  firstOne:boolean = false;
  secondOne:boolean = false;
  comment: any;
  constructor(private _dsSidebarService: DsSidebarService,private route: ActivatedRoute, public crdsrv: CrudService,private formBuilder: FormBuilder, public atmSrv: AtomService,private userService: UserService, public dialog: MatDialog, public fb: FormBuilder, public datePipe: DatePipe, public snackBar: MatSnackBar) {
    this.setupCln = _.cloneDeep(this.chnleLst);
    this.permissions={ "slct_in": 1, "insrt_in": 1, "updt_in": 1, "dlte_in": 1, "exprt_in": 1 }

    this.userService.USER_DETAILS.subscribe(val => {
      if(val.usr_ctgry_id==8) 
            {
                this.lmocd=val.lmo_cd;
                this.agnt_id = val.usr_ctgry_ky;
                this.srch_cntrl.agntId = val.usr_ctgry_ky;
                console.log(this.agnt_id);
                console.log(val);
            }
      });
   }

  ngOnInit() {
    this.firstFormGroup = this.formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this.formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
    this.thirdFormGroup = this.formBuilder.group({
      thirdCtrl: ['', Validators.required]
    });
    this.fourthFormGroup = this.formBuilder.group({
      forthCtrl: ['', Validators.required]
    });
    this.fifthFormGroup = this.formBuilder.group({
      fifthCtrl: ['', Validators.required]
    });
    this.standard();
    this.local();
  }
  standard(){
    this.loader=true;
    this.crdsrv.create(this.srch_cntrl, 'addons/packages/addons/channels').subscribe((res) => {
      console.log(res);
      console.log(res['data']);
      if (res['status'] == 200) {
        this.loader=false;
        res['data'].filter((k) => {
          k['expanded'] = false;
          k['isChecked'] = false;
          this.addOnStandardPckgsLst.push(k);
        })
        this.addOnStandardPckgsLst = _.uniqBy(this.addOnStandardPckgsLst, 'pckge_id');
        console.log(this.addOnStandardPckgsLst);
        var index=0
        for(var k=0; k<this.addOnStandardPckgsLst.length; k++){
          index= index+1;
          this.addOnStandardPckgsLst[k].indx=index
        }
        this.columnDefs = [
          { headerName: 'Sno', field: 'indx', algnmnt:"center", cellClass: "pm-grid-number-cell", width: 50,sortable: true,filter: false },
          { headerName: 'Package Name',field: 'pckge_nm' , cellClass: "pm-grid-number-cell", width: 200, sortable: true,filter:true },
          { headerName: 'Charge',field: 'chrge_at' ,  cellClass: "pm-grid-number-cell", width: 200, sortable: true,filter:true },
          { headerName: 'GST',field: 'gst_at' ,  cellClass: "pm-grid-number-cell", width: 200, sortable: true,filter:true },
          { headerName: 'Total',field: 'ttl_cst' ,  cellClass: "pm-grid-number-cell", width: 200, sortable: true,filter:true },
          { headerName: 'Created On',field: 'efcte_dt' ,  cellClass: "pm-grid-number-cell", width: 200, sortable: true,filter:true },
          { headerName: 'Total Channels',field: 'chnls_cnt' ,  cellClass: "pm-grid-number-cell", width: 200, sortable: true,filter:true },
     ];
      }
      else {
        this.addOnStandardPckgsLst = [];
      }
    }, (err) => {
      this.addOnStandardPckgsLst = [];
    })
  }
  getChanneslList = (chl) => {
    this.ChanlArry = [];
    chl.component.collapseAll(-1);
    console.log(chl.key.srvcpk_id);
    this.crdsrv.get(`addons/getChannels/${chl.key.srvcpk_id}`).subscribe((res) => {
      console.log(res['status']);
      if (res['status'] == 200) {
        if (res['data'].length > 0) {
          console.log(res['data']);
          this.ChanlArry = res['data'];
          chl['chnls_lst'] = res['data'];
          chl.chnls_cnt = chl['chnls_lst'].length;
          var sindx=0
          for(var k=0; k<chl.chnls_cnt; k++){
            sindx= sindx+1;
            chl['chnls_lst'][k].indx=sindx;
            console.log(chl);
            this.channels.chnle_id=chl.chnls_lst[k].chnle_id;
            this.channels.chnle_nm=chl.chnls_lst[k].chnle_nm;
            this.channels.srvcpk_id=chl.chnls_lst[k].srvcpk_id;
            this.channels.indx=chl.chnls_lst[k].indx;
          }
          console.log(this.channels);
          // this.ChanlArry.push(this.channels);
          console.log(this.ChanlArry);

          this.view=true;
        }
      
      }
     
    })
  }
  
local(){
  this.loader=true;
    this.crdsrv.create(this.srch_cntrl, 'addons/packages/web/addons/localChannels').subscribe((res) => {
      console.log(res)
      if (res['status'] == 200) {
        this.loader=false;
        res['data'].filter((k) => {
          k['expanded'] = false;
          k['isChecked'] = false;
        });
        this.addOnLocalPckgsLst = res['data'];
        this.addOnLocalPckgsLst = _.uniqBy(this.addOnLocalPckgsLst, 'pckge_id');
        console.log(this.addOnLocalPckgsLst);
        var thirdindex=0
        for(var k=0; k<this.addOnLocalPckgsLst.length; k++){
          thirdindex= thirdindex+1;
          this.addOnLocalPckgsLst[k].indx=thirdindex
        }
        this.columnDefs = [
          { headerName: 'Sno', field: 'indx', algnmnt:"center", cellClass: "pm-grid-number-cell", width: 50,sortable: true,filter: false },
          { headerName: 'Package Name',field: 'pckge_nm' , cellClass: "pm-grid-number-cell", width: 200, sortable: true,filter:true },
          { headerName: 'Charge',field: 'chrge_at' ,  cellClass: "pm-grid-number-cell", width: 200, sortable: true,filter:true },
          { headerName: 'GST',field: 'gst_at' ,  cellClass: "pm-grid-number-cell", width: 200, sortable: true,filter:true },
          { headerName: 'Total',field: 'ttl_cst' ,  cellClass: "pm-grid-number-cell", width: 200, sortable: true,filter:true },
          { headerName: 'Created On',field: 'efcte_dt' ,  cellClass: "pm-grid-number-cell", width: 200, sortable: true,filter:true },
          { headerName: 'Total Channels',field: 'chnls_cnt' ,  cellClass: "pm-grid-number-cell", width: 200, sortable: true,filter:true },
     ];
      }
     
    })
}
selectionStandard(stand){
console.log(stand);
this.selectedStandData = stand.selectedRowsData;
console.log(this.selectedStandData);
}
selectionLocal(local){
  console.log(local);
  this.selectedLocalData = local.selectedRowsData;
console.log(this.selectedLocalData);
}
secondNext(){
  let pushone = [];
  this.compltwPackages=[];
  console.log(this.selectedStandData);
  console.log(this.selectedLocalData);
  
  for(var s=0; s<this.selectedStandData.length; s++){
     for(var l=0; l<this.selectedLocalData.length; l++){
    pushone.push(this.selectedLocalData[l]);
    pushone.push(this.selectedStandData[s]);
    
     }
  }
  console.log(pushone);
  this.compltwPackages = _.uniqBy(pushone, 'pckge_id');
  console.log(this.compltwPackages);
}
getcafdetails(){
  this.lastTableView=false;
  console.log(this.cafnumbr)
  let req_body = {
    agntId: this.agnt_id == undefined ? 0 : this.agnt_id,
    caf_id: this.cafnumbr
  }
  console.log(req_body);
  this.cstmr_caf_cntrl.caf_type_id = 0;
  this.cstmr_caf_cntrl.caf_msg_txt = '';
  this.cstmr_caf_cntrl.slctd_caf_id = 0;
  this.cstmr_caf_cntrl.mdlwe_sbscr_id = '';
  this.crdsrv.create(req_body, 'addons/web/getCafCstmrDtls').subscribe((res) => {
    // this.cafDtls = res['data'];
    // console.log(this.cafDtls);
    if (res['status'] == 200) {
      if (res['data'].length > 0) {
        this.cstmr_caf_cntrl.caf_type_id = res['data'][0]['caf_type_id'];
        if (this.cstmr_caf_cntrl.caf_type_id == 1) {
          this.cstmrData = res['data'];
          this.cstmr_caf_cntrl.caf_msg_txt = '';
          this.cstmr_caf_cntrl.slctd_caf_id = res['data'][0]['caf_id'];
          this.cstmr_caf_cntrl.mdlwe_sbscr_id = res['data'][0]['mdlwe_sbscr_id'];

        }
        else if (this.cstmr_caf_cntrl.caf_type_id == 2) {
          this.cstmrData = [];
          this.cstmr_caf_cntrl.caf_msg_txt = `${this.cafnumbr} NO IPTV CAF.`;
          this.cstmr_caf_cntrl.slctd_caf_id = 0;
          this.cstmr_caf_cntrl.mdlwe_sbscr_id = '';
        }
        var fourIndx=0;
        for(var h=0; h<this.cstmrData.length; h++){
          fourIndx= fourIndx+1;
          this.cstmrData[h].indx=fourIndx
        }
        this.lastTableView=true;
        console.log(this.cstmrData);
        this.customerDefs = [
          { headerName: 'Sno', field: 'indx', algnmnt:"center", cellClass: "pm-grid-number-cell", width: 50,sortable: true,filter: false },
          { headerName: 'FirstName',field: 'frst_nm' , cellClass: "pm-grid-number-cell", width: 150, sortable: true,filter:true },
          { headerName: 'Last Name',field: 'lst_nm' , cellClass: "pm-grid-number-cell", width: 150, sortable: true,filter:true },
          { headerName: 'Status',field: 'sts_nm' ,  cellClass: "pm-grid-number-cell", width: 150, sortable: true,filter:true },
          { headerName: 'CAF NO',field: 'caf_nu' ,  cellClass: "pm-grid-number-cell", width: 150, sortable: true,filter:true },
          { headerName: 'Package',field: 'pckge_nm' ,  cellClass: "pm-grid-number-cell", width: 150, sortable: true,filter:true },
          { headerName: 'Mobile No',field: 'mbl_nu' ,  cellClass: "pm-grid-number-cell", width: 150, sortable: true,filter:true },
          { headerName: 'Aadhar No',field: 'adhr_nu' ,  cellClass: "pm-grid-number-cell", width: 150, sortable: true,filter:true },
          { headerName: 'Activation Date',field: 'actvn_dt' ,  cellClass: "pm-grid-number-cell", width: 150, sortable: true,filter:true},
          { headerName: 'Total Bill',field: 'ttl_bill_cst' ,  cellClass: "pm-grid-number-cell", width: 150, sortable: true,filter:true },
     ];
      }
      
    }
    else{
      this.snackBar.open("Something Went Wrong ", '', {
        duration: 2000,
        panelClass: ['red-snackbar'],
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      });
    }
  })
}

RmvCafDtls(){
  this.firstOne=false;
  let req_body = {
    agntId: this.agnt_id == undefined ? 0 : this.agnt_id,
    caf_id: this.delcafnumbr
  }
  console.log(req_body);
  this.crdsrv.create(req_body, 'addons/web/getCafCstmrDtls').subscribe((res) => {
    if (res['status'] == 200) {
      if (res['data'].length > 0) {
        this.dtlsOfRmvCaf=res['data']
        console.log(this.dtlsOfRmvCaf);
        this.firstOne=true;
        this.getAddonsFromCAF(this.delcafnumbr);
        var RmvIndx=0;
        for(var h=0; h<this.dtlsOfRmvCaf.length; h++){
          RmvIndx= RmvIndx+1;
          this.dtlsOfRmvCaf[h].indx=RmvIndx;
        }
        this.customerRemovDefs = [
          { headerName: 'Sno', field: 'indx', algnmnt:"center", cellClass: "pm-grid-number-cell", width: 50,sortable: true,filter: false },
          { headerName: 'FirstName',field: 'frst_nm' , cellClass: "pm-grid-number-cell", width: 150, sortable: true,filter:true },
          { headerName: 'Last Name',field: 'lst_nm' , cellClass: "pm-grid-number-cell", width: 150, sortable: true,filter:true },
          { headerName: 'Status',field: 'sts_nm' ,  cellClass: "pm-grid-number-cell", width: 150, sortable: true,filter:true },
          { headerName: 'CAF NO',field: 'caf_nu' ,  cellClass: "pm-grid-number-cell", width: 150, sortable: true,filter:true },
          { headerName: 'Package',field: 'pckge_nm' ,  cellClass: "pm-grid-number-cell", width: 150, sortable: true,filter:true },
          { headerName: 'Mobile No',field: 'mbl_nu' ,  cellClass: "pm-grid-number-cell", width: 150, sortable: true,filter:true },
          { headerName: 'Aadhar No',field: 'adhr_nu' ,  cellClass: "pm-grid-number-cell", width: 150, sortable: true,filter:true },
          { headerName: 'Activation Date',field: 'actvn_dt' ,  cellClass: "pm-grid-number-cell", width: 150, sortable: true,filter:true},
          { headerName: 'Total Bill',field: 'ttl_bill_cst' ,  cellClass: "pm-grid-number-cell", width: 150, sortable: true,filter:true },
     ];

      }
    }
  })
}
getAddonsFromCAF = (caf_id) => {
  this.secondOne=false;
 console.log(caf_id);
  this.crdsrv.get(`addons/getAddonsFromCAF/${caf_id}`).subscribe((res) => {
    if (res['status'] == 200) {
      this.secondOne=true;
      if (res['data'].length > 0) {
        res['data'].filter((k) => {
          k['expanded'] = false;
          k['isChecked'] = false;
        });
        this.removeAddonPckgs = res['data'];
        console.log(this.removeAddonPckgs);
        var index=0
        for(var k=0; k<this.removeAddonPckgs.length; k++){
          index= index+1;
          this.removeAddonPckgs[k].indx=index
        }
        this.RmvAddonscolumnDefs = [
          { headerName: 'Sno', field: 'indx', algnmnt:"center", cellClass: "pm-grid-number-cell", width: 50,sortable: true,filter: false },
          { headerName: 'Package Name',field: 'pckge_nm' , cellClass: "pm-grid-number-cell", width: 200, sortable: true,filter:true },
          { headerName: 'Charge',field: 'chrge_at' ,  cellClass: "pm-grid-number-cell", width: 200, sortable: true,filter:true },
          { headerName: 'GST',field: 'gst_at' ,  cellClass: "pm-grid-number-cell", width: 200, sortable: true,filter:true },
          { headerName: 'Total',field: 'ttl_cst' ,  cellClass: "pm-grid-number-cell", width: 200, sortable: true,filter:true },
          { headerName: 'Created On',field: 'efcte_dt' ,  cellClass: "pm-grid-number-cell", width: 200, sortable: true,filter:true },
          { headerName: 'Total Channels',field: 'chnls_cnt' ,  cellClass: "pm-grid-number-cell", width: 200, sortable: true,filter:true },
     ];
      }
    
    }
   
  })
}
selectionPckge(pckge){
  console.log(pckge);
this.selectedPckge = pckge.selectedRowsData;
console.log(this.selectedPckge);
}
lstNext(){
  this.nextView=false;
  console.log(this.selectedPckge);
  if(this.selectedPckge){
      this.nextView=true;
  }
  else if(!this.selectedPckge){
    this.nextView=false;
  }
}
deletePackge(){
  console.log(this.selectedPckge);
  console.log(this.dtlsOfRmvCaf);

  if (this.selectedPckge.length > 0) {
    let extrnl_api_srvc_pack_lst = [];
    this.selectedPckge.filter((k) => {
      extrnl_api_srvc_pack_lst.push({
        "servicepack": k.pckge_nm,
        "reason": this.comment
      })
    });

    let extrnl_api_post_json = {
      "subscribercode": this.dtlsOfRmvCaf[0].mdlwe_sbscr_id,
      "servicepacks": extrnl_api_srvc_pack_lst
    }
    let req_body = {
      agntId: this.agnt_id == undefined ? this.dtlsOfRmvCaf[0].lmo_agnt_id?this.dtlsOfRmvCaf[0].lmo_agnt_id:0: this.agnt_id,
      caf_id: this.dtlsOfRmvCaf[0].caf_id,
      pckg_lst: this.selectedPckge,
      extrnl_api_post_json: extrnl_api_post_json
    }
    console.log(req_body);
    // this.crdsrv.create(req_body, 'addons/removeAddons').subscribe((res) => {
    //   if (res['status'] == 200) {
    //     this.snackBar.open('Successfully Addons added', '', {
    //       duration: 2000,
    //       panelClass: ['blue-snackbar'],
    //       horizontalPosition: this.horizontalPosition,
    //       verticalPosition: this.verticalPosition,
    //     });
    //   }
    //   else {
    //     this.snackBar.open("Something Went Wrong ", '', {
    //       duration: 2000,
    //       panelClass: ['red-snackbar'],
    //       horizontalPosition: this.horizontalPosition,
    //       verticalPosition: this.verticalPosition,
    //     });
    //   }

    // })
  }
}
save(){
  let extrnl_api_srvc_pack_lst = [];
  console.log(this.compltwPackages);
  this.compltwPackages.filter((k) => {
    extrnl_api_srvc_pack_lst.push({
      "servicepack": k.pckge_nm,
      "expirydate": k.extrnl_api_expry_dt
    })
  });
  let extrnl_api_post_json = {
    "subscribercode": this.cstmr_caf_cntrl.mdlwe_sbscr_id,
    "servicepacks": extrnl_api_srvc_pack_lst
  }
  let req_body = {
    agntId: this.agnt_id == undefined ? this.cstmrData[0].lmo_agnt_id?this.cstmrData[0].lmo_agnt_id:0: this.agnt_id,
    caf_id: this.cstmr_caf_cntrl.slctd_caf_id,
    pckg_lst: this.compltwPackages,
    extrnl_api_post_json: extrnl_api_post_json
  }
  console.log(req_body)
  this.crdsrv.create(req_body, 'addons/addCafPckgs').subscribe((res) => {
    if (res['status'] == 200) {
      this.snackBar.open('Successfully Addons added', '', {
        duration: 2000,
        panelClass: ['blue-snackbar'],
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      });
    }
    else{
      this.snackBar.open("Something Went Wrong ", '', {
        duration: 2000,
        panelClass: ['red-snackbar'],
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      });
    }
  })
}
}
