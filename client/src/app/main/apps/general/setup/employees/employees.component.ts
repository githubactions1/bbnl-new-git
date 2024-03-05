import { Component, OnInit, ViewChild, Inject, Output, EventEmitter, Input } from '@angular/core';
import { CrudService } from '../../../crud.service';
import { DsSidebarService } from '@glits/components/sidebar/sidebar.service';

import {
  MatTableDataSource, MatPaginator, MatSort, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition, MatDialogRef, MatSnackBar, MatDialog,
  MAT_DIALOG_DATA
} from '@angular/material';
import { EmployeeForm } from './employees.module';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { UserAccountComponent } from '../user-account/user-account.component';
import { DeleteDialogComponent } from 'app/main/shared/components/delete-dialog/delete-dialog.component';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss']
})
export class EmployeesComponent implements OnInit {
  // displayedColumns = ['avatar', 'name', 'eml_tx', 'mble_ph', 'job_title', 'work_email', 'work_phne', 'buttons'];
  dataSource = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dialogRef: any;
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  confirmDialogRef: MatDialogRef<DeleteDialogComponent>;
  action: boolean;
  usrdtls;
  crtacs = false
  empdtls: any
  rlesdts: any
  hide: boolean;
  columnDefs = [];
  rowData = [];
  modules;
  getRowHeight;
  hdrDta:any;
  leftsidebarHdng

  deleteClicked:boolean=false;
  action1: string;
  location: EmployeeForm;
  formEmployee: FormGroup;
  dialogTitle: string;
  merchant;
  message: string;
  public imagePath;
  dsgnlst: any;
  dprtlst: any;
  outlet: any;
  
  dstlst: any;
  slctdDstrctId: any;
  slctdMndlId: any;
  mnadlLst: any;
  svmlst: any;
  gndlst: any;


  sideBarHeader: string;
  editClicked: boolean = false;
  updateData: any;
  deleteEmplye: boolean;
  usrDtls
  ste_id



  @Output() aggridEvent = new EventEmitter<string>();
  @Output() gridReadyEvent = new EventEmitter<string>();
  @Input() rowSelection;
  slctdRow;
  params;
  columnApi;
  status;
  gridApi: any;
  /**
* Constructor
* 
* @param _data
*/
  /**
 * Constructor
 * 

 * @param {FormBuilder} _formBuilder
 */

  spnrCtrl = false;
  loadingCellRendererParams;
  
  overlayLoadingTemplate = '<span class="ag-overlay-loading-center">Please wait while your rows are loading</span>';
  editdata: any;
  deletedata: any;
 
 /**
    * @param {DsSidebarService} _dsSidebarService
    */

   getHeaderDtls = function() { return {"title":"Employees","icon":"person"}}

  constructor(private _dsSidebarService: DsSidebarService,public crdsrv: CrudService, public dialog: MatDialog, private datePipe: DatePipe, public snackBar: MatSnackBar, @Inject(MAT_DIALOG_DATA) private _data: any, private router: ActivatedRoute,
  private _formBuilder: FormBuilder) {
    // this.usrdtls = JSON.parse(localStorage.getItem('usrDtls'));
    this.crdsrv.getUsrLgnDtls().subscribe((res) => {
      if (res) {
        this.usrdtls = JSON.parse(res);
      }

    }, (err) => {

    });
    //console.log(_data)
    this.router.params.subscribe(params => {
      //console.log(params)
      //console.log(Object.keys(this.router.snapshot.params).length)
      if (Object.keys(this.router.snapshot.params).length == 0) {
        this.action = true
        this.hide = false;

      }
      else {
        this.rlesdts = JSON.parse(params.data)
        this.hide = JSON.parse(params.hide)
        this.action = false;
      }
    })
    //console.log(this.action)
    // this.action = _data.action
    let rowHeight = 40;
    this.getRowHeight = function (params) {
      return rowHeight;
    };



    // this.crdsrv.getUsrLgnDtls().subscribe((res) => {
    //   if (res) {
    //     this.usrdtls = JSON.parse(res);
    //   }

    // }, (err) => {

    // });
    // this.usrdtls = JSON.parse(localStorage.getItem('usrDtls'));
    //console.log(_data)
    this.action = _data.action
    //console.log(this.action)
    if (this.action1 === 'edit') {
      this.dialogTitle = 'Edit Employee';
      this.location = _data.location;
      //console.log(this.location)
    }
    else {
      this.dialogTitle = 'New Employee';
      this.location = new EmployeeForm({});
      //console.log(this.location)
    }
    this.formEmployee = this.createContactForm();




  }

