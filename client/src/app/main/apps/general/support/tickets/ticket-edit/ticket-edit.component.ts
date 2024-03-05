import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TransfereService } from 'app/providers/transfer/transfer.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { CrudService } from 'app/main/apps/crud.service';
import { MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition, MatSnackBar } from '@angular/material';
import { Location } from '@angular/common';


@Component({
  selector: 'app-ticket-edit',
  templateUrl: './ticket-edit.component.html',
  styleUrls: ['./ticket-edit.component.scss']
})
export class TicketEditComponent implements OnInit {
  getHeaderDtls = function () { return { "title": 'Ticket Details', "icon": "people_outline" } }
  reqData: any;
  ticketFormGroup: FormGroup;
  priorityLst;
  cateogryLst;
  teamLst;
  statusLst;
  typeLst;
  userLst;
  searchLoader: boolean = false;
  documents: boolean = false;
  columnDefs = [];
  cafcolumnDefs = [];
  rowData;
  type: any;
  ctgry: any;
  prty: any;
  team: any;
  ticketsData: any;
  columnKeys: any = [];
  tktParamsDta = [];
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  comment: any;
  showTble = false;
  shwPrflePge: boolean;
  allsrc_itms = [];
  items = [];
  rcntSrchItms = [];
  searchData: any;
  tableview: boolean = false;
  frontJsonData: any;
  previousSearchData = [];
  cstmrData: any;
  TypeID: any;
  categryID: any;
  subcategryID: any;
  issueTypeID: any;
  issueIndefierID: any;
  teamID: any;
  prortyID: any;
  CategoryDtls: any;
  subCategoryDtls: any;
  issueTypesDtls: any;
  issueIndefierDtls: any;
  CreateTicketDtls: any;
  teamsDtls: any;
  stsDtls: any;
  prtyDtls: any;
  descrptn: any;
  lngdescrptn: any;
  statusID: any;
  content: any = {};
  cafDtlsView: boolean = false;
  attach_image: {};
  // titleq = 'app';
  // elementTypeq = 'url';
  // valueq = 'Techiediaries';
  // createdCode=2;
  // guillaumeNery='2';
  cafnumbr: any;
  guillaumeNery;
  array = [];
  columnDefss = [];
  attchData;
  imageUrl: string | ArrayBuffer;
  imgfilename: string;
  app_icon: string;

  // guillaumeNery = 'https://stackoverflow.com/questions/44234290/how-to-display-using-displaywith-in-autocomplete-material2';
  actionsarray = [{ ticket_Id: '', previousid: '', changedid: '', keyid: '1', keyname: 'Type' },
  { ticket_Id: '', previousid: '', changedid: '', keyid: '2', keyname: 'Category' },
  { ticket_Id: '', previousid: '', changedid: '', keyid: '3', keyname: 'Sub_Category' },
  { ticket_Id: '', previousid: '', changedid: '', keyid: '4', keyname: 'Status' },
  { ticket_Id: '', previousid: '', changedid: '', keyid: '5', keyname: 'IssueType' },
  { ticket_Id: '', previousid: '', changedid: '', keyid: '6', keyname: 'Issue_Identifier' },
  { ticket_Id: '', previousid: '', changedid: '', keyid: '7', keyname: 'Team' },
  { ticket_Id: '', previousid: '', changedid: '', keyid: '8', keyname: 'Priority' }]
  // oldData: any;
  // categoryView: any = false;
  constructor(private route: ActivatedRoute, public router: Router, private crdsrv: CrudService, public TransfereService: TransfereService, public fb: FormBuilder, public snackBar: MatSnackBar,
    private location: Location) {
    this.route.queryParams.subscribe(params => {
      console.log(params);

    });
    this.reqData = this.TransfereService.getLoclData('data');
    // this.newData = this.TransfereService.getLoclData('data').newDt;
    console.log(this.reqData)
    this.guillaumeNery = this.reqData.tckt_id.toString();
    this.cafnumbr = this.reqData.caf_id;
    console.log(this.cafnumbr);
    if (this.cafnumbr > 0) {
      this.cafDtlsView = true;
    }

    console.log(this.reqData);
    console.log(this.guillaumeNery);
    // this.content['sctn_nm'] = 'Add Comment';
  }

  ngOnInit() {
    this.getDetails();
    this.getTktHstDetails();
    this.getDetailsToCreate();
    this.getStatus();
    this.getpriority();
    this.getTktAttchDetails();

  }
  backBtn() {
    console.log("Backkkkkkkkkk")
    this.router.navigate(['/admin/support/personal/ticketlst'], { queryParams: { "paramsdata": 1 } });
    this.location.replaceState('/admin/support/personal/ticketlst');
  }

