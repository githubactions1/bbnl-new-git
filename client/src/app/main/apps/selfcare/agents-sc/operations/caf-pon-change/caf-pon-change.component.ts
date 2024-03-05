import { Component, OnInit, ViewChild } from '@angular/core';
import { CrudService } from 'app/main/apps/crud.service';
import { DsSidebarService } from '@glits/components/sidebar/sidebar.service';
import { AtomService } from 'app/main/services/atom.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition, MatDialog } from '@angular/material';
import { DeleteDialogComponent } from 'app/main/shared/components/delete-dialog/delete-dialog.component';
import { UserService } from 'app/providers/user/user.serivce';
import { switchMap, debounceTime, tap, map, finalize } from 'rxjs/operators';

@Component({
  selector: 'app-caf-pon-change',
  templateUrl: './caf-pon-change.component.html',
  styleUrls: ['./caf-pon-change.component.scss']
})
export class CafPonChangeComponent implements OnInit {
  permissions;
  lmocd: any;
  agnt_id: any;
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  TableData: any;
  lmoPymntsForm: FormGroup;
  columnDefs: any[];
  selectedData: any;
  dstId: any;
  mandalLst: any;
  mndlId: any;
  villageLst: any;
  oltList: any;
  oltid: any;
  portList: any;
  portid: any;
  slotList: any;
  jsonOneData: { sno: number; id: number; value: { l_id1: number; s_data: string; }[]; }[];
  bindTwo: any[];
  bindoriginaltwo = [];
  bindoriginalthree=[];
  slotone_id: any;
  slottwo_id: any;
  slot_id: any;
  slotsplt_id: any;
  slotsplttwo_id: any;
  bindThree: any;
  villageID: any;
  addressOne: any;
  addressTwo: any;
  locality: any;
  districtID: any;
  mandalID: any;
  area: any;
  oltID: any;
  portID: any;
  slctedSlotIdSltOne: any[];
  slotTwo: any;
  slotThree: any;
  splitData: any;
  ViewLabelData : boolean = false
  slotOneID: any;
  showPonChange : boolean = false
  custArea: any;
  custLocality: any;
  custAdressTwo: any;
  custAdressOne: any;
  cafAdressOne: any;
  cafAdressTwo: any;
  caftLocality: any;
  cafArea: any;
  getHeaderDtls = function () { return { "title": "PON Change", "icon": "list_alt" } }
  cafnumber: any;
  mobilenumber: any;
  aadharnumber: any;
  agentDropDwnView:boolean;
  tableView:boolean = false;
  errorMsg: string;
  isLoading: boolean;
  filteredAgents: any;
  spltData: any;
  aaa_mac_id_sus: string;
  validatedDataOne: any;
  mandalId: any;
  mandlNumber: any;
  dstrctLst: any;




