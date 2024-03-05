import { Component, OnInit, Inject, ViewChild, ElementRef } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition, MatSnackBar, MatDialog } from '@angular/material';
// import { FormBuilder, FormGroup } from '@angular/forms';
import { CrudService } from '../../../crud.service';
// import { UserAccountForm } from './user-accounts.module';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { Router } from '@angular/router';
import { DeleteDialogComponent } from 'app/main/shared/components/delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-user-account',
  templateUrl: './user-account.component.html',
  styleUrls: ['./user-account.component.scss'],
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS, useValue: { displayDefaultIndicatorType: false }
  }]
})


export class UserAccountComponent implements OnInit {
  [x: string]: any;
  showFiller = false;
  showBckBtn = false;
  showTble = true;
  showStepr = false;
  showAddBtn = true;
  dsgnlst: any;
  userlist: any;
  dprtlst: any;
  data: any;
  hdrDta: any;
  pagination: boolean = true;
  paginationPageSize = 10;
  selectedValue;
  firstFormGroup: FormGroup;
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  confirmDialogRef: MatDialogRef<DeleteDialogComponent>;
  shownewpassword = false;
  showpassword = true;
  usernameequals = false;
  merchantuser_id: any;
  assignedPrfle = [];
  othrPrfles = [];
  selectedVal = 'assigned';
  editClicked = false;
  updateprofile = false;
  nextbutton = false;
  usrCtgryLst;
loader:boolean;
  // image upload

  @ViewChild('fileInput') el: ElementRef;
  // imageUrl: any = 'https://i.pinimg.com/236x/d6/27/d9/d627d9cda385317de4812a4f7bd922e9--man--iron-man.jpg';
  // imageUrl: any = 'assets/images/avatars/profile.jpg';
  editFile: boolean = true;
  removeUpload: boolean = false;
  permissions;
  getHeaderDtls = function () { return { "title": "Users", "icon": "people_outline" } }

  constructor(public dialog: MatDialog, private _formBuilder: FormBuilder, private crdsrv: CrudService, private _snackBar: MatSnackBar, private router: Router) {
    let rowHeight = 40;
    this.getRowHeight = function (params) {
      return rowHeight;
    };
    this.permissions = { "slct_in": 1, "insrt_in": 0, "updt_in": 1, "dlte_in": 1, "exprt_in": 1 };
  }


  // tslint:disable-next-line:member-ordering
  columnDefs = [
    { headerName: 'Sno', field: 'sno', width: 75, filter: false, search: false, alignment: 'center' },
    { headerName: 'First Name', field: 'fst_nm', alignment: 'left'},
    { headerName: 'Last Name', field: 'lst_nm', alignment: 'left' },
    { headerName: 'Last Name', field: 'mrcht_usr_nm', alignment: 'left' },
    { headerName: 'User Name', field: 'usr_ctgry_nm', alignment: 'left' },
    { headerName: 'Designation', field: 'dsgn_nm', visible: "false", alignment: 'left' },
    { headerName: 'Department', field: 'dprt_nm', width: 200, visible: "false", alignment: 'left' },
    { headerName: 'Organisation', field: 'orgn_nm', width: 150, visible: "false", alignment: 'left' },
    { headerName: 'Branch', field: 'otlt_nm', width: 150, visible: "false", alignment: 'left' },
    { headerName: 'Assigned Profile', field: 'mnu_prfle_nm', width: 150, visible: "false", alignment: 'left' },
    { headerName: 'Mobile Number', field: 'mbl_nu', width: 150, alignment: 'center' },
    { headerName: 'Email', field: 'eml_tx', alignment: 'left' },
    { headerName: 'Address', field: 'addrs_tx', width: 250, alignment: 'left' }
  ];

  // tslint:disable-next-line:member-ordering
  rowData = [];

  tbleStpr(frm_type) {
    this.frm_type = frm_type;
    if (this.frm_type == 'new') {
      this.firstFormGroup.reset();
      // this.rolenm.reset();
      this.showTble = false;
      this.showStepr = true;
      this.showAddBtn = false;
      this.showBckBtn = true;
    }
  }

  onToolbarPreparing(e) {
    // console.log(e);
    e.toolbarOptions.items.unshift({
      location: 'after',
      widget: 'dxButton',
      options: {
        icon: 'plus',
        text: 'Add User',
        onClick: this.tbleStpr.bind(this, 'new'),
        bindingOptions: {
          'disabled': 'isEmailButtonDisabled'
        }
      }
    });
  }

