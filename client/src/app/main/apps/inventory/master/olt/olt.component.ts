import { Component, OnInit } from '@angular/core';
import { CrudService } from '../../../crud.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DsSidebarService } from '@glits/components/sidebar/sidebar.service';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition, MatSnackBar, MatDialog } from '@angular/material';
import { DeleteDialogComponent } from 'app/main/shared/components/delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-olt',
  templateUrl: './olt.component.html',
  styleUrls: ['./olt.component.scss']
})
export class OltComponent implements OnInit {
  columnDefs = [];
  rowData = [];
  // spnrCtrl = false;
  permissions;
  oltSbstnpermissions:any;
  formOlt: FormGroup;
  formsbstn : FormGroup;
  confirmDialogRef: MatDialogRef<DeleteDialogComponent>;
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  dstlst: any;
  mnadlLst: any;
  vlgLst : any;
  dstrctsLst: any[];
  leftsidebarHdng: string;
  substnlst: any;
  substnlsttype: any;
  deleteEmplye = false;
  oltLoader = false;
  // editClicked: boolean = false;
  olt_id: any;
  ptdasanval: any;
  apsfBbnl: any;
  editind;
  dst_id: any;
  selectedDsrt: any;
  selectedMndl: any;
  loader: boolean;
  shwLdr: boolean;
  // tslint:disable-next-line:typedef
  getHeaderDtls = function () { return { 'title': 'Optical Line Terminal (OLT)', 'icon': 'person' }; };
  oltport: any;
  apsflBbnl: any;
  sbstn_apsfl_Bbnl : any;
  ptdasan: any;
  shwinptdata : boolean=false;
  shwPermMsg: string;
  vndr_id_updt:any;
  selectedvlg:any;
  apsfl_bbnl_updt;



  constructor(public crdsrv: CrudService, private _dsSidebarService: DsSidebarService, private _snackBar: MatSnackBar, public dialog: MatDialog) {
    const permTxt = 'OLT Sbstn Addition';
    const prmeRte = `user/permissions/${permTxt}`;
    this.crdsrv.get(prmeRte).subscribe((res) => {
       console.log(res['data'][0]);
       console.log(res['data']);

       if(res['data']) {
         this.oltSbstnpermissions = res['data'][0];
       }
       //console.log(this.oltSbstnpermissions.insrt_in)
     });
  }