  constructor(private fb: FormBuilder,private dsSidebarService: DsSidebarService, public crdsrv: CrudService, public atmSrv: AtomService, private formBuilder: FormBuilder, public snackBar: MatSnackBar, private userService: UserService) {
      this.permissions = { "slct_in": 1, "insrt_in": 1, "updt_in": 1, "dlte_in": 1, "exprt_in": 1 }
    this.userService.USER_DETAILS.subscribe(val => {
      if (val.usr_ctgry_id == 8 || val.usr_ctgry_id==10) {
        this.lmocd = val.lmo_cd
        this.agnt_id = val.usr_ctgry_ky
        console.log(this.agnt_id);
      }
    });
    const permTxt = 'PON Change';
    const prmeRte = `user/permissions/${permTxt}`;
    this.crdsrv.get(prmeRte).subscribe((res) => {
      this.permissions = res['data'][0];
    });
    var sltFirstData = [
      {
        sno: 0,
        id: 1,
        value: [{ l_id1: 1, s_data: "false" }],
      },
      {
        sno: 1,
        id: 2,
        value: [{ l_id1: 1, s_data: "false" }, { l_id1: 2, s_data: "false" }],
      },
      {
        sno: 2,
        id: 4,
        value: [{ l_id1: 1, s_data: "false" }, { l_id1: 2, s_data: "false" }, { l_id1: 3, s_data: "false" }, { l_id1: 4, s_data: "false" }],
      },
      {
        sno: 3,
        id: 8,
        value: [{ l_id1: 1, s_data: "false" }, { l_id1: 2, s_data: "false" }, { l_id1: 3, s_data: "false" }, { l_id1: 4, s_data: "false" }, { l_id1: 5, s_data: "false" }, { l_id1: 6, s_data: "false" }, { l_id1: 7, s_data: "false" }, { l_id1: 8, s_data: "false" }],
      },
      {
        sno: 4,
        id: 16,
        value: [{ l_id1: 1, s_data: "false" }, { l_id1: 2, s_data: "false" }, { l_id1: 3, s_data: "false" }, { l_id1: 4, s_data: "false" }, { l_id1: 5, s_data: "false" }, { l_id1: 6, s_data: "false" }, { l_id1: 7, s_data: "false" }, { l_id1: 8, s_data: "false" }, { l_id1: 9, s_data: "false" }, { l_id1: 10, s_data: "false" }, { l_id1: 11, s_data: "false" }, { l_id1: 12, s_data: "false" }, { l_id1: 13, s_data: "false" }, { l_id1: 14, s_data: "false" }, { l_id1: 15, s_data: "false" }, { l_id1: 16, s_data: "false" }],
      },
      {
        sno: 5,
        id: 32,
        value: [{ l_id1: 1, s_data: "false" }, { l_id1: 2, s_data: "false" }, { l_id1: 3, s_data: "false" }, { l_id1: 4, s_data: "false" }, { l_id1: 5, s_data: "false" }, { l_id1: 6, s_data: "false" }, { l_id1: 7, s_data: "false" }, { l_id1: 8, s_data: "false" }, { l_id1: 9, s_data: "false" }, { l_id1: 10, s_data: "false" }, { l_id1: 11, s_data: "false" }, { l_id1: 12, s_data: "false" }, { l_id1: 13, s_data: "false" }, { l_id1: 14, s_data: "false" }, { l_id1: 15, s_data: "false" }, { l_id1: 16, s_data: "false" }, { l_id1: 17, s_data: "false" }, { l_id1: 18, s_data: "false" }, { l_id1: 19, s_data: "false" }, { l_id1: 20, s_data: "false" }, { l_id1: 21, s_data: "false" }, { l_id1: 22, s_data: "false" }, { l_id1: 23, s_data: "false" },
        { l_id1: 24, s_data: "false" }, { l_id1: 25, s_data: "false" }, { l_id1: 26, s_data: "false" }, { l_id1: 27, s_data: "false" }, { l_id1: 28, s_data: "false" }, { l_id1: 29, s_data: "false" }, { l_id1: 30, s_data: "false" }, { l_id1: 31, s_data: "false" }, { l_id1: 32, s_data: "false" }],
      },
      {
        sno: 5,
        id: 64,
        value: [{ l_id1: 1, s_data: "false" }, { l_id1: 2, s_data: "false" }, { l_id1: 3, s_data: "false" }, { l_id1: 4, s_data: "false" }, { l_id1: 5, s_data: "false" }, { l_id1: 6, s_data: "false" }, { l_id1: 7, s_data: "false" }, { l_id1: 8, s_data: "false" }, { l_id1: 9, s_data: "false" }, { l_id1: 10, s_data: "false" }, { l_id1: 11, s_data: "false" }, { l_id1: 12, s_data: "false" }, { l_id1: 13, s_data: "false" }, { l_id1: 14, s_data: "false" }, { l_id1: 15, s_data: "false" }, { l_id1: 16, s_data: "false" }, { l_id1: 17, s_data: "false" }, { l_id1: 18, s_data: "false" }, { l_id1: 19, s_data: "false" }, { l_id1: 20, s_data: "false" }, { l_id1: 21, s_data: "false" }, { l_id1: 22, s_data: "false" }, { l_id1: 23, s_data: "false" },
        { l_id1: 24, s_data: "false" }, { l_id1: 25, s_data: "false" }, { l_id1: 26, s_data: "false" }, { l_id1: 27, s_data: "false" }, { l_id1: 28, s_data: "false" }, { l_id1: 29, s_data: "false" }, { l_id1: 30, s_data: "false" }, { l_id1: 31, s_data: "false" }, { l_id1: 32, s_data: "false" }, { l_id1: 33, s_data: "false" }, { l_id1: 34, s_data: "false" }, { l_id1: 35, s_data: "false" }, { l_id1: 36, s_data: "false" }, { l_id1: 37, s_data: "false" }, { l_id1: 38, s_data: "false" }, { l_id1: 39, s_data: "false" }, { l_id1: 40, s_data: "false" }, { l_id1: 41, s_data: "false" }, { l_id1: 42, s_data: "false" }, { l_id1: 43, s_data: "false" }, { l_id1: 44, s_data: "false" }, { l_id1: 45, s_data: "false" }, { l_id1: 46, s_data: "false" }, { l_id1: 47, s_data: "false" }, { l_id1: 48, s_data: "false" }, { l_id1: 49, s_data: "false" }, { l_id1: 50, s_data: "false" }, { l_id1: 51, s_data: "false" }, { l_id1: 52, s_data: "false" }, { l_id1: 53, s_data: "false" }, { l_id1: 54, s_data: "false" }, { l_id1: 55, s_data: "false" },
        { l_id1: 56, s_data: "false" }, { l_id1: 57, s_data: "false" }, { l_id1: 58, s_data: "false" }, { l_id1: 59, s_data: "false" }, { l_id1: 60, s_data: "false" }, { l_id1: 61, s_data: "false" }, { l_id1: 62, s_data: "false" }, { l_id1: 63, s_data: "false" }, { l_id1: 64, s_data: "false" }],
      }
    ]
    this.jsonOneData = sltFirstData;
    console.log(this.jsonOneData);
  }

