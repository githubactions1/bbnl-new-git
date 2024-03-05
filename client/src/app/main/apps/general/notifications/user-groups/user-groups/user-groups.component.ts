import { Component, OnInit } from '@angular/core';
import { DsSidebarService } from '@glits/components/sidebar/sidebar.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CrudService } from '../../../../crud.service';
import { MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition, MatSnackBar } from '@angular/material';

import * as _ from 'lodash';

@Component({
  selector: 'app-user-groups',
  templateUrl: './user-groups.component.html',
  styleUrls: ['./user-groups.component.scss']
})
export class UserGroupsComponent implements OnInit {

  grpCtgryDplLst: any;

  /**
* Constructor
*  @param {DsSidebarService} _dsSidebarService
*/
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  public newGrpForm: FormGroup;
  public asgnUsrForm: FormGroup;
  grpCtgryLst: any;
  usrdtls: any;
  grpLst: any;
  usrsLst: any;
  selectedoptions: any;
  selectedUsroptions: any;
  addGrp; editBtn; addUsr; crtBtn: boolean;
  // addUsr : boolean;
  grpId: any;
  filledGrpData: any;
  columnDefs = [];
  user_columnDefs = [];
  getRowHeight;
  gridApi;
  gId: any;
  rowSelection: string;
  selectedUsers = [];
  deSelectedUsers = [];
  loader: boolean;
  sideBarHeader: string;
  editClicked: boolean = false;
  updateData: any;
  deleteRle: boolean;
  cmpreDta: any;
  cmpreUsrDta: any;
  updGrpDta: any;
  rte: any;
  tblCheckboxClicked: boolean
  permissions; mainMessage;
  getHeaderDtls = function () { return { "title": "User Group", "icon": "receipt" } }
  constructor(private _dsSidebarService: DsSidebarService, public apiSrvc: CrudService, public snackBar: MatSnackBar) {
    // this.usrdtls = JSON.parse(localStorage.getItem('usrDtls'));
    let rowHeight = 40;
    this.permissions = { "slct_in": 1, "insrt_in": 1, "updt_in": 1, "dlte_in": 1, "exprt_in": 1 }
    this.getRowHeight = function (params) {
      return rowHeight;
    };
  }

  ngOnInit() {
    // this.addGrp = true;
    // this.addUsr = false;
    this.editBtn = false;
    this.crtBtn = true;

    this.newGrpForm = new FormGroup({
      grp_id: new FormControl(''),
      grp_nm: new FormControl('', [Validators.required]),
      grp_dscn_tx: new FormControl('', [Validators.required]),
      grpCtgryControl: new FormControl([], [Validators.required])
    });

    this.asgnUsrForm = new FormGroup({
      usrControl: new FormControl([], [Validators.required])
    })
    this.getusrGrpCtgryLst();
    this.getusrGrpLst();
    this.getUsrPermissions();
  }

  onGridReady(params): void {
    params.api.sizeColumnsToFit();
    params.api.setHeaderHeight(35);
    params.api.showLoadingOverlay();
    this.gridApi = params.api;
    //  this.gridColumnApi = params.columnApi;
  }

  hasError(controlName: string, errorName: string) {
    return this.newGrpForm.controls[controlName].hasError(errorName);
  }

  hasUsrError(controlName: string, errorName: string) {
    return this.asgnUsrForm.controls[controlName].hasError(errorName);
  }


  createGrp() {
    if (this.editClicked == false) {
      this.addNewGrp();
      this.newGrpForm.reset()
    } else if (this.deleteRle == true) {
      this.deleteGrp(this.updateData);
    } else {
      this.updateGrp(this.updateData);
    }
  }
  // assignUser(){
  //   if(this.addUsr == true){
  //     this.postUser(this.updateData);
  //   }
  // }

  // postUser(data) {
  //   // console.log(data)
  // }

