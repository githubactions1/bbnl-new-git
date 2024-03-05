import { Component, OnInit } from '@angular/core';
import { CrudService } from 'app/main/apps/crud.service';
import { UserService } from 'app/providers/user/user.serivce';
import { DsSidebarService } from '@glits/components/sidebar/sidebar.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MatDialog, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition, MatSnackBar } from '@angular/material';
import { DeleteDialogComponent } from 'app/main/shared/components/delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-menu-profile',
  templateUrl: './menu-profile.component.html',
  styleUrls: ['./menu-profile.component.scss']
})
export class MenuProfileComponent implements OnInit {
  mnuPrfls: any;
  usDtls: any;
  sideBarHeading: string;
  editClicked: boolean;
  deleteClicked: boolean;
  selectedOptions: any[];
  mnuSelectedOptions = [];
  fnlMnuOptLst: any;
  toggleSlctdStpOpts = [];
  slctdOpt: any;
  mnuForm: FormGroup;
  mnuLst = [];
  cmpnt_lst: any;
  confirmDialogRef: MatDialogRef<DeleteDialogComponent>;
  columnDefs = [];
  getRowHeight;
  mnuPrflsItms: any;
  ind: number;
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  rowData: any;
  deletePrfleNm: any;
  deletePrfleId: any;
  selectedcmpnt: any;
  mnuoptions = false;
  selectedProfileId: any;
  cmpntdisable: boolean;
  hdrDta;
  loader:boolean;
  pagination: boolean = true;
  paginationPageSize = 10;
  permissions;
  /**
      * @param {DsSidebarService} _dsSidebarService
      */

     getHeaderDtls = function() { return {'title':'Menu Profile','icon':'file_copy'}}

  constructor(private _dsSidebarService: DsSidebarService, public crdsrv: CrudService, private usrService: UserService,
              public dialog: MatDialog, public snackBar: MatSnackBar) {
    let rowHeight = 40;
    this.getRowHeight = function() {
      return rowHeight;
    };
    // this.permissions = { 'slct_in': 1, 'insrt_in': 0, 'updt_in': 1, 'dlte_in': 1, 'exprt_in': 1 };
    const permTxt = 'Menu Profile';
    const prmeRte = `user/permissions/${permTxt}`;
    this.crdsrv.get(prmeRte).subscribe((res) => {
      this.permissions = res['data'][0];
      console.log(this.permissions);
    });
  }

  ngOnInit() {
    
    this.usDtls = this.usrService.getUsrDta();
    this.mnuForm = new FormGroup({
      prfle_nm: new FormControl('', Validators.required),
      prfle_dscrn_tx: new FormControl(''),
      cmpnt_nm: new FormControl(''),
    });
    this.getCmpntData();
    this.getMnuProfileData();
    // this.getMenuItmsData();
  }

  getCmpntData() {
    // menu/options
    const rte = `user/cmpnt`;
    this.crdsrv.get(rte).subscribe((res) => {
      // this.mnuLst.push({ mnuitemList: res['data'] });
      this.cmpnt_lst = res['data'];
      console.log(this.cmpnt_lst);
      // this.editClicked = true;
      // this.deleteClicked = false;

    });
  }

  getMenuItmsData(dt,event) {
    // console.log(dt);
    // console.log(event);
    this.mnuLst = [];
      // console.log(this.selectedcmpnt);
      // menu/options
      if (dt){
        this.mnuLst.push(dt);
      }
      else{
        const rte = `user/menu/options/${event.value}`;
        this.crdsrv.get(rte).subscribe((res) => {
          this.mnuLst.push({ mnuitemList: res['data'] });
          this.editClicked = false;
          this.deleteClicked = false;
    
        });
      }

    
  }

