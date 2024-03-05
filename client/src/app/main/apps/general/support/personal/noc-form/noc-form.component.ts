import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CrudService } from 'app/main/apps/crud.service';
import { Location } from '@angular/common';
import { DatePipe } from '@angular/common';
import {
  MatTableDataSource, MatPaginator, MatSort, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition, MatDialogRef, MatSnackBar, MatDialog,
  MAT_DIALOG_DATA
} from '@angular/material';

@Component({
  selector: 'app-noc-form',
  templateUrl: './noc-form.component.html',
  styleUrls: ['./noc-form.component.scss']
})
export class NocFormComponent implements OnInit {
  getHeaderDtls = function () { return { "title": 'New Ticket', "icon": "people_outline" } }
  categryID: string;
  CategoryDtls: any;
  descrptn: any;
  lngdescrptn: any;
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  attach_image: {};
  // img: {};
  tktParamsDta = [];
  fileUploaded: any;
  upldFileNm: any;
  imageUrl: string | ArrayBuffer;
  imgfilename: string;
  app_icon: string;
  VendorDtls: any;
  VendorID: any;
  ElementDtls: any;
  TypeID: number;
  sche_strt: string;
  sche_end: string;
  exe_rslts: string;
  rls_nts: string;
  sftwre_dtls: string;
  hrwre_dtls: string;
  prps_chngs: string;
  vndr_tkts: string;
  ElementID: any;
  tls_nded: string;
  flrs_txt: string;
  searchLoader: boolean = false;
  ctgrydtls: boolean = true;
  flrs_rslt_txt: string;
  subcategryID:any;
  issueTypeID:any;
  issueIndefierID:any;
  teamID:any;
  subCategoryDtls:any;
  issueTypesDtls:any;
  issueIndefierDtls:any;
  teamsDtls:any;
  constructor(private route: ActivatedRoute, private crdsrv: CrudService, public router: Router, private location: Location, private snackBar: MatSnackBar, public datePipe: DatePipe) {
    this.route.queryParams.subscribe(params => {
      console.log(params.paramsdata);
      if (params.paramsdata) {
        this.tktParamsDta = JSON.parse(params.paramsdata);
      }
    })
  }

