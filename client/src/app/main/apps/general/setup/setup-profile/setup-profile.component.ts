import { Component, OnInit } from '@angular/core';
import { CrudService } from 'app/main/apps/crud.service';
import { UserService } from 'app/providers/user/user.serivce';
import { DsSidebarService } from '@glits/components/sidebar/sidebar.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition, MatDialogRef, MatDialog } from '@angular/material';
import { DeleteDialogComponent } from 'app/main/shared/components/delete-dialog/delete-dialog.component';
import { TopHeaderSrvc } from 'app/providers/top-header/top-header-service';
import * as _ from 'lodash';

@Component({
  selector: 'app-setup-profile',
  templateUrl: './setup-profile.component.html',
  styleUrls: ['./setup-profile.component.scss']
})
export class SetupProfileComponent implements OnInit {
  stpPrfls: any;
  usDtls: any;
  sideBarHeading: string;
  editClicked: boolean;
  selectedOptions: any[];
  stpSelectedOptions = [];
  fnlStpOptLst: any;
  toggleSlctdStpOpts = [];
  columnDefs = [];
  slctdOpt: any;
  addNew: boolean;
  setupPrflForm: FormGroup;
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  selectedGrp: any;
  getRowHeight;
  pagination: boolean = true;
  paginationPageSize = 10;
  confirmDialogRef: MatDialogRef<DeleteDialogComponent>;
  ind: number;
  grdLst: any;
  stpGrpOptnLst: any;
  deleteClicked: boolean;
  deletePrfleNm: any;
  deletePrfleId: any;
  stpOptList = false;
  selectedPfleId: any;
  loader:boolean;
  hdrDta: { icn: string; ttl: string; widths: { l_lg: string; l_md: string; l_sm: string; r_lg: string; r_md: string; r_sm: string; }[]; };
  fnlStpExtraOptsLst = [];
  stpExtraSelectedOptions: any[];
  permissions;
  /**
      * @param {DsSidebarService} _dsSidebarService
      */

  getHeaderDtls = function() { return {'title':'Setup Profile','icon':'assignment'}}   
  constructor(private _dsSidebarService: DsSidebarService, public crdsrv: CrudService, private usrService: UserService,
    public snackBar: MatSnackBar, public dialog: MatDialog) {
    let rowHeight = 40;
    this.getRowHeight = function () {
      return rowHeight;
    };
    // this.permissions = { 'slct_in': 1, 'insrt_in': 0, 'updt_in': 1, 'dlte_in': 1, 'exprt_in': 1 };
    const permTxt = 'Setup Profile';
    const prmeRte = `user/permissions/${permTxt}`;
    this.crdsrv.get(prmeRte).subscribe((res) => {
      this.permissions = res['data'][0];
      console.log(this.permissions);
    });
  }

  ngOnInit() {

    this.usDtls = this.usrService.getUsrDta();
    this.getStpProfileData();
    // this.setupGrpData();
    this.stpGrpOptnData();
    this.setupPrflForm = new FormGroup({
      prfle_nm: new FormControl('', Validators.required)
    })
  }

  getStpProfileData() {
    this.loader=true;
    const rte = `user/setup/profile/groups`;
    this.crdsrv.get(rte).subscribe((res) => {
      if(res['status']==200)
      {
        this.loader=false;
        this.stpPrfls = res['data'].setupitems;
        this.setupGrpData();
      }

    }, (error) => {
      console.log(error);
    });
  }

  setupGrpData() {
    let counter = 0;
    this.grdLst = this.stpPrfls;
    this.grdLst.filter((k) => {
      k['s_no'] = ++counter;
    });
    this.columnDefs = [
      { headerName: 'S.No', field: 's_no', alignment: 'center', width: 60 },
      { headerName: 'Setup Profile', field: 'stp_prfle_nm', alignment: 'left', width: 200, filter:true},
      // { headerName: 'Setup Profile Description', field: 'prfle_dscrn_tx', width: 200, filter:true},
      { headerName: 'Created User', field: 'crtd_usr_nm', alignment: 'left', width: 150, filter:true },
      { headerName: 'Created Timestamp', field: 'crtd_tmstmp', alignment: 'left', width: 180 },
      { headerName: 'Updated User', field: 'upd_usr_nm', alignment: 'left', width: 150 },
      { headerName: 'Updated Timestamp', field: 'upd_tmstmp', alignment: 'left', width: 180 },
      // {
      //   headerName: 'Edit', cellStyle: { textAlign: 'center' }, width: 100, cellRenderer: function (param) {
      //     const eDiv = document.createElement('div');
      //     eDiv.innerHTML = `<button class='btn-simple editBtn-color edtBtnstls' >
      //     <mat-icon class='s-20 mat-icon material-icons'>edit</mat-icon>
      //     </button>`;
      //     const eButton = eDiv.querySelectorAll('.btn-simple')[0];
      //     eButton.addEventListener('click', function (param) {
      //       // console.log(param);
      //     });
      //     return eDiv;
      //   },
      // },
      // {
      //   headerName: 'Delete', cellStyle: { textAlign: 'center' }, width: 100, cellRenderer: function (param) {
      //     const eDiv = document.createElement('div');
      //     eDiv.innerHTML = `
      //     <button class='btn-simple dlteBtnStyls' >
      //     <mat-icon  class='s-20 mat-icon material-icons deleteBtn-icon-color' >delete</mat-icon>
      //     </button>`;
      //     const eButton = eDiv.querySelectorAll('.btn-simple')[0];
      //     eButton.addEventListener('click', function (param) {
      //       // console.log(param);
      //     });
      //     return eDiv;
      //   },
      // }
    ];
    // })
  }