  mnuPrflItmData() {
    let counter = 0;
    this.rowData = this.mnuPrfls;
    this.mnuPrfls.filter((k) => {
      k['s_no'] = ++counter;
    });

    this.columnDefs = [
      { headerName: 'S.No', field: 's_no', alignment: 'center', width: 60 },
      { headerName: 'Menu Profile', field: 'mnu_prfle_nm', alignment: 'left', width: 200, filter: true },
      { headerName: 'Menu Profile Description', field: 'prfle_dscrn_tx', alignment: 'left', width: 200 },
      { headerName: 'Created User', field: 'crtd_usr_nm', alignment: 'left', width: 150 },
      { headerName: 'Created Timestamp', field: 'crtd_tmstmp', alignment: 'left', width: 180 },
      { headerName: 'Updated User', field: 'upd_usr_nm', alignment: 'left', width: 150 },
      { headerName: 'Updated Timestamp', field: 'upd_tmstmp', alignment: 'center', width: 180 },
      // {
      //   headerName: 'Edit', cellStyle: { textAlign: 'center' }, width: 100, cellRenderer: function (param) {
      //     const eDiv = document.createElement('div');
      //     eDiv.innerHTML = `<button class='btn-simple editBtn-color edtBtnstls' >
      //     <mat-icon class='s-20 mat-icon material-icons'>edit</mat-icon>
      //     </button>`;
      //     const eButton = eDiv.querySelectorAll('.btn-simple')[0];
      //     eButton.addEventListener('click', function (param) {
      //     });
      //     return eDiv;
      //   },
      // },
      // {
      //   headerName: 'Delete', cellStyle: { textAlign: 'center' }, width: 100, cellRenderer: function (param) {
      //     const eDiv = document.createElement('div');
      //     eDiv.innerHTML = `<button class='btn-simple dlteBtnStyls' >
      //     <mat-icon  class='s-20 mat-icon material-icons deleteBtn-icon-color' >delete</mat-icon>
      //     </button>`;
      //     const eButton = eDiv.querySelectorAll('.btn-simple')[0];
      //     eButton.addEventListener('click', function (param) {
      //     });
      //     return eDiv;
      //   },
      // }
    ];
  }
  getMnuProfileData() {
    this.loader=true;
    const rte = `user/menu/profile`;
    this.crdsrv.get(rte).subscribe((res) => {
      if(res['status']==200)
      {
        this.loader=false
        this.mnuPrfls = res['data'].mnuitems;
        console.log(this.mnuPrfls);
        this.mnuPrflItmData();
      }

    }, (error) => {
      console.log(error);
    });
  }


  onCellClick(event) {
    console.log(event);
    if (event.cellElement.innerText == 'Edit') {
      this.mnuForm.get('prfle_nm').setValue(event.data.mnu_prfle_nm);
      this.mnuForm.get('prfle_dscrn_tx').setValue(event.data.prfle_dscrn_tx);
      this.mnuForm.get('cmpnt_nm').setValue(event.data.cmpnt_id);
      this.opensideBar('addFormPanel', 'edit', event.data);
    } else if (event.cellElement.innerText == 'Delete') {
      this.mnuForm.get('prfle_nm').setValue(event.data.mnu_prfle_nm);
      this.mnuForm.get('prfle_dscrn_tx').setValue(event.data.prfle_dscrn_tx);
      this.mnuForm.get('cmpnt_nm').setValue(event.data.cmpnt_id);
      this.opensideBar('addFormPanel', 'delete', event.data);
    }
  }

  onToolbarPreparing(e) {
    // console.log(e);
      e.toolbarOptions.items.unshift({
        location: 'after',
        widget: 'dxButton',
        options: {
            icon: 'plus',
            text: 'Add Menu Profile',
            onClick: this.opensideBar.bind(this, 'addFormPanel', 'new', null),
            // this.onCellClick( this.selectedUsers),
            bindingOptions: {
              'disabled': 'isEmailButtonDisabled'
            }
        }
    });
}

