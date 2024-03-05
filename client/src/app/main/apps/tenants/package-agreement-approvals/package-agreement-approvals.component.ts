import { Component, OnInit } from '@angular/core';
import { CrudService } from 'app/main/apps/crud.service';
import { MessageDialogComponent } from 'app/main/shared/components/message-dialog/message-dialog.component';
import { MatDialogRef, MatDialog, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition, MatSnackBar } from '@angular/material';
import { DsSidebarService } from '@glits/components/sidebar/sidebar.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-package-agreement-approvals',
  templateUrl: './package-agreement-approvals.component.html',
  styleUrls: ['./package-agreement-approvals.component.scss']
})
export class PackageAgreementApprovalsComponent implements OnInit {
  permissions;
  gridRowData: any;
  pageLdr:boolean;
  agrmntDtls: any;
  partnersDtls: any;
  gridColumnDefs:any;
  openSidebarKey = 'addFormPanel';
  sdeMnuLdr = false;
  cstmrWaveOffFormGroup:any;
  shwBtns = false;
  comment: any;
  slctdPackages: any;
  
  confirmMsgDialogRef: MatDialogRef<MessageDialogComponent>;
  
 horizontalPosition: MatSnackBarHorizontalPosition = 'right';
 verticalPosition: MatSnackBarVerticalPosition = 'top';
  myApprovalsData: any;
  recentApprovals: any;
  getHeaderDtls = function () { return { 'title': 'Package Agreement Approvals', 'icon': 'money' }};
  shwPermMsg: string;



  constructor(public crdsrv: CrudService, public dialog: MatDialog, private _dsSidebarService: DsSidebarService, private _formBuilder: FormBuilder
    , public snackBar: MatSnackBar, public datePipe: DatePipe) {
      // this.permissions = { 'slct_in': 1, 'insrt_in': 0, 'updt_in': 1, 'dlte_in': 1, 'exprt_in': 0 };
      // const permTxt = 'Package Agreement';
      // const prmeRte = `user/permissions/${permTxt}`;
      // this.crdsrv.get(prmeRte).subscribe((res) => {
      //   // console.log(res['data'][0]);
      //   this.permissions = res['data'][0];
      // });
     }

  ngOnInit() {
    console.log("packageAPPROVALS");
    this.getPendingApprovals();
  }
  getPendingApprovals(){
    console.log("packageAPPROVALS1111111111111111");
    this.pageLdr=true;
    // if (this.permissions == undefined){
    //   this.pageLdr = false;
    // }
    let rte = 'package/packageAgreement/approval';

    this.crdsrv.get(rte).subscribe((res) => {
      console.log(res['data']);
      this.gridRowData = res['data']
      if(res['status'] == 200){
        this.pageLdr=false;
        var index = 0
        for (var k = 0; k < this.gridRowData.length; k++) {
          index = index + 1;
          this.gridRowData[k].indx = index;
        }
        if (res['perm']){
          this.permissions = res['perm'][0];
        } else{
          this.shwPermMsg = 'You do not have permissions to do this operation. Please contact Administrator to get permissions.';
        }
        this.gridColumnDefs = [
          { headerName: 'Sno', field: 'indx', cellStyle: { 'text-align': "center" }, cellClass: "pm-grid-number-cell", width: 70, sortable: true, filter: false },
          { headerName: 'Package Agreement Id', field: 'pckge_agrmt_id', cellStyle: { 'text-align': "center" }, cellClass: "pm-grid-number-cell", width: 180, sortable: true, filter: false },
          { headerName: 'Package Agreement Date', field: 'pckge_agrmt_dt', cellStyle: { 'text-align': "center" }, cellClass: "pm-grid-number-cell", width: 200 },
          // { headerName: 'Approve Date', field: 'aprve_ts', cellStyle: { 'text-align': "left" }, cellClass: "pm-grid-number-cell", width: 180, sortable: true, filter: true },
          // { headerName: 'Description', field: 'aprve_cmnt_tx', cellStyle: { 'text-align': "left" }, cellClass: "pm-grid-number-cell", width: 180, sortable: true, filter: true },
          // { headerName: 'Approve By', field: 'aprve_usr_nm', cellStyle: { 'text-align': "left" }, cellClass: "pm-grid-number-cell", width: 150, sortable: true, filter: true },
          { headerName: 'Created On', field: 'i_ts', cellStyle: { 'text-align': "left" }, cellClass: "pm-grid-number-cell", width: 140, sortable: true, filter: true },
          { headerName: 'Packages Count', field: 'pckg_ct', cellStyle: { 'text-align': "left" }, cellClass: "pm-grid-number-cell", width: 140, sortable: true, filter: true },
          { headerName: 'Base Packages Count', field: 'bsepckg_ct', cellStyle: { 'text-align': "left" }, cellClass: "pm-grid-number-cell", width: 160, sortable: true, filter: true },
          { headerName: 'AddOn Packages Count', field: 'addpckg_ct', cellStyle: { 'text-align': "left" }, cellClass: "pm-grid-number-cell", width: 160, sortable: true, filter: true },
          { headerName: 'Agents', field: 'agnt_cds', cellStyle: { 'text-align': "left" }, cellClass: "pm-grid-number-cell", width: 160, sortable: true, filter: true},
        ];
      }
    })
  }
  onCellClick(e){
    console.log("*********");
    console.log(e);
    let rte = `package/agreement/details/${e.data.pckge_agrmt_id}`
    this.crdsrv.get(rte).subscribe((res) => {
      console.log(res['data']);
      this.agrmntDtls=res['data'];
      console.log(this.agrmntDtls);
      var index = 0
      for (var k = 0; k < this.agrmntDtls.length; k++) {
        index = index + 1;
        this.agrmntDtls[k].sno = index;
      }
    })
  }
  onScdCellClick(i){
    console.log("&&&&&&&&&&&&&&&&&&&&&&&");
    console.log(i.data);
    let data ={
      tmple_id :i.data.tmple_id,
      pckge_id:i.data.pckge_id,
      packge_agrmnt_id:i.data.pckge_agrmt_id
    }
    let rte=`package/agreement/partners/details`
    this.crdsrv.create(data,rte).subscribe((res) => {
      console.log(res['data']);
      this.partnersDtls=res['data'];
      console.log(this.partnersDtls);
      var index = 0
      for (var k = 0; k < this.partnersDtls.length; k++) {
        index = index + 1;
        this.partnersDtls[k].sno = index;
      }
    })
  }
  tabChangeFn(event): void {
    if (event.index === 1) {
      this.getMyApprovals();
      console.log("secondoneeeeeeeeeeeeeee");
    } else if (event.index === 2) {
       this.getRecntApprovals();
    }
  }