  createContactForm(): FormGroup {
    return this._formBuilder.group({
      emple_nu: [this.location.emple_nu],
      mrcht_emp_id: [this.location.mrcht_emp_id],
      mrcht_emp_nm: [this.location.mrcht_emp_nm],
      eml_tx: [this.location.eml_tx],
      mbl_nu: [this.location.mbl_nu],
      dsgn_nm: [this.location.dsgn_nm],
      dsgn_id: [this.location.dsgn_id],
      avatar: [this.location.avatar],
      dprts_id: [this.location.dprts_id],
      dprt_nm: [this.location.dprt_nm],
      dob_dt: [this.location.dob_dt],
      dstrt_id: [this.location.dstrt_id],
      mndl_id: [this.location.mndl_id],
      gndr_id: [this.location.gndr_id],
      svm_id: [this.location.svm_id],
      adhr_nu: [this.location.adhr_nu],
      addrs_tx: [this.location.addrs_tx],
      wrk_eml_ts: [this.location.wrk_eml_ts],
      wrk_ph: [this.location.wrk_ph],
      otlt_nm: [this.location.otlt_nm],
      otlt_id: [this.location.otlt_id],
      bnk_id: [this.location.bnk_id],
      emplt_ctry_id: [this.location.emplt_ctry_id],
      crnt_in: [this.location.crnt_in],
      mrcht_id: [this.location.mrcht_id],
      mrcht_usr_id: [this.location.mrcht_usr_id],
      dstrt_nm: [this.location.dstrt_nm],
      mndl_nm: [this.location.mndl_nm],
      svm_nm: [this.location.svm_nm],
      gndr_nm: [this.location.gndr_nm]

    });
  }
  preview(files) {
    if (files.length === 0)
      return;

    var mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = "Only images are supported.";
      return;
    }

    var reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]);
    reader.onload = (_event: any) => {
      this.location.avatar = _event.target.result;
      this.formEmployee.value.avatar = [this.location.avatar];
      //console.log(this.location)
      //console.log(this.formEmployee.value)
    }
  }

  img() {
    //console.log(this.formEmployee)
    var res = this.location.avatar.split("base64");
    if (res.length > 1) {
      this.formEmployee.value.avatar = [this.location.avatar];
    }
    else {
      this.formEmployee.value.avatar = this.location.avatar;
    }
    //console.log(this.formEmployee)
  }

  ngOnInit() {

    this.getempy();
    let emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
    let phoneNumber = /^(\+\d{1,3}[- ]?)?\d{10}$/;
    this.formEmployee = new FormGroup({
      mrcht_emp_nm: new FormControl('', Validators.required),
      eml_tx: new FormControl('',[Validators.required,Validators.pattern(emailPattern)] ),
      mbl_nu:new FormControl('',[Validators.required,Validators.pattern(phoneNumber)] ),
      dsgn_id:new FormControl('', Validators.required),
      dprts_id:new FormControl('', Validators.required),
      dstrt_id:new FormControl('', Validators.required),
      mndl_id:new FormControl('', Validators.required),
      svm_id:new FormControl('', Validators.required),
      gndr_id:new FormControl('', Validators.required),
      dob_dt:new FormControl('', Validators.required),
      adhr_nu:new FormControl('', Validators.required),
      addrs_tx:new FormControl('', Validators.required)
    });
  }
