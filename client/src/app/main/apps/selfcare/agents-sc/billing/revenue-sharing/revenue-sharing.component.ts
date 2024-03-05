import { Component, OnInit, ViewChild } from '@angular/core';
import { CrudService } from 'app/main/apps/crud.service';
import { DsSidebarService } from '@glits/components/sidebar/sidebar.service';
import { AtomService } from 'app/main/services/atom.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition, MatDialog } from '@angular/material';
import { UserService } from 'app/providers/user/user.serivce';
import { MessageDialogComponent } from 'app/main/shared/components/message-dialog/message-dialog.component';
import { yearsPerPage } from '@angular/material/datepicker/typings/multi-year-view';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-revenue-sharing',
  templateUrl: './revenue-sharing.component.html',
  styleUrls: ['./revenue-sharing.component.scss']
})
export class RevenueSharingComponent implements OnInit {
  lmocd: any;
  agnt_id: any;
  permissions;
  getHeaderDtls = function (): any { return { 'title': 'Revenue Sharing', 'icon': 'list_alt'}; };
  year: any;
  loader:boolean;
  months: any;
  slctdyear: any;
  monThWiseData: any;
  gridColumnDefs:any;
  custmerWiseData: any;
  custmerWisedetailsData: any;


  constructor(private _dsSidebarService: DsSidebarService, public crdsrv: CrudService, public atmSrv: AtomService,
    private formBuilder: FormBuilder, public snackBar: MatSnackBar, private userService: UserService, public dialog: MatDialog,
    private route: Router) {
      this.permissions = { 'slct_in': 1, 'insrt_in': 1, 'updt_in': 1, 'dlte_in': 1, 'exprt_in': 1 };
      this.userService.USER_DETAILS.subscribe(val => {
        if (val.usr_ctgry_id === 8) {
          this.lmocd = val.lmo_cd;
          this.agnt_id = val.usr_ctgry_ky;
        }
      });
      this.months = [{ mnth_nm: 'January', mnth_id: 1 },
      { mnth_nm: 'February', mnth_id: 2 },
      { mnth_nm: 'March', mnth_id: 3 },
      { mnth_nm: 'April', mnth_id: 4 },
      { mnth_nm: 'May', mnth_id: 5 },
      { mnth_nm: 'June', mnth_id: 6 },
      { mnth_nm: 'July', mnth_id: 7 },
      { mnth_nm: 'August', mnth_id: 8 },
      { mnth_nm: 'September', mnth_id: 9 },
      { mnth_nm: 'October', mnth_id: 10 },
      { mnth_nm: 'November', mnth_id: 11 },
      { mnth_nm: 'December', mnth_id: 12 }];
      this.year = [{ yr_nm: 2016, yr_id: 2016 },{ yr_nm: 2017, yr_id: 2017 }, { yr_nm: 2018, yr_id: 2018 }, { yr_nm: 2019, yr_id: 2019 }, { yr_nm: 2020, yr_id: 2020},{ yr_nm: 2021, yr_id: 2021},{ yr_nm: 2022, yr_id: 2022},
	  { yr_nm: 2023, yr_id: 2023}]
     }

