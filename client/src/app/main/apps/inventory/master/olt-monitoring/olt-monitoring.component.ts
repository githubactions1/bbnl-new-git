import { Component, OnInit } from '@angular/core';
import { CrudService } from '../../../crud.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DsSidebarService } from '@glits/components/sidebar/sidebar.service';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition, MatSnackBar, MatDialog } from '@angular/material';
import { DeleteDialogComponent } from 'app/main/shared/components/delete-dialog/delete-dialog.component';


@Component({
  selector: 'app-olt-monitoring',
  templateUrl: './olt-monitoring.component.html',
  styleUrls: ['./olt-monitoring.component.scss']
})
export class OltMonitoringComponent implements OnInit {

  columnDefs = [];
  rowData = [];
  // spnrCtrl = false;
  permissions;
  formOlt: FormGroup;
  confirmDialogRef: MatDialogRef<DeleteDialogComponent>;
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  dstlst: any;
  mnadlLst: any;
  dstrctsLst: any[];
  leftsidebarHdng: string;
  substnlst: any;
  substnlsttype: any;
  deleteEmplye = false;
  oltLoader = false;
  // editClicked: boolean = false;
  olt_id: any;
  editind;
  dst_id: any;
  selectedDsrt: any;
  selectedMndl: any;
  loader: boolean;
  shwLdr: boolean;
  // tslint:disable-next-line:typedef
  getHeaderDtls = function () { return { 'title': 'Optical Line Terminal Monitoring (OLT)', 'icon': 'person' }; };
  oltport: any;
  shwPermMsg: string;



  constructor(public crdsrv: CrudService, private _dsSidebarService: DsSidebarService, private _snackBar: MatSnackBar, public dialog: MatDialog) {
    // this.permissions = { 'slct_in': 1, 'insrt_in': 0, 'updt_in': 1, 'dlte_in': 1, 'exprt_in': 1 };
    // const permTxt = 'OLT Addition';
    // const prmeRte = `user/permissions/${permTxt}`;
    // this.crdsrv.get(prmeRte).subscribe((res) => {
    //   // console.log(res['data'][0]);
    //   this.permissions = res['data'][0];
    // });
  }

