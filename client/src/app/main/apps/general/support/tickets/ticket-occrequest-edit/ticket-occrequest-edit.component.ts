import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TransfereService } from 'app/providers/transfer/transfer.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { CrudService } from 'app/main/apps/crud.service';
import { MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition, MatSnackBar } from '@angular/material';
import { Location } from '@angular/common';

@Component({
  selector: 'app-ticket-occrequest-edit',
  templateUrl: './ticket-occrequest-edit.component.html',
  styleUrls: ['./ticket-occrequest-edit.component.scss']
})
export class TicketOccrequestEditComponent implements OnInit {
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  reqData: any;
  guillaumeNery;
  CategoryDtls:any;
  TypeID:any;
  categryID:any;
  subcategryID:any;
  statusID: any;
  prortyID: any;
  stsDtls: any;
  prtyDtls: any;
  comment: any;
  lngdescrptn: any;
  descrptn: any;
  array = [];
  searchLoader : boolean = false;
  columnDefs = [];
  rowData;
  imageUrl: string | ArrayBuffer;
  imgfilename: string;
  app_icon: string;
  attach_image: {};
  actionsarray = [{ ticket_Id: '', previousid: '', changedid: '', keyid: '1', keyname: 'Type' },
  { ticket_Id: '', previousid: '', changedid: '', keyid: '2', keyname: 'Category' },
  { ticket_Id: '', previousid: '', changedid: '', keyid: '3', keyname: 'Sub_Category' },
  { ticket_Id: '', previousid: '', changedid: '', keyid: '4', keyname: 'Status' },
  // { ticket_Id: '', previousid: '', changedid: '', keyid: '5', keyname: 'IssueType' },
  // { ticket_Id: '', previousid: '', changedid: '', keyid: '6', keyname: 'Issue_Identifier' },
  { ticket_Id: '', previousid: '', changedid: '', keyid: '7', keyname: 'Team' },
  { ticket_Id: '', previousid: '', changedid: '', keyid: '8', keyname: 'Priority' },
  { ticket_Id: '', previousid: '', changedid: '', keyid: '16', keyname: 'Assign Team' },
  // { ticket_Id: '', previousid: '', changedid: '', keyid: '10', keyname: 'Elements' },
  // { ticket_Id: '', previousid: '', changedid: '', keyid: '11', keyname: 'Sechdule Start' },
  // { ticket_Id: '', previousid: '', changedid: '', keyid: '12', keyname: 'Sechdule End' }
]
  attchData;
  columnDefss= [];
  cafcolumnDefs = [];
  assignTeamDtls: any;
  addcafcolumn: boolean;
  teamID: any;
  subCategoryDtls: any;
  cafnumbr: any;
  cmnt: any;
  cafarray = [];
  shwPrflePge: boolean;
  agentdata: any;
  lmoDtlsView: boolean;
  lmonumber: any;
  cafData: any;
  shwCafPge: boolean;
  cstmrData: any;
  constructor(private route: ActivatedRoute, public router: Router, private crdsrv: CrudService, public TransfereService: TransfereService, public fb: FormBuilder, public snackBar: MatSnackBar ,
    private location: Location) {
    this.route.queryParams.subscribe(params => {
      console.log(params);

    });
    this.reqData = this.TransfereService.getLoclData('data');
    this.guillaumeNery=this.reqData.tckt_id.toString();
    console.log(this.reqData);
    console.log("Basic Edit");
    this.lmonumber=this.reqData.agnt_cd;
    console.log(this.lmonumber);
    if(this.lmonumber.length > 0){
    this.lmoDtlsView=true;
    }
   }

  ngOnInit() {
    this.ForCategory();
    this.getStatus();
    this.getpriority();
    this.getTktHstDetails();
    this.getTktAttchDetails();
    this.getAssignTeam();
    this.getDetails();
    this.getTktCafDetails();
    // this.subcategryID=this.reqData.tckt_sb_ctgry_id;
    this.descrptn = this.reqData.dscn_tx;
  }
   ///////////////////////////////////////////TO GET LMO  DETAILS////////////////////////////////////////////////////
   getDetails() {
    console.log(this.lmonumber);
    if (this.lmonumber) {
      console.log("LMO");
      var data = {
        agnt_cd: this.lmonumber,
      }
      console.log(data);
      this.searchLoader = true;
      this.crdsrv.create(data, 'ticket/getlmoDta').subscribe(res => {
        this.rowData = res['data'];
        this.searchLoader = false;
        console.log(this.rowData);
        if (res['data'].length > 1) {
          // this.setRcntSrchLclStrge(data);
          // this.showTble = true;
          this.shwPrflePge = false;
        } else {
          console.log("else");
          // this.setRcntSrchLclStrge(data);
          // this.showTble = false;
          this.shwPrflePge = true;
          this.agentdata = res['data'][0];
          // let agentdata = [];
          // agentdata['data'] = res['data'][0];
          // agentdata['value'] = 'Profile';
          console.log(this.agentdata);
          // this.onCellClick(this.agentdata);
        }
      })
    }
  }