  onRowSelected(event): void {
    this.slctdPackages = event.selectedRowsData;

    if (this.slctdPackages.length !== 0 ){
      this.shwBtns = true;
    } else{
      this.shwBtns = false;
    }
  }

    aprve(): void{
      this._dsSidebarService.getSidebar(this.openSidebarKey).toggleOpen();
    }
    closeSideBar(): void {
      this._dsSidebarService.getSidebar('addFormPanel').toggleOpen();
    }

    // save(){
    //   console.log(this.comment);
    //   console.log(this.slctdPackages);
     
    // }

    save(): void{
      this.confirmMsgDialogRef = this.dialog.open(MessageDialogComponent, {
          width: '25%',
          panelClass: 'my-class',
          data: {
              title: 'Are you sure',
              msg: 'You really want to approve them',
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
    
          if (response === 'yes'){
            for (let u = 0; u < this.slctdPackages.length; u++){
              this.slctdPackages[u]['aprvl_desc_tx'] = this.comment;
              this.slctdPackages[u]['aprvl_in'] = 1;
              // this.slctdPackages[u]['trsn_dt'] = this.slctdPackages[u].trsn_dt.split('-').reverse().join('-');
            }
    
           console.log(this.slctdPackages);
           let data ={
            packages :this.slctdPackages,
          }
          let rte=`package/agreement/ApproveAndReject`
          this.crdsrv.create(data,rte).subscribe((res) => {
            if (res['status'] === 200) {
              this.snackBar.open('Approved Sucessfully', '', {
                duration: 3000,
                horizontalPosition: this.horizontalPosition,
                verticalPosition: this.verticalPosition,
              });
              this.shwBtns = false;
              this.closeSideBar();
              this.getPendingApprovals();
            }
            
          })
          }
        }
      });
      }
      rejct(): void{
        this.confirmMsgDialogRef = this.dialog.open(MessageDialogComponent, {
          width: '25%',
          panelClass: 'my-class',
          data: {
              title: 'Are you sure',
              msg: 'You really want to reject them',
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
    
          if (response === 'yes'){
            for (let u = 0; u < this.slctdPackages.length; u++){
              this.slctdPackages[u]['aprvl_in'] = 0;
            }
            let data ={
              packages :this.slctdPackages,
            }
            const rte = `package/agreement/ApproveAndReject`;
            this.crdsrv.create(data, rte).subscribe((res) => {
              if (res['status'] === 200) {
                this.snackBar.open('Rejected Sucessfully', '', {
                  duration: 3000,
                  horizontalPosition: this.horizontalPosition,
                  verticalPosition: this.verticalPosition,
                });
                this.getPendingApprovals();
              }
            });
          }
        }
      });
      }
      getMyApprovals(){
        this.pageLdr=true;
        const rte = `package/agreement/myapprovals`;
        this.crdsrv.get(rte).subscribe((res) => {
          console.log(res['data'])
          this.myApprovalsData = res['data']
          if(res['status'] == 200){
            this.pageLdr=false;
            var index = 0
            for (var k = 0; k < this.myApprovalsData.length; k++) {
              index = index + 1;
              this.myApprovalsData[k].indx = index
            }
            this.gridColumnDefs = [
              { headerName: 'Sno', field: 'indx', cellStyle: { 'text-align': "center" }, cellClass: "pm-grid-number-cell", width: 70, sortable: true, filter: false },
              { headerName: 'Package Agreement Id', field: 'pckge_agrmt_id', cellStyle: { 'text-align': "center" }, cellClass: "pm-grid-number-cell", width: 180, sortable: true, filter: false },
              { headerName: 'Package Agreement Date', field: 'pckge_agrmt_dt', cellStyle: { 'text-align': "center" }, cellClass: "pm-grid-number-cell", width: 200 },
              // { headerName: 'Approve Date', field: 'aprve_ts', cellStyle: { 'text-align': "left" }, cellClass: "pm-grid-number-cell", width: 180, sortable: true, filter: true },
              // { headerName: 'Description', field: 'aprve_cmnt_tx', cellStyle: { 'text-align': "left" }, cellClass: "pm-grid-number-cell", width: 180, sortable: true, filter: true },
              // { headerName: 'Approve By', field: 'aprve_usr_nm', cellStyle: { 'text-align': "left" }, cellClass: "pm-grid-number-cell", width: 150, sortable: true, filter: true },
              { headerName: 'Created On', field: 'i_ts', cellStyle: { 'text-align': "left" }, cellClass: "pm-grid-number-cell", width: 140, sortable: true, filter: true },
              { headerName: 'Packages Count', field: 'pckg_ct', cellStyle: { 'text-align': "left" }, cellClass: "pm-grid-number-cell", width: 140, sortable: true, filter: true },
              { headerName: 'Base Packages Count', field: 'bsepckg_ct', cellStyle: { 'text-align': "left" }, cellClass: "pm-grid-number-cell", width: 160, sortable: true, filter: true },
              { headerName: 'AddOn Packages Count', field: 'addpckg_ct', cellStyle: { 'text-align': "left" }, cellClass: "pm-grid-number-cell", width: 160, sortable: true, filter: true },
              { headerName: 'Agents', field: 'agnt_cds', cellStyle: { 'text-align': "left" }, cellClass: "pm-grid-number-cell", width: 160, sortable: true, filter: true},
            ];
          }
        })
      }


