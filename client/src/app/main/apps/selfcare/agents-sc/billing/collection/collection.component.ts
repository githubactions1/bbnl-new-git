import { Component, OnInit, ViewChild } from '@angular/core';
import { CrudService } from 'app/main/apps/crud.service';
import { DsSidebarService } from '@glits/components/sidebar/sidebar.service';
import { AtomService } from 'app/main/services/atom.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition, MatDialog } from '@angular/material';
import { DeleteDialogComponent } from 'app/main/shared/components/delete-dialog/delete-dialog.component';
import { UserService } from 'app/providers/user/user.serivce';

@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.scss']
})
export class CollectionComponent implements OnInit {
  permissions;
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  cafnumber: any;
  mobilenumber: any;
  columnDefs: any[];
  collectionData: any;
  lmocd: any;
  agnt_id: any;
  sidebar: boolean = false;
  amount: any;
  paymntcode: any;
  paymntodes: any;
  finalSum: any;
  remaingSum:any;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  cstmr_id: any;
  cstmrDueDetails: any;
  detailColumnsDefs: any[];
  lopData: any;
  frontloopdata: any;
  getHeaderDtls = function () { return { "title": "Payments-collection from customers", "icon": "list_alt" } }
  paymd: any;

  constructor(private dsSidebarService: DsSidebarService, public crdsrv: CrudService, public atmSrv: AtomService, private formBuilder: FormBuilder, public snackBar: MatSnackBar, private userService: UserService) {
    this.permissions = { "slct_in": 1, "insrt_in": 1, "updt_in": 1, "dlte_in": 1, "exprt_in": 0 }
    this.userService.USER_DETAILS.subscribe(val => {
      if (val.usr_ctgry_id == 8) {
        this.lmocd = val.lmo_cd
        this.agnt_id = val.usr_ctgry_ky
      }
    });
  }

  ngOnInit() {
    this.firstFormGroup = this.formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this.formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
    this.getdetails();
    this.paymodes();
  }
  paymodes() {
    let rte = 'olt/payment/modes'
    this.crdsrv.get(rte).subscribe((res) => {
      this.paymntodes = res['data']
      console.log(this.paymntodes);
    })
  }

