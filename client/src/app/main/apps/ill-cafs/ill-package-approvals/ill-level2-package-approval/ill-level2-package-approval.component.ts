import { Component, OnInit, ViewChild  } from '@angular/core';
import { MatDialogRef, MatDialog, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition, MatSnackBar } from '@angular/material';
import { MessageDialogComponent } from 'app/main/shared/components/message-dialog/message-dialog.component';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DsSidebarService } from '@glits/components/sidebar/sidebar.service';
import { CrudService } from 'app/main/apps/crud.service';
import { DxDataGridModule, DxDataGridComponent } from "devextreme-angular";

@Component({
  selector: 'app-ill-level2-package-approval',
  templateUrl: './ill-level2-package-approval.component.html',
  styleUrls: ['./ill-level2-package-approval.component.scss']
})
export class IllLevel2PackageApprovalComponent implements OnInit {
  @ViewChild(DxDataGridComponent) dataGrid: DxDataGridComponent;
  shwLdr = false;
  pckgAprvlLst: any;
  pckgColumnDefs;
  permissions;
  shwBtns = false;
  sdeMnuLdr = false;
  openSidebarKey = 'addFormPanel';
  confirmMsgDialogRef: MatDialogRef<MessageDialogComponent>;
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  pckgApprvlFormGroup: FormGroup;
  rcntPckgAprvlLst;
  rcntPckgColumnDefs;
  myPckgAprvlLst;
  myPckgColumnDefs;
  getHeaderDtls = function () { return { 'title': 'ILL Package Approvals Level-2', 'icon': 'money' }; };
  slctdrow: any;
  aprvPckge: boolean;
  /**
      * @param {DsSidebarService} _dsSidebarService
      */

