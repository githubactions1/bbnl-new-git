import { Component, OnInit } from '@angular/core';
import { DsSidebarService } from '../../../@glits/components/sidebar/sidebar.service';
import { MatSnackBar, MatDialog, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material';
import { CrudService } from '../apps/crud.service';
import { Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { TransfereService } from '../../providers/transfer/transfer.service';
import { DatePipe } from '@angular/common';
import { Dataservice } from '../shared/components/dataService';

@Component({
  selector: 'app-external-api',
  templateUrl: './external-api.component.html',
  styleUrls: ['./external-api.component.scss']
})
export class ExternalApiComponent implements OnInit {
  extapifrm: FormGroup;
  entitylst: any;
  rowData: any;
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  searchLoader: boolean = false;
  columnDefs=[];
  showTble = false;
  actionlst: any;
  statuslst: any;
  getRowHeight;
  permissions
  columnDefs2: { headerName: string; field: string; cellStyle: { 'text-align': string; }; cellClass: string; width: number; filter: boolean; }[];
  constructor(public _dsSidebarService: DsSidebarService, private _formBuilder: FormBuilder, private crdsrv: CrudService,
     private datePipe: DatePipe, public dataService: Dataservice,
    private snackBar: MatSnackBar, public dialog: MatDialog, private route: Router, public TransfereService: TransfereService) { 
      let rowHeight = 40;
    this.getRowHeight = function (params) {
      return rowHeight;
    };
    this.permissions = { "slct_in": 1, "insrt_in": 0, "updt_in": 1, "dlte_in": 1, "exprt_in": 1 };
    }

  ngOnInit() {
    this.extapifrm = this._formBuilder.group({
      entity: ['',Validators.required],
      entyid: ['', Validators],
      action: ['', Validators],
      status: ['', Validators],
      
      str_dt: ['', Validators],
      end_dt: ['', Validators],
      till_dt: ['', Validators],
  
    });
    this.getentity()
   
  }
  getentity(){
    const rte = `entity/entity`;
    this.crdsrv.get(rte).subscribe((res) => {
      this.entitylst = res['data'];
      console.log(this.entitylst)
    })
  }
  onentityselect(){
    this.getactions()
    this.getstatus()
  }
  getactions(){
    console.log(this.extapifrm.value.entity)
    const rte = `entity/actions/`+ this.extapifrm.value.entity;
    this.crdsrv.get(rte).subscribe((res) => {
      this.actionlst = res['data'];
      console.log(this.actionlst)
    })
  }
  getstatus(){
    console.log(this.extapifrm.value.entity)
    const rte = `entity/status/`+ this.extapifrm.value.entity;
    this.crdsrv.get(rte).subscribe((res) => {
      this.statuslst = res['data'];
      console.log(this.statuslst)
    })
  }
  getDetails() {

    
    if(this.extapifrm.value.entity !="" ){
      if (this.extapifrm.value['till_dt'] == true) {
        this.searchLoader = true;
        var data = {
          entity: this.extapifrm.value['entity'],
          entyid: this.extapifrm.value['entyid'],
          action: this.extapifrm.value['action'],
          status: this.extapifrm.value['status'],
          till_dt: this.datePipe.transform(new Date(), 'dd/MM/yyyy'),
          
        }
        const rte = `entity/extapidtls`
        console.log(rte)
        this.crdsrv.create(data,rte).subscribe(res => {
          this.rowData = res["data"]
          this.searchLoader = false;
          if (res["data"]) {
            this.showTble = true
  
          }
  
        })
  
      } else {
        this.searchLoader = true;
        this.extapifrm.value['str_dt'] = this.datePipe.transform(this.extapifrm.value.str_dt, 'yyyy-MM-dd');
        this.extapifrm.value['end_dt'] = this.datePipe.transform(this.extapifrm.value.end_dt, 'yyyy-MM-dd');
        var Data = {
          entity: this.extapifrm.value['entity'],
          entyid: this.extapifrm.value['entyid'],
          action: this.extapifrm.value['action'],
          status: this.extapifrm.value['status'],
          str_dt: this.extapifrm.value['str_dt'],
          end_dt: this.extapifrm.value['end_dt'],
        }
        this.crdsrv.create(Data, "entity/extapidtls").subscribe(res => {
          console.log(res["data"])
          this.rowData = res["data"]
          this.searchLoader = false;
          if (res["data"]) {
            this.showTble = true
          }
          let counter = 0;
        this.rowData.filter((k) => {
          k['s_no'] = ++counter;
        });
          console.log(this.rowData)
        })
      }
    }else{
      this.snackBar.open('please Select atleast entity', 'Undo', {
        duration: 3000,
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      });
    }
    
    console.log(this.extapifrm.value)
    this.columnDefs = [
      { headerName: 'Sno', field: 's_no', cellStyle: { 'text-align': "center" }, cellClass: "pm-grid-number-cell", width: 100, filter: false, search: false },
      { headerName: 'Api Request Id', field: 'api_rqst_id', cellStyle: { 'text-align': "left" }, cellClass: "pm-grid-number-cell", width: 150, filter: true },
      { headerName: 'Request Discription', field: 'rqst_dscn_tx', cellStyle: { 'text-align': "left" }, cellClass: "pm-grid-number-cell", width: 250, filter: true },
      { headerName: 'Action', field: 'actn_nm', cellStyle: { 'text-align': "left" }, cellClass: "pm-grid-number-cell", width: 200, filter: true },
      { headerName: 'Entity Name', field: 'enty_nm', cellStyle: { 'text-align': "left" }, cellClass: "pm-grid-number-cell", width: 250, filter: true },
      { headerName: 'Entity Id', field: 'enty_ky', cellStyle: { 'text-align': "left" }, cellClass: "pm-grid-number-cell", width: 150, filter: true },
      { headerName: 'Status', field: 'api_sts_nm', cellStyle: { 'text-align': "left" }, cellClass: "pm-grid-number-cell", width: 150, filter: true },
      { headerName: 'Request Date', field: 'rqst_date', cellStyle: { 'text-align': "left" }, cellClass: "pm-grid-number-cell", width: 150, filter: true },
      { headerName: 'Request Time', field: 'rqst_time', cellStyle: { 'text-align': "left" }, cellClass: "pm-grid-number-cell", width: 150, filter: true },
      { headerName: 'Request Created By', field: 'agnt_cd', cellStyle: { 'text-align': "left" }, cellClass: "pm-grid-number-cell", width: 150, filter: true },
    ];
    // this.columnDefs2= [
    //   { headerName: 'External Application Name', field: 'extrl_aplcn_nm', cellStyle: { 'text-align': "left" }, cellClass: "pm-grid-number-cell", width: 150, filter: true },
    //   { headerName: 'URL', field: 'url_tx', cellStyle: { 'text-align': "left" }, cellClass: "pm-grid-number-cell", width: 150, filter: true },
    //   { headerName: 'URL Data', field: 'url_dta_tx', cellStyle: { 'text-align': "left" }, cellClass: "pm-grid-number-cell", width: 250, filter: true },
    //   { headerName: 'Status', field: 'api_sts_nm', cellStyle: { 'text-align': "left" }, cellClass: "pm-grid-number-cell", width: 150, filter: true },
    //   { headerName: 'Method', field: 'mthd_nm', cellStyle: { 'text-align': "left" }, cellClass: "pm-grid-number-cell", width: 150, filter: true },
    //   { headerName: 'Retry Count', field: 'rttv_cnt', cellStyle: { 'text-align': "left" }, cellClass: "pm-grid-number-cell", width: 250, filter: true },
    // ];

  }
  onCellClick(data){
    console.log(data.row.data)
    this.TransfereService.setLoclData('api',data.row.data)
    this.route.navigate([`admin/api-request-detail`])
  }
  // onretryClick(data){
  //   console.log(data)
  // }


}
