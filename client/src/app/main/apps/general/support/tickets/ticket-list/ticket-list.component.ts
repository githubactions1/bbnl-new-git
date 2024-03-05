import { Component, OnInit, Input } from '@angular/core';
import { MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition, MatSnackBar, MatCheckboxChange } from '@angular/material';
import { Ticket } from './ticket.model';
import { TransfereService } from 'app/providers/transfer/transfer.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CrudService } from 'app/main/apps/crud.service';
import { Location } from '@angular/common';
import { DatePipe } from '@angular/common';



@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.scss']
})
export class TicketListComponent implements OnInit {
  @Input()
  ticketsDta: any;
  tickets: any;
  searchText: string = '';
  searchRaised = '';
  searchPrority = '';
  searchType = '';
  searchCat = '';
  ticketsaccptdata: any;

  users: any = [];
  status: any = [];
  priorities: any = [];
  categories: any = [];
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  categoryDtls: any;
  statusDtls: any;
  typeDtls: any;
  teamDtls: any;
  stsId: any;
  prpId: any;
  tckId: any;
  catId: any;
  teamId: any;
  asgnId: any;
  CreateTicketDtls: any;
  columnKeys: any = [];
  border: boolean = false;
  typeId: any;
  actnsClkme: boolean = false;
  priorityarray = [{ reqentryid: '', previousid: '', changedid: '', keyid: '2', keyname: 'PRIORITY' }]
  typearray = [{ reqentryid: '', previousid: '', changedid: '', keyid: '4', keyname: 'TYPE' }]
  categoryarray = [{ reqentryid: '', previousid: '', changedid: '', keyid: '3', keyname: 'CATEGORY' }]
  teamarray = [{ reqentryid: '', previousid: '', changedid: '', keyid: '5', keyname: 'TEAM' }]
  assignrray = [{ reqentryid: '', previousid: '', changedid: '', keyid: '6', keyname: 'ASSIGN' }]

  actionsarray = [{ ticket_Id: '', previousid: '', changedid: '', keyid: '1', keyname: 'Type' },
  { ticket_Id: '', previousid: '', changedid: '', keyid: '2', keyname: 'Category' },
  { ticket_Id: '', previousid: '', changedid: '', keyid: '3', keyname: 'Sub_Category' },
  { ticket_Id: '', previousid: '', changedid: '', keyid: '4', keyname: 'Status' },
  { ticket_Id: '', previousid: '', changedid: '', keyid: '5', keyname: 'IssueType' },
  { ticket_Id: '', previousid: '', changedid: '', keyid: '6', keyname: 'Issue_Identifier' },
  { ticket_Id: '', previousid: '', changedid: '', keyid: '7', keyname: 'Team' },
  { ticket_Id: '', previousid: '', changedid: '', keyid: '8', keyname: 'Priority' },
  { ticket_Id: '', previousid: '', changedid: '', keyid: '9', keyname: 'Vendor' },
  { ticket_Id: '', previousid: '', changedid: '', keyid: '10', keyname: 'Elements' },
  { ticket_Id: '', previousid: '', changedid: '', keyid: '11', keyname: 'Sechdule Start' },
  { ticket_Id: '', previousid: '', changedid: '', keyid: '12', keyname: 'Sechdule End' }]
  comment: any;
  userLst: any;
  clkme: any;
  acceptData: any;

