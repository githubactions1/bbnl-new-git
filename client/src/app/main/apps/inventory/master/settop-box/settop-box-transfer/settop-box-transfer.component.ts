import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CrudService } from 'app/main/apps/crud.service';
import { debounceTime, tap, switchMap, finalize } from 'rxjs/operators';
import { MessageDialogComponent } from 'app/main/shared/components/message-dialog/message-dialog.component';
import { MatDialogRef, MatDialog, MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material';
import * as _ from 'lodash';
import CheckBox from 'devextreme/ui/check_box';
import { DeleteDialogComponent } from 'app/main/shared/components/delete-dialog/delete-dialog.component';
import { Router } from '@angular/router';
import * as XLSX from 'xlsx';
import { ExportService } from 'app/main/services/export.service';

@Component({
  selector: 'app-settop-box-transfer',
  templateUrl: './settop-box-transfer.component.html',
  styleUrls: ['./settop-box-transfer.component.scss']
})
export class SettopBoxTransferComponent implements OnInit {
  getHeaderDtls = function () { return { "title": 'CPE Allocation', "icon": "business" } }
  permissions: { "slct_in": number; "insrt_in": number; "updt_in": number; "dlte_in": number; "exprt_in": number; };
  cpeTransfrForm: FormGroup;
  agntTransfrForm: FormGroup;
  tnant_type = [];
  columnDefsUpdl = [];
  columnDefsRecnt = [];
  prdct_type: any;
  cpeAgentStock: any;
  recentCpeStock: any;
  cpeAgntGrid: boolean;
  errorMsg: string;
  filteredAgents: any[];
  filteredAgenSe: any[];
  isLoading: boolean;
  updldcard: boolean;
  confirmMsgDialogRef: MatDialogRef<MessageDialogComponent>;
  showLdr: boolean;
  uploData = []
  columnDefs:any;
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  todt: any;
  frmdt: any;
  uploadCpeStock: any;
  confirmDialogRef: MatDialogRef<DeleteDialogComponent>;
  srlnum: any;
  fileUploaded: any;
  shwrcds: boolean;
  isValid: boolean;
  storeData: any;
  worksheet: XLSX.WorkSheet;
  ExclDta = [];
  columnDefsRcrd: any;
  ttlRcds: number;
  exclGrid: boolean;
  deletebtn = true;
  mess: string;
  loader: boolean;
  datasoure: any;
  chsefle = false
  mssg = false;
  agnt_id: any;
  boxtype: any;
  agnt_ctgry_id;
  constructor(private fb: FormBuilder, public apiService: CrudService, public snackBar: MatSnackBar, public dialog: MatDialog, private router: Router, public excel: ExportService) {
    // this.permissions = { "slct_in": 1, "insrt_in": 0, "updt_in": 1, "dlte_in": 1, "exprt_in": 1 };
    this.cpeTransfrForm = this.fb.group({
      fromDt: [''],
      toDt: [''],
      tnanttype: [''],
      agnt_id: [''],
      agnt_id1: [''],
      boxtype: [''],
      srlnum: ['']
    })
    this.agntTransfrForm = this.fb.group({
      agnt: ['', Validators.required]
    });
    const permTxt = 'CPE Allocation';
    const prmeRte = `user/permissions/${permTxt}`;
    this.apiService.get(prmeRte).subscribe((res) => {
      if (res['data']){
        this.permissions = res['data'][0];
      }
    });
  }

  ngOnInit() {
    this.getTenantTypes();
    this.getCpeStockPrdct();
    this.cpeTransfrForm.get('agnt_id').valueChanges
      .pipe(
        debounceTime(500),
        tap(() => {
          this.errorMsg = "";
          this.filteredAgents = [];
          this.isLoading = true;
        }),
        switchMap((value) => {
          if (value.length >= 2) {
            if(this.cpeTransfrForm.value.tnanttype){
              return this.apiService.get(`agent/getAgentBySearchCtgr/${this.cpeTransfrForm.value.tnanttype}/${value}`)
              .pipe(
                finalize(() => {
                  this.isLoading = false
                }),
              )
            }
            else{
              return this.apiService.get(`agent/getAgentBySearchCtgr/null/${value}`)
              .pipe(
                finalize(() => {
                  this.isLoading = false
                }),
              ) 
            }


          }
          else {
            return '';
          }
        })
      )
      .subscribe(data => {
        if (data['data'] == undefined) {
          this.errorMsg = data['Error'];
          this.filteredAgents = [];
          return;
        } else {
          this.errorMsg = "";
          this.filteredAgents = data['data'];
          return;
        }

      })
    this.agntTransfrForm.get('agnt').valueChanges
      .pipe(
        debounceTime(500),
        tap(() => {
          this.errorMsg = "";
          this.filteredAgenSe = [];
          this.isLoading = true;
        }),
        switchMap((value) => {
          if (value.length >= 2) {
            return this.apiService.get('agent/getAgentBySearch/' + value)
              .pipe(
                finalize(() => {
                  this.isLoading = false
                }),
              )

          }
          else {
            return '';
          }
        })
      )
      .subscribe(data => {
        if (data['data'] == undefined) {
          this.errorMsg = data['Error'];
          this.filteredAgenSe = [];
          return;
        } else {
          this.errorMsg = "";
          this.filteredAgenSe = data['data'];
          return;
        }

      })
  }
  getTenantTypes() {
    this.apiService.get('erp/erpprtnrslstt').subscribe(res => {
      for (var i = 0; i < res['data'].length; i++) {
        if (res['data'][i].prtnr_id == 1 || res['data'][i].prtnr_id == 3 || res['data'][i].prtnr_id == 6) {
          this.tnant_type.push(res['data'][i])
        }
      }
    })
  }
  getCpeStockPrdct() {
    this.apiService.get('inventory/productList').subscribe(res => {
      this.prdct_type = res['data']
    })
  }
//   submit() {
//     this.showLdr = true;
//     console.log(this.cpeTransfrForm.value)
//     if(this.cpeTransfrForm.value.agnt_id || this.cpeTransfrForm.value.srlnum){
//       if (this.cpeTransfrForm.value.fromDt && this.cpeTransfrForm.value.toDt) {
//         var date = new Date(this.cpeTransfrForm.value.fromDt),
//           mnth = ("0" + (date.getMonth() + 1)).slice(-2),
//           day = ("0" + date.getDate()).slice(-2);
//         this.frmdt = [date.getFullYear(), mnth, day].join("-");
//         var date1 = new Date(this.cpeTransfrForm.value.toDt),
//           mnth = ("0" + (date1.getMonth() + 1)).slice(-2),
//           day = ("0" + date1.getDate()).slice(-2);
//         this.todt = [date1.getFullYear(), mnth, day].join("-");
//       }
//       else {
//         this.frmdt = 'null';
//         this.todt = 'null'
//       }
//         this.srlnum = this.cpeTransfrForm.value.srlnum || 'null'
//         this.agnt_id = this.cpeTransfrForm.value.agnt_id.agnt_id || 'null'
//         this.boxtype = this.cpeTransfrForm.value.boxtype || 'null'

//       let rte = `inventory/getAgentCpeStock/${this.agnt_id}/${this.boxtype}/${this.frmdt}/${this.todt}/${this.srlnum}`;
//       console.log(rte)
//       this.apiService.get(rte).subscribe(res => {
//         console.log(res)
//         this.cpeAgentStock = res['data']
//         this.cpeAgntGrid = true;
//         this.showLdr = false;
//       })
//       this.columnDefs = [
//         { headerName: 'S.No', field: 'sno', cellStyle: "center" , cellClass: "pm-grid-number-cell", filter: false },
//         { headerName: 'cpesrlno', field: 'srl_nu', cellStyle: "center", cellClass: "pm-grid-number-cell", filter: true },
//         { headerName: 'CPE Mac Address', field: 'mac_addr_cd', cellStyle: "center", cellClass: "pm-grid-number-cell", filter: true },
//         { headerName: 'Cpe Type', field: 'prdct_nm', cellStyle: "center", cellClass: "pm-grid-number-cell", filter: true },
//         { headerName: 'Cpe Model', field: 'mdle_nm', cellStyle: "center", cellClass: "pm-grid-number-cell" },
//         { headerName: 'Batch date', field: 'btch_ts', cellStyle: "center", cellClass: "pm-grid-number-cell" },
//         { headerName: 'mso code', field: 'mso_code', cellStyle: "center", cellClass: "pm-grid-number-cell" },
//         { headerName: 'lmo code', field: 'lmo_code', cellStyle: "center", cellClass: "pm-grid-number-cell" },
//         { headerName: 'district name', field: 'dstrt_nm', cellStyle:"center", cellClass: "pm-grid-number-cell" },
//         { headerName: 'mandal name', field: 'mndl_nm', cellStyle: "center" , cellClass: "pm-grid-number-cell" },
//         { headerName: 'village name', field: 'vlge_nm', cellStyle: "center" , cellClass: "pm-grid-number-cell" },
//         { headerName: 'Caf number', field: 'caf_id', cellStyle:"center", 'color': "red !important" }

//       ]
//   }
//   else{
//     this.confirmMsgDialogRef = this.dialog.open(MessageDialogComponent, {
//       width: '25%',
//       panelClass: 'my-class',
//       data: {
//         title: ``,
//         msg: `please select agnt_id or serial number`,
//         btnLst: [{
//           label: 'OK',
//           res: 'OK'
//         }
//         ]
//       }
//     });
//   }
// }
submit() {
  if(this.ExclDta.length>0){
    this.cpeAgentStock= []
    for(var i=0;i<this.ExclDta.length;i++){
      this.ExclDta[i]['Cpe_Serial_No'] = this.ExclDta[i]["Cpe Serial No"]
    }
    this.showLdr = true;
    let rte = `inventory/getCpeStockBySrlnum`;
    this.apiService.getbydata(rte,this.ExclDta).subscribe(res => {
      for(let i=0;i<res['data'].length;i++){
        if(res['data'][i].lmo_ctgry==null || !res['data'][i].lmo_ctgry){
          res['data'][i]['dstrt_nm'] = res['data'][i]['mso_dstrt_nm'] 
          res['data'][i]['mndl_nm'] = res['data'][i]['mso_mndl_nm'] 
          res['data'][i]['vlge_nm'] = res['data'][i]['mso_vlge_nm'] 
        }
      }
      this.cpeAgentStock = res['data']
      this.cpeAgntGrid = true;
      this.showLdr = false;
      this.columnDefs = [
        { headerName: 'S.No', field: 'sno', cellStyle: "center" , cellClass: "pm-grid-number-cell", filter: false },
        { headerName: 'CPEsrlno', field: 'srl_nu', cellStyle: "center", cellClass: "pm-grid-number-cell", filter: true },
        { headerName: 'CPE Mac Address', field: 'mac_addr_cd', cellStyle: "center", cellClass: "pm-grid-number-cell", filter: true },
        { headerName: 'CPE Type', field: 'prdct_nm', cellStyle: "center", cellClass: "pm-grid-number-cell", filter: true },
        { headerName: 'CPE Model', field: 'mdle_nm', cellStyle: "center", cellClass: "pm-grid-number-cell" },
        { headerName: 'Batch date', field: 'btch_ts', cellStyle: "center", cellClass: "pm-grid-number-cell" },
        { headerName: 'mso code', field: 'mso_code', cellStyle: "center", cellClass: "pm-grid-number-cell" },
        { headerName: 'lmo code', field: 'lmo_code', cellStyle: "center", cellClass: "pm-grid-number-cell" },
        { headerName: 'district name', field: 'dstrt_nm', cellStyle:"center", cellClass: "pm-grid-number-cell" },
        { headerName: 'mandal name', field: 'mndl_nm', cellStyle: "center" , cellClass: "pm-grid-number-cell" },
        { headerName: 'village name', field: 'vlge_nm', cellStyle: "center" , cellClass: "pm-grid-number-cell" },
        { headerName: 'Caf number', field: 'caf_id', cellStyle:"center", 'color': "red !important" }
      ]
    })

  }
  
 else {
    this.cpeAgentStock=[]
    if(this.cpeTransfrForm.value.agnt_id || this.cpeTransfrForm.value.srlnum){
      if (this.cpeTransfrForm.value.fromDt && this.cpeTransfrForm.value.toDt) {
        var date = new Date(this.cpeTransfrForm.value.fromDt),
          mnth = ("0" + (date.getMonth() + 1)).slice(-2),
          day = ("0" + date.getDate()).slice(-2);
        this.frmdt = [date.getFullYear(), mnth, day].join("-");
        var date1 = new Date(this.cpeTransfrForm.value.toDt),
          mnth = ("0" + (date1.getMonth() + 1)).slice(-2),
          day = ("0" + date1.getDate()).slice(-2);
        this.todt = [date1.getFullYear(), mnth, day].join("-");
      }
      else {
        this.frmdt = 'null';
        this.todt = 'null'
      }
        this.srlnum = this.cpeTransfrForm.value.srlnum || 'null'
        this.agnt_id = this.cpeTransfrForm.value.agnt_id.agnt_id || 'null'
        this.agnt_ctgry_id = this.cpeTransfrForm.value.agnt_id.agnt_ctgry_id || 'null'
        this.boxtype = this.cpeTransfrForm.value.boxtype || 'null'
        this.showLdr = true;
      let rte = `inventory/getAgentCpeStock/${this.agnt_id}/${this.boxtype}/${this.frmdt}/${this.todt}/${this.srlnum}/${this.agnt_ctgry_id}`;
      this.apiService.get(rte).subscribe(res => {
        for(let i=0;i<res['data'].length;i++){
          if(res['data'][i].lmo_ctgry==null || !res['data'][i].lmo_ctgry){
            res['data'][i]['dstrt_nm'] = res['data'][i]['mso_dstrt_nm'] 
            res['data'][i]['mndl_nm'] = res['data'][i]['mso_mndl_nm'] 
            res['data'][i]['vlge_nm'] = res['data'][i]['mso_vlge_nm'] 
          }
          else{
            res['data'][i]['dstrt_nm'] = res['data'][i]['dstrt_nm'] 
            res['data'][i]['mndl_nm'] = res['data'][i]['mndl_nm'] 
            res['data'][i]['vlge_nm'] = res['data'][i]['vlge_nm']
          }
        }
        this.cpeAgentStock = res['data'];
        this.cpeAgntGrid = true;
        this.showLdr = false;
      })
      this.columnDefs = [
        { headerName: 'S.No', field: 'sno', cellStyle: "center" , cellClass: "pm-grid-number-cell", filter: false },
        { headerName: 'cpesrlno', field: 'srl_nu', cellStyle: "center", cellClass: "pm-grid-number-cell", filter: true },
        { headerName: 'CPE Mac Address', field: 'mac_addr_cd', cellStyle: "center", cellClass: "pm-grid-number-cell", filter: true },
        { headerName: 'Cpe Type', field: 'prdct_nm', cellStyle: "center", cellClass: "pm-grid-number-cell", filter: true },
        { headerName: 'Cpe Model', field: 'mdle_nm', cellStyle: "center", cellClass: "pm-grid-number-cell" },
        { headerName: 'Batch date', field: 'btch_ts', cellStyle: "center", cellClass: "pm-grid-number-cell" },
        { headerName: 'mso code', field: 'mso_code', cellStyle: "center", cellClass: "pm-grid-number-cell" },
        { headerName: 'lmo code', field: 'lmo_code', cellStyle: "center", cellClass: "pm-grid-number-cell" },
        { headerName: 'district name', field: 'dstrt_nm', cellStyle:"center", cellClass: "pm-grid-number-cell" },
        { headerName: 'mandal name', field: 'mndl_nm', cellStyle: "center" , cellClass: "pm-grid-number-cell" },
        { headerName: 'village name', field: 'vlge_nm', cellStyle: "center" , cellClass: "pm-grid-number-cell" },
        { headerName: 'Caf number', field: 'caf_id', cellStyle:"center", 'color': "red !important" }

      ]
  }
  // else{
  //   this.showLdr = false;
  //   this.confirmMsgDialogRef = this.dialog.open(MessageDialogComponent, {
  //     width: '25%',
  //     panelClass: 'my-class',
  //     data: {
  //       title: ``,
  //       msg: `please select agnt_id or serial number`,
  //       btnLst: [{
  //         label: 'OK',
  //         res: 'OK'
  //       }
  //       ]
  //     }
  //   });
  // }
  }


}
  displayFn(agent) {
    if (agent) { return agent.agnt_nm + " " + '|' + " " + agent.agnt_cd; }
  }
  onSelectionChanged(e) {
    console.log(e)
    this.uploData=[];
    for(let i=0;i<e.selectedRowsData.length;i++){
      if(e.selectedRowsData[i].caf_id == null){
        this.uploData.push(e.selectedRowsData[i]);
      }
    }
    if(e.currentDeselectedRowKeys.length>0){
    _.remove(this.uploData, function(currentObject) {
      return currentObject.stpbx_id === e.currentDeselectedRowKeys[0].stpbx_id;
  });
}
    this.uploData = _.uniqBy(this.uploData, 'stpbx_id');

    if (this.uploData.length > 0) {
      this.updldcard = true;
      this.deletebtn = false;
      this.chsefle = true;
    }
    else {
      this.updldcard = false;
      this.deletebtn = true;
      this.chsefle = false;
    }

  }
  onCellPrepared(colDef, e: any) {
    if (e.rowType === "data" && e.column.command === 'select' && e.row.data && e.row.data.caf_id) {
      var editor = CheckBox.getInstance(e.cellElement.querySelector(".dx-select-checkbox"));
      editor.option("disabled", true); 
      e.cellElement.querySelector(".dx-select-checkbox").style.display='none'

    }
    if (e.parentType == 'headerRow' && e.command === 'select') {
      e.editorElement.remove();
    }


    if (e.rowType === "data" && e.row.data && e.column.dataField == 'caf_id') {
      e.cellElement.style.color = '#ff0000';
    }
    // if (e.rowType === "data" && e.row.data && e.column.dataField === 'srl_nu') {
    //   e.cellElement.style.color = '#337ab7';
    //   e.cellElement.style.cursor = "pointer";
    // }
  }
  onCellClick(e) {
    if (e.column.dataField === 'srl_nu') {
      // this.router.navigate(['admin/inventory/setup-box/transfer/' + e.value])
    }
    if (e.rowType == "data") {  
      e.event.stopPropagation();  
  }
  }

  // transferBox() {
  //   console.log(this.agntTransfrForm)
  //   console.log(this.cpeTransfrForm)
  //   console.log(this.cpeAgentStock)
  //   this.showLdr = true;
  //   let data = []
  //   if (this.ExclDta.length == 0) {
  //     for (var i = 0; i < this.uploData.length; i++) {
  //       data.push({ Cpe_Serial_No: this.uploData[i].srl_nu, to_lmo_agnt_id: this.agntTransfrForm.value.agnt.agnt_id, frm_lmo_agnt_id: this.cpeAgentStock[0].agnt_id, prnt_agnt_id: this.cpeAgentStock[0].prnt_agnt_id })
  //     }
  //   }
  //   else {
  //     console.log("in else")
  //     for (var j = 0; j < this.ExclDta.length; j++) {
  //       data.push({ Cpe_Serial_No: this.ExclDta[j]['Cpe Serial No'], to_lmo_agnt_id: this.agntTransfrForm.value.agnt.agnt_id, frm_lmo_agnt_id: this.cpeAgentStock[0].agnt_id, prnt_agnt_id: this.cpeAgentStock[0].prnt_agnt_id })
  //     }
  //   }

  //   console.log(data)
  //   let rte = `inventory/transferCpeToAgent`;
  //   if (data.length > 0) {
  //     this.apiService.create(data, rte).subscribe(res => {
  //       console.log(res)
  //       if (res['status'] == 200) {
  //         this.showLdr = false;
  //         let succRecd = data.length - res['data']['notinlmo'].length
  //         if (res['data']['notinlmo'].length > 0) {
  //           this.confirmMsgDialogRef = this.dialog.open(MessageDialogComponent, {
  //             width: '25%',
  //             panelClass: 'my-class',
  //             data: {
  //               title: `Sucessfully inserted Records ${succRecd}`,
  //               msg: `${res['data']['notinlmo'].length} records are not idetified with selected lmo data please check`,
  //               btnLst: [{
  //                 label: 'Download File',
  //                 res: 'Excel'
  //               }]
  //             }
  //           });
  //           this.confirmMsgDialogRef.afterClosed().subscribe((response) => {
  //             if (response) {
  //               if (response == 'Excel') {
  //                 this.excel.exportAsExcelFile(res['data']['notinlmo'], 'Cpestock')
  //               }
  //             }
  //           })
  //           this.updldcard = false;
  //           this.uploData = []
  //           this.ExclDta = []
  //           this.exclGrid = false;
  //           this.shwrcds = false;

  //           if (res['data']['data'].length > 0) {
  //             this.submit();
  //           }
  //         }
  //         else {
  //           this.snackBar.open("Sucessfully Updated", '', {
  //             duration: 10000,
  //             panelClass: ['blue-snackbar'],
  //             horizontalPosition: this.horizontalPosition,
  //             verticalPosition: this.verticalPosition,
  //           });
  //           this.submit();
  //           this.updldcard = false;
  //           this.uploData = [];
  //           this.exclGrid = false;
  //         }

  //       }
  //       if (res['status'] == 700) {
  //         this.showLdr = false;
  //         this.confirmMsgDialogRef = this.dialog.open(MessageDialogComponent, {
  //           width: '25%',
  //           panelClass: 'my-class',
  //           data: {
  //             title: ``,
  //             msg: `Something Went Wrong Please Check`,
  //             btnLst: [{
  //               label: 'OK',
  //               res: 'OK'
  //             }
  //             ]
  //           }
  //         });
  //       }
  //     })
  //   }
  //   else {
  //     this.showLdr = false;
  //   }

  // }
  transferBox() {
    let data = this.uploData;
    if(this.agntTransfrForm.value.agnt.agnt_ctgry_id==3){
      for(let j=0; j<data.length;j++){
        if(data[j].agnt_id == null || !data[j].agnt_id){
          data[j]['frm_agnt_id']=data[j].prnt_agnt_id;
        }
        else{
          data[j]['frm_agnt_id']=data[j].agnt_id;
        }
        data[j]['to_agnt_id']=this.agntTransfrForm.value.agnt.agnt_id;
        data[j]['Cpe_Serial_No']=data[j].srl_nu;
        data[j]['lmo_ctgry']=null;
      }
    }
    else{
      for(let j=0; j<data.length;j++){
        data[j]['to_agnt_id']=this.agntTransfrForm.value.agnt.agnt_id;
        if(data[j].agnt_id == null || !data[j].agnt_id){
          data[j]['frm_agnt_id']=data[j].prnt_agnt_id;
        }
        else{
          data[j]['frm_agnt_id']=data[j].agnt_id;
        }
        data[j]['Cpe_Serial_No']=data[j].srl_nu;
        data[j]['prnt_agnt_id']=this.agntTransfrForm.value.agnt.prnt_agnt_id;
        data[j]['lmo_ctgry']=this.agntTransfrForm.value.agnt.agnt_ctgry_id
      }
    }
  
    let rte = `inventory/transferCpeToAgent`;
    if (data.length > 0) {
      this.showLdr = true;
      this.apiService.create(data, rte).subscribe(res => {
        if (res['status'] == 200) {
          this.showLdr = false;
            this.snackBar.open("Sucessfully Updated", '', {
              duration: 10000,
              panelClass: ['blue-snackbar'],
              horizontalPosition: this.horizontalPosition,
              verticalPosition: this.verticalPosition,
            });
            this.submit();
            this.updldcard = false;
            this.uploData = [];
            this.exclGrid = false;
        }
        if (res['status'] == 700) {
          this.showLdr = false;
          this.confirmMsgDialogRef = this.dialog.open(MessageDialogComponent, {
            width: '25%',
            panelClass: 'my-class',
            data: {
              title: ``,
              msg: `Something Went Wrong Please Check`,
              btnLst: [{
                label: 'OK',
                res: 'OK'
              }
              ]
            }
          });
        }
      })
    }
    else {
      this.showLdr = false;
    }

  }
  cancel() {
    this.updldcard = false;
  }
  delete() {
    let data = []
    console.log(this.uploData)
    if(this.uploData.length>0){
    for (var i = 0; i < this.uploData.length; i++) {
      data.push({ stpbx_id: this.uploData[i].stpbx_id, lmo_agnt_id: this.cpeTransfrForm.value.agnt_id.agnt_id })
    }
    this.confirmMsgDialogRef = this.dialog.open(MessageDialogComponent, {
      width: '25%',
      panelClass: 'my-class',
      data: {
        title: ``,
        msg: `Are you sure deleting this item`,
        btnLst: [{
          label: 'No',
          res: 'no'
        },
        {
          label: 'Yes',
          res: 'yes'
        }
        ]
      }
    });
    this.confirmMsgDialogRef.afterClosed().subscribe((response) => {
      if (response) {
        if (response == 'yes') {
          let rte = `inventory/deleteCpeToAgent`;
          this.apiService.update(data, rte).subscribe(res => {
            if (res['status'] == 200) {
              this.snackBar.open("Sucessfully Updated", '', {
                duration: 2000,
                panelClass: ['blue-snackbar'],
                horizontalPosition: this.horizontalPosition,
                verticalPosition: this.verticalPosition,
              });
              this.submit();
              this.updldcard = false;
              this.uploData = []
            }
          })
        }
      }
    })
  }
  else{
    this.confirmMsgDialogRef = this.dialog.open(MessageDialogComponent, {
      width: '25%',
      panelClass: 'my-class',
      data: {
        title: ``,
        msg: `Please select the Stock what you want to delete`,
        btnLst: [{
          label: 'OK',
          res: 'OK'
        }
        ]
      }
    });
  }


  }
  getUploadCpeData() {
    this.loader = true;
    let rte = `inventory/getTransferUploadCpeStock`;
    this.apiService.get(rte).subscribe(res => {
      if (res['status'] == 200) {
        this.loader = false;
        var index=1;
        for(let i=0;i<res['data'].length;i++){
              res['data'][i].sno = index++
        }
        this.uploadCpeStock = res['data'];
        this.columnDefsUpdl = [
          { headerName: 'S.No', field: 'sno', cellStyle: { 'text-align': "center" }, cellClass: "pm-grid-number-cell" },
          { headerName: 'cpesrlno', field: 'srl_nu', cellStyle: { 'text-align': "center" }, cellClass: "pm-grid-number-cell", filter: true },
          { headerName: 'CPE Mac Address', field: 'mac_addr_cd', cellStyle: { 'text-align': "center" }, cellClass: "pm-grid-number-cell", filter: true },
          { headerName: 'Cpe Type', field: 'prdct_nm', cellStyle: { 'text-align': "center" }, cellClass: "pm-grid-number-cell", filter: true },
          { headerName: 'Cpe Model', field: 'mdle_nm', cellStyle: { 'text-align': "center" }, cellClass: "pm-grid-number-cell" },
          { headerName: 'Transfer date', field: 'u_ts', cellStyle: { 'text-align': "center" }, cellClass: "pm-grid-number-cell" },
          { headerName: 'To agent code', field: 'to_lmo_code', cellStyle: { 'text-align': "center" }, cellClass: "pm-grid-number-cell" },
          { headerName: 'From agent code', field: 'frm_lmo_code', cellStyle: { 'text-align': "center" }, cellClass: "pm-grid-number-cell" },
          { headerName: 'To district name', field: 'to_dstrt_nm', cellStyle: { 'text-align': "center" }, cellClass: "pm-grid-number-cell" },
          { headerName: 'To mandal name', field: 'to_mndl_nm', cellStyle: { 'text-align': "center" }, cellClass: "pm-grid-number-cell" },
          { headerName: 'To village name', field: 'to_vlge_nm', cellStyle: { 'text-align': "center" }, cellClass: "pm-grid-number-cell" },
          { headerName: 'From district name', field: 'frm_dstrt_nm', cellStyle: { 'text-align': "center" }, cellClass: "pm-grid-number-cell" },
          { headerName: 'From mandal name', field: 'frm_mndl_nm', cellStyle: { 'text-align': "center" }, cellClass: "pm-grid-number-cell" },
          { headerName: 'From village name', field: 'frm_vlge_nm', cellStyle: { 'text-align': "center" }, cellClass: "pm-grid-number-cell" },
        ]
      }

    })
  }
  getRecntUploadCpeData() {
    this.loader = true;
    let rte = `inventory/getTransferRecntUploadCpeStock`;
    this.apiService.get(rte).subscribe(res => {
      if (res['status'] == 200) {
        this.loader = false;
        var index=1;
        for(let i=0;i<res['data'].length;i++){
              res['data'][i].sno = index++
        }
        this.recentCpeStock = res['data']

        this.columnDefsRecnt = [
          { headerName: 'S.No', field: 'sno', cellStyle: { 'text-align': "center" }, cellClass: "pm-grid-number-cell" },
          { headerName: 'cpesrlno', field: 'srl_nu', cellStyle: { 'text-align': "center" }, cellClass: "pm-grid-number-cell", filter: true },
          { headerName: 'CPE Mac Address', field: 'mac_addr_cd', cellStyle: { 'text-align': "center" }, cellClass: "pm-grid-number-cell", filter: true },
          { headerName: 'Cpe Type', field: 'prdct_nm', cellStyle: { 'text-align': "center" }, cellClass: "pm-grid-number-cell", filter: true },
          { headerName: 'Cpe Model', field: 'mdle_nm', cellStyle: { 'text-align': "center" }, cellClass: "pm-grid-number-cell" },
          { headerName: 'Transfer date', field: 'u_ts', cellStyle: { 'text-align': "center" }, cellClass: "pm-grid-number-cell" },
          { headerName: 'To agent code', field: 'to_lmo_code', cellStyle: { 'text-align': "center" }, cellClass: "pm-grid-number-cell" },
          { headerName: 'From agent code', field: 'frm_lmo_code', cellStyle: { 'text-align': "center" }, cellClass: "pm-grid-number-cell" },
          { headerName: 'To district name', field: 'to_dstrt_nm', cellStyle: { 'text-align': "center" }, cellClass: "pm-grid-number-cell" },
          { headerName: 'To mandal name', field: 'to_mndl_nm', cellStyle: { 'text-align': "center" }, cellClass: "pm-grid-number-cell" },
          { headerName: 'To village name', field: 'to_vlge_nm', cellStyle: { 'text-align': "center" }, cellClass: "pm-grid-number-cell" },
          { headerName: 'From district name', field: 'frm_dstrt_nm', cellStyle: { 'text-align': "center" }, cellClass: "pm-grid-number-cell" },
          { headerName: 'From mandal name', field: 'frm_mndl_nm', cellStyle: { 'text-align': "center" }, cellClass: "pm-grid-number-cell" },
          { headerName: 'From village name', field: 'frm_vlge_nm', cellStyle: { 'text-align': "center" }, cellClass: "pm-grid-number-cell" },
        ]
      }

    })
  }
  tabClick(tab) {
    if (tab.index == 1) {
      this.getUploadCpeData();
    }
    if (tab.index == 2) {
      this.getRecntUploadCpeData();
    }
  }

  readExcel(event) {
    event.target.value = ''
    var format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
    this.isValid = true;
    let readFile = new FileReader();
    this.showLdr = true;
    readFile.onload = (e) => {
      this.storeData = readFile.result;
      var data = new Uint8Array(this.storeData);
      var arr = new Array();

      for (var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
      var bstr = arr.join("");
      var workbook = XLSX.read(bstr, {
        type: "binary", cellDates: true,
        cellNF: false,
        cellText: false
      });
      var first_sheet_name = workbook.SheetNames[0];
      this.worksheet = workbook.Sheets[first_sheet_name];
      this.ExclDta = XLSX.utils.sheet_to_json(this.worksheet, { raw: true });
      this.columnDefsRcrd = [
        { headerName: 'sno', field: 'sno', cellClass: "pm-grid-number-cell", filter: true },
        { headerName: 'Cpe Serial No', field: 'Cpe Serial No', cellStyle: { 'text-align': "center" }, cellClass: "pm-grid-number-cell", filter: true },
      ]
      if (this.ExclDta.length == 0) { this.isValid = false; }
      this.ttlRcds = this.ExclDta.length;
      let count = 0;
      for (i = 0; i < this.ExclDta.length; i++) {
        this.ExclDta[i]['sno'] = i + 1
        // if (typeof this.ExclDta[i]["Cpe Serial No"] !== 'string') {
        //   this.isValid = false;
        //   this.exclGrid = false;
        //   this.updldcard = false;
        //   this.showLdr = false;
        //   this.shwrcds = true;
        //   break;
        // }

        if (count == this.ExclDta.length - 1) {
          for (let i = 0; i < this.ExclDta.length; i++) {
            if (this.ExclDta.length > 1) {
              let key = true;
              for (let j = (i + 1); j < this.ExclDta.length; j++) {
                if (this.ExclDta[j]["Cpe Serial No"] == this.ExclDta[i]["Cpe Serial No"]) {
                  this.mess = `Duplication of data inserted on record number ${i + 1} and record number ${j + 1}`
                  this.isValid = false;
                  this.exclGrid = false;
                  this.updldcard = false;
                  this.showLdr = false;
                  key = false;
                  this.shwrcds = true;
                  break;
                }
                else {
                  this.isValid = true;
                  this.exclGrid = true;
                  this.updldcard = false;
                  this.shwrcds = false;
                  this.showLdr = false;
                }
              }
              if (key) {
                continue;
              } else {
                break;
              }
            }
            else {
              this.isValid = true;
              this.exclGrid = true;
              this.shwrcds = false;
              this.showLdr = false;
            }
          }
        }
        count++
        if (count == this.ExclDta.length) {
    
        }

      }

    }


    readFile.readAsArrayBuffer(this.fileUploaded);

  }
  uploadedFile(event) {
    // if (!this.cpeTransfrForm.value.agnt_id) {
    //   this.snackBar.open("Please Select Tenant Type and Tenant Code", '', {
    //     duration: 2000,
    //     panelClass: ['blue-snackbar'],
    //     horizontalPosition: this.horizontalPosition,
    //     verticalPosition: this.verticalPosition,
    //   });
    // }
    // else {
      this.fileUploaded = event.target.files[0];
      this.readExcel(event);
    // }


  }
  onToolbarPreparing(e) {
    e.toolbarOptions.items.unshift({
      location: 'after',
      widget: 'dxButton',
      options: {
        icon: 'minus',
        text: 'Delete',
        onClick: this.delete.bind(this),
        bindingOptions: {
          'disabled': 'isEmailButtonDisabled'
        }
      }
    });
  }
  downloadtemplate() {
    this.datasoure = [{
      'Cpe Serial No': 1820
    },
    {
      'Cpe Serial No': 1821
    },
    {
      "Cpe Serial No": 1822
    },
    {
      "Cpe Serial No": 1823
    },
    {
      "Cpe Serial No": 1824
    }]
    this.excel.exportAsExcelFile(this.datasoure, 'Cpestock')
  }

}
