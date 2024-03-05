import { Component, OnInit, Inject } from '@angular/core';
import { CrudService } from 'app/main/apps/crud.service';
import { DsSidebarService } from '@glits/components/sidebar/sidebar.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition, MatDialog } from '@angular/material';
import { RolesForm } from './roles.model';
import { DeleteDialogComponent } from 'app/main/shared/components/delete-dialog/delete-dialog.component';



@Component({
  selector: 'app-roles-permessions',
  templateUrl: './roles-permessions.component.html',
  styleUrls: ['./roles-permessions.component.scss']
})
export class RolesPermessionsComponent implements OnInit {
  roledta: any;
  splpermdta: any;
  columnDefs = [];
  getRowHeight;
  rlepermdta: any;
  RolesForm: FormGroup;
  sideBarHeader: string;
  editClicked: boolean = false;
  updateData: any;
  deleteRle: boolean;
  hdrDta:any;
  usrdtls;
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  confirmDialogRef: MatDialogRef<DeleteDialogComponent>;
  dialogRef: any;
  permismdl: boolean;
  finalData = [{ standard: [], special: [] }];
  rowSelection;
  err_msg: string;
  chekdta: any;
  checkid: any;
  loader:boolean
  permissions;
  /**
      * @param {DsSidebarService} _dsSidebarService
      */

     getHeaderDtls = function() { return {"title":"Roles And Permessions","icon":"file_copy"}}
  mainMessage: string;

  constructor(public crdsrv: CrudService, private _dsSidebarService: DsSidebarService, public snackBar: MatSnackBar, public dialog: MatDialog) {
    this.getRolesWithPerm();
    this.getRowHeight = function (params) {
      if (params.node.level === 0) {
        return 40;
      } else {
        return 25;
      }
    };
    this.permissions = { "slct_in": 1, "insrt_in": 1, "updt_in": 1, "dlte_in": 1, "exprt_in": 1 };
  }


  ngOnInit() {


    this.RolesForm = new FormGroup({
      rle_nm: new FormControl('', Validators.compose([
        this.validUsername,
        Validators.required,
        this.cannotContainSpace
      ])),
      rle_dscn_nm: new FormControl('', Validators.required),
    });
    this.getUsrPermissions();
  }
  cannotContainSpace = (control: FormControl)  => {
    if((control.value as string).indexOf(' ') >= 0){
        return {cannotContainSpace: true}
    }

    return null;
}

  validUsername = (fc: FormControl) => { 
    if(!this.roledta){

    }
   else if(this.roledta.length>1){
     if(!this.checkid){
      for(var i=0; i<this.roledta.length; i++){
        if (fc.value.toLowerCase() === this.roledta[i].rle_nm.toLowerCase() || fc.value.toLowerCase() === this.roledta[i].rle_nm.toLowerCase()+' ') {
          return ({ validUsername: true });
        } else {
        }
      }
     }
     else{
      for(var i=0; i<this.roledta.length; i++){
        if ((fc.value.toLowerCase() === this.roledta[i].rle_nm.toLowerCase() || fc.value.toLowerCase() === this.roledta[i].rle_nm.toLowerCase()+' ')&&(this.checkid.rle_id==this.roledta[i].rle_id)) {
          return null;
        } else if (fc.value.toLowerCase() === this.roledta[i].rle_nm.toLowerCase() || fc.value.toLowerCase() === this.roledta[i].rle_nm.toLowerCase()+' '){
          return ({ validUsername: true });
        }
      }

     }

    }
  }

  account_validation_messages = {
    'rolename': [
      { type: 'required', message: 'Rolename is required' },
      { type: 'validUsername', message: 'Your Rolename has already been taken' },
      { type: 'cannotContainSpace', message: 'Please enter valid data spaces are not requried' }
    ]
  }


  user: any = {
    permissions: { 'slct_in': 0, 'insrt_in': 0, 'updt_in': 0, 'dlte_in': 0, 'exprt_in': 0 },
    'perm_url': 'user/permissions/Roles Creation'
  }
  getUsrPermissions(): any {
    this.mainMessage = null;
    this.crdsrv.get(this.user.perm_url).subscribe((res) => {
      console.log(res['data']);
     if (res['status'] == 200) {
        if (res['data'].length)
        {this.user.permissions = res['data'][0]; }
        if (this.user.permissions.slct_in === 1) {
          this.getRolesWithPerm();
        } else
          {this.mainMessage = 'You do not have permissions to do this operation. Please contact Administrator to get permissions.'; }
      }
    });
  }

