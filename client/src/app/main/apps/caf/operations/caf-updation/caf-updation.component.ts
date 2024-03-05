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
@Component({
  selector: 'app-caf-updation',
  templateUrl: './caf-updation.component.html',
  styleUrls: ['./caf-updation.component.scss']
})
export class CafUpdationComponent implements OnInit {
  cafupdfrm: FormGroup;
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  caf_num
  sbscr_cd
  cafstslst = []
  cafdata = []
  msgin: boolean;
  nocafdtls:boolean;
  message;
  message1;
  showdata: boolean;
  loader: boolean;
  getHeaderDtls = function () { return { "title": "CAF Updation", "icon": "receipt" } }
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
  chnged_srl_nu;
  onudtls;
  iptvDtls;
  chnged_iptv_mac_in=0;
  chnged_srl_nu_in=0;
  splts
  spltDtls
  onu
  crd
  agrcd_chngd:boolean =false;
  shwedtbtn:boolean;
  constructor(private _dsSidebarService: DsSidebarService, public crdsrv: CrudService, public atmSrv: AtomService, public dialog: MatDialog, public fb: FormBuilder, public datePipe: DatePipe, public snackBar: MatSnackBar) { }

  ngOnInit() {
    this.getcafsts();
    this.msgin = true;
    this.nocafdtls=false;
    this.showdata = false;
    this.message = 'Please Enter CAF Number or Subscriber Code To Get Details';
    this.cafupdfrm = this.fb.group({
      aaa_cd: new FormControl(''),
      agora_cd: new FormControl(''),
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
      onu_mdle_cd: new FormControl('')
    });
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
    this.nocafdtls=false;
    this.loader = true;
    let data ={
      caf_id:this.caf_num,
      subscr_cd:this.sbscr_cd
    }
    let rte1 = `caf/getcafdtls/`;
    this.crdsrv.create(data,rte1).subscribe((res) => {
      if (res['status'] == 200) {
        if (res['data'].length > 0) {
          this.loader = false;
          this.showdata = true;
          this.cafdata = res['data'];
          if(this.caf_num)
          {
            this.shwedtbtn=true;
          }
          if(this.sbscr_cd)
          {
            this.shwedtbtn=false;
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
          this.cafupdfrm.disable();
          this.cafupdfrm.get('aaa_cd').setValue(this.cafdata[0].aaa_cd);
          this.cafupdfrm.get('agora_cd').setValue(this.cafdata[0].aghra_cd);
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
          this.showdata=false;
          this.msgin=false;
          this.nocafdtls=true;
          this.message1="CAF Details Not Availble"
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
  }

  cancel() {
    this.cafupdfrm.reset()
    this.caf_num = ''
    this.sbscr_cd=''
    this.msgin = true;
    this.nocafdtls=false;
    this.showdata = false;
    this.edibtnenble = false;
    this.spsndDisable = true;
    this.trmndDisable = true;
    this.actvDisable = true;
  }


  Updtcafdtls() {
    this.loader = true;
    if(this.agrcd_chngd == true)
    {
      // console.log("to be pon change")
      this.cafupdfrm.value.splt_id=this.spltDtls[0].splt_id;
      this.cafupdfrm.value.splts=this.splts;
      this.cafupdfrm.value.onu=this.onu
      this.cafupdfrm.value.oldonu=this.cafdata[0].olt_onu_id
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
      this.cafupdfrm.value.crd=this.crd
      // console.log(this.cafupdfrm.value)
      let data =this.cafupdfrm.value
      let rte=`caf/spltsupdtn/`+ this.caf_num
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
    else
    {
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
    if(this.chnged_srl_nu_in==0 && this.chnged_iptv_mac_in==0)
    {
    this.cafupdfrm.value.onu_stpbx_id=this.cafdata[0].onu_stpbx_id
    this.cafupdfrm.value.iptv_stpbx_id=this.cafdata[0].iptv_stpbx_id
    }
    else if(this.chnged_srl_nu_in==1 && this.chnged_iptv_mac_in==0)
    {
      this.cafupdfrm.value.onu_stpbx_id=this.onudtls[0].stpbx_id
      this.cafupdfrm.value.iptv_stpbx_id=this.cafdata[0].iptv_stpbx_id
    }
    else if(this.chnged_iptv_mac_in==1 && this.chnged_srl_nu_in==0)
    {
      this.cafupdfrm.value.onu_stpbx_id=this.cafdata[0].onu_stpbx_id
      this.cafupdfrm.value.iptv_stpbx_id=this.iptvDtls[0].stpbx_id
    }
    else if(this.chnged_srl_nu_in==1 && this.chnged_iptv_mac_in==1)
    {
      this.cafupdfrm.value.onu_stpbx_id=this.onudtls[0].stpbx_id
      this.cafupdfrm.value.iptv_stpbx_id=this.iptvDtls[0].stpbx_id
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

  onAgoraBlur()
  {
    this.agrcd_chngd =true;
    console.log(this.cafupdfrm.value.agora_cd)
    var agor_cd=this.cafupdfrm.value.agora_cd
    var fields=agor_cd.split('-')
    var ip_adr=fields[0]
    this.crd=fields[1]
    var pon=fields[2]
    this.onu=fields[3]
     if(this.crd==1)
     {
       var chng_pon = pon-8

     }
     else
     {
       chng_pon=pon
     }

     var ipsplit=ip_adr.split('.')
     var ipsplit1=ipsplit[0]
     var ipsplit2=ipsplit[1]
     var ipsplit3=ipsplit[2]
     var ipsplit4=ipsplit[3]
     
      if(ipsplit[3].length == 2)
     {
       var chng_ipsplit4=  0 +ipsplit4

     }
     else if(ipsplit[3].length == 1)
     {
       var chng_ipsplit4: any
        chng_ipsplit4= "00" + ipsplit4

     }
     else
     {
      var chng_ipsplit4= ipsplit4
     }
     var aaa_lag_id="lag"+':'+ipsplit3+chng_ipsplit4 +':'+this.crd+':'+chng_pon+':'+this.onu
     let data ={
       ip:ip_adr,
       crd:this.crd,
       pon:chng_pon,
       onu:this.onu
     }
    //  console.log(data)
     this.cafupdfrm.get('aaa_cd').setValue(aaa_lag_id);
    let rte1= `olt/getsplitDtlsbyIp`

     this.crdsrv.create(data, rte1).subscribe((res) => {
    //  console.log(res['data'])
     if(res['data'].length > 0)
     {
      this.spltDtls=res['data']
      this.splts=this.spltDtls[0].splt1_nu +"-"+ this.spltDtls[0].splt2_nu +"-"+ this.spltDtls[0].splt3_nu
     }
     else
     {
      this.snackBar.open("No Splits Data Found for ONU" +':' + this.onu, '', {
        duration: 3000,
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      });
     }
     
     
    }, (error) => {
    });
  }
  onONUBlur()
  {
    this.chnged_srl_nu_in=1
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

  onIptvBlur()
  {
    console.log(this.cafupdfrm.value.iptv_mac_addr)
    console.log(this.cafdata)
    if(this.cafdata[0].caf_type_nm == 'ENTERPRISE')
    {
      this.cafupdfrm.get('iptv_srl_nu').setValue('')
      this.cafupdfrm.get('iptv_mac_addr').setValue('')
      this.cafupdfrm.get('mdlwre_cd').setValue('')
    }
    else
    {
      this.chnged_iptv_mac_in=1
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
}
