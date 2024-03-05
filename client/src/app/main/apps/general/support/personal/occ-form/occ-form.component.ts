import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CrudService } from 'app/main/apps/crud.service';
import { Location } from '@angular/common';
import {
  MatTableDataSource, MatPaginator, MatSort, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition, MatDialogRef, MatSnackBar, MatDialog,
  MAT_DIALOG_DATA
} from '@angular/material';

@Component({
  selector: 'app-occ-form',
  templateUrl: './occ-form.component.html',
  styleUrls: ['./occ-form.component.scss']
})
export class OccFormComponent implements OnInit {

  lmonumber: any;
  agentdata: any;
  cstmrData: any;
  cafarray = [];
  rowData = [];
  // showTble = false;
  shwPrflePge: boolean = false;
  columnDefs = [];
  allsrc_itms = []
  items = [];
  rcntSrchItms = [];
  searchData: any;
  tableview: boolean = false;
  frontJsonData: any;
  previousSearchData = [];
  searchLoader: boolean = false;
  addcafcolumn: boolean = false;
  TypeID: any;
  categryID: any;
  subcategryID: any;
  // issueTypeID:any;
  // issueIndefierID:any;
  teamID: any;
  prortyID: any;
  CategoryDtls: any;
  subCategoryDtls: any;
  // issueTypesDtls: any;
  // issueIndefierDtls: any;
  teamsDtls: any;
  stsDtls: any;
  prtyDtls: any;
  descrptn: any;
  lngdescrptn: any;
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  getHeaderDtls = function () { return { "title": 'New Ticket', "icon": "people_outline" } }
  tktParamsDta = [];
  fileUploaded: any;
  upldFileNm: any;
  // uploadedFiles: Array < File > ;
  imageUrl: string | ArrayBuffer;
  imgfilename: string;
  attach_image: {};
  app_icon: string;
  assignTeamDtls: any;
  shwCafPge: boolean;
  cafnumbr: any;
  cmnt: any;
  caftable: any;
  cafcolumnDefs =[];
  cafData: any;
  constructor(private route: ActivatedRoute, private crdsrv: CrudService, public router: Router, private location: Location, private snackBar: MatSnackBar, ) {
    this.route.queryParams.subscribe(params => {
      console.log(params.paramsdata);
      if (params.paramsdata) {
        this.tktParamsDta = JSON.parse(params.paramsdata);
      }
    })
  }

  ngOnInit() {
    this.getStatus();
    this.getpriority();
    this.getAssignTeam();
    // console.log(this.tktParamsDta);
    // console.log(this.tktParamsDta.length);
    // if (this.tktParamsDta.length == 1) {
    //   this.TypeID = this.tktParamsDta[0].tckt_type_id;
      this.ForCategory();
    // }
    // else {
    //   this.TypeID = ''
    // }

  }

