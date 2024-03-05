import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TransfereService } from 'app/providers/transfer/transfer.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { CrudService } from 'app/main/apps/crud.service';
import { MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition, MatSnackBar } from '@angular/material';
import { Location } from '@angular/common';
import { DatePipe } from '@angular/common';
import * as _moment from 'moment';
const moment = _moment;


@Component({
  selector: 'app-ticket-noc-edit',
  templateUrl: './ticket-noc-edit.component.html',
  styleUrls: ['./ticket-noc-edit.component.scss']
})
export class TicketNocEditComponent implements OnInit {
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  reqData: any;
  guillaumeNery;
  CreateTicketDtls: any;
  TypeID: any;
  VendorDtls: any;
  ElementDtls: any;
  VendorID: any;
  CategoryDtls: any;
  categryID: any;
  array = [];
  attach_image: {};
  columnDefs = [];
  rowData;
  actionsarray = [{ ticket_Id: '', previousid: '', changedid: '', keyid: '1', keyname: 'Type' },
  { ticket_Id: '', previousid: '', changedid: '', keyid: '2', keyname: 'Category' },
  { ticket_Id: '', previousid: '', changedid: '', keyid: '3', keyname: 'Sub_Category' },
  { ticket_Id: '', previousid: '', changedid: '', keyid: '4', keyname: 'Status' },
  { ticket_Id: '', previousid: '', changedid: '', keyid: '5', keyname: 'IssueType' },
  { ticket_Id: '', previousid: '', changedid: '', keyid: '6', keyname: 'Issue_Identifier' },
  { ticket_Id: '', previousid: '', changedid: '', keyid: '16', keyname: 'Assign Team' },
  { ticket_Id: '', previousid: '', changedid: '', keyid: '17', keyname: 'Assign User' },
  { ticket_Id: '', previousid: '', changedid: '', keyid: '8', keyname: 'Priority' },
  { ticket_Id: '', previousid: '', changedid: '', keyid: '9', keyname: 'Vendor' },
  { ticket_Id: '', previousid: '', changedid: '', keyid: '10', keyname: 'Elements' },
  { ticket_Id: '', previousid: '', changedid: '', keyid: '11', keyname: 'Sechdule Start' },
  { ticket_Id: '', previousid: '', changedid: '', keyid: '12', keyname: 'Sechdule End' }]
  comment: any;
  statusID: any;
  prortyID: any;
  assignID: any;
  stsDtls: any;
  prtyDtls: any;
  assignTeamDtls: any;
  ElementID: any;
  sche_strt: any;
  sche_end: any;
  lngdescrptn: any;
  descrptn: any;
  flrs_txt: any;
  hrwre_dtls: any;
  sftwre_dtls: any;
  exe_rslts: any;
  rls_nts: any;
  prps_chngs: any;
  vndr_tkts: any;
  tls_nded: any;
  flrs_rslt_txt: any;
  searchLoader: boolean = false;
  imageUrl: string | ArrayBuffer;
  imgfilename: string;
  app_icon: string;
  columnDefss= [];
  attchData;
  subcategryID: any;
  issueTypeID: any;
  issueIndefierID: any;
  subCategoryDtls: any;
  issueTypesDtls: any;
  issueIndefierDtls: any;
  ctgrydtls: boolean = true;
  AssignDtls: any;
  assignUserID: any;
  // picker1: any;

  constructor(private route: ActivatedRoute, public router: Router, private crdsrv: CrudService, public TransfereService: TransfereService, public fb: FormBuilder, public snackBar: MatSnackBar ,
    private location: Location,public datePipe: DatePipe) {
    this.route.queryParams.subscribe(params => {
      console.log(params);

    });
    this.reqData = this.TransfereService.getLoclData('data');
    this.guillaumeNery=this.reqData.tckt_id.toString();
    console.log(this.reqData);
    console.log("NOCEDITTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT");
   }

