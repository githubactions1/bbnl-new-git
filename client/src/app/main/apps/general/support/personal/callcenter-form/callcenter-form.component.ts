import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CrudService } from 'app/main/apps/crud.service';
// import { Router } from '@angular/router';
import { Location } from '@angular/common';
import {
  MatTableDataSource, MatPaginator, MatSort, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition, MatDialogRef, MatSnackBar, MatDialog,
  MAT_DIALOG_DATA
} from '@angular/material';


@Component({
  selector: 'app-callcenter-form',
  templateUrl: './callcenter-form.component.html',
  styleUrls: ['./callcenter-form.component.scss']
})
export class CallcenterFormComponent implements OnInit {
  // tktParamsDta:any[];
  cafnumbr:any;
  cstmrData: any;
  rowData = [];
  showTble = false;
  shwPrflePge: boolean;
  columnDefs = [];
  allsrc_itms = []
  items = [];
  rcntSrchItms=[];
  searchData: any;
  tableview:boolean = false;
  frontJsonData:any;
  previousSearchData = [];
  searchLoader: boolean = false;
  TypeID:any;
  categryID:any;
  subcategryID:any;
  issueTypeID:any;
  issueIndefierID:any;
  teamID:any;
  prortyID:any;
  CategoryDtls:any;
  subCategoryDtls:any;
  issueTypesDtls:any;
  issueIndefierDtls:any;
  teamsDtls:any;
  stsDtls:any;
  prtyDtls:any;
  descrptn:any;
  lngdescrptn:any;
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  getHeaderDtls = function () { return { "title": 'New Ticket', "icon": "people_outline" } }
  tktParamsDta=[];
  fileUploaded: any;
  upldFileNm: any;
  // uploadedFiles: Array < File > ;
  imageUrl: string | ArrayBuffer;
  imgfilename: string;
  attach_image: {};
  app_icon: string;
  constructor(private route: ActivatedRoute,private crdsrv: CrudService,public router: Router,private location: Location,private snackBar: MatSnackBar,) {
    this.route.queryParams.subscribe(params => {
      console.log(params.paramsdata);
      if(params.paramsdata){
      this.tktParamsDta=JSON.parse(params.paramsdata);
      }
    })
  }

  ngOnInit() {
    this.getStatus();
    this.getpriority();
    console.log(this.tktParamsDta);
    console.log(this.tktParamsDta.length);
    // if(this.tktParamsDta.length == 1){
    //   this.TypeID=this.tktParamsDta[0].tckt_type_id;
      this.ForCategory();
    // }
    // else{
    //   this.TypeID=''
    // }

  }
  ForCategory(){
    console.log(this.TypeID);
    this.categryID='';
    this.subcategryID='';
    this.issueTypeID='';
    this.issueIndefierID='';
    this.teamID='';
    this.TypeID = 8;
    const rte = `ticket/getCategories/${this.TypeID}`
    this.crdsrv.get(rte).subscribe(res => {
      this.CategoryDtls = res['data'];
      console.log(this.CategoryDtls);
      console.log(this.CategoryDtls.length);
      if(this.CategoryDtls.length == 1){
        this.categryID=this.CategoryDtls[0].tckt_ctgry_id;
        this.ForSubCategory();
      }
      else{
        this.categryID=''
      }
    })
  }
  ForSubCategory(){
    console.log(this.categryID);
    this.subcategryID='';
    this.issueTypeID='';
    this.issueIndefierID='';
    this.teamID='';
    this.ForTeams();
    const rte = `ticket/getSubCategories/${this.categryID}`
    this.crdsrv.get(rte).subscribe(res => {
      this.subCategoryDtls = res['data'];
      console.log(this.subCategoryDtls);
      console.log(this.subCategoryDtls.length);
      if(this.subCategoryDtls.length == 1){
        this.subcategryID=this.subCategoryDtls[0].tckt_sb_ctgry_id;
        this.ForIssueType();
      }
      else{
        this.subcategryID=''
      }
    })
  }
  ForIssueType(){
    console.log(this.subcategryID);
    this.issueTypeID='';
    this.issueIndefierID='';
    this.teamID='';
    this.ForTeams();
    const rte = `ticket/getissueTypes/${this.categryID}/${this.subcategryID}`
    this.crdsrv.get(rte).subscribe(res => {
      this.issueTypesDtls = res['data'];
      console.log(this.issueTypesDtls);
      console.log(this.issueTypesDtls.length);
      if(this.issueTypesDtls.length == 1){
        this.issueTypeID=this.issueTypesDtls[0].ise_type_id;
        this.ForIssueIndefiers();
      }
      else{
        this.issueTypeID=''
      }
    })
  }
  ForIssueIndefiers(){
    this.issueIndefierID='';
    this.teamID='';
    this.ForTeams();
    const rte = `ticket/getissueIdentifiers/${this.issueTypeID}`
    this.crdsrv.get(rte).subscribe(res => {
      this.issueIndefierDtls = res['data'];
      console.log(this.issueIndefierDtls);
      console.log(this.issueIndefierDtls.length);
      if(this.issueIndefierDtls.length == 1){
        this.issueIndefierID=this.issueIndefierDtls[0].ise_idnfr_id;
        this.ForTeams();
      }
      else{
        this.issueIndefierID=''
      }
    })
  }
  ForTeams(){
    console.log(this.issueIndefierID);
    this.teamID='';
    var data = {
      type:this.TypeID?this.TypeID:0,
      category:this.categryID?this.categryID:0,
      subcategory:this.subcategryID?this.subcategryID:0,
      issuetype:this.issueTypeID?this.issueTypeID:0,
      isseidentifier:this.issueIndefierID?this.issueIndefierID:0
    }
    console.log(data);
    this.crdsrv.create(data, 'ticket/getTeams').subscribe(res => {
      this.teamsDtls = res['data'];
      console.log(this.teamsDtls);
      console.log(this.teamsDtls.length);
      if(this.teamsDtls.length == 1){
        this.teamID=this.teamsDtls[0].tm_id;
      }
      else{
        this.teamID=''
      }
    })
  }
  