getDesignations(){
  let rte = "user/designations"
  this.crdsrv.get(rte).subscribe((res) => {
    //console.log(res['data'])
    this.dsgnlst = res['data'];
    //console.log(this.dsgnlst)
  }, (error) => {
    //console.log(error)
  });
}
getDprtmnts()
{
  let rte1 = `user/departments`
  this.crdsrv.get(rte1).subscribe((res) => {
    //console.log(res['data'])
    this.dprtlst = res['data'];
    //console.log(this.dprtlst)
  }, (error) => {
    //console.log(error)
  });
}
getGndr(){
  let rte2 = `user/gender`
  this.crdsrv.get(rte2).subscribe((res) => {
    //console.log(res['data'])
    this.gndlst = res['data'];
    //console.log(this.gndlst)
  }, (error) => {
    //console.log(error)
  });
}
  getDsrtLst() {
    this.usrDtls=JSON.parse(localStorage.getItem('usrDtls'))
    //console.log(this.usrDtls)
    this.ste_id=this.usrDtls.ste_id;
    //console.log(this.ste_id);
    const rte = 'user/getDstrcts/'+this.ste_id;
    this.crdsrv.get(rte).subscribe(res => {
      if (res['status'] == 200) {
        if (res['data'].length > 0) {
          this.dstlst = res['data'];
        }
      }
      if (this.editClicked == true) {
        this.slctdDstrctId = this.updateData.dstrt_id
        //console.log(this.slctdDstrctId)
        this.getMndlLst()
      }
    })
  }
  getMndlLst() {

    this.slctdDstrctId = this.formEmployee.get('dstrt_id').value;
    //console.log(this.slctdDstrctId)
    const rte = 'user/mandalLst/' + this.slctdDstrctId;
    this.crdsrv.get(rte).subscribe(res => {
      if (res['status'] == 200) {
        if (res['data'].length > 0) {
          this.mnadlLst = res['data'];
        }
      }
    })
  }

  opensideBar(key,value, emplyeUpdtData) {
    
    console.log(emplyeUpdtData)
    if (value=='new') {
      this.leftsidebarHdng='Add New Employee'
      this.sideBarHeader = 'Add New';
      this._dsSidebarService.getSidebar(key).toggleOpen();
      this.editClicked = false;
      this.deleteEmplye = false;
      this.getDesignations();
      this.getDprtmnts();
      this.getGndr();
      this.getDsrtLst();
      this.formEmployee.get('mrcht_emp_nm').setValue('');
      this.formEmployee.get('eml_tx').setValue('');
      this.formEmployee.get('mbl_nu').setValue('');
      this.formEmployee.get('dsgn_id').setValue('');
      this.formEmployee.get('dprts_id').setValue('');
      this.formEmployee.get('dstrt_id').setValue('');
      this.formEmployee.get('mndl_id').setValue('');
      this.formEmployee.get('svm_id').setValue('');
      this.formEmployee.get('gndr_id').setValue('');
      this.formEmployee.get('dob_dt').setValue('');
      this.formEmployee.get('adhr_nu').setValue('');
      this.formEmployee.get('addrs_tx').setValue('');
      
    } 
    else if(value=='edit')
    {
      this.leftsidebarHdng='Edit Employee'
      // console.log(this.editClicked)
      this._dsSidebarService.getSidebar(key).toggleOpen();
      this.getDesignations();
      this.getDprtmnts();
      this.getGndr();
      this.getDsrtLst();
      this.sideBarHeader = 'Edit';
      this.updateData = emplyeUpdtData;
      this.formEmployee.get('mrcht_emp_nm').setValue(emplyeUpdtData.mrcht_emp_nm);
      this.formEmployee.get('eml_tx').setValue(emplyeUpdtData.eml_tx);
      this.formEmployee.get('mbl_nu').setValue(emplyeUpdtData.mbl_nu);
      this.formEmployee.get('dsgn_id').setValue(emplyeUpdtData.dsgn_id);
      this.formEmployee.get('dprts_id').setValue(emplyeUpdtData.dprts_id);
      this.formEmployee.get('dstrt_id').setValue(emplyeUpdtData.dstrt_id);
      this.formEmployee.get('mndl_id').setValue(emplyeUpdtData.mndl_id);
      this.formEmployee.get('svm_id').setValue(emplyeUpdtData.svm_id);
      this.formEmployee.get('gndr_id').setValue(emplyeUpdtData.gndr_id);
      let date = this.datePipe.transform(emplyeUpdtData.dob,"yyyy-MM-dd");
      this.formEmployee.get('dob_dt').setValue(date);
      this.formEmployee.get('adhr_nu').setValue(emplyeUpdtData.adhr_nu);
      this.formEmployee.get('addrs_tx').setValue(emplyeUpdtData.addrs_tx);

    }
    else if(value=='delete'){
      this.leftsidebarHdng='Delete Employee';
      this._dsSidebarService.getSidebar(key).toggleOpen();
      this.getDesignations();
      this.getDprtmnts();
      this.getGndr();
      this.getDsrtLst();
      this.sideBarHeader = 'Edit';
      this.formEmployee.get('mrcht_emp_nm').setValue(emplyeUpdtData.mrcht_emp_nm);
      this.formEmployee.get('eml_tx').setValue(emplyeUpdtData.eml_tx);
      this.formEmployee.get('mbl_nu').setValue(emplyeUpdtData.mbl_nu);
      this.formEmployee.get('dsgn_id').setValue(emplyeUpdtData.dsgn_id);
      this.formEmployee.get('dprts_id').setValue(emplyeUpdtData.dprts_id);
      this.formEmployee.get('dstrt_id').setValue(emplyeUpdtData.dstrt_id);
      this.formEmployee.get('mndl_id').setValue(emplyeUpdtData.mndl_id);
      this.formEmployee.get('svm_id').setValue(emplyeUpdtData.svm_id);
      this.formEmployee.get('gndr_id').setValue(emplyeUpdtData.gndr_id);
      let date = this.datePipe.transform(emplyeUpdtData.dob,"yyyy-MM-dd");
      this.formEmployee.get('dob_dt').setValue(date);
      this.formEmployee.get('adhr_nu').setValue(emplyeUpdtData.adhr_nu);
      this.formEmployee.get('addrs_tx').setValue(emplyeUpdtData.addrs_tx);
      this.updateData = emplyeUpdtData;
      this.deleteEmplye=true;
    }
    else{
      this._dsSidebarService.getSidebar(key).toggleOpen();
    }
  
}



  getempy() {
    this.spnrCtrl = true;
    let rte = `user/employees`
    this.crdsrv.get(rte).subscribe((res) => {
      //console.log(res['data']);
      this.rowData = res['data'];
      this.columnDefs = [
        { headerName: 'Sno', field: 'sno', cellStyle: { 'text-align': "center" }, cellClass: "pm-grid-number-cell", width: 50 },
        { headerName: 'Employee Name', field: 'mrcht_emp_nm', cellStyle: { 'text-align': "center" }, cellClass: "pm-grid-number-cell", width: 265 ,filter: true,},
        { headerName: 'Mobile', field: 'mbl_nu', cellStyle: { 'text-align': "center" }, cellClass: "pm-grid-number-cell", width: 125,filter: true, },
        { headerName: 'Email', field: 'eml_tx', cellStyle: { 'text-align': "center" }, cellClass: "pm-grid-number-cell", width: 200 },
        { headerName: 'Department', field: 'dprt_nm', cellStyle: { 'text-align': "center" }, cellClass: "pm-grid-number-cell", width: 200 ,filter: true,},
        { headerName: 'Designation', field: 'dsgn_nm', cellStyle: { 'text-align': "center" }, cellClass: "pm-grid-number-cell", width: 200,filter: true, },
        { headerName: 'District', field: 'dstrt_nm', cellStyle: { 'text-align': "center" }, cellClass: "pm-grid-number-cell", width: 125,filter: true, },
        { headerName: 'Mandal', field: 'mndl_nm', cellStyle: { 'text-align': "center" }, cellClass: "pm-grid-number-cell", width: 200,filter: true, },
        { headerName: 'Address', field: 'addrs_tx', cellStyle: { 'text-align': "center" }, cellClass: "pm-grid-number-cell", width: 265 },
        { headerName: 'Date Of Birth', field: 'dob_date', cellStyle: { 'text-align': "center" }, cellClass: "pm-grid-number-cell", width: 125 },
        { headerName: 'Gender', field: 'gndr_nm', cellStyle: { 'text-align': "center" }, cellClass: "pm-grid-number-cell", width: 80 },
        { headerName: 'Adhar Number', field: 'adhr_nu', cellStyle: { 'text-align': "center" }, cellClass: "pm-grid-number-cell", width: 150,filter: true, },
        {
          headerName: 'Edit',
          cellStyle: { textAlign: 'center' },
          width: 100,
          cellRenderer: function (param) {
            const eDiv = document.createElement('div');
            eDiv.innerHTML = `<button class="btn-simple editBtn-color edtBtnstls" >
            <mat-icon class="s-20 mat-icon material-icons">edit</mat-icon>
            </button>`;
            const eButton = eDiv.querySelectorAll('.btn-simple')[0];
            eButton.addEventListener('click', function (param) {
              //console.log(param);
            });
            return eDiv;
          },
        }, {
          headerName: 'Delete',
          cellStyle: { textAlign: 'center' },
          width: 100,
          cellRenderer: function (param) {
            const eDiv = document.createElement('div');
            eDiv.innerHTML = `<button class="btn-simple dlteBtnStyls" >
            <mat-icon  class="s-20 mat-icon material-icons deleteBtn-icon-color" >delete</mat-icon>
          </button>`;
            const eButton = eDiv.querySelectorAll('.btn-simple')[0];
            eButton.addEventListener('click', function (param) {
              //console.log(param);
            });
            return eDiv;
          },
        }];
    }, (error) => {
      //console.log(error);
    });
  }
  saveEmployee(){
    //console.log(this.editClicked)
    if (this.editClicked == true) {
      this.update(this.updateData);
    } else {
      this.newentry();
    }
  }
  delEmployee(){
    //console.log(this.deleteEmplye);
    //console.log(this.deletedata)
    this.delete(this.deletedata)
  }
  onGridReady(params): void {
    this.gridApi = params.api;
    this.columnApi = params.columnApi;
    this.gridApi.setHeaderHeight(35);
    this.params = params;
    this.gridReadyEvent.emit(this.params);

  }
  
  update(data) {
    // console.log(this.formEmployee.value);
    // console.log(data);
    // return;

    let rte = "user/updemply";
    this.usrdtls = JSON.parse(localStorage.getItem('usrDtls'));
    // let date1=this.datePipe.transform(this.formEmployee.value.dob,"yyyy-MM-dd");
    let departmentgData = {
      // dsgn_id: data.dsgn_id,
      mrcht_emp_nm: this.formEmployee.value.mrcht_emp_nm,
      eml_tx: this.formEmployee.value.eml_tx,
      mbl_nu: this.formEmployee.value.mbl_nu,
      dsgn_id: this.formEmployee.value.dsgn_id,
      dprts_id: this.formEmployee.value.dprts_id,
      dstrt_id: this.formEmployee.value.dstrt_id,
      mndl_id: this.formEmployee.value.mndl_id,
      svm_id: this.formEmployee.value.svm_id,
      gndr_id: this.formEmployee.value.gndr_id,
      dob_dt: this.datePipe.transform(this.formEmployee.value.dob_dt,"yyyy-MM-dd"),
      adhr_nu: this.formEmployee.value.adhr_nu,
      addrs_tx: this.formEmployee.value.addrs_tx,
      mrcht_emp_id: data.mrcht_emp_id
    };
// console.log(departmentgData)
    this.crdsrv.create(departmentgData, rte).subscribe((res) => {
      if (res['status'] == 200) {
        this.snackBar.open("Sucessfully Updated", '', {
          duration: 3000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
        this.opensideBar('addFormPanel',null,null);
        this.getempy();
      }
    }, (error) => {
      //console.log(error);
    });



  }

  delete(data) {
  //console.log("delete");
  //console.log(data);
  this.confirmDialogRef = this.dialog.open(DeleteDialogComponent, {
    width: '25%',
    panelClass: 'my-class',
    data: { message: 'Are you sure deleting this item ?', id: data.mrcht_emp_id, nm: data.mrcht_emp_nm, entityname: 'Designation', flag: false, rte: `user/delemply/${data.mrcht_emp_id}` }
  });

  this.confirmDialogRef.afterClosed().subscribe((response) => {
    //console.log(response)
    if (response == undefined) { }
    else if (response.status == 200)
    this.opensideBar('addFormPanel',null,null);
      this.getempy();
  })

}


  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  newentry() {
    this.usrdtls = JSON.parse(localStorage.getItem('usrDtls'));
    //console.log(this.formEmployee.value);
    //console.log(this.usrdtls);

    this.usrdtls = JSON.parse(localStorage.getItem('usrDtls'));
    let rte = "user/addemply";
    let data = {
      mrcht_emp_nm: this.formEmployee.value.mrcht_emp_nm,
      eml_tx: this.formEmployee.value.eml_tx,
      mbl_nu: this.formEmployee.value.mbl_nu,
      dsgn_id: this.formEmployee.value.dsgn_id,
      dprts_id: this.formEmployee.value.dprts_id,
      dstrt_id: this.formEmployee.value.dstrt_id,
      mndl_id: this.formEmployee.value.mndl_id,
      gndr_id: this.formEmployee.value.gndr_id,
      dob_dt: this.formEmployee.value.dob_dt,
      adhr_nu: this.formEmployee.value.adhr_nu,
      addrs_tx: this.formEmployee.value.addrs_tx,
      mrcht_id: this.usrdtls.mrcht_id
    };
    data.dob_dt = this.datePipe.transform(data.dob_dt, "yyyy-MM-dd");
    //console.log(data);
    
    this.crdsrv.create(data, rte).subscribe((res) => {
      //console.log(res);
      if (res['status'] == 200) {
        this.snackBar.open("Sucessfully Added", '', {
          duration: 2000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
        this.opensideBar('addFormPanel',null,null);
        this.getempy();
      }
    }, (error) => {
      //console.log(error);
    });
  }
 
  createacc(ele) {
    //console.log(ele)
    let action: string;
    if (!ele.rle_id) {
      action = 'new'
    }
    if (ele.rle_id) {
      action = 'edit'
    }
    this.dialogRef = this.dialog.open(UserAccountComponent, {
      disableClose: false,
      width: '100%',
      panelClass: 'my-class1',
      data: {
        usrdata: ele,
        action: action,
      }

    });
    this.dialogRef.afterClosed()
      .subscribe((response: FormGroup) => {
        if (!response) {
          return;
        }
        else if (response[0] == "save") {
          let data = response[1].value;
          data['mrcht_id'] = this.usrdtls.mrcht_id
          //console.log(data)
          let rte = `merchant/roles/${data.emple_id}`
          this.crdsrv.create(data, rte).subscribe((res) => {
            //console.log(res)
            if (res['status'] == 200) {
              this.snackBar.open("Sucessfully Added", 'End now', {
                duration: 2000,
                horizontalPosition: this.horizontalPosition,
                verticalPosition: this.verticalPosition,
              });
              this.getempy();
            }
            else {
              this.snackBar.open("Unsucessfull Check Once", 'End now', {
                duration: 2000,
                horizontalPosition: this.horizontalPosition,
                verticalPosition: this.verticalPosition,
              });
            }
          }, (error) => {
            //console.log(error)
          })
        }
        else {
          let rte = "merchant/roles"
          let data = response.value;
          data['mrcht_id'] = this.usrdtls.mrcht_id
          //console.log(data)
          this.crdsrv.create(data, rte).subscribe((res) => {
            //console.log(res)
            if (res['status'] == 200) {
              this.snackBar.open("Sucessfully Added", 'End now', {
                duration: 2000,
                horizontalPosition: this.horizontalPosition,
                verticalPosition: this.verticalPosition,
              });
              this.getempy();
            }
            else {
              this.snackBar.open("Unsucessfull Check Once", 'End now', {
                duration: 2000,
                horizontalPosition: this.horizontalPosition,
                verticalPosition: this.verticalPosition,
              });
            }
          }, (error) => {
            //console.log(error)
          })
        }
      })
  }
  onCellClick(event) {
    //console.log(event);
    if (event.colDef.headerName == 'Edit') {
      // this.editentry(event.data);
      this.editentry(event.data);

    } else if (event.colDef.headerName == 'Delete') {
      this.deleteentry(event.data)
    }
   
  }
  editentry(data) {
    this.editClicked = true;
    // this.disabled = true;
    this.deleteEmplye=false;
    this.editdata = data
    let name = 'addFormPanel'
    this.opensideBar(name, 'edit', this.editdata);
  }
  deleteentry(data) {
    this.deleteEmplye = true;
    // this.disabled = true;
    this.deletedata = data
    let name = 'addFormPanel'
    this.opensideBar(name, 'delete', this.deletedata);
  }
}