  ngOnInit() {
    this.getDetailsToCreate();
    this.getStatus();
    this.getpriority();
    this.ForVendors();
    this.getdata();
    this.getTktHstDetails();
    this.getTktAttchDetails();
    // this.getAssignTeam();
  }
  getdata(){
    console.log(this.reqData.schdle_strt_ts);
    console.log(this.reqData.schdle_end_ts);
    // this.sche_strt=this.datePipe.transform(this.reqData.schdle_strt_ts, 'd/M/yyyy');
    // this.sche_end=moment(this.reqData.schdle_end_ts).format('yyyy-dd-MM');
    // this.sche_end=this.datePipe.transform(this.reqData.schdle_end_ts, 'd/M/yyyy');
    // this.sche_strt =this.reqData.schdle_strt_ts;
    // this.sche_end = this.reqData.schdle_end_ts;
    console.log(this.sche_strt);
     console.log(this.sche_end);
    this.exe_rslts = this.reqData.exptd_rslt_tx;
    this.rls_nts = this.reqData.rlse_nts_tx;
    this.sftwre_dtls = this.reqData.sftwe_dtls_tx;
    this.hrwre_dtls = this.reqData.hrdwe_dtl_tx;
    this.prps_chngs = this.reqData.prpsd_chngs_tx;
    this.vndr_tkts = this.reqData.vndr_tkt_tx;
    this.tls_nded = this.reqData.tls_nd;
    this.flrs_txt = this.reqData.flrs_tx;
    this.flrs_rslt_txt = this.reqData.flrs_rsltn_tx;
    this.descrptn = this.reqData.dscn_tx;
    this.lngdescrptn = this.reqData.lng_dscn_tx;
  }
  getStatus(){
    const rte = 'support/Ticket-Status'
    this.crdsrv.get(rte).subscribe(res => {
      this.stsDtls = res['data'];
      console.log(this.stsDtls)
    })
    this.statusID = this.reqData.tckt_status_id;
  }
  getpriority(){
    const rte = 'support/Priority'
    this.crdsrv.get(rte).subscribe(res => {
      this.prtyDtls = res['data'];
      console.log(this.prtyDtls)
    })
    this.prortyID = this.reqData.prty_id;
  }
  
  
  getDetailsToCreate() {
    const rte = 'ticket/creation'
    this.crdsrv.get(rte).subscribe((res) => {
      this.CreateTicketDtls = res['data'];
      console.log(this.CreateTicketDtls);
      console.log(this.CreateTicketDtls.length);
      // if (this.CreateTicketDtls.length == 1) {
      //   this.TypeID = this.CreateTicketDtls[0].tckt_type_id;
        this.ForCategory();
      // }
      // else {
      //   this.TypeID = ''
      // }
    })
  }
  ForCategory(){
    console.log(this.TypeID);
    this.TypeID = 9;
    this.categryID='';
    const rte = `ticket/getCategories/${this.TypeID}`
    this.crdsrv.get(rte).subscribe(res => {
      this.CategoryDtls = res['data'];
      console.log(this.CategoryDtls);
      console.log(this.CategoryDtls.length);
      this.categryID = this.reqData.tckt_ctgry_id;
      // if(this.CategoryDtls.length == 1){
      //   this.categryID=this.CategoryDtls[0].tckt_ctgry_id;
      // }
      // else{
      //   this.categryID=''
      // }
      if (this.categryID != 0) {
        this.ForSubCategory();
      }
    })
    
  }
  ForSubCategory() {
    console.log(this.categryID);
    this.subcategryID = '';
    this.issueTypeID = '';
    this.issueIndefierID = '';
    this.assignID = '';
    this.assignUserID='';
    this.ForTeams();
    const rte = `ticket/getSubCategory/${this.TypeID}/${this.categryID}`
    this.crdsrv.get(rte).subscribe(res => {
      this.subCategoryDtls = res['data'];
      console.log(this.subCategoryDtls);
      console.log(this.subCategoryDtls.length);
      this.subcategryID = this.reqData.tckt_sb_ctgry_id;
     
      // if(this.subCategoryDtls.length == 1){
      //   this.subcategryID=this.subCategoryDtls[0].tckt_sb_ctgry_id;
      //   this.ForIssueType();
      // }
      // else{
      //   this.subcategryID=''
      // }
      if (this.subcategryID != 0) {
        this.ForIssueType();
      }
    })
  }
  ForIssueType(){
    console.log(this.subcategryID);
    this.issueTypeID='';
    this.issueIndefierID='';
    this.assignID='';
    this.assignUserID='';
    this.ForTeams();
    const rte = `ticket/getissueTypes/${this.categryID}/${this.subcategryID}`
    this.crdsrv.get(rte).subscribe(res => {
      this.issueTypesDtls = res['data'];
      console.log(this.issueTypesDtls);
      console.log(this.issueTypesDtls.length);
      this.issueTypeID = this.reqData.ise_type_id;
      // console.log("this.issueTypeID")
      console.log(this.issueTypeID)
      if(this.issueTypesDtls.length == 1){
        // this.issueTypeID=this.issueTypesDtls[0].ise_type_id;
        // this.ForIssueIndefiers();
        this.ctgrydtls= true;
      }
      else{
        // this.issueTypeID=''
        this.ctgrydtls= false;
      }
      if (this.issueTypeID != 0 || null) {
        // this.ctgrydtls= true;
        this.ForIssueIndefiers();
      } 
    })
  }