  ngOnInit() {
    if(this.agnt_id == undefined){
      this.agentDropDwnView=true;
}
else{
  this.agentDropDwnView=false;
}
    this.lmoPymntsForm = this.fb.group({
      lmoCode: ['', Validators.required],
    });
    
    this.lmoPymntsForm.get('lmoCode').valueChanges
    .pipe(
      debounceTime(500),
      tap(() => {
        this.errorMsg = '';
        this.filteredAgents = [];
        this.isLoading = true;
      }),
      switchMap((value) => {
        if (value){
        if (value.length >= 3 || value.length !==  null) {
          return this.crdsrv.get('agent/getAgentBySearch/' + value)
            .pipe(
              finalize(() => {
                this.isLoading = false;
              }),
            );
        }
      }
      })
    )
    .subscribe(data => {
      if (data['data'] === undefined) {
        this.errorMsg = data['Error'];
        this.filteredAgents = [];
      } else {
        this.errorMsg = '';
        this.filteredAgents = data['data'];
      }
    });
    this.getDetails();
    this.distrctLst();
    this.oltDetails();
  }
  getDetails() {
    this.tableView=false;
    if(this.cafnumber == undefined && this.mobilenumber == undefined && this.aadharnumber == undefined && this.agnt_id == undefined && this.lmoPymntsForm.value.lmoCode.agnt_id == undefined){
      console.log("ifffffffff");
    }
    else{
      let data = {
        caf_nu: this.cafnumber == undefined ? 0 : this.cafnumber,
        mbl_nu: this.mobilenumber == undefined ? 0 : this.mobilenumber,
        adhar_nu: this.aadharnumber == undefined ? 0 : this.aadharnumber,
        agntID: this.agnt_id == undefined ? (this.lmoPymntsForm.value.lmoCode.agnt_id == undefined ? 0 :this.lmoPymntsForm.value.lmoCode.agnt_id): this.agnt_id
      }
    let rte = `olt/get/ponChange`
      this.crdsrv.create(data, rte).subscribe((res) => {
      console.log(res['data']);
      this.TableData = res['data'];
      var index = 0
      for (var k = 0; k < this.TableData.length; k++) {
        index = index + 1;
        this.TableData[k].sno = index
      }
      console.log(res['status']);
      if (res['status'] == 200) {
        this.tableView=true;
        this.columnDefs = [
          { headerName: 'Sno', field: 'sno', algnmnt:"center", cellClass: "pm-grid-number-cell", width: 80, sortable: true, filter: false },
          // { headerName: 'LMO Code', field: 'agnt_cd',  cellClass: "pm-grid-number-cell", width: 160, sortable: true, filter: true },
          { headerName: 'Caf Number', field: 'caf_nu',algnmnt:"center",  cellClass: "pm-grid-number-cell", width: 160, sortable: true, filter: true },
          { headerName: 'Address 1', field: 'instl_addr1_tx',  cellClass: "pm-grid-number-cell", width: 160, sortable: true, filter: true },
          { headerName: 'Address 2', field: 'instl_addr2_tx',  cellClass: "pm-grid-number-cell", width: 160, sortable: true, filter: true },
          { headerName: 'Locality', field: 'instl_lcly_tx',  cellClass: "pm-grid-number-cell", width: 160, sortable: true, filter: true },
          { headerName: 'Area', field: 'instl_ara_tx',  cellClass: "pm-grid-number-cell", width: 160, sortable: true, filter: true },
          { headerName: 'Caf Mac Address', field: 'caf_mac_addr_tx',  cellClass: "pm-grid-number-cell", width: 180, sortable: true, filter: true },
          { headerName: 'OLT Name', field: 'olt_nm',  cellClass: "pm-grid-number-cell", width: 200, sortable: true, filter: true },
          { headerName: 'OLT Sr No', field: 'olt_srl_nu', algnmnt:"center", cellClass: "pm-grid-number-cell", width: 200, sortable: true, filter: true },
          { headerName: 'OLT Ip Address', field: 'olt_ip_addr_tx',  cellClass: "pm-grid-number-cell", width: 200, sortable: true, filter: true },
          { headerName: 'OLT Port No', field: 'olt_prt_nm',algnmnt:"center",  cellClass: "pm-grid-number-cell", width: 150, sortable: true, filter: true },
          { headerName: 'OLT Port Splits', field: 'olt_prt_splt_tx',  cellClass: "pm-grid-number-cell", width: 130, sortable: true, filter: true },
          { headerName: 'Device', field: 'aghra_cd',  cellClass: "pm-grid-number-cell", width: 200, sortable: true, filter: true },
          { headerName: 'Customer Id', field: 'cstmr_id', algnmnt:"center", cellClass: "pm-grid-number-cell", width: 150, sortable: true, filter: true },
          { headerName: 'Customer Name', field: 'frst_nm',  cellClass: "pm-grid-number-cell", width: 200, sortable: true, filter: true },
          { headerName: 'Address Line1', field: 'loc_addr1_tx',  cellClass: "pm-grid-number-cell", width: 200, sortable: true, filter: true },
          { headerName: 'Address Line2', field: 'loc_addr2_tx',  cellClass: "pm-grid-number-cell", width: 200, sortable: true, filter: true },
          { headerName: 'Locality', field: 'loc_lcly_tx',  cellClass: "pm-grid-number-cell", width: 180, sortable: true, filter: true },
          { headerName: 'Area', field: 'loc_ara_tx',  cellClass: "pm-grid-number-cell", width: 200, sortable: true, filter: true },
          { headerName: 'District', field: 'dstrt_nm',  cellClass: "pm-grid-number-cell", width: 180, sortable: true, filter: true },
          { headerName: 'Mandal', field: 'mndl_nm',  cellClass: "pm-grid-number-cell", width: 180, sortable: true, filter: true },
          { headerName: 'Village', field: 'vlge_nm',  cellClass: "pm-grid-number-cell", width: 180, sortable: true, filter: true },
          { headerName: 'Status', field: 'sts_nm',  cellClass: "pm-grid-number-cell", width: 180, sortable: true, filter: true },

        ]
      }
    })
    }
   
  }
  displayFn(agent): any {
    if (agent) { return agent.agnt_nm + ' ' + '|' + ' ' + agent.agnt_cd; }
  }
  // oltSlctn(dta) {
  //   console.log(dta.selectedRowsData);
  //   this.selectedData = dta.selectedRowsData;
  //   console.log(this.selectedData);
  //   this.districtID = this.selectedData[0].loc_dstrct_id,
  //   this.mandalID=this.selectedData[0].loc_mndl_id,
  //   this.villageID=this.selectedData[0].loc_vlge_id,
  //   this.addressOne=this.selectedData[0].loc_addr1_tx,
  //   this.addressTwo=this.selectedData[0].loc_addr2_tx,
  //   this.locality=this.selectedData[0].loc_lcly_tx,
  //   this.area=this.selectedData[0].loc_ara_tx
  //   this.openSideBar('addFormPanel');
  // }
  onCellClick(data) {
    
    this.selectedData = data.data;
    console.log(this.selectedData);
    if(this.selectedData.enty_sts_id == 10 || this.selectedData.enty_sts_id == 11){
      this.snackBar.open("Pon Change Cannot Be Done To This CAF", '', {
        duration: 2000,
        panelClass: ['red-snackbar'],
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      });
    }
    else{
      console.log("I am there")
// this.ViewLabelData = true;
    // this.showPonChange = false;
    this.oltID=this.selectedData.olt_id;
      this.districtID = this.selectedData.loc_dstrct_id;
      this.mandalID =this.selectedData.mndl_id;
      this.villageID =this.selectedData.vlge_id;
      this.addressOne =this.selectedData.loc_addr1_tx;
      this.addressTwo =this.selectedData.loc_addr2_tx;
      this.locality =this.selectedData.loc_lcly_tx;
      this.area =this.selectedData.loc_ara_tx;
      this.cafAdressOne =this.selectedData.instl_addr1_tx;
      this.cafAdressTwo =this.selectedData.instl_addr2_tx;
      this.caftLocality =this.selectedData.instl_lcly_tx;
      this.cafArea =this.selectedData.instl_ara_tx;
       this.getMandalLst(this.selectedData.loc_dstrct_id,0);
      // this.getVillageLst(this.selectedData.mndl_id);
      this.getPortsSltsCount(this.oltID);
    this.openSideBar('addFormPanel');
    }
    
  }
  openSideBar(key) {
    this.dsSidebarService.getSidebar(key).toggleOpen();
  }
  closeSideBar() {
    this.dsSidebarService.getSidebar('addFormPanel').toggleOpen();
  }
  distrctLst() {
    let rte = 'agent/agnt_dstrctList'
    this.crdsrv.get(rte).subscribe((res) => {
      this.dstrctLst = res['data']
    })
  }
  getMandalLst(dstrct_id,value) {
    console.log(value)
    console.log(dstrct_id);
    this.dstId = dstrct_id;
    let rte = `agent/agnt_mandalList/${dstrct_id}`
    this.crdsrv.get(rte).subscribe((res) => {
      this.mandalLst = res['data']
      console.log(this.mandalLst)
      if(res['status']==200){
        if(value == 0){
          this.getVillageLst(this.selectedData.mndl_id);
        }
      }
    })
  }
  getVillageLst(mandal_id) {
    this.mndlId = mandal_id;
    this.mandalId=mandal_id;
    console.log(this.mandalId);
    console.log(this.districtID);
    console.log(this.mandalLst);
    if(this.mandalLst){
      for(var j=0; j<this.mandalLst.length; j++){
        if(this.mandalLst[j].mndl_id == this.mandalId){
          this.mandlNumber=this.mandalLst[j].mndl_nu
        }
      }
    }
    console.log(this.mandlNumber);
    if(this.mandlNumber){
      let rte = `agent/agnt_vlgeList/${this.mandlNumber}/${this.districtID}`
    this.crdsrv.get(rte).subscribe((res) => {
      this.villageLst = res['data']
      console.log(this.villageLst)
    })
    }
    else{
      let rte = `agent/agnt_vlgeList/${this.mandalId}/${this.districtID}`
      this.crdsrv.get(rte).subscribe((res) => {
        this.villageLst = res['data']
        console.log(this.villageLst)
      })
    }
   
  }
  