  getdetails() {
    let data = {
      agntID: this.agnt_id,
      caf_nu: (this.cafnumber == undefined) || (this.cafnumber == '') ? 0 : this.cafnumber,
      mbl_nu: (this.mobilenumber == undefined) || (this.mobilenumber == '') ? 0 : this.mobilenumber,
    }
    let rte = 'olt/collectionData'
    this.crdsrv.create(data, rte).subscribe((res) => {
      console.log(res['data'])
      this.collectionData = res['data'];
      console.log(this.collectionData);
      var index = 0
      for (var k = 0; k < this.collectionData.length; k++) {
        index = index + 1;
        this.collectionData[k].sno = index
      }
      console.log(this.collectionData);
      if (res['status'] == 200) {
        this.columnDefs = [
          { headerName: 'Sno', field: 'sno', algnmnt: 'center', format: false, cellClass: "pm-grid-number-cell", width: 50, sortable: true, filter: false },
          { headerName: 'CAF Number', field: 'caf_nu', algnmnt: 'center', format: false, cellClass: "pm-grid-number-cell", width: 120, sortable: true, filter: false },
          // tslint:disable-next-line:max-line-length
          { headerName: 'Customer Name', field: 'cstmr_nm', format: false, cellStyle: { 'text-align': "center" }, cellClass: "pm-grid-number-cell", width: 290, sortable: true, filter: true },
          // tslint:disable-next-line:max-line-length
          { headerName: 'First Name', field: 'frst_nm', format: false, cellStyle: { 'text-align': "center" }, cellClass: "pm-grid-number-cell", width: 290, sortable: true, filter: true },
          // tslint:disable-next-line:max-line-length
          { headerName: 'Last Name', field: 'lst_nm', format: false, cellStyle: { 'text-align': "center" }, cellClass: "pm-grid-number-cell", width: 170, sortable: true, filter: false },
          // tslint:disable-next-line:max-line-length
          { headerName: 'Mobile Number', field: 'mbl_nu', format: false, cellStyle: { 'text-align': "center" }, cellClass: "pm-grid-number-cell", width: 140, sortable: true, filter: false },
          { headerName: 'Aadhar Number', field: 'adhr_nu', format: false, algnmnt: 'center', cellClass: "pm-grid-number-cell", width: 140, sortable: true, filter: false },
          { headerName: 'Invoice Date', field: 'ltst_inv_dt', format: false, algnmnt: 'center', cellClass: "pm-grid-number-cell", width: 150, sortable: true, filter: false },
          // tslint:disable-next-line:max-line-length
          { headerName: 'Invoice Amount', field: 'ltst_inv_amnt', algnmnt: 'right', format: true, type: 'currency', currency: 'INR', precision: '2', cellClass: "pm-grid-number-cell", width: 130, sortable: true, filter: false },
          // tslint:disable-next-line:max-line-length
          { headerName: 'Pending Amount', field: 'prvs_blnc', algnmnt: 'right', format: true, type: 'currency', currency: 'INR', precision: '2', cellClass: "pm-grid-number-cell", width: 150, sortable: true, filter: false },
          { headerName: 'Status', field: 'lbl_txt', algnmnt: 'center', cellClass: "pm-grid-number-cell", width: 130, sortable: true, filter: false },
          // { headerName: 'Wallet', field: 'wallet', cellStyle: { 'text-align': "center" }, cellClass: "pm-grid-number-cell", width: 140,sortable: true,filter: false},
          // { headerName: 'Credit Limit', field: 'crdt_lmt', cellStyle: { 'text-align': "center" }, cellClass: "pm-grid-number-cell", width: 140,sortable: true,filter: false},
          // { headerName: 'Remaining Limit', field: 'rmng_lmt', cellStyle: { 'text-align': "center" }, cellClass: "pm-grid-number-cell", width: 140,sortable: true,filter: false},
        ]
      }
    })
  }
  onCellClick(data) {
    console.log(data.data);
    this.cstmr_id = data.data.cstmr_id
    this.sidebar = true;
    let rte = `olt/invoice/dueamount/${this.cstmr_id}/${this.agnt_id}`
    this.crdsrv.get(rte).subscribe((res) => {
      this.cstmrDueDetails = res['data']
      console.log(this.cstmrDueDetails);
      var srno = 0
      for (var k = 0; k < this.cstmrDueDetails.length; k++) {
        srno = srno + 1;
        this.cstmrDueDetails[k].sno = srno
      }
      if (res['status'] == 200) {
        this.detailColumnsDefs = [
          { headerName: 'Sno', field: 'sno', cellStyle: { 'text-align': "center" }, cellClass: "pm-grid-number-cell", width: 80, sortable: true, filter: false },
          { headerName: 'CAF Invoice Id', field: 'caf_invce_id', cellStyle: { 'text-align': "center" }, cellClass: "pm-grid-number-cell", width: 150, sortable: true, filter: false },
          { headerName: 'Invoice From Date', field: 'invce_frm_dt', cellStyle: { 'text-align': "center" }, cellClass: "pm-grid-number-cell", width: 180, sortable: true, filter: false },
          { headerName: 'Invoice To Date', field: 'invce_to_dt', cellStyle: { 'text-align': "center" }, cellClass: "pm-grid-number-cell", width: 150, sortable: true, filter: false },
          { headerName: 'Package', field: 'pckge_nm', cellStyle: { 'text-align': "center" }, cellClass: "pm-grid-number-cell", width: 180, sortable: true, filter: false },
          { headerName: 'Charge Amount', field: 'amnt', cellStyle: { 'text-align': "center" }, cellClass: "pm-grid-number-cell", width: 120, sortable: true, filter: false },
          { headerName: 'Tax Amount', field: 'tax_at', cellStyle: { 'text-align': "center" }, cellClass: "pm-grid-number-cell", width: 130, sortable: true, filter: false },
          { headerName: 'Total Amount', field: 'tl_at', cellStyle: { 'text-align': "center" }, cellClass: "pm-grid-number-cell", width: 120, sortable: true, filter: false },
          { headerName: 'Invoice Year', field: 'invce_yr', cellStyle: { 'text-align': "center" }, cellClass: "pm-grid-number-cell", width: 110, sortable: true, filter: false },
          { headerName: 'Payment Status', field: 'Payment Status', cellStyle: { 'text-align': "center" }, cellClass: "pm-grid-number-cell", width: 110, sortable: true, filter: false },
        ]
      }
    })
    this.openSideBar('addFormPanel');
  }
  openSideBar(key) {
    this.dsSidebarService.getSidebar(key).toggleOpen();
  }
  closeSideBar() {
    this.dsSidebarService.getSidebar('addFormPanel').toggleOpen();
  }
  selectInvoices(eventDta) {
    var forData = []
    this.finalSum = [];
    this.remaingSum = [];
    var arry = 0;
    var arryTwo = 0;
    this.lopData = eventDta.selectedRowsData
    console.log(this.lopData);
    console.log(this.cstmrDueDetails);
    for (var j = 0; j < this.lopData.length; j++) {
      arry = arry + this.lopData[j].due_amnt;
      if (j + 1 == this.lopData.length) {
        console.log("arry");
        console.log(arry);
        this.finalSum = Math.round(arry);
        console.log(this.finalSum);
      }
    }
    var ar1 = this.lopData, ar2 = this.cstmrDueDetails, selectedData = [],  remngData= [];
    for (let l = 0; l < ar2.length; l++) {
      var temp = false;
      for (let m = 0; m < ar1.length; m++) {
        if (ar2[l].caf_invce_id == ar1[m].caf_invce_id) {
          temp = true;
          break
        }
      }
      if (temp) {
        selectedData.push(ar2[l]);
      }
      else {
        remngData.push(ar2[l]);
      }
      temp = false;
    }
    // console.log(selectedData);
    console.log(remngData);
    for (var t = 0; t < remngData.length; t++) {
      arryTwo = arryTwo + remngData[t].due_amnt;
      if (t + 1 == remngData.length) {
        console.log("arry");
        console.log(arryTwo);
        this.remaingSum = arryTwo;
        console.log(this.remaingSum);
      }
    }

    // for (var i = 0; i < this.lopData.length; i++) {
    //   forData.push({
    //     invce_id: this.lopData[i].caf_invce_id, invce_dt: this.lopData[i].invce_dt, invce_yr: this.lopData[i].invce_yr, caf_id: this.lopData[i].caf_id, caf_nu: this.lopData[i].caf_nu, cstmr_id: this.lopData[i].cstmr_id, agnt_id: this.lopData[i].agnt_id,
    //     agnt_nm: this.lopData[i].agnt_nm, due_amnt: this.lopData[i].due_amnt, paymode: '', amount: '', pmnt_id: ''
    //   })
    // }
    console.log(forData);
    this.frontloopdata = forData;
    console.log(this.frontloopdata);
  }
  save() {
    console.log(this.lopData);
    console.log(this.paymd);
    console.log(this.remaingSum);
    var finalDta = []

    for (let i = 0; i < this.lopData.length; i++) {
        finalDta.push({
          invce_id: this.lopData[i].caf_invce_id, 
          invce_dt: this.lopData[i].invce_dt, 
          invce_yr: this.lopData[i].invce_yr, 
          caf_id: this.lopData[i].caf_id, 
          caf_nu: this.lopData[i].caf_nu, 
          cstmr_id: this.lopData[i].cstmr_id,
          agnt_id: this.lopData[i].agnt_id,
          agnt_nm: this.lopData[i].agnt_nm,
          due_amnt: this.lopData[i].due_amnt, 
          paymode: this.paymd,
          amount: this.lopData[i].due_amnt,
          pmnt_id: '',
          pnd_bal_amnt: Math.round(this.remaingSum)
        })
      }
   
    let data = {
       insertData :finalDta,
       agntID:this.agnt_id,
    }
    console.log(data);
    let rot='olt/paying/dueamount'
    this.crdsrv.create(data,rot).subscribe((res) => {
      console.log(res['status'])
      if(res['data'] == 200){
        this.snackBar.open("Sucessfully Payed", '', {
          duration: 2000,
          panelClass: ['blue-snackbar'],
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
      }
    })
  }
}
