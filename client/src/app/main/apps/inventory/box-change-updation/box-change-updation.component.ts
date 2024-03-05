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
  selector: 'app-box-change-updation',
  templateUrl: './box-change-updation.component.html',
  styleUrls: ['./box-change-updation.component.scss']
})
export class BoxChangeUpdationComponent implements OnInit {
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  boxchngtyp = []
  chngtyp
  caf_nm;
  onu_srl_nu;
  iptv_mac_adr;
  cafdtls;
  chnged_srl_nu
  onudtls
  iptvDtls
  data
  loader: boolean;
  getHeaderDtls = function () { return { "title": "Box-Change Updation", "icon": "receipt" } }
  constructor(private _dsSidebarService: DsSidebarService, public crdsrv: CrudService, public atmSrv: AtomService, public dialog: MatDialog, public fb: FormBuilder, public datePipe: DatePipe, public snackBar: MatSnackBar) { }

  ngOnInit() {
    this.boxchngtyp = [
      { id: 1, type: " Only IPTV" },
      { id: 2, type: "Only ONU" },
      { id: 3, type: "Both" }
    ]
  }
  boxchngtype() {
    //console.log(this.chngtyp)
    if (this.chngtyp == 1) {
      this.caf_nm = ''
      this.onu_srl_nu = ''
    }
    else if (this.chngtyp == 2) {
      this.caf_nm = ''
      this.iptv_mac_adr = ''
    }
    else if (this.chngtyp == 3) {
      this.caf_nm = ''
      this.onu_srl_nu = ''
      this.iptv_mac_adr = ''
    }
  }
  Updtboxdtls() {
    this.loader = true;
    if (this.chngtyp == 1) {
      this.data = {
        "caf_id": this.caf_nm,
        "old_iptv_srl_nu": this.cafdtls.iptv_srl_nu,
        "new_iptv_srl_nu": this.iptvDtls.srl_nu,
        "box_chng_typ": this.chngtyp
      }
    }
    else if (this.chngtyp == 2) {
      this.data = {
        "caf_id": this.caf_nm,
        "old_onu_srl_nu": this.cafdtls.onu_srl_nu,
        "new_onu_srl_nu": this.chnged_srl_nu,
        "box_chng_typ": this.chngtyp
      }
    }
    else if (this.chngtyp == 3) {
      this.data =
      {
        "caf_id": this.caf_nm,
        "old_onu_stpbx_id":this.cafdtls.onu_stpbx_id,
        "old_iptv_stpbx_id":this.cafdtls.iptv_stpbx_id,
        "old_onu_srl_nu": this.cafdtls.onu_srl_nu,
        "old_iptv_srl_nu": this.cafdtls.iptv_srl_nu,
        "new_onu_stpbx_id":this.onudtls.stpbx_id,
        "new_iptv_stpbx_id":this.iptvDtls.stpbx_id,
        "new_onu_srl_nu": this.chnged_srl_nu,
        "new_iptv_srl_nu": this.iptvDtls.srl_nu,
        "box_chng_typ": this.chngtyp
      }
    }

    console.log(this.data)
    let rte1 = `inventory/updateboxdtls`;
    this.crdsrv.create(this.data, rte1).subscribe((res) => {
      if (res['status'] == 200) {
        this.loader = false;
        this.snackBar.open("Box Details Updated Sucessfully", '', {
          duration: 3000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
        this.cancel()
      }
    }, (error) => {
    });

  }
  cancel() {
    this.caf_nm = ''
    this.iptv_mac_adr = ''
    this.onu_srl_nu = ''
    this.chngtyp = ''
  }
  onCAFBlur() {
    this.caf_nm

    let rte1 = `caf/getcafdtlsbyId/` + this.caf_nm;
    this.crdsrv.get(rte1).subscribe((res) => {
      if (res['status'] == 200) {
        if (res['data'].length > 0) {
          this.cafdtls = res['data'][0];
          //console.log(this.cafdtls)
        }
        else {
          this.snackBar.open("Enter Valid CAF Number", '', {
            duration: 3000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
          });
        }
      }
    }, (error) => {
    });
  }

  onIPTVBlur() {
    this.iptv_mac_adr
    let type = 1
    let data = {
      type: type,
      iptv_mac_ad: this.iptv_mac_adr
    }
    let rte1 = `inventory/boxdtls`;
    this.crdsrv.create(data, rte1).subscribe((res) => {
      if (res['status'] == 200) {
        if (res['data'].length > 0) {
          this.iptvDtls = res['data'][0];
          //console.log(this.iptvDtls)
        }
        else {
          this.snackBar.open("Enter Valid IPTV Mac Address", '', {
            duration: 3000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
          });
        }
      }

    }, (error) => {
    });
  }

  onONUBlur() {
    this.onu_srl_nu
    if (this.onu_srl_nu.startsWith('44534E57')) {
      this.chnged_srl_nu = this.onu_srl_nu.replace('44534E57', 'DSNW');
    } else if (this.onu_srl_nu.startsWith('5A544547')) {
      this.chnged_srl_nu = this.onu_srl_nu.replace('5A544547', 'ZTEG');
    } else if (this.onu_srl_nu.startsWith('59474531')) {
      this.chnged_srl_nu = this.onu_srl_nu.replace('59474531', 'YGE1');
    } else if (this.onu_srl_nu.startsWith('4B4F4E4B')) {
      this.chnged_srl_nu = this.onu_srl_nu.replace('4B4F4E4B', 'KONK');
    } else {
      this.chnged_srl_nu = this.onu_srl_nu
    }
    //console.log(this.chnged_srl_nu)
    let type = 2
    let data = {
      type: type,
      srl_nu: this.chnged_srl_nu
    }
    let rte1 = `inventory/boxdtls`;
    this.crdsrv.create(data, rte1).subscribe((res) => {
      if (res['status'] == 200) {
        if (res['data'].length > 0) {
          this.onudtls = res['data'][0];
          //console.log(this.onudtls)
        }
        else {
          this.snackBar.open("Enter Valid ONU Serial Number", '', {
            duration: 3000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
          });
        }
      }

    }, (error) => {
    });
  }
}
