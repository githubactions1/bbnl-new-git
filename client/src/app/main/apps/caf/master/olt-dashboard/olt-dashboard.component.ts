import { Component, OnInit, ViewChild } from '@angular/core';
import { CrudService } from 'app/main/apps/crud.service';
import { DsSidebarService } from '@glits/components/sidebar/sidebar.service';
import { AtomService } from 'app/main/services/atom.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition, MatDialog } from '@angular/material';
import { DeleteDialogComponent } from 'app/main/shared/components/delete-dialog/delete-dialog.component';
import { UserService } from 'app/providers/user/user.serivce';
import { switchMap, debounceTime, tap, map, finalize } from 'rxjs/operators';


@Component({
  selector: 'app-olt-dashboard',
  templateUrl: './olt-dashboard.component.html',
  styleUrls: ['./olt-dashboard.component.scss']
})
export class OltDashboardComponent implements OnInit {
  oltLst: any;
  columnDefs: { headerName: string; field: string; cellStyle: { 'text-align': string; }; cellClass: string; width: number; sortable: boolean; filter: boolean; }[];
  getHeaderDtls = function () { return { "title": "Optical Line Terminal (OLT)", "icon": "list_alt" } }
  tableView:boolean;

  constructor(private fb: FormBuilder, private dsSidebarService: DsSidebarService,
    public crdsrv: CrudService, public atmSrv: AtomService, private formBuilder: FormBuilder, public snackBar: MatSnackBar, private userService: UserService) { }

  ngOnInit() {
    this.getOltDtls()
  }
  getOltDtls(){
    this.tableView = false;
    let rte = `olt/oltDetails`
    this.crdsrv.get(rte).subscribe((res) => {
      console.log(res['data']);
      this.oltLst = res['data'];
      console.log(this.oltLst);
      if (res['status'] == 200) {
        this.tableView = true;
        this.columnDefs = [
          { headerName: 'Sno', field: 'sno', cellStyle: { 'text-align': "center" }, cellClass: "pm-grid-number-cell", width: 70, sortable: true, filter: false },
          { headerName: 'OLT Name', field: 'olt_nm', cellStyle: { 'text-align': "center" }, cellClass: "pm-grid-number-cell", width: 220, sortable: true, filter: true },
          { headerName: 'OLT Serial No', field: 'olt_srl_nu', cellStyle: { 'text-align': "center" }, cellClass: "pm-grid-number-cell", width: 130, sortable: true, filter: true },
          { headerName: 'OLT IP Address', field: 'olt_ip_addr_tx', cellStyle: { 'text-align': "center" }, cellClass: "pm-grid-number-cell", width: 130, sortable: true, filter: true },
          { headerName: 'OLT Type', field: 'olt_type_nm', cellStyle: { 'text-align': "center" }, cellClass: "pm-grid-number-cell", width: 130, sortable: true, filter: true },
          { headerName: 'Sub-station', field: 'sbstn_nm', cellStyle: { 'text-align': "center" }, cellClass: "pm-grid-number-cell", width: 200, sortable: true, filter: true },
          { headerName: 'District', field: 'dstrt_nm', cellStyle: { 'text-align': "center" }, cellClass: "pm-grid-number-cell", width: 150, sortable: true, filter: true },
          { headerName: 'Mandal', field: 'mndl_nm', cellStyle: { 'text-align': "center" }, cellClass: "pm-grid-number-cell", width: 150, sortable: true, filter: true },
          { headerName: 'OLT Operational State', field: 'ste_nm', cellStyle: { 'text-align': "center" }, cellClass: "pm-grid-number-cell", width: 170, sortable: true, filter: true },
          { headerName: 'OLT Operational State From', field: 'oprtnl_ste_chnge_ts', cellStyle: { 'text-align': "center" }, cellClass: "pm-grid-number-cell", width: 170, sortable: true, filter: true },
          { headerName: 'OLT Status', field: 'sts_nm', cellStyle: { 'text-align': "center" }, cellClass: "pm-grid-number-cell", width: 140, sortable: true, filter: true },
          { headerName: 'OLT Status from', field: 'oprnl_sts_chnge_ts', cellStyle: { 'text-align': "center" }, cellClass: "pm-grid-number-cell", width: 170, sortable: true, filter: true },
        ]
      }
    })
  }
  onClickNodes(ndata){
    console.log(ndata);
    this.openSideBar('addFormPanel');
  }
  refresh(rdata){
    console.log(rdata);
  }


  openSideBar(key) {
    this.dsSidebarService.getSidebar(key).toggleOpen();
  }

  closeSideBar() {
    this.dsSidebarService.getSidebar('addFormPanel').toggleOpen();
  }

}
