import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogRef, MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material';
import { TransfereService } from 'app/providers/transfer/transfer.service';
import { Router } from '@angular/router';
import { DsSidebarService } from '@glits/components/sidebar/sidebar.service';
import { CrudService } from '../../crud.service';
import { DeleteDialogComponent } from 'app/main/shared/components/delete-dialog/delete-dialog.component';
import { UserService } from 'app/providers/user/user.serivce';
@Component({
  selector: 'app-resolve-complaints',
  templateUrl: './resolve-complaints.component.html',
  styleUrls: ['./resolve-complaints.component.scss']
})
export class ResolveComplaintsComponent implements OnInit {
    confirmDialogRef: MatDialogRef<DeleteDialogComponent>;
    permissions;
    columnDefs;
    showTble;
    public cstmrData: any;
    rowData: any;
    loading: any;
    cmpltData:any;
    sdeMnuLdr = false;
    lmoColumnDefs = [];
    // tslint:disable-next-line:quotemark
    getHeaderDtls = function (): any { return { 'title': "Resolve Complaints List", 'icon': 'people_outline' }; };
    msoLmoDtls: any;
    complaintsview: any;
    horizontalPosition: MatSnackBarHorizontalPosition = 'right';
    verticalPosition: MatSnackBarVerticalPosition = 'top';
    shwPermMsg : string;
      cmpltsdata: any;
    constructor(public crdsrv: CrudService, private router: Router, public dialog: MatDialog,  public transfereService: TransfereService, private _dsSidebarService: DsSidebarService) {
      this.permissions = { 'slct_in': 1, 'insrt_in': 0, 'updt_in': 1, 'dlte_in': 1, 'exprt_in': 1 };
      // let permTxt = 'MSO List';
      // let prmeRte = `user/permissions/${permTxt}`;
      // this.crdsrv.get(prmeRte).subscribe((res) => {
      //   this.permissions = res['data'][0];
      // });
    }
  
    ngOnInit(): any {
      this.getcomplaintLst();
    }
  
    // onToolbarPreparing(e) {
    //   e.toolbarOptions.items.unshift({
    //     location: 'after',
    //     widget: 'dxButton',
    //     options: {
    //       icon: 'plus',
    //       text: 'Add MSO',
    //       onClick: this.onCellClick.bind(this, 'new', null),
    //       bindingOptions: {
    //         'disabled': 'isEmailButtonDisabled'
    //       }
    //     }
    //   });
    // }
  
  //   onCellClick(key, lmodata): any {
  //     let agntId;
  //     if (lmodata == null){
  //       agntId = '';
  //     } else {
  //       agntId = lmodata.data.mso_id;
  //     }
  //     this.transfereService.setLoclData('data', {  key: key, value: agntId, parameter: 'mso', enrl_ind: 0 });
  //     this.router.navigate([`/admin/tenant`]);
  //     // this.router.navigate(['admin/tenant'],
  //     //   { queryParams: {  key: key, value: agntId, parameter: 'mso' }, skipLocationChange: true });
  //     // window.history.pushState('', '', 'admin/tenant');
  //   }
  
