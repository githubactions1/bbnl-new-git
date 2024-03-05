import { Component, OnInit } from '@angular/core';
import { DsSidebarService } from '@glits/components/sidebar/sidebar.service';
import { MatDialogRef, MatDialog, MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition, MatTableDataSource } from '@angular/material';
// import { CrudService } from '../../../crud.service';
import { DeleteDialogComponent } from 'app/main/shared/components/delete-dialog/delete-dialog.component';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { CrudService } from 'app/main/apps/crud.service';



@Component({
  selector: 'app-add-change-log',
  templateUrl: './add-change-log.component.html',
  styleUrls: ['./add-change-log.component.scss']
})
export class AddChangeLogComponent implements OnInit {
  confirmDialogRef: MatDialogRef<DeleteDialogComponent>;
  dataSource = new MatTableDataSource<Element>();
  columnDefs = [];
  rowData = [];
  getRowHeight;
  tableData: any[] = [];
  formChangeLog: FormGroup;
  formCmpnt: FormGroup;
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  deleteChngelog: boolean = false;
  ctgrylst = [];
  cmpntlst = [];
  sideBarHeader: string;
  editClicked: boolean = false;
  updateData: any;
  usrdtls: any;
  hdrDta: any;
  slctdCmpntId = 0;
  selectedCmpntId = 0;
  dscrptnLst = [{
    descriptiontxt: ''
  }]
  permissions;
  loader:boolean;
  initdata: {};

  /**
* Constructor
* @param {DsSidebarService} _dsSidebarService
* 
* @param _data
* @param {FormBuilder} _formBuilder
*/

  constructor(private _dsSidebarService: DsSidebarService, public crdsrv: CrudService, public dialog: MatDialog, private datePipe: DatePipe, public snackBar: MatSnackBar, ) {

    // let rowHeight = 40;
    // this.getRowHeight = function (params) {
    //   return rowHeight;
    // };
    this.initdata = {}
    this.permissions = { "slct_in": 1, "insrt_in": 0, "updt_in": 1, "dlte_in": 1, "exprt_in": 1 }

  }



  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  addDscrptn(data) {
    console.log(data)
    this.dscrptnLst.push({
      descriptiontxt: ''
    })
  }

  newentry() {
    this.usrdtls = JSON.parse(localStorage.getItem('usrDtls'));
    console.log(this.formChangeLog.value);
    console.log(this.usrdtls);

    this.usrdtls = JSON.parse(localStorage.getItem('usrDtls'));

    let rte = "user/addchangelog";
    let data = {
      chng_lg_dt: this.datePipe.transform(this.formChangeLog.value.Dte, "yyyy-MM-dd"),
      //  chng_lg_txt: this.formChangeLog.value.Description,
      vrsn_nu: this.formChangeLog.value.version,
      ctgry_id: this.formChangeLog.value.category,
      cmpnt_id: this.formChangeLog.value.cmpnt,
      dsctn_txt: this.dscrptnLst
    };
    console.log(data);
    this.crdsrv.create(data, rte).subscribe((res) => {
      console.log(res);
      if (res['status'] == 200) {
        this.opensideBar('addFormPanel', null)
        this.snackBar.open("Sucessfully Added", '', {
          duration: 2000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
        this.getchngLogLst();
      }
    }, (error) => {
      console.log(error);
    });

  }

  onCmpntNmSelection() {
    console.log(this.selectedCmpntId);
    if (this.selectedCmpntId === undefined) {
      this.selectedCmpntId = 0;
    }
    this.slctdCmpntId = this.selectedCmpntId;
    this.getchngLogLst();
  }

  getchngLogLst() {
    console.log(this.slctdCmpntId);
    this.loader=true;
    const rte = `user/change-log/` + this.slctdCmpntId;
    this.crdsrv.get(rte).subscribe((res) => {
      if(res['status']=200)
      {
        this.loader=false;
        console.log(res);
      this.rowData = res['data'];
      let count = 0;
      console.log(this.rowData)

      }
      
    });


    this.columnDefs = [
      { headerName: 'Sno', field: 'sno', filter: false },
      { headerName: 'Change Log Date', field: 'chng_lg_dt' },
      { headerName: 'Version', field: 'vrsn_nu' },
      { headerName: 'Category', field: 'ctgry_nm' },
      { headerName: 'Change Log Text', field: 'chng_lg_txt' },
      { headerName: 'Change Log Type', field: 'cmpnt_nm' },
      // {
      //   headerName: 'Edit',
      //   cellStyle: { textAlign: 'center' },
      //   width: 150,
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
      // }, 

      // {
      //   headerName: 'Delete',
      //   cellStyle: { textAlign: 'center' },
      //   width: 150,
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
    ]
  }

  onEdit2(event) {
    if (event.cellElement.innerText == 'Edit') {
      this.opensideBar('addFormPanel', event.data);
    }
  }
  opensideBar1() {
    throw new Error("Method not implemented.");
  }


  onDelete2(event) {
    console.log(event)
    this.confirmDialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '25%',
      panelClass: 'my-class',
      data: { message: 'Are you sure deleting this item ?', id: event.key.chng_lg_id, nm: event.key.chng_lg_txt, entityname: ' Change Log', flag: false, rte: `user/delchngelog/${event.key.chng_lg_id}` }
    });

    this.confirmDialogRef.afterClosed().subscribe((response) => {
      if (response == undefined) { }
      else if (response.status == 200)
        this.getchngLogLst();
    })
  }