  saveSctn() {
    console.log("dffffffffffffffffffffffddd")
    console.log(this.content);
    console.log(this.content.dscptn_txt);
    console.log(this.reqData);
    console.log(this.TypeID);
    console.log(this.categryID);
    console.log(this.subcategryID);
    console.log(this.issueTypeID);
    console.log(this.issueIndefierID);
    console.log(this.teamID);
    console.log(this.statusID);
    console.log(this.prortyID);
    this.searchLoader = true;
    if (this.comment) {
      this.array = [];
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
        if (this.actionsarray[i].keyname == 'Status') {
          this.actionsarray[i].ticket_Id = this.reqData.tckt_id;
          this.actionsarray[i].previousid = this.reqData.tckt_status_id;
          this.actionsarray[i].changedid = this.statusID;
        }
        if (this.actionsarray[i].keyname == 'IssueType') {
          this.actionsarray[i].ticket_Id = this.reqData.tckt_id;
          this.actionsarray[i].previousid = this.reqData.caf_isu_typ_id ? this.reqData.caf_isu_typ_id : 0;
          this.actionsarray[i].changedid = this.issueTypeID;
        }
        if (this.actionsarray[i].keyname == 'Issue_Identifier') {
          this.actionsarray[i].ticket_Id = this.reqData.tckt_id;
          this.actionsarray[i].previousid = this.reqData.caf_isu_idnfr_id ? this.reqData.caf_isu_idnfr_id : 0;
          this.actionsarray[i].changedid = this.issueIndefierID;
        }
        if (this.actionsarray[i].keyname == 'Team') {
          this.actionsarray[i].ticket_Id = this.reqData.tckt_id;
          this.actionsarray[i].previousid = this.reqData.sprt_tm_id;
          this.actionsarray[i].changedid = this.teamID;
        }
        if (this.actionsarray[i].keyname == 'Priority') {
          this.actionsarray[i].ticket_Id = this.reqData.tckt_id;
          this.actionsarray[i].previousid = this.reqData.prty_id;
          this.actionsarray[i].changedid = this.prortyID;
        }
      }
      console.log(this.actionsarray);
      for (var p = 0; p < this.actionsarray.length; p++) {
        if (this.actionsarray[p].changedid) {
          if (this.actionsarray[p].previousid != this.actionsarray[p].changedid) {
            this.array.push(this.actionsarray[p])
          }
        }
      }
      console.log(this.array);
      if (this.attach_image != undefined || "") {
        this.attach_image = this.attach_image
      } else {
        let img1 = {}
        img1 = {
          base64: 0,
          file_name: 0
        }
        this.attach_image = img1
      }
      var postData = {
        ticket_Id: this.reqData.tckt_id,
        type_Id: 8,
        category_Id: this.categryID > 0 ? this.categryID == this.reqData.tckt_ctgry_id ? 0 : this.categryID : 0,
        subcategory_Id: this.subcategryID > 0 ? this.subcategryID == this.reqData.tckt_sb_ctgry_id ? 0 : this.subcategryID : 0,
        issueType_Id: this.issueTypeID > 0 ? this.issueTypeID == this.reqData.ise_type_id ? 0 : this.issueTypeID : 0,
        iisueIdentifier_Id: this.issueIndefierID > 0 ? this.issueIndefierID == this.reqData.ise_idnfr_id ? 0 : this.issueIndefierID : 0,
        sprtTeam_Id: this.teamID > 0 ? this.teamID == this.reqData.sprt_tm_id ? 0 : this.teamID : 0,
        sprtuser_Id: 0,
        shouldapproveTeam_Id: 0,
        status_Id: this.statusID > 0 ? this.statusID == this.reqData.tckt_status_id ? 0 : this.statusID : 0,
        prty_Id: this.prortyID > 0 ? this.prortyID == this.reqData.prty_id ? 0 : this.prortyID : 0,
        comment: this.comment,
        array: this.array,
        vendor_Id: 0,
        attah_data: this.attach_image,
        description: this.descrptn ? this.descrptn.length>0? this.descrptn: 0 :0,
        longdescription: this.lngdescrptn ? this.lngdescrptn.length>0? this.lngdescrptn: 0 :0,
      }
      console.log(postData);
      const rte = `ticket/updateTicket/actions`;
      this.crdsrv.create(postData, rte).subscribe((res) => {
        if (res['status'] == 200) {
          this.searchLoader = false;
          this.snackBar.open("Sucessfully Updated", '', {
            duration: 2000,
            panelClass: ['blue-snackbar'],
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
          });
          this.comment = '';
          let data = {
            indicator: 'ENTRYID',
            id: this.reqData.tckt_id,
            loginuserteamid: 0
          }
          console.log(data);
          let rte = 'ticket/get_TicketDetails'
          this.crdsrv.create(data, rte).subscribe((res) => {
            this.reqData = res['data'][0];
            console.log(this.reqData);
          })
          this.removeImg();
          this.getTktHstDetails();
          this.getTktAttchDetails();
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
  back() {
    this.router.navigateByUrl('admin/support/personal/my-tickets');
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

  ///////////////////////////////////////////////vhangesssss////////////////////////////////////////////////////////
  getDetailsToCreate() {
    const rte = 'ticket/creation'
    this.crdsrv.get(rte).subscribe((res) => {
      this.CreateTicketDtls = res['data'];
      console.log(this.CreateTicketDtls);
      console.log(this.CreateTicketDtls.length);
      // if (this.CreateTicketDtls.length == 1) {
      //   this.TypeID = this.CreateTicketDtls[0].tckt_type_id;
      this.ForCategory();
      this.descrptn = this.reqData.dscn_tx;
      this.lngdescrptn = this.reqData.lng_dscn_tx;

      //  }
      //     else {
      //       this.TypeID = ''
      //     }
    })
  }

  ForCategory() {
    console.log(this.TypeID);
    this.categryID = '';
    this.subcategryID = '';
    this.issueTypeID = '';
    this.issueIndefierID = '';
    this.teamID = '';
    this.TypeID = 8;
    const rte = `ticket/getCategories/${this.TypeID}`
    this.crdsrv.get(rte).subscribe(res => {
      this.CategoryDtls = res['data'];
      console.log(this.CategoryDtls);
      console.log(this.CategoryDtls.length);
      this.categryID = this.reqData.tckt_ctgry_id;
      // this.ForSubCategory();
      // if(this.CategoryDtls.length == 1){
      //   this.categryID=this.CategoryDtls[0].tckt_ctgry_id;
      if (this.categryID != 0) {
        this.ForSubCategory();
      }
      // }
      // else{
      //   this.categryID=''
      // }
    })
  }
  ForSubCategory() {
    console.log(this.categryID);
    this.subcategryID = '';
    this.issueTypeID = '';
    this.issueIndefierID = '';
    this.teamID = '';
    this.ForTeams();
    const rte = `ticket/getSubCategories/${this.categryID}`
    this.crdsrv.get(rte).subscribe(res => {
      this.subCategoryDtls = res['data'];
      console.log(this.subCategoryDtls);
      console.log(this.subCategoryDtls.length);
      this.subcategryID = this.reqData.tckt_sb_ctgry_id;
      if (this.subcategryID != 0) {
        this.ForIssueType();
      }
      // if(this.subCategoryDtls.length == 1){
      //   this.subcategryID=this.subCategoryDtls[0].tckt_sb_ctgry_id;
      //   this.ForIssueType();
      // }
      // else{
      //   this.subcategryID=''
      // }
    })
  }
  ForIssueType() {
    console.log(this.subcategryID);
    this.issueTypeID = '';
    this.issueIndefierID = '';
    this.teamID = '';
    this.ForTeams();
    const rte = `ticket/getissueTypes/${this.categryID}/${this.subcategryID}`
    this.crdsrv.get(rte).subscribe(res => {
      this.issueTypesDtls = res['data'];
      console.log(this.issueTypesDtls);
      console.log(this.issueTypesDtls.length);
      this.issueTypeID = this.reqData.caf_isu_typ_id;
      if (this.issueTypeID != 0) {
        this.ForIssueIndefiers();
      }
      // if (this.issueTypesDtls.length == 1) {
      //   this.issueTypeID = this.issueTypesDtls[0].ise_type_id;
      //   this.ForIssueIndefiers();
      // }
      // else {
      //   this.issueTypeID = ''
      // }
    })
  }
  ForIssueIndefiers() {
    this.issueIndefierID = '';
    this.teamID = '';
    this.ForTeams();
    const rte = `ticket/getissueIdentifiers/${this.issueTypeID}`
    this.crdsrv.get(rte).subscribe(res => {
      this.issueIndefierDtls = res['data'];
      console.log(this.issueIndefierDtls);
      console.log(this.issueIndefierDtls.length);
      this.issueIndefierID = this.reqData.caf_isu_idnfr_id;
      if (this.issueIndefierID != 0) {
        this.ForTeams();
      }
      // if (this.issueIndefierDtls.length == 1) {
      //   this.issueIndefierID = this.issueIndefierDtls[0].ise_idnfr_id;
      //   this.ForTeams();
      // }
      // else {
      //   this.issueIndefierID = ''
      // }
    })
  }
  ForTeams() {
    console.log(this.issueIndefierID);
    this.teamID = '';
    var data = {
      type: this.TypeID ? this.TypeID : 0,
      category: this.categryID ? this.categryID : 0,
      subcategory: this.subcategryID ? this.subcategryID : 0,
      issuetype: this.issueTypeID ? this.issueTypeID : 0,
      isseidentifier: this.issueIndefierID ? this.issueIndefierID : 0
    }
    console.log(data);
    this.crdsrv.create(data, 'ticket/getTeams').subscribe(res => {
      this.teamsDtls = res['data'];
      console.log(this.teamsDtls);
      console.log(this.teamsDtls.length);
      this.teamID = this.reqData.assignteamid
      // if (this.teamsDtls.length == 1) {
      //   this.teamID = this.teamsDtls[0].tm_id;
      // }
      // else {
      //   this.teamID = ''
      // }
    })
  }


  getStatus() {
    const rte = 'support/Ticket-Status'
    this.crdsrv.get(rte).subscribe(res => {
      this.stsDtls = res['data'];
      console.log(this.stsDtls)
    })
    this.statusID = this.reqData.tckt_status_id;
  }
  getpriority() {
    const rte = 'support/Priority'
    this.crdsrv.get(rte).subscribe(res => {
      this.prtyDtls = res['data'];
      console.log(this.prtyDtls)
    })
    this.prortyID = this.reqData.prty_id;
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
        if (res['data'].length > 1) {
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
      this.cafcolumnDefs = [
        { headerName: 'Sno', field: 'sno', algnmnt: 'center', cellClass: 'pm-grid-number-cell', width: 100, filter: false, search: false },
        { headerName: 'CAF No', field: 'caf_nu', algnmnt: 'left', cellClass: 'pm-grid-number-cell', width: 150, filter: true, filterOperations: ['contains', 'startswith', '='] },
        { headerName: 'Profile', field: 'Profile', algnmnt: 'center', cellClass: 'pm-grid-number-cell', width: 100, height: 40, columnFiltering: false, filter: true },
        { headerName: 'Name', field: 'cstmr_nm', cellClass: 'pm-grid-number-cell', width: 150, filter: true },
        { headerName: 'Mobile Number', field: 'cntct_mble1_nu', algnmnt: 'center', cellClass: 'pm-grid-number-cell', width: 150, filter: true, filterOperations: ['contains', 'startswith', '='], selectedFilterOperation: 'contains', allowFiltering: true },
        { headerName: 'Status', field: 'sts_nm', cellClass: 'pm-grid-number-cell', width: 125, filter: true },
        { headerName: 'LMO', field: 'lmo_cd', cellClass: 'pm-grid-number-cell', width: 125, filter: true },
        { headerName: 'Billing Frequency', field: 'frqncy_nm', cellClass: 'pm-grid-number-cell', width: 110, filter: true },
        { headerName: 'Activation Date', field: 'actvn_dt', algnmnt: 'center', cellClass: 'pm-grid-number-cell', width: 125, filter: true },
        { headerName: 'Suspended Date', field: 'spnd_dt', algnmnt: 'center', cellClass: 'pm-grid-number-cell', width: 125, filter: true, hide: true },
        { headerName: 'Resume Date', field: ' rsme_dt', algnmnt: 'center', cellClass: 'pm-grid-number-cell', width: 125, filter: true, hide: true },
        { headerName: 'Termination Date', field: 'trmnd_dt', algnmnt: 'center', cellClass: 'pm-grid-number-cell', width: 125, filter: true, hide: true }
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
    if (this.allsrc_itms != null) {
      this.allsrc_itms.push({ 'search': srch_items })
      localStorage.setItem('rcntSrch', JSON.stringify(this.allsrc_itms));
    }
    else {
      this.items.push({ 'search': srch_items })
      localStorage.setItem('rcntSrch', JSON.stringify(this.items));
    }
    this.getRcntSrchItmsLclStrge();

  }

  onCellClick(data) {
    if (data.value == 'Profile') {
      this.cstmrData = data.data;
      console.log(this.cstmrData);
      this.shwPrflePge = true;
    }
  }

  getRcntSrchItmsLclStrge = () => {
    var finaldata = [];
    let srch_val: any = localStorage.getItem('rcntSrch');
    this.rcntSrchItms = srch_val = JSON.parse(srch_val);
    if (this.rcntSrchItms != null) {
      let rte = 'caf/customer/previousSearch'
      this.crdsrv.create(this.rcntSrchItms, rte).subscribe((res) => {
        // console.log(res['data']);
        this.searchData = res['data'];
        if (res['status'] == 200) {
          this.tableview = true;
          // console.log(this.searchData);
          // console.log(this.searchData.length);
          for (var m = 0; m < this.searchData.length; m++) {
            finaldata.push(this.searchData[m][0])
          }
          // console.log(finaldata);
          this.frontJsonData = finaldata;
          // console.log(this.frontJsonData);
          var index = 0;
          for (var n = 0; n < this.frontJsonData.length; n++) {
            if (this.frontJsonData[n]) {
              index = index + 1;
              this.frontJsonData[n].sno = index;
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
    else if (this.rcntSrchItms == null) {
      this.tableview = false;
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
