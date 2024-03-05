import { Component, OnInit, Inject, ViewChild, ElementRef } from '@angular/core';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA, MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material';
import { CrudService } from 'app/main/apps/crud.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageDialogComponent } from 'app/main/shared/components/message-dialog/message-dialog.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tenant-enrollment-otp-dialog',
  templateUrl: './tenant-enrollment-otp-dialog.component.html',
  styleUrls: ['./tenant-enrollment-otp-dialog.component.scss']
})
export class TenantEnrollmentOtpDialogComponent implements OnInit {
  tntData: any;
  err_msg: any;
  sucess_msg ;
  confirmMsgDialogRef: MatDialogRef<MessageDialogComponent>;


  @ViewChild('input1') focus1: ElementRef;
  @ViewChild('input2') focus2: ElementRef;
  @ViewChild('input3') focus3: ElementRef;
  @ViewChild('input4') focus4: ElementRef;
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  /**
   * @param _data
   * @param {MatDialogRef<TenantEnrollmentOtpDialogComponent>} matDialogRef
   */
  otpForm: FormGroup;
  constructor(public dialog: MatDialog, @Inject(MAT_DIALOG_DATA) private _data: any, public crdsrv: CrudService, public router: Router,
    public matDialogRef: MatDialogRef<TenantEnrollmentOtpDialogComponent>, private _formBuilder: FormBuilder, private _snackBar: MatSnackBar) {
    this.tntData = _data;
  }

  ngOnInit() {
    this.otpForm = this._formBuilder.group({
      fstVlu: ['', Validators.required]
      , scndVlu: ['', Validators.required]
      , thrdVlu: ['', Validators.required]
      , frthVlu: ['', Validators.required]
    });
  }

  getFstFocusChnge(value): void {
    this.focus2.nativeElement.focus();
  }
  getScndFocusChnge(value): void {
    this.focus3.nativeElement.focus();
  }
  getTrdFocusChnge(value): void {
    this.focus4.nativeElement.focus();
  }

  validateOtp(): void {
    console.log(this.otpForm.value);
    console.log(this.tntData);
    // this.err_msg = null;
    let data = {
      otp: `${this.otpForm.value.fstVlu}${this.otpForm.value.scndVlu}${this.otpForm.value.thrdVlu}${this.otpForm.value.frthVlu}`,
      phno: this.tntData.officeAddress == undefined ? this.tntData.ofce_mbl_nu : this.tntData.officeAddress.ofce_mble_Nu
    };
    console.log(data);

    const rte = `otpValidation`;
    this.crdsrv.create(data, rte).subscribe((res) => {
      console.log(res);
      if (res['status'] == 200) {
        
        console.log('correct otp');
        const updt_rte = `agent/otp/update/agent/registration`;
        // this.dialog.closeAll();
        this.crdsrv.create(this.tntData, updt_rte).subscribe((result) => {
          console.log(result);
         
            if (result['status'] == 200) {
              console.log(this.tntData.agntInfo)
              console.log(this.tntData.agnt_ctgry_id)
              this.dialog.closeAll();
              let sucess_msg;
              if(this.tntData.agntInfo == undefined){
                console.log(this.tntData.agnt_ctgry_id)
                if (this.tntData.agnt_ctgry_id == 1) {
					let datas = {
                    "pwd_tx":this.tntData['pwd_tx'],
                    "usr_ctgry_ky":this.tntData['usr_ctgry_ky'],
                    "rle_id":this.tntData['rle_id'],
                    "mrcht_id":this.tntData['mrcht_id'],
                    "emple_id":1,
                    "app_id":1
                  };
                  const rte = `lmo/newLMOroles`;
                  this.crdsrv.create(datas, rte).subscribe((res2) => {
                    console.log("res2 newLMOroles",res2);
                    sucess_msg = "LMO Details Sucessfully Saved";
                  })
                  //sucess_msg = "LMO Details Sucessfully Saved";
                } else if (this.tntData.agnt_ctgry_id == 3) {
                  sucess_msg = "MSO Details Sucessfully Saved";
                }
              } else{
                if (this.tntData.agntInfo.agnt_Typ == 1) {
					let datas = {
                    "pwd_tx":this.tntData['pwd_tx'],
                    "usr_ctgry_ky":this.tntData['usr_ctgry_ky'],
                    "rle_id":this.tntData['rle_id'],
                    "mrcht_id":this.tntData['mrcht_id'],
                    "emple_id":this.tntData['emple_id'],
                    "app_id":this.tntData['app_id']
                  };
                  const rte = `lmo/newLMOroles`;
                  this.crdsrv.create(datas, rte).subscribe((res2) => {
                    sucess_msg = "LMO Details Sucessfully Saved";
                  })
                  //sucess_msg = "LMO Details Sucessfully Saved";
                } else if (this.tntData.agntInfo.agnt_Typ == 3) {
                  sucess_msg = "MSO Details Sucessfully Saved";
                }
              }
              
  
             
              
              // this.dialog.closeAll();
              let lstPopupData;
              lstPopupData = {
                title: sucess_msg,
                msg: '',
                icon: 'account_circle',
                btnLst: [{
                  label: 'Ok',
                  res: 'ok'
                }]
              };
              this.confirmMsgDialogRef = this.dialog.open(MessageDialogComponent, {
                width: '25%',
                panelClass: 'my-class',
                data: lstPopupData
              });
              this.confirmMsgDialogRef.afterClosed().subscribe((response) => {
                if (response) {
                  if (response == 'ok') {
                    this.router.navigate(['/']);
                  }
                }
              });
              // if (this.tntData.agntInfo.agnt_Typ == 1) {
              //   this._snackBar.open("LMO Details Sucessfully Saved", '', {
              //     duration: 2000,
              //     horizontalPosition: this.horizontalPosition,
              //     verticalPosition: this.verticalPosition,
              //   });
              // } else if (this.tntData.agntInfo.agnt_Typ == 3) {
              //   this._snackBar.open("MSO Details Sucessfully Saved", '', {
              //     duration: 2000,
              //     horizontalPosition: this.horizontalPosition,
              //     verticalPosition: this.verticalPosition,
              //   });
  
              // }
              
            } else{
              // this.dialog.closeAll();
              let lstPopupData;
              lstPopupData = {
                title: 'Details Not Successfully Saved ! Please Re-enter Details...',
                msg: '',
                icon: 'account_circle',
                btnLst: [{
                  label: 'Ok',
                  res: 'ok'
                }]
              };
              this.confirmMsgDialogRef = this.dialog.open(MessageDialogComponent, {
                width: '25%',
                panelClass: 'my-class',
                data: lstPopupData
              });
              this.confirmMsgDialogRef.afterClosed().subscribe((response) => {
                if (response) {
                  if (response == 'ok') {
                    if (this.tntData.agntInfo.agnt_Typ == 1) {
                      this.router.navigate(['enrollment/lmo']);
                    } else if (this.tntData.agntInfo.agnt_Typ == 3) {
                      this.router.navigate(['enrollment/mso']);
                    }
                    
                  }
                }
              });
            }
        });
      } else {
        this._snackBar.open("Incorrect OTP, Please check and enter again", '', {
          duration: 3500,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
      }
    });
  }
}
