import { Component, OnInit, ViewChild } from '@angular/core';
import { DsSidebarService } from '@glits/components/sidebar/sidebar.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CrudService } from 'app/main/apps/crud.service';
import { UserService } from 'app/providers/user/user.serivce';
import { MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition, MatSnackBar, MatDialogRef, MatDialog, MatSelectionListChange, MatSelectionList } from '@angular/material';
import * as _ from 'lodash';
import { DeleteDialogComponent } from 'app/main/shared/components/delete-dialog/delete-dialog.component';
import { TopHeaderSrvc } from 'app/providers/top-header/top-header-service';

@Component({
  selector: 'app-myprofile',
  templateUrl: './myprofile.component.html',
  styleUrls: ['./myprofile.component.scss']
})

export class MyprofileComponent implements OnInit {
  userlist: any;
  rowData: any;
  columnDefs = [];
  getRowHeight: (params: any) => number;
  rowSelection: string;
  tblCheckboxClicked = false;
  menuPrfls: any;
  setupPrfls: any;
  ReportPrfls: any;
  ReportProfiles: any;
  // mnuPrfleOpts: any;
  @ViewChild(MatSelectionList) mnuPrfleOpts: MatSelectionList;
  @ViewChild(MatSelectionList) stpPrfleOpts: MatSelectionList;
  showMnuPrfleAsgnBtn = false;
  showStpPrfleAsgnBtn = false;
  showRptPrfleAsgnBtn = false;
  selectedMnuPrfle: any;
  selectedUsers = [];
  defaultColDef:any;
  hdrDta:any;
  loadingCellRendererParams:any;
  overlayLoadingTemplate:any;
  localeTextFunc:any;
  loadingCellRenderer:any;
  mnuPrfleSelectedOptions:any;
  usrSelectedOptions:any;
  onSelection:any;
  selectedStpPrfle: any;
  selectedRptPrfle: any;
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  stpPrfleSelectedOptions = [];
  rptPrfleSelectedOptions = [];
  sidemnuOpnData: any;
  pagination = true;
  paginationPageSize = 10;
  permissions;
  multSlctRow = false;
  shwAsgnPrfleBtn = false;
  onToolbarPreparingTxt: any;
  shwLdr = true;
  getHeaderDtls = function() { return {"title":"User Profile Mapping","icon":"supervised_user_circle"}}

  constructor(private _dsSidebarService: DsSidebarService,private hdrSrvc: TopHeaderSrvc, public crdsrv: CrudService, private _snackBar: MatSnackBar, public dialog: MatDialog) { 
    let rowHeight = 40;
    this.getRowHeight = function (params) {
      return rowHeight;
    };
    this.permissions = { "slct_in": 1, "insrt_in": 0, "updt_in": 1, "dlte_in": 1, "exprt_in": 1 };
  }


  ngOnInit(): void{

    this.hdrDta = { icn: "supervised_user_circle", ttl: "  User Profile Mapping", widths : [{l_xl : "18", l_lg : "12", l_md : "50", l_sm : "100" , r_xl : "82", r_lg : "88", r_md : "50", r_sm : "100"}] }
    this.hdrSrvc.setHdr(this.hdrDta);

    this.getusrDetails();
    this.getUsrMnuPrfls();

    this.mnuPrfleOpts.selectionChange.subscribe((m: MatSelectionListChange) => {          
      // console.log(m);
      this.mnuPrfleOpts.deselectAll();
      m.option.selected = true;
    });

    this.stpPrfleOpts.selectionChange.subscribe((s: MatSelectionListChange) => {          
      // console.log(s);
      this.stpPrfleOpts.deselectAll();
      s.option.selected = true;
    });
  }