  opensideBar(key, value, data) {
    console.log(key);
    console.log(value);
    console.log(data);

    if (value == 'edit') {
      // console.log(data);
      if (data.menuItms.length == 0) {
        console.log(data);
        this.fnlMnuOptLst = [];
        this.cmpntdisable = false;
        this.mnuoptions = true;
        this.editClicked = false;
        this.selectedProfileId = data.mnu_prfle_id;
        this.deleteClicked = false;
        this.mnuSelectedOptions = [];
        this.sideBarHeading = data.mnu_prfle_nm;
      } else {
        console.log('in else');

        this.cmpntdisable = true;
        this.fnlMnuOptLst = data;
        this.mnuForm.get('prfle_nm').setValue(data.mnu_prfle_nm);
        this.mnuForm.get('prfle_dscrn_tx').setValue(data.prfle_dscrn_tx);
        this.mnuForm.get('cmpnt_nm').setValue(data.cmpnt_id);
        this.editClicked = true;
        this.deleteClicked = false;
        this.mnuSelectedOptions = [];
        if (this.fnlMnuOptLst.menuItms) {
          for (let r = 0; r < this.fnlMnuOptLst.menuItms.length; r++) {
            for (let m = 0; m < this.fnlMnuOptLst.menuItms[r].mnuitemList.length; m++) {
              if (this.fnlMnuOptLst.menuItms[r].mnuitemList[m].a_in == 1) {
                this.mnuSelectedOptions.push(this.fnlMnuOptLst.menuItms[r].mnuitemList[m].mnu_itm_nm);
              }
            }
          }
        }
      }


    } else if (value == 'delete') {
      this.deleteClicked = true;
      this.mnuForm.get('prfle_nm').setValue(data.mnu_prfle_nm);
      this.mnuForm.get('prfle_dscrn_tx').setValue(data.prfle_dscrn_tx);
      this.mnuForm.get('cmpnt_nm').setValue(data.cmpnt_id);
      this.fnlMnuOptLst = data;
      this.mnuSelectedOptions = [];
      this.deletePrfleNm = data.mnu_prfle_nm;
      this.deletePrfleId = data.mnu_prfle_id;
      if (this.fnlMnuOptLst) {
        for (let r = 0; r < this.fnlMnuOptLst.menuItms.length; r++) {
          for (let m = 0; m < this.fnlMnuOptLst.menuItms[r].mnuitemList.length; m++) {
            if (this.fnlMnuOptLst.menuItms[r].mnuitemList[m].a_in == 1) {
              this.mnuSelectedOptions.push(this.fnlMnuOptLst.menuItms[r].mnuitemList[m].mnu_itm_nm);
            }
          }
        }
      }
    } else {
      console.log(this.mnuForm);
      this.mnuForm.get('prfle_nm').setValue('');
      this.mnuForm.get('prfle_dscrn_tx').setValue('');
      this.mnuForm.get('cmpnt_nm').setValue('');
      this.editClicked = false;
      this.deleteClicked = false;
      this.mnuoptions = false;
      this.sideBarHeading = 'Add New Menu';
      this.selectedOptions = [];
      this.mnuSelectedOptions = [];
      this.cmpntdisable = false;
      this.ind = 0;
      this.fnlMnuOptLst = [];
      this.getMnuProfileData();
      this.mnuPrflItmData();
    }
    this._dsSidebarService.getSidebar(key).toggleOpen();
  }

  onSelection(event) {
    this.slctdOpt = event.option._selected;
  }

  mnuOptsToggle(event, mnuData, prfleData) {
    if (this.editClicked == true || this.mnuoptions == true) {
      this.toggleSlctdStpOpts.push({
        mnu_prfle_id: prfleData.mnu_prfle_id,
        mnu_prfle_nm: prfleData.mnu_prfle_nm,
        mnu_itm_id: mnuData.mnu_itm_id,
        mnu_itm_nm: mnuData.mnu_itm_nm,
        a_in: mnuData.a_in,
        slctdOpt: this.slctdOpt
      });
    } else {
      this.toggleSlctdStpOpts.push({
        mnu_itm_id: mnuData.mnu_itm_id,
        mnu_itm_nm: mnuData.mnu_itm_nm,
        a_in: mnuData.a_in,
        mnu_itm_url_tx: mnuData.mnu_itm_url_tx,
        slctdOpt: this.slctdOpt
      });
    }
  }

