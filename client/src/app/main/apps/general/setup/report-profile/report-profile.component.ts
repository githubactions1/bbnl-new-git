import { Component, OnInit } from '@angular/core';
import { CrudService } from 'app/main/apps/crud.service';
import { UserService } from 'app/providers/user/user.serivce';
import { DsSidebarService } from '@glits/components/sidebar/sidebar.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition, MatDialogRef, MatDialog } from '@angular/material';
import { DeleteDialogComponent } from 'app/main/shared/components/delete-dialog/delete-dialog.component';
import * as _ from 'lodash';

@Component({
  selector: 'app-report-profile',
  templateUrl: './report-profile.component.html',
  styleUrls: ['./report-profile.component.scss']
})
export class ReportProfileComponent implements OnInit {
  rptPrfls: any;
  usDtls: any;
  sideBarHeading: string;
  editClicked: boolean;
  selectedOptions: any[];
  rptSelectedOptions = [];
  fnlRptOptLst: any;
  toggleSlctdRptOpts = [];
  columnDefs = [];
  slctdOpt: any;
  addNew: boolean;
  reportPrflForm: FormGroup;
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  selectedGrp: any;
  getRowHeight;
  pagination: boolean = true;
  paginationPageSize = 15;
  confirmDialogRef: MatDialogRef<DeleteDialogComponent>;
  rptGrpOptnLst: any;
  selectedRptPrfleId: any;
  deleteClicked: boolean;
  deletePrfleNm: any;
  deletePrfleId: any;
  fnlRptExtraOptsLst: any[];
  permissions;
  loader:boolean;
  hdrDta: { icn: string; ttl: string; widths: { l_lg: string; l_md: string; l_sm: string; r_lg: string; r_md: string; r_sm: string; }[]; };
  /**
      * @param {DsSidebarService} _dsSidebarService
      */
     getHeaderDtls = function() { return {'title':'Report Profile','icon':'file_copy'}}

  constructor(private _dsSidebarService: DsSidebarService, public crdsrv: CrudService, private usrService: UserService, public snackBar: MatSnackBar,
    public dialog: MatDialog) {
    let rowHeight = 40;
    this.getRowHeight = function () {
      return rowHeight;
    };
    const permTxt = 'Report Profile';
    const prmeRte = `user/permissions/${permTxt}`;
    this.crdsrv.get(prmeRte).subscribe((res) => {
      this.permissions = res['data'][0];
      console.log(this.permissions);
    });
  }

  ngOnInit() {

    this.usDtls = this.usrService.getUsrDta();
    this.rptGrpOptnData();
    this.getRptProfileDataData();
    this.reportPrflForm = new FormGroup({
      prfle_nm: new FormControl('', Validators.required)
    });
  }
  getRptProfileDataData() {
    this.loader=true;
    const rte = `reports/report/profiles`;
    this.crdsrv.get(rte).subscribe((res) => {
      if(res['status']==200)
      {
        this.loader=false;
        this.rptPrfls = res['data'].reportitems;
      console.log(this.rptPrfls);
      let counter = 0;
      res['data'].reportitems.filter((k) => {
        k['s_no'] = ++counter;
      });
      this.columnDefs = [
        { headerName: 'S.No', field: 's_no', alignment: 'center', width: 60 },
        { headerName: 'Report Profile', field: 'rpt_prfle_nm', alignment: 'left', width: 200 },
        // { headerName: 'Report Profile Description', field: 'prfle_dscrn_tx', width: 200 },
        { headerName: 'Created User', field: 'ctr_usr_nm', alignment: 'left', width: 150 },
        { headerName: 'Created Timestamp', field: 'crt_tmstp', alignment: 'left', width: 180 },
        { headerName: 'Updated User', field: 'upd_usr_nm', alignment: 'left', width: 150 },
        { headerName: 'Updated Timestamp', field: 'upd_tmpstmp', alignment: 'left', width: 180 }
      ];
      }
      
    });
  }

  rptGrpOptnData() {
    const rte = `reports/report/options`;
    this.crdsrv.get(rte).subscribe((res) => {
      this.rptGrpOptnLst = res['data'];
    }, (error) => {
      console.log(error);
    });
  }