  ngOnInit() {
    this.getrevenuesharngByYear();
  }
  getrevenuesharngByYear(){
    this.loader = true;
    let data = {
      yearid: this.slctdyear,
      agnt_id: this.agnt_id
    };
    let rte = `billing/revenue/sharing/lmo/monthly`;
    this.crdsrv.create(data, rte).subscribe((res) => {
      this.monThWiseData = res['data'];
      console.log(this.monThWiseData);
      let index=1;
      for (let i=0; i<this.monThWiseData.length; i++){
        this.monThWiseData[i]['sno'] = index++;
        for (let j = 0; j < this.months.length; j++){
          if (this.monThWiseData[i].monthid == this.months[j].mnth_id){
            this.monThWiseData[i]['monthname'] = this.months[j].mnth_nm;
          }
        }
      }
      console.log(this.monThWiseData)
      if (res['status'] == 200) {
        this.loader=false;
        this.gridColumnDefs = [
          { headerName: 'Sno', field: 'sno', algnmnt: 'center', cellClass: "pm-grid-number-cell", width: 50, sortable: true, filter: false, format: false },
          // { headerName: 'LMO Code', field: 'agnt_cd', cellClass: "pm-grid-number-cell", width: 150 },
          { headerName: 'Month', field: 'monthname',  cellClass: "pm-grid-number-cell", width: 150},
          { headerName: 'Year', field: 'year', algnmnt: 'center', cellClass: "pm-grid-number-cell", width: 100, format: false},
          // tslint:disable-next-line:max-line-length
          { headerName: 'APSFL Share', algnmnt: 'right', field: 'apsflshare', format: true, type: 'currency', currency: 'INR', precision: '2', cellClass: "pm-grid-number-cell", width: 150, sortable: true, filter: true },
          // tslint:disable-next-line:max-line-length
          { headerName: 'MSO Share', algnmnt: 'right', field: 'msoshare',  format: true, type: 'currency', currency: 'INR', precision: '2',  cellClass: "pm-grid-number-cell", width: 150, sortable: true, filter: true },
          // tslint:disable-next-line:max-line-length
          { headerName: 'LMO Share', algnmnt: 'right', field: 'lmoshare', format: true,  type: 'currency', currency: 'INR', precision: '2',  cellClass: "pm-grid-number-cell", width: 150, sortable: true, filter: true },
          // tslint:disable-next-line:max-line-length
          { headerName: 'Total Bill', algnmnt: 'right', field: 'total', format: true, type: 'currency', currency: 'INR', precision: '2',  cellClass: "pm-grid-number-cell", width: 150, sortable: true, filter: true },
          { headerName: 'CAF Count', algnmnt: 'center', field: 'cafcount', format: false,  cellClass: "pm-grid-number-cell", width: 150, sortable: true, filter: true },
          { headerName: 'Paid Count', algnmnt: 'center', field: 'Paid', format: false,  cellClass: "pm-grid-number-cell", width: 100, sortable: true, filter: true },
          { headerName: 'Not Paid Count', algnmnt: 'center', field: 'NotPaid', format: false,  cellClass: "pm-grid-number-cell", width: 150, sortable: true, filter: true },
        ];
      }
    });
  }
  getdetails(){
    this.getrevenuesharngByYear();
  }
  // onCellClick(FrstSelected){
  //   console.log(FrstSelected.data)
  //   let data ={
  //     agentid:this.agnt_id,
  //     year:FrstSelected.data.year,
  //     month:FrstSelected.data.monthid
  //   }
  //   console.log(data)
  //   let rte=`olt/revenueSharing/customer`
  //   this.crdsrv.create(data,rte).subscribe((res) => {
  //     this.custmerWiseData = res['data']
  //     console.log(this.custmerWiseData)
  //     let ind=1;
  //     for(var k=0; k<this.custmerWiseData.length; k++){
  //       this.custmerWiseData[k]['Sno'] = ind++;
  //     }
  //     console.log(this.custmerWiseData);
  //   })

  // }
  // onScdCellClick(i){
  //       console.log(i.data['Invoice Id']);
  //       let data ={
  //         caf_invce_id:i.data['Invoice Id'],
  //       }
  //       let rte=`olt/revenueSharing/customerdetails`
  //   this.crdsrv.create(data,rte).subscribe((res) => {
  //     this.custmerWisedetailsData = res['data']
  //     console.log(this.custmerWisedetailsData)
  //     let ind=1;
  //     for(var k=0; k<this.custmerWisedetailsData.length; k++){
  //       this.custmerWisedetailsData[k]['Sno'] = ind++;
  //     }
  //     console.log(this.custmerWisedetailsData);
  //   })

  // }
  onRowExpanding(e){
    e.component.collapseAll(-1);
    console.log(e.key);
    console.log(e.key.year);
       let data = {
      agnt_id: this.agnt_id,
      invce_yr: e.key.year,
      invoice_month: e.key.monthid,
      dstrt_id: e.key.ofce_dstrt_id
     };
    let rte = `billing/revenue/sharing/lmo`;
    this.crdsrv.create(data, rte).subscribe((res) => {
      this.custmerWiseData = res['data'];
      console.log(this.custmerWiseData);
      let ind = 1;
      for (let k=0; k < this.custmerWiseData.length; k++){
        this.custmerWiseData[k]['Sno'] = ind++;
        for (let j = 0; j < this.months.length; j++) {
          if (this.custmerWiseData[k].invce_mm == this.months[j].mnth_id) {
            this.custmerWiseData[k]['monthname'] = this.months[j].mnth_nm;
          }
        }
      }
      console.log(this.custmerWiseData);
    });
  }
  onRowExpandingtwo(f){
    f.component.collapseAll(-1);
    console.log(f.key['CAF Invoice Id']);
    let data = f.key['CAF Invoice Id'];
    let rte = `billing/revenue/sharing/lmo/customers`;
    this.crdsrv.create(data, rte).subscribe((res) => {
       this.custmerWisedetailsData = res['data'];
       console.log(this.custmerWisedetailsData);
      let ind = 1;
      for (let k = 0; k < this.custmerWisedetailsData.length; k++){
        this.custmerWisedetailsData[k]['Sno'] = ind++;
       }
       console.log(this.custmerWisedetailsData);
    });
  }



}
