import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { debounceTime, tap, switchMap, finalize } from 'rxjs/operators';
import { CrudService } from 'app/main/apps/crud.service';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material';

@Component({
  selector: 'app-ztc-file-creation',
  templateUrl: './ztc-file-creation.component.html',
  styleUrls: ['./ztc-file-creation.component.scss']
})
export class ZTCFileCreationComponent implements OnInit {
  ZtcForm: FormGroup;
  ZtcForm1: FormGroup;
  ZtcForm2: FormGroup;
  filteredcafs: any;
  isLoading = false;
  errorMsg: string;
  Filedtls: any;
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  columnDefsRcrd;
  frmdt: string;
  todt: string;
  errMssge: boolean;
  showLdr: boolean;
  permissions: any;
  dsbleSbmtBtn: boolean;
  getHeaderDtls = function (): any { return { "title": 'ZTC File Creation', "icon": "people_outline" }; };
  shwPermMsg: string;

  constructor(private fb: FormBuilder, public apiService: CrudService, public snackBar: MatSnackBar) { 
    const permTxt = 'ZTC File Creation';
    const prmeRte = `user/permissions/${permTxt}`;
    this.apiService.get(prmeRte).subscribe((res) => {
      if (res['data']){
        this.permissions = res['data'][0];
      } else{
        this.shwPermMsg = 'You do not have permissions to do this operation. Please contact Administrator to get permissions.';
      }
    });
  }

  ngOnInit() {
    this.ZtcForm = this.fb.group({
      Frmdt: ['', Validators.required],
      Todt: ['', Validators.required],
    })
    this.ZtcForm1 = this.fb.group({
      caf_id: ['', Validators.required]
    })
    this.ZtcForm2 = this.fb.group({
      Upd_excl: ['', Validators.required]
    })
    // this.ZtcForm1.get('caf_id').valueChanges
    //   .pipe(
    //     debounceTime(500),
    //     tap(() => {
    //       this.errorMsg = "";
    //       this.filteredcafs = [];
    //       this.isLoading = true;
    //     }),
    //     switchMap((value) => {
    //       if (value.length >= 2) {
    //         return this.apiService.get('caf/getCafBySearch/' + value)
    //           .pipe(
    //             finalize(() => {
    //               this.isLoading = false
    //             }),
    //           )
    //       }
    //     })
    //   )
    //   .subscribe(data => {
    //     if (data['data'] == undefined) {
    //       this.errorMsg = data['Error'];
    //       this.filteredcafs = [];
    //     } else {
    //       this.errorMsg = "";
    //       this.filteredcafs = data['data'];
    //       console.log(this.filteredcafs)
    //     }

    //   })


  }
  displayFn(caf) {
    if (caf) { return caf.cstmr_nm }
  }
  submit() {
    this.Filedtls = []
    if (this.ZtcForm.value.Frmdt!="") {
      console.log("in if")
      var date = new Date(this.ZtcForm.value.Frmdt),
        mnth = ("0" + (date.getMonth() + 1)).slice(-2),
        day = ("0" + date.getDate()).slice(-2);
      this.frmdt = [date.getFullYear(), mnth, day].join("-");
      var date1 = new Date(this.ZtcForm.value.Todt),
        mnth = ("0" + (date1.getMonth() + 1)).slice(-2),
        day = ("0" + date1.getDate()).slice(-2);
      this.todt = [date1.getFullYear(), mnth, day].join("-");
      var rte = `user/getxml/${this.frmdt}/${this.todt}`;
    }
    else if (this.ZtcForm1.value.caf_id!="") {
      console.log("in else")
      var rte = `user/getxml/${this.ZtcForm1.value.caf_id}`;
    }
    if(this.ZtcForm.value.Frmdt!="" && this.ZtcForm1.value.caf_id!=""){
       this.errMssge = true
    }
    else{
      this.errMssge = false
      this.showLdr = true;
      this.apiService.get(rte).subscribe(res => {
        console.log(res)
        this.Filedtls = res['data'];
        if (res['status'] == 200) {
          this.showLdr = false;
          if(res['data'].err == 'nouser'){
            this.snackBar.open("Customer Not Exist", '', {
              duration: 2000,
              panelClass: ['blue-snackbar'],
              horizontalPosition: this.horizontalPosition,
              verticalPosition: this.verticalPosition,
            });
          }
          else{
          this.snackBar.open("Sucessfully Added", '', {
            duration: 2000,
            panelClass: ['blue-snackbar'],
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
          });
        }
        if(res['data'].err == 'nodatafound'){
          this.showLdr = false;
          this.snackBar.open("Data Not exist to this customer", '', {
            duration: 2000,
            panelClass: ['blue-snackbar'],
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
          });
        }
        }
      })
    }
  }
  onCellPrepared(colDef, e: any) {
    if ((e.rowType === "data" && e.row.data && e.column.dataField === 'dsn_fle_path') || (e.rowType === "data" && e.row.data && e.column.dataField === 'ztc_fle_path')) {
      e.cellElement.style.color = '#337ab7';
      e.cellElement.style.cursor = "pointer";
    }
  }
  onCellClick(e) {
    console.log(e)
    if (e.column.dataField === 'dsn_fle_path') {
      console.log("fndjsfbjshdfsd")
      console.log(e.column)
    }
  }
  // download(){
  //   let rte=`ztc`
  //   let data={
  //     path:202046,
  //     fm:'DSNW26fd1678.xml'
  //   }
  //   this.apiService.getbydata1(rte,data).subscribe(res => {
  //     console.log(res)
  //   })
  // }
}