  onCellClick(event) {

    if (event.cellElement.innerText == 'Edit') {
      this.shownewpassword = true;
      this.showpassword = false;
      this.editClicked = true;
      this.showTble = false;
      this.showStepr = true;
      this.showAddBtn = false;
      this.showBckBtn = true;
      this.merchantuser_id = event.data.mrcht_usr_id;
      let emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
      let phoneNumber = /^(\+\d{1,3}[- ]?)?\d{10}$/;

      this.firstFormGroup = this._formBuilder.group({
        firstName: [event.data.fst_nm, Validators.required],
        lastName: [event.data.lst_nm, Validators.required],
        designation: [event.data.dsgn_id, Validators.required],
        department: [event.data.dprt_id, Validators.required],
        branches: [event.data.otlt_id, Validators.required],
        organisation: [event.data.orgn_id, Validators.required],
        usercategory: [event.data.usr_ctgry_id, Validators.required],
        mobileNumber: [event.data.mbl_nu, [Validators.required, Validators.pattern(phoneNumber)]],
        email: [event.data.eml_tx, [Validators.required, Validators.pattern(emailPattern)]],
        address: [event.data.addrs_tx, Validators.required],
        userName: [event.data.mrcht_usr_nm, Validators.required],
        password: [''],
        confirmPassword: [''],
        mnuPrfle: [event.data.mnu_prfle_id, Validators],
        stpPrfle: [event.data.stp_prfle_id, Validators],
        rptPrfle: [event.data.rpt_prfle_id, Validators],
        rolenm: ['', Validators],
      });
      this.imageUrl = event.data.prfle_usr_img_url_tx;
      this.assignedPrfle = [];
      this.othrPrfles = [];

      for (let k = 0; k < this.menuProfls.length; k++) {
        if (event.data.mnu_prfle_id == this.menuProfls[k].mnu_prfle_id) {
          this.assignedPrfle.push(this.menuProfls[k]);
        } else {
          this.othrPrfles.push(this.menuProfls[k]);
        }
      }
    }
    else if (event.cellElement.innerText == 'Delete') {
      this.delete(event.data);
    }

  }

  onValChange(val: string) {
    this.selectedVal = val;
  }

  ngOnInit() {
    this.shownewpassword = false;
    this.showpassword = true;

    // let emailregex: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    let emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
    let phoneNumber = /^(\+\d{1,3}[- ]?)?\d{10}$/;
    this.firstFormGroup = this._formBuilder.group({
      // firstCtrl: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      designation: ['', Validators.required],
      department: ['', Validators.required],
      branches: ['', Validators.required],
      usercategory: ['', Validators.required],
      organisation: ['', Validators.required],
      mobileNumber: ['', [Validators.required, Validators.pattern(phoneNumber)]],
      email: ['', [Validators.required, Validators.pattern(emailPattern)]],
      address: ['', Validators.required],
      userName: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      mnuPrfle: ['', Validators],
      stpPrfle: ['', Validators],
      rptPrfle: ['', Validators],
      rolenm: ['', Validators]
    });
    this.getUsrPermissions();


    let rte = "user/designations";
    this.crdsrv.get(rte).subscribe((res) => {
      this.dsgnlst = res['data'];
    }, (error) => {
      console.log(error);
    });
    let rte1 = `user/departments`;
    this.crdsrv.get(rte1).subscribe((res) => {
      this.dprtlst = res['data'];
    }, (error) => {
      console.log(error);
    });
    let rte2 = `user/organizations`;
    this.crdsrv.get(rte2).subscribe((res) => {
      this.orgnlst = res['data'];
    }, (error) => {
      console.log(error);
    });
    let rte3 = `user/outlets`;
    this.crdsrv.get(rte3).subscribe((res) => {
      this.outletslst = res['data'];
    }, (error) => {
      console.log(error);
    });
    let rte4 = `user/outletcatogiries`;
    this.crdsrv.get(rte4).subscribe((res) => {
      this.outletsctgrylst = res['data'];
    }, (error) => {
      console.log(error);
    });

    const prfleRte = `user/menu/profile`;
    this.crdsrv.get(prfleRte).subscribe((res) => {
      this.menuProfls = res['data'].mnuitems;
    }, (error) => {
      console.log(error);
    });
    const stpprfleRte = `user/setup/profiles`;
    this.crdsrv.get(stpprfleRte).subscribe((res) => {
      this.setupPrfls = res['data'];
    }, (error) => {
      console.log(error);
    });
    const rptprfleRte = `reports/report/profiles`;
    this.crdsrv.get(rptprfleRte).subscribe((res) => {
      this.reportPrfls = res['data'].reportitems;
    }, (error) => {
      console.log(error);
    });

    const rlenmRte = `user/roles`;
    this.crdsrv.get(rlenmRte).subscribe((res) => {
      this.rleNms = res['data'];
    }, (error) => {
      console.log(error);
    });

    const usrCtgryRte = `user/category`;
    this.crdsrv.get(usrCtgryRte).subscribe((res) => {
      this.usrCtgryLst = res['data'];
      for (let i = 0; i < this.usrCtgryLst.length; i++) {
        if (this.usrCtgryLst[i].usr_ctgry_nm == "MSO" || this.usrCtgryLst[i].usr_ctgry_nm == "LMO" || this.usrCtgryLst[i].usr_ctgry_nm == "Customer"
          || this.usrCtgryLst[i].usr_ctgry_nm == "Enterprise Customer") {
          this.usrCtgryLst.splice(i, 2);
        }
      }
    }, (error) => {
      console.log(error);
    });

  }

