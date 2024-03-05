import { Component, OnInit, ViewChild } from '@angular/core';
import { CrudService } from 'app/main/apps/crud.service';
import { DsSidebarService } from '@glits/components/sidebar/sidebar.service';
import { AtomService } from 'app/main/services/atom.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition, MatDialog, MatDialogRef } from '@angular/material';
import { UserService } from 'app/providers/user/user.serivce';
import { Router } from '@angular/router';
import { switchMap, debounceTime, tap, map, finalize } from 'rxjs/operators';
import { MessageDialogComponent } from 'app/main/shared/components/message-dialog/message-dialog.component';

@Component({
  selector: 'app-caf-terminations',
  templateUrl: './caf-terminations.component.html',
  styleUrls: ['./caf-terminations.component.scss']
})
export class CafTerminationsComponent implements OnInit {
  lmocd: any;
  agnt_id: any;
  permissions;
  agntCafLst: any;
  agntCafLstColumnDefs = [];
  agntTrmndCafLstColumnDefs = [];
  agntTrmndCafLst: any;
  cafTrmndFormGroup: FormGroup;
  /**
      * @param {DsSidebarService} _dsSidebarService
      */
  slctdCstmrs: any;
  fnlPostCstmrCafData;
  fnlPostCstmrCafDataColumnDefs;
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  lgnDtls;
  shwFltrDiv = false;
  filteredAgents: any;
  lmoPymntsForm: FormGroup;
  errorMsg: string;
  isLoading: boolean;
  remobilenumber;
  reaadharnumber;
  recafnumber;
  shwTbl = false;
  openSidebarKey = 'addFormPanel';
  slctdCafs: any;
  shwBtns: boolean;
  confirmMsgDialogRef: MatDialogRef<MessageDialogComponent>;
  trmndSlctdCafLstColumnDefs;
  shwLdr: boolean;
  postSlctdCafsData: any;
  shwPermMsg: string;
  getHeaderDtls = function (): any { return { 'title': 'CAF Termination', 'icon': 'list_alt' }; };
  
  

  constructor(private _dsSidebarService: DsSidebarService, public crdSrv: CrudService, public atmSrv: AtomService,
    private formBuilder: FormBuilder, public snackBar: MatSnackBar, private userService: UserService, public dialog: MatDialog,
    private route: Router) {
    // this.permissions = { 'slct_in': 1, 'insrt_in': 1, 'updt_in': 1, 'dlte_in': 1, 'exprt_in': 0 };
    const permTxt = 'CAF Termination';
    const prmeRte = `user/permissions/${permTxt}`;
    this.crdSrv.get(prmeRte).subscribe((res) => {
      //  console.log(res['data'][0]+"permissions");
      if (res['data']){
        this.permissions = res['data'][0];
      } else{
        this.shwPermMsg = 'You do not have permissions to do this operation. Please contact Administrator to get permissions.';
      }
    });
    this.userService.USER_DETAILS.subscribe(val => {
      // console.log(val);
      this.lgnDtls = val;
      if (val.usr_ctgry_id === 8) {
        this.lmocd = val.lmo_cd;
        this.agnt_id = val.usr_ctgry_ky;
      }
    });
  }



