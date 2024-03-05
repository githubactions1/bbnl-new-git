import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { TransfereService } from 'app/providers/transfer/transfer.service';
import { CrudService } from '../crud.service';
import { MatSnackBar, MatSnackBarVerticalPosition, MatSnackBarHorizontalPosition } from '@angular/material';

@Component({
  selector: 'curl',
  templateUrl: './curl.component.html',
  styleUrls: ['./curl.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class CurlComponent {
  commands = '';
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  curlForm: FormGroup;
  actionlst: any;
  entitylst: any;

  permissions: any = {};
  mainMessage = '';
  curlRslts: any = [];
  shwLdr: boolean = false;

  getHeaderDtls = function () { return { 'title': 'Execute Curl Commands', 'icon': 'money' }; };
  constructor(public router: Router,
    private _formBuilder: FormBuilder, public TransfereService: TransfereService, public crdSrv: CrudService, public _snackBar: MatSnackBar) {
    const permTxt = 'CURL Execution';
    const prmeRte = `user/permissions/${permTxt}`;
    this.crdSrv.get(prmeRte).subscribe((res) => {
      // console.log(res['data'][0]);
      if (res['status'] == 200 && res['data'].length)
        this.permissions = res['data'][0];
      if (this.permissions.slct_in === 1) {
        this.getentity();
      } else
        this.mainMessage = 'You do not have permissions to do this operation. Please contact Administrator to get permissions.';
    });

    this.curlForm = this.createCurlForm();
  }
  /**
   * Create contact form
   *
   * @returns {FormGroup}
   */
  createCurlForm(): FormGroup {
    return this._formBuilder.group({
      entity: ['', Validators.required],
      action: ['', Validators.required],
      commands: ['', Validators.required]
    });
  }
  getentity() {
    const rte = `entity/entity`;
    this.crdSrv.get(rte).subscribe((res) => {
      this.entitylst = res['data'];
    })
  }
  onentityselect() {
    this.getactions()
  }
  getactions() {
    const rte = `entity/actions/` + this.curlForm.value.entity.enty_id;
    this.crdSrv.get(rte).subscribe((res) => {
      this.actionlst = res['data'];
    })
  }
  execute() {
    let data = {
      enty_id: this.curlForm.value['entity'].enty_id,
      actn_id: this.curlForm.value['action'].actn_id,
      commands: this.curlForm.value['commands'],
      actn_nm: this.curlForm.value['action'].actn_nm
    }
    this.shwLdr = true;
    this.crdSrv.create(data, 'execurl')
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
}