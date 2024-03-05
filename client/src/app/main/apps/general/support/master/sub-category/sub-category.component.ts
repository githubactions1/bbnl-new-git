import { Component, OnInit,ViewChild } from '@angular/core';
import { CrudService } from 'app/main/apps/crud.service';
import { DsSidebarService } from '@glits/components/sidebar/sidebar.service';
import { AtomService } from 'app/main/services/atom.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import {
  MatTableDataSource, MatPaginator, MatSort, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition, MatDialogRef, MatSnackBar, MatDialog,
  MAT_DIALOG_DATA
} from '@angular/material';

import { DeleteDialogComponent } from 'app/main/shared/components/delete-dialog/delete-dialog.component';
@Component({
  selector: 'app-sub-category',
  templateUrl: './sub-category.component.html',
  styleUrls: ['./sub-category.component.scss']
})
export class SubCategoryComponent implements OnInit {
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  confirmDialogRef: MatDialogRef<DeleteDialogComponent>;

  columnDefs:any;
  gridData:any;
  initdata:any;
  gridApi;
  sbCtgryForm: FormGroup;
  permissions;
   mainMessage;
   getRowHeight = function () {return 40; }
   getHeaderDtls = function() { return {"title": this.formDetails.stngs.form_title,"icon":"receipt"}}
   public fields: any[] = [
   { type: 'pk',name: 'tckt_sb_ctgry_id',label: 'Ticket Sub Category Identifier',isCustom:false,customData:{},required: false,hidden:true },
   
    { type: 'text',name: 'tckt_sb_ctgry_nm',label: 'Ticket Sub Category Name',isCustom:false,customData:{"route":null,"input_key":null,"key":null,"label_key":null,"label":null,"table":null},value: '',required: false,hidden:false },
    { type: 'dropdown',name: 'tckt_ctgry_id',label: 'Ticket Category Name',isCustom:true,customData:{"route":"support/Category","input_key":"tckt_ctgry_id","key":"tckt_ctgry_nm","label_key":"tckt_ctgry_nm","label":"Ticket Category Name","table":"sprt_tckt_ctgry_lst_t"},value: '',required: false,hidden:false },
  ];
  public formDetails : any ={ 
    fnctns  :{},
    apis    :{ "sel_url":"support/Sub-Category",
               "upd_url":"support/Sub-Category/:tckt_sb_ctgry_id",
               "ins_url":"support/Sub-Category",
               "del_url":"support/Sub-Category/:tckt_sb_ctgry_id"},
    initdata:{ },
    fields  :this.fields,
    key_field:["tckt_sb_ctgry_id"],
    stngs   :{ "style" :"mat",
                "saveBtn":true,
                "saveAsBtn":false,
                "closeBtn":true,
                "model_style":"right",
                "form_title":"Sub-Category",
                "deleteBtn":false,
                "show_lables":false,
                "oper_mode":"new"

    }
  } 
  leftsidebarHdng: string;
  tcktCtgryLst: any;
  editData: any;
  editClicked: boolean;
  deleteEmplye: boolean;
  constructor(private _dsSidebarService: DsSidebarService, public crdsrv: CrudService,public dialog: MatDialog,public snackBar: MatSnackBar,public atmSrv:AtomService) {
    this.initdata= {} 
    this.permissions={ "slct_in": 1, "insrt_in": 1, "updt_in": 0, "dlte_in": 0, "exprt_in": 0 }
  }
  ngOnInit() {
    this.atmSrv.dropDownData.subscribe((data) => {
      this.getDependedFieldsData(data);
    });
    this.getGridData();
    this.getFieldsCustomData();

    this.sbCtgryForm = new FormGroup({
      tckt_sb_ctgry_nm: new FormControl(''),
      tckt_ctgry_id: new FormControl('', Validators.required)
    });
  }
  getFieldsCustomData() {
    this.fields.forEach(element => {
      if (element.isCustom) {
        let eleData = this.getCustomData(element.customData)
        element['options'] = eleData;
      }
    });
    console.log(this.fields)
  }
  getCustomData(customData) {
    let options = [];
    if (customData.input_key == null) {
      this.crdsrv.get(customData.route).subscribe((res) => {
        let data = res['data']
        data.forEach(element => {
          options.push({
            key: element[customData.key],
            label: element[customData.label_key]
          })
        });
      })
      return options;
    } else {
      return options;
    }

  }
  getGridData() {
    this.crdsrv.get(this.formDetails.apis.sel_url).subscribe((res) => {
      if (res['status'] == 200) {
        this.permissions=(res['perm']===undefined) ? this.permissions:res['perm'][0];
        if(this.permissions.slct_in==0) this.mainMessage="You do not have permissions to do this operation. Please contact Administrator to get permissions."
        if(res['data'].length==0)       this.mainMessage="No entries found in the database."
        
        this.gridData = res['data'];
          this.columnDefs = [
          { headerName: 'Sno', field: 'sno', cellStyle: { 'text-align': "center" }, cellClass: "pm-grid-number-cell", width: 100,sortable: true,filter: false },
          { headerName: 'Ticket Sub Category Identifier', field:'tckt_sb_ctgry_id', hide:true, cellStyle: { 'text-align': "center" }, cellClass: "pm-grid-number-cell", width: 100 }, 
          { headerName: 'Ticket Sub Category Name',field: 'tckt_sb_ctgry_nm' , cellStyle: { 'text-align': "left" }, cellClass: "pm-grid-number-cell", width: 265, sortable: true,filter:true },
          { headerName: 'Ticket Category Name',field: 'tckt_ctgry_nm' , cellStyle: { 'text-align': "left" }, cellClass: "pm-grid-number-cell", width: 265, sortable: true,filter:true },
     ];

      }else if (res['status'] == 404) {
        this.permissions={ "slct_in": 0, "insrt_in": 0, "updt_in": 0, "dlte_in": 0, "exprt_in": 0 }
      }
    })
  }
formEventTriggered(evetData){
  if(evetData.dataUpdated)
    this.getGridData();
  if(evetData.closeForm){
      this._dsSidebarService.getSidebar('addFormPanel').toggleOpen();
  }   
}
  addNewEntry() {
    this.formDetails.stngs.oper_mode="new";
    this.formDetails.initdata={}
    this.formDetails.stngs.deleteBtn=false;
    this.formDetails.stngs.saveBtn=true;
    this.initdata={}
    this.openSideBar();
  }
  onEdit2(event) {
    this.editData = event.data
    console.log(this.editData)
    this.editClicked = true;
    this.deleteEmplye = false;
    let name = 'addFormPanel'
    this.openSideBar1(name, 'edit', this.editData);
  }
  onDelete2(event) {
    let delData = event.data
    this.delete(delData)
  }
  