  ForCategory() {
    console.log(this.TypeID);
    this.TypeID = 7;
    this.categryID = '';
    this.subcategryID = '';
    // this.issueTypeID='';
    // this.issueIndefierID='';
    this.teamID = '';
    const rte = `ticket/getCategories/${this.TypeID}`
    this.crdsrv.get(rte).subscribe(res => {
      this.CategoryDtls = res['data'];
      console.log(this.CategoryDtls);
      console.log(this.CategoryDtls.length);
      if (this.CategoryDtls.length == 1) {
        this.categryID = this.CategoryDtls[0].tckt_ctgry_id;
        this.ForSubCategory();
      }
      else {
        this.categryID = ''
      }
    })
  }
  ForSubCategory() {
    console.log(this.categryID);
    if (this.categryID == 14) {
      this.addcafcolumn = true;
    } else {
      this.addcafcolumn = false;
      this.caftable =false;
      this.cafarray =[];
    }
    this.subcategryID = '';
    // this.issueTypeID='';
    // this.issueIndefierID='';
    this.teamID = '';
    // this.ForTeams();
    const rte = `ticket/getSubCategories/${this.categryID}`
    this.crdsrv.get(rte).subscribe(res => {
      this.subCategoryDtls = res['data'];
      console.log(this.subCategoryDtls);
      console.log(this.subCategoryDtls.length);
      if (this.subCategoryDtls.length == 1) {
        this.subcategryID = this.subCategoryDtls[0].tckt_sb_ctgry_id;
        // this.ForIssueType();
      }
      else {
        this.subcategryID = ''
      }
    })
  }
  // ForIssueType(){
  //   console.log(this.subcategryID);
  //   this.issueTypeID='';
  //   this.issueIndefierID='';
  //   this.teamID='';
  //   this.ForTeams();
  //   const rte = `ticket/getissueTypes/${this.categryID}/${this.subcategryID}`
  //   this.crdsrv.get(rte).subscribe(res => {
  //     this.issueTypesDtls = res['data'];
  //     console.log(this.issueTypesDtls);
  //     console.log(this.issueTypesDtls.length);
  //     if(this.issueTypesDtls.length == 1){
  //       this.issueTypeID=this.issueTypesDtls[0].ise_type_id;
  //       this.ForIssueIndefiers();
  //     }
  //     else{
  //       this.issueTypeID=''
  //     }
  //   })
  // }
  // ForIssueIndefiers(){
  //   this.issueIndefierID='';
  //   this.teamID='';
  //   this.ForTeams();
  //   const rte = `ticket/getissueIdentifiers/${this.issueTypeID}`
  //   this.crdsrv.get(rte).subscribe(res => {
  //     this.issueIndefierDtls = res['data'];
  //     console.log(this.issueIndefierDtls);
  //     console.log(this.issueIndefierDtls.length);
  //     if(this.issueIndefierDtls.length == 1){
  //       this.issueIndefierID=this.issueIndefierDtls[0].ise_idnfr_id;
  //       this.ForTeams();
  //     }
  //     else{
  //       this.issueIndefierID=''
  //     }
  //   })
  // }
  // ForTeams(){
  // console.log(this.issueIndefierID);
  // this.teamID='';
  // var data = {
  //   type:this.TypeID?this.TypeID:0,
  //   category:this.categryID?this.categryID:0,
  //   subcategory:this.subcategryID?this.subcategryID:0,
  // issuetype:this.issueTypeID?this.issueTypeID:0,
  // isseidentifier:this.issueIndefierID?this.issueIndefierID:0
  //   }
  //   console.log(data);
  //   this.crdsrv.create(data, 'ticket/getTeams').subscribe(res => {
  //     this.teamsDtls = res['data'];
  //     console.log(this.teamsDtls);
  //     console.log(this.teamsDtls.length);
  //     if(this.teamsDtls.length == 1){
  //       this.teamID=this.teamsDtls[0].tm_id;
  //     }
  //     else{
  //       this.teamID=''
  //     }
  //   })
  // }
  getAssignTeam() {
    const rte = 'ticket/getassignTeams'
    this.crdsrv.get(rte).subscribe(res => {
      this.assignTeamDtls = res['data'];
      console.log(this.assignTeamDtls);
    })
  }
  getStatus() {
    const rte = 'support/Ticket-Status'
    this.crdsrv.get(rte).subscribe(res => {
      this.stsDtls = res['data'];
      console.log(this.stsDtls)
    })
  }
  getpriority() {
    const rte = 'support/Priority'
    this.crdsrv.get(rte).subscribe(res => {
      this.prtyDtls = res['data'];
      console.log(this.prtyDtls)
    })
  }
  resetTckInfrmtn() {
    // this.TypeID = '';
    this.categryID = '';
    this.subcategryID = '';
    // this.issueTypeID='';
    // this.issueIndefierID='';
    this.teamID = '';
    this.prortyID = '';
    this.descrptn = '';
    this.lngdescrptn ='';
    // this.CategoryDtls = [];
    // this.subCategoryDtls = [];
    // this.issueTypesDtls = [];
    // this.issueIndefierDtls = [];
    // this.teamsDtls = [];
    this.imageUrl = '';
    this.imgfilename = '';
    this.app_icon = ''
  }
  saveTckInfrmtn() {
    console.log(this.TypeID);
    console.log(this.categryID);
    console.log(this.subcategryID);
    // console.log(this.issueTypeID);
    // console.log(this.issueIndefierID);
    console.log(this.teamID);
    console.log(this.prortyID);
    console.log(this.descrptn);
    console.log(this.lmonumber);
    console.log(this.tktParamsDta);
    if (this.attach_image != undefined || "") {
      this.attach_image = this.attach_image
    } else {
      let img1 = {}
      img1 = {
        base64: this.imageUrl,
        file_name: 0
      }
      this.attach_image = img1
    }
    if (this.lmonumber != undefined) {
      if (this.categryID != '' && this.teamID != '' || "" && this.descrptn != undefined || "") {
        var postdata = {
          lmo: this.lmonumber,
          type: 7,
          category: this.categryID,
          subcategory: this.subcategryID,
          // issuetype:this.issueTypeID,
          // issueIdentifier:this.issueIndefierID,
          assignteam: this.teamID,
          status: 7,
          cre_tm_id: 7,
          lmo_id: this.agentdata.agnt_id,
          // priority:this.prortyID,
          priority: 3,
          description: this.descrptn ? this.descrptn.length > 0 ? this.descrptn : 0 : 0,
          longdescription: this.lngdescrptn ? this.lngdescrptn.length > 0 ? this.lngdescrptn : 0 : 0,
          attah_data: this.attach_image,
          caf_data: this.cafarray
          // array:this.tktParamsDta
        }
        this.searchLoader = true;
        console.log(postdata);
        // return
        this.crdsrv.create(postdata, 'ticket/insert/occRequest/ticketDetails').subscribe(res => {
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
      } else {
        this.searchLoader = false;
        this.snackBar.open("Please Fill Mandotory Fields (*)", '', {
          duration: 5000,
          panelClass: ['red-snackbar'],
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
      }
    } else {
      // this.searchLoader=false;
      this.snackBar.open("Please give LMO Code", '', {
        duration: 5000,
        panelClass: ['red-snackbar'],
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      });
    }
  }
  ///////////////////////////////////////////TO GET CAF DETAILS////////////////////////////////////////////////////

  getcafDetails() {
    console.log(this.lmonumber);
    console.log(this.cafnumbr);
    if(this.lmonumber != undefined){
    if (this.cafnumbr) {
      console.log("CAF");
      var data = {
        mobileno: 0,
        CAf: this.cafnumbr,
        LMO: this.agentdata.agnt_id,
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
  } else{
    this.snackBar.open("Please Add LMO Details To Add CAF", '', {
      duration: 5000,
      panelClass: ['red-snackbar'],
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
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

  Addticket() {
    if(this.lmonumber != undefined){
    if (this.cafnumbr != undefined && this.cmnt != undefined) {
      console.log(this.cafarray.length)
      // if(this.cafarray.length >= 9){
      let counter =0;
      this.cafarray.push({
        // 's_no':k['s_no'],
        'caf': this.cafnumbr,
        'cmnt': this.cmnt
      })
      this.cafarray.filter((k) => {
        k['s_no'] = ++counter;
      });

      if(this.cafarray.length > 0){
        this.caftable =true;
       
          this.cafData = this.cafarray;
          console.log(this.cafData);
          // this.searchLoader = false;
      this.cafcolumnDefs = [
        { headerName: 'Sno', field: 's_no', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 100, filter: false, search: false, columnFiltering: false },
        { headerName: 'CAF Id', field: 'caf', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 150, filter: true, columnFiltering: false, filterOperations: ['contains', 'startswith', '='] },
        { headerName: 'Comment', field: 'cmnt', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 400, height: 40, columnFiltering: false, filter: true },
        // { headerName: 'Created By', field: 'mrcht_usr_nm', cellClass: 'pm-grid-number-cell', width: 180, filter: true, search: false, columnFiltering: false },
        // { headerName: 'Created On', field: 'inser_date', cellClass: 'pm-grid-number-cell', width: 100, filter: false, columnFiltering: true },
        // { headerName: 'Change On', field: 'chng_dt', cellClass: 'pm-grid-number-cell', width: 125, filter: true, columnFiltering: false },
        // { headerName: 'Comment', field: 'cmnt_tx', cellClass: 'pm-grid-number-cell', width: 150, filter: true, columnFiltering: false },
      ];
      } else {
        this.caftable =false;
      }
    // }else {
    //   this.snackBar.open("CAF's are not be added greater than 10", '', {
    //     duration: 5000,
    //     panelClass: ['red-snackbar'],
    //     horizontalPosition: this.horizontalPosition,
    //     verticalPosition: this.verticalPosition,
    //   });
    // }
    } else {
      this.snackBar.open("Please Add CAf and Comment", '', {
        duration: 5000,
        panelClass: ['red-snackbar'],
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      });
    }
  } else{
    this.snackBar.open("Please Add LMO Details To Add CAF", '', {
      duration: 5000,
      panelClass: ['red-snackbar'],
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }
    console.log(this.cafarray)
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
  backBtn() {
    console.log("Back")
    this.router.navigate(['/admin/support/personal/ticketlst'], { queryParams: { "paramsdata": 1 } });
    this.location.replaceState('/admin/support/personal/ticketlst');
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
}