  TypeID: any;
  categryID: any;
  subcategryID: any;
  issueTypeID: any;
  issueIndefierID: any;
  teamID: any;
  prortyID: any;
  statusID: any;
  linkTicketID: any;
  CategoryDtls: any;
  subCategoryDtls: any;
  issueTypesDtls: any;
  issueIndefierDtls: any;
  teamsDtls: any;
  stsDtls: any;
  prtyDtls: any;
  descrptn: any;
  VendorDtls: any;
  // AssignDtls: any;
  array = [];
  rteBck
  VendorID: any;
  ElementDtls: any;
  ElementID: any;
  scheend: any;
  schestrt: any;
  searchLoader: boolean = false;
  approveTickets = [];
  aprvecomment: any;
  assignUserID: any;
  selectedrequest: any;
  datdiv: boolean = false
  // TeamCountDtls: any;
  itmsDtls: any;
  UsrDtls: any;
  menulst = [];
  stsitmnms = [];
  stsrslts = [];
  typrslts = [];
  ctgryrslts = [];
  prirslts = [];
  typitmnms = [];
  ctgryitmnms = [];
  prtyitmnms = [];
  sidememu_ind: any;
  sidememu_id: any;
  sidememu_logintmid: any;
  details: any;
  countdata: boolean = false;
  notetext: boolean = false;
  formdetails: any;
  // ticketsDta: any;
  // ticketsdata: any;
  // selectedrequest: any;
  constructor(public router: Router, private route: ActivatedRoute, public TransfereService: TransfereService, private crdsrv: CrudService, public snackBar: MatSnackBar, private location: Location, public datePipe: DatePipe) {
    this.route.queryParams.subscribe(params => {
      console.log(params);
      if (params.paramsdata) {
        this.rteBck = params.paramsdata
        // this.tktParamsDta=JSON.parse(params.paramsdata);
      }
    })
    this.menulst = [
      // {
      //   prnt_mnu_itm_id: 1,
      //   prnt_mnu_itm_nm: 'MY TICKETS',
      //   sub_mnus: [{
      //     id:'',
      //     mnu_itm_nm: 'Assigned to my Team',
      //     mnu_itm_url_tx: '',
      //     mnu_icn_tx: 'AT',
      //     mnu_icn_tx_bg: '#fdacbc',
      //     mnu_icn_tx_clr: '#f20534',
      //     indicator: "ASSIGNEDTOTEAM",
      //     count:''
      //   },{
      //     id:'',
      //     mnu_itm_nm: 'Accept By Me',
      //     mnu_itm_url_tx: '',
      //     mnu_icn_tx: 'A',
      //     mnu_icn_tx_bg: 'rgb(172 189 145);',
      //     mnu_icn_tx_clr: 'rgb(204 255 2);',
      //     indicator: "ASSIGNEDBYME",
      //     count:''
      //   },
      //   {
      //     id:'',
      //     mnu_itm_nm: 'Create By Me',
      //     mnu_itm_url_tx: '',
      //     mnu_icn_tx: 'C',
      //     mnu_icn_tx_bg: 'rgb(169 147 255);',
      //     mnu_icn_tx_clr: 'rgb(127 0 223)',
      //     indicator: "CREATEDBYME",
      //     count:''
      //   },
      //   {
      //     id:'',
      //     mnu_itm_nm: 'Created By Team',
      //     mnu_itm_url_tx: '',
      //     mnu_icn_tx: 'CT',
      //     mnu_icn_tx_bg: '#93b5ff',
      //     mnu_icn_tx_clr: '#0046df',
      //     indicator: "CREATEDBYTEAM",
      //     count:''
      //   },
      //   {
      //     id:'',
      //     mnu_itm_nm: 'To Approve',
      //     mnu_itm_url_tx: '',
      //     mnu_icn_tx: 'AP',
      //     mnu_icn_tx_bg: 'rgb(245 199 236)',
      //     mnu_icn_tx_clr: 'rgb(223 0 216)',
      //     indicator: "APPROVAL",
      //     count:''
      //   },
      //   {
      //     id:'',
      //     mnu_itm_nm: 'My Approvals',
      //     mnu_itm_url_tx: '',
      //     mnu_icn_tx: 'AP',
      //     mnu_icn_tx_bg: 'rgb(245 179 160)',
      //     mnu_icn_tx_clr: 'rgb(241 68 17)',
      //     indicator: "MYAPPROVAL",
      //     count:''
      //   },
      //   {
      //     id:'',
      //     mnu_itm_nm: 'Escalated To',
      //     mnu_itm_url_tx: '',
      //     mnu_icn_tx: 'ES',
      //     mnu_icn_tx_bg: 'rgb(255 250 193)',
      //     mnu_icn_tx_clr: 'rgb(247 217 5)',
      //     indicator: "ESCALATED",
      //     count:''
      //   }],
      //   submnus:[]
      // },
      {
        prnt_mnu_itm_id: 1,
        prnt_mnu_itm_nm: 'STATUS',
        submnus: []
      }, {
        prnt_mnu_itm_id: 2,
        prnt_mnu_itm_nm: 'TYPE',
        submnus: []
      },
      {
        prnt_mnu_itm_id: 3,
        prnt_mnu_itm_nm: 'CATEGORY',
        submnus: []
      },
      {
        prnt_mnu_itm_id: 4,
        prnt_mnu_itm_nm: 'PRIORITY',
        submnus: []
      },
    ]
  }
  ngOnChanges() {
    this.searchLoader = true;
    this.tickets = this.ticketsDta.dtarslts
    this.details = this.tickets;
    console.log(this.details)
    console.log(this.tickets);
    this.notetext = false;
    if (this.tickets != undefined) {
      for (var t = 0; t < this.tickets.length; t++) {
        this.tickets[t]['border'] = false;
        if (this.tickets[t].tckt_type_id != 10 && this.tickets[t].tckt_type_id != 11) {
          if (this.tickets[t].loginuserteamid == 5) {
            if (this.tickets[t].sprt_tm_id == 5) {
              this.tickets[t]['if'] = true;
              this.tickets[t]['basicRequest'] = false;
              this.tickets[t]['privilegeRequest'] = false;
              this.tickets[t]['prefix'] = 'SBR';
            }
            else {
              this.tickets[t]['if'] = false;
              this.tickets[t]['basicRequest'] = false;
              this.tickets[t]['privilegeRequest'] = false;
              this.tickets[t]['prefix'] = 'CR';
            }
          }
          else {
            this.tickets[t]['if'] = true;
            this.tickets[t]['basicRequest'] = false;
            this.tickets[t]['privilegeRequest'] = false;
            this.tickets[t]['prefix'] = 'CR';
          }
        }
        else if (this.tickets[t].tckt_type_id == 10) {
          this.tickets[t]['if'] = '';
          this.tickets[t]['basicRequest'] = true;
          this.tickets[t]['privilegeRequest'] = false;
          this.tickets[t]['prefix'] = 'BSR';
        }
        else if (this.tickets[t].tckt_type_id == 11) {
          this.tickets[t]['if'] = '';
          this.tickets[t]['basicRequest'] = false;
          this.tickets[t]['privilegeRequest'] = true;
          this.tickets[t]['prefix'] = 'PR';
        }
      }
      if (this.tickets.length > 0) {
        if (this.details[0].indicator == 'ESCALATED') {
          this.notetext = true;
        } else {
          this.notetext = false;
        }
        // if (this.details[0].indicator == 'APPROVAL') {
          // this.ForassignUsers();
        // }
      }
      this.countdata = true
    } else {
      this.countdata = false;
    }
    console.log(this.tickets);
    this.searchLoader = false;
    if (this.ticketsDta.dtarslts != undefined) {
      if (this.ticketsDta.dtarslts.length > 0) {
        this.datdiv = false;
      } else {
        this.datdiv = true;
      }

    }
    // for (let i = 0; i < this.priorities.length; i++) {
    //   for (let j = 0; j < this.tickets.length; j++) {
    //     if (this.priorities[i].prorty_id == this.tickets[j].prorty_id) {
    //       this.tickets[j]['prorty_nm'] = this.priorities[i].prorty_nm;
    //     }
    //   }
    // }

    // for (let i = 0; i < this.categories.length; i++) {
    //   for (let j = 0; j < this.tickets.length; j++) {
    //     if (this.categories[i].ctgry_id == this.tickets[j].ctgry_id) {
    //       this.tickets[j]['ctgry_nm'] = this.categories[i].ctgry_nm;
    //     }
    //   }
    // }

  }
  spnrIn: boolean;
  ngOnInit() {
    // console.log("hey madhuuuuuuuuuuuuuuuu")
    if (this.rteBck == 1) {
      this.router.navigate(['/admin/support/personal/my-tickets']);
      this.location.replaceState('/admin/support/personal/my-tickets');
    }
    // console.log(this.details)
    console.log(this.tickets);
    //  this.getCategories();
    //  this.getstatus();
    //  this.gettypes();
    //  this.getPriorities();
    //  this.getTeams();
    this.getDetailsToCreate();
    this.getfilterItems();
    // this.drodown();
    // for (let i = 0; i < this.priorities.length; i++) {
    //   for (let j = 0; j < this.tickets.length; j++) {
    //     if (this.priorities[i].prorty_id == this.tickets[j].prorty_id) {
    //       this.tickets[j]['prorty_nm'] = this.priorities[i].prorty_nm;
    //     }
    //   }
    // }

    // for (let i = 0; i < this.categories.length; i++) {
    //   for (let j = 0; j < this.tickets.length; j++) {
    //     if (this.categories[i].ctgry_id == this.tickets[j].ctgry_id) {
    //       this.tickets[j]['ctgry_nm'] = this.categories[i].ctgry_nm;
    //     }
    //   }
    // }
  }
  // isChecked(): boolean {
  //   return this.stsitmnms.stsitems && this.stsrslts.length
  //     && this.stsitmnms.stsitems.length === this.stsrslts.length;
  // }