  filter(data) {
    this.selctedRoles = data.value;
  }


  toggle(event, data, value) {

    if (value == 'add') {
      this.menuProfls.forEach(x => {
        if (x.mnu_prfle_id !== data.mnu_prfle_id) {
          x.checked = !x.checked;
        }
      });
    } else {
      this.othrPrfles.forEach(x => {
        if (x.mnu_prfle_id !== data.mnu_prfle_id) {
          x.checked = !x.checked;
        }
      });
    }
    this.selectedValue = data;

  }

  bckBtn() {
    this.showAddBtn = true;
    this.showBckBtn = false;
    this.showStepr = false
    this.showTble = true;
    this.getusrDetails();
  }

  saveUsrProfile() {
    if (this.updateprofile == true) {
      let updusrPrfleData = {
        mrcht_usr_id: this.usr_mrchnt_id,
        mnu_prf_id: this.selectedValue.mnu_prfle_id
      };
      const updusrprfleRte = 'user/updateuserprfrel';
      this.crdsrv.create(updusrPrfleData, updusrprfleRte).subscribe((result: any) => {
        this.rowData = result.data;
      });
    } else {
      let usrPrfleData = {
        mrcht_usr_id: this.usr_instrd_id,
        mnu_prf_id: this.selectedValue.mnu_prfle_id
      };
      const usrprfleRte = 'user/adduserprfrel';
      this.crdsrv.create(usrPrfleData, usrprfleRte).subscribe((result: any) => {

        this.rowData = result.data;
        if (result.status == 200) {
          this._snackBar.open('Profile Assigned to User Successfully', '', {
            duration: 2000,
            panelClass: ['blue-snackbar'],
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,

          });
        }
        this.showTble = false;
        this.showAddBtn = false;
        this.showTble = true;
        this.getusrDetails();
      });
    }
  }
  // disableForm() {
  //   this.formGroupName.controls['userName'].disable();
  // }
  user: any = {
    permissions: { 'slct_in': 0, 'insrt_in': 0, 'updt_in': 0, 'dlte_in': 0, 'exprt_in': 0 },
    'perm_url': 'user/permissions/User creation'
  }
  getUsrPermissions(): any {
    this.mainMessage = null;
    this.crdsrv.get(this.user.perm_url).subscribe((res) => {
      console.log(res['data']);
      if (res['status'] == 200) {
        if (res['data'].length)
          this.user.permissions = res['data'][0];
        if (this.user.permissions.slct_in === 1) {
          this.getusrDetails();
        } else
          this.mainMessage = 'You do not have permissions to do this operation. Please contact Administrator to get permissions.';
      }
    });
  }
  getusrDetails() {
    this.showTble = true;
    this.loader=true;
    const usrDtlsrte = 'user/usrlst';
    this.crdsrv.get(usrDtlsrte).subscribe((result: any) => {
      if(result['status']==200)
      {
        this.loader=false;
        this.rowData = result.data;
        this.userlist = result.data;
      }
      // this.infraTblDtls = result.data;
     
    });
  }


  onClickAddNew() { }