      getRecntApprovals(){
        this.pageLdr=true;
        console.log("getttttttttttttt");
        const rte = `package/agreement/recentApprovals`;
        this.crdsrv.get(rte).subscribe((res) => {
          this.recentApprovals = res['data']
          console.log(this.recentApprovals)
          if(res['status'] == 200){
            this.pageLdr=false;
            var index = 0
            for (var k = 0; k < this.recentApprovals.length; k++) {
              index = index + 1;
              this.recentApprovals[k].indx = index;
            }
            this.gridColumnDefs = [
              { headerName: 'Sno', field: 'indx', cellStyle: { 'text-align': "center" }, cellClass: "pm-grid-number-cell", width: 70, sortable: true, filter: false },
              { headerName: 'Package Agreement Id', field: 'pckge_agrmt_id', cellStyle: { 'text-align': "center" }, cellClass: "pm-grid-number-cell", width: 180, sortable: true, filter: false },
              { headerName: 'Package Agreement Date', field: 'pckge_agrmt_dt', cellStyle: { 'text-align': "center" }, cellClass: "pm-grid-number-cell", width: 200 },
              // { headerName: 'Approve Date', field: 'aprve_ts', cellStyle: { 'text-align': "left" }, cellClass: "pm-grid-number-cell", width: 180, sortable: true, filter: true },
              // { headerName: 'Description', field: 'aprve_cmnt_tx', cellStyle: { 'text-align': "left" }, cellClass: "pm-grid-number-cell", width: 180, sortable: true, filter: true },
              // { headerName: 'Approve By', field: 'aprve_usr_nm', cellStyle: { 'text-align': "left" }, cellClass: "pm-grid-number-cell", width: 150, sortable: true, filter: true },
              { headerName: 'Created On', field: 'i_ts', cellStyle: { 'text-align': "left" }, cellClass: "pm-grid-number-cell", width: 140, sortable: true, filter: true },
              { headerName: 'Packages Count', field: 'pckg_ct', cellStyle: { 'text-align': "left" }, cellClass: "pm-grid-number-cell", width: 140, sortable: true, filter: true },
              { headerName: 'Base Packages Count', field: 'bsepckg_ct', cellStyle: { 'text-align': "left" }, cellClass: "pm-grid-number-cell", width: 160, sortable: true, filter: true },
              { headerName: 'AddOn Packages Count', field: 'addpckg_ct', cellStyle: { 'text-align': "left" }, cellClass: "pm-grid-number-cell", width: 160, sortable: true, filter: true },
              { headerName: 'Agents', field: 'agnt_cds', cellStyle: { 'text-align': "left" }, cellClass: "pm-grid-number-cell", width: 160, sortable: true, filter: true},
            ];
          }
        })
      }

    packagesandTmplate(e:any){

    }
   
}