  // isIndeterminate(): boolean {
  //   return this.stsitmnms.stsitems && this.stsrslts.length && this.stsitmnms.stsitems.length
  //     && this.stsitmnms.stsitems.length < this.stsrslts.length;
  // }

  // toggleSelection(change: MatCheckboxChange): void {
  //   if (change.checked) {
  //     this.stsitmnms.update.emit(this.stsrslts);
  //   } else {
  //     this.stsitmnms.update.emit([]);
  //   }
  // }
  getrequest() {
    // console.log(event)
    console.log(this.selectedrequest)
    if (this.selectedrequest == 11) {
      this.openPrivForm();
    } else if (this.selectedrequest == 10) {
      this.openRqstForm();
    } else if (this.selectedrequest == 8) {
      this.opensubscriberform();
    } else if (this.selectedrequest == 7) {
      this.openOccform();
    } else if (this.selectedrequest == 9) {
      this.openNocform();
    }
  }

  // console.log(this.selectedrequest);

  // drodown(){
  //   console.log(this.selectedrequest);
  // }

  getfilterItems() {
    const rte = 'ticket/getDetails'
    this.crdsrv.get(rte).subscribe((res) => {
      console.log(res['data']);
      this.itmsDtls = res['data'][0];
      this.UsrDtls = res['data'][1];
      console.log(this.itmsDtls);
      console.log(this.menulst);
      for (var k = 0; k < this.menulst.length; k++) {
        // if(this.menulst[k].prnt_mnu_itm_nm == 'MY TICKETS'){
        //   this.menulst[k].submnus.push(this.menulst[k].sub_mnus);
        // }
        if (this.menulst[k].prnt_mnu_itm_nm == 'STATUS') {
          this.menulst[k].submnus.push(this.itmsDtls[0]);
        }
        if (this.menulst[k].prnt_mnu_itm_nm == 'TYPE') {
          this.menulst[k].submnus.push(this.itmsDtls[1]);
        }
        if (this.menulst[k].prnt_mnu_itm_nm == 'CATEGORY') {
          this.menulst[k].submnus.push(this.itmsDtls[2]);
        }
        if (this.menulst[k].prnt_mnu_itm_nm == 'PRIORITY') {
          this.menulst[k].submnus.push(this.itmsDtls[4]);
        }
      }
      console.log(this.menulst);
      this.stsrslts = this.menulst[0].submnus[0];
      this.typrslts = this.menulst[1].submnus[0];
      this.ctgryrslts = this.menulst[2].submnus[0];
      this.prirslts = this.menulst[3].submnus[0];
      console.log(this.stsrslts)
    })

  }
  filterdetails() {
    this.sidememu_ind = this.details[0].indicator;
    this.sidememu_id = this.details[0].id;
    this.sidememu_logintmid = this.details[0].loginuserteamid;
    console.log(this.stsitmnms)
    console.log(this.typitmnms)
    console.log(this.ctgryitmnms)
    console.log(this.prtyitmnms)
    let data = {
      'STATUS': this.stsitmnms,
      'TYPE': this.typitmnms,
      'CATEGORY': this.ctgryitmnms,
      'PRIORITY': this.prtyitmnms,
      'indicator': this.sidememu_ind,
      'id': this.sidememu_id,
      'loginuserteamid': this.sidememu_logintmid
    }
    this.searchLoader = true;
    console.log(data);
    let rte = 'ticket/get_TicketDetails'
    this.crdsrv.create(data, rte).subscribe((res) => {
      this.ticketsDta = res['data'];
      this.ticketsaccptdata = this.ticketsDta.dtarslts
      console.log(this.tickets);
      this.searchLoader = false;
      for (var t = 0; t < this.ticketsaccptdata.length; t++) {
        this.ticketsaccptdata[t]['border'] = false;
        if (this.ticketsaccptdata[t].tckt_type_id != 10 && this.ticketsaccptdata[t].tckt_type_id != 11) {
          if (this.ticketsaccptdata[t].loginuserteamid == 5) {
            if (this.ticketsaccptdata[t].sprt_tm_id == 5) {
              this.ticketsaccptdata[t]['if'] = true;
              this.ticketsaccptdata[t]['basicRequest'] = false;
              this.ticketsaccptdata[t]['privilegeRequest'] = false;
              this.ticketsaccptdata[t]['prefix'] = 'SBR';
            }
            else {
              this.ticketsaccptdata[t]['if'] = false;
              this.ticketsaccptdata[t]['basicRequest'] = false;
              this.ticketsaccptdata[t]['privilegeRequest'] = false;
              this.ticketsaccptdata[t]['prefix'] = 'CR';
            }
          }
          else {
            this.ticketsaccptdata[t]['if'] = true;
            this.ticketsaccptdata[t]['basicRequest'] = false;
            this.ticketsaccptdata[t]['privilegeRequest'] = false;
            this.ticketsaccptdata[t]['prefix'] = 'CR';
          }
        }
        else if (this.ticketsaccptdata[t].tckt_type_id == 10) {
          this.ticketsaccptdata[t]['if'] = '';
          this.ticketsaccptdata[t]['basicRequest'] = true;
          this.ticketsaccptdata[t]['privilegeRequest'] = false;
          this.ticketsaccptdata[t]['prefix'] = 'BSR';
        }
        else if (this.ticketsaccptdata[t].tckt_type_id == 11) {
          this.ticketsaccptdata[t]['if'] = '';
          this.ticketsaccptdata[t]['basicRequest'] = false;
          this.ticketsaccptdata[t]['privilegeRequest'] = true;
          this.ticketsaccptdata[t]['prefix'] = 'PR';
        }
      }
      this.tickets = this.ticketsaccptdata;
      console.log(this.tickets)
      this.searchLoader = false;
      if (this.tickets.length > 0) {
        this.datdiv = false;
      } else {
        this.datdiv = true;
      }
    })
    console.log(this.tickets.length)

  }

