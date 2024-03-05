import { Component, OnInit,ViewChild } from '@angular/core';
import { CrudService } from 'app/main/apps/crud.service';
import { DsSidebarService } from '@glits/components/sidebar/sidebar.service';


@Component({
  selector: 'app-organisations',
  templateUrl: './organisations.component.html',
  styleUrls: ['./organisations.component.scss']
})
export class OrganisationsComponent implements OnInit {
  columnDefs:any;
  gridData:any;
  initdata:any;
  gridApi;
  permissions;
  loader:boolean;
   mainMessage;
   getRowHeight = function () {return 40; }
   getHeaderDtls = function() { return {"title": this.formDetails.stngs.form_title+" List","icon":"receipt"}}
   public fields: any[] = [
    { type: 'pk',name: 'orgn_id',label: 'Organization identifier',isCustom:false,customData:{"route":null,"input_key":null,"key":"","label_key":"","label":"","table":null},value: '',required: false,hidden:false },
    { type: 'text',name: 'orgn_nm',label: 'Organization name',isCustom:false,customData:{"route":null,"input_key":null,"key":"","label_key":"","label":"","table":null},value: '',required: false,hidden:false },  
    { type: 'textarea',name: 'wb_url_tx',label: 'Website url',isCustom:false,customData:{"route":null,"input_key":null,"key":"","label_key":"","label":"","table":null},multiline:true,rowcount:6,value: '',required: false,hidden:true },  
    { type: 'textarea',name: 'addr1_tx',label: 'Address1',isCustom:false,customData:{"route":null,"input_key":null,"key":"","label_key":"","label":"","table":null},multiline:true,rowcount:6,value: '',required: false,hidden:true },  
    { type: 'textarea',name: 'addr2_tx',label: 'Address 2',isCustom:false,customData:{"route":null,"input_key":null,"key":"","label_key":"","label":"","table":null},multiline:true,rowcount:6,value: '',required: false,hidden:true },
    { type: 'text',name: 'city_nm',label: 'City Name',isCustom:false,customData:{"route":null,"input_key":null,"key":"","label_key":"","label":"","table":null},value: '',required: false,hidden:false },
    { type: 'text',name: 'cntct_nm',label: 'Primary contact name',isCustom:false,customData:{"route":null,"input_key":null,"key":"","label_key":"","label":"","table":null},value: '',required: false,hidden:false },
    { type: 'text',name: 'cntct_ph',label: 'Primary Contact Phone Number',isCustom:false,customData:{"route":null,"input_key":null,"key":"","label_key":"","label":"","table":null},value: '',required: false,hidden:false },
  ];
  public formDetails : any ={ 
    fnctns  :{},
    apis    :{ "sel_url":"admin/organisations",
               "upd_url":"admin/organisations/:orgn_id",
               "ins_url":"admin/organisations",
               "del_url":"admin/organisations/:orgn_id"},
    initdata:{ },
    fields  :this.fields,
    key_field:["orgn_id"],
    stngs   :{ "style" :"mat",
                "saveBtn":true,
                "saveAsBtn":false,
                "closeBtn":true,
                "model_style":"right",
                "form_title":" Organisations",
                "deleteBtn":false,
                "show_lables":false,
                "oper_mode":"new"

    }
  } 
  constructor(private _dsSidebarService: DsSidebarService, public crdsrv: CrudService) {
    this.initdata= {} 
    this.permissions={ "slct_in": 1, "insrt_in": 0, "updt_in": 0, "dlte_in": 0, "exprt_in": 0 }
  }
  ngOnInit() {
    this.getUsrPermissions();
  }

 
  user: any = {
    permissions: { 'slct_in': 0, 'insrt_in': 0, 'updt_in': 0, 'dlte_in': 0, 'exprt_in': 0 },
    'perm_url': 'user/permissions/Organization Creation'
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
          { headerName: 'Sno', field: 'sno', alignment: 'center', cellClass: "pm-grid-number-cell", width: 100,sortable: true,filter: false },
          { headerName: 'Organization identifier', field:'orgn_id', hide:true, alignment: 'center', cellClass: "pm-grid-number-cell", width: 100 }, 
          { headerName: 'Organization identifier', field: 'orgn_id', alignment: 'left', cellClass: "pm-grid-number-cell", width: 265, sortable: true,filter:true },
          { headerName: 'Organization name', field: 'orgn_nm', alignment: 'left', cellClass: "pm-grid-number-cell", width: 265, sortable: true,filter:true },
          { headerName: 'Website url', field: 'wb_url_tx', alignment: 'left', cellClass: "pm-grid-number-cell", width: 265, sortable: true,filter:true },
          { headerName: 'Address1', field: 'addr1_tx', alignment: 'left', cellClass: "pm-grid-number-cell", width: 265, sortable: true,filter:true },
          { headerName: 'Address 2', field: 'addr2_tx', alignment: 'left', cellClass: "pm-grid-number-cell", width: 265, sortable: true,filter:true },
          { headerName: 'City Name', field: 'city_nm', alignment: 'left', cellClass: "pm-grid-number-cell", width: 265, sortable: true,filter:true },
          { headerName: 'Primary contact name', field: 'cntct_nm', alignment: 'left', cellClass: "pm-grid-number-cell", width: 265, sortable: true,filter:true },
          { headerName: 'Primary Contact Phone Number', field: 'cntct_ph', alignment: 'left', cellClass: "pm-grid-number-cell", width: 265, sortable: true,filter:true },
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
        this.formDetails.stngs.deleteBtn=false;
        this.formDetails.stngs.saveBtn=true;
        this.formDetails.stngs.oper_mode="edit"
        this.openSideBar();
  }
  onDelete2(event){
        this.formDetails.initdata=event.data;
        this.initdata=event.data; 
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
