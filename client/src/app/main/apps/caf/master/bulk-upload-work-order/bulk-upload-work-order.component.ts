import { Component, OnInit } from '@angular/core';
import { CrudService } from 'app/main/apps/crud.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DsSidebarService } from '@glits/components/sidebar/sidebar.service';
import { MatSnackBar, MatSnackBarVerticalPosition, MatSnackBarHorizontalPosition, MatDialogRef, MatDialog } from '@angular/material';
import { DeleteDialogComponent } from 'app/main/shared/components/delete-dialog/delete-dialog.component';
@Component({
  selector: 'app-bulk-upload-work-order',
  templateUrl: './bulk-upload-work-order.component.html',
  styleUrls: ['./bulk-upload-work-order.component.scss']
})
export class BulkUploadWorkOrderComponent implements OnInit {
  getHeaderDtls = function () { return { "title": "Work order", "icon": "list_alt" } }
  permissions: any;
  columnDefs = [];
  rowData = [];
  deleteCstmr: boolean;
  firstFormGroup: FormGroup;
  sideBarHeader: string;
  editClicked: boolean = false;
  updateData: any;
  agntid: any;
  blk_id: any;
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  confirmDialogRef: MatDialogRef<DeleteDialogComponent>;
  constructor(private crdsrv: CrudService, private _fuseSidebarService: DsSidebarService, public dialog: MatDialog, private snackBar: MatSnackBar, private route: Router, private _formBuilder: FormBuilder,) { }