  constructor(private _dsSidebarService: DsSidebarService, public crdSrvc: CrudService,public dialog: MatDialog, public snackBar: MatSnackBar,private _formBuilder: FormBuilder) { 
    this.permissions = { 'slct_in': 1, 'insrt_in': 1, 'updt_in': 1, 'dlte_in': 1, 'exprt_in': 0 };
  }
  onSelectionChanged(event): void {
    console.log(event)
    this.slctdrow = [];
    this.slctdrow = event.selectedRowsData;

   console.log(event.selectedRowsData);

   if (event.selectedRowsData.length !== 0) {
     this.shwBtns = true;
   } else {
     this.shwBtns = false;
   }
 }
 onCellPrepared(){

 }
 onToolbarPreparing(){

 }
 onCellClick(){

 }
 viewagremnt(){
   console.log("viewagremnt")
 }
  ngOnInit() {
    this.getPckgesApprvlLst();
    this.pckgApprvlFormGroup = this._formBuilder.group({
      pckge_aprvl_desc_tx: ['']
    });
  }
  tabChangeFn(event): void {
    console.log(event)
    if (event.index === 1) {
      this.getLgnUsrUploads();
    } else if (event.index === 2) {
      this.getRcntApprvlLst();
    }
  }
  getRcntApprvlLst(){
    let rte = `caf/getRcntApprovalPckges/2`;
    this.crdSrvc.get(rte).subscribe(res=>{
      console.log(res['data']);
      this.rcntPckgAprvlLst = res['data']
      let ct = 0;
      this.rcntPckgAprvlLst.filter(k => {
        k['s_no'] = ++ct;
      });
      this.rcntPckgColumnDefs = [
        { headerName: 'S.No', field: 's_no', format: false, alignment: 'center', cellClass: 'pm-grid-number-cell', width: 60, height: 40, filter: false },
        { headerName: 'Customer Id', field: 'cstmr_id', format: false, alignment: 'center', cellClass: 'pm-grid-number-cell', width: 160, height: 40, filter: false },
        { headerName: 'Organization Name', field: 'cstmr_nm', format: false, alignment: 'left', cellClass: 'pm-grid-number-cell', width: 200, height: 40, filter: true },
        { headerName: 'Package name', field: 'ill_pckge_nm', format: false, alignment: 'center', cellClass: 'pm-grid-number-cell', width: 200, height: 40, filter: true },
        { headerName: 'Package Charge', format: true, type: 'currency', currency: 'INR', precision: '2', field: 'chrge_at', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 150, height: 40, filter: true },
        { headerName: 'GST', format: true, type: 'currency', currency: 'INR', precision: '2', field: 'gst_at', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 100, height: 40, filter: true },
        { headerName: 'Total Charge', format: true, type: 'currency', currency: 'INR', precision: '2', field: 'ttl_amnt', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 100, height: 40, filter: true },
        { headerName: 'Billing Frequency', field: 'frqncy_nm', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 150, height: 40, filter: true },
        { headerName: 'Approved Date', format: false, field: 'lvl_2_apprv_ts', alignment: 'left', cellClass: 'pm-grid-number-cell', width: 150, height: 40, filter: true },
        { headerName: 'Approved Comment', format: false, field: 'lvl_2_apprv_desc_txt', alignment: 'left', cellClass: 'pm-grid-number-cell', width: 150, height: 40, filter: true },
        { headerName: 'District', format: false, field: 'dstrt_nm', alignment: 'left', cellClass: 'pm-grid-number-cell', width: 150, height: 40, filter: true },
        { headerName: 'Mandal', format: false, field: 'mndl_nm', alignment: 'left', cellClass: 'pm-grid-number-cell', width: 150, height: 40, filter: true },
        { headerName: 'Village', format: false, field: 'vlge_nm', alignment: 'left', cellClass: 'pm-grid-number-cell', width: 150, height: 40, filter: true },

      ];
    })
  }
  getLgnUsrUploads() {
    let rte = `caf/getMyApprovalPckges/2`;
    this.crdSrvc.get(rte).subscribe(res=>{
      console.log(res['data']);
      this.myPckgAprvlLst = res['data']
      let ct = 0;
      this.myPckgAprvlLst.filter(k => {
        k['s_no'] = ++ct;
      });
      this.myPckgColumnDefs = [
        { headerName: 'S.No', field: 's_no', format: false, alignment: 'center', cellClass: 'pm-grid-number-cell', width: 60, height: 40, filter: false },
        { headerName: 'Customer Id', field: 'cstmr_id', format: false, alignment: 'center', cellClass: 'pm-grid-number-cell', width: 160, height: 40, filter: false },
        { headerName: 'Organization Name', field: 'cstmr_nm', format: false, alignment: 'left', cellClass: 'pm-grid-number-cell', width: 200, height: 40, filter: true },
        { headerName: 'Package name', field: 'ill_pckge_nm', format: false, alignment: 'center', cellClass: 'pm-grid-number-cell', width: 200, height: 40, filter: true },
        { headerName: 'Package Charge', format: true, type: 'currency', currency: 'INR', precision: '2', field: 'chrge_at', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 150, height: 40, filter: true },
        // { headerName: 'APSFL Share', field: 'apsfl_shre_at', format: true, type: 'currency', currency: 'INR', precision: '2', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 100, height: 40, filter: true },
        // { headerName: 'LMO Share', format: true, type: 'currency', currency: 'INR', precision: '2', field: 'lmo_shre_at', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 100, height: 40, filter: true },
        { headerName: 'GST', format: true, type: 'currency', currency: 'INR', precision: '2', field: 'gst_at', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 100, height: 40, filter: true },
        { headerName: 'Total Charge', format: true, type: 'currency', currency: 'INR', precision: '2', field: 'ttl_amnt', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 100, height: 40, filter: true },
        { headerName: 'Billing Frequency', field: 'frqncy_nm', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 150, height: 40, filter: true },
        { headerName: 'Approved Date', format: false, field: 'lvl_2_apprv_ts', alignment: 'left', cellClass: 'pm-grid-number-cell', width: 150, height: 40, filter: true },
        { headerName: 'Approved Comment', format: false, field: 'lvl_2_apprv_desc_txt', alignment: 'left', cellClass: 'pm-grid-number-cell', width: 150, height: 40, filter: true },

        { headerName: 'District', format: false, field: 'dstrt_nm', alignment: 'left', cellClass: 'pm-grid-number-cell', width: 150, height: 40, filter: true },
        { headerName: 'Mandal', format: false, field: 'mndl_nm', alignment: 'left', cellClass: 'pm-grid-number-cell', width: 150, height: 40, filter: true },
        { headerName: 'Village', format: false, field: 'vlge_nm', alignment: 'left', cellClass: 'pm-grid-number-cell', width: 150, height: 40, filter: true },
        

      ];
    })

  }
  getPckgesApprvlLst(): void {
    this.shwBtns = false;


    const rte = `caf/getIllApprovalPckgeslvl2`;

    this.crdSrvc.get(rte).subscribe((res) => {
      console.log(res['data'])
    if (res['status'] === 200) {
    this.pckgAprvlLst = res['data'];
    let ct = 0;
    this.pckgAprvlLst.filter(k => {
      k['s_no'] = ++ct;
    });
    this.pckgColumnDefs = [
      { headerName: 'S.No', field: 's_no', format: false, alignment: 'center', cellClass: 'pm-grid-number-cell', width: 60, height: 40, filter: false },
      { headerName: 'Customer Id', field: 'cstmr_id', format: false, alignment: 'center', cellClass: 'pm-grid-number-cell', width: 160, height: 40, filter: false },
      { headerName: 'Organization Name', field: 'cstmr_nm', format: false, alignment: 'left', cellClass: 'pm-grid-number-cell', width: 200, height: 40, filter: true },
      { headerName: 'Package name', field: 'ill_pckge_nm', format: false, alignment: 'center', cellClass: 'pm-grid-number-cell', width: 200, height: 40, filter: true },
      { headerName: 'Package Charge', format: true, type: 'currency', currency: 'INR', precision: '2', field: 'chrge_at', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 150, height: 40, filter: true },
      // { headerName: 'APSFL Share', field: 'apsfl_shre_at', format: true, type: 'currency', currency: 'INR', precision: '2', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 100, height: 40, filter: true },
      // { headerName: 'LMO Share', format: true, type: 'currency', currency: 'INR', precision: '2', field: 'lmo_shre_at', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 100, height: 40, filter: true },
      { headerName: 'GST',format: true, type: 'currency', currency: 'INR', precision: '2', field: 'gst_at', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 100, height: 40, filter: true },
      { headerName: 'Total Charge', format: true, type: 'currency', currency: 'INR', precision: '2', field: 'ttl_amnt', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 100, height: 40, filter: true },
      { headerName: 'Status', field: 'ill_sts_nm', format: false, alignment: 'center', cellClass: 'pm-grid-number-cell', width: 200, height: 40, filter: true },
      { headerName: 'Billing Frequency', field: 'frqncy_nm', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 150, height: 40, filter: true },
      { headerName: 'District', format: false, field: 'dstrt_nm', alignment: 'left', cellClass: 'pm-grid-number-cell', width: 150, height: 40, filter: true },
      { headerName: 'Mandal', format: false, field: 'mndl_nm', alignment: 'left', cellClass: 'pm-grid-number-cell', width: 150, height: 40, filter: true },
      { headerName: 'Village', format: false, field: 'vlge_nm', alignment: 'left', cellClass: 'pm-grid-number-cell', width: 150, height: 40, filter: true },

    ];
    }
    });
  }
  aprvePckgeLst(): void {
    this.aprvPckge = true;
    this._dsSidebarService.getSidebar(this.openSidebarKey).toggleOpen();
  }
  closeSideBar(): void {
    this._dsSidebarService.getSidebar('addFormPanel').toggleOpen();
  }
  rjctPckges(): void {
    this.aprvPckge = false;
    this._dsSidebarService.getSidebar(this.openSidebarKey).toggleOpen();
  }
  saveAprvePckgeLst(): void {
    if(this.aprvPckge == true){
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
        // tslint:disable-next-line:prefer-const
        // this.fnlSlctdAgnts = [];
        if (response === 'yes') {
          this.shwLdr = true;
         console.log(this.slctdrow)
         this.shwLdr = false;
         for(let i=0;i<this.slctdrow.length;i++){
          this.slctdrow[i]['lvl_2_apprv_desc_txt'] =this.pckgApprvlFormGroup.value.pckge_aprvl_desc_tx
         }
         let rte = `caf/ApprovalPckgeslevlTwo`
         this.crdSrvc.create(this.slctdrow,rte).subscribe(res=>{
           console.log(res)
           if(res['status']==200){
            this.slctdrow = [];
            this.dataGrid.instance.clearSelection();
            this.snackBar.open("Sucessfully Approved", '', {
              duration: 2000,
              horizontalPosition: this.horizontalPosition,
              verticalPosition: this.verticalPosition,
            });
            this.closeSideBar();
            this.getPckgesApprvlLst();
           }
           else{
            this.snackBar.open("Something went worng please try again", '', {
              duration: 2000,
              horizontalPosition: this.horizontalPosition,
              verticalPosition: this.verticalPosition,
            });
          }
         })

          }
        }
         });
        }
        else{
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
              for (let u = 0; u < this.slctdrow.length; u++){
                this.slctdrow[u]['aprvl_in'] = 0;
                this.slctdrow[u]['rjct_lvl'] = 2;
                this.slctdrow[u]['rjct_desc_txt'] = this.pckgApprvlFormGroup.value.pckge_aprvl_desc_tx
              }
              const rte = `caf/illRjctPckges`;
              this.crdSrvc.create(this.slctdrow, rte).subscribe((res) => {
                if (res['status'] === 200) {
                  this.dataGrid.instance.clearSelection();

                  this.slctdrow = [];
                  this.snackBar.open('Rejected Sucessfully', '', {
                    duration: 3000,
                    horizontalPosition: this.horizontalPosition,
                    verticalPosition: this.verticalPosition,
                  });
                  this.closeSideBar();
                  this.getPckgesApprvlLst();
                }
                else{
                  this.snackBar.open("Something went worng please try again", '', {
                    duration: 2000,
                    horizontalPosition: this.horizontalPosition,
                    verticalPosition: this.verticalPosition,
                  });
                }
              });
            }
          }
        });
        }
      }


}