  stpGrpOptnData() {
    const rte = `user/setup/options`;
    this.crdsrv.get(rte).subscribe((res) => {
      this.stpGrpOptnLst = res['data'];
    }, (error) => {
      console.log(error);
    });
  }

  onToolbarPreparing(e) {
    // console.log(e);
      e.toolbarOptions.items.unshift({
        location: 'after',
        widget: 'dxButton',
        options: {
            icon: 'plus',
            text: 'Add Setup Profile',
            onClick: this.opensideBar.bind(this, 'addFormPanel', 'new', null),
            // this.onCellClick( this.selectedUsers),
            bindingOptions: {
              'disabled': 'isEmailButtonDisabled'
            }
        }
    });
}

  opensideBar(key, value, data) {
    if (value == 'edit') {
      this.fnlStpOptLst = [];
      this.setupPrflForm.get('prfle_nm').setValue(data.stp_prfle_nm);
        this.editClicked = true;
        this.deleteClicked = false;
        this.addNew = false;
        this.ind = 1;
        this.sideBarHeading = data.stp_prfle_nm;
        this.fnlStpOptLst = data;
        this.stpExtraSelectedOptions = [];
        this.stpSelectedOptions = [];
        this.toggleSlctdStpOpts = [];
        if (this.fnlStpOptLst) {
          for (let r = 0; r < this.fnlStpOptLst.setupgroupnames.length; r++) {
            for (let m = 0; m < this.fnlStpOptLst.setupgroupnames[r].setupitemList.length; m++) {
              if (this.fnlStpOptLst.setupgroupnames[r].setupitemList[m].a_in == 1) {
                this.stpSelectedOptions.push(this.fnlStpOptLst.setupgroupnames[r].setupitemList[m].stp_opt_nm);
              }
            }
          }
        }
      // }
      let stpDataArry = [];
      let stpDataArry1 = [];

      for (let i = 0; i < this.stpGrpOptnLst.length; i++){
        for (let j = 0; j < this.stpGrpOptnLst[i].setupitemList.length; j++){
          stpDataArry.push(this.stpGrpOptnLst[i].setupitemList[j]);
        }
      }

      for (let i = 0; i < this.fnlStpOptLst.setupgroupnames.length; i++){
        for (let j = 0; j < this.fnlStpOptLst.setupgroupnames[i].setupitemList.length; j++){
          stpDataArry1.push(this.fnlStpOptLst.setupgroupnames[i].setupitemList[j]);
        }
      }

      if (stpDataArry.length <= stpDataArry1.length){
        stpDataArry = [];
      } else{
        for (let h = 0; h < stpDataArry.length; h++){
          for (let t = 0; t < stpDataArry1.length; t++){
            if (stpDataArry[h].stp_opt_id == stpDataArry1[t].stp_opt_id){
                stpDataArry.splice(h, 1);
            }
          }
        }
      }
      let common_feilds = ['stp_grp_id', 'stp_grp_nm'];
      let arrFeilds = ['stp_opt_id', 'stp_opt_nm', 'stp_opt_icn_tx', 'a_in'];
      let arrName = 'setupitemList';
      let groupByKey = 'stp_grp_id';
      let sortKey = 'stp_grp_id';
      this.groupByArrayFun(stpDataArry, common_feilds, arrFeilds, arrName, groupByKey, sortKey);

    } else if (value == 'delete') {
      this.deleteClicked = true;
      this.setupPrflForm.get('prfle_nm').setValue(data.stp_prfle_nm);
      this.fnlStpOptLst = data;
      this.stpSelectedOptions = [];
      this.deletePrfleNm = data.stp_prfle_nm;
      this.deletePrfleId = data.stp_prfle_id;

      if (this.fnlStpOptLst) {
        for (let r = 0; r < this.fnlStpOptLst.setupgroupnames.length; r++) {
          for (let m = 0; m < this.fnlStpOptLst.setupgroupnames[r].setupitemList.length; m++) {
            if (this.fnlStpOptLst.setupgroupnames[r].setupitemList[m].a_in == 1) {
              this.stpSelectedOptions.push(this.fnlStpOptLst.setupgroupnames[r].setupitemList[m].stp_opt_nm);
            }
          }
        }
      }

      // this.deleteProfile(data.mnu_prfle_id, data.mnu_prfle_nm);
    } else {
      this.setupPrflForm.get('prfle_nm').setValue('');
      this.ind = 0;
      this.addNew = true;
      this.editClicked = false;
      this.deleteClicked = false;
      this.stpOptList = false;
      this.sideBarHeading = 'Add New';
      this.selectedOptions = [];
      this.stpSelectedOptions = [];
      this.toggleSlctdStpOpts = [];
      this.fnlStpExtraOptsLst = [];
      this.fnlStpOptLst = this.stpGrpOptnLst;
    }
    this._dsSidebarService.getSidebar(key).toggleOpen();
  }

