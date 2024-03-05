import { Component, OnInit } from '@angular/core';
import { CrudService } from 'app/main/apps/crud.service';
import { Router, NavigationExtras } from '@angular/router';
import { MatDialogRef, MatDialog,MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition,MatSnackBar } from '@angular/material';
import { DeleteDialogComponent } from 'app/main/shared/components/delete-dialog/delete-dialog.component';
import { TransfereService } from 'app/providers/transfer/transfer.service';
import { DsSidebarService } from '@glits/components/sidebar/sidebar.service';
// import { Router } from '@angular/router';

@Component({
  selector: 'app-lmo',
  templateUrl: './lmo.component.html',
  styleUrls: ['./lmo.component.scss']
})
export class LmoComponent implements OnInit {
  permissions;
  columnDefs;
  rowData: any;
  loading: any;
  sidebar: boolean = false;
  confirmDialogRef: MatDialogRef<DeleteDialogComponent>;
  
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  // tslint:disable-next-line:quotemark
  getHeaderDtls = function (): any { return { 'title': "LMO's Details", 'icon': 'people_outline' }; };
  shwPermMsg: string;
  ste_lst: any;
  distId: any;
  mndl_lst: any;
  dstrt_lst: any;
  vlge_lst: any;
  VlgeID: any;
  mndlID: any;
  steID: any;
  pop_lst: any;
  subID: any;
  agnt_data: any[];
  constructor(public crdsrv: CrudService, private router: Router,private snackBar: MatSnackBar, public dialog: MatDialog,private dsSidebarService: DsSidebarService, public transfereService: TransfereService) {
    // this.permissions = { 'slct_in': 1, 'insrt_in': 0, 'updt_in': 1, 'dlte_in': 1, 'exprt_in': 1 };
    // let permTxt = 'LMO List';
    // let prmeRte = `user/permissions/${permTxt}`;
    // this.crdsrv.get(prmeRte).subscribe((res) => {
    //   this.permissions = res['data'][0];
    // });
  }

  ngOnInit(): any {
    this.getAgentLst();
  }