  getusrDetails(){
    const usrDtlsrte = 'user/usrlst';
    this.crdsrv.get(usrDtlsrte).subscribe((result: any) => {
      // this.infraTblDtls = result.data;
      // console.log(result.data)
      this.userlist = result.data;
      this.rowData = result.data;
      this.shwLdr = false;
  
      // console.log(this.userlist);

      this.columnDefs = [
        // {  width: 50, filter: false, search: false, headerCheckboxSelection: true,
        // headerCheckboxSelectionFilteredOnly: true,
        // checkboxSelection: true },
        { headerName: 'Sno', field: 'sno', width: 100, filter: false, search: false},
        { headerName: 'First Name', field: 'fst_nm'},
        { headerName: 'Last Name', field: 'lst_nm'},
        { headerName: 'Assigned Menu Profile', field: 'mnu_prfle_nm'},
        { headerName: 'Assigned Setup Profile', field: 'stp_prfle_nm'},
        { headerName: 'Assigned Report Profile', field: 'rpt_prfle_nm'},
      ];
      this.rowSelection = "multiple";
    });
  }

  getUsrMnuPrfls(){
    const prfleRte = `user/menu/profile`;
    this.crdsrv.get(prfleRte).subscribe((res) => {
      this.menuPrfls = res['data'].mnuitems;
      console.log( res['data']);
    }, (error) => {
      console.log(error);
    });
    const stpprfleRte = `user/setup/profiles`;
    this.crdsrv.get(stpprfleRte).subscribe((res) => {
      this.setupPrfls = res['data'];
      console.log( res['data']);
    }, (error) => {
      console.log(error);
    });
    const reportprfleRte = `reports/report/profiles`;
    this.crdsrv.get(reportprfleRte).subscribe((res) => {
      this.ReportProfiles = res['data'];
      this.ReportPrfls = this.ReportProfiles.reportitems;
    }, (error) => {
      console.log(error);
    });
  }

  onCellClick(event) {
    let data;
    // event.data = event;
    console.log(event.data);
    if (event.data == undefined){
      data = event;
    } else {
      data = event.data;
    }
    console.log(data);
    // return;
    this.opensideBar('addFormPanel', data);
  }

  opensideBar(key, data) {
    this.sidemnuOpnData = data;
    console.log(this.sidemnuOpnData);
    if (data == null){
      this.showMnuPrfleAsgnBtn = false;
      this.showStpPrfleAsgnBtn = false;
      this.showRptPrfleAsgnBtn = false;
      this.tblCheckboxClicked = false;
      this.selectedUsers = [];
    } 
      this.mnuPrfleSelectedOptions = [];
      this.stpPrfleSelectedOptions = [];
      this.rptPrfleSelectedOptions = [];
      // console.log(this.tblCheckboxClicked);
      if (data && this.tblCheckboxClicked == false) {
            this.mnuPrfleSelectedOptions.push(data.mnu_prfle_nm);
            this.stpPrfleSelectedOptions.push(data.stp_prfle_nm);
            this.rptPrfleSelectedOptions.push(data.rpt_prfle_nm);
            this.selectedUsers = data;
      }
      // console.log(this.selectedUsers);
      // return;
    this._dsSidebarService.getSidebar(key).toggleOpen();
  }

//   onToolbarPreparing(e) {
//     console.log(e);

//     this.onToolbarPreparingTxt = e;
//     console.log(this.onToolbarPreparingTxt);

//       e.toolbarOptions.items.unshift({
//         location: 'after',
//         widget: 'dxButton',
//         options: {
//             icon: 'group',
//             text: 'Assign Profile',
//             onClick: this.onCellClick.bind(this),
//             // disabled: this.shwAsgnPrfleBtn
//             // bindingOptions: {
//             //   disabled: this.shwAsgnPrfleBtn
//             // }
//         }
//     });
// }

  onRowSelected(event) {
    if (event.selectedRowsData.length > 1){
      this.multSlctRow = true;
      this.shwAsgnPrfleBtn = true;
      // this.onCellClick(event);
      // console.log(this.onToolbarPreparingTxt);
      // this.onToolbarPreparing(event);
    } else {
      this.multSlctRow = false;
      this.shwAsgnPrfleBtn = false;
    }
    
    this.selectedUsers = event.selectedRowsData;
    // console.log(event.node.selected);
    // if (event.node.selected == true){
    //   this.tblCheckboxClicked = true;
    //   this.selectedUsers.push(event.data);
    //   // console.log(this.selectedUsers);
    // } else {
    //   this.tblCheckboxClicked = false;
    //   this.selectedUsers.splice(event.rowIndex, 1);
    //   // console.log(this.selectedUsers);
    // }
    
  }

