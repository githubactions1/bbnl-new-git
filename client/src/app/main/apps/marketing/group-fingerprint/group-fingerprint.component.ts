import { Component, OnInit, ViewChild } from '@angular/core';
import { DsSidebarService } from '@glits/components/sidebar/sidebar.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import * as XLSX from 'xlsx';
import DataSource from 'devextreme/data/data_source';
import { DatePipe } from '@angular/common';
import { DeleteDialogComponent } from 'app/main/shared/components/delete-dialog/delete-dialog.component';
import {
  MatTableDataSource, MatPaginator, MatSort, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition, MatDialogRef, MatSnackBar, MatDialog,
  MAT_DIALOG_DATA,
  MatRadioGroup
} from '@angular/material';
import { CrudService } from 'app/main/apps/crud.service';
import { Router } from '@angular/router';
import { Dataservice } from 'app/main/shared/components/dataService';
import { DxTreeListComponent, DxDataGridComponent } from 'devextreme-angular';
import { TransfereService } from 'app/providers/transfer/transfer.service';
import { ExportService } from 'app/main/services/export.service';
@Component({
  selector: 'app-group-fingerprint',
  templateUrl: './group-fingerprint.component.html',
  styleUrls: ['./group-fingerprint.component.scss']
})
export class GroupFingerprintComponent implements OnInit {
  @ViewChild('radio') radiogroup:MatRadioGroup
  isGlobalMsg: boolean = false
  isGrpMsg: boolean = false;
  districts: any;
  mndl_lst: any;
  showTble = false;
  loader = false;
  columnDefs = [];
  columnDefss = [];
  rowData = [];
  showGroup: boolean = false;
  cafGrpFngrFrm: FormGroup;
  cafFngrFrm: FormGroup;
  cafFngrFrm2: FormGroup;
  cafFngrFrm3: FormGroup;
  GlbTypeMsg: any
  permissions;
  shofrm: any= 'Finger';
  getRowHeight;
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  spnrCtrl = false;
  showBckBtn: any;
  worksheet: XLSX.WorkSheet;
  getHeaderDtls = function () { return { "title": 'Group Finger Print', "icon": "people_outline" } }
  vlge_lst: any;
  msgclrs: any;
  msgfnts: any;
  msgType: any;
  msctgry: any=[];
  msgTypselctd: any=1;
  Tlcafsct={};
  GlblMsg: boolean = false;
  shgrp: boolean = false;
  GlobalMsgType: string = 'GrpMsg';
  isValid: boolean;
  ttlRcds: any;
  fileUploaded: any;
  upldFileNm: any;
  shwrcds: boolean;
  lmoSlctd: boolean;
  storeData: any;
  ExclDta: any[];
  firstFormGroup: FormGroup;
  exceldDatasoure;
  columnDefsRcrd = [];

  currentIndex: any=0;
  loadpanl: boolean;
  distId: any;
  constructor(public _dsSidebarService: DsSidebarService, private _formBuilder: FormBuilder, public excel: ExportService, private datePipe: DatePipe, public dataService: Dataservice, private crdsrv: CrudService, private snackBar: MatSnackBar, ) {
    let rowHeight = 40;
    this.getRowHeight = function (params) {
      return rowHeight;
    };
    // this.permissions = { "slct_in": 1, "insrt_in": 0, "updt_in": 1, "dlte_in": 1, "exprt_in": 1 };
    const permTxt = 'Group Finger Print';
    const prmeRte = `user/permissions/${permTxt}`;
    this.crdsrv.get(prmeRte).subscribe((res) => {
      console.log(res['data'][0]);
      this.permissions = res['data'][0];
    });
  }

