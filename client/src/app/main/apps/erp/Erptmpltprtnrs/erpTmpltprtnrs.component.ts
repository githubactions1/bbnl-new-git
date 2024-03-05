import { Component, OnInit,ViewChild } from '@angular/core';
import { CrudService } from 'app/main/apps/crud.service';
import { DsSidebarService } from '@glits/components/sidebar/sidebar.service';
import { AtomService } from 'app/main/services/atom.service';

@Component({
  selector: 'app-erpTmpltprtnrs',
  templateUrl: './erpTmpltprtnrs.component.html',
  styleUrls: ['./erpTmpltprtnrs.component.scss']
})
export class ErptmpltprtnrsComponent implements OnInit {
  columnDefs:any;
  gridData:any;
  initdata:any;
  gridApi;
  permissions;
   mainMessage;
   loader:boolean;
   getRowHeight = function () {return 40; }
   getHeaderDtls = function() { return {'title': this.formDetails.stngs.form_title+' List','icon':'receipt'}}
   // tslint:disable-next-line:member-ordering
   public fields: any[] = [
   { type: 'pk',name: 'tmple_prtnrs_rel_id',label: 'Template partner rel Identifier',isCustom:false,customData:{},required: false,hidden:true },
   
    // tslint:disable-next-line:max-line-length
    { type: 'dropdown',name: 'tmple_id',label: '',isCustom:true,customData:{'route':null,'input_key':null,'key':'tmple_id','label_key':'tmple_cd','label':null,'table':'erp_tmple_lst_t'},value: '',required: false,hidden:false },
    // tslint:disable-next-line:max-line-length
    { type: 'dropdown',name: 'prtnr_id',label: '',isCustom:true,customData:{'route':'erp/erpprtnrslstt','input_key':null,'key':'prtnr_id','label_key':'prtnr_nm','label':null,'table':'prtnrs_lst_t'},value: '',required: false,hidden:false },
    // tslint:disable-next-line:max-line-length
    { type: 'dropdown',name: 'ara_type_id',label: '',isCustom:true,customData:{'route':'erp/araType','input_key':null,'key':'ara_type_id','label_key':'ara_type_cd','label':null,'table':'ara_type_lst_t'},value: '',required: false,hidden:false },
    // tslint:disable-next-line:max-line-length
    { type: 'text',name: 'prcnt_ct',label: 'partner Percentage count',isCustom:false,customData:{'route':null,'input_key':null,'key':null,'label_key':null,'label':null,'table':null},value: '',required: false,hidden:false },
  ];
  // tslint:disable-next-line:member-ordering
  public formDetails : any ={ 
    fnctns  :{},
    apis    :{ 'sel_url':'erp/erpTmpltprtnrs',
               'upd_url':'erp/erpTmpltprtnrs/:tmple_prtnrs_rel_id',
               'ins_url':'erp/erpTmpltprtnrs',
               'del_url':'erp/erpTmpltprtnrs/:tmple_prtnrs_rel_id'},
    initdata:{ },
    fields  :this.fields,
    key_field:['tmple_prtnrs_rel_id'],
    stngs   :{ 'style' :'mat',
                'saveBtn':true,
                'saveAsBtn':false,
                'closeBtn':true,
                'model_style':'right',
                'form_title': ' ERP Template Partners',
                'deleteBtn':false,
                'show_lables':false,
                'oper_mode':'new'

    }
  } 
  constructor(private _dsSidebarService: DsSidebarService, public crdsrv: CrudService,public atmSrv:AtomService) {
    this.initdata= {} 
    this.permissions={ 'slct_in': 1, 'insrt_in': 0, 'updt_in': 0, 'dlte_in': 0, 'exprt_in': 0 }
  }
  ngOnInit() {
    this.atmSrv.dropDownData.subscribe((data) => {
      this.getDependedFieldsData(data);
    });
    this.getGridData();
    this.getFieldsCustomData();
    this.getUsrPermissions();
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

  // tslint:disable-next-line:member-ordering
  user: any = {
    permissions: { 'slct_in': 1, 'insrt_in': 0, 'updt_in': 0, 'dlte_in': 0, 'exprt_in': 0 },
    'perm_url': 'user/permissions/ERP Template Partners'
  };

  getUsrPermissions(): any {
    this.mainMessage = null;
    this.crdsrv.get(this.user.perm_url).subscribe((res) => {
     if (res['status'] == 200) {
        if (res['data'].length)
        {this.user.permissions = res['data'][0]; 
      console.log(this.user.permissions );}
        if (this.user.permissions.slct_in === 1) {
          this.getGridData();
        } else
          {this.mainMessage = 'You do not have permissions to do this operation. Please contact Administrator to get permissions.'; }
      }
    });
  }

  getGridData() {
    this.loader=true;
    this.crdsrv.get(this.formDetails.apis.sel_url).subscribe((res) => {
      if (res['status'] == 200) {
        this.loader=false;
        this.permissions=(res['perm']===undefined) ? this.permissions:res['perm'][0];
        if(this.permissions.slct_in==0) this.mainMessage='You do not have permissions to do this operation. Please contact Administrator to get permissions.'
        if(res['data'].length==0)       this.mainMessage='No entries found in the database.'
        
        this.gridData = res['data'];
          this.columnDefs = [
          { headerName: 'Sno', field: 'sno', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 100,sortable: true,filter: false },
          // tslint:disable-next-line:max-line-length
          { headerName: 'Template partner rel Identifier', field: 'tmple_prtnrs_rel_id', hide: true, alignment: 'center', cellClass: 'pm-grid-number-cell', width: 100 }, 
          { headerName: 'Template', field: 'tmple_cd' , alignment: 'left', cellClass: 'pm-grid-number-cell', width: 265, sortable: true,filter:true },
          { headerName: 'Partner', field: 'prtnr_nm' , alignment: 'left', cellClass: 'pm-grid-number-cell', width: 265, sortable: true,filter:true },
          { headerName: 'Area', field: 'ara_type_cd' , alignment: 'left', cellClass: 'pm-grid-number-cell', width: 265, sortable: true,filter:true },
          // tslint:disable-next-line:max-line-length
          { headerName: 'Partner Percentage(%)', field: 'prcnt_ct' , alignment: 'right', cellClass: 'pm-grid-number-cell', width: 265, sortable: true,filter:true },
     ];

      }
      // else if (res['status'] == 404) {
      //   this.permissions={ 'slct_in': 0, 'insrt_in': 0, 'updt_in': 0, 'dlte_in': 0, 'exprt_in': 0 }
      // }
    })
  }
formEventTriggered(evetData){
  if(evetData.dataUpdated)
    {this.getGridData(); }
  if(evetData.closeForm){
      this._dsSidebarService.getSidebar('addFormPanel').toggleOpen();
  }   
}
  addNewEntry() {
    this.formDetails.stngs.oper_mode='new';
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
        this.formDetails.stngs.oper_mode='edit'
        this.openSideBar();
  }
  onDelete2(event){
        this.formDetails.initdata=event.data;
        this.initdata=event.data; 
        this.getDependedFieldsData(this.initdata)
        this.formDetails.stngs.deleteBtn=true;
        this.formDetails.stngs.saveBtn=false;
        this.formDetails.stngs.oper_mode='delete'
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
  onToolbarPreparing(e): any {
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
