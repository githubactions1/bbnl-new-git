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
import {
  MatTableDataSource, MatPaginator, MatSort, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition, MatDialogRef, MatSnackBar, MatDialog,
  MAT_DIALOG_DATA
} from '@angular/material';
import { bool } from 'aws-sdk/clients/signer';


interface Enti {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-cafnew',
  templateUrl: './cafnew.component.html',
  styleUrls: ['./cafnew.component.scss']
})
export class CafnewComponent implements OnInit {
  cafupdfrm: FormGroup;
  // horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  // verticalPosition: MatSnackBarVerticalPosition = 'top';

  boxchngtyp = []

  caf_num
  sbscr_cd
  cafstslst = []
  cafdata = []
  msgin: boolean;
  nocafdtls: boolean;
  message;
  message1;
  showdata: boolean;
  loader: boolean;
  getHeaderDtls = function () { return { "title": "Curl Operation", "icon": "receipt" } }
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

  repng123: boolean = false;
  repng234: boolean = false;
  repng345: boolean = false;
  repng456: boolean = false;

  suspnd123: boolean = false;
  suspnd234: boolean = false;
  suspnd345: boolean = false;
  suspnd456: boolean = false;

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
  ponadd891: boolean = false;

  pendend: boolean = false;
  click: boolean = true;

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
  curlRslts: any = [];
  cafstsshow: any;

  extapifrm: FormGroup;
  entitylst: any;
  rowData: any;
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  searchLoader: boolean = false;
  columnDefs = [];
  showTble = false;
  actionlst: any;
  statuslst: any;
  getRowHeight;
  permissions
  newString: string;



  entities: Enti[] = [
    { value: '1', viewValue: 'CAF' },
    { value: '2', viewValue: 'MSO/LMO/LCO' },
  ];
  curldata: any;
  addservicedata: any;
  shwLdr: boolean;
  //mdlwre_cd: string;

  constructor(private _dsSidebarService: DsSidebarService, public crdsrv: CrudService, public atmSrv: AtomService, public dialog: MatDialog, public fb: FormBuilder, public datePipe: DatePipe, public snackBar: MatSnackBar, private _formBuilder: FormBuilder, public _snackBar: MatSnackBar) { }

