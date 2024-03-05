import { Component, OnInit } from '@angular/core';
import { CrudService } from 'app/main/apps/crud.service';
import { DatePipe } from '@angular/common';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition, MatSnackBar } from '@angular/material';
import { debounceTime, tap, switchMap, finalize } from 'rxjs/operators';

@Component({
  selector: 'app-bank-statement-details',
  templateUrl: './bank-statement-details.component.html',
  styleUrls: ['./bank-statement-details.component.scss']
})
export class BankStatementDetailsComponent implements OnInit {
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  permissions;
  fromdate: Date;
  todate: Date;
  fromdt: string;
  todt: string;
  bnkdtlsdata: any;
  dsbleSbmt1: any;
  lmoPymntsForm: FormGroup;
  showTbl: boolean = false;
  errorMsg: string;
  filteredAgents: any[];
  isLoading: boolean;
  showTxt: string = 'Please select date to get data';
  getHeaderDtls = function () { return { "title": 'Bank Statement Details', "icon": "people_outline" } };
  showLdr: boolean;
  loader:boolean;
  shwPermMsg: string;


  constructor(public crdSrv: CrudService, private _snackBar: MatSnackBar, private fb: FormBuilder, public datePipe: DatePipe) {
    // this.permissions = { "slct_in": 1, "insrt_in": 0, "updt_in": 1, "dlte_in": 1, "exprt_in": 1 };
    this.fromdate = new Date();
    this.todate = new Date();
    // const permTxt = 'Payments to APSFL';
    // const prmeRte = `user/permissions/${permTxt}`;
    // this.crdSrv.get(prmeRte).subscribe((res) => {
    //   // console.log(res['data'][0]);
    //   this.permissions = res['data'][0];
    // });
  }
  // saveBulkUploadWthOutLmo(){}
  getbnkdtlsdata() {
    this.todt = this.datePipe.transform(this.todate, 'yyyy-MM-dd');
    this.fromdt = this.datePipe.transform(this.fromdate, 'yyyy-MM-dd');
    this.showLdr = true;
    // if (this.permissions == undefined){
    //   this.loader = false;
    // }
    const rte = `billing/bank/statements/details`;

    let pstdata = {
      todate: this.todt,
      frmdate: this.fromdt
    };
    this.lmoPymntsForm = this.fb.group({
      // lmoCode: [''],
      lmoCode: this.fb.array([this.fb.group(
        {
          trns_ctgry: '', lmo_nm: '', tot_amt: '', Date: '', ref_nu: '', mble_nu: '', lmo_cd: '', tot_trnsn_dta: ''
        })])
    });
    this.loader = true;
    this.crdSrv.create(pstdata, rte).subscribe((res) => {
      if(res['status']==200)
      {
        this.loader=false;
        this.bnkdtlsdata = res['data'];
        this.showLdr = false;
        if (this.bnkdtlsdata.length != 0) {
          this.showTbl = true;
        } else {
          this.showTbl = false;
          this.showTxt = 'No records for selected date, Please select another date';
        }
        if (res['perm']){
          this.permissions = res['perm'][0];
        } else{
          this.shwPermMsg = 'You do not have permissions to do this operation. Please contact Administrator to get permissions.';
        }
        for (let c = 0; c < this.bnkdtlsdata.length; c++) {
          this.agntFm.push(this.fb.group({
            trns_ctgry: this.bnkdtlsdata[c].trns_ctgry,
            lmo_nm: this.bnkdtlsdata[c].agnt_nm,
            tot_amt: this.bnkdtlsdata[c].trnsn_at,
            Date: this.bnkdtlsdata[c].trns_dte,
            trsn_dt: this.bnkdtlsdata[c].trsn_dt,
            ref_nu: this.bnkdtlsdata[c].trns_ref_nu,
            mble_nu: this.bnkdtlsdata[c].mble_nu,
            tot_trnsn_dta: this.bnkdtlsdata[c].trnsn_tx,
            lmo_cd: ''
          }));
        }
      }
      
    });
  }

  get agntFm() {
    return this.lmoPymntsForm.get('lmoCode') as FormArray;
  }

  ngOnInit() {
    this.getbnkdtlsdata();

    this.lmoPymntsForm = this.fb.group({
      // lmoCode: [''],
      lmoCode: this.fb.array([this.fb.group(
        {
          trns_ctgry: '', lmo_nm: '', tot_amt: '', Date: '', ref_nu: '', mble_nu: '', lmo_cd: '', tot_trnsn_dta: ''
        })])
    });

    this.lmoPymntsForm.valueChanges
      .debounceTime(200).pipe(
        debounceTime(500),
        tap(() => {
          this.errorMsg = "";
          this.filteredAgents = [];
          this.isLoading = true;
        }),
        switchMap((value) => {
          if (value) {
            for (let i = 0; i < value.lmoCode.length; i++) {
              if (value.lmoCode[i].lmo_cd != '') {
                if (value.lmoCode[i].lmo_cd.length >= 3 || value.lmoCode[i].lmo_cd.length != null) {
                  return this.crdSrv.get('agent/getAgentBySearch/' + value.lmoCode[i].lmo_cd)
                    .pipe(
                      finalize(() => {
                        this.isLoading = false;
                      }),
                    );
                }
              }
            }
          }
        })
      )
      .subscribe(data => {
        if (data['data'] == undefined) {
          this.errorMsg = data['Error'];
          this.filteredAgents = [];
        } else {
          this.errorMsg = "";
          this.filteredAgents = data['data'];
        }
      });
  }