  ngOnInit(): any {
    this.getolt();
    this.formOlt = new FormGroup({
      dstrt_id: new FormControl('', Validators.required),
      mndl_id: new FormControl('', Validators.required),
      sbstn_id: new FormControl('', Validators.required),
      olt_nm: new FormControl('', Validators.required),
      olt_typ: new FormControl('', Validators.required),
      olt_srl_no: new FormControl('', Validators.required),
      olt_ip_adrs: new FormControl('', Validators.required),
      olt_acces_cd: new FormControl('', Validators.required),
      lbl_nm: new FormControl('', Validators.required),
      nde_nm: new FormControl('', Validators.required),
      olt_prt: new FormControl('', Validators.required),
    });
    this.getDstrct(0);
    this.getSubstationsType();
    this.getOltports();
  }
  onToolbarPreparing(e) {
    // console.log(e);
    e.toolbarOptions.items.unshift({
      location: 'after',
      widget: 'dxButton',
      options: {
        icon: 'plus',
        text: 'Pull OLT Details',
        onClick: this.onOLTClick.bind(this),
        // this.onCellClick( this.selectedUsers),
        bindingOptions: {
          'disabled': 'isEmailButtonDisabled'
        }
      }
    });
  
  }
  onCellClick(event) {
    console.log(event)
    if (event.cellElement.innerText == 'Edit') {
      this.opensideBar('addFormPanel', 'edit', event.data);
    } else if (event.cellElement.innerText == 'Delete') {
      console.log('delete')
      this.opensideBar('addFormPanel', 'delete', event.data);
    }
  }
  onOLTClick(){
    this.loader = true;
    const rte = `olt/pull/oltMntrngdtls`;
    this.crdsrv.get(rte).subscribe((res) => {
      console.log(res['data']);
      if (res['status'] == 200) {
        this._snackBar.open('Sucessfully Updated', '', {
          duration: 2000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
        this.loader = false;
        this.getolt();
      }
      //   if (this.editClicked == true) {
      //     this.dstrt_id = this.editData.dstrt_id;
      //   }
    });
  }
  getDstrct(ste_id) {
    //console.log(ste_id);
    this.dstrctsLst = [];
    // this.ste_id = this.agntFormGroup.get('officeAddress.ofce_State').value;
    const rte = `user/getDstrcts/${ste_id}`;
    this.crdsrv.get(rte).subscribe((res) => {
      console.log(res['data']);
      if (res['status'] == 200) {
        this.dstlst = res['data'];
      }
      //   if (this.editClicked == true) {
      //     this.dstrt_id = this.editData.dstrt_id;
      //   }
    });
  }
  getMndlLst(dstrt_id) {
    //console.log(dstrt_id);
    this.dst_id = dstrt_id
    const rte = `user/getMndls/${dstrt_id}`;
    this.crdsrv.get(rte).subscribe((res) => {
      console.log(res['data']);
      if (res['status'] == 200) {
        this.mnadlLst = res['data'];
      }
      //   if (this.editClicked == true) {
      //     this.dstrt_id = this.editData.dstrt_id;
      //   }
    });
  }
  getSubstations(mndl_id) {
    console.log(this.dst_id);
    // return
    const rte = `olt/getSubstations/${this.dst_id}/${mndl_id}`;
    this.crdsrv.get(rte).subscribe((res) => {
      console.log(res['data']);
      if (res['status'] == 200) {
        this.substnlst = res['data'];
      }
      //   if (this.editClicked == true) {
      //     this.dstrt_id = this.editData.dstrt_id;
      //   }
    });
  }
  getSubstationsType() {
    //console.log(dstrt_id);

    const rte = `olt/getSubstationsType`;
    this.crdsrv.get(rte).subscribe((res) => {
      console.log(res['data']);
      if (res['status'] == 200) {
        this.substnlsttype = res['data'];
      }
      //   if (this.editClicked == true) {
      //     this.dstrt_id = this.editData.dstrt_id;
      //   }
    });
  }
  getOltports() {
    this.oltport = [{ port_no: 8 }, { port_no: 16 }];
  }
  opensideBar(key, value, data) {
    console.log(value)
    console.log(data)

    if (value == 'edit') {
      this.editind = 0;
      this.olt_id = data.olt_id;
      // this.getDstrct(0);
      this.getMndlLst(data.dstrct_id);
      this.getSubstations(data.mndl_id)
      this.deleteEmplye = false;
      this.leftsidebarHdng = 'Edit OLT';
      this.formOlt.get('dstrt_id').setValue(data.dstrct_id);
      this.formOlt.get('mndl_id').setValue(data.mndl_id);
      this.formOlt.get('sbstn_id').setValue(data.sbstn_id);
      this.formOlt.get('olt_nm').setValue(data.olt_nm);
      this.formOlt.get('olt_typ').setValue(data.sbstn_type_id);
      this.formOlt.get('olt_srl_no').setValue(data.olt_srl_nu);
      this.formOlt.get('olt_ip_adrs').setValue(data.olt_ip_addr_tx);
      this.formOlt.get('olt_acces_cd').setValue(data.olt_acs_nde_id);
      this.formOlt.get('lbl_nm').setValue(data.olt_lble_nu);
      this.formOlt.get('nde_nm').setValue(data.olt_nde_nu);
      this.formOlt.get('olt_prt').setValue(data.olt_prt_ct);
      // this.editClicked == true;
    } 
    // else if (value == 'new') {
    //   this.editind = 1;
    //   this.deleteEmplye = false;
    //   // this.editClicked == false;
    //   this.leftsidebarHdng = 'Add New Olt';
    //   // this._fuseSidebarService.getSidebar(key).toggleOpen();
    //   this.formOlt.get('dstrt_id').setValue('');
    //   this.formOlt.get('mndl_id').setValue('');
    //   this.formOlt.get('sbstn_id').setValue('');
    //   this.formOlt.get('olt_nm').setValue('');
    //   this.formOlt.get('olt_typ').setValue('');
    //   this.formOlt.get('olt_srl_no').setValue('');
    //   this.formOlt.get('olt_ip_adrs').setValue('');
    //   this.formOlt.get('olt_acces_cd').setValue('');
    //   this.formOlt.get('lbl_nm').setValue('');
    //   this.formOlt.get('nde_nm').setValue('');
    //   this.formOlt.get('olt_prt').setValue('');
    // } 
    else if (value == 'delete') {
      // this.editClicked == false;
      this.olt_id = data.olt_id;
      this.deleteEmplye = true;
      console.log(this.deleteEmplye);
      this.leftsidebarHdng = 'Delete Olt';
      this.getDstrct(0);
      this.getMndlLst(data.dstrct_id);
      this.getSubstations(data.mndl_id)
      this.formOlt.get('dstrt_id').setValue(data.dstrct_id);
      this.formOlt.get('mndl_id').setValue(data.mndl_id);
      this.formOlt.get('sbstn_id').setValue(data.sbstn_id);
      this.formOlt.get('olt_nm').setValue(data.olt_nm);
      this.formOlt.get('olt_typ').setValue(data.sbstn_type_id);
      this.formOlt.get('olt_srl_no').setValue(data.olt_srl_nu);
      this.formOlt.get('olt_ip_adrs').setValue(data.olt_ip_addr_tx);
      this.formOlt.get('olt_acces_cd').setValue(data.olt_acs_nde_id);
      this.formOlt.get('lbl_nm').setValue(data.olt_lble_nu);
      this.formOlt.get('nde_nm').setValue(data.olt_nde_nu);
      this.formOlt.get('olt_prt').setValue(data.olt_prt_ct);
    }
    this._dsSidebarService.getSidebar(key).toggleOpen();
  }

  getolt(): any {
    this.loader = true;
    let rte = `olt/olt/monitoring`;
    this.crdsrv.get(rte).subscribe((res) => {
      if (res['status'] == 200) {
        this.loader = false;
        console.log(res['data']);
        if (res['perm']){
          this.permissions = res['perm'][0];
        } else{
          this.loader = false;
          this.shwPermMsg = 'You do not have permissions to do this operation. Please contact Administrator to get permissions.';
        }

        this.rowData = res['data'];
        this.columnDefs = [
          { headerName: 'Sno', field: 'sno', cellClass: 'pm-grid-number-cell', width: 50, filter: false },
          { headerName: 'OLT Name', field: 'olt_nm', cellClass: 'pm-grid-number-cell', width: 265, filter: true, },
          { headerName: 'OLT Ip Address', field: 'olt_ip_addr_tx', cellClass: 'pm-grid-number-cell', width: 125, filter: true, },
          // { headerName: 'Installation Date', field: 'instl_dt', cellClass: 'pm-grid-number-cell', width: 125, filter: true, },
          // { headerName: 'OLT Status', field: 'sts_nm',  cellClass: 'pm-grid-number-cell', width: 150,filter: true, },
          // { headerName: 'Status Change Timestamp', field: 'oprt_sts_chnge_ts', cellClass: 'pm-grid-number-cell', width: 125, filter: true, },
          // { headerName: 'Operational State', field: 'ste_nm', cellClass: 'pm-grid-number-cell', width: 125, filter: true, },
          // { headerName: 'State Change Timestamp', field: 'oprtnl_ste_chnge_ts', cellClass: 'pm-grid-number-cell', width: 125, filter: true, },
          // { headerName: 'Last Refresh Date', field: 'last_refresh_date', algnmnt: 'center', cellClass: 'pm-grid-number-cell', width: 150 },
          // { headerName: 'Software Version', field: 'sftwe_vrsn_tx', cellClass: 'pm-grid-number-cell', width: 125, filter: true, },
          // { headerName: 'Hardware Version', field: 'hrdwe_vrsn_tx', cellClass: 'pm-grid-number-cell', width: 125, filter: true, },
          // { headerName: 'Site Name', field: 'site_nm', algnmnt: 'center', cellClass: 'pm-grid-number-cell', width: 150 },
          // { headerName: 'Management Domain Name', field: 'mngmt_dmn_nm', algnmnt: 'center', cellClass: 'pm-grid-number-cell', width: 200, filter: true, },
          // { headerName: 'Equipment ID', field: 'eqpmt_id', cellClass: 'pm-grid-number-cell', width: 125, filter: true, },
          // { headerName: 'OLT Type Name', field: 'olt_type_nm', cellClass: 'pm-grid-number-cell', width: 125, filter: true, },
          { headerName: 'OLT Serial No', field: 'olt_srl_nu', algnmnt: 'center', cellClass: 'pm-grid-number-cell', width: 150 },
          { headerName: 'OLT Access Node', field: 'olt_acs_nde_id', algnmnt: 'center', cellClass: 'pm-grid-number-cell', width: 170, filter: true, },
          { headerName: 'District', field: 'dstrt_nm', cellClass: 'pm-grid-number-cell', width: 125, filter: true, },
          { headerName: 'Mandal', field: 'mndl_nm', cellClass: 'pm-grid-number-cell', width: 125, filter: true, },
          { headerName: 'Substation Name', field: 'sbstn_nm', cellClass: 'pm-grid-number-cell', width: 200, filter: true, },
          { headerName: 'Substation Type Name', field: 'sbstn_type_nm', cellClass: 'pm-grid-number-cell', width: 200 },
          { headerName: 'OLT Lable Number', field: 'olt_lble_nu', algnmnt: 'center', cellClass: 'pm-grid-number-cell', width: 125 },
          { headerName: 'OlT Node Number', field: 'olt_nde_nu', algnmnt: 'center', cellClass: 'pm-grid-number-cell', width: 80 },
          { headerName: 'OLT Port Count', field: 'olt_prt_ct', algnmnt: 'center', cellClass: 'pm-grid-number-cell', width: 80 },
        ];
      }


    });
  }

  saveOlt() {
    // console.log(this.editClicked);
    if (this.editind == 0) {
      // console.log('update')
      console.log(this.formOlt.value)
      if (this.formOlt.value.dstrt_id != '' && this.formOlt.value.mndl_id != '' && this.formOlt.value.sbstn_id != '' && this.formOlt.value.olt_nm != '' && this.formOlt.value.olt_typ != '' && this.formOlt.value.olt_srl_no != '' && this.formOlt.value.olt_ip_adrs != '' && this.formOlt.value.olt_acces_cd != '' && this.formOlt.value.lbl_nm != '' && this.formOlt.value.nde_nm != null && this.formOlt.value.olt_prt != null) {
        const rte = `olt/update/oltMntrngdtls/${this.olt_id}`;
        // return
        this.crdsrv.create(this.formOlt.value, rte).subscribe((res) => {
          console.log(res['data']);
          if (res['status'] == 200) {
            this._snackBar.open('Sucessfully Updated', '', {
              duration: 2000,
              horizontalPosition: this.horizontalPosition,
              verticalPosition: this.verticalPosition,
            });
            this.getolt();
            this.opensideBar('addFormPanel', null, null);
          }

        });
      } else {
        this._snackBar.open('Please Fill Mandatory Fields', '', {
          duration: 2000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
      }


    } 
    // else {
    //   // console.log('insert')
    //   let portarray = [];
    //   if (this.formOlt.value.dstrt_id != '' && this.formOlt.value.mndl_id != '' && this.formOlt.value.sbstn_id != '' && this.formOlt.value.olt_nm != ''
    //     && this.formOlt.value.olt_typ != '' && this.formOlt.value.olt_srl_no != '' && this.formOlt.value.olt_ip_adrs != '' && this.formOlt.value.olt_acces_cd != ''
    //     && this.formOlt.value.lbl_nm != '' && this.formOlt.value.nde_nm != '' && this.formOlt.value.olt_prt != '') {
    //     for (let i = 1; i <= this.formOlt.value.olt_prt; i++) {
    //       portarray.push({ portno: i })
    //     }
    //     this.shwLdr = true;
    //     console.log(portarray)
    //     const rte = `olt/insert/oltMntrngdtls`;
    //     this.formOlt.value['portarray'] = portarray;
    //     console.log(this.formOlt.value['portarray'])
    //     console.log(this.formOlt.value)
    //     // return
    //     this.crdsrv.create(this.formOlt.value, rte).subscribe((res) => {
    //       console.log(res['data']);
    //       this.shwLdr = false;
    //       if (res['status'] == 200) {
    //         this._snackBar.open('Sucessfully Inserted', '', {
    //           duration: 2000,
    //           horizontalPosition: this.horizontalPosition,
    //           verticalPosition: this.verticalPosition,
    //         });
    //         this.getolt();
    //         this.opensideBar('addFormPanel', null, null);
    //       }

    //     });
    //   } else {
    //     this._snackBar.open('Please Fill Mandatory Fields', '', {
    //       duration: 2000,
    //       horizontalPosition: this.horizontalPosition,
    //       verticalPosition: this.verticalPosition,
    //     });
    //   }

    // }
    console.log(this.formOlt.value);
  }
  onCellenableClick(event){
    console.log(event)
    this.shwLdr = true;
    const rte = `olt/active/oltMntrngDtl/${this.olt_id}`;
    // return
    this.crdsrv.create(this.formOlt.value, rte).subscribe((res) => {
      console.log(res['data']);
      if (res['status'] == 200) {
        this._snackBar.open('Sucessfully Updated', '', {
          duration: 2000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
        this.shwLdr = false;
        this.getolt();
        this.opensideBar('addFormPanel', null, null);
      }

    });
  }
  delEmployee() {
    console.log(this.olt_id);

    this.confirmDialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '25%',
      panelClass: 'my-class',
      data: { message: 'Are you sure Disable this OLT ?', id: this.olt_id, entityname: 'OLT', flag: false, rte: `olt/delete/oltMntrngDtl/${this.olt_id}` }
    });

    this.confirmDialogRef.afterClosed().subscribe((response) => {
      console.log(response)
      if (response == undefined) { }
      else if (response.status == 200) { this.getolt(); this.opensideBar('addFormPanel', null, null); }
    });
  }

}

