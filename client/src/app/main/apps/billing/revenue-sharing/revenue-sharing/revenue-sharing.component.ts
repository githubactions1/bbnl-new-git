import { Component, OnInit, ViewChild } from '@angular/core';
import { CrudService } from 'app/main/apps/crud.service';
import { DsSidebarService } from '@glits/components/sidebar/sidebar.service';
import { AtomService } from 'app/main/services/atom.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition, MatDialog } from '@angular/material';
import { UserService } from 'app/providers/user/user.serivce';
import { MessageDialogComponent } from 'app/main/shared/components/message-dialog/message-dialog.component';
import { yearsPerPage } from '@angular/material/datepicker/typings/multi-year-view';
import { switchMap, debounceTime, tap, map, finalize } from 'rxjs/operators';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-revenue-sharing',
  templateUrl: './revenue-sharing.component.html',
  styleUrls: ['./revenue-sharing.component.scss']
})
export class RevenueSharingComponent implements OnInit {
  confirmMsgDialogRef: MatDialogRef<MessageDialogComponent>;
  aaa_mac_id: string;
  aaa_mac_id_sus: string;
  prvioususpenstn: any;
  status: any;
  permissions: any;
  year: any;
  months: any;
  districts: any;
  cafTypeLst: any;
  yearID: any;
  monthID: any;
  mnth: any;
  date = new Date();
  districtID: any;
  cafTypeID: any;
  lmoWiseData: any;
  result: boolean;
  columnDefs: any;
  selectedData: any;
  clickData: any [];
  cafcountData: any;
  secondclickData: any;
  invoiceId: any;
  invoiceData: any;
  loader: boolean;
  getHeaderDtls = function (): any { return { 'title': 'Revenue Sharing', 'icon': 'list_alt' }; };
  shwPermMsg: string;
  constructor(private fb: FormBuilder, private dsSidebarService: DsSidebarService, public crdsrv: CrudService, public atmSrv: AtomService,
    private formBuilder: FormBuilder, public snackBar: MatSnackBar, private userService: UserService, public dialog: MatDialog, public datePipe: DatePipe) {
    //  this.permissions = { 'slct_in': 1, 'insrt_in': 1, 'updt_in': 1, 'dlte_in': 1, 'exprt_in': 0 }
    // const permTxt = 'Revenue Sharing';
    // const prmeRte = `user/permissions/${permTxt}`;
    // this.crdsrv.get(prmeRte).subscribe((res) => {
    //   // console.log(res['data'][0]);
    //   this.permissions = res['data'][0];
    // });
    this.months = [{ mnth_nm: 'January', mnth_id: 1, id: '01' },
    { mnth_nm: 'February', mnth_id: 2, id: '02' },
    { mnth_nm: 'March', mnth_id: 3, id: '03' },
    { mnth_nm: 'April', mnth_id: 4, id: '04' },
    { mnth_nm: 'May', mnth_id: 5, id: '05' },
    { mnth_nm: 'June', mnth_id: 6, id: '06' },
    { mnth_nm: 'July', mnth_id: 7, id: '07' },
    { mnth_nm: 'August', mnth_id: 8, id: '08' },
    { mnth_nm: 'September', mnth_id: 9, id: '09' },
    { mnth_nm: 'October', mnth_id: 10, id: '10' },
    { mnth_nm: 'November', mnth_id: 11, id: '11' },
    { mnth_nm: 'December', mnth_id: 12, id: '12' }];
    // tslint:disable-next-line:max-line-length
    this.year = [{ yr_nm: 2016, yr_id: 2016 }, { yr_nm: 2017, yr_id: 2017 }, { yr_nm: 2018, yr_id: 2018 }, { yr_nm: 2019, yr_id: 2019 }, { yr_nm: 2020, yr_id: 2020 }, { yr_nm: 2021, yr_id: 2021 }, { yr_nm: 2022, yr_id: 2022 }, { yr_nm: 2023, yr_id: 2023 }]
    this.yearID = 2023;
    console.log(this.date);
    this.mnth = this.datePipe.transform(this.date, 'MM');
    this.months.filter((m) => {
      if (m.id == this.mnth) {
        this.monthID = m.mnth_id;
      }
    })
    console.log(this.monthID);
    // this.monthID=0;
    this.districtID = 0;
    this.cafTypeID = 0;
  }