  opensideBar(key, value, data) {
    if (value == 'edit') {
      this.fnlRptOptLst = [];
      this.addNew = false;
      this.editClicked = true;
      this.deleteClicked = false;
      this.fnlRptOptLst = data;
      this.sideBarHeading = data.rpt_prfle_nm;
      this.selectedRptPrfleId = data.rpt_prfle_id;
      this.reportPrflForm.get('prfle_nm').setValue(data.rpt_prfle_nm);
      this.rptSelectedOptions = [];
      this.toggleSlctdRptOpts = [];

      console.log(this.fnlRptOptLst);

      if (this.fnlRptOptLst) {
        for (let r = 0; r < this.fnlRptOptLst.reportops.length; r++) {
          // if (this.fnlRptOptLst.reportops[r].rpt_grp_id != null) {
            for (let m = 0; m < this.fnlRptOptLst.reportops[r].reportitemList.length; m++) {
              if (this.fnlRptOptLst.reportops[r].reportitemList[m].a_in == 1) {
                this.rptSelectedOptions.push(this.fnlRptOptLst.reportops[r].reportitemList[m].rpt_nm);
              }
            }
          // }
        }
      }
      let rptDataArry = [];
      let rptDataArry1 = [];

      for (let i = 0; i < this.rptGrpOptnLst.length; i++) {
        for (let j = 0; j < this.rptGrpOptnLst[i].reportitemList.length; j++) {
          rptDataArry.push(this.rptGrpOptnLst[i].reportitemList[j]);
        }
      }

      for (let i = 0; i < this.fnlRptOptLst.reportops.length; i++) {
        for (let j = 0; j < this.fnlRptOptLst.reportops[i].reportitemList.length; j++) {
          rptDataArry1.push(this.fnlRptOptLst.reportops[i].reportitemList[j]);
        }
      }
      if (rptDataArry.length <= rptDataArry1.length){
        rptDataArry = [];
      } else {

      for (let h = 0; h < rptDataArry.length; h++) {
        for (let t = 0; t < rptDataArry1.length; t++) {
          if (rptDataArry[h].rpt_id == rptDataArry1[t].rpt_id) {
            rptDataArry.splice(h, 1);
          }
        }
      }
    }

      let common_feilds = ['rpt_grp_id', 'rpt_grp_nm'];
      let arrFeilds = ['rpt_id', 'rpt_nm', 'rpt_desc_txt', 'a_in'];
      let arrName = 'reportitemList';
      let groupByKey = 'rpt_grp_id';
      let sortKey = 'rpt_grp_id';
      this.groupByArrayFun(rptDataArry, common_feilds, arrFeilds, arrName, groupByKey, sortKey);
    } else if (value == 'delete') {
      this.fnlRptOptLst = [];
      this.addNew = false;
      this.editClicked = false;
      this.deleteClicked = true;
      this.fnlRptOptLst = data;
      this.sideBarHeading = data.rpt_prfle_nm;
      this.selectedRptPrfleId = data.rpt_prfle_id;
      this.reportPrflForm.get('prfle_nm').setValue(data.rpt_prfle_nm);
      this.deletePrfleNm = data.rpt_prfle_nm;
      this.deletePrfleId = data.rpt_prfle_id;
      this.rptSelectedOptions = [];
      this.toggleSlctdRptOpts = [];
      if (this.fnlRptOptLst) {
        for (let r = 0; r < this.fnlRptOptLst.reportops.length; r++) {
          for (let m = 0; m < this.fnlRptOptLst.reportops[r].reportitemList.length; m++) {
            if (this.fnlRptOptLst.reportops[r].reportitemList[m].a_in == 1) {
              this.rptSelectedOptions.push(this.fnlRptOptLst.reportops[r].reportitemList[m].rpt_nm);
            }
          }
        }
      }
    } else {
      this.reportPrflForm.get('prfle_nm').setValue('');
      this.addNew = true;
      this.editClicked = false;
      this.deleteClicked = false;
      this.sideBarHeading = 'Add New';
      this.selectedOptions = [];
      this.rptSelectedOptions = [];
      this.toggleSlctdRptOpts = [];
      this.fnlRptOptLst = this.rptGrpOptnLst;
    }
    this._dsSidebarService.getSidebar(key).toggleOpen();
  }

  onSelection(event) {
    this.slctdOpt = event.option._selected;
  }