  ngOnInit(): any {
    this.cafTrmndFormGroup = this.formBuilder.group({
      caf_trmnd_aprvl_desc_tx: ['']
    });
    // if (this.lgnDtls.usr_ctgry_ky == null) {
      this.shwFltrDiv = true;
    // } 
    // else {
    //   this.shwFltrDiv = false;
    //   const data = { nofltr: true };
    //   this.getagntTrmndCafsData(data);
    // }
    this.lmoPymntsForm = this.formBuilder.group({
      lmoCode: ['', Validators.required]
    });
    this.lmoPymntsForm.get('lmoCode').valueChanges
      .pipe(
        debounceTime(500),
        tap(() => {
          this.errorMsg = '';
          this.filteredAgents = [];
          this.isLoading = true;
        }),
        switchMap((value) => {
          if (value) {
            if (value.length >= 3 || value.length !== null) {
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
    // this.getagntTrmndCafsData();
  }

  getCafTrmndDtls(): any {
    // console.log(this.remobilenumber);
    // console.log(this.reaadharnumber);
    // console.log(this.lmoPymntsForm.value.lmoCode);
    // tslint:disable-next-line:triple-equals
    if (this.remobilenumber != undefined || this.reaadharnumber != undefined || this.lmoPymntsForm.value.lmoCode != undefined || this.recafnumber != undefined) {
      const fltrData = {
        mobileno: this.remobilenumber,
        adhar: this.reaadharnumber,
        agntId: this.lmoPymntsForm.value.lmoCode.agnt_id,
        CAf: this.recafnumber,
        trmnd_cond: true
      };
      this.getagntTrmndCafsData(fltrData);
    }

  }

  // onToolbarPreparing(e): any {
  //   e.toolbarOptions.items.unshift({
  //     location: 'after',
  //     widget: 'dxButton',
  //     options: {
  //       icon: 'user',
  //       text: 'Add CAF Termination',
  //       onClick: this.openAddCafTrmndPage.bind(this)
  //     }
  //   });
  // }

  // openSideBar(key): any {
  //   this._dsSidebarService.getSidebar(key).toggleOpen();
  //   this.getCafsData();
  // }

  // openAddCafTrmndPage(): any{
  //   this.route.navigate(['admin/sc/agent/operations/caf/termination']);
  // }

  getagntTrmndCafsData(data): any {
    // console.log(data);
    const rte = `caf/getdt`;
    this.crdSrv.create(data, rte).subscribe((res) => {
      let ct = 0;
      this.agntTrmndCafLst = res['data'];
      if (this.agntTrmndCafLst) {
        this.shwTbl = true;
        this.agntTrmndCafLst.filter((k) => {
          k['sno'] = ++ct;
        });
      }
      // console.log(this.agntTrmndCafLst);

      this.agntTrmndCafLstColumnDefs = [
        { headerName: 'S.No', field: 'sno', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 60, height: 40, search: false, filter: false },
        { headerName: 'CAF Name', field: 'cstmr_nm', alignment: 'left', cellClass: 'pm-grid-number-cell', width: 200, height: 40, filter: true },
        { headerName: 'CAF No', field: 'caf_nu', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 200, height: 40, filter: true },
        { headerName: 'Email', field: 'instl_eml1_tx==0?"":instl_eml1_tx', alignment: 'left', cellClass: 'pm-grid-number-cell', width: 200, height: 40, filter: true },
        { headerName: 'Mobile', field: 'mbl_nu', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 200, height: 40, filter: true },
	{ headerName: 'Caf Type', field: 'caf_type_nm', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 200, height: 40, filter: true },
        { headerName: 'Location', field: 'instl_addr1_tx', alignment: 'left', cellClass: 'pm-grid-number-cell', width: 200, height: 40, filter: true },
        { headerName: 'Activation Date', field: 'actvn_dt',
        dataType: 'date', format: 'dd-MM-yyyy', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 200, height: 40, filter: true },
        // {
        //   headerName: 'Termination Request Date', field: 'trmnd_req_dt', 
        //   dataType: 'date', format: 'dd-MM-yyyy', alignment: 'center', cellClass: 'pm-grid-number-cell',
        //   width: 200, height: 40, filter: false
        // },
        // { headerName: 'Approved Date', field: 'aprvd_ts', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 200, height: 40, filter: false },
        { headerName: 'Status', field: 'sts_nm', alignment: 'left', cellClass: 'pm-grid-number-cell', width: 200, height: 40, filter: true }
      ];
    });
  }

  displayFn(agent): any {
    if (agent) { return agent.agnt_nm + ' ' + '|' + ' ' + agent.agnt_cd; }
  }

  onRowSelected(event): void {
    this.slctdCafs = [];
    this.slctdCafs = event.selectedRowsData;

    if (this.slctdCafs.length !== 0) {
      this.shwBtns = true;
    } else {
      this.shwBtns = false;
    }
  }

  aprveCafsTrmnd(): void {
    this.confirmMsgDialogRef = this.dialog.open(MessageDialogComponent, {
      width: '25%',
      panelClass: 'my-class',
      data: {
        title: 'Are you sure',
        msg: 'You really want to terminate them',
        icon: 'account_box',
        btnLst: [{
          label: 'Yes',
          res: 'yes'
        }, {
          label: 'No',
          res: 'no'
        }]
      }
    });

    this.confirmMsgDialogRef.afterClosed().subscribe((response) => {
      if (response) {
        if (response === 'yes') {
          this._dsSidebarService.getSidebar(this.openSidebarKey).toggleOpen();
          this.trmndSlctdCafLstColumnDefs = [
            { headerName: 'S.No', field: 'sno', alignment: 'left', cellClass: 'pm-grid-number-cell', width: 60, height: 40, search: false, filter: false },
            { headerName: 'CAF Name', field: 'cstmr_nm', alignment: 'left', cellClass: 'pm-grid-number-cell', width: 200, height: 40, filter: false },
            { headerName: 'CAF No', field: 'caf_nu', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 200, height: 40, filter: true },
            { headerName: 'Mobile', field: 'mbl_nu', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 200, height: 40, filter: false },
          ];
        }
      }
    });

    // console.log(this.slctdCafs);
    return;
  }

  saveaprveCafsTrmnd(): void {
    this.shwLdr = true;
    this.postSlctdCafsData = [];
    for (let u = 0; u < this.slctdCafs.length; u++){
      this.postSlctdCafsData.push({caf_id: this.slctdCafs[u].caf_id, cstmr_id: this.slctdCafs[u].cstmr_id, trmnd_desc_tx: this.cafTrmndFormGroup.value.caf_trmnd_aprvl_desc_tx,
        trmnd: 'trmnd_in'});
    }
    // console.log(this.postSlctdCafsData);

    const rte = `caf_operations/terminate`;
    this.crdSrv.create(this.postSlctdCafsData, rte).subscribe((res) => {
      if (res['status'] === 200) {
        this.snackBar.open('Terminated Sucessfully', '', {
          duration: 3000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
        this.shwBtns = false;
        this.shwLdr = false;
        const data = { agntId: this.slctdCafs[0].agnt_id, nofltr: false };
        this.slctdCafs = [];
        this.closeSideBar();
       
        this.getagntTrmndCafsData(data);
      }
      else{
        this.snackBar.open('Something went wrong', '', {
          duration: 3000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
        this.shwBtns = false;
        this.shwLdr = false;
        const data = { agntId: this.slctdCafs[0].agnt_id, nofltr: false };
        this.slctdCafs = [];
        this.closeSideBar();
      }
    });
  }

  closeSideBar(): any {
    this._dsSidebarService.getSidebar('addFormPanel').toggleOpen();
  }

}