  ForIssueIndefiers(){
    this.issueIndefierID='';
    this.assignID='';
    this.assignUserID='';
    this.ForTeams();
    const rte = `ticket/getissueIdentifiers/${this.issueTypeID}`
    this.crdsrv.get(rte).subscribe(res => {
      this.issueIndefierDtls = res['data'];
      console.log(this.issueIndefierDtls);
      console.log(this.issueIndefierDtls.length);
      this.issueIndefierID = this.reqData.ise_type_id;
      // if(this.issueIndefierDtls.length == 1){
      //   this.issueIndefierID=this.issueIndefierDtls[0].ise_idnfr_id;
        // this.ForTeams();
      // }
      // else{
      //   this.issueIndefierID=''
      // }
    })
  }
  ForTeams(){
    console.log(this.issueIndefierID);
    this.assignID='';
    this.assignUserID='';
    var data = {
      type:this.TypeID?this.TypeID:0,
      category:this.categryID?this.categryID:0,
      subcategory:this.subcategryID?this.subcategryID:0,
      issuetype:this.issueTypeID?this.issueTypeID:0,
      isseidentifier:this.issueIndefierID?this.issueIndefierID:0
    }
    console.log(data);
    this.crdsrv.create(data, 'ticket/getTeams').subscribe(res => {
      this.assignTeamDtls = res['data'];
      console.log(this.assignTeamDtls);
      console.log(this.assignTeamDtls.length);
      this.assignID = this.reqData.assignteamid;
    this.ForassignUsers();
      // if(this.teamsDtls.length == 1){
      //   this.teamID=this.teamsDtls[0].tm_id;
      // }
      // else{
      //   this.teamID=''
      // }
    })
  }

  // getAssignTeam(){
  //   const rte = 'ticket/getassignTeams'
  //   this.crdsrv.get(rte).subscribe(res => {
  //     this.assignTeamDtls = res['data'];
  //     console.log(this.assignTeamDtls);
  //   })
  //   this.assignID = this.reqData.assignteamid;
  //   this.ForassignUsers();
  // }

  ForassignUsers() {
    this.assignUserID='';
    var teamid = this.assignID
    console.log(teamid);
    const rte = `ticket/getAssignUsers/${teamid}`
    this.crdsrv.get(rte).subscribe(res => {
      this.AssignDtls = res['data'];
      console.log(this.AssignDtls);
      this.assignUserID = this.reqData.sprt_usr_id;
      // if(this.reqData.sprt_usr_id != null){
      //   this.assignUserID = this.reqData.sprt_usr_id;
      // } else{
      //   this.assignUserID =''
      // }
    })
   
    
  }