  // ForTeamTcktsCntDta() {
  //   let data = {
  //     id: this.CreateTicketDtls[0].tm_id
  //   }
  //   const rte = `ticket/getTeamTcktCntDta`
  //   this.crdsrv.create(data, rte).subscribe(res => {
  //     this.TeamCountDtls = res['data'];
  //     console.log(this.TeamCountDtls);
  //   })
  // }

  ForVendors() {
    const rte = `ticket/getVendors`
    this.crdsrv.get(rte).subscribe(res => {
      this.VendorDtls = res['data'];
      console.log(this.VendorDtls);
      this.VendorID = this.formdetails.vndr_id;
      if (this.categryID != 0) {
        this.ForElement();
      }
    })
  }
  ForElement() {
    console.log(this.VendorID)
    const rte = `ticket/getElements/${this.VendorID}`
    this.crdsrv.get(rte).subscribe(res => {
      this.ElementDtls = res['data'];
      console.log(this.ElementDtls);
      this.ElementID = this.formdetails.elmnt_id;
    })
  }

  // ForassignUsers() {
  //   var teamid = this.details[0].crte_tm_id
  //   const rte = `ticket/getAssignUsers/${teamid}`
  //   this.crdsrv.get(rte).subscribe(res => {
  //     this.AssignDtls = res['data'];
  //     console.log(this.AssignDtls);
  //   })
  // }


  getDetailsToCreate() {
    this.searchLoader = true;
    const rte = 'ticket/creation'
    this.crdsrv.get(rte).subscribe((res) => {
      this.CreateTicketDtls = res['data'];
      console.log("i am Visibleeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee")
      console.log(this.CreateTicketDtls);
      console.log(this.CreateTicketDtls.length);
      this.searchLoader = false;
      // if (this.CreateTicketDtls.length == 1) {
      //   this.TypeID = this.CreateTicketDtls[0].tckt_type_id;
      // this.ForCategory();
      // this.ForTeamTcktsCntDta();
      // }
      // else {
      //   this.TypeID = ''
      // }
      // if (this.CreateTicketDtls[0].tm_id == 5) {
      //   this.ForassignUsers();
      // }

    })

  }