  ngOnInit() {
    this.onLinkClick(0)
    this.cafGrpFngrFrm = this._formBuilder.group({
      dstrc_id: [''],
      mndl_id: [''],
      vlge_id: [''],


    });


    this.cafFngrFrm = this._formBuilder.group({
      postn: ['', [Validators.required]],
      ex_dt: ['', [Validators.required]],
      fnt_typ: ['', [Validators.required]],
      fnt_sz: ['', [Validators.required]],
      fnt_clr: ['', [Validators.required]],
      dur: ['', [Validators.required]],
      fng_typ: ['', [Validators.required]],
      chnl: ['', [Validators.required]],
      bg_clr: ['', [Validators.required]],


    });

    this.firstFormGroup = this._formBuilder.group({
      postn: ['', [Validators.required]],
      ex_dt: ['', Validators.required],
      msg: ['', Validators],
      dur: ['', Validators.required],
      usrmsgcls: ['', Validators.required],
      lmo_id: [''],
      msgtyp: ['', Validators.required],
      fnt_typ: ['', [Validators.required]],
      fnt_sz: ['', [Validators.required]],
      fnt_clr: ['', [Validators.required]],
      bg_clr: ['', [Validators.required]],
    })
    this.cafFngrFrm2 = this._formBuilder.group({
      postn: ['', [Validators.required]],
      ex_dt: ['', [Validators.required]],
      fnt_typ: ['', [Validators.required]],
      fnt_sz: ['', [Validators.required]],
      fnt_clr: ['', [Validators.required]],
      dur: ['', [Validators.required]],
      bg_clr: ['', [Validators.required]],
      msg: ['', [Validators.required]],
      sub_cd: [''],
      usrmsgcls: ['', [Validators.required]],
      msgtyp: ['', [Validators.required]]
    });
    this.cafFngrFrm3 = this._formBuilder.group({
      msgtyp: ['', [Validators.required]],
      ex_dt: ['', [Validators.required]],
      msg: ['', [Validators.required]],
      dur: ['', [Validators.required]],
    });

    this.getDistricts()
  }

  getDistricts() {

    this.crdsrv.get("agent/dstrctList").subscribe(res => {
      console.log(res)
      this.districts = res['data']

    })
  }


  getMandals(id) {
    console.log(id);
    this.distId = id;
    console.log("in 1")
    // this.districtId = this.firstFormGroup.value.instl_district;
    const rte = `agent/mandalList/${id}`;
    this.crdsrv.get(rte).subscribe((res) => {
      this.mndl_lst = res['data'];
      console.log(this.mndl_lst)
    })




  }


  getvillages(id) {
    console.log(id);

    const rte = `user/getvlgs/${id}/${this.distId}`;
    this.crdsrv.get(rte).subscribe((res) => {
      this.vlge_lst = res['data'];
      console.log(this.vlge_lst)

    });


  }

  serch(frmdata) {
    console.log(frmdata)
    if (frmdata.dstrc_id  || frmdata.mndl_id  || frmdata.vlge_id ) {
      this.showTble = true
      this.shgrp = true
      this.msgTypselctd=1;
      this.shofrm= 'Finger';
      this.getcustomer(frmdata)
      this.getFntLst()
    } else {
      this.snackBar.open("Please Select at least district", '', {
        duration: 2000,
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      })
    }


  }
  selectedPageIndex(event) {
    console.log(event)
    this.currentIndex = event.index;
    this.showTble = false
    this.shofrm = ''
    if(event.index==0){
      this.shofrm = 'Finger'
      this.getFntLst()
      this.firstFormGroup.reset()
      this.msgTypselctd = 1
      this.ExclDta = []
      this.cafFngrFrm.reset()
    }
    if (event.index == 2) {
      this.msgTypselctd = 2
      this.rowData = []
      this.cafGrpFngrFrm.reset()
    } else if (event.index == 1) {
      this.ExclDta = []
      this.firstFormGroup.reset()
     
    }

  }