    getcomplaintLst(): any{
      this.loading = true;
      const cmprte = `subscriberApp/OCCIssueByCatgryResolve/0`;
      this.crdsrv.get(cmprte).subscribe((res) => {
        if (res['status'] === 200) {
          this.loading = false;
          this.rowData = res['data'];
          console.log(this.rowData);
          let counter = 0;
          // let lmoCt = 0;
          this.rowData.filter((k) => {
            // lmoCt = 0;
            k['s_no'] = ++counter;
            // k['lmo_ct'] = k.lmoDtls.length;
            // k.lmoDtls.filter((l) => {
              
            //   l['s_no'] = ++lmoCt;
            // });
          });
          if (res['perm']){
            this.permissions = res['perm'][0];
          } else{
            this.shwPermMsg = 'You do not have permissions to do this operation. Please contact Administrator to get permissions.';
          }
          this.columnDefs = [
            { headerName: 'Sno', field: 's_no', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 80, dataType: 'number', filter: true },
            { headerName: 'Ticket No', field: 'comp_ticketno', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 100, dataType: 'string' ,filter: true},
            { headerName: 'Created Date', field: 'createdDate', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 150 ,filter: true},
            { headerName: 'Created On', field: 'dateCreated', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 150 ,filter: true}, 
            { headerName: 'Ticket Created By', field: 'tkt_rse_by', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 150,filter: true },
            { headerName: 'Created by', field: 'mrcht_usr_nm', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 100 ,filter: true}, 
            { headerName: 'Type', field: 'caftype', alignment:'center', cellClass: 'pm-grid-number-cell', width: 100, dataType: 'number', filter: true },
            { headerName: 'Caller Type', field: 'callertype', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 150 ,filter: true},
            { headerName: 'Complaint Source', field: 'comp_source', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 150,filter: true },
            { headerName: 'District Name', field: 'districtname', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 150, dataType: 'number', filter: true },
            { headerName: 'Caf ID', field: 'caf_id', alignment:'center', cellClass: 'pm-grid-number-cell', width: 100, dataType: 'number', filter: true },
            { headerName: 'Customer Mobile Number', field: 'alternate_mobile', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 150 ,filter: true}, 
            { headerName: 'Issue Type', field: 'comp_ticket_type', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 150,filter: true },
            { headerName: 'Complaint Category', field: 'Category', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 150 ,filter: true},          
            { headerName: 'Issue Owner', field: 'cmplnt_owner', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 100 ,filter: true},
            { headerName: 'Assigned To', field: 'cmplnt_emp', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 150 ,filter: true}, 
            { headerName: 'Status', field: 'cmp_sts', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 100 ,filter: true},
            { headerName: 'Scope', field: 'SCOPE', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 150, dataType: 'number', filter: true },
            { headerName: 'Complaint Remarks', field: 'complaint', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 150,filter: true },
            { headerName: 'Organization', field: 'ent_orgn_name', alignment:'center', cellClass: 'pm-grid-number-cell', width: 100, dataType: 'number', filter: true },
            { headerName: 'Total Time', field: 'datediff', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 150 ,filter: true},
            { headerName: 'Edit', field: 'Edit', alignment: 'center', cellClass: 'pm-grid-number-cell', width:100, height: 40, columnFiltering: false},
          ];
        }
      });
    }
    onCellPrepared(colDef, e) {
      
      if (e.rowType === "data" && e.row.data && e.column.dataField == 'Edit') {
        e.cellElement.style.color = '#ff0000';
        e.cellElement.style.fontWeight = 500;
         e.cellElement.style.background= 'rgba(243, 191, 176, 0.2784313725490196)';
         e.cellElement.style.backgroundClip= 'content-box';
         e.cellElement.style.cursor = "pointer";
      }
   
  }
  onCellClick(event): any{
  //   console.log(event);
    if (event.value == 'Edit'){
     this.cstmrData = event.data;
  //    console.log(event.data);
    this.openSideBar();
    }
  }
  
  // Reset(Form) {
  //     this.showTble = false
  //     Form.reset()
  //     // console.log(this.cafFRm)
  //     // this.crdSrv.create({}, "caf/caf").subscribe(() => {
  
  //     // })
  //   }
  
    openSideBar(): any {
      this._dsSidebarService.getSidebar('addFormPanel1').toggleOpen();
    }
    closeSideBar(): any {
      this._dsSidebarService.getSidebar('addFormPanel1').toggleOpen();
    }
  
  
    onEditClick(key, cmplntdata): any {
      let cad_Id;
      if (cmplntdata == null){
          cad_Id = '';
      } else {
          cad_Id = cmplntdata.data.caf_id;
      }
      this.transfereService.setLoclData('data', {  key: key, value: cad_Id, parameter: 'mso', enrl_ind: 0 });
      this.router.navigate([`admin/cmplnts/edit_complaint`]);
      // this.router.navigate(['admin/tenant'],
      //   { queryParams: {  key: key, value: agntId, parameter: 'mso' }, skipLocationChange: true });
      // window.history.pushState('', '', 'admin/tenant');
    }
  
  
  
    onRowExpanding(e): any {
      e.component.collapseAll(-1);
      console.log(e.key);
  
      const rte = ``;
      this.crdsrv.get(rte).subscribe((res) => {
        this.complaintsview = res['data'];
        console.log(this.complaintsview);
      });
    }
  
    deleteMso(delDtls): any {
      this.confirmDialogRef = this.dialog.open(DeleteDialogComponent, {
        width: '25%',
        panelClass: 'my-class',
        data: { message: 'Are you sure deleting this item ?', id: delDtls.data.caf_id, 
                nm: delDtls.data.NAME, entityname: 'Caf Id', flag: false, rte: `agent/delAgent/${delDtls.data.caf_id}` }
      });
  
     
    }

}