  ForCategory() {
    console.log(this.TypeID);
    this.categryID = '';
    this.subcategryID = '';
    this.issueTypeID = '';
    this.issueIndefierID = '';
    this.teamID = '';
    this.TypeID = this.formdetails.tckt_type_id;
    const rte = `ticket/getCategories/${this.TypeID}`
    this.crdsrv.get(rte).subscribe(res => {
      this.CategoryDtls = res['data'];
      console.log(this.CategoryDtls);
      console.log(this.CategoryDtls.length);
      this.categryID = this.formdetails.tckt_ctgry_id;
      // if (this.CategoryDtls.length == 1) {
      //   this.categryID = this.formdetails.tckt_ctgry_id;
      // }
      // else {
      //   this.categryID = ''
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
    this.teamID = '';
    // this.ForTeams();
    const rte = `ticket/getSubCategories/${this.categryID}`
    this.crdsrv.get(rte).subscribe(res => {
      this.subCategoryDtls = res['data'];
      console.log(this.subCategoryDtls);
      console.log(this.subCategoryDtls.length);
      this.subcategryID = this.formdetails.tckt_sb_ctgry_id;
      // if (this.subCategoryDtls.length == 1) {
      //   this.subcategryID = this.subCategoryDtls[0].tckt_sb_ctgry_id;
      //   this.ForIssueType();
      // }
      // else {
      //   this.subcategryID = ''
      // }
      if (this.subcategryID != 0) {
        this.ForIssueType();
      }
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
      this.issueTypeID = this.formdetails.ise_type_id;
      // if (this.issueTypesDtls.length == 1) {
      //   this.issueTypeID = this.issueTypesDtls[0].ise_type_id;
      //   this.ForIssueIndefiers();
      // }
      // else {
      //   this.issueTypeID = ''
      // }
      if (this.issueTypeID != 0) {
        this.ForIssueIndefiers();
      }
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
      this.issueIndefierID = this.formdetails.ise_idnfr_id;
      // if (this.issueIndefierDtls.length == 1) {
      //   this.issueIndefierID = this.issueIndefierDtls[0].ise_idnfr_id;
      //   this.ForTeams();
      // }
      // else {
      //   this.issueIndefierID = ''
      // }
      if (this.issueIndefierID != 0) {
        this.ForTeams();
      }
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
      if (this.teamsDtls.length == 1) {
        this.teamID = this.formdetails.tm_id;
      }
      else {
        this.teamID = ''
      }
    })
  }

  getStatus() {
    const rte = 'support/Ticket-Status'
    this.crdsrv.get(rte).subscribe(res => {
      this.stsDtls = res['data'];
      console.log(this.stsDtls)
      this.statusID = this.formdetails.tckt_status_id;
    })
  }
  getpriority() {
    const rte = 'support/Priority'
    this.crdsrv.get(rte).subscribe(res => {
      this.prtyDtls = res['data'];
      console.log(this.prtyDtls)
      this.prortyID = this.formdetails.prty_id;
    })
  }

  accept(n) {
    this.searchLoader = true;
    this.acceptData = [];
    console.log(n);
    this.acceptData = n;
    const rte = `ticket/accept`;
    this.crdsrv.create(this.acceptData, rte).subscribe((res) => {
      console.log(res['status']);
      if (res['status'] == 200) {
        this.searchLoader = false;
        this.snackBar.open("Sucessfully Accepted", '', {
          duration: 2000,
          panelClass: ['blue-snackbar'],
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
        let data = {
          indicator: n.indicator,
          id: n.id,
          loginuserteamid: n.loginuserteamid
        }
        console.log(data);
        this.searchLoader = true;
        let rte = 'ticket/get_TicketDetails'
        this.crdsrv.create(data, rte).subscribe((res) => {
          this.ticketsDta = res['data'];
          this.ticketsaccptdata = this.ticketsDta.dtarslts
          console.log(this.ticketsaccptdata);

          // if (this.ticketsaccptdata != undefined) {
          for (var t = 0; t < this.ticketsaccptdata.length; t++) {
            this.ticketsaccptdata[t]['border'] = false;
            if (this.ticketsaccptdata[t].tckt_type_id != 10 && this.ticketsaccptdata[t].tckt_type_id != 11) {
              if (this.ticketsaccptdata[t].loginuserteamid == 5) {
                if (this.ticketsaccptdata[t].sprt_tm_id == 5) {
                  this.ticketsaccptdata[t]['if'] = true;
                  this.ticketsaccptdata[t]['basicRequest'] = false;
                  this.ticketsaccptdata[t]['privilegeRequest'] = false;
                  this.ticketsaccptdata[t]['prefix'] = 'SBR';
                }
                else {
                  this.ticketsaccptdata[t]['if'] = false;
                  this.ticketsaccptdata[t]['basicRequest'] = false;
                  this.ticketsaccptdata[t]['privilegeRequest'] = false;
                  this.ticketsaccptdata[t]['prefix'] = 'CR';
                }
              }
              else {
                this.ticketsaccptdata[t]['if'] = true;
                this.ticketsaccptdata[t]['basicRequest'] = false;
                this.ticketsaccptdata[t]['privilegeRequest'] = false;
                this.ticketsaccptdata[t]['prefix'] = 'CR';
              }
            }
            else if (this.ticketsaccptdata[t].tckt_type_id == 10) {
              this.ticketsaccptdata[t]['if'] = '';
              this.ticketsaccptdata[t]['basicRequest'] = true;
              this.ticketsaccptdata[t]['privilegeRequest'] = false;
              this.ticketsaccptdata[t]['prefix'] = 'BSR';
            }
            else if (this.ticketsaccptdata[t].tckt_type_id == 11) {
              this.ticketsaccptdata[t]['if'] = '';
              this.ticketsaccptdata[t]['basicRequest'] = false;
              this.ticketsaccptdata[t]['privilegeRequest'] = true;
              this.ticketsaccptdata[t]['prefix'] = 'PR';
            }
          }
          this.tickets = this.ticketsaccptdata;
          console.log(this.tickets)
          this.searchLoader = false;
          // this.countdata = true
          // } else {
          //   this.countdata = false;
          // }
        })
        // console.log(this.ticketsaccptdata.length)
      }
      // if (this.ticketsaccptdata != undefined) {

      // console.log(this.tickets);
      // }

    })
  }

  onClickMe(n) {
    // this.TypeID = '';
    // this.categryID = '';
    // this.subcategryID = '';
    // this.issueTypeID = '';
    // this.issueIndefierID = '';
    // this.teamID = '';
    // this.statusID = '';
    // this.prortyID = '';
    console.log(n);
    this.tckId = n.tckt_id;
    this.actnsClkme = true;
    // this.typeId = n.tckt_type_id;
    this.formdetails = n;
    this.ForCategory();
    this.getStatus();
    this.getpriority();
    this.ForVendors();
    this.ForElement();
    //  this.border=true;
    console.log(this.tickets);
    for (var b = 0; b < this.tickets.length; b++) {
      if (n.tckt_id == this.tickets[b].tckt_id) {
        this.tickets[b].border = true;
      }
      else {
        this.tickets[b].border = false;
      }
    }
    // this.TypeID=n.tckt_type_id;
    // this.categryID=n.tckt_ctgry_id;
    // this.subcategryID=n.tckt_sb_ctgry_id;
    // this.issueTypeID=n.ise_type_id;
    // this.issueIndefierID=n.ise_idnfr_id;
    // this.teamID=n.sprt_tm_id;
    // this.statusID=n.tckt_status_id;
    // this.prortyID=n.prty_id;

  }
  approve() {

    this.searchLoader = true;
    this.approveTickets = [];
    console.log(this.tickets);
    for (var ap = 0; ap < this.tickets.length; ap++) {
      if (this.tickets[ap].approvngChkBox) {
        if (this.tickets[ap].approvngChkBox == true) {
          this.approveTickets.push(this.tickets[ap]);
          this.tickets[ap]['aprovecomment'] = this.aprvecomment;
          this.tickets[ap]['aproveuser'] = this.assignUserID;
        }
      }
    }
    console.log(this.approveTickets);
    this.searchLoader = false;
    // return
    if (this.aprvecomment) {
      const rte = `ticket/approving`;
      this.crdsrv.create(this.approveTickets, rte).subscribe((res) => {
        console.log(res['status'] == 200);
        if (res['status'] == 200) {
          this.searchLoader = false;
          this.snackBar.open("Approved", '', {
            duration: 2000,
            panelClass: ['blue-snackbar'],
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
          });
          this.aprvecomment = '';
          let data = {
            indicator: this.approveTickets[0].indicator,
            id: this.approveTickets[0].id,
            loginuserteamid: this.approveTickets[0].loginuserteamid
          }
          this.searchLoader = true;
          let rte = 'ticket/get_TicketDetails'
          this.crdsrv.create(data, rte).subscribe((res) => {
            this.tickets = res['data'];
            this.ticketsDta = res['data'];
            this.ticketsaccptdata = this.ticketsDta.dtarslts
            this.searchLoader = false;
            for (var p = 0; p < this.tickets.length; p++) {
              this.ticketsaccptdata[p]['indicator'] = this.approveTickets[0].indicator;
              this.ticketsaccptdata[p]['id'] = this.approveTickets[0].id;
              this.ticketsaccptdata[p]['loginuserteamid'] = this.approveTickets[0].loginuserteamid;
            }
            for (var t = 0; t < this.ticketsaccptdata.length; t++) {
              this.ticketsaccptdata[t]['border'] = false;
              if (this.ticketsaccptdata[t].tckt_type_id != 10 && this.ticketsaccptdata[t].tckt_type_id != 11) {
                if (this.ticketsaccptdata[t].loginuserteamid == 5) {
                  if (this.ticketsaccptdata[t].sprt_tm_id == 5) {
                    this.ticketsaccptdata[t]['if'] = true;
                    this.ticketsaccptdata[t]['basicRequest'] = false;
                    this.ticketsaccptdata[t]['privilegeRequest'] = false;
                    this.ticketsaccptdata[t]['prefix'] = 'SBR';
                  }
                  else {
                    this.ticketsaccptdata[t]['if'] = false;
                    this.ticketsaccptdata[t]['basicRequest'] = false;
                    this.ticketsaccptdata[t]['privilegeRequest'] = false;
                    this.ticketsaccptdata[t]['prefix'] = 'CR';
                  }
                }
                else {
                  this.ticketsaccptdata[t]['if'] = true;
                  this.ticketsaccptdata[t]['basicRequest'] = false;
                  this.ticketsaccptdata[t]['privilegeRequest'] = false;
                  this.ticketsaccptdata[t]['prefix'] = 'CR';
                }
              }
              else if (this.ticketsaccptdata[t].tckt_type_id == 10) {
                this.ticketsaccptdata[t]['if'] = '';
                this.ticketsaccptdata[t]['basicRequest'] = true;
                this.ticketsaccptdata[t]['privilegeRequest'] = false;
                this.ticketsaccptdata[t]['prefix'] = 'BSR';
              }
              else if (this.ticketsaccptdata[t].tckt_type_id == 11) {
                this.ticketsaccptdata[t]['if'] = '';
                this.ticketsaccptdata[t]['basicRequest'] = false;
                this.ticketsaccptdata[t]['privilegeRequest'] = true;
                this.ticketsaccptdata[t]['prefix'] = 'PR';
              }
            }
            this.tickets = this.ticketsaccptdata;
            console.log(this.tickets)
            this.searchLoader = false;
            console.log(this.tickets);
          })
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



  saveactions(clkdata) {
    this.searchLoader = true;
    console.log(clkdata.vndr_id);
    console.log(clkdata.elmnt_id);
    console.log(clkdata.schdle_strt_ts);
    console.log(clkdata.schdle_end_ts);
    this.schestrt = this.datePipe.transform(this.schestrt, 'yyyy-MM-dd');
    this.scheend = this.datePipe.transform(this.scheend, 'yyyy-MM-dd');
    console.log(this.VendorID);
    console.log(this.ElementID);
    console.log(this.schestrt);
    console.log(this.scheend);
    if (this.comment) {
      this.array = [];
      for (var i = 0; i < this.actionsarray.length; i++) {
        if (this.actionsarray[i].keyname == 'Type') {
          this.actionsarray[i].ticket_Id = clkdata.tckt_id;
          this.actionsarray[i].previousid = clkdata.tckt_type_id;
          this.actionsarray[i].changedid = this.TypeID;

        }
        if (this.actionsarray[i].keyname == 'Category') {
          this.actionsarray[i].ticket_Id = clkdata.tckt_id;
          this.actionsarray[i].previousid = clkdata.tckt_ctgry_id;
          this.actionsarray[i].changedid = this.categryID;
        }
        if (this.actionsarray[i].keyname == 'Sub_Category') {
          this.actionsarray[i].ticket_Id = clkdata.tckt_id;
          this.actionsarray[i].previousid = clkdata.tckt_sb_ctgry_id;
          this.actionsarray[i].changedid = this.subcategryID;
        }
        if (this.actionsarray[i].keyname == 'Status') {
          this.actionsarray[i].ticket_Id = clkdata.tckt_id;
          this.actionsarray[i].previousid = clkdata.tckt_status_id;
          this.actionsarray[i].changedid = this.statusID;
        }
        if (this.actionsarray[i].keyname == 'IssueType') {
          this.actionsarray[i].ticket_Id = clkdata.tckt_id;
          this.actionsarray[i].previousid = clkdata.ise_type_id ? clkdata.ise_type_id : 0;
          this.actionsarray[i].changedid = this.issueTypeID;
        }
        if (this.actionsarray[i].keyname == 'Issue_Identifier') {
          this.actionsarray[i].ticket_Id = clkdata.tckt_id;
          this.actionsarray[i].previousid = clkdata.ise_idnfr_id ? clkdata.ise_type_id : 0;
          this.actionsarray[i].changedid = this.issueIndefierID;
        }
        if (this.actionsarray[i].keyname == 'Team') {
          this.actionsarray[i].ticket_Id = clkdata.tckt_id;
          this.actionsarray[i].previousid = clkdata.sprt_tm_id;
          this.actionsarray[i].changedid = this.teamID;
        }
        if (this.actionsarray[i].keyname == 'Priority') {
          this.actionsarray[i].ticket_Id = clkdata.tckt_id;
          this.actionsarray[i].previousid = clkdata.prty_id;
          this.actionsarray[i].changedid = this.prortyID;
        }
        if (this.actionsarray[i].keyname == 'Vendor') {
          this.actionsarray[i].ticket_Id = clkdata.tckt_id;
          this.actionsarray[i].previousid = clkdata.vndr_id;
          this.actionsarray[i].changedid = this.VendorID;
        }
        if (this.actionsarray[i].keyname == 'Elements') {
          this.actionsarray[i].ticket_Id = clkdata.tckt_id;
          this.actionsarray[i].previousid = clkdata.elmnt_id;
          this.actionsarray[i].changedid = this.ElementID;
        }
        if (this.actionsarray[i].keyname == 'Sechdule Start') {
          this.actionsarray[i].ticket_Id = clkdata.tckt_id;
          this.actionsarray[i].previousid = clkdata.schdle_strt_ts;
          this.actionsarray[i].changedid = this.schestrt;
        }
        if (this.actionsarray[i].keyname == 'Sechdule End') {
          this.actionsarray[i].ticket_Id = clkdata.tckt_id;
          this.actionsarray[i].previousid = clkdata.schdle_end_ts;
          this.actionsarray[i].changedid = this.scheend;
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
      var postData = {
        ticket_Id: clkdata.tckt_id,
        type_Id: this.TypeID > 0 ? this.TypeID == clkdata.tckt_type_id ? 0 : this.TypeID : 0,
        category_Id: this.categryID > 0 ? this.categryID == clkdata.tckt_ctgry_id ? 0 : this.categryID : 0,
        subcategory_Id: this.subcategryID > 0 ? this.subcategryID == clkdata.tckt_sb_ctgry_id ? 0 : this.subcategryID : 0,
        issueType_Id: this.issueTypeID > 0 ? this.issueTypeID == clkdata.ise_type_id ? 0 : this.issueTypeID : 0,
        iisueIdentifier_Id: this.issueIndefierID > 0 ? this.issueIndefierID == clkdata.ise_idnfr_id ? 0 : this.issueIndefierID : 0,
        sprtTeam_Id: this.teamID > 0 ? this.teamID == clkdata.sprt_tm_id ? 0 : this.teamID : 0,
        sprtuser_Id: 0,
        shouldapproveTeam_Id: 0,
        status_Id: this.statusID > 0 ? this.statusID == clkdata.tckt_status_id ? 0 : this.statusID : 0,
        prty_Id: this.prortyID > 0 ? this.prortyID == clkdata.prty_id ? 0 : this.prortyID : 0,
        vendor_Id: this.VendorID > 0 ? this.VendorID == clkdata.vndr_id ? 0 : this.VendorID : 0,
        element_Id: this.ElementID > 0 ? this.ElementID == clkdata.elmnt_id ? 0 : this.ElementID : 0,
        sechdulestart_Id: this.schestrt > 0 ? this.schestrt == clkdata.schdle_strt_ts ? 0 : this.schestrt : 0,
        sechduleend_Id: this.scheend > 0 ? this.scheend == clkdata.schdle_end_ts ? 0 : this.scheend : 0,
        comment: this.comment,
        array: this.array
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
            indicator: clkdata.indicator,
            id: clkdata.id,
            loginuserteamid: clkdata.loginuserteamid
          }
          console.log(data);
          this.searchLoader = true;
          let rte = 'ticket/get_TicketDetails'
          this.crdsrv.create(data, rte).subscribe((res) => {
            this.ticketsDta = res['data'];
            this.ticketsaccptdata = this.ticketsDta.dtarslts
            // console.log(this.tickets);
            this.searchLoader = false;
            for (var t = 0; t < this.ticketsaccptdata.length; t++) {
              this.ticketsaccptdata[t]['border'] = false;
              if (this.ticketsaccptdata[t].tckt_type_id != 10 && this.ticketsaccptdata[t].tckt_type_id != 11) {
                if (this.ticketsaccptdata[t].loginuserteamid == 5) {
                  if (this.ticketsaccptdata[t].sprt_tm_id == 5) {
                    this.ticketsaccptdata[t]['if'] = true;
                    this.ticketsaccptdata[t]['basicRequest'] = false;
                    this.ticketsaccptdata[t]['privilegeRequest'] = false;
                    this.ticketsaccptdata[t]['prefix'] = 'SBR';
                  }
                  else {
                    this.ticketsaccptdata[t]['if'] = false;
                    this.ticketsaccptdata[t]['basicRequest'] = false;
                    this.ticketsaccptdata[t]['privilegeRequest'] = false;
                    this.ticketsaccptdata[t]['prefix'] = 'CR';
                  }
                }
                else {
                  this.ticketsaccptdata[t]['if'] = true;
                  this.ticketsaccptdata[t]['basicRequest'] = false;
                  this.ticketsaccptdata[t]['privilegeRequest'] = false;
                  this.ticketsaccptdata[t]['prefix'] = 'CR';
                }
              }
              else if (this.ticketsaccptdata[t].tckt_type_id == 10) {
                this.ticketsaccptdata[t]['if'] = '';
                this.ticketsaccptdata[t]['basicRequest'] = true;
                this.ticketsaccptdata[t]['privilegeRequest'] = false;
                this.ticketsaccptdata[t]['prefix'] = 'BSR';
              }
              else if (this.ticketsaccptdata[t].tckt_type_id == 11) {
                this.ticketsaccptdata[t]['if'] = '';
                this.ticketsaccptdata[t]['basicRequest'] = false;
                this.ticketsaccptdata[t]['privilegeRequest'] = true;
                this.ticketsaccptdata[t]['prefix'] = 'PR';
              }
            }
            this.tickets = this.ticketsaccptdata;
            console.log(this.tickets)
            this.searchLoader = false;
            console.log(this.tickets);
          })
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

  savelinkTicket(n) {
    console.log(this.linkTicketID);
    console.log(n);
    let data = {
      bsrid: n.tckt_id,
      chrid: this.linkTicketID,
    }
    console.log(data);
    let rte = 'ticket/ticket/relation'
    this.crdsrv.create(data, rte).subscribe((res) => {
      console.log(res['status']);
      if (res['status'] === 200) {
        this.snackBar.open("Sucessfully Linked", '', {
          duration: 2000,
          panelClass: ['blue-snackbar'],
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
      }
    })
  }
  getUserByTeamId(): any {
    console.log(this.teamId);
    this.userLst = [];
    const rte = `ticket/user/${this.teamId}`;
    this.crdsrv.get(rte).subscribe((res) => {

      if (res['status'] === 200) {
        this.userLst = res['data'];
        console.log(this.userLst);
      }
    });
  }
  reset() {
    this.TypeID = '';
    this.categryID = '';
    this.subcategryID = '';
    this.issueTypeID = '';
    this.issueIndefierID = '';
    this.teamID = '';
    this.statusID = '';
    this.prortyID = '';
    this.comment = '';
  }
  resetLinkTicket() {
    this.linkTicketID = '';
  }
  viewDtls(clkdata) {
    console.log(clkdata)
    console.log(clkdata.vndr_id)

    // this.router.navigateByUrl('admin/support/personal/my-tickets/view');
    this.TransfereService.setLoclData('data', clkdata);
    if (clkdata.basicRequest == false && clkdata.tckt_type_id == 7 && clkdata.agnt_cd != null) {
      console.log("OccRequestEdit");
      this.router.navigate([`/admin/support/personal/my-tickets/occrequest/${clkdata.tckt_id}`]);
    }
    if (clkdata.if == true && clkdata.basicRequest == false && clkdata.vndr_id == null && clkdata.agnt_cd == null) {
      this.router.navigate([`/admin/support/personal/my-tickets/${clkdata.tckt_id}`]);
    }
    if (clkdata.basicRequest == false && clkdata.tckt_type_id == 9 && clkdata.vndr_id != null) {
      console.log("Vendor Component");
      this.router.navigate([`/admin/support/personal/my-tickets/noc/${clkdata.tckt_id}`]);
    }
    if (clkdata.basicRequest == true && clkdata.tckt_type_id == 10) {
      console.log("BasicRequestEdit");
      this.router.navigate([`/admin/support/personal/my-tickets/servicerequest/${clkdata.tckt_id}`]);
    }
    if (clkdata.privilegeRequest == true && clkdata.tckt_type_id == 11) {
      console.log("PrivilegeRequestEdit");
      this.router.navigate([`/admin/support/personal/my-tickets/privilegerequest/${clkdata.tckt_id}`]);
    }

  }
  // openForm() {
  //   console.log(this.CreateTicketDtls);
  //   if (this.CreateTicketDtls[0].tm_id == 2) {

  //   } else if (this.CreateTicketDtls[0].tm_id == 5) {

  //   } else if (this.CreateTicketDtls[0].tm_id == 7) {

  //   }
  // }
  openOccform() {
    console.log("OCCCCCCC");
    this.router.navigate(['/admin/support/my-tickets/occrequest-form'], { queryParams: { "paramsdata": JSON.stringify(this.CreateTicketDtls) }, skipLocationChange: true })
    this.location.replaceState('/admin/support/my-tickets/occrequest-form');
  }
  openNocform() {
    console.log("NOOOOOOOOOCC");
    this.router.navigate(['/admin/support/my-tickets/noc-form'], { queryParams: { "paramsdata": JSON.stringify(this.CreateTicketDtls) }, skipLocationChange: true })
    this.location.replaceState('/admin/support/my-tickets/noc-form');
  }
  opensubscriberform() {
    console.log("CALLCENTERRRRR");
    this.router.navigate(['/admin/support/my-tickets/callcenter-form'], { queryParams: { "paramsdata": JSON.stringify(this.CreateTicketDtls) }, skipLocationChange: true })
    this.location.replaceState('/admin/support/my-tickets/callcenter-form');
  }
  openRqstForm() {
    console.log("Request Form")
    console.log(this.CreateTicketDtls);
    this.router.navigate(['/admin/support/my-tickets/servicerequest-form'], { queryParams: { "paramsdata": JSON.stringify(this.CreateTicketDtls) }, skipLocationChange: true })
    this.location.replaceState('/admin/support/my-tickets/servicerequest-form');
  }
  openPrivForm() {
    console.log("privilege Form");
    console.log(this.CreateTicketDtls);
    this.router.navigate(['/admin/support/my-tickets/privilegerequest-form'], { queryParams: { "paramsdata": JSON.stringify(this.CreateTicketDtls) }, skipLocationChange: true })
    this.location.replaceState('/admin/support/my-tickets/privilegerequest-form');
  }
}