  ngOnInit() {
    console.log(this.tktParamsDta)
    this.ForVendors();
    this.ForCategory();
  }
  backBtn() {
    console.log("Back")
    this.router.navigate(['/admin/support/personal/ticketlst'], { queryParams: { "paramsdata": 1 } });
    this.location.replaceState('/admin/support/personal/ticketlst');
  }
  ForCategory() {
    this.TypeID = 9;
    this.categryID = '';
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
    console.log(this.TypeID);
    console.log(this.categryID);
    this.subcategryID='';
    this.issueTypeID='';
    this.issueIndefierID='';
    this.teamID='';
    this.ForTeams();
    const rte = `ticket/getSubCategory/${this.TypeID}/${this.categryID}`
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
        this.ctgrydtls= true;
      }
      else{
        this.issueTypeID=''
        this.ctgrydtls= false;
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

  ForVendors() {
    const rte = `ticket/getVendors`
    this.crdsrv.get(rte).subscribe(res => {
      this.VendorDtls = res['data'];
      console.log(this.VendorDtls);
    })
  }

  ForElement() {
    console.log(this.VendorID)
    const rte = `ticket/getElements/${this.VendorID}`
    this.crdsrv.get(rte).subscribe(res => {
      this.ElementDtls = res['data'];
      console.log(this.ElementDtls);

    })
  }

  resetTckInfrmtn() {
    // this.TypeID = '';
    this.categryID = '';
    this.sche_strt = '';
    this.sche_end = '';
    this.exe_rslts = '';
    this.rls_nts = '';
    this.sftwre_dtls = '';
    this.hrwre_dtls = '';
    this.prps_chngs = '';
    this.vndr_tkts = '';
    this.VendorID = '';
    this.ElementID = '';
    this.tls_nded = '';
    this.flrs_txt = '';
    this.flrs_rslt_txt = '';
    this.descrptn = '';
    this.lngdescrptn = '';
    // this.CategoryDtls = [];
    this.imageUrl = '';
    this.imgfilename = '';
    this.app_icon = ''
  }
  saveTckInfrmtn() {
    console.log(this.categryID);
    console.log(this.VendorID);
    console.log(this.ElementID);
    console.log(this.descrptn);
    console.log(this.tktParamsDta);
    console.log(this.teamID);
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
    this.sche_strt = this.datePipe.transform(this.sche_strt, 'yyyy-MM-dd');
    this.sche_end = this.datePipe.transform(this.sche_end, 'yyyy-MM-dd');
    if(this.categryID != '' && this.VendorID != undefined || "" && this.ElementID != undefined || "" &&  this.descrptn != undefined || "" && this.subcategryID !=undefined || ""  ){
      if(this.teamID != ''){
    var postdata = {
      type: 9,
      category: this.categryID,
      subcategory: this.subcategryID,
      issuetype:  this.issueTypeID? this.issueTypeID.length>0? this.issueTypeID: 0 :0,
      issueIdentifier:this.issueIndefierID? this.issueIndefierID.length>0? this.issueIndefierID: 0 :0,
      lmo_id: 0,
      team: this.teamID,
      status: 7,
      cre_tm_id: 5,
      priority: 3,
      schedulestart: this.sche_strt?this.sche_strt:0,
      scheduleend: this.sche_end?this.sche_end:0,
      expectedresults: this.exe_rslts? this.exe_rslts.length>0? this.exe_rslts: 0 :0,
      releasenotes: this.rls_nts? this.rls_nts.length>0? this.rls_nts: 0 :0,
      softwaredetails:this.sftwre_dtls ? this.sftwre_dtls.length>0? this.sftwre_dtls: 0 :0,
      hardwaredetails: this.hrwre_dtls ? this.hrwre_dtls.length>0? this.hrwre_dtls: 0 :0,
      praposerchanges: this.prps_chngs?this.prps_chngs:0,
      vendorticket: this.vndr_tkts?this.vndr_tkts:0,
      vendorid: this.VendorID,
      elementid: this.ElementID,
      toolsneeded: this.tls_nded?this.tls_nded:0,
      failures:  this.flrs_txt ? this.flrs_txt.length>0? this.flrs_txt: 0 :0,
      failurersolution: this.flrs_rslt_txt? this.flrs_rslt_txt.length>0? this.flrs_rslt_txt: 0 :0,
      description: this.descrptn ? this.descrptn.length>0? this.descrptn: 0 :0,
      longdescription:this.lngdescrptn ? this.lngdescrptn.length>0? this.lngdescrptn: 0 :0,
      attah_data: this.attach_image
    }
    this.searchLoader=true;
    console.log(postdata);
    // return
    this.crdsrv.create(postdata, 'ticket/insert/ticketDetails').subscribe(res => {
      console.log(res);
      if (res['status'] = 200) {
        this.searchLoader=false;
        
        this.snackBar.open("Sucessfully Created", '', {
          duration: 2000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
        this.backBtn();

      }
    })
  } else{
    this.searchLoader=false;
    this.snackBar.open("Please select Assign Team", '', {
      duration: 5000,
      panelClass: ['red-snackbar'],
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }
  } else{
    this.searchLoader=false;
    this.snackBar.open("Please Fill Mandotory Fields (*)", '', {
      duration: 5000,
      panelClass: ['red-snackbar'],
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }
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
      reader.onload = (_event: any) => {
        this.imageUrl = _event.target.result;
        this.imgfilename = event.target.files[0].name
        console.log(this.imageUrl)
        console.log(this.imgfilename)
        let img = {}
        img = {
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
  removeImg() {
    this.imageUrl = '';
    this.imgfilename = '';
    this.app_icon = ''

  }

}