  oltDetails() {
    let rte = `olt/oltdetails/${this.agnt_id}`
    this.crdsrv.get(rte).subscribe((res) => {
      console.log(res['data']);
      this.oltList = res['data']
      console.log(this.oltList);
    })
  }

  getPortsSltsCount(olt_id) {
    this.portList= [];
    console.log(olt_id);
    this.oltid = olt_id;
    let rte = `olt/slotDetails/${this.oltid}`
    this.crdsrv.get(rte).subscribe((res) => {
      console.log(res['data']);
      this.portList = res['data']
      console.log(this.portList);
    })
  }
  getslots(port_id) {
    this.slotList= [];
    this.bindoriginaltwo=[];
    this.bindoriginalthree=[];
    console.log(port_id);
    this.portid = port_id;
    let rte = `olt/slotDetailsForPort/${this.portid}`
    this.crdsrv.get(rte).subscribe((res) => {
      this.slotList = res['data']
      console.log(this.slotList);
    })
  }
  slotOneSlctn(slotOneID) {
    this.bindoriginaltwo=[];
    var dataOne = []
    var dataTwo = []
    var dataThree = []
    var originaltwo=[]
    console.log(slotOneID);
    this.slot_id = slotOneID
    console.log(this.slotList);
    for (var i = 0; i < this.slotList.length; i++) {
      if (this.slotList[i].olt_slt_id == slotOneID) {
        dataOne.push(this.slotList[i])
      }
    }
    console.log(dataOne)
    this.slctedSlotIdSltOne = dataOne
    console.log(this.jsonOneData);
    for (var j = 0; j < this.jsonOneData.length; j++) {
      if (this.jsonOneData[j].id == dataOne[0].slt2_id) {
        dataTwo.push(this.jsonOneData[j].value)
      }
      if (this.jsonOneData[j].id == dataOne[0].slt3_id) {
        dataThree.push(this.jsonOneData[j].value)
      }
    }
    console.log(dataTwo);
    this.bindTwo = dataTwo[0];
    this.bindThree = dataThree[0];
    console.log(dataOne);
    console.log(this.bindTwo);
    console.log(this.bindThree);
      let splitData={
        spltsData:dataOne
    }
    let rte = 'olt/validation/splitsData'
    this.crdsrv.create(splitData, rte).subscribe((res) => {
      this.validatedDataOne = res['data']
      console.log(this.validatedDataOne);
      console.log(this.validatedDataOne.length);
      for(var d = 0; d < this.validatedDataOne.length; d++){
        // originaltwo.push('splt2':this.validatedDataOne[d].sptwo)
        this.bindoriginaltwo.push({ 'spltstwo':this.validatedDataOne[d].sptwo})
      }
      let obj = {};
      
      const unique = () => {
        let result = [];
        
        this.bindoriginaltwo.forEach((item, i) => {
          obj[item['spltstwo']] = i;
        });
        
        for (let key in obj) {
          let index = obj[key];
          result.push(this.bindoriginaltwo[index])
        }
        
        return result;
      }
      
      this.bindoriginaltwo = unique(); 
      
      console.log(this.bindoriginaltwo);
    })
  }
  slotTwoSelection(two){
    this.bindoriginalthree=[];
    console.log(this.validatedDataOne);
   console.log(two);
   for(var h = 0; h < this.validatedDataOne.length; h++){
     if(two == this.validatedDataOne[h].sptwo){
      this.bindoriginalthree.push({'spltsthree':this.validatedDataOne[h].spthree})
     }
   }
   console.log(this.bindoriginalthree);
  }
  forSplitId(slthree) {
    console.log(this.slotOneID);
    console.log(this.slotTwo);
    console.log(this.slotThree);
    console.log(this.validatedDataOne[0].slidoriginal)
    let data = {
      olt_slt_id: this.validatedDataOne[0].slidoriginal,
      splt1_nu: this.validatedDataOne[0].spone,
      splt2_nu: this.slotTwo,
      splt3_nu: this.slotThree
    }
    console.log(data);
    let rte = 'olt/spiltsData'
    this.crdsrv.create(data, rte).subscribe((res) => {
      console.log(res['data']);
      this.splitData = res['data']
      console.log(this.splitData);
    })
  }



