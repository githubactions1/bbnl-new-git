import { Component, OnInit } from '@angular/core';
import { CrudService } from 'app/main/apps/crud.service';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { debounceTime, tap, switchMap, finalize } from 'rxjs/operators';
import { MatDialog, MatDialogRef, MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material';
import { ExportService } from 'app/main/services/export.service';
import * as XLSX from 'xlsx';
import { NAMED_ENTITIES } from '@angular/compiler';
import { DeleteDialogComponent } from 'app/main/shared/components/delete-dialog/delete-dialog.component';
import { element } from '@angular/core/src/render3';
import { MessageDialogComponent } from 'app/main/shared/components/message-dialog/message-dialog.component';
import * as _ from 'lodash';

@Component({
  selector: 'app-settop-box',
  templateUrl: './settop-box.component.html',
  styleUrls: ['./settop-box.component.scss']
})
export class SettopBoxComponent implements OnInit {
  getHeaderDtls = function () { return { "title": 'CPE Stock Upload', "icon": "business" } }
  // agentsCtrl = new FormControl();
  cpeForm: FormGroup
  filteredAgents: any;
  isLoading = false;
  errorMsg: string;
  prdct_type: any;
  prdct_mdls: any;
  allAgnts: any;
  cpePrefix = [];
  withShadingOptionsVisible: boolean;
  datasoure: any;
  columnDefs: ({ headerName: string; field: string; algnmnt: string; cellClass: string; filter?: undefined; } | { headerName: string; field: string; algnmnt: string; cellClass: string; filter: boolean; })[];
  columnDefsRcrd: ({ headerName: string; field: string; algnmnt: string; cellClass: string; filter?: undefined; } | { headerName: string; field: string; algnmnt: string; cellClass: string; filter: boolean; })[];
  confirmDialogRef: MatDialogRef<DeleteDialogComponent>;
  permissions: { "slct_in": number; "insrt_in": number; "updt_in": number; "dlte_in": number; "exprt_in": number; };
  fileUploaded: any;
  shwrcds: boolean;
  isValid: boolean;
  storeData: any;
  worksheet: XLSX.WorkSheet;
  ExclDta = [];
  ttlRcds: number;
  cpeAgentStock: any;
  cpeAgntGrid = false;
  uploadRecords: any[];
  exclGrid = false;
  uploadCpeStock: { sno: number; cpesrlno: string; CPE_Mac_Address: string; Cpe_Type: string; Cpe_Model: string; Batch_date: string; msp_code: string; lmo_code: string; district_name: string; mandal_name: string; village_name: string; CafNo: string; }[];
  columnDefsUpdl: ({ headerName: string; field: string; algnmnt: string; cellClass: string; filter?: undefined; } | { headerName: string; field: string; algnmnt: string; cellClass: string; filter: boolean; })[];
  columnDefsRecnt: ({ headerName: string; field: string; cellClass: string; filter?: undefined; } | { headerName: string; field: string; cellClass: string; filter: boolean; })[];
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  agnt_lst: any;
  recentCpeStock: any;
  mess: string;
  confirmMsgDialogRef: MatDialogRef<MessageDialogComponent>;
  showLdr: boolean;
  loader: boolean
  uploData = []


  constructor(public apiService: CrudService, private fb: FormBuilder, public dialog: MatDialog, public excel: ExportService, public snackBar: MatSnackBar) {
    // this.permissions = { "slct_in": 1, "insrt_in": 0, "updt_in": 1, "dlte_in": 1, "exprt_in": 1 };
    const permTxt = 'CPE Stock';
    const prmeRte = `user/permissions/${permTxt}`;
    this.apiService.get(prmeRte).subscribe((res) => {
      // this.permissions = res['data'][0];
      if (res['data']){
        this.permissions = res['data'][0];
      }
    });
  }

  ngOnInit() {

    this.cpeForm = this.fb.group({
      prdttype: ['', Validators.required],
      mdltype: ['', Validators.required],
      cpe_prex: ['', Validators.required],
      agnt_id: ['', Validators.required],
      excl: ['', Validators.required],
      addnewPrix: ['']
    })
    this.getCpeStockPrdct();
    this.cpeForm.get('agnt_id').valueChanges
      .pipe(
        debounceTime(500),
        tap(() => {
          this.errorMsg = "";
          this.filteredAgents = [];
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
        })
      )
      .subscribe(data => {
        if (data['data'] == undefined) {
          this.errorMsg = data['Error'];
          this.filteredAgents = [];
        } else {
          this.errorMsg = "";
          this.filteredAgents = data['data'];
        }

      })
  }
  displayFn(agent) {
    if (agent) { return agent.agnt_nm + " " + '|' + " " + agent.agnt_cd; }
  }

  getCpeStockPrdct() {
    this.apiService.get('inventory/productList').subscribe(res => {
      this.prdct_type = res['data']
    })
  }

  getAgents() {
    this.apiService.get('agent/getAllAgents').subscribe(res => {
      this.allAgnts = res['data']
    })
  }
  selectCpePrefixes() {
    this.cpeForm.get('mdltype').setValue('')
    this.apiService.get(`inventory/setupboxPrefix`).subscribe(res => {
      this.cpePrefix = res['data']
    })
  }

  getCpeTypeModels(e) {
    this.cpeForm.get('mdltype').setValue([]);
    this.apiService.get(`inventory/product/modls/${e.prdct_id}`).subscribe(res => {
      this.prdct_mdls = res['data']
    })
  }


  uploadedFile(event) {
    this.fileUploaded = event.target.files[0];
    this.readExcel(event);
  }
  readExcel(event) {
    event.target.value = ''
    var format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?,/^\s+|\s+$/g, ""]+/;
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
        { headerName: 'sno', field: 'sno', cellClass: "pm-grid-number-cell", filter: true, algnmnt: "center" },
        { headerName: 'CPE Serial No', field: 'Cpe Serial No', cellClass: "pm-grid-number-cell", filter: true, algnmnt: "" },
        { headerName: 'CPE Mac Address', field: 'Cpe Mac Address', cellClass: "pm-grid-number-cell", filter: true, algnmnt: "" },
        { headerName: 'Batch Id', field: 'Batch Id', cellClass: "pm-grid-number-cell", filter: true, algnmnt: "" },
        { headerName: 'Batch Date', field: 'Batch Date', algnmnt: "center", cellClass: "pm-grid-number-cell", filter: true },
      ]
      for (var m = 0; m < this.ExclDta.length; m++) {
        if (!this.ExclDta[m]["Cpe Serial No"] && !this.ExclDta[m]["Cpe Mac Address"]) {
          this.ExclDta.splice(m)
        }
      }
      if (this.ExclDta.length == 0) { this.isValid = false; }
      this.ttlRcds = this.ExclDta.length;
      let count = 0;
      for (i = 0; i < this.ExclDta.length; i++) {
        this.ExclDta[i]['sno'] = i + 1
        if (typeof this.ExclDta[i]["Cpe Serial No"] !== 'string' && typeof this.ExclDta[i]["Cpe Mac Address"] !== 'string') {
          this.isValid = false;
          this.exclGrid = false;
          this.showLdr = false;
          this.shwrcds = true;
          break;
        }
        if (typeof this.ExclDta[i]["Cpe Mac Address"] == 'string') {
          let arrTst = this.ExclDta[i]["Cpe Mac Address"].split(":");
          console.log(arrTst)
          if (arrTst.length != 6) {
            this.mess = `mac address have 12 digits`
            this.isValid = false;
            this.exclGrid = false;
            this.showLdr = false;
            this.shwrcds = true;
            break;
          }
          else {
            let key = true;
            for (let j = 0; j < arrTst.length; j++) {
              if (arrTst[j].length !== 2 || format.test(arrTst[j])) {
                this.isValid = false;
                this.exclGrid = false;
                this.showLdr = false;
                this.shwrcds = true;
                key = false;
                break;
              }
            }
            if (!key) {
              this.shwrcds = true;
              this.mess = `special characters are not allowed at record number ${i + 1}`
              break;
            }
          }

        }
        if (count == this.ExclDta.length - 1) {

          for (let i = 0; i < this.ExclDta.length; i++) {

            if (this.ExclDta.length > 1) {
              var key = true;
              for (let j = (i + 1); j < this.ExclDta.length; j++) {
                if (this.ExclDta[j]["Cpe Mac Address"] == this.ExclDta[i]["Cpe Mac Address"]
                  || this.ExclDta[j]["Cpe Serial No"] == this.ExclDta[i]["Cpe Serial No"]) {
                  this.mess = `Duplication of data inserted on record number ${i + 1} and record number ${j + 1}`
                  this.isValid = false;
                  this.exclGrid = false;
                  this.showLdr = false;
                  this.shwrcds = true;
                  key = false;

                  break;
                }
                else {
                  this.isValid = true;
                  this.exclGrid = true;
                  this.showLdr = false;
                  this.shwrcds = false;
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
              this.showLdr = false;
              this.shwrcds = false;
            }
          }
        }
        count++

      }

    }


    readFile.readAsArrayBuffer(this.fileUploaded);

  }

  onSelectionChanged(e) {
    this.uploData = e.selectedRowsData;
  }
  submit() {
    // if (this.ExclDta && this.isValid && this.cpeForm.valid) {
      console.log(this.cpeForm)
    var date = new Date(),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    var bcthdt = [date.getFullYear(), mnth, day].join("-");
    if (this.uploData.length > 0 && this.isValid && this.cpeForm.valid) {
      this.showLdr = true;
      if(this.cpeForm.value.agnt_id.agnt_ctgry_id==3){
        var lmo_agnt_id = null;
        var mso_agnt_id = this.cpeForm.value.agnt_id.agnt_id;
      }
      else{
        var lmo_agnt_id = this.cpeForm.value.agnt_id.agnt_id;
        var mso_agnt_id = this.cpeForm.value.agnt_id.prnt_agnt_id;
      }
      var prdct_id = this.cpeForm.value.prdttype.prdct_id;
      var vndr_id = this.cpeForm.value.prdttype.vndr_id;
      var splr_id = this.cpeForm.value.prdttype.splr_id;
      var mdle_id = this.cpeForm.value.mdltype;
      var prfxs = this.cpeForm.value.cpe_prex;
      var batch_id=Date.now();

      for (let i = 0; i < prfxs.length; i++) {
        if (isNaN(prfxs[i].nm)) {
          length = prfxs[i].prfx_cd.length;
          // this.uploData.map(function (element) {
          for (let j = 0; j < this.uploData.length; j++) {
            this.uploData[j]['Cpe_Mac_Address'] = this.uploData[j]["Cpe Mac Address"]
            this.uploData[j]['Cpe_Serial_No'] = this.uploData[j]["Cpe Serial No"]
            if (typeof this.uploData[j]["Batch Id"] == 'number') {
              this.uploData[j]['Batch_Id'] = batch_id;
            }
            else {
              this.uploData[j]["Batch_Id"] = batch_id;
            }
           if(typeof this.uploData[j].Cpe_Serial_No=="string"){
            if (prfxs[i].prfx_cd.toLowerCase() == this.uploData[j].Cpe_Serial_No.slice(0, length).toLowerCase()) {
              this.uploData[j].prfx_id = prfxs[i].prfx_id;
            }
            else{
              this.uploData[j].prfx_id = 0
            }
           }
           else{
            if (prfxs[i].prfx_cd == this.uploData[j].Cpe_Serial_No.toString().slice(0, length)) {
                 this.uploData[j].prfx_id = prfxs[i].prfx_id;
            }
            else{
              this.uploData[j].prfx_id = 0
            }
           }


            this.uploData[j]['Batch_Date'] = this.uploData[j]["Batch Date"] ? this.uploData[j]["Batch Date"] : bcthdt
            this.uploData[j]['lmo_agnt_id'] = lmo_agnt_id
            this.uploData[j]['mso_agnt_id'] = mso_agnt_id
            this.uploData[j]['prdct_id'] = prdct_id
            this.uploData[j]['vndr_id'] = vndr_id
            this.uploData[j]['splr_id'] = splr_id
            this.uploData[j]['mdle_id'] = mdle_id
            // element['prfx_id'] = prfx_id
          }
        }
        // })
      }
      console.log(this.uploData)
      let rte = `inventory/setupboxupload`;
      this.apiService.create(this.uploData, rte).subscribe(res => {
        if (res['status'] == 200) {
          if (res['data']['dupli'].length > 0) {
            this.showLdr = false;
            let succRecd = this.uploData.length - res['data']['dupli'].length
            this.confirmMsgDialogRef = this.dialog.open(MessageDialogComponent, {
              width: '25%',
              panelClass: 'my-class',
              data: {
                title: `Sucessfully inserted Records ${succRecd}`,
                msg: `${res['data']['dupli'].length} duplicates records are idetified with existing data please check`,
                btnLst: [{
                  label: 'Download File',
                  res: 'Excel'
                }]
              }
            });
            this.confirmMsgDialogRef.afterClosed().subscribe((response) => {
              if (response) {
                if (response == 'Excel') {
                  this.excel.exportAsExcelFile(res['data']['dupli'], 'Cpestock')
                }
              }
            })
            for (var i = 0; i < this.ExclDta.length; i++) {
              this.uploData.forEach(element1 => {
                let stToDelete = element1.Cpe_Serial_No;
                _.remove(this.ExclDta, function (currentObject) {
                  return currentObject.Cpe_Serial_No === stToDelete;
                });
              })
            }
            if(this.ExclDta.length==0){
              this.exclGrid = false
              }
          }
          else {
            this.showLdr = false;
            this.snackBar.open("Sucessfully Added", '', {
              duration: 10000,
              panelClass: ['blue-snackbar'],
              horizontalPosition: this.horizontalPosition,
              verticalPosition: this.verticalPosition,
            });
            for (var i = 0; i < this.ExclDta.length; i++) {
              this.uploData.forEach(element1 => {
                let stToDelete = element1.Cpe_Serial_No;
                _.remove(this.ExclDta, function (currentObject) {
                  return currentObject.Cpe_Serial_No === stToDelete;
                });
              })
            }
            if(this.ExclDta.length==0){
            this.exclGrid = false
            }
            if(this.cpeForm.value.agnt_id.agnt_ctgry_id==3){
              var sndAgnt = {
                agnt_id: mso_agnt_id,
                agnt_ctgry_id:this.cpeForm.value.agnt_id.agnt_ctgry_id
              }
            }
            else{
              var sndAgnt = {
                agnt_id: this.cpeForm.value.agnt_id.agnt_id,
                agnt_ctgry_id:this.cpeForm.value.agnt_id.agnt_ctgry_id
              }
            }
            this.getAgentCpes(sndAgnt)
          }
        }
      })
    }
    else {
      if (this.uploData.length == 0) {
        alert('Please Select Excel data')
      }
      if (!this.isValid && !this.cpeForm.valid) {
        alert('Please Fill Feilds')
      }
    }

  }
  getAgentCpes(e) {
    console.log(e)
    this.loader = true;
    let rte = `inventory/getAgentCpeStock/${e.agnt_ctgry_id}/${e.agnt_id}`;
    this.apiService.get(rte).subscribe(res => {
      if (res['status'] == 200) {
        this.loader = false;
        this.cpeAgentStock = res['data']
        this.showLdr = false;
        this.cpeAgntGrid = true;

        this.columnDefs = [
          { headerName: 'S.No', field: 'sno', cellClass: "pm-grid-number-cell", algnmnt: "center" },
          { headerName: 'CPE srlno', field: 'srl_nu', cellClass: "pm-grid-number-cell", filter: true, algnmnt: "" },
          { headerName: 'CPE Mac Address', field: 'mac_addr_cd', cellClass: "pm-grid-number-cell", filter: true, algnmnt: "" },
          { headerName: 'CPE Type', field: 'prdct_nm', cellClass: "pm-grid-number-cell", filter: true, algnmnt: "" },
          { headerName: 'CPE Model', field: 'mdle_nm', cellClass: "pm-grid-number-cell", algnmnt: "" },
          { headerName: 'Batch date', field: 'btch_ts', cellClass: "pm-grid-number-cell", algnmnt: "center" },
          { headerName: 'MSO code', field: 'mso_code', cellClass: "pm-grid-number-cell", algnmnt: "" },
          { headerName: 'LMO code', field: 'lmo_code', cellClass: "pm-grid-number-cell", algnmnt: "" },
          { headerName: 'district name', field: 'dstrt_nm', cellClass: "pm-grid-number-cell", algnmnt: "" },
          { headerName: 'mandal name', field: 'mndl_nm', cellClass: "pm-grid-number-cell", algnmnt: "" },
          { headerName: 'village name', field: 'vlge_nm', cellClass: "pm-grid-number-cell", algnmnt: "" },
          { headerName: 'CAF number', field: 'caf_id', cellClass: "pm-grid-number-cell", algnmnt: "" },
          { headerName: 'Status', field: 'sts_nm', cellClass: "pm-grid-number-cell", algnmnt: "" },

        ]
      }

    })
  }
  getUploadCpeData() {
    this.showLdr = true;
    let rte = `inventory/getUploadCpeStock`;
    this.apiService.get(rte).subscribe(res => {
      var index=1;
      for(let i=0;i<res['data'].length;i++){
            res['data'][i].sno = index++
      }
      this.uploadCpeStock = res['data']
      this.showLdr = false;
    })
    this.columnDefsUpdl = [
      { headerName: 'S.No', field: 'sno', cellClass: "pm-grid-number-cell", algnmnt: "" },
      { headerName: 'CPE srlno', field: 'srl_nu', cellClass: "pm-grid-number-cell", filter: true, algnmnt: "" },
      { headerName: 'CPE Mac Address', field: 'mac_addr_cd', cellClass: "pm-grid-number-cell", filter: true, algnmnt: "" },
      { headerName: 'CPE Type', field: 'prdct_nm', cellClass: "pm-grid-number-cell", filter: true, algnmnt: "" },
      { headerName: 'CPE Model', field: 'mdle_nm', cellClass: "pm-grid-number-cell", algnmnt: "" },
      { headerName: 'Batch date', field: 'btch_ts', cellClass: "pm-grid-number-cell", algnmnt: "center" },
      { headerName: 'MSO code', field: 'mso_code', cellClass: "pm-grid-number-cell", algnmnt: "" },
      { headerName: 'LMO code', field: 'lmo_code', cellClass: "pm-grid-number-cell", algnmnt: "" },
      { headerName: 'district name', field: 'dstrt_nm', cellClass: "pm-grid-number-cell", algnmnt: "" },
      { headerName: 'mandal name', field: 'mndl_nm', cellClass: "pm-grid-number-cell", algnmnt: "" },
      { headerName: 'village name', field: 'vlge_nm', cellClass: "pm-grid-number-cell", algnmnt: "" },
    ]
  }
  getRecntUploadCpeData() {
    this.loader = true;
    let rte = `inventory/getRecntUploadCpeStock`;
    this.apiService.get(rte).subscribe(res => {
      if (res['status'] == 200) {
        this.loader = false;
        var index=1;
        for(let i=0;i<res['data'].length;i++){
              res['data'][i].sno = index++
        }
        this.recentCpeStock = res['data']
        this.showLdr = false;

        this.columnDefsRecnt = [
          { headerName: 'S.No', field: 'sno', cellClass: "pm-grid-number-cell" },
          { headerName: 'CPE srlno', field: 'srl_nu', cellClass: "pm-grid-number-cell", filter: true },
          { headerName: 'CPE Mac Address', field: 'mac_addr_cd', cellClass: "pm-grid-number-cell", filter: true },
          { headerName: 'CPE Type', field: 'prdct_nm', cellClass: "pm-grid-number-cell", filter: true },
          { headerName: 'CPE Model', field: 'mdle_nm', cellClass: "pm-grid-number-cell" },
          { headerName: 'Batch date', field: 'btch_ts', cellClass: "pm-grid-number-cell" },
          { headerName: 'MSO code', field: 'mso_code', cellClass: "pm-grid-number-cell" },
          { headerName: ' code', field: 'lmo_code', cellClass: "pm-grid-number-cell" },
          { headerName: 'district name', field: 'dstrt_nm', cellClass: "pm-grid-number-cell" },
          { headerName: 'mandal name', field: 'mndl_nm', cellClass: "pm-grid-number-cell" },
          { headerName: 'village name', field: 'vlge_nm', cellClass: "pm-grid-number-cell" },
        ]
      }

    })
  }
  addprefix() {
    let rte = `inventory/addPrix`;
    let data = {
      Prixnm: this.cpeForm.value.addnewPrix
    }
    this.apiService.create(data, rte).subscribe(res => {
      this.recentCpeStock = res['data'];
      this.selectCpePrefixes();
    })
  }
  // delete(data) {
  //   let orgDelRte = ``;
  //   this.apiService.delete(orgDelRte).subscribe((res) => {

  //     this.confirmDialogRef = this.dialog.open(DeleteDialogComponent, {
  //       width: '25%',
  //       panelClass: 'my-class',
  //       data: { message: 'Are you sure deleting this item' }
  //     });

  //     this.confirmDialogRef.afterClosed().subscribe((response) => {
  //       if (response == undefined) { }
  //       else if (response.status == 200)
  //         this.selectCpePrefixes();
  //     })
  //   })
  // }
  downloadtemplate() {
    this.datasoure = [{
      'Cpe Serial No': 1820,
      'Cpe Mac Address': '9C65EE502BF1',
      'Batch Id': '',
      'Batch Date': '',
      'Formula': { f: '=MID(B2,1,2)&":"&MID(B2,3,2)&":"&MID(B2,5,2)&":"&MID(B2,7,2)&":"&MID(B2,9,2)&":"&MID(B2,11,2)' }
    },
    {
      'Cpe Serial No': 1821,
      'Cpe Mac Address': '9C65EE502BF2',
      'Batch Id': '',
      'Batch Date': ''
    },
    {
      'Cpe Serial No': 1822,
      'Cpe Mac Address': '9C65EE502BF3',
      'Batch Id': '',
      'Batch Date': ''
    },
    {
      'Cpe Serial No': 1823,
      'Cpe Mac Address': '9C65EE502BF4',
      'Batch Id': '',
      'Batch Date': ''
    },
    {
      'Cpe Serial No': 1824,
      'Cpe Mac Address': '9C65EE502BF5',
      'Batch Id': '',
      'Batch Date': ''
    }]
    this.excel.exportAsExcelFile(this.datasoure, 'Cpestock')
  }
  tabClick(tab) {
    if (tab.index == 1) {
      this.getUploadCpeData();
    }
    if (tab.index == 2) {
      this.getRecntUploadCpeData();
    }
  }

}