  ForVendors() {
    const rte = `ticket/getVendors`
    this.crdsrv.get(rte).subscribe(res => {
      this.VendorDtls = res['data'];
      console.log(this.VendorDtls);
    })
    this.VendorID = this.reqData.vndr_id;
    if(this.VendorID != 0){
      this.ForElement();
    }
  }

  ForElement() {
    console.log(this.VendorID)
    const rte = `ticket/getElements/${this.VendorID}`
    this.crdsrv.get(rte).subscribe(res => {
      this.ElementDtls = res['data'];
      console.log(this.ElementDtls);
    })
    this.ElementID = this.reqData.elmnt_id;
  }
  backBtn(){
    console.log("Backkkkkkkkkk")
    this.router.navigate(['/admin/support/personal/ticketlst'],{ queryParams: { "paramsdata": 1 }});
   this.location.replaceState('/admin/support/personal/ticketlst');
  }
  update(){
    this.searchLoader = true;
    this.sche_strt = this.datePipe.transform(this.sche_strt, 'yyyy-MM-dd');
    this.sche_end = this.datePipe.transform(this.sche_end, 'yyyy-MM-dd');
    if (this.comment) {
      this.array=[];
      for (var i = 0; i < this.actionsarray.length; i++) {
        // if (this.actionsarray[i].keyname == 'Type') {
        //   this.actionsarray[i].ticket_Id = this.reqData.tckt_id;
        //   this.actionsarray[i].previousid = this.reqData.tckt_type_id;
        //   this.actionsarray[i].changedid = this.TypeID;

        // }
        if (this.actionsarray[i].keyname == 'Category') {
          this.actionsarray[i].ticket_Id = this.reqData.tckt_id;
          this.actionsarray[i].previousid = this.reqData.tckt_ctgry_id;
          this.actionsarray[i].changedid = this.categryID;
        }

        if (this.actionsarray[i].keyname == 'Sub_Category') {
          this.actionsarray[i].ticket_Id = this.reqData.tckt_id;
          this.actionsarray[i].previousid = this.reqData.tckt_sb_ctgry_id;
          this.actionsarray[i].changedid = this.subcategryID;
        }

        if (this.actionsarray[i].keyname == 'Assign Team') {
          this.actionsarray[i].ticket_Id = this.reqData.tckt_id;
          this.actionsarray[i].previousid = this.reqData.assignteamid;
          this.actionsarray[i].changedid = this.assignID;
        }

        if (this.actionsarray[i].keyname == 'Assign User') {
          this.actionsarray[i].ticket_Id = this.reqData.tckt_id;
          this.actionsarray[i].previousid = this.reqData.sprt_usr_id;
          this.actionsarray[i].changedid = this.assignUserID;
        }
       
        if (this.actionsarray[i].keyname == 'Status') {
          this.actionsarray[i].ticket_Id = this.reqData.tckt_id;
          this.actionsarray[i].previousid = this.reqData.tckt_status_id;
          this.actionsarray[i].changedid = this.statusID;
        }
        if (this.actionsarray[i].keyname == 'Priority') {
          this.actionsarray[i].ticket_Id = this.reqData.tckt_id;
          this.actionsarray[i].previousid = this.reqData.prty_id;
          this.actionsarray[i].changedid = this.prortyID;
        }
        if (this.actionsarray[i].keyname == 'Vendor') {
          this.actionsarray[i].ticket_Id = this.reqData.tckt_id;
          this.actionsarray[i].previousid = this.reqData.vndr_id;
          this.actionsarray[i].changedid = this.VendorID;
        }
        if (this.actionsarray[i].keyname == 'Elements') {
          this.actionsarray[i].ticket_Id = this.reqData.tckt_id;
          this.actionsarray[i].previousid = this.reqData.elmnt_id;
          this.actionsarray[i].changedid = this.ElementID;
        }
        // if (this.actionsarray[i].keyname == 'Sechdule Start') {
        //   this.actionsarray[i].ticket_Id = this.reqData.tckt_id;
        //   this.actionsarray[i].previousid = this.reqData.schdle_strt_ts;
        //   this.actionsarray[i].changedid = this.sche_strt;
        // }
        //  if (this.actionsarray[i].keyname == 'Sechdule End') {
        //   this.actionsarray[i].ticket_Id = this.reqData.tckt_id;
        //   this.actionsarray[i].previousid = this.reqData.schdle_end_ts;
        //   this.actionsarray[i].changedid = this.sche_end;
        // }
        
      }

      console.log(this.actionsarray);
      for (var p = 0; p < this.actionsarray.length; p++) {
        if (this.actionsarray[p].previousid != this.actionsarray[p].changedid) {
          this.array.push(this.actionsarray[p])
        }
      }
      console.log(this.array);
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
      var postData = {
        ticket_Id: this.reqData.tckt_id,
        type_Id: 9,
        category_Id: this.categryID > 0 ? this.categryID == this.reqData.tckt_ctgry_id ? 0 : this.categryID : 0,
        subcategory_Id:  this.subcategryID > 0 ? this.subcategryID == this.reqData.tckt_sb_ctgry_id ? 0 : this.subcategryID : 0,
        issueType_Id:  0,
        iisueIdentifier_Id:  0,
        sprtTeam_Id: this.assignID > 0 ? this.assignID == this.reqData.assignteamid ? 0 : this.assignID : 0,
        sprtuser_Id: this.assignUserID > 0 ? this.assignUserID == this.reqData.sprt_usr_id ? 0 : this.assignUserID : 0,
        shouldapproveTeam_Id: 0,
        status: this.statusID > 0 ? this.statusID == this.reqData.tckt_status_id ? 0 : this.statusID : 0,
        prty_Id: this.prortyID > 0 ? this.prortyID == this.reqData.prty_id ? 0 : this.prortyID : 0,
        vendor_Id: this.VendorID > 0 ? this.VendorID == this.reqData.vndr_id ? 0 : this.VendorID : 0,
        element_Id: this.ElementID > 0 ? this.ElementID == this.reqData.elmnt_id ? 0 : this.ElementID : 0,
        // sechdulestart_Id: this.sche_strt > 0 ? this.sche_strt == this.reqData.schdle_strt_ts ? 0 : this.sche_strt : 0,
        // sechduleend_Id: this.sche_end > 0 ? this.sche_end == this.reqData.schdle_end_ts ? 0 : this.sche_end : 0,
        sechdulestart_Id:this.sche_strt,
        sechduleend_Id:this.sche_end,
        expectedresults: this.exe_rslts? this.exe_rslts.length>0? this.exe_rslts: 0 :0,
        releasenotes: this.rls_nts? this.rls_nts.length>0? this.rls_nts: 0 :0,
        softwaredetails: this.sftwre_dtls ? this.sftwre_dtls.length>0? this.sftwre_dtls: 0 :0,
        hardwaredetails: this.hrwre_dtls ? this.hrwre_dtls.length>0? this.hrwre_dtls: 0 :0,
        praposerchanges: this.prps_chngs?this.prps_chngs:0,
        vendorticket: this.vndr_tkts?this.vndr_tkts:0,
        toolsneeded: this.tls_nded?this.tls_nded:0,
        failures: this.flrs_txt ? this.flrs_txt.length>0? this.flrs_txt: 0 :0,
        failurersolution: this.flrs_rslt_txt? this.flrs_rslt_txt.length>0? this.flrs_rslt_txt: 0 :0,
        description: this.descrptn ? this.descrptn.length>0? this.descrptn: 0 :0,
        longdescription: this.lngdescrptn ? this.lngdescrptn.length>0? this.lngdescrptn: 0 :0,
        attah_data: this.attach_image,
        comment: this.comment,
        array:this.array
      }
      console.log(postData);
      // return
      const rte = `ticket/updateTicket/actions`;
      this.crdsrv.create(postData, rte).subscribe((res) => {
        console.log(res['status']);
        if (res['status'] == 200) {
          this.snackBar.open("Sucessfully Updated", '', {
            duration: 2000,
            panelClass: ['blue-snackbar'],
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
          });
          this.searchLoader = false;
          this.comment = '';
          this.attach_image = '';
          this.getTktHstDetails();
          this.getTktAttchDetails();
          // this.backBtn();
          // let data = {
          //   indicator: this.reqData.indicator,
          //   id: this.reqData.id,
          //   loginuserteamid:this.reqData.loginuserteamid
          // }
          // console.log(data);
          // let rte = 'ticket/get_TicketDetails'
          // this.crdsrv.create(data, rte).subscribe((res) => {
          //   this.reqData = res['data'];
          //   console.log(this.reqData);
          // })
        }
      })
    }
    else {
      this.searchLoader = false;
      this.snackBar.open("Write Comment", '', {
        duration: 2000,
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
  }
  removeImg() {
    this.imageUrl = '';
    this.imgfilename = '';
    this.app_icon = ''
  }

  getTktHstDetails() {
    this.searchLoader = true;
    this.rowData = [];
    const rte = `ticket/ticket/history/${this.reqData.tckt_id}`;
    this.crdsrv.get(rte).subscribe((res) => {

      if (res['status'] === 200) {
        this.rowData = res['data'];
        console.log(this.rowData);
        this.searchLoader = false;
      }
    });
    this.columnDefs = [
      { headerName: 'Sno', field: 's_no', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 100, filter: false, search: false, columnFiltering: false },
      { headerName: 'Event', field: 'ky_nm', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 150, filter: true, columnFiltering: false, filterOperations: ['contains', 'startswith', '='] },
      { headerName: 'Previous', field: 'prvsname', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 180, height: 40, columnFiltering: false, filter: true },
      { headerName: 'Change To', field: 'crntname', cellClass: 'pm-grid-number-cell', width: 180, filter: true, search: false, columnFiltering: false },
      // { headerName: 'Date Of Change', field: 'chng_dt', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 150, filter: true , columnFiltering: false, filterOperations: [ 'contains', 'startswith', '=' ], selectedFilterOperation: 'contains',allowFiltering: true },
      { headerName: 'Changed By', field: 'mrcht_usr_nm', cellClass: 'pm-grid-number-cell', width: 125, filter: false, columnFiltering: true },
      { headerName: 'Change On', field: 'chng_dt', cellClass: 'pm-grid-number-cell', width: 125, filter: true, columnFiltering: false },
      { headerName: 'Comment', field: 'cmnt_tx', cellClass: 'pm-grid-number-cell', width: 150, filter: true, columnFiltering: false },
    ];
  }
  getTktAttchDetails() {
    this.searchLoader = true;
    this.attchData = [];
    const rte = `ticket/ticket/attach/${this.reqData.tckt_id}`;
    this.crdsrv.get(rte).subscribe((res) => {

      if (res['status'] === 200) {
        this.attchData = res['data'];
        console.log(this.attchData);
        this.searchLoader = false;
      }
    });
    this.columnDefss = [
      { headerName: 'Sno', field: 's_no', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 100, filter: false, search: false, columnFiltering: false },
      { headerName: 'Attachment Name', field: 'atcht_url_nm', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 270, filter: true, columnFiltering: false, filterOperations: ['contains', 'startswith', '='] },
      { headerName: 'Upload By', field: 'upld_nm', cellClass: 'pm-grid-number-cell', width: 200, filter: false, columnFiltering: true },
      { headerName: 'Upload On', field: 'upld_dt', cellClass: 'pm-grid-number-cell', width: 200, filter: true, columnFiltering: false },
      // { headerName: 'Comment', field: 'cmnt_tx', cellClass: 'pm-grid-number-cell', width: 150, filter: true, columnFiltering: false },
    ];
  }
}