  getStatus(){
    const rte = 'support/Ticket-Status'
    this.crdsrv.get(rte).subscribe(res => {
      this.stsDtls = res['data'];
      console.log(this.stsDtls)
    })
  }
  getpriority(){
    const rte = 'support/Priority'
    this.crdsrv.get(rte).subscribe(res => {
      this.prtyDtls = res['data'];
      console.log(this.prtyDtls)
    })
  }
  resetTckInfrmtn(){
    this.TypeID='';
    this.categryID='';
    this.subcategryID='';
    this.issueTypeID='';
    this.issueIndefierID='';
    this.teamID='';
    this.prortyID='';
    this.descrptn='';
    this.CategoryDtls=[];
    this.subCategoryDtls=[];
    this.issueTypesDtls=[];
    this.issueIndefierDtls=[];
    this.teamsDtls=[];
    this.imageUrl = '';
    this.imgfilename = '';
    this.app_icon= ''
  }
  saveTckInfrmtn(){
    console.log(this.TypeID);
    console.log(this.categryID);
    console.log(this.subcategryID);
    console.log(this.issueTypeID);
    console.log(this.issueIndefierID);
    console.log(this.teamID);
    console.log(this.prortyID);
    console.log(this.descrptn);
    console.log(this.tktParamsDta);
    if(this.attach_image != undefined || "" ){
      this.attach_image = this.attach_image
    } else{
      let img1 = {}
      img1 = {
        base64: this.imageUrl,
        file_name: 0
      }
      this.attach_image = img1
    }
    var postdata = {
      caf: this.cafnumbr,
      type:8,
      category:this.categryID,
      subcategory:this.subcategryID,
      issuetype:this.issueTypeID,
      issueIdentifier:this.issueIndefierID,
      team:this.teamID,
      status:7,
      cre_tm_id: 2,
      lmo_id: this.cstmrData.lmo_agnt_id,
      // priority:this.prortyID,
      priority:3,
      description: this.descrptn ? this.descrptn.length>0? this.descrptn: 0 :0,
      longdescription:this.lngdescrptn ? this.lngdescrptn.length>0? this.lngdescrptn: 0 :0,
      attah_data: this.attach_image
      // array:this.tktParamsDta
    }
    this.searchLoader = true;
    console.log(postdata);
    this.crdsrv.create(postdata, 'ticket/insert/ticketDetails').subscribe(res => {
      console.log(res);
      if (res['status'] = 200) {
        this.searchLoader = false;
        
        this.snackBar.open("Sucessfully Created", '', {
          duration: 2000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
        this.backBtn();
        
      }
    })
  }


  uploadedFile(event) {
    console.log(event)
    // console.log("Called")
    // this.fileUploaded = event.target.files[0];
    // this.upldFileNm = this.fileUploaded.name;
    let reader = new FileReader();
  let file = event.target.files[0];
  console.log(file);
  if (event.target.files && event.target.files[0]) {
    reader.readAsDataURL(file);
    reader.onload  = (_event: any) => {
      this.imageUrl = _event.target.result;
      this.imgfilename = event.target.files[0].name
      console.log(this.imageUrl)
      console.log(this.imgfilename)
      let img ={}
      img ={
        base64: this.imageUrl,
        file_name: this.imgfilename
      }
      this.attach_image = img
      // this.ticketFormGroup.patchValue({
      //   app_icon: reader.result
      // });
      console.log('______________________________');
    }
  }
    // this.readExcel();
    // this.shwrcds = true;
    // this.lmoSlctd = true;
  }
  removeImg(){
    this.imageUrl = '';
    this.imgfilename = '';
    this.app_icon= ''
    
  }



  backBtn(){
    console.log("Back") 
    this.router.navigate(['/admin/support/personal/ticketlst'],{ queryParams: { "paramsdata": 1 }});
   this.location.replaceState('/admin/support/personal/ticketlst');
   }
 
 
 

  ///////////////////////////////////////////TO GET CAF  DETAILS////////////////////////////////////////////////////
  
  getDetails() {
    console.log(this.cafnumbr);
    if (this.cafnumbr) {
      console.log("CAF");
      var data = {
        mobileno: 0,
        CAf: this.cafnumbr,
        adhar: 0,
        iptv: 0,
        onu: 0,
      }
      console.log(data);
      this.searchLoader = true;
      this.crdsrv.create(data, 'caf/getdt').subscribe(res => {
        this.rowData = res['data'];
        this.searchLoader = false;
        console.log(this.rowData);
        if (res['data'].length > 1){
          this.setRcntSrchLclStrge(data);
          this.showTble = true;
          this.shwPrflePge = false;
        } else {
          this.setRcntSrchLclStrge(data);
          this.showTble = false;
          this.shwPrflePge = true;
          let cstmrData = [];
          cstmrData['data'] = res['data'][0];
          cstmrData['value'] = 'Profile';
          // console.log(cstmrData);
          this.onCellClick(cstmrData);
        }
      })
      this.columnDefs = [
        { headerName: 'Sno', field: 'sno', algnmnt: 'center', cellClass: 'pm-grid-number-cell', width: 100, filter: false, search: false },
        { headerName: 'CAF No', field: 'caf_nu', algnmnt: 'left', cellClass: 'pm-grid-number-cell', width: 150, filter: true, filterOperations: ['contains', 'startswith', '='] },
        { headerName: 'Profile', field: 'Profile', algnmnt: 'center', cellClass: 'pm-grid-number-cell', width: 100, height: 40, columnFiltering: false,  filter: true },
        { headerName: 'Name', field: 'cstmr_nm', cellClass: 'pm-grid-number-cell', width: 150, filter: true },
        { headerName: 'Mobile Number', field: 'cntct_mble1_nu', algnmnt: 'center', cellClass: 'pm-grid-number-cell', width: 150, filter: true, filterOperations: ['contains', 'startswith', '='], selectedFilterOperation: 'contains', allowFiltering: true },
        { headerName: 'Status', field: 'sts_nm', cellClass: 'pm-grid-number-cell', width: 125, filter: true },
        { headerName: 'LMO', field: 'lmo_cd', cellClass: 'pm-grid-number-cell', width: 125, filter: true },
        { headerName: 'Billing Frequency', field: 'frqncy_nm', cellClass: 'pm-grid-number-cell', width: 110, filter: true },
        { headerName: 'Activation Date', field: 'actvn_dt', algnmnt: 'center', cellClass: 'pm-grid-number-cell', width: 125, filter: true },
        { headerName: 'Suspended Date', field: 'spnd_dt', algnmnt: 'center', cellClass: 'pm-grid-number-cell', width: 125, filter: true,hide:true },
        { headerName: 'Resume Date', field: ' rsme_dt', algnmnt: 'center', cellClass: 'pm-grid-number-cell', width: 125, filter: true,hide:true },
        { headerName: 'Termination Date', field: 'trmnd_dt', algnmnt: 'center', cellClass: 'pm-grid-number-cell', width: 125, filter: true,hide:true }
      ];
    }
  }
  setRcntSrchLclStrge = (rcnt_srch) => {

    let srch_items = {
      rcnt_srch: rcnt_srch,
      time: new Date().toLocaleString()
    }
    this.allsrc_itms = JSON.parse(localStorage.getItem('rcntSrch'))
    // console.log(this.allsrc_itms)
    if(this.allsrc_itms!=null){
      this.allsrc_itms.push({'search':srch_items})
      localStorage.setItem('rcntSrch', JSON.stringify(this.allsrc_itms));
    }
    else{
      this.items.push({'search':srch_items})
      localStorage.setItem('rcntSrch', JSON.stringify(this.items));
    }
    this.getRcntSrchItmsLclStrge();
   
  }

  onCellClick(data) {
    if (data.value == 'Profile'){
    this.cstmrData = data.data;
     console.log(this.cstmrData);
    this.shwPrflePge = true;
    }
  }

  getRcntSrchItmsLclStrge = () => {
    var finaldata = [];
    let srch_val: any = localStorage.getItem('rcntSrch');
     this.rcntSrchItms = srch_val = JSON.parse(srch_val);
    if(this.rcntSrchItms != null){
      let rte='caf/customer/previousSearch'
      this.crdsrv.create(this.rcntSrchItms,rte).subscribe((res) => {
        // console.log(res['data']);
        this.searchData = res['data'];
        if(res['status'] == 200){
          this.tableview=true;
          // console.log(this.searchData);
          // console.log(this.searchData.length);
          for(var m=0; m<this.searchData.length; m++){
            finaldata.push(this.searchData[m][0])
          }
          // console.log(finaldata);
          this.frontJsonData=finaldata;
          // console.log(this.frontJsonData);
           var index=0;
        for(var n=0; n<this.frontJsonData.length; n++){
         if(this.frontJsonData[n]){
          index = index + 1;
           this.frontJsonData[n].sno=index;
         }
        }
       // console.log(this.frontJsonData);
         
          this.previousSearchData = [
            { headerName: 'Sno', field: 'sno', algnmnt: 'center', cellClass: 'pm-grid-number-cell', width: 100, filter: false, search: false },
            { headerName: 'CAF No', field: 'caf_nu', algnmnt: 'left', cellClass: 'pm-grid-number-cell', width: 150, filter: true, filterOperations: ['contains', 'startswith', '='] },
            { headerName: 'Name', field: 'cstmr_nm', cellClass: 'pm-grid-number-cell', width: 150, filter: true },
            { headerName: 'Mobile Number', field: 'cntct_mble1_nu', algnmnt: 'center', cellClass: 'pm-grid-number-cell', width: 150, filter: true, filterOperations: ['contains', 'startswith', '='], selectedFilterOperation: 'contains', allowFiltering: true },
            { headerName: 'Status', field: 'sts_nm', cellClass: 'pm-grid-number-cell', width: 125, filter: true },
            { headerName: 'LMO', field: 'lmo_cd', cellClass: 'pm-grid-number-cell', width: 125, filter: true },
            { headerName: 'Billing Frequency', field: 'frqncy_nm', cellClass: 'pm-grid-number-cell', width: 110, filter: true },
            { headerName: 'Activation Date', field: 'actvn_dt', algnmnt: 'center', cellClass: 'pm-grid-number-cell', width: 125, filter: true },
            { headerName: 'Suspended Date', field: 'spnd_dt', algnmnt: 'center', cellClass: 'pm-grid-number-cell', width: 125, filter: true },
            { headerName: 'Resume Date', field: ' rsme_dt', algnmnt: 'center', cellClass: 'pm-grid-number-cell', width: 125, filter: true },
            { headerName: 'Termination Date', field: 'trmnd_dt', algnmnt: 'center', cellClass: 'pm-grid-number-cell', width: 125, filter: true }
          ];
        }
    
      })
    }
    else if(this.rcntSrchItms == null){
      this.tableview=false;
    }
   
  }
  onCellPrepared(colDef, e) {
    
    if (e.rowType === 'data' && e.row.data && e.column.dataField == 'Profile') {
      e.cellElement.style.color = '#ff0000';
      e.cellElement.style.fontWeight = 500;
      e.cellElement.style.borderRadius = '10px';
       e.cellElement.style.background = 'rgba(243, 191, 176, 0.2784313725490196)';
       e.cellElement.style.backgroundClip = 'content-box';
       e.cellElement.style.cursor = 'pointer';
    }
 
}

}