  ngOnInit() {
    // let namePattern = /^[a-zA-Z \s]+$/;
    // let cardPattern = /^\d\.\d{0,2}$/;
    // let ipad = /^([0-9]{1,3})\.([0-9]{1,3})\.([0-9]{1,3})\.([0-9]{1,3})$/;
    //let numberPattern = ;
    this.getcafsts();
    this.msgin = true;
    this.nocafdtls = false;
    this.showdata = false;
    this.message = 'Please Enter CAF Number or Subscriber Code To Get Details';
    this.cafupdfrm = this.fb.group({
      aaa_cd: new FormControl(''),
      agora_cd: new FormControl(''),
      aga_cd: new FormControl(''),
      mdlwre_cd: new FormControl(''),
      enty_sts_id: new FormControl(''),
      onu_srl_nu: new FormControl(''),
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


      service_pack: ['', [Validators.required]],
      ip_adr: ['', [Validators.required]],
      crd: ['', [Validators.required]],
      pon: ['', Validators.required],
      onu: ['', Validators.required],
      iptv_mac_new: ['', [Validators.required]],
      lst_nm: ['', [Validators.required]],
      cstmr_nm: ['', [Validators.required]],
      caf_nu: ['', [Validators.required]],
      up_stream: ['', [Validators.required]],
      olt_crd_nu: ['', [Validators.required]],
      olt_onu_id: ['', [Validators.required]],
      down_stream: ['', [Validators.required]],
      de_lte: ['', [Validators.required]],
      expry_date: ['', [Validators.required]],

    });

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
    this.msgin = false;
    this.nocafdtls = false;
    this.loader = true;
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
          } else {
            this.cafupdfrm.get('enty_sts_id').enable();
            this.cafstsshow = "enabled"
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
          let agoracd = this.cafdata[0].aghra_cd;
          const agarr = agoracd.split("-H");
          agoracd = agarr[0];

          this.cafupdfrm.disable();
          this.cafupdfrm.get('aaa_cd').setValue(this.cafdata[0].aaa_cd);
          this.cafupdfrm.get('agora_cd').setValue(this.cafdata[0].aghra_cd);
          this.cafupdfrm.get('aga_cd').setValue(agoracd);
          this.cafupdfrm.get('mdlwre_cd').setValue(this.cafdata[0].mdlwe_sbscr_id);
          this.cafupdfrm.get('enty_sts_id').setValue(this.cafdata[0].enty_sts_id);
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
          this.cafupdfrm.get('lst_nm').setValue(this.cafdata[0].lst_nm);
          this.cafupdfrm.get('cstmr_nm').setValue(this.cafdata[0].cstmr_nm);
          this.cafupdfrm.get('caf_nu').setValue(this.cafdata[0].caf_nu);
          this.cafupdfrm.get('up_stream').setValue(this.cafdata[0].up_stream);
          this.cafupdfrm.get('down_stream').setValue(this.cafdata[0].down_stream);
          this.cafupdfrm.get('olt_crd_nu').setValue(this.cafdata[0].olt_crd_nu);
          this.cafupdfrm.get('olt_onu_id').setValue(this.cafdata[0].olt_onu_id);
          this.cafupdfrm.get('pon').setValue(this.cafdata[0].pon);
          this.cafupdfrm.get('de_lte').setValue(this.cafdata[0].de_lte);
          this.cafupdfrm.get('expry_date').setValue(this.cafdata[0].expry_date);


          if (this.cafdata[0].onu_srl_nu.startsWith('DSNW')) {
            this.cafupdfrm.get('agora_srl_nu').setValue(this.cafdata[0].onu_srl_nu.replace('DSNW', '44534E57'));
          } else if (this.cafdata[0].onu_srl_nu.startsWith('ZTEG')) {
            this.cafupdfrm.get('agora_srl_nu').setValue(this.cafdata[0].onu_srl_nu.replace('ZTEG', '5A544547'));

          } else if (this.cafdata[0].onu_srl_nu.startsWith('YGE1')) {
            console.log("YAGA")
            this.cafupdfrm.get('agora_srl_nu').setValue(this.cafdata[0].onu_srl_nu.replace('YGE1', '59474531'));

          } else if (this.cafdata[0].onu_srl_nu.startsWith('KONK')) {
            this.cafupdfrm.get('agora_srl_nu').setValue(this.cafdata[0].onu_srl_nu.replace('KONK', '4B4F4E4B'));
          } else {
            this.cafupdfrm.get('agora_srl_nu').setValue(this.cafdata[0].onu_srl_nu)
          }
          // console.log(this.cafupdfrm.value.agora_srl_nu)
        }
        else {
          this.loader = false;
          this.showdata = false;
          this.msgin = false;
          this.nocafdtls = true;
          this.message1 = "CAF Details Not Availble"
        }

      }
    }, (error) => {
    });
  }
  edit() {
    this.cafupdfrm.enable()
    this.spsndDisable = false;
    this.trmndDisable = false;
    this.actvDisable = false;
    this.edibtnenble = true;
    this.pendend = true;
    this.boxenb = true;
    this.updateBtn = true;
  }

  cancel() {
    this.cafupdfrm.reset()
    this.caf_num = ''
    this.sbscr_cd = ''
    this.msgin = true;
    this.nocafdtls = false;
    this.showdata = false;
    this.edibtnenble = false;
    this.spsndDisable = true;
    this.trmndDisable = true;
    this.actvDisable = true;
    this.pendend = false;
    this.boxenb = false;
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
    }
    else {
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
      //  console.log(res['data'])
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
  PenAct1() {
    this.cafupdfrm.enable()
    this.pndg234 = true;
    this.edibtnenble = true;
    this.click = !this.click;

    let data = {
      "enty_id": 1,
      "actn_id": 1,
      "commands": "curl -XPOST -H" + " 'Authorization" + ': ' + "Basic YnNzOkJzc0AxMjM=' -H " + '"Content-type' + ': ' + 'application/json" -d' + "'{" + '"aid"' + ':' + '{' + '"ipAddress"' + ':' + '"' + this.cafupdfrm.value.ip_adr + '"' + ',' + '"card"' + ':' + this.cafupdfrm.value.olt_crd_nu + ',' + '"tp"' + ':' + this.cafupdfrm.value.pon + ',' + '"onuId"' + ':' + this.cafupdfrm.value.olt_onu_id + '}' + ',' + '"admin"' + ':' + '"1"' + ',' + '"fec"' + ':' + '"true"' + ',' + '"swUpgradeMode"' + ':' + '"2"' + ',' + '"serialNumber"' + ':' + '"' + this.cafupdfrm.value.agora_srl_nu + '"' + ',' + '"profileName"' + ':' + '"' + this.cafupdfrm.value.onu_mdle_cd + '"' + ',' + '"registerType"' + ':' + '"1"' + ',' + '"name"' + ':' + '"' + this.cafupdfrm.value.lst_nm + this.cafupdfrm.value.cstmr_nm + ' - ' + this.cafupdfrm.value.caf_nu + '"' + "}'" + " 'http://172.16.0.44:8080/agorang/rest/v1/eml/onu'",
      "actn_nm": "PENDING ACTIVATION",
    };
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

  PenAct2() {
    this.cafupdfrm.enable()
    this.pndg345 = true;
    this.edibtnenble = true;
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




  PenAct3() {
    this.cafupdfrm.enable()
    this.pndg567 = true;
    this.edibtnenble = true;
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
    this.pndg678 = true;
    this.edibtnenble = true;
    let data = {
      "enty_id": 1,
      "actn_id": 1,
      "actn_nm": "PENDING ACTIVATION",
      "commands": "curl -XPUT -H" + " 'Authorization" + ':' + " Basic YnNzOkJzc0AxMjM=' -H" + ' "Content-type' + ':' + ' application/json" -d' + "'{" + '"admin"' + ':' + "0" + ',' + '"name"' + ':' + '"IPTV"' + "}'" + " 'http://172.16.0.44:8080/agorang/rest/v1/eml/clientservicegpon/172.16.238.29-1-10-24-HSI/multicastpackage'",
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


  PenAct5() {
    this.cafupdfrm.enable()
    this.pndg789 = true;
    this.edibtnenble = true;
    this.click = !this.click;

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


  PenAct6() {
    this.cafupdfrm.enable()
    this.pndg891 = true;
    this.edibtnenble = true;
    this.click = !this.click;
    let data = {
      "enty_id": 1,
      "actn_id": 1,
      "actn_nm": "PENDING ACTIVATION",
      "commands": "curl -XGET -H" + ' "Content-type: application/json"' + " 'http://172.16.4.107/prov4serv/prov_if?oper" + '=' + this.cafupdfrm.value.de_lte + '&' + "client" + '=' + this.cafupdfrm.value.aaa_cd + "'",

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
    this.edibtnenble = true;
    //this.updateBtn = true;
    this.click = !this.click;
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



  

  ponchng1() {
    this.cafupdfrm.enable()
    this.ponchg123 = true;
    this.edibtnenble = true;
    this.click = !this.click;
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



  ponchng2() {
    this.cafupdfrm.enable()
    this.ponchg234 = true;
    this.edibtnenble = true;
    this.click = !this.click;
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


  ponchng3() {
    this.cafupdfrm.enable()
    this.ponchg345 = true;
    this.edibtnenble = true;
    this.click = !this.click;
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


  ponchng4() {
    this.edibtnenble = true;
    //this.updateBtn = true;
    this.click = !this.click;
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



  PonAdd1() {
    this.cafupdfrm.enable()
    this.ponadd234 = true;
    this.edibtnenble = true;
    this.click = !this.click;

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
    this.cafupdfrm.enable()
    this.ponadd345 = true;
    this.edibtnenble = true;
    let data = {
      "enty_id": 1,
      "actn_id": 1,
      "actn_nm": "PON CHANGE",
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




  PonAdd3() {
    this.cafupdfrm.enable()
    this.ponadd567 = true;
    this.edibtnenble = true;
    let data = {
      "enty_id": 1,
      "actn_id": 1,
      "actn_nm": "PON CHANGE",
      "commands": "curl -XPOST -H" + " 'Authorization" + ':' + " Basic YnNzOkJzc0AxMjM=' -H " + '"Content-type' + ':' + ' application/json" -d' + "'{" + '"aid"' + ':' + '{' + '"ipAddress"' + ':' + '"' + this.cafupdfrm.value.ip_adr + '"' + ',' + '"card"' + ':' + this.cafupdfrm.value.olt_crd_nu + ',' + '"tp"' + ':' + this.cafupdfrm.value.pon + ',' + '"onuId"' + ':' + this.cafupdfrm.value.olt_onu_id + '}' + ',' + '"tps"' + ':' + '[{' + '"card"' + ':' + '"1"' + ',' + '"tps"' + ':' + '["2"]' + '}]' + ',' + '"admin"' + ':' + '"1"' + ',' + '"networkServiceName"' + ':' + '"IPTV"' + ',' + '"name"' + ':' + '"IPTV"' + ',' + '"nativeVlan"' + ':' + 'false' + "}'" + " 'http://172.16.0.44:8080/agorang/rest/v1/eml/clientservicegpon'",
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


  PonAdd4() {
    this.cafupdfrm.enable()
    this.ponadd678 = true;
    this.edibtnenble = true;
    let data = {
      "enty_id": 1,
      "actn_id": 1,
      "actn_nm": "PON CHANGE",
      "commands": "curl -XPUT -H" + " 'Authorization" + ':' + " Basic YnNzOkJzc0AxMjM=' -H" + ' "Content-type' + ':' + ' application/json" -d' + "'{" + '"admin"' + ':' + "0" + ',' + '"name"' + ':' + '"IPTV"' + "}'" + " 'http://172.16.0.44:8080/agorang/rest/v1/eml/clientservicegpon/172.16.238.29-1-10-24-HSI/multicastpackage'",
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


  PonAdd5() {
    this.cafupdfrm.enable()
    this.ponadd789 = true;
    this.edibtnenble = true;
    this.click = !this.click;

    let data = {
      "enty_id": 1,
      "actn_id": 1,
      "actn_nm": "PON CHANGE",
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


  PonAdd6() {
    this.cafupdfrm.enable()
    this.ponadd891 = true;
    this.edibtnenble = true;
    this.click = !this.click;
    let data = {
      "enty_id": 1,
      "actn_id": 1,
      "actn_nm": "PON CHANGE",
      "commands": "curl -XGET -H" + ' "Content-type: application/json"' + " 'http://172.16.4.107/prov4serv/prov_if?oper" + '=' + this.cafupdfrm.value.de_lte + '&' + "client" + '=' + this.cafupdfrm.value.aaa_cd + "'",

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

  PonAdd7() {
    this.edibtnenble = true;
    //this.updateBtn = true;
    this.click = !this.click;
    let data = {
      "enty_id": 1,
      "actn_id": 1,
      "actn_nm": "PON CHANGE",
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


  boxchange1() {
    this.cafupdfrm.enable()
    this.edibtnenble = true;
    this.boxenb2 = true;
    this.click = !this.click;
    let data = {
      enty_id: 1,
      actn_id: 1,
      actn_nm: "Box Change",
      commands: "curl -XPUT -H" + ' "Authorization' + ':' + ' Basic YnNzOkJzc0AxMjM=" -H' + ' "Content-type' + ':' + ' application/json"' + " -d " + "'{" + '"serialNumber"' + ':' + '"' + this.cafupdfrm.value.agora_srl_nu + '"' + ',' + '"registerType"' + ':' + '"1"' + ',' + '"aid"' + ':' + '{' + '"ipAddress"' + ':' + '"' + this.cafupdfrm.value.ip_adr + '"' + ',' + '"card"' + ':' + this.cafupdfrm.value.olt_crd_nu + ',' + '"tp"' + ':' + this.cafupdfrm.value.pon + ',' + '"onuId"' + ':' + this.cafupdfrm.value.olt_onu_id + ',' + '"type"' + ':' + '10023' + '}' + ',' + '"id"' + ':' + '"' + this.cafupdfrm.value.ip_adr + '-' + this.cafupdfrm.value.olt_crd_nu + '-' + this.cafupdfrm.value.pon + '-' + this.cafupdfrm.value.olt_onu_id + '"' + "}' " + 'http://172.16.0.44:8080/agorang/rest/v1/eml/onu/172.16.240.155-1-10-19',
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




  boxchange2() {
    this.edibtnenble = true;
    //this.updateBtn = true;
    this.click = !this.click;
    let data = {
      enty_id: 1,
      actn_id: 1,
      actn_nm: "Box Change",
      //curl -XPOST -H 'username: teraadmin' -H 'apikey: 6ed73c1a-7817-49ab-b185-981f97cf5fd8' -H "Content-type: application/json" -d '{"subscriberCode":"CHI798216","oldDevice":"00:0A:BC:D0:17:01","newDevice":"C4:2A:FE:19:46:35"}' 'http://iptv.apsfl.co.in:8080/appserver/rest/iptv/replaceDevice'
      commands: "curl -XPOST -H" + " 'username" + ':' + " teraadmin' -H" + " 'apikey" + ':' + " 6ed73c1a-7817-49ab-b185-981f97cf5fd8' -H" + ' "Content-type' + ':' + ' application/json"' + " -d" + " '{" + '"subscriberCode"' + ':' + '"' + this.cafupdfrm.value.mdlwre_cd + '"' + ',' + '"oldDevice"' + ':' + '"' + this.cafupdfrm.value.iptv_mac_addr + '"' + ',' + '"newDevice"' + ':' + '"' + this.cafupdfrm.value.iptv_mac_new + '"' + "}'" + " 'http://iptv.apsfl.co.in:8080/appserver/rest/iptv/replaceDevice'",
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




  Resume1() {
    this.cafupdfrm.enable()
    this.repng123 = true;
    this.edibtnenble = true;
    this.click = !this.click;
    let data = {
      "enty_id": 1,
      "actn_id": 1,
      "actn_nm": "Resume Pending",
      "commands": "curl -XGET -H" + ' "Content-type: application/json"' + " 'http://172.16.4.107/prov4serv/prov_if?oper" + '=' + this.cafupdfrm.value.de_lte + '&' + "client" + '=' + this.cafupdfrm.value.aaa_cd + "'",

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


  Resume2() {
    this.cafupdfrm.enable()
    this.repng234 = true;    
    this.edibtnenble = true;
    this.click = !this.click;

    let data = {
      "enty_id": 1,
      "actn_id": 1,
      "actn_nm": "Resume Pending",
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


  Resume3() {
    this.cafupdfrm.enable()
    this.repng345 = true;
    this.edibtnenble = true;
    this.click = !this.click;

    let data = {
      "enty_id": 1,
      "actn_id": 1,
      "actn_nm": "Resume Pending",
      "commands": "curl -XGET -H" + ' "Content-type' + ':' + ' application/json"' + " 'http://172.16.4.104:8080/radiusISU?code=Change-Filter-Request&Client" + '=' + this.cafupdfrm.value.aaa_cd + '&cisco-avpair' + '=' + "subscriber:sd=" + this.cafupdfrm.value.up_stream + ',' + " subscriber:sa=" + this.cafupdfrm.value.down_stream + "'",
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



  Resume4() {
    this.cafupdfrm.enable()    
    this.edibtnenble = true;
    this.click = !this.click;
    let data = {
      "enty_id": 1,
      "actn_id": 1,
      "actn_nm": "Resume Pending",
      "commands": "curl -XPOST -H" + ' "username' + ':' + ' teraadmin" -H "apikey' + ':' + ' 6ed73c1a-7817-49ab-b185-981f97cf5fd8" -H' + ' "Content-type' + ':' + ' application/json" -d' + " '{" + '"subscribercode"' + ':' + '"' + this.cafupdfrm.value.mdlwre_cd + '"' + ',' + '"servicepacks"' + ':' + '[{' + '"servicepack"' + ':' + '"' + this.cafupdfrm.value.service_pack + '"' + ',' + '"expirydate"' + ':' + '"' + this.cafupdfrm.value.expry_date + '"' + '}]}' + "'" + " http://iptv.apsfl.co.in:8080/appserver/rest/iptv/addservicepack",
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


  // Resume5() {
  //   this.edibtnenble = true;
  //   this.updateBtn = true;
  //   this.click = !this.click;
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
    this.click = !this.click;
    let data = {
      "enty_id": 1,
      "actn_id": 1,
      "actn_nm": "Suspend Pending",
      "commands": "curl -XGET -H" + ' "Content-type: application/json"' + " 'http://172.16.4.107/prov4serv/prov_if?oper" + '=' + this.cafupdfrm.value.de_lte + '&' + "client" + '=' + this.cafupdfrm.value.aaa_cd + "'",

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


  Suspnd2() {
    this.cafupdfrm.enable()
    this.suspnd234 = true;
    this.edibtnenble = true;
    this.click = !this.click;

    let data = {
      "enty_id": 1,
      "actn_id": 1,
      "actn_nm": "Suspend Pending",
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


  Suspnd3() {
    this.cafupdfrm.enable()
    this.suspnd345 = true;
    this.edibtnenble = true;
    this.click = !this.click;

    let data = {
      "enty_id": 1,
      "actn_id": 1,
      "actn_nm": "Suspend Pending",
      "commands": "curl -XGET -H" + ' "Content-type' + ':' + ' application/json"' + " 'http://172.16.4.104:8080/radiusISU?code=Change-Filter-Request&Client" + '=' + this.cafupdfrm.value.aaa_cd + '&cisco-avpair' + '=' + "subscriber:sd=" + this.cafupdfrm.value.up_stream + ',' + " subscriber:sa=" + this.cafupdfrm.value.down_stream + "'",
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



  // Suspnd4() {
  //   this.cafupdfrm.enable()
  //   this.suspnd456 = true;
  //   this.edibtnenble = true;
  //   this.click = !this.click;
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
    this.click = !this.click;
    let data = {
      "enty_id": 1,
      "actn_id": 1,
      "actn_nm": "Suspend Pending",
      "commands": "curl -XPOST -H" + " 'username: teraadmin' -H" + " 'apikey" + ":" + " 6ed73c1a-7817-49ab-b185-981f97cf5fd8' -H" + ' "Content-type' + ":" + ' application/json" -d' + " '{" + '"subscribercode"' + ':' + '"' + this.cafupdfrm.value.mdlwre_cd + '"' + ',' + '"servicepacks"' + ':' + '[{' + '"servicepack"' + ':' + '"' + this.cafupdfrm.value.service_pack + '"' + ',' + '"reason"' + ':' + '"Amount not paid"' + "}]}' " + 'http://iptv.apsfl.co.in:8080/appserver/rest/iptv/disconnectservicepack'
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




  //*********************** Curl Operation end here ******************//


  // buttonClick(){
  //   this.click = !this.click;
  // }

  onKey(event: KeyboardEvent) {
    // Checking to see if value is empty or not
    // remember we are using ternary operator here 
    this.click = (event.target as HTMLInputElement).value === '' ? true : false;
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