  onValueChanged(data) {
    for (let i = 0; i < data.lmoCode.length; i++) {
      if (data.lmoCode[i].lmo_cd != '') {
        data.lmoCode.debounceTime(200).pipe(
          debounceTime(500),
          tap(() => {
            this.errorMsg = "";
            this.filteredAgents = [];
            this.isLoading = true;
          }),
          switchMap((value) => {
            if (value) {
              if (value >= 3 || value != null) {
                return this.crdSrv.get('agent/getAgentBySearch/' + value)
                  .pipe(
                    finalize(() => {
                      this.isLoading = false;
                    }),
                  );
              }
            }
          })
        )
          .subscribe(data1 => {
            if (data1['data'] == undefined) {
              this.errorMsg = data['Error'];
              this.filteredAgents = [];
            } else {
              this.errorMsg = "";
              this.filteredAgents = data1['data'];
            }
          });
      }
    }
    this.dsbleSbmt1 = false;
  }

  displayFn(agent) {
    if (agent) { return agent.agnt_nm + " " + '|' + " " + agent.agnt_cd; }
  }

  saveBulkUploadWthOutLmo() {

    let pymntsWthOtLmoArry = [];
    let pymntsAdedLmoArry = [];

    for (let i = 0; i < this.lmoPymntsForm.value.lmoCode.length; i++) {
      if (this.lmoPymntsForm.value.lmoCode[i].lmo_cd != '') {
        pymntsAdedLmoArry.push({
          agnt_nm: this.lmoPymntsForm.value.lmoCode[i].lmo_nm,
          trsn_dt: this.datePipe.transform(this.lmoPymntsForm.value.lmoCode[i].trsn_dt, "yyyy-MM-dd"),
          trnsn_type_id: 6,
          trnsn_at: this.lmoPymntsForm.value.lmoCode[i].tot_amt,
          pymnt_mde_id: '',
          dd_nu: this.lmoPymntsForm.value.lmoCode[i].ref_nu,
          mble_nu: this.lmoPymntsForm.value.lmoCode[i].mble_nu ? this.lmoPymntsForm.value.lmoCode[i].mble_nu : '',
          cmnt_tx: '',
          agnt_id: this.lmoPymntsForm.value.lmoCode[i].lmo_cd.agnt_id,
          upld_in: 1,
          tot_rcds: this.lmoPymntsForm.value.lmoCode.length,
          trnsn_tx: this.lmoPymntsForm.value.lmoCode[i].tot_trnsn_dta
        });
      } else {
        pymntsWthOtLmoArry.push({
          agnt_nm: this.lmoPymntsForm.value.lmoCode[i].lmo_nm,
          trsn_dt: this.datePipe.transform(this.lmoPymntsForm.value.lmoCode[i].trsn_dt, "yyyy-MM-dd"),
          trnsn_type_id: 6,
          trnsn_at: this.lmoPymntsForm.value.lmoCode[i].tot_amt,
          pymnt_mde_id: '',
          dd_nu: this.lmoPymntsForm.value.lmoCode[i].ref_nu,
          mble_nu: this.lmoPymntsForm.value.lmoCode[i].mble_nu ? this.lmoPymntsForm.value.lmoCode[i].mble_nu : '',
          cmnt_tx: '',
          trnsn_tx: this.lmoPymntsForm.value.lmoCode[i].tot_trnsn_dta
        });
      }
    }

    if (pymntsAdedLmoArry.length != 0) {
      this.postAgntPymnts(pymntsAdedLmoArry);
    }

    this.postAgntPymntWthoutLmo(pymntsWthOtLmoArry);
  }

  postAgntPymnts(data) {
    const rte = `billing/agent/payments`;
    this.crdSrv.create(data, rte).subscribe((res) => {
      if (res['status'] == 200) {
        if (res['data'].insertId) {
          this._snackBar.open("Payment details Sucessfully Saved", '', {
            duration: 2000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
          });
        } else {
          this._snackBar.open("Payment details Already Exists", '', {
            duration: 2500,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
          });
        }
      }
    }, (error) => {
      console.log(error);
    });
  }

  postAgntPymntWthoutLmo(data) {
    const rte = `billing/agent/payments/staging`;
    this.crdSrv.create(data, rte).subscribe((res) => {
      if (res['status'] == 200) {
        if (res['data'].insertId) {
          this._snackBar.open("Payment details Sucessfully Saved", '', {
            duration: 2000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
          });
        } else {
          this._snackBar.open("Payment details Already Exists", '', {
            duration: 2500,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
          });
        }
      }
    }, (error) => {
      console.log(error);
    });
  }
}