  ngOnInit() {
    this.permissions = { "slct_in": 1, "insrt_in": 1, "updt_in": 1, "dlte_in": 1, "exprt_in": 1 };
    let emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
    let phoneNumber = /^(\+\d{1,3}[- ]?)?\d{10}$/;
    this.firstFormGroup = this._formBuilder.group({
      // firstCtrl: ['', Validators.required],
      firstName: ['', Validators.required],
      cnt_nm: ['', Validators],
      email: ['', [Validators.pattern(emailPattern)]],
      mobileNumber: ['', [Validators.required, Validators.pattern(phoneNumber)]],
      dstrt_nm: ['', Validators.required],
      mndl_nm: ['', Validators.required],
      vlge_nm: ['', Validators.required],
      lmo_cd: ['', Validators],
      olt_loc: ['', Validators.required],

    });
    this.getdata()
  }
  getdata() {
    const rte = `caf/blkdtls`;
    this.crdsrv.get(rte).subscribe((res) => {
      // console.log(res['data']);


      this.rowData = res['data'];
      let counter = 0;
      this.rowData.filter((k) => {
        k['s_no'] = ++counter;
      });
      console.log(this.rowData)
      this.columnDefs = [
        { headerName: 'Sno', field: 's_no', algnmnt: "center", cellClass: "pm-grid-number-cell", width: 50, filter: false, search: false, columnFiltering: false },
        { headerName: 'First Name', field: 'frst_nm', cellClass: "pm-grid-number-cell", width: 250, filter: true, columnFiltering: false },
        { headerName: 'Contact Person Name', field: 'contct_nm', cellClass: "pm-grid-number-cell", width: 300, filter: true, hide: false, columnFiltering: false },
        // { headerName: 'Mobile Number', field: 'contct_mb_nu', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 150, filter: true , columnFiltering: false, filterOperations: [ 'contains', 'startswith', '=' ], selectedFilterOperation: 'contains', allowFiltering: true },
        // { headerName: 'Mobile Number', field: 'contct_mb_nu',  algnmnt: "center", cellClass: "pm-grid-number-cell", width: 150, filter: true, columnFiltering: false },
        { headerName: 'Email', field: 'loc_eml1_tx', cellClass: "pm-grid-number-cell", width: 200, filter: true, columnFiltering: false },
        {
          headerName: 'olt location', field: 'olt_lc_nm', cellStyle: { 'text-align': "left" }, cellClass: "pm-grid-number-cell",
          width: 150, filter: true, columnFiltering: true
        },
        { headerName: 'District', field: 'dstrct_nm', algnmnt: "center", cellClass: "pm-grid-number-cell", width: 150, filter: true, columnFiltering: false },
        { headerName: 'Mandal', field: 'mndl_nm', cellClass: "pm-grid-number-cell", width: 150, filter: true, hide: false, columnFiltering: false },
        { headerName: 'Village', field: 'vlge_nm', cellClass: "pm-grid-number-cell", width: 150, filter: true, hide: false, columnFiltering: false },

      ];


    }, (error) => {
      //// console.log(error);
    });
  }
  onCellClick(event) {
    console.log(event);
    if (event.cellElement.innerText == 'Edit') {
      // this.editentry(event.data);

      this.deleteCstmr = false;
      this.opensideBar('addFormPanel', event.data);

    } else if (event.cellElement.innerText == 'Delete') {
      this.deleteCstmr = true;
      this.opensideBar('addFormPanel', event.data);
    }

  }
  opensideBar(key, cstmrUpdtData) {

    if (cstmrUpdtData) {
      console.log("edit")
      console.log(this.firstFormGroup)
      console.log(cstmrUpdtData);
      this.sideBarHeader = 'Edit';
      this.editClicked = true;
      this.updateData = cstmrUpdtData;
      this.blk_id = cstmrUpdtData.blk_id
      this.firstFormGroup.get('firstName').setValue(cstmrUpdtData.frst_nm);
      this.firstFormGroup.get('cnt_nm').setValue(cstmrUpdtData.contct_nm);
      this.firstFormGroup.get('mobileNumber').setValue(cstmrUpdtData.contct_mb_nu);
      this.firstFormGroup.get('dstrt_nm').setValue(cstmrUpdtData.dstrct_nm);
      this.firstFormGroup.get('vlge_nm').setValue(cstmrUpdtData.vlge_nm);
      this.firstFormGroup.get('mndl_nm').setValue(cstmrUpdtData.mndl_nm);
      this.firstFormGroup.get('lmo_cd').setValue(cstmrUpdtData.agnt_cd);
      this.firstFormGroup.get('olt_loc').setValue(cstmrUpdtData.olt_lc_nm);
      this.firstFormGroup.get('email').setValue(cstmrUpdtData.email);
    }

    // console.log(orgUpdtData);

    // this.FormLoctn.get('orgn_nm').setValue('');

    this._fuseSidebarService.getSidebar(key).toggleOpen();
  }
  saveCustomer() {
    if (this.deleteCstmr == true) {
      this.delete(this.updateData);
    } else {
      this.getagntid()

    }
  }
  getagntid() {
    console.log('lmoid')
    const rte = `caf/agntid/${this.firstFormGroup.value.lmo_cd}`;
    this.crdsrv.get(rte).subscribe((res) => {
      console.log('lmoid')
      this.agntid = res['data'];
      console.log(this.agntid)
      this.update();

    })
  }
  closeSideBar = function () {
    this._fuseSidebarService.getSidebar('addFormPanel').toggleOpen();
    this.firstFormGroup.reset();
  }
  update() {
    const rte = `caf/bulk/update`;
    let cstmrData = {
      agnt_id: this.agntid[0]["agnt_id"],
      blk_id: this.blk_id,
      firstName: this.firstFormGroup.value.firstName,
      cnt_nm: this.firstFormGroup.value.cnt_nm,
      mobileNumber: this.firstFormGroup.value.mobileNumber,
      dstrt_nm: this.firstFormGroup.value.dstrt_nm,
      vlge_nm: this.firstFormGroup.value.vlge_nm,
      mndl_nm: this.firstFormGroup.value.mndl_nm,
      olt_loc: this.firstFormGroup.value.olt_loc,
      email: this.firstFormGroup.value.email,
    };
    console.log(cstmrData)
    this.crdsrv.create(cstmrData, rte).subscribe((res) => {
      if (res['status'] == 200) {
        this.snackBar.open("Sucessfully Updated", '', {
          duration: 3000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });

        this.opensideBar('addFormPanel', null);
        this.getdata()
      }
    }, (error) => {
      console.log(error);
    });
  }
  delete(data) {
    console.log("delete");
    console.log(data);
    this.confirmDialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '25%',
      panelClass: 'my-class',
      data: { message: 'Are you sure deleting this item ?', flag: false, rte: `caf/bulk/delete/${this.blk_id}` }
    });

    this.confirmDialogRef.afterClosed().subscribe((response) => {
      if (response == undefined) { }
      else if (response.status == 200) {
        this.snackBar.open("Sucessfully Deleted", '', {
          duration: 3000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
        this.getdata()
        this.opensideBar('addFormPanel', null);
      }
    });




  }

}

