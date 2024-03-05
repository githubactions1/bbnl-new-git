import { Component, OnInit } from '@angular/core';
import { CrudService } from 'app/main/apps/crud.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar, MatDialog, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material';
import { UserService } from 'app/providers/user/user.serivce';
import { Router } from '@angular/router';
import { debounceTime, tap, switchMap, finalize } from 'rxjs/operators';

@Component({
  selector: 'app-caf-addto-termination',
  templateUrl: './caf-addto-termination.component.html',
  styleUrls: ['./caf-addto-termination.component.scss']
})
export class CafAddtoTerminationComponent implements OnInit {
  agntCafLst: any;
  agntCafLstColumnDefs = [];
  cafTrmndFormGroup: FormGroup;
  slctdCstmrs = [];
  permissions;
  fnlPostCstmrCafData;
  fnlPostCstmrCafDataColumnDefs;
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  shwLdr;
  errorMsg: any;
  filteredAgents: any[];
  lmoTrmndCafForm: FormGroup;
  isLoading: boolean;
  cafnumber: any;
  mobilenumber: any;
  aadharnumber: any;
  agnt_id: any;
  shwFltrDiv: boolean;
  getHeaderDtls = function (): any { return { 'title': 'Add CAF Termination', 'icon': 'list_alt' }; };
  usrdtls: any;
  
  
  constructor( public crdSrv: CrudService, private formBuilder: FormBuilder, public snackBar: MatSnackBar, private userService: UserService,
     public dialog: MatDialog, private route: Router) { 
      this.permissions = { 'slct_in': 1, 'insrt_in': 1, 'updt_in': 1, 'dlte_in': 1, 'exprt_in': 0 };
     }