  getRolesWithPerm() {
    this.loader=true;
    const rte = `user/roles`;
    this.crdsrv.get(rte).subscribe((res) => {
      if(res['status']==200)
      {
        this.loader=false;
        this.roledta = res['data'];
        this.columnDefs = [
          { headerName: 'S.No', field: 'sno', alignment: 'center', cellClass: "pm-grid-number-cell", width: 60, height: 40 },
          { headerName: 'Role Name', field: 'rle_nm', alignment: 'left', cellClass: "pm-grid-number-cell", width: 200, height: 40, filter: true },
          { headerName: 'Role Description', field: 'rle_dscn_nm', alignment: 'left', cellClass: "pm-grid-number-cell", width: 200, height: 40, filter: true },
          { headerName: 'Created User', field: 'name', alignment: 'left', cellClass: "pm-grid-number-cell", width: 200, height: 40, filter: true },
          { headerName: 'Created Date', field: 'dt_frmt', alignment: 'center', cellClass: "pm-grid-number-cell", width: 200, height: 40 },
          { headerName: 'No.of Role Users', field: 'ttl_usr_cnt', alignment: 'center', cellClass: "pm-grid-number-cell", width: 60, height: 40 },
          // {
          //   headerName: 'Edit',
          //   cellStyle: { textAlign: 'center' },
          //   width: 100,
          //   cellRenderer: function (param) {
          //     const eDiv = document.createElement('div');
          //     eDiv.innerHTML = `<button class="btn-simple editBtn-color edtBtnstls" >
          //     <mat-icon class="s-20 mat-icon material-icons">edit</mat-icon>
          //     </button>`;
          //     const eButton = eDiv.querySelectorAll('.btn-simple')[0];
          //     eButton.addEventListener('click', function (param) {
          //       // console.log(param);
          //     });
          //     return eDiv;
          //   },
          // }, {
          //   headerName: 'Edit Permessions',
          //   cellStyle: { textAlign: 'center' },
          //   width: 140,
          //   cellRenderer: function (param) {
          //     const eDiv = document.createElement('div');
          //     eDiv.innerHTML = `<button class="btn-simple editBtn-color edtBtnstls" >
          //   <img src="assets/images/edit (1).png" style="width: 16px;padding-top: 5%;">
          //  </button> `;
          //     const eButton = eDiv.querySelectorAll('.btn-simple')[0];
          //     eButton.addEventListener('click', function (param) {
          //     });
          //     return eDiv;
          //   },
          // }, {
          //   headerName: 'Delete',
          //   cellStyle: { textAlign: 'center' },
          //   width: 100,
          //   cellRenderer: function (param) {
          //     const eDiv = document.createElement('div');
          //     eDiv.innerHTML = `<button class="btn-simple dlteBtnStyls" >
          //     <mat-icon  class="s-20 mat-icon material-icons deleteBtn-icon-color" >delete</mat-icon>
          //     </button>`;
          //     const eButton = eDiv.querySelectorAll('.btn-simple')[0];
          //     eButton.addEventListener('click', function (param) {
          //       // console.log(param);
          //     });
          //     return eDiv;
          //   },
          // }
        ];
      }
      
    })
    this.rowSelection = "single";
  }

  getRolePerms(rleid) {
    const rte = `user/permessions/${rleid}`;
    this.crdsrv.get(rte).subscribe((res) => {
      this.rlepermdta = res['data'];
    })
  }
  getRoleSpclPerms(rleid) {
    const rte = `user/SpclPermessions/${rleid}`;
    this.crdsrv.get(rte).subscribe((res) => {
      this.splpermdta = res['data'];
    })
  }
  saveRole() {
    if (this.editClicked == false) {
      this.newentry();
    } else if (this.deleteRle == true) {
      this.delete(this.updateData);
    } else {
      this.update(this.updateData);
    }
  }

