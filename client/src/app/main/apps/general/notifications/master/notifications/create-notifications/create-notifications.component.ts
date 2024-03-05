import { Component, OnInit } from '@angular/core';
import { CrudService } from 'app/main/apps/crud.service';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material';
import { DsSidebarService } from '@glits/components/sidebar/sidebar.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-notifications',
  templateUrl: './create-notifications.component.html',
  styleUrls: ['./create-notifications.component.scss']
})
export class CreateNotificationsComponent implements OnInit {
  /**
 * Constructor
 *  @param {DsSidebarService} _dsSidebarService
 */
public newNtfctnForm: FormGroup;
horizontalPosition: MatSnackBarHorizontalPosition = 'right';
verticalPosition: MatSnackBarVerticalPosition = 'top';
icnsLst: any;
usrdtls: any;
ntfctnLst: any;
loader: boolean;
grpLst: any;
selectedoptions: any;
ntfnCatLst: any;
allNotfctnsLst: any;
pagination: boolean = true;
paginationPageSize = 10;
columnDefs = [];
getRowHeight;

  constructor(private _dsSidebarService: DsSidebarService, public apiSrvc: CrudService, public snackBar: MatSnackBar) { 
    let rowHeight = 40;
    this.getRowHeight = function (params) {
      return rowHeight;
    };
  }

  ngOnInit() {
    this.newNtfctnForm = new FormGroup({
      ntfnMsg: new FormControl('', [Validators.required]),
      catgryId : new FormControl('', [Validators.required]),
      grpControl: new FormControl('', [Validators.required])
    });
    this.getNotfctnTyp();
    this.getusrGrpLst();
    this.getAllNotfctns();
  }
  
  getAllNotfctns(): void{
    let rte = "alert/user/notifications";
      this.loader = true;
      let counter = 0;
      this.apiSrvc.get(rte).subscribe((res) => {
        this.allNotfctnsLst = res['data'];
        this.allNotfctnsLst.filter((k) => {
          k['sno'] = ++counter;
        });
        this.columnDefs = [
          { headerName: 'Sno', field: 'sno', cellStyle: { 'text-align': "center" }, cellClass: "pm-grid-number-cell", width: 100 },
          { headerName: 'Notification Text', field: 'alert_tx', cellStyle: { 'text-align': "left" }, cellClass: "pm-grid-number-cell", width: 350, filter: true},
          { headerName: 'Notification Category', field: 'alert_cat_nm', cellStyle: { 'text-align': "left" }, cellClass: "pm-grid-number-cell", width: 350, filter: true},
          { headerName: 'Notification Group', field: 'grp_nm', cellStyle: { 'text-align': "left" }, cellClass: "pm-grid-number-cell", width: 350, filter: true},
          { headerName: 'Created On', field: 'dt', cellStyle: { 'text-align': "left" }, cellClass: "pm-grid-number-cell", width: 450, filter: true }
        ];

        this.loader = false;
      }, (error) => {
        console.log(error);
      });
  }
  private getNotfctnTyp(): void {
    let rte = "alert/ntfctnTypLst";
      this.loader = true;
      this.apiSrvc.get(rte).subscribe((res) => {
        this.ntfnCatLst = res['data'];
        this.loader = false;
      }, (error) => {
        console.log(error);
      });
  }

  getusrGrpLst() {
    let rte = `alert/usrGrpLst`;
    this.loader = true;
    this.apiSrvc.get(rte).subscribe((res) => {
      this.grpLst = res['data'];
      this.loader = false;
    }, (error) => {
      console.log(error);
    });
  }

  public hasError(controlName: string, errorName: string): boolean {
    return this.newNtfctnForm.controls[controlName].hasError(errorName);
  }

  public createNtfctn(newNtfctnFormValue): void {
    if (this.newNtfctnForm.valid) {
      this.executeNtfctnCreation(newNtfctnFormValue);
    }
  }

  private executeNtfctnCreation(newNtfctnFormValue): void {
    // newNtfctnFormValue.usrId = this.usrdtls.user_id;
    // newNtfctnFormValue.mrchntID = this.usrdtls.mrcht_id;

    let rte = "alert/newNtfctn";
    this.apiSrvc.create(newNtfctnFormValue, rte).subscribe((res) => {
      if (res['status'] == 200) {
        this.snackBar.open("Sucessfully Added", '', {
          duration: 2000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
        this.opensideBar('addNotfctn', null);
        this.newNtfctnForm.reset();
        this.getAllNotfctns();
      }
    }, (error) => {
      console.log(error);
    });
  }

  opensideBar(key, value): void {
    this._dsSidebarService.getSidebar(key).toggleOpen();
    this.newNtfctnForm.reset();
  }
}