  ForCategory(){
    this.TypeID=7;
  const rte = `ticket/getCategories/${this.TypeID}`
  this.crdsrv.get(rte).subscribe(res => {
    this.CategoryDtls = res['data'];
    console.log(this.CategoryDtls);
    console.log(this.CategoryDtls.length);
    // if(this.CategoryDtls.length == 1){
    //   this.categryID=this.CategoryDtls[0].tckt_ctgry_id;
    //   this.ForSubCategory();
    // }
    // else{
    //   this.categryID=this.reqData.tckt_ctgry_id;
    // }
  })
  this.categryID=this.reqData.tckt_ctgry_id;
  this.ForSubCategory();
}
ForSubCategory() {
  console.log(this.categryID);
  // if (this.categryID == 14) {
  //   this.addcafcolumn = true;
  // } else {
  //   this.addcafcolumn = false;
  // }
  this.subcategryID = '';
  // this.issueTypeID='';
  // this.issueIndefierID='';
  // this.teamID = '';
  // this.ForTeams();
  const rte = `ticket/getSubCategories/${this.categryID}`
  this.crdsrv.get(rte).subscribe(res => {
    this.subCategoryDtls = res['data'];
    console.log(this.subCategoryDtls);
    console.log(this.subCategoryDtls.length);
    // if (this.subCategoryDtls.length == 1) {
    //   this.subcategryID = this.subCategoryDtls[0].tckt_sb_ctgry_id;
    //   // this.ForIssueType();
    // }
    // else {
      // this.subcategryID = this.reqData.tckt_sb_ctgry_id;
    // }
  })
  this.subcategryID = this.reqData.tckt_sb_ctgry_id;
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
getAssignTeam() {
  const rte = 'ticket/getassignTeams'
  this.crdsrv.get(rte).subscribe(res => {
    this.assignTeamDtls = res['data'];
    console.log(this.assignTeamDtls);
  })
  this.teamID = this.reqData.sprt_tm_id;
}

  backBtn(){
   this.router.navigate(['/admin/support/personal/ticketlst'],{ queryParams: { "paramsdata": 1 }});
   this.location.replaceState('/admin/support/personal/ticketlst');
  }

  // Addticket() {
  //   if (this.cafnumbr != undefined && this.cmnt != undefined) {
  //     this.cafarray.push({
  //       'caf': this.cafnumbr,
  //       'cmnt': this.cmnt
  //     })
  //   } else {
  //     this.snackBar.open("Please Add CAf and Comment", '', {
  //       duration: 5000,
  //       panelClass: ['red-snackbar'],
  //       horizontalPosition: this.horizontalPosition,
  //       verticalPosition: this.verticalPosition,
  //     });
  //   }
  //   console.log(this.cafarray)
  // }
  // reset(){
  //   this.categryID = '';
  //   this.subcategryID = '';
  //   this.statusID = '';
  //   this.prortyID = '';
  //   this.descrptn = '';
  //   this.lngdescrptn = '';
  //   this.comment = '';
  // }
  update(){
    if (this.comment) {
      this.array=[];
      for (var i = 0; i < this.actionsarray.length; i++) {
      
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
          this.actionsarray[i].previousid = this.reqData.sprt_tm_id;
          this.actionsarray[i].changedid = this.teamID;
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
        type_Id: 7,
        category_Id: this.categryID > 0 ? this.categryID == this.reqData.tckt_ctgry_id ? 0 : this.categryID : 0,
        subcategory_Id: this.subcategryID > 0 ? this.subcategryID == this.reqData.tckt_sb_ctgry_id ? 0 : this.subcategryID : 0,
        issueType_Id:  0,
        iisueIdentifier_Id:  0,
        sprtTeam_Id: this.teamID > 0 ? this.teamID == this.reqData.sprt_tm_id ? 0 : this.teamID : 0,
        sprtuser_Id: 0,
        shouldapproveTeam_Id :0,
        status: this.statusID > 0 ? this.statusID == this.reqData.tckt_status_id ? 0 : this.statusID : 0,
        prty_Id: this.prortyID > 0 ? this.prortyID == this.reqData.prty_id ? 0 : this.prortyID : 0,
        vendor_Id:  0,
        element_Id:  0,
        sechdulestart_Id:0,
        sechduleend_Id:0,
        expectedresults: 0,
        releasenotes: 0,
        softwaredetails: 0,
        hardwaredetails: 0,
        praposerchanges:0,
        vendorticket: 0,
        toolsneeded:0,
        failures: 0,
        failurersolution: 0,
        description: this.descrptn ? this.descrptn.length>0? this.descrptn: 0 :0,
        longdescription: this.lngdescrptn ? this.lngdescrptn.length>0? this.lngdescrptn: 0 :0,
        attah_data: this.attach_image,
        comment: this.comment,
        array:this.array
        // cafs:this.cafarray
      }
      this.searchLoader = true;
      console.log(postData);
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
          this.removeImg();
          this.comment = '';
          this.searchLoader = false;
          this.getTktHstDetails();
          this.getTktAttchDetails();
        } else{
          this.snackBar.open("Something Went Wrong Please Try Again", '', {
            duration: 2000,
            panelClass: ['blue-snackbar'],
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
          });
          this.searchLoader = false;
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
  // onCellClick(data){
  //   console.log(data)
  // }

  getTktCafDetails() {
    this.searchLoader = true;
    this.cafData = [];
    const rte = `ticket/ticket/getCafs/${this.reqData.tckt_id}`;
    this.crdsrv.get(rte).subscribe((res) => {

      if (res['status'] === 200) {
        this.cafData = res['data'];
        console.log(this.cafData);
        this.searchLoader = false;
      }
    });
    this.cafcolumnDefs = [
      { headerName: 'Sno', field: 's_no', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 100, filter: false, search: false, columnFiltering: false },
      { headerName: 'CAF Id', field: 'caf_id', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 150, filter: true, columnFiltering: false, filterOperations: ['contains', 'startswith', '='] },
      { headerName: 'Comment', field: 'cmnt_tx', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 400, height: 40, columnFiltering: false, filter: true },
      { headerName: 'Created By', field: 'mrcht_usr_nm', cellClass: 'pm-grid-number-cell', width: 180, filter: true, search: false, columnFiltering: false },
      { headerName: 'Created On', field: 'inser_date', cellClass: 'pm-grid-number-cell', width: 100, filter: false, columnFiltering: true },
      // { headerName: 'Change On', field: 'chng_dt', cellClass: 'pm-grid-number-cell', width: 125, filter: true, columnFiltering: false },
      // { headerName: 'Comment', field: 'cmnt_tx', cellClass: 'pm-grid-number-cell', width: 150, filter: true, columnFiltering: false },
    ];
  }
  onCafCellClick(data) {
    console.log(data);
    if (data) {
      console.log("CAF");
      var cafdata = {
        mobileno: 0,
        CAf: data.data.caf_id,
        adhar: 0,
        iptv: 0,
        onu: 0,
      }
      console.log(data);
      this.searchLoader = true;
      this.crdsrv.create(cafdata, 'caf/getdt').subscribe(res => {
        this.rowData = res['data'];
        this.searchLoader = false;
        console.log(this.rowData);
        if (res['data'].length == 0) {
          // this.setRcntSrchLclStrge(data);
          // this.showTble = true;
          this.shwCafPge = false;
        } else {
          // this.setRcntSrchLclStrge(data);
          // this.showTble = false;
          let cstmrData = [];
          cstmrData['data'] = res['data'][0];
          cstmrData['value'] = 'Profile';
          console.log(cstmrData);
          this.shwCafPge = true;
          this.onCellClick(cstmrData);
        }
      })
    }
  }
  onCellClick(data) {
    console.log(data)
    if (data.value == 'Profile') {
      this.cstmrData = data.data;
      console.log(this.cstmrData);
      this.shwCafPge = true;
    }
  }
}

