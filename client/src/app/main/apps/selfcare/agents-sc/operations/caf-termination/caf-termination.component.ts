import { Component, OnInit, ViewChild } from '@angular/core';
import { CrudService } from 'app/main/apps/crud.service';
import { DsSidebarService } from '@glits/components/sidebar/sidebar.service';
import { AtomService } from 'app/main/services/atom.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition, MatDialog } from '@angular/material';
import { UserService } from 'app/providers/user/user.serivce';
import { Router } from '@angular/router';
import { switchMap, debounceTime, tap, map, finalize } from 'rxjs/operators';
@Component({
  selector: 'app-caf-termination',
  templateUrl: './caf-termination.component.html',
  styleUrls: ['./caf-termination.component.scss']
})
export class CafTerminationComponent implements OnInit {
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
  shwTbl = false;
  shwPermMsg: string;
  shwLdr: boolean;
  getHeaderDtls = function (): any { return { 'title': 'CAF Termination', 'icon': 'list_alt' }; };

  constructor(private _dsSidebarService: DsSidebarService, public crdSrv: CrudService, public atmSrv: AtomService,
    private formBuilder: FormBuilder, public snackBar: MatSnackBar, private userService: UserService, public dialog: MatDialog,
    private route: Router) {
    // this.permissions = { 'slct_in': 1, 'insrt_in': 1, 'updt_in': 1, 'dlte_in': 1, 'exprt_in': 0 };
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
    if (this.lgnDtls.usr_ctgry_ky == null){
      this.shwFltrDiv = true;
        const permTxt = 'Agent CAF Termination';
        const prmeRte = `user/permissions/${permTxt}`;
        this.crdSrv.get(prmeRte).subscribe((res) => {
          // this.permissions = res['data'][0];
          // console.log(res['data']);
          if (res['data'][0]){
            this.permissions = res['data'][0];
          } else{
            this.shwLdr = false;
            this.shwPermMsg = 'You do not have permissions to do this operation. Please contact Administrator to get permissions.';
          }
        });
    } else {
      this.shwFltrDiv = false;
      // const data = {nofltr: true};
      this.getagntTrmndCafsData();
    }
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
    // this.getagntTrmndCafsData();
  }

  onToolbarPreparing(e): any {
    e.toolbarOptions.items.unshift({
      location: 'after',
      widget: 'dxButton',
      options: {
        icon: 'user',
        text: 'Add CAF Termination',
        onClick: this.openAddCafTrmndPage.bind(this)
      }
    });
  }

  // openSideBar(key): any {
  //   this._dsSidebarService.getSidebar(key).toggleOpen();
  //   this.getCafsData();
  // }

  openAddCafTrmndPage(): any{
    this.route.navigate(['admin/sc/agent/operations/caf/termination']);
  }

  getagntTrmndCafsData(): any {
    this.shwLdr = true;
    const rte = `caf/terminated/cafs`;
    const data = {};
    this.crdSrv.create(data, rte).subscribe((res) => {
      let ct = 0;

      if (res['perm']){
        this.permissions = res['perm'][0];
      } else{
        this.shwLdr = false;
        this.shwPermMsg = 'You do not have permissions to do this operation. Please contact Administrator to get permissions.';
      }
      
      this.agntTrmndCafLst = res['data'];
      if (this.agntTrmndCafLst){
        this.shwTbl = true;
        this.agntTrmndCafLst.filter((k) => {
          k['sno'] = ++ct;
        });
      }
      this.shwLdr = false;
      // console.log(this.agntTrmndCafLst);
     
      this.agntTrmndCafLstColumnDefs = [
        { headerName: 'S.No', field: 'sno', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 60, height: 40, search: false, filter: false },
        { headerName: 'CAF Name', field: 'cstmr_nm', alignment: 'left', cellClass: 'pm-grid-number-cell', width: 200, height: 40, filter: true },
        { headerName: 'CAF No', field: 'caf_nu', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 200, height: 40, filter: true },
        { headerName: 'Email', field: 'instl_eml1_tx==0?"":instl_eml1_tx', alignment: 'left', cellClass: 'pm-grid-number-cell', width: 200, height: 40, filter: true },
        { headerName: 'Mobile', field: 'mbl_nu', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 200, height: 40, filter: true },
        { headerName: 'Location', field: 'instl_addr1_tx', alignment: 'left', cellClass: 'pm-grid-number-cell', width: 200, height: 40, filter: true },
        { headerName: 'Activation Date', field: 'actvn_dt', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 200, height: 40, filter: true },
        { headerName: 'Termination Request Date', field: 'trmnd_req_dt', alignment: 'center', cellClass: 'pm-grid-number-cell', 
        width: 200, height: 40, filter: false },
        { headerName: 'Approved Date', field: 'aprvd_ts', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 200, height: 40, filter: false },
        { headerName: 'Status', field: 'sts', alignment: 'left', cellClass: 'pm-grid-number-cell', width: 200, height: 40, filter: false }
      ];
    });
  }

  displayFn(agent): any {
    if (agent) { return agent.agnt_nm + ' ' + '|' + ' ' + agent.agnt_cd; }
  }

  // closeSideBar(): any {
  //   this._dsSidebarService.getSidebar('addFormPanel').toggleOpen();
  // }
}