  ngOnInit() {
    this.getDistricts();
    this.getcafType();
    this.getDetails();
  }
  getDistricts() {
    let rte = 'agent/dstrctList'
    this.crdsrv.get(rte).subscribe((res) => {
      this.districts = res['data']
      console.log(this.districts);
    })
  }
  getcafType() {
    const rte = `caf/caf-type/`;
    this.crdsrv.get(rte).subscribe(res => {
      this.cafTypeLst = res['data'];
      console.log(this.cafTypeLst);
    })
  }
  getDetails(): any {
    this.loader = true;
    console.log(this.districtID);
    console.log(this.yearID);
    console.log(this.monthID);
    console.log(this.cafTypeID);
    let postData = {
      district_id: this.districtID,
      year_id: this.yearID,
      mnth_id: this.monthID,
      caf_type_id: this.cafTypeID
    };
    console.log(postData);
    let rte = 'billing/revenue/sharing';
    this.crdsrv.create(postData, rte).subscribe((res) => {
      this.lmoWiseData = res['data'];
      console.log(this.lmoWiseData);

      if (res['perm']){
        this.permissions = res['perm'][0];
      } else{
        this.shwPermMsg = 'You do not have permissions to do this operation. Please contact Administrator to get permissions.';
      }
      
      if (res['status'] == 200 && this.lmoWiseData.length > 0) {
        this.loader = false;
        this.result = true;
        
        this.columnDefs = [
          { headerName: 'Sno', field: 's_no', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 65, sortable: true, filter: false },
          { headerName: 'LMO CODE', field: 'LMO_CODE', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 110, sortable: true, filter: true },
          { headerName: 'LMO Contact Person', field: 'lmo_contact', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 135, sortable: true, filter: true },
          { headerName: 'LMO Mobile Number', field: 'lmo_mble_nu', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 140, sortable: true, filter: true },
          { headerName: 'District', field: 'dstrt_nm', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 110, sortable: true, filter: true },
          { headerName: 'Village', field: 'vlge_nm', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 110, sortable: true, filter: true },
          { headerName: 'Invoice Year', field: 'invce_yr', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 110, sortable: true, filter: true },
          { headerName: 'Invoice Month', field: 'invce_mm', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 110, sortable: true, filter: true },
          { headerName: 'Total CAFs Count', field: 'TOTAL_CAF_COUNT', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 125, sortable: true, filter: true },
          { headerName: 'LMO Share', field: 'lmo_shre_at', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 110, sortable: true, filter: true },
          { headerName: 'MSO Share', field: 'mso_shre_at', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 110, sortable: true, filter: true },
          { headerName: 'APSFL Share', field: 'apsfl_shre_at', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 110, sortable: true, filter: true },
          { headerName: 'LMO Balance', field: 'CURRENT_LMO_BALANCE_AT', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 110, sortable: true, filter: true },
          { headerName: 'LMO Count', field: 'LMO_CT', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 110, sortable: true, filter: true },
          { headerName: 'MSO Count', field: 'MSO_CT', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 110, sortable: true, filter: true },
          { headerName: 'Revenue Amount', field: 'revanue_at', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 130, sortable: true, filter: true },
          // tslint:disable-next-line:max-line-length
          { headerName: 'Average Revenue Amount', field: 'connection_average_revanue', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 140, sortable: true, filter: true },
          { headerName: 'Individual VOIP Charges', field: 'voip_chrge_at', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 140, sortable: true, filter: true },
          { headerName: 'Individual Add On Packages', field: 'add_on_chrge_at', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 140, sortable: true, filter: true },
          { headerName: 'Box Rent', field: 'box_rent', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 110, sortable: true, filter: true },
          // tslint:disable-next-line:max-line-length
          { headerName: 'Base Packages Charge Count', field: 'base_package_chrge_at', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 130, sortable: true, filter: true },
          { headerName: 'New CAFs Invoice', field: 'NEW_CAFS_INVOICED', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 120, sortable: true, filter: true },
          // tslint:disable-next-line:max-line-length
          { headerName: 'Base Packages Charge Count', field: 'TERMINATED_CAFS_INVOICED', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 130, sortable: true, filter: true },
          // tslint:disable-next-line:max-line-length
          { headerName: 'Base Packages Charge Count', field: 'BOX_ONLY_INVOICED_CAFS', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 130, sortable: true, filter: true },
          { headerName: 'Prorated Bill CAFs', field: 'PRORATED_BILL_CAFS', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 120, sortable: true, filter: true },
          { headerName: 'VOIP CAF Count', field: 'voip_caf_ct', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 110, sortable: true, filter: true },
          { headerName: 'Individual CAFs', field: 'INV_CAFS_INVOICED', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 110, sortable: true, filter: true },
          { headerName: 'Enterprise CAF', field: 'ENT_CAFS_INVOICED', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 110, sortable: true, filter: true },
        ];
      }
      else {
        this.result = false;
        this.loader = false;
      }
    });
  }
  oltSlctn(slctData): any {
    this.selectedData = slctData.selectedRowsData;
    console.log(this.selectedData);
  }
  onCellClick(e): any {
    this.clickData=[];
    this.clickData = e.data;
    console.log(this.clickData);
    this.clickData['caf_type_id']=this.cafTypeID
    console.log(this.clickData);
    let rte = 'billing/revenue/sharing/lmo';
    this.crdsrv.create(this.clickData, rte).subscribe((res) => {
      this.cafcountData = res['data'];
      console.log(this.cafcountData);
    })

  }
  onScdCellClick(f): any {
    this.secondclickData = f.data;
    console.log(this.secondclickData['CAF Invoice Id']);
    this.invoiceId = this.secondclickData['CAF Invoice Id'];
    let rte = 'billing/revenue/sharing/lmo/customers';
    this.crdsrv.create(this.invoiceId, rte).subscribe((res) => {
      this.invoiceData = res['data'];
      console.log(this.invoiceData);
    });
  }
  onRowExpanding(e) {
    e.component.collapseAll(-1);
  }
}
