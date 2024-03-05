import { Component, OnInit,ViewChild } from '@angular/core';
import { CrudService } from 'app/main/apps/crud.service';
import { DsSidebarService } from '@glits/components/sidebar/sidebar.service';
import { ExportService} from 'app/main/services/export.service';

@Component({
  selector: 'app-appstore-list',
  templateUrl: './appstore-list.component.html',
  styleUrls: ['./appstore-list.component.scss']
})
export class AppstoreListComponent implements OnInit {
  columnDefs:any;
  gridData:any;
  initdata:any;
  gridApi;
  permissions;
   mainMessage;
   getRowHeight = function () {return 40; }
   getHeaderDtls = function() { return {"title": this.formDetails.stngs.form_title+" List","icon":"receipt"}}
  public fields: any[] = [
    { type: 'text',name: 'app_stre_id',label: 'Store Identifier',value: '',required: false,hidden:true},
    { type: 'text',name: 'app_stre_nm',label: 'Store Name',value: '',required: true,},
    { type: 'text',name: 'app_stre_dscn_tx',label: 'Store description',multiline:true,rowcount:6,value: '',required: true,}
  ];
  public formDetails : any ={
                            fnctns  :{},
                            apis    :{ "sel_url":"appstore/store",
                                       "upd_url":"appstore/store/:app_stre_id",
                                       "ins_url":"appstore/store",
                                       "del_url":"appstore/store/:app_stre_id"},
                            initdata:{ },
                            fields  :this.fields,
                            key_field:["app_stre_id"],
                            stngs   :{ "style" :"mat",
                                        "saveBtn":true,
                                        "saveAsBtn":false,
                                        "closeBtn":true,
                                        "model_style":"right",
                                        "form_title":"AppStore",
                                        "deleteBtn":false,
                                        "show_lables":false,
                                        "oper_mode":"new"

                            }
                          } 
  constructor(private _dsSidebarService: DsSidebarService, public crdsrv: CrudService,private exportService:ExportService ) {
    this.initdata= {} 
    this.permissions={ "slct_in": 1, "insrt_in": 0, "updt_in": 0, "dlte_in": 0, "exprt_in": 0 }
  }
  ngOnInit() {
    this.getGridData();
  }
  getGridData() {
    this.crdsrv.get(this.formDetails.apis.sel_url).subscribe((res) => {
      if (res['status'] == 200) {
        this.permissions=(res['perm']===undefined) ? this.permissions:res['perm'][0];
        if(this.permissions.slct_in==0) this.mainMessage="You do not have permissions to do this operation. Please contact Administrator to get permissions."
        if(res['data'].length==0)       this.mainMessage="No entries found in the database."
        
        this.gridData = res['data'];
        this.columnDefs = [
          { headerName: 'Sno', field: 'sno', cellStyle: { 'text-align': "center" }, cellClass: "pm-grid-number-cell", width: 60,sortable: true,filter: false },
          { headerName: 'APP ID', field:'app_stre_id', hide:true, cellStyle: { 'text-align': "center" }, cellClass: "pm-grid-number-cell", width: 100 },
          { headerName: 'Store Name', field: 'app_stre_nm', cellStyle: { 'text-align': "center" }, cellClass: "pm-grid-number-cell", width: 265 ,sortable: true,filter: true},
          { headerName: 'Description', field: 'app_stre_dscn_tx', cellStyle: { 'text-align': "left" }, cellClass: "pm-grid-number-cell", width: 500 ,sortable: true,filter: true},
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

}
