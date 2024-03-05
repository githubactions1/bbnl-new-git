import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as XLSX from 'xlsx';

import { FormControl, FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material';
import { debounceTime, tap, switchMap, finalize } from 'rxjs/operators';
import { DatePipe } from '@angular/common';
import { CrudService } from 'app/main/apps/crud.service';
import { ExportService } from 'app/main/services/export.service';
import { TransfereService } from 'app/providers/transfer/transfer.service';

@Component({
  selector: 'app-bulk-caf-upload',
  templateUrl: './bulk-caf-upload.component.html',
  styleUrls: ['./bulk-caf-upload.component.scss']
})
export class BulkCafUploadComponent implements OnInit {

  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  filteredAgents: any;
  errorMsg: string;
  isLoading: boolean;
  frmData: any;
  columnDefs;
  usrPymntData;
  exceldDatasoure;
  lmoSlctd: boolean = false;
  permissions;
  frm_actn: any;
  pymntCtgryLst: any;
  fileUploaded: any;
  shwrcds: boolean;
  isValid: boolean;
  storeData: any;
  worksheet: XLSX.WorkSheet;
  ExclDta = [];
  ttlRcds: number;
  exclGrid: boolean;
  columnDefsRcrd;
  agntPymntLst: any;
  usrUpldPymntsLst: any;
  usrUpldPymntsColumnDefs;
  recentPymntsLst: any;
  recentPymntsColumnDefs;
  getHeaderDtls = function () { return { "title": 'CAF Bulk Upload', "icon": "money" } };
  upldFileNm: any;
  cstmr_dta: any;
  firstFormGroup: FormGroup;
  packages: any;
  usrdtls: any;
  agntid: any;
  seltdpackagedat: any;
  loader: boolean = false;
  constructor(private _formBuilder: FormBuilder, public crdSrv: CrudService, public excel: ExportService, public datePipe: DatePipe, private route: Router, private _snackBar: MatSnackBar,public TransfereService: TransfereService) {
    this.permissions = { "slct_in": 1, "insrt_in": 0, "updt_in": 1, "dlte_in": 1, "exprt_in": 1 };
  }

  ngOnInit() {
    this.cstmr_dta = this.TransfereService.getData()
    console.log(this.cstmr_dta)
    this.firstFormGroup = this._formBuilder.group({
      crnt_pckge_id: ['', Validators.required],
    })
    this.usrdtls = JSON.parse(localStorage.getItem('usrDtls'));
  
  }


  getagntid(){
    console.log('lmoid')
    const rte = `caf/agntid/${this.ExclDta[0][ "SI LMO Code*"]}` ;
    this.crdSrv.get(rte).subscribe((res) => {
      console.log('lmoid')
      this.agntid = res['data'];
      console.log(this.agntid )
     
    this.getpackages()
    
    })
  }
  getpackages() {
    console.log("Packages")
    this.loader = true;
    // const rte = `package/getPckgesByAgntId/${this.agntid[0][ "agnt_id"]}/` + 2;
    const rte=`package/getEntPckges/`+ 2;
    this.crdSrv.get(rte).subscribe((res) => {
      if(res['data']){
        this.loader = false;
      }
      this.packages = res['data'];
      console.log(res['data'])
      console.log(this.packages)
        this.packages.filter((k) => {
        if (this.frm_actn == "update") {
          if (k.pckge_id == this.frmData.crnt_pln_id) {
            k['checked'] = true;
          }
        }
        else
          k['checked'] = false;
      });
    
    
    })
  }
  getpackagedta(p){
    console.log(p)

    this.seltdpackagedat=p
  }
  downloadtemplate() {

    this.exceldDatasoure = [
      {
        "APSFL Code*": "1",
        "District*": "EAST GODAVARI",
        "Mandal*": "RAJAHMUNDRY",
        "Village*": "RAJAHMUNDRY",
        "ONT Location*": "DANAVAIPET",
        "Organization Name":"glits",
        "Address": "POLARIS BUILDING",
        "Contact Person Mobile No*": "9999999999",
        "Contact Person Name*": "SUNIL MULAGADA",
        "Contact Person Designation": "",
        "Email*": "",
        "Payment Responsible*": "YES",
        "SI LMO Code*": "",
        "Longitude": "",
        "Latitude": ""
      }];
    this.excel.exportAsExcelFile(this.exceldDatasoure, 'bulk-cafs');
  }

  uploadedFile(event) {
    console.log("Called")
    this.fileUploaded = event.target.files[0];
    this.upldFileNm = this.fileUploaded.name;
    this.readExcel();
    this.shwrcds = true;
    this.lmoSlctd = true;
  }
  readExcel() {
    this.isValid = true;
    let readFile = new FileReader();
    console.log(readFile)
    readFile.onload = (e) => {
      this.storeData = readFile.result;
      let data = new Uint8Array(this.storeData);
      let arr = new Array();
      for (let i = 0; i != data.length; ++i) { arr[i] = String.fromCharCode(data[i]); }
      let bstr = arr.join("");
      let workbook = XLSX.read(bstr, {
        type: "binary", cellDates: true,
        cellNF: false,
        cellText: false
      });
      let first_sheet_name = workbook.SheetNames[0];
      this.worksheet = workbook.Sheets[first_sheet_name];
      this.ExclDta = XLSX.utils.sheet_to_json(this.worksheet, { raw: true });

      this.columnDefsRcrd = [
        { headerName: 'APSFL Code*', field: 'APSFL Code*', cellStyle: { 'text-align': "center" }, cellClass: "pm-grid-number-cell", width: 60, height: 40 },
        { headerName: 'District*', field: 'District*', cellStyle: { 'text-align': "center" }, cellClass: "pm-grid-number-cell", width: 200, height: 40, filter: true },
        { headerName: 'Mandal*', field: 'Mandal*', cellStyle: { 'text-align': "center" }, cellClass: "pm-grid-number-cell", width: 200, height: 40, filter: true },
        { headerName: 'ONT Location*', field: 'ONT Location*', cellStyle: { 'text-align': "center" }, cellClass: "pm-grid-number-cell", width: 200, height: 40, filter: true },
        { headerName: 'Organization Name', field: 'Organization Name', cellStyle: { 'text-align': "center" }, cellClass: "pm-grid-number-cell", width: 200, height: 40, filter: true },
        { headerName: 'Address', field: 'Address', cellStyle: { 'text-align': "center" }, cellClass: "pm-grid-number-cell", width: 200, height: 40, filter: true },
        { headerName: 'Contact Person Mobile No*', field: 'Contact Person Mobile No*', cellStyle: { 'text-align': "center" }, cellClass: "pm-grid-number-cell", width: 60, height: 40 },
        { headerName: 'Contact Person Name*', field: 'Contact Person Name*', cellStyle: { 'text-align': "center" }, cellClass: "pm-grid-number-cell", width: 200, height: 40, filter: true },
        { headerName: 'Contact Person Designation', field: 'Contact Person Designation', cellStyle: { 'text-align': "center" }, cellClass: "pm-grid-number-cell", width: 200, height: 40, filter: true },
        { headerName: 'Email*', field: 'Email*', cellStyle: { 'text-align': "center" }, cellClass: "pm-grid-number-cell", width: 200, height: 40, filter: true },
        { headerName: 'Payment Responsible*', field: 'Email	Payment Responsible*', cellStyle: { 'text-align': "center" }, cellClass: "pm-grid-number-cell", width: 200, height: 40, filter: true },
        { headerName: 'SI LMO Code*', field: 'SI LMO Code*', cellStyle: { 'text-align': "center" }, cellClass: "pm-grid-number-cell", width: 200, height: 40, filter: true },
        { headerName: 'Longitude', field: 'Longitude', cellStyle: { 'text-align': "center" }, cellClass: "pm-grid-number-cell", width: 200, height: 40, filter: true },
        { headerName: 'Latitude', field: 'Latitude', cellStyle: { 'text-align': "center" }, cellClass: "pm-grid-number-cell", width: 200, height: 40, filter: true },
      ]
      if (this.ExclDta.length == 0) { 
        this.isValid = false;   
        
      }
     
      this.ttlRcds = this.ExclDta.length;
      // this.isValid = true;
      // this.exclGrid = true;
      for (let i = 0; i < this.ExclDta.length; i++) {
        if (typeof this.ExclDta[i]["APSFL Code*"] !== 'string'
        || typeof this.ExclDta[i]["District*"] !== 'string'
        || typeof this.ExclDta[i]["Payment Responsible*"] !== 'string'
        || typeof this.ExclDta[i]["Mandal*"] !== 'string'
        || typeof this.ExclDta[i]["Village*"] !== 'string'
        || typeof this.ExclDta[i]["Contact Person Name*"] !== 'string'
        || typeof this.ExclDta[i]["ONT Location*"] !== 'string'
        || typeof this.ExclDta[i]["SI LMO Code*"] !== 'string'
         ) {
          this.isValid = false;
          this.exclGrid = false;
          break;
        } else {
          this.isValid = true;
          this.exclGrid = true;
          
        }

      }
      this.getagntid()
    };
    readFile.readAsArrayBuffer(this.fileUploaded);
  }

  saveBulkUpload() {
 console.log(this.ExclDta)
 this.loader = true;
//  this.cstmr_dta.cstmr_id;
 for (let i = 0; i < this.ExclDta.length; i++) {
   if(this.ExclDta[i][ "Payment Responsible*"]=='Yes'){
    this.ExclDta[i][ "Pay_Res_in"]=1
   }else{
    this.ExclDta[i][ "Pay_Res_in"]=0
   }
   console.log(this.cstmr_dta)
  this.ExclDta[i]['pcstmr_id'] = this.cstmr_dta.cstmr_id;
  this.ExclDta[i]["status"] = 1;
  this.ExclDta[i]["enty_sts_id"] = 1;
  this.ExclDta[i]["agnt_id"] = this.agntid[0][ "agnt_id"]
  this.ExclDta[i]["apsflcode"] = this.ExclDta[i][ "APSFL Code*"]
  this.ExclDta[i]["lmo_agnt_cd"] =this.ExclDta[i][ "SI LMO Code*"]
  this.ExclDta[i]["mso_agnt_cd"] = this.ExclDta[i][ "SI LMO Code*"]
  this.ExclDta[i]["lat"] =this.ExclDta[i][ "Longitude"]
  this.ExclDta[i]["lng"] = this.ExclDta[i][ "Latitude"]
  this.ExclDta[i]["crnt_caf_sts_id"] = 1
  this.ExclDta[i]["caf_type_id"] = 1
  this.ExclDta[i]["lg_id"] = "lag::"
  this.ExclDta[i]["blble_caf_in"] = 0;
  this.ExclDta[i]["cnctn_sts_id"] = 1;
  this.ExclDta[i]["olt_crd_nu"] = "1234"
  this.ExclDta[i]["stpbx_id"] = 1234
  this.ExclDta[i]["frst_nm"] = this.ExclDta[i]["Organization Name"]
  this.ExclDta[i]["cnct_prsn_nm"] = this.ExclDta[i]["Contact Person Name*"]
  this.ExclDta[i]["mbl_nu"] = this.ExclDta[i]["Contact Person Mobile No*"]
  this.ExclDta[i]["cnct_prsn_desg"] = this.ExclDta[i]["Contact Person Designation"]
  this.ExclDta[i]["dob_dt"] = "6/7/18" 
  this.ExclDta[i]["loc_eml1_tx"] = this.ExclDta[i]["Email*"]
  this.ExclDta[i]["actvn_dt"] = "6/7/18"  
  this.ExclDta[i]["olt_id"] = 1
  this.ExclDta[i]["olt_srl_nu"] = 1
  this.ExclDta[i]["olt_ip_addr_tx"] = "1:23"
  this.ExclDta[i]["crnt_pckge_id"] = 1
  this.ExclDta[i]["frqncy_id"] = 1
  this.ExclDta[i]["olt_prt_id"] = 1
  this.ExclDta[i]["olt_prt_splt_tx"] = 1
  this.ExclDta[i]["instl_buildingname"] = "polaris"
  this.ExclDta[i]["instl_streetname"] = "dhanvaipeta"
  this.ExclDta[i]["OlT_Lctn"]=this.ExclDta[i]["ONT Location*"]
  this.ExclDta[i]["loc_lcly_tx"] = this.ExclDta[i]["Address"]
  this.ExclDta[i]["blng_ste_id"] = 0
  this.ExclDta[i]["loc_dstrct_id"] = 0                                            
  this.ExclDta[i]["loc_mndl_id"] = 0
  this.ExclDta[i]["loc_vlge_id"] = 0
  this.ExclDta[i]["lst_nm"] = " "
  this.ExclDta[i]["mdlr_nm"] = " "
  this.ExclDta[i]["adhr_nu"] = 7432
  this.ExclDta[i]["pan_nu"] = 7432
  this.ExclDta[i]["caf_mac_addr_tx"] = "7432"
  this.ExclDta[i]["blng_ste_nm"] = "andhra pradesh"
  this.ExclDta[i]["loc_dstrct_nm"] = this.ExclDta[i]["District*"]
  this.ExclDta[i]["loc_mndl_nm"] = this.ExclDta[i]["Mandal*"]
  this.ExclDta[i]["loc_vlge_nm"] = this.ExclDta[i]["Village*"]
  this.ExclDta[i]["slctdpacg"] =this.seltdpackagedat
 }
 console.log(this.ExclDta)
 const rte = "caf/bulkcaf";
 this.crdSrv.create(this.ExclDta, rte).subscribe((res) => {
  console.log(res);
  if (res['status'] == 200) {
    this.route.navigate([`/admin/caf/enterprice/organization`]) 
    this._snackBar.open("Sucessfully Added", '', {
      duration: 2000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
    // this.loader = false;
  

  }


});

  }


}