  saveMnuPrfle() {
    this.toggleSlctdStpOpts = this.toggleSlctdStpOpts.reverse();
    if (this.editClicked == true || this.mnuoptions == true) {
      this.toggleSlctdStpOpts = this.toggleSlctdStpOpts.filter(
        (thing, i, arr) => arr.findIndex(t => t.mnu_itm_id === thing.mnu_itm_id) === i
      );

      const rte = `user/update/menu/profile`;
      let finalProfileId;
      if (this.toggleSlctdStpOpts[0].mnu_prfle_id == undefined) {
        finalProfileId = this.selectedProfileId;
      } else {
        finalProfileId = this.toggleSlctdStpOpts[0].mnu_prfle_id;
      }

      const updtMnuPrfleData = {
        mnu_prfle_id: finalProfileId,
        mnu_prfle_nm: this.mnuForm.value.prfle_nm,
        // prfle_dscrn_tx: this.mnuForm.value.prfle_dscrn_tx,
        mnuOpts: this.toggleSlctdStpOpts
      };
      // console.log(updtMnuPrfleData);
      this.crdsrv.create(updtMnuPrfleData, rte).subscribe((res) => {
        // console.log(res['status']);
        if (res['status'] == 200) {
          this.snackBar.open('Profile Updated Succesfully...!!!', '', {
            duration: 3000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
            panelClass: ['blue-snackbar']
          });
          this.opensideBar('addFormPanel', null, null);
          this.toggleSlctdStpOpts = [];
          this.getMnuProfileData();
          this.mnuPrflItmData();
        }
      }, (error) => {
        console.log(error);
      });
    } else {
      this.toggleSlctdStpOpts = this.toggleSlctdStpOpts.filter(
        (thing, i, arr) => arr.findIndex(t => t.mnu_itm_id === thing.mnu_itm_id) === i
      );
      if (this.mnuForm.value.prfle_nm == undefined || this.mnuForm.value.prfle_nm == null || this.mnuForm.value.prfle_nm == '') {
        this.snackBar.open('Please Enter Profile Name', '', {
          duration: 10000,
          panelClass: ['blue-snackbar'],
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
      } else {
        const rte = `user/add/menu/profile`;

        for (let p = 0; p < this.toggleSlctdStpOpts.length; p++) {
          if (this.toggleSlctdStpOpts[p].slctdOpt == false) {
            this.toggleSlctdStpOpts.splice(p, 1);
          }
        }
        let prfl_dshbrd_url = this.usDtls.prfle_dshbd_url_tx.split('/');

        const addMnuPrfleData = {
          prfle_nm: this.mnuForm.value.prfle_nm,
          prfle_dscrn_tx: this.mnuForm.value.prfle_dscrn_tx,
          prfle_dshbd_url_tx: '/' + prfl_dshbrd_url[1],
          mnuOpts: this.toggleSlctdStpOpts
        };

        this.crdsrv.create(addMnuPrfleData, rte).subscribe((res) => {
          if (res['data'] == 'Already Profile Exit') {
            this.snackBar.open('This Profile Already Exit', '', {
              duration: 3000,
              horizontalPosition: this.horizontalPosition,
              verticalPosition: this.verticalPosition,
              panelClass: ['blue-snackbar']
            });
          } else {
            this.snackBar.open('Profile Inserted Succesfully...!!!', '', {
              duration: 3000,
              horizontalPosition: this.horizontalPosition,
              verticalPosition: this.verticalPosition,
              panelClass: ['blue-snackbar']
            });
            this.toggleSlctdStpOpts = [];
            this.mnuForm.value.prfle_nm = '';
            this.opensideBar('addFormPanel', null, null);
            this.getMnuProfileData();
            this.mnuPrflItmData();
          }
        }, (error) => {
          console.log(error);
        });
      }

    }
  }

  deleteProfile() {
    this.confirmDialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '25%',
      panelClass: 'my-class',
      data: {
        message: 'Are you sure deleting this profile ?',
        id: this.deletePrfleId, nm: this.deletePrfleNm, entityname: 'Profile', flag: false, rte: `user/profile/${this.deletePrfleId}`
      }
    });

    this.confirmDialogRef.afterClosed().subscribe((response) => {
      if (response == undefined) { }
      else if (response.status == 200) {
        this.getMnuProfileData();
        this.mnuPrflItmData();
        this.opensideBar('addFormPanel', null, null);
      }
    });
  }
}