  openSideBar =function() {
    this._dsSidebarService.getSidebar('addFormPanel').toggleOpen();
  }
  closeSideBar =function() {
    this._dsSidebarService.getSidebar('addFormPanel').toggleOpen();
  }
  getDependedFieldsData(data: any) {
    this.fields.forEach(element => {
      if (element.isCustom) {
        if (data.hasOwnProperty(element.customData.input_key)) {
          element['options'] = [];
          let rte = element.customData.route.replace(element.customData.input_key, data[element.customData.input_key])
          this.crdsrv.get(rte).subscribe((res) => {
            let data = res['data'];
            console.log(data)
            data.forEach(d => {
              element['options'].push({
                key: d[element.customData.key],
                label: d[element.customData.label_key]
              })
            })
          })
        }
      }
    });

  }

  onToolbarPreparing(e) {
    // console.log(e);
      e.toolbarOptions.items.unshift({
        location: 'after',
        widget: 'dxButton',
        options: {
            icon: 'plus',
            text: 'Add New ' + this.formDetails.stngs.form_title,
            onClick: this.openSideBar1.bind(this, 'addFormPanel', 'new'),
            // this.onCellClick( this.selectedUsers),
            bindingOptions: {
              'disabled': 'isEmailButtonDisabled'
            }
        }
    });
}

openSideBar1(key, value, data) {
  if (value == 'new') {
    this.leftsidebarHdng = 'Add New Sub-Category'
    this._dsSidebarService.getSidebar(key).toggleOpen();
    this.editClicked = false;
    this.deleteEmplye = false;
    this.get_tcktctgry();
    this.sbCtgryForm.reset();
    this.sbCtgryForm.get('tckt_sb_ctgry_nm').setValue('');
    this.sbCtgryForm.get('tckt_ctgry_id').setValue('');
  }
  else if (value == 'edit') {
    this.leftsidebarHdng = 'Edit Sub-Category'
    this.editClicked = true;
    this._dsSidebarService.getSidebar(key).toggleOpen();
    this.get_tcktctgry()
    this.sbCtgryForm.get('tckt_sb_ctgry_nm').setValue(data.tckt_sb_ctgry_nm);
    this.sbCtgryForm.get('tckt_ctgry_id').setValue(data.tckt_ctgry_id);
    
  }
  else {
    this._dsSidebarService.getSidebar(key).toggleOpen();
  }
}
get_tcktctgry()
{
  console.log("ticket category")
  let rte1 = 'support/Category'
  this.crdsrv.get(rte1).subscribe((res) => {
    console.log(res)
    this.tcktCtgryLst = res['data'];
  }, (error) => {
  });
}
savesbctgry()
{
  if (this.editClicked == true) {
    let edtdata = this.sbCtgryForm.value
    let rte = 'support/Sub-Category/' + this.editData.tckt_sb_ctgry_id;
    this.crdsrv.create(edtdata, rte).subscribe((res) => {
      if (res['status'] == 200) {
        this.snackBar.open("Sucessfully Updated", '', {
          duration: 3000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
        this.openSideBar1('addFormPanel', null, null);
        this.getGridData();
      }

    }, (error) => {
    });

  }
  else
  {
    let data = this.sbCtgryForm.value;
      let rte = 'support/Sub-Category'
      this.crdsrv.create(data, rte).subscribe((res) => {
        if (res['status'] == 200) {
          this.snackBar.open("Sucessfully Added", '', {
            duration: 3000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
          });
          this.openSideBar1('addFormPanel', null, null);
          this.getGridData();
        }

      }, (error) => {
      });
  }
  
}

delete(data) {
  this.confirmDialogRef = this.dialog.open(DeleteDialogComponent, {
    width: '25%',
    panelClass: 'my-class',
    data: { message: 'Are you sure deleting this item ?', id: data.tckt_sb_ctgry_id, nm: data.tckt_sb_ctgry_nm, entityname: 'Sub-Category', flag: false, rte: `support/Sub-Category/${data.tckt_sb_ctgry_id}` }
  });

  this.confirmDialogRef.afterClosed().subscribe((response) => {
    if (response == undefined) { }
    else if (response.status == 200) { this.getGridData(); }
  });
}
}
