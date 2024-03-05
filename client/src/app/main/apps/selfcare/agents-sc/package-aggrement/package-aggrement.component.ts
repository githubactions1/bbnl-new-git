import { Component, OnInit, ViewChild } from '@angular/core';
import { CrudService } from 'app/main/apps/crud.service';
import { DsSidebarService } from '@glits/components/sidebar/sidebar.service';
import { AtomService } from 'app/main/services/atom.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition, MatDialog } from '@angular/material';
import { DeleteDialogComponent } from 'app/main/shared/components/delete-dialog/delete-dialog.component';
import { UserService } from 'app/providers/user/user.serivce';

@Component({
  selector: 'app-package-aggrement',
  templateUrl: './package-aggrement.component.html',
  styleUrls: ['./package-aggrement.component.scss']
})
export class PackageAggrementComponent implements OnInit {
  permissions;
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  lmocd: any;
  agnt_id: any;
  gridRowData: any;
  loader: boolean;
  gridColumnDefs: any;
  subTablesData: any;
  packageServices: any;
  templatePartners: any;
  subtable = false;
  servicecolumndefs: { headerName: string; field: string; cellStyle: { 'text-align': string; }; cellClass: string; width: number; }[];
  partnerscolumndefs: { headerName: string; field: string; cellStyle: { 'text-align': string; }; cellClass: string; width: number; }[];
  agrmntDtls: any;
  partnersDtls: any;
  getHeaderDtls = function (): any { return { 'title': 'Package Agreement', 'icon': 'list_alt' }; };
  

  constructor(private dsSidebarService: DsSidebarService, public crdsrv: CrudService, public atmSrv: AtomService, private formBuilder: FormBuilder, 
    public snackBar: MatSnackBar, private userService: UserService) {
    // this.permissions = { 'slct_in': 1, 'insrt_in': 1, 'updt_in': 1, 'dlte_in': 1, 'exprt_in': 1 }
    const permTxt = 'Agent package agreement';
      const prmeRte = `user/permissions/${permTxt}`;
      this.crdsrv.get(prmeRte).subscribe((res) => {
        console.log(res['data'][0]);
        this.permissions = res['data'][0];
      });
    this.userService.USER_DETAILS.subscribe(val => {
      // tslint:disable-next-line:triple-equals
      if (val.usr_ctgry_id == 8) // LMO
            {
                this.lmocd = val.lmo_cd;
                this.agnt_id = val.usr_ctgry_ky;
                console.log(this.agnt_id);
                console.log(val);
            }
      });
  }

  ngOnInit(): any {
     this.getPackgeAgreemnt();
  }
  
  getPackgeAgreemnt(): any {
    this.loader = true;
    console.log(this.agnt_id);
    const rte = `package/select_packageAgreement/${this.agnt_id}`;
    this.crdsrv.get(rte).subscribe((res) => {
      console.log(res['data']);
      this.gridRowData = res['data'];
      console.log(this.gridRowData);
      let index = 0;
      for (let k = 0; k < this.gridRowData.length; k++) {
        index = index + 1;
        this.gridRowData[k].indx = index;
      }
      // tslint:disable-next-line:triple-equals
      if (res['status'] == 200) {
        this.loader = false;
        this.gridColumnDefs = [
          { headerName: 'Sno', field: 'indx', cellStyle: { 'text-align': 'center' }, cellClass: 'pm-grid-number-cell', width: 70, sortable: true, filter: false },
          { headerName: 'Package Agreement Id', field: 'pckge_agrmt_id', cellStyle: { 'text-align': 'center' }, cellClass: 'pm-grid-number-cell', width: 170, 
          sortable: true, filter: false },
          { headerName: 'Package Agreement Date', field: 'pckge_agrmt_dt', cellStyle: { 'text-align': 'center' }, cellClass: 'pm-grid-number-cell', width: 190},
          { headerName: 'Approve Date', field: 'aprve_ts', cellStyle: { 'text-align': 'left' }, cellClass: 'pm-grid-number-cell', width: 180, sortable: true, filter: true },
          { headerName: 'Description', field: 'aprve_cmnt_tx', cellStyle: { 'text-align': 'left' }, cellClass: 'pm-grid-number-cell', width: 180, sortable: true, filter: true },
          { headerName: 'Approve By', field: 'aprve_usr_nm', cellStyle: { 'text-align': 'left' }, cellClass: 'pm-grid-number-cell', width: 150, sortable: true, filter: true },
          { headerName: 'Created On', field: 'i_ts', cellStyle: { 'text-align': 'left' }, cellClass: 'pm-grid-number-cell', width: 130, sortable: true, filter: true },
          { headerName: 'Packages Count', field: 'pckg_ct', cellStyle: { 'text-align': 'left' }, cellClass: 'pm-grid-number-cell', width: 140, sortable: true, filter: true },
          { headerName: 'Base Packages Count', field: 'bsepckg_ct', cellStyle: { 'text-align': 'left' }, cellClass: 'pm-grid-number-cell', width: 160, 
          sortable: true, filter: true },
          { headerName: 'AddOn Packages Count', field: 'addpckg_ct', cellStyle: { 'text-align': 'left' }, cellClass: 'pm-grid-number-cell', width: 160, 
          sortable: true, filter: true },
          { headerName: 'Agents', field: 'agnt_cds', cellStyle: { 'text-align': 'left' }, cellClass: 'pm-grid-number-cell', width: 130, sortable: true, filter: true},
        ];
      }
    });

  }
  packagesandTmplate(data): any {
    console.log(data.selectedRowsData);
    this.subTablesData = data.selectedRowsData[0];
    console.log(this.subTablesData);
  }
  onCellClick(e): any{
    console.log('*********');
    console.log(e);
    const rte = `package/agreement/details/${e.data.pckge_agrmt_id}`;
    this.crdsrv.get(rte).subscribe((res) => {
      console.log(res['data']);
      this.agrmntDtls = res['data'];
      console.log(this.agrmntDtls);
      let index = 0;
      for (let k = 0; k < this.agrmntDtls.length; k++) {
        index = index + 1;
        this.agrmntDtls[k].sno = index;
      }
    });
  }
  onRowExpanding(e){
    e.component.collapseAll(-1);
  }
  onScdCellClick(i): any{
    console.log('&&&&&&&&&&&&&&&&&&&&&&&');
    console.log(i.data);
    const data = {
      tmple_id : i.data.tmple_id,
      pckge_id: i.data.pckge_id,
      packge_agrmnt_id: i.data.pckge_agrmt_id
    };
    const rte = `package/agreement/partners/details`;
    this.crdsrv.create(data, rte).subscribe((res) => {
      console.log(res['data']);
      this.partnersDtls = res['data'];
      console.log(this.partnersDtls);
      let index = 0;
      for (let k = 0; k < this.partnersDtls.length; k++) {
        index = index + 1;
        this.partnersDtls[k].sno = index;
      }
    });
  }

}