  ngOnInit(): any {
    this.getolt();
    let accsscde = /[0-9]{6}/;
    this.formOlt = new FormGroup({
      dstrt_id: new FormControl('', Validators.required),
      mndl_id: new FormControl('', Validators.required),
      sbstn_id: new FormControl('', Validators.required),
      olt_nm: new FormControl('', Validators.required),
      olt_typ: new FormControl('', Validators.required),
      olt_srl_no: new FormControl('', Validators.required),
      olt_ip_adrs: new FormControl('', Validators.required),
      olt_acces_cd: new FormControl('', [Validators.required,Validators.pattern(accsscde)]),
      lbl_nm: new FormControl('', Validators.required),
	  lat: new FormControl('', Validators.required),
      lang: new FormControl('', Validators.required),
      nde_nm: new FormControl('', Validators.required),
      olt_prt: new FormControl('', Validators.required),
      olt_crd:new FormControl('', Validators.required),
      vndr_id:new FormControl('', Validators.required),
      apsfl_bbnl:new FormControl('', Validators.required),
      gp_code:new FormControl('', Validators.required),
      lgd_code:new FormControl('', Validators.required),
    });
    this.formsbstn = new FormGroup({
      dstrt_id: new FormControl('', Validators.required),
      mndl_id: new FormControl('', Validators.required),
      vlg_id: new FormControl('', Validators.required),
      sbstn_nm: new FormControl('', Validators.required),
      apsfl_bbnl:new FormControl('', Validators.required),
    });
    this.getDstrct(0);
    this.getSubstationsType();
    this.getOltports();
    //this.getapsflBbnl();
    this.getOptdasan();
    this.Sbstnptdasan_updatevalue();
  }
  onToolbarPreparing(e) {
    // console.log(e);
    if(this.oltSbstnpermissions){
		if(this.oltSbstnpermissions.insrt_in == 1){
			e.toolbarOptions.items.unshift({
			  location: 'after',
			  widget: 'dxButton',
			  options: {
				icon: 'plus',
				text: 'Add OLT',
				onClick: this.opensideBar.bind(this, 'addFormPanel', 'new', null),
				// this.onCellClick( this.selectedUsers),
				bindingOptions: {
				  'disabled': 'isEmailButtonDisabled'
				}
			  }
			});
			e.toolbarOptions.items.unshift({
			  location: 'after',
			  widget: 'dxButton',
			  options: {
				icon: 'plus',
				text: 'Add Substation',
				onClick: this.opensideBar.bind(this, 'addSbstnFormPanel', 'newsbstn', null),
				// this.onCellClick( this.selectedUsers),
				bindingOptions: {
				  'disabled': 'isEmailButtonDisabled'
				}
			  }
			});
	    }
	}
  }
  onCellClick(event) {
    if (event.cellElement.innerText == 'Edit') {
      this.opensideBar('addFormPanel', 'edit', event.data);
    } else if (event.cellElement.innerText == 'Delete') {
      console.log('delete')
      this.opensideBar('addFormPanel', 'delete', event.data);
    }
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
  getvlg(dstrt_id,mndl_id){
    this.dst_id = dstrt_id
    const rte = `user/getVlgs/${mndl_id}/${dstrt_id}`;
    this.crdsrv.get(rte).subscribe((res) => {
      console.log(res['data']);
      if (res['status'] == 200) {
        this.vlgLst = res['data'];
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
  getapsflBbnl() {
    this.apsflBbnl = [{ "name": "BBNL" ,"value": 3 }];
  }
  getOptdasan() {
    this.ptdasan = [ { "name": "Dasan" ,"value": 1 }];
  }
  ptdasan_updatevalue(val){
    this.ptdasanval = val;
    if(val == 3){
      this.apsflBbnl = [ { "name": "APSFL" ,"value": 4 }];
    } else {
      this.apsflBbnl = [{ "name": "BBNL" ,"value": 3 }];
    }
  }
  Sbstnptdasan_updatevalue(){
    this.sbstn_apsfl_Bbnl = [{ "name": "BBNL" ,"value": 3 }];
  }
  apsfl_bbnl_updatevalue(val){
    this.apsfBbnl = val
    if(this.apsfBbnl == 3 && this.ptdasanval == 1){
      this.shwinptdata = true
    } else {
      this.shwinptdata = false
    }
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
      this.formOlt.get('olt_crd').setValue(data.crd_id);
      // this.editClicked == true;
    } else if (value == 'new') {
      this.editind = 1;
      this.deleteEmplye = false;
      // this.editClicked == false;
      this.leftsidebarHdng = 'Add New Olt';
      // this._fuseSidebarService.getSidebar(key).toggleOpen();
      this.formOlt.get('dstrt_id').setValue('');
      this.formOlt.get('mndl_id').setValue('');
      this.formOlt.get('sbstn_id').setValue('');
      this.formOlt.get('olt_nm').setValue('');
      this.formOlt.get('olt_typ').setValue('');
      this.formOlt.get('olt_srl_no').setValue('');
      this.formOlt.get('olt_ip_adrs').setValue('');
      this.formOlt.get('olt_acces_cd').setValue('');
      this.formOlt.get('lbl_nm').setValue('');
      this.formOlt.get('nde_nm').setValue('');
      this.formOlt.get('olt_prt').setValue('');
      this.formOlt.get('vndr_id').setValue('');
      this.formOlt.get('apsfl_bbnl').setValue('');
      this.formOlt.get('olt_crd').setValue('');
      this.shwinptdata = false;
    } else if (value == 'newsbstn') {
      this.editind = 1;
      this.deleteEmplye = false;
      // this.editClicked == false;
      this.leftsidebarHdng = 'Add New Substation';
      // this._fuseSidebarService.getSidebar(key).toggleOpen();
      this.formsbstn.get('dstrt_id').setValue('');
      this.formsbstn.get('mndl_id').setValue('');
      this.formsbstn.get('vlg_id').setValue('');
      this.formsbstn.get('sbstn_nm').setValue('');
      this.formsbstn.get('apsfl_bbnl').setValue('');
      this.shwinptdata = false;
    } else if (value == 'delete') {
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
    let rte = `olt/olts`;
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
          { headerName: 'OLT Serial No', field: 'olt_srl_nu', algnmnt: 'center', cellClass: 'pm-grid-number-cell', width: 150 },
          { headerName: 'OLT Access Node', field: 'olt_acs_nde_id', algnmnt: 'center', cellClass: 'pm-grid-number-cell', width: 200, filter: true, },
          { headerName: 'District', field: 'dstrt_nm', cellClass: 'pm-grid-number-cell', width: 125, filter: true, },
          { headerName: 'Mandal', field: 'mndl_nm', cellClass: 'pm-grid-number-cell', width: 200, filter: true, },
          { headerName: 'Substation Name', field: 'sbstn_nm', cellClass: 'pm-grid-number-cell', width: 265, filter: true, },
          { headerName: 'Substation Type Name', field: 'sbstn_type_nm', cellClass: 'pm-grid-number-cell', width: 265 },
          { headerName: 'OLT Lable Number', field: 'olt_lble_nu', algnmnt: 'center', cellClass: 'pm-grid-number-cell', width: 125 },
          { headerName: 'OlT Node Number', field: 'olt_nde_nu', algnmnt: 'center', cellClass: 'pm-grid-number-cell', width: 80 },
          { headerName: 'OlT Port Count', field: 'olt_prt_ct', algnmnt: 'center', cellClass: 'pm-grid-number-cell', width: 80 },
          // { headerName: 'Adhar Number', field: 'adhr_nu',  cellClass: 'pm-grid-number-cell', width: 150,filter: true, }
        ];
      }


    });
  }
  saveSbstn(){
    console.log("this.formsbstn",this.formsbstn);
    
    if (this.formsbstn.value.dstrt_id != '' && this.formsbstn.value.mndl_id != '' && this.formsbstn.value.vlg_id != '' && this.formsbstn.value.sbstn_nm != '' 
       && this.formsbstn.value.apsfl_bbnl != ''   ) {
        
        this.shwLdr = true;
        const rte = `olt/insert/sbstndtls`;
        console.log(this.formsbstn.value)
        // return
        this.crdsrv.create(this.formsbstn.value, rte).subscribe((res) => {
          console.log(res['data']);
          this.shwLdr = false;
          if (res['status'] == 200) {
            this._snackBar.open('Sucessfully Inserted', '', {
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
  saveOlt() {
    // console.log(this.editClicked);
    if (this.editind == 0) {
      // console.log('update')
      console.log(this.formOlt.value)
      if (this.formOlt.value.dstrt_id != '' && this.formOlt.value.mndl_id != '' && this.formOlt.value.sbstn_id != '' && this.formOlt.value.olt_nm != '' && this.formOlt.value.olt_typ != '' && this.formOlt.value.olt_srl_no != '' && this.formOlt.value.olt_ip_adrs != '' && this.formOlt.value.olt_acces_cd != '' && this.formOlt.value.lbl_nm != '' && this.formOlt.value.nde_nm != null && this.formOlt.value.olt_prt != null) {
        const rte = `olt/update/oltdtls/${this.olt_id}`;
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


    } else {
      // console.log('insert')
      let portarray = [];
      if (this.formOlt.value.dstrt_id != '' && this.formOlt.value.mndl_id != '' && this.formOlt.value.sbstn_id != '' && this.formOlt.value.olt_nm != ''
        && this.formOlt.value.olt_typ != '' && this.formOlt.value.olt_srl_no != '' && this.formOlt.value.olt_ip_adrs != '' && this.formOlt.value.olt_acces_cd != ''
        && this.formOlt.value.lbl_nm != '' && this.formOlt.value.nde_nm != '' && this.formOlt.value.olt_prt != '' && this.formOlt.value.apsfl_bbnl != ''
        && this.formOlt.get('olt_acces_cd').valid && this.formOlt.value.lat != '' && this.formOlt.value.lang != '') {
        for (let i = 1; i <= this.formOlt.value.olt_prt; i++) {
          portarray.push({ portno: i,
          crd_nu:this.formOlt.value.olt_crd })
        }
        this.shwLdr = true;
        console.log(portarray)
        const rte = `olt/insert/oltdtls`;
        this.formOlt.value['portarray'] = portarray;
        console.log(this.formOlt.value['portarray'])
        console.log(this.formOlt.value)
        // return
        this.crdsrv.create(this.formOlt.value, rte).subscribe((res) => {
          console.log(res['data']);
          this.shwLdr = false;
          if (res['status'] == 200) {
            this._snackBar.open('Sucessfully Inserted', '', {
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
    console.log(this.formOlt.value);
  }
  delEmployee() {
    console.log(this.olt_id);

    this.confirmDialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '25%',
      panelClass: 'my-class',
      data: { message: 'Are you sure deleting this OLT ?', id: this.olt_id, entityname: 'OLT', flag: false, rte: `olt/delete/olt/${this.olt_id}` }
    });

    this.confirmDialogRef.afterClosed().subscribe((response) => {
      console.log(response)
      if (response == undefined) { }
      else if (response.status == 200) { this.getolt(); this.opensideBar('addFormPanel', null, null); }
    });
  }

}