  onSelectionMnuPrfleOpts(event){
    // console.log(event);
    if (event.option._selected == true){
      this.showMnuPrfleAsgnBtn = true;
    }
  }
  mnuPrfleOptsToggle(event, data){
    // console.log(data);
    this.selectedMnuPrfle = data.mnu_prfle_id;
    // console.log(event);
  }

  assignMenuProfile(){
    // console.log(this.selectedMnuPrfle);
    // console.log(this.selectedUsers);
    let assignMenuProfileData = {
      mnu_prfle_id: this.selectedMnuPrfle,
      usersLst: this.selectedUsers
    };
    console.log(assignMenuProfileData);
    // return;
    const Rte = `user/add/user/menu/profile`;
    this.crdsrv.create(assignMenuProfileData, Rte).subscribe((res) => {
              // this.opensideBar('addFormPanel', null, null);
              
              // console.log(res);
              if(res['status'] == 200){
                this.openSnackBar();
                this.getusrDetails();
              }
            }, (error) => {
              console.log(error);
            });
  }
  openSnackBar() {
    this._snackBar.open('User menu Profile Assigned Successfully', '', {
      duration: 2500,
      panelClass: ['blue-snackbar'],
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }
  onSelectionStpPrfleOpts(event){
   
    // event.option._selected = true;
    // console.log(event.option._selected);
    if (event.option._selected == true){
      event.option.selectionList.selectedOptions._multiple = false;
      this.showStpPrfleAsgnBtn = true;
    }
  }
  stpPrfleOptsToggle(event, data){
    // console.log(data);
    this.selectedStpPrfle = data.stp_prfle_id;
    // console.log(event);
  }


  assignStpProfile(){
    // console.log(this.selectedStpPrfle);
    // console.log(this.selectedUsers);
    let assignStpProfileData = {
      stp_prfle_id: this.selectedStpPrfle,
      usersLst: this.selectedUsers
    };
    console.log(assignStpProfileData);
    // return;
    const Rte = `user/add/user/setup/profile`;
    this.crdsrv.create(assignStpProfileData, Rte).subscribe((res) => {
              // this.opensideBar('addFormPanel', null, null);
              
              // console.log(res);
              if(res['status'] == 200){
                this.openSnackBarSetup();
                this.getusrDetails();
              }
            }, (error) => {
              console.log(error);
            });
  }
  openSnackBarSetup() {
    this._snackBar.open('User Setup Profile Assigned Successfully', '', {
      duration: 2500,
      panelClass: ['blue-snackbar'],
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }

  onSelectionrptPrfleOpts(event){
   
    // event.option._selected = true;
    // console.log(event.option._selected);
    if (event.option._selected == true){
      event.option.selectionList.selectedOptions._multiple = false;
      this.showRptPrfleAsgnBtn = true;
    }
  }
  rptPrfleOptsToggle(event, data){
    this.selectedRptPrfle = data.rpt_prfle_id;
    // console.log(event);
  }
  

  assignRptProfile(){
    // console.log(this.selectedRptPrfle);
    // console.log(this.selectedUsers);
    let assignStpProfileData = {
      rpt_prfle_id: this.selectedRptPrfle,
      usersLst: this.selectedUsers
    };
    console.log(assignStpProfileData);
    // return;
    const Rte = `reports/add/user/report/profile`;
    this.crdsrv.create(assignStpProfileData, Rte).subscribe((res) => {
              // this.opensideBar('addFormPanel', null, null);
              
              // console.log(res);
              if(res['status'] == 200){
                this.openSnackBarReport();
                this.getusrDetails();
              }
            }, (error) => {
              console.log(error);
            });
  }
  openSnackBarReport() {
    this._snackBar.open('User Report Profile Assigned Successfully', '', {
      duration: 2500,
      panelClass: ['blue-snackbar'],
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }
}