  onLinkClick(data) {
    console.log(data)
    if (data == 0) {
      this.isGrpMsg = false;
      this.isGlobalMsg = true;
      this.showGroup = false
      this.showTble = false
      this.crdsrv.get('caf/CafCt').subscribe(res => {
        console.log(res)
        if (res['data'].length > 0) {
          this.Tlcafsct = res['data'][0]
          console.log(this.Tlcafsct)
          this.GlblMsg = true
          this.getFntLst()
          this.shgrp = true
          this.GlobalMsgType = 'GrpMsg'
        }

      })



    } else if (data == 2) {
      // this.GlblMsg=false
      //  this.showGroup=true
      this.isGrpMsg = true;
      this.GlobalMsgType = 'GrpMsg'
      this.isGlobalMsg = false;

    }


    console.log(data)

  }
  downloadtemplate() {

    this.exceldDatasoure = [
      {
        "LMO Code*": "LMO18966",

      }];
    this.excel.exportAsExcelFile(this.exceldDatasoure, 'Lmo_codes');
  }
  uploadedFile(event) {
    console.log("Called")
    this.fileUploaded = event.target.files[0];
    this.upldFileNm = this.fileUploaded.name;
    this.readExcel();
    this.shwrcds = true;
  }
  readExcel() {
    this.isValid = true;
    let readFile = new FileReader();
    readFile.onload = (e) => {
      this.storeData = readFile.result;
      let data = new Uint8Array(this.storeData)
      let arr = new Array();
      for (let i = 0; i != data.length; ++i) { arr[i] = String.fromCharCode(data[i]); }
      let bstr = arr.join("");
      let workbook = XLSX.read(bstr, {
        type: "binary", cellDates: true,
        cellNF: false,
        cellText: false
      });
      let first_sheet_name = workbook.SheetNames[0];
      this.worksheet = workbook.Sheets[first_sheet_name];
      this.ExclDta = XLSX.utils.sheet_to_json(this.worksheet, { raw: true });
      console.log(this.ExclDta)
      this.columnDefsRcrd = [
        { headerName: 'LMO Code*', field: 'LMO Code*', cellStyle: { 'text-align': "center" }, cellClass: "pm-grid-number-cell", width: 60, height: 40 },
      ]
      if (this.ExclDta.length == 0) { this.isValid = false; }
      this.ttlRcds = this.ExclDta.length;
      this.isValid = true;
      // this.exclGrid = true;
      // for (let i = 0; i < this.ExclDta.length; i++) {
      //   console.log(typeof this.ExclDta[i]["LMO Code*"])
      //   if (typeof this.ExclDta[i]["APSFL Code*"] !== 'number'

      //    ) {
      //     this.isValid = false;
      //     break;
      //   } else {
      //     this.isValid = true;
      //   }

      // }
    };
    readFile.readAsArrayBuffer(this.fileUploaded);
  }
  getcustomer(data) {
    this.spnrCtrl = true;
    console.log("hiiii");
    const rte = `caf/Grpfngcaf`;
    this.loadpanl=true
    this.crdsrv.create(data, rte).subscribe((res) => {
      console.log(res['data']);
      
      this.rowData = res['data'];
      if(this.rowData){
        this.loadpanl=false
      }
      this.columnDefs = [
        { headerName: 'Sno', field: 'sno', cellStyle: { 'text-align': "center" }, cellClass: "pm-grid-number-cell", width: 100, filter: false, search: false },
        { headerName: 'CAFNO', field: 'caf_nu', cellStyle: { 'text-align': "center" }, cellClass: "pm-grid-number-cell", width: 100, filter: false, search: false },
        { headerName: 'First Name', field: 'frst_nm', cellStyle: { 'text-align': "left" }, cellClass: "pm-grid-number-cell", width: 250, filter: true },
        { headerName: 'CAF DATE', field: 'actvn_dt', cellStyle: { 'text-align': "center" }, cellClass: "pm-grid-number-cell", width: 100, filter: false, search: false },
        { headerName: 'Aadhaar Number', field: 'adhr_nu', cellStyle: { 'text-align': "left" }, cellClass: "pm-grid-number-cell", width: 150, filter: true },
        { headerName: 'Iptv Mac Address', field: 'caf_mac_addr_tx', cellStyle: { 'text-align': "left" }, cellClass: "pm-grid-number-cell", width: 150, filter: true },
        { headerName: 'Subscriber Code', field: 'mdlwe_sbscr_id', cellStyle: { 'text-align': "left" }, cellClass: "pm-grid-number-cell", width: 150, filter: true },

      ];

    }, (error) => {
      //console.log(error);
    });
  }

  getFntLst() {
    this.crdsrv.get('caf/getfnts').subscribe(res => {
      this.msgclrs = res['data']['clrData']
      this.msgfnts = res['data']['fntData']
      this.msgType = res['data']['msgTyp']
      this.msctgry = res['data']['msctgry']
      // for(var i=0;i<this.msctgry.length;i++){
      //   if(this.msctgry[i].msgs_ctgry_id==1){
      //     this.msctgry['source'].checked=true
      //   }
      // }
      console.log(res['data'])
    })
  }


