import { Component, OnInit, ViewChild, Inject, Output, EventEmitter, Input } from '@angular/core';
// tslint:disable-next-line:max-line-length
import { MatTableDataSource, MatPaginator, MatSort, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition, MatDialogRef, MatDialog, MatSnackBar, MAT_DIALOG_DATA } from '@angular/material';
import { DsConfirmDialogComponent } from '@glits/components/confirm-dialog/confirm-dialog.component';
import { CrudService } from '../../../crud.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { DeleteDialogComponent } from 'app/main/shared/components/delete-dialog/delete-dialog.component';
import { DsSidebarService } from '@glits/components/sidebar/sidebar.service';

export interface Element {
  "index": string;
  "name": string;
  "buttons": string;
}

@Component({
  selector: 'app-outlets',
  templateUrl: './outlets.component.html',
  styleUrls: ['./outlets.component.scss']
})
export class OutletsComponent implements OnInit {
  displayedColumns = ['index', 'name', 'buttons'];
  dataSource = new MatTableDataSource<Element>();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dialogRef: any;
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  confirmDialogRef: MatDialogRef<DeleteDialogComponent>;
  usrDtls: any;
  columnDefs = [];
  rowData = [];
  modules;

  getRowHeight;
  usrdtls: any;
  ctgrylst: any;
  @Output() aggridEvent = new EventEmitter<string>();
  @Output() gridReadyEvent = new EventEmitter<string>();
  @Input() rowSelection;
  slctdRow;
  params;
  columnApi;
  status;
  gridApi: any;
  loadingCellRendererParams;
  hdrDta:any;
  overlayLoadingTemplate = '<span class="ag-overlay-loading-center">Please wait while your rows are loading</span>';


  action: string;
  // location: DepartmentForm;
  formOutlets: FormGroup;
  dialogTitle: string;
  merchant;
  sideBarHeader: string;
  editClicked: boolean = false;
  updateData: any;
  deleteDepartmnt: boolean;
  /**
  /**
 * Constructor
 *  @param {DsSidebarService} _dsSidebarService
 * 
 * @param _data
 * @param {FormBuilder} _formBuilder
 */

getHeaderDtls = function() { return {"title":"Branches","icon":"business_center"}}
  