  uploadFile(event) {
    let reader = new FileReader(); // HTML5 FileReader API
    let file = event.target.files[0];
    if (event.target.files && event.target.files[0]) {
      reader.readAsDataURL(file);

      // When file uploads set it to file formcontrol
      reader.onload = () => {
        this.imageUrl = reader.result;
        this.prflimageUrl = reader.result;
        this.firstFormGroup.patchValue({
          file: reader.result
        });
        this.editFile = false;
        this.removeUpload = true;
      }
      // ChangeDetectorRef since file is loading outside the zone
      this.cd.markForCheck();
    }
  }

  removeUploadedFile() {
    let newFileList = Array.from(this.el.nativeElement.files);
    // this.imageUrl = 'https://i.pinimg.com/236x/d6/27/d9/d627d9cda385317de4812a4f7bd922e9--man--iron-man.jpg';
    // this.imageUrl = 'assets/images/avatars/profile.jpg';
    this.editFile = true;
    this.removeUpload = false;
    this.firstFormGroup.patchValue({
      file: [null]
    });
  }

  onSubmit() {

    this.usernameequals = false;
    this.submitted = true;
    if (!this.firstFormGroup.valid) {
      // alert('Please fill all the required fields to create a super hero!')
      this._snackBar.open('Please fill all the required fields!', '', {
        duration: 2000,
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      });
      return false;

    } else if (this.shownewpassword == true) {
      this.spnrCtrl = true;
      this.updateprofile = true;
      this.data = this.firstFormGroup.value;
      const upduserData = {
        mrcht_usr_id: this.merchantuser_id,
        data: this.firstFormGroup.value,
        image: this.prflimageUrl
      };
      // console.log(upduserData);
      // return;
      const updateusrte = 'user/updateuser';
      this.crdsrv.create(upduserData, updateusrte).subscribe((result: any) => {
        this.nextbutton = true;
        this.showTble = true;
        this.showStepr = false;
        var element = document.getElementById("scrollTop");
        element.scrollIntoView();
        setTimeout(() => {
          this.getusrDetails();
        }, 2000);
        this.spnrCtrl = false;
        this.usr_mrchnt_id = upduserData.mrcht_usr_id;
      });
    } else if (this.showpassword == true) {
      for (var i = 0; i < this.userlist.length; i++) {
        if (this.firstFormGroup.value.userName.replace(/\s/g, "").toLowerCase() == this.userlist[i].mrcht_usr_nm.toLowerCase()) {
          this.usernameequals = true;
        }
      }
      if (this.usernameequals == true) {
        this._snackBar.open('UserName Already Exists', '', {
          duration: 5000,
          panelClass: ['blue-snackbar'],
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
      } else {
        this.spnrCtrl = true;
        this.data = this.firstFormGroup.value;
        this.data['img_data'] = this.imageUrl;
        this.data['roles_data'] = this.selctedRoles;

        const createusrte = 'user/add/user';
        this.crdsrv.create(this.data, createusrte).subscribe((result: any) => {
          this.usr_instrd_id = result.data.insertId;
          this.nextbutton = true;
          if (result.status == 200) {
            this._snackBar.open('User added Successfully', '', {
              duration: 2000,
              panelClass: ['blue-snackbar'],
              horizontalPosition: this.horizontalPosition,
              verticalPosition: this.verticalPosition,
            });
            this.showAddBtn = true;
            this.showBckBtn = false;
            this.showStepr = false;
            this.showTble = true;
            this.getusrDetails();
            this.spnrCtrl = false;
          }
        });
      }
    }
  }
  check() {
    if (!this.firstFormGroup.valid) {
      return true;
    }
    else {

      if (this.firstFormGroup.controls['password'].value != this.firstFormGroup.controls['confirmPassword'].value) {

        return true;

      }
      else {
        return false;
      }
    }
  }

  // gotoProfilePage() {
  //   this.router.navigate(['setup/profile']);
  // }

  delete(data) {
    // let desgDelRte = `user/deluser/${data.mrcht_usr_id}`;
    // this.crdsrv.delete(desgDelRte).subscribe((res) => {


    this.confirmDialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '25%',
      panelClass: 'my-class',
      data: {
        message: 'Are you sure deleting this item ?', id: data.mrcht_usr_id, nm: data.mrcht_usr_nm, entityname: 'User',
        flag: false, rte: `user/deluser/${data.mrcht_usr_id}`
      }
    });

    this.confirmDialogRef.afterClosed().subscribe((response) => {
      if (response == undefined) { }
      else if (response.status == 200) { this.getusrDetails(); }
    });
    // )
  }
}