  // pochnge(){
  //   this.ViewLabelData = false;
  //   this.showPonChange = true;
  // }
  // sdBack(){
  //   this.ViewLabelData = true;
  //   this.showPonChange = false;
  // }
  update() {
    console.log(this.selectedData);
    var oltData = []
    var oltportData = []
    var spltData = []
    spltData.push(this.splitData[0].splt1_nu + '-' + this.splitData[0].splt2_nu + '-' + this.splitData[0].splt3_nu)
    for (var m = 0; m < this.oltList.length; m++) {
      if (this.oltList[m].olt_id == this.oltID) {
        oltData.push(this.oltList[m])
      }
    }
    for (var n = 0; n < this.portList.length; n++) {
      if (this.portList[n].olt_prt_id == this.portID) {
        oltportData.push(this.portList[n])
      }
    }
    // var frstSplit = oltData[0].olt_ip_addr_tx.split(".");

    var str = this.selectedData.onu_mac_addr_tx;
    console.log(str.length);
    for (var i = 0; i < str.length; i++) {
      str = str.toString().replace(":", "");
    }
    var accstrg = str.match(/.{1,4}/g);
    for (var k= 0; k < accstrg.length; k++) {
      accstrg= accstrg.toString().replace(",", ".");
    }
    console.log(accstrg);
    var s = this.selectedData.onu_mac_addr_tx
    var arr = s.split(':');
    var modified = ""
    for (var i = 0; i < arr.length; i++) {
      if (i % 2 == 1) {
        if (i == arr.length - 1) {
          modified = modified + arr[i];
        } else {
          modified = modified + arr[i] + ".";
        }

      } else {
        modified = modified + arr[i];
      }
    }
    console.log(modified.toLowerCase())
    this.aaa_mac_id_sus = modified.toLowerCase()
        
    this.spltData =this.selectedData.aghra_cd.split('-');
   console.log(this.selectedData.mdl_dtls_tx);

   var l = oltData[0].olt_ip_addr_tx
   var arry = l.split('.');
   console.log(arry)
   var modifiedAaa = []
   for (var m = 2; m < arry.length; m++) {
       if (arry[m].length == 1) {
           modifiedAaa.push("00" + arry[m]);
       } else if (arry[m].length == 2) {
           modifiedAaa.push("0" + arry[m]);
       } else {
           modifiedAaa.push(arry[m]);
       }
       modified = "lag:" + modifiedAaa.join('');
       console.log('modified', modified)
   }
 
   var code = modified.toLowerCase();
 
 console.log(code);
 
 
    let data = {
      customer_id: this.selectedData.cstmr_id,
      district_id: this.districtID == undefined ?this.selectedData.loc_dstrct_id : this.districtID,
      mandal_id: this.mandalID == undefined ?this.selectedData.mndl_id : this.mandalID,
      village_id: this.villageID == undefined ?this.selectedData.loc_vlge_id : this.villageID,
      address_one: this.addressOne == undefined ?this.selectedData.loc_addr1_tx : this.addressOne,
      address_two: this.addressTwo == undefined ?this.selectedData.loc_addr2_tx : this.addressTwo,
      localty: this.locality == undefined ?this.selectedData.loc_lcly_tx : this.locality,
      ara: this.area == undefined ?this.selectedData.loc_ara_tx : this.area,
      caf_address_one:this.cafAdressOne == undefined ?this.selectedData.instl_addr1_tx : this.cafAdressOne,
      caf_address_two:this.cafAdressTwo == undefined ?this.selectedData.instl_addr2_tx : this.cafAdressTwo,
      caf_locality:this.caftLocality == undefined ?this.selectedData.instl_lcly_tx : this.caftLocality,
      caf_area:this.cafArea == undefined ?this.selectedData.instl_ara_tx : this.cafArea,
      caf_id: this.selectedData.caf_id,
      caf_type_id:this.selectedData.caf_type_id,
      olt_id: oltData[0].olt_id,
      olt_srl_nu: oltData[0].olt_srl_nu,
      olt_ip_addr_tx: oltData[0].olt_ip_addr_tx,
      olt_prt_id: oltportData[0].olt_prt_id,
      olt_prt_nm: oltportData[0].olt_prt_nm,
      olt_crd_nu: oltportData[0].crd_id,
      splt_id: this.splitData[0].splt_id,
      olt_onu_id:this.splitData[0].onu_id,
      olt_prt_splt_tx: spltData[0],
      stpbx_id:this.selectedData.stpbx_id,
      old_lag_id:this.selectedData.aaa_cd,
      // new_lag_id:'lag:'+frstSplit[2]+frstSplit[3]+':'+oltportData[0].crd_id+':'+oltportData[0].olt_prt_nm+':'+this.splitData[0].onu_id,
      new_lag_id:code+':'+oltportData[0].crd_id+':'+oltportData[0].olt_prt_nm+':'+this.splitData[0].onu_id,
      acessid:accstrg,
      serialNumber:'',
      aghra_cd_hsi:this.selectedData.aghra_cd,
      aghra_cd_iptv:this.selectedData.aghra_cd.replace("HSI", "IPTV"),
      aghra_cd:this.spltData[0]+"-"+this.spltData[1]+"-"+this.spltData[2]+"-"+this.spltData[3],
      subscr_code: this.selectedData.mdlwe_sbscr_id,
      pckge_id:this.selectedData.crnt_pln_id,
      // replacename:this.selectedData.cstmr_nm+this.selectedData.caf_id,
      replacename:this.selectedData.cstmr_nm.trim()+this.selectedData.caf_id,
      tps:this.selectedData.mdl_dtls_tx?this.selectedData.mdl_dtls_tx.split(","):this.selectedData.mdl_dtls_tx,
      acId:this.aaa_mac_id_sus,
      aghra_cd_nw:'',
      old_split_id:this.selectedData.splt_id,
      mdle_cd:this.selectedData.mdle_cd
    }
    let adjstdPrt = 0;
   if(this.selectedData.mdle_cd){
    if (oltportData[0].crd_id == 1 && this.selectedData.mdle_cd.includes('D')) {
      adjstdPrt = oltportData[0].olt_prt_nm + 8;
    }
   }
   else if(this.selectedData.mdle_cd == null){
    if (oltportData[0].crd_id == 1) {
      adjstdPrt = oltportData[0].olt_prt_nm + 8;
    }
   }
  
  
    data["aghra_cd_nw"] = oltData[0].olt_ip_addr_tx + "-" + oltportData[0].crd_id + "-" + adjstdPrt + "-" + this.splitData[0].onu_id + "-HSI";

    console.log(this.selectedData.onu_srl_nu);
    if(this.selectedData.onu_srl_nu != null){
      if (this.selectedData.onu_srl_nu.startsWith('DSNW')) {
        data["serialNumber"] = this.selectedData.onu_srl_nu.replace('DSNW', '44534E57');
      } else if (this.selectedData.onu_srl_nu.startsWith('ZTEG')) {
        data["serialNumber"] = this.selectedData.onu_srl_nu.replace('ZTEG', '5A544547');
      } else if (this.selectedData.onu_srl_nu.startsWith('YGE1')) {
        data["serialNumber"] = this.selectedData.onu_srl_nu.replace('YGE1', '59474531');
      } else if (this.selectedData.onu_srl_nu.startsWith('KONK')) {
        data["serialNumber"] = this.selectedData.onu_srl_nu.replace('KONK', '4B4F4E4B');
      }
    }
    console.log(data)
    this.closeSideBar();
    let rte = 'caf_operations/pon-change'
    this.crdsrv.create(data, rte).subscribe((res) => {
      console.log(res['status'])
      if (res['status'] == 200) {
        this.snackBar.open("Sucessfully Updated", '', {
          duration: 2000,
          panelClass: ['blue-snackbar'],
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
      }
      else{
        this.snackBar.open("Pon Change Failed", '', {
          duration: 2000,
          panelClass: ['blue-snackbar'],
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
      }
    })
  }
}
