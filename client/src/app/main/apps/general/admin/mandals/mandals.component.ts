import { Component, OnInit,ViewChild } from '@angular/core';
import { CrudService } from 'app/main/apps/crud.service';
import { DsSidebarService } from '@glits/components/sidebar/sidebar.service';
import { AtomService } from 'app/main/services/atom.service';

@Component({
  selector: 'app-mandals',
  templateUrl: './mandals.component.html',
  styleUrls: ['./mandals.component.scss']
})
export class MandalsComponent implements OnInit {
  columnDefs:any;
  gridData:any;
  initdata:any;
  gridApi;
  permissions;
   mainMessage;
   loader:boolean;
   getRowHeight = function () {return 40; }
   getHeaderDtls = function() { return {"title": this.formDetails.stngs.form_title+" List","icon":"receipt"}}
   public fields: any[] = [
   { type: 'pk',name: 'mndl_id',label: 'Sub-District Identifier',isCustom:false,customData:{},required: false,hidden:true },
   
    { type: 'dropdown',name: 'ste_id',label: 'state',isCustom:true,customData:{"route":"admin/states","input_key":null,"key":"ste_id","label_key":"ste_nm","label":"state","table":"ste_lst_t"},value: '',required: false,hidden:false },
    { type: 'dropdown',name: 'dstrt_id',label: 'District',isCustom:true,customData:{"route":"admin/states/ste_id/districts","input_key":"ste_id","key":"dstrt_id","label_key":"dstrt_nm","label":"District","table":"dstrt_lst_t"},value: '',required: false,hidden:false },
    { type: 'text',name: 'mndl_nm',label: 'Sub District Name',isCustom:false,customData:{"route":null,"input_key":null,"key":null,"label_key":null,"label":"mandal","table":null},value: '',required: false,hidden:false },  
    { type: 'textarea',name: 'mndl_shrt_nm',label: '',isCustom:false,customData:{"route":null,"input_key":null,"key":null,"label_key":null,"label":null,"table":null},multiline:true,rowcount:6,value: '',required: false,hidden:false },
    { type: 'text',name: 'mndl_cd',label: 'Sub District Code',isCustom:false,customData:{"route":null,"input_key":null,"key":null,"label_key":null,"label":null,"table":null},value: '',required: false,hidden:false },
  ];
  public formDetails : any ={ 
    fnctns  :{},
    apis    :{ "sel_url":"admin/mandals",
               "upd_url":"admin/mandals/:mndl_id",
               "ins_url":"admin/mandals",
               "del_url":"admin/mandals/:mndl_id"},
    initdata:{ },
    fields  :this.fields,
    key_field:["mndl_id"],
    stngs   :{ "style" :"mat",
                "saveBtn":true,
                "saveAsBtn":false,
                "closeBtn":true,
                "model_style":"right",
                "form_title":" Mandal",
                "deleteBtn":false,
                "show_lables":false,
                "oper_mode":"new"

    }
  } 
  constructor(private _dsSidebarService: DsSidebarService, public crdsrv: CrudService,public atmSrv:AtomService) {
    this.initdata= {} 
    this.permissions={ "slct_in": 1, "insrt_in": 0, "updt_in": 0, "dlte_in": 0, "exprt_in": 0 }
  }
  ngOnInit() {
    this.atmSrv.dropDownData.subscribe((data) => {
      this.getDependedFieldsData(data);
    });
    this.getUsrPermissions();
    this.getFieldsCustomData();
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


  user: any = {
    permissions: { 'slct_in': 0, 'insrt_in': 0, 'updt_in': 0, 'dlte_in': 0, 'exprt_in': 0 },
    'perm_url': 'user/permissions/Mandals Creation'
  }
  getUsrPermissions(): any {
    this.mainMessage = null;
    this.crdsrv.get(this.user.perm_url).subscribe((res) => {
      console.log(res['data']);
     if (res['status'] == 200) {
        if (res['data'].length)
        this.user.permissions = res['data'][0];
        if (this.user.permissions.slct_in === 1) {
          this.getGridData();
        } else
          this.mainMessage = 'You do not have permissions to do this operation. Please contact Administrator to get permissions.';
      }
    });
  }
  getGridData() {
    this.loader=true;
    this.crdsrv.get(this.formDetails.apis.sel_url).subscribe((res) => {
      if (res['status'] == 200) {
        this.loader=false;
        this.permissions=(res['perm']===undefined) ? this.permissions:res['perm'][0];
        if(this.user.permissions.slct_in==0) this.mainMessage="You do not have permissions to do this operation. Please contact Administrator to get user.permissions."
        if(res['data'].length==0)       this.mainMessage="No entries found in the database."
        
        this.gridData = res['data'];
          this.columnDefs = [
          { headerName: 'Sno', field: 'sno', cellStyle: { 'text-align': "center" }, cellClass: "pm-grid-number-cell", width: 100,sortable: true,filter: false },
          { headerName: 'Sub-District Identifier', field:'mndl_id', hide:true, cellStyle: { 'text-align': "center" }, cellClass: "pm-grid-number-cell", width: 100 }, 
          { headerName: 'state',field: 'ste_nm' , cellStyle: { 'text-align': "left" }, cellClass: "pm-grid-number-cell", width: 265, sortable: true,filter:true },
          { headerName: 'District',field: 'dstrt_nm' , cellStyle: { 'text-align': "left" }, cellClass: "pm-grid-number-cell", width: 265, sortable: true,filter:true },
          { headerName: 'Sub District Name',field: 'mndl_nm' , cellStyle: { 'text-align': "left" }, cellClass: "pm-grid-number-cell", width: 265, sortable: true,filter:true },
          { headerName: '',field: 'mndl_shrt_nm' , cellStyle: { 'text-align': "left" }, cellClass: "pm-grid-number-cell", width: 265, sortable: true,filter:true },
          { headerName: 'Sub District Code',field: 'mndl_cd' , cellStyle: { 'text-align': "left" }, cellClass: "pm-grid-number-cell", width: 265, sortable: true,filter:true },
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
  onEdit2(event){
       
        this.formDetails.initdata=event.data;
        this.initdata=event.data; 
        this.getDependedFieldsData(this.initdata)
        this.formDetails.stngs.deleteBtn=false;
        this.formDetails.stngs.saveBtn=true;
        this.formDetails.stngs.oper_mode="edit"
        this.openSideBar();
  }
  onDelete2(event){
        this.formDetails.initdata=event.data;
        this.initdata=event.data; 
        this.getDependedFieldsData(this.initdata)
        this.formDetails.stngs.deleteBtn=true;
        this.formDetails.stngs.saveBtn=false;
        this.formDetails.stngs.oper_mode="delete"
        this.openSideBar();
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
        text: 'Add New' + this.formDetails.stngs.form_title,
        onClick: this.addNewEntry.bind(this, 'new'),
        bindingOptions: {
          'disabled': 'isEmailButtonDisabled'
        }
      }
    });
  }
}
