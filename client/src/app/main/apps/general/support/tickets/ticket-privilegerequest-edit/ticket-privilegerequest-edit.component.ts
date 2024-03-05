import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TransfereService } from 'app/providers/transfer/transfer.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { CrudService } from 'app/main/apps/crud.service';
import { MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition, MatSnackBar } from '@angular/material';
import { Location } from '@angular/common';
import { DatePipe } from '@angular/common';
import * as _moment from 'moment';

@Component({
  selector: 'app-ticket-privilegerequest-edit',
  templateUrl: './ticket-privilegerequest-edit.component.html',
  styleUrls: ['./ticket-privilegerequest-edit.component.scss']
})
export class TicketPrivilegerequestEditComponent implements OnInit {
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  reqData: any;
  guillaumeNery;
  CreateTicketDtls: any;
  // TypeID: any;
  categryID: any;
  array = [];
  attach_image: {};
  columnDefs = [];
  rowData;
  actionsarray = [{ ticket_Id: '', previousid: '', changedid: '', keyid: '4', keyname: 'Status' },
  { ticket_Id: '', previousid: '', changedid: '', keyid: '8', keyname: 'Priority' },
  { ticket_Id: '', previousid: '', changedid: '', keyid: '14', keyname: 'Application' },
  { ticket_Id: '', previousid: '', changedid: '', keyid: '15', keyname: 'Approval Team' },
  { ticket_Id: '', previousid: '', changedid: '', keyid: '16', keyname: 'Assign Team' }]
  comment: any;
  statusID: any;
  prortyID: any;
  stsDtls: any;
  prtyDtls: any;
  lngdescrptn: any;
  descrptn: any;
  searchLoader: boolean = false;
  applicationDtls: any;
  approvalDtls: any;
  approvalID: any;
  assignTeamDtls: any;
  applicationID: any;
  assignID: any;
  imageUrl: string | ArrayBuffer;
  imgfilename: string;
  app_icon: string;
  columnDefss= [];
  attchData;
  constructor(private route: ActivatedRoute, public router: Router, private crdsrv: CrudService, public TransfereService: TransfereService, public fb: FormBuilder, public snackBar: MatSnackBar ,
    private location: Location,public datePipe: DatePipe) { this.route.queryParams.subscribe(params => {
      console.log(params);

    });
    this.reqData = this.TransfereService.getLoclData('data');
    this.guillaumeNery=this.reqData.tckt_id.toString();
    console.log(this.reqData);
    console.log("NOCEDITTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT");}

 
  ngOnInit() {
    this.getStatus();
    this.getpriority();
    this.getdata();
    this.getTktHstDetails();
    this.getapplication();
    this.getAssignTeam();
  }
  getdata(){
    this.descrptn = this.reqData.dscn_tx;
    this.lngdescrptn = this.reqData.lng_dscn_tx;
  }
  getapplication(){
    const rte = 'ticket/getapplication'
    this.crdsrv.get(rte).subscribe(res => {
      this.applicationDtls = res['data'];
      console.log(this.applicationDtls);
    })
  this.applicationID = this.reqData.aplcn_id
  if(this.applicationID){
    this.ForApprovalTeam();
  }
  }
  ForApprovalTeam(){
    console.log(this.applicationID);
    const rte = `ticket/getapprovalTeam/${this.applicationID}`
    this.crdsrv.get(rte).subscribe(res => {
      this.approvalDtls = res['data'];
      console.log(this.approvalDtls);
    })
    this.approvalID=this.reqData.aprvl_tm_id
  }
  getAssignTeam(){
    const rte = 'ticket/getassignTeams'
    this.crdsrv.get(rte).subscribe(res => {
      this.assignTeamDtls = res['data'];
      console.log(this.assignTeamDtls);
    })
    this.assignID = this.reqData.sprt_tm_id
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

  backBtn(){
    console.log("Backkkkkkkkkk")
    this.router.navigate(['/admin/support/personal/ticketlst'],{ queryParams: { "paramsdata": 1 }});
   this.location.replaceState('/admin/support/personal/ticketlst');
  }
  update(){
    this.searchLoader = true;
    if (this.comment) {
      this.array=[];
      for (var i = 0; i < this.actionsarray.length; i++) {
        if (this.actionsarray[i].keyname == 'Application') {
          this.actionsarray[i].ticket_Id = this.reqData.tckt_id;
          this.actionsarray[i].previousid = this.reqData.aplcn_id;
          this.actionsarray[i].changedid = this.applicationID;
        }
        if (this.actionsarray[i].keyname == 'Approval Team') {
          this.actionsarray[i].ticket_Id = this.reqData.tckt_id;
          this.actionsarray[i].previousid = this.reqData.aprvl_tm_id;
          this.actionsarray[i].changedid = this.approvalID;

        }
        if (this.actionsarray[i].keyname == 'Assign Team') {
          this.actionsarray[i].ticket_Id = this.reqData.tckt_id;
          this.actionsarray[i].previousid = this.reqData.sprt_tm_id;
          this.actionsarray[i].changedid = this.assignID;
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
        // type_Id: this.TypeID > 0 ? this.TypeID == this.reqData.tckt_type_id ? 0 : this.TypeID : 0,
        category_Id: this.categryID > 0 ? this.categryID == this.reqData.tckt_ctgry_id ? 0 : this.categryID : 0,
        subcategory_Id:  0,
        issueType_Id:  0,
        iisueIdentifier_Id:  0,
        vendor_Id:  0,
        // sprtTeam_Id: 0,
        apctn_id:this.applicationID > 0 ? this.applicationID == this.reqData.aplcn_id ? 0 : this.applicationID : 0,
        shouldapproveTeam_Id:this.approvalID > 0 ? this.approvalID == this.reqData.aprvl_tm_id ? 0 : this.approvalID : 0,
        sprtTeam_Id:this.assignID > 0 ? this.assignID == this.reqData.sprt_tm_id ? 0 : this.assignID : 0,
        sprtuser_Id: 0,
        status: this.statusID > 0 ? this.statusID == this.reqData.tckt_status_id ? 0 : this.statusID : 0,
        prty_Id: this.prortyID > 0 ? this.prortyID == this.reqData.prty_id ? 0 : this.prortyID : 0,
        description: this.descrptn ? this.descrptn.length>0? this.descrptn: 0 :0,
        longdescription: this.lngdescrptn ? this.lngdescrptn.length>0? this.lngdescrptn: 0 :0,
        attah_data: this.attach_image,
        comment: this.comment,
        array:this.array
      }
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
          this.searchLoader = false;
          this.comment = '';
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