  ngOnInit() {

    let rte2 = `user/change-log-ctgry`;
    this.crdsrv.get(rte2).subscribe((res) => {
      console.log(res['data'])
      this.ctgrylst = res['data'];
    })

    let rte3 = `user/change-log-cmpnt`;
    this.crdsrv.get(rte3).subscribe((res) => {
      console.log(res['data'])
      this.cmpntlst = res['data'];
    })

    this.formChangeLog = new FormGroup({
      Dte: new FormControl('', Validators.required),
      version: new FormControl('', Validators.required),
      category: new FormControl('', Validators.required),
      cmpnt: new FormControl('', Validators.required),
      // Description: new FormControl('', Validators.required),
    })

    this.formCmpnt = new FormGroup({
      cmpntnm: new FormControl('', Validators.required),
    })
    this.getchngLogLst();

  }



  opensideBar(key, chngelogData) {
    console.log(key);
    console.log(chngelogData);

    // return;
    if (chngelogData) {
      this.sideBarHeader = 'Edit';
      this.editClicked = true;
      this.updateData = chngelogData;
      // this.dscrptnLst=  this.updateData
      // this.formChangeLog.get('Dte').setValue(chngelogData.chng_lg_dt);
      var tmp = chngelogData.chng_lg_dt.split('/');
      this.formChangeLog.controls['Dte'].setValue(new Date(tmp[1] + '/' + tmp[0] + '/' + tmp[2]).toISOString());
      console.log(chngelogData.chng_lg_dt)
      this.formChangeLog.get('version').setValue(chngelogData.vrsn_nu);
      this.formChangeLog.get('cmpnt').setValue(chngelogData.cmpnt_id);
      this.formChangeLog.get('category').setValue(chngelogData.ctgry_id);
      // this.formChangeLog.get('Description').setValue(chngelogData.chng_lg_txt);
    } else {
      this.sideBarHeader = 'Add New';
      this.editClicked = false;
      this.deleteChngelog = false;
      this.formChangeLog.get('Dte').setValue('');
      this.formChangeLog.get('version').setValue('');
      this.formChangeLog.get('cmpnt').setValue('');
      this.formChangeLog.get('category').setValue('');
      // this.formChangeLog.get('Description').setValue('');
    }


    this._dsSidebarService.getSidebar(key).toggleOpen();
  }


  saveChangLog() {
    //  this.newentry(); 
    console.log(this.editClicked);
    if (this.editClicked == false) {
      this.snackBar.open("Sucessfully Added", 'End now', {
        duration: 3000,
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      });
      this.newentry();
    } else if (this.deleteChngelog == true) {

      this.delete(this.updateData);

    } else {
      this.update(this.updateData);
    }
  }


  update(data) {
    console.log(this.formChangeLog.value);
    console.log(data);
    // return;

    let rte = "user/updchangelog";
    this.usrdtls = JSON.parse(localStorage.getItem('usrDtls'));

    let chngelogDta = {
      chng_lg_id: data.chng_lg_id,
      chng_lg_dt: this.formChangeLog.value.Dte,
      vrsn_nu: this.formChangeLog.value.version,
      ctgry_id: this.formChangeLog.value.category,
      cmpnt_id: this.formChangeLog.value.cmpnt,
      // chng_lg_txt: this.formChangeLog.value. Description
    };

    this.crdsrv.create(chngelogDta, rte).subscribe((res) => {
      if (res['status'] == 200) {
        this.snackBar.open("Sucessfully Added", 'End now', {
          duration: 3000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
        this.getchngLogLst()
      }
    }, (error) => {
      console.log(error);
    });
  }


  onCellClick(event) {
    console.log(event);
    if (event.colDef.headerName == 'Edit') {
      // this.editentry(event.data);
      this.deleteChngelog = false;
      this.opensideBar('addFormPanel', event.data);

    } else if (event.colDef.headerName == 'Delete') {
      this.deleteChngelog = true;
      this.opensideBar('addFormPanel', event.data);
    }

  }

  delete(data) {
    console.log("delete");
    console.log(data);


    let changelogDelRte = `user/delchngelog/${data.chng_lg_id}`;
    this.crdsrv.delete(changelogDelRte).subscribe((res) => {


      this.confirmDialogRef = this.dialog.open(DeleteDialogComponent, {
        width: '25%',
        panelClass: 'my-class',
        data: { message: 'Are you sure deleting this item ?', id: data.chng_lg_id, nm: data.chng_lg_txt, entityname: 'change log', flag: false, rte: `user/delchngelog/${data.chng_lg_id}` }
      });

      this.confirmDialogRef.afterClosed().subscribe((response) => {
        // this.opensideBar('addFormPanel','key');
        if (response == undefined) { }
        else if (response.status == 200)
          this.getchngLogLst()
      })
    }

    )
  }


  onToolbarPreparing(e) {
    // console.log(e);
    e.toolbarOptions.items.unshift({
      location: 'after',
      widget: 'dxButton',
      options: {
        icon: 'plus',
        text: 'Add Change Log',
        onClick: this.opensideBar.bind(this, 'addFormPanel', null),
        bindingOptions: {
          'disabled': 'isEmailButtonDisabled'
        }
      }
    });
  }




}