  rptOptsToggle(event, rptPrfleData, rptGrpData, rptData) {
    this.toggleSlctdRptOpts.push({
      rpt_prfle_id: rptPrfleData.rpt_prfle_id,
      rpt_prfle_nm: rptPrfleData.rpt_prfle_nm,
      rpt_grp_id: rptGrpData.rpt_grp_id,
      rpt_grp_nm: rptGrpData.rpt_grp_nm,
      rpt_id: rptData.rpt_id,
      rpt_nm: rptData.rpt_nm,
      a_in: rptData.a_in,
      slctdOpt: this.slctdOpt
    });
  }

  onCellClick(event) {
    if (event.colDef.headerName == 'Edit') {
      console.log(event.data);
      console.log(this.rptPrfls);
      this.opensideBar('addFormPanel', 'edit', event.data);
    } else if (event.colDef.headerName == 'Delete') {
      this.opensideBar('addFormPanel', 'delete', event.data);
    }
  }

  sveReportPrfl() {
    if (this.editClicked == true) {

      this.toggleSlctdRptOpts = this.toggleSlctdRptOpts.reverse();

      this.toggleSlctdRptOpts = this.toggleSlctdRptOpts.filter(
        (thing, i, arr) => arr.findIndex(t => t.rpt_id === thing.rpt_id) === i
      );
      const updtRptPrfleData = {
        rpt_prfle_id: this.selectedRptPrfleId,
        prfl_nm: this.reportPrflForm.value.prfle_nm,
        rptOpts: this.toggleSlctdRptOpts
      };
      const rte = `reports/update/report/profile`;
      this.crdsrv.create(updtRptPrfleData, rte).subscribe((res) => {
        this.opensideBar('addFormPanel', null, null);
        this.snackBar.open('Profile Updated Succesfully...!!!', '', {
          duration: 3000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
        this.toggleSlctdRptOpts = [];
        this.rptGrpOptnData();
        this.getRptProfileDataData();
      }, (error) => {
        console.log(error);
      });
    } else {
      if (this.reportPrflForm.value.prfle_nm == undefined || this.reportPrflForm.value.prfle_nm == null || this.reportPrflForm.value.prfle_nm == '') {
        this.snackBar.open('Please Enter Profile Name', '', {
          duration: 3000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
      } else {
        this.toggleSlctdRptOpts = this.toggleSlctdRptOpts.reverse();

        this.toggleSlctdRptOpts = this.toggleSlctdRptOpts.filter(
          (thing, i, arr) => arr.findIndex(t => t.rpt_id === thing.rpt_id) === i
        );
        let rptPostData = {
          prfl_nm: this.reportPrflForm.value.prfle_nm,
          rptOpts: this.toggleSlctdRptOpts
        };
        const rte = `reports/add/report/profile`;
        this.crdsrv.create(rptPostData, rte).subscribe((res) => {
          if (res['data'] == 'Already Profile Exit') {
            this.snackBar.open('This Profile Already Exit', '', {
              duration: 3000,
              horizontalPosition: this.horizontalPosition,
              verticalPosition: this.verticalPosition,
            });
          } else {
            this.snackBar.open('Profile Inserted Succesfully...!!!', '', {
              duration: 3000,
              horizontalPosition: this.horizontalPosition,
              verticalPosition: this.verticalPosition,
            });
            this.toggleSlctdRptOpts = [];
            this.reportPrflForm.value.prfle_nm = '';
            this.opensideBar('addFormPanel', null, null);
            this.rptGrpOptnData();
            this.getRptProfileDataData();
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
        id: this.deletePrfleId, nm: this.deletePrfleNm, entityname: 'Profile', flag: false, rte: `reports/profile/${this.deletePrfleId}`
      }
    });

    this.confirmDialogRef.afterClosed().subscribe((response) => {
      if (response == undefined) { }
      else if (response.status == 200) {
        this.getRptProfileDataData();
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
    this.fnlRptExtraOptsLst = resArr;
  }
  onToolbarPreparing(e) {
    // console.log(e);
      e.toolbarOptions.items.unshift({
        location: 'after',
        widget: 'dxButton',
        options: {
            icon: 'plus',
            text: 'Add Report Profile',
            onClick: this.opensideBar.bind(this, 'addFormPanel', 'new', null),
            // this.onCellClick( this.selectedUsers),
            bindingOptions: {
              'disabled': 'isEmailButtonDisabled'
            }
        }
    });
}
}