  addNewGrp() {
    // console.log('executeGrpCreation');
    // console.log(this.newGrpForm.value);
    let rte = "alert/addnewGrp"
    this.apiSrvc.create(this.newGrpForm.value, rte).subscribe((res) => {
      if (res['status'] == 200) {
        this.snackBar.open("Users Assigned Sucessfully", '', {
          duration: 2000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
        this.opensideBar('', 'addNew_group', null, '');
        this.newGrpForm.reset()
        this.getusrGrpLst();
      }
    }, (error) => {
      console.log(error);
    });
  }


  deleteGrp(data) {
    // console.log('executeGrpCreation');
    // // console.log(this.newGrpForm.value);
    // console.log(data)

    this.gId = data.grp_id;
    let rte = `alert/delGrp/${this.gId}`
    this.apiSrvc.delete(rte).subscribe((res) => {
      if (res['status'] == 200) {
        this.snackBar.open("Group Deleted Sucessfully", '', {
          duration: 2000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
        this.getusrGrpLst();
      }
    }, (error) => {
      console.log(error);
    });
  }

  updateGrp(data) {
    let rte = "alert/updtGrp"
    // console.log('Update ------------------------------------------------');
    // console.log(this.newGrpForm.value)


    let grpCtgryDplLst = _.cloneDeep(this.grpCtgryLst);

    grpCtgryDplLst.filter((k) => {
      this.selectedoptions.filter((s) => {
        if (k.grp_ctry_id == s) {
          k['chk_in'] = 1

        }
      })
      if (k['chk_in'] == undefined) {
        k['chk_in'] = 0;
      }
    })
    // console.log(this.selectedoptions);
    // console.log(grpCtgryDplLst);
    this.updGrpDta = {
      grp_id: this.newGrpForm.value.grp_id,
      grp_nm: this.newGrpForm.value.grp_nm,
      grp_dscn_tx: this.newGrpForm.value.grp_dscn_tx,
      grpCtgryControl: grpCtgryDplLst
    }

    this.apiSrvc.create(this.updGrpDta, rte).subscribe((res) => {
      if (res['status'] == 200) {
        this.snackBar.open("Group updated Sucessfully", '', {
          duration: 2000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
        this.opensideBar('', 'addNew_group', null, '');
        this.newGrpForm.reset()
        this.getusrGrpLst();
      }
    }, (error) => {
      console.log(error);
    });
  }







  user: any = {
    permissions: { 'slct_in': 0, 'insrt_in': 0, 'updt_in': 0, 'dlte_in': 0, 'exprt_in': 0 },
    'perm_url': 'user/permissions/User Groups creation'
  }
  getUsrPermissions(): any {
    this.mainMessage = null;
    this.apiSrvc.get(this.user.perm_url).subscribe((res) => {
      // console.log(res['data']);
      this.user.permissions = res['data'][0];
      if (this.user.permissions.slct_in === 0) {
        this.mainMessage = 'You do not have permissions to do this operation. Please contact Administrator to get permissions.';
      } else
        this.getusrGrpLst();
    });
  }

  getusrGrpLst() {
    this.loader = true;
    let rte = `alert/usrGrpLst`
    this.apiSrvc.get(rte).subscribe((res) => {
      if (res['status'] == 200) {
        this.loader = false;
        this.permissions = (res['perm'] === undefined) ? this.permissions : res['perm'][0];
        if (this.user.permissions.slct_in == 0) this.mainMessage = "You do not have permissions to do this operation. Please contact Administrator to get user.permissions."
        if (res['data'].length == 0) this.mainMessage = "No entries found in the database."

        this.grpLst = res['data'];
        // console.log(this.grpLst)
        this.columnDefs = [
          { headerName: 'Sno', field: 'Sno', alignment: 'center', cellClass: "pm-grid-number-cell", width: 100, sortable: true, filter: false },
          { headerName: 'Group Name', field: 'grp_nm', alignment: 'left', cellClass: "pm-grid-number-cell", width: 265 },
          { headerName: 'Group Description', field: 'grp_dscn_tx', alignment: 'left', cellClass: "pm-grid-number-cell", width: 265, sortable: true, filter: true },
          { headerName: 'Group Categories', field: 'catgories', alignment: 'left', cellClass: "pm-grid-number-cell", width: 265, sortable: true, filter: true },
          { headerName: 'Created by', field: 'mrcht_usr_nm', alignment: 'left', cellClass: "pm-grid-number-cell", width: 265, sortable: true, filter: true },
          { headerName: 'Created on', field: 'i_ts', alignment: 'center', cellClass: "pm-grid-number-cell", width: 265, sortable: true, filter: true },
        ];
      } else if (res['status'] == 404) {
        this.permissions = { "slct_in": 0, "insrt_in": 0, "updt_in": 0, "dlte_in": 0, "exprt_in": 0 }
      }
    }, (error) => {
      // console.log(error)
    });
  }

  //   onToolbarPreparing(e) {
  //     e.toolbarOptions.items.unshift({
  //             location: 'after',
  //             widget: 'dxButton',
  //             options: {
  //                 width: 136,
  //                 text: 'Add new Group',
  //                 onClick: this.onCellClick.bind(this,'addNew_group',null, 'New')
  //             }
  //         });
  // }

  getUsrs(grpId, cat) {
    // console.log(grpId, cat);
    if (cat == 'a') { this.rte = `alert/unasgnUsrs/${grpId}` } else { this.rte = `alert/asgnUsrs/${grpId}` }
    let rte = this.rte
    this.apiSrvc.get(rte).subscribe((res) => {
      if (res['status'] == 200) {
        this.permissions = (res['perm'] === undefined) ? this.permissions : res['perm'][0];
        if (this.user.permissions.slct_in == 0) this.mainMessage = "You do not have permissions to do this operation. Please contact Administrator to get user.permissions."
        if (res['data'].length == 0) this.mainMessage = "No entries found in the database."

        this.usrsLst = res['data'];
        // console.log(this.usrsLst)


        this.user_columnDefs = [
          {
            width: 50, filter: false, search: false, headerCheckboxSelection: true,
            headerCheckboxSelectionFilteredOnly: true,
            checkboxSelection: true
          },
          { headerName: 'cstmGrpId', field: 'cstm_grp_id', alignment: 'left', cellClass: "pm-grid-number-cell", width: 100, sortable: true, filter: false, hide: true },
          { headerName: 'Sno', field: 'sno', alignment: 'left', cellClass: "pm-grid-number-cell", width: 100, sortable: true, filter: false },
          { headerName: 'Name', field: 'mrcht_usr_nm', alignment: 'left', cellClass: "pm-grid-number-cell", width: 265 },
          { headerName: 'Mobile No.', field: 'mbl_nu', alignment: 'left', cellClass: "pm-grid-number-cell", width: 265, sortable: true, filter: true },
          { headerName: 'Email', field: 'eml_tx', alignment: 'left', cellClass: "pm-grid-number-cell", width: 265, sortable: true, filter: true },
          { headerName: 'Designation', field: 'dsgn_nm', alignment: 'left', cellClass: "pm-grid-number-cell", width: 265, sortable: true, filter: true },
        ];
        this.rowSelection = "multiple";
      } else if (res['status'] == 404) {
        this.permissions = { "slct_in": 0, "insrt_in": 0, "updt_in": 0, "dlte_in": 0, "exprt_in": 0 }
      }
    }, (error) => {
      // console.log(error)
    });
  }

  getusrGrpCtgryLst() {
    let rte = "alert/usrGrpCtgryLst"
    this.apiSrvc.get(rte).subscribe((res) => {
      this.grpCtgryLst = res['data'];
      // console.log(this.grpCtgryLst);
    }, (error) => {
      // console.log(error)
    });
  }

  onRowSelected(event) {
    // // console.log(event);

    if (event.node.selected == true) {
      // console.log('event.node.selected true-----------------', event.node.selected);
      this.tblCheckboxClicked = true;
      event.data['sts'] = event.node.selected;
      this.selectedUsers.push(event.data);
      // // console.log(this.selectedUsers);
    } else {
      // console.log('event.node.selected false-----------------', event.node.selected);
      this.tblCheckboxClicked = false;
      event.data['sts'] = event.node.selected;
      this.selectedUsers.splice(event.rowIndex, 1);
      // // console.log(this.selectedUsers);
    }

  }

  saveUsr() {
    // console.log('saveUsr ----------------');
    this.selectedUsers = this.selectedUsers.filter(
      (thing, i, arr) => arr.findIndex(t => t.mrcht_usr_id === thing.mrcht_usr_id) === i
    );
    let fnlDta = []
    for (let i = 0; i < this.selectedUsers.length; i++) {
      if (this.selectedUsers[i].sts == true) {
        fnlDta.push(this.selectedUsers[i])
      }
    }

    // console.log(fnlDta);
    let rte = "alert/addnewUsr"
    this.apiSrvc.create(fnlDta, rte).subscribe((res) => {
      if (res['status'] == 200) {
        this.snackBar.open("Users Assigned Sucessfully", '', {
          duration: 2000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
        this.selectedUsers = [];
        this.opensideBar('', 'assign_user', null, '');
        this.getusrGrpLst();
      }
    }, (error) => {
      console.log(error);
    });
  }

  rmvUsr() {
    // console.log('RmvUsr ----------------');
    this.selectedUsers = this.selectedUsers.filter(
      (thing, i, arr) => arr.findIndex(t => t.mrcht_usr_id === thing.mrcht_usr_id) === i
    );
    let fnlDta = []
    for (let i = 0; i < this.selectedUsers.length; i++) {
      if (this.selectedUsers[i].sts == true) {
        fnlDta.push(this.selectedUsers[i])
      }
    }

    // console.log(fnlDta);
    let rte = "alert/rmvexstUsr"
    this.apiSrvc.create(fnlDta, rte).subscribe((res) => {
      if (res['status'] == 200) {
        this.snackBar.open("Users UnAssigned Sucessfully", '', {
          duration: 2000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
        this.selectedUsers = [];
        this.opensideBar('', 'assign_user', null, '');
        this.getusrGrpLst();
      }
    }, (error) => {
      console.log(error);
    });
  }

  getNGrpUsr(grpId) {
    // console.log(grpId);
  }

  opensideBar(dxThis, key, value, nm) {
    // console.log('nm----------------------------------------------', nm);
    if (nm == 'New') {
      this.opensideBar('', 'addNew_group', null, '');
      // this._dsSidebarService.getSidebar(key).toggleOpen();
    }
    else if (nm == 'Assign User') {
      this.opensideBar('', 'assign_user', null, '');
    }
    else if (nm == 'UnAssign User') {
      this.opensideBar('', 'assign_user', null, '');
    }
    else {
      if (value) {
        // console.log('Edit Data -------------------------------------------------------------------------');
        // console.log(value);
        this.sideBarHeader = 'Edit';
        this.editBtn = true;
        this.crtBtn = false;
        this.editClicked = true;
        this.updateData = value;

        if (value.catgory_id != null) {
          let cmprvalue = value.catgory_id.split(',');
          this.cmpreDta = []
          for (let i = 0; i < this.grpCtgryLst.length; i++) {
            for (let j = 0; j < cmprvalue.length; j++) {
              if (this.grpCtgryLst[i].grp_ctry_id == cmprvalue[j]) {
                this.cmpreDta.push(this.grpCtgryLst[i])
              }
            }
          }
        }

        this.newGrpForm.get('grp_id').setValue(value.grp_id);
        this.newGrpForm.get('grp_nm').setValue(value.grp_nm);
        this.newGrpForm.get('grp_dscn_tx').setValue(value.grp_dscn_tx);
        this.selectedoptions = [];
        if (this.cmpreDta) {
          for (let i = 0; i < this.cmpreDta.length; i++) {
            this.selectedoptions.push(this.cmpreDta[i].grp_ctry_id);
          }
        }

        this.newGrpForm.controls['grpCtgryControl'].setValue(this.selectedoptions);
      } else {
        this.editClicked = false;
        this.editBtn = false;
        this.crtBtn = true;
        this.tblCheckboxClicked = false;
      }
    }

    // console.log(key)
    // console.log(value)

    this._dsSidebarService.getSidebar(key).toggleOpen();
  }
  onCellClick(event) {
    // console.log(this.newGrpForm);
    if (event.cellElement.innerText == 'Edit') {
      // this.deleteRle = false;
      this.opensideBar('', 'addNew_group', event.data, 'Edit');
    } else if (event.cellElement.innerText == 'Delete') {
      this.deleteGrp(event.data);
      // this.deleteRle = true;
      // this.opensideBar('addNew_group', event.data);
    }
    else if (event.cellElement.innerText == 'Assign User') {
      // this.addGrp = false;
      // this.addUsr = true;
      // // console.log('userAssn', this.addUsr, this.addGrp);
      this.opensideBar('', 'assign_user', event.data, 'Assign User');
      // console.log(event.data);
      // console.log(event['data'].grp_id);
      this.getUsrs(event['data'].grp_id, 'a')
      this.crtBtn = true;
      this.editBtn = false;
    }
    else if (event.cellElement.innerText == 'UnAssign User') {
      // this.addGrp = false;
      // this.addUsr = true;
      // // console.log('userAssn', this.addUsr, this.addGrp);
      this.opensideBar('', 'assign_user', event.data, 'UnAssign User');
      // console.log(event['data'].grp_id);
      this.getUsrs(event['data'].grp_id, 'ua')
      this.crtBtn = false;
      this.editBtn = true;
    }
    // UnAssign User
  }
  onToolbarPreparing(e) {
    // // console.log(e);
    e.toolbarOptions.items.unshift({
      location: 'after',
      widget: 'dxButton',
      options: {
        icon: 'plus',
        text: 'Add New User Group',
        onClick: this.opensideBar.bind(this, '', 'addNew_group', null, ''),
        bindingOptions: {
          'disabled': 'isEmailButtonDisabled'
        }
      }
    });
  }
}