  ngOnInit(): any {
    
    this.cafTrmndFormGroup = this.formBuilder.group({
      trmnd_desc_tx: ['']
    });
    this.lmoTrmndCafForm = this.formBuilder.group({
      lmoCode: ['', Validators.required]
    });
    this.lmoTrmndCafForm.get('lmoCode').valueChanges
        .pipe(
          debounceTime(500),
          tap(() => {
            this.errorMsg = '';
            this.filteredAgents = [];
            this.isLoading = true;
          }),
          switchMap((value) => {
            if (value){
            if (value.length >= 3 || value.length !==  null) {
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
        .subscribe(data => {
          if (data['data'] === undefined) {
            this.errorMsg = data['Error'];
            this.filteredAgents = [];
          } else {
            this.errorMsg = '';
            this.filteredAgents = data['data'];
          }
        });
        this.usrdtls = JSON.parse(localStorage.getItem('usrDtls'));
        if (this.usrdtls.usr_ctgry_id != 10){
          this.getCafsData();
          this.shwFltrDiv = false;
          this.shwLdr = true;
        } else {
          this.shwFltrDiv = true;
          this.shwLdr = false;
        }
    
  }

  displayFn(agent): any {
    if (agent) { return agent.agnt_nm + ' ' + '|' + ' ' + agent.agnt_cd; }
  }


  getCafsOnSrch(): any{
    const srchData = {
      CAf: this.cafnumber == undefined ? 0 : this.cafnumber,
      mobileno: this.mobilenumber == undefined ? 0 : this.mobilenumber,
      adhar: this.aadharnumber == undefined ? 0 : this.aadharnumber,
      agntId: this.agnt_id == undefined ? (this.lmoTrmndCafForm.value.lmoCode.agnt_id == undefined ? 0 : this.lmoTrmndCafForm.value.lmoCode.agnt_id) : this.agnt_id
    };
    console.log(srchData);
    const rte = `caf/getdt`;
    this.crdSrv.create(srchData, rte).subscribe((res) => {
      console.log(res['data']);
      let ct = 0;
      this.agntCafLst = res['data'];
      this.agntCafLst.filter((k) => {
        k['sno'] = ++ct;
      });
      this.shwLdr = false;
      this.agntCafLstColumnDefs = [
        { headerName: 'S.No', field: 'sno', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 60, height: 40 },
        { headerName: 'CAF Name', field: 'cstmr_nm', alignment: 'left', cellClass: 'pm-grid-number-cell', width: 200, height: 40, filter: true },
        { headerName: 'CAF No', field: 'caf_nu', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 200, height: 40, filter: true },
        { headerName: 'Email', field: 'instl_eml1_tx', alignment: 'left', cellClass: 'pm-grid-number-cell', width: 200, height: 40, filter: true },
        { headerName: 'Mobile', field: 'mbl_nu', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 200, height: 40, filter: true },
        { headerName: 'Location', field: 'instl_addr1_tx', alignment: 'left', cellClass: 'pm-grid-number-cell', width: 200, height: 40, filter: true },
        { headerName: 'Activation Date', field: 'actvnDt', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 200, height: 40, filter: true }
      ];
    });
    
  }
  getCafsData(): any {
    const data = {
      sts: 0,
      trmnd_in: 1
    };
    const rte = `caf/getAgntCafDetails`;
    this.crdSrv.create(data, rte).subscribe((res) => {
      let ct = 0;
      this.agntCafLst = res['data'];
      this.agntCafLst.filter((k) => {
        k['sno'] = ++ct;
      });
      console.log(this.agntCafLst);
      this.shwLdr = false;
      this.agntCafLstColumnDefs = [
        { headerName: 'S.No', field: 'sno', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 60, height: 40 },
        { headerName: 'CAF Name', field: 'cstmr_nm', alignment: 'left', cellClass: 'pm-grid-number-cell', width: 200, height: 40, filter: true },
        { headerName: 'CAF No', field: 'caf_nu', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 200, height: 40, filter: true },
        { headerName: 'Email', field: 'instl_eml1_tx', alignment: 'left', cellClass: 'pm-grid-number-cell', width: 200, height: 40, filter: true },
        { headerName: 'Mobile', field: 'mbl_nu', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 200, height: 40, filter: true },
        { headerName: 'Location', field: 'instl_addr1_tx', alignment: 'left', cellClass: 'pm-grid-number-cell', width: 200, height: 40, filter: true },
        { headerName: 'Activation Date', field: 'actvnDt', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 200, height: 40, filter: true }
      ];
    });
  }

  onRowSelected(event): any {
    this.slctdCstmrs = [];
    this.slctdCstmrs = event.selectedRowsData;
  }

  getSummaryDtls(): void {

    let counter = 0;
    this.fnlPostCstmrCafData = [];
    for (let i = 0; i < this.slctdCstmrs.length; i++) {
      this.slctdCstmrs[i]['trmnd_desc_tx'] = this.cafTrmndFormGroup.value.trmnd_desc_tx;
      this.slctdCstmrs[i]['srno'] = ++counter;
      this.slctdCstmrs[i]['trmnd'] = 'trmnd_rqst_in';
    }
    this.fnlPostCstmrCafData = this.slctdCstmrs;
    this.fnlPostCstmrCafDataColumnDefs = [
      { headerName: 'Sno', field: 'srno', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 100, filter: false, search: false },
      { headerName: 'CAF Name', field: 'cstmr_nm', cellStyle: { 'text-align': 'left' }, cellClass: 'pm-grid-number-cell', width: 250, filter: true },
      // tslint:disable-next-line:max-line-length
      { headerName: 'Effective Date', field: 'efctve_dt'.split('-').reverse().join('-'), alignment: 'center', cellClass: 'pm-grid-number-cell', width: 100, filter: false, search: false },
      // tslint:disable-next-line:max-line-length
      { headerName: 'Expiry Date', field: 'expry_dt'.split('-').reverse().join('-'), cellStyle: { 'text-align': 'left' }, cellClass: 'pm-grid-number-cell', width: 150, filter: false },
      { headerName: 'Description', field: 'trmnd_desc_tx', cellStyle: { 'text-align': 'left' }, cellClass: 'pm-grid-number-cell', width: 150, filter: true }
    ];
  }

  saveCafTrmndData(): void {

    const rte = `caf/agent/terminated/cafs`;
    this.crdSrv.create(this.fnlPostCstmrCafData, rte).subscribe((res) => {

      if (res['status'] === 200) {
        if (res['data'].length == 0){
          this.snackBar.open('CAF already added to termination', '', {
            duration: 3000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
          });
        } else {
          this.snackBar.open('Sucessfully Added To Termination', '', {
            duration: 3000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
          });
        }
        
        this.ngOnInit();
        // this.closeSideBar();
        // this.getagntTrmndCafsData();
      }
    });
  }

  goBack(): any {
    this.route.navigate(['admin/sc/agent/operations/termination']);
  }
}