  onSelection(event) {
    this.slctdOpt = event.option._selected;
  }

  rptOptsToggle(event, mnuData, rptGrpData, rptData) {
    if (mnuData.stp_prfle_id == undefined) {
      mnuData.stp_prfle_id = this.selectedPfleId;
    } else {
      mnuData.stp_prfle_id = mnuData.stp_prfle_id;
    }
    this.toggleSlctdStpOpts.push({
      stp_prfle_id: mnuData.stp_prfle_id,
      stp_prfle_nm: mnuData.stp_prfle_nm,
      stp_grp_id: rptGrpData.stp_grp_id,
      stp_grp_nm: rptGrpData.stp_grp_nm,
      stp_opt_id: rptData.stp_opt_id,
      stp_opt_nm: rptData.stp_opt_nm,
      a_in: rptData.a_in,
      slctdOpt: this.slctdOpt
    });
  }

  onCellClick(event) {
    if (event.cellElement.innerText == 'Edit') {
      this.opensideBar('addFormPanel', 'edit', event.data);
    } else if (event.cellElement.innerText == 'Delete') {
      this.opensideBar('addFormPanel', 'delete', event.data);
    }
  }

  sveSetupPrfl() {
    const updtRptPrfleData = {
      setupOpts: this.toggleSlctdStpOpts
    };

    if (this.ind == 1) {
      const rte = `user/setup/update/profile`;
      this.crdsrv.create(updtRptPrfleData, rte).subscribe((res) => {
        this.opensideBar('addFormPanel', null, null);
        this.snackBar.open('Profile Updated Succesfully...!!!', '', {
          duration: 3000,
          panelClass: ['blue-snackbar'],
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
        this.toggleSlctdStpOpts = [];
        this.getStpProfileData();
        this.setupGrpData();
      }, (error) => {
        console.log(error);
      });
    } else {
      if (this.setupPrflForm.value.prfle_nm == undefined || this.setupPrflForm.value.prfle_nm == null || this.setupPrflForm.value.prfle_nm == '') {
        this.snackBar.open('Please Enter Profile Name', '', {
          duration: 3000,
          panelClass: ['blue-snackbar'],
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
      } else {
        let data = {
          set_optn_id: updtRptPrfleData,
          prfle_nm: this.setupPrflForm.value.prfle_nm,
          mrcht_id: this.usDtls.mrcht_id,
          mrcht_usr_id: this.usDtls.mrcht_usr_id,
          admn_in: this.usDtls.admn_in
        };
        const rte = `user/setup/add/profile`;
        this.crdsrv.create(data, rte).subscribe((res) => {
          if (res['data'] == 'Already Profile Exit') {
            this.snackBar.open('This PrfileAlready Exit', '', {
              duration: 3000,
              panelClass: ['blue-snackbar'],
              horizontalPosition: this.horizontalPosition,
              verticalPosition: this.verticalPosition,
            });
          } else {
            this.snackBar.open('Profile Inserted Succesfully...!!!', '', {
              duration: 3000,
              panelClass: ['blue-snackbar'],
              horizontalPosition: this.horizontalPosition,
              verticalPosition: this.verticalPosition,
            });
            this.toggleSlctdStpOpts = [];
            this.setupPrflForm.value.prfle_nm = '';
            this.opensideBar('addFormPanel', null, null);
            this.getStpProfileData();
            this.setupGrpData();
          }
        })
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
        this.getStpProfileData();
        this.setupGrpData();
        this.opensideBar('addFormPanel', null, null);
      }
    });
  }

  groupByArrayFun(input_data, common_feilds, arrFeilds, arrName, groupByKey, sortKey) {
    const resData = _.groupBy(input_data, groupByKey);
    let resArr = [];
    Object.keys(resData).forEach(function (key) {
      // When Duplicate entries found
      if (resData[key].length > 1 || resData[key][0][arrFeilds[0]] != null) {
        let tempObj = {};
        common_feilds.forEach(function (cmn_f) {
          tempObj[cmn_f] = resData[key][0][cmn_f];
        });
        tempObj[arrName] = [];
        for (let i = 0; i < resData[key].length; i++) {
          let arrFeildObj = {};
          arrFeilds.forEach(function (arr_f) {
            arrFeildObj[arr_f] = resData[key][i][arr_f];
          });
          tempObj[arrName].push(arrFeildObj);
        }
        resArr.push(tempObj);
      }
      //When No Duplicate entries found
      else {
        let tempObj = {};
        common_feilds.forEach(function (cmn_f) {
          tempObj[cmn_f] = resData[key][0][cmn_f];
        });
        resArr.push(tempObj);
      }
    });
    resArr = _.sortBy(resArr, sortKey);
    // let groupByArray = resArr;
    this.fnlStpExtraOptsLst = resArr;
  }
}
