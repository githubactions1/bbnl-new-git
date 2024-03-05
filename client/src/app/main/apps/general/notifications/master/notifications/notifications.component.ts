import { Component, OnInit } from '@angular/core';
import { DsSidebarService } from '@glits/components/sidebar/sidebar.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CrudService } from '../../../../crud.service';
import { MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition, MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {
  /**
 * Constructor
 *  @param {DsSidebarService} _DsSidebarService
 */
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  public newNtfctnForm: FormGroup;
  icnsLst: any;
  usrdtls: any;
  ntfctnLst: any;
  loader: boolean;
  webNt: boolean;
  grpLst: any;
  selectedoptions: any;
  ntfnCatLst: any; permissions;


  constructor(private _DsSidebarService: DsSidebarService, public apiSrvc: CrudService, public snackBar: MatSnackBar) {
    this.usrdtls = JSON.parse(localStorage.getItem('usrDtls'));
    this.permissions = { "slct_in": 1, "insrt_in": 0, "updt_in": 0, "dlte_in": 0, "exprt_in": 0 }
  }

  ngOnInit() {
    this.newNtfctnForm = new FormGroup({
      ntfnMsg: new FormControl('', [Validators.required]),
      catgryId: new FormControl('', [Validators.required]),
      grpControl: new FormControl('', [Validators.required])
    });
    this.getNotfctnTyp();

    this.getusrGrpLst();
  }

  public hasError(controlName: string, errorName: string) {
    return this.newNtfctnForm.controls[controlName].hasError(errorName);
  }


  public createNtfctn(newNtfctnFormValue) {
    if (this.newNtfctnForm.valid) {
      this.executeNtfctnCreation(newNtfctnFormValue);
    }
  }

  private executeNtfctnCreation(newNtfctnFormValue) {
    newNtfctnFormValue.usrId = this.usrdtls.user_id;
    newNtfctnFormValue.mrchntID = this.usrdtls.mrcht_id;
    console.log(this.selectedoptions);
    console.log(newNtfctnFormValue);

    let rte = "alert/newNtfctn"
    this.apiSrvc.create(newNtfctnFormValue, rte).subscribe((res) => {
      if (res['status'] == 200) {
        this.snackBar.open("Sucessfully Added", '', {
          duration: 2000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
        this.opensideBar('addNotfctn', null);
        this.newNtfctnForm.reset()
        this.getNotfctnLSt(0);
      }
    }, (error) => {
      console.log(error);
    });
  }


  private getNotfctnTyp() {
    let rte = "alert/ntfctnTypLst"
    this.loader = true;
    this.apiSrvc.get(rte).subscribe((res) => {
      this.ntfnCatLst = res['data'];
      this.getNotfctnLSt(this.ntfnCatLst[0]);
      console.log(this.ntfnCatLst);
      this.loader = false;
    }, (error) => {
      console.log(error)
    });
  }


  private getNotfctnLSt(n) {
    // if(n=0){

    // }
    // else{
    //   n.chkId = 1
    // }
    console.log(n);
    this.ntfnCatLst.filter((k) => {
      if (k.alert_cat_id == n.alert_cat_id) {
        k['chkId'] = 1
      }
      else {
        k['chkId'] = 0
      }
    })


    console.log(this.ntfnCatLst);
    console.log(n.alert_cat_id);
    let rte = `alert/usrNtfctn/${n.alert_cat_id}`
    this.loader = true;
    this.apiSrvc.get(rte).subscribe((res) => {
      this.ntfctnLst = res['data'];
      console.log(this.ntfctnLst);
      this.loader = false;
      if(!this.ntfctnLst.length){this.webNt = true;}
    }, (error) => {
      this.loader = false;
      console.log(error)
    });
  }

  getusrGrpLst() {
    let rte = `alert/usrGrpLst`
    this.loader = true;
    this.apiSrvc.get(rte).subscribe((res) => {
      console.log(res);
      this.grpLst = res['data'];
      console.log(this.grpLst);
      this.loader = false;
    }, (error) => {
      console.log(error)
    });
  }
  opensideBar(key, value) {
    this._DsSidebarService.getSidebar(key).toggleOpen();
    this.newNtfctnForm.reset()
  }
}