  constructor(private _dsSidebarService: DsSidebarService,public crdsrv: CrudService,public dialog: MatDialog, public snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) private _data: any, private _formBuilder: FormBuilder,) {
    this.crdsrv.getUsrLgnDtls().subscribe((res) => {
      if(res)
      {
        this.usrDtls = JSON.parse(res);
      }
     
    }, (err)=>{

    });
    let rowHeight = 40;
    this.getRowHeight = function (params) {
      return rowHeight;
    };

    // console.log(_data)
    this.action = _data.action
    // console.log(this.action)
    if (this.action === 'edit') {
      this.dialogTitle = 'Edit Department';
      // this.location = _data.location;
    }
    else {
      this.dialogTitle = 'New Department';
      // this.location = new DepartmentForm({});
      // // console.log(this.location)
    }
    this.formOutlets = this.createContactForm();

   }

    /**
 * Create contact form
 *
 * @returns {FormGroup}
 */
  createContactForm(): FormGroup {
    return this._formBuilder.group({
      // dprt_nm: [this.location.dprt_nm],
      // dprt_id: [this.location.dprt_id],
      // mrcht_id: [this.location.mrcht_id],
    });
  }

  ngOnInit() {


    this.getoutlet();

    this.formOutlets = new FormGroup({
      otlt_nm:new FormControl('', Validators.required),
      otlt_ctgry_id:new FormControl('', Validators.required),
    })
    let rte1 = `user/outletcatogiries`
    this.crdsrv.get(rte1).subscribe((res) => {
      // console.log(res['data'])
      this.ctgrylst = res['data'];
      // console.log(this.ctgrylst)
    }, (error) => {
      // console.log(error)
    });
  }
  getoutlet() {
    let rte = 'user/outlets';
    this.crdsrv.get(rte).subscribe((res) => {
      // console.log(res['data']);
   
      this.rowData = res['data'];

      this.columnDefs = [
        { headerName: 'Sno', field: 'sno', cellStyle: { 'text-align': "center" }, cellClass: "pm-grid-number-cell", width: 100 },
        { headerName: 'Branch', field: 'otlt_nm', cellStyle: { 'text-align': "center" }, cellClass: "pm-grid-number-cell", width: 265, filter: true },
        { headerName: 'Category', field: 'otlt_ctgry_nm', cellStyle: { 'text-align': "center" }, cellClass: "pm-grid-number-cell", width: 265, filter: true },
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
              // // console.log(param);
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
              // // console.log(param);
            });
            return eDiv;
          },
        }];
    }, (error) => {
      console.log(error);
    });
  }
  update(data) {

    // console.log(this.formOutlets.value);
    // console.log(data);
    // return;

    let rte = "user/updateoutlet";
    // this.usrdtls = JSON.parse(localStorage.getItem('usrDtls'));

    let departmentgData = {
      // dsgn_id: data.dsgn_id,
      // dprt_nm: this.formOutlets.value.dprt_nm,
      // dprt_id: this.formOutlets.value.dprt_id
      otlt_id: data.otlt_id,
      otlt_ctgry_id: this.formOutlets.value.otlt_ctgry_id,
      otlt_nm: this.formOutlets.value.otlt_nm,
    };
    // console.log(departmentgData);

    this.crdsrv.create(departmentgData, rte).subscribe((res) => {
      if (res['status'] == 200) {
        this.snackBar.open("Sucessfully Updated", '', {
          duration: 3000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
        this.getoutlet();
        this.opensideBar('addFormPanel', null);
      }
    }, (error) => {
      console.log(error);
    });


  }

  delete(data) {

    // console.log("delete");
    // console.log(data);

    // let departmntDelRte = `user/outlet/${data.otlt_id}`;
    // this.crdsrv.delete(departmntDelRte).subscribe((res) => {

    this.confirmDialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '25%',
      panelClass: 'my-class',
      data: { message: 'Are you sure deleting this item ?', id: data.otlt_id, nm: data.otlt_nm, entityname: 'Branches', flag: false, rte: `user/outlet/${data.otlt_id}` }
    });

    this.confirmDialogRef.afterClosed().subscribe((response) => {
      if (response == undefined) { }
      else if (response.status == 200)
        {this.getoutlet();
        this.opensideBar('addFormPanel', null); }
    });
  }
    // )}
  


  opensideBar(key, deprtmntUpdtData) {

    if (deprtmntUpdtData) {
      this.sideBarHeader = 'Edit';
      this.editClicked = true;
      this.updateData = deprtmntUpdtData;
      this.formOutlets.get('otlt_ctgry_id').setValue(deprtmntUpdtData.otlt_ctgry_id);
      this.formOutlets.get('otlt_nm').setValue(deprtmntUpdtData.otlt_nm);
    } else {
      this.sideBarHeader = 'Add New';
      this.deleteDepartmnt = false;
      this.editClicked = false;
      // this.formOutlets.get('otlt_ctgry_nm').setValue('');
      // this.formOutlets.get('otlt_nm').setValue('');
    }
    // console.log(deprtmntUpdtData);

    // this.formOutlets.get('dprt_nm').setValue('');
    // // console.log("************************calll ************************");
  this._dsSidebarService.getSidebar(key).toggleOpen();
}


  onGridReady(params): void {
    this.gridApi = params.api;
    this.columnApi = params.columnApi;
    this.gridApi.setHeaderHeight(35);
    this.params = params;
    this.gridReadyEvent.emit(this.params);
}



  saveOutlet() {
    // // console.log("KKKKKKKKKKKKKKKKK")
    if (this.editClicked == false) {
      this.newentry();
    } else if (this.deleteDepartmnt == true) {
      this.delete(this.updateData);
      // // console.log(data)
      // this.confirmDialogRef = this.dialog.open(DeleteDialogComponent, {
      //   width: '40%',
      //   panelClass: 'my-class',
      //   data: { message: 'Are you sure deleting this item ?', id: data.dstrt_id, nm: data.dstrt_nm, entityname: 'Department', flag: false, rte: `user/delDeprt/${data.dprt_id}` }
      // });
  
      // this.confirmDialogRef.afterClosed().subscribe((response) => {
      //   if (response == undefined) { }
      //   else if (response.status == 200)
      //     this.getoutlet();
      // })



    } else {
      this.update(this.updateData);
    }
  }





  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  newentry() {
   
    this.usrdtls = JSON.parse(localStorage.getItem('usrDtls'));
    // // console.log(this.formOutlets.value);
    // // console.log(this.usrdtls);

    this.usrdtls = JSON.parse(localStorage.getItem('usrDtls'));

    const rte = 'user/addoutlet';
    let data = {
      otlt_nm: this.formOutlets.value.otlt_nm,
      otlt_ctgry_id: this.formOutlets.value.otlt_ctgry_id,
      // dprt_id: this.formOutlets.value.dprt_id,

      // mrcht_id: this.usrdtls.mrcht_id
    };
    // console.log(data);
    this.crdsrv.create(data, rte).subscribe((res) => {
      // console.log(res);
      if (res['status'] == 200) {
        this.snackBar.open("Sucessfully Added", '', {
          duration: 2000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
        this.getoutlet();
        this.opensideBar('addFormPanel',null);
      }
    }, (error) => {
      console.log(error);
    });



  }
  
  onCellClick(event){
    // console.log(event);
    if (event.colDef.headerName == 'Edit') {
      // this.editentry(event.data);
      this.opensideBar('addFormPanel', event.data);

    } else if (event.colDef.headerName == 'Delete') {
      this.deleteDepartmnt = true;
      this.opensideBar('addFormPanel', event.data);
    }

  
  }
}