  send(frmdat) {
    this.loader = true;
    var commdtype
    var subscribercds = []
    var caf_id = []
    var Fngdata
    var Osddata
    var scrldata
    var franchiseCds = []
    // var selectdta = this.getSelectedData()
    frmdat.value['ex_dt'] = this.datePipe.transform(frmdat.value.ex_dt, 'yyyy-MM-dd');
    this.msctgry.filter(k => {
      if (k.msgs_ctgry_id == this.msgTypselctd) {
        commdtype = k.msgs_ctgry_nm
      }
    })

    for (var i = 0; i < this.rowData.length; i++) {
      if (this.rowData[i].mdlwe_sbscr_id != null) {

        subscribercds.push(this.rowData[i].mdlwe_sbscr_id)
        caf_id.push(this.rowData[i].caf_id)

      }

    }

    console.log(subscribercds, caf_id)
    if (this.msgTypselctd == 1 && frmdat.valid) {
      Fngdata = {
        module: "DRM",
        GlobalMsg: this.GlobalMsgType,
        command: commdtype,
        msgcat: this.msgTypselctd,
        cafid: caf_id,
        subscribercds: subscribercds,
        position: frmdat.value.postn,
        fontTypeId: frmdat.value.fnt_typ,
        fontType: this.msgfnts[frmdat.value.fnt_typ - 1].fnt_nm,
        fontSize: frmdat.value.fnt_sz,
        Fingertype: frmdat.value.fng_typ,
        channel: frmdat.value.chnl,
        fontColorId: frmdat.value.fnt_clr,
        fontColor: this.msgclrs[frmdat.value.fnt_clr - 1].clr_cd,
        bgColorId: frmdat.value.bg_clr,
        bgColor: this.msgclrs[frmdat.value.bg_clr - 1].clr_cd,
        duration: frmdat.value.dur,
        dstr_id: this.cafGrpFngrFrm.value.dstrc_id,
        mndl_id: this.cafGrpFngrFrm.value.mndl_id,
        vlg_id: this.cafGrpFngrFrm.value.vlge_id,
        expiryDate: frmdat.value.ex_dt
      }
      console.log(Fngdata)
      this.crdsrv.create(Fngdata, "caf/sndMsg").subscribe((res) => {
        console.log(res)
        this.loader = false;
        if (res["status"] >= 200) {
         
          this.snackBar.open("Sucessfully Sent", '', {
            duration: 2000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
          })
        } else {
          this.snackBar.open("UnSucessfully Sent", '', {
            duration: 2000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
          })
        }
      })
    }
    if (this.msgTypselctd == 2 && frmdat.valid) {

      console.log(this.msgfnts[frmdat.value.fnt_typ - 1].fnt_nm)
      console.log(frmdat.get('lmo_id'))
      if (this.ExclDta) {
        for (i = 0; i < this.ExclDta.length; i++) {
          franchiseCds.push(this.ExclDta[i]["LMO Code*"])
        }

      }
      if (frmdat.value.lmo_id) {
        console.log(frmdat.get('lmo_id') )
        var data = frmdat.value.lmo_id.split(",")
        for (var i = 0; i < data.length; i++) {
          franchiseCds.push(data[i])
        }
        console.log(franchiseCds)
      }

      if (frmdat.value.sub_cd) {
        var sb_cd = frmdat.value.sub_cd.split(',')
        for (var i = 0; i < sb_cd.length; i++) {
          subscribercds.push(sb_cd[i])
        }
      console.log(subscribercds)
      }

console.log(this.currentIndex )
     
      if (this.currentIndex == 2 ) {
        if (subscribercds.length > 0 || franchiseCds.length > 0) {

          Osddata = {
            module: "DRM",
            GlobalMsg: this.GlobalMsgType,
            command: commdtype,
            msgcat: this.msgTypselctd,
            cafid: caf_id,
            franchisecds: franchiseCds,
            subscriberCodes: subscribercds,
            position: frmdat.value.postn,
            fontTypeId: frmdat.value.fnt_typ,
            fontType: this.msgfnts[frmdat.value.fnt_typ - 1].fnt_nm,
            fontSize: frmdat.value.fnt_sz,
            fontColorId: frmdat.value.fnt_clr,
            fontColor: this.msgclrs[frmdat.value.fnt_clr - 1].clr_cd,
            msgtype: frmdat.value.msgtyp,
            bgColorId: frmdat.value.bg_clr,
            bgColor: this.msgclrs[frmdat.value.bg_clr - 1].clr_cd,
            duration: frmdat.value.dur,
            message: frmdat.value.msg,
            dstr_id: this.cafGrpFngrFrm.value.dstrc_id,
            mndl_id: this.cafGrpFngrFrm.value.mndl_id,
            vlg_id: this.cafGrpFngrFrm.value.vlge_id,
            userCanCloseMessage: ((frmdat.value.usrmsgcls == 1) ? true : false),
            expiryDate: frmdat.value.ex_dt
          }
          console.log(Osddata)
         this.crdsrv.create(Osddata, "caf/sndMsg").subscribe((res) => {
            console.log(res)
            this.loader = false;
            if (res["status"] == 200) {
              this.snackBar.open("Sucessfully Sent", '', {
                duration: 2000,
                horizontalPosition: this.horizontalPosition,
                verticalPosition: this.verticalPosition,
              })
            } else {
              this.snackBar.open("UnSucessfully Sent", '', {
                duration: 2000,
                horizontalPosition: this.horizontalPosition,
                verticalPosition: this.verticalPosition,
              })
            }
         })
        } else {
          this.snackBar.open("LMO Codes Required", '', {
            duration: 2000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
          })
        }
      } else {
        Osddata = {
          module: "DRM",
          GlobalMsg: this.GlobalMsgType,
          command: commdtype,
          msgcat: this.msgTypselctd,
          cafid: caf_id,
          franchisecds: franchiseCds,
          subscriberCodes: subscribercds,
          position: frmdat.value.postn,
          fontTypeId: frmdat.value.fnt_typ,
          fontType: this.msgfnts[frmdat.value.fnt_typ - 1].fnt_nm,
          fontSize: frmdat.value.fnt_sz,
          fontColorId: frmdat.value.fnt_clr,
          fontColor: this.msgclrs[frmdat.value.fnt_clr - 1].clr_cd,
          msgtype: frmdat.value.msgtyp,
          bgColorId: frmdat.value.bg_clr,
          bgColor: this.msgclrs[frmdat.value.bg_clr - 1].clr_cd,
          duration: frmdat.value.dur,
          message: frmdat.value.msg,
          dstr_id: this.cafGrpFngrFrm.value.dstrc_id,
          mndl_id: this.cafGrpFngrFrm.value.mndl_id,
          vlg_id: this.cafGrpFngrFrm.value.vlge_id,
          userCanCloseMessage: ((frmdat.value.usrmsgcls == 1) ? true : false),
          expiryDate: frmdat.value.ex_dt
        }
        console.log(Osddata)
        this.crdsrv.create(Osddata, "caf/sndMsg").subscribe((res) => {
          console.log(res)
          this.loader = false;
          if (res["status"] == 200) {
            this.snackBar.open("Sucessfully Sent", '', {
              duration: 2000,
              horizontalPosition: this.horizontalPosition,
              verticalPosition: this.verticalPosition,
            })
          } else {
            this.snackBar.open("UnSucessfully Sent", '', {
              duration: 2000,
              horizontalPosition: this.horizontalPosition,
              verticalPosition: this.verticalPosition,
            })
          }
        })
      }
    }
    if (this.msgTypselctd == 3 && frmdat.valid) {

      scrldata = {
        module: "DRM",
        command: commdtype,
        GlobalMsg: this.GlobalMsgType,
        msgcat: this.msgTypselctd,
        cafid: caf_id,
        dstr_id: this.cafGrpFngrFrm.value.dstrc_id,
        mndl_id: this.cafGrpFngrFrm.value.mndl_id,
        vlg_id: this.cafGrpFngrFrm.value.vlge_id,
        subscribercds: subscribercds,
        msgtype: frmdat.value.msgtyp,
        duration: frmdat.value.dur,
        message: frmdat.value.msg,
        expiryDate: frmdat.value.ex_dt
      }

      console.log(scrldata)
      this.crdsrv.create(scrldata, "caf/sndMsg").subscribe((res) => {
        this.loader = false;
        console.log(res)
        if (res["status"] >= 200) {
          this.snackBar.open("Sucessfully Sent", '', {
            duration: 2000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
          })
        } else {
          this.snackBar.open("UnSucessfully Sent", '', {
            duration: 2000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
          })
        }
      })

    }
    console.log(frmdat)



  }


  Reset(Form) {
    console.log(Form)
    if(Form.value.dstrc_id){
      this.shofrm = ''
    }
    this.showTble = false
    
    Form.reset()
  }





  inputslct(r,event) {
    console.log(event)
    if (r == 1) {
      this.msgTypselctd = r
      this.shofrm = 'Finger'
      console.log("hi")
      this.cafFngrFrm2.reset()
      this.cafFngrFrm3.reset()



    } else if (r == 2) {

      this.msgTypselctd = r
      this.shofrm = 'OSD'
      console.log("hii")
      this.cafFngrFrm.reset()
      this.cafFngrFrm3.reset()

    } else if (r == 3) {
      this.msgTypselctd = r
      this.shofrm = 'Scroll'
      console.log("hiii")
      this.cafFngrFrm2.reset()
      this.cafFngrFrm.reset()

    }


    console.log(r)
  }

}