  onCellClick(key, lmodata): any {
    let agntId;
    if (lmodata == null){
      agntId = '';
    } else {
      agntId = lmodata.data.agnt_id;
    }
    this.transfereService.setLoclData('data', {  key: key, value: agntId, parameter: 'lmo', enrl_ind: 0 });
    this.router.navigate([`/admin/tenant`]);
    // this.router.navigate(['admin/tenant'],
    //   { queryParams: {  key: key, value: agntId, parameter: 'lmo' }, skipLocationChange: false });
    // window.history.pushState('', '', 'admin/tenant');
  }
  onADD(data){
    console.log(data)
    this.agnt_data =[]
    this.agnt_data =data.data.agnt_id
    this.sidebar = true;
      this.openSideBar('addFormPanel');
      this.ste_lst=[]
      this.dstrt_lst =[] 
      this.mndl_lst =[]
      this.vlge_lst =[]
      this.pop_lst =[]
      this.distId= null,
     this.mndlID = null,
       this.VlgeID =null,
       this.steID= null,
       this.subID=null;
this.getStates()
  }
  getStates() {
    const rte = `admin/states`;
    this.crdsrv.get(rte).subscribe((res) => {
      if (res['data'].length > 0) {
        this.ste_lst = res['data'];
        console.log(this.ste_lst)
      }
    })
  }
  getDistricts(ste_id) {
    const rte = `admin/states/${ste_id}/districts`;
    console.log(rte)
    this.crdsrv.get(rte).subscribe((res) => {
      console.log(res)
      let data = res['data']
      this.dstrt_lst =data 
    });
  }
  getMandals(dst_id) {
     this.distId = dst_id
    const rte = `admin/districts/${dst_id}/mandals`;
    this.crdsrv.get(rte).subscribe((res) => {
      let data = res['data']
      this.mndl_lst =data 
      console.log(this.mndl_lst)
    });
  }
  getVillages(mndl_id) {
    const rte = `user/getvlgs/${mndl_id}/${this.distId}`;
    this.crdsrv.get(rte).subscribe((res) => {
      let data = res['data']
        this.vlge_lst =data
        console.log(this.vlge_lst)
   
    });

  }
  getpop(id){
  
    let data = []
      data.push(
        {
          dstrct_id: this.distId,
          mndl_id: this.mndlID,
          vlge_id: this.VlgeID,
        }
      )
      const rte = `caf/getallPop`;
      this.crdsrv.create(data, rte).subscribe((res) => {
        let data = res['data']
          this.pop_lst =data
          console.log(this.pop_lst)
     
      });
      
  }
  update(){
    let data = []
    data.push(
      {
        agnt_id: this.agnt_data,
        subID: this.subID,
        vlge_id: this.VlgeID,
      }
    )
    console.log(data)
    const rte = `caf/addpop`;
    this.crdsrv.create(data, rte).subscribe((res) => {
      if (res['status'] == 200) {
        this.snackBar.open("Sucessfully Added", '', {
          duration: 2000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
        this.closeSideBar();
      }
   
    });
  }
  openSideBar(key) {
    this.loading=false;
    this.dsSidebarService.getSidebar(key).toggleOpen();
  }
  closeSideBar() {
    this.dsSidebarService.getSidebar('addFormPanel').toggleOpen();
  }
  onCellViewClick(rowdata): any{
    // console.log(rowdata);
    this.transfereService.setLoclData('data', rowdata.data);
    this.router.navigate([`/admin/tenant/lmo/profile`]);
  }

  getAgentLst(): any {
    this.loading = true;
    const rte = `agent/lmo`;
    this.crdsrv.get(rte).subscribe((res) => {
      if (res['status'] === 200) {
        this.loading = false;
        if (res['perm']){
          this.permissions = res['perm'][0];
        } else{
          this.shwPermMsg = 'You do not have permissions to do this operation. Please contact Administrator to get permissions.';
        }
        this.rowData = res['data'];
        this.columnDefs = [
          { headerName: 'Sno', field: 's_no', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 100 ,filter:false},
          { headerName: 'LMO Name', field: 'NAME', alignment: 'left', cellClass: 'pm-grid-number-cell', width: 265 },
          { headerName: 'LMO Code', field: 'agnt_cd', alignment: 'left', cellClass: 'pm-grid-number-cell', width: 150 },
          // { headerName: 'LMO Category', field: 'prtnr_nm', alignment: 'left', cellClass: 'pm-grid-number-cell', width: 265 },
          { headerName: 'Enrollmnet No', field: 'enrlt_nu', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 150 },
          { headerName: 'Office Contact Name', field: 'lmo_cntct_nm', alignment: 'left', cellClass: 'pm-grid-number-cell', width: 150 },
          { headerName: 'Office Mobile Number', field: 'lmo_mbl_nu', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 150 },
          { headerName: 'Office State Name', field: 'ste_nm', alignment: 'left', cellClass: 'pm-grid-number-cell', width: 150 },
          { headerName: 'Office District Name', field: 'dstrt_nm', alignment: 'left', cellClass: 'pm-grid-number-cell', width: 150 },
          { headerName: 'Office Mandal Name', field: 'mndl_nm', alignment: 'left', cellClass: 'pm-grid-number-cell', width: 150 },
          { headerName: 'Office Village Name', field: 'vlge_nm', alignment: 'left', cellClass: 'pm-grid-number-cell', width: 150 },
          { headerName: 'Onboard Date', field: 'lmo_onbrd_dt', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 150 }
          // { headerName: 'Gst No', field: 'gst_nu', alignment: 'left', cellClass: 'pm-grid-number-cell', width: 265 },
          // { headerName: 'Postal Registration No', field: 'pstl_reg_nu', alignment: 'left', cellClass: 'pm-grid-number-cell', width: 150 },
          // { headerName: 'Postal Expiration Date', field: 'date', alignment: 'left', cellClass: 'pm-grid-number-cell', width: 150 }
        ];
      }
    });
  }

  deleteLmo(delDtls): any
  {
    this.confirmDialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '25%',
      panelClass: 'my-class',
      data: { message: 'Are you sure deleting this item ?', id: delDtls.data.agnt_id, 
              nm: delDtls.data.NAME, entityname: 'Agent', flag: false, rte: `agent/delAgent/${delDtls.data.agnt_id}` }
    });

    this.confirmDialogRef.afterClosed().subscribe((response) => {
      if (response === undefined) { }
      else if (response.status === 200) { this.getAgentLst(); }
    });
  }
}