  opensideBar(key, rledta) {

    if (rledta) {
      this.sideBarHeader = 'Edit';
      this.editClicked = true;
      this.updateData = rledta;
      this.RolesForm.get('rle_nm').setValue(rledta.rle_nm);
      this.RolesForm.get('rle_dscn_nm').setValue(rledta.rle_dscn_nm);


    } else {
      this.checkid='';
      this.sideBarHeader = 'Add New';
      this.editClicked = false;
      this.deleteRle = false;
      this.permismdl = false;
      this.RolesForm.get('rle_nm').setValue('');
      this.RolesForm.get('rle_dscn_nm').setValue('');
    }
    this._dsSidebarService.getSidebar(key).toggleOpen();
  }
  newentry() {
    let rte = "user/role";
    this.usrdtls = JSON.parse(localStorage.getItem('usrDtls'));
    let data = {
      rle_nm: this.RolesForm.value.rle_nm,
      rle_dscn_nm: this.RolesForm.value.rle_dscn_nm,
      crte_usr_id: this.usrdtls.mrcht_id
    };
    this.crdsrv.create(data, rte).subscribe((res) => {
      if (res['status'] == 200) {
        this.snackBar.open("Sucessfully Added", '', {
          duration: 2000,
          panelClass: ['blue-snackbar'],
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
        this.getRolesWithPerm();
        this.getRolePerms(res['data'].insertId);
        this.getRoleSpclPerms(res['data'].insertId)
        // this.opensideBar('addFormPanel', null);
        this.permismdl = true;

      }
    }, (error) => {
    });
  }
  onCellClick(event) {
    // console.log(event.cellElement.innerText);
    if (event.cellElement.innerText == 'Edit') {
      // this.editentry(event.data);
      this.checkid = event.data
      this.deleteRle = false;
      this.permismdl = false;
      this.opensideBar('addFormPanel', event.data);

    } else if (event.cellElement.innerText == 'Delete') {
      this.deleteRle = true;
      this.permismdl = false;
      this.opensideBar('addFormPanel', event.data);
    }
    else if (event.cellElement.innerText == 'Edit Permissions') {
      // console.log("ygkkhskd")
      this.getRolePerms(event['data']['rle_id'])
      this.getRoleSpclPerms(event['data']['rle_id'])
      this.permismdl = true;
      this.opensideBar('addFormPanel', event.data);
    }
  }

  delete(data) {

    let orgDelRte = `user/role/${data.rle_id}`;
    this.crdsrv.delete(orgDelRte).subscribe((res) => {

      this.confirmDialogRef = this.dialog.open(DeleteDialogComponent, {
        width: '25%',
        panelClass: 'my-class',
        data: { message: 'Are you sure deleting this item ?', id: data.rle_id, nm: data.rle_nm, entityname: 'Role', flag: false, rte: `user/role/${data.rle_id}` }
      });

      this.confirmDialogRef.afterClosed().subscribe((response) => {
        if (response == undefined) { }
        else if (response.status == 200)
          this.getRolesWithPerm();
        this.opensideBar('addFormPanel', null);
      })
    })
  }
  update(data) {
    let rte = `user/role/${data.rle_id}`;
    this.usrdtls = JSON.parse(localStorage.getItem('usrDtls'));

    let Roledata = {
      rle_nm: this.RolesForm.value.rle_nm,
      rle_dscn_nm: this.RolesForm.value.rle_dscn_nm,
      updte_usr_id: this.usrdtls.mrcht_id
    };
    this.crdsrv.update(Roledata, rte).subscribe((res) => {
      if (res['status'] == 200) {
        this.snackBar.open("Sucessfully Added", '', {
          duration: 3000,
          panelClass: ['blue-snackbar'],
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
        this.getRolesWithPerm();
        this.opensideBar('addFormPanel', null);
      }
    }, (error) => {
    });
  }

  createPermson() {
    this.finalData[0].standard = this.rlepermdta;
    this.finalData[0].special = this.splpermdta;
    const rte = `user/permessions`;
    this.crdsrv.create(this.finalData, rte).subscribe((res) => {
      if (res['status'] == 200) {
        this.snackBar.open("Sucessfully Added", '', {
          duration: 2000,
          panelClass: ['blue-snackbar'],
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
        this.opensideBar('addFormPanel', null);
      }
    }, (error) => {
    });

  }
  onToolbarPreparing(e) {
    // console.log(e);
    e.toolbarOptions.items.unshift({
      location: 'after',
      widget: 'dxButton',
      options: {
        icon: 'plus',
        text: 'Add New Role',
        onClick: this.opensideBar.bind(this, 'addFormPanel', null),
        bindingOptions: {
          'disabled': 'isEmailButtonDisabled'
        }
      }
    });
  }

}




@Component({
  selector: 'RolesComponent-dialog',
  templateUrl: 'RolesComponent-dialog.html',
})
export class RolescomponentDialog {
  action: string;
  location: RolesForm;
  FormLoctn: FormGroup;
  dialogTitle: string;
  merchant;
  /**
 * Constructor
 * 
 * @param {MatDialogRef<RolescomponentDialog>} matDialogRef
 * @param _data
 * @param {FormBuilder} _formBuilder
 */

  constructor(public matDialogRef: MatDialogRef<RolescomponentDialog>,
    @Inject(MAT_DIALOG_DATA) private _data: any,
    private _formBuilder: FormBuilder, public crdsrv: CrudService) {
    this.action = _data.action
    if (this.action === 'edit') {
      this.dialogTitle = 'Edit Organization';
      this.location = _data.location;
    }
    else {
      this.dialogTitle = 'New Organization';
      this.location = new RolesForm({});
    }
  }
  /**
 * Create contact form
 *
 * @returns {FormGroup}
 */


}